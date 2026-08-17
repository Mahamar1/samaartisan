'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, Wrench, MapPin, Zap, Wind, Key } from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/data';
import { getProviders } from '@/lib/supabase/services';
import { Provider } from '@/lib/types';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  providerSuggestion?: {
    id: string;
    slug: string;
    name: string;
    category: string;
    neighborhood: string;
    rating: number;
    phone: string;
  };
}

export function SamaBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [providersList, setProvidersList] = useState<Provider[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Salam ! Je suis SamaBot, votre assistant Sama Artisan. Quel problème rencontrez-vous à Dakar ? (ex: fuite d\'eau Almadies, panne de courant Sacré-Cœur, clim en panne Ouakam...)',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPros = () => {
      getProviders().then((pros) => {
        setProvidersList(pros || []);
      });
    };

    loadPros();
    window.addEventListener('storage', loadPros);
    window.addEventListener('sama_data_updated', loadPros);
    return () => {
      window.removeEventListener('storage', loadPros);
      window.removeEventListener('sama_data_updated', loadPros);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = 'Je vous invite à explorer nos artisans vérifiés disponibles dès aujourd\'hui sur Dakar :';
      let suggestion = undefined;

      const lower = userText.toLowerCase();
      let matchedPro: Provider | undefined = undefined;

      if (lower.includes('fuite') || lower.includes('plombier') || lower.includes('eau') || lower.includes('évier') || lower.includes('chauffe')) {
        matchedPro = providersList.find((prov) => prov.categorySlug === 'plomberie') || providersList[0];
        botResponse = matchedPro ? 'Voici notre maître artisan plombier certifié le plus réactif sur votre secteur :' : 'Vous pouvez trouver un plombier vérifié disponible immédiatement dans notre annuaire :';
      } else if (lower.includes('courant') || lower.includes('elec') || lower.includes('disjoncteur') || lower.includes('panne') || lower.includes('solaire')) {
        matchedPro = providersList.find((prov) => prov.categorySlug === 'electricite') || providersList[0];
        botResponse = matchedPro ? 'Voici l\'ingénieur électricien recommandé pour un dépannage rapide :' : 'Consultez les électriciens certifiés disponibles à Dakar :';
      } else if (lower.includes('clim') || lower.includes('gaz') || lower.includes('split') || lower.includes('froid')) {
        matchedPro = providersList.find((prov) => prov.categorySlug === 'climatisation') || providersList[0];
        botResponse = matchedPro ? 'Voici notre technicien frigoriste certifié pour l\'entretien et la recharge de votre clim :' : 'Découvrez nos techniciens en climatisation disponibles :';
      } else if (lower.includes('serrure') || lower.includes('porte') || lower.includes('clé') || lower.includes('claqu')) {
        matchedPro = providersList.find((prov) => prov.categorySlug === 'serrurerie') || providersList[0];
        botResponse = matchedPro ? 'Voici notre serrurier d\'urgence disponible pour une intervention sans dégât :' : 'Découvrez nos serruriers disponibles 24/7 :';
      }

      if (matchedPro) {
        suggestion = {
          id: matchedPro.id,
          slug: matchedPro.slug,
          name: matchedPro.name + ' (' + matchedPro.businessName + ')',
          category: matchedPro.categoryName,
          neighborhood: matchedPro.neighborhood + ', Dakar',
          rating: matchedPro.averageRating,
          phone: matchedPro.phone,
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botResponse,
          providerSuggestion: suggestion,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2 bg-gradient-to-r from-navy-900 to-sama-700 hover:from-navy-950 hover:to-sama-800 text-white px-4 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20"
          aria-label="Ouvrir SamaBot"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-sama-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
          </div>
          <span className="font-bold text-xs hidden sm:inline-block">
            Besoin d'un artisan ? <span className="text-sama-400">SamaBot</span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 to-slate-900 p-4 text-white flex items-center justify-between shadow">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-sama-600/30 border border-sama-500/40 flex items-center justify-center">
                <Bot className="w-6 h-6 text-sama-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  SamaBot IA
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </h3>
                <p className="text-[11px] text-slate-300">
                  Orientation Dépannage & Artisans 24/7
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-navy-900 text-sama-400 flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sama-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.providerSuggestion && (
                    <div className="mt-3 p-3 bg-sama-50 border border-sama-200 rounded-xl space-y-2 text-slate-800">
                      <div className="flex items-center justify-between text-[10px] font-bold text-sama-800">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sama-600" />
                          {msg.providerSuggestion.neighborhood}
                        </span>
                        <span className="text-amber-600 font-extrabold">
                          ★ {msg.providerSuggestion.rating}/5
                        </span>
                      </div>
                      <p className="font-bold text-navy-900 text-xs line-clamp-1">
                        {msg.providerSuggestion.name}
                      </p>
                      <Link
                        href={`/prestataires/${msg.providerSuggestion.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors text-[11px]"
                      >
                        Voir profil & Contacter sur WhatsApp →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <Bot className="w-4 h-4 text-sama-600 animate-spin" />
                <span>SamaBot recherche le meilleur pro pour vous...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Fuite d'eau urgente aux Almadies..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-sama-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-sama-600 hover:bg-sama-700 text-white flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

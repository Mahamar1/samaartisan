'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TenantLayout from '@/components/layout/TenantLayout';
import { createProperty } from '@/lib/supabase/services';
import { PropertyType, TransactionType, PropertyStatus } from '@/lib/types';
import { Building2, Plus, ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';

export default function NewPropertyPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Appartement');
  const [transactionType, setTransactionType] = useState<TransactionType>('Location');
  const [price, setPrice] = useState<number>(500000);
  const [surface, setSurface] = useState<number>(120);
  const [rooms, setRooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('Almadies');
  const [city, setCity] = useState('Dakar');
  const [description, setDescription] = useState('');
  const [featuresStr, setFeaturesStr] = useState('Climatisation, Groupe électrogène, Piscine, Sécurité 24/7');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const features = featuresStr.split(',').map(s => s.trim()).filter(Boolean);
      
      await createProperty({
        title,
        propertyType,
        transactionType,
        price: Number(price),
        surface: Number(surface),
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
        address,
        neighborhood,
        city,
        description,
        features,
        primaryImage: imageUrl,
        status: 'Disponible'
      });

      router.push('/app/biens');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <TenantLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux biens</span>
          </button>
          <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Formulaire d'Ajout
          </span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h1 className="text-2xl font-black text-slate-900">Ajouter un Nouveau Bien</h1>
            <p className="text-xs text-slate-500 mt-1">Renseignez les détails techniques pour générer l'annonce publique.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Titre de l'annonce</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Luxueux Appartement F4 avec Vue Mer aux Almadies"
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Bien</label>
                <select
                  value={propertyType}
                  onChange={e => setPropertyType(e.target.value as PropertyType)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Appartement">Appartement</option>
                  <option value="Villa">Villa</option>
                  <option value="Maison">Maison</option>
                  <option value="Terrain">Terrain</option>
                  <option value="Bureau">Bureau</option>
                  <option value="Magasin">Magasin</option>
                  <option value="Immeuble">Immeuble</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Transaction</label>
                <select
                  value={transactionType}
                  onChange={e => setTransactionType(e.target.value as TransactionType)}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Location">Location</option>
                  <option value="Vente">Vente</option>
                  <option value="Location courte durée">Location courte durée</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prix (FCFA)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Surface (m²)</label>
                <input
                  type="number"
                  required
                  value={surface}
                  onChange={e => setSurface(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Chambres</label>
                <input
                  type="number"
                  required
                  value={rooms}
                  onChange={e => setRooms(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quartier</label>
                <input
                  type="text"
                  required
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  placeholder="Ex: Almadies, Mermoz, Sacré-Cœur"
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Ex: Route des Almadies"
                  className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Photo Principale (Supabase / Web)</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description détaillée</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Rédigez la description complète du bien..."
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Équipements (séparés par des virgules)</label>
              <input
                type="text"
                value={featuresStr}
                onChange={e => setFeaturesStr(e.target.value)}
                placeholder="Climatisation, Piscine, Ascenseur, Groupe électrogène"
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Enregistrer & Publier l'Annonce</span>
          </button>
        </form>

      </div>
    </TenantLayout>
  );
}

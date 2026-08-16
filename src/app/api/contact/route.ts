import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, subject, message, userType } = body;

    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Veuillez remplir tous les champs obligatoires (Nom, Téléphone, Message).' },
        { status: 400 }
      );
    }

    const subjectLabels: Record<string, string> = {
      trouver_artisan: 'Aide pour trouver un artisan qualifié',
      suivi_devis: "Suivi d'une demande de devis",
      reclamation: 'Signaler une expérience ou un avis',
      autre: 'Autre question générale',
      inscription_artisan: 'Assistance inscription & création de profil pro',
      modifier_profil: 'Aide pour modifier ma vitrine ou mes photos',
      partenariat_artisan: 'Demande de vérification de compte',
      autre_pro: 'Autre question pro',
      partenariat: 'Proposition de partenariat ou grand compte',
      fournisseur: "Fournisseur de matériaux ou d'outillage",
      presse: 'Demande média / Presse',
    };

    const readableSubject = subjectLabels[subject] || subject || 'Message de contact';
    const profileLabel = userType === 'pro' ? 'Artisan Pro' : userType === 'partner' ? 'Entreprise' : 'Particulier';

    // 1. Sauvegarde dans Supabase (messages / notifications)
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('contact_messages').insert([
          {
            full_name: fullName,
            phone,
            email: email || null,
            subject: readableSubject,
            message,
            user_type: profileLabel,
            created_at: new Date().toISOString()
          }
        ]);
      } catch (dbErr) {
        console.warn('Supabase contact insert notice:', dbErr);
      }
    }

    // 2. Envoi direct d'email à mmahamar32@gmail.com via FormSubmit
    try {
      await fetch('https://formsubmit.co/ajax/mmahamar32@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://samaartisan.vercel.app',
          'Referer': 'https://samaartisan.vercel.app/contact'
        },
        body: JSON.stringify({
          _subject: `[Sama Artisan] Nouveau message de ${fullName} (${profileLabel})`,
          'Nom Complet': fullName,
          'Profil': profileLabel,
          'Téléphone': phone,
          'Email': email || 'Non renseigné',
          'Objet': readableSubject,
          'Message': message,
          _template: 'table',
          _replyto: email || undefined
        })
      });
    } catch (mailErr) {
      console.error('Email dispatch notice:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Votre message a été transmis avec succès à notre équipe.'
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: "Une erreur est survenue lors de l'envoi du message." },
      { status: 500 }
    );
  }
}

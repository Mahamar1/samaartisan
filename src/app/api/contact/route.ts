import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { 
  sanitizeText, 
  sanitizePhone, 
  sanitizeEmail, 
  containsMaliciousPattern, 
  checkRateLimit 
} from '@/lib/security';

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting Protection (Max 10 contact requests per minute per IP)
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown-ip';
    const rateLimit = checkRateLimit(`contact_${clientIp}`, 10, 60000, 300000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Trop de tentatives rapprochées. Par mesure de sécurité, veuillez patienter 5 minutes avant de renvoyer un message.' 
        },
        { status: 429 }
      );
    }

    // 2. Payload size protection (Prevent DoS)
    const rawText = await request.text();
    if (rawText.length > 15000) {
      return NextResponse.json(
        { success: false, error: 'Taille du message trop volumineuse (limite max: 15 Ko).' },
        { status: 413 }
      );
    }

    // Parse JSON
    let body: any;
    try {
      body = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Format de requête invalide.' },
        { status: 400 }
      );
    }

    const { fullName, phone, email, subject, message, userType } = body;

    // 3. Mandatory field check
    if (!fullName || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'Veuillez remplir tous les champs obligatoires (Nom, Téléphone, Message).' },
        { status: 400 }
      );
    }

    // 4. Malicious pattern / Injection detection
    const fullCheckString = `${fullName} ${phone} ${email || ''} ${subject || ''} ${message}`;
    if (containsMaliciousPattern(fullCheckString)) {
      console.warn(`[SECURITY ALERT] Malicious payload attempt blocked from IP ${clientIp}`);
      return NextResponse.json(
        { success: false, error: 'Contenu non autorisé détecté. Votre requête a été bloquée par le pare-feu de sécurité.' },
        { status: 403 }
      );
    }

    // 5. Data Sanitization
    const cleanFullName = sanitizeText(fullName, 100);
    const cleanPhone = sanitizePhone(phone);
    const cleanEmail = sanitizeEmail(email);
    const cleanMessage = sanitizeText(message, 3000);
    const cleanSubject = sanitizeText(subject, 100);

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

    const readableSubject = subjectLabels[cleanSubject] || cleanSubject || 'Message de contact';
    const profileLabel = userType === 'pro' ? 'Artisan Pro' : userType === 'partner' ? 'Entreprise' : 'Particulier';

    // 6. Sauvegarde sécurisée dans Supabase (contact_messages)
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('contact_messages').insert([
          {
            full_name: cleanFullName,
            phone: cleanPhone,
            email: cleanEmail || null,
            subject: readableSubject,
            message: cleanMessage,
            user_type: profileLabel,
            created_at: new Date().toISOString()
          }
        ]);
      } catch (dbErr) {
        console.warn('Supabase contact insert notice:', dbErr);
      }
    }

    // 7. Envoi direct d'email à mmahamar32@gmail.com via FormSubmit
    try {
      const emailRes = await fetch('https://formsubmit.co/ajax/mmahamar32@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://samaartisan.vercel.app',
          'Referer': 'https://samaartisan.vercel.app/contact',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
          _subject: `[Sama Artisan] Nouveau message de ${cleanFullName} (${profileLabel})`,
          _captcha: 'false',
          'Nom Complet': cleanFullName,
          'Profil': profileLabel,
          'Téléphone': cleanPhone,
          'Email': cleanEmail || 'Non renseigné',
          'Objet': readableSubject,
          'Message': cleanMessage,
          _template: 'table',
          _replyto: cleanEmail || undefined
        })
      });
      const emailResult = await emailRes.json().catch(() => null);
      if (emailResult) {
        console.log('[EMAIL DISPATCH]', emailResult);
      }
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

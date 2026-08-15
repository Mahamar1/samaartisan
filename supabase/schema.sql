-- ==========================================================
-- SAMA ARTISAN SÉNÉGAL — BASE DE DONNÉES SUPABASE (PostgreSQL)
-- ==========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE DES CATÉGORIES DE MÉTIERS
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLE DES ARTISANS / PRESTATAIRES
CREATE TABLE IF NOT EXISTS public.providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    business_name TEXT,
    avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    category_slug TEXT REFERENCES public.categories(slug) ON UPDATE CASCADE ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    headline TEXT,
    region_id TEXT DEFAULT 'dakar',
    neighborhood TEXT NOT NULL,
    address TEXT,
    average_rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    starting_price INTEGER DEFAULT 15000,
    response_time_minutes INTEGER DEFAULT 15,
    is_available BOOLEAN DEFAULT true,
    verification_level TEXT DEFAULT 'UNVERIFIED' CHECK (verification_level IN ('UNVERIFIED', 'ID_VERIFIED', 'ID_AND_SKILLS')),
    cni_number TEXT,
    years_experience INTEGER DEFAULT 3,
    bio TEXT,
    specialties TEXT[] DEFAULT ARRAY['Dépannage d''urgence', 'Installation'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLE DES DEMANDES DE CONTACT CLIENTS (Appels & WhatsApp & Formulaires)
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    details TEXT,
    channel TEXT DEFAULT 'WHATSAPP' CHECK (channel IN ('WHATSAPP', 'CALL', 'FORM')),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONTACTED', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour tout le monde (visiteurs, clients, artisans)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Providers are viewable by everyone" ON public.providers FOR SELECT USING (true);
CREATE POLICY "Anyone can register an artisan" ON public.providers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create a service request" ON public.service_requests FOR INSERT WITH CHECK (true);

-- 6. DONNÉES INITIALES (SEED DATA)
INSERT INTO public.categories (slug, name, description, icon) VALUES
('plomberie', 'Plomberie & Sanitaire', 'Fuites d''eau, robinetterie, chauffe-eau, débouchage et tuyauterie.', 'Wrench'),
('electricite', 'Électricité & Énergie', 'Pannes, disjoncteurs, câblage, solaire et éclairage.', 'Zap'),
('climatisation', 'Climatisation & Froid', 'Installation, recharge de gaz, entretien split et frigos.', 'Wind'),
('menuiserie', 'Menuiserie Bois & Aluminium', 'Portes, fenêtres alu, placards, meubles et baies vitrées.', 'Hammer'),
('peinture', 'Peinture & Décoration', 'Peinture intérieure, extérieure, étanchéité et enduits.', 'Paintbrush'),
('serrurerie', 'Serrurerie d''Urgence', 'Ouverture de porte, serrures blindées, verrous et clés.', 'Key'),
('maconnerie', 'Maçonnerie & BTP', 'Gros œuvre, carrelage, rénovation, crépissage et dalles.', 'BrickWall'),
('mecanique', 'Mécanique Auto & Moto', 'Dépannage à domicile, vidange, freins et diagnostic.', 'Car')
ON CONFLICT (slug) DO NOTHING;

-- Exemples d'artisans vérifiés à Dakar
INSERT INTO public.providers (
    slug, name, business_name, avatar, phone, whatsapp, category_slug, category_name, 
    headline, region_id, neighborhood, address, average_rating, review_count, 
    starting_price, response_time_minutes, is_available, verification_level, years_experience, bio, specialties
) VALUES
(
    'moussa-diop-plomberie-express',
    'Moussa Diop',
    'Diop Plomberie Express',
    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    '+221 77 123 45 67',
    '221771234567',
    'plomberie',
    'Plomberie & Sanitaire',
    'Maître artisan plombier certifié — Urgences 24/7 Dakar',
    'dakar',
    'Almadies',
    'Route des Almadies, Dakar',
    4.9,
    42,
    15000,
    10,
    true,
    'ID_AND_SKILLS',
    12,
    'Plus de 12 ans d''expérience dans le dépannage rapide et la plomberie sanitaire haut de gamme à Dakar.',
    ARRAY['Recherche de fuite', 'Chauffe-eau', 'Débouchage haute pression']
),
(
    'ibrahima-fall-clim-pro',
    'Ibrahima Fall',
    'Fall Climatisation Pro',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    '+221 78 456 78 90',
    '221784567890',
    'climatisation',
    'Climatisation & Froid',
    'Technicien frigoriste agréé — Split & Chambres froides',
    'dakar',
    'Ngor',
    'Ngor Village, Dakar',
    4.8,
    29,
    20000,
    15,
    true,
    'ID_AND_SKILLS',
    8,
    'Spécialiste de la maintenance et de l''installation de climatiseurs économiques inverter.',
    ARRAY['Recharge de gaz R410', 'Nettoyage antibactérien', 'Installation split']
)
ON CONFLICT (slug) DO NOTHING;

-- ==========================================================
-- SAMA BTP IMMO — BASE DE DONNÉES SUPABASE (PostgreSQL Multi-Tenant)
-- "Construisez, gérez et publiez. Tout au même endroit."
-- ==========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ORGANISATIONS (MULTI-TENANT)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo TEXT DEFAULT 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
    activity_type TEXT NOT NULL DEFAULT 'Agence immobilière' CHECK (activity_type IN (
        'Agence immobilière', 'Entreprise BTP', 'Promoteur immobilier',
        'Gestion immobilière', 'Architecture', 'Bureau d''études', 'Artisan', 'Autre'
    )),
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    address TEXT,
    city TEXT DEFAULT 'Dakar',
    region TEXT DEFAULT 'Dakar',
    whatsapp_number TEXT,
    tax_id TEXT,
    bio TEXT,
    plan TEXT DEFAULT 'PRO' CHECK (plan IN ('STARTER', 'PRO', 'BUSINESS')),
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'PENDING')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROFIL UTILISATEUR & RÔLES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY, -- Référence auth.users(id)
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    is_super_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'manager' CHECK (role IN (
        'super_admin', 'owner', 'admin', 'manager', 'agent', 'editor', 'accountant', 'viewer'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, user_id)
);

-- 4. MODULE IMMOBILIER (PROPERTIES & IMAGES)
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    reference TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    property_type TEXT NOT NULL CHECK (property_type IN (
        'Appartement', 'Villa', 'Maison', 'Terrain', 'Bureau', 'Magasin',
        'Immeuble', 'Studio', 'Chambre', 'Entrepôt', 'Local commercial', 'Résidence', 'Hôtel', 'Terrain agricole'
    )),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN (
        'Vente', 'Location', 'Location courte durée', 'Location longue durée'
    )),
    price NUMERIC(15, 2) NOT NULL,
    currency TEXT DEFAULT 'FCFA',
    surface NUMERIC(10, 2),
    rooms INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,
    floors INTEGER DEFAULT 1,
    floor_number INTEGER DEFAULT 0,
    address TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    commune TEXT,
    city TEXT DEFAULT 'Dakar',
    region TEXT DEFAULT 'Dakar',
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    description TEXT NOT NULL,
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
    owner_id UUID,
    agent_id UUID,
    status TEXT DEFAULT 'Disponible' CHECK (status IN (
        'Brouillon', 'Disponible', 'Réservé', 'Loué', 'Vendu', 'Masqué'
    )),
    views_count INTEGER DEFAULT 0,
    whatsapp_clicks INTEGER DEFAULT 0,
    inquiries_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. MODULE BTP & PROJETS DE CONSTRUCTION
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    reference TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    client_name TEXT,
    company_name TEXT,
    architect_name TEXT,
    engineer_name TEXT,
    address TEXT NOT NULL,
    city TEXT DEFAULT 'Dakar',
    description TEXT,
    budget NUMERIC(15, 2) DEFAULT 0,
    actual_expenses NUMERIC(15, 2) DEFAULT 0,
    start_date DATE,
    expected_end_date DATE,
    actual_end_date DATE,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status TEXT DEFAULT 'En cours' CHECK (status IN (
        'Planification', 'En préparation', 'En cours', 'Suspendu', 'Terminé', 'Annulé'
    )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    stage_number INTEGER NOT NULL CHECK (stage_number >= 1 AND stage_number <= 12),
    name TEXT NOT NULL,
    description TEXT,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    responsible TEXT,
    budget NUMERIC(15, 2) DEFAULT 0,
    expenses NUMERIC(15, 2) DEFAULT 0,
    start_date DATE,
    end_date DATE,
    status TEXT DEFAULT 'En attente' CHECK (status IN ('En attente', 'En cours', 'Terminé')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.construction_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    author_name TEXT NOT NULL,
    weather TEXT DEFAULT 'Ensoleillé',
    work_done TEXT NOT NULL,
    workers_count INTEGER DEFAULT 0,
    equipment_used TEXT,
    materials_used TEXT,
    incidents TEXT,
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.construction_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    log_id UUID REFERENCES public.construction_logs(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CLIENTS, PROPRIÉTAIRES, LOCATAIRES, CONTRATS & PAIEMENTS
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    client_type TEXT DEFAULT 'Acheteur' CHECK (client_type IN (
        'Acheteur', 'Locataire', 'Propriétaire', 'Investisseur', 'Entreprise', 'Autre'
    )),
    notes TEXT,
    source TEXT DEFAULT 'Site Web',
    agent_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    properties_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    entry_date DATE,
    lease_end_date DATE,
    monthly_rent NUMERIC(15, 2) NOT NULL,
    deposit_amount NUMERIC(15, 2) DEFAULT 0,
    status TEXT DEFAULT 'Actif' CHECK (status IN ('Actif', 'En retard', 'Contrat expiré', 'Sorti')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    contract_number TEXT UNIQUE NOT NULL,
    contract_type TEXT NOT NULL CHECK (contract_type IN (
        'Bail', 'Vente', 'Gestion immobilière', 'Prestation', 'Construction'
    )),
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    owner_id UUID REFERENCES public.owners(id) ON DELETE SET NULL,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    amount NUMERIC(15, 2) NOT NULL,
    terms TEXT,
    pdf_url TEXT,
    status TEXT DEFAULT 'Actif' CHECK (status IN ('Draft', 'Actif', 'Resilié', 'Terminé', 'Expiré')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    amount NUMERIC(15, 2) NOT NULL,
    payment_type TEXT NOT NULL CHECK (payment_type IN (
        'Loyer', 'Vente', 'Acompte', 'Prestation', 'Jalon BTP'
    )),
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    contract_id UUID REFERENCES public.contracts(id) ON DELETE SET NULL,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method TEXT DEFAULT 'Wave' CHECK (payment_method IN (
        'Espèces', 'Wave', 'Orange Money', 'Virement', 'Chèque', 'Autre'
    )),
    reference TEXT,
    status TEXT DEFAULT 'Payé' CHECK (status IN ('Payé', 'En attente', 'Annulé', 'En retard')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. PUBLICATIONS, ARTICLES & CMS
CREATE TABLE IF NOT EXISTS public.publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    primary_image TEXT,
    gallery TEXT[] DEFAULT ARRAY[]::TEXT[],
    price NUMERIC(15, 2),
    location TEXT,
    author TEXT NOT NULL,
    status TEXT DEFAULT 'Publié' CHECK (status IN (
        'Brouillon', 'En attente', 'Publié', 'Programmé', 'Archivé'
    )),
    publish_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    scheduled_date TIMESTAMP WITH TIME ZONE,
    seo_title TEXT,
    seo_description TEXT,
    keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. ANNUAIRE ENTREPRISES & PRESTATAIRES ARTISANS
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID UNIQUE REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo TEXT,
    description TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    address TEXT,
    city TEXT DEFAULT 'Dakar',
    specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.service_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    business_name TEXT,
    avatar TEXT,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    category_name TEXT NOT NULL,
    headline TEXT,
    region TEXT DEFAULT 'Dakar',
    neighborhood TEXT NOT NULL,
    address TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    starting_price NUMERIC(12, 2) DEFAULT 15000,
    is_available BOOLEAN DEFAULT true,
    verification_level TEXT DEFAULT 'ID_VERIFIED',
    years_experience INTEGER DEFAULT 5,
    bio TEXT,
    specialties TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. DOCUMENTS, NOTIFICATIONS, AUDIT LOGS & ABONNEMENTS
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Contrats', 'Factures', 'Quittances', 'Plans', 'Titres fonciers',
        'Pièces administratives', 'Rapports', 'Documents chantier', 'Autres'
    )),
    file_url TEXT NOT NULL,
    file_size INTEGER DEFAULT 1024,
    file_type TEXT DEFAULT 'pdf',
    uploaded_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    desired_date DATE,
    desired_time TEXT,
    message TEXT,
    status TEXT DEFAULT 'Nouvelle' CHECK (status IN ('Nouvelle', 'Planifiée', 'Confirmée', 'Terminée', 'Annulée')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.construction_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour les propriétés et publications publiées
CREATE POLICY "Public properties select" ON public.properties FOR SELECT USING (status = 'Disponible' OR status = 'Loué' OR status = 'Vendu');
CREATE POLICY "Public publications select" ON public.publications FOR SELECT USING (status = 'Publié');
CREATE POLICY "Public companies select" ON public.organizations FOR SELECT USING (true);

-- Isolation Multi-Tenant par organization_id pour les utilisateurs connectés
CREATE POLICY "Tenant properties isolation" ON public.properties FOR ALL USING (
    organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Tenant projects isolation" ON public.projects FOR ALL USING (
    organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Tenant clients isolation" ON public.clients FOR ALL USING (
    organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Tenant payments isolation" ON public.payments FOR ALL USING (
    organization_id IN (
        SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
    )
);

-- ==========================================================
-- SEED DATA (EXEMPLES SÉNÉGAL)
-- ==========================================================
INSERT INTO public.organizations (id, name, slug, activity_type, phone, email, website, city, region, whatsapp_number, bio, plan)
VALUES 
('11111111-1111-1111-1111-111111111111', 'ECS BTP & Immobilier', 'ecs-btp', 'Entreprise BTP', '+221 33 824 10 10', 'contact@ecs-btp.sn', 'https://ecs-btp.sn', 'Dakar', 'Dakar', '221778000000', 'Référence du bâtiment et travaux publics au Sénégal. Promotion et construction haut de gamme.', 'BUSINESS'),
('22222222-2222-2222-2222-222222222222', 'Noune Immobilier SARL', 'noune-immo', 'Agence immobilière', '+221 33 860 20 20', 'contact@noune-immo.sn', 'https://noune-immo.sn', 'Dakar', 'Dakar', '221776543210', 'Agence de gestion et de vente immobilière leader aux Almadies et Mermoz.', 'PRO')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.properties (
    id, organization_id, title, reference, slug, property_type, transaction_type, price, surface, rooms, bathrooms, address, neighborhood, city, description, features, status
) VALUES 
(
    'a1111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'Luxueux Appartement F4 avec Vue Mer aux Almadies',
    'REF-ALM-04',
    'appartement-f4-vue-mer-almadies',
    'Appartement',
    'Location',
    1200000,
    180,
    3,
    3,
    'Route des Almadies, en face de la Plage',
    'Almadies',
    'Dakar',
    'Superbe appartement F4 neuf d un grand standing aux Almadies. Cuisine équipée, groupe électrogène, piscine commune et sécurité 24h/24.',
    ARRAY['Climatisation', 'Piscine', 'Ascenseur', 'Sécurité 24/7', 'Parking sous-sol', 'Groupe électrogène'],
    'Disponible'
),
(
    'b2222222-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'Villa d Exception R+2 avec Piscine à Mermoz',
    'REF-MER-02',
    'villa-exception-r2-piscine-mermoz',
    'Villa',
    'Vente',
    350000000,
    450,
    5,
    5,
    'Mermoz Pyrotechnie',
    'Mermoz',
    'Dakar',
    'Magnifique villa d architecte R+2 construite avec des matériaux noble. Jardin privatif, grande piscine, garage 3 voitures.',
    ARRAY['Piscine privée', 'Jardin', 'Garage', 'Suite parentale avec dressing', 'Groupe électrogène'],
    'Disponible'
),
(
    'c3333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    'Parcelle de Terrain Viabilisée de 500m² à Rufisque',
    'REF-RUF-10',
    'terrain-viabilise-500m2-rufisque',
    'Terrain',
    'Vente',
    25000000,
    500,
    0,
    0,
    'Cite de la Paix',
    'Rufisque',
    'Dakar',
    'Terrain prêt pour construction directe avec Titre Foncier individuel. Quartier calme en plein essor.',
    ARRAY['Titre Foncier', 'Eau & Électricité', 'Accès goudronné'],
    'Disponible'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.projects (
    id, organization_id, name, reference, slug, client_name, architect_name, address, budget, actual_expenses, progress, status
) VALUES 
(
    'p1111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'Construction Résidence Résidentielle R+5 Point E',
    'PRJ-2026-PTE',
    'construction-residence-r5-point-e',
    'Groupe RealEstate West Africa',
    'Cabinet Architecture Ndoye & Co',
    'Rue de Diourbel, Point E, Dakar',
    450000000,
    280000000,
    65,
    'En cours'
),
(
    'p2222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Projet Immeuble Commercial R+11 Plateau',
    'PRJ-2026-PLT',
    'immeuble-commercial-r11-plateau',
    'Sénégal Invest SARL',
    'Atelier BTP & Design',
    'Avenue Léopold Sédar Senghor, Plateau, Dakar',
    1200000000,
    350000000,
    30,
    'En cours'
)
ON CONFLICT (id) DO NOTHING;

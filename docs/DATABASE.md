# Schéma Base de Données - SamaSolution (PostgreSQL / Supabase)

```sql
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des Profils Utilisateurs & Rôles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  role TEXT CHECK (role IN ('ADMIN', 'AGENCY', 'CLIENT')) DEFAULT 'CLIENT',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des Agences
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  address TEXT,
  city TEXT DEFAULT 'Dakar',
  verified BOOLEAN DEFAULT false,
  active_plan TEXT DEFAULT 'gratuit',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des Annonces Immobilières
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  period TEXT DEFAULT 'mois',
  type TEXT CHECK (type IN ('appartement', 'villa', 'studio', 'bureau', 'terrain', 'immeuble')) NOT NULL,
  transaction TEXT CHECK (transaction IN ('location', 'vente')) NOT NULL,
  status TEXT CHECK (status IN ('disponible', 'loue', 'vendu', 'en_attente')) DEFAULT 'disponible',
  neighborhood TEXT NOT NULL,
  city TEXT DEFAULT 'Dakar',
  bedrooms INT DEFAULT 0,
  bathrooms INT DEFAULT 0,
  area NUMERIC NOT NULL,
  furnished BOOLEAN DEFAULT false,
  parking BOOLEAN DEFAULT false,
  pool BOOLEAN DEFAULT false,
  air_conditioning BOOLEAN DEFAULT false,
  generator BOOLEAN DEFAULT false,
  water_tank BOOLEAN DEFAULT false,
  security_24 BOOLEAN DEFAULT true,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  views_count INT DEFAULT 0,
  whatsapp_clicks INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des Baux & Gestion Locative
CREATE TABLE leases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_name TEXT NOT NULL,
  tenant_phone TEXT NOT NULL,
  monthly_rent NUMERIC NOT NULL,
  deposit_amount NUMERIC NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  payment_status TEXT DEFAULT 'a_jour',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table des Prospects & Visites (CRM)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  preferred_date DATE,
  status TEXT DEFAULT 'nouveau',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

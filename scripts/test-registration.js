const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://anlvzshxnokcnqikdhep.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHZ6c2h4bm9rY25xaWtkaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjM2MTUsImV4cCI6MjEwMjM5OTYxNX0.Qu2M1ontRHuzpw-ucJK6NMP_4Z6hEmJHZEzOOomuoXQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testRegistration() {
  console.log('Testing Artisan Registration in Supabase...');

  const testArtisan = {
    slug: 'moussa-diop-electricite-' + Date.now().toString().slice(-4),
    name: 'Moussa Diop',
    business_name: 'Diop Électricité & Dépannage',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    phone: '+221 77 654 32 10',
    whatsapp: '221776543210',
    category_slug: 'electricite',
    category_name: 'Électricité & Énergie',
    region_id: 'dakar',
    neighborhood: 'Almadies',
    address: 'Almadies, Dakar',
    is_available: true,
    verification_level: 'ID_VERIFIED',
    average_rating: 5.0,
    review_count: 0,
    starting_price: 15000,
    response_time_minutes: 15,
    bio: 'Artisan électricien professionnel qualifié pour toute installation et dépannage à Dakar.',
    specialties: ['Dépannage d\'urgence', 'Tableau électrique', 'Devis gratuit sur WhatsApp']
  };

  const { data, error } = await supabase
    .from('providers')
    .insert([testArtisan])
    .select()
    .single();

  if (error) {
    console.error('❌ Registration Error:', error.message);
  } else {
    console.log('✅ Successfully inserted artisan into Supabase Cloud!');
    console.log('ID:', data.id);
    console.log('Name:', data.name);
    console.log('Business:', data.business_name);
    console.log('Slug:', data.slug);
  }

  // Fetch all providers
  const { data: allPros, error: fetchErr } = await supabase
    .from('providers')
    .select('id, name, business_name, category_name, neighborhood');

  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
  } else {
    console.log(`\n📋 Current live providers in Supabase (${allPros.length}) :`);
    console.table(allPros);
  }
}

testRegistration();

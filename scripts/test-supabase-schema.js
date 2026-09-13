const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anlvzshxnokcnqikdhep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHZ6c2h4bm9rY25xaWtkaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjM2MTUsImV4cCI6MjEwMjM5OTYxNX0.Qu2M1ontRHuzpw-ucJK6NMP_4Z6hEmJHZEzOOomuoXQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const testArtisan = {
    slug: 'test-artisan-schema',
    name: 'Artisan Test',
    business_name: 'Atelier Test',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80',
    phone: '+221 77 111 22 33',
    whatsapp: '221771112233',
    category_slug: 'menuiserie',
    category_name: 'Menuiserie Bois & Aluminium',
    region_id: 'dakar',
    neighborhood: 'Grand Yoff',
    address: 'Grand Yoff, Dakar',
    average_rating: 5,
    review_count: 0,
    starting_price: 15000,
    response_time_minutes: 15,
    is_available: true,
    verification_level: 'ID_VERIFIED',
    years_experience: 5,
    bio: 'Artisan menuisier qualifié.',
    specialties: ['Menuiserie', 'Sur mesure'],
  };

  const { data, error } = await supabase.from('providers').insert([testArtisan]).select().single();
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Inserted successfully:', data);
    // clean up
    await supabase.from('providers').delete().eq('id', data.id);
    console.log('Cleaned up successfully.');
  }
}

testInsert();

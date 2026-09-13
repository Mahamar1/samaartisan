const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anlvzshxnokcnqikdhep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHZ6c2h4bm9rY25xaWtkaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjM2MTUsImV4cCI6MjEwMjM5OTYxNX0.Qu2M1ontRHuzpw-ucJK6NMP_4Z6hEmJHZEzOOomuoXQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('providers').select('*');
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Total providers in Supabase:', data.length);
  data.forEach((p, idx) => {
    console.log(`[${idx}] id: ${p.id}, slug: ${p.slug}, name: ${p.name}, business: ${p.business_name}, phone: ${p.phone}`);
  });
}

check();

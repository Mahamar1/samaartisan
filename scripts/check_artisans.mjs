import { createClient } from '@supabase/supabase-js';

const url = 'https://anlvzshxnokcnqikdhep.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHZ6c2h4bm9rY25xaWtkaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjM2MTUsImV4cCI6MjEwMjM5OTYxNX0.Qu2M1ontRHuzpw-ucJK6NMP_4Z6hEmJHZEzOOomuoXQ';

const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase.from('providers').select('*');
  if (error) {
    console.error('Error fetching providers:', error);
    return;
  }

  console.log('=== CONTENU DE LA TABLE PROVIDERS (' + data.length + ' enregistrements) ===');
  data.forEach((item, index) => {
    console.log(`\n[Enregistrement ${index + 1}] ID: ${item.id} | Slug: ${item.slug}`);
    console.log(`  Nom: ${item.name}`);
    console.log(`  Business: ${item.business_name}`);
    console.log(`  Catégorie Name: ${item.category_name} | Catégorie Slug: ${item.category_slug}`);
    console.log(`  Téléphone: ${item.phone}`);
    console.log(`  Quartier: ${item.neighborhood}`);
    console.log(`  Vérification: ${item.verification_level}`);
    console.log(`  Bio: ${item.bio}`);
  });
}

main();

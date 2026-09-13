const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anlvzshxnokcnqikdhep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHZ6c2h4bm9rY25xaWtkaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjM2MTUsImV4cCI6MjEwMjM5OTYxNX0.Qu2M1ontRHuzpw-ucJK6NMP_4Z6hEmJHZEzOOomuoXQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearTestProviders() {
  const { data, error } = await supabase.from('providers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) {
    console.error('Delete error:', error);
  } else {
    console.log('Cleared test providers from Supabase successfully.');
  }
}

clearTestProviders();

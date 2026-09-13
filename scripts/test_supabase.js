const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anlvzshxnokcnqikdhep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubHZ6c2h4bm9rY25xaWtkaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4MjM2MTUsImV4cCI6MjEwMjM5OTYxNX0.Qu2M1ontRHuzpw-ucJK6NMP_4Z6hEmJHZEzOOomuoXQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
  console.log('Testing Supabase Cloud Connection...');
  
  try {
    // 1. Check providers table
    const { data: providers, error: pErr } = await supabase.from('providers').select('id, name, phone').limit(5);
    console.log('Providers sample:', providers, pErr ? `Error: ${pErr.message}` : `OK (${providers ? providers.length : 0} items)`);

    // 2. Check registered_accounts table
    const { data: accounts, error: aErr } = await supabase.from('registered_accounts').select('id, name, phone').limit(5);
    console.log('Accounts sample:', accounts, aErr ? `Error: ${aErr.message}` : `OK (${accounts ? accounts.length : 0} items)`);

    // 3. Check contact_messages table
    const { data: messages, error: mErr } = await supabase.from('contact_messages').select('id, full_name, subject').limit(5);
    console.log('Contact Messages sample:', messages, mErr ? `Error: ${mErr.message}` : `OK (${messages ? messages.length : 0} items)`);

    // 4. Check pending_artisans table
    const { data: pending, error: pendErr } = await supabase.from('pending_artisans').select('id, name, phone').limit(5);
    console.log('Pending Artisans sample:', pending, pendErr ? `Error: ${pendErr.message}` : `OK (${pending ? pending.length : 0} items)`);

  } catch (err) {
    console.error('Connection error:', err);
  }
}

testSupabase();

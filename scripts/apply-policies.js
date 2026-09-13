const fs = require('fs');

async function run() {
  const query = `
    DROP POLICY IF EXISTS "Providers can be updated" ON public.providers;
    DROP POLICY IF EXISTS "Providers can be deleted" ON public.providers;
    CREATE POLICY "Providers can be updated" ON public.providers FOR UPDATE USING (true);
    CREATE POLICY "Providers can be deleted" ON public.providers FOR DELETE USING (true);
  `;

  const res = await fetch('https://api.supabase.com/v1/projects/anlvzshxnokcnqikdhep/database/query', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SUPABASE_ACCESS_TOKEN || ''}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  console.log('Result:', data);
}

run().catch(console.error);

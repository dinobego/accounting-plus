import { createClient } from '@supabase/supabase-js';
import { createSeedStore } from '../src/lib/cms/seed';
import { supabaseAnonKey, supabaseUrl } from '../src/lib/cms/supabase';

async function main() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const store = createSeedStore();
  console.log('seeding', store.posts.length, 'posts and', store.services.length, 'services');
  const { data, error } = await supabase.rpc('cms_save_admin', {
    secret: 'admin123',
    payload: store,
  });
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.log('saved posts', data?.posts?.length, 'services', data?.services?.length);
}

main();

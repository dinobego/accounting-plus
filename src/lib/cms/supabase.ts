import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://fpdrxmpymvkvtjweizwf.supabase.co';

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZHJ4bXB5bXZrdnRqd2VpendmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMTk5NzIsImV4cCI6MjEwODc5NTk3Mn0.lyMmDkCSLmjDJpr6Q1tOigEDc3--PaM7QNFc7z4-Dj4';

export function getSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getCmsSecret() {
  return process.env.CMS_WRITE_SECRET || process.env.ADMIN_PASSWORD || 'admin123';
}

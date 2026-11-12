/**
 * Single shared Supabase client (or null in demo mode).
 * Import `supabase` from here — never create a second client.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, isBackendConfigured } from '@/config/env';

export const supabase: SupabaseClient | null = isBackendConfigured
  ? createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: { persistSession: false }, // guests never sign in
    })
  : null;

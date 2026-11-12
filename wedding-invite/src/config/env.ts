/**
 * Environment configuration — read once, validated, and exported as plain values.
 * Vite exposes only variables prefixed with VITE_. See .env.example.
 */

const read = (key: string): string => ((import.meta.env[key] as string | undefined) ?? '').trim();

export const env = {
  supabaseUrl: read('VITE_SUPABASE_URL'),
  supabaseAnonKey: read('VITE_SUPABASE_ANON_KEY'),
  supabaseBucket: read('VITE_SUPABASE_BUCKET') || 'wedding-photos',
  siteUrl: read('VITE_SITE_URL').replace(/\/+$/, ''),
};

/** True when Supabase credentials are present → real shared storage is used. */
export const isBackendConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey);

if (import.meta.env.DEV && !isBackendConfigured) {
  // A friendly hint in the console while developing.
  console.info(
    '[wedding] Supabase is not configured — gallery & RSVP run in demo mode (browser-only storage). See .env.example.',
  );
}

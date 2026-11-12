/**
 * RSVP service — saves responses to the Supabase `rsvps` table,
 * or to the browser (demo mode) when Supabase isn't configured.
 * The couple reads responses in the Supabase dashboard (Table editor → rsvps),
 * and can export them to CSV from there.
 */
import { isBackendConfigured } from '@/config/env';
import { supabase } from './supabaseClient';
import { idbPut } from './localDb';
import { createLogger } from '@/utils/logger';

const log = createLogger('rsvp');

export interface RsvpInput {
  fullName: string;
  email?: string;
  phone?: string;
  attending: boolean;
  guestCount: number;
  dietary?: string;
  message?: string;
}

export async function submitRsvp(input: RsvpInput): Promise<void> {
  const row = {
    full_name: input.fullName.trim(),
    email: input.email?.trim() || null,
    phone: input.phone?.trim() || null,
    attending: input.attending,
    guest_count: input.attending ? input.guestCount : 0,
    dietary: input.dietary?.trim() || null,
    message: input.message?.trim() || null,
  };

  if (!isBackendConfigured) {
    await idbPut('rsvps', { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...row });
    log.debug('saved RSVP locally (demo mode)', row);
    return;
  }

  // No .select() here: guests may insert but not read RSVPs (see setup.sql).
  const { error } = await supabase!.from('rsvps').insert(row);
  if (error) {
    log.error('insert failed', error);
    throw new Error('We couldn’t send your RSVP just now. Please try again in a moment.');
  }
}

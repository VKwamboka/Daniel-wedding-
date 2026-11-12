/** Shown on gallery/RSVP while Supabase isn't connected, so nobody mistakes demo storage for the real thing. */
import { isBackendConfigured } from '@/config/env';

export function DemoBanner({ what }: { what: string }) {
  if (isBackendConfigured) return null;
  return (
    <p role="note" className="mx-auto mb-8 max-w-xl rounded-2xl border border-gold-soft/60 bg-ivory px-4 py-3 text-center font-sans text-xs leading-relaxed text-plum-700">
      <strong className="font-medium">Demo mode:</strong> {what} are saved only in this browser. Connect Supabase (see README) to share them with everyone.
    </p>
  );
}

import { useEffect, useState } from 'react';
import { timeUntil, type TimeParts } from '@/utils/date';

/** Ticks once per second until `targetISO`. */
export function useCountdown(targetISO: string): TimeParts {
  const target = new Date(targetISO);
  const [parts, setParts] = useState(() => timeUntil(target));

  useEffect(() => {
    const id = window.setInterval(() => setParts(timeUntil(target)), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetISO]);

  return parts;
}

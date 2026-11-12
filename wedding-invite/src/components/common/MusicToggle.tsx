/** Floating play/mute control. Music never starts until the guest taps this. */
import { motion } from 'framer-motion';
import { useAmbientMusic } from '@/hooks/useAmbientMusic';
import { SoundOffIcon, SoundOnIcon } from './Icons';

export function MusicToggle() {
  const { playing, toggle } = useAmbientMusic();
  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-lavender-300 bg-ivory/90 text-plum-700 shadow-card backdrop-blur transition hover:bg-lavender-100"
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
    >
      {playing && <span className="absolute inset-0 animate-ping rounded-full bg-lavender-300/40" aria-hidden="true" />}
      {playing ? <SoundOnIcon className="h-5 w-5" /> : <SoundOffIcon className="h-5 w-5" />}
    </motion.button>
  );
}

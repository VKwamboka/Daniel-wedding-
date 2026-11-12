/**
 * Background music that never starts on its own.
 *  • If `wedding.music.src` points to an mp3 in /public/audio, that file loops.
 *  • Otherwise a soft music-box melody is synthesised with the Web Audio API,
 *    so the play/mute control works out of the box with no audio licensing.
 * Browsers only allow audio after a user gesture — the toggle button is that gesture.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { wedding } from '@/config/wedding.config';
import { createLogger } from '@/utils/logger';

const log = createLogger('audio');

// A gentle arpeggio in C major (frequencies in Hz). 0 = rest.
const MELODY = [523.25, 659.25, 783.99, 659.25, 587.33, 739.99, 880, 739.99, 523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 0];
const NOTE_SECONDS = 0.42;

export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const timer = useRef<number | null>(null);

  const playSynth = useCallback(() => {
    const ac = ctx.current ?? new AudioContext();
    ctx.current = ac;
    void ac.resume();
    let step = 0;
    const tick = () => {
      const freq = MELODY[step % MELODY.length];
      step += 1;
      if (!freq) return;
      // Music-box timbre: a sine + quiet octave, fast attack, long decay.
      const t = ac.currentTime;
      const gain = ac.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.07, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      gain.connect(ac.destination);
      [1, 2].forEach((mult, i) => {
        const osc = ac.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq * mult;
        const g = ac.createGain();
        g.gain.value = i === 0 ? 1 : 0.25;
        osc.connect(g).connect(gain);
        osc.start(t);
        osc.stop(t + 1.7);
      });
    };
    tick();
    timer.current = window.setInterval(tick, NOTE_SECONDS * 1000);
  }, []);

  const stopSynth = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  const toggle = useCallback(async () => {
    if (playing) {
      audioEl.current?.pause();
      stopSynth();
      setPlaying(false);
      return;
    }
    try {
      if (wedding.music.src) {
        audioEl.current ??= Object.assign(new Audio(wedding.music.src), { loop: true, volume: 0.5 });
        await audioEl.current.play();
      } else {
        playSynth();
      }
      setPlaying(true);
    } catch (err) {
      log.warn('playback blocked or failed', err);
    }
  }, [playing, playSynth, stopSynth]);

  // Clean up on unmount
  useEffect(() => () => {
    stopSynth();
    audioEl.current?.pause();
    void ctx.current?.close();
  }, [stopSynth]);

  return { playing, toggle };
}

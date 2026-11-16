let audioCtx: AudioContext | null = null;
let isMutedGlobal = false;

export function setSoundMuted(muted: boolean) {
  isMutedGlobal = muted;
}

function getContext(): AudioContext | null {
  if (isMutedGlobal || typeof window === 'undefined') {
    return null;
  }
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainPeak = 0.08,
  delay = 0
) {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playClick() {
  playTone(620, 0.06, 'triangle', 0.05);
}

export function playHint() {
  playTone(520, 0.09, 'sine', 0.06, 0);
  playTone(680, 0.11, 'sine', 0.05, 0.06);
}

export function playCorrect() {
  playTone(523.25, 0.12, 'triangle', 0.08, 0);
  playTone(659.25, 0.12, 'triangle', 0.08, 0.08);
  playTone(783.99, 0.18, 'triangle', 0.09, 0.16);
}

export function playWrong() {
  playTone(260, 0.14, 'sawtooth', 0.05, 0);
  playTone(195, 0.2, 'sawtooth', 0.05, 0.11);
}

export function playVictory() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((n, idx) => {
    playTone(n, 0.2, 'triangle', 0.08, idx * 0.09);
  });
}

// A tiny synthesized "plop", like a berry dropping into thick açaí: a quick
// upward pitch sweep (the bubble) over a short low thump (the body). The
// pitch varies a little each time so repeated clicks don't sound robotic.
// No audio file needed, and since it's always triggered from a click handler
// (a user gesture), autoplay restrictions don't apply.
let audioCtx;

function getContext() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) audioCtx = new Ctx();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function envelope(gain, at, peak, attack, decay) {
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
}

export function playPlop() {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const master = ctx.createGain();
    master.gain.value = 0.6;
    master.connect(ctx.destination);

    const t = ctx.currentTime + 0.01;

    // The bubble: sine sweeping up fast.
    const base = 260 + Math.random() * 80;
    const bubble = ctx.createOscillator();
    const bubbleGain = ctx.createGain();
    bubble.type = "sine";
    bubble.frequency.setValueAtTime(base, t);
    bubble.frequency.exponentialRampToValueAtTime(base * 3.2, t + 0.07);
    envelope(bubbleGain, t, 0.5, 0.004, 0.09);
    bubble.connect(bubbleGain);
    bubbleGain.connect(master);
    bubble.start(t);
    bubble.stop(t + 0.15);

    // The body: low thump dropping in pitch.
    const body = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    body.frequency.setValueAtTime(140, t);
    body.frequency.exponentialRampToValueAtTime(70, t + 0.08);
    envelope(bodyGain, t, 0.35, 0.003, 0.08);
    body.connect(bodyGain);
    bodyGain.connect(master);
    body.start(t);
    body.stop(t + 0.12);
  } catch {
    // Sound is a nice-to-have — never let it break the interaction.
  }
}

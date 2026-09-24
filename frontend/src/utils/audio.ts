/**
 * Mahalla Audio Engine using browser Web Audio API
 * Generates delicate natural ambient sounds (morning breeze, distant birds)
 * and warm melodic chime for choices.
 * Default is OFF. No autoplay.
 */

class MahallaAudioEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private masterGain: GainNode | null = null;
  private ambienceInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.initContext();
      this.startAmbience();
      this.playGentleChime([523.25, 659.25, 783.99]); // C Major greeting chord
    } else {
      this.stopAmbience();
    }
    return this.isEnabled;
  }

  public getStatus(): boolean {
    return this.isEnabled;
  }

  public playChoiceSound() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    // Warm gentle marimba-like acoustic chime (E5 - G5 - B5)
    this.playGentleChime([659.25, 783.99, 987.77]);
  }

  public playSuccessSound() {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    // Harmonious chord for completing day
    this.playGentleChime([523.25, 659.25, 783.99, 1046.50]);
  }

  private playGentleChime(frequencies: number[]) {
    if (!this.ctx || !this.masterGain) return;

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, this.ctx!.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx!.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(this.ctx!.currentTime + idx * 0.08);
      osc.stop(this.ctx!.currentTime + idx * 0.08 + 1.3);
    });
  }

  private startAmbience() {
    if (!this.ctx || !this.masterGain) return;

    // Periodic distant bird chirp every 6-12 seconds
    this.ambienceInterval = window.setInterval(() => {
      if (this.isEnabled && Math.random() > 0.3) {
        this.playBirdTweet();
      }
    }, 7000);
  }

  private playBirdTweet() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 2200 + Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 200, now + 0.12);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  private stopAmbience() {
    if (this.ambienceInterval) {
      clearInterval(this.ambienceInterval);
      this.ambienceInterval = null;
    }
  }
}

export const sound = new MahallaAudioEngine();

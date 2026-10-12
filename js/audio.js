/**
 * ==========================================================================
 * 🎵 AUDIO SYNTHESIS & SOUND FX ENGINE
 * 👨‍💻 DEVELOPED & TUNED BY: HoangTung24Jul
 * 🔒 COPYRIGHT (C) 2026 HoangTung24Jul. ALL RIGHTS RESERVED.
 * 💡 Hệ thống tổng hợp âm thanh Web Audio API & hiệu ứng mô phỏng hạt nhân
 * ==========================================================================
 */
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.analyser = null;
        this.dataArray = null;
        this.ringtoneTimer = null;
        this.isRinging = false;
        this.voiceAudio = null;
        this.isSynthPlaying = false;
        this.synthTimer = null;
        this.audioSourceNode = null;

        // Chernobyl siren & geiger state
        this.isMeltdownSirenOn = false;
        this.sirenTimer = null;
        this.geigerTimer = null;
        this.isGeigerOn = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 256;
            const bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(bufferLength);
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Tiếng click nút bấm bong bóng
    playClick() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(580, now);
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.09);
        } catch (e) {}
    }

    // Tiếng bước chân chạy dồn dập (Cinematic footsteps)
    playFootsteps(count = 6) {
        this.init();
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                try {
                    const now = this.ctx.currentTime;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(110 + (i % 2) * 20, now);
                    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

                    gain.gain.setValueAtTime(0.3, now);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(now);
                    osc.stop(now + 0.09);
                } catch (e) {}
            }, i * 160);
        }
    }

    // Tiếng đập mạnh nút an toàn khẩn cấp trên bàn máy tính
    playButtonSlam() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(220, now);
            osc1.frequency.exponentialRampToValueAtTime(60, now + 0.2);

            osc2.type = 'square';
            osc2.frequency.setValueAtTime(880, now);
            osc2.frequency.exponentialRampToValueAtTime(120, now + 0.25);

            gain.gain.setValueAtTime(0.55, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.3);
            osc2.stop(now + 0.3);
        } catch (e) {}
    }

    // Tiếng camera Whoosh phóng to 3D vào màn hình
    playCameraWhoosh() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const filter = this.ctx.createBiquadFilter();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.6);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, now);
            filter.frequency.exponentialRampToValueAtTime(2500, now + 0.6);

            gain.gain.setValueAtTime(0.05, now);
            gain.gain.linearRampToValueAtTime(0.4, now + 0.4);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.75);
        } catch (e) {}
    }

    // Tiếng máy đo bức xạ Geiger counter tíc-tắc dồn dập
    startGeigerCounter() {
        this.init();
        this.isGeigerOn = true;
        const tick = () => {
            if (!this.isGeigerOn) return;
            try {
                const now = this.ctx.currentTime;
                const bufferSize = this.ctx.sampleRate * 0.005;
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
                }
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;

                const filter = this.ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.value = 2400;

                const gain = this.ctx.createGain();
                gain.gain.value = 0.12;

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(this.ctx.destination);

                noise.start(now);
            } catch (e) {}

            const nextInterval = Math.random() * 90 + 35;
            this.geigerTimer = setTimeout(tick, nextInterval);
        };
        tick();
    }

    stopGeigerCounter() {
        this.isGeigerOn = false;
        if (this.geigerTimer) {
            clearTimeout(this.geigerTimer);
            this.geigerTimer = null;
        }
    }

    // Còi hú báo động hạt nhân Chernobyl
    startMeltdownSiren() {
        this.init();
        if (this.isMeltdownSirenOn) return;
        this.isMeltdownSirenOn = true;

        const loopSiren = () => {
            if (!this.isMeltdownSirenOn) return;
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(420, now);
                osc.frequency.exponentialRampToValueAtTime(760, now + 0.9);
                osc.frequency.exponentialRampToValueAtTime(420, now + 1.8);

                const filter = this.ctx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 1200;

                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.12, now + 0.2);
                gain.gain.setValueAtTime(0.12, now + 1.6);
                gain.gain.linearRampToValueAtTime(0.01, now + 1.8);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 1.85);
            } catch (e) {}

            this.sirenTimer = setTimeout(() => {
                if (this.isMeltdownSirenOn) loopSiren();
            }, 1900);
        };
        loopSiren();
    }

    stopMeltdownSiren() {
        this.isMeltdownSirenOn = false;
        if (this.sirenTimer) {
            clearTimeout(this.sirenTimer);
            this.sirenTimer = null;
        }
    }

    // Tiếng đập thanh điều khiển AZ-5
    playHeavyClank() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);

            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.42);
        } catch (e) {}
    }

    // Tiếng xả khí làm mát lò phản ứng
    playSteamRelease() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            const bufferSize = this.ctx.sampleRate * 1.5;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.7));
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1200, now);
            filter.frequency.linearRampToValueAtTime(600, now + 1.4);

            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.28, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.45);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            noise.start(now);
            noise.stop(now + 1.5);
        } catch (e) {}
    }

    // Nhập sai mật khẩu
    playError() {
        try {
            this.init();
            const now = this.ctx.currentTime;
            const osc1 = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(160, now);
            osc2.type = 'sawtooth';
            osc2.frequency.setValueAtTime(168, now);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 0.36);
            osc2.stop(now + 0.36);
        } catch (e) {}
    }

    // Âm thanh khải hoàn khi giải cứu thành công
    playSuccess() {
        try {
            this.init();
            const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
            notes.forEach((freq, i) => {
                const now = this.ctx.currentTime + (i * 0.1);
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 0.56);
            });
        } catch (e) {}
    }

    // Chuông FaceTime Marimba
    startRingtone() {
        this.init();
        this.isRinging = true;
        const playChimePattern = () => {
            if (!this.isRinging) return;
            const chord = [783.99, 987.77, 1174.66, 1318.51, 1174.66];
            chord.forEach((freq, idx) => {
                const now = this.ctx.currentTime + (idx * 0.12);
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 0.25);
            });
            this.ringtoneTimer = setTimeout(() => {
                if (this.isRinging) playChimePattern();
            }, 1800);
        };
        playChimePattern();
    }

    stopRingtone() {
        this.isRinging = false;
        if (this.ringtoneTimer) {
            clearTimeout(this.ringtoneTimer);
            this.ringtoneTimer = null;
        }
    }

    // Voice setup
    setupVoice(audioSrc, onEndedCallback, onTimeUpdate) {
        if (!this.voiceAudio) {
            this.voiceAudio = new Audio();
            this.voiceAudio.preload = 'auto';
        }
        this.voiceAudio.src = audioSrc;

        this.voiceAudio.onended = () => {
            if (onEndedCallback) onEndedCallback();
        };

        this.voiceAudio.ontimeupdate = () => {
            if (onTimeUpdate) {
                onTimeUpdate(this.voiceAudio.currentTime, this.voiceAudio.duration || 0);
            }
        };

        this.voiceAudio.onerror = (e) => {
            console.log('Voice audio element fallback', e);
        };

        this.voiceAudio.onplay = () => {
            this.init();
            try {
                if (!this.audioSourceNode && this.ctx) {
                    this.audioSourceNode = this.ctx.createMediaElementSource(this.voiceAudio);
                    this.audioSourceNode.connect(this.analyser);
                    this.analyser.connect(this.ctx.destination);
                }
            } catch (e) {}
        };
    }

    playFallbackHappyBirthday(onEnded) {
        this.init();
        this.isSynthPlaying = true;
        const melody = [
            { note: 523.25, dur: 0.35, pause: 0.1 },
            { note: 523.25, dur: 0.35, pause: 0.1 },
            { note: 587.33, dur: 0.7, pause: 0.1 },
            { note: 523.25, dur: 0.7, pause: 0.1 },
            { note: 698.46, dur: 0.7, pause: 0.1 },
            { note: 659.25, dur: 1.1, pause: 0.2 },
            { note: 523.25, dur: 0.35, pause: 0.1 },
            { note: 523.25, dur: 0.35, pause: 0.1 },
            { note: 587.33, dur: 0.7, pause: 0.1 },
            { note: 523.25, dur: 0.7, pause: 0.1 },
            { note: 783.99, dur: 0.7, pause: 0.1 },
            { note: 698.46, dur: 1.1, pause: 0.2 },
            { note: 523.25, dur: 0.35, pause: 0.1 },
            { note: 523.25, dur: 0.35, pause: 0.1 },
            { note: 1046.50, dur: 0.7, pause: 0.1 },
            { note: 880.00, dur: 0.7, pause: 0.1 },
            { note: 698.46, dur: 0.7, pause: 0.1 },
            { note: 659.25, dur: 0.7, pause: 0.1 },
            { note: 587.33, dur: 0.9, pause: 0.2 },
            { note: 932.33, dur: 0.35, pause: 0.1 },
            { note: 932.33, dur: 0.35, pause: 0.1 },
            { note: 880.00, dur: 0.7, pause: 0.1 },
            { note: 698.46, dur: 0.7, pause: 0.1 },
            { note: 783.99, dur: 0.7, pause: 0.1 },
            { note: 698.46, dur: 1.5, pause: 0.5 },
        ];

        let offset = 0;
        melody.forEach((item, index) => {
            const time = this.ctx.currentTime + offset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(item.note, time);

            gain.gain.setValueAtTime(0.22, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + item.dur);

            osc.connect(gain);
            if (this.analyser) {
                gain.connect(this.analyser);
                this.analyser.connect(this.ctx.destination);
            } else {
                gain.connect(this.ctx.destination);
            }

            osc.start(time);
            osc.stop(time + item.dur);

            offset += item.dur + item.pause;

            if (index === melody.length - 1) {
                this.synthTimer = setTimeout(() => {
                    this.isSynthPlaying = false;
                    if (onEnded) onEnded();
                }, (offset + 0.5) * 1000);
            }
        });
    }

    stopFallbackMelody() {
        this.isSynthPlaying = false;
        if (this.synthTimer) {
            clearTimeout(this.synthTimer);
            this.synthTimer = null;
        }
    }

    getAudioFrequencyData() {
        if (!this.analyser) return null;
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray;
    }
}

window.soundEngine = new SoundEngine();

/**
 * Web Audio API Synthesizer - Nhạc Melody 20/11 (Nhẹ nhàng, trong trẻo, 0 KB tải về)
 * Giai điệu bất hủ: "Bụi Phấn" (Vũ Hoàng - Lê Văn Lộc) & "Thầy Cô Cho Em Mùa Xuân"
 * Sử dụng bộ tổng hợp âm thanh Music Box / Soft Rhodes Piano với âm vang ấm áp.
 */

interface NoteEvent {
  note: string; // Tên nốt (ví dụ: 'C4', 'E4', 'G4')
  duration: number; // Độ dài (tính bằng phách, e.g. 1 = 1/4 nốt đen)
  harmony?: string[]; // Nốt đệm hòa âm
}

export interface SongTrack {
  id: string;
  title: string;
  author: string;
  tempo: number; // bpm
  notes: NoteEvent[];
}

// Bảng tần số nốt nhạc chuẩn (Hz)
const NOTE_FREQS: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, 'C#4': 277.18, D4: 293.66, 'D#4': 311.13, E4: 329.63, F4: 349.23,
  'F#4': 369.99, G4: 392.00, 'G#4': 415.30, A4: 440.00, 'A#4': 466.16, B4: 493.88,
  C5: 523.25, 'C#5': 554.37, D5: 587.33, 'D#5': 622.25, E5: 659.25, F5: 698.46,
  'F#5': 739.99, G5: 783.99, 'G#5': 830.61, A5: 880.00, 'A#5': 932.33, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51,
  REST: 0,
};

export const TEACHER_DAY_SONGS: SongTrack[] = [
  {
    id: 'bui-phan',
    title: 'Bụi Phấn',
    author: 'Vũ Hoàng & Lê Văn Lộc',
    tempo: 78, // Chậm rãi, tha thiết, êm dịu
    notes: [
      // Câu 1: Khi thầy viết bảng, bụi phấn rơi rơi
      { note: 'E4', duration: 1, harmony: ['C3', 'G3'] },
      { note: 'G4', duration: 1 },
      { note: 'A4', duration: 1 },
      { note: 'C5', duration: 1.5, harmony: ['A3', 'E4'] },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 2, harmony: ['C3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      { note: 'C5', duration: 1, harmony: ['F3', 'A3'] },
      { note: 'D5', duration: 1 },
      { note: 'C5', duration: 1.5, harmony: ['G3', 'B3'] },
      { note: 'A4', duration: 1 },
      { note: 'G4', duration: 2, harmony: ['C3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      // Câu 2: Có hạt bụi nào rơi trên bục giảng
      { note: 'E4', duration: 1, harmony: ['A3', 'C4'] },
      { note: 'G4', duration: 1 },
      { note: 'A4', duration: 1 },
      { note: 'C5', duration: 1.5, harmony: ['F3', 'C4'] },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 2, harmony: ['C3', 'G3'] },
      { note: 'REST', duration: 0.5 },

      // Có hạt bụi nào rơi trên tóc thầy
      { note: 'E4', duration: 1, harmony: ['D3', 'F3'] },
      { note: 'G4', duration: 1 },
      { note: 'E4', duration: 1, harmony: ['G3', 'B3'] },
      { note: 'D4', duration: 1.5 },
      { note: 'C4', duration: 2.5, harmony: ['C3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      // Điệp khúc: Em yêu phút giây này, thầy em tóc như bạc thêm
      { note: 'C5', duration: 1, harmony: ['F3', 'C4'] },
      { note: 'C5', duration: 0.5 },
      { note: 'D5', duration: 0.5 },
      { note: 'E5', duration: 1.5, harmony: ['C4', 'G4'] },
      { note: 'D5', duration: 0.5 },
      { note: 'C5', duration: 1.5, harmony: ['A3', 'E4'] },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 2, harmony: ['C3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      // Bạc thêm vì bụi phấn, để cho em bài học hay
      { note: 'C5', duration: 1, harmony: ['F3', 'A3'] },
      { note: 'C5', duration: 0.5 },
      { note: 'D5', duration: 0.5 },
      { note: 'E5', duration: 1.5, harmony: ['G3', 'D4'] },
      { note: 'D5', duration: 1 },
      { note: 'C5', duration: 2, harmony: ['C3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      // Mai sau lớn nên người, làm sao có thể nào quên
      { note: 'E4', duration: 1, harmony: ['A3', 'C4'] },
      { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'C5', duration: 1.5, harmony: ['F3', 'C4'] },
      { note: 'D5', duration: 0.5 },
      { note: 'E5', duration: 1.5, harmony: ['C4', 'G4'] },
      { note: 'D5', duration: 0.5 },
      { note: 'C5', duration: 2, harmony: ['A3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      // Ngày xưa thầy dạy dỗ khi em tuổi còn thơ
      { note: 'D5', duration: 1, harmony: ['F3', 'A3'] },
      { note: 'E5', duration: 1 },
      { note: 'D5', duration: 1, harmony: ['G3', 'B3'] },
      { note: 'C5', duration: 1 },
      { note: 'A4', duration: 1, harmony: ['A3', 'E4'] },
      { note: 'G4', duration: 1.5 },
      { note: 'C4', duration: 3, harmony: ['C3', 'G3', 'E4'] },
      { note: 'REST', duration: 1.5 },
    ],
  },
  {
    id: 'thay-co-cho-em-mua-xuan',
    title: 'Thầy Cô Cho Em Mùa Xuân',
    author: 'Vũ Hoàng',
    tempo: 96,
    notes: [
      // Một bông hồng em dành tặng cô...
      { note: 'C5', duration: 1, harmony: ['C3', 'G3'] },
      { note: 'G4', duration: 1 },
      { note: 'A4', duration: 1 },
      { note: 'F4', duration: 1.5, harmony: ['F3', 'C4'] },
      { note: 'G4', duration: 0.5 },
      { note: 'E4', duration: 2, harmony: ['C3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      { note: 'G4', duration: 1, harmony: ['G3', 'B3'] },
      { note: 'A4', duration: 0.5 },
      { note: 'B4', duration: 0.5 },
      { note: 'C5', duration: 1.5, harmony: ['C4', 'E4'] },
      { note: 'D5', duration: 0.5 },
      { note: 'E5', duration: 2, harmony: ['C3', 'G4'] },
      { note: 'REST', duration: 0.5 },

      // Cùng ngàn lời hát thiết tha ngọt ngào...
      { note: 'F5', duration: 1, harmony: ['F3', 'A4'] },
      { note: 'E5', duration: 0.5 },
      { note: 'D5', duration: 0.5 },
      { note: 'C5', duration: 1.5, harmony: ['C4', 'G4'] },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 2, harmony: ['C3', 'E4'] },
      { note: 'REST', duration: 0.5 },

      { note: 'A4', duration: 1, harmony: ['F3', 'C4'] },
      { note: 'C5', duration: 1 },
      { note: 'D5', duration: 1, harmony: ['G3', 'B3'] },
      { note: 'B4', duration: 1 },
      { note: 'C5', duration: 3, harmony: ['C3', 'G3', 'E4'] },
      { note: 'REST', duration: 1.5 },
    ],
  },
];

class TeacherDayMelodySynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.28; // Âm lượng êm dịu, tinh tế
  private currentSongIndex: number = 0;
  private currentStepTimeout: ReturnType<typeof setTimeout> | null = null;
  private onStateChangeCallbacks: Set<(state: { isPlaying: boolean; currentSong: SongTrack; volume: number; isMuted: boolean }) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (state: { isPlaying: boolean; currentSong: SongTrack; volume: number; isMuted: boolean }) => void) {
    this.onStateChangeCallbacks.add(cb);
    cb(this.getState());
    return () => {
      this.onStateChangeCallbacks.delete(cb);
    };
  }

  private notify() {
    const s = this.getState();
    this.onStateChangeCallbacks.forEach((cb) => cb(s));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentSong: TEACHER_DAY_SONGS[this.currentSongIndex],
      volume: this.volume,
      isMuted: this.isMuted,
    };
  }

  /**
   * Tạo âm thanh đàn Celesta / Soft Piano ấm áp:
   * Kết hợp sóng Sine (độ tròn) + Triangle (hài âm nhẹ) + Envelope mượt
   */
  private playTone(freq: number, durationSec: number, velocity = 1, isBass = false) {
    if (!this.ctx || this.isMuted || freq <= 0) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Dạng sóng Celesta / Piano
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, now);

    // Lọc dải cao để âm thanh ấm áp, không bị chói
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 450 : 2200, now);

    // Envelope (Attack mềm, Decay tự nhiên)
    const effectiveVolume = this.volume * velocity * (isBass ? 0.45 : 0.7);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, effectiveVolume), now + 0.035);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec * 1.4);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec * 1.5);
    osc2.stop(now + durationSec * 1.5);
  }

  public async play() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.notify();
    this.runSequencer(0);
  }

  public pause() {
    this.isPlaying = false;
    if (this.currentStepTimeout) {
      clearTimeout(this.currentStepTimeout);
      this.currentStepTimeout = null;
    }
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextSong() {
    this.currentSongIndex = (this.currentSongIndex + 1) % TEACHER_DAY_SONGS.length;
    if (this.isPlaying) {
      this.pause();
      this.play();
    } else {
      this.notify();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.isMuted = this.volume === 0;
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    this.notify();
  }

  private runSequencer(noteIndex: number) {
    if (!this.isPlaying) return;

    const song = TEACHER_DAY_SONGS[this.currentSongIndex];
    if (noteIndex >= song.notes.length) {
      // Nghỉ 2.5 giây khi hết bài trước khi lặp lại hoặc sang bài tiếp
      this.currentStepTimeout = setTimeout(() => {
        this.runSequencer(0);
      }, 2500);
      return;
    }

    const event = song.notes[noteIndex];
    const beatDurationSec = 60 / song.tempo;
    const durationSec = event.duration * beatDurationSec;

    // Phát nốt giai điệu chính
    const freq = NOTE_FREQS[event.note] || 0;
    if (freq > 0) {
      this.playTone(freq, durationSec * 0.9, 1.0, false);
    }

    // Phát các nốt đệm hòa âm nhẹ nhàng ở nền
    if (event.harmony && event.harmony.length > 0) {
      event.harmony.forEach((hNote) => {
        const hFreq = NOTE_FREQS[hNote] || 0;
        if (hFreq > 0) {
          this.playTone(hFreq, durationSec * 1.2, 0.5, true);
        }
      });
    }

    // Lên lịch nốt tiếp theo
    this.currentStepTimeout = setTimeout(() => {
      this.runSequencer(noteIndex + 1);
    }, durationSec * 1000);
  }
}

export const teacherDaySynthesizer = new TeacherDayMelodySynthesizer();

import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Music2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { teacherDaySynthesizer, SongTrack } from '../utils/teacherDayAudio';

export const TeacherDayMusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<SongTrack>(teacherDaySynthesizer.getState().currentSong);
  const [volume, setVolume] = useState(0.28);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const unsubscribe = teacherDaySynthesizer.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentSong(state.currentSong);
      setVolume(state.volume);
      setIsMuted(state.isMuted);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleTogglePlay = () => {
    teacherDaySynthesizer.togglePlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    teacherDaySynthesizer.nextSong();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    teacherDaySynthesizer.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    teacherDaySynthesizer.setVolume(val);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Main Music Pill */}
      <div 
        onClick={handleTogglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 border shadow-xs ${
          isPlaying
            ? 'bg-rose-950/80 border-rose-500/60 text-rose-100 shadow-rose-900/30 ring-1 ring-rose-400/30'
            : 'bg-slate-800/80 hover:bg-slate-700/90 border-slate-700/80 text-slate-300 hover:text-white'
        }`}
        title={isPlaying ? 'Nhấn để tạm dừng nhạc 20/11' : 'Nhấn để phát giai điệu Bụi Phấn (Piano nhẹ nhàng)'}
      >
        {/* Animated Soundwave or Music Icon */}
        <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
              <span className="w-0.5 bg-rose-400 rounded-full animate-[musicBar_0.8s_ease-in-out_infinite] h-2"></span>
              <span className="w-0.5 bg-rose-300 rounded-full animate-[musicBar_1.1s_ease-in-out_infinite_0.2s] h-3.5"></span>
              <span className="w-0.5 bg-amber-300 rounded-full animate-[musicBar_0.7s_ease-in-out_infinite_0.4s] h-2.5"></span>
              <span className="w-0.5 bg-rose-400 rounded-full animate-[musicBar_0.9s_ease-in-out_infinite_0.1s] h-3"></span>
            </div>
          ) : (
            <Music2 className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
          )}
        </div>

        {/* Song info & 20/11 Label */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" /> 20/11
            </span>
            <span className="text-[11px] font-semibold text-white truncate max-w-[110px] sm:max-w-[140px]">
              {currentSong.title}
            </span>
          </div>
          <span className="text-[9px] text-rose-200/80 hidden sm:block truncate max-w-[140px]">
            {isPlaying ? 'Giai điệu nhẹ nhàng (0 KB)' : 'Phát nhạc tri ân Thầy Cô'}
          </span>
        </div>

        {/* Mini Play / Pause Button */}
        <div className="w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105">
          {isPlaying ? (
            <Pause className="w-3 h-3 fill-current" />
          ) : (
            <Play className="w-3 h-3 fill-current ml-0.5" />
          )}
        </div>

        {/* Quick Skip Song Button */}
        <button
          type="button"
          onClick={handleNext}
          title="Đổi bài hát tiếp theo (Bụi Phấn / Thầy Cô Cho Em Mùa Xuân)"
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition shrink-0"
        >
          <SkipForward className="w-3 h-3" />
        </button>

        {/* Dropdown / Floating Volume & Switch Menu on Hover */}
        {showControls && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute top-full right-0 mt-2 z-50 w-56 p-3 rounded-xl bg-slate-900/95 backdrop-blur-md border border-rose-500/30 shadow-xl shadow-black/40 text-xs animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
              <span className="font-semibold text-rose-300 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-400 text-rose-400" /> Nhạc tri ân 20/11
              </span>
              <span className="text-[10px] text-slate-400">Piano / Celesta</span>
            </div>

            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium">
                <span>{currentSong.title}</span>
                <span className="text-[10px] text-slate-400">{currentSong.author}</span>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="text-slate-400 hover:text-white"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <span className="text-[10px] text-slate-400 w-6 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <button
                type="button"
                onClick={handleNext}
                className="text-rose-300 hover:text-rose-200 font-medium flex items-center gap-1"
              >
                <SkipForward className="w-3 h-3" /> Đổi bài khác
              </button>
              <span className="text-slate-400 italic">Không tốn dung lượng</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes musicBar {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `}</style>
    </div>
  );
};

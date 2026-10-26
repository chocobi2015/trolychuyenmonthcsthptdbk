import React, { useState } from 'react';
import { 
  BellRing, 
  AlertTriangle, 
  Clock, 
  PlusCircle, 
  Calendar, 
  ChevronRight,
  Pause,
  Play,
  FileText
} from 'lucide-react';
import { SchoolDeadline, calculateDaysRemaining } from '../types/deadline';

interface DeadlineTickerBannerProps {
  deadlines: SchoolDeadline[];
  onOpenManagementModal: () => void;
  onSelectDeadline?: (dl: SchoolDeadline) => void;
}

export const DeadlineTickerBanner: React.FC<DeadlineTickerBannerProps> = ({
  deadlines,
  onOpenManagementModal,
  onSelectDeadline,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Lọc các deadline chưa hoàn thành và sắp xếp theo ngày gần nhất
  const pendingDeadlines = deadlines
    .filter((d) => d.status !== 'completed')
    .map((d) => ({
      ...d,
      daysRemaining: calculateDaysRemaining(d.deadlineDate),
    }))
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  const urgentCount = pendingDeadlines.filter((d) => d.daysRemaining <= 3).length;
  const upcomingCount = pendingDeadlines.filter((d) => d.daysRemaining > 3 && d.daysRemaining <= 7).length;

  // Format ngày dạng DD/MM/YYYY
  const formatDateVN = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  if (pendingDeadlines.length === 0) {
    return (
      <div className="bg-slate-900 border-t border-b border-slate-800 text-xs px-4 py-1.5 flex items-center justify-between text-slate-400">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tất cả các deadline báo cáo và nhiệm vụ trường học đã hoàn thành!</span>
        </span>
        <button
          onClick={onOpenManagementModal}
          className="text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1 text-[11px]"
        >
          <PlusCircle className="w-3 h-3" /> Thêm deadline mới
        </button>
      </div>
    );
  }

  // Nhân bản danh sách để tạo dòng chạy vô tận mượt mà (seamless loop)
  const tickerItems = [...pendingDeadlines, ...pendingDeadlines];

  return (
    <div className="relative z-20 bg-gradient-to-r from-slate-950 via-[#0f172a] to-slate-950 border-t border-b border-slate-800/90 text-xs overflow-hidden select-none shadow-inner">
      <div className="max-w-7xl mx-auto flex items-stretch">
        {/* Left Indicator Label */}
        <div 
          onClick={onOpenManagementModal}
          className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-rose-950/90 hover:bg-rose-900/90 border-r border-rose-800/70 text-rose-200 cursor-pointer transition-colors z-10 shadow-md group"
          title="Nhấn để xem toàn bộ danh sách và quản lý hạn chót công việc"
        >
          <div className="relative flex items-center justify-center">
            <BellRing className={`w-3.5 h-3.5 text-rose-300 ${urgentCount > 0 ? 'animate-bounce' : ''}`} />
            {urgentCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            )}
          </div>
          <span className="font-bold text-[11px] tracking-wide uppercase text-white flex items-center gap-1">
            HẠN BÁO CÁO:
          </span>
          {urgentCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white font-extrabold text-[10px] animate-pulse">
              {urgentCount} KHẨN
            </span>
          )}
        </div>

        {/* Middle Marquee Track */}
        <div 
          className="flex-1 overflow-hidden relative flex items-center py-1 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={onOpenManagementModal}
        >
          <div 
            className={`flex items-center gap-6 whitespace-nowrap will-change-transform ${
              isPaused ? 'animation-play-state-paused' : ''
            }`}
            style={{
              animation: `marqueeScroll ${Math.max(25, pendingDeadlines.length * 9)}s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {tickerItems.map((item, idx) => {
              const isUrgent = item.daysRemaining <= 3;
              const isUpcoming = item.daysRemaining > 3 && item.daysRemaining <= 7;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectDeadline) onSelectDeadline(item);
                    else onOpenManagementModal();
                  }}
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md transition-all shrink-0 ${
                    isUrgent
                      ? 'bg-rose-950/80 border border-rose-500/80 text-rose-100 shadow-sm shadow-rose-900/40 ring-1 ring-rose-500/40'
                      : isUpcoming
                      ? 'bg-amber-950/60 border border-amber-600/70 text-amber-100'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {/* Countdown Badge with Vivid Highlight */}
                  {isUrgent ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-rose-600 text-white animate-pulse">
                      <AlertTriangle className="w-3 h-3 text-white" />
                      {item.daysRemaining <= 0 ? 'HÔM NAY HẾT HẠN!' : `CÒN ${item.daysRemaining} NGÀY`}
                    </span>
                  ) : isUpcoming ? (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-600 text-slate-950">
                      <Clock className="w-3 h-3 text-slate-950" />
                      CÒN {item.daysRemaining} NGÀY
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-sky-300 border border-slate-700">
                      <Calendar className="w-3 h-3 text-sky-400" />
                      Còn {item.daysRemaining} ngày
                    </span>
                  )}

                  {/* Deadline Title */}
                  <span className="font-semibold text-[11.5px] max-w-sm sm:max-w-md truncate">
                    {item.title}
                  </span>

                  {/* Due Date & Source Document */}
                  <span className="text-[10px] opacity-75 font-mono flex items-center gap-1">
                    [Hạn: <strong className="text-white">{formatDateVN(item.deadlineDate)}</strong> · {item.sourceDocument}]
                  </span>

                  {/* Responsible Unit */}
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 text-slate-300 hidden md:inline">
                    {item.assignedDepartment}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Controls & Quick Actions */}
        <div className="shrink-0 flex items-center gap-1.5 px-2 bg-slate-950 border-l border-slate-800 z-10">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title={isPaused ? 'Tiếp tục chạy chữ' : 'Tạm dừng chữ chạy để đọc kỹ'}
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
          </button>

          <button
            onClick={onOpenManagementModal}
            className="px-2 py-1 rounded-md text-[11px] font-semibold text-sky-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition flex items-center gap-1"
            title="Mở bảng quản lý & thêm mới deadline từ văn bản"
          >
            <PlusCircle className="w-3 h-3 text-sky-400" />
            <span className="hidden sm:inline">Quản lý</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

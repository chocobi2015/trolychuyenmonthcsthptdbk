import React from 'react';
import { 
  Building2, 
  FileText, 
  FolderArchive, 
  BookOpen, 
  Users, 
  Upload, 
  HeartHandshake, 
  FileSpreadsheet, 
  CalendarCheck,
  GraduationCap,
  FilePlus2,
  Eye,
  ShieldCheck,
  Flag,
  Sparkles,
  BellRing
} from 'lucide-react';
import { TeacherDayBackgroundOverlay } from './TeacherDayBackgroundOverlay';
import { DeadlineTickerBanner } from './DeadlineTickerBanner';
import { SchoolDeadline, calculateDaysRemaining } from '../types/deadline';

export type MainNavTab = 
  | 'midterm_assessment_plan' 
  | 'internal_inspection'
  | 'party_work'
  | 'documents' 
  | 'directives' 
  | 'department_meetings' 
  | 'inclusive_education' 
  | 'school_profile';

export type DocumentSubView = 'archive' | 'builder' | 'editor';
export type SchoolSubView = 'context' | 'teachers';

interface HeaderProps {
  onOpenLegalModal: () => void;
  onOpenUploadModal?: () => void;
  onOpenStudentsModal?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasActiveDocument?: boolean;
  activeDocTitle?: string;
  activeDocNumber?: string;
  schoolSubView?: SchoolSubView;
  setSchoolSubView?: (view: SchoolSubView) => void;
  deadlines?: SchoolDeadline[];
  onOpenDeadlineModal?: () => void;
  onSelectDeadline?: (dl: SchoolDeadline) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenLegalModal, 
  onOpenUploadModal,
  onOpenStudentsModal,
  activeTab, 
  setActiveTab,
  hasActiveDocument = false,
  activeDocTitle,
  activeDocNumber,
  schoolSubView = 'context',
  setSchoolSubView,
  deadlines = [],
  onOpenDeadlineModal,
  onSelectDeadline,
}) => {
  const urgentCount = deadlines.filter(
    (d) => d.status !== 'completed' && calculateDaysRemaining(d.deadlineDate) <= 3
  ).length;
  // Determine which main nav pillar is active
  const isDocumentsGroup = activeTab === 'archive' || activeTab === 'builder' || activeTab === 'editor';

  const NAV_ITEMS = [
    {
      id: 'midterm_assessment_plan',
      label: 'Kiểm tra - Đánh giá',
      sublabel: 'Kế hoạch HK1 (Số 45)',
      icon: <CalendarCheck className="w-4 h-4 text-emerald-400" />,
      isActive: activeTab === 'midterm_assessment_plan',
      onClick: () => setActiveTab('midterm_assessment_plan'),
    },
    {
      id: 'internal_inspection',
      label: 'Kiểm tra nội bộ',
      sublabel: 'CV 3953 & HD 1134',
      icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
      isActive: activeTab === 'internal_inspection',
      onClick: () => setActiveTab('internal_inspection'),
    },
    {
      id: 'party_work',
      label: 'Công tác Đảng bộ',
      sublabel: 'BCH 10 Đ/c & 4 Văn kiện',
      icon: <Flag className="w-4 h-4 text-red-500" />,
      isActive: activeTab === 'party_work',
      onClick: () => setActiveTab('party_work'),
    },
    {
      id: 'documents',
      label: 'Hồ sơ & Văn bản trường',
      sublabel: 'Kho hồ sơ, Soạn thảo & A4',
      icon: <FolderArchive className="w-4 h-4 text-sky-400" />,
      isActive: isDocumentsGroup,
      onClick: () => {
        if (!isDocumentsGroup) {
          setActiveTab('archive');
        }
      },
    },
    {
      id: 'directives',
      label: 'Chỉ đạo Sở GDĐT',
      sublabel: 'Văn bản điều hành Đồng Tháp',
      icon: <BookOpen className="w-4 h-4 text-indigo-400" />,
      isActive: activeTab === 'directives',
      onClick: () => setActiveTab('directives'),
    },
    {
      id: 'department_meetings',
      label: 'Tổ chuyên môn',
      sublabel: 'Họp 2 tuần/lần & Biên bản',
      icon: <Users className="w-4 h-4 text-teal-400" />,
      isActive: activeTab === 'department_meetings',
      onClick: () => setActiveTab('department_meetings'),
    },
    {
      id: 'inclusive_education',
      label: 'Giáo dục hòa nhập',
      sublabel: 'CV 3326 & 25 HS khuyết tật',
      icon: <HeartHandshake className="w-4 h-4 text-rose-400" />,
      isActive: activeTab === 'inclusive_education',
      onClick: () => setActiveTab('inclusive_education'),
    },
    {
      id: 'school_profile',
      label: 'Hồ sơ trường & Nhân sự',
      sublabel: '53 Lớp & 120 CB-GV-NV',
      icon: <Building2 className="w-4 h-4 text-amber-300" />,
      isActive: activeTab === 'school_profile',
      onClick: () => setActiveTab('school_profile'),
    },
  ];

  return (
    <header className="relative bg-gradient-to-r from-slate-950 via-[#10172e] to-[#1e1329] text-white shadow-md sticky top-0 z-40 border-b border-rose-900/40 overflow-hidden">
      {/* 20/11 Festive Animated Background Overlay ("Bụi phấn rơi rơi" & Cánh hoa tri ân) */}
      <TeacherDayBackgroundOverlay />

      {/* 1. Main Brand & Quick Actions Row */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white p-1 border border-rose-500/30 flex items-center justify-center shadow-md shadow-black/30 shrink-0 overflow-hidden ring-1 ring-amber-400/30">
            <img 
              src="/logo-doc-binh-kieu.png" 
              alt="Logo Trường THCS & THPT Đốc Binh Kiều" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase drop-shadow-xs">
                Trường THCS & THPT Đốc Binh Kiều
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-rose-950/90 via-rose-900/80 to-amber-950/80 text-amber-200 border border-rose-500/50 shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-amber-300 animate-pulse" /> 20/11 Tri Ân Thầy Cô
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950/80 text-blue-200 border border-blue-700/50">
                Năm học 2026 - 2027
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/70 text-emerald-300 border border-emerald-700/40">
                <Building2 className="w-3 h-3 text-emerald-400" /> 3 Điểm trường · 53 Lớp (2.111 HS)
              </span>
            </div>
            <p className="text-xs text-rose-100/80 hidden sm:block mt-0.5">
              Hệ thống Quản lý Chuyên môn, Kế hoạch Giáo dục & Văn kiện Đảng bộ
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Deadline Status Button */}
          {onOpenDeadlineModal && (
            <button
              onClick={onOpenDeadlineModal}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-xs ${
                urgentCount > 0
                  ? 'bg-rose-950/90 hover:bg-rose-900 text-rose-100 border border-rose-500/80 ring-1 ring-rose-500/40 shadow-rose-950/50'
                  : 'bg-slate-800/90 hover:bg-slate-700 hover:text-white text-slate-200 border border-slate-700/80'
              }`}
              title="Xem danh sách hạn chót báo cáo & quản lý deadline"
            >
              <BellRing className={`w-3.5 h-3.5 ${urgentCount > 0 ? 'text-rose-400 animate-bounce' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Hạn chót:</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${urgentCount > 0 ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-700 text-slate-200'}`}>
                {urgentCount > 0 ? `${urgentCount} KHẨN` : `${deadlines.length} việc`}
              </span>
              {urgentCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5"></span>
              )}
            </button>
          )}

          {onOpenStudentsModal && (
            <button
              onClick={onOpenStudentsModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/80 hover:border-slate-600 transition shadow-xs"
              title="Tra cứu thống kê 53 lớp, 2.111 học sinh tại 3 điểm trường"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dữ liệu 53 lớp (2.111 HS)</span>
            </button>
          )}

          {onOpenUploadModal && (
            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/50 shadow-xs transition"
              title="Tải lên công văn Word hoặc PDF của Sở GDĐT để phân tích và lưu trữ"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tải lên văn bản</span>
              <span className="sm:hidden">Tải file</span>
            </button>
          )}

          <button
            onClick={onOpenLegalModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-amber-300 border border-slate-700/80 hover:border-slate-600 transition shadow-xs"
            title="Xem căn cứ pháp lý: Nghị định 30, Thông tư 22, Thông tư 15, Quyết định sáp nhập trường"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Căn cứ pháp lý</span>
          </button>
        </div>
      </div>

      {/* 2. Primary Navigation Bar (Thanh điều hướng phân hệ hiện đại, trực quan) */}
      <nav className="relative z-10 bg-slate-950/85 border-t border-slate-800/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto scrollbar-none py-1.5 gap-1.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 flex items-center gap-2 transition text-left ${
                item.isActive
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <span className={`shrink-0 ${item.isActive ? 'text-white' : ''}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 2.5 Running Marquee Deadline Ticker Banner (Hàng chữ chạy thông báo hạn chót theo yêu cầu) */}
      {deadlines && deadlines.length > 0 && onOpenDeadlineModal && (
        <DeadlineTickerBanner
          deadlines={deadlines}
          onOpenManagementModal={onOpenDeadlineModal}
          onSelectDeadline={onSelectDeadline}
        />
      )}

      {/* 3. Sub-Navigation Ribbon (Dành cho phân hệ Văn bản) */}
      {isDocumentsGroup && (
        <div className="relative z-10 bg-slate-900/95 border-t border-slate-800 px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Phân hệ văn bản:</span>
              <div className="inline-flex rounded-md p-0.5 bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setActiveTab('archive')}
                  className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
                    activeTab === 'archive'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FolderArchive className="w-3.5 h-3.5" />
                  <span>Kho văn bản trường</span>
                </button>
                <button
                  onClick={() => setActiveTab('builder')}
                  className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
                    activeTab === 'builder'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FilePlus2 className="w-3.5 h-3.5" />
                  <span>Soạn thảo văn bản mới</span>
                </button>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
                    activeTab === 'editor'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Trình xem A4 & Xuất Word</span>
                  {hasActiveDocument && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block ml-0.5"></span>
                  )}
                </button>
              </div>
            </div>

            {activeTab === 'editor' && activeDocNumber && (
              <div className="text-xs text-slate-300 flex items-center gap-2 truncate">
                <span className="text-slate-500">Đang mở:</span>
                <span className="font-semibold text-sky-300 font-mono">{activeDocNumber}</span>
                {activeDocTitle && (
                  <span className="text-slate-400 truncate max-w-xs">— {activeDocTitle}</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Sub-Navigation Ribbon (Dành cho phân hệ Hồ sơ trường) */}
      {activeTab === 'school_profile' && (
        <div className="relative z-10 bg-slate-900/95 border-t border-slate-800 px-4 py-2 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Chế độ xem dữ liệu:</span>
              <div className="inline-flex rounded-md p-0.5 bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setSchoolSubView && setSchoolSubView('context')}
                  className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
                    schoolSubView === 'context'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Tổng quan trường & 53 Lớp (2.111 HS)</span>
                </button>
                <button
                  onClick={() => setSchoolSubView && setSchoolSubView('teachers')}
                  className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition ${
                    schoolSubView === 'teachers'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Đội ngũ 120 CB-GV-NV & Phân công chuyên môn</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-slate-300 font-medium">3 Điểm trường:</span>
              <span>Điểm chính (THPT) · Đốc Binh Kiều (THCS) · Tân Kiều (THCS)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

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
  Compass,
  CheckCircle2,
  FilePlus2,
  Eye,
  ShieldCheck,
  Flag
} from 'lucide-react';

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
}) => {
  // Determine which main nav pillar is active
  const isDocumentsGroup = activeTab === 'archive' || activeTab === 'builder' || activeTab === 'editor';

  const NAV_ITEMS = [
    {
      id: 'midterm_assessment_plan',
      label: 'Kiểm tra - Đánh giá',
      sublabel: 'Kế hoạch HK1 (Số 45)',
      icon: <CalendarCheck className="w-4 h-4" />,
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
      icon: <FolderArchive className="w-4 h-4" />,
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
      icon: <BookOpen className="w-4 h-4" />,
      isActive: activeTab === 'directives',
      onClick: () => setActiveTab('directives'),
    },
    {
      id: 'department_meetings',
      label: 'Tổ chuyên môn',
      sublabel: 'Họp 2 tuần/lần & Biên bản',
      icon: <Users className="w-4 h-4" />,
      isActive: activeTab === 'department_meetings',
      onClick: () => setActiveTab('department_meetings'),
    },
    {
      id: 'inclusive_education',
      label: 'Giáo dục hòa nhập',
      sublabel: 'CV 3326 & 25 HS khuyết tật',
      icon: <HeartHandshake className="w-4 h-4" />,
      isActive: activeTab === 'inclusive_education',
      onClick: () => setActiveTab('inclusive_education'),
    },
    {
      id: 'school_profile',
      label: 'Hồ sơ trường & Nhân sự',
      sublabel: '53 Lớp & 120 CB-GV-NV',
      icon: <Building2 className="w-4 h-4" />,
      isActive: activeTab === 'school_profile',
      onClick: () => setActiveTab('school_profile'),
    },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40 border-b border-slate-800">
      {/* 1. Administrative Top Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-[11px] text-slate-400 py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP</span>
            <span className="text-slate-600">·</span>
            <span className="hidden sm:inline">UBND XÃ ĐỐC BINH KIỀU</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
            <span>—</span>
            <span className="text-slate-300">Độc lập · Tự do · Hạnh phúc</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="hidden sm:inline text-slate-400">Nghị định 30/2020/NĐ-CP</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-sky-400 font-medium">Năm học 2026 - 2027</span>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Quick Actions Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-700 border border-blue-500/30 flex items-center justify-center text-white font-bold shrink-0 shadow-inner">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                Trường THCS & THPT Đốc Binh Kiều
              </h1>
            </div>
            <p className="text-xs text-slate-300 hidden sm:block">
              Hệ thống Quản lý Chuyên môn, Kế hoạch Giáo dục & Hồ sơ Kiểm tra Đánh giá
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenStudentsModal && (
            <button
              onClick={onOpenStudentsModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition"
              title="Tra cứu thống kê 53 lớp, 2.111 học sinh tại 3 điểm trường"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dữ liệu 53 lớp (2.111 HS)</span>
            </button>
          )}

          {onOpenUploadModal && (
            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-600 border border-emerald-600 shadow-xs transition"
              title="Tải lên công văn Word hoặc PDF của Sở GDĐT để phân tích và lưu trữ"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tải lên văn bản</span>
              <span className="sm:hidden">Tải file</span>
            </button>
          )}

          <button
            onClick={onOpenLegalModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition"
            title="Xem căn cứ pháp lý: Nghị định 30, Thông tư 22, Thông tư 15, Quyết định sáp nhập trường"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Căn cứ pháp lý</span>
          </button>
        </div>
      </div>

      {/* 3. Primary Navigation Bar (6 Clean Scientific Pillars) */}
      <nav className="bg-slate-950/90 border-t border-slate-800/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto scrollbar-none py-1 gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 flex items-center gap-2 transition text-left ${
                item.isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className={`shrink-0 ${item.isActive ? 'text-white' : 'text-slate-400'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 4. Sub-Navigation Ribbon (For Contextual Workspaces) */}
      {isDocumentsGroup && (
        <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2 text-xs">
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

      {activeTab === 'school_profile' && (
        <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-2 text-xs">
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

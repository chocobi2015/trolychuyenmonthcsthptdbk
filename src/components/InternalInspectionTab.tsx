import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Users,
  Calendar,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Building,
  CheckSquare,
  Search,
  Filter,
  Copy,
  Printer,
  FileCheck,
  Sparkles,
  Phone,
  Mail,
  UserCheck,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import {
  OFFICIAL_INSPECTION_DIRECTIVES,
  SCHOOL_INSPECTION_PILLARS,
  SCHOOL_INSPECTION_COMMITTEE,
  SCHOOL_INSPECTION_SCHEDULE,
  OFFICIAL_INSPECTION_TEMPLATES,
  INSPECTION_ARCHIVE_CHECKLIST,
  InspectionScheduleItem,
  InspectionFormTemplate,
  InspectionDirective,
  InspectionPillar
} from '../data/internalInspectionData';
import { SCHOOL_OFFICIAL_PROFILE } from '../data/schoolOfficialData';

type SubTab = 'plan' | 'pillars' | 'committee' | 'directives' | 'templates' | 'compliance';

export const InternalInspectionTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('plan');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<InspectionFormTemplate>(OFFICIAL_INSPECTION_TEMPLATES[0]);
  const [selectedDirective, setSelectedDirective] = useState<InspectionDirective>(OFFICIAL_INSPECTION_DIRECTIVES[0]);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Filter schedule items
  const filteredSchedule = SCHOOL_INSPECTION_SCHEDULE.filter((item) => {
    const matchesMonth = selectedMonth === 'all' || item.timeframe.includes(selectedMonth);
    const matchesCampus = selectedCampus === 'all' || item.campus === selectedCampus;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teamLeader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scope.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMonth && matchesCampus && matchesSearch;
  });

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Quick Action Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl shadow-lg border border-blue-800 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-400 text-slate-950 uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                Kế hoạch hợp nhất hoàn chỉnh
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-800/80 text-blue-200 border border-blue-700/60">
                Năm học 2026 - 2027
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                Kết hợp KH 76 + KH 134 + HD 1134
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-950 text-indigo-200 border border-indigo-800/60">
                Chuẩn 120 CB-GV-NV từ "NHÂN SỰ MỚI"
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
              Kế Hoạch Kiểm Tra Nội Bộ Trường Học
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Kế hoạch kiểm tra nội bộ toàn diện năm học 2026 - 2027 của <strong>Trường THCS & THPT Đốc Binh Kiều</strong>.
              Kết hợp hoàn chỉnh từ <strong>Kế hoạch 76/KH-THPT ĐBK</strong> (cấp THPT) và <strong>Kế hoạch 134/KH-THCS.TK</strong> (cấp THCS) năm trước,
              thực hiện đúng <strong>Hướng dẫn số 1134/SGDĐT-TCCB</strong> của Sở GDĐT Đồng Tháp;
              bao quát <strong>53 lớp, 2.111 học sinh và 120 cán bộ, giáo viên</strong> tại <strong>3 điểm trường</strong>.
            </p>
          </div>

          {/* Quick Download Buttons */}
          <div className="flex flex-col gap-2 shrink-0 w-full lg:w-auto">
            <a
              href="/downloads/KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx"
              download
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md hover:shadow-lg transition active:scale-95 border border-blue-400/30"
              title="Tải về Kế hoạch kiểm tra nội bộ hoàn chỉnh file Word (.docx) chuẩn Nghị định 30/2020"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Tải Kế hoạch KTNB Hoàn Chỉnh (.docx)</span>
            </a>
            
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/downloads/QUYET_DINH_BAN_KIEM_TRA_NOI_BO_2026_2027.docx"
                download
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition"
                title="Tải Quyết định thành lập Ban Kiểm tra nội bộ (Mẫu 02)"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>QĐ Ban KTNB</span>
              </a>
              <a
                href="/downloads/TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx"
                download
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition"
                title="Tải trọn bộ 06 Biểu mẫu nghiệp vụ Phụ lục HD 1134"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Trọn bộ 06 Mẫu</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-blue-800/60">
              <a
                href="/downloads/NHAN_SU_MOI_THCS_THPT_DOC_BINH_KIEU.xlsx"
                download="NHAN_SU_MOI_THCS_THPT_DOC_BINH_KIEU.xlsx"
                className="flex items-center justify-center gap-1 px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800/80 text-[11px] font-medium text-emerald-200 border border-emerald-700/50 transition"
                title="Tải tệp Excel NHÂN SỰ MỚI (120 CB-GV-NV)"
              >
                <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                <span>Nhân sự mới</span>
              </a>
              <a
                href="/downloads/76_KH_THPTDBK_KTNB_2025_2026.doc"
                download="76_KH_THPTDBK_KTNB_2025_2026.doc"
                className="flex items-center justify-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 border border-slate-700 transition"
                title="Tải Kế hoạch 76/KH-THPTĐBK (THPT năm trước - .doc)"
              >
                <Download className="w-3 h-3 text-amber-400" />
                <span>KH 76 (.doc)</span>
              </a>
              <a
                href="/downloads/134_KH_THCSTK_KTNB_2025_2026.docx"
                download="134_KH_THCSTK_KTNB_2025_2026.docx"
                className="flex items-center justify-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 border border-slate-700 transition"
                title="Tải Kế hoạch 134/KH-THCSTK (THCS năm trước - .docx)"
              >
                <Download className="w-3 h-3 text-teal-400" />
                <span>KH 134 (.docx)</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Stat Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-blue-800/60">
          <div className="bg-slate-800/60 backdrop-blur rounded-lg p-3 border border-blue-700/30">
            <div className="text-xs text-slate-400 font-medium">Cuộc kiểm tra trong năm</div>
            <div className="text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span>14 Cuộc</span>
              <span className="text-xs font-normal text-emerald-400">100% các tháng</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Phủ kín cả 3 điểm trường</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-lg p-3 border border-blue-700/30">
            <div className="text-xs text-slate-400 font-medium">Trụ cột kiểm tra hợp nhất</div>
            <div className="text-xl font-bold text-amber-300 flex items-center gap-1.5 mt-0.5">
              <span>11 Trụ Cột</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Kết hợp toàn diện KH 76 & KH 134</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-lg p-3 border border-blue-700/30">
            <div className="text-xs text-slate-400 font-medium">Ban Kiểm tra nội bộ</div>
            <div className="text-xl font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span>{SCHOOL_INSPECTION_COMMITTEE.length} Thành viên</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">100% chuẩn từ NHÂN SỰ MỚI</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur rounded-lg p-3 border border-blue-700/30">
            <div className="text-xs text-slate-400 font-medium">Hồ sơ biểu mẫu chuẩn</div>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span>06 Biểu mẫu</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Phụ lục Công văn 1134</div>
          </div>
        </div>
      </div>

      {/* Copy Toast Notification */}
      {copyFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Đã sao chép <strong>{copyFeedback}</strong> vào bộ nhớ tạm!</span>
        </div>
      )}

      {/* 2. Sub-tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1.5 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveSubTab('plan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'plan'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Lịch 14 cuộc kiểm tra chi tiết</span>
        </button>

        <button
          onClick={() => setActiveSubTab('pillars')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'pillars'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-500" />
          <span>11 Trụ cột kiểm tra (Kết hợp Cũ & Mới)</span>
          <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px]">11</span>
        </button>

        <button
          onClick={() => setActiveSubTab('committee')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'committee'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Ban KTNB ({SCHOOL_INSPECTION_COMMITTEE.length} thành viên)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('directives')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'directives'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>4 Văn bản chỉ đạo & Tham khảo (Cũ & Mới)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('templates')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'templates'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Trọn bộ 06 Biểu mẫu nghiệp vụ</span>
        </button>

        <button
          onClick={() => setActiveSubTab('compliance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition ${
            activeSubTab === 'compliance'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Chế độ báo cáo Sở & Hồ sơ lưu trữ</span>
        </button>
      </div>

      {/* 3. Sub-tab Content Areas */}

      {/* ==================== SUBTAB 1: KẾ HOẠCH KIỂM TRA ==================== */}
      {activeSubTab === 'plan' && (
        <div className="space-y-6">
          {/* Filters & Search Header */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm nội dung, đối tượng, người phụ trách, điểm trường..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span>Thời gian:</span>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Toàn bộ năm học</option>
                    <option value="10/2026">Tháng 10/2026</option>
                    <option value="11/2026">Tháng 11/2026</option>
                    <option value="12/2026">Tháng 12/2026</option>
                    <option value="01/2027">Tháng 01/2027</option>
                    <option value="02/2027">Tháng 02/2027</option>
                    <option value="03/2027">Tháng 03/2027</option>
                    <option value="04/2027">Tháng 04/2027</option>
                    <option value="05/2027">Tháng 05/2027</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>Điểm trường:</span>
                  <select
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tất cả điểm trường</option>
                    <option value="Cả 3 điểm trường">Cả 3 điểm trường</option>
                    <option value="Điểm chính (THPT)">Điểm chính (THPT)</option>
                    <option value="Điểm Tân Kiều (THCS)">Điểm Tân Kiều (THCS - 11km)</option>
                    <option value="Điểm Đốc Binh Kiều (THCS)">Điểm Đốc Binh Kiều (THCS)</option>
                  </select>
                </div>

                <a
                  href="/downloads/KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx"
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất Word (.docx)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Table of 14 Inspections */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase">
                  Danh Mục Các Cuộc Kiểm Tra Năm Học 2026 - 2027 ({filteredSchedule.length} / 14 cuộc)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ban hành kèm theo Quyết định số 48/QĐ-THCS-THPTĐBK ngày 15/10/2026 của Hiệu trưởng
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                Hiệu trưởng Lê Thanh Cường phê duyệt
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 divide-y divide-slate-200">
                <thead className="bg-slate-100/80 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-center w-12">TT</th>
                    <th scope="col" className="px-4 py-3 min-w-[280px]">Nội dung kiểm tra</th>
                    <th scope="col" className="px-4 py-3 min-w-[200px]">Đối tượng & Điểm trường</th>
                    <th scope="col" className="px-3 py-3 min-w-[110px]">Thời gian</th>
                    <th scope="col" className="px-3 py-3 min-w-[110px]">Hình thức</th>
                    <th scope="col" className="px-4 py-3 min-w-[160px]">Người phụ trách & Đoàn</th>
                    <th scope="col" className="px-3 py-3 text-center min-w-[90px]">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredSchedule.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/50 transition">
                      <td className="px-3 py-3.5 text-center font-bold text-slate-600 bg-slate-50/50">
                        {item.orderNumber}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 leading-snug">{item.title}</div>
                        <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.scope}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-slate-800">{item.target}</div>
                        <div className="flex items-center gap-1 text-[11px] text-indigo-600 mt-0.5 font-medium">
                          <Building className="w-3 h-3 shrink-0" />
                          <span>{item.campus}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-800">{item.timeframe}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.dateRange}</div>
                      </td>
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          item.method === 'Kiểm tra toàn diện'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-sky-100 text-sky-800 border border-sky-200'
                        }`}>
                          {item.method}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900">{item.teamLeader}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Thành viên: {item.teamMembers.join(', ')}
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-center whitespace-nowrap">
                        {item.status === 'in_progress' && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600 animate-spin" />
                            Đang tiến hành
                          </span>
                        )}
                        {item.status === 'scheduled' && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            Theo lịch
                          </span>
                        )}
                        {item.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Đã hoàn thành
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSchedule.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs">
                Không tìm thấy cuộc kiểm tra phù hợp với điều kiện lọc hiện tại.
              </div>
            )}
          </div>

          {/* 4 Pillars of Internal Inspection Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2.5 text-blue-900 font-bold text-sm mb-3">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">1</span>
                <span>Kiểm tra việc thực hiện nhiệm vụ của Ban Giám hiệu</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Chiến lược phát triển trường sau sáp nhập và Quy chế tổ chức hoạt động.</li>
                <li>Thực hiện Quy chế dân chủ ở cơ sở; công khai tài chính, thu hộ chi hộ.</li>
                <li>Quản lý kinh phí hoạt động Ban đại diện CMHS theo Thông tư 55/2011/TT-BGDĐT.</li>
                <li>An toàn trường học, PCCC, phòng chống tham nhũng, lãng phí và tiếp công dân.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2.5 text-indigo-900 font-bold text-sm mb-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">2</span>
                <span>Kiểm tra hoạt động sư phạm của giáo viên & nhân viên</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Dự giờ đánh giá tiết dạy phát triển phẩm chất, năng lực học sinh (mỗi GV 2-3 tiết).</li>
                <li>Kiểm tra Kế hoạch bài dạy (giáo án) theo CV 5512 và sổ ghi nhận tiến trình dạy học.</li>
                <li>Thực hiện kiểm tra đánh giá thường xuyên và định kỳ theo Thông tư 22/2021/TT-BGDĐT.</li>
                <li>Chấp hành nghiêm quy định cấm dạy thêm, học thêm trái phép; văn hóa công vụ.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm mb-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">3</span>
                <span>Kiểm tra hoạt động 06 Tổ chuyên môn & Bộ phận phục vụ</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Nền nếp sinh hoạt chuyên môn định kỳ 2 tuần/lần theo nghiên cứu bài học.</li>
                <li>Hồ sơ quản lý của Tổ trưởng: kế hoạch bồi dưỡng HSG và phụ đạo học sinh yếu.</li>
                <li>Khai thác phòng thí nghiệm thực hành Lý - Hóa - Sinh và thư viện tại 3 điểm trường.</li>
                <li>Công tác văn thư lưu trữ hồ sơ theo Nghị định 30/2020 và Thông tư 08/2025/TT-BGDĐT.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center gap-2.5 text-purple-900 font-bold text-sm mb-3">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">4</span>
                <span>Kiểm tra Quản lý chất lượng, CSDL ngành & Giáo dục hòa nhập</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Quy trình bảo mật in sao đề thi, coi thi, chấm thi và kiểm soát rủi ro điểm số.</li>
                <li>Vận hành cơ sở dữ liệu ngành Đúng - Đủ - Sạch - Sống; số hóa học bạ điện tử.</li>
                <li>Thực hiện kế hoạch giáo dục hòa nhập cho 25 học sinh khuyết tật theo Công văn 3326.</li>
                <li>Ôn tập thi tốt nghiệp THPT năm 2027 (K12) và ôn thi tuyển sinh vào lớp 10 (K9).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 2: 11 TRỤ CỘT KIỂM TRA (KẾT HỢP CŨ & MỚI) ==================== */}
      {activeSubTab === 'pillars' && (
        <div className="space-y-6">
          {/* Overview Banner for Combination */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-blue-200/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-700 text-white uppercase">
                    Kế thừa & Phát triển
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    Hợp nhất Kế hoạch 76 (THPT) + Kế hoạch 134 (THCS) + Hướng dẫn 1134 Sở GDĐT
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  11 Trụ Cột Kiểm Tra Nội Bộ Toàn Diện Cho Trường Sau Sáp Nhập
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-4xl leading-relaxed">
                  Bản tổng hợp tích hợp toàn bộ các nội dung kiểm tra xuất sắc từ <strong>Kế hoạch 76/KH-THPT ĐBK</strong> (cấp THPT: ôn thi tốt nghiệp, tuyển sinh 10, quản lý dạy thêm, nề nếp kỷ cương 3 khối THPT)
                  và <strong>Kế hoạch 134/KH-THCS.TK</strong> (cấp THCS: 11 nội dung chi tiết, chỉ tiêu kiểm tra 70% GV, quản lý bằng tốt nghiệp THCS, ứng dụng CNTT và AI, cơ chế tài chính nội bộ),
                  được thiết kế cho quy mô trường liên cấp <strong>53 lớp, 2.111 học sinh và 120 CB-GV-NV</strong> theo danh sách nhân sự mới.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="/downloads/KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx"
                  download
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất Kế hoạch (.docx)</span>
                </a>
              </div>
            </div>

            {/* 3 Pillars Comparison Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <div className="bg-white/80 p-3.5 rounded-lg border border-blue-200">
                <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Kế thừa từ Kế hoạch 76 (THPT ĐBK)</span>
                </div>
                <ul className="text-[11px] text-slate-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Kiểm tra toàn diện & chuyên đề các tổ THPT (Văn, Toán, Lý-Hóa-Sinh, Sử-Địa, NN-Tin).</li>
                  <li>Trọng tâm ôn thi tốt nghiệp THPT, hồ sơ ĐKDT, xét tốt nghiệp Khối 12.</li>
                  <li>Kiểm tra hoạt động dạy 2 buổi/ngày & Ban tư vấn tâm lý học sinh.</li>
                  <li>Kế hoạch kéo dài qua tháng hè 6, 7, 8 chuẩn bị tuyển sinh vào lớp 10.</li>
                </ul>
              </div>

              <div className="bg-white/80 p-3.5 rounded-lg border border-teal-200">
                <div className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  <span>Kế thừa từ Kế hoạch 134 (THCS Tân Kiều)</span>
                </div>
                <ul className="text-[11px] text-slate-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Cấu trúc mẫu mực 11 nhóm nội dung với đối tượng, lực lượng, hình thức, chỉ tiêu rõ ràng.</li>
                  <li>Chỉ tiêu: kiểm tra toàn diện 70% giáo viên, 100% chuyên đề HSSS, 30% đột xuất.</li>
                  <li>Kiểm tra công tác quản lý cấp phát văn bằng, chứng chỉ tốt nghiệp THCS.</li>
                  <li>Kiểm tra việc ứng dụng CNTT và công nghệ trí tuệ nhân tạo (AI) trong dạy học.</li>
                </ul>
              </div>

              <div className="bg-white/80 p-3.5 rounded-lg border border-emerald-200">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nâng cấp đơn vị sáp nhập 2026 - 2027</span>
                </div>
                <ul className="text-[11px] text-slate-600 mt-2 space-y-1 list-disc list-inside">
                  <li>Bao quát cả 3 điểm trường (Điểm chính THPT, THCS ĐBK, THCS Tân Kiều cách 11km).</li>
                  <li>Phân công đích danh Ban Giám hiệu 4 thầy cô và 120 CB-GV-NV từ "NHÂN SỰ MỚI".</li>
                  <li>Kiểm tra chuyên đề giáo dục hòa nhập cho 25 học sinh khuyết tật theo CV 3326.</li>
                  <li>Số hóa 100% học bạ điện tử, chữ ký số và đồng bộ CSDL ngành Đúng - Đủ - Sạch - Sống.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 11 Pillars Detailed Cards */}
          <div className="space-y-4">
            {SCHOOL_INSPECTION_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition overflow-hidden"
              >
                <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                      {pillar.orderNumber}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {pillar.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[11px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-medium">
                          {pillar.sourceRef}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Tần suất: {pillar.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                      <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Đối tượng kiểm tra:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{pillar.target}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                      <span className="font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Lực lượng kiểm tra:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{pillar.force}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Tiêu chí, nội dung & chuẩn kiểm tra chi tiết:
                    </h5>
                    <div className="space-y-1.5">
                      {pillar.standardsAndCriteria.map((std, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/50 p-2 rounded border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{std}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 3: BAN KIỂM TRA NỘI BỘ ==================== */}
      {activeSubTab === 'committee' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 uppercase">
                  Ban Kiểm Tra Nội Bộ Trường Học Năm Học 2026 - 2027
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thành lập theo <strong>Quyết định số 49/QĐ-THCS-THPTĐBK</strong> ngày 15/10/2026 của Hiệu trưởng Lê Thanh Cường · Danh sách nhân sự chuẩn 100% theo tệp <strong>NHÂN SỰ MỚI.xlsx</strong>
                </p>
              </div>
              <a
                href="/downloads/QUYET_DINH_BAN_KIEM_TRA_NOI_BO_2026_2027.docx"
                download
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Tải Quyết định (Mẫu 02)</span>
              </a>
            </div>

            {/* Committee Leadership Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    LC
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200 text-blue-900 uppercase">
                      Trưởng ban
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Lê Thanh Cường</h4>
                    <p className="text-xs text-slate-600">Hiệu trưởng</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 border-t border-blue-200/80 pt-2.5 leading-relaxed">
                  Chỉ đạo toàn diện công tác KTNB; phê duyệt kế hoạch, ký quyết định kiểm tra và ban hành thông báo kết quả; trực tiếp kiểm tra quản lý tài chính, tài sản, phòng chống tham nhũng.
                </p>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    MT
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-200 text-sky-900 uppercase">
                      Phó Trưởng ban TT
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Nguyễn Minh Trí</h4>
                    <p className="text-xs text-slate-600">Phó Hiệu trưởng (Chuyên môn toàn trường & THPT)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 border-t border-sky-200/80 pt-2.5 leading-relaxed">
                  Thường trực ban kiểm tra; phụ trách theo dõi chuyên môn cấp THPT (Khối 10, 11, 12 tại Điểm chính); trưởng các đoàn kiểm tra quy chế chuyên môn, thi cử và quản lý dạy thêm học thêm.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    PT
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 uppercase">
                      Phó Trưởng ban
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Phan Thanh Thảo</h4>
                    <p className="text-xs text-slate-600">Phó Hiệu trưởng (Phụ trách Điểm THCS Đốc Binh Kiều)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 border-t border-amber-200/80 pt-2.5 leading-relaxed">
                  Phụ trách kiểm tra tại Điểm trường THCS Đốc Binh Kiều (24 lớp, 980 HS); kiểm tra cơ sở vật chất, thiết bị, an toàn trường học và giáo dục hòa nhập học sinh khuyết tật.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    TT
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900 uppercase">
                      Phó Trưởng ban
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Nguyễn Thanh Tòng</h4>
                    <p className="text-xs text-slate-600">Phó Hiệu trưởng (Phụ trách Điểm THCS Tân Kiều)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-3 border-t border-emerald-200/80 pt-2.5 leading-relaxed">
                  Phụ trách kiểm tra tại Điểm trường THCS Tân Kiều cách 11km (15 lớp, 602 HS); kiểm tra thực hiện CT GDPT 2018, bảo quản thiết bị dạy học và hoạt động bán trú.
                </p>
              </div>
            </div>

            {/* Full Members Table */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Danh sách chi tiết {SCHOOL_INSPECTION_COMMITTEE.length} thành viên & Phân công nhiệm vụ cụ thể (Chuẩn từ file Excel "NHÂN SỰ MỚI"):
              </h4>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                ✓ 100% Khớp tệp NHÂN SỰ MỚI.xlsx
              </span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-100 font-bold text-slate-800 uppercase text-[11px]">
                  <tr>
                    <th scope="col" className="px-3 py-2.5 text-center w-12">STT</th>
                    <th scope="col" className="px-4 py-2.5 min-w-[160px]">Họ và tên</th>
                    <th scope="col" className="px-4 py-2.5 min-w-[160px]">Chức vụ tại trường</th>
                    <th scope="col" className="px-3 py-2.5 min-w-[130px]">Nhiệm vụ trong Ban</th>
                    <th scope="col" className="px-4 py-2.5 min-w-[320px]">Phân công nhiệm vụ kiểm tra cụ thể</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {SCHOOL_INSPECTION_COMMITTEE.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 text-center font-bold text-slate-600 bg-slate-50/50">
                        {m.orderNumber}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        {m.fullName}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {m.roleInSchool}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          m.roleInCommittee === 'Trưởng ban'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : m.roleInCommittee.includes('Phó Trưởng ban')
                            ? 'bg-sky-100 text-sky-800 border border-sky-300'
                            : m.roleInCommittee === 'Thư ký'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {m.roleInCommittee}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 leading-relaxed">
                        {m.assignedDuty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Principles & Operation Rules */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h5 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Nguyên tắc và Quy chế hoạt động của Ban Kiểm tra nội bộ
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                <p>• <strong>Nguyên tắc làm việc:</strong> Tuân thủ đúng quy định của pháp luật; bảo đảm tính chính xác, khách quan, công khai, dân chủ và kịp thời; không chồng chéo và không gây cản trở hoạt động dạy - học bình thường.</p>
                <p>• <strong>Quyền hạn của kiểm tra viên:</strong> Có quyền yêu cầu đối tượng kiểm tra cung cấp kịp thời, chính xác thông tin, tài liệu và giải trình các vấn đề liên quan; lập biên bản tại hiện trường theo đúng mẫu quy định.</p>
                <p>• <strong>Quy trình xử lý:</strong> Sau mỗi cuộc kiểm tra, Trưởng đoàn phải tổng hợp báo cáo (Mẫu 05) trình Hiệu trưởng xem xét ban hành Thông báo kết quả kiểm tra (Mẫu 06) để công khai và theo dõi khắc phục.</p>
                <p>• <strong>Lưu trữ hồ sơ:</strong> Toàn bộ biên bản, tài liệu minh chứng của từng cuộc kiểm tra phải bàn giao cho cán bộ văn thư lưu trữ theo quy định tại Nghị định 30/2020/NĐ-CP và Thông tư số 08/2025/TT-BGDĐT.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 4: 4 VĂN BẢN CHỈ ĐẠO & THAM KHẢO ==================== */}
      {activeSubTab === 'directives' && (
        <div className="space-y-6">
          {/* Directive Selector Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICIAL_INSPECTION_DIRECTIVES.map((dir) => (
              <div
                key={dir.id}
                onClick={() => setSelectedDirective(dir)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  selectedDirective.id === dir.id
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      dir.id === 'cv-3953-2026'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : dir.id === 'hd-1134-2025'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : dir.id === 'kh-76-thptdbk-2025'
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-teal-100 text-teal-900 border border-teal-200'
                    }`}>
                      {dir.id === 'cv-3953-2026'
                        ? 'Năm mới (2026-2027)'
                        : dir.id === 'hd-1134-2025'
                        ? 'Hướng dẫn Sở GDĐT'
                        : dir.id === 'kh-76-thptdbk-2025'
                        ? 'Tham khảo THPT cũ'
                        : 'Tham khảo THCS cũ'}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                      .{dir.fileFormat?.toUpperCase() || 'PDF'}
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm leading-snug">{dir.number}</div>
                  <div className="text-xs text-slate-600 mt-1 line-clamp-2">{dir.title}</div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                  <span className="font-semibold text-slate-700 truncate max-w-[120px]">{dir.signBy}</span>
                  <span className="text-blue-600 font-medium flex items-center gap-1 shrink-0">
                    Xem chi tiết <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Directive Viewer */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  {selectedDirective.issuer}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {selectedDirective.number}: {selectedDirective.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedDirective.issueDate} • Ký bởi: <strong>{selectedDirective.signBy}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedDirective.fullPdfUrl}
                  download={selectedDirective.pdfFilename}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
                  title={`Tải tệp ${selectedDirective.fileFormat?.toUpperCase() || 'PDF'} gốc`}
                >
                  <Download className="w-4 h-4" />
                  <span>Tải tệp gốc (.{selectedDirective.fileFormat?.toUpperCase() || 'PDF'})</span>
                </a>
                <button
                  onClick={() => handleCopyText(selectedDirective.summary + '\n\n' + selectedDirective.keyPoints.join('\n'), selectedDirective.number)}
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
                  title="Sao chép nội dung văn bản"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Tóm tắt nội dung chỉ đạo trọng tâm
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedDirective.summary}
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Các quy định và chỉ đạo then chốt:
              </h4>
              <div className="space-y-2.5">
                {selectedDirective.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-50/70 p-3 rounded-lg border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporting Deadlines (if any) */}
            {selectedDirective.deadlines && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Chế độ thông tin, báo cáo gửi Sở GDĐT bắt buộc (qua Phòng Tổ chức cán bộ):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedDirective.deadlines.map((dl, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/60">
                      <div className="text-[11px] font-bold text-amber-900">{dl.dueDate}</div>
                      <div className="text-xs text-slate-800 font-semibold mt-1">{dl.task}</div>
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-700 font-medium">
                        <Clock className="w-3 h-3" />
                        <span>Bắt buộc gửi đúng thời hạn</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Officer at Department */}
            {selectedDirective.contactOfficer && (
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-blue-950">Đầu mối phụ trách công tác kiểm tra của Sở GDĐT Đồng Tháp:</div>
                  <div className="text-slate-700 mt-0.5">
                    <strong>Ông {selectedDirective.contactOfficer.name}</strong> • {selectedDirective.contactOfficer.department}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${selectedDirective.contactOfficer.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-blue-300 font-semibold text-blue-800 hover:bg-blue-100 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>{selectedDirective.contactOfficer.phone}</span>
                  </a>
                  <a
                    href={`mailto:${selectedDirective.contactOfficer.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-blue-300 font-semibold text-blue-800 hover:bg-blue-100 transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>{selectedDirective.contactOfficer.email}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 4: TRỌN BỘ 06 BIỂU MẪU ==================== */}
      {activeSubTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase">
                  Trọn Bộ 06 Biểu Mẫu Chuẩn Nghiệp Vụ Kiểm Tra Nội Bộ (Phụ lục HD 1134)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chọn biểu mẫu để xem cấu trúc chuẩn, sao chép hoặc tải về file Word (.docx)
                </p>
              </div>
              <a
                href="/downloads/TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx"
                download
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Tải trọn bộ 06 biểu mẫu (.docx)</span>
              </a>
            </div>

            {/* Template Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {OFFICIAL_INSPECTION_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.formId}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                    selectedTemplate.formId === tmpl.formId
                      ? 'bg-blue-50 border-blue-600 shadow-sm ring-1 ring-blue-500'
                      : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white'
                  }`}
                >
                  <span className="text-[10px] font-bold text-blue-800 uppercase">
                    {tmpl.formNumber}
                  </span>
                  <div className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">
                    {tmpl.title}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2">
                    {tmpl.signAuthority.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Template Viewer */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-900 uppercase">
                  {selectedTemplate.formNumber}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  {selectedTemplate.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Mục đích: <strong>{selectedTemplate.purpose}</strong> • Ký bởi: <strong>{selectedTemplate.signAuthority}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const text = `${selectedTemplate.sampleData.title}\n\n` +
                      selectedTemplate.sampleData.sections.map((s) => `${s.heading}\n${s.content}`).join('\n\n');
                    handleCopyText(text, selectedTemplate.formNumber);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép mẫu</span>
                </button>
                <a
                  href="/downloads/TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx"
                  download
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Word (.docx)</span>
                </a>
              </div>
            </div>

            {/* A4 Preview Container */}
            <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-300 rounded-lg shadow-inner p-8 text-slate-900 font-serif leading-relaxed text-sm">
              {/* Official Header Table */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-300 text-xs font-sans">
                <div className="text-center">
                  <div className="font-semibold uppercase text-slate-700">SỞ GDĐT ĐỒNG THÁP</div>
                  <div className="font-bold uppercase text-slate-900">TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU</div>
                  <div className="text-slate-400">————————</div>
                  <div className="text-[11px] font-semibold text-slate-700 mt-1">
                    Số: ..... /QĐ-THCS-THPTĐBK
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold uppercase text-slate-900">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                  <div className="font-bold text-slate-900 underline underline-offset-4">Độc lập - Tự do - Hạnh phúc</div>
                  <div className="text-[11px] italic text-slate-600 mt-2">
                    Tháp Mười, ngày ... tháng ... năm 2026
                  </div>
                </div>
              </div>

              {/* Document Title */}
              <div className="text-center my-6 space-y-1">
                <div className="text-lg font-bold uppercase tracking-tight text-slate-900 font-sans">
                  {selectedTemplate.sampleData.title}
                </div>
                <div className="text-xs italic text-slate-600 font-sans">
                  ({selectedTemplate.formNumber} - Kèm theo Hướng dẫn 1134/SGDĐT-TCCB)
                </div>
              </div>

              {/* Sample Sections */}
              <div className="space-y-4 my-6 text-xs text-slate-800 leading-relaxed font-sans">
                {selectedTemplate.sampleData.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="font-bold text-slate-900 text-xs">{sec.heading}</div>
                    <div className="text-slate-700 pl-3 border-l-2 border-blue-400">
                      {sec.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-300 text-xs font-sans">
                <div className="space-y-1 text-slate-600">
                  <div className="font-bold italic text-slate-800">Nơi nhận:</div>
                  <div>- Sở GDĐT Đồng Tháp (để báo cáo);</div>
                  <div>- Như quy định;</div>
                  <div>- Lưu: VT, Ban KTNB.</div>
                </div>
                <div className="text-center space-y-16">
                  <div className="font-bold uppercase text-slate-900">
                    {selectedTemplate.signAuthority}
                  </div>
                  <div className="font-bold text-slate-900">
                    (Ký tên và đóng dấu)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 5: TIẾN ĐỘ BÁO CÁO & LƯU TRỮ ==================== */}
      {activeSubTab === 'compliance' && (
        <div className="space-y-6">
          {/* 3 Mandatory Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900 uppercase">
                Chế Độ Báo Cáo Sở GDĐT Đồng Tháp (Công Văn Số 3953/SGDĐT-TCCB)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Thủ trưởng đơn vị chịu trách nhiệm gửi hồ sơ kiểm tra nội bộ trực tiếp về Sở Giáo dục và Đào tạo
              (qua Phòng Tổ chức cán bộ, email: <strong>tochuccanbo@dongthap.edu.vn</strong>) theo 3 mốc thời hạn sau:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Milestone 1 */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200 text-blue-900 uppercase">
                    Mốc 1
                  </span>
                </div>
                <div className="text-xs font-bold text-blue-900 uppercase">Trước ngày 31 tháng 10 năm 2026</div>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  Kế hoạch KTNB & Quyết định thành lập Ban KTNB
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Gồm Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 (Số 48/KH) và Quyết định thành lập Ban KTNB gồm 12 thành viên (Số 49/QĐ).
                </p>
                <div className="mt-4 pt-3 border-t border-blue-200/80 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Đã hoàn thiện hồ sơ
                  </span>
                  <a
                    href="/downloads/KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx"
                    download
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Tải file nộp
                  </a>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 uppercase">
                    Mốc 2
                  </span>
                </div>
                <div className="text-xs font-bold text-amber-800 uppercase">Trước ngày 20 tháng 01 năm 2027</div>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  Báo cáo sơ kết công tác KTNB Học kỳ I
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Tổng hợp kết quả 8 cuộc kiểm tra đợt HK1 (từ tháng 10/2026 đến tháng 01/2027), đánh giá việc khắc phục tồn tại của các bộ phận.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Sẽ thực hiện vào tháng 01/2027
                  </span>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 uppercase">
                    Mốc 3
                  </span>
                </div>
                <div className="text-xs font-bold text-indigo-900 uppercase">Trước ngày 18 tháng 5 năm 2027</div>
                <h4 className="text-sm font-bold text-slate-900 mt-2">
                  Báo cáo tổng kết năm học & Chấm điểm thi đua
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Báo cáo tổng kết 14 cuộc kiểm tra của toàn năm học và kết quả tự đánh giá chấm điểm tiêu chí thi đua công tác KTNB cơ sở giáo dục.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    Sẽ thực hiện vào tháng 05/2027
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Archive Checklist (Decree 30 and Circular 08) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase">
                Danh Mục Hồ Sơ Lưu Trữ Chuẩn Của Một Cuộc Kiểm Tra
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Quy định theo Nghị định 30/2020/NĐ-CP của Chính phủ về công tác văn thư và Thông tư 08/2025/TT-BGDĐT của Bộ GDĐT
              </p>
            </div>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {INSPECTION_ARCHIVE_CHECKLIST.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{item.item}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{item.note}</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold shrink-0 ${
                    item.required
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.required ? 'Bắt buộc' : 'Tùy cuộc kiểm tra'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

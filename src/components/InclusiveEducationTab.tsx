import React, { useState } from 'react';
import { 
  HeartHandshake, 
  FileText, 
  Download, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  Printer, 
  Edit3, 
  Sparkles, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  ClipboardList,
  Eye,
  Award,
  HelpCircle,
  FileCheck,
  Calendar,
  Layers,
  Smile,
  BadgeCheck
} from 'lucide-react';
import { 
  DIRECTIVE_3326_GDHN, 
  OFFICIAL_INCLUSIVE_EDUCATION_PLAN, 
  INCLUSIVE_STUDENTS_LIST, 
  InclusiveStudentProfile 
} from '../data/inclusiveEducationData';
import { SchoolDocument } from '../types/document';
import { exportDocumentToDocx } from '../utils/docxExport';

interface InclusiveEducationTabProps {
  onOpenDocumentInEditor: (doc: SchoolDocument) => void;
  onContextualizeDirective?: (directive: any) => void;
}

export const InclusiveEducationTab: React.FC<InclusiveEducationTabProps> = ({
  onOpenDocumentInEditor,
  onContextualizeDirective
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'plan' | 'directive' | 'template' | 'students' | 'policies'>('plan');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedDisability, setSelectedDisability] = useState<string>('all');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<InclusiveStudentProfile | null>(null);
  const [isExportingWord, setIsExportingWord] = useState(false);

  // Filter students
  const filteredStudents = INCLUSIVE_STUDENTS_LIST.filter(student => {
    const matchSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.disabilityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.leadTeacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCampus = selectedCampus === 'all' || student.schoolCampus.includes(selectedCampus);
    const matchDisability = selectedDisability === 'all' || student.disabilityType.toLowerCase().includes(selectedDisability.toLowerCase());
    return matchSearch && matchCampus && matchDisability;
  });

  // Handle export Word of the School Plan
  const handleExportPlanWord = async () => {
    try {
      setIsExportingWord(true);
      await exportDocumentToDocx(OFFICIAL_INCLUSIVE_EDUCATION_PLAN);
    } catch (e) {
      console.error('Lỗi xuất file Word kế hoạch:', e);
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-red-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 border border-rose-300/30 text-rose-100 text-xs font-semibold backdrop-blur-sm">
                <HeartHandshake className="w-4 h-4 text-rose-200" />
                <span>Chuyên mục Giáo Dục Hòa Nhập · Năm học 2026 - 2027</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Giáo Dục Hòa Nhập Học Sinh Khuyết Tật
              </h1>
              <p className="text-rose-100/90 text-sm max-w-3xl leading-relaxed">
                Thực hiện <strong>Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở GDĐT Đồng Tháp</strong> và <strong>Kế hoạch số 35/KH-THCS&THPTĐBK</strong> của Trường THCS và THPT Đốc Binh Kiều. Đảm bảo quyền học tập bình đẳng, nhân văn, 100% học sinh khuyết tật có Kế hoạch giáo dục cá nhân (KHGDCN).
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                onClick={() => onOpenDocumentInEditor(OFFICIAL_INCLUSIVE_EDUCATION_PLAN)}
                className="px-4 py-2.5 rounded-xl bg-white text-rose-800 hover:bg-rose-50 text-xs font-bold flex items-center gap-2 shadow-md transition transform hover:-translate-y-0.5"
                title="Mở Kế hoạch số 35/KH-THCS&THPTĐBK trong Trình soạn thảo A4 Word"
              >
                <Edit3 className="w-4 h-4 text-rose-700" />
                <span>Mở Soạn Thảo Kế Hoạch 35</span>
              </button>

              <button
                onClick={handleExportPlanWord}
                disabled={isExportingWord}
                className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white border border-rose-400/40 text-xs font-semibold flex items-center gap-2 transition"
                title="Tải file Word Kế hoạch số 35/KH-THCS&THPTĐBK (.docx)"
              >
                <Download className="w-4 h-4" />
                <span>{isExportingWord ? 'Đang xuất Word...' : 'Tải File Word Kế Hoạch'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-rose-500/30">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>HS Khuyết tật toàn trường</span>
              </div>
              <div className="text-2xl font-black mt-1 text-white">25 <span className="text-xs font-normal text-rose-200">em / 2.111 HS</span></div>
              <div className="text-[11px] text-rose-200 mt-0.5">Tỷ lệ 1,18% (100% học hòa nhập)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Phân bổ 03 Điểm trường</span>
              </div>
              <div className="text-2xl font-black mt-1 text-white">3 <span className="text-xs font-normal text-rose-200">Điểm</span></div>
              <div className="text-[11px] text-rose-200 mt-0.5">THPT: 3 | ĐBK: 16 | Tân Kiều: 6</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Kế hoạch GD cá nhân (KHGDCN)</span>
              </div>
              <div className="text-2xl font-black mt-1 text-white">100% <span className="text-xs font-normal text-rose-200">(25/25 em)</span></div>
              <div className="text-[11px] text-rose-200 mt-0.5">Lập trước 30/9/2026 theo mẫu Sở</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quy định sĩ số & Chế độ</span>
              </div>
              <div className="text-2xl font-black mt-1 text-white">&le; 2 <span className="text-xs font-normal text-rose-200">em / lớp</span></div>
              <div className="text-[11px] text-rose-200 mt-0.5">100% GV hưởng phụ cấp hòa nhập</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('plan')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'plan'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>1. Kế Hoạch Trường (Số 35/KH)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('directive')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'directive'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>2. Công Văn Sở (Số 3326/SGDĐT)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('template')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'template'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>3. Biểu Mẫu KHGD Cá Nhân (Phụ Lục)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('students')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'students'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>4. Danh Sách 25 HSKT (3 Điểm Trường)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('policies')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'policies'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>5. Chế Độ Chính Sách & Phụ Cấp GV</span>
        </button>
      </div>

      {/* SUB-TAB 1: KẾ HOẠCH TRƯỜNG (SỐ 35/KH-THCS&THPTĐBK) */}
      {activeSubTab === 'plan' && (
        <div className="space-y-6">
          {/* Action cards banner */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                  {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.documentNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">Ban hành ngày: {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signDate}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                  Chính thức hiệu lực
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.title} - {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.subTitle}
              </h2>
              <p className="text-xs text-slate-600">
                Người ký duyệt: <strong>KT. HIỆU TRƯỞNG / PHÓ HIỆU TRƯỞNG - Nguyễn Minh Trí</strong> · Nơi nhận: Sở GDĐT Đồng Tháp, UBND các xã, 07 tổ trong trường, Lưu: VT, Tr.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onOpenDocumentInEditor(OFFICIAL_INCLUSIVE_EDUCATION_PLAN)}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition"
              >
                <Edit3 className="w-4 h-4" />
                <span>Xem & Sửa trên giao diện Word</span>
              </button>

              <button
                onClick={handleExportPlanWord}
                disabled={isExportingWord}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-blue-700" />
                <span>Tải Word (.docx)</span>
              </button>
            </div>
          </div>

          {/* Key Principles Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>1. Nguyên tắc bố trí lớp</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                Mỗi lớp hòa nhập <strong>không quá 02 (hai) học sinh khuyết tật</strong>. Bố trí các lớp học ở tầng trệt (tầng 1) tại cả 3 điểm trường, giảm sĩ số lớp theo Điều 15 Thông tư 03/2018/TT-BGDĐT.
              </p>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <ClipboardList className="w-4 h-4 text-blue-700" />
                <span>2. Kế hoạch cá nhân (KHGDCN)</span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                100% học sinh khuyết tật được GVCN chủ trì lập KHGDCN trước 30/9/2026. Giáo viên bộ môn tích hợp hỗ trợ vào giáo án hiện có, <strong>không yêu cầu làm thêm giáo án riêng</strong>.
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <BadgeCheck className="w-4 h-4 text-emerald-700" />
                <span>3. Miễn giảm môn & Đánh giá</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Miễn giảm môn GDTC, GDQP-AN, Ngoại ngữ theo TTLT 42/2013 đối với HSKT không đáp ứng được. Đánh giá dựa trên sự tiến bộ theo KHGDCN, <strong>không lập sổ theo dõi riêng rườm rà</strong>.
              </p>
            </div>
          </div>

          {/* Full plan preview in official A4 paper style */}
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
            {/* Header national title */}
            <div className="grid grid-cols-12 gap-2 text-slate-900 pb-4 border-b border-slate-200">
              <div className="col-span-5 text-center">
                <p className="text-xs font-semibold">{OFFICIAL_INCLUSIVE_EDUCATION_PLAN.issuingAuthorityTop}</p>
                <p className="text-xs font-bold uppercase whitespace-pre-line mt-0.5">{OFFICIAL_INCLUSIVE_EDUCATION_PLAN.issuingAuthority}</p>
                <div className="w-24 border-b border-slate-900 mx-auto my-1"></div>
                <p className="text-xs font-mono font-semibold">{OFFICIAL_INCLUSIVE_EDUCATION_PLAN.documentNumber}</p>
              </div>

              <div className="col-span-7 text-center">
                <p className="text-xs font-bold uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <p className="text-xs font-bold mt-0.5">Độc lập - Tự do - Hạnh phúc</p>
                <div className="w-36 border-b border-slate-900 mx-auto my-1"></div>
                <p className="text-xs italic mt-1">{OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signDate}</p>
              </div>
            </div>

            {/* Title */}
            <div className="text-center py-2 space-y-1">
              <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-slate-900">
                {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.title}
              </h1>
              <p className="text-sm font-semibold text-slate-800">
                {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.subTitle}
              </p>
            </div>

            {/* Legal bases */}
            <div className="text-xs text-slate-700 italic space-y-1 pl-4 border-l-2 border-rose-300">
              {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.legalBases?.map((base, idx) => (
                <p key={idx}>Căn cứ {base};</p>
              ))}
              <p>Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch thực hiện công tác giáo dục hòa nhập học sinh khuyết tật năm học 2026 - 2027 với các nội dung cụ thể sau:</p>
            </div>

            {/* Sections */}
            <div className="space-y-6 text-xs text-slate-800 leading-relaxed">
              {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide bg-slate-50 px-3 py-1.5 rounded-lg border-l-4 border-rose-600">
                    {sec.heading}
                  </h3>
                  <div className="whitespace-pre-line pl-2 text-justify">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Signer block & Recipients */}
            <div className="grid grid-cols-12 gap-4 pt-6 border-t border-slate-200">
              <div className="col-span-6 text-xs text-slate-700 space-y-1">
                <p className="font-bold italic">Nơi nhận:</p>
                {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.recipients.map((r, i) => (
                  <p key={i} className="pl-2">- {r}</p>
                ))}
              </div>

              <div className="col-span-6 text-center space-y-1">
                <p className="text-xs font-bold uppercase whitespace-pre-line leading-tight">
                  {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signerRole}
                </p>
                <div className="h-16 flex items-center justify-center italic text-slate-400 text-[11px]">
                  (Đã ký duyệt)
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signerName}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CÔNG VĂN SỞ (SỐ 3326/SGDĐT-GDPT) */}
      {activeSubTab === 'directive' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {DIRECTIVE_3326_GDHN.documentNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">Ký ngày: {DIRECTIVE_3326_GDHN.signDate}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                  {DIRECTIVE_3326_GDHN.signer}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {DIRECTIVE_3326_GDHN.title}
              </h2>
              <p className="text-xs text-slate-600">
                {DIRECTIVE_3326_GDHN.summary}
              </p>
            </div>

            {onContextualizeDirective && (
              <button
                onClick={() => onContextualizeDirective(DIRECTIVE_3326_GDHN)}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cụ thể hóa thành kế hoạch khác</span>
              </button>
            )}
          </div>

          {/* Full content box */}
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-rose-700" />
                <span>Toàn văn hướng dẫn chính thức từ Sở GDĐT Đồng Tháp</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Trang 1 / 5 (Toàn văn Công văn 3326)</span>
            </div>

            <pre className="text-xs text-slate-800 font-sans whitespace-pre-line leading-relaxed text-justify select-text">
              {DIRECTIVE_3326_GDHN.fullContent}
            </pre>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BIỂU MẪU KẾ HOẠCH GIÁO DỤC CÁ NHÂN (PHỤ LỤC CV 3326) */}
      {activeSubTab === 'template' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
                <ClipboardList className="w-3.5 h-3.5 text-blue-600" />
                <span>Phụ lục chính thức ban hành kèm Công văn số 3326/SGDĐT-GDPT</span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Kế Hoạch Giáo Dục Cá Nhân (KHGDCN) Học Sinh Khuyết Tật Học Hòa Nhập
              </h2>
              <p className="text-xs text-slate-600">
                Biểu mẫu chuẩn 9 mục dùng cho Giáo viên chủ nhiệm và Giáo viên bộ môn xây dựng đầu mỗi năm học và đánh giá sự tiến bộ theo từng học kỳ.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>In biểu mẫu</span>
              </button>
            </div>
          </div>

          {/* Interactive Document Form Preview */}
          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-1 pb-4 border-b border-slate-200">
              <p className="text-xs font-bold uppercase text-slate-500">PHỤ LỤC</p>
              <h2 className="text-base sm:text-lg font-bold uppercase text-slate-900">
                KẾ HOẠCH GIÁO DỤC CÁ NHÂN (THAM KHẢO)
              </h2>
              <p className="text-xs italic text-slate-600">
                (Đính kèm Công văn số 3326/SGDĐT-GDPT ngày 27 tháng 8 năm 2026 của Sở GDĐT Đồng Tháp)
              </p>
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-900 uppercase">TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU</p>
                <h3 className="text-sm font-bold uppercase text-rose-800 mt-1">
                  KẾ HOẠCH GIÁO DỤC CÁ NHÂN HỌC SINH KHUYẾT TẬT HỌC HÒA NHẬP
                </h3>
                <p className="text-xs italic text-slate-600">NĂM HỌC 2026 - 2027</p>
              </div>
            </div>

            {/* Section I */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-900 bg-slate-100 px-3 py-1.5 rounded">
                I. THÔNG TIN CHUNG CỦA HỌC SINH
              </h4>
              <div className="grid grid-cols-12 gap-3 text-xs text-slate-800">
                <div className="col-span-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600 min-w-28">Họ và tên học sinh:</span>
                    <span className="font-bold text-slate-900 border-b border-dashed border-slate-300 flex-1 pb-0.5">Lê Văn An (Mẫu minh họa)</span>
                    <span className="font-semibold text-slate-600 ml-4">Giới tính:</span>
                    <span className="font-bold">Nam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600 min-w-28">Ngày tháng năm sinh:</span>
                    <span className="border-b border-dashed border-slate-300 flex-1 pb-0.5">14/05/2011</span>
                    <span className="font-semibold text-slate-600 ml-4">Dân tộc:</span>
                    <span className="border-b border-dashed border-slate-300 pb-0.5">Kinh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600 min-w-28">Lớp / Điểm trường:</span>
                    <span className="border-b border-dashed border-slate-300 flex-1 pb-0.5">10A1 - Điểm chính (Cấp THPT)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600 min-w-28">Dạng tật / Mức độ:</span>
                    <span className="font-semibold text-rose-800 border-b border-dashed border-slate-300 flex-1 pb-0.5">
                      Khuyết tật nhìn (Thị lực mắt trái giảm nặng) - Mức độ Nhẹ (Số 42/XN-KT/UBND-ĐBK)
                    </span>
                  </div>
                </div>

                <div className="col-span-4 flex items-center justify-center">
                  <div className="w-24 h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 text-[11px] p-2 text-center bg-slate-50">
                    <Smile className="w-6 h-6 mb-1 text-slate-300" />
                    <span>ẢNH HỌC SINH</span>
                    <span>4 x 6 cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section II */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-900 bg-slate-100 px-3 py-1.5 rounded">
                II. NHỮNG ĐẶC ĐIỂM CHÍNH CỦA HỌC SINH
              </h4>
              <div className="space-y-2 text-xs text-slate-800">
                <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-1">
                  <p className="font-bold text-emerald-900">1. Điểm mạnh của học sinh:</p>
                  <p className="text-slate-700 pl-3 leading-relaxed">
                    - Nhận thức: Tư duy logic tốt, khả năng nghe giảng và ghi nhớ thông tin bằng lời nói nhanh nhạy.<br />
                    - Ngôn ngữ - giao tiếp: Lễ phép, hòa đồng với bạn bè, tích cực tham gia các buổi sinh hoạt lớp.<br />
                    - Kỹ năng tự phục vụ: Tự đi lại trong khuôn viên trường an toàn, tự giác chuẩn bị đồ dùng học tập.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100 space-y-1">
                  <p className="font-bold text-rose-900">2. Hạn chế của học sinh:</p>
                  <p className="text-slate-700 pl-3 leading-relaxed">
                    - Khó khăn trong việc đọc chữ in quá nhỏ (dưới 12pt) hoặc nhìn bảng từ khoảng cách xa trên 3 mét.<br />
                    - Mắt nhanh mỏi khi phải tập trung nhìn vào màn hình máy tính hoặc kính hiển vi trong thời gian dài.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 space-y-1">
                  <p className="font-bold text-blue-900">3. Nhu cầu hỗ trợ:</p>
                  <p className="text-slate-700 pl-3 leading-relaxed">
                    - Bố trí ngồi bàn đầu dãy giữa, phòng học đủ ánh sáng tự nhiên; tài liệu kiểm tra in cỡ chữ 18pt; cho phép bạn cùng bàn đọc to đề bài khi cần thiết.
                  </p>
                </div>
              </div>
            </div>

            {/* Section III & IV & V */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-900 bg-slate-100 px-3 py-1.5 rounded">
                III & IV. MỤC TIÊU VÀ KẾ HOẠCH THỰC HIỆN HỌC KỲ I
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-slate-800 border-collapse border border-slate-300">
                  <thead className="bg-slate-100 text-slate-900 font-bold text-center">
                    <tr>
                      <th className="border border-slate-300 p-2 w-1/4">Yêu cầu cần đạt / Nội dung</th>
                      <th className="border border-slate-300 p-2 w-1/3">Biện pháp và phương tiện hỗ trợ</th>
                      <th className="border border-slate-300 p-2">Người thực hiện</th>
                      <th className="border border-slate-300 p-2 w-20">Kết quả (1-2-3)</th>
                      <th className="border border-slate-300 p-2">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold">1. Môn Toán 10 & Ngữ văn 10</td>
                      <td className="border border-slate-300 p-2">Cung cấp phiếu học tập in cỡ chữ lớn 18pt, cho phép làm bài kiểm tra thêm 10 phút</td>
                      <td className="border border-slate-300 p-2">GV bộ môn Toán, Ngữ văn</td>
                      <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">1 (Đạt)</td>
                      <td className="border border-slate-300 p-2">Học lực Khá</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold">2. Môn Sinh học 10 (Thực hành)</td>
                      <td className="border border-slate-300 p-2">Miễn phần quan sát chi tiết tiêu bản qua kính hiển vi; thay bằng quan sát tranh ảnh phóng to</td>
                      <td className="border border-slate-300 p-2">GV bộ môn Sinh học</td>
                      <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">1 (Đạt)</td>
                      <td className="border border-slate-300 p-2">Theo Quyết định PHT duyệt</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold">3. Kỹ năng hòa nhập xã hội</td>
                      <td className="border border-slate-300 p-2">Tham gia đầy đủ các hoạt động Đoàn trường, sinh hoạt ngoại khóa và câu lạc bộ</td>
                      <td className="border border-slate-300 p-2">GVCN, Đoàn trường</td>
                      <td className="border border-slate-300 p-2 text-center font-bold text-emerald-700">1 (Đạt)</td>
                      <td className="border border-slate-300 p-2">Tích cực, hòa đồng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                * Quy ước kết quả theo dõi: 1 = Đạt mục tiêu đã xác định; 2 = Đạt khi còn cần mức hỗ trợ; 3 = Chưa đạt tại thời điểm đánh giá.
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-center text-xs">
              <div className="space-y-1">
                <p className="font-bold uppercase text-slate-900">NGƯỜI CHỦ TRÌ KHGDCN</p>
                <p className="text-[11px] text-slate-500">(Ký, ghi rõ họ tên)</p>
                <div className="h-12 flex items-center justify-center text-slate-400 italic text-[11px]">(Đã ký)</div>
                <p className="font-bold text-slate-800">Nguyễn Văn Hải</p>
                <p className="text-[11px] text-slate-500">Giáo viên chủ nhiệm</p>
              </div>

              <div className="space-y-1">
                <p className="font-bold uppercase text-slate-900">CHA MẸ / NGƯỜI ĐẠI DIỆN</p>
                <p className="text-[11px] text-slate-500">(Ký, ghi rõ họ tên)</p>
                <div className="h-12 flex items-center justify-center text-slate-400 italic text-[11px]">(Đã ký)</div>
                <p className="font-bold text-slate-800">Lê Văn Hùng</p>
                <p className="text-[11px] text-slate-500">Phụ huynh học sinh</p>
              </div>

              <div className="space-y-1">
                <p className="font-bold uppercase text-slate-900">NGƯỜI ĐỨNG ĐẦU CƠ SỞ GD</p>
                <p className="text-[11px] text-slate-500">(Ký, đóng dấu)</p>
                <div className="h-12 flex items-center justify-center text-slate-400 italic text-[11px]">(KT. HIỆU TRƯỞNG / PHT đã ký)</div>
                <p className="font-bold text-slate-800">Nguyễn Minh Trí</p>
                <p className="text-[11px] text-slate-500">Phó Hiệu trưởng</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DANH SÁCH 25 HSKT (3 ĐIỂM TRƯỜNG) */}
      {activeSubTab === 'students' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm học sinh theo tên, lớp, dạng tật hoặc giáo viên chủ trì..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Campus filter */}
              <select
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 focus:outline-hidden focus:border-rose-500"
              >
                <option value="all">Tất cả điểm trường (3 điểm)</option>
                <option value="Điểm chính">Điểm chính (THPT - 3 HS)</option>
                <option value="Đốc Binh Kiều">Điểm Đốc Binh Kiều (THCS - 16 HS)</option>
                <option value="Tân Kiều">Điểm Tân Kiều (THCS - 6 HS)</option>
              </select>

              {/* Disability filter */}
              <select
                value={selectedDisability}
                onChange={(e) => setSelectedDisability(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 focus:outline-hidden focus:border-rose-500"
              >
                <option value="all">Tất cả dạng khuyết tật</option>
                <option value="trí tuệ">Trí tuệ / Học chậm</option>
                <option value="vận động">Khuyết tật vận động</option>
                <option value="nghe">Thính giác / Khiếm thính</option>
                <option value="nhìn">Thị giác / Khiếm thị</option>
                <option value="ngôn ngữ">Ngôn ngữ / Nói ngọng</option>
                <option value="tự kỷ">Tự kỷ nhẹ</option>
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>Hiển thị <strong>{filteredStudents.length}</strong> / 25 học sinh khuyết tật học hòa nhập</span>
              <span className="text-[11px] text-slate-500 italic">Quản lý bảo mật theo Điều 8 Thông tư 03/2018/TT-BGDĐT</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-800">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3">Mã hồ sơ</th>
                    <th className="p-3">Họ và tên</th>
                    <th className="p-3">Lớp & Điểm trường</th>
                    <th className="p-3">Dạng khuyết tật</th>
                    <th className="p-3">Mức độ</th>
                    <th className="p-3">GV chủ trì KHGDCN</th>
                    <th className="p-3">Môn miễn / giảm</th>
                    <th className="p-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-rose-50/40 transition">
                      <td className="p-3 font-mono text-[11px] text-slate-500">{st.code}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{st.fullName}</div>
                        <div className="text-[11px] text-slate-500">{st.gender} · Sinh năm {st.birthYear}</div>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold font-mono text-[11px] border border-blue-200 mr-1.5">
                          {st.className}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-0.5">{st.schoolCampus}</div>
                      </td>
                      <td className="p-3">
                        <span className="text-slate-800 font-medium">{st.disabilityType}</span>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">XN: {st.certNumber}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          st.disabilityLevel === 'Nhẹ'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {st.disabilityLevel}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700 font-medium">
                        {st.leadTeacher}
                      </td>
                      <td className="p-3 text-[11px] text-slate-600 max-w-xs truncate" title={st.exemptedSubjects}>
                        {st.exemptedSubjects}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedStudentForModal(st)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-semibold border border-rose-200 transition"
                        >
                          Chi tiết hồ sơ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CHẾ ĐỘ CHÍNH SÁCH & PHỤ CẤP GV */}
      {activeSubTab === 'policies' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Policy for students */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                <HeartHandshake className="w-5 h-5 text-rose-600" />
                <span>1. Chế độ chính sách dành cho 25 học sinh khuyết tật</span>
              </div>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">a) Miễn 100% học phí và các khoản thu dịch vụ giáo dục:</p>
                  <p className="text-slate-600">
                    Căn cứ Nghị định số 81/2021/NĐ-CP của Chính phủ, toàn bộ 25 em học sinh khuyết tật học hòa nhập tại trường được miễn 100% học phí trong suốt các năm học.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">b) Hỗ trợ chi phí học tập hàng tháng:</p>
                  <p className="text-slate-600">
                    Thực hiện theo Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC: Học sinh khuyết tật thuộc hộ nghèo, cận nghèo được hưởng học bổng chính sách và hỗ trợ mua sắm đồ dùng học tập hàng năm.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">c) Ưu tiên tuyển sinh và xét tốt nghiệp:</p>
                  <p className="text-slate-600">
                    Được tuyển thẳng vào lớp 10 THPT công lập theo Quy chế tuyển sinh của Bộ GDĐT; được miễn thi hoặc ưu tiên xét công nhận tốt nghiệp THCS, tốt nghiệp THPT theo kết quả thực hiện KHGDCN.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy for teachers */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <Award className="w-5 h-5 text-blue-600" />
                <span>2. Chế độ phụ cấp giảng dạy hòa nhập cho giáo viên</span>
              </div>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200 space-y-1">
                  <p className="font-bold text-blue-900">a) Phụ cấp trách nhiệm giảng dạy hòa nhập (TTLT 42/2013):</p>
                  <p className="text-slate-700">
                    Nhà giáo trực tiếp dạy học sinh khuyết tật trong lớp học hòa nhập được tính hưởng phụ cấp theo công thức:
                  </p>
                  <div className="bg-white p-2.5 rounded border border-blue-200 font-mono text-[11px] text-blue-900 my-1">
                    Tiền phụ cấp = (Tiền lương 1 giờ dạy) &times; 0,2 &times; (Tổng số giờ thực dạy có HSKT)
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Áp dụng cho cả giáo viên bộ môn và giáo viên chủ nhiệm có học sinh khuyết tật học hòa nhập trong lớp.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">b) Giảm định mức tiết dạy cho giáo viên chủ nhiệm:</p>
                  <p className="text-slate-600">
                    Giáo viên chủ nhiệm lớp có học sinh khuyết tật học hòa nhập được giảm định mức tiết dạy theo quy định của Bộ GDĐT để có thêm thời gian theo dõi, phối hợp gia đình và xây dựng KHGDCN.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">c) Trách nhiệm của Tổ Văn phòng - Kế toán trường:</p>
                  <p className="text-slate-600">
                    Hàng tháng/học kỳ tổng hợp số tiết dạy thực tế có HSKT của từng giáo viên, thanh toán kịp thời, công khai theo đúng quy định tài chính.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-800 font-bold border border-rose-200">
                  {selectedStudentForModal.code}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedStudentForModal.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  Lớp {selectedStudentForModal.className} · {selectedStudentForModal.schoolCampus}
                </p>
              </div>

              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg">
                <div>
                  <span className="text-slate-400 text-[11px] block">Giới tính & Năm sinh:</span>
                  <span className="font-semibold">{selectedStudentForModal.gender} ({selectedStudentForModal.birthYear})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Mức độ khuyết tật:</span>
                  <span className="font-bold text-rose-700">{selectedStudentForModal.disabilityLevel}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Dạng khuyết tật:</span>
                <p className="text-slate-900 font-medium mt-0.5">{selectedStudentForModal.disabilityType}</p>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Giấy xác nhận khuyết tật:</span>
                <p className="font-mono text-slate-800 mt-0.5">{selectedStudentForModal.certNumber} (Cấp ngày: {selectedStudentForModal.certDate})</p>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Giáo viên chủ trì KHGDCN:</span>
                <p className="text-blue-800 font-bold mt-0.5">{selectedStudentForModal.leadTeacher}</p>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Biện pháp hỗ trợ:</span>
                <p className="text-slate-800 mt-0.5 leading-relaxed bg-amber-50 p-2 rounded border border-amber-200">
                  {selectedStudentForModal.supportMeasures}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Nội dung / Môn học được miễn, giảm:</span>
                <p className="text-slate-800 mt-0.5 leading-relaxed bg-emerald-50 p-2 rounded border border-emerald-200">
                  {selectedStudentForModal.exemptedSubjects}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

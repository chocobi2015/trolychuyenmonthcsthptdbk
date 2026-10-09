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
  BadgeCheck,
  Phone,
  MapPin,
  Clock,
  Send
} from 'lucide-react';
import { 
  DIRECTIVE_3326_GDHN, 
  DIRECTIVE_3408_GDHN,
  OFFICIAL_INCLUSIVE_EDUCATION_PLAN, 
  INCLUSIVE_STUDENTS_LIST, 
  INCLUSIVE_DEMAND_SURVEY,
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
  const [activeSubTab, setActiveSubTab] = useState<'plan' | 'students' | 'survey' | 'directive' | 'template' | 'policies'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [selectedDisabilityLevel, setSelectedDisabilityLevel] = useState<string>('all');
  const [selectedDisabilityType, setSelectedDisabilityType] = useState<string>('all');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<InclusiveStudentProfile | null>(null);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Filter students
  const filteredStudents = INCLUSIVE_STUDENTS_LIST.filter(student => {
    const matchSearch = 
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nationalId.includes(searchTerm) ||
      student.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.disabilityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.homeAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm) ||
      student.leadTeacher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCampus = 
      selectedCampus === 'all' || 
      (selectedCampus === 'THPT' && student.schoolCampus.includes('THPT')) ||
      (selectedCampus === 'ĐBK' && student.schoolCampus.includes('Đốc Binh Kiều')) ||
      (selectedCampus === 'Tân Kiều' && student.schoolCampus.includes('Tân Kiều'));

    const matchLevel = 
      selectedDisabilityLevel === 'all' || 
      student.disabilityLevel === selectedDisabilityLevel;

    const matchType = 
      selectedDisabilityType === 'all' || 
      student.disabilityType.toLowerCase().includes(selectedDisabilityType.toLowerCase());

    return matchSearch && matchCampus && matchLevel && matchType;
  });

  // Campus counters
  const countTHPT = INCLUSIVE_STUDENTS_LIST.filter(s => s.schoolCampus.includes('THPT')).length;
  const countDBK = INCLUSIVE_STUDENTS_LIST.filter(s => s.schoolCampus.includes('Đốc Binh Kiều')).length;
  const countTanKieu = INCLUSIVE_STUDENTS_LIST.filter(s => s.schoolCampus.includes('Tân Kiều')).length;
  const countSevere = INCLUSIVE_STUDENTS_LIST.filter(s => s.disabilityLevel === 'Nặng').length;
  const countMild = INCLUSIVE_STUDENTS_LIST.filter(s => s.disabilityLevel === 'Nhẹ').length;

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

  const handlePrintAppendix = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-rose-800 via-rose-900 to-red-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-rose-700/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 border border-rose-300/30 text-rose-100 text-xs font-semibold backdrop-blur-sm">
                <HeartHandshake className="w-4 h-4 text-rose-200" />
                <span>Giáo Dục Hòa Nhập · Năm học 2026 - 2027</span>
                <span className="px-1.5 py-0.2 bg-emerald-500/80 text-white rounded text-[10px] font-bold">Chuẩn Phụ lục CV 3408</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Kế Hoạch & Quản Lý Giáo Dục Hòa Nhập 25 Học Sinh Khuyết Tật
              </h1>
              <p className="text-rose-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Thực hiện <strong>Công văn số 3326/SGDĐT-GDPT</strong> và <strong>Công văn số 3408/SGDĐT-GDPT ngày 04/9/2026 của Sở GDĐT Đồng Tháp</strong>. Đã điều chỉnh chuẩn xác cơ cấu phân bổ tại 03 điểm trường: <strong>03 HS cấp THPT (Điểm chính)</strong>, <strong>10 HS cấp THCS (Điểm Đốc Binh Kiều)</strong> và <strong>12 HS cấp THCS (Điểm Tân Kiều cách 11km)</strong>.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2.5 flex-wrap shrink-0">
              <button
                onClick={() => onOpenDocumentInEditor(OFFICIAL_INCLUSIVE_EDUCATION_PLAN)}
                className="px-4 py-2.5 rounded-xl bg-white text-rose-900 hover:bg-rose-50 text-xs font-bold flex items-center gap-2 shadow-md transition transform hover:-translate-y-0.5"
                title="Mở Kế hoạch số 35/KH-THCS&THPTĐBK trong Trình soạn thảo A4 Word"
              >
                <Edit3 className="w-4 h-4 text-rose-700" />
                <span>Mở Soạn Thảo Kế Hoạch 35</span>
              </button>

              <button
                onClick={handleExportPlanWord}
                disabled={isExportingWord}
                className="px-4 py-2.5 rounded-xl bg-rose-700/80 hover:bg-rose-600 text-white border border-rose-400/40 text-xs font-semibold flex items-center gap-2 transition"
                title="Tải file Word Kế hoạch số 35/KH-THCS&THPTĐBK (.docx)"
              >
                <Download className="w-4 h-4" />
                <span>{isExportingWord ? 'Đang xuất Word...' : 'Tải File Word Kế Hoạch 35'}</span>
              </button>

              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white border border-amber-400/40 text-xs font-bold flex items-center gap-2 shadow-sm transition"
                title="Xem & In Báo cáo Phụ lục thống kê 25 học sinh (CV 3408)"
              >
                <Printer className="w-4 h-4" />
                <span>Xem Phụ Lục CV 3408</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-rose-500/30">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Tổng số HSKT hòa nhập</span>
              </div>
              <div className="text-2xl font-black mt-1 text-white">25 <span className="text-xs font-normal text-rose-200">em / 2.111 HS</span></div>
              <div className="text-[11px] text-rose-200 mt-0.5">Tỷ lệ 1,18% (100% không bỏ học)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Phân bổ 03 Điểm trường</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-1 text-white">
                THPT: 3 · ĐBK: 10 · TK: 12
              </div>
              <div className="text-[11px] text-amber-200 mt-0.5 font-medium">Tân Kiều (cách 11km): 12 em (48%)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Phân loại mức độ khuyết tật</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-1 text-white">
                Nặng: 06 <span className="text-xs font-normal text-rose-200">| Nhẹ: 19</span>
              </div>
              <div className="text-[11px] text-rose-200 mt-0.5">01 ung bướu ác, 01 nhìn, 01 tâm thần</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-rose-200 text-xs font-medium flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Kế hoạch GD cá nhân (KHGDCN)</span>
              </div>
              <div className="text-2xl font-black mt-1 text-white">100% <span className="text-xs font-normal text-rose-200">(25/25 em)</span></div>
              <div className="text-[11px] text-rose-200 mt-0.5">Phó HT Nguyễn Minh Trí phê duyệt</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="bg-white rounded-xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('students')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'students'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. Danh Sách 25 HSKT (Phụ Lục CV 3408)</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-900/60 text-rose-100 text-[10px]">25 em</span>
        </button>

        <button
          onClick={() => setActiveSubTab('plan')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'plan'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>2. Kế Hoạch Trường (Số 35/KH - Đã Cập Nhật 3 Điểm)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('survey')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'survey'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>3. Đăng Ký Nhu Cầu Hỗ Trợ GDHN (Phần II CV 3408)</span>
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
          <span>4. Chỉ Đạo Sở (CV 3326 & CV 3408)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('template')}
          className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
            activeSubTab === 'template'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <BadgeCheck className="w-4 h-4" />
          <span>5. Biểu Mẫu KHGD Cá Nhân (CV 3326)</span>
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
          <span>6. Chế Độ Chính Sách & Phụ Cấp GV</span>
        </button>
      </div>

      {/* SUB-TAB 1: DANH SÁCH 25 HSKT THEO PHỤ LỤC CÔNG VĂN 3408/SGDĐT */}
      {activeSubTab === 'students' && (
        <div className="space-y-4">
          {/* Summary Pills of Campuses */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedCampus(selectedCampus === 'THPT' ? 'all' : 'THPT')}
              className={`p-3.5 rounded-xl border text-left transition ${
                selectedCampus === 'THPT'
                  ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Điểm chính (Cấp THPT)</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black">{countTHPT} HS</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Lớp 10CB2 (1 em), 11CB1 (1 em), 11CB3 (1 em) · 100% Khuyết tật trí tuệ
              </p>
            </button>

            <button
              onClick={() => setSelectedCampus(selectedCampus === 'ĐBK' ? 'all' : 'ĐBK')}
              className={`p-3.5 rounded-xl border text-left transition ${
                selectedCampus === 'ĐBK'
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Điểm Đốc Binh Kiều (Cấp THCS)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">{countDBK} HS</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Lớp 6A1, 6A4, 7A2, 7A3, 7A4, 8A1, 8A2, 8A4 · Có 4 em khuyết tật nặng
              </p>
            </button>

            <button
              onClick={() => setSelectedCampus(selectedCampus === 'Tân Kiều' ? 'all' : 'Tân Kiều')}
              className={`p-3.5 rounded-xl border text-left transition ${
                selectedCampus === 'Tân Kiều'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Điểm Tân Kiều (Cấp THCS - cách 11km)</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black">{countTanKieu} HS</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Lớp 6A9, 6A10, 7A9, 8A9, 8A10, 9A9, 9A10 · 12 em (đông nhất, 1 em ung bướu ác)
              </p>
            </button>
          </div>

          {/* Controls Bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo tên học sinh, mã định danh, lớp, địa chỉ, số điện thoại hoặc GV chủ trì..."
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
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 focus:outline-hidden focus:border-rose-500 font-medium"
              >
                <option value="all">Tất cả điểm trường (25 HS)</option>
                <option value="THPT">Điểm chính (THPT - 3 HS)</option>
                <option value="ĐBK">Điểm Đốc Binh Kiều (THCS - 10 HS)</option>
                <option value="Tân Kiều">Điểm Tân Kiều (THCS - 12 HS)</option>
              </select>

              {/* Disability Level filter */}
              <select
                value={selectedDisabilityLevel}
                onChange={(e) => setSelectedDisabilityLevel(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 focus:outline-hidden focus:border-rose-500 font-medium"
              >
                <option value="all">Tất cả mức độ tật</option>
                <option value="Nặng">Mức độ Nặng (06 HS)</option>
                <option value="Nhẹ">Mức độ Nhẹ (19 HS)</option>
              </select>

              {/* Print / Export Button */}
              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
              >
                <Printer className="w-3.5 h-3.5 text-amber-300" />
                <span>In biểu mẫu Phụ lục</span>
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span>Hiển thị <strong>{filteredStudents.length}</strong> / 25 học sinh khuyết tật hòa nhập</span>
                <span className="text-slate-300">·</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  100% học sinh đều đang theo học, 0 em bỏ học
                </span>
              </div>
              <span className="text-[11px] text-slate-500 italic">Số liệu khớp 100% Phụ lục CV 3408/SGDĐT-GDPT ngày 04/9/2026</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-800">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 text-center w-10">STT</th>
                    <th className="p-2.5">Họ và tên học sinh</th>
                    <th className="p-2.5">Mã định danh</th>
                    <th className="p-2.5 text-center">Năm sinh</th>
                    <th className="p-2.5 text-center">Nữ</th>
                    <th className="p-2.5">Lớp & Điểm trường</th>
                    <th className="p-2.5">Dạng tật</th>
                    <th className="p-2.5 text-center">Mức độ</th>
                    <th className="p-2.5">Địa chỉ gia đình</th>
                    <th className="p-2.5">Số ĐT liên hệ</th>
                    <th className="p-2.5 text-center">Hồ sơ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-rose-50/40 transition">
                      <td className="p-2.5 text-center font-bold text-slate-600">{st.stt}</td>
                      <td className="p-2.5">
                        <div className="font-bold text-slate-900">{st.fullName}</div>
                        <div className="text-[11px] text-slate-500">Dân tộc: {st.ethnicity}</div>
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-blue-900 font-semibold">{st.nationalId}</td>
                      <td className="p-2.5 text-center font-mono">{st.birthYear}</td>
                      <td className="p-2.5 text-center font-semibold">
                        {st.isFemale === 'Có' ? (
                          <span className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-800 text-[10px]">Có</span>
                        ) : (
                          <span className="text-slate-400">Không</span>
                        )}
                      </td>
                      <td className="p-2.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold font-mono text-[11px] border border-blue-200 mr-1.5">
                          {st.className}
                        </span>
                        <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                          {st.schoolCampus.includes('Tân Kiều') ? (
                            <span className="text-amber-800 bg-amber-50 px-1 rounded">Điểm Tân Kiều</span>
                          ) : st.schoolCampus.includes('THPT') ? (
                            <span className="text-blue-800 bg-blue-50 px-1 rounded">Điểm chính THPT</span>
                          ) : (
                            <span className="text-emerald-800 bg-emerald-50 px-1 rounded">Điểm Đốc Binh Kiều</span>
                          )}
                        </div>
                      </td>
                      <td className="p-2.5 font-medium text-slate-800">{st.disabilityType}</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          st.disabilityLevel === 'Nặng'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}>
                          {st.disabilityLevel}
                        </span>
                      </td>
                      <td className="p-2.5 text-[11px] text-slate-600 max-w-[180px] leading-tight">
                        {st.homeAddress}
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                        <a href={`tel:${st.phone}`} className="hover:text-blue-600 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{st.phone}</span>
                        </a>
                      </td>
                      <td className="p-2.5 text-center whitespace-nowrap">
                        <button
                          onClick={() => setSelectedStudentForModal(st)}
                          className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-semibold border border-rose-200 transition"
                          title="Xem chi tiết hồ sơ và biện pháp hỗ trợ KHGDCN"
                        >
                          Chi tiết
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

      {/* SUB-TAB 2: KẾ HOẠCH TRƯỜNG SỐ 35/KH (ĐÃ ĐIỀU CHỈNH 3 ĐIỂM TRƯỜNG) */}
      {activeSubTab === 'plan' && (
        <div className="space-y-6">
          {/* Action cards banner */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                  {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.documentNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">Ban hành: {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signDate}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                  Đã cập nhật theo CV 3408
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.title} - {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.subTitle}
              </h2>
              <p className="text-xs text-slate-600">
                Người ký duyệt: <strong>KT. HIỆU TRƯỞNG / PHÓ HIỆU TRƯỞNG - Nguyễn Minh Trí</strong> · Phân bổ: THPT 03 em, Đốc Binh Kiều 10 em, Tân Kiều 12 em.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onOpenDocumentInEditor(OFFICIAL_INCLUSIVE_EDUCATION_PLAN)}
                className="px-3.5 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Mở trong Trình soạn thảo A4 Word</span>
              </button>

              <button
                onClick={handleExportPlanWord}
                disabled={isExportingWord}
                className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Xuất file .docx</span>
              </button>
            </div>
          </div>

          {/* Full Plan Preview Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-6 text-slate-800 font-serif leading-relaxed text-sm">
            {/* Header administrative */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200 font-sans text-xs">
              <div className="text-center space-y-1">
                <p className="font-semibold text-slate-700">SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP</p>
                <p className="font-bold text-slate-900 uppercase">TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU</p>
                <p className="font-mono text-slate-600">{OFFICIAL_INCLUSIVE_EDUCATION_PLAN.documentNumber}</p>
              </div>
              <div className="text-center space-y-1">
                <p className="font-bold text-slate-900">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <p className="font-semibold text-slate-800">Độc lập - Tự do - Hạnh phúc</p>
                <p className="italic text-slate-500">{OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signDate}</p>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-1 font-sans py-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.title}
              </h1>
              <p className="text-sm font-semibold text-slate-700">
                {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.subTitle}
              </p>
            </div>

            {/* Legal Bases */}
            <div className="italic text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100 font-sans">
              <p className="font-semibold not-italic text-slate-700">Căn cứ pháp lý:</p>
              {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.legalBases?.map((base, idx) => (
                <p key={idx} className="pl-3">- {base};</p>
              ))}
            </div>

            {/* Plan Sections */}
            <div className="space-y-6 pt-2 font-sans">
              {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm uppercase text-blue-950 border-b border-slate-100 pb-1">
                    {sec.heading}
                  </h3>
                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed pl-1">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Signatures & Recipients */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 font-sans text-xs">
              <div>
                <p className="font-bold text-slate-800">Nơi nhận:</p>
                <ul className="text-[11px] text-slate-600 space-y-0.5 mt-1">
                  {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.recipients?.map((rec, idx) => (
                    <li key={idx}>- {rec}</li>
                  ))}
                </ul>
              </div>

              <div className="text-center space-y-1">
                <p className="font-bold uppercase text-slate-900">
                  {OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signerRole}
                </p>
                <p className="text-[11px] text-slate-500 italic">(Đã ký đóng dấu)</p>
                <div className="h-16 flex items-center justify-center">
                  <span className="font-serif italic text-blue-900 text-lg opacity-80">Nguyễn Minh Trí</span>
                </div>
                <p className="font-bold text-slate-900">{OFFICIAL_INCLUSIVE_EDUCATION_PLAN.signerName}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ĐĂNG KÝ NHU CẦU HỖ TRỢ GDHN (PHẦN II CV 3408) */}
      {activeSubTab === 'survey' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                PHỤ LỤC - PHẦN II (CV 3408/SGDĐT-GDPT)
              </span>
              <span className="text-xs text-slate-500">Ký báo cáo: Ngày 9 tháng 9 năm 2026</span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              ĐĂNG KÝ NHU CẦU HỖ TRỢ GIÁO DỤC HÒA NHẬP NĂM HỌC 2026 - 2027
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quy ước mức độ cấp thiết: <strong>(1) - Rất cấp thiết</strong>; <strong>(2) - Cấp thiết</strong>; <strong>(3) - Chưa cấp thiết</strong>.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-xs text-left text-slate-800 border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3 text-center w-12 border-r border-slate-200">STT</th>
                  <th className="p-3 w-1/3 border-r border-slate-200">Nội dung nhu cầu hỗ trợ GDHN</th>
                  <th className="p-3 text-center w-44 border-r border-slate-200">Mức độ lựa chọn (1-2-3)</th>
                  <th className="p-3">Ý kiến đề xuất cụ thể của Trường THCS và THPT Đốc Binh Kiều</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INCLUSIVE_DEMAND_SURVEY.map((item) => (
                  <tr key={item.stt} className="hover:bg-slate-50 transition">
                    <td className="p-3 text-center font-bold text-slate-600 border-r border-slate-200">{item.stt}</td>
                    <td className="p-3 font-semibold text-slate-900 border-r border-slate-200">{item.content}</td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                        item.urgencyLevel.includes('(1)')
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : item.urgencyLevel.includes('(2)')
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.urgencyLevel}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 leading-relaxed bg-slate-50/50">
                      {item.schoolNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature block of unit */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex justify-end">
            <div className="text-center space-y-1 w-72">
              <p className="text-xs italic text-slate-600">Đốc Binh Kiều, ngày 9 tháng 9 năm 2026</p>
              <p className="text-xs font-bold uppercase text-slate-900">THỦ TRƯỞNG ĐƠN VỊ</p>
              <p className="text-[11px] text-slate-500 italic">(KT. HIỆU TRƯỞNG / PHÓ HIỆU TRƯỞNG đã ký)</p>
              <div className="h-14 flex items-center justify-center font-serif text-lg text-blue-900 font-bold">
                Nguyễn Minh Trí
              </div>
              <p className="text-xs font-bold text-slate-900">Nguyễn Minh Trí</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CHỈ ĐẠO CỦA SỞ (CV 3326 & CV 3408) */}
      {activeSubTab === 'directive' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card CV 3326 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                  {DIRECTIVE_3326_GDHN.documentNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">{DIRECTIVE_3326_GDHN.signDate}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {DIRECTIVE_3326_GDHN.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {DIRECTIVE_3326_GDHN.summary}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Người ký: {DIRECTIVE_3326_GDHN.signer}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">Đã số hóa</span>
              </div>
            </div>

            {/* Card CV 3408 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  {DIRECTIVE_3408_GDHN.documentNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">{DIRECTIVE_3408_GDHN.signDate}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {DIRECTIVE_3408_GDHN.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {DIRECTIVE_3408_GDHN.summary}
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Người ký: {DIRECTIVE_3408_GDHN.signer}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">Kèm Phụ lục</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: BIỂU MẪU KHGD CÁ NHÂN (CV 3326) */}
      {activeSubTab === 'template' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="text-center space-y-1 pb-4 border-b border-slate-200">
            <p className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
              PHỤ LỤC (Đính kèm Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở GDĐT)
            </p>
            <h2 className="text-lg font-bold text-slate-900 uppercase">
              KẾ HOẠCH GIÁO DỤC CÁ NHÂN (THAM KHẢO)
            </h2>
            <p className="text-slate-600 italic">Năm học: 2026 - 2027</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold uppercase text-slate-900 bg-slate-100 px-3 py-1.5 rounded">
              I. THÔNG TIN CHUNG
            </h4>
            <div className="grid grid-cols-2 gap-3 pl-2">
              <div>- Họ và tên học sinh: <strong>Lương Nguyễn Anh Duy</strong></div>
              <div>- Ngày tháng năm sinh: <strong>2011 (Nam)</strong></div>
              <div>- Học sinh lớp: <strong>10CB2</strong> (Điểm chính THPT)</div>
              <div>- Dạng khuyết tật: <strong>Trí tuệ</strong> (Mức độ: <strong>Nặng</strong>)</div>
              <div>- Địa chỉ gia đình: <strong>Ấp 2, xã Đốc Binh Kiều, Đồng Tháp</strong></div>
              <div>- Số điện thoại liên hệ: <strong>0974034662</strong></div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold uppercase text-slate-900 bg-slate-100 px-3 py-1.5 rounded">
              II. ĐẶC ĐIỂM CHÍNH VÀ BIỆN PHÁP HỖ TRỢ
            </h4>
            <div className="p-3 bg-slate-50 rounded-lg space-y-2">
              <p><strong>1. Điểm mạnh:</strong> Hòa đồng, lễ phép với thầy cô, tự đi lại được.</p>
              <p><strong>2. Hạn chế:</strong> Tiếp thu chậm các môn lý thuyết trừu tượng, tính toán số học phức tạp.</p>
              <p><strong>3. Biện pháp hỗ trợ:</strong> Bố trí ngồi bàn đầu cạnh bạn khá, điều chỉnh giảm độ khó bài tập, ưu tiên rèn luyện kỹ năng sống và giao tiếp xã hội.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-center text-xs">
            <div>
              <p className="font-bold uppercase">NGƯỜI CHỦ TRÌ KHGDCN</p>
              <div className="h-12 flex items-center justify-center italic text-slate-400">(Ký tên)</div>
              <p className="font-semibold">Giáo viên chủ nhiệm</p>
            </div>
            <div>
              <p className="font-bold uppercase">CHA MẸ HỌC SINH</p>
              <div className="h-12 flex items-center justify-center italic text-slate-400">(Ký tên)</div>
              <p className="font-semibold">Đại diện gia đình</p>
            </div>
            <div>
              <p className="font-bold uppercase">HIỆU TRƯỞNG / PHÓ HIỆU TRƯỞNG</p>
              <div className="h-12 flex items-center justify-center italic text-slate-400">(Ký duyệt, đóng dấu)</div>
              <p className="font-semibold">Nguyễn Minh Trí</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: CHẾ ĐỘ CHÍNH SÁCH */}
      {activeSubTab === 'policies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <HeartHandshake className="w-5 h-5 text-rose-600" />
              <span>Chế độ chính sách dành cho 25 học sinh khuyết tật</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <li className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <strong>1. Miễn 100% học phí:</strong> Theo Nghị định 81/2021/NĐ-CP của Chính phủ cho toàn bộ 25 em học sinh.
              </li>
              <li className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <strong>2. Hỗ trợ chi phí học tập:</strong> Hưởng trợ cấp và học bổng chính sách theo Thông tư liên tịch 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC.
              </li>
              <li className="p-2.5 bg-slate-50 rounded border border-slate-100">
                <strong>3. Ưu tiên xét tuyển và tốt nghiệp:</strong> Tuyển thẳng vào lớp 10 THPT; công nhận tốt nghiệp THCS và THPT theo kết quả KHGDCN.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Chế độ phụ cấp giảng dạy hòa nhập cho giáo viên</span>
            </div>
            <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-200 text-xs space-y-2">
              <p className="font-semibold text-blue-900">Công thức tính phụ cấp trách nhiệm giảng dạy hòa nhập (TTLT 42/2013):</p>
              <div className="bg-white p-2 rounded border border-blue-200 font-mono text-[11px] text-blue-950 font-bold">
                Tiền phụ cấp = (Tiền lương 1 giờ dạy) &times; 0,2 &times; (Tổng số giờ thực dạy có HSKT)
              </div>
              <p className="text-slate-600 leading-relaxed">
                Áp dụng cho 100% giáo viên dạy tại các lớp hòa nhập ở cả 3 điểm trường; thanh toán định kỳ theo từng học kỳ.
              </p>
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
                  Mã ĐD: {selectedStudentForModal.nationalId}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedStudentForModal.fullName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
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
                  <span className={`font-bold ${selectedStudentForModal.disabilityLevel === 'Nặng' ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {selectedStudentForModal.disabilityLevel}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Dạng khuyết tật:</span>
                <p className="text-slate-900 font-medium mt-0.5">{selectedStudentForModal.disabilityType}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 font-semibold block">Địa chỉ gia đình:</span>
                  <p className="text-slate-800 mt-0.5">{selectedStudentForModal.homeAddress}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Số điện thoại liên hệ:</span>
                  <p className="font-mono text-blue-700 font-bold mt-0.5">{selectedStudentForModal.phone}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Giáo viên chủ trì KHGDCN:</span>
                <p className="text-blue-800 font-bold mt-0.5">{selectedStudentForModal.leadTeacher}</p>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Biện pháp hỗ trợ chính:</span>
                <p className="text-slate-800 mt-0.5 leading-relaxed bg-amber-50 p-2.5 rounded border border-amber-200">
                  {selectedStudentForModal.supportMeasures}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-semibold block">Nội dung / Môn học được miễn, giảm:</span>
                <p className="text-slate-800 mt-0.5 leading-relaxed bg-emerald-50 p-2.5 rounded border border-emerald-200">
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

      {/* Print Modal for Appendix CV 3408 */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Biểu Mẫu Phụ Lục (Đính kèm Công văn số 3408/SGDĐT-GDPT ngày 04/9/2026 của Sở GDĐT)
                </h3>
                <p className="text-xs text-slate-500">
                  Thống kê và đăng ký nhu cầu hỗ trợ giáo dục hòa nhập năm học 2026 - 2027
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintAppendix}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In Biểu Mẫu (Ctrl+P)</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-800 space-y-4 font-serif max-h-[75vh] overflow-y-auto p-4 border rounded-xl bg-slate-50">
              <div className="text-center space-y-1">
                <p className="font-bold uppercase text-sm">PHỤ LỤC</p>
                <p className="italic text-[11px]">(Đính kèm Công văn số 3408/SGDĐT-GDPT ngày 4 tháng 9 năm 2026 của Sở GDĐT)</p>
                <h4 className="font-bold text-base uppercase text-slate-900 pt-1">
                  THỐNG KÊ VÀ ĐĂNG KÝ NHU CẦU HỖ TRỢ GIÁO DỤC HÒA NHẬP<br />
                  NĂM HỌC 2026 - 2027
                </h4>
                <p className="font-sans text-xs">
                  <strong>Xã/ Phường:</strong> Đốc Binh Kiều. <strong>Cấp học:</strong> Trung học cơ sở và Trung học phổ thông.<br />
                  <strong>Tên cơ sở giáo dục:</strong> Trường Trung học cơ sở và Trung học phổ thông Đốc Binh Kiều.
                </p>
              </div>

              <div>
                <h5 className="font-bold font-sans text-xs uppercase text-slate-900 py-1">
                  I. THỐNG KÊ SỐ LƯỢNG HỌC SINH KHUYẾT TẬT
                </h5>
                <table className="w-full text-[11px] border-collapse border border-slate-300 font-sans">
                  <thead className="bg-slate-200 text-center font-bold">
                    <tr>
                      <th className="border border-slate-300 p-1.5 w-8">STT</th>
                      <th className="border border-slate-300 p-1.5">Họ và tên học sinh</th>
                      <th className="border border-slate-300 p-1.5">Mã định danh</th>
                      <th className="border border-slate-300 p-1.5 w-12">Năm sinh</th>
                      <th className="border border-slate-300 p-1.5 w-12">Nữ</th>
                      <th className="border border-slate-300 p-1.5 w-12">Dân tộc</th>
                      <th className="border border-slate-300 p-1.5">Dạng tật</th>
                      <th className="border border-slate-300 p-1.5 w-12">Mức độ</th>
                      <th className="border border-slate-300 p-1.5 w-14">Lớp</th>
                      <th className="border border-slate-300 p-1.5 w-14">Đã bỏ học 25-26</th>
                      <th className="border border-slate-300 p-1.5">Địa chỉ gia đình</th>
                      <th className="border border-slate-300 p-1.5">Số điện thoại liên hệ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INCLUSIVE_STUDENTS_LIST.map((s) => (
                      <tr key={s.id}>
                        <td className="border border-slate-300 p-1 text-center font-bold">{s.stt}</td>
                        <td className="border border-slate-300 p-1 font-semibold">{s.fullName}</td>
                        <td className="border border-slate-300 p-1 font-mono text-[10px]">{s.nationalId}</td>
                        <td className="border border-slate-300 p-1 text-center">{s.birthYear}</td>
                        <td className="border border-slate-300 p-1 text-center">{s.isFemale}</td>
                        <td className="border border-slate-300 p-1 text-center">{s.ethnicity}</td>
                        <td className="border border-slate-300 p-1">{s.disabilityType}</td>
                        <td className="border border-slate-300 p-1 text-center font-bold">{s.disabilityLevel}</td>
                        <td className="border border-slate-300 p-1 text-center font-bold">{s.className}</td>
                        <td className="border border-slate-300 p-1 text-center">{s.droppedOut}</td>
                        <td className="border border-slate-300 p-1">{s.homeAddress}</td>
                        <td className="border border-slate-300 p-1 font-mono text-[10px]">{s.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-4">
                <h5 className="font-bold font-sans text-xs uppercase text-slate-900 py-1">
                  II. ĐĂNG KÝ NHU CẦU HỖ TRỢ GIÁO DỤC HÒA NHẬP
                </h5>
                <table className="w-full text-[11px] border-collapse border border-slate-300 font-sans">
                  <thead className="bg-slate-200 text-center font-bold">
                    <tr>
                      <th className="border border-slate-300 p-1.5 w-8">STT</th>
                      <th className="border border-slate-300 p-1.5">Nội dung nhu cầu hỗ trợ</th>
                      <th className="border border-slate-300 p-1.5 w-32">Mức độ lựa chọn</th>
                      <th className="border border-slate-300 p-1.5">Ý kiến đề xuất của đơn vị</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INCLUSIVE_DEMAND_SURVEY.map((sv) => (
                      <tr key={sv.stt}>
                        <td className="border border-slate-300 p-1 text-center font-bold">{sv.stt}</td>
                        <td className="border border-slate-300 p-1 font-semibold">{sv.content}</td>
                        <td className="border border-slate-300 p-1 text-center font-bold">{sv.urgencyLevel}</td>
                        <td className="border border-slate-300 p-1">{sv.schoolNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 font-sans">
                <div></div>
                <div className="text-center space-y-1">
                  <p className="italic">Đốc Binh Kiều, ngày 9 tháng 9 năm 2026</p>
                  <p className="font-bold uppercase">THỦ TRƯỞNG ĐƠN VỊ</p>
                  <p className="text-[10px] italic text-slate-500">(KT. HIỆU TRƯỞNG / PHÓ HIỆU TRƯỞNG đã ký)</p>
                  <div className="h-12 flex items-center justify-center font-serif text-lg font-bold text-blue-900">
                    Nguyễn Minh Trí
                  </div>
                  <p className="font-bold">Nguyễn Minh Trí</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

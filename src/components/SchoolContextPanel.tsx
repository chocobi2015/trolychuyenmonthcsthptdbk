import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Layers, 
  Save, 
  Check, 
  Info,
  Calendar,
  Sparkles,
  School,
  Clock,
  Award,
  BookOpen,
  FileText,
  GraduationCap,
  TableProperties
} from 'lucide-react';
import { SCHOOL_OFFICIAL_PROFILE, OFFICIAL_STUDENT_DETAILED_STATS } from '../data/schoolOfficialData';

interface SchoolContextPanelProps {
  customFacts: string;
  onUpdateCustomFacts: (facts: string) => void;
  onViewSchoolPlanDoc?: () => void;
}

export const SchoolContextPanel: React.FC<SchoolContextPanelProps> = ({
  customFacts,
  onUpdateCustomFacts,
  onViewSchoolPlanDoc,
}) => {
  const [localFacts, setLocalFacts] = useState(customFacts);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'schedule' | 'targets' | 'subjects' | 'students'>('overview');

  const handleSave = () => {
    onUpdateCustomFacts(localFacts);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded flex items-center gap-1">
              <School className="w-3.5 h-3.5" />
              <span>Hồ Sơ & Chỉ Tiêu Chuyên Môn Nhà Trường</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Kế hoạch số 34/KH-THCS&THPTĐBK (25/9/2026)
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Trường THCS & THPT Đốc Binh Kiều (Sở GDĐT tỉnh Đồng Tháp)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
            Sáp nhập từ 3 trường: THCS Đốc Binh Kiều, THCS Tân Kiều và THPT Đốc Binh Kiều theo Quyết định 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp. Quy mô 53 lớp, 2.111 học sinh, 120 CB-GV-NV tại 3 điểm trường.
          </p>
        </div>

        {onViewSchoolPlanDoc && (
          <button
            onClick={onViewSchoolPlanDoc}
            className="shrink-0 px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <FileText className="w-4 h-4" />
            <span>Xem Kế hoạch Giáo dục Nhà trường (Bản đầy đủ)</span>
          </button>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-2 bg-white px-4 pt-2 rounded-t-xl">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
            activeSection === 'overview'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>1. Quy mô & 3 Điểm trường</span>
        </button>
        <button
          onClick={() => setActiveSection('schedule')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
            activeSection === 'schedule'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Khung giờ trong ngày (Sáng 5 tiết - Chiều 5 tiết)</span>
        </button>
        <button
          onClick={() => setActiveSection('targets')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
            activeSection === 'targets'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>3. Chỉ tiêu chuyên môn 2026-2027</span>
        </button>
        <button
          onClick={() => setActiveSection('subjects')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
            activeSection === 'subjects'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>4. 08 Tổ & 96 GV Bộ môn</span>
        </button>
        <button
          onClick={() => setActiveSection('students')}
          className={`px-3 py-2 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
            activeSection === 'students'
              ? 'border-blue-700 text-blue-700 font-bold bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>5. Số liệu Học sinh (Chuẩn 25/9/2026)</span>
          <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[10px] rounded-full font-bold">2.111 HS</span>
        </button>
      </div>

      {/* Section 1: Overview & Campuses */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Campus */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Điểm Chính (THPT Đốc Binh Kiều cũ)</span>
              </h3>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                14 Lớp THPT (530 HS)
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• <strong>Diện tích</strong>: 15.683 m².</p>
              <p>• <strong>Học sinh</strong>: Khối 10 (5 lớp, 203 HS), Khối 11 (4 lớp, 142 HS), Khối 12 (5 lớp, 185 HS).</p>
              <p>• <strong>Cơ sở vật chất</strong>: Khu hiệu bộ; 09 phòng học kiên cố, 03 phòng lắp ghép; 09 phòng học bộ môn; Thư viện; 3 khu vệ sinh 3 tầng; hệ thống PCCC 2 máy bơm, 11 tủ chữa cháy vách tường.</p>
            </div>
          </div>

          {/* Doc Binh Kieu Campus */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Điểm Đốc Binh Kiều (THCS cũ)</span>
              </h3>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                24 Lớp THCS (999 HS)
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• <strong>Diện tích</strong>: 11.126,7 m².</p>
              <p>• <strong>Học sinh</strong>: Khối 6 (6 lớp, 250 HS), Khối 7 (6 lớp, 240 HS), Khối 8 (6 lớp, 256 HS), Khối 9 (6 lớp, 253 HS).</p>
              <p>• <strong>Cơ sở vật chất</strong>: 22 phòng học; 05 phòng chức năng; 01 nhà công vụ; sân bóng đá mini, sân bóng chuyền, khu tập luyện GDTC.</p>
            </div>
          </div>

          {/* Tan Kieu Campus */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Điểm Tân Kiều (THCS Tân Kiều cũ)</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                15 Lớp THCS (614 HS)
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>• <strong>Khoảng cách</strong>: Cách điểm chính <strong>11 km</strong> (xã Tân Kiều).</p>
              <p>• <strong>Diện tích</strong>: 8.570,8 m².</p>
              <p>• <strong>Học sinh</strong>: Khối 6 (4 lớp, 167 HS), Khối 7 (3 lớp, 137 HS), Khối 8 (4 lớp, 153 HS), Khối 9 (4 lớp, 157 HS).</p>
              <p>• <strong>Cơ sở vật chất</strong>: 09 phòng học; 10 phòng bộ môn (tiếng Anh, đa năng, tin học, KHTN 2 phòng, KHXH, công nghệ); 10 phòng làm việc và sinh hoạt, có phòng Ban Giám hiệu thường trực.</p>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Daily Schedule (Both Morning and Afternoon have 5 periods!) */}
      {activeSection === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Morning Schedule */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Buổi Sáng (6h30 - 11h30 - ĐỦ 5 TIẾT)</span>
              </h3>
              <p className="text-[11px] text-slate-600 mt-1">
                <strong>Chính khóa:</strong> Khối 8, 9, 10, 11, 12 và chương trình dạy học 2 buổi/ngày.<br />
                <strong>Buổi 2:</strong> Dạy học trải nghiệm, bồi dưỡng HSG, phụ đạo yếu, sinh hoạt CLB đối với khối 6, 7.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                  <tr>
                    <th className="py-1.5 px-2">Thời gian</th>
                    <th className="py-1.5 px-2">Nội dung</th>
                    <th className="py-1.5 px-2">Đổi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SCHOOL_OFFICIAL_PROFILE.dailySchedule.morning.slots.map((s, idx) => (
                    <tr key={idx} className={s.content.includes('tiết') ? 'bg-blue-50/30' : ''}>
                      <td className="py-1.5 px-2 font-mono text-slate-700 font-semibold">{s.time}</td>
                      <td className="py-1.5 px-2 text-slate-800 font-medium">{s.content}</td>
                      <td className="py-1.5 px-2 text-slate-500">{s.rest || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Afternoon Schedule */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Buổi Chiều (12h00 - 17h00 - ĐỦ 5 TIẾT)</span>
              </h3>
              <p className="text-[11px] text-slate-600 mt-1">
                <strong>Chính khóa:</strong> Khối 6, 7 và chương trình dạy học 2 buổi/ngày.<br />
                <strong>Buổi 2:</strong> Bồi dưỡng HSG, phụ đạo yếu, ôn thi vào lớp 10, ôn thi tốt nghiệp THPT, CLB, STEM đối với các khối 8, 9, 10, 11, 12.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
                  <tr>
                    <th className="py-1.5 px-2">Thời gian</th>
                    <th className="py-1.5 px-2">Nội dung</th>
                    <th className="py-1.5 px-2">Đổi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SCHOOL_OFFICIAL_PROFILE.dailySchedule.afternoon.slots.map((s, idx) => (
                    <tr key={idx} className={s.content.includes('tiết') ? 'bg-amber-50/30' : ''}>
                      <td className="py-1.5 px-2 font-mono text-slate-700 font-semibold">{s.time}</td>
                      <td className="py-1.5 px-2 text-slate-800 font-medium">{s.content}</td>
                      <td className="py-1.5 px-2 text-slate-500">{s.rest || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Key Academic Targets */}
      {activeSection === 'targets' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-2 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Hệ Thống Chỉ Tiêu Chuyên Môn Trọng Tâm Năm Học 2026 - 2027</span>
              </h3>
              <p className="text-xs text-slate-500">
                Trích từ Mục IV - Một số chỉ tiêu cơ bản trong Kế hoạch số 34/KH-THCS&THPTĐBK
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded bg-purple-100 text-purple-800 font-bold">
              Mục tiêu Chuẩn Quốc Gia mức độ 1 (2029)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase block">Tốt nghiệp THPT 2027</span>
              <p className="text-base font-bold text-blue-900">{SCHOOL_OFFICIAL_PROFILE.keyAcademicTargets.graduationTHPTTarget}</p>
              <p className="text-[11px] text-slate-600">Điểm TB toàn trường phấn đấu: <strong>5,99 điểm</strong> (Văn 7,52; Sử 7,81; Hóa 6,79; Toán 5,14; Lý 4,82...)</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase block">Tốt nghiệp THCS 2027</span>
              <p className="text-base font-bold text-emerald-900">{SCHOOL_OFFICIAL_PROFILE.keyAcademicTargets.graduationTHCSTarget}</p>
              <p className="text-[11px] text-slate-600">ĐBK: 250/250 (100%), Tân Kiều: 157/157 (100%).</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase block">Tuyển sinh vào lớp 10 THPT</span>
              <p className="text-base font-bold text-amber-900">{SCHOOL_OFFICIAL_PROFILE.keyAcademicTargets.grade10AdmissionTarget}</p>
              <p className="text-[11px] text-slate-600">Tuyển sinh trường nghề: 10% HS tốt nghiệp THCS.</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase block">Tỷ lệ đỗ Đại học</span>
              <p className="text-base font-bold text-indigo-900">{SCHOOL_OFFICIAL_PROFILE.keyAcademicTargets.universityAdmissionTarget}</p>
              <p className="text-[11px] text-slate-600">Năm 2025-2026 đạt 70%, phấn đấu tăng trưởng vững chắc.</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase block">Học sinh giỏi cấp tỉnh</span>
              <p className="text-base font-bold text-rose-900">{SCHOOL_OFFICIAL_PROFILE.keyAcademicTargets.provincialHSGPrizesTarget}</p>
              <p className="text-[11px] text-slate-600">Toán 1, Lý 1, Địa 1, Anh 1, Tin 1, Văn 5, Hóa 1, Sinh 1, Sử 6, GDKTPL 1.</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase block">Chỉ tiêu dự giờ chuyên môn</span>
              <p className="text-xs font-bold text-slate-900">• HT: ≥10% GV/kỳ | PHT: ≥30% GV/kỳ</p>
              <p className="text-[11px] text-slate-600">• TTCM: 100% GV ở điểm công tác, ≥30% GV ở 2 điểm còn lại.<br />• GV bộ môn: dự giờ ít nhất 04 tiết/học kỳ.</p>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Departments & Subject Teachers */}
      {activeSection === 'subjects' && (
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="border-b pb-2 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Đội Ngũ 120 Cán Bộ, Giáo Viên, Nhân Viên & 96 GV Bộ Môn</span>
            </h3>
            <span className="text-xs text-slate-500">
              100% đạt chuẩn đào tạo (88 ĐH, 8 Thạc sĩ)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center">
            {/* Khối Lãnh đạo Ban Giám hiệu */}
            <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/70 shadow-2xs">
              <span className="text-lg font-bold text-blue-900 block">{SCHOOL_OFFICIAL_PROFILE.leadership.count}</span>
              <span className="text-[11px] font-bold text-blue-950 block leading-tight">{SCHOOL_OFFICIAL_PROFILE.leadership.name}</span>
              <span className="text-[10px] text-blue-700 block mt-1">Lãnh đạo • 4 ĐV</span>
            </div>

            {/* 07 Tổ trong nhà trường (06 tổ chuyên môn + 01 tổ văn phòng) */}
            {SCHOOL_OFFICIAL_PROFILE.departments.map((dept) => (
              <div 
                key={dept.id} 
                className={`p-2.5 rounded-lg border ${
                  dept.type === 'office' 
                    ? 'border-amber-200 bg-amber-50/50' 
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <span className="text-lg font-bold text-slate-900 block">{dept.count}</span>
                <span className="text-[11px] font-semibold text-slate-800 block leading-tight">{dept.name}</span>
                <span className="text-[10px] text-slate-500 block mt-1">{dept.female} Nữ • {dept.partyMembers} ĐV</span>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Thống kê chi tiết 96 Giáo viên theo bộ môn:</h4>
            <div className="flex flex-wrap gap-2">
              {SCHOOL_OFFICIAL_PROFILE.subjectTeachersCount.map((subj) => (
                <span key={subj.subject} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs text-slate-800 font-medium">
                  <strong>{subj.subject}</strong>: {subj.count} GV {subj.master > 0 && `(${subj.master} ThS)`}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Official Student Statistics (Updated September 25, 2026) */}
      {activeSection === 'students' && (
        <div className="space-y-5">
          {/* Top Banner Notice */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 text-[11px] font-bold border border-blue-400/30">
                  DỮ LIỆU CHUẨN DUYỆT
                </span>
                <span className="text-xs text-blue-200 font-medium">
                  Cập nhật ngày 25/9/2026 (Kế hoạch số 34/KH-THCS&THPTĐBK)
                </span>
              </div>
              <h3 className="text-base font-bold mt-1">
                Bảng Thống Kê Số Lớp, Sĩ Số Học Sinh Chuẩn Năm Học 2026 - 2027
              </h3>
              <p className="text-xs text-blue-200/90 mt-0.5">
                Áp dụng thống nhất cho toàn bộ văn bản chỉ đạo, hồ sơ sổ sách điện tử, học bạ số và phân công chuyên môn.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg border border-white/20 text-center">
                <span className="text-xs text-blue-200 block">Tổng số lớp</span>
                <span className="text-lg font-black text-amber-300">53 Lớp</span>
              </div>
              <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg border border-white/20 text-center">
                <span className="text-xs text-blue-200 block">Tổng học sinh</span>
                <span className="text-lg font-black text-white">2.111 HS</span>
              </div>
              <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg border border-white/20 text-center">
                <span className="text-xs text-blue-200 block">HS Khuyết tật</span>
                <span className="text-lg font-black text-emerald-300">25 HS</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Cấp THCS (Khối 6-9)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-blue-900">1.581 HS</span>
                <span className="text-xs font-semibold text-slate-600">(39 Lớp)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                22 HS khuyết tật • Điểm ĐBK (24 lớp - 980 HS) & Tân Kiều (15 lớp - 601 HS)
              </p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Cấp THPT (Khối 10-12)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-indigo-900">530 HS</span>
                <span className="text-xs font-semibold text-slate-600">(14 Lớp)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                03 HS khuyết tật • 100% học tại Điểm chính THPT
              </p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Điểm Đốc Binh Kiều</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-amber-900">980 HS</span>
                <span className="text-xs font-semibold text-slate-600">(24 Lớp THCS)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Khối 6 (245 HS), Khối 7 (235 HS), Khối 8 (251 HS), Khối 9 (249 HS)
              </p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Điểm Tân Kiều (Cách 11 km)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-black text-emerald-900">601 HS</span>
                <span className="text-xs font-semibold text-slate-600">(15 Lớp THCS)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Khối 6 (165 HS), Khối 7 (133 HS), Khối 8 (150 HS), Khối 9 (153 HS)
              </p>
            </div>
          </div>

          {/* Table 1: Quy mô theo Khối */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-blue-700" />
                <span>Bảng 1: Thống Kê Số Lớp và Số Học Sinh Theo Khối Lớp (Tính đến 25/9/2026)</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">Bình quân toàn trường: <strong>39,83 HS/lớp</strong></span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-2 px-3 text-center border-r border-slate-200 w-12">STT</th>
                    <th className="py-2 px-3 border-r border-slate-200">Khối Lớp</th>
                    <th className="py-2 px-3 text-center border-r border-slate-200">Số Lớp</th>
                    <th className="py-2 px-3 text-center border-r border-slate-200 font-bold text-blue-900">Tổng Số HS</th>
                    <th className="py-2 px-3 text-center border-r border-slate-200 text-pink-700">Trong đó Nữ</th>
                    <th className="py-2 px-3 text-center border-r border-slate-200">Dân tộc</th>
                    <th className="py-2 px-3 text-center border-r border-slate-200 text-emerald-700 font-bold">Khuyết tật</th>
                    <th className="py-2 px-3">Phân Bổ Điểm Trường & Ghi Chú</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {OFFICIAL_STUDENT_DETAILED_STATS.grades.map((g, idx) => (
                    <React.Fragment key={g.grade}>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-2 px-3 text-center text-slate-500 border-r border-slate-200">{idx + 1}</td>
                        <td className="py-2 px-3 font-bold text-slate-900 border-r border-slate-200">Khối {g.grade}</td>
                        <td className="py-2 px-3 text-center font-semibold text-slate-800 border-r border-slate-200">{g.classes}</td>
                        <td className="py-2 px-3 text-center font-bold text-blue-900 border-r border-slate-200">{g.students}</td>
                        <td className="py-2 px-3 text-center text-pink-700 font-medium border-r border-slate-200">{g.female}</td>
                        <td className="py-2 px-3 text-center text-slate-600 border-r border-slate-200">{g.ethnic}</td>
                        <td className="py-2 px-3 text-center font-bold text-emerald-700 border-r border-slate-200">{g.disabled}</td>
                        <td className="py-2 px-3 text-slate-600">{g.note}</td>
                      </tr>
                      {g.grade === 9 && (
                        <tr className="bg-blue-50/70 font-bold text-blue-950 border-y border-blue-200">
                          <td className="py-2 px-3 text-center border-r border-blue-200">★</td>
                          <td className="py-2 px-3 border-r border-blue-200">CỘNG CẤP THCS</td>
                          <td className="py-2 px-3 text-center border-r border-blue-200">39</td>
                          <td className="py-2 px-3 text-center text-blue-900 border-r border-blue-200">1.581</td>
                          <td className="py-2 px-3 text-center text-pink-700 border-r border-blue-200">770</td>
                          <td className="py-2 px-3 text-center border-r border-blue-200">4</td>
                          <td className="py-2 px-3 text-center text-emerald-700 border-r border-blue-200">22</td>
                          <td className="py-2 px-3 text-blue-900">Điểm ĐBK: 24 lớp (980 HS) • Điểm Tân Kiều: 15 lớp (601 HS)</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  <tr className="bg-indigo-50/70 font-bold text-indigo-950 border-y border-indigo-200">
                    <td className="py-2 px-3 text-center border-r border-indigo-200">★</td>
                    <td className="py-2 px-3 border-r border-indigo-200">CỘNG CẤP THPT</td>
                    <td className="py-2 px-3 text-center border-r border-indigo-200">14</td>
                    <td className="py-2 px-3 text-center text-indigo-900 border-r border-indigo-200">530</td>
                    <td className="py-2 px-3 text-center text-pink-700 border-r border-indigo-200">268</td>
                    <td className="py-2 px-3 text-center border-r border-indigo-200">1</td>
                    <td className="py-2 px-3 text-center text-emerald-700 border-r border-indigo-200">3</td>
                    <td className="py-2 px-3 text-indigo-900">Điểm chính: 14 lớp (Khối 10: 203; Khối 11: 142; Khối 12: 185)</td>
                  </tr>
                  <tr className="bg-amber-100/80 font-black text-amber-950 border-y-2 border-amber-300">
                    <td className="py-2.5 px-3 text-center border-r border-amber-300">✔</td>
                    <td className="py-2.5 px-3 border-r border-amber-300">TỔNG CỘNG TOÀN TRƯỜNG</td>
                    <td className="py-2.5 px-3 text-center border-r border-amber-300 text-amber-900">53 Lớp</td>
                    <td className="py-2.5 px-3 text-center text-blue-950 border-r border-amber-300 text-sm">2.111 HS</td>
                    <td className="py-2.5 px-3 text-center text-pink-800 border-r border-amber-300">1.038 Nữ</td>
                    <td className="py-2.5 px-3 text-center border-r border-amber-300">5 HS</td>
                    <td className="py-2.5 px-3 text-center text-emerald-800 border-r border-amber-300">25 HS</td>
                    <td className="py-2.5 px-3 text-amber-900">Chuẩn số liệu thống nhất áp dụng cho năm học 2026 - 2027</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Chi tiết 3 Điểm trường */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b pb-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Bảng 2: Thống Kê Phân Bổ Chi Tiết Tại 03 Điểm Trường</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OFFICIAL_STUDENT_DETAILED_STATS.campuses.map((campus) => (
                <div key={campus.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{campus.name}</h5>
                      <span className="text-[11px] text-slate-500">{campus.address}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded font-black text-xs bg-blue-100 text-blue-900">
                      {campus.classes} Lớp • {campus.students} HS
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {campus.gradeDetails.map((gd, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white px-2.5 py-1.5 rounded border border-slate-200/70">
                        <span className="font-semibold text-slate-800">{gd.grade}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600">{gd.classes} lớp</span>
                          <span className="font-bold text-blue-900">{gd.students} HS</span>
                          {gd.disabled > 0 && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded font-medium">
                              {gd.disabled} KT
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1 text-[11px] text-slate-500 flex justify-between">
                    <span>Tổng HS khuyết tật: <strong className="text-emerald-700">{campus.disabled} em</strong></span>
                    <span>Bình quân: <strong className="text-slate-800">{(campus.students / campus.classes).toFixed(1)} HS/lớp</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table 3: Danh sách 53 lớp chi tiết */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Bảng 3: Chi Tiết Sĩ Số Toàn Bộ 53 Lớp Học Trong Nhà Trường</span>
              </h4>
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-600">
                100% Khớp đúng với 2.111 học sinh
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {/* Khối 6 */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900 border-b pb-1">
                  <span>Khối 6 (10 lớp - 410 HS)</span>
                  <span className="text-blue-700">6 KT</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><strong>Điểm ĐBK (245 HS):</strong> 6A1 (41), 6A2 (41), 6A3 (41), 6A4 (41), 6A5 (40), 6A6 (41)</p>
                  <p><strong>Điểm Tân Kiều (165 HS):</strong> 6A7 (41), 6A8 (42), 6A9 (41), 6A10 (41)</p>
                </div>
              </div>

              {/* Khối 7 */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900 border-b pb-1">
                  <span>Khối 7 (9 lớp - 368 HS)</span>
                  <span className="text-blue-700">6 KT</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><strong>Điểm ĐBK (235 HS):</strong> 7A1 (39), 7A2 (39), 7A3 (40), 7A4 (39), 7A5 (39), 7A6 (39)</p>
                  <p><strong>Điểm Tân Kiều (133 HS):</strong> 7A7 (45), 7A8 (44), 7A9 (44)</p>
                </div>
              </div>

              {/* Khối 8 */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900 border-b pb-1">
                  <span>Khối 8 (10 lớp - 401 HS)</span>
                  <span className="text-blue-700">7 KT</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><strong>Điểm ĐBK (251 HS):</strong> 8A1 (42), 8A2 (42), 8A3 (42), 8A4 (42), 8A5 (42), 8A6 (41)</p>
                  <p><strong>Điểm Tân Kiều (150 HS):</strong> 8A7 (38), 8A8 (37), 8A9 (38), 8A10 (37)</p>
                </div>
              </div>

              {/* Khối 9 */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900 border-b pb-1">
                  <span>Khối 9 (10 lớp - 402 HS)</span>
                  <span className="text-blue-700">3 KT</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><strong>Điểm ĐBK (249 HS):</strong> 9A1 (42), 9A2 (41), 9A3 (42), 9A4 (41), 9A5 (41), 9A6 (42)</p>
                  <p><strong>Điểm Tân Kiều (153 HS):</strong> 9A7 (39), 9A8 (38), 9A9 (38), 9A10 (38)</p>
                </div>
              </div>

              {/* Khối 10 */}
              <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg space-y-1.5">
                <div className="flex justify-between font-bold text-indigo-950 border-b border-indigo-200 pb-1">
                  <span>Khối 10 (5 lớp - 203 HS)</span>
                  <span className="text-indigo-700">1 KT</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><strong>Điểm chính THPT (203 HS):</strong></p>
                  <p>10CB1 (37 HS), 10CB2 (29 HS), 10CB3 (44 HS), 10CB4 (48 HS), 10CB5 (45 HS)</p>
                </div>
              </div>

              {/* Khối 11 & 12 */}
              <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg space-y-1.5">
                <div className="flex justify-between font-bold text-indigo-950 border-b border-indigo-200 pb-1">
                  <span>Khối 11 (4 lớp) & Khối 12 (5 lớp)</span>
                  <span className="text-indigo-700">2 KT (K11)</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <p><strong>Khối 11 (142 HS):</strong> 11CB1 (40), 11CB2 (35), 11CB3 (34), 11CB4 (33)</p>
                  <p><strong>Khối 12 (185 HS):</strong> 12CB1 (28), 12CB2 (23), 12CB3 (46), 12CB4 (47), 12CB5 (41)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Notes from Vice Principal */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-sm text-slate-800">
              Ghi Chú Bổ Sung Thông Tin Của Trường (AI sẽ bám sát vào đây khi cụ thể hóa văn bản)
            </h3>
          </div>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saved ? 'Đã lưu ghi chú' : 'Lưu ghi chú này'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Thầy có thể cập nhật thêm bất kỳ thông tin thực tế nào tại đây. Khi sinh văn bản mới, AI sẽ đọc toàn bộ dữ liệu này và dữ liệu Kế hoạch số 34/KH-THCS&THPTĐBK để văn bản hoàn toàn khớp với thực tế nhà trường.
        </p>

        <textarea
          value={localFacts}
          onChange={(e) => setLocalFacts(e.target.value)}
          rows={5}
          placeholder="Thầy có thể bổ sung thông tin thực tế nhà trường tại đây..."
          className="w-full text-xs rounded-lg border border-slate-300 p-3 font-mono leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

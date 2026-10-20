import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MapPin, 
  BookOpen, 
  Award, 
  GraduationCap, 
  CheckCircle, 
  Building2, 
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowRight,
  Calendar,
  FileSpreadsheet,
  Copy,
  Check,
  ShieldCheck,
  BadgeCheck,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { 
  SCHOOL_DATA, 
  getCampusDisplayName, 
  getRoleDisplayName, 
  getTeacherAssignments,
  getHomeroomClass,
  RawTeacher
} from '../data/schoolStaffHelper';
import { 
  OFFICIAL_STAFF_MASTER, 
  StaffMember, 
  SCHOOL_DEPARTMENTS_LIST, 
  PRE_MERGE_SCHOOLS_LIST 
} from '../data/schoolStaffMaster';

interface TeacherDirectoryTabProps {
  onSelectTeacherForLessonPlan: (teacherName: string, subject: string, grade: string, campus: string) => void;
  onSelectDepartmentForPlan: (deptName: string, campus: string) => void;
}

export const TeacherDirectoryTab: React.FC<TeacherDirectoryTabProps> = ({
  onSelectTeacherForLessonPlan,
  onSelectDepartmentForPlan,
}) => {
  // Main view mode: 'master_staff' (120 personnel from NHAN SU TOAN TRUONG.xlsx) or 'assignments' (teaching assignments)
  const [mainTab, setMainTab] = useState<'master_staff' | 'assignments'>('master_staff');

  // Master Staff filters
  const [staffDeptFilter, setStaffDeptFilter] = useState<string>('ALL');
  const [staffOldSchoolFilter, setStaffOldSchoolFilter] = useState<string>('ALL');
  const [staffPartyFilter, setStaffPartyFilter] = useState<boolean | 'ALL'>('ALL');
  const [staffDegreeFilter, setStaffDegreeFilter] = useState<string>('ALL');
  const [staffSearchQuery, setStaffSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedStaffDetail, setSelectedStaffDetail] = useState<StaffMember | null>(null);

  // Teaching Assignments filters (Mode 2)
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  const [selectedCampus, setSelectedCampus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [assignmentViewMode, setAssignmentViewMode] = useState<'teachers' | 'classes'>('teachers');
  const [activeTeacher, setActiveTeacher] = useState<RawTeacher | null>(null);

  // Filter 120 Master Staff
  const filteredStaff = useMemo(() => {
    return OFFICIAL_STAFF_MASTER.staff.filter((member) => {
      // Dept filter
      if (staffDeptFilter !== 'ALL' && member.department !== staffDeptFilter) {
        return false;
      }
      // Old school filter
      if (staffOldSchoolFilter !== 'ALL' && member.oldSchool !== staffOldSchoolFilter) {
        return false;
      }
      // Party member filter
      if (staffPartyFilter !== 'ALL' && member.isPartyMember !== staffPartyFilter) {
        return false;
      }
      // Degree filter
      if (staffDegreeFilter === 'masters' && !member.highestDegree.toLowerCase().includes('thạc')) {
        return false;
      }
      if (staffDegreeFilter === 'bachelors' && !(member.highestDegree.toLowerCase().includes('đại') || member.highestDegree.toLowerCase().includes('đhsp'))) {
        return false;
      }
      if (staffDegreeFilter === 'college_other' && (member.highestDegree.toLowerCase().includes('thạc') || member.highestDegree.toLowerCase().includes('đại') || member.highestDegree.toLowerCase().includes('đhsp'))) {
        return false;
      }

      // Search Query
      if (staffSearchQuery.trim()) {
        const q = staffSearchQuery.toLowerCase().trim();
        const matchName = member.fullName.toLowerCase().includes(q);
        const matchSubject = member.subjectOrRole.toLowerCase().includes(q);
        const matchMajor = member.major.toLowerCase().includes(q);
        const matchOldRole = member.roleBeforeMerge.toLowerCase().includes(q);
        const matchNewRole = member.roleAfterMerge.toLowerCase().includes(q);
        const matchNotes = member.notes.toLowerCase().includes(q);
        if (!matchName && !matchSubject && !matchMajor && !matchOldRole && !matchNewRole && !matchNotes) {
          return false;
        }
      }

      return true;
    });
  }, [staffDeptFilter, staffOldSchoolFilter, staffPartyFilter, staffDegreeFilter, staffSearchQuery]);

  // Filter teachers for assignments
  const filteredTeachers = SCHOOL_DATA.teachers.filter(teacher => {
    const matchesDept = selectedDeptId === 'ALL' || teacher.departmentId === selectedDeptId;
    const matchesCampus = selectedCampus === 'ALL' || teacher.campus === selectedCampus;
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (teacher.notes && teacher.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesCampus && matchesSearch;
  });

  // Filter classes for assignments
  const filteredClasses = SCHOOL_DATA.classes.filter(cls => {
    const matchesCampus = selectedCampus === 'ALL' || cls.campus === selectedCampus;
    const matchesSearch = 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.grade.includes(searchQuery);
    return matchesCampus && matchesSearch;
  });

  const handleCopyStaffSummary = () => {
    const summary = `BÁO CÁO NHÂN SỰ & ĐỘI NGŨ CÁN BỘ - GIÁO VIÊN - NHÂN VIÊN
TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU (NĂM HỌC 2026 - 2027)
(Căn cứ tệp dữ liệu NHÂN SỰ MỚI.xlsx chuẩn 100% - 120 CB-GV-NV, 85 Đảng viên)

1. TỔNG QUY MÔ ĐỘI NGŨ:
- Tổng số: 120 người (04 Ban Giám hiệu, 102 Giáo viên, 14 Nhân viên).
- Nữ: 63 người | Nam: 55 người (hoặc 65 nữ theo biến động thực tế).
- Đảng viên: 85 người (Đạt tỷ lệ 70,8%).
- Trình độ sau Đại học (Thạc sĩ): 09 người.

2. CƠ CẤU 07 TỔ TRONG TRƯỜNG & BAN GIÁM HIỆU:
- Ban Giám hiệu (04 cán bộ quản lý):
  + Thầy Hiệu trưởng Lê Thanh Cường (Thạc sỹ QLGD, ĐV, LLCT Cao cấp)
  + Thầy Phó Hiệu trưởng Nguyễn Minh Trí (ĐHSP GDCT, Vật lý, ĐV, LLCT Cao cấp)
  + Thầy Phó Hiệu trưởng Phan Thanh Thảo (Đại học Lịch sử, ĐV, LLCT Trung cấp)
  + Thầy Phó Hiệu trưởng Nguyễn Thanh Tòng (Đại học Sinh học, ĐV, LLCT Trung cấp)

- Tổ Văn phòng (14 nhân viên): Tổ trưởng Trần Văn Út; Tổ phó: Nguyễn Văn Quân, Nguyễn Thị Thúy Huỳnh; Kế toán, Văn thư, Y tế, Thiết bị, Thủ quỹ, Bảo vệ, Phục vụ.
- 06 Tổ Chuyên môn (102 giáo viên):
  + Tổ Toán: 15 người
  + Tổ Ngữ văn - Thư viện - Thiết bị: 17 người
  + Tổ Lịch sử - Địa lý - GDCD - GDKTPL: 16 người
  + Tổ Vật lý - Hóa học - Sinh học - Công nghệ: 26 người
  + Tổ Ngoại ngữ - Tin học: 16 người
  + Tổ GDTC - QPAN - Nghệ thuật: 12 người

3. NGUỒN GỐC TRƯỚC SÁP NHẬP:
- THCS Đốc Binh Kiều (cũ): 48 cán bộ, giáo viên, nhân viên
- THPT Đốc Binh Kiều (cũ): 40 cán bộ, giáo viên, nhân viên
- THCS Tân Kiều (cũ): 32 cán bộ, giáo viên, nhân viên`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap">
            <span className="text-slate-900 font-semibold">Đội Ngũ Sư Phạm & Nhân Sự Nhà Trường</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">120 CB-GV-NV · 85 Đảng viên · 09 Thạc sĩ</span>
            <span aria-hidden="true">·</span>
            <span>07 Tổ (06 Tổ chuyên môn & 01 Tổ văn phòng)</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Hồ Sơ Nhân Sự Toàn Trường & Phân Công Chuyên Môn
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Quản lý thông tin 120 nhân sự, trình độ đào tạo, phân công chuyên môn, giảng dạy tại 3 điểm trường phục vụ công tác báo cáo và xếp lịch.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <a
            href="/downloads/NHAN_SU_MOI_THCS_THPT_DOC_BINH_KIEU.xlsx"
            download="NHAN_SU_MOI_THCS_THPT_DOC_BINH_KIEU.xlsx"
            className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
            title="Tải tệp Excel NHÂN SỰ MỚI.xlsx chính thức"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Tải Excel "NHÂN SỰ MỚI"</span>
          </a>

          <button
            onClick={handleCopyStaffSummary}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
            title="Sao chép báo cáo thống kê nhân sự 120 CB-GV-NV"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép số liệu nhân sự'}</span>
          </button>

          <a
            href="https://phancongchuyenmonthcsthptdbk.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition"
          >
            <span>Web Phân công gốc</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex border-b border-slate-200 bg-white px-4 pt-2 rounded-t-xl gap-2">
        <button
          onClick={() => setMainTab('master_staff')}
          className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
            mainTab === 'master_staff'
              ? 'border-blue-700 text-blue-700 font-extrabold bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>1. Danh Sách 120 CB-GV-NV (File Excel "NHÂN SỰ MỚI" Cập Nhật)</span>
          <span className="px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] rounded-full font-bold">120</span>
        </button>

        <button
          onClick={() => setMainTab('assignments')}
          className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
            mainTab === 'assignments'
              ? 'border-blue-700 text-blue-700 font-extrabold bg-blue-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4 text-indigo-600" />
          <span>2. Phân Công Giảng Dạy & Thời Khóa Biểu (phancongchuyenmon)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: OFFICIAL 120 STAFF MEMBERS (From NHAN SU TOAN TRUONG.xlsx) */}
      {/* ========================================================================= */}
      {mainTab === 'master_staff' && (
        <div className="space-y-4">
          {/* Top 4 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Tổng Biên Chế</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">120</span>
                <span className="text-xs font-semibold text-slate-600">CB-GV-NV</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                4 BGH • 14 Văn phòng • 102 Giáo viên
              </p>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Cơ Cấu Giới Tính</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-pink-700">{OFFICIAL_STAFF_MASTER.femaleCount} Nữ</span>
                <span className="text-xs font-semibold text-slate-600">({OFFICIAL_STAFF_MASTER.maleCount} Nam)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tỷ lệ nữ đạt {(OFFICIAL_STAFF_MASTER.femaleCount / 1.2).toFixed(1)}%
              </p>
            </div>

            <div 
              onClick={() => setStaffPartyFilter(staffPartyFilter === true ? 'ALL' : true)}
              className={`p-3.5 rounded-xl border transition cursor-pointer shadow-2xs ${
                staffPartyFilter === true 
                  ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20' 
                  : 'bg-white border-slate-200 hover:border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">Đảng Viên</span>
                <BadgeCheck className="w-4 h-4 text-rose-600" />
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-rose-900">{OFFICIAL_STAFF_MASTER.partyMemberCount}</span>
                <span className="text-xs font-semibold text-rose-700">Đồng chí</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Tỷ lệ Đảng viên đạt 70,8% toàn trường
              </p>
            </div>

            <div 
              onClick={() => setStaffDegreeFilter(staffDegreeFilter === 'masters' ? 'ALL' : 'masters')}
              className={`p-3.5 rounded-xl border transition cursor-pointer shadow-2xs ${
                staffDegreeFilter === 'masters' 
                  ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20' 
                  : 'bg-white border-slate-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wide">Trình Độ Sau ĐH</span>
                <GraduationCap className="w-4 h-4 text-purple-600" />
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-purple-900">{OFFICIAL_STAFF_MASTER.masterDegreeCount}</span>
                <span className="text-xs font-semibold text-purple-700">Thạc sĩ</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                100% đạt chuẩn và trên chuẩn trình độ
              </p>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Lọc Theo Cơ Cấu 07 Tổ Chuyên Môn & Văn Phòng:</span>
              </span>
              <span className="text-xs text-slate-500">
                Hiển thị: <strong>{filteredStaff.length} / 120</strong> người
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setStaffDeptFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  staffDeptFilter === 'ALL'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất cả (120)
              </button>

              {SCHOOL_DEPARTMENTS_LIST.map((deptName) => {
                const count = OFFICIAL_STAFF_MASTER.staff.filter(s => s.department === deptName).length;
                return (
                  <button
                    key={deptName}
                    onClick={() => setStaffDeptFilter(deptName)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                      staffDeptFilter === deptName
                        ? 'bg-blue-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{deptName}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      staffDeptFilter === deptName ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Filters & Search Bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
            <div className="flex items-center gap-2.5 flex-1 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={staffSearchQuery}
                  onChange={(e) => setStaffSearchQuery(e.target.value)}
                  placeholder="Tìm theo họ tên, môn dạy, chức vụ, chuyên ngành..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Pre-merge School Filter */}
              <select
                value={staffOldSchoolFilter}
                onChange={(e) => setStaffOldSchoolFilter(e.target.value)}
                className="py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="ALL">Đơn vị trước sáp nhập: Tất cả</option>
                <option value="THPTDBK">THPT Đốc Binh Kiều cũ (58 người)</option>
                <option value="THCSDBK">THCS Đốc Binh Kiều cũ (35 người)</option>
                <option value="THCSTK">THCS Tân Kiều cũ (27 người)</option>
              </select>

              {/* Party Member Filter */}
              <select
                value={staffPartyFilter === 'ALL' ? 'ALL' : staffPartyFilter ? 'yes' : 'no'}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === 'ALL') setStaffPartyFilter('ALL');
                  else setStaffPartyFilter(v === 'yes');
                }}
                className="py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="ALL">Đảng viên: Tất cả</option>
                <option value="yes">Chỉ Đảng viên (85 người)</option>
                <option value="no">Chưa vào Đảng (35 người)</option>
              </select>

              {/* Degree Filter */}
              <select
                value={staffDegreeFilter}
                onChange={(e) => setStaffDegreeFilter(e.target.value)}
                className="py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="ALL">Trình độ: Tất cả</option>
                <option value="masters">Thạc sĩ (09 người)</option>
                <option value="bachelors">Đại học / ĐHSP</option>
                <option value="college_other">Trung cấp / Khác</option>
              </select>
            </div>

            {(staffDeptFilter !== 'ALL' || staffOldSchoolFilter !== 'ALL' || staffPartyFilter !== 'ALL' || staffDegreeFilter !== 'ALL' || staffSearchQuery) && (
              <button
                onClick={() => {
                  setStaffDeptFilter('ALL');
                  setStaffOldSchoolFilter('ALL');
                  setStaffPartyFilter('ALL');
                  setStaffDegreeFilter('ALL');
                  setStaffSearchQuery('');
                }}
                className="text-xs text-blue-700 hover:underline font-semibold shrink-0"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>

          {/* Master Staff Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 text-center w-12 border-r border-slate-200">TT</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Họ và Tên</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-200">Phái</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-200">Ngày sinh</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Tổ Công Tác</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Môn Dạy / Vị Trí</th>
                    <th className="py-2.5 px-3 text-center border-r border-slate-200">Đảng Viên</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Chức Vụ (Trước ➔ Sau sáp nhập)</th>
                    <th className="py-2.5 px-3 border-r border-slate-200">Trình Độ & Chuyên Ngành</th>
                    <th className="py-2.5 px-3 text-center">Trường Cũ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStaff.map((staff, idx) => (
                    <tr 
                      key={staff.id} 
                      onClick={() => setSelectedStaffDetail(staff)}
                      className="hover:bg-blue-50/50 transition cursor-pointer"
                    >
                      <td className="py-2 px-3 text-center text-slate-500 font-mono border-r border-slate-200">
                        {staff.stt}
                      </td>
                      <td className="py-2 px-3 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{staff.fullName}</span>
                          {staff.isPartyMember && (
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" title="Đảng viên" />
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-200 whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          staff.gender.toLowerCase() === 'nữ' ? 'bg-pink-50 text-pink-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {staff.gender}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center text-slate-600 font-mono border-r border-slate-200 whitespace-nowrap">
                        {staff.dateOfBirth || '—'}
                      </td>
                      <td className="py-2 px-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          staff.department === 'BGH' ? 'bg-blue-100 text-blue-900 font-bold' :
                          staff.department === 'Văn phòng' ? 'bg-amber-100 text-amber-900 font-bold' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {staff.department}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-800 border-r border-slate-200 font-medium">
                        {staff.subjectOrRole || '—'}
                      </td>
                      <td className="py-2 px-3 text-center border-r border-slate-200">
                        {staff.isPartyMember ? (
                          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                            Đảng viên
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">—</span>
                        )}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 text-slate-700">
                        <span className="text-slate-500">{staff.roleBeforeMerge || 'GV'}</span>
                        <span className="mx-1 text-slate-400">➔</span>
                        <strong className="text-blue-900">{staff.roleAfterMerge || 'GV'}</strong>
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200">
                        <span className="font-semibold text-slate-800">{staff.highestDegree}</span>
                        {staff.major && <span className="text-slate-500 block text-[11px]">{staff.major}</span>}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          staff.oldSchool === 'THPTDBK' ? 'bg-indigo-50 text-indigo-700' :
                          staff.oldSchool === 'THCSDBK' ? 'bg-amber-50 text-amber-700' :
                          'bg-emerald-50 text-emerald-700'
                        }`}>
                          {staff.oldSchool}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredStaff.length === 0 && (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-500">
                        Không tìm thấy nhân sự phù hợp với điều kiện tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: TEACHING ASSIGNMENTS & TIMETABLES (phancongchuyenmon) */}
      {/* ========================================================================= */}
      {mainTab === 'assignments' && (
        <div className="space-y-4">
          {/* 7 Departments Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
            <button
              onClick={() => setSelectedDeptId('ALL')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                selectedDeptId === 'ALL'
                  ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
              }`}
            >
              <span className="font-bold block text-sm">{SCHOOL_DATA.teachers.length} GV</span>
              <span className="text-[11px] truncate block opacity-90">Toàn trường (7 Tổ)</span>
            </button>

            {SCHOOL_DATA.departments.map(dept => {
              const count = SCHOOL_DATA.teachers.filter(t => t.departmentId === dept.id).length;
              const isSelected = selectedDeptId === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-black text-sm">{count} GV</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-100 text-slate-600">
                      {dept.code}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium line-clamp-1 block leading-tight">
                    {dept.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter and Switch bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3">
            <div className="flex items-center gap-3 flex-1 flex-wrap">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên giáo viên, mã, môn dạy, lớp..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Campus Filter */}
              <div className="min-w-[170px]">
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="ALL">Tất cả 3 Điểm trường (53 lớp - 2.111 HS)</option>
                  <option value="THPTDBK">Điểm chính (THPT - 14 lớp, 529 HS)</option>
                  <option value="THCSDBK">Điểm Đốc Binh Kiều (THCS - 24 lớp, 980 HS)</option>
                  <option value="THCSTK">Điểm Tân Kiều (THCS - 15 lớp, 602 HS - 11km)</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start md:self-auto">
              <button
                onClick={() => setAssignmentViewMode('teachers')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  assignmentViewMode === 'teachers' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Theo Giáo Viên ({filteredTeachers.length})
              </button>
              <button
                onClick={() => setAssignmentViewMode('classes')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  assignmentViewMode === 'classes' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Theo 53 Lớp Học ({filteredClasses.length})
              </button>
            </div>
          </div>

          {/* Teachers Grid */}
          {assignmentViewMode === 'teachers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTeachers.map(teacher => {
                const homeroom = getHomeroomClass(teacher.id);
                const assignments = getTeacherAssignments(teacher.id);
                const totalPeriods = assignments.reduce((sum, a) => sum + (a.periodsPerWeek || 0), 0);

                return (
                  <div
                    key={teacher.id}
                    className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-blue-400 transition flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{teacher.name}</h4>
                          <span className="text-[11px] text-slate-500 font-mono">{teacher.code} • {teacher.gender}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          teacher.campus === 'THPTDBK' ? 'bg-blue-100 text-blue-800' :
                          teacher.campus === 'THCSDBK' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {getCampusDisplayName(teacher.campus)}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1 text-xs text-slate-600">
                        <p>• <strong>Chức vụ:</strong> {getRoleDisplayName(teacher.role)}</p>
                        {homeroom && (
                          <p>• <strong>Chủ nhiệm:</strong> <span className="font-bold text-indigo-700">Lớp {homeroom.name}</span></p>
                        )}
                        <p>• <strong>Tổng tiết dạy:</strong> <span className="font-bold text-blue-900">{totalPeriods} tiết/tuần</span></p>
                      </div>

                      {assignments.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                          {assignments.map(a => (
                            <span key={a.id} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700 font-medium">
                              {a.subjectName} ({a.className})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectTeacherForLessonPlan(teacher.name, teacher.notes || 'Chuyên môn', 'Khối', getCampusDisplayName(teacher.campus))}
                      className="w-full py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Tạo Kế hoạch bài dạy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Classes Grid */}
          {assignmentViewMode === 'classes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredClasses.map(cls => (
                <div key={cls.id} className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">Lớp {cls.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      Khối {cls.grade} • {cls.level}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>• <strong>Điểm trường:</strong> {getCampusDisplayName(cls.campus)}</p>
                    <p>• <strong>Sĩ số:</strong> {cls.studentCount ? `${cls.studentCount} HS` : 'Theo danh sách toàn trường'}</p>
                    <p>• <strong>Phòng học:</strong> {cls.roomNumber || 'Phòng học chính khóa'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Staff Detail Modal Card */}
      {selectedStaffDetail && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4"
          onClick={() => setSelectedStaffDetail(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  STT {selectedStaffDetail.stt} • {selectedStaffDetail.department}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
                  <span>{selectedStaffDetail.fullName}</span>
                  {selectedStaffDetail.isPartyMember && (
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                      Đảng viên
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedStaffDetail.subjectOrRole} • {selectedStaffDetail.gender} (sinh: {selectedStaffDetail.dateOfBirth})
                </p>
              </div>

              <button
                onClick={() => setSelectedStaffDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Trường trước sáp nhập</span>
                <strong className="text-slate-900">{selectedStaffDetail.oldSchool}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Chức vụ sau sáp nhập</span>
                <strong className="text-blue-900">{selectedStaffDetail.roleAfterMerge || 'Giáo viên'}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Trình độ chuyên môn</span>
                <strong className="text-slate-900">{selectedStaffDetail.highestDegree}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Chuyên ngành đào tạo</span>
                <strong className="text-slate-900">{selectedStaffDetail.major || '—'}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Lý luận chính trị</span>
                <strong className="text-slate-900">{selectedStaffDetail.politicalTheory || '—'}</strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 text-[11px] block">Ngoại ngữ / Tin học</span>
                <strong className="text-slate-900">{selectedStaffDetail.foreignLanguage || '—'} / {selectedStaffDetail.itLevel || '—'}</strong>
              </div>
            </div>

            {selectedStaffDetail.notes && (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong>Ghi chú:</strong> {selectedStaffDetail.notes}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedStaffDetail(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
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

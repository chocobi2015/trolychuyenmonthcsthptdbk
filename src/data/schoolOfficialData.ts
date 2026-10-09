import { SchoolDocument } from '../types/document';

/**
 * Standard School Profile of Trường THCS & THPT Đốc Binh Kiều
 * Sourced directly from the official 26-page Kế hoạch Giáo dục Nhà trường năm học 2026-2027
 * (Số: 34/KH-THCS&THPTĐBK ngày 25/9/2026 do Hiệu trưởng Lê Thanh Cường ký)
 */
export const SCHOOL_OFFICIAL_PROFILE = {
  name: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
  authorityTop: 'SỞ GDĐT TỈNH ĐỒNG THÁP',
  documentNumber: 'Số: 34/KH-THCS&THPTĐBK',
  signDate: 'Đồng Tháp, ngày 25 tháng 9 năm 2026',
  principal: 'Lê Thanh Cường',
  vicePrincipalAcademics: 'Nguyễn Minh Trí',
  mergeDecision: 'Quyết định số 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp về việc sáp nhập Trường THCS Đốc Binh Kiều, Trường THCS Tân Kiều và Trường THPT Đốc Binh Kiều thành Trường THCS và THPT Đốc Binh Kiều.',
  
  // 1. Quy mô học sinh năm học 2026 - 2027 (Chuẩn thống kê ngày 25/9/2026: 53 lớp, 2.111 HS, 25 HS khuyết tật)
  studentsByGrade: [
    { grade: 6, classes: 10, students: 410, avgPerClass: 41.0, disabled: 6, female: 198, campusDbk: { classes: 6, students: 245 }, campusTanKieu: { classes: 4, students: 165 } },
    { grade: 7, classes: 9, students: 368, avgPerClass: 40.89, disabled: 6, female: 180, campusDbk: { classes: 6, students: 235 }, campusTanKieu: { classes: 3, students: 133 } },
    { grade: 8, classes: 10, students: 401, avgPerClass: 40.1, disabled: 7, female: 194, campusDbk: { classes: 6, students: 251 }, campusTanKieu: { classes: 4, students: 150 } },
    { grade: 9, classes: 10, students: 402, avgPerClass: 40.2, disabled: 3, female: 198, campusDbk: { classes: 6, students: 249 }, campusTanKieu: { classes: 4, students: 153 } },
    { grade: 10, classes: 5, students: 203, avgPerClass: 40.6, disabled: 1, female: 103, campusMain: { classes: 5, students: 203 } },
    { grade: 11, classes: 4, students: 142, avgPerClass: 35.5, disabled: 2, female: 72, campusMain: { classes: 4, students: 142 } },
    { grade: 12, classes: 5, students: 185, avgPerClass: 37.0, disabled: 0, female: 93, campusMain: { classes: 5, students: 185 } },
  ],
  totalClasses: 53,
  totalStudents: 2111,
  totalTHCSClasses: 39,
  totalTHCSStudents: 1581,
  totalTHPTClasses: 14,
  totalTHPTStudents: 530,
  disabledStudents: 25,
  avgStudentsPerClass: 39.83,

  // Phân bố học sinh theo 3 điểm trường (Cập nhật chuẩn ngày 25/9/2026: 2.111 HS)
  campusStats: [
    {
      id: 'main',
      name: 'Điểm chính (THPT Đốc Binh Kiều)',
      level: 'THPT',
      classes: 14,
      students: 530,
      disabled: 3,
      grades: 'Khối 10, 11, 12',
      details: 'Khối 10 (5 lớp, 203 HS); Khối 11 (4 lớp, 142 HS); Khối 12 (5 lớp, 185 HS)'
    },
    {
      id: 'dbk',
      name: 'Điểm Đốc Binh Kiều (THCS Đốc Binh Kiều cũ)',
      level: 'THCS',
      classes: 24,
      students: 980,
      disabled: 16,
      grades: 'Khối 6, 7, 8, 9',
      details: 'Khối 6 (6 lớp, 245 HS); Khối 7 (6 lớp, 235 HS); Khối 8 (6 lớp, 251 HS); Khối 9 (6 lớp, 249 HS)'
    },
    {
      id: 'tankieu',
      name: 'Điểm Tân Kiều (THCS Tân Kiều cũ - cách 11 km)',
      level: 'THCS',
      classes: 15,
      students: 601,
      disabled: 6,
      grades: 'Khối 6, 7, 8, 9',
      details: 'Khối 6 (4 lớp, 165 HS); Khối 7 (3 lớp, 133 HS); Khối 8 (4 lớp, 150 HS); Khối 9 (4 lớp, 153 HS)'
    }
  ],

  // 2. Đội ngũ cán bộ, giáo viên, nhân viên (Tổng: 120 người, 65 nữ, 85 Đảng viên, 9 Thạc sĩ)
  totalStaff: 120,
  principals: 4,
  teachers: 102,
  staff: 14,
  femaleStaff: 65,
  partyMembers: 85,
  masterDegreeCount: 9,

  // Ban Giám hiệu (04 cán bộ quản lý: Hiệu trưởng Lê Thanh Cường phụ trách chung, Phó Hiệu trưởng Nguyễn Minh Trí trực tiếp phụ trách chuyên môn, và 02 Phó Hiệu trưởng phụ trách các điểm trường)
  leadership: {
    id: 'bgh',
    name: 'Ban Giám hiệu',
    count: 4,
    female: 0,
    partyMembers: 4,
    masters: 1,
    leader: 'Lê Thanh Cường (Hiệu trưởng phụ trách chung), Nguyễn Minh Trí (Phó Hiệu trưởng trực tiếp phụ trách chuyên môn)',
  },

  // Cơ cấu 07 tổ trong nhà trường (chuẩn quy định: 06 tổ chuyên môn và 01 tổ văn phòng)
  totalUnits: 7,
  totalAcademicUnits: 6,
  totalOfficeUnits: 1,
  departments: [
    { id: 'toan', name: 'Tổ Toán', type: 'academic', count: 15, female: 4, partyMembers: 11, masters: 0 },
    { id: 'van_tv_tb', name: 'Tổ Ngữ văn - Thư viện - Thiết bị', type: 'academic', count: 17, female: 12, partyMembers: 16, masters: 2 },
    { id: 'khxh', name: 'Tổ Lịch sử - Địa lý - GDCD - GDKTPL', type: 'academic', count: 16, female: 11, partyMembers: 10, masters: 2 },
    { id: 'khtn_cn', name: 'Tổ Vật lý - Hóa học - Sinh học - Công nghệ', type: 'academic', count: 26, female: 17, partyMembers: 19, masters: 3 },
    { id: 'nn_tin', name: 'Tổ Ngoại ngữ - Tin học', type: 'academic', count: 16, female: 9, partyMembers: 10, masters: 1 },
    { id: 'gdtc_qpan_nt', name: 'Tổ GDTC - QPAN - Nghệ thuật', type: 'academic', count: 12, female: 4, partyMembers: 11, masters: 0 },
    { id: 'vanphong', name: 'Tổ Văn phòng', type: 'office', count: 14, female: 8, partyMembers: 4, masters: 0 }
  ],

  // Thông tin người ký mặc định cho toàn bộ văn bản của trường
  defaultSigner: {
    role: 'KT. HIỆU TRƯỞNG\nPHÓ HIỆU TRƯỞNG',
    name: 'Nguyễn Minh Trí',
    recipientsSignerRef: 'Lưu: VT, Tr.',
  },

  // Thống kê chi tiết theo chuyên môn (96 GV giảng dạy bộ môn)
  subjectTeachersCount: [
    { subject: 'Toán', count: 15, bachelor: 15, master: 0 },
    { subject: 'Ngữ văn', count: 11, bachelor: 9, master: 2 },
    { subject: 'Lịch sử', count: 6, bachelor: 5, master: 1 },
    { subject: 'Địa lý', count: 6, bachelor: 5, master: 1 },
    { subject: 'GDCD/GDKTPL', count: 4, bachelor: 4, master: 0 },
    { subject: 'Vật lý', count: 5, bachelor: 3, master: 2 },
    { subject: 'Hóa học', count: 6, bachelor: 5, master: 1 },
    { subject: 'Sinh học', count: 10, bachelor: 10, master: 0 },
    { subject: 'Công nghệ', count: 5, bachelor: 5, master: 0 },
    { subject: 'Tin học', count: 6, bachelor: 6, master: 0 },
    { subject: 'Tiếng Anh', count: 10, bachelor: 9, master: 1 },
    { subject: 'GDTC', count: 7, bachelor: 7, master: 0 },
    { subject: 'GDQPAN', count: 1, bachelor: 1, master: 0 },
    { subject: 'Âm nhạc', count: 2, bachelor: 2, master: 0 },
    { subject: 'Mỹ thuật', count: 2, bachelor: 2, master: 0 },
  ],

  // 3. Cơ sở vật chất 03 điểm trường (Tổng diện tích: 35.380,5 m²)
  campuses: [
    {
      id: 'main',
      name: 'Điểm chính (THPT Đốc Binh Kiều cũ)',
      grades: 'Khối 10, 11, 12',
      classes: 14,
      students: 530,
      area: '15.683 m²',
      facilities: '01 Phòng Hiệu trưởng; 02 Phòng Phó Hiệu trưởng; 01 Văn phòng; 01 Phòng bảo vệ; 01 Phòng Đảng - đoàn thể; 01 Phòng họp toàn thể; 01 Phòng nghỉ GV; 06 Phòng tổ CM; 01 Phòng Y tế; 09 phòng học kiên cố, 03 phòng lắp ghép; 09 phòng bộ môn (Âm nhạc, Mỹ thuật, Vật lý - CN, Tin học, Ngoại ngữ, Đa chức năng, Hóa học, Sinh học, KHXH); Thư viện; PCCC 2 máy bơm chữa cháy, 11 tủ chữa cháy, lăng, vòi.'
    },
    {
      id: 'dbk',
      name: 'Điểm Đốc Binh Kiều (THCS Đốc Binh Kiều cũ)',
      grades: 'Khối 6, 7, 8, 9',
      classes: 24,
      students: 980,
      area: '11.126,7 m²',
      facilities: 'Khu làm việc BGH, Văn phòng, phòng Họp, Y tế, Đoàn - Đội; 22 phòng học; 05 phòng chức năng; 01 nhà công vụ, 02 khu vệ sinh; sân bóng đá mini, sân bóng chuyền, khu vực tập luyện GDTC.'
    },
    {
      id: 'tankieu',
      name: 'Điểm Tân Kiều (THCS Tân Kiều cũ - cách điểm chính 11 km)',
      grades: 'Khối 6, 7, 8, 9',
      classes: 15,
      students: 601,
      area: '8.570,8 m²',
      facilities: '09 phòng học; 10 phòng bộ môn (thiết bị dùng chung: 1, tiếng Anh: 1, đa năng: 1, Mỹ thuật: 1, Âm nhạc: 1, tin học: 1, KHTN: 2, KHXH: 1, công nghệ: 1); 10 phòng làm việc và sinh hoạt (Phòng HT: 1, PHT: 2, Đoàn thể: 1, Truyền thống: 1, sinh hoạt CM: 2, họp: 1, văn phòng: 1, YTHĐ: 1), 1 kho và 1 nhà bảo vệ; 2 WC học sinh, 2 WC giáo viên.'
    }
  ],

  // 4. Khung thời gian hoạt động trong ngày (ÁP DỤNG THỐNG NHẤT 3 ĐIỂM TRƯỜNG - MỖI BUỔI 5 TIẾT)
  dailySchedule: {
    morning: {
      title: 'Buổi sáng (6h30 - 11h30)',
      target: 'Chính khóa khối 8, 9, 10, 11, 12 và chương trình dạy học 2 buổi/ngày (nếu có); dạy học trải nghiệm, bồi dưỡng HSG, phụ đạo yếu, sinh hoạt CLB đối với khối 6, 7',
      slots: [
        { time: '6h30 - 6h45', duration: '15 phút', content: 'Vệ sinh trường, lớp', rest: '' },
        { time: '6h45 - 7h00', duration: '15 phút', content: 'Sinh hoạt đầu giờ', rest: '' },
        { time: '7h00 - 7h45', duration: '45 phút', content: 'Học tiết 1', rest: '10 phút' },
        { time: '7h55 - 8h40', duration: '45 phút', content: 'Học tiết 2', rest: '15 phút' },
        { time: '8h55 - 9h40', duration: '45 phút', content: 'Học tiết 3', rest: '10 phút' },
        { time: '9h50 - 10h35', duration: '45 phút', content: 'Học tiết 4', rest: '10 phút' },
        { time: '10h45 - 11h30', duration: '45 phút', content: 'Học tiết 5', rest: '' }
      ]
    },
    afternoon: {
      title: 'Buổi chiều (12h00 - 17h00)',
      target: 'Chính khóa khối 6, 7 và chương trình dạy học 2 buổi/ngày (nếu có); dạy học trải nghiệm, bồi dưỡng HSG, phụ đạo yếu, sinh hoạt CLB đối với các khối còn lại (khối 8, 9, 10, 11, 12)',
      slots: [
        { time: '12h00 - 12h15', duration: '15 phút', content: 'Vệ sinh trường, lớp', rest: '' },
        { time: '12h15 - 12h30', duration: '15 phút', content: 'Sinh hoạt đầu giờ', rest: '' },
        { time: '12h30 - 13h15', duration: '45 phút', content: 'Học tiết 1', rest: '10 phút' },
        { time: '13h25 - 14h10', duration: '45 phút', content: 'Học tiết 2', rest: '10 phút' },
        { time: '14h20 - 15h05', duration: '45 phút', content: 'Học tiết 3', rest: '15 phút' },
        { time: '15h20 - 16h05', duration: '45 phút', content: 'Học tiết 4', rest: '10 phút' },
        { time: '16h15 - 17h00', duration: '45 phút', content: 'Học tiết 5', rest: '' }
      ]
    }
  },

  // 5. Khung thời gian năm học 2026 - 2027
  academicYearTimeline: {
    backToSchoolGrades9_12: '22/8/2026',
    backToSchoolOtherGrades: '28/8/2026',
    openingCeremony: '05/9/2026',
    term1: {
      weeks: 18,
      start: '07/9/2026',
      end: '10/01/2027'
    },
    term2: {
      weeks: 17,
      start: '11/01/2027',
      end: '23/5/2027'
    },
    endOfYear: '31/5/2027'
  },

  // 6. Các chỉ tiêu chuyên môn trọng điểm năm học 2026 - 2027
  keyAcademicTargets: {
    graduationTHPTTarget: '185/185 (100%)',
    graduationTHCSTarget: '407/407 (100%) (Điểm ĐBK: 250/250, Điểm Tân Kiều: 157/157)',
    grade10AdmissionTarget: 'Đạt 90% HS tốt nghiệp THCS (ĐBK: 227/250 = 90,8%; Tân Kiều: 142/157 = 90%)',
    vocationalAdmissionTarget: '10% trên tổng số học sinh tốt nghiệp THCS',
    universityAdmissionTarget: 'Trên 75% học sinh đỗ Đại học',
    provincialHSGPrizesTarget: '18 giải (Toán 01, Vật lý 01, Địa lý 01, Tiếng Anh 01, Tin học 01, Ngữ văn 05, Hóa học 01, Sinh học 01, Lịch sử 06, GDKTPL 01)',
    thptGraduationExamAvgScoreTarget: 5.99,
    subjectExamTargetAvg: {
      Toan: 5.14,
      NguVan: 7.52,
      LichSu: 7.81,
      TiengAnh: 4.82,
      VatLy: 4.82,
      HoaHoc: 6.79,
      SinhHoc: 5.36,
      DiaLy: 5.83,
      GDKTPL: 5.85
    },
    // Mục tiêu học tập khối 10-12: Tốt 36,04%, Khá 44,72%, Đạt 18,30%, Chưa đạt 0,94%
    highSchoolLearningTarget: { tot: 36.04, kha: 44.72, dat: 18.30, chuaDat: 0.94 },
    // Mục tiêu rèn luyện khối 10-12: Tốt 96,04%, Khá 3,96%
    highSchoolConductTarget: { tot: 96.04, kha: 3.96, dat: 0, chuaDat: 0 },
    // Mục tiêu học tập khối 6-9: Tốt 31,26%, Khá 34,65%, Đạt 33,33%, Chưa đạt 0,75%
    middleSchoolLearningTarget: { tot: 31.26, kha: 34.65, dat: 33.33, chuaDat: 0.75 },
    // Mục tiêu rèn luyện khối 6-9: Tốt 91,64%, Khá 6,42%, Đạt 1,95%
    middleSchoolConductTarget: { tot: 91.64, kha: 6.42, dat: 1.95, chuaDat: 0 },
    // Danh hiệu học sinh
    studentAwardsTarget: {
      middleSchool: { excellent: 204, good: 293 },
      highSchool: { excellent: 35, good: 156 }
    },
    // Quy định chỉ tiêu dự giờ
    observationRules: {
      principal: 'Ít nhất 10% giáo viên/học kỳ',
      vicePrincipal: 'Ít nhất 30% giáo viên/học kỳ (theo Điểm trường)',
      departmentHead: '100% giáo viên trong tổ ở điểm công tác, ít nhất 30% giáo viên ở 2 điểm còn lại',
      deputyDepartmentHead: 'Ít nhất 100% giáo viên trong tổ theo điểm trường mình đang công tác',
      teacher: 'Ít nhất 04 tiết/học kỳ'
    },
    // Đánh giá viên chức và thi đua
    staffEvaluation: {
      excellentCompleted: '20%',
      goodCompleted: '80%',
      teacherStandardsGood: '70%',
      teacherStandardsFair: '25%',
      teacherStandardsPass: '5%',
      skknRatio: 'Tối thiểu 40% số sáng kiến so với số lượng GV, NV trong tổ'
    },
    schoolAccreditationGoal: 'Đạt chuẩn Quốc gia mức độ 1 vào năm 2029'
  }
};

/**
 * Số liệu học sinh chuẩn xác nhất, cập nhật ngày 25/9/2026
 * Quy định: Từ nay về sau toàn bộ hệ thống sử dụng bộ số liệu này.
 */
export const OFFICIAL_STUDENT_DETAILED_STATS = {
  updateDate: '25/9/2026',
  title: 'BẢNG THỐNG KÊ SỐ LỚP, SỐ HỌC SINH NĂM HỌC 2026 - 2027',
  summary: {
    totalClasses: 53,
    totalStudents: 2111,
    totalDisabled: 25,
    avgPerClass: 39.83,
    thcs: { classes: 39, students: 1581, disabled: 22 },
    thpt: { classes: 14, students: 530, disabled: 3 }
  },
  grades: [
    { grade: 6, classes: 10, students: 410, female: 198, ethnic: 1, ethnicFemale: 0, disabled: 6, note: 'ĐBK: 6 lớp (245 HS); Tân Kiều: 4 lớp (165 HS)' },
    { grade: 7, classes: 9, students: 368, female: 180, ethnic: 0, ethnicFemale: 0, disabled: 6, note: 'ĐBK: 6 lớp (235 HS); Tân Kiều: 3 lớp (133 HS)' },
    { grade: 8, classes: 10, students: 401, female: 194, ethnic: 2, ethnicFemale: 1, disabled: 7, note: 'ĐBK: 6 lớp (251 HS); Tân Kiều: 4 lớp (150 HS)' },
    { grade: 9, classes: 10, students: 402, female: 198, ethnic: 1, ethnicFemale: 1, disabled: 3, note: 'ĐBK: 6 lớp (249 HS); Tân Kiều: 4 lớp (153 HS)' },
    { grade: 10, classes: 5, students: 203, female: 103, ethnic: 0, ethnicFemale: 0, disabled: 1, note: 'Điểm chính: 10CB1 (37), 10CB2 (29), 10CB3 (44), 10CB4 (48), 10CB5 (45)' },
    { grade: 11, classes: 4, students: 142, female: 72, ethnic: 1, ethnicFemale: 0, disabled: 2, note: 'Điểm chính: 11CB1 (40), 11CB2 (35), 11CB3 (34), 11CB4 (33)' },
    { grade: 12, classes: 5, students: 185, female: 93, ethnic: 0, ethnicFemale: 0, disabled: 0, note: 'Điểm chính: 12CB1 (28), 12CB2 (23), 12CB3 (46), 12CB4 (47), 12CB5 (41)' }
  ],
  campuses: [
    {
      id: 'main',
      name: 'Điểm chính (THPT)',
      address: 'Khuôn viên THPT Đốc Binh Kiều cũ',
      classes: 14,
      students: 530,
      disabled: 3,
      grades: 'Khối 10, 11, 12',
      gradeDetails: [
        { grade: 'Khối 10', classes: 5, students: 203, disabled: 1 },
        { grade: 'Khối 11', classes: 4, students: 142, disabled: 2 },
        { grade: 'Khối 12', classes: 5, students: 185, disabled: 0 }
      ]
    },
    {
      id: 'dbk',
      name: 'Điểm Đốc Binh Kiều (THCS)',
      address: 'Xã Đốc Binh Kiều (Khuôn viên THCS Đốc Binh Kiều cũ)',
      classes: 24,
      students: 980,
      disabled: 16,
      grades: 'Khối 6, 7, 8, 9',
      gradeDetails: [
        { grade: 'Khối 6', classes: 6, students: 245, disabled: 4 },
        { grade: 'Khối 7', classes: 6, students: 235, disabled: 4 },
        { grade: 'Khối 8', classes: 6, students: 251, disabled: 5 },
        { grade: 'Khối 9', classes: 6, students: 249, disabled: 3 }
      ]
    },
    {
      id: 'tankieu',
      name: 'Điểm Tân Kiều (THCS)',
      address: 'Xã Tân Kiều (Cách điểm chính 11 km)',
      classes: 15,
      students: 601,
      disabled: 6,
      grades: 'Khối 6, 7, 8, 9',
      gradeDetails: [
        { grade: 'Khối 6', classes: 4, students: 165, disabled: 2 },
        { grade: 'Khối 7', classes: 3, students: 133, disabled: 2 },
        { grade: 'Khối 8', classes: 4, students: 150, disabled: 2 },
        { grade: 'Khối 9', classes: 4, students: 153, disabled: 0 }
      ]
    }
  ]
};


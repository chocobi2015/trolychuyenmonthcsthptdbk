import staffDataJson from './schoolStaffMasterData.json';

export interface StaffMember {
  id: string;
  stt: number;
  sttTo: string;
  oldSchool: string; // THPTDBK, THCSDBK, THCSTK
  department: string; // BGH, Văn phòng, Toán, Ngữ văn - Thư viện - Thiết bị, etc.
  fullName: string;
  dateOfBirth: string;
  gender: string; // Nam, Nữ
  subjectOrRole: string; // Môn dạy hoặc công việc NV
  isPartyMember: boolean;
  roleBeforeMerge: string; // Chức vụ trước sáp nhập
  roleAfterMerge: string; // Chức vụ sau sáp nhập
  highestDegree: string; // ĐHSP, Thạc sỹ, Đại học, Trung cấp
  major: string; // Chuyên ngành đào tạo
  politicalTheory: string; // Cao cấp, Trung cấp, Sơ cấp
  itLevel: string; // A, B, THCB
  foreignLanguage: string; // A2, B1, B, Đại học
  eduManagement: string; // Quản lý GD
  stateManagement: string; // Quản lý Nhà nước
  notes: string;
}

export interface DepartmentSummary {
  count: number;
  female: number;
  party: number;
  masters: number;
  members: string[];
}

export interface StaffMasterData {
  fileName: string;
  academicYear: string;
  totalStaff: number;
  femaleCount: number;
  maleCount: number;
  partyMemberCount: number;
  masterDegreeCount: number;
  departmentsSummary: Record<string, DepartmentSummary>;
  staff: StaffMember[];
}

export const OFFICIAL_STAFF_MASTER: StaffMasterData = staffDataJson as StaffMasterData;

export const SCHOOL_DEPARTMENTS_LIST = [
  'BGH',
  'Văn phòng',
  'Toán',
  'Ngữ văn - Thư viện - Thiết bị',
  'Lịch sử - Địa lý-GDCD-GDKTPL',
  'Vật lý-Hóa học-Sinh học-CN',
  'Ngoại ngữ-Tin học',
  'GDTC - QPAN - Nghệ thuật'
];

export const PRE_MERGE_SCHOOLS_LIST = [
  { id: 'THPTDBK', name: 'THPT Đốc Binh Kiều (Cũ)' },
  { id: 'THCSDBK', name: 'THCS Đốc Binh Kiều (Cũ)' },
  { id: 'THCSTK', name: 'THCS Tân Kiều (Cũ)' }
];

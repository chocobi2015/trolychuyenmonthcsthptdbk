import { DepartmentInfo, DepartmentMeeting } from '../types/meeting';
import persistedMeetings from './persistedDepartmentMeetings.json';

export const SCHOOL_DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'toan',
    name: 'Tổ Toán',
    shortName: 'Toán',
    headTeacher: 'Thầy Nguyễn Văn Tới',
    deputyHeadTeacher: 'Thầy Trần Quốc Huy & Cô Nguyễn Thị Bích Lang',
    memberCount: 15,
    subjects: ['Toán 6', 'Toán 7', 'Toán 8', 'Toán 9', 'Toán 10', 'Toán 11', 'Toán 12'],
    color: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200'
  },
  {
    id: 'van',
    name: 'Tổ Ngữ văn - Thư viện - Thiết bị',
    shortName: 'Ngữ văn',
    headTeacher: 'Cô Tô Thị Lắm',
    deputyHeadTeacher: 'Thầy Trương Văn Nghĩa & Cô Huỳnh Thị Vân Nhi',
    memberCount: 17,
    subjects: ['Ngữ văn 6 - 12', 'Văn hóa đọc', 'Công tác Thư viện', 'Thiết bị dạy học'],
    color: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200'
  },
  {
    id: 'khtn',
    name: 'Tổ Vật lý - Hóa học - Sinh học - Công nghệ',
    shortName: 'KHTN - Công nghệ',
    headTeacher: 'Thầy Bùi Kim Huỳnh',
    deputyHeadTeacher: 'Thầy Thái Văn Tiến, Thầy Phạm Biên Thùy & Cô Nguyễn Thị Hiếu',
    memberCount: 26,
    subjects: ['KHTN 6-9', 'Vật lí 10-12', 'Hóa học 10-12', 'Sinh học 10-12', 'Công nghệ 6-12', 'STEM'],
    color: 'text-teal-700',
    bgLight: 'bg-teal-50',
    borderLight: 'border-teal-200'
  },
  {
    id: 'khxh',
    name: 'Tổ Lịch sử - Địa lý - GDCD - GDKT&PL',
    shortName: 'Lịch sử - Địa lý',
    headTeacher: 'Cô Lê Hồng Thúy',
    deputyHeadTeacher: 'Thầy Trịnh Văn Sơn',
    memberCount: 16,
    subjects: ['Lịch sử & Địa lí 6-9', 'Lịch sử 10-12', 'Địa lí 10-12', 'GDCD 6-9', 'GDKT&PL 10-12'],
    color: 'text-amber-700',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200'
  },
  {
    id: 'ngoaingu-tin',
    name: 'Tổ Ngoại ngữ - Tin học',
    shortName: 'Ngoại ngữ - Tin',
    headTeacher: 'Cô Lê Thị Ngọc Tuyền',
    deputyHeadTeacher: 'Thầy Nguyễn Trung Hiếu & Cô Nguyễn Thị Mai Khanh',
    memberCount: 16,
    subjects: ['Tiếng Anh 6-12', 'Tin học 6-12', 'Chuyển đổi số & Ứng dụng AI học đường'],
    color: 'text-indigo-700',
    bgLight: 'bg-indigo-50',
    borderLight: 'border-indigo-200'
  },
  {
    id: 'gdtc',
    name: 'Tổ Giáo dục thể chất - GDQP-AN - Nghệ thuật',
    shortName: 'GDTC - QPAN - NT',
    headTeacher: 'Thầy Lê Văn Nguyên',
    deputyHeadTeacher: 'Cô Lê Thị Tuyết Xanh & Thầy Ngô Anh Tuấn (Đoàn trường)',
    memberCount: 12,
    subjects: ['Giáo dục thể chất 6-12', 'GDQPAN 10-12', 'Âm nhạc', 'Mĩ thuật', 'Hoạt động trải nghiệm hướng nghiệp'],
    color: 'text-rose-700',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200'
  },
  {
    id: 'vanphong',
    name: 'Tổ Văn phòng',
    shortName: 'Văn phòng',
    headTeacher: 'Thầy Trần Văn Út',
    deputyHeadTeacher: 'Thầy Nguyễn Văn Quân & Cô Nguyễn Thị Thúy Huỳnh',
    memberCount: 14,
    subjects: ['Văn thư - Lưu trữ', 'Kế toán - Tài chính', 'Y tế học đường', 'Bảo vệ - Phục vụ'],
    color: 'text-purple-700',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200'
  }
];

// Khởi tạo các văn bản chỉ đạo & trả lời họp tổ chuyên môn chính thức từ tài liệu của nhà trường
export const INITIAL_DEPARTMENT_MEETINGS: DepartmentMeeting[] = (persistedMeetings as unknown as DepartmentMeeting[]);

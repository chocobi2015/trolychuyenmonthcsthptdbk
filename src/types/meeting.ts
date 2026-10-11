export interface DepartmentTask {
  id: string;
  task: string;
  assignee: string;
  deadline: string;
  status?: 'pending' | 'in_progress' | 'completed';
}

export interface DepartmentMeeting {
  id: string;
  departmentId: string;
  departmentName: string;
  meetingNumber: string; // e.g. "Số: 01/BB-TT", "Số: 02/BB-TV"
  week: string; // e.g. "Tuần 1 - 2", "Tuần 3 - 4"
  semester: string; // e.g. "Học kỳ I"
  schoolYear: string; // e.g. "2026 - 2027"
  meetingDate: string; // e.g. "14:00, Thứ Sáu ngày 05/09/2026"
  location: string; // e.g. "Văn phòng Tổ Toán - Điểm trường chính"
  leader: string; // Tổ trưởng / Người chủ trì
  secretary: string; // Thư ký
  attendees: {
    present: number;
    total: number;
    absent?: string;
    list?: string[];
  };
  topic: string; // Chủ đề sinh hoạt chuyên môn
  content: string; // Diễn biến, thảo luận chuyên môn chi tiết
  resolutions: string[]; // Nghị quyết, kết luận thống nhất của tổ
  tasks: DepartmentTask[]; // Phân công nhiệm vụ cụ thể 2 tuần tiếp theo
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  shortName: string;
  headTeacher: string; // Tổ trưởng
  deputyHeadTeacher?: string; // Tổ phó
  memberCount: number;
  subjects: string[];
  color: string;
  bgLight: string;
  borderLight: string;
}

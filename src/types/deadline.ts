export type DeadlinePriority = 'urgent' | 'high' | 'normal' | 'low';
export type DeadlineStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface SchoolDeadline {
  id: string;
  title: string;
  deadlineDate: string; // YYYY-MM-DD
  sourceDocument: string; // Số hiệu / Tên văn bản căn cứ (Sở GDĐT hoặc Trường)
  assignedDepartment: string; // Đơn vị / người chịu trách nhiệm
  priority: DeadlinePriority;
  status: DeadlineStatus;
  description?: string;
  isAutomated?: boolean; // Tự động trích xuất từ văn bản
  targetAudience?: string; // Đối tượng thực hiện (GVBM, TTCM, BGH, v.v.)
  createdAt: string;
}

export function calculateDaysRemaining(deadlineDateStr: string, baseDateStr = '2026-10-25'): number {
  try {
    const deadline = new Date(deadlineDateStr + 'T23:59:59');
    const base = new Date(baseDateStr + 'T00:00:00');
    const diffTime = deadline.getTime() - base.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch {
    return 999;
  }
}

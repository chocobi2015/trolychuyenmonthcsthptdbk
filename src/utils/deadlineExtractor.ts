import { SchoolDeadline } from '../types/deadline';
import { DepartmentDirective, SchoolDocument } from '../types/document';

/**
 * Trích xuất tự động các thời hạn / hạn chót (Deadline) từ văn bản của Sở hoặc của Trường
 */
export function extractDeadlinesFromText(
  text: string,
  sourceDocumentName: string,
  defaultDepartment = 'Ban Giám hiệu & Các Tổ Chuyên môn'
): SchoolDeadline[] {
  const results: SchoolDeadline[] = [];
  if (!text) return results;

  // Tách văn bản thành từng dòng / câu để nhận diện thời hạn
  const lines = text.split(/\r?\n|[.;]\s+/);

  // Mẫu nhận diện ngày tháng: "ngày DD/MM/YYYY" hoặc "ngày DD tháng MM năm YYYY"
  const dateRegex = /(?:trước\s+ngày|hạn\s+chót|chậm\s+nhất\s+ngày|hoàn\s+thành\s+trước\s+ngày|thời\s+gian\s+báo\s+cáo|thời\s+hạn\s+nộp|gửi\s+về\s+sở\s+trước\s+ngày)\s+(\d{1,2})[/-](\d{1,2})[/-](\d{4})/i;
  const dateWrittenRegex = /(?:trước\s+ngày|hạn\s+chót|chậm\s+nhất\s+ngày|hoàn\s+thành\s+trước\s+ngày|thời\s+gian\s+báo\s+cáo|thời\s+hạn\s+nộp|gửi\s+về\s+sở\s+trước\s+ngày)\s+(\d{1,2})\s+tháng\s+(\d{1,2})\s+năm\s+(\d{4})/i;

  lines.forEach((line) => {
    let day = '';
    let month = '';
    let year = '';

    const match1 = line.match(dateRegex);
    if (match1) {
      day = match1[1].padStart(2, '0');
      month = match1[2].padStart(2, '0');
      year = match1[3];
    } else {
      const match2 = line.match(dateWrittenRegex);
      if (match2) {
        day = match2[1].padStart(2, '0');
        month = match2[2].padStart(2, '0');
        year = match2[3];
      }
    }

    if (day && month && year) {
      const deadlineDate = `${year}-${month}-${day}`;
      // Lấy câu mô tả ngắn gọn
      let title = line.trim().replace(/^[-*•\d.)\s]+/, '');
      if (title.length > 120) {
        title = title.substring(0, 117) + '...';
      }

      if (title.length > 10) {
        results.push({
          id: `dl-auto-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          title,
          deadlineDate,
          sourceDocument: sourceDocumentName,
          assignedDepartment: defaultDepartment,
          priority: 'high',
          status: 'pending',
          isAutomated: true,
          createdAt: new Date().toISOString().split('T')[0],
        });
      }
    }
  });

  return results;
}

export function extractDeadlinesFromDirective(directive: DepartmentDirective): SchoolDeadline[] {
  const sourceName = `${directive.documentNumber ? directive.documentNumber + ' - ' : ''}${directive.title}`;
  return extractDeadlinesFromText(directive.fullContent, sourceName, 'Ban Giám hiệu');
}

export function extractDeadlinesFromSchoolDoc(doc: SchoolDocument): SchoolDeadline[] {
  const sourceName = `${doc.documentNumber ? doc.documentNumber + ' - ' : ''}${doc.title} ${doc.subTitle || ''}`.trim();
  const allSectionsText = doc.sections.map((s) => s.content).join('\n');
  return extractDeadlinesFromText(allSectionsText, sourceName, 'Ban Giám hiệu & Tổ Chuyên môn');
}

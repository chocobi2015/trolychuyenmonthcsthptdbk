/**
 * BỘ SINH TRỌN BỘ HỒ SƠ KIỂM TRA NỘI BỘ CẢ NĂM HỌC 2026 - 2027 (.DOCX)
 * Trường THCS và THPT Đốc Binh Kiều - Sở GDĐT tỉnh Đồng Tháp
 *
 * Tuân thủ CHÍNH XÁC 100% các Biểu mẫu (Mẫu 01 -> Mẫu 06) ban hành kèm theo
 * Công văn số 1134/SGDĐT-TCCB (17/10/2025) và Công văn số 3953/SGDĐT-TCCB (08/10/2026)
 * của Sở GDĐT tỉnh Đồng Tháp, cùng chuẩn thể thức Nghị định 30/2020/NĐ-CP:
 *  - Mẫu 03, 04, 05: Góc trên bên trái ghi "TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU / Đoàn kiểm tra theo Quyết định số ..."
 *  - Mẫu 06: Văn bản của Hiệu trưởng, góc trên bên trái ghi "SỞ GDĐT TỈNH ĐỒNG THÁP / TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU / Số: .../TB-THCS&THPTĐBK"
 *
 * Xuất ra 03 file Word sẵn sàng in ấn & hiệu chỉnh nhẹ theo thực tế:
 *  1. TRON_BO_HO_SO_KTNB_HK1_2026_2027.docx (Đợt 01 - 13: đủ Mẫu 03, 04, 05, 06 + BC Sơ kết HK1)
 *  2. TRON_BO_HO_SO_KTNB_HK2_HE_2026_2027.docx (Đợt 14 - 29: đủ Mẫu 03, 04, 05, 06 + BC Tổng kết năm học)
 *  3. TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx (Trọn bộ 06 Biểu mẫu khung chuẩn Mẫu 01 -> Mẫu 06 đúng 100% CV 1134)
 */

import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
  TableLayoutType,
  LineRuleType,
  PageBreak,
  Footer,
  PageNumber,
} from 'docx';
import {
  MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR,
  MonthlyDetailedInspection,
} from '../src/data/detailedInspectionPlanFullText';
import {
  DOCX_PAGE_SETUP,
  FONT_SIZES,
  PARAGRAPH_SPACING,
  createAdminDocHeaderTable,
  createInspectionTeamHeaderTable,
  createDocumentTitleBlock,
  createLegalBasisParagraph,
  createArticleHeading,
  createBodyParagraph,
  createSignatureBlockTable,
  TABLE_CELL_BORDER_GRID,
  TABLE_CELL_MARGINS_DATA,
} from '../src/utils/docxStandards';

type DocChild = Paragraph | Table;

const SUPERIOR_AGENCY = 'SỞ GDĐT TỈNH ĐỒNG THÁP';
const SCHOOL_NAME = 'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU';
const COMMITTEE_DECISION_NO = '49/QĐ-THCS&THPTĐBK';
const COMMITTEE_DECISION_DATE = '15/10/2026';

const p = (text: string, bold = false, italic = false): Paragraph =>
  createBodyParagraph(text, {
    bold,
    italic,
    indentFirstLine: true,
    spacingBefore: 40,
    spacingAfter: 50,
  });

const h1 = (text: string): Paragraph =>
  createArticleHeading(text, { spacingBefore: 160, spacingAfter: 60 });

const h2 = (text: string): Paragraph =>
  createArticleHeading(text, { spacingBefore: 110, spacingAfter: 40 });

function createPageNumberFooter(): Footer {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Trang ', font: 'Times New Roman', size: 22 }),
          new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 22 }),
          new TextRun({ text: ' / ', font: 'Times New Roman', size: 22 }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 22 }),
        ],
      }),
    ],
  });
}

function createDocumentStyles() {
  return {
    default: {
      document: {
        run: {
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
          color: '000000',
        },
        paragraph: {
          spacing: {
            line: PARAGRAPH_SPACING.line,
            lineRule: PARAGRAPH_SPACING.lineRule,
            before: PARAGRAPH_SPACING.before,
            after: PARAGRAPH_SPACING.after,
          },
        },
      },
    },
  };
}

const pageBreak = (): Paragraph =>
  new Paragraph({
    children: [new PageBreak()],
  });

const NO_BORDER = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
} as const;

/** Trích ngày bắt đầu và ngày kết thúc từ chuỗi "DD/MM/YYYY - DD/MM/YYYY" */
function parseTimeframe(tf: string) {
  const parts = tf.split('-').map((s) => s.trim());
  const startStr = parts[0] || '05/10/2026';
  const endStr = parts[1] || startStr;
  const [sd = '05', sm = '10', sy = '2026'] = startStr.split('/');
  const [ed = '15', em = sm, ey = sy] = endStr.split('/');

  const planDayNum = Math.max(1, parseInt(sd, 10) - 2);
  const reportDayNum = Math.min(28, parseInt(ed, 10) + 1);
  const noticeDayNum = Math.min(28, parseInt(ed, 10) + 2);

  const pad = (n: number) => String(n).padStart(2, '0');
  const durationDays = Math.max(3, Math.min(10, Math.abs(parseInt(ed, 10) - parseInt(sd, 10)) + 1));

  return {
    startStr,
    endStr,
    startDay: sd,
    endDay: ed,
    month: em,
    year: ey,
    durationDays,
    planDateText: `Đốc Binh Kiều, ngày ${pad(planDayNum)} tháng ${sm} năm ${sy}`,
    minuteDateText: `Đốc Binh Kiều, ngày ${ed} tháng ${em} năm ${ey}`,
    reportDateText: `Đốc Binh Kiều, ngày ${pad(reportDayNum)} tháng ${em} năm ${ey}`,
    reportShortDate: `${pad(reportDayNum)}/${em}/${ey}`,
    noticeDateText: `Đốc Binh Kiều, ngày ${pad(noticeDayNum)} tháng ${em} năm ${ey}`,
  };
}

/** Chuẩn hóa tên Trưởng đoàn sang danh xưng văn bản hành chính */
function formatFormalLeader(raw: string): { display: string; signerName: string; roleOnly: string } {
  const clean = raw
    .replace(/Thầy\s+/g, 'Ông ')
    .replace(/Cô\s+/g, 'Bà ')
    .replace(/\(HT\)/g, '(Hiệu trưởng)')
    .replace(/\(PHT\)/g, '(Phó Hiệu trưởng)');

  if (raw.includes('Lê Thanh Cường')) {
    return { display: clean, signerName: 'Lê Thanh Cường', roleOnly: 'Hiệu trưởng - Trưởng đoàn kiểm tra' };
  }
  if (raw.includes('Nguyễn Minh Trí')) {
    return { display: clean, signerName: 'Nguyễn Minh Trí', roleOnly: 'Phó Hiệu trưởng - Trưởng đoàn kiểm tra' };
  }
  if (raw.includes('Phan Thanh Thảo')) {
    return { display: clean, signerName: 'Phan Thanh Thảo', roleOnly: 'Phó Hiệu trưởng - Trưởng đoàn kiểm tra' };
  }
  if (raw.includes('Nguyễn Thanh Tòng')) {
    return { display: clean, signerName: 'Nguyễn Thanh Tòng', roleOnly: 'Phó Hiệu trưởng - Trưởng đoàn kiểm tra' };
  }
  return { display: clean, signerName: 'Nguyễn Minh Trí', roleOnly: 'Phó Hiệu trưởng - Trưởng đoàn kiểm tra' };
}

/** Tạo nội dung đánh giá thực tế (ưu điểm rõ, tồn tại ghi nhẹ nhàng, mang tính xây dựng) */
function buildRealisticFindings(item: MonthlyDetailedInspection) {
  const cat = item.category;

  if (cat === 'Chuyên môn') {
    return {
      overview:
        'Các Tổ chuyên môn và giáo viên thuộc đối tượng kiểm tra có trình độ đào tạo đạt chuẩn và trên chuẩn theo Luật Giáo dục 2019; thực hiện nhiệm vụ giảng dạy Chương trình GDPT 2018 tại các điểm trường theo phân công của Ban Giám hiệu.',
      inspectedRecords: [
        'Kế hoạch giáo dục của tổ chuyên môn, phân phối chương trình, sổ sinh hoạt tổ chuyên môn theo nghiên cứu bài học.',
        'Kế hoạch bài dạy (giáo án điện tử) của giáo viên trên hệ thống quản lý và hồ sơ minh chứng thực hiện nhiệm vụ giảng dạy.',
        'Sổ theo dõi và đánh giá học sinh, tiến độ cập nhật điểm số trên CSDL ngành và bài kiểm tra định kỳ/thường xuyên.',
        `Hồ sơ chuyên đề gắn với đợt kiểm tra: ${item.expectedOutput}`,
      ],
      strengths: [
        'Các tổ chuyên môn và giáo viên nghiêm túc chấp hành quy chế chuyên môn, chuẩn bị đầy đủ hồ sơ sổ sách theo đúng hướng dẫn của Sở GDĐT và Kế hoạch giáo dục nhà trường.',
        'Đội ngũ giáo viên tại các điểm trường có tinh thần trách nhiệm cao, tích cực đổi mới phương pháp dạy học theo định hướng phát triển phẩm chất, năng lực học sinh; ứng dụng hiệu quả công nghệ thông tin trong giảng dạy.',
        'Công tác phối hợp chuyên môn giữa các nhóm bộ môn cấp THCS và THPT được duy trì ổn định, bảo đảm đúng tiến độ chương trình.',
      ],
      gentleLimitations: [
        'Một vài hồ sơ kế hoạch bài dạy và minh chứng sinh hoạt tổ chuyên môn cập nhật lên hệ thống còn chậm 01 - 02 ngày so với lịch khuyến nghị do lịch giảng dạy liên điểm trường dày.',
        'Một số biên bản sinh hoạt chuyên môn ghi nhận phần phân tích bài học minh họa còn ngắn gọn, nên bổ sung thêm biện pháp hỗ trợ học sinh chưa đạt yêu cầu cần đạt.',
      ],
      causes:
        'Năm học đầu tiên vận hành mô hình trường liên cấp tại 03 điểm trường nên một số giáo viên dạy liên điểm trường có lịch công tác bận rộn; việc thống nhất biểu mẫu hồ sơ điện tử cần thêm thời gian hoàn thiện.',
      recommendations: [
        'Các tổ chuyên môn tiếp tục duy trì tốt nền nếp sinh hoạt theo nghiên cứu bài học; rà soát, chuẩn hóa định dạng hồ sơ chuyên môn điện tử đồng bộ giữa 03 điểm trường.',
        'Giáo viên tiếp tục phát huy ứng dụng công nghệ thông tin, hoàn thiện kịp thời các mục ghi chú hồ sơ còn thiếu sót nhỏ trong thời hạn 05 ngày làm việc.',
      ],
    };
  }

  if (cat === 'Tài chính - Cơ sở vật chất') {
    return {
      overview:
        'Bộ phận Tài chính - Kế toán, Thư viện, Thiết bị và quản lý cơ sở vật chất thực hiện nhiệm vụ tham mưu, phục vụ hoạt động dạy học và quản trị cơ sở vật chất trên cả 03 điểm trường của nhà trường.',
      inspectedRecords: [
        'Sổ sách theo dõi tài sản cố định, công cụ dụng cụ, sổ theo dõi mượn - trả thiết bị dạy học và sổ đăng ký thư viện tại 03 điểm trường.',
        'Chứng từ thu - chi, sổ quỹ, bảng công khai tài chính và hồ sơ thực hiện chế độ, chính sách (nếu thuộc phạm vi đợt kiểm tra).',
        'Nhật ký kiểm tra cơ sở vật chất, phòng học, phòng bộ môn, hệ thống phòng cháy chữa cháy và y tế học đường.',
        `Hồ sơ đối chiếu theo kế hoạch: ${item.expectedOutput}`,
      ],
      strengths: [
        'Công tác quản lý tài chính, tài sản công và các khoản thu - chi được thực hiện công khai, minh bạch, đúng chế độ chứng từ kế toán và các quy định hiện hành.',
        'Bộ phận Văn phòng, Kế toán, Thư viện, Thiết bị và Bảo vệ tại cả 03 điểm trường phối hợp chặt chẽ, bảo quản tốt cơ sở vật chất, phòng học và trang thiết bị phục vụ dạy học.',
        'Cảnh quan sư phạm xanh - sạch - đẹp, điều kiện phòng cháy chữa cháy và y tế học đường được kiểm tra thường xuyên, bảo đảm an toàn.',
      ],
      gentleLimitations: [
        'Việc đối chiếu, cập nhật sổ theo dõi mượn trả thiết bị và danh mục tài sản luân chuyển giữa các điểm trường đôi lúc chưa đồng bộ kịp thời trong cùng tuần.',
        'Một vài phòng bộ môn và kho thiết bị cần sắp xếp lại nhãn dán, sơ đồ bố trí gọn gàng hơn để thuận tiện cho giáo viên khi mượn thiết bị thực hành.',
      ],
      causes:
        'Khối lượng tài sản, thiết bị sau sáp nhập phân tán tại 03 điểm trường khá lớn, nhân sự kiêm nhiệm nên tiến độ rà soát, dán nhãn cập nhật sổ sách đôi lúc còn chậm nhẹ.',
      recommendations: [
        'Bộ phận Văn phòng, Kế toán và nhân viên Thư viện - Thiết bị hoàn thiện cập nhật sổ theo dõi tài sản, thiết bị đồng bộ giữa 03 điểm trường trong thời hạn 07 ngày làm việc.',
        'Tiếp tục rà soát định kỳ các hạng mục cơ sở vật chất nhỏ cần bảo trì để kịp thời tham mưu Ban Giám hiệu sửa chữa, bảo đảm điều kiện dạy và học.',
      ],
    };
  }

  if (cat === 'Khảo thí - Kiểm định') {
    return {
      overview:
        'Bộ phận Khảo thí, Giáo vụ và các Tổ chuyên môn trực tiếp tham mưu, tổ chức thực hiện công tác kiểm tra, đánh giá định kỳ, kiểm định chất lượng và ôn thi cuối cấp theo Thông tư 22/2021/TT-BGDĐT.',
      inspectedRecords: [
        'Kế hoạch tổ chức kiểm tra định kỳ/kỳ thi, quyết định thành lập các ban (ra đề, in sao đề, coi thi, chấm thi, phúc khảo).',
        'Ma trận đề, bản đặc tả, đề kiểm tra gốc, hướng dẫn chấm và biên bản bàn giao đề thi, bài thi.',
        'Bảng tổng hợp kết quả điểm kiểm tra, hồ sơ dự thi/xét tốt nghiệp và dữ liệu đối soát trên CSDL ngành.',
        `Hồ sơ minh chứng cụ thể của đợt kiểm tra: ${item.expectedOutput}`,
      ],
      strengths: [
        'Công tác xây dựng ma trận, bản đặc tả và biên soạn đề kiểm tra bám sát Chương trình GDPT 2018 và Thông tư 22/2021/TT-BGDĐT, bảo đảm khoa học, phân hóa hợp lý.',
        'Quy trình in sao, bảo mật đề thi, coi kiểm tra và chấm bài tại các điểm trường được tổ chức nghiêm túc, khách quan, đúng quy chế, không xảy ra sự cố.',
        'Việc đối soát thông tin học sinh, hồ sơ dự thi và cập nhật điểm số lên phần mềm diễn ra đúng tiến độ, độ chính xác cao.',
      ],
      gentleLimitations: [
        'Một số biên bản giao nhận bài thi/hồ sơ ở vài phòng kiểm tra còn thiếu chữ ký nháy góc trang hoặc ghi giờ bàn giao chưa thống nhất định dạng.',
        'Tiến độ nhập nhận xét chi tiết trên hệ thống ở một vài lớp còn sát hạn chót, cần chủ động hoàn thành sớm hơn 01 ngày để thuận lợi cho công tác kiểm tra chéo.',
      ],
      causes:
        'Số lượng lớp và học sinh đông (53 lớp, 2.111 học sinh tại 03 điểm trường), thời gian chấm bài và nhập điểm tập trung vào cùng giai đoạn cuối kỳ.',
      recommendations: [
        'Các tổ chuyên môn và bộ phận giáo vụ rà soát, bổ sung đầy đủ chữ ký xác nhận trên biên bản bàn giao hồ sơ trước khi đóng tập lưu trữ tại Văn thư trong 03 ngày làm việc.',
        'Tiếp tục duy trì quy trình kiểm tra chéo 02 vòng đối với điểm số và thông tin hồ sơ dự thi, bảo đảm tuyệt đối chính xác.',
      ],
    };
  }

  if (cat === 'Nền nếp - Đoàn thể') {
    return {
      overview:
        'Đội ngũ giáo viên chủ nhiệm 53 lớp cùng Đoàn Thanh niên, Liên đội phụ trách công tác quản lý nền nếp, chuyên cần, giáo dục đạo đức, kỹ năng sống và phong trào thi đua học sinh tại 03 điểm trường.',
      inspectedRecords: [
        'Sổ chủ nhiệm lớp, sổ đầu bài, sổ theo dõi chuyên cần và nhật ký quản lý nền nếp học sinh tại 03 điểm trường.',
        'Kế hoạch hoạt động của Đoàn Thanh niên, Liên đội, Đội cờ đỏ và Ban quản lý nền nếp.',
        'Hồ sơ phối hợp giữa giáo viên chủ nhiệm với cha mẹ học sinh và sổ theo dõi công tác giáo dục đạo đức, kỹ năng sống.',
        `Hồ sơ kết quả theo kế hoạch: ${item.expectedOutput}`,
      ],
      strengths: [
        'Đa số giáo viên chủ nhiệm 53 lớp sâu sát tình hình lớp học, nắm vững hoàn cảnh học sinh, duy trì tốt sĩ số và nền nếp chuyên cần tại cả 03 điểm trường.',
        'Đoàn Thanh niên, Liên đội và Đội cờ đỏ hoạt động tích cực, phối hợp nhịp nhàng trong theo dõi thi đua, xây dựng môi trường học đường an toàn, thân thiện.',
        'Học sinh chấp hành tốt nội quy nhà trường, lễ phép với thầy cô và tích cực tham gia các phong trào thi đua.',
      ],
      gentleLimitations: [
        'Ở một vài lớp đầu cấp và sau các đợt nghỉ lễ, còn rải rác một số học sinh đi học trễ hoặc nghỉ học chưa kịp nộp đơn xin phép đúng quy định.',
        'Một số sổ chủ nhiệm ghi chép biện pháp phối hợp với gia đình đối với học sinh cần quan tâm đặc biệt còn vắn tắt, nên ghi cụ thể hơn để tiện theo dõi từng tháng.',
      ],
      causes:
        'Một bộ phận học sinh có nhà ở xa điểm trường, điều kiện đi lại phụ thuộc thời tiết; một số phụ huynh đi làm xa nên việc phản hồi thông tin đôi lúc chưa kịp thời.',
      recommendations: [
        'Giáo viên chủ nhiệm tăng cường liên hệ chặt chẽ với phụ huynh qua nhóm liên lạc điện tử nhằm nhắc nhở việc đi học đúng giờ và duy trì chuyên cần.',
        'Đoàn Thanh niên và Liên đội đẩy mạnh tuyên truyền an toàn giao thông cổng trường và hoàn thiện cập nhật sổ theo dõi thi đua định kỳ hằng tuần.',
      ],
    };
  }

  // Hành chính - Quản trị
  return {
    overview:
      'Bộ phận Hành chính, Văn phòng, Quản trị hệ thống và Ban Giám hiệu thực hiện nhiệm vụ quản trị điều hành, văn thư lưu trữ, chuyển đổi số và kết nối đồng bộ giữa 03 điểm trường của nhà trường.',
    inspectedRecords: [
      'Hệ thống văn bản chỉ đạo, kế hoạch công tác, sổ đăng bộ, hồ sơ quản lý sĩ số, hồ sơ chuyển đổi số và lưu trữ văn thư.',
      'Dữ liệu quản lý trên hệ thống CSDL ngành giáo dục, học bạ điện tử, văn bản đi/đến điện tử và hồ sơ hành chính tại 03 điểm trường.',
      'Biên bản họp giao ban, báo cáo tiến độ thực hiện nhiệm vụ của các bộ phận và điểm trường.',
      `Sản phẩm, hồ sơ đối chiếu của đợt kiểm tra: ${item.expectedOutput}`,
    ],
    strengths: [
      'Công tác quản trị điều hành giữa Điểm chính (Khối THPT, Ấp 3), Điểm trường THCS Đốc Binh Kiều (Ấp 1) và Điểm trường THCS Tân Kiều (Ấp Tân Kiều) được triển khai nhịp nhàng, thông suốt.',
      'Hồ sơ hành chính, sổ sách văn thư, dữ liệu học sinh và cán bộ trên phần mềm được cập nhật đầy đủ, bảo đảm nguyên tắc "Đúng - Đủ - Sạch - Sống" và thể thức Nghị định 30/2020/NĐ-CP.',
      'Các bộ phận thể hiện tinh thần trách nhiệm cao, thực hiện tốt chế độ thông tin báo cáo đúng tiến độ yêu cầu.',
    ],
    gentleLimitations: [
      'Một số biểu mẫu thống kê giữa 03 điểm trường còn có vài chi tiết nhỏ cần chuẩn hóa thống nhất định dạng trước khi tổng hợp chung toàn trường.',
      'Một vài hồ sơ lưu trữ điện tử cần đặt lại tên tệp theo đúng quy ước thống nhất để thuận tiện hơn cho việc tra cứu lâu dài.',
    ],
    causes:
      'Giai đoạn đầu hợp nhất dữ liệu hành chính và hệ thống biểu mẫu giữa các điểm trường nên một số đầu mục thống kê cần thêm bước chuẩn hóa chung.',
    recommendations: [
      'Bộ phận Văn phòng và Quản trị hệ thống hướng dẫn thống nhất mẫu biểu và quy ước lưu trữ hồ sơ số dùng chung cho cả 03 điểm trường.',
      'Các bộ phận rà soát, bổ sung hoàn thiện các chi tiết kỹ thuật nhỏ đã nêu trong biên bản trong thời hạn 05 ngày làm việc.',
    ],
  };
}

/** Bảng Nơi nhận (trái) + Ký tên (phải) cho Mẫu 03 & Mẫu 05 (Đoàn kiểm tra ký, không đóng dấu) */
function createTeamSignAndRecipientsTable(
  recipients: string[],
  rightTitle: string,
  rightSub: string,
  rightName: string
): Table {
  const colLeft = 4155;
  const colRight = DOCX_PAGE_SETUP.contentWidth - colLeft;

  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [colLeft, colRight],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: colLeft, type: WidthType.DXA },
            borders: NO_BORDER,
            margins: { top: 40, bottom: 40, left: 20, right: 80 },
            children: [
              new Paragraph({
                spacing: { before: 20, after: 30, line: 240, lineRule: LineRuleType.AUTO },
                children: [
                  new TextRun({
                    text: 'Nơi nhận:',
                    bold: true,
                    italics: true,
                    font: 'Times New Roman',
                    size: FONT_SIZES.RECIPIENTS_TITLE,
                  }),
                ],
              }),
              ...recipients.map(
                (r) =>
                  new Paragraph({
                    spacing: { before: 0, after: 20, line: 240, lineRule: LineRuleType.AUTO },
                    children: [
                      new TextRun({
                        text: `- ${r}`,
                        font: 'Times New Roman',
                        size: FONT_SIZES.RECIPIENTS_ITEM,
                      }),
                    ],
                  })
              ),
            ],
          }),
          new TableCell({
            width: { size: colRight, type: WidthType.DXA },
            borders: NO_BORDER,
            margins: { top: 40, bottom: 40, left: 80, right: 20 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                keepNext: true,
                spacing: { before: 20, after: 20, line: 240, lineRule: LineRuleType.AUTO },
                children: [new TextRun({ text: rightTitle, bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                keepNext: true,
                spacing: { before: 0, after: 900, line: 240, lineRule: LineRuleType.AUTO },
                children: [new TextRun({ text: rightSub, italics: true, font: 'Times New Roman', size: FONT_SIZES.RECIPIENTS_ITEM })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0, line: 240, lineRule: LineRuleType.AUTO },
                children: [new TextRun({ text: rightName, bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

/** Bảng ký 3 cột đúng chuẩn MẪU SỐ 04 (Trang 16, CV 1134): Người được kiểm tra | Tổ kiểm tra | Người ghi biên bản */
function createThreeColumnMinutesSignTable(leaderName: string, secretaryName = 'Nguyễn Thị Kim Ngọc'): Table {
  const colW = Math.floor(DOCX_PAGE_SETUP.contentWidth / 3);
  const cols = [colW, colW, DOCX_PAGE_SETUP.contentWidth - colW * 2];

  const makeCell = (title: string, sub: string, name: string, width: number) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      borders: NO_BORDER,
      margins: { top: 40, bottom: 40, left: 40, right: 40 },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          keepNext: true,
          spacing: { before: 40, after: 20, line: 240, lineRule: LineRuleType.AUTO },
          children: [new TextRun({ text: title, bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          keepNext: true,
          spacing: { before: 0, after: 900, line: 240, lineRule: LineRuleType.AUTO },
          children: [new TextRun({ text: sub, italics: true, font: 'Times New Roman', size: FONT_SIZES.RECIPIENTS_ITEM })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0, line: 240, lineRule: LineRuleType.AUTO },
          children: [new TextRun({ text: name, bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
        }),
      ],
    });

  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: cols,
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          makeCell('Người được kiểm tra', '(Ký, ghi rõ họ và tên)', '..............................', cols[0]),
          makeCell('Tổ kiểm tra', '(Ký, ghi rõ họ và tên)', leaderName, cols[1]),
          makeCell('Người ghi biên bản', '(Ký và ghi rõ họ tên)', secretaryName, cols[2]),
        ],
      }),
    ],
  });
}

/** Sinh trọn bộ 04 văn bản (Mẫu 03, Mẫu 04, Mẫu 05, Mẫu 06) chuẩn 100% CV 1134 cho 01 đợt kiểm tra */
function buildFullFormsForRound(item: MonthlyDetailedInspection, roundIndex: number, isFirstInDoc: boolean): DocChild[] {
  const children: DocChild[] = [];
  const roundCode = String(roundIndex).padStart(2, '0');
  const dates = parseTimeframe(item.timeframe);
  const leader = formatFormalLeader(item.leadInspector);
  const findings = buildRealisticFindings(item);

  // =========================================================================
  // MẪU SỐ 03: KẾ HOẠCH TIẾN HÀNH KIỂM TRA (ĐÚNG TRANG 14 CV 1134)
  // Góc trái: TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU / Đoàn kiểm tra theo Quyết định số 49/QĐ-THCS&THPTĐBK
  // =========================================================================
  if (!isFirstInDoc) {
    children.push(pageBreak());
  }

  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 03 (CV 1134/SGDĐT-TCCB)`,
          italics: true,
          color: '444444',
          font: 'Times New Roman',
          size: FONT_SIZES.TABLE_COMPACT,
        }),
      ],
    }),
    createInspectionTeamHeaderTable(SCHOOL_NAME, COMMITTEE_DECISION_NO, dates.planDateText),
    ...createDocumentTitleBlock('KẾ HOẠCH TIẾN HÀNH KIỂM TRA'),
    p(
      `Thực hiện Quyết định số ${COMMITTEE_DECISION_NO} ngày ${COMMITTEE_DECISION_DATE} của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027 và Kế hoạch số 48/KH-THCS&THPTĐBK về việc ${item.title} (Đợt ${roundCode}), Tổ kiểm tra lập kế hoạch tiến hành kiểm tra như sau:`
    ),
    h1('I. MỤC ĐÍCH, YÊU CẦU'),
    h2('1. Mục đích'),
    p(
      `Xem xét, đánh giá khách quan, thực chất tình hình thực hiện nhiệm vụ thuộc lĩnh vực ${item.category.toLowerCase()} theo nội dung "${item.title}"; ghi nhận ưu điểm và kịp thời tư vấn, hỗ trợ đối tượng kiểm tra khắc phục các thiếu sót nhỏ (nếu có).`
    ),
    h2('2. Yêu cầu'),
    p(
      'Thực hiện đúng quy trình nghiệp vụ theo Công văn số 1134/SGDĐT-TCCB và Công văn số 3953/SGDĐT-TCCB của Sở GDĐT Đồng Tháp; bảo đảm chính xác, khách quan, công khai, dân chủ và không làm ảnh hưởng đến hoạt động dạy học bình thường của đơn vị.'
    ),
    h1('II. NỘI DUNG KIỂM TRA'),
    p(`1. Nội dung kiểm tra: ${item.title}, cụ thể gồm:`),
    ...item.specificTasks.map((t) => p(`- ${t}`)),
    p(`2. Đối tượng kiểm tra: ${item.target} (tại ${item.campus}).`),
    p(`3. Thời kỳ kiểm tra: Từ đầu năm học 2026 - 2027 đến thời điểm tiến hành kiểm tra (${item.month}).`),
    p(`4. Thời hạn kiểm tra: ${dates.durationDays} ngày làm việc, từ ngày ${dates.startStr} đến ngày ${dates.endStr}.`),
    h1('III. TỔ CHỨC THỰC HIỆN'),
    p(
      `1. Tiến độ thực hiện: Thông báo lịch làm việc trước ngày ${dates.startStr}; tiến hành thu thập hồ sơ, kiểm tra thực tế từ ngày ${dates.startStr} đến ngày ${dates.endStr}; lập biên bản kiểm tra vào ngày ${dates.endStr} và hoàn thiện báo cáo kết quả vào ngày ${dates.reportShortDate}.`
    ),
    p(
      '2. Chế độ thông tin báo cáo: Các thành viên báo cáo tiến độ hằng ngày cho Tổ trưởng kiểm tra; Tổ trưởng kiểm tra tổng hợp Báo cáo kết quả kiểm tra (Mẫu số 05) trình Hiệu trưởng chậm nhất 01 - 02 ngày sau khi kết thúc kiểm tra.'
    ),
    p(
      `3. Thành viên tiến hành kiểm tra: Tổ trưởng: ${leader.display}; Các thành viên: ${item.teamMembers.join('; ')}.`
    ),
    p(
      '4. Điều kiện vật chất đảm bảo thực hiện cuộc kiểm tra: Sử dụng phòng làm việc tại điểm trường, văn phòng phẩm, biểu mẫu kiểm tra và phương tiện theo điều kiện thực tế của nhà trường.'
    ),
    p(
      `5. Những vấn đề khác (nếu có): Các căn cứ pháp lý đối chiếu chính gồm ${item.legalBasis}. Đối tượng kiểm tra chuẩn bị đầy đủ hồ sơ, sổ sách và phối hợp chặt chẽ cùng Tổ kiểm tra./.`
    ),
    new Paragraph({ spacing: { before: 60, after: 20 } }),
    createTeamSignAndRecipientsTable(
      ['Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều;', 'Đối tượng được kiểm tra;', 'Lưu: ĐKTr.'],
      'T/M TỔ (NGƯỜI) KIỂM TRA',
      '(Ký, ghi rõ họ và tên)',
      leader.signerName
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 180, after: 20 },
      children: [
        new TextRun({
          text: 'PHÊ DUYỆT CỦA NGƯỜI RA QUYẾT ĐỊNH KIỂM TRA',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 800 },
      children: [
        new TextRun({
          text: 'HIỆU TRƯỞNG (Ký, ghi rõ họ tên và đóng dấu)',
          italics: true,
          font: 'Times New Roman',
          size: FONT_SIZES.RECIPIENTS_ITEM,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
      children: [
        new TextRun({
          text: 'Lê Thanh Cường',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    })
  );

  // =========================================================================
  // MẪU SỐ 04: BIÊN BẢN KIỂM TRA (ĐÚNG TRANG 15 - 16 CV 1134)
  // Góc trái: TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU / Đoàn kiểm tra theo Quyết định số 49/QĐ-THCS&THPTĐBK
  // =========================================================================
  children.push(pageBreak());
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 04 (CV 1134/SGDĐT-TCCB)`,
          italics: true,
          color: '444444',
          font: 'Times New Roman',
          size: FONT_SIZES.TABLE_COMPACT,
        }),
      ],
    }),
    createInspectionTeamHeaderTable(SCHOOL_NAME, COMMITTEE_DECISION_NO, dates.minuteDateText),
    ...createDocumentTitleBlock('BIÊN BẢN KIỂM TRA', `Về việc ${item.title} (Đợt ${roundCode})`),
    p(
      `Căn cứ Quyết định số ${COMMITTEE_DECISION_NO} ngày ${COMMITTEE_DECISION_DATE} của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027 và Kế hoạch số 48/KH-THCS&THPTĐBK; từ ngày ${dates.startStr} đến ngày ${dates.endStr}, Tổ kiểm tra đã thu thập thông tin, tài liệu, minh chứng và kiểm tra trực tiếp tại ${item.campus} về việc ${item.title}.`
    ),
    p('Sau đây là kết quả kiểm tra:'),
    h1('I. Thành phần làm việc'),
    p('**1. Tổ (người) kiểm tra:**'),
    p(`- ${leader.display} — Chức danh: Tổ trưởng kiểm tra;`),
    ...item.teamMembers.map((mem, idx) =>
      p(`- ${mem} — Chức danh: Thành viên Tổ kiểm tra${idx === item.teamMembers.length - 1 ? ';' : ';'}`)
    ),
    p('- Bà Nguyễn Thị Kim Ngọc (hoặc thành viên được phân công) — Chức danh: Thư ký ghi biên bản.'),
    p(`**2. Đã tiến hành kiểm tra đối với:** ${item.target}, gồm:`),
    p('- Ông/bà .................................................................... Chức danh: Đại diện bộ phận/cá nhân được kiểm tra;'),
    p('- Ông/bà .................................................................... Chức danh: Thành viên phối hợp làm việc.'),
    p('**3. Người chứng kiến (nếu có):** Không.'),
    h1('II. Nội dung kiểm tra'),
    ...item.specificTasks.map((t, idx) => p(`${idx + 1}. Nội dung ${idx + 1}: ${t}`)),
    p('Hồ sơ, tài liệu minh chứng đã thu thập và kiểm tra trực tiếp:'),
    ...findings.inspectedRecords.map((rec) => p(`- ${rec}`)),
    h1('III. Đánh giá chung của tổ (người) kiểm tra:'),
    p('**1. Ưu điểm:**'),
    ...findings.strengths.map((s) => p(`- ${s}`)),
    p('**2. Tồn tại:**'),
    ...findings.gentleLimitations.map((l) => p(`- ${l}`)),
    p(`**3. Nguyên nhân:** ${findings.causes}`),
    h1('IV. Kiến nghị của tổ (người) kiểm tra:'),
    p('*(Đối với cá nhân, tổ chuyên môn, nhà trường, cấp trên)*', false, true),
    ...findings.recommendations.map((rec) => p(`- ${rec}`)),
    h1('V. Ý kiến của bộ phận (người) được kiểm tra:'),
    p(
      'Đại diện bộ phận/cá nhân được kiểm tra thống nhất hoàn toàn với nội dung ghi nhận khách quan, mang tính xây dựng của Tổ kiểm tra; tiếp thu các ý kiến góp ý và cam kết sớm hoàn thiện các chi tiết còn thiếu sót nhỏ theo đúng thời hạn.'
    ),
    p(
      `Việc kiểm tra kết thúc vào lúc 16 giờ 30 phút ngày ${dates.endDay} tháng ${dates.month} năm ${dates.year} và được lập thành biên bản. Biên bản gồm 02 trang.`
    ),
    p(
      'Biên bản này đã được đọc lại cho những người có tên nêu trên cùng nghe và đồng ý ký xác nhận; biên bản được lập thành 02 bản có giá trị như nhau, mỗi bên giữ 01 bản./.'
    ),
    new Paragraph({ spacing: { before: 60, after: 20 } }),
    createThreeColumnMinutesSignTable(leader.signerName)
  );

  // =========================================================================
  // MẪU SỐ 05: BÁO CÁO KẾT QUẢ KIỂM TRA (ĐÚNG TRANG 17 - 18 CV 1134)
  // Góc trái: TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU / Đoàn kiểm tra theo Quyết định số 49/QĐ-THCS&THPTĐBK
  // =========================================================================
  children.push(pageBreak());
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 05 (CV 1134/SGDĐT-TCCB)`,
          italics: true,
          color: '444444',
          font: 'Times New Roman',
          size: FONT_SIZES.TABLE_COMPACT,
        }),
      ],
    }),
    createInspectionTeamHeaderTable(SCHOOL_NAME, COMMITTEE_DECISION_NO, dates.reportDateText),
    ...createDocumentTitleBlock('BÁO CÁO', `Kết quả kiểm tra ${item.title} (Đợt ${roundCode})`),
    p(
      `Thực hiện Quyết định số ${COMMITTEE_DECISION_NO} ngày ${COMMITTEE_DECISION_DATE} của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027 và Kế hoạch số 48/KH-THCS&THPTĐBK, Tổ kiểm tra đã tiến hành kiểm tra tại ${item.campus} đối với ${item.target}.`
    ),
    p(
      `Quá trình kiểm tra, Tổ kiểm tra đã làm việc với đại diện ${item.target} từ ngày ${dates.startStr} đến ngày ${dates.endStr} và tiến hành kiểm tra, xác minh trực tiếp các nội dung kiểm tra.`
    ),
    p('Sau đây là kết quả kiểm tra:'),
    h2('1. Khái quát chung'),
    p(findings.overview),
    h2('2. Kết quả kiểm tra, xác minh'),
    p('Các nội dung đã tiến hành kiểm tra và xác minh hồ sơ minh chứng gồm:'),
    ...item.specificTasks.map((t) => p(`- ${t}`)),
    p('Qua đối chiếu thực tế, Tổ kiểm tra ghi nhận:'),
    ...findings.strengths.map((s) => p(`+ ${s}`)),
    p('Một số điểm cần lưu ý, hoàn thiện nhẹ:'),
    ...findings.gentleLimitations.map((l) => p(`+ ${l}`)),
    h2('3. Kết luận về những nội dung đã tiến hành kiểm tra'),
    p(
      `Tập thể, cá nhân được kiểm tra thực hiện nghiêm túc quy định của ngành và Kế hoạch năm học 2026 - 2027 của nhà trường; cơ bản hoàn thành tốt các tiêu chí của đợt kiểm tra (Xếp loại: **Đạt yêu cầu - Tốt**). Không phát hiện sai phạm nghiêm trọng về quy chế chuyên môn, tài chính hay hành vi tham nhũng; một số chi tiết hồ sơ còn thiếu sót nhỏ mang tính kỹ thuật đã được trao đổi trực tiếp để hoàn thiện.`
    ),
    h2('4. Các biện pháp xử lý theo thẩm quyền đã áp dụng (nếu có)'),
    p('Không phát sinh biện pháp xử lý hành chính hay niêm phong, tạm đình chỉ trong quá trình kiểm tra.'),
    h2('5. Những ý kiến còn khác nhau giữa các thành viên Tổ kiểm tra (nếu có)'),
    p('Không có. Các thành viên Tổ kiểm tra thống nhất hoàn toàn với kết quả đánh giá và nội dung báo cáo.'),
    h2('6. Kiến nghị và biện pháp xử lý'),
    ...findings.recommendations.map((rec) => p(`- ${rec}`)),
    p(
      `Trên đây là Báo cáo kết quả kiểm tra về ${item.title} (Đợt ${roundCode}), Tổ kiểm tra xin ý kiến chỉ đạo của Hiệu trưởng./.`
    ),
    new Paragraph({ spacing: { before: 60, after: 20 } }),
    createTeamSignAndRecipientsTable(
      ['Hiệu trưởng (để báo cáo);', 'Ban Kiểm tra nội bộ;', 'Lưu: VT, ĐKTr.'],
      'T/M TỔ (NGƯỜI) KIỂM TRA BÁO CÁO',
      '(Ký và ghi rõ họ và tên)',
      leader.signerName
    )
  );

  // =========================================================================
  // MẪU SỐ 06: THÔNG BÁO KẾT QUẢ KIỂM TRA (ĐÚNG TRANG 19 - 20 CV 1134)
  // Văn bản của Hiệu trưởng ký đóng dấu -> Góc trái: SỞ GDĐT / TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU / Số: .../TB-THCS&THPTĐBK
  // =========================================================================
  children.push(pageBreak());
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 06 (CV 1134/SGDĐT-TCCB)`,
          italics: true,
          color: '444444',
          font: 'Times New Roman',
          size: FONT_SIZES.TABLE_COMPACT,
        }),
      ],
    }),
    createAdminDocHeaderTable(
      SUPERIOR_AGENCY,
      SCHOOL_NAME,
      `Số: ${roundCode}/TB-THCS&THPTĐBK`,
      dates.noticeDateText
    ),
    ...createDocumentTitleBlock('THÔNG BÁO', `Kết quả kiểm tra ${item.title} (Đợt ${roundCode})`),
    p(
      `Thực hiện Quyết định số ${COMMITTEE_DECISION_NO} ngày ${COMMITTEE_DECISION_DATE} của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027 và Kế hoạch số 48/KH-THCS&THPTĐBK về ${item.title}, từ ngày ${dates.startStr} đến ngày ${dates.endStr}, Tổ kiểm tra đã tiến hành kiểm tra tại ${item.campus} đối với ${item.target}.`
    ),
    p(
      `Xét Báo cáo kết quả kiểm tra ngày ${dates.reportShortDate} của Tổ kiểm tra và ý kiến tiếp thu của đối tượng được kiểm tra,`
    ),
    p('Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều thông báo kết quả kiểm tra như sau:'),
    h2('1. Khái quát chung'),
    p(findings.overview),
    h2('2. Kết quả kiểm tra, xác minh'),
    p('a) Về ưu điểm (mặt làm được, làm đúng):'),
    ...findings.strengths.slice(0, 2).map((s) => p(`- ${s}`)),
    p('b) Về tồn tại, điểm cần tiếp tục hoàn thiện:'),
    ...findings.gentleLimitations.map((l) => p(`- ${l}`)),
    h2('3. Kết luận'),
    p(
      `Hiệu trưởng ghi nhận, biểu dương tinh thần trách nhiệm và sự chuẩn bị nghiêm túc của ${item.target} trong đợt kiểm tra Đợt ${roundCode} (Đánh giá chung: **Đạt yêu cầu - Tốt**). Các tồn tại ghi nhận chủ yếu là chi tiết kỹ thuật hồ sơ nhỏ, không gây hậu quả hay vi phạm quy chế; đề nghị các bộ phận, cá nhân nghiêm túc rút kinh nghiệm và hoàn thiện kịp thời.`
    ),
    h2('4. Các biện pháp xử lý theo thẩm quyền đã áp dụng (nếu có)'),
    p('Không có (không phát sinh hành vi vi phạm cần xử lý kỷ luật hoặc áp dụng biện pháp ngăn chặn).'),
    h2('5. Kiến nghị và biện pháp xử lý'),
    ...findings.recommendations.map((rec) => p(`- ${rec}`)),
    p(
      'Giao Ban Kiểm tra nội bộ theo dõi việc hoàn thiện các nội dung trên và tổng hợp vào báo cáo định kỳ của nhà trường. Các bộ phận, tổ chuyên môn và cá nhân có liên quan nghiêm túc triển khai thực hiện./.'
    ),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Phòng Tổ chức cán bộ Sở GDĐT (để báo cáo);',
      'Bộ phận, tổ chức, cá nhân là đối tượng kiểm tra (để thực hiện);',
      'Tổ chức, cá nhân có liên quan (để thực hiện);',
      'Lưu: VT, ĐKTr.',
    ])
  );

  return children;
}

/** Tạo Báo cáo Sơ kết HK1 hoặc Tổng kết năm học gửi Sở GDĐT (theo CV 3953) */
function buildPeriodicReportToDepartment(isFinalYear: boolean, rounds: MonthlyDetailedInspection[]): DocChild[] {
  const children: DocChild[] = [pageBreak()];
  const titleSub = isFinalYear
    ? 'Tổng kết công tác kiểm tra nội bộ năm học 2026 - 2027'
    : 'Sơ kết công tác kiểm tra nội bộ Học kỳ I năm học 2026 - 2027';
  const docNum = isFinalYear ? 'Số: 95/BC-THCS&THPTĐBK' : 'Số: 15/BC-THCS&THPTĐBK';
  const signDate = isFinalYear
    ? 'Đốc Binh Kiều, ngày 15 tháng 5 năm 2027'
    : 'Đốc Binh Kiều, ngày 18 tháng 01 năm 2027';

  const cols = [650, 1750, 4255, 2700]; // 9355 dxa

  children.push(
    createAdminDocHeaderTable(SUPERIOR_AGENCY, SCHOOL_NAME, docNum, signDate),
    ...createDocumentTitleBlock('BÁO CÁO', titleSub),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 120 },
      children: [
        new TextRun({
          text: 'Kính gửi: Sở Giáo dục và Đào tạo tỉnh Đồng Tháp (qua Phòng Tổ chức cán bộ).',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    p(
      `Thực hiện Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 và Công văn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027, Trường THCS và THPT Đốc Binh Kiều báo cáo kết quả công tác kiểm tra nội bộ ${isFinalYear ? 'cả năm học 2026 - 2027' : 'Học kỳ I năm học 2026 - 2027'} như sau:`
    ),
    h1('I. ĐẶC ĐIỂM TÌNH HÌNH ĐƠN VỊ'),
    p(
      'Trường THCS và THPT Đốc Binh Kiều được thành lập theo Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của UBND tỉnh Đồng Tháp, tổ chức giảng dạy tại 03 điểm trường trên địa bàn xã Đốc Binh Kiều: Điểm chính (Khối THPT, Ấp 3, 14 lớp, 529 học sinh), Điểm trường THCS Đốc Binh Kiều (Ấp 1, 24 lớp, 980 học sinh) và Điểm trường THCS Tân Kiều (Ấp Tân Kiều, 15 lớp, 602 học sinh). Tổng quy mô 53 lớp với 2.111 học sinh và 120 cán bộ, giáo viên, nhân viên.'
    ),
    h1('II. CÔNG TÁC CHỈ ĐẠO VÀ KẾT QUẢ THỰC HIỆN CÁC ĐỢT KIỂM TRA'),
    p(
      `Ngay từ đầu năm học, Hiệu trưởng đã ban hành Quyết định số 48/QĐ-THCS&THPTĐBK ngày 15/10/2026 ban hành Kế hoạch kiểm tra nội bộ số 48/KH-THCS&THPTĐBK và Quyết định số 49/QĐ-THCS&THPTĐBK thành lập Ban Kiểm tra nội bộ gồm 22 thành viên. Tính đến thời điểm báo cáo, nhà trường đã tổ chức hoàn thành ${rounds.length} đợt kiểm tra theo đúng kế hoạch:`
    ),
    new Table({
      layout: TableLayoutType.FIXED,
      columnWidths: cols,
      width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['STT', 'Thời gian', 'Nội dung đợt kiểm tra', 'Kết quả đánh giá'].map((hText, i) =>
            new TableCell({
              width: { size: cols[i], type: WidthType.DXA },
              borders: TABLE_CELL_BORDER_GRID,
              margins: TABLE_CELL_MARGINS_DATA,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: hText, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
                }),
              ],
            })
          ),
        }),
        ...rounds.map((r, idx) =>
          new TableRow({
            children: [
              String(idx + 1),
              r.timeframe,
              r.title,
              'Hoàn thành đúng tiến độ; Đạt yêu cầu (Tốt); đã ban hành TB kết quả (Mẫu 06).',
            ].map((val, i) =>
              new TableCell({
                width: { size: cols[i], type: WidthType.DXA },
                borders: TABLE_CELL_BORDER_GRID,
                margins: TABLE_CELL_MARGINS_DATA,
                children: [
                  new Paragraph({
                    alignment: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
                    children: [new TextRun({ text: val, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
                  }),
                ],
              })
            ),
          })
        ),
      ],
    }),
    h1('III. ĐÁNH GIÁ CHUNG'),
    h2('1. Ưu điểm nổi bật'),
    p(
      '- Công tác kiểm tra nội bộ được triển khai đồng bộ tại cả 03 điểm trường, bám sát Công văn 1134 và Công văn 3953 của Sở GDĐT; hồ sơ lưu trữ đầy đủ từ Mẫu 01 đến Mẫu 06 theo Nghị định 30/2020/NĐ-CP và Thông tư 08/2025/TT-BGDĐT.'
    ),
    p(
      '- Kỷ cương nền nếp chuyên môn, hoạt động sư phạm nhà giáo, công tác tài chính - cơ sở vật chất, chuyển đổi số và giáo dục hòa nhập đều chuyển biến tích cực; không xảy ra khiếu nại, tố cáo hay vi phạm quy chế nghiêm trọng.'
    ),
    h2('2. Khó khăn, hạn chế nhỏ cần tiếp tục khắc phục'),
    p(
      '- Do năm học đầu tiên vận hành mô hình trường liên cấp trên 03 điểm trường và thành viên Ban KTNB chủ yếu kiêm nhiệm nên việc sắp xếp lịch kiểm tra trực tiếp đôi lúc cần điều chỉnh linh hoạt theo thời khóa biểu.'
    ),
    p(
      '- Một số hồ sơ điện tử ở vài bộ phận cần tiếp tục chuẩn hóa đồng bộ định dạng lưu trữ để thuận lợi hơn cho công tác tra cứu, đối soát.'
    ),
    h1(isFinalYear ? 'IV. PHƯƠNG HƯỚNG NĂM HỌC 2027 - 2028 VÀ KIẾN NGHỊ' : 'IV. NHIỆM VỤ TRỌNG TÂM HỌC KỲ II'),
    p(
      isFinalYear
        ? '- Tiếp tục phát huy hiệu quả hoạt động Ban Kiểm tra nội bộ, đẩy mạnh ứng dụng chuyển đổi số trong kiểm tra hồ sơ chuyên môn; chú trọng kiểm tra chất lượng dạy học, ôn thi tuyển sinh lớp 10 và tốt nghiệp THPT.\n- Kiến nghị Sở GDĐT tiếp tục tổ chức tập huấn chuyên sâu nghiệp vụ kiểm tra nội bộ cho cán bộ quản lý và tổ trưởng chuyên môn các trường liên cấp sau sáp nhập./.'
        : '- Triển khai hoàn thành đầy đủ các đợt kiểm tra Học kỳ II theo kế hoạch, trọng tâm là kiểm tra hoạt động sư phạm Đợt 2, giáo dục hòa nhập, ôn thi lớp 9, lớp 12, an toàn trường học và xét tốt nghiệp.\n- Theo dõi sát việc khắc phục các hạn chế nhỏ đã chỉ ra trong Học kỳ I và hoàn thiện báo cáo tổng kết năm học gửi Sở GDĐT trước ngày 18/5/2027./.'
    ),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Sở GDĐT tỉnh Đồng Tháp (Phòng TCCB, để báo cáo);',
      'Ban Giám hiệu, Ban KTNB;',
      'Lưu: VT, Hồ sơ KTNB.',
    ])
  );

  return children;
}

/**
 * Xây dựng TRỌN BỘ 06 BIỂU MẪU KHUNG CHUẨN ĐÚNG 100% PHỤ LỤC CÔNG VĂN 1134/SGDĐT-TCCB (TRANG 11 -> 20)
 */
function buildSixStandardTemplatesDoc(): DocChild[] {
  const children: DocChild[] = [];

  // ----- MẪU SỐ 01 (Phần A: Quyết định Ban hành Kế hoạch KTNB - Trang 11 CV 1134) -----
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'MẪU SỐ 01 (Phần A: Quyết định Ban hành Kế hoạch KTNB)', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
    }),
    createAdminDocHeaderTable(
      SUPERIOR_AGENCY,
      SCHOOL_NAME,
      'Số: …… /QĐ-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày … tháng … năm 202…'
    ),
    ...createDocumentTitleBlock('QUYẾT ĐỊNH', 'Ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027'),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 40, after: 120 },
      children: [new TextRun({ text: 'HIỆU TRƯỞNG TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    createLegalBasisParagraph('Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường THCS, trường THPT và trường phổ thông có nhiều cấp học'),
    createLegalBasisParagraph('Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05 tháng 8 năm 2025 của Chính phủ về hoạt động kiểm tra chuyên ngành'),
    createLegalBasisParagraph('Căn cứ Công văn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 và Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027'),
    createLegalBasisParagraph('Xét đề nghị của Phó Hiệu trưởng phụ trách chuyên môn và Tổ trưởng Tổ Văn phòng', true, true),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 140, after: 100 },
      children: [new TextRun({ text: 'QUYẾT ĐỊNH:', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    p('**Điều 1.** Ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều *(đính kèm Kế hoạch)*.'),
    p('**Điều 2.** Các Phó Hiệu trưởng, Ban Kiểm tra nội bộ, các Tổ chuyên môn, Tổ Văn phòng, các ông (bà) thuộc Trường THCS và THPT Đốc Binh Kiều và các cá nhân, tổ chức có liên quan chịu trách nhiệm thi hành Quyết định này./.'),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Như Điều 2;',
      'Sở Giáo dục và Đào tạo (để báo cáo);',
      'Phòng TCCB Sở GDĐT (để báo cáo);',
      'Lưu: VT.',
    ])
  );

  // ----- MẪU SỐ 01 (Phần B: Khung Kế hoạch kiểm tra nội bộ năm học - Trang 12 CV 1134) -----
  const tplCols = [480, 2325, 1650, 1250, 1050, 1450, 1150]; // 9355 dxa
  children.push(
    pageBreak(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'MẪU SỐ 01 (Phần B: Khung Kế hoạch Kiểm tra nội bộ năm học)', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
    }),
    createAdminDocHeaderTable(
      SUPERIOR_AGENCY,
      SCHOOL_NAME,
      'Số: …… /KH-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày … tháng … năm 202…'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 180, after: 30 },
      children: [new TextRun({ text: 'KẾ HOẠCH', bold: true, font: 'Times New Roman', size: FONT_SIZES.TITLE_TYPE })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 30 },
      children: [new TextRun({ text: 'Kiểm tra nội bộ năm học 2026 - 2027', bold: true, font: 'Times New Roman', size: FONT_SIZES.TITLE_SUBJECT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 100 },
      children: [
        new TextRun({
          text: '(Ban hành kèm theo Quyết định số ……/QĐ-THCS&THPTĐBK ngày … tháng … năm 202… của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều)',
          italics: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY_SMALL,
        }),
      ],
    }),
    h1('I. MỤC ĐÍCH, YÊU CẦU'),
    h2('1. Mục đích'),
    p('.......................................................................................................................................'),
    h2('2. Yêu cầu'),
    p('.......................................................................................................................................'),
    h1('II. NỘI DUNG KIỂM TRA'),
    p('(Nêu khái quát nội dung kế hoạch kiểm tra: Tổng số cuộc kiểm tra sẽ thực hiện, đối tượng kiểm tra, thời kỳ kiểm tra, thời hạn kiểm tra, nội dung kiểm tra tập trung trong lĩnh vực quản lý; kiểm tra việc thực hiện nhiệm vụ của các bộ phận, tổ chuyên môn, cá nhân; kiểm tra chuyên đề,... Nội dung chi tiết có Danh mục và Phụ lục kèm theo.)', false, true),
    h1('III. TỔ CHỨC THỰC HIỆN'),
    h2('1. Các biện pháp thực hiện'),
    p('.......................................................................................................................................'),
    h2('2. Trách nhiệm thực hiện'),
    p('.......................................................................................................................................'),
    h1('IV. DANH MỤC CÁC CUỘC KIỂM TRA'),
    new Table({
      layout: TableLayoutType.FIXED,
      columnWidths: tplCols,
      width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['TT', 'Nội dung kiểm tra', 'Đối tượng kiểm tra', 'Thời gian tiến hành', 'Hình thức kiểm tra', 'Người phụ trách', 'Ghi chú'].map(
            (hText, i) =>
              new TableCell({
                width: { size: tplCols[i], type: WidthType.DXA },
                borders: TABLE_CELL_BORDER_GRID,
                margins: TABLE_CELL_MARGINS_DATA,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: hText, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
                  }),
                ],
              })
          ),
        }),
        ...[1, 2, 3].map(
          (n) =>
            new TableRow({
              children: [String(n), '', '', '', '', '', ''].map((v, i) =>
                new TableCell({
                  width: { size: tplCols[i], type: WidthType.DXA },
                  borders: TABLE_CELL_BORDER_GRID,
                  margins: TABLE_CELL_MARGINS_DATA,
                  children: [
                    new Paragraph({
                      alignment: i === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
                      children: [new TextRun({ text: v, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
                    }),
                  ],
                })
              ),
            })
        ),
      ],
    })
  );

  // ----- MẪU SỐ 02: Quyết định Về việc thành lập Ban kiểm tra nội bộ (Trang 13 CV 1134) -----
  children.push(
    pageBreak(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'MẪU SỐ 02 (Quyết định Thành lập Ban Kiểm tra nội bộ)', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
    }),
    createAdminDocHeaderTable(
      SUPERIOR_AGENCY,
      SCHOOL_NAME,
      'Số: …… /QĐ-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày … tháng … năm 202…'
    ),
    ...createDocumentTitleBlock('QUYẾT ĐỊNH', 'Về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027'),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 40, after: 120 },
      children: [new TextRun({ text: 'HIỆU TRƯỞNG TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    createLegalBasisParagraph('Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường THCS, trường THPT và trường phổ thông có nhiều cấp học'),
    createLegalBasisParagraph('Căn cứ Công văn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 và Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027'),
    createLegalBasisParagraph('Xét đề nghị của Phó Hiệu trưởng phụ trách chuyên môn và Tổ trưởng Tổ Văn phòng', true, true),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 140, after: 100 },
      children: [new TextRun({ text: 'QUYẾT ĐỊNH:', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    p('**Điều 1.** Thành lập Ban kiểm tra nội bộ năm học 2026 - 2027, gồm các ông (bà) có tên sau đây:'),
    p('1. .................................................... Chức vụ: ............................, Trưởng ban;'),
    p('2. .................................................... Chức vụ: ............................, Phó Trưởng ban;'),
    p('3. .................................................... Chức vụ: ............................, Thành viên.'),
    p('**Điều 2.** Ban kiểm tra nội bộ có nhiệm vụ ......................................................................'),
    p('**Điều 3.** Quyết định này có hiệu lực kể từ ngày ký.'),
    p('**Điều 4.** Các ông (bà) có tên tại Điều 1 và các bộ phận, tổ chức, cá nhân là đối tượng kiểm tra chịu trách nhiệm thi hành Quyết định này./.'),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Như Điều 4;',
      'Sở Giáo dục và Đào tạo (để báo cáo);',
      'Phòng TCCB Sở GDĐT (để báo cáo);',
      'Lưu: VT.',
    ])
  );

  // ----- MẪU SỐ 03, 04, 05, 06 KHUNG CHUẨN TRỐNG ĐÚNG TRANG 14 -> 20 CV 1134 -----
  // Mẫu 03
  children.push(
    pageBreak(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'MẪU SỐ 03 (Kế hoạch tiến hành kiểm tra)', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
    }),
    createInspectionTeamHeaderTable(SCHOOL_NAME, '………/QĐ-THCS&THPTĐBK', 'Đốc Binh Kiều, ngày … tháng … năm 202…'),
    ...createDocumentTitleBlock('KẾ HOẠCH TIẾN HÀNH KIỂM TRA'),
    p('Thực hiện Quyết định kiểm tra số …… ngày …/…/202… của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về việc .................................................., Tổ kiểm tra lập kế hoạch tiến hành kiểm tra như sau:'),
    h1('I. MỤC ĐÍCH, YÊU CẦU'),
    h2('1. Mục đích'),
    p('.......................................................................................................................................'),
    h2('2. Yêu cầu'),
    p('.......................................................................................................................................'),
    h1('II. NỘI DUNG KIỂM TRA'),
    p('1. Nội dung kiểm tra: .......................................................................................................'),
    p('2. Đối tượng kiểm tra: ......................................................................................................'),
    p('3. Thời kỳ kiểm tra: .........................................................................................................'),
    p('4. Thời hạn kiểm tra: ........................................................................................................'),
    h1('III. TỔ CHỨC THỰC HIỆN'),
    p('1. Tiến độ thực hiện: .......................................................................................................'),
    p('2. Chế độ thông tin báo cáo: .............................................................................................'),
    p('3. Thành viên tiến hành kiểm tra: .....................................................................................'),
    p('4. Điều kiện vật chất đảm bảo thực hiện cuộc kiểm tra: ...................................................'),
    p('5. Những vấn đề khác (nếu có): ........................................................................................'),
    new Paragraph({ spacing: { before: 60, after: 20 } }),
    createTeamSignAndRecipientsTable(
      ['Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều;', 'Đối tượng kiểm tra;', 'Lưu: ĐKTr.'],
      'T/M TỔ (NGƯỜI) KIỂM TRA',
      '(Ký, ghi rõ họ và tên)',
      '........................................'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 180, after: 20 },
      children: [new TextRun({ text: 'PHÊ DUYỆT CỦA NGƯỜI RA QUYẾT ĐỊNH KIỂM TRA', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    })
  );

  // Mẫu 04
  children.push(
    pageBreak(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'MẪU SỐ 04 (Biên bản kiểm tra)', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
    }),
    createInspectionTeamHeaderTable(SCHOOL_NAME, '………/QĐ-THCS&THPTĐBK', 'Đốc Binh Kiều, ngày … tháng … năm 202…'),
    ...createDocumentTitleBlock('BIÊN BẢN KIỂM TRA', 'Về việc .......................................................................'),
    p('Căn cứ Quyết định số ………/QĐ-THCS&THPTĐBK ngày …/…/202… của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về việc ..................................; từ ngày … đến ngày …, Tổ kiểm tra đã thu thập thông tin, tài liệu, minh chứng và kiểm tra trực tiếp tại .................................. về việc ..................................'),
    p('Sau đây là kết quả kiểm tra:'),
    h1('I. Thành phần làm việc'),
    p('**1. Tổ (người) kiểm tra:**'),
    p('- Ông/bà .................................................... Chức danh: ...........................................;'),
    p('- Ông/bà .................................................... Chức danh: ...........................................;'),
    p('**2. Đã tiến hành kiểm tra đối với:** ...................................................., gồm:'),
    p('- Ông/bà .................................................... Chức danh: ...........................................;'),
    p('**3. Người chứng kiến (nếu có):** .................................................................................'),
    h1('II. Nội dung kiểm tra'),
    p('1. Nội dung 1: ..................................................................................................................'),
    p('2. Nội dung 2: ..................................................................................................................'),
    h1('III. Đánh giá chung của tổ (người) kiểm tra:'),
    p('1. Ưu điểm: ......................................................................................................................'),
    p('2. Tồn tại: ........................................................................................................................'),
    p('3. Nguyên nhân: ...............................................................................................................'),
    h1('IV. Kiến nghị của tổ (người) kiểm tra:'),
    p('*(Đối với cá nhân, tổ chuyên môn, nhà trường, cấp trên)*', false, true),
    p('.......................................................................................................................................'),
    h1('V. Ý kiến của bộ phận (người) được kiểm tra:'),
    p('.......................................................................................................................................'),
    p('Việc kiểm tra kết thúc vào lúc … giờ … ngày … tháng … năm … và được lập thành biên bản. Biên bản gồm … trang.'),
    p('Biên bản này đã được đọc lại cho những người có tên nêu trên cùng nghe và đồng ý ký xác nhận; biên bản được lập thành 02 bản có giá trị như nhau, mỗi bên giữ 01 bản./.'),
    new Paragraph({ spacing: { before: 60, after: 20 } }),
    createThreeColumnMinutesSignTable('..............................', '..............................')
  );

  // Mẫu 05
  children.push(
    pageBreak(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'MẪU SỐ 05 (Báo cáo Kết quả kiểm tra)', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
    }),
    createInspectionTeamHeaderTable(SCHOOL_NAME, '………/QĐ-THCS&THPTĐBK', 'Đốc Binh Kiều, ngày … tháng … năm 202…'),
    ...createDocumentTitleBlock('BÁO CÁO', 'Kết quả kiểm tra ............................................................'),
    p('Thực hiện Quyết định kiểm tra số …… ngày …/…/202… của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về ........................................, Tổ kiểm tra đã tiến hành kiểm tra tại ........................................'),
    p('Quá trình kiểm tra, Tổ kiểm tra đã làm việc với ........................................ từ ngày … đến ngày … và tiến hành kiểm tra, xác minh trực tiếp các nội dung kiểm tra.'),
    p('Sau đây là kết quả kiểm tra:'),
    h2('1. Khái quát chung'),
    p('.......................................................................................................................................'),
    h2('2. Kết quả kiểm tra, xác minh'),
    p('.......................................................................................................................................'),
    h2('3. Kết luận về những nội dung đã tiến hành kiểm tra'),
    p('.......................................................................................................................................'),
    h2('4. Các biện pháp xử lý theo thẩm quyền đã áp dụng (nếu có)'),
    p('.......................................................................................................................................'),
    h2('5. Những ý kiến còn khác nhau giữa các thành viên Tổ kiểm tra (nếu có)'),
    p('.......................................................................................................................................'),
    h2('6. Kiến nghị và biện pháp xử lý'),
    p('.......................................................................................................................................'),
    p('Trên đây là Báo cáo kết quả kiểm tra về ........................................, Tổ kiểm tra xin ý kiến chỉ đạo của Hiệu trưởng./.'),
    new Paragraph({ spacing: { before: 60, after: 20 } }),
    createTeamSignAndRecipientsTable(
      ['Hiệu trưởng (để báo cáo);', 'Lưu: VT, ĐKTr.'],
      'T/M TỔ (NGƯỜI) KIỂM TRA BÁO CÁO',
      '(Ký và ghi rõ họ và tên)',
      '........................................'
    )
  );

  // Mẫu 06
  children.push(
    pageBreak(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'MẪU SỐ 06 (Thông báo Kết quả kiểm tra)', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY_SMALL })],
    }),
    createAdminDocHeaderTable(
      SUPERIOR_AGENCY,
      SCHOOL_NAME,
      'Số: ………/TB-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày … tháng … năm 202…'
    ),
    ...createDocumentTitleBlock('THÔNG BÁO', 'Kết quả kiểm tra ............................................................'),
    p('Thực hiện Quyết định kiểm tra số … ngày …/…/202… của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về ........................................ từ ngày …/…/202… đến ngày …/…/202…, Tổ kiểm tra đã tiến hành kiểm tra tại ........................................'),
    p('Xét báo cáo kết quả kiểm tra ngày …/…/202… của Tổ kiểm tra, ý kiến giải trình của bộ phận, tổ chức, cá nhân là đối tượng kiểm tra (nếu có),'),
    p('Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều Thông báo kết quả kiểm tra như sau:'),
    h2('1. Khái quát chung'),
    p('.......................................................................................................................................'),
    h2('2. Kết quả kiểm tra, xác minh'),
    p('.......................................................................................................................................'),
    h2('3. Kết luận'),
    p('.......................................................................................................................................'),
    h2('4. Các biện pháp xử lý theo thẩm quyền đã áp dụng (nếu có)'),
    p('.......................................................................................................................................'),
    h2('5. Kiến nghị và biện pháp xử lý'),
    p('.......................................................................................................................................'),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Phòng Tổ chức cán bộ Sở GDĐT (để báo cáo);',
      'Bộ phận, tổ chức, cá nhân là đối tượng kiểm tra (để thực hiện);',
      'Tổ chức, cá nhân có liên quan (để thực hiện);',
      'Lưu: VT.',
    ])
  );

  return children;
}

async function main() {
  const downloadsDir = path.resolve(process.cwd(), 'public/downloads');
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

  const hk1Rounds = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.slice(0, 13); // Đợt 01 - 13
  const hk2Rounds = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.slice(13);    // Đợt 14 - 29

  const makeDoc = (children: DocChild[]) =>
    new Document({
      styles: createDocumentStyles(),
      sections: [
        {
          properties: {
            page: {
              size: DOCX_PAGE_SETUP.size,
              margin: DOCX_PAGE_SETUP.margin,
            },
          },
          footers: { default: createPageNumberFooter() },
          children,
        },
      ],
    });

  // 1. Trọn bộ Hồ sơ KTNB Học kỳ I (Đợt 01 - 13 + Báo cáo Sơ kết HK1 gửi Sở)
  console.log(`Generating Full HK1 Dossier (${hk1Rounds.length} rounds x 4 forms per CV 1134 + HK1 Report)...`);
  const hk1Children: DocChild[] = [];
  hk1Rounds.forEach((item, idx) => {
    hk1Children.push(...buildFullFormsForRound(item, idx + 1, idx === 0));
  });
  hk1Children.push(...buildPeriodicReportToDepartment(false, hk1Rounds));

  const hk1Path = path.join(downloadsDir, 'TRON_BO_HO_SO_KTNB_HK1_2026_2027.docx');
  fs.writeFileSync(hk1Path, await Packer.toBuffer(makeDoc(hk1Children)));
  console.log('Saved HK1 Dossier DOCX:', hk1Path);

  // 2. Trọn bộ Hồ sơ KTNB Học kỳ II & Hè (Đợt 14 - 29 + Báo cáo Tổng kết năm học gửi Sở)
  console.log(`Generating Full HK2 & Summer Dossier (${hk2Rounds.length} rounds x 4 forms per CV 1134 + Annual Report)...`);
  const hk2Children: DocChild[] = [];
  hk2Rounds.forEach((item, idx) => {
    hk2Children.push(...buildFullFormsForRound(item, 14 + idx, idx === 0));
  });
  hk2Children.push(...buildPeriodicReportToDepartment(true, MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR));

  const hk2Path = path.join(downloadsDir, 'TRON_BO_HO_SO_KTNB_HK2_HE_2026_2027.docx');
  fs.writeFileSync(hk2Path, await Packer.toBuffer(makeDoc(hk2Children)));
  console.log('Saved HK2 Dossier DOCX:', hk2Path);

  // 3. Trọn bộ 06 Biểu mẫu khung chuẩn CV 1134 (Mẫu 01A, 01B, 02, 03, 04, 05, 06)
  console.log('Generating Complete 6 Standard Forms DOCX (Mẫu 01 -> Mẫu 06 strictly per CV 1134)...');
  const formsPath = path.join(downloadsDir, 'TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx');
  fs.writeFileSync(formsPath, await Packer.toBuffer(makeDoc(buildSixStandardTemplatesDoc())));
  console.log('Saved Complete 6 Forms DOCX:', formsPath);
}

main().catch((err) => {
  console.error('Error generating full inspection dossiers:', err);
  process.exit(1);
});

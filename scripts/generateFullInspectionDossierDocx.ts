/**
 * BỘ SINH TRỌN BỘ HỒ SƠ KIỂM TRA NỘI BỘ CẢ NĂM HỌC 2026 - 2027 (.DOCX)
 * Trường THCS và THPT Đốc Binh Kiều - Sở GDĐT tỉnh Đồng Tháp
 *
 * Chuẩn thể thức Nghị định 30/2020/NĐ-CP; bám sát Công văn 3953/SGDĐT-TCCB (08/10/2026)
 * và Hướng dẫn 1134/SGDĐT-TCCB (17/10/2025) của Sở GDĐT tỉnh Đồng Tháp.
 *
 * Xuất ra 03 file Word sẵn sàng in ấn & điều chỉnh nhẹ theo thực tế:
 *  1. TRON_BO_HO_SO_KTNB_HK1_2026_2027.docx (Đợt 01 - 13: đủ Mẫu 03, 04, 05, 06 + BC Sơ kết HK1)
 *  2. TRON_BO_HO_SO_KTNB_HK2_HE_2026_2027.docx (Đợt 14 - 29: đủ Mẫu 03, 04, 05, 06 + BC Tổng kết năm học)
 *  3. TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx (Trọn bộ 06 Biểu mẫu chuẩn Mẫu 01 -> Mẫu 06)
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

const p = (text: string, bold = false, italic = false): Paragraph =>
  createBodyParagraph(text, {
    bold,
    italic,
    indentFirstLine: true,
    spacingBefore: 40,
    spacingAfter: 50,
  });

const h1 = (text: string): Paragraph =>
  createArticleHeading(text, { spacingBefore: 180, spacingAfter: 70 });

const h2 = (text: string): Paragraph =>
  createArticleHeading(text, { spacingBefore: 130, spacingAfter: 50 });

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
function parseTimeframe(tf: string): {
  startStr: string;
  endStr: string;
  startDay: string;
  endDay: string;
  month: string;
  year: string;
  planDateText: string;
  minuteDateText: string;
  reportDateText: string;
  noticeDateText: string;
} {
  const parts = tf.split('-').map((s) => s.trim());
  const startStr = parts[0] || '05/10/2026';
  const endStr = parts[1] || startStr;
  const [sd = '05', sm = '10', sy = '2026'] = startStr.split('/');
  const [ed = '15', em = sm, ey = sy] = endStr.split('/');

  const planDayNum = Math.max(1, parseInt(sd, 10) - 2);
  const reportDayNum = Math.min(28, parseInt(ed, 10) + 1);
  const noticeDayNum = Math.min(28, parseInt(ed, 10) + 2);

  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    startStr,
    endStr,
    startDay: sd,
    endDay: ed,
    month: em,
    year: ey,
    planDateText: `Đốc Binh Kiều, ngày ${pad(planDayNum)} tháng ${sm} năm ${sy}`,
    minuteDateText: `Đốc Binh Kiều, ngày ${ed} tháng ${em} năm ${ey}`,
    reportDateText: `Đốc Binh Kiều, ngày ${pad(reportDayNum)} tháng ${em} năm ${ey}`,
    noticeDateText: `Đốc Binh Kiều, ngày ${pad(noticeDayNum)} tháng ${em} năm ${ey}`,
  };
}

/** Chuẩn hóa tên Trưởng đoàn sang danh xưng văn bản hành chính */
function formatFormalLeader(raw: string): { display: string; signerName: string; signerRole: string } {
  const clean = raw
    .replace(/Thầy\s+/g, 'Ông ')
    .replace(/Cô\s+/g, 'Bà ')
    .replace(/\(HT\)/g, '(Hiệu trưởng)')
    .replace(/\(PHT\)/g, '(Phó Hiệu trưởng)');

  if (raw.includes('Lê Thanh Cường')) {
    return { display: clean, signerName: 'Lê Thanh Cường', signerRole: 'TRƯỞNG ĐOÀN KIỂM TRA' };
  }
  if (raw.includes('Nguyễn Minh Trí')) {
    return { display: clean, signerName: 'Nguyễn Minh Trí', signerRole: 'TRƯỞNG ĐOÀN KIỂM TRA' };
  }
  if (raw.includes('Phan Thanh Thảo')) {
    return { display: clean, signerName: 'Phan Thanh Thảo', signerRole: 'TRƯỞNG ĐOÀN KIỂM TRA' };
  }
  if (raw.includes('Nguyễn Thanh Tòng')) {
    return { display: clean, signerName: 'Nguyễn Thanh Tòng', signerRole: 'TRƯỞNG ĐOÀN KIỂM TRA' };
  }
  return { display: clean, signerName: 'Nguyễn Minh Trí', signerRole: 'TRƯỞNG ĐOÀN KIỂM TRA' };
}

/** Tạo nội dung đánh giá thực tế (ưu điểm, hạn chế nhẹ nhàng, kiến nghị) sát từng nhóm chuyên đề */
function buildRealisticFindings(item: MonthlyDetailedInspection): {
  inspectedRecords: string[];
  strengths: string[];
  gentleLimitations: string[];
  recommendations: string[];
  targetRepresentative: string;
} {
  const cat = item.category;

  if (cat === 'Chuyên môn') {
    return {
      inspectedRecords: [
        'Kế hoạch giáo dục của tổ chuyên môn, phân phối chương trình, sổ sinh hoạt tổ chuyên môn theo nghiên cứu bài học.',
        'Kế hoạch bài dạy (giáo án điện tử) của giáo viên trên hệ thống quản lý chuyên môn và hồ sơ minh chứng thực hiện nhiệm vụ giảng dạy.',
        'Sổ theo dõi và đánh giá học sinh, tiến độ cập nhật điểm số trên phần mềm CSDL ngành và bài kiểm tra định kỳ/thường xuyên.',
        `Hồ sơ chuyên đề gắn với nội dung đợt kiểm tra: ${item.expectedOutput}`,
      ],
      strengths: [
        'Các tổ chuyên môn và giáo viên nghiêm túc chấp hành quy chế chuyên môn, chuẩn bị đầy đủ hồ sơ sổ sách theo đúng hướng dẫn của Sở GDĐT và Kế hoạch giáo dục nhà trường.',
        'Đội ngũ giáo viên tại cả 03 điểm trường có tinh thần trách nhiệm cao, tích cực đổi mới phương pháp dạy học theo định hướng phát triển phẩm chất, năng lực học sinh; ứng dụng hiệu quả công nghệ thông tin trong giảng dạy.',
        'Công tác phối hợp chuyên môn giữa các nhóm bộ môn cấp THCS và THPT được duy trì ổn định, bảo đảm đúng tiến độ chương trình 35 tuần thực học.',
      ],
      gentleLimitations: [
        'Một vài hồ sơ kế hoạch bài dạy và minh chứng sinh hoạt tổ chuyên môn cập nhật lên hệ thống còn chậm 01 - 02 ngày so với khung thời gian khuyến nghị do lịch giảng dạy liên điểm trường dày.',
        'Một số biên bản sinh hoạt chuyên môn ghi nhận phần phân tích bài học minh họa còn ngắn gọn; cần bổ sung thêm ý kiến thảo luận sâu về biện pháp hỗ trợ học sinh chưa đạt yêu cầu cần đạt.',
      ],
      recommendations: [
        'Các tổ chuyên môn tiếp tục duy trì tốt nền nếp sinh hoạt theo nghiên cứu bài học; rà soát, chuẩn hóa định dạng hồ sơ chuyên môn điện tử đồng bộ giữa 03 điểm trường.',
        'Giáo viên tiếp tục phát huy thế mạnh ứng dụng công nghệ thông tin, chú trọng phân hóa bài tập phù hợp năng lực học sinh và hoàn thiện kịp thời các mục ghi chú hồ sơ trong vòng 05 ngày làm việc.',
      ],
      targetRepresentative: 'Đại diện Tổ chuyên môn / Cá nhân được kiểm tra',
    };
  }

  if (cat === 'Tài chính - Cơ sở vật chất') {
    return {
      inspectedRecords: [
        'Sổ sách theo dõi tài sản cố định, công cụ dụng cụ, sổ theo dõi mượn - trả thiết bị dạy học và sổ đăng ký thư viện tại 03 điểm trường.',
        'Chứng từ thu - chi, sổ quỹ, bảng công khai tài chính, biên bản họp thỏa thuận với Ban đại diện cha mẹ học sinh (nếu thuộc phạm vi đợt kiểm tra).',
        'Nhật ký kiểm tra cơ sở vật chất, phòng học, phòng bộ môn, hệ thống phòng cháy chữa cháy và y tế học đường.',
        `Hồ sơ, báo cáo đối chiếu theo kế hoạch: ${item.expectedOutput}`,
      ],
      strengths: [
        'Công tác quản lý tài chính, tài sản công và các khoản thu - chi đầu năm học được thực hiện công khai, minh bạch, đúng chế độ chứng từ kế toán và quy định của Thông tư 55/2011/TT-BGDĐT.',
        'Bộ phận Văn phòng, Kế toán, Thư viện, Thiết bị và Bảo vệ tại cả 03 điểm trường phối hợp chặt chẽ, bảo quản tốt cơ sở vật chất, phòng học và trang thiết bị phục vụ dạy học.',
        'Cảnh quan sư phạm xanh - sạch - đẹp, điều kiện phòng cháy chữa cháy và y tế học đường được kiểm tra thường xuyên, bảo đảm an toàn cho học sinh và giáo viên.',
      ],
      gentleLimitations: [
        'Việc đối chiếu, cập nhật sổ theo dõi mượn trả thiết bị và danh mục tài sản luân chuyển giữa các điểm trường đôi lúc chưa đồng bộ kịp thời trong cùng tuần.',
        'Một vài phòng bộ môn và kho thiết bị cần sắp xếp lại nhãn dán, sơ đồ bố trí gọn gàng hơn để thuận tiện cho giáo viên khi mượn thiết bị thực hành.',
      ],
      recommendations: [
        'Bộ phận Văn phòng, Kế toán và nhân viên Thư viện - Thiết bị hoàn thiện việc cập nhật sổ theo dõi tài sản, thiết bị đồng bộ giữa 03 điểm trường trong tuần kế tiếp.',
        'Tiếp tục rà soát định kỳ các hạng mục cơ sở vật chất nhỏ cần bảo trì để kịp thời tham mưu Ban Giám hiệu có phương án sửa chữa, bảo đảm tốt nhất điều kiện dạy và học.',
      ],
      targetRepresentative: 'Đại diện Bộ phận Tài chính - Cơ sở vật chất / Văn phòng',
    };
  }

  if (cat === 'Khảo thí - Kiểm định') {
    return {
      inspectedRecords: [
        'Kế hoạch tổ chức kiểm tra định kỳ/kỳ thi, quyết định thành lập các ban (ra đề, in sao đề, coi thi, chấm thi, phúc khảo).',
        'Ma trận đề, bản đặc tả, đề kiểm tra gốc, hướng dẫn chấm và biên bản bàn giao đề thi, bài thi.',
        'Bảng tổng hợp kết quả điểm kiểm tra, hồ sơ đăng ký dự thi/xét tốt nghiệp và dữ liệu đối soát trên hệ thống CSDL ngành.',
        `Hồ sơ minh chứng cụ thể của đợt kiểm tra: ${item.expectedOutput}`,
      ],
      strengths: [
        'Công tác xây dựng ma trận, bản đặc tả và biên soạn đề kiểm tra bám sát Chương trình GDPT 2018 và Thông tư 22/2021/TT-BGDĐT, bảo đảm tính khoa học, phân hóa hợp lý.',
        'Quy trình in sao, bảo mật đề thi, coi kiểm tra và chấm bài tại cả 03 điểm trường được tổ chức nghiêm túc, khách quan, đúng quy chế, không xảy ra sự cố bất thường.',
        'Việc đối soát thông tin học sinh, hồ sơ dự thi và cập nhật điểm số lên phần mềm diễn ra đúng tiến độ, tỷ lệ chính xác cao.',
      ],
      gentleLimitations: [
        'Một số biên bản giao nhận bài thi/hồ sơ ở một vài phòng kiểm tra còn thiếu chữ ký nháy ở góc trang hoặc ghi giờ bàn giao chưa thống nhất định dạng.',
        'Tiến độ nhập nhận xét chi tiết trên hệ thống ở một vài lớp còn sát hạn chót, cần chủ động hoàn thành sớm hơn 01 ngày để thuận lợi cho công tác kiểm tra chéo.',
      ],
      recommendations: [
        'Các tổ chuyên môn và bộ phận giáo vụ rà soát, bổ sung đầy đủ chữ ký xác nhận trên các biên bản bàn giao hồ sơ trước khi đóng tập lưu trữ tại Văn thư.',
        'Tiếp tục duy trì quy trình kiểm tra chéo 02 vòng đối với điểm số và thông tin hồ sơ dự thi, bảo đảm tuyệt đối không để xảy ra sai sót kỹ thuật.',
      ],
      targetRepresentative: 'Đại diện Bộ phận Khảo thí / Tổ chuyên môn',
    };
  }

  if (cat === 'Nền nếp - Đoàn thể') {
    return {
      inspectedRecords: [
        'Sổ chủ nhiệm lớp, sổ đầu bài, sổ theo dõi chuyên cần và nhật ký quản lý nền nếp học sinh tại 53 lớp thuộc 03 điểm trường.',
        'Kế hoạch hoạt động của Đoàn Thanh niên, Đội Thiếu niên Tiền phong Hồ Chí Minh, Đội cờ đỏ và Ban quản lý nền nếp.',
        'Hồ sơ phối hợp giữa giáo viên chủ nhiệm với cha mẹ học sinh và sổ theo dõi công tác giáo dục đạo đức, kỹ năng sống.',
        `Hồ sơ kết quả theo kế hoạch: ${item.expectedOutput}`,
      ],
      strengths: [
        'Đa số giáo viên chủ nhiệm 53 lớp sâu sát tình hình lớp học, nắm vững hoàn cảnh học sinh, duy trì tốt sĩ số và nền nếp chuyên cần tại cả 03 điểm trường.',
        'Đoàn Thanh niên, Liên đội và Đội cờ đỏ hoạt động tích cực, phối hợp nhịp nhàng trong công tác theo dõi thi đua, xây dựng môi trường học đường văn minh, an toàn, thân thiện.',
        'Học sinh chấp hành tốt nội quy nhà trường, trang phục gọn gàng, lễ phép với thầy cô và tích cực tham gia các phong trào thi đua.',
      ],
      gentleLimitations: [
        'Ở một vài lớp đầu cấp và sau các đợt nghỉ lễ, vẫn còn rải rác một số học sinh đi học trễ hoặc nghỉ học chưa kịp có đơn xin phép đúng quy định.',
        'Một số sổ chủ nhiệm ghi chép phần biện pháp phối hợp với gia đình đối với học sinh cần quan tâm đặc biệt còn vắn tắt, nên ghi cụ thể hơn để tiện theo dõi tiến bộ từng tháng.',
      ],
      recommendations: [
        'Giáo viên chủ nhiệm tiếp tục tăng cường liên hệ chặt chẽ với phụ huynh qua nhóm liên lạc điện tử nhằm nhắc nhở kịp thời việc đi học đúng giờ và duy trì chuyên cần.',
        'Đoàn Thanh niên và Liên đội đẩy mạnh tuyên truyền an toàn giao thông cổng trường, nhân rộng gương người tốt việc tốt và hoàn thiện cập nhật sổ theo dõi thi đua định kỳ hằng tuần.',
      ],
      targetRepresentative: 'Đại diện Tổ Chủ nhiệm / Đoàn Thanh niên - Liên đội',
    };
  }

  // Hành chính - Quản trị
  return {
    inspectedRecords: [
      'Hệ thống văn bản chỉ đạo, kế hoạch công tác, sổ đăng bộ, hồ sơ quản lý sĩ số, hồ sơ chuyển đổi số và lưu trữ văn thư.',
      'Dữ liệu quản lý trên hệ thống CSDL ngành giáo dục, học bạ điện tử, văn bản đi/đến điện tử và hồ sơ hành chính tại 03 điểm trường.',
      'Biên bản họp giao ban, báo cáo tiến độ thực hiện nhiệm vụ của các bộ phận và điểm trường.',
      `Sản phẩm, hồ sơ đối chiếu của đợt kiểm tra: ${item.expectedOutput}`,
    ],
    strengths: [
      'Công tác quản trị điều hành giữa Điểm chính (Khối THPT, Ấp 3), Điểm trường THCS Đốc Binh Kiều (Ấp 1) và Điểm trường THCS Tân Kiều (Ấp Tân Kiều) được triển khai nhịp nhàng, thông suốt sau sáp nhập.',
      'Hồ sơ hành chính, sổ sách văn thư, dữ liệu học sinh và cán bộ trên hệ thống phần mềm được cập nhật đầy đủ, bảo đảm nguyên tắc "Đúng - Đủ - Sạch - Sống" và thể thức Nghị định 30/2020/NĐ-CP.',
      'Các bộ phận thể hiện tinh thần trách nhiệm cao, thực hiện tốt chế độ thông tin báo cáo đúng tiến độ yêu cầu của Ban Giám hiệu và Sở GDĐT.',
    ],
    gentleLimitations: [
      'Một số biểu mẫu thống kê giữa 03 điểm trường còn có vài chi tiết nhỏ cần chuẩn hóa thống nhất định dạng trước khi tổng hợp chung toàn trường.',
      'Một vài hồ sơ lưu trữ điện tử cần đặt lại tên tệp theo đúng quy ước thống nhất để thuận tiện hơn cho công tác tra cứu, đối chiếu lâu dài.',
    ],
    recommendations: [
      'Bộ phận Văn phòng và Quản trị hệ thống tiếp tục hướng dẫn, thống nhất mẫu biểu và quy ước lưu trữ hồ sơ số dùng chung cho cả 03 điểm trường.',
      'Các bộ phận rà soát, bổ sung hoàn thiện các chi tiết kỹ thuật nhỏ đã nêu trong biên bản và báo cáo lại Ban Kiểm tra nội bộ trong vòng 05 ngày làm việc.',
    ],
    targetRepresentative: 'Đại diện Bộ phận được kiểm tra',
  };
}

/** Tạo bảng ký tên 2 cột (Dùng cho Mẫu 04: Trưởng đoàn & Đối tượng kiểm tra, hoặc Mẫu 05) */
function createTwoColumnSignTable(
  leftTitle: string,
  leftSub: string,
  leftName: string,
  rightTitle: string,
  rightSub: string,
  rightName: string
): Table {
  const half = Math.floor(DOCX_PAGE_SETUP.contentWidth / 2);
  const makeCell = (title: string, sub: string, name: string, width: number) =>
    new TableCell({
      width: { size: width, type: WidthType.DXA },
      borders: NO_BORDER,
      margins: { top: 40, bottom: 40, left: 60, right: 60 },
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
          children: [new TextRun({ text: sub, italics: true, font: 'Times New Roman', size: FONT_SIZES.FOOTER })],
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
    columnWidths: [half, DOCX_PAGE_SETUP.contentWidth - half],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          makeCell(leftTitle, leftSub, leftName, half),
          makeCell(rightTitle, rightSub, rightName, DOCX_PAGE_SETUP.contentWidth - half),
        ],
      }),
    ],
  });
}

/** Sinh trọn bộ 04 văn bản (Mẫu 03, Mẫu 04, Mẫu 05, Mẫu 06) cho 01 đợt kiểm tra */
function buildFullFormsForRound(item: MonthlyDetailedInspection, roundIndex: number, isFirstInDoc: boolean): DocChild[] {
  const children: DocChild[] = [];
  const roundCode = String(roundIndex).padStart(2, '0');
  const dates = parseTimeframe(item.timeframe);
  const leader = formatFormalLeader(item.leadInspector);
  const findings = buildRealisticFindings(item);

  // =========================================================================
  // MẪU SỐ 03: KẾ HOẠCH TIẾN HÀNH KIỂM TRA
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
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 03 (HD 1134/SGDĐT-TCCB)`,
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
      `Số: ${roundCode}/KH-ĐKT`,
      dates.planDateText
    ),
    ...createDocumentTitleBlock(
      'KẾ HOẠCH TIẾN HÀNH KIỂM TRA',
      `Đợt ${roundCode}: ${item.title}`
    ),
    createLegalBasisParagraph(
      'Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 và Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027'
    ),
    createLegalBasisParagraph(
      'Căn cứ Kế hoạch số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều về công tác kiểm tra nội bộ năm học 2026 - 2027 và Quyết định số 49/QĐ-THCS&THPTĐBK về việc thành lập Ban Kiểm tra nội bộ',
      true,
      true
    ),
    p(
      `Tổ (Đoàn) kiểm tra nội bộ Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch tiến hành kiểm tra Đợt ${roundCode} (${item.month}) với các nội dung cụ thể như sau:`
    ),
    h1('I. MỤC ĐÍCH, YÊU CẦU'),
    p(
      `1. Mục đích: Kiểm tra, đánh giá khách quan, thực chất tình hình thực hiện nhiệm vụ thuộc lĩnh vực ${item.category.toLowerCase()} theo nội dung: ${item.title}; kịp thời ghi nhận ưu điểm, phát hiện sớm các vướng mắc để hướng dẫn, hỗ trợ đơn vị/cá nhân hoàn thiện.`
    ),
    p(
      '2. Yêu cầu: Thực hiện đúng quy trình nghiệp vụ theo Hướng dẫn số 1134/SGDĐT-TCCB; bảo đảm chính xác, công khai, dân chủ, không làm ảnh hưởng đến hoạt động dạy và học bình thường tại các điểm trường.'
    ),
    h1('II. ĐỐI TƯỢNG, PHẠM VI VÀ NỘI DUNG KIỂM TRA'),
    p(`1. Đối tượng kiểm tra: ${item.target}.`),
    p(`2. Địa điểm, phạm vi: ${item.campus} (Trường THCS và THPT Đốc Binh Kiều).`),
    p(`3. Căn cứ pháp lý đối chiếu: ${item.legalBasis}.`),
    p('4. Nội dung kiểm tra trọng tâm:'),
    ...item.specificTasks.map((t) => p(`- ${t}`)),
    h1('III. THỜI GIAN, PHƯƠNG PHÁP VÀ THÀNH PHẦN ĐOÀN KIỂM TRA'),
    p(`1. Thời gian tiến hành kiểm tra: Từ ngày ${dates.startStr} đến ngày ${dates.endStr}.`),
    p(
      '2. Phương pháp kiểm tra: Kiểm tra trực tiếp hồ sơ, sổ sách, dữ liệu điện tử; khảo sát thực tế tại các điểm trường; trao đổi trực tiếp với đối tượng kiểm tra và lập biên bản theo quy định.'
    ),
    p('3. Thành phần Đoàn kiểm tra:'),
    p(`- Trưởng đoàn: ${leader.display}.`),
    p(`- Thành viên: ${item.teamMembers.join('; ')}.`),
    h1('IV. TỔ CHỨC THỰC HIỆN'),
    p(
      '1. Đối tượng được kiểm tra có trách nhiệm chuẩn bị đầy đủ hồ sơ, sổ sách, tài liệu minh chứng liên quan đến nội dung kiểm tra và phối hợp chặt chẽ với Đoàn kiểm tra trong suốt thời gian làm việc.'
    ),
    p(
      `2. Các thành viên Đoàn kiểm tra thực hiện đúng nhiệm vụ được phân công; hoàn tất biên bản kiểm tra (Mẫu 04) và báo cáo kết quả (Mẫu 05) trình Hiệu trưởng chậm nhất sau 02 ngày kể từ khi kết thúc đợt kiểm tra./.`
    ),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createTwoColumnSignTable(
      'PHÊ DUYỆT CỦA HIỆU TRƯỞNG',
      '(Ký tên, đóng dấu)',
      'Lê Thanh Cường',
      leader.signerRole,
      '(Ký, ghi rõ họ tên)',
      leader.signerName
    )
  );

  // =========================================================================
  // MẪU SỐ 04: BIÊN BẢN KIỂM TRA
  // =========================================================================
  children.push(pageBreak());
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 04 (HD 1134/SGDĐT-TCCB)`,
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
      `Số: ${roundCode}/BB-ĐKT`,
      dates.minuteDateText
    ),
    ...createDocumentTitleBlock(
      'BIÊN BẢN KIỂM TRA NỘI BỘ',
      `Đợt ${roundCode}: ${item.title}`
    ),
    p(
      `Hôm nay, vào lúc 14 giờ 00 phút, ngày ${dates.endDay} tháng ${dates.month} năm ${dates.year}, tại Trường THCS và THPT Đốc Binh Kiều (${item.campus}), Đoàn kiểm tra nội bộ theo Kế hoạch số 48/KH-THCS&THPTĐBK và Quyết định số 49/QĐ-THCS&THPTĐBK đã tiến hành kiểm tra và lập biên bản ghi nhận kết quả như sau:`
    ),
    h1('I. THÀNH PHẦN LÀM VIỆC'),
    p(`1. Đại diện Đoàn kiểm tra nội bộ:`),
    p(`- Trưởng đoàn: ${leader.display}.`),
    p(`- Các thành viên: ${item.teamMembers.join('; ')}.`),
    p(`- Thư ký ghi biên bản: Bà Nguyễn Thị Kim Ngọc (hoặc thành viên Đoàn được phân công).`),
    p(`2. Đại diện đối tượng được kiểm tra: ${item.target}.`),
    h1('II. NỘI DUNG VÀ HỒ SƠ MINH CHỨNG ĐÃ KIỂM TRA'),
    p(`Đoàn kiểm tra đã tiến hành đối chiếu thực tế và kiểm tra các hồ sơ, tài liệu theo kế hoạch tiến hành kiểm tra số ${roundCode}/KH-ĐKT, cụ thể gồm:`),
    ...findings.inspectedRecords.map((r) => p(`- ${r}`)),
    h1('III. KẾT QUẢ KIỂM TRA'),
    h2('1. Ưu điểm, kết quả đạt được'),
    ...findings.strengths.map((s) => p(`- ${s}`)),
    p(
      `- Các nội dung trọng tâm của đợt kiểm tra (${item.specificTasks.map((t) => t.replace(/\.$/, '')).join('; ')}) nhìn chung đều được triển khai nghiêm túc, cơ bản đáp ứng đầy đủ yêu cầu của kế hoạch đề ra.`
    ),
    h2('2. Một số hạn chế, nội dung cần tiếp tục hoàn thiện'),
    ...findings.gentleLimitations.map((l) => p(`- ${l}`)),
    h1('IV. Ý KIẾN CỦA ĐỐI TƯỢNG ĐƯỢC KIỂM TRA'),
    p(
      'Đại diện đơn vị/cá nhân được kiểm tra thống nhất hoàn toàn với các nhận xét khách quan, mang tính xây dựng của Đoàn kiểm tra; tiếp thu các ý kiến góp ý và cam kết rà soát, hoàn thiện ngay những chi tiết còn thiếu sót nhỏ trong thời hạn quy định.'
    ),
    h1('V. KIẾN NGHỊ CỦA ĐOÀN KIỂM TRA'),
    ...findings.recommendations.map((rec) => p(`- ${rec}`)),
    p(
      `Biên bản kết thúc vào lúc 16 giờ 30 phút cùng ngày, đã được thông qua trước các thành phần tham dự, mọi người cùng thống nhất ký tên xác nhận. Biên bản được lập thành 02 bản có giá trị như nhau (01 bản lưu hồ sơ Ban Kiểm tra nội bộ, 01 bản giao đối tượng được kiểm tra để theo dõi, thực hiện)./.`
    ),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createTwoColumnSignTable(
      findings.targetRepresentative.toUpperCase(),
      '(Ký, ghi rõ họ tên)',
      '........................................',
      leader.signerRole,
      '(Ký, ghi rõ họ tên)',
      leader.signerName
    )
  );

  // =========================================================================
  // MẪU SỐ 05: BÁO CÁO KẾT QUẢ KIỂM TRA TRÌNH HIỆU TRƯỞNG
  // =========================================================================
  children.push(pageBreak());
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 05 (HD 1134/SGDĐT-TCCB)`,
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
      `Số: ${roundCode}/BC-ĐKT`,
      dates.reportDateText
    ),
    ...createDocumentTitleBlock(
      'BÁO CÁO KẾT QUẢ KIỂM TRA NỘI BỘ',
      `Đợt ${roundCode}: ${item.title}`
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 120 },
      children: [
        new TextRun({
          text: 'Kính gửi: Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều.',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    p(
      `Thực hiện Kế hoạch kiểm tra nội bộ số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều và Kế hoạch tiến hành kiểm tra số ${roundCode}/KH-ĐKT, từ ngày ${dates.startStr} đến ngày ${dates.endStr}, Đoàn kiểm tra đã tiến hành kiểm tra đối với ${item.target} tại ${item.campus}. Đoàn kiểm tra trân trọng báo cáo Hiệu trưởng kết quả như sau:`
    ),
    h1('I. TÌNH HÌNH TRIỂN KHAI ĐỢT KIỂM TRA'),
    p(
      `Đoàn kiểm tra gồm ${leader.display} làm Trưởng đoàn và các thành viên (${item.teamMembers.join(', ')}) đã thực hiện đúng trình tự, thủ tục, kiểm tra thực tế và đối chiếu đầy đủ các hồ sơ theo quy định tại ${item.legalBasis}. Đối tượng được kiểm tra phối hợp nghiêm túc, cung cấp kịp thời hồ sơ minh chứng.`
    ),
    h1('II. ĐÁNH GIÁ KẾT QUẢ KIỂM TRA'),
    h2('1. Mặt làm được, ưu điểm'),
    ...findings.strengths.map((s) => p(`- ${s}`)),
    h2('2. Điểm cần lưu ý, điều chỉnh nhẹ'),
    ...findings.gentleLimitations.map((l) => p(`- ${l}`)),
    h2('3. Đánh giá chung'),
    p(
      `Xếp loại chung đợt kiểm tra: **Đạt yêu cầu (Tốt)**. Các bộ phận, cá nhân được kiểm tra thực hiện nghiêm túc chủ trương, kế hoạch năm học 2026 - 2027 của nhà trường; không phát hiện sai phạm nghiêm trọng về quy chế chuyên môn hay quản lý tài chính, tài sản.`
    ),
    h1('III. ĐỀ XUẤT, KIẾN NGHỊ HIỆU TRƯỞNG'),
    ...findings.recommendations.map((rec) => p(`- ${rec}`)),
    p(
      '- Kính đề nghị Hiệu trưởng xem xét, ban hành Thông báo kết quả kiểm tra (Mẫu 06) đến các bộ phận liên quan để phát huy ưu điểm và kịp thời hoàn thiện các nội dung kỹ thuật nhỏ đã nêu./.'
    ),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable(leader.signerRole, leader.signerName, [
      'Hiệu trưởng (để báo cáo);',
      'Ban Kiểm tra nội bộ;',
      'Lưu: Hồ sơ ĐKT.',
    ])
  );

  // =========================================================================
  // MẪU SỐ 06: THÔNG BÁO KẾT QUẢ KIỂM TRA (HIỆU TRƯỞNG BAN HÀNH)
  // =========================================================================
  children.push(pageBreak());
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: `Đợt ${roundCode}/29 (${item.month}) — Mẫu số 06 (HD 1134/SGDĐT-TCCB)`,
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
    ...createDocumentTitleBlock(
      'THÔNG BÁO',
      `Kết quả kiểm tra nội bộ Đợt ${roundCode}: ${item.title}`
    ),
    p(
      `Căn cứ Kế hoạch kiểm tra nội bộ số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều; xét Báo cáo kết quả kiểm tra số ${roundCode}/BC-ĐKT ngày ${dates.reportDateText.replace('Đốc Binh Kiều, ngày ', '')} của Đoàn kiểm tra nội bộ, Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều thông báo kết quả kiểm tra như sau:`
    ),
    h1('I. KẾT LUẬN CHUNG'),
    p(
      `Từ ngày ${dates.startStr} đến ngày ${dates.endStr}, Đoàn kiểm tra nội bộ nhà trường đã hoàn thành đợt kiểm tra tại ${item.campus} đối với ${item.target}. Hiệu trưởng ghi nhận và biểu dương tinh thần chuẩn bị chu đáo, ý thức trách nhiệm của tập thể, cá nhân được kiểm tra:`
    ),
    ...findings.strengths.slice(0, 2).map((s) => p(`- ${s}`)),
    h1('II. NỘI DUNG CẦN RÚT KINH NGHIỆM VÀ TIẾP TỤC HOÀN THIỆN'),
    ...findings.gentleLimitations.map((l) => p(`- ${l}`)),
    h1('III. YÊU CẦU TỔ CHỨC THỰC HIỆN SAU KIỂM TRA'),
    ...findings.recommendations.map((rec) => p(`- ${rec}`)),
    p(
      `Giao Ban Kiểm tra nội bộ theo dõi, đôn đốc việc hoàn thiện các nội dung trên và tổng hợp kết quả vào báo cáo định kỳ của nhà trường. Hiệu trưởng thông báo đến các bộ phận, tổ chuyên môn và cá nhân có liên quan biết, nghiêm túc thực hiện./.`
    ),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Ban Giám hiệu;',
      'Ban Kiểm tra nội bộ;',
      'Các tổ chuyên môn, bộ phận liên quan;',
      'Lưu: VT, Hồ sơ KTNB.',
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
      `Thực hiện Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 và Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027, Trường THCS và THPT Đốc Binh Kiều báo cáo kết quả công tác kiểm tra nội bộ ${isFinalYear ? 'cả năm học 2026 - 2027' : 'Học kỳ I năm học 2026 - 2027'} như sau:`
    ),
    h1('I. ĐẶC ĐIỂM TÌNH HÌNH ĐƠN VỊ'),
    p(
      'Trường THCS và THPT Đốc Binh Kiều được thành lập theo Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của UBND tỉnh Đồng Tháp, tổ chức giảng dạy tại 03 điểm trường trên địa bàn xã Đốc Binh Kiều: Điểm chính (Khối THPT, Ấp 3, 14 lớp, 529 học sinh), Điểm trường THCS Đốc Binh Kiều (Ấp 1, 24 lớp, 980 học sinh) và Điểm trường THCS Tân Kiều (Ấp Tân Kiều, 15 lớp, 602 học sinh). Tổng quy mô 53 lớp với 2.111 học sinh và 120 cán bộ, giáo viên, nhân viên.'
    ),
    h1('II. CÔNG TÁC CHỈ ĐẠO VÀ KẾT QUẢ THỰC HIỆN CÁC ĐỢT KIỂM TRA'),
    p(
      `Ngay từ đầu năm học, Hiệu trưởng đã ban hành Kế hoạch số 48/KH-THCS&THPTĐBK ngày 15/10/2026 và Quyết định số 49/QĐ-THCS&THPTĐBK thành lập Ban Kiểm tra nội bộ gồm 22 thành viên, phân công rõ trách nhiệm cho 03 Phó Hiệu trưởng phụ trách từng lĩnh vực và từng điểm trường. Tính đến thời điểm báo cáo, nhà trường đã tổ chức hoàn thành ${rounds.length} đợt kiểm tra theo đúng kế hoạch:`
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
              'Hoàn thành đúng tiến độ; Đạt yêu cầu (Tốt); đã ban hành TB kết luận.',
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
      '- Công tác kiểm tra nội bộ được triển khai đồng bộ tại cả 03 điểm trường, bám sát Hướng dẫn 1134 và Công văn 3953 của Sở GDĐT; hồ sơ lưu trữ đầy đủ từ Mẫu 01 đến Mẫu 06 theo Nghị định 30/2020/NĐ-CP.'
    ),
    p(
      '- Kỷ cương nền nếp chuyên môn, hoạt động sư phạm nhà giáo, công tác tài chính - cơ sở vật chất, chuyển đổi số và giáo dục hòa nhập đều có chuyển biến tích cực; không xảy ra khiếu nại, tố cáo hay vi phạm quy chế nghiêm trọng.'
    ),
    h2('2. Khó khăn, hạn chế nhỏ cần tiếp tục khắc phục'),
    p(
      '- Do năm học đầu tiên vận hành mô hình trường liên cấp trên 03 điểm trường và thành viên Ban KTNB chủ yếu kiêm nhiệm nên việc sắp xếp lịch kiểm tra trực tiếp đôi lúc cần điều chỉnh linh hoạt cho phù hợp thời khóa biểu.'
    ),
    p(
      '- Một số hồ sơ điện tử ở vài bộ phận cần tiếp tục chuẩn hóa đồng bộ định dạng lưu trữ để thuận lợi hơn khi tra cứu, đối soát.'
    ),
    h1(isFinalYear ? 'IV. PHƯƠNG HƯỚNG NĂM HỌC 2027 - 2028 VÀ KIẾN NGHỊ' : 'IV. NHIỆM VỤ TRỌNG TÂM HỌC KỲ II'),
    p(
      isFinalYear
        ? '- Tiếp tục phát huy hiệu quả hoạt động Ban Kiểm tra nội bộ, đẩy mạnh ứng dụng chuyển đổi số trong kiểm tra hồ sơ chuyên môn; chú trọng kiểm tra chất lượng dạy học 2 buổi/ngày, ôn thi tuyển sinh lớp 10 và tốt nghiệp THPT.\n- Kiến nghị Sở GDĐT tiếp tục tổ chức tập huấn chuyên sâu nghiệp vụ kiểm tra nội bộ cho đội ngũ cán bộ quản lý và tổ trưởng chuyên môn các trường liên cấp sau sáp nhập./.'
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

/** Xây dựng Trọn bộ 06 Biểu mẫu chuẩn Mẫu 01 -> Mẫu 06 hoàn chỉnh chuẩn NĐ 30 */
function buildSixStandardTemplatesDoc(): DocChild[] {
  const children: DocChild[] = [];

  // MẪU 01: Quyết định ban hành Kế hoạch KTNB năm học (đủ căn cứ CV 3953)
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 40 },
      children: [new TextRun({ text: 'MẪU SỐ 01 (Ban hành kèm theo HD 1134/SGDĐT-TCCB)', italics: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
    }),
    createAdminDocHeaderTable(
      SUPERIOR_AGENCY,
      SCHOOL_NAME,
      'Số: 47/QĐ-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày 15 tháng 10 năm 2026'
    ),
    ...createDocumentTitleBlock(
      'QUYẾT ĐỊNH',
      'Về việc ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 40, after: 120 },
      children: [new TextRun({ text: 'HIỆU TRƯỞNG TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    createLegalBasisParagraph('Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học'),
    createLegalBasisParagraph('Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05 tháng 8 năm 2025 của Chính phủ về hoạt động kiểm tra chuyên ngành'),
    createLegalBasisParagraph('Căn cứ Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của Ủy ban nhân dân tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều'),
    createLegalBasisParagraph('Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục'),
    createLegalBasisParagraph('Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027'),
    createLegalBasisParagraph('Theo đề nghị của Phó Hiệu trưởng phụ trách chuyên môn và Tổ trưởng Tổ Văn phòng', true, true),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 140, after: 100 },
      children: [new TextRun({ text: 'QUYẾT ĐỊNH:', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    p('**Điều 1.** Ban hành kèm theo Quyết định này Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều (Số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026).'),
    p('**Điều 2.** Quyết định này có hiệu lực kể từ ngày ký. Ban Kiểm tra nội bộ, các Phó Hiệu trưởng, các Tổ trưởng chuyên môn, Tổ trưởng Tổ Văn phòng và toàn thể cán bộ, giáo viên, nhân viên nhà trường chịu trách nhiệm thi hành Quyết định này./.'),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Sở GDĐT Đồng Tháp (để báo cáo);',
      'Như Điều 2 (để thực hiện);',
      'Lưu: VT, Hồ sơ KTNB.',
    ])
  );

  // MẪU 02: Quyết định thành lập Tổ/Đoàn kiểm tra chuyên đề (khi cần lập đoàn đột xuất/chuyên đề)
  children.push(pageBreak());
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 40 },
      children: [new TextRun({ text: 'MẪU SỐ 02 (Ban hành kèm theo HD 1134/SGDĐT-TCCB)', italics: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
    }),
    createAdminDocHeaderTable(
      SUPERIOR_AGENCY,
      SCHOOL_NAME,
      'Số: .../QĐ-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày ... tháng ... năm 202...'
    ),
    ...createDocumentTitleBlock(
      'QUYẾT ĐỊNH',
      'Về việc thành lập Tổ (Đoàn) kiểm tra nội bộ chuyên đề ...'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 40, after: 120 },
      children: [new TextRun({ text: 'HIỆU TRƯỞNG TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    createLegalBasisParagraph('Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 và Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027'),
    createLegalBasisParagraph('Căn cứ Kế hoạch số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 và Quyết định số 49/QĐ-THCS&THPTĐBK về việc thành lập Ban Kiểm tra nội bộ năm học 2026 - 2027', true, true),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 140, after: 100 },
      children: [new TextRun({ text: 'QUYẾT ĐỊNH:', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY })],
    }),
    p('**Điều 1.** Thành lập Tổ (Đoàn) kiểm tra nội bộ gồm các ông (bà) có tên sau đây:'),
    p('1. Ông (Bà) ............................................... - Chức vụ: ........................... - Trưởng đoàn;'),
    p('2. Ông (Bà) ............................................... - Chức vụ: ........................... - Thành viên;'),
    p('3. Ông (Bà) ............................................... - Chức vụ: ........................... - Thư ký.'),
    p('**Điều 2.** Tổ (Đoàn) kiểm tra có nhiệm vụ tiến hành kiểm tra đối với ...................................... trong thời gian từ ngày .../.../202... đến ngày .../.../202...; lập biên bản, báo cáo kết quả trình Hiệu trưởng xem xét, kết luận.'),
    p('**Điều 3.** Các Phó Hiệu trưởng, Tổ trưởng chuyên môn, đối tượng được kiểm tra và các ông (bà) có tên tại Điều 1 chịu trách nhiệm thi hành Quyết định này./.'),
    new Paragraph({ spacing: { before: 80, after: 20 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Như Điều 3 (để thực hiện);',
      'Lưu: VT, Hồ sơ KTNB.',
    ])
  );

  // MẪU 03, 04, 05, 06 mẫu khung chuẩn trống (dùng khi phát sinh đột xuất)
  const sampleRound: MonthlyDetailedInspection = {
    id: 'mau-chuan',
    month: 'Năm học 2026 - 2027',
    monthNumber: 10,
    timeframe: '.../.../202... - .../.../202...',
    title: 'Kiểm tra chuyên đề / đột xuất .......................................................',
    category: 'Chuyên môn',
    campus: 'Trường THCS và THPT Đốc Binh Kiều (03 điểm trường)',
    target: '....................................................................................',
    leadInspector: 'Ông Nguyễn Minh Trí (Phó Hiệu trưởng)',
    teamMembers: ['..........................................', '..........................................'],
    specificTasks: [
      'Kiểm tra hồ sơ, sổ sách chuyên môn và minh chứng thực hiện nhiệm vụ theo quy định.',
      'Kiểm tra thực tế hoạt động giảng dạy, quản lý lớp học hoặc công tác được phân công.',
      'Ghi nhận ưu điểm, tư vấn tháo gỡ khó khăn và kiến nghị biện pháp nâng cao chất lượng.',
    ],
    expectedOutput: 'Biên bản kiểm tra (Mẫu 04), Báo cáo kết quả (Mẫu 05) và Thông báo kết luận (Mẫu 06).',
    legalBasis: 'Công văn 3953/SGDĐT-TCCB, Hướng dẫn 1134/SGDĐT-TCCB và Kế hoạch 48/KH-THCS&THPTĐBK',
  };

  children.push(...buildFullFormsForRound(sampleRound, 0, false));
  return children;
}

async function main() {
  const downloadsDir = path.resolve(process.cwd(), 'public/downloads');
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

  const hk1Rounds = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.slice(0, 13); // Đợt 01 - 13 (Tháng 09/2026 - 01/2027)
  const hk2Rounds = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.slice(13);    // Đợt 14 - 29 (Tháng 02/2027 - 08/2027)

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
  console.log(`Generating Full HK1 Dossier (${hk1Rounds.length} rounds x 4 forms + HK1 Report)...`);
  const hk1Children: DocChild[] = [];
  hk1Rounds.forEach((item, idx) => {
    hk1Children.push(...buildFullFormsForRound(item, idx + 1, idx === 0));
  });
  hk1Children.push(...buildPeriodicReportToDepartment(false, hk1Rounds));

  const hk1Path = path.join(downloadsDir, 'TRON_BO_HO_SO_KTNB_HK1_2026_2027.docx');
  fs.writeFileSync(hk1Path, await Packer.toBuffer(makeDoc(hk1Children)));
  console.log('Saved HK1 Dossier DOCX:', hk1Path);

  // 2. Trọn bộ Hồ sơ KTNB Học kỳ II & Hè (Đợt 14 - 29 + Báo cáo Tổng kết năm học gửi Sở)
  console.log(`Generating Full HK2 & Summer Dossier (${hk2Rounds.length} rounds x 4 forms + Annual Report)...`);
  const hk2Children: DocChild[] = [];
  hk2Rounds.forEach((item, idx) => {
    hk2Children.push(...buildFullFormsForRound(item, 14 + idx, idx === 0));
  });
  hk2Children.push(...buildPeriodicReportToDepartment(true, MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR));

  const hk2Path = path.join(downloadsDir, 'TRON_BO_HO_SO_KTNB_HK2_HE_2026_2027.docx');
  fs.writeFileSync(hk2Path, await Packer.toBuffer(makeDoc(hk2Children)));
  console.log('Saved HK2 Dossier DOCX:', hk2Path);

  // 3. Trọn bộ 06 Biểu mẫu chuẩn HD 1134 (Mẫu 01 -> Mẫu 06 hoàn chỉnh chuẩn NĐ 30)
  console.log('Generating Complete 6 Standard Forms DOCX (Mẫu 01 -> Mẫu 06)...');
  const formsPath = path.join(downloadsDir, 'TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx');
  fs.writeFileSync(formsPath, await Packer.toBuffer(makeDoc(buildSixStandardTemplatesDoc())));
  console.log('Saved Complete 6 Forms DOCX:', formsPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

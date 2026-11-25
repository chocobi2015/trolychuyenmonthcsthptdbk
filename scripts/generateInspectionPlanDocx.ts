import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  TableLayoutType,
  WidthType,
  AlignmentType,
  LineRuleType,
  Footer,
  PageNumber,
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import {
  SCHOOL_INSPECTION_BACKGROUND,
  SCHOOL_INSPECTION_OBJECTIVES,
  DETAILED_INSPECTION_PILLARS_UNABRIDGED,
  MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR,
  MonthlyDetailedInspection,
} from '../src/data/detailedInspectionPlanFullText';
import {
  SCHOOL_INSPECTION_COMMITTEE,
  INSPECTION_ARCHIVE_CHECKLIST,
} from '../src/data/internalInspectionData';
import {
  DOCX_PAGE_SETUP,
  FONT_SIZES,
  PARAGRAPH_SPACING,
  TABLE_CELL_BORDER_GRID,
  TABLE_CELL_MARGINS_DATA,
  createAdminDocHeaderTable,
  createArticleHeading,
  createBodyParagraph,
  createDocumentTitleBlock,
  createLegalBasisParagraph,
  createSignatureBlockTable,
} from '../src/utils/docxStandards';

type DocChild = Paragraph | Table;

function p(text: string, bold = false, italics = false): Paragraph {
  return createBodyParagraph(text, {
    bold,
    italic: italics,
    indentFirstLine: true,
    spacingBefore: 40,
    spacingAfter: 50,
  });
}

function h1(text: string): Paragraph {
  return createArticleHeading(text, { spacingBefore: 180, spacingAfter: 70 });
}

function h2(text: string): Paragraph {
  return createArticleHeading(text, { spacingBefore: 130, spacingAfter: 50 });
}

function h3(text: string): Paragraph {
  return createArticleHeading(text, { spacingBefore: 100, spacingAfter: 40 });
}

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

function makeDoc(children: DocChild[]): Document {
  return new Document({
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
}

/** Xác định hình thức kiểm tra ngắn gọn cho cột 5 bảng Mẫu 01 (CV 1134) */
function inferInspectionFormat(item: MonthlyDetailedInspection): string {
  const titleLower = item.title.toLowerCase();
  if (titleLower.includes('toàn diện')) return 'Toàn diện';
  if (titleLower.includes('đột xuất')) return 'Đột xuất / Chuyên đề';
  if (titleLower.includes('định kỳ') || titleLower.includes('đầu năm') || titleLower.includes('cuối')) {
    return 'Định kỳ / Chuyên đề';
  }
  return 'Chuyên đề';
}

/** Chuẩn hóa danh xưng người phụ trách cho bảng Danh mục */
function formatFormalLead(raw: string): string {
  return raw
    .replace(/Thầy\s+/g, 'Ông ')
    .replace(/Cô\s+/g, 'Bà ')
    .replace(/\(HT\)/g, '(Hiệu trưởng)')
    .replace(/\(PHT\)/g, '(Phó Hiệu trưởng)');
}

/**
 * Xây dựng nội dung QUYẾT ĐỊNH Ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027
 * Chuẩn xác 100% theo MẪU SỐ 01 (Trang 11, Công văn 1134/SGDĐT-TCCB) và Công văn 3953/SGDĐT-TCCB
 */
function buildPlanIssuanceDecisionChildren(): DocChild[] {
  return [
    createAdminDocHeaderTable(
      'SỞ GDĐT TỈNH ĐỒNG THÁP',
      'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
      'Số: 48/QĐ-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày 15 tháng 10 năm 2026'
    ),
    ...createDocumentTitleBlock(
      'QUYẾT ĐỊNH',
      'Ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 40, after: 140 },
      children: [
        new TextRun({
          text: 'HIỆU TRƯỞNG TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    createLegalBasisParagraph(
      'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học'
    ),
    createLegalBasisParagraph(
      'Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05 tháng 8 năm 2025 của Chính phủ về hoạt động kiểm tra chuyên ngành'
    ),
    createLegalBasisParagraph(
      'Căn cứ Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của Ủy ban nhân dân tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều'
    ),
    createLegalBasisParagraph(
      'Căn cứ Công văn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc hướng dẫn thực hiện công tác kiểm tra nội bộ năm học 2025 - 2026'
    ),
    createLegalBasisParagraph(
      'Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027'
    ),
    createLegalBasisParagraph(
      'Căn cứ Kế hoạch giáo dục năm học 2026 - 2027 số 34/KH-THCS&THPTĐBK ngày 25 tháng 9 năm 2026 của Trường THCS và THPT Đốc Binh Kiều'
    ),
    createLegalBasisParagraph(
      'Xét đề nghị của Phó Hiệu trưởng phụ trách chuyên môn và Tổ trưởng Tổ Văn phòng',
      true,
      true
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 160, after: 120 },
      children: [
        new TextRun({
          text: 'QUYẾT ĐỊNH:',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    p(
      '**Điều 1.** Ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều *(đính kèm Kế hoạch số 48/KH-THCS&THPTĐBK và các Phụ lục kèm theo)*.'
    ),
    p(
      '**Điều 2.** Các Phó Hiệu trưởng, Ban Kiểm tra nội bộ, các Tổ chuyên môn, Tổ Văn phòng, các ông (bà) viên chức, người lao động thuộc Trường THCS và THPT Đốc Binh Kiều và các cá nhân, tổ chức có liên quan chịu trách nhiệm thi hành Quyết định này./.'
    ),
    new Paragraph({ spacing: { before: 120, after: 40 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Như Điều 2;',
      'Sở Giáo dục và Đào tạo (để báo cáo);',
      'Phòng TCCB Sở GDĐT (để báo cáo);',
      'Lưu: VT.',
    ]),
  ];
}

export async function generateAllInspectionDocuments() {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // ===========================================================================
  // 1A. QUYẾT ĐỊNH BAN HÀNH KẾ HOẠCH KIỂM TRA NỘI BỘ (MẪU 01 - BẢN RỜI)
  // ===========================================================================
  console.log('Generating Standalone Plan Issuance Decision DOCX (Mẫu 01 - CV 1134)...');
  const planDecisionPath = path.join(downloadsDir, 'QUYET_DINH_BAN_HANH_KE_HOACH_KTNB_2026_2027.docx');
  fs.writeFileSync(planDecisionPath, await Packer.toBuffer(makeDoc(buildPlanIssuanceDecisionChildren())));
  console.log('Saved Plan Issuance Decision DOCX:', planDecisionPath);

  // ===========================================================================
  // 1B. KẾ HOẠCH KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027 (MẪU 01 CV 1134 + PHỤ LỤC)
  //     Gồm: Trang 1 Quyết định Ban hành (Mẫu 01) -> Kế hoạch ngắn gọn đúng 4 mục
  //     (I, II, III, IV theo trang 12 CV 1134) -> 03 Phụ lục chi tiết đính kèm
  // ===========================================================================
  console.log('Generating Official Concise Inspection Plan + Appendices DOCX (Mẫu 01 - CV 1134)...');

  const planDocChildren: DocChild[] = [];

  // PHẦN 1: QUYẾT ĐỊNH BAN HÀNH KẾ HOẠCH (TRANG ĐẦU)
  planDocChildren.push(...buildPlanIssuanceDecisionChildren());

  // PHẦN 2: KẾ HOẠCH KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027 (NGẮT TRANG, ĐÚNG SƯỜN 4 MỤC MẪU 01)
  planDocChildren.push(
    new Paragraph({ pageBreakBefore: true, spacing: { before: 0, after: 0 } }),
    createAdminDocHeaderTable(
      'SỞ GDĐT TỈNH ĐỒNG THÁP',
      'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
      'Số: 48/KH-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày 15 tháng 10 năm 2026'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 200, after: 30 },
      children: [
        new TextRun({
          text: 'KẾ HOẠCH',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.TITLE_TYPE,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: 'Kiểm tra nội bộ năm học 2026 - 2027',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.TITLE_SUBJECT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 120 },
      children: [
        new TextRun({
          text: '(Ban hành kèm theo Quyết định số 48/QĐ-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều)',
          italics: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY_SMALL,
        }),
      ],
    })
  );

  // I. MỤC ĐÍCH, YÊU CẦU (Bám đúng Mục I Công văn 1134, ngắn gọn, súc tích)
  planDocChildren.push(h1('I. MỤC ĐÍCH, YÊU CẦU'));
  planDocChildren.push(h2('1. Mục đích'));
  planDocChildren.push(
    p(
      '- Xem xét, đánh giá thực chất các hoạt động giáo dục và điều kiện dạy học trong phạm vi quản lý của Trường THCS và THPT Đốc Binh Kiều tại cả 03 điểm trường.'
    ),
    p(
      '- Giúp Hiệu trưởng thu thập thông tin chính xác về hoạt động điều hành, làm cơ sở xây dựng kế hoạch, chỉ đạo, điều hành khoa học, khả thi, nâng cao hiệu quả quản trị nhà trường sau sáp nhập.'
    ),
    p(
      '- Phòng ngừa, phát hiện và xử lý kịp thời các thiếu sót, hạn chế phát sinh; đồng thời ghi nhận, biểu dương, khen thưởng các tập thể và cá nhân hoàn thành xuất sắc nhiệm vụ.'
    )
  );

  planDocChildren.push(h2('2. Yêu cầu'));
  planDocChildren.push(
    p(
      '- Thực hiện đúng quy định pháp luật, bám sát Công văn số 1134/SGDĐT-TCCB ngày 17/10/2025, Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 của Sở GDĐT Đồng Tháp và Kế hoạch giáo dục năm học 2026 - 2027 của nhà trường.'
    ),
    p(
      '- Nội dung kiểm tra có trọng tâm, trọng điểm, tập trung khắc phục các hạn chế, vướng mắc của đơn vị; bảo đảm chính xác, khách quan, công khai, dân chủ, kịp thời; không chồng chéo và không làm cản trở hoạt động dạy học bình thường.'
    ),
    p(
      '- Tiến hành đúng theo kế hoạch đã phê duyệt hoặc kiểm tra đột xuất khi có chỉ đạo của người có thẩm quyền, phát sinh vụ việc cần xác minh.'
    )
  );

  // II. NỘI DUNG KIỂM TRA (NGẮN GỌN, KHÁI QUÁT & THỐNG KÊ ĐÚNG HƯỚNG DẪN MẪU 01 TRANG 12 CV 1134)
  const totalRounds = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.length;
  const hk1Count = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.filter((_, i) => i < 13).length;
  const hk2Count = totalRounds - hk1Count;
  const countChuyenMon = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.filter((r) => r.category === 'Chuyên môn').length;
  const countTaiChinh = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.filter((r) => r.category === 'Tài chính - Cơ sở vật chất').length;
  const countHanhChinh = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.filter((r) => r.category === 'Hành chính - Quản trị').length;
  const countKhaoThi = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.filter((r) => r.category === 'Khảo thí - Kiểm định').length;
  const countNenNep = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.filter((r) => r.category === 'Nền nếp - Đoàn thể').length;

  planDocChildren.push(h1('II. NỘI DUNG KIỂM TRA'));
  planDocChildren.push(
    p(
      `**1. Tổng số cuộc kiểm tra dự kiến thực hiện trong năm học:** Tổ chức **${totalRounds} cuộc (đợt) kiểm tra** theo kế hoạch (gồm **${hk1Count} đợt** trong Học kỳ I và **${hk2Count} đợt** trong Học kỳ II và Hè; chưa kể các cuộc kiểm tra đột xuất theo yêu cầu quản lý), phân bổ theo các nhóm lĩnh vực như sau:`
    ),
    p(`- Kiểm tra chuyên môn, hoạt động sư phạm giáo viên và các Tổ chuyên môn: **${countChuyenMon} đợt** (bảo đảm kiểm tra toàn diện và chuyên đề tối thiểu 30% đội ngũ giáo viên).`),
    p(`- Kiểm tra công tác hành chính, quản trị điều hành của Thủ trưởng, văn thư và chuyển đổi số: **${countHanhChinh} đợt**.`),
    p(`- Kiểm tra công tác tài chính, tài sản công, cơ sở vật chất, thư viện, thiết bị dạy học và an toàn trường học: **${countTaiChinh} đợt**.`),
    p(`- Kiểm tra công tác khảo thí, quản lý chất lượng, kiểm tra đánh giá và ôn thi cuối cấp: **${countKhaoThi} đợt**.`),
    p(`- Kiểm tra công tác chủ nhiệm lớp, nền nếp học sinh, giáo dục hòa nhập và hoạt động đoàn thể: **${countNenNep} đợt**.`),
    p(
      '**2. Đối tượng kiểm tra:** Các bộ phận quản lý nhà trường; 06 Tổ chuyên môn và 01 Tổ Văn phòng (văn thư, kế toán, thủ quỹ, thư viện, thiết bị, y tế học đường, bảo vệ, phục vụ); toàn thể 120 cán bộ, giáo viên, nhân viên và hoạt động giáo dục của 53 lớp (2.111 học sinh) tại 03 điểm trường: Điểm chính (Khối THPT, Ấp 3), Điểm trường THCS Đốc Binh Kiều (Ấp 1) và Điểm trường THCS Tân Kiều (Ấp Tân Kiều).'
    ),
    p(
      '**3. Thời kỳ kiểm tra và thời hạn kiểm tra:** Thời kỳ kiểm tra tính từ đầu năm học 2026 - 2027 (tháng 09/2026) đến kết thúc năm học và tuyển sinh đầu cấp (tháng 08/2027), tương ứng với từng đợt kiểm tra. Thời hạn kiểm tra mỗi đợt từ 03 đến 10 ngày làm việc theo quy định tại khoản 2 Điều 13 Nghị định số 217/2025/NĐ-CP.'
    ),
    p(
      '**4. Trọng tâm nội dung kiểm tra:** Bám sát 04 nhóm nội dung của Công văn số 1134/SGDĐT-TCCB: (a) Việc thực hiện nhiệm vụ được giao của Thủ trưởng đơn vị (chiến lược, kế hoạch giáo dục, quản lý đội ngũ, quản lý học sinh, tài chính - tài sản, quy chế dân chủ, công khai, tiếp công dân, chuyển đổi số, an toàn trường học); (b) Hoạt động sư phạm của giáo viên và hoạt động phục vụ của nhân viên; (c) Hoạt động của các Tổ chuyên môn, Thư viện, Thiết bị, Tài chính, Văn thư; (d) Quản lý chất lượng, kiểm tra đánh giá, dạy thêm học thêm và hồ sơ dữ liệu ngành.'
    ),
    p(
      'Nội dung chi tiết từng cuộc kiểm tra có tại **Mục IV (Danh mục các cuộc kiểm tra)** và **các Phụ lục (Phụ lục 1, Phụ lục 2, Phụ lục 3)** ban hành kèm theo Kế hoạch này.'
    )
  );

  // III. TỔ CHỨC THỰC HIỆN (Đúng 2 tiểu mục của Mẫu 01 trang 12 CV 1134)
  planDocChildren.push(h1('III. TỔ CHỨC THỰC HIỆN'));
  planDocChildren.push(h2('1. Các biện pháp thực hiện'));
  planDocChildren.push(
    p(
      '- Thành lập Ban Kiểm tra nội bộ năm học 2026 - 2027 (bằng Quyết định riêng theo Mẫu số 02), tập huấn nghiệp vụ và phân công rõ nhiệm vụ từng thành viên phụ trách theo chuyên môn và theo 03 điểm trường.'
    ),
    p(
      '- Thực hiện nghiêm quy trình 03 bước đối với mỗi cuộc kiểm tra theo Công văn số 1134/SGDĐT-TCCB: Chuẩn bị và phê duyệt Kế hoạch tiến hành kiểm tra (Mẫu 03) → Tiến hành kiểm tra, thu thập minh chứng và lập Biên bản kiểm tra (Mẫu 04) → Báo cáo kết quả kiểm tra trình Hiệu trưởng (Mẫu 05) và ban hành Thông báo kết quả kiểm tra (Mẫu 06).'
    ),
    p(
      '- Công khai kết quả kiểm tra trong các kỳ họp giao ban, Hội đồng sư phạm; gắn kết quả kiểm tra với đánh giá thi đua, xếp loại viên chức hằng năm; theo dõi chặt chẽ việc khắc phục sau kiểm tra và lưu trữ hồ sơ đầy đủ tại Văn thư theo Nghị định 30/2020/NĐ-CP và Thông tư 08/2025/TT-BGDĐT.'
    ),
    p(
      '- Bảo đảm điều kiện làm việc và kinh phí hoạt động kiểm tra nội bộ theo Quy chế chi tiêu nội bộ của nhà trường (chi tiết tại Phụ lục 1).'
    )
  );

  planDocChildren.push(h2('2. Trách nhiệm thực hiện'));
  planDocChildren.push(
    p(
      '- **Hiệu trưởng (Ông Lê Thanh Cường):** Chịu trách nhiệm toàn diện trước Sở GDĐT; ban hành Kế hoạch và Quyết định thành lập Ban KTNB; trực tiếp chỉ đạo kiểm tra tài chính, tài sản công, quy chế dân chủ, tiếp công dân, an toàn trường học; phê duyệt Mẫu 03 và ký ban hành Mẫu 06.'
    ),
    p(
      '- **Các Phó Hiệu trưởng:** Ông Nguyễn Minh Trí phụ trách kiểm tra quy chế chuyên môn toàn trường, khảo thí, dạy thêm học thêm và Điểm chính (Khối THPT); Ông Phan Thanh Thảo phụ trách kiểm tra nội bộ tại Điểm trường THCS Đốc Binh Kiều, công tác chủ nhiệm và giáo dục hòa nhập; Ông Nguyễn Thanh Tòng phụ trách kiểm tra nội bộ tại Điểm trường THCS Tân Kiều, thiết bị dạy học và an toàn giao thông.'
    ),
    p(
      '- **Ban Kiểm tra nội bộ, các Tổ chuyên môn và Tổ Văn phòng:** Triển khai các đợt kiểm tra đúng tiến độ; phối hợp chuẩn bị đầy đủ hồ sơ minh chứng; thực hiện nghiêm các kiến nghị sau kiểm tra; Văn thư nhà trường tiếp nhận và lưu trữ hồ sơ theo từng đợt.'
    ),
    p(
      '- **Chế độ thông tin, báo cáo Sở GDĐT Đồng Tháp (qua Phòng Tổ chức cán bộ, email: tochuccanbo@dongthap.edu.vn) theo Công văn số 3953/SGDĐT-TCCB:** Nộp Kế hoạch KTNB và Quyết định thành lập Ban KTNB **trước ngày 31/10/2026**; Báo cáo sơ kết Học kỳ I **trước ngày 20/01/2027**; Báo cáo tổng kết năm học và tự đánh giá chấm điểm thi đua **trước ngày 18/5/2027**.'
    )
  );

  // IV. DANH MỤC CÁC CUỘC KIỂM TRA (ĐÚNG BẢNG 7 CỘT MẪU 01 TRANG 12 CV 1134)
  planDocChildren.push(h1('IV. DANH MỤC CÁC CUỘC KIỂM TRA'));

  // 7 cột chuẩn Mẫu 01 trang 12: tổng = 480 + 2525 + 1650 + 1150 + 1000 + 1450 + 1100 = 9355 dxa
  const catCols = [480, 2525, 1650, 1150, 1000, 1450, 1100];
  const catHeaders = [
    'TT',
    'Nội dung kiểm tra',
    'Đối tượng kiểm tra',
    'Thời gian tiến hành',
    'Hình thức kiểm tra',
    'Người phụ trách',
    'Ghi chú',
  ];

  const catRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: catHeaders.map((hText, idx) =>
        new TableCell({
          width: { size: catCols[idx], type: WidthType.DXA },
          borders: TABLE_CELL_BORDER_GRID,
          margins: TABLE_CELL_MARGINS_DATA,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
              children: [
                new TextRun({
                  text: hText,
                  bold: true,
                  font: 'Times New Roman',
                  size: FONT_SIZES.TABLE_COMPACT,
                }),
              ],
            }),
          ],
        })
      ),
    }),
  ];

  MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.forEach((item, idx) => {
    const vals = [
      String(idx + 1),
      item.title,
      item.target,
      `${item.month}\n(${item.timeframe})`,
      inferInspectionFormat(item),
      formatFormalLead(item.leadInspector),
      item.campus,
    ];
    catRows.push(
      new TableRow({
        children: vals.map((val, colIdx) =>
          new TableCell({
            width: { size: catCols[colIdx], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: val.split('\n').map(
              (line, lIdx) =>
                new Paragraph({
                  alignment: colIdx === 0 || colIdx === 3 || colIdx === 4 ? AlignmentType.CENTER : AlignmentType.LEFT,
                  spacing: { line: 240, lineRule: LineRuleType.AUTO, before: lIdx === 0 ? 20 : 0, after: 20 },
                  children: [
                    new TextRun({
                      text: line,
                      bold: colIdx === 1 && lIdx === 0,
                      italics: colIdx === 3 && lIdx === 1,
                      font: 'Times New Roman',
                      size: FONT_SIZES.TABLE_COMPACT,
                    }),
                  ],
                })
            ),
          })
        ),
      })
    );
  });

  planDocChildren.push(
    new Table({
      layout: TableLayoutType.FIXED,
      columnWidths: catCols,
      width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
      rows: catRows,
    }),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Sở GDĐT Đồng Tháp (Phòng TCCB, để báo cáo);',
      'Đảng ủy, UBND xã Đốc Binh Kiều (để báo cáo);',
      'Ban Giám hiệu, Ban KTNB (để thực hiện);',
      'Các Tổ chuyên môn, Tổ Văn phòng (để thực hiện);',
      'Niêm yết bảng tin và Website trường (để công khai);',
      'Lưu: VT, Hồ sơ Ban KTNB.',
    ])
  );

  // ===========================================================================
  // PHỤ LỤC 1: ĐẶC ĐIỂM TÌNH HÌNH ĐƠN VỊ, QUY MÔ 03 ĐIỂM TRƯỜNG & DỰ TRÙ KINH PHÍ
  // ===========================================================================
  planDocChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      pageBreakBefore: true,
      keepNext: true,
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({ text: 'PHỤ LỤC 1', bold: true, font: 'Times New Roman', size: FONT_SIZES.TITLE_SUBJECT }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: 'ĐẶC ĐIỂM TÌNH HÌNH NHÀ TRƯỜNG VÀ DỰ TRÙ KINH PHÍ HOẠT ĐỘNG KTNB',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.TITLE_SUBJECT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 140 },
      children: [
        new TextRun({
          text: '(Kèm theo Kế hoạch số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều)',
          italics: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY_SMALL,
        }),
      ],
    }),
    h1('I. KHÁI QUÁT QUY MÔ TRƯỜNG LỚP, HỌC SINH, ĐỘI NGŨ VÀ CƠ SỞ VẬT CHẤT'),
    h2('1. Quy mô lớp học và học sinh tại 03 điểm trường'),
    p(
      'Năm học 2026 - 2027, Trường THCS và THPT Đốc Binh Kiều vận hành quy mô liên cấp gồm 53 lớp học với 2.111 học sinh tại 03 điểm trường trên địa bàn xã Đốc Binh Kiều:'
    )
  );

  SCHOOL_INSPECTION_BACKGROUND.studentScale.campusBreakdown.forEach((cp, idx) => {
    planDocChildren.push(
      p(
        `1.${idx + 1}. ${cp.campusName}: Địa chỉ tại ${cp.address}; quy mô ${cp.classesCount} lớp với ${cp.studentsCount} học sinh (${cp.grades}). Đặc điểm: ${cp.specialFeatures}`
      )
    );
  });

  planDocChildren.push(
    h2('2. Đội ngũ cán bộ, giáo viên, nhân viên'),
    p(
      `- Tổng số cán bộ quản lý, giáo viên, nhân viên toàn trường: 120 người (Nữ: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.femaleCount}, Nam: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.maleCount}); Đảng viên: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.partyMembersCount}/120 đồng chí (tỷ lệ ${((85 / 120) * 100).toFixed(1)}%).`
    ),
    p(
      '- Trình độ đào tạo: 100% cán bộ, giáo viên đạt chuẩn theo Luật Giáo dục năm 2019; có 09 cán bộ, giáo viên có trình độ Thạc sĩ.'
    ),
    p('- Cơ cấu tổ chức gồm Ban Giám hiệu và 07 tổ (06 tổ chuyên môn, 01 tổ văn phòng):')
  );
  SCHOOL_INSPECTION_BACKGROUND.staffScale.departmentCounts.forEach((d) => {
    planDocChildren.push(p(`+ ${d.name}: ${d.count} thành viên. Phụ trách: ${d.head}.`));
  });

  planDocChildren.push(
    h2('3. Cơ sở vật chất, thiết bị dạy học'),
    p('- Phòng học: 53 phòng học kiên cố và bán kiên cố bố trí đủ cho 53 lớp học tại 03 điểm trường.'),
    p(
      '- Phòng chức năng và bộ môn: Hệ thống phòng thí nghiệm thực hành Lý - Hóa - Sinh, phòng máy vi tính có kết nối mạng Internet an toàn, phòng bộ môn ngoại ngữ, âm nhạc, mỹ thuật và phòng đa năng phục vụ dạy học.'
    ),
    p(
      '- Thư viện, Y tế và An toàn: 03 phòng thư viện, 03 phòng y tế học đường có tủ thuốc sơ cấp cứu; trang bị đầy đủ phương tiện phòng cháy chữa cháy và camera giám sát an ninh tại các điểm trường.'
    ),
    h1('II. ĐÁNH GIÁ THUẬN LỢI VÀ KHÓ KHĂN'),
    h2('1. Thuận lợi')
  );
  SCHOOL_INSPECTION_BACKGROUND.strengths.forEach((s) => planDocChildren.push(p(`- ${s}`)));
  planDocChildren.push(h2('2. Khó khăn'));
  SCHOOL_INSPECTION_BACKGROUND.challenges.forEach((c) => planDocChildren.push(p(`- ${c}`)));

  planDocChildren.push(
    h1('III. DỰ TRÙ KINH PHÍ CHO HOẠT ĐỘNG KIỂM TRA NỘI BỘ'),
    p(
      '1. Chế độ chi thực hiện căn cứ Quy chế chi tiêu nội bộ năm học 2026 - 2027 đã được Hội nghị viên chức, người lao động thông qua.'
    ),
    p(
      '2. Nguồn kinh phí: Trích từ nguồn kinh phí hoạt động thường xuyên của nhà trường và các nguồn kinh phí hợp pháp khác.'
    ),
    p(
      '3. Nội dung chi: Phụ cấp kiêm nhiệm/làm việc ngoài giờ, công tác phí đi lại giữa 03 điểm trường, văn phòng phẩm in ấn biểu mẫu và lưu trữ hồ sơ kiểm tra theo từng đợt.'
    )
  );

  // ===========================================================================
  // PHỤ LỤC 2: NỘI DUNG CHI TIẾT, TIÊU CHUẨN & MINH CHỨNG 11 LĨNH VỰC KIỂM TRA
  // ===========================================================================
  planDocChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      pageBreakBefore: true,
      keepNext: true,
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({ text: 'PHỤ LỤC 2', bold: true, font: 'Times New Roman', size: FONT_SIZES.TITLE_SUBJECT }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: 'NỘI DUNG CHI TIẾT, TIÊU CHUẨN KIỂM TRA VÀ HỒ SƠ MINH CHỨNG THEO 11 LĨNH VỰC',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.TITLE_SUBJECT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 140 },
      children: [
        new TextRun({
          text: '(Kèm theo Kế hoạch số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều)',
          italics: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY_SMALL,
        }),
      ],
    })
  );

  DETAILED_INSPECTION_PILLARS_UNABRIDGED.forEach((pillar) => {
    planDocChildren.push(h1(`${pillar.orderNumber}. ${pillar.domainName}`));
    planDocChildren.push(h2(`${pillar.orderNumber}.1. Đối tượng và lực lượng kiểm tra:`));
    planDocChildren.push(
      p(`- Đối tượng: ${pillar.targetsDetail.join('; ')}.`),
      p(
        `- Lực lượng kiểm tra: Trưởng đoàn: ${pillar.inspectionForce.lead}; Phó Trưởng đoàn: ${pillar.inspectionForce.deputies.join(', ')}; Thành viên: ${pillar.inspectionForce.members.join(', ')}.`
      ),
      p(
        `- Hình thức, chỉ tiêu và thời gian: Toàn diện (${pillar.formatsAndMetrics.comprehensiveRate}); Chuyên đề (${pillar.formatsAndMetrics.thematicRate}); Đột xuất (${pillar.formatsAndMetrics.surpriseRate}); Thời gian: ${pillar.formatsAndMetrics.implementationTime}.`
      )
    );
    planDocChildren.push(h2(`${pillar.orderNumber}.2. Nội dung và tiêu chuẩn kiểm tra cụ thể:`));
    pillar.breakdownSections.forEach((sec) => {
      planDocChildren.push(p(sec.heading, true));
      sec.items.forEach((it) => planDocChildren.push(p(`+ ${it}`)));
    });
    planDocChildren.push(h2(`${pillar.orderNumber}.3. Hồ sơ minh chứng và sản phẩm lưu trữ:`));
    pillar.deliverableRecords.forEach((dr) => planDocChildren.push(p(`- ${dr}`)));
  });

  // ===========================================================================
  // PHỤ LỤC 3: CHI TIẾT NHIỆM VỤ 29 ĐỢT KIỂM TRA & DANH MỤC LƯU TRỮ HỒ SƠ
  // ===========================================================================
  planDocChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      pageBreakBefore: true,
      keepNext: true,
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({ text: 'PHỤ LỤC 3', bold: true, font: 'Times New Roman', size: FONT_SIZES.TITLE_SUBJECT }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: 'CHI TIẾT NHIỆM VỤ 29 ĐỢT KIỂM TRA VÀ DANH MỤC LƯU TRỮ HỒ SƠ KTNB',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.TITLE_SUBJECT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 140 },
      children: [
        new TextRun({
          text: '(Kèm theo Kế hoạch số 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều)',
          italics: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY_SMALL,
        }),
      ],
    }),
    h1('I. CHI TIẾT NHIỆM VỤ CỤ THỂ TỪNG ĐỢT KIỂM TRA (TỪ THÁNG 9/2026 ĐẾN THÁNG 8/2027)')
  );

  // Bảng chi tiết 6 cột: 480 + 1250 + 3225 + 1600 + 1500 + 1300 = 9355 dxa
  const detailCols = [480, 1250, 3225, 1600, 1500, 1300];
  const detailHeaders = [
    'Đợt',
    'Thời gian',
    'Nhiệm vụ kiểm tra chi tiết',
    'Đối tượng & Điểm trường',
    'Đoàn kiểm tra',
    'Sản phẩm / Hồ sơ',
  ];

  const detailRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: detailHeaders.map((hText, idx) =>
        new TableCell({
          width: { size: detailCols[idx], type: WidthType.DXA },
          borders: TABLE_CELL_BORDER_GRID,
          margins: TABLE_CELL_MARGINS_DATA,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
              children: [new TextRun({ text: hText, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
            }),
          ],
        })
      ),
    }),
  ];

  MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.forEach((item, idx) => {
    detailRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: detailCols[0], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: String(idx + 1).padStart(2, '0'), font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: detailCols[1], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: item.month, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: item.timeframe, italics: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: detailCols[2], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { before: 20, after: 30, line: 240, lineRule: LineRuleType.AUTO },
                children: [new TextRun({ text: item.title, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              ...item.specificTasks.map(
                (t) =>
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { before: 0, after: 20, line: 240, lineRule: LineRuleType.AUTO },
                    children: [new TextRun({ text: `- ${t}`, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
                  })
              ),
            ],
          }),
          new TableCell({
            width: { size: detailCols[3], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: item.target, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: `(${item.campus})`, italics: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: detailCols[4], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: formatFormalLead(item.leadInspector), bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: item.teamMembers.slice(0, 2).join(', '), font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: detailCols[5], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: item.expectedOutput, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
        ],
      })
    );
  });

  planDocChildren.push(
    new Table({
      layout: TableLayoutType.FIXED,
      columnWidths: detailCols,
      width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
      rows: detailRows,
    }),
    h1('II. DANH MỤC HỒ SƠ LƯU TRỮ CỦA MỘT CUỘC KIỂM TRA (THEO NĐ 30/2020/NĐ-CP & TT 08/2025/TT-BGDĐT)')
  );

  INSPECTION_ARCHIVE_CHECKLIST.forEach((arch, idx) => {
    planDocChildren.push(
      p(`${idx + 1}. **${arch.item}** (${arch.required ? 'Bắt buộc' : 'Nếu có'}): ${arch.note}.`)
    );
  });

  const planPath = path.join(downloadsDir, 'KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
  fs.writeFileSync(planPath, await Packer.toBuffer(makeDoc(planDocChildren)));
  console.log('Saved Official Plan + Decision + Appendices DOCX:', planPath);

  // ===========================================================================
  // 2. QUYẾT ĐỊNH THÀNH LẬP BAN KIỂM TRA NỘI BỘ (MẪU 02 - TRANG 13 CV 1134)
  // ===========================================================================
  console.log('Generating Inspection Committee Decision DOCX (Mẫu 02 - CV 1134)...');
  const commCols = [550, 2150, 2250, 1650, 2755]; // 9355 dxa

  const committeeChildren: DocChild[] = [
    createAdminDocHeaderTable(
      'SỞ GDĐT TỈNH ĐỒNG THÁP',
      'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
      'Số: 49/QĐ-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày 15 tháng 10 năm 2026'
    ),
    ...createDocumentTitleBlock(
      'QUYẾT ĐỊNH',
      'Về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027'
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 40, after: 140 },
      children: [
        new TextRun({
          text: 'HIỆU TRƯỞNG TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    createLegalBasisParagraph(
      'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học'
    ),
    createLegalBasisParagraph(
      'Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05 tháng 8 năm 2025 của Chính phủ về hoạt động kiểm tra chuyên ngành'
    ),
    createLegalBasisParagraph(
      'Căn cứ Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của Ủy ban nhân dân tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều'
    ),
    createLegalBasisParagraph(
      'Căn cứ Công văn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc hướng dẫn thực hiện công tác kiểm tra nội bộ năm học 2025 - 2026'
    ),
    createLegalBasisParagraph(
      'Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027'
    ),
    createLegalBasisParagraph(
      'Căn cứ Quyết định số 48/QĐ-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều về việc ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027'
    ),
    createLegalBasisParagraph(
      'Xét đề nghị của Phó Hiệu trưởng phụ trách chuyên môn và Tổ trưởng Tổ Văn phòng',
      true,
      true
    ),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 160, after: 120 },
      children: [
        new TextRun({ text: 'QUYẾT ĐỊNH:', bold: true, font: 'Times New Roman', size: FONT_SIZES.BODY }),
      ],
    }),
    p(
      '**Điều 1.** Thành lập Ban kiểm tra nội bộ năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều, gồm 22 ông (bà) có tên sau đây:'
    ),
    ...SCHOOL_INSPECTION_COMMITTEE.map((m, idx) =>
      p(
        `${m.orderNumber}. ${m.fullName}, Chức vụ: ${m.roleInSchool}, ${m.roleInCommittee}${idx === SCHOOL_INSPECTION_COMMITTEE.length - 1 ? '.' : ';'}`
      )
    ),
    p(
      '**Điều 2.** Ban kiểm tra nội bộ có nhiệm vụ xây dựng kế hoạch tiến hành kiểm tra cho từng đợt theo Kế hoạch số 48/KH-THCS&THPTĐBK; tổ chức kiểm tra, lập biên bản kiểm tra, báo cáo kết quả và tham mưu Hiệu trưởng ban hành thông báo kết quả kiểm tra; theo dõi việc khắc phục sau kiểm tra và thực hiện nhiệm vụ cụ thể theo Phụ lục phân công kèm theo.'
    ),
    p('**Điều 3.** Quyết định này có hiệu lực kể từ ngày ký đến hết năm học 2026 - 2027.'),
    p(
      '**Điều 4.** Các ông (bà) có tên tại Điều 1 và các bộ phận, tổ chức, cá nhân là đối tượng kiểm tra chịu trách nhiệm thi hành Quyết định này./.'
    ),
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Như Điều 4;',
      'Sở Giáo dục và Đào tạo (để báo cáo);',
      'Phòng TCCB Sở GDĐT (để báo cáo);',
      'Lưu: VT.',
    ]),
    // Phụ lục: Bảng phân công nhiệm vụ cụ thể 22 thành viên Ban KTNB
    new Paragraph({
      alignment: AlignmentType.CENTER,
      pageBreakBefore: true,
      keepNext: true,
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({
          text: 'PHỤ LỤC PHÂN CÔNG NHIỆM VỤ BAN KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: '(Kèm theo Quyết định số 49/QĐ-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều)',
          italics: true,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY_SMALL,
        }),
      ],
    }),
    new Table({
      layout: TableLayoutType.FIXED,
      columnWidths: commCols,
      width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
      rows: [
        new TableRow({
          tableHeader: true,
          children: ['TT', 'Họ và tên', 'Chức vụ tại trường', 'Nhiệm vụ trong Ban', 'Phân công trách nhiệm'].map(
            (hText, idx) =>
              new TableCell({
                width: { size: commCols[idx], type: WidthType.DXA },
                borders: TABLE_CELL_BORDER_GRID,
                margins: TABLE_CELL_MARGINS_DATA,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
                    children: [
                      new TextRun({
                        text: hText,
                        bold: true,
                        font: 'Times New Roman',
                        size: FONT_SIZES.TABLE_COMPACT,
                      }),
                    ],
                  }),
                ],
              })
          ),
        }),
        ...SCHOOL_INSPECTION_COMMITTEE.map(
          (m) =>
            new TableRow({
              children: [
                String(m.orderNumber),
                m.fullName,
                m.roleInSchool,
                m.roleInCommittee,
                m.assignedDuty,
              ].map((val, colIdx) =>
                new TableCell({
                  width: { size: commCols[colIdx], type: WidthType.DXA },
                  borders: TABLE_CELL_BORDER_GRID,
                  margins: TABLE_CELL_MARGINS_DATA,
                  children: [
                    new Paragraph({
                      alignment: colIdx === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
                      children: [
                        new TextRun({
                          text: val,
                          bold: colIdx === 1 || colIdx === 3,
                          font: 'Times New Roman',
                          size: FONT_SIZES.TABLE_COMPACT,
                        }),
                      ],
                    }),
                  ],
                })
              ),
            })
        ),
      ],
    }),
  ];

  const committeePath = path.join(downloadsDir, 'QUYET_DINH_BAN_KIEM_TRA_NOI_BO_2026_2027.docx');
  fs.writeFileSync(committeePath, await Packer.toBuffer(makeDoc(committeeChildren)));
  console.log('Saved Committee Decision DOCX:', committeePath);

  console.log('Successfully generated Plan Issuance Decision (Mẫu 01), Concise Plan + 3 Appendices, and Committee Decision (Mẫu 02) strictly per CV 1134 & CV 3953!');
}

generateAllInspectionDocuments().catch(console.error);

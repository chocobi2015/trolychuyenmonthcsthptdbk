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
} from '../src/data/detailedInspectionPlanFullText';
import { SCHOOL_INSPECTION_COMMITTEE } from '../src/data/internalInspectionData';
import {
  DOCX_PAGE_SETUP,
  FONT_SIZES,
  INDENT_FIRST_LINE,
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

/**
 * Đoạn văn thân bài chuẩn Nghị định 30/2020/NĐ-CP:
 * - Cỡ chữ 14pt Times New Roman đồng nhất
 * - Căn đều 2 bên (JUSTIFIED)
 * - CHỈ thụt đầu dòng thứ nhất 1.0cm (567 dxa), từ dòng thứ 2 thẳng hàng sát 2 lề giấy (left = 0)
 * - Giãn dòng đồng bộ 1.15
 */
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
  return createArticleHeading(text, { spacingBefore: 200, spacingAfter: 80 });
}

function h2(text: string): Paragraph {
  return createArticleHeading(text, { spacingBefore: 160, spacingAfter: 60 });
}

function h3(text: string): Paragraph {
  return createArticleHeading(text, { spacingBefore: 120, spacingAfter: 50 });
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

export async function generateAllInspectionDocuments() {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // ===========================================================================
  // 1. KẾ HOẠCH CÔNG TÁC KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027 (CHUẨN NĐ 30)
  // ===========================================================================
  console.log('Generating School Internal Inspection Plan DOCX (Nghị định 30/2020/NĐ-CP)...');

  const planDocChildren: (Paragraph | Table)[] = [];

  // Quốc hiệu, Tiêu ngữ, Cơ quan ban hành (chuẩn tuyệt đối không đè chữ, không xuống dòng sai)
  planDocChildren.push(
    createAdminDocHeaderTable(
      'SỞ GDĐT TỈNH ĐỒNG THÁP',
      'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
      'Số: 48/KH-THCS&THPTĐBK',
      'Đốc Binh Kiều, ngày 15 tháng 10 năm 2026'
    )
  );

  // Tiêu đề văn bản sạch sẽ, trang trọng (không có ghi chú trong ngoặc đơn thừa thải)
  planDocChildren.push(
    ...createDocumentTitleBlock(
      'KẾ HOẠCH',
      'Công tác kiểm tra nội bộ năm học 2026 - 2027'
    )
  );

  // Căn cứ pháp lý: CHỮ ĐỨNG THƯỜNG (không in nghiêng), thụt đầu dòng 1.0cm, left = 0
  const legalBases = [
    'Căn cứ Luật Giáo dục ngày 14 tháng 6 năm 2019',
    'Căn cứ Luật Thanh tra ngày 14 tháng 11 năm 2022',
    'Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05 tháng 8 năm 2025 của Chính phủ về hoạt động kiểm tra chuyên ngành',
    'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học',
    'Căn cứ Thông tư số 22/2021/TT-BGDĐT ngày 20 tháng 7 năm 2021 của Bộ Giáo dục và Đào tạo quy định về đánh giá học sinh trung học cơ sở và học sinh trung học phổ thông',
    'Căn cứ Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của Ủy ban nhân dân tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều',
    'Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027',
    'Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục',
    'Căn cứ Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25 tháng 9 năm 2026 của Trường THCS và THPT Đốc Binh Kiều',
  ];
  legalBases.forEach((lb, idx) => {
    planDocChildren.push(createLegalBasisParagraph(lb, idx === legalBases.length - 1, true));
  });

  planDocChildren.push(
    p('Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch công tác kiểm tra nội bộ năm học 2026 - 2027 với các nội dung cụ thể như sau:')
  );

  // PHẦN A. ĐẶC ĐIỂM TÌNH HÌNH
  planDocChildren.push(h1('A. ĐẶC ĐIỂM TÌNH HÌNH CỦA NHÀ TRƯỜNG'));
  planDocChildren.push(h2('I. Khái quát quy mô trường lớp, học sinh và đội ngũ'));

  planDocChildren.push(h3('1. Quy mô các khối lớp học và số liệu huy động học sinh'));
  planDocChildren.push(
    p(
      'Năm học 2026 - 2027, Trường THCS và THPT Đốc Binh Kiều vận hành quy mô liên cấp gồm 53 lớp học với tổng số 2.111 học sinh tại 03 điểm trường trên địa bàn xã Đốc Binh Kiều, cụ thể:'
    )
  );

  SCHOOL_INSPECTION_BACKGROUND.studentScale.campusBreakdown.forEach((cp, idx) => {
    planDocChildren.push(
      p(
        `1.${idx + 1}. ${cp.campusName}: Địa chỉ tại ${cp.address}; quy mô ${cp.classesCount} lớp học với ${cp.studentsCount} học sinh (${cp.grades}). Đặc điểm: ${cp.specialFeatures}`
      )
    );
  });

  planDocChildren.push(h3('2. Đội ngũ cán bộ, giáo viên, nhân viên'));
  planDocChildren.push(
    p(
      `- Tổng số cán bộ quản lý, giáo viên, nhân viên toàn trường: 120 người (Nữ: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.femaleCount}, Nam: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.maleCount}).`
    ),
    p(
      `- Đảng viên Đảng Cộng sản Việt Nam: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.partyMembersCount}/120 đồng chí (đạt tỷ lệ ${((85 / 120) * 100).toFixed(1)}%).`
    ),
    p(
      '- Trình độ đào tạo: 100% cán bộ, giáo viên đạt chuẩn theo Luật Giáo dục năm 2019; có 09 cán bộ, giáo viên có trình độ Thạc sĩ chuyên ngành và quản lý giáo dục.'
    ),
    p('- Cơ cấu tổ chức gồm Ban Giám hiệu và 07 tổ (06 tổ chuyên môn, 01 tổ văn phòng):')
  );

  SCHOOL_INSPECTION_BACKGROUND.staffScale.departmentCounts.forEach((d) => {
    planDocChildren.push(p(`+ ${d.name}: ${d.count} thành viên. Phụ trách: ${d.head}.`));
  });

  planDocChildren.push(h3('3. Cơ sở vật chất, trang thiết bị dạy học hiện có tại 03 điểm trường'));
  planDocChildren.push(
    p('- Phòng học: Toàn trường có 53 phòng học kiên cố và bán kiên cố bố trí đủ cho 53 lớp học.'),
    p(
      '- Phòng chức năng và bộ môn: Có 22 phòng bộ môn (gồm 08 phòng thí nghiệm thực hành Lý - Hóa - Sinh, 05 phòng máy vi tính với tổng cộng 165 máy tính có kết nối mạng Internet an toàn, 03 phòng học ngoại ngữ, phòng âm nhạc, mỹ thuật, đa năng).'
    ),
    p(
      '- Bộ phận Thư viện: 03 phòng thư viện tại 03 điểm trường với hơn 15.000 bản sách giáo khoa, sách tham khảo, sách nghiệp vụ và phần mềm thư viện số.'
    ),
    p(
      '- Y tế học đường và phòng cháy chữa cháy: 03 phòng y tế học đường có tủ thuốc sơ cấp cứu học sinh; trang bị 13 tủ chữa cháy vách tường, 03 máy bơm chữa cháy công suất lớn, 48 bình chữa cháy và 38 camera giám sát an ninh.'
    )
  );

  planDocChildren.push(h2('II. Đánh giá thuận lợi và khó khăn'));
  planDocChildren.push(h3('1. Thuận lợi'));
  SCHOOL_INSPECTION_BACKGROUND.strengths.forEach((s) => planDocChildren.push(p(`- ${s}`)));

  planDocChildren.push(h3('2. Khó khăn'));
  SCHOOL_INSPECTION_BACKGROUND.challenges.forEach((c) => planDocChildren.push(p(`- ${c}`)));

  // PHẦN B. MỤC ĐÍCH, YÊU CẦU
  planDocChildren.push(h1('B. MỤC ĐÍCH, YÊU CẦU CỦA CÔNG TÁC KIỂM TRA NỘI BỘ'));
  planDocChildren.push(h2('I. Mục đích'));
  SCHOOL_INSPECTION_OBJECTIVES.purposes.forEach((pu) => planDocChildren.push(p(`- ${pu}`)));

  planDocChildren.push(h2('II. Yêu cầu'));
  SCHOOL_INSPECTION_OBJECTIVES.requirements.forEach((req) => planDocChildren.push(p(`- ${req}`)));

  // PHẦN C. NỘI DUNG KIỂM TRA CỤ THỂ
  planDocChildren.push(h1('C. NỘI DUNG KIỂM TRA CỤ THỂ'));
  planDocChildren.push(
    p(
      'Công tác kiểm tra nội bộ nhà trường năm học 2026 - 2027 được triển khai toàn diện trên 11 nhóm lĩnh vực trọng tâm, bảo đảm bao quát đầy đủ các hoạt động giáo dục ở cả hai cấp THCS và THPT theo quy định của Bộ Giáo dục và Đào tạo và Sở Giáo dục và Đào tạo tỉnh Đồng Tháp:'
    )
  );

  DETAILED_INSPECTION_PILLARS_UNABRIDGED.forEach((pillar) => {
    planDocChildren.push(h2(`${pillar.orderNumber}. ${pillar.domainName}`));

    planDocChildren.push(h3(`${pillar.orderNumber}.1. Đối tượng kiểm tra:`));
    pillar.targetsDetail.forEach((t) => planDocChildren.push(p(`- ${t}`)));

    planDocChildren.push(h3(`${pillar.orderNumber}.2. Lực lượng tham gia kiểm tra:`));
    planDocChildren.push(
      p(`- Trưởng đoàn kiểm tra: ${pillar.inspectionForce.lead}.`),
      p(`- Phó Trưởng đoàn: ${pillar.inspectionForce.deputies.join(', ')}.`),
      p(`- Các thành viên: ${pillar.inspectionForce.members.join(', ')}.`)
    );

    planDocChildren.push(h3(`${pillar.orderNumber}.3. Hình thức, chỉ tiêu và thời gian kiểm tra:`));
    planDocChildren.push(
      p(`- Kiểm tra toàn diện: ${pillar.formatsAndMetrics.comprehensiveRate}`),
      p(`- Kiểm tra chuyên đề: ${pillar.formatsAndMetrics.thematicRate}`),
      p(`- Kiểm tra đột xuất: ${pillar.formatsAndMetrics.surpriseRate}`),
      p(`- Tần suất thường xuyên: ${pillar.formatsAndMetrics.routineFrequency}`),
      p(`- Thời gian thực hiện: ${pillar.formatsAndMetrics.implementationTime}`)
    );

    planDocChildren.push(h3(`${pillar.orderNumber}.4. Nội dung và tiêu chuẩn kiểm tra:`));
    pillar.breakdownSections.forEach((sec) => {
      planDocChildren.push(p(sec.heading, true));
      sec.items.forEach((it) => planDocChildren.push(p(`+ ${it}`)));
    });

    planDocChildren.push(h3(`${pillar.orderNumber}.5. Sản phẩm hồ sơ lưu trữ sau kiểm tra:`));
    pillar.deliverableRecords.forEach((dr) => planDocChildren.push(p(`- ${dr}`)));
  });

  // PHẦN D. DỰ TRÙ KINH PHÍ
  planDocChildren.push(h1('D. DỰ TRÙ KINH PHÍ CHO HOẠT ĐỘNG KIỂM TRA NỘI BỘ'));
  planDocChildren.push(
    p(
      '1. Chế độ chi cho công tác kiểm tra nội bộ nhà trường được thực hiện căn cứ vào Quy chế chi tiêu nội bộ năm học 2026 - 2027 đã được Hội nghị cán bộ, viên chức, người lao động nhà trường biểu quyết thông qua.'
    ),
    p(
      '2. Nguồn kinh phí: Trích từ nguồn kinh phí hoạt động thường xuyên của nhà trường và các nguồn kinh phí hợp pháp khác.'
    ),
    p(
      '3. Định mức chi: Chi trả phụ cấp làm việc ngoài giờ, công tác phí đi lại giữa các điểm trường, chi nước uống và văn phòng phẩm in ấn hồ sơ, biểu mẫu kiểm tra theo quyết định thành lập từng đoàn kiểm tra cụ thể của Hiệu trưởng.'
    )
  );

  // PHẦN E. TỔ CHỨC THỰC HIỆN
  planDocChildren.push(h1('E. TỔ CHỨC THỰC HIỆN VÀ PHÂN CÔNG TRÁCH NHIỆM'));
  planDocChildren.push(h2('I. Trách nhiệm của Lãnh đạo nhà trường'));
  planDocChildren.push(
    p('1. Hiệu trưởng (Ông Lê Thanh Cường):', true),
    p(
      '- Chịu trách nhiệm toàn diện trước Giám đốc Sở Giáo dục và Đào tạo về công tác kiểm tra nội bộ của đơn vị; ban hành Quyết định thành lập Ban kiểm tra nội bộ, Quyết định thành lập các đoàn kiểm tra theo từng chuyên đề; phê duyệt Kế hoạch tiến hành kiểm tra (Mẫu 03) và ký ban hành Thông báo kết luận kiểm tra (Mẫu 06).'
    ),
    p(
      '- Trực tiếp phụ trách kiểm tra công tác quản lý tài chính, tài sản công, phòng chống tham nhũng, tiếp công dân, giải quyết khiếu nại, tố cáo và công tác an toàn trường học.'
    ),
    p('2. Phó Hiệu trưởng Thường trực (Ông Nguyễn Minh Trí):', true),
    p(
      '- Thường trực Ban Kiểm tra nội bộ; trực tiếp phụ trách theo dõi công tác kiểm tra quy chế chuyên môn toàn trường và Điểm chính THPT (Khối 10, 11, 12); làm Trưởng các đoàn kiểm tra hoạt động sư phạm nhà giáo, kiểm tra khảo thí, ôn thi tốt nghiệp THPT và quản lý dạy thêm, học thêm.'
    ),
    p('3. Phó Hiệu trưởng (Ông Phan Thanh Thảo):', true),
    p(
      '- Phụ trách công tác kiểm tra nội bộ tại Điểm trường THCS Đốc Binh Kiều (24 lớp, 980 học sinh); trực tiếp làm Trưởng các đoàn kiểm tra chuyên môn cấp THCS, công tác chủ nhiệm lớp, giáo dục hòa nhập cho học sinh khuyết tật và hoạt động Đội Thiếu niên Tiền phong Hồ Chí Minh.'
    ),
    p('4. Phó Hiệu trưởng (Ông Nguyễn Thanh Tòng):', true),
    p(
      '- Phụ trách công tác kiểm tra nội bộ tại Điểm trường THCS Tân Kiều (15 lớp, 602 học sinh); trực tiếp làm Trưởng các đoàn kiểm tra việc thực hiện Chương trình GDPT 2018 tại cơ sở Tân Kiều, quản lý tài sản, thiết bị dạy học và an toàn giao thông.'
    )
  );

  planDocChildren.push(h2('II. Trách nhiệm của các Tổ chuyên môn, Đoàn thể và Cá nhân'));
  planDocChildren.push(
    p(
      '1. Các Tổ trưởng chuyên môn, Tổ trưởng Văn phòng: Xây dựng kế hoạch kiểm tra nội bộ của tổ; phân công tổ phó và giáo viên cốt cán tham gia các đoàn kiểm tra theo điều động của Hiệu trưởng; lưu trữ biên bản kiểm tra cấp tổ.'
    ),
    p(
      '2. Ban Thanh tra nhân dân: Cử thành viên tham gia giám sát các cuộc kiểm tra tài chính, tài sản, quy chế dân chủ và tiếp công dân; phối hợp xử lý các kiến nghị sau kiểm tra.'
    ),
    p(
      '3. Công đoàn cơ sở, Đoàn Thanh niên, Liên đội: Phối hợp kiểm tra nề nếp, kỷ cương học sinh, phong trào thi đua và văn hóa công vụ của cán bộ, đoàn viên.'
    ),
    p(
      '4. Cán bộ, giáo viên, nhân viên là đối tượng kiểm tra: Có trách nhiệm chuẩn bị đầy đủ hồ sơ, sổ sách, giáo án, tài liệu minh chứng theo yêu cầu của đoàn kiểm tra; tạo điều kiện thuận lợi để đoàn làm việc; ký biên bản kiểm tra và thực hiện nghiêm túc các kiến nghị khắc phục.'
    )
  );

  planDocChildren.push(h2('III. Quy trình kiểm tra và chế độ báo cáo Sở Giáo dục và Đào tạo'));
  planDocChildren.push(
    p('1. Quy trình tiến hành kiểm tra 03 bước theo Hướng dẫn số 1134/SGDĐT-TCCB:'),
    p(
      '+ Bước 1 (Chuẩn bị): Ban hành Quyết định kiểm tra (Mẫu 02) và Kế hoạch tiến hành kiểm tra (Mẫu 03); thông báo cho đối tượng kiểm tra trước ít nhất 03 ngày (trừ kiểm tra đột xuất).'
    ),
    p(
      '+ Bước 2 (Tiến hành): Kiểm tra hồ sơ minh chứng, dự giờ, khảo sát thực tế; lập Biên bản kiểm tra (Mẫu 04) có chữ ký của Trưởng đoàn và đối tượng kiểm tra.'
    ),
    p(
      '+ Bước 3 (Kết thúc): Trưởng đoàn lập Báo cáo kết quả kiểm tra (Mẫu 05) trình Hiệu trưởng; Hiệu trưởng xem xét ký ban hành Thông báo kết luận kiểm tra (Mẫu 06) gửi đối tượng thực hiện.'
    ),
    p('2. Chế độ thông tin, báo cáo Sở Giáo dục và Đào tạo (qua Phòng Tổ chức cán bộ):'),
    p('- Mốc 1: Gửi Kế hoạch kiểm tra nội bộ và Quyết định thành lập Ban Kiểm tra nội bộ trước ngày 31 tháng 10 năm 2026.'),
    p('- Mốc 2: Gửi Báo cáo sơ kết công tác kiểm tra nội bộ học kỳ I trước ngày 20 tháng 01 năm 2027.'),
    p(
      '- Mốc 3: Gửi Báo cáo tổng kết công tác kiểm tra nội bộ năm học và kết quả tự đánh giá chấm điểm thi đua trước ngày 18 tháng 5 năm 2027./.'
    )
  );

  // Ký duyệt & Nơi nhận chuẩn Nghị định 30 (chính quyền 2 cấp: xã Đốc Binh Kiều)
  planDocChildren.push(
    new Paragraph({ spacing: { before: 100, after: 40 } }),
    createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
      'Sở GDĐT Đồng Tháp (Phòng TCCB, để báo cáo);',
      'Đảng ủy, UBND xã Đốc Binh Kiều (để báo cáo);',
      'Ban Giám hiệu nhà trường (để chỉ đạo);',
      'Ban Kiểm tra nội bộ (để thực hiện);',
      'Các Tổ chuyên môn, Tổ Văn phòng (để thực hiện);',
      'Ban TTND, CĐCS, Đoàn - Đội (để phối hợp);',
      'Niêm yết bảng tin và Website trường (để công khai);',
      'Lưu: VT, Hồ sơ Ban KTNB.',
    ])
  );

  // PHỤ LỤC LỊCH KIỂM TRA NỘI BỘ 12 THÁNG (Tổng chiều rộng chính xác = 9355 dxa)
  planDocChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      pageBreakBefore: true,
      keepNext: true,
      spacing: { before: 120, after: 40 },
      children: [
        new TextRun({ text: 'PHỤ LỤC', bold: true, font: 'Times New Roman', size: FONT_SIZES.TITLE_SUBJECT }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: 'LỊCH KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027 (TỪ THÁNG 9/2026 ĐẾN THÁNG 8/2027)',
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.TITLE_SUBJECT,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      keepNext: true,
      spacing: { before: 0, after: 160 },
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

  // Bảng 6 cột chuẩn: tổng = 500 + 1300 + 3055 + 1700 + 1500 + 1300 = 9355 dxa
  const schedCols = [500, 1300, 3055, 1700, 1500, 1300];
  const schedHeaders = [
    'TT',
    'Thời gian',
    'Nội dung kiểm tra',
    'Đối tượng và Điểm trường',
    'Lực lượng kiểm tra',
    'Sản phẩm / Biểu mẫu',
  ];

  const scheduleRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: schedHeaders.map((hText, idx) =>
        new TableCell({
          width: { size: schedCols[idx], type: WidthType.DXA },
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
    scheduleRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: schedCols[0], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
                children: [new TextRun({ text: String(idx + 1), font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: schedCols[1], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
                children: [new TextRun({ text: item.month, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 20 },
                children: [new TextRun({ text: item.timeframe, italics: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: schedCols[2], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 40 },
                children: [new TextRun({ text: item.title, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              ...item.specificTasks.map(
                (t) =>
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 20 },
                    children: [new TextRun({ text: `- ${t}`, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
                  })
              ),
            ],
          }),
          new TableCell({
            width: { size: schedCols[3], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
                children: [new TextRun({ text: item.target, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 20 },
                children: [new TextRun({ text: `(${item.campus})`, italics: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: schedCols[4], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
                children: [new TextRun({ text: item.leadInspector, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 20 },
                children: [new TextRun({ text: item.teamMembers.slice(0, 2).join(', '), font: 'Times New Roman', size: FONT_SIZES.TABLE_COMPACT })],
              }),
            ],
          }),
          new TableCell({
            width: { size: schedCols[5], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
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
      columnWidths: schedCols,
      width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
      rows: scheduleRows,
    })
  );

  const planDoc = new Document({
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
        children: planDocChildren,
      },
    ],
  });

  const planBuffer = await Packer.toBuffer(planDoc);
  const planPath = path.join(downloadsDir, 'KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
  fs.writeFileSync(planPath, planBuffer);
  console.log('Saved Official Plan DOCX:', planPath);

  // ===========================================================================
  // 2. QUYẾT ĐỊNH THÀNH LẬP BAN KIỂM TRA NỘI BỘ (MẪU 02 - CHUẨN NĐ 30)
  // ===========================================================================
  console.log('Generating Inspection Committee Decision DOCX...');
  // Bảng 5 cột chuẩn: 550 + 2150 + 2250 + 1650 + 2755 = 9355 dxa
  const commCols = [550, 2150, 2250, 1650, 2755];

  const committeeDoc = new Document({
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
        children: [
          createAdminDocHeaderTable(
            'SỞ GDĐT TỈNH ĐỒNG THÁP',
            'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
            'Số: 49/QĐ-THCS&THPTĐBK',
            'Đốc Binh Kiều, ngày 15 tháng 10 năm 2026'
          ),
          ...createDocumentTitleBlock(
            'QUYẾT ĐỊNH',
            'Về việc thành lập Ban Kiểm tra nội bộ năm học 2026 - 2027'
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
            'Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục'
          ),
          createLegalBasisParagraph(
            'Theo đề nghị của Phó Hiệu trưởng phụ trách chuyên môn và Tổ trưởng Tổ Văn phòng',
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
            '**Điều 1.** Thành lập Ban Kiểm tra nội bộ Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027 gồm 22 ông (bà) có tên trong danh sách đính kèm, do ông Lê Thanh Cường - Hiệu trưởng làm Trưởng ban.'
          ),
          p(
            '**Điều 2.** Ban Kiểm tra nội bộ có nhiệm vụ xây dựng kế hoạch tiến hành kiểm tra từng đợt theo Kế hoạch số 48/KH-THCS&THPTĐBK của nhà trường; lập biên bản kiểm tra, báo cáo kết quả và tham mưu Hiệu trưởng ban hành thông báo kết luận kiểm tra; theo dõi việc khắc phục sau kiểm tra.'
          ),
          p(
            '**Điều 3.** Quyết định này có hiệu lực kể từ ngày ký đến hết năm học 2026 - 2027. Các Phó Hiệu trưởng, các Tổ trưởng chuyên môn, Tổ trưởng Tổ Văn phòng và các ông (bà) có tên tại Điều 1 chịu trách nhiệm thi hành Quyết định này./.'
          ),

          new Paragraph({ spacing: { before: 100, after: 40 } }),
          createSignatureBlockTable('HIỆU TRƯỞNG', 'Lê Thanh Cường', [
            'Sở GDĐT Đồng Tháp (để báo cáo);',
            'Như Điều 3 (để thực hiện);',
            'Lưu: VT, Hồ sơ Ban KTNB.',
          ]),

          // Danh sách 22 thành viên Ban KTNB
          new Paragraph({
            alignment: AlignmentType.CENTER,
            pageBreakBefore: true,
            keepNext: true,
            spacing: { before: 120, after: 60 },
            children: [
              new TextRun({
                text: 'DANH SÁCH THÀNH VIÊN BAN KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027',
                bold: true,
                font: 'Times New Roman',
                size: FONT_SIZES.BODY,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            keepNext: true,
            spacing: { after: 160 },
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
                      new TableCell({
                        width: { size: commCols[0], type: WidthType.DXA },
                        borders: TABLE_CELL_BORDER_GRID,
                        margins: TABLE_CELL_MARGINS_DATA,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: String(m.orderNumber),
                                font: 'Times New Roman',
                                size: FONT_SIZES.TABLE_COMPACT,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: commCols[1], type: WidthType.DXA },
                        borders: TABLE_CELL_BORDER_GRID,
                        margins: TABLE_CELL_MARGINS_DATA,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: m.fullName,
                                bold: true,
                                font: 'Times New Roman',
                                size: FONT_SIZES.TABLE_COMPACT,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: commCols[2], type: WidthType.DXA },
                        borders: TABLE_CELL_BORDER_GRID,
                        margins: TABLE_CELL_MARGINS_DATA,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: m.roleInSchool,
                                font: 'Times New Roman',
                                size: FONT_SIZES.TABLE_COMPACT,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: commCols[3], type: WidthType.DXA },
                        borders: TABLE_CELL_BORDER_GRID,
                        margins: TABLE_CELL_MARGINS_DATA,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: m.roleInCommittee,
                                bold: true,
                                font: 'Times New Roman',
                                size: FONT_SIZES.TABLE_COMPACT,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: commCols[4], type: WidthType.DXA },
                        borders: TABLE_CELL_BORDER_GRID,
                        margins: TABLE_CELL_MARGINS_DATA,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.LEFT,
                            children: [
                              new TextRun({
                                text: m.assignedDuty,
                                font: 'Times New Roman',
                                size: FONT_SIZES.TABLE_COMPACT,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
              ),
            ],
          }),
        ],
      },
    ],
  });

  const committeeBuffer = await Packer.toBuffer(committeeDoc);
  const committeePath = path.join(downloadsDir, 'QUYET_DINH_BAN_KIEM_TRA_NOI_BO_2026_2027.docx');
  fs.writeFileSync(committeePath, committeeBuffer);
  console.log('Saved Committee Decision DOCX:', committeePath);

  // ===========================================================================
  // 3. TRỌN BỘ 06 BIỂU MẪU NGHIỆP VỤ KIỂM TRA NỘI BỘ (HD 1134)
  // ===========================================================================
  console.log('Generating 6 Forms Appendix DOCX (HD 1134)...');
  const formsDoc = new Document({
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
        children: [
          ...createDocumentTitleBlock(
            'TRỌN BỘ 06 BIỂU MẪU NGHIỆP VỤ KIỂM TRA NỘI BỘ',
            '(Ban hành kèm theo Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp)'
          ),
          p('**MẪU SỐ 01:** Quyết định Ban hành Kế hoạch kiểm tra nội bộ năm học (Kèm Kế hoạch năm học).'),
          p('**MẪU SỐ 02:** Quyết định Thành lập Ban kiểm tra nội bộ năm học (Kèm Danh sách phân công thành viên).'),
          p('**MẪU SỐ 03:** Kế hoạch tiến hành kiểm tra của Tổ (Đoàn) kiểm tra cho từng đợt.'),
          p('**MẪU SỐ 04:** Biên bản kiểm tra (Ghi nhận hiện trạng, hồ sơ minh chứng, ưu điểm và hạn chế).'),
          p('**MẪU SỐ 05:** Báo cáo kết quả kiểm tra của Tổ (Đoàn) kiểm tra trình Hiệu trưởng.'),
          p('**MẪU SỐ 06:** Thông báo kết quả kiểm tra (Hiệu trưởng ban hành công khai, kết luận và kiến nghị xử lý).'),
        ],
      },
    ],
  });

  const formsBuffer = await Packer.toBuffer(formsDoc);
  const formsPath = path.join(downloadsDir, 'TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx');
  fs.writeFileSync(formsPath, formsBuffer);
  console.log('Saved Forms DOCX:', formsPath);

  console.log('Successfully generated all inspection documents conforming strictly to Decree 30/2020/ND-CP!');
}

generateAllInspectionDocuments().catch(console.error);

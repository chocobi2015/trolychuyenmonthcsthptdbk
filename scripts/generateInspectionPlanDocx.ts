import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  PageNumber
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import {
  SCHOOL_INSPECTION_BACKGROUND,
  SCHOOL_INSPECTION_OBJECTIVES,
  DETAILED_INSPECTION_PILLARS_UNABRIDGED,
  MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR
} from '../src/data/detailedInspectionPlanFullText';
import { SCHOOL_INSPECTION_COMMITTEE } from '../src/data/internalInspectionData';

const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const cellGridBorder = {
  top: tableBorder,
  bottom: tableBorder,
  left: tableBorder,
  right: tableBorder,
};
const cellNoBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

function createHeaderTable(
  agencyTop: string,
  agencyName: string,
  docNumber: string,
  countryTitle1: string,
  countryTitle2: string,
  locationDate: string
): Table {
  return new Table({
    width: { size: 9469, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4200, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({ text: agencyTop.toUpperCase(), font: 'Times New Roman', size: 21 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: agencyName.toUpperCase(), bold: true, font: 'Times New Roman', size: 22 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: '————————', color: '666666', font: 'Times New Roman', size: 18 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 40 },
                children: [
                  new TextRun({ text: docNumber, font: 'Times New Roman', size: 22, bold: true }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 5269, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({ text: countryTitle1.toUpperCase(), bold: true, font: 'Times New Roman', size: 21 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: countryTitle2, bold: true, font: 'Times New Roman', size: 22, underline: {} }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 80 },
                children: [
                  new TextRun({ text: locationDate, italics: true, font: 'Times New Roman', size: 22 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createSignOffTable(
  recipients: string[],
  authorityTitle: string,
  signerRole: string,
  signerName: string
): Table {
  return new Table({
    width: { size: 9469, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4800, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                spacing: { before: 120, after: 40 },
                children: [
                  new TextRun({ text: 'Nơi nhận:', bold: true, italics: true, font: 'Times New Roman', size: 22 }),
                ],
              }),
              ...recipients.map((r) =>
                new Paragraph({
                  spacing: { line: 240, after: 20 },
                  children: [
                    new TextRun({ text: '- ' + r, font: 'Times New Roman', size: 20 }),
                  ],
                })
              ),
            ],
          }),
          new TableCell({
            width: { size: 4669, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              ...(authorityTitle ? [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({ text: authorityTitle.toUpperCase(), bold: true, font: 'Times New Roman', size: 22 }),
                  ],
                })
              ] : []),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 1200 },
                children: [
                  new TextRun({ text: signerRole.toUpperCase(), bold: true, font: 'Times New Roman', size: 22 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: signerName, bold: true, font: 'Times New Roman', size: 24 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function p(text: string, bold = false, italics = false, indent = 0): Paragraph {
  return new Paragraph({
    indent: indent > 0 ? { left: indent * 360 } : undefined,
    children: [
      new TextRun({ text, bold, italics, font: 'Times New Roman', size: 24 }),
    ],
  });
}

function h1(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    children: [
      new TextRun({ text, bold: true, font: 'Times New Roman', size: 26 }),
    ],
  });
}

function h2(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
    children: [
      new TextRun({ text, bold: true, font: 'Times New Roman', size: 24 }),
    ],
  });
}

function h3(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 120, after: 40 },
    children: [
      new TextRun({ text, bold: true, italics: true, font: 'Times New Roman', size: 23 }),
    ],
  });
}

export async function generateAllInspectionDocuments() {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // 1. GENERATE FULL-LENGTH UNABRIDGED PLAN DOCX
  console.log('Generating School Internal Inspection Plan DOCX (Full-Length & Bóc Tách Chi Tiết)...');
  
  const planDocChildren: (Paragraph | Table)[] = [];

  // Quốc hiệu & Tiêu ngữ
  planDocChildren.push(
    createHeaderTable(
      'SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP',
      'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
      'Số: 48/KH-THCS&THPTĐBK',
      'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
      'Độc lập - Tự do - Hạnh phúc',
      'Tháp Mười, ngày 15 tháng 10 năm 2026'
    )
  );

  planDocChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 40 },
      children: [
        new TextRun({ text: 'KẾ HOẠCH', bold: true, font: 'Times New Roman', size: 30 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({ text: 'CÔNG TÁC KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027', bold: true, font: 'Times New Roman', size: 26 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({
          text: '(Kết hợp hoàn chỉnh Kế hoạch số 76/KH-THPT ĐBK và Kế hoạch số 134/KH-THCS.TK của hai đơn vị trường cũ trước sáp nhập; bám sát Hướng dẫn số 1134/SGDĐT-TCCB của Sở GDĐT Đồng Tháp)',
          italics: true,
          font: 'Times New Roman',
          size: 21
        }),
      ],
    })
  );

  // Căn cứ pháp lý
  const legalBases = [
    'Căn cứ Luật Giáo dục ngày 14 tháng 6 năm 2019;',
    'Căn cứ Luật Thanh tra ngày 14 tháng 11 năm 2022;',
    'Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05 tháng 8 năm 2025 của Chính phủ về hoạt động kiểm tra chuyên ngành;',
    'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ GDĐT ban hành Điều lệ trường THCS, trường THPT và trường phổ thông có nhiều cấp học;',
    'Căn cứ Thông tư số 22/2021/TT-BGDĐT ngày 20 tháng 7 năm 2021 của Bộ GDĐT quy định về đánh giá học sinh trung học cơ sở và học sinh trung học phổ thông;',
    'Căn cứ Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của UBND tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều;',
    'Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở GDĐT Đồng Tháp V/v thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027;',
    'Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở GDĐT Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục;',
    'Căn cứ Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25 tháng 9 năm 2026 của Trường THCS và THPT Đốc Binh Kiều,'
  ];
  legalBases.forEach(lb => planDocChildren.push(p(lb, false, true)));

  planDocChildren.push(
    p('Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 với các nội dung chi tiết như sau:')
  );

  // PHẦN A. ĐẶC ĐIỂM TÌNH HÌNH
  planDocChildren.push(h1('A. ĐẶC ĐIỂM TÌNH HÌNH CỦA NHÀ TRƯỜNG SAU SÁP NHẬP'));
  planDocChildren.push(h2('I. Khái quát quy mô trường lớp, học sinh và đội ngũ'));
  
  planDocChildren.push(h3('1. Quy mô các khối lớp học và số liệu huy động học sinh'));
  planDocChildren.push(p(`Năm học 2026 - 2027, Trường THCS và THPT Đốc Binh Kiều vận hành quy mô liên cấp gồm 53 lớp học với tổng số 2.111 học sinh tại 3 điểm trường, cụ thể:`));
  
  SCHOOL_INSPECTION_BACKGROUND.studentScale.campusBreakdown.forEach((cp, idx) => {
    planDocChildren.push(
      p(`1.${idx + 1}. ${cp.campusName}: Địa chỉ tại ${cp.address}; quy mô ${cp.classesCount} lớp học với ${cp.studentsCount} học sinh (${cp.grades}). Đặc điểm: ${cp.specialFeatures}`, false, false, 1)
    );
  });

  planDocChildren.push(h3('2. Đội ngũ cán bộ, giáo viên, nhân viên (Chuẩn 120 nhân sự từ NHÂN SỰ MỚI)'));
  planDocChildren.push(
    p(`- Tổng số cán bộ quản lý, giáo viên, nhân viên toàn trường: 120 người (Nữ: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.femaleCount}, Nam: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.maleCount}).`),
    p(`- Đảng viên Đảng Cộng sản Việt Nam: ${SCHOOL_INSPECTION_BACKGROUND.staffScale.partyMembersCount}/120 đồng chí (đạt tỉ lệ ${((85/120)*100).toFixed(1)}%).`),
    p(`- Trình độ đào tạo: 100% cán bộ giáo viên đạt chuẩn theo Luật Giáo dục 2019; có 09 cán bộ, giáo viên có trình độ Thạc sĩ chuyên ngành và quản lý giáo dục.`),
    p(`- Cơ cấu 08 tổ chuyên môn và văn phòng sau sáp nhập:`)
  );

  SCHOOL_INSPECTION_BACKGROUND.staffScale.departmentCounts.forEach(d => {
    planDocChildren.push(p(`+ ${d.name}: ${d.count} thành viên. Phụ trách: ${d.head}.`, false, false, 1));
  });

  planDocChildren.push(h3('3. Cơ sở vật chất, trang thiết bị dạy học hiện có tại 3 điểm trường'));
  planDocChildren.push(
    p(`- Phòng học: Toàn trường có 53 phòng học kiên cố và bán kiên cố bố trí đủ cho 53 lớp học.`),
    p(`- Phòng chức năng và bộ môn: Có 22 phòng bộ môn (gồm 8 phòng thí nghiệm thực hành Lý - Hóa - Sinh, 5 phòng máy vi tính với tổng cộng 165 máy tính có kết nối mạng Internet an toàn, 3 phòng học ngoại ngữ, phòng âm nhạc, mỹ thuật, đa năng).`),
    p(`- Bộ phận Thư viện: 03 phòng thư viện tại 3 điểm trường với hơn 15.000 bản sách giáo khoa, sách tham khảo, sách nghiệp vụ và phần mềm thư viện số.`),
    p(`- Y tế học đường và PCCC: 03 phòng y tế học đường có tủ thuốc sơ cấp cứu học sinh; trang bị 13 tủ chữa cháy vách tường, 03 máy bơm chữa cháy công suất lớn, 48 bình chữa cháy và 38 camera giám sát an ninh.`)
  );

  planDocChildren.push(h2('II. Đánh giá Thuận lợi và Khó khăn'));
  planDocChildren.push(h3('1. Thuận lợi:'));
  SCHOOL_INSPECTION_BACKGROUND.strengths.forEach(s => planDocChildren.push(p(`- ${s}`, false, false, 1)));
  
  planDocChildren.push(h3('2. Khó khăn:'));
  SCHOOL_INSPECTION_BACKGROUND.challenges.forEach(c => planDocChildren.push(p(`- ${c}`, false, false, 1)));

  // PHẦN B. MỤC ĐÍCH YÊU CẦU
  planDocChildren.push(h1('B. MỤC ĐÍCH, YÊU CẦU CỦA CÔNG TÁC KIỂM TRA NỘI BỘ'));
  planDocChildren.push(h2('I. Mục đích:'));
  SCHOOL_INSPECTION_OBJECTIVES.purposes.forEach(pu => planDocChildren.push(p(`- ${pu}`, false, false, 1)));

  planDocChildren.push(h2('II. Yêu cầu:'));
  SCHOOL_INSPECTION_OBJECTIVES.requirements.forEach(req => planDocChildren.push(p(`- ${req}`, false, false, 1)));

  // PHẦN C. NỘI DUNG VÀ NHIỆM VỤ KIỂM TRA BÓC TÁCH CHI TIẾT
  planDocChildren.push(h1('C. NỘI DUNG KIỂM TRA CỤ THỂ - BÓC TÁCH CHI TIẾT 11 LĨNH VỰC'));
  planDocChildren.push(p('Kế hoạch kiểm tra nội bộ nhà trường năm học 2026 - 2027 được bóc tách toàn diện thành 11 nhóm lĩnh vực kiểm tra trọng tâm, tích hợp đầy đủ các nội dung kiểm tra cấp THPT (kế thừa Kế hoạch 76) và cấp THCS (kế thừa Kế hoạch 134) cùng các quy định mới nhất của Sở GDĐT Đồng Tháp:'));

  DETAILED_INSPECTION_PILLARS_UNABRIDGED.forEach((pillar) => {
    planDocChildren.push(
      h2(`${pillar.orderNumber}. ${pillar.domainName}`),
      p(`(Căn cứ kế thừa: ${pillar.sourceOrigin})`, false, true)
    );

    // 1. Đối tượng kiểm tra
    planDocChildren.push(h3(`${pillar.orderNumber}.1. Đối tượng kiểm tra chi tiết:`));
    pillar.targetsDetail.forEach(t => planDocChildren.push(p(`- ${t}`, false, false, 1)));

    // 2. Lực lượng kiểm tra
    planDocChildren.push(h3(`${pillar.orderNumber}.2. Lực lượng tham gia kiểm tra:`));
    planDocChildren.push(
      p(`- Trưởng đoàn kiểm tra: ${pillar.inspectionForce.lead}`, false, false, 1),
      p(`- Phó Trưởng đoàn: ${pillar.inspectionForce.deputies.join(', ')}`, false, false, 1),
      p(`- Các thành viên: ${pillar.inspectionForce.members.join(', ')}`, false, false, 1)
    );

    // 3. Hình thức, chỉ tiêu và thời gian
    planDocChildren.push(h3(`${pillar.orderNumber}.3. Hình thức, chỉ tiêu và thời gian kiểm tra:`));
    planDocChildren.push(
      p(`- Kiểm tra toàn diện: ${pillar.formatsAndMetrics.comprehensiveRate}`, false, false, 1),
      p(`- Kiểm tra chuyên đề: ${pillar.formatsAndMetrics.thematicRate}`, false, false, 1),
      p(`- Kiểm tra đột xuất: ${pillar.formatsAndMetrics.surpriseRate}`, false, false, 1),
      p(`- Tần suất thường xuyên: ${pillar.formatsAndMetrics.routineFrequency}`, false, false, 1),
      p(`- Thời gian thực hiện: ${pillar.formatsAndMetrics.implementationTime}`, false, false, 1)
    );

    // 4. Nội dung kiểm tra chi tiết
    planDocChildren.push(h3(`${pillar.orderNumber}.4. Nội dung và tiêu chuẩn kiểm tra chi tiết (Bóc tách nghiệp vụ):`));
    pillar.breakdownSections.forEach(sec => {
      planDocChildren.push(p(sec.heading, true, false, 1));
      sec.items.forEach(it => planDocChildren.push(p(`+ ${it}`, false, false, 2)));
    });

    // 5. Hồ sơ lưu trữ
    planDocChildren.push(h3(`${pillar.orderNumber}.5. Sản phẩm hồ sơ lưu trữ sau kiểm tra:`));
    pillar.deliverableRecords.forEach(dr => planDocChildren.push(p(`- ${dr}`, false, false, 1)));
  });

  // PHẦN D. DỰ TRÙ KINH PHÍ
  planDocChildren.push(h1('D. DỰ TRÙ KINH PHÍ CHO HOẠT ĐỘNG KIỂM TRA NỘI BỘ'));
  planDocChildren.push(
    p('1. Chế độ chi cho công tác kiểm tra nội bộ nhà trường được thực hiện căn cứ vào Quy chế chi tiêu nội bộ năm học 2026 - 2027 đã được Hội nghị cán bộ, viên chức, người lao động nhà trường biểu quyết thông qua.'),
    p('2. Nguồn kinh phí: Trích từ nguồn kinh phí hoạt động thường xuyên của nhà trường và các nguồn kinh phí hợp pháp khác.'),
    p('3. Định mức chi: Chi trả phụ cấp làm việc ngoài giờ, công tác phí đi lại giữa các điểm trường (đặc biệt Điểm Tân Kiều cách 11km), chi nước uống và văn phòng phẩm in ấn hồ sơ, biểu mẫu kiểm tra theo quyết định thành lập từng đoàn kiểm tra cụ thể của Hiệu trưởng.')
  );

  // PHẦN E. TỔ CHỨC THỰC HIỆN
  planDocChildren.push(h1('E. TỔ CHỨC THỰC HIỆN VÀ PHÂN CÔNG TRÁCH NHIỆM'));
  planDocChildren.push(h2('I. Trách nhiệm của Lãnh đạo nhà trường'));
  planDocChildren.push(
    p('1. Hiệu trưởng (Thầy Lê Thanh Cường):', true),
    p('- Chịu trách nhiệm toàn diện trước Giám đốc Sở GDĐT về công tác kiểm tra nội bộ của đơn vị; ban hành Quyết định thành lập Ban kiểm tra nội bộ, Quyết định thành lập các đoàn kiểm tra theo từng chuyên đề; phê duyệt Kế hoạch tiến hành kiểm tra (Mẫu 03) và ký ban hành Thông báo kết luận kiểm tra (Mẫu 06).', false, false, 1),
    p('- Trực tiếp phụ trách kiểm tra công tác quản lý tài chính, tài sản công, phòng chống tham nhũng, tiếp công dân, giải quyết khiếu nại tố cáo và công tác an toàn trường học.', false, false, 1),
    p('2. Phó Hiệu trưởng Thường trực (Thầy Nguyễn Minh Trí):', true),
    p('- Thường trực Ban KTNB; trực tiếp phụ trách theo dõi công tác kiểm tra quy chế chuyên môn toàn trường & Điểm chính THPT (Khối 10, 11, 12); làm Trưởng các đoàn kiểm tra hoạt động sư phạm nhà giáo, kiểm tra khảo thí, ôn thi tốt nghiệp THPT và quản lý dạy thêm học thêm.', false, false, 1),
    p('3. Phó Hiệu trưởng (Cô Phan Thanh Thảo):', true),
    p('- Phụ trách công tác KTNB tại Điểm trường THCS Đốc Binh Kiều (24 lớp, 980 HS); trực tiếp làm Trưởng các đoàn kiểm tra chuyên môn cấp THCS, công tác chủ nhiệm lớp, giáo dục hòa nhập cho 25 học sinh khuyết tật và hoạt động Đội Thiếu niên tiền phong.', false, false, 1),
    p('4. Phó Hiệu trưởng (Thầy Nguyễn Thanh Tòng):', true),
    p('- Phụ trách công tác KTNB tại Điểm trường THCS Tân Kiều cách 11km (15 lớp, 602 HS); trực tiếp làm Trưởng các đoàn kiểm tra việc thực hiện CT GDPT 2018 tại cơ sở Tân Kiều, quản lý tài sản, thiết bị dạy học, bán trú và an toàn giao thông.', false, false, 1)
  );

  planDocChildren.push(h2('II. Trách nhiệm của các Tổ chuyên môn, Đoàn thể và Cá nhân'));
  planDocChildren.push(
    p('1. Các Tổ trưởng chuyên môn, Tổ trưởng Văn phòng: Xây dựng kế hoạch kiểm tra nội bộ của tổ mình; phân công tổ phó và giáo viên cốt cán tham gia các đoàn kiểm tra theo điều động của Hiệu trưởng; lưu trữ biên bản kiểm tra cấp tổ.', false, false, 1),
    p('2. Ban Thanh tra nhân dân: Cử thành viên tham gia giám sát các cuộc kiểm tra tài chính, tài sản, quy chế dân chủ và tiếp công dân; phối hợp xử lý các kiến nghị sau kiểm tra.', false, false, 1),
    p('3. Công đoàn cơ sở, Đoàn Thanh niên, Liên đội: Phối hợp kiểm tra nề nếp kỷ cương học sinh, phong trào thi đua và văn hóa công vụ của cán bộ đoàn viên.', false, false, 1),
    p('4. Cán bộ, giáo viên, nhân viên là đối tượng kiểm tra: Có trách nhiệm chuẩn bị đầy đủ hồ sơ, sổ sách, giáo án, tài liệu minh chứng theo yêu cầu của đoàn kiểm tra; tạo điều kiện thuận lợi để đoàn làm việc; ký biên bản kiểm tra và thực hiện nghiêm túc các kiến nghị khắc phục.', false, false, 1)
  );

  planDocChildren.push(h2('III. Quy trình kiểm tra và Chế độ báo cáo Sở GDĐT'));
  planDocChildren.push(
    p('1. Quy trình tiến hành kiểm tra 3 bước chuẩn theo Hướng dẫn số 1134/SGDĐT-TCCB:'),
    p('+ Bước 1 (Chuẩn bị): Ban hành Quyết định kiểm tra (Mẫu 02) và Kế hoạch tiến hành kiểm tra (Mẫu 03); thông báo cho đối tượng kiểm tra trước ít nhất 03 ngày (trừ kiểm tra đột xuất).', false, false, 1),
    p('+ Bước 2 (Tiến hành): Kiểm tra hồ sơ minh chứng, dự giờ, khảo sát thực tế; lập Biên bản kiểm tra (Mẫu 04) có chữ ký của Trưởng đoàn và đối tượng kiểm tra.', false, false, 1),
    p('+ Bước 3 (Kết thúc): Trưởng đoàn lập Báo cáo kết quả kiểm tra (Mẫu 05) trình Hiệu trưởng; Hiệu trưởng xem xét ký ban hành Thông báo kết luận kiểm tra (Mẫu 06) gửi đối tượng thực hiện.', false, false, 1),
    p('2. Chế độ thông tin, báo cáo Sở GDĐT bắt buộc (qua Phòng Tổ chức cán bộ):'),
    p('- Mốc 1: Gửi Kế hoạch KTNB và Quyết định thành lập Ban KTNB trước ngày 31 tháng 10 năm 2026.', false, false, 1),
    p('- Mốc 2: Gửi Báo cáo sơ kết công tác KTNB học kỳ I trước ngày 20 tháng 01 năm 2027.', false, false, 1),
    p('- Mốc 3: Gửi Báo cáo tổng kết công tác KTNB năm học và kết quả tự đánh giá chấm điểm thi đua trước ngày 18 tháng 5 năm 2027.', false, false, 1)
  );

  // Ký duyệt
  planDocChildren.push(
    createSignOffTable(
      [
        'Sở GDĐT Đồng Tháp (Phòng TCCB) (b/c);',
        'UBND huyện Tháp Mười (b/c);',
        'Ban Giám hiệu nhà trường (chỉ đạo);',
        'Ban Kiểm tra nội bộ (thực hiện);',
        '08 Tổ CM & Tổ Văn phòng (thực hiện);',
        'Ban TTND, CĐCS, Đoàn - Đội (phối hợp);',
        'Niêm yết bảng tin & Website trường (công khai);',
        'Lưu: VT, Hồ sơ Ban KTNB.'
      ],
      '',
      'HIỆU TRƯỞNG',
      'Lê Thanh Cường'
    )
  );

  // PHỤ LỤC BẢNG LỊCH KIỂM TRA 12 THÁNG
  planDocChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 60 },
      children: [
        new TextRun({ text: 'PHỤ LỤC BÓC TÁCH CHI TIẾT', bold: true, font: 'Times New Roman', size: 28 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({ text: 'LỊCH KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027 (TỪ THÁNG 9/2026 ĐẾN THÁNG 8/2027)', bold: true, font: 'Times New Roman', size: 24 }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({ text: '(Kèm theo Kế hoạch số 48/KH-THCS&THPTĐBK ngày 15/10/2026 của Trường THCS và THPT Đốc Binh Kiều)', italics: true, font: 'Times New Roman', size: 22 }),
      ],
    })
  );

  // Bảng Phụ lục 12 tháng
  const scheduleRows: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({ width: { size: 600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TT', bold: true, size: 20 })] })] }),
        new TableCell({ width: { size: 1400, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian', bold: true, size: 20 })] })] }),
        new TableCell({ width: { size: 2800, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung kiểm tra bóc tách', bold: true, size: 20 })] })] }),
        new TableCell({ width: { size: 1800, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Đối tượng & Điểm trường', bold: true, size: 20 })] })] }),
        new TableCell({ width: { size: 1600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Lực lượng kiểm tra', bold: true, size: 20 })] })] }),
        new TableCell({ width: { size: 1269, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Sản phẩm / Mẫu', bold: true, size: 20 })] })] }),
      ],
    }),
  ];

  MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.forEach((item, idx) => {
    scheduleRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 600, type: WidthType.DXA },
            borders: cellGridBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(idx + 1), size: 19 })] })],
          }),
          new TableCell({
            width: { size: 1400, type: WidthType.DXA },
            borders: cellGridBorder,
            children: [
              new Paragraph({ children: [new TextRun({ text: item.month, bold: true, size: 19 })] }),
              new Paragraph({ children: [new TextRun({ text: item.timeframe, size: 17, italics: true })] }),
            ],
          }),
          new TableCell({
            width: { size: 2800, type: WidthType.DXA },
            borders: cellGridBorder,
            children: [
              new Paragraph({ children: [new TextRun({ text: item.title, bold: true, size: 19 })] }),
              ...item.specificTasks.map(t => new Paragraph({ indent: { left: 180 }, children: [new TextRun({ text: '- ' + t, size: 17 })] })),
            ],
          }),
          new TableCell({
            width: { size: 1800, type: WidthType.DXA },
            borders: cellGridBorder,
            children: [
              new Paragraph({ children: [new TextRun({ text: item.target, size: 19 })] }),
              new Paragraph({ children: [new TextRun({ text: `[${item.campus}]`, size: 17, bold: true, color: '003366' })] }),
            ],
          }),
          new TableCell({
            width: { size: 1600, type: WidthType.DXA },
            borders: cellGridBorder,
            children: [
              new Paragraph({ children: [new TextRun({ text: item.leadInspector, bold: true, size: 19 })] }),
              new Paragraph({ children: [new TextRun({ text: item.teamMembers.slice(0, 2).join(', '), size: 17 })] }),
            ],
          }),
          new TableCell({
            width: { size: 1269, type: WidthType.DXA },
            borders: cellGridBorder,
            children: [
              new Paragraph({ children: [new TextRun({ text: item.expectedOutput, size: 17 })] }),
            ],
          }),
        ],
      })
    );
  });

  planDocChildren.push(
    new Table({
      width: { size: 9469, type: WidthType.DXA },
      borders: cellGridBorder,
      rows: scheduleRows,
    })
  );

  const planDoc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 24 },
          paragraph: { spacing: { line: 276, before: 50, after: 50 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, bottom: 1134, left: 1417, right: 1020 },
          },
        },
        children: planDocChildren,
      },
    ],
  });

  const planBuffer = await Packer.toBuffer(planDoc);
  const planPath = path.join(downloadsDir, 'KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
  fs.writeFileSync(planPath, planBuffer);
  console.log('Saved Massive Plan DOCX:', planPath);

  // 2. GENERATE COMMITTEE DECISION DOCX (MẪU 02)
  console.log('Generating Inspection Committee Decision DOCX...');
  const committeeDoc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 24 },
          paragraph: { spacing: { line: 276, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, bottom: 1134, left: 1417, right: 1020 },
          },
        },
        children: [
          createHeaderTable(
            'SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP',
            'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
            'Số: 49/QĐ-THCS-THPTĐBK',
            'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
            'Độc lập - Tự do - Hạnh phúc',
            'Tháp Mười, ngày 15 tháng 10 năm 2026'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 60 },
            children: [
              new TextRun({ text: 'QUYẾT ĐỊNH', bold: true, font: 'Times New Roman', size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'Về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({ text: 'HIỆU TRƯỞNG TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          p('Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15/9/2020 của Bộ GDĐT ban hành Điều lệ trường THCS, trường THPT và trường phổ thông có nhiều cấp học;', false, true),
          p('Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05/8/2025 của Chính phủ về hoạt động kiểm tra chuyên ngành;', false, true),
          p('Căn cứ Quyết định số 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều;', false, true),
          p('Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục;', false, true),
          p('Theo đề nghị của Phó Hiệu trưởng phụ trách chuyên môn và Tổ trưởng Tổ Văn phòng,', false, true),
          
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({ text: 'QUYẾT ĐỊNH:', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),

          p('Điều 1. Thành lập Ban kiểm tra nội bộ Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027 gồm 22 ông (bà) có tên trong danh sách đính kèm, do ông Lê Thanh Cường - Hiệu trưởng làm Trưởng ban.'),
          p('Điều 2. Ban kiểm tra nội bộ có nhiệm vụ xây dựng kế hoạch tiến hành kiểm tra từng đợt theo Kế hoạch số 48/KH-THCS&THPTĐBK của nhà trường; lập biên bản kiểm tra, báo cáo kết quả và tham mưu Hiệu trưởng ban hành thông báo kết luận kiểm tra; theo dõi việc khắc phục sau kiểm tra.'),
          p('Điều 3. Quyết định này có hiệu lực kể từ ngày ký đến hết năm học 2026 - 2027. Các Phó Hiệu trưởng, các Tổ trưởng chuyên môn, Tổ Văn phòng và các ông (bà) có tên tại Điều 1 chịu trách nhiệm thi hành Quyết định này./.'),

          createSignOffTable(
            [
              'Sở GDĐT Đồng Tháp (để báo cáo);',
              'Như Điều 3 (để thực hiện);',
              'Lưu: VT, Hồ sơ Ban KTNB.'
            ],
            '',
            'HIỆU TRƯỞNG',
            'Lê Thanh Cường'
          ),

          // Danh sách 22 thành viên Ban KTNB
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 80 },
            children: [
              new TextRun({ text: 'DANH SÁCH THÀNH VIÊN BAN KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({ text: '(Kèm theo Quyết định số 49/QĐ-THCS-THPTĐBK ngày 15/10/2026 của Hiệu trưởng - Chuẩn 100% từ tệp NHÂN SỰ MỚI.xlsx)', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Table({
            width: { size: 9469, type: WidthType.DXA },
            borders: cellGridBorder,
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TT', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 2400, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Họ và tên', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 2600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Chức vụ tại trường', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 1800, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nhiệm vụ trong Ban', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 2069, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Phân công trách nhiệm', bold: true, size: 20 })] })] }),
                ],
              }),
              ...SCHOOL_INSPECTION_COMMITTEE.map((m) =>
                new TableRow({
                  children: [
                    new TableCell({ width: { size: 600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(m.orderNumber), size: 19 })] })] }),
                    new TableCell({ width: { size: 2400, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ children: [new TextRun({ text: m.fullName, bold: true, size: 19 })] })] }),
                    new TableCell({ width: { size: 2600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ children: [new TextRun({ text: m.roleInSchool, size: 19 })] })] }),
                    new TableCell({ width: { size: 1800, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ children: [new TextRun({ text: m.roleInCommittee, bold: true, size: 19 })] })] }),
                    new TableCell({ width: { size: 2069, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ children: [new TextRun({ text: m.assignedDuty, size: 17 })] })] }),
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

  // 3. GENERATE 6 FORMS APPENDIX DOCX (HD 1134)
  console.log('Generating 6 Forms Appendix DOCX (HD 1134)...');
  const formsDoc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 24 },
          paragraph: { spacing: { line: 276, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1134, bottom: 1134, left: 1417, right: 1020 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 180, after: 60 },
            children: [
              new TextRun({ text: 'TRỌN BỘ 06 BIỂU MẪU NGHIỆP VỤ KIỂM TRA NỘI BỘ', bold: true, font: 'Times New Roman', size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({ text: '(Ban hành kèm theo Hướng dẫn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở Giáo dục và Đào tạo Đồng Tháp)', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          p('MẪU SỐ 01: Quyết định Ban hành Kế hoạch kiểm tra nội bộ năm học (Kèm Kế hoạch năm học).', true),
          p('MẪU SỐ 02: Quyết định Thành lập Ban kiểm tra nội bộ năm học (Kèm Danh sách phân công thành viên).', true),
          p('MẪU SỐ 03: Kế hoạch tiến hành kiểm tra của Tổ (Đoàn) kiểm tra cho từng đợt.', true),
          p('MẪU SỐ 04: Biên bản kiểm tra (Ghi nhận hiện trạng, hồ sơ minh chứng, ưu điểm và hạn chế).', true),
          p('MẪU SỐ 05: Báo cáo kết quả kiểm tra của Tổ (Đoàn) kiểm tra trình Hiệu trưởng.', true),
          p('MẪU SỐ 06: Thông báo kết quả kiểm tra (Hiệu trưởng ban hành công khai, kết luận và kiến nghị xử lý).', true),
        ],
      },
    ],
  });

  const formsBuffer = await Packer.toBuffer(formsDoc);
  const formsPath = path.join(downloadsDir, 'TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx');
  fs.writeFileSync(formsPath, formsBuffer);
  console.log('Saved Forms DOCX:', formsPath);

  console.log('Successfully generated all inspection documents with full unabridged details!');
}

generateAllInspectionDocuments().catch(console.error);

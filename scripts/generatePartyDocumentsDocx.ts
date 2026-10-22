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

function p(text: string, bold = false, align = AlignmentType.JUSTIFIED, size = 26, italic = false): Paragraph {
  return new Paragraph({
    alignment: align,
    spacing: { line: 276, before: 60, after: 60 },
    children: [
      new TextRun({
        text,
        bold,
        italics: italic,
        font: 'Times New Roman',
        size,
      }),
    ],
  });
}

function pMulti(runs: { text: string; bold?: boolean; italic?: boolean; size?: number }[], align = AlignmentType.JUSTIFIED): Paragraph {
  return new Paragraph({
    alignment: align,
    spacing: { line: 276, before: 60, after: 60 },
    children: runs.map(r => new TextRun({
      text: r.text,
      bold: r.bold ?? false,
      italics: r.italic ?? false,
      font: 'Times New Roman',
      size: r.size ?? 26,
    })),
  });
}

function h1(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Times New Roman',
        size: 28,
        color: '000000',
      }),
    ],
  });
}

function h2(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 180, after: 60 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: 'Times New Roman',
        size: 26,
        color: '000000',
      }),
    ],
  });
}

function h3(text: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 120, after: 40 },
    children: [
      new TextRun({
        text,
        bold: true,
        italics: true,
        font: 'Times New Roman',
        size: 26,
        color: '000000',
      }),
    ],
  });
}

function createPartyHeaderTable(
  docNumber: string,
  dateStr: string,
  superiorOrg = 'ĐẢNG BỘ HUYỆN THÁP MƯỜI'
): Table {
  return new Table({
    width: { size: 9469, type: WidthType.DXA },
    borders: {
      top: cellNoBorder.top,
      bottom: cellNoBorder.bottom,
      left: cellNoBorder.left,
      right: cellNoBorder.right,
      insideHorizontal: cellNoBorder.top,
      insideVertical: cellNoBorder.left,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4500, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 30 },
                children: [
                  new TextRun({ text: superiorOrg, bold: true, font: 'Times New Roman', size: 24 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 30 },
                children: [
                  new TextRun({ text: 'ĐẢNG UỶ TRƯỜNG THCS VÀ THPT', bold: true, font: 'Times New Roman', size: 24 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: 'ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: 24 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 30 },
                children: [
                  new TextRun({ text: '* * *', bold: true, font: 'Times New Roman', size: 22 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: `Số: ${docNumber}`, bold: true, font: 'Times New Roman', size: 24 }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 4969, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 30 },
                children: [
                  new TextRun({ text: 'ĐẢNG CỘNG SẢN VIỆT NAM', bold: true, font: 'Times New Roman', size: 24 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: '-----------------------', bold: true, font: 'Times New Roman', size: 20 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: dateStr, italics: true, font: 'Times New Roman', size: 24 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createSignBlock(
  signerTitle: string,
  signerName: string,
  recipients: string[],
  subTitle = ''
): Table {
  return new Table({
    width: { size: 9469, type: WidthType.DXA },
    borders: {
      top: cellNoBorder.top,
      bottom: cellNoBorder.bottom,
      left: cellNoBorder.left,
      right: cellNoBorder.right,
      insideHorizontal: cellNoBorder.top,
      insideVertical: cellNoBorder.left,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4500, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                spacing: { before: 120, after: 40 },
                children: [new TextRun({ text: 'Nơi nhận:', bold: true, italics: true, font: 'Times New Roman', size: 22 })],
              }),
              ...recipients.map(r => new Paragraph({
                spacing: { line: 240, after: 20 },
                children: [new TextRun({ text: `- ${r}`, font: 'Times New Roman', size: 20 })],
              })),
            ],
          }),
          new TableCell({
            width: { size: 4969, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 120, after: 20 },
                children: [new TextRun({ text: 'T/M ĐẢNG UỶ', bold: true, font: 'Times New Roman', size: 24 })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: subTitle ? 20 : 600 },
                children: [new TextRun({ text: signerTitle, bold: true, font: 'Times New Roman', size: 24 })],
              }),
              ...(subTitle ? [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 600 },
                  children: [new TextRun({ text: subTitle, italics: true, font: 'Times New Roman', size: 22 })],
                })
              ] : []),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 800 },
                children: [new TextRun({ text: signerName, bold: true, font: 'Times New Roman', size: 24 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export async function generateAllPartyDocuments() {
  console.log('--- BẮT ĐẦU TẠO 4 VĂN KIỆN CÔNG TÁC ĐẢNG BỘ ĐÃ TÙY BIẾN CHO ĐƠN VỊ MỚI ---');

  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  const dangBoDir = path.join(process.cwd(), 'ĐẢNG BỘ');
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });
  if (!fs.existsSync(dangBoDir)) fs.mkdirSync(dangBoDir, { recursive: true });

  // =========================================================================
  // FILE 1: 01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx
  // =========================================================================
  console.log('Generating File 1: Quy chế làm việc BCH Đảng bộ 2025 - 2030...');

  const doc1 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 26 },
          paragraph: { spacing: { line: 276, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 1134, bottom: 1134, left: 1417, right: 1020 } },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Đảng ủy Trường THCS và THPT Đốc Binh Kiều - Quy chế làm việc BCH Khóa I (2025 - 2030)',
                    font: 'Times New Roman',
                    size: 18,
                    italics: true,
                    color: '666666',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Trang ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 20 }),
                  new TextRun({ text: ' / ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 20 }),
                ],
              }),
            ],
          }),
        },
        children: [
          createPartyHeaderTable('01-QC/ĐU', 'Đốc Binh Kiều, ngày 16 tháng 9 năm 2026'),
          new Paragraph({ spacing: { before: 180, after: 60 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'QUY CHẾ LÀM VIỆC', bold: true, font: 'Times New Roman', size: 30 })
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'CỦA BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: 26 }),
          ]}),
          new Paragraph({ spacing: { after: 180 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'KHÓA I, NHIỆM KỲ 2025 – 2030', bold: true, font: 'Times New Roman', size: 26 }),
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: '-----', bold: true, font: 'Times New Roman', size: 24 }),
          ]}),

          p('- Căn cứ Điều lệ Đảng Cộng sản Việt Nam;', false, AlignmentType.JUSTIFIED, 24, true),
          p('- Căn cứ Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương Đảng về thi hành Điều lệ Đảng;', false, AlignmentType.JUSTIFIED, 24, true),
          p('- Căn cứ Quyết định của Ủy ban nhân dân tỉnh Đồng Tháp về việc sáp nhập Trường THPT Đốc Binh Kiều, Trường THCS Đốc Binh Kiều và Trường THCS Tân Kiều thành Trường THCS và THPT Đốc Binh Kiều;', false, AlignmentType.JUSTIFIED, 24, true),
          p('- Căn cứ Quyết định của Ban Thường vụ Huyện ủy Tháp Mười về việc chỉ định Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030 gồm 10 đồng chí;', false, AlignmentType.JUSTIFIED, 24, true),
          p('Căn cứ Nghị quyết Đại hội đại biểu Đảng bộ khóa I và Phương hướng, mục tiêu, nhiệm vụ công tác xây dựng Đảng và lãnh đạo thực hiện nhiệm vụ chính trị của nhà trường nhiệm kỳ 2025 – 2030;', false, AlignmentType.JUSTIFIED, 24, true),
          p('Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030 ban hành Quy chế làm việc như sau:', false, AlignmentType.JUSTIFIED, 26),

          h1('Chương I\nNHIỆM VỤ, QUYỀN HẠN CỦA TẬP THỂ'),
          h2('Điều 1. Nhiệm vụ, quyền hạn của Ban Chấp hành Đảng bộ'),
          p('1. Thực hiện đầy đủ nhiệm vụ, quyền hạn của cấp uỷ cơ sở theo quy định của Điều lệ Đảng, các quy định, hướng dẫn của Trung ương, Tỉnh ủy Đồng Tháp và Huyện ủy Tháp Mười. Lãnh đạo, chỉ đạo toàn diện các tổ chức trong hệ thống chính trị nhà trường (Ban Giám hiệu, Công đoàn cơ sở, Đoàn TNCS Hồ Chí Minh, Hội Khuyến học) và 03 chi bộ trực thuộc, cùng toàn thể 85 đảng viên, 120 cán bộ, giáo viên, nhân viên thực hiện nghiêm đường lối, chủ trương của Đảng, chính sách, pháp luật của Nhà nước.'),
          p('2. Lãnh đạo thực hiện thắng lợi nhiệm vụ chính trị trọng tâm của đơn vị mới sau sáp nhập: Quản lý và phát triển chất lượng dạy và học trên cả 03 điểm trường (Điểm chính THPT Đốc Binh Kiều, Điểm THCS Đốc Binh Kiều, Điểm THCS Tân Kiều) với quy mô 53 lớp, 2.111 học sinh (trong đó có 25 học sinh khuyết tật học hòa nhập); cụ thể hóa các chỉ đạo chuyên môn của Sở Giáo dục và Đào tạo Đồng Tháp thành các nghị quyết, chương trình hành động phù hợp thực tiễn.'),
          p('3. Quyết định chương trình làm việc toàn khóa, chương trình công tác và kế hoạch kiểm tra, giám sát hằng năm của Đảng ủy; ban hành Quy chế làm việc của Đảng ủy, phân công nhiệm vụ cụ thể cho từng Đảng ủy viên; ban hành các nghị quyết chuyên đề về nâng cao chất lượng giáo dục, chuyển đổi số và công tác cán bộ.'),
          p('4. Lãnh đạo công tác xây dựng Đảng vững mạnh về chính trị, tư tưởng, đạo đức, tổ chức và cán bộ:'),
          p('- Tổ chức học tập, quán triệt sâu sắc các nghị quyết, chỉ thị, kết luận của Trung ương; bảo vệ nền tảng tư tưởng của Đảng, kiên quyết đấu tranh phản bác các quan điểm sai trái, thù địch theo Nghị quyết số 35-NQ/TW của Bộ Chính trị.'),
          p('- Đẩy mạnh việc học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh gắn với thực hiện Kết luận số 21-KL/TW về xây dựng, chỉnh đốn Đảng; xây dựng chuẩn mực văn hóa nhà trường, tinh thần tương trợ, đoàn kết thống nhất giữa đội ngũ giáo viên từ 3 trường sau sáp nhập; phấn đấu trong nhiệm kỳ có ít nhất 02 mô hình tập thể, cá nhân tiêu biểu được cấp trên biểu dương, khen thưởng.'),
          p('5. Lãnh đạo, chỉ đạo 03 chi bộ trực thuộc (Chi bộ 1, Chi bộ 2, Chi bộ 3) thực hiện tốt quy chế dân chủ ở cơ sở; thường xuyên lắng nghe, nắm bắt và giải quyết kịp thời tâm tư, nguyện vọng của cán bộ, giáo viên, nhân viên, học sinh và cha mẹ học sinh.'),
          p('6. Lãnh đạo công tác phát triển đảng viên mới: Chú trọng phát hiện, bồi dưỡng nguồn kết nạp là giáo viên trẻ, giáo viên dạy giỏi và đoàn viên học sinh lớp 12 ưu tú; phấn đấu hàng năm kết nạp từ 03 - 04 đảng viên mới, hoàn thành và vượt chỉ tiêu Huyện ủy giao.'),
          p('7. Lãnh đạo công tác tổ chức, cán bộ theo phân cấp quản lý: Tham gia ý kiến, kiến nghị với Sở GDĐT Đồng Tháp về quy hoạch, bổ nhiệm, bổ nhiệm lại, điều động, luân chuyển cán bộ quản lý (Ban Giám hiệu); quyết định theo thẩm quyền việc quy hoạch cấp ủy, bổ nhiệm tổ trưởng, tổ phó chuyên môn, nâng lương, thi đua khen thưởng và kỷ luật viên chức.'),
          p('8. Lãnh đạo và tổ chức thực hiện công tác kiểm tra, giám sát, kỷ luật của Đảng; đấu tranh phòng, chống tham nhũng, lãng phí, tiêu cực; ngăn chặn, đẩy lùi suy thoái về tư tưởng chính trị, đạo đức, lối sống, “tự diễn biến”, “tự chuyển hóa” trong nội bộ.'),
          p('9. Quyết định các chủ trương, biện pháp quan trọng về đầu tư cơ sở vật chất, quản lý trang thiết bị dạy học, tài chính công khai và phân bổ nguồn lực công bằng giữa 3 điểm trường, bảo đảm điều kiện tốt nhất cho 53 lớp học.'),
          p('10. Định kỳ tổ chức tự phê bình và phê bình, lấy phiếu tín nhiệm cán bộ quản lý theo quy định; thực hiện nghiêm túc chế độ báo cáo định kỳ và đột xuất với Huyện ủy Tháp Mười và cơ quan quản lý chuyên môn.'),

          h1('Chương II\nNHIỆM VỤ, QUYỀN HẠN CỦA CÁ NHÂN CÁC ĐỒNG CHÍ ĐẢNG ỦY VIÊN'),
          h2('Điều 2. Nhiệm vụ, quyền hạn chung của Đảng ủy viên'),
          p('1. Chịu trách nhiệm trước Ban Chấp hành Đảng bộ về toàn bộ kết quả lãnh đạo, chỉ đạo trong lĩnh vực, chi bộ hoặc cơ sở trường được phân công phụ trách.'),
          p('2. Nêu cao tính tiên phong, gương mẫu chấp hành Cương lĩnh chính trị, Điều lệ Đảng, chính sách pháp luật của Nhà nước và quy tắc ứng xử nhà giáo; giữ gìn khối đoàn kết thống nhất nội bộ; kiên quyết phòng, chống quan liêu, tham nhũng, lãng phí.'),
          p('3. Tham gia đầy đủ, đúng giờ các kỳ họp của Đảng ủy; chủ động nghiên cứu tài liệu, tích cực thảo luận, biểu quyết các chủ trương, nghị quyết của Đảng ủy và nghiêm túc thực hiện nghị quyết khi đã được tập thể thông qua.'),
          p('4. Thường xuyên giữ mối liên hệ chặt chẽ với cán bộ, đảng viên, viên chức và học sinh ở cơ sở; chịu sự giám sát của tổ chức đảng và nhân dân nơi công tác, cư trú.'),

          h2('Điều 3. Nhiệm vụ, quyền hạn của Bí thư Đảng uỷ - Đồng chí Lê Thanh Cường (Hiệu trưởng)'),
          p('1. Là người đứng đầu Ban Chấp hành Đảng bộ, chịu trách nhiệm cao nhất trước Huyện ủy Tháp Mười, Giám đốc Sở GDĐT và Đảng bộ trường về toàn bộ hoạt động lãnh đạo của Đảng ủy và nhà trường trên cả 03 điểm trường.'),
          p('2. Chủ trì các công việc của Đảng ủy; triệu tập, chủ trì và kết luận các hội nghị của Đảng ủy; chủ động trao đổi trong Thường trực Đảng ủy về những chủ trương lớn, chiến lược phát triển giáo dục sau sáp nhập.'),
          p('3. Trực tiếp chỉ đạo công tác tổ chức, cán bộ; công tác quy hoạch nguồn cấp ủy, Ban Giám hiệu, tổ trưởng chuyên môn; chỉ đạo công tác bảo vệ chính trị nội bộ và công tác tài chính, tài sản nhà trường.'),
          p('4. Trực tiếp lãnh đạo, chỉ đạo các nhiệm vụ đột phá trọng tâm toàn khóa: Nâng cao chất lượng thi tốt nghiệp THPT, phát triển quy mô trường lớp đạt chuẩn quốc gia, đổi mới quản trị nhà trường theo định hướng chuyển đổi số.'),
          p('5. Thay mặt Ban Chấp hành Đảng bộ ký các nghị quyết, chỉ thị, kế hoạch, chương trình hành động, tờ trình gửi cấp ủy cấp trên và các văn bản chỉ đạo quan trọng của Đảng ủy.'),
          p('6. Giữ mối liên hệ công tác thường xuyên với Thường trực Huyện ủy Tháp Mười, Lãnh đạo Sở GDĐT Đồng Tháp, Đảng ủy và UBND xã Đốc Binh Kiều, xã Tân Kiều.'),

          h2('Điều 4. Nhiệm vụ, quyền hạn của Phó Bí thư Đảng uỷ - Đồng chí Nguyễn Minh Trí (Phó Hiệu trưởng)'),
          p('1. Là thường trực của Đảng ủy, chịu trách nhiệm trước Bí thư Đảng ủy và Ban Chấp hành về việc điều hành, giải quyết các công việc thường nhật của Đảng bộ; thay mặt Bí thư chủ trì công việc của Đảng bộ khi Bí thư đi vắng hoặc được ủy quyền.'),
          p('2. Trực tiếp phụ trách công tác xây dựng Đảng, công tác tư tưởng chính trị, nâng cao năng lực lãnh đạo của các tổ chức cơ sở đảng; chỉ đạo chuẩn bị nội dung, chương trình các kỳ họp thường kỳ và đột xuất của Đảng ủy.'),
          p('3. Phụ trách công tác thi đua, khen thưởng của Đảng bộ; theo dõi, đôn đốc các chi bộ và đoàn thể thực hiện các chỉ tiêu nghị quyết đã đề ra.'),
          p('4. Về chuyên môn chính quyền: Trực tiếp phụ trách công tác chuyên môn cấp THPT (14 lớp, 529 học sinh), kế hoạch ôn thi tốt nghiệp THPT, kỳ thi chọn học sinh giỏi THPT và nề nếp kỷ cương học sinh cấp THPT tại điểm chính.'),
          p('5. Trực tiếp theo dõi, giám sát toàn diện hoạt động của Chi bộ 1 và Chi bộ 3; ký các văn bản của Đảng ủy theo thẩm quyền hoặc khi được Bí thư ủy quyền.'),

          h2('Điều 5. Nhiệm vụ, quyền hạn của Đảng ủy viên, Bí thư Chi bộ 1 - Đồng chí Trịnh Văn Sơn (Tổ phó KHXH)'),
          p('1. Phụ trách toàn diện công tác Đảng tại Chi bộ 1 (Chi bộ Khối THPT và Ban Giám hiệu - Văn phòng điểm trường chính).'),
          p('2. Lãnh đạo cán bộ, giáo viên cấp THPT thực hiện nghiêm túc kế hoạch giáo dục nhà trường, phân phối chương trình GDPT 2018, đổi mới phương pháp giảng dạy và kiểm tra đánh giá theo định hướng phát triển năng lực.'),
          p('3. Trực tiếp chỉ đạo công tác bồi dưỡng học sinh giỏi văn hóa cấp tỉnh môn KHXH, công tác ôn thi tốt nghiệp THPT năm 2026 và các năm tiếp theo, bảo đảm giữ vững tỷ lệ tốt nghiệp trên 99.5%.'),
          p('4. Phối hợp với Đoàn Thanh niên phát hiện, bồi dưỡng nguồn học sinh ưu tú lớp 12 và giáo viên trẻ để giới thiệu cho Đảng ủy xem xét kết nạp.'),

          h2('Điều 6. Nhiệm vụ, quyền hạn của Đảng ủy viên, Bí thư Chi bộ 2 - Đồng chí Nguyễn Thanh Tòng (Phó Hiệu trưởng)'),
          p('1. Phụ trách toàn diện công tác Đảng tại Chi bộ 2 (Chi bộ Khối THCS Điểm trường Tân Kiều - gồm 15 lớp, 602 học sinh).'),
          p('2. Trực tiếp phụ trách điều hành mọi mặt hoạt động chuyên môn, cơ sở vật chất, an ninh trật tự, nề nếp học sinh tại Điểm trường Tân Kiều (cơ sở cách điểm chính 11km).'),
          p('3. Giữ mối quan hệ phối hợp thường xuyên với Đảng ủy, HĐND, UBND, Ủy ban MTTQ Việt Nam và các đoàn thể xã Tân Kiều nhằm làm tốt công tác xã hội hóa giáo dục, duy trì sĩ số, phòng chống bỏ học.'),
          p('4. Chỉ đạo công tác bồi dưỡng học sinh giỏi THCS, phụ đạo học sinh yếu kém và thực hiện giáo dục hòa nhập cho học sinh khuyết tật tại điểm Tân Kiều.'),

          h2('Điều 7. Nhiệm vụ, quyền hạn của Đảng ủy viên, Bí thư Chi bộ 3 - Đồng chí Lê Văn Nguyên (Tổ trưởng GDTC - QPAN - Nghệ thuật)'),
          p('1. Phụ trách toàn diện công tác Đảng tại Chi bộ 3 (Chi bộ Khối THCS Điểm trường Đốc Binh Kiều - gồm 24 lớp, 980 học sinh).'),
          p('2. Lãnh đạo đảng viên, giáo viên nâng cao nề nếp học tập, kỷ cương học đường tại điểm Đốc Binh Kiều; triển khai hiệu quả chương trình GDPT 2018 cấp THCS.'),
          p('3. Phụ trách phong trào thể dục thể thao, Hội khỏe Phù Đổng, giáo dục quốc phòng - an ninh và hoạt động văn hóa - nghệ thuật trên toàn trường; xây dựng môi trường học đường xanh - sạch - đẹp - an toàn.'),
          p('4. Chỉ đạo công tác Đội TNTP Hồ Chí Minh và giáo dục kỹ năng sống cho học sinh cấp THCS.'),

          h2('Điều 8. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Tổ chức Đảng - Đồng chí Lê Thị Ngọc Tuyền (Tổ trưởng Ngoại ngữ - Tin học)'),
          p('1. Tham mưu cho Đảng ủy về công tác tổ chức xây dựng Đảng, củng cố kiện toàn các chi bộ trực thuộc sau sáp nhập.'),
          p('2. Hướng dẫn, thẩm định và chuẩn bị đầy đủ hồ sơ trình Đảng ủy xem xét, đề nghị cấp trên quyết định kết nạp đảng viên mới và công nhận đảng viên chính thức đúng quy trình, tiêu chuẩn.'),
          p('3. Theo dõi, quản lý công tác rà soát quy hoạch cấp ủy nhiệm kỳ hiện tại và nhiệm kỳ kế tiếp; công tác đào tạo, bồi dưỡng lý luận chính trị và chuyên môn nghiệp vụ cho đảng viên.'),
          p('4. Chủ trì tổng hợp báo cáo công tác tổ chức, thống kê số lượng chất lượng đảng viên phục vụ công tác đánh giá, xếp loại cuối năm.'),

          h2('Điều 9. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Kiểm tra, Giám sát Đảng - Đồng chí Bùi Kim Huỳnh (Tổ trưởng KHTN)'),
          p('1. Tham mưu xây dựng dự thảo và tổ chức triển khai Chương trình kiểm tra, giám sát toàn khóa và kế hoạch kiểm tra, giám sát hằng năm của Đảng ủy.'),
          p('2. Trực tiếp thực hiện các cuộc kiểm tra, giám sát chuyên đề đối với 03 chi bộ và đảng viên trong việc chấp hành Điều lệ Đảng, nghị quyết cấp ủy, quy chế làm việc và thực hiện nhiệm vụ chuyên môn.'),
          p('3. Giám sát việc tu dưỡng, rèn luyện phẩm chất đạo đức, lối sống, trách nhiệm nêu gương của cán bộ, đảng viên; giám sát việc thực hiện Chỉ thị 05-CT/TW và công tác phòng, chống tham nhũng, lãng phí, tiêu cực.'),
          p('4. Tiếp nhận, thẩm tra, xác minh và tham mưu Đảng ủy giải quyết kịp thời đơn thư khiếu nại, tố cáo liên quan đến tổ chức đảng và đảng viên theo đúng thẩm quyền.'),

          h2('Điều 10. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Văn thư, Lưu trữ Đảng - Đồng chí Lê Hồng Thúy (Tổ trưởng KHXH)'),
          p('1. Đảm nhiệm vai trò Thư ký tại các kỳ họp thường kỳ và đột xuất của Ban Chấp hành Đảng bộ; ghi biên bản đầy đủ, trung thực, chính xác các ý kiến thảo luận và kết luận của đồng chí chủ trì.'),
          p('2. Dự thảo các thông báo kết luận cuộc họp, nghị quyết, công văn của Đảng ủy theo phân công của Bí thư và Phó Bí thư.'),
          p('3. Quản lý hệ thống văn bản đi, văn bản đến của Đảng ủy; thực hiện việc đăng ký, chuyển giao, xử lý văn bản theo đúng quy định bảo mật tài liệu của Đảng.'),
          p('4. Quản lý, sử dụng con dấu của Đảng ủy đúng nguyên tắc, an toàn tuyệt đối; chủ trì công tác lập hồ sơ lưu trữ và số hóa kho lưu trữ văn kiện Đảng bộ.'),

          h2('Điều 11. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Tuyên giáo - Đồng chí Thái Văn Tiến (Tổ phó KHTN)'),
          p('1. Tham mưu Đảng ủy tổ chức học tập, quán triệt, tuyên truyền các chủ trương, nghị quyết, chỉ thị của Đảng, chính sách, pháp luật của Nhà nước cho 100% cán bộ, giáo viên, nhân viên và học sinh.'),
          p('2. Phụ trách công tác bảo vệ nền tảng tư tưởng của Đảng, đấu tranh phản bác thông tin xấu độc trên không gian mạng theo Nghị quyết số 35-NQ/TW của Bộ Chính trị.'),
          p('3. Thường xuyên nắm bắt diễn biến tư tưởng, tâm tư, nguyện vọng của cán bộ, đảng viên, viên chức tại cả 03 điểm trường; kịp thời báo cáo, đề xuất Đảng ủy giải pháp định hướng tư tưởng, giữ vững khối đoàn kết nội bộ.'),
          p('4. Phụ trách công tác dân vận, xây dựng khối đại đoàn kết toàn trường; chỉ đạo, định hướng nội dung tuyên truyền cho Công đoàn và Đoàn Thanh niên.'),

          h2('Điều 12. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Đảng phí và Hồ sơ sổ sách Đảng - Đồng chí Nguyễn Trung Hiếu (Tổ phó Ngoại ngữ - Tin học)'),
          p('1. Quản lý, theo dõi toàn bộ hệ thống sổ sách nghiệp vụ đảng viên: Sổ danh sách đảng viên toàn Đảng bộ (85 đồng chí), sổ cấp phát thẻ Đảng, huy hiệu Đảng và sổ biên bản sinh hoạt.'),
          p('2. Trực tiếp quản trị, cập nhật và khai thác Phần mềm Cơ sở dữ liệu đảng viên 3.0 bảo đảm chính xác, an toàn, bảo mật thông tin tuyệt đối.'),
          p('3. Hướng dẫn, theo dõi, đôn đốc 03 chi bộ thực hiện việc thu, nộp đảng phí hàng tháng đúng quy định; thực hiện trích nộp đảng phí về Huyện ủy Tháp Mười đầy đủ, đúng thời hạn; lập dự toán và quyết toán kinh phí hoạt động đảng vụ công khai, minh bạch.'),
          p('4. Hướng dẫn nghiệp vụ hồ sơ chuyển sinh hoạt đảng (chuyển đi, chuyển đến, chuyển sinh hoạt đảng tạm thời) cho đảng viên trong Đảng bộ.'),

          h1('Chương III\nNGUYÊN TẮC VÀ CHẾ ĐỘ LÀM VIỆC'),
          h2('Điều 13. Nguyên tắc làm việc'),
          p('1. Ban Chấp hành Đảng bộ làm việc theo nguyên tắc tập trung dân chủ, tập thể lãnh đạo, cá nhân phụ trách; thiểu số phục tùng đa số, cấp dưới phục tùng cấp trên, cá nhân phục tùng tổ chức.'),
          p('2. Mọi chủ trương, đường lối, nghị quyết, kế hoạch công tác lớn về nhân sự, tài chính, cơ sở vật chất của Đảng bộ đều phải được thảo luận dân chủ và quyết định theo đa số (trên 1/2 tổng số Đảng ủy viên biểu quyết tán thành).'),
          p('3. Đảng ủy viên có quyền phát biểu, tranh luận và bảo lưu ý kiến cá nhân trong hội nghị, nhưng khi nghị quyết đã được ban hành thì phải tuyệt đối chấp hành và nói, làm theo đúng nghị quyết của Đảng.'),

          h2('Điều 14. Chế độ hội nghị của Đảng uỷ'),
          p('1. Đảng uỷ họp định kỳ mỗi tháng một lần vào tuần đầu tiên của tháng; khi cần thiết có thể triệu tập hội nghị bất thường hoặc sinh hoạt chuyên đề.'),
          p('2. Hội nghị Đảng uỷ chỉ tiến hành khi có ít nhất 2/3 tổng số ủy viên BCH đương nhiệm tham dự. Trường hợp vắng mặt phải báo cáo lý do và được đồng chí Bí thư (hoặc Phó Bí thư chủ trì) đồng ý.'),
          p('3. Văn phòng Đảng ủy (đồng chí Thúy) có trách nhiệm gửi tài liệu họp cho các Đảng ủy viên nghiên cứu trước ít nhất 02 ngày làm việc.'),

          h2('Điều 15. Chế độ thông tin, báo cáo và bảo mật'),
          p('1. Thực hiện nghiêm chế độ báo cáo định kỳ tháng, quý, 6 tháng, 9 tháng, năm và báo cáo đột xuất gửi Ban Thường vụ Huyện ủy Tháp Mười và Đảng ủy cấp trên.'),
          p('2. Các Đảng ủy viên và 03 Chi bộ trực thuộc thực hiện báo cáo tình hình hoạt động của chi bộ, tổ chuyên môn cho Thường trực Đảng ủy trước ngày 25 hàng tháng.'),
          p('3. Cán bộ, đảng viên phải chấp hành nghiêm quy định về bảo vệ bí mật của Đảng và Nhà nước; tuyệt đối không cung cấp, phát tán tài liệu nội bộ chưa được công bố ra ngoài hoặc lên không gian mạng.'),

          h2('Điều 16. Chế độ kiểm tra, giám sát'),
          p('1. Hằng năm, Đảng uỷ ban hành Kế hoạch kiểm tra, giám sát và phân công cụ thể cho đồng chí phụ trách công tác kiểm tra giám sát (đ/c Bùi Kim Huỳnh) chủ trì thực hiện.'),
          p('2. Mỗi chi bộ trực thuộc và từng Đảng ủy viên ít nhất 01 lần/năm được kiểm tra hoặc giám sát chuyên đề về việc thực hiện chức trách, nhiệm vụ được giao.'),

          h2('Điều 17. Chế độ đi cơ sở dự sinh hoạt chi bộ và tiếp xúc cán bộ, giáo viên, học sinh'),
          p('1. Các đồng chí trong Thường trực Đảng ủy và Đảng ủy viên được phân công định kỳ hàng tháng về dự sinh hoạt cùng các chi bộ trực thuộc (Chi bộ 1, Chi bộ 2, Chi bộ 3) để nắm bắt thực tế, hướng dẫn nâng cao chất lượng sinh hoạt chi bộ.'),
          p('2. Lãnh đạo Đảng ủy định kỳ tổ chức đối thoại, lắng nghe ý kiến đóng góp của cán bộ, giáo viên, nhân viên 3 điểm trường và học sinh, giải quyết thấu đáo các khó khăn, vướng mắc phát sinh.'),

          h1('Chương IV\nMỐI QUAN HỆ CÔNG TÁC'),
          h2('Điều 18. Với Huyện ủy Tháp Mười và cơ quan cấp trên trực tiếp'),
          p('Đảng ủy chịu sự lãnh đạo, chỉ đạo trực tiếp, toàn diện của Ban Chấp hành, Ban Thường vụ Huyện ủy Tháp Mười; chấp hành nghiêm các nghị quyết, chỉ thị, quy định và sự kiểm tra, giám sát của cấp ủy cấp trên.'),

          h2('Điều 19. Với Sở Giáo dục và Đào tạo Đồng Tháp'),
          p('Đảng ủy lãnh đạo Ban Giám hiệu chấp hành nghiêm sự chỉ đạo về chuyên môn nghiệp vụ, kế hoạch năm học, công tác thanh tra kiểm tra và các hướng dẫn quản lý giáo dục của Sở GDĐT Đồng Tháp.'),

          h2('Điều 20. Với Đảng ủy, HĐND, UBND xã Đốc Binh Kiều và xã Tân Kiều'),
          p('Đảng ủy giữ mối quan hệ phối hợp chặt chẽ với Đảng ủy, chính quyền 02 xã nơi trường đặt cơ sở để giữ gìn an ninh trật tự trường học, an toàn giao thông, quản lý học sinh ngoài giờ và phối hợp thực hiện tốt công tác giáo dục tại địa phương.'),

          h2('Điều 21. Với Ban Giám hiệu, Công đoàn và Đoàn Thanh niên nhà trường'),
          p('1. Đảng ủy lãnh đạo Ban Giám hiệu theo nguyên tắc tập thể lãnh đạo, phân công cá nhân phụ trách; tôn trọng và phát huy thẩm quyền, trách nhiệm quản lý, điều hành của Hiệu trưởng theo Điều lệ trường trung học.'),
          p('2. Đảng ủy lãnh đạo Công đoàn cơ sở, Đoàn TNCS Hồ Chí Minh thông qua nghị quyết và phân công đảng viên nòng cốt tham gia ban chấp hành các đoàn thể; tạo điều kiện thuận lợi nhất để các tổ chức đoàn thể hoạt động theo đúng điều lệ.'),

          h2('Điều 22. Với 03 Chi bộ trực thuộc'),
          p('Đảng ủy lãnh đạo, chỉ đạo trực tiếp, toàn diện đối với 03 chi bộ trực thuộc. Các chi bộ có trách nhiệm cụ thể hóa và thực hiện nghiêm túc các nghị quyết, chỉ thị của Đảng ủy; định kỳ báo cáo và xin ý kiến Đảng ủy về những vấn đề quan trọng vượt thẩm quyền.'),

          h1('Chương V\nĐIỀU KHOẢN THI HÀNH'),
          h2('Điều 23. Tổ chức thực hiện'),
          p('1. Các đồng chí trong Ban Chấp hành Đảng bộ, các chi bộ trực thuộc và toàn thể cán bộ, đảng viên Trường THCS và THPT Đốc Binh Kiều có trách nhiệm thực hiện nghiêm túc Quy chế này.'),
          p('2. Quy chế này có hiệu lực kể từ ngày ký. Trong quá trình thực hiện, nếu có nội dung cần sửa đổi, bổ sung, Ban Chấp hành Đảng bộ sẽ xem xét, quyết định theo đa số.'),

          createSignBlock(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Huyện ủy Tháp Mười (b/c);',
              'Sở GDĐT Đồng Tháp (b/c);',
              'Đảng ủy xã Đốc Binh Kiều & xã Tân Kiều (p/h);',
              'Ban Giám hiệu nhà trường;',
              '03 Chi bộ trực thuộc;',
              'Các đồng chí Đảng ủy viên;',
              'Lưu: Đảng ủy.'
            ]
          ),
        ],
      },
    ],
  });

  const buffer1 = await Packer.toBuffer(doc1);
  const path1Downloads = path.join(downloadsDir, '01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx');
  const path1DangBo = path.join(dangBoDir, '01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx');
  fs.writeFileSync(path1Downloads, buffer1);
  fs.writeFileSync(path1DangBo, buffer1);
  console.log('Saved File 1 successfully!');

  // =========================================================================
  // FILE 2: 02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx
  // =========================================================================
  console.log('Generating File 2: Thông báo phân công nhiệm vụ 10 ĐUV năm 2026...');

  const doc2 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 26 },
          paragraph: { spacing: { line: 276, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 1134, bottom: 1134, left: 1417, right: 1020 } },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Đảng ủy Trường THCS và THPT Đốc Binh Kiều - Phân công nhiệm vụ BCH năm 2026',
                    font: 'Times New Roman',
                    size: 18,
                    italics: true,
                    color: '666666',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Trang ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 20 }),
                  new TextRun({ text: ' / ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 20 }),
                ],
              }),
            ],
          }),
        },
        children: [
          createPartyHeaderTable('02-TB/ĐU', 'Đốc Binh Kiều, ngày 18 tháng 9 năm 2026'),
          new Paragraph({ spacing: { before: 180, after: 60 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'THÔNG BÁO', bold: true, font: 'Times New Roman', size: 30 })
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'PHÂN CÔNG NHIỆM VỤ CÁC ĐỒNG CHÍ ỦY VIÊN BAN CHẤP HÀNH ĐẢNG BỘ', bold: true, font: 'Times New Roman', size: 26 }),
          ]}),
          new Paragraph({ spacing: { after: 180 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU NĂM 2026', bold: true, font: 'Times New Roman', size: 26 }),
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: '-----', bold: true, font: 'Times New Roman', size: 24 }),
          ]}),

          p('- Căn cứ Điều lệ Đảng Cộng sản Việt Nam;', false, AlignmentType.JUSTIFIED, 24, true),
          p('- Căn cứ Quyết định của Ban Thường vụ Huyện ủy Tháp Mười về việc chỉ định Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030 gồm 10 đồng chí;', false, AlignmentType.JUSTIFIED, 24, true),
          p('- Căn cứ Quy chế làm việc số 01-QC/ĐU ngày 16/9/2026 của Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều;', false, AlignmentType.JUSTIFIED, 24, true),
          p('Xét yêu cầu nhiệm vụ lãnh đạo toàn diện nhà trường sau sáp nhập 3 trường (quy mô 120 cán bộ giáo viên nhân viên, 85 đảng viên, 53 lớp với 2.111 học sinh tại 03 điểm trường) và kết quả phiên họp Ban Chấp hành Đảng bộ;', false, AlignmentType.JUSTIFIED, 24, true),
          p('Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều thông báo phân công nhiệm vụ cụ thể cho các đồng chí trong Ban Chấp hành Đảng bộ như sau:', false, AlignmentType.JUSTIFIED, 26),

          h2('1. Đồng chí Lê Thanh Cường - Bí thư Đảng ủy (Hiệu trưởng):'),
          p('- Phụ trách chung và chịu trách nhiệm toàn diện trước Ban Thường vụ Huyện ủy Tháp Mười, Giám đốc Sở GDĐT về toàn bộ hoạt động của Đảng bộ và nhà trường tại cả 03 điểm trường.'),
          p('- Trực tiếp phụ trách công tác tổ chức cán bộ; quy hoạch, đào tạo, bồi dưỡng cán bộ; công tác bảo vệ chính trị nội bộ; công tác tài chính, tài sản nhà trường.'),
          p('- Chủ trì và điều hành các kỳ họp định kỳ và đột xuất của Ban Chấp hành Đảng bộ.'),
          p('- Trực tiếp chỉ đạo các định hướng chiến lược: Xây dựng trường đạt chuẩn quốc gia, đổi mới phương thức quản lý sau sáp nhập, chuyển đổi số và nâng cao chất lượng giáo dục toàn diện.'),
          p('- Phụ trách giám sát chung cả 03 chi bộ trực thuộc.'),

          h2('2. Đồng chí Nguyễn Minh Trí - Phó Bí thư Đảng ủy (Phó Hiệu trưởng):'),
          p('- Là thường trực Đảng ủy, chịu trách nhiệm giúp Bí thư điều hành, giải quyết các công việc thường xuyên của Đảng bộ; thay mặt Bí thư chủ trì giải quyết công việc khi Bí thư đi vắng hoặc được ủy nhiệm.'),
          p('- Trực tiếp phụ trách công tác xây dựng Đảng, công tác tư tưởng chính trị; chỉ đạo công tác chuẩn bị nội dung các hội nghị của Đảng ủy; phụ trách công tác thi đua, khen thưởng của Đảng bộ.'),
          p('- Về chính quyền: Trực tiếp phụ trách công tác chuyên môn cấp THPT (14 lớp, 529 học sinh), kế hoạch ôn thi tốt nghiệp THPT, kỳ thi chọn học sinh giỏi cấp THPT và nề nếp học sinh cấp THPT tại điểm chính.'),
          p('- Phụ trách theo dõi, chỉ đạo trực tiếp Chi bộ 1 và Chi bộ 3.'),

          h2('3. Đồng chí Trịnh Văn Sơn - Đảng ủy viên, Bí thư Chi bộ 1 (Tổ phó KHXH):'),
          p('- Trực tiếp làm Bí thư Chi bộ 1 (Khối THPT và Ban Giám hiệu - Văn phòng điểm trường chính), lãnh đạo toàn diện công tác Đảng tại Chi bộ 1.'),
          p('- Lãnh đạo đảng viên tổ Toán, Văn, KHTN, KHXH, Ngoại ngữ - Tin học thuộc khối THPT nâng cao chất lượng dạy học theo CT GDPT 2018.'),
          p('- Trực tiếp phụ trách công tác bồi dưỡng đội tuyển học sinh giỏi các môn KHXH cấp THPT; công tác phát hiện, bồi dưỡng đoàn viên học sinh lớp 12 ưu tú tạo nguồn phát triển Đảng.'),

          h2('4. Đồng chí Nguyễn Thanh Tòng - Đảng ủy viên, Bí thư Chi bộ 2 (Phó Hiệu trưởng):'),
          p('- Trực tiếp làm Bí thư Chi bộ 2 (Khối THCS Điểm trường Tân Kiều - gồm 15 lớp, 602 học sinh).'),
          p('- Trực tiếp quản lý, điều hành toàn diện cơ sở vật chất, chuyên môn, nề nếp kỷ cương dạy và học tại Điểm trường Tân Kiều (khoảng cách 11km).'),
          p('- Phụ trách công tác bồi dưỡng học sinh giỏi cấp THCS tại Tân Kiều; làm đầu mối giữ mối liên hệ mật thiết với Đảng ủy, UBND và các tổ chức đoàn thể xã Tân Kiều.'),

          h2('5. Đồng chí Lê Văn Nguyên - Đảng ủy viên, Bí thư Chi bộ 3 (Tổ trưởng GDTC - QPAN - Nghệ thuật):'),
          p('- Trực tiếp làm Bí thư Chi bộ 3 (Khối THCS Điểm trường Đốc Binh Kiều - gồm 24 lớp, 980 học sinh).'),
          p('- Lãnh đạo đảng viên khối THCS tại điểm Đốc Binh Kiều hoàn thành tốt nhiệm vụ giảng dạy và giáo dục học sinh; phụ trách phong trào thể dục thể thao, HKPĐ, GDQP-AN toàn trường.'),
          p('- Chỉ đạo phong trào Đội TNTP Hồ Chí Minh và rèn luyện kỹ năng sống cho học sinh THCS.'),

          h2('6. Đồng chí Lê Thị Ngọc Tuyền - Đảng ủy viên (Tổ trưởng Ngoại ngữ - Tin học):'),
          p('- Phụ trách công tác Tổ chức Đảng: Hướng dẫn, kiểm tra và chuẩn bị hồ sơ xét kết nạp đảng viên mới; hồ sơ chuyển đảng chính thức; chỉ tiêu kết nạp năm 2026 là từ 03 - 04 đồng chí.'),
          p('- Theo dõi, tham mưu rà soát bổ sung quy hoạch cấp ủy Đảng bộ và các chi bộ trực thuộc; quản lý hồ sơ bồi dưỡng lý luận chính trị và nhận thức về Đảng cho quần chúng ưu tú.'),

          h2('7. Đồng chí Bùi Kim Huỳnh - Đảng ủy viên (Tổ trưởng KHTN):'),
          p('- Phụ trách công tác Kiểm tra, Giám sát Đảng: Xây dựng dự thảo và triển khai Kế hoạch kiểm tra, giám sát năm 2026 của Đảng ủy đối với 03 chi bộ trực thuộc và đảng viên.'),
          p('- Giám sát đảng viên trong việc thực hiện nhiệm vụ chuyên môn, đạo đức nhà giáo, việc học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh; tham mưu xử lý đơn thư khiếu nại, tố cáo và kỷ luật Đảng.'),

          h2('8. Đồng chí Lê Hồng Thúy - Đảng ủy viên (Tổ trưởng KHXH):'),
          p('- Phụ trách công tác Văn thư, Lưu trữ Đảng: Đảm nhiệm vai trò Thư ký các cuộc họp Đảng ủy; ghi chép biên bản nghị quyết, soạn thảo văn bản kết luận theo chỉ đạo của Thường trực.'),
          p('- Quản lý văn bản đi, đến của Đảng bộ; bảo quản và sử dụng con dấu Đảng ủy đúng quy định; thực hiện số hóa văn kiện và sắp xếp hồ sơ lưu trữ Đảng ủy bảo mật, khoa học.'),

          h2('9. Đồng chí Thái Văn Tiến - Đảng ủy viên (Tổ phó KHTN):'),
          p('- Phụ trách công tác Tuyên giáo: Tổ chức học tập, tuyên truyền nghị quyết của Đảng, chính sách của Nhà nước; bảo vệ nền tảng tư tưởng Đảng theo Nghị quyết 35-NQ/TW.'),
          p('- Nắm bắt tình hình diễn biến tư tưởng, tâm tư, nguyện vọng của 120 CB-GV-NV và 2.111 học sinh tại cả 3 điểm trường; phụ trách công tác dân vận, xây dựng khối đoàn kết nội bộ, chỉ đạo phong trào Công đoàn và Đoàn thanh niên.'),

          h2('10. Đồng chí Nguyễn Trung Hiếu - Đảng ủy viên (Tổ phó Ngoại ngữ - Tin học):'),
          p('- Phụ trách công tác Đảng phí và Hồ sơ sổ sách Đảng: Quản trị, cập nhật và đồng bộ Phần mềm Cơ sở dữ liệu đảng viên 3.0 của toàn Đảng bộ (85 đảng viên).'),
          p('- Trực tiếp theo dõi, thu và trích nộp đảng phí của 03 chi bộ đầy đủ, kịp thời về Huyện ủy Tháp Mười; quản lý sổ danh sách đảng viên, sổ cấp phát huy hiệu Đảng và thẻ Đảng viên; hướng dẫn thủ tục chuyển sinh hoạt Đảng.'),

          h1('QUY ĐỊNH THỰC HIỆN'),
          p('1. Các đồng chí Đảng ủy viên căn cứ nhiệm vụ được phân công, chủ động xây dựng kế hoạch công tác cụ thể hằng tháng, hằng quý; phối hợp chặt chẽ với các bộ phận liên quan để hoàn thành tốt nhiệm vụ được giao.'),
          p('2. Định kỳ trước ngày 25 hàng tháng, các đồng chí báo cáo kết quả thực hiện nhiệm vụ được phân công về Thường trực Đảng ủy để tổng hợp phục vụ kỳ họp lệ tháng của Ban Chấp hành.'),
          p('3. Trong quá trình thực hiện, nếu có khó khăn, vướng mắc hoặc phát sinh công việc đột xuất, các đồng chí kịp thời báo cáo đồng chí Bí thư hoặc Phó Bí thư để xem xét, điều chỉnh cho phù hợp.'),

          createSignBlock(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Huyện ủy Tháp Mười (b/c);',
              'Ban Giám hiệu nhà trường;',
              '03 Chi bộ trực thuộc;',
              'Các đồng chí Đảng ủy viên (để t/h);',
              'Công đoàn, Đoàn thanh niên;',
              'Lưu: Đảng ủy.'
            ]
          ),
        ],
      },
    ],
  });

  const buffer2 = await Packer.toBuffer(doc2);
  const path2Downloads = path.join(downloadsDir, '02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx');
  const path2DangBo = path.join(dangBoDir, '02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx');
  fs.writeFileSync(path2Downloads, buffer2);
  fs.writeFileSync(path2DangBo, buffer2);
  console.log('Saved File 2 successfully!');

  // =========================================================================
  // FILE 3: 03_CTr_Hanh_dong_toan_khoa_2025_2030.docx
  // =========================================================================
  console.log('Generating File 3: Chương trình hành động toàn khóa 2025 - 2030...');

  const doc3 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 26 },
          paragraph: { spacing: { line: 276, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 1134, bottom: 1134, left: 1417, right: 1020 } },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Đảng ủy Trường THCS và THPT Đốc Binh Kiều - Chương trình hành động toàn khóa (2025 - 2030)',
                    font: 'Times New Roman',
                    size: 18,
                    italics: true,
                    color: '666666',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Trang ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 20 }),
                  new TextRun({ text: ' / ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 20 }),
                ],
              }),
            ],
          }),
        },
        children: [
          createPartyHeaderTable('03-CTr/ĐU', 'Đốc Binh Kiều, ngày 20 tháng 9 năm 2026'),
          new Paragraph({ spacing: { before: 180, after: 60 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'CHƯƠNG TRÌNH HÀNH ĐỘNG TOÀN KHÓA', bold: true, font: 'Times New Roman', size: 30 })
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'CỦA BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', bold: true, font: 'Times New Roman', size: 26 }),
          ]}),
          new Paragraph({ spacing: { after: 180 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'KHÓA I, NHIỆM KỲ 2025 – 2030', bold: true, font: 'Times New Roman', size: 26 }),
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: '-----', bold: true, font: 'Times New Roman', size: 24 }),
          ]}),

          p('Thực hiện Nghị quyết Đại hội Đảng toàn quốc lần thứ XIV; Nghị quyết Đại hội Đảng bộ tỉnh Đồng Tháp; Nghị quyết Đại hội Đảng bộ huyện Tháp Mười;'),
          p('Căn cứ Quyết định sáp nhập 3 trường: THPT Đốc Binh Kiều, THCS Đốc Binh Kiều, THCS Tân Kiều thành Trường THCS và THPT Đốc Binh Kiều;'),
          p('Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I ban hành Chương trình hành động toàn khóa nhiệm kỳ 2025 – 2030 với các nội dung trọng tâm như sau:'),

          h1('I. MỤC TIÊU VÀ HỆ THỐNG CHỈ TIÊU CHỦ YẾU'),
          h2('1. Mục tiêu tổng quát'),
          p('Xây dựng Đảng bộ Trường THCS và THPT Đốc Binh Kiều thực sự trong sạch, vững mạnh tiêu biểu; giữ vững khối đại đoàn kết thống nhất giữa đội ngũ 120 cán bộ, giáo viên, nhân viên từ 3 trường sau sáp nhập; nâng cao năng lực lãnh đạo và sức chiến đấu của 03 chi bộ trực thuộc; phát huy vai trò tiên phong gương mẫu của 85 đảng viên.'),
          p('Tập trung lãnh đạo thực hiện thắng lợi Chương trình Giáo dục phổ thông 2018 trên cả 2 cấp THCS và THPT; nâng cao chất lượng giáo dục toàn diện và giáo dục mũi nhọn học sinh giỏi; giữ vững tỷ lệ tốt nghiệp THPT trên 99.5%; đảm bảo quyền học tập tiến bộ của 2.111 học sinh thuộc 53 lớp, trong đó chăm sóc chu đáo 25 học sinh khuyết tật học hòa nhập; hiện đại hóa cơ sở vật chất ở cả 03 điểm trường, phấn đấu đạt trường chuẩn quốc gia giai đoạn 2025 – 2030.'),

          h2('2. Hệ thống các chỉ tiêu chủ yếu toàn khóa (16 chỉ tiêu)'),
          h3('2.1. Về công tác xây dựng Đảng và hệ thống chính trị:'),
          p('(1) Hàng năm, Đảng bộ xếp loại từ “Hoàn thành tốt nhiệm vụ” trở lên, trong đó có ít nhất 02 năm đạt “Hoàn thành xuất sắc nhiệm vụ”.'),
          p('(2) Trong nhiệm kỳ, kết nạp từ 15 đến 20 đảng viên mới (chú trọng cán bộ trẻ, giáo viên giỏi và đoàn viên học sinh THPT ưu tú).'),
          p('(3) 100% chi bộ trực thuộc (03 chi bộ) hàng năm đạt mức “Hoàn thành tốt nhiệm vụ”, không có chi bộ yếu kém.'),
          p('(4) Hàng năm có 100% đảng viên hoàn thành nhiệm vụ, trong đó trên 90% đảng viên hoàn thành tốt nhiệm vụ, 15% - 20% đảng viên hoàn thành xuất sắc nhiệm vụ.'),
          p('(5) Trong nhiệm kỳ, phấn đấu có ít nhất 02 mô hình tập thể hoặc cá nhân được cấp ủy cấp trên khen thưởng về “Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh” và “Dân vận khéo”.'),
          p('(6) Có ít nhất 02 đảng viên được Ban Thường vụ Huyện ủy khen thưởng danh hiệu “Đảng viên hoàn thành xuất sắc nhiệm vụ 05 năm liền”.'),

          h3('2.2. Về chuyên môn, chất lượng giáo dục và phát triển nhân lực:'),
          p('(7) Đạt từ 60 đến 80 giải học sinh giỏi văn hóa cấp tỉnh trong cả nhiệm kỳ (cả cấp THCS và cấp THPT).'),
          p('(8) Tỷ lệ tốt nghiệp THPT bình quân hàng năm đạt từ 99.5% trở lên (luôn cao hơn mặt bằng chung của tỉnh Đồng Tháp).'),
          p('(9) Tỷ lệ học sinh THCS hoàn thành chương trình lớp học đạt trên 98.5%; tỷ lệ xét công nhận tốt nghiệp THCS đạt 100%.'),
          p('(10) Tỷ lệ học sinh nghỉ bỏ học ở cả 03 điểm trường được duy trì ở mức dưới 0.4% (thấp hơn bình quân chung toàn tỉnh).'),
          p('(11) Đạt tỷ lệ 100% cán bộ, giáo viên hoàn thành bồi dưỡng kỹ năng số, ứng dụng công nghệ thông tin và AI an toàn trong giảng dạy hằng năm.'),
          p('(12) Nâng cao trình độ đội ngũ: Phấn đấu có thêm từ 05 - 08 cán bộ, giáo viên hoàn thành chương trình Thạc sĩ (nâng tổng số lên 14-17 Thạc sĩ); 100% cán bộ quản lý đạt trình độ Trung cấp LLCT trở lên.'),
          p('(13) 100% học sinh khuyết tật học hòa nhập (25 em) được lập hồ sơ kế hoạch giáo dục cá nhân và theo dõi đánh giá vì sự tiến bộ theo đúng Công văn số 3326/SGDĐT-GDTrH-TX&CN.'),

          h3('2.3. Về hoạt động ngoại khóa, đoàn thể và cơ sở vật chất:'),
          p('(14) Tỷ lệ học sinh tham gia Bảo hiểm y tế đạt 100% tại cả 3 điểm trường (2.111/2.111 học sinh).'),
          p('(15) Hàng năm tổ chức ít nhất 02 hoạt động trải nghiệm hướng nghiệp và 02 chuyến về nguồn, giáo dục truyền thống cách mạng cho học sinh tại Khu di tích Gò Tháp và Di tích Đốc Binh Kiều.'),
          p('(16) Đoàn TNCS Hồ Chí Minh và Công đoàn cơ sở nhà trường đạt danh hiệu “Hoàn thành xuất sắc nhiệm vụ” 05 năm liên tục.'),

          h3('2.4. Về thi đua tập thể:'),
          p('(17) Phấn đấu tập thể nhà trường đạt danh hiệu “Tập thể Lao động Xuất sắc” ít nhất 03 lần trong nhiệm kỳ, nhận Cờ thi đua của UBND tỉnh Đồng Tháp và hoàn thành công nhận Trường đạt Chuẩn quốc gia mức độ 1.'),

          h1('II. BA KHÂU ĐỘT PHÁ TOÀN KHÓA'),
          p('1. Đột phá 1: Đồng bộ hóa cơ chế điều hành và chuyển đổi số liên cơ sở (03 điểm trường). Xóa bỏ khoảng cách địa lý 11km giữa điểm chính và Điểm Tân Kiều bằng mô hình quản trị số: Họp giao ban trực tuyến kết hợp trực tiếp, điều hành hồ sơ trên môi trường số, 100% giáo án, học bạ và sổ điểm điện tử.'),
          p('2. Đột phá 2: Liên thông chất lượng dạy và học giữa 2 cấp THCS và THPT. Xây dựng chiến lược đào tạo mũi nhọn học sinh giỏi và ôn thi tuyển sinh, tốt nghiệp bài bản ngay từ khối THCS chuyển tiếp lên THPT, giữ vững vị thế chất lượng của trường trong cụm thi đua.'),
          p('3. Đột phá 3: Xây dựng văn hóa nhà trường đoàn kết, nhân ái, gương mẫu sau sáp nhập. Phát huy tinh thần tiên phong của 85 đảng viên, khơi dậy khát vọng cống hiến của 120 CB-GV-NV, chăm lo chu đáo đời sống vật chất và tinh thần cho người lao động.'),

          h1('III. NHIỆM VỤ VÀ CÁC GIẢI PHÁP CHỦ YẾU'),
          h2('1. Đổi mới phương thức lãnh đạo của Đảng ủy và nâng cao hiệu lực quản lý của Ban Giám hiệu'),
          p('- Đổi mới mạnh mẽ lề lối làm việc theo hướng sâu sát cơ sở, phân công rõ người, rõ việc, rõ thời gian hoàn thành cho 10 đồng chí Đảng ủy viên.'),
          p('- Duy trì nghiêm mô hình “Cuộc họp không văn bản giấy”, khai thác tối đa nền tảng số và mạng xã hội chuyên trách để trao đổi công việc nhanh chóng, tiết kiệm.'),
          p('- Đẩy mạnh cải cách thủ tục hành chính học đường; công khai minh bạch mọi quy trình công tác, chế độ chính sách và các khoản thu chi tài chính.'),

          h2('2. Công tác xây dựng, chỉnh đốn Đảng và nâng cao chất lượng đội ngũ'),
          p('- Tăng cường giáo dục chính trị tư tưởng, rèn luyện phẩm chất đạo đức nhà giáo, chống các biểu hiện suy thoái, “tự diễn biến”, “tự chuyển hóa”.'),
          p('- Nâng cao chất lượng sinh hoạt tại 03 chi bộ trực thuộc (Chi bộ 1: Khối THPT & BGH; Chi bộ 2: Khối THCS Tân Kiều; Chi bộ 3: Khối THCS Đốc Binh Kiều), gắn nội dung sinh hoạt Đảng với việc giải quyết các vấn đề chuyên môn nóng bỏng của từng cơ sở.'),
          p('- Thực hiện nghiêm túc quy định về trách nhiệm nêu gương của cán bộ quản lý, đảng viên; lấy kết quả hoàn thành nhiệm vụ giáo dục làm thước đo đánh giá xếp loại cuối năm.'),

          h2('3. Lãnh đạo thực hiện thắng lợi nhiệm vụ chuyên môn và phát triển học sinh'),
          p('- Bố trí, sắp xếp đội ngũ 102 giáo viên hợp lý theo chuyên môn, bảo đảm cân đối giữa các bộ môn và 3 điểm trường.'),
          p('- Tăng cường thanh tra, kiểm tra nội bộ học đường theo hướng dẫn của Sở GDĐT Đồng Tháp; đổi mới sinh hoạt chuyên môn theo hình thức nghiên cứu bài học.'),
          p('- Xây dựng kế hoạch phụ đạo học sinh có nguy cơ học lực yếu kém, kiên quyết kéo giảm tỷ lệ bỏ học dưới 0.4%; hỗ trợ tận tình 25 học sinh khuyết tật học hòa nhập.'),

          h2('4. Xây dựng cơ sở vật chất và tăng cường công tác đoàn thể'),
          p('- Tranh thủ các nguồn lực đầu tư của tỉnh và huyện để kiên cố hóa, bổ sung phòng học bộ môn, máy vi tính và thiết bị thể dục thể thao tại 3 điểm trường.'),
          p('- Phát huy tối đa vai trò của Công đoàn, Đoàn Thanh niên, Hội Khuyến học trong việc vận động học sinh, chăm lo học sinh có hoàn cảnh khó khăn.'),

          h1('IV. TỔ CHỨC THỰC HIỆN'),
          p('1. Đảng ủy tổ chức hội nghị toàn Đảng bộ quán triệt Chương trình hành động toàn khóa đến 100% đảng viên, cán bộ, giáo viên, nhân viên.'),
          p('2. Cấp ủy 03 chi bộ trực thuộc, Ban Giám hiệu và các đoàn thể căn cứ Chương trình này xây dựng kế hoạch cụ thể hóa phù hợp với đặc thù từng cơ sở.'),
          p('3. Giao đồng chí Bùi Kim Huỳnh (phụ trách kiểm tra giám sát) chủ trì, phối hợp với các Đảng ủy viên theo dõi, đôn đốc, định kỳ 6 tháng và hàng năm báo cáo Đảng ủy kết quả thực hiện.'),

          createSignBlock(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Huyện ủy Tháp Mười (b/c);',
              'Sở GDĐT Đồng Tháp (b/c);',
              '03 Chi bộ trực thuộc (t/h);',
              'Ban Giám hiệu nhà trường (t/h);',
              'Công đoàn, Đoàn trường (p/h);',
              'Các đồng chí Đảng ủy viên;',
              'Lưu: Đảng ủy.'
            ]
          ),
        ],
      },
    ],
  });

  const buffer3 = await Packer.toBuffer(doc3);
  const path3Downloads = path.join(downloadsDir, '03_CTr_Hanh_dong_toan_khoa_2025_2030.docx');
  const path3DangBo = path.join(dangBoDir, '03_CTr_Hanh_dong_toan_khoa_2025_2030.docx');
  fs.writeFileSync(path3Downloads, buffer3);
  fs.writeFileSync(path3DangBo, buffer3);
  console.log('Saved File 3 successfully!');

  // =========================================================================
  // FILE 4: 04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx
  // =========================================================================
  console.log('Generating File 4: Chương trình hành động năm 2026 sau sáp nhập...');

  const doc4 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 26 },
          paragraph: { spacing: { line: 276, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: { margin: { top: 1134, bottom: 1134, left: 1417, right: 1020 } },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Đảng ủy Trường THCS và THPT Đốc Binh Kiều - Chương trình hành động năm 2026 sau sáp nhập',
                    font: 'Times New Roman',
                    size: 18,
                    italics: true,
                    color: '666666',
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Trang ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 20 }),
                  new TextRun({ text: ' / ', font: 'Times New Roman', size: 20 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 20 }),
                ],
              }),
            ],
          }),
        },
        children: [
          createPartyHeaderTable('04-CTr/ĐU', 'Đốc Binh Kiều, ngày 22 tháng 9 năm 2026'),
          new Paragraph({ spacing: { before: 180, after: 60 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'CHƯƠNG TRÌNH HÀNH ĐỘNG NĂM 2026', bold: true, font: 'Times New Roman', size: 30 })
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: 'CỦA BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU, KHÓA I', bold: true, font: 'Times New Roman', size: 26 }),
          ]}),
          new Paragraph({ spacing: { after: 180 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: '(NĂM ĐẦU TIÊN VẬN HÀNH BỘ MÁY SAU SÁP NHẬP 3 TRƯỜNG)', bold: true, italics: true, font: 'Times New Roman', size: 24 }),
          ]}),
          new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: '-----', bold: true, font: 'Times New Roman', size: 24 }),
          ]}),

          p('Năm 2026 có ý nghĩa đặc biệt quan trọng: Là năm diễn ra Đại hội đại biểu toàn quốc lần thứ XIV của Đảng; đồng thời là năm học bản lề đầu tiên Trường THCS và THPT Đốc Binh Kiều đi vào vận hành sau quyết định sáp nhập 3 trường: THPT Đốc Binh Kiều, THCS Đốc Binh Kiều và THCS Tân Kiều.'),
          p('Để ổn định nhanh chóng tổ chức bộ máy, củng cố sự đoàn kết nhất trí của 120 cán bộ, giáo viên, nhân viên, phát huy vai trò hạt nhân chính trị của 85 đảng viên tại 03 chi bộ trực thuộc, bảo đảm quyền lợi học tập của 2.111 học sinh thuộc 53 lớp trên cả 03 điểm trường, Ban Chấp hành Đảng bộ xây dựng Chương trình hành động năm 2026 như sau:'),

          h1('I. MỤC TIÊU VÀ 10 CHỈ TIÊU TRỌNG TÂM NĂM 2026'),
          h2('1. Mục tiêu chung'),
          p('Tập trung lãnh đạo, chỉ đạo vận hành thông suốt, hiệu lực, hiệu quả bộ máy quản lý tại 03 điểm trường; ổn định tư tưởng, củng cố tình đoàn kết gắn bó trong toàn thể đội ngũ; đảm bảo kỷ cương nền nếp dạy và học; nâng cao chất lượng thi tốt nghiệp THPT, kỳ thi chọn học sinh giỏi cấp tỉnh và chăm lo giáo dục hòa nhập cho 25 học sinh khuyết tật; xây dựng Đảng bộ trong sạch, vững mạnh.'),

          h2('2. Hệ thống 10 chỉ tiêu trọng tâm năm 2026'),
          p('(1) Xếp loại Đảng bộ: Đạt mức “Hoàn thành tốt nhiệm vụ” trở lên, phấn đấu đạt “Hoàn thành xuất sắc nhiệm vụ”.'),
          p('(2) Công tác phát triển Đảng: Kết nạp từ 03 - 04 đảng viên mới (trong đó có 01 học sinh THPT ưu tú và 02-03 giáo viên trẻ).'),
          p('(3) Học sinh giỏi văn hóa cấp tỉnh: Đạt ít nhất 15 giải cấp tỉnh trong năm 2026 (cấp THCS 07 giải, cấp THPT 08 giải).'),
          p('(4) Hội thảo chuyên môn: Tổ chức ít nhất 02 buổi hội thảo, chuyên đề chuyên môn cấp cụm/tỉnh về đổi mới phương pháp giảng dạy và kiểm tra đánh giá theo CT GDPT 2018 liên thông 2 cấp THCS - THPT.'),
          p('(5) Tỷ lệ học sinh nghỉ bỏ học: Duy trì ở mức dưới 0.4% trên cả 03 điểm trường (thấp hơn mặt bằng chung của tỉnh).'),
          p('(6) Tỷ lệ tốt nghiệp THPT: Đạt từ 99.8% trở lên, nâng điểm trung bình các môn thi tốt nghiệp nằm trong tốp đầu của huyện Tháp Mười.'),
          p('(7) Chuyển đổi số giáo viên: Đạt tỷ lệ 100% cán bộ, giáo viên được bồi dưỡng kỹ năng số và ứng dụng CNTT, AI an toàn trong giáo dục.'),
          p('(8) Hoạt động ngoại khóa: Tổ chức ít nhất 02 hoạt động hướng nghiệp - khởi nghiệp và 02 hoạt động trải nghiệm “Về nguồn” cho học sinh 3 điểm trường.'),
          p('(9) Bảo hiểm y tế học sinh: Đạt tỷ lệ 100% học sinh tham gia BHYT (2.111/2.111 học sinh).'),
          p('(10) Đoàn thể: Công đoàn cơ sở và Đoàn Thanh niên trường xếp loại “Hoàn thành xuất sắc nhiệm vụ”.'),

          h1('II. CÁC NHÓM GIẢI PHÁP CHỦ YẾU NĂM 2026'),
          h2('1. Đổi mới phương thức lãnh đạo, điều hành của Đảng ủy và Ban Giám hiệu'),
          p('- Thiết lập quy chế giao ban trực tuyến định kỳ giữa Ban Giám hiệu với cán bộ phụ trách Điểm trường Tân Kiều (11km) và Điểm Đốc Binh Kiều để nắm bắt tình hình hằng ngày.'),
          p('- Đẩy mạnh thực hiện mô hình “Cuộc họp không văn bản giấy”; phân công công việc khoa học theo năng lực sở trường của 10 đồng chí Đảng ủy viên, tránh chồng chéo hoặc bỏ sót nhiệm vụ.'),
          p('- Tuyên dương, khen thưởng kịp thời các tập thể, cá nhân có thành tích xuất sắc, có sáng kiến hay trong việc ổn định đơn vị sau sáp nhập.'),

          h2('2. Về công tác xây dựng, chỉnh đốn Đảng và tư tưởng chính trị'),
          p('- Nâng cao chất lượng sinh hoạt của 03 chi bộ trực thuộc: Chi bộ 1 (Khối THPT & BGH), Chi bộ 2 (Khối THCS Tân Kiều), Chi bộ 3 (Khối THCS Đốc Binh Kiều); thực hiện sinh hoạt chuyên đề ít nhất 01 lần/quý.'),
          p('- Thực hiện nghiêm túc quy định về trách nhiệm nêu gương của cán bộ, đảng viên, trước hết là Hiệu trưởng, các Phó Hiệu trưởng và Bí thư chi bộ.'),
          p('- Đẩy mạnh công tác kiểm tra, giám sát thường xuyên đối với đảng viên về kỷ luật phát ngôn, phẩm chất đạo đức nhà giáo và trách nhiệm giảng dạy.'),

          h2('3. Về thực hiện nhiệm vụ chính trị, chuyên môn dạy học'),
          p('- Ban Giám hiệu xây dựng kế hoạch phân công chuyên môn công bằng, minh bạch, tạo điều kiện thuận lợi nhất cho giáo viên đi lại giảng dạy giữa các điểm trường.'),
          p('- Tập trung cao độ cho công tác ôn thi tốt nghiệp THPT năm 2026; tổ chức phụ đạo cho học sinh học lực yếu, học sinh có hoàn cảnh khó khăn.'),
          p('- Triển khai nghiêm túc kế hoạch giáo dục hòa nhập cho 25 học sinh khuyết tật theo Công văn số 3326/SGDĐT-GDTrH-TX&CN; tuyệt đối không bỏ rơi học sinh yếu thế.'),
          p('- Khai thác, sử dụng hiệu quả phòng tin học, phòng thí nghiệm thực hành và thiết bị nghe nhìn ở cả 3 điểm trường; đẩy mạnh số hóa hồ sơ sổ sách.'),

          h2('4. Về công tác đoàn thể và phối hợp xã hội'),
          p('- Công đoàn cơ sở phát động phong trào thi đua “Đoàn kết - Đổi mới - Sáng tạo”; kịp thời thăm hỏi, trợ cấp cho các giáo viên, nhân viên có hoàn cảnh khó khăn sau sáp nhập.'),
          p('- Đoàn trường và Liên đội Đội phối hợp tổ chức các sân chơi văn nghệ, thể thao liên cơ sở nhằm gắn kết tình bạn giữa học sinh THCS và THPT.'),
          p('- Giữ mối liên hệ chặt chẽ với Đảng ủy, UBND 02 xã Đốc Binh Kiều và Tân Kiều để phối hợp giữ vững an ninh trật tự trường học.'),

          h1('III. LỘ TRÌNH TỔ CHỨC THỰC HIỆN NĂM 2026'),
          p('1. Quý I/2026: Kiện toàn tổ chức bộ máy, ban hành Quy chế làm việc 01-QC/ĐU, Thông báo phân công nhiệm vụ 02-TB/ĐU; tổ chức kỷ niệm các ngày lễ lớn; kiểm tra nề nếp sau Tết Nguyên đán.'),
          p('2. Quý II/2026: Đẩy mạnh bồi dưỡng học sinh giỏi; tổ chức các đợt thi thử và ôn tập cao điểm thi tốt nghiệp THPT; xét công nhận tốt nghiệp THCS; sơ kết công tác Đảng 6 tháng đầu năm.'),
          p('3. Quý III/2026: Đánh giá kết quả thi tốt nghiệp THPT; chuẩn bị chu đáo cơ sở vật chất, đội ngũ đón chào năm học mới 2026 - 2027 cho 53 lớp và 2.111 học sinh; tổ chức Khai giảng đồng bộ tại 3 điểm trường.'),
          p('4. Quý IV/2026: Tổ chức kiểm tra chuyên đề các chi bộ; kiểm điểm, đánh giá, xếp loại chất lượng tổ chức đảng, đảng viên và tổng kết công tác Đảng năm 2026; bình xét thi đua khen thưởng.'),

          createSignBlock(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Huyện ủy Tháp Mười (b/c);',
              'Sở GDĐT Đồng Tháp (b/c);',
              'Đảng ủy xã Đốc Binh Kiều & xã Tân Kiều (p/h);',
              'Ban Giám hiệu nhà trường (t/h);',
              '03 Chi bộ trực thuộc (t/h);',
              'Các đồng chí Đảng ủy viên;',
              'Lưu: Đảng ủy.'
            ]
          ),
        ],
      },
    ],
  });

  const buffer4 = await Packer.toBuffer(doc4);
  const path4Downloads = path.join(downloadsDir, '04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx');
  const path4DangBo = path.join(dangBoDir, '04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx');
  fs.writeFileSync(path4Downloads, buffer4);
  fs.writeFileSync(path4DangBo, buffer4);
  console.log('Saved File 4 successfully!');

  console.log('--- HOÀN THÀNH TẠO 4 VĂN KIỆN CÔNG TÁC ĐẢNG BỘ ĐÃ TÙY BIẾN CHO ĐƠN VỊ MỚI ---');
}

generateAllPartyDocuments().catch(console.error);

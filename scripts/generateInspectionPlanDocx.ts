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

export async function generateAllInspectionDocuments() {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // 1. GENERATE PLAN DOCX
  console.log('Generating School Internal Inspection Plan DOCX...');
  const planDoc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 24 }, // 12pt
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
            'Số: 48/KH-THCS&THPTĐBK',
            'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
            'Độc lập - Tự do - Hạnh phúc',
            'Tháp Mười, ngày 15 tháng 10 năm 2026'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 60 },
            children: [
              new TextRun({ text: 'KẾ HOẠCH', bold: true, font: 'Times New Roman', size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'Kiểm tra nội bộ năm học 2026 - 2027', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: '(Ban hành kèm theo Quyết định số 48/QĐ-THCS&THPTĐBK ngày 15 tháng 10 năm 2026 của Hiệu trưởng)', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),

          // Căn cứ
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05/8/2025 của Chính phủ về hoạt động kiểm tra chuyên ngành;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Quyết định số 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 của Sở GDĐT Đồng Tháp V/v thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Công văn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25/9/2026 của Trường THCS và THPT Đốc Binh Kiều,', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 120 },
            children: [
              new TextRun({ text: 'Trường THCS và THPT Đốc Binh Kiều ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 với các nội dung trọng tâm như sau:', font: 'Times New Roman', size: 24 }),
            ],
          }),

          // I. MỤC ĐÍCH YÊU CẦU
          new Paragraph({
            spacing: { before: 160, after: 60 },
            children: [
              new TextRun({ text: 'I. MỤC ĐÍCH, YÊU CẦU', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Mục đích:', bold: true, font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Xem xét và đánh giá toàn diện các hoạt động giáo dục, điều kiện dạy và học trong phạm vi quản lý của nhà trường, đặc biệt trong bối cảnh sáp nhập quản lý 3 điểm trường (Điểm chính THPT, Điểm THCS Đốc Binh Kiều và Điểm THCS Tân Kiều cách 11km) với quy mô 53 lớp, 2.111 học sinh và 120 cán bộ, giáo viên, nhân viên.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Giúp Ban Giám hiệu thu thập thông tin xác thực, điều hành khoa học, kịp thời phát hiện biểu dương những nhân tố tích cực, đồng thời ngăn ngừa, chấn chỉnh các sai sót, khuyết điểm phát sinh trong thực thi nhiệm vụ chuyên môn và công vụ.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Yêu cầu:', bold: true, font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Thực hiện đúng các quy định pháp luật, chỉ đạo của Sở GDĐT Đồng Tháp; bảo đảm tính chính xác, khách quan, công khai, dân chủ và kịp thời; không gây trở ngại, áp lực cho hoạt động dạy học của giáo viên và học sinh.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Có trọng tâm, trọng điểm, kết hợp chặt chẽ giữa kiểm tra thường xuyên theo kế hoạch và kiểm tra đột xuất; phân công rõ người, rõ việc, rõ thẩm quyền và thời hạn giải quyết.', font: 'Times New Roman', size: 23 }),
            ],
          }),

          // II. NỘI DUNG KIỂM TRA
          new Paragraph({
            spacing: { before: 160, after: 60 },
            children: [
              new TextRun({ text: 'II. NỘI DUNG VÀ NHIỆM VỤ KIỂM TRA TRỌNG TÂM', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Kiểm tra việc thực hiện nhiệm vụ của người đứng đầu và Ban Giám hiệu:', bold: true, font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Thực hiện quy chế dân chủ ở cơ sở; xây dựng và công khai chiến lược phát triển; quản lý ngân sách nhà nước, các khoản thu hộ - chi hộ, kinh phí hoạt động Ban đại diện Cha mẹ học sinh theo Thông tư 55/2011/TT-BGDĐT; quản lý cơ sở vật chất, đất đai, phòng học tại 3 điểm trường; công tác an toàn trường học, PCCC, phòng chống tham nhũng, lãng phí và tiếp công dân.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Kiểm tra hoạt động sư phạm của giáo viên:', bold: true, font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Kiểm tra việc chấp hành quy chế chuyên môn: kế hoạch bài dạy theo CV 5512, dự giờ đánh giá tiết dạy phát triển năng lực học sinh, đổi mới phương pháp giảng dạy, thực hiện kiểm tra đánh giá thường xuyên và định kỳ theo Thông tư 22/2021/TT-BGDĐT; kiểm tra việc chấp hành quy định không dạy thêm, học thêm trái quy định; đạo đức nhà giáo và văn hóa công vụ.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. Kiểm tra hoạt động của các tổ chuyên môn và bộ phận phục vụ:', bold: true, font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Kiểm tra nền nếp sinh hoạt chuyên môn định kỳ 2 tuần/lần của 06 Tổ chuyên môn; hồ sơ quản lý của Tổ trưởng; việc bồi dưỡng học sinh giỏi và phụ đạo học sinh yếu; kiểm tra công tác văn thư lưu trữ theo Nghị định 30/2020/NĐ-CP; quản lý và sử dụng thiết bị, phòng thực hành Lý - Hóa - Sinh; công tác thư viện, kế toán, thủ quỹ, y tế trường học và bảo vệ.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '4. Kiểm tra công tác quản lý chất lượng và chuyển đổi số:', bold: true, font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Kiểm tra công tác ra đề, coi, chấm thi định kỳ; vận hành cơ sở dữ liệu ngành Đúng - Đủ - Sạch - Sống; số hóa học bạ điện tử, sổ điểm điện tử; kiểm tra việc thực hiện giáo dục hòa nhập cho 25 học sinh khuyết tật tại 3 điểm trường theo Công văn số 3326/SGDĐT-GDTrH-TX&CN ngày 14/10/2024 của Sở GDĐT Đồng Tháp.', font: 'Times New Roman', size: 23 }),
            ],
          }),

          // III. DANH MỤC CÁC CUỘC KIỂM TRA
          new Paragraph({
            spacing: { before: 160, after: 60 },
            children: [
              new TextRun({ text: 'III. DANH MỤC CÁC CUỘC KIỂM TRA TRONG NĂM HỌC 2026 - 2027', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Table({
            width: { size: 9469, type: WidthType.DXA },
            borders: cellGridBorder,
            rows: [
              new TableRow({
                children: [
                  new TableCell({ width: { size: 600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TT', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 3000, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung kiểm tra', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 2000, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Đối tượng & Điểm trường', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 1200, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 1200, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hình thức', bold: true, size: 20 })] })] }),
                  new TableCell({ width: { size: 1469, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Người phụ trách', bold: true, size: 20 })] })] }),
                ],
              }),
              ...[
                { tt: '1', nd: 'Kiểm tra công tác quản lý đầu năm học, nền nếp học sinh và kế hoạch giáo dục của các tổ chuyên môn', dt: '06 Tổ chuyên môn, Đoàn Đội (Cả 3 điểm trường)', tg: 'Tháng 10/2026', ht: 'Toàn diện', pt: 'Nguyễn Minh Trí (PHT)' },
                { tt: '2', nd: 'Kiểm tra công tác quản lý tài chính, thu nộp đầu năm, vận động tài trợ và quỹ Ban đại diện CMHS', dt: 'Bộ phận Tài chính, Thủ quỹ, BĐD CMHS (Điểm chính)', tg: 'Tháng 10/2026', ht: 'Chuyên đề', pt: 'Lê Thanh Cường (HT)' },
                { tt: '3', nd: 'Kiểm tra chuyên đề thực hiện CT GDPT 2018 và CSVC tại Điểm trường Tân Kiều (cách 11km)', dt: 'Cán bộ, GV và học sinh THCS Điểm Tân Kiều', tg: 'Tháng 11/2026', ht: 'Chuyên đề', pt: 'Trần Minh Hậu (PHT)' },
                { tt: '4', nd: 'Kiểm tra hoạt động sư phạm của nhà giáo (Đợt 1: 06 giáo viên cấp THCS và THPT)', dt: '06 GV các tổ Toán-Tin, Văn, KHTN, Tiếng Anh', tg: 'Tháng 11/2026', ht: 'Toàn diện', pt: 'Nguyễn Minh Trí (PHT)' },
                { tt: '5', nd: 'Kiểm tra công tác thiết bị dạy học, phòng thí nghiệm thực hành và Thư viện tại 3 điểm trường', dt: 'Cán bộ thiết bị, thư viện, phòng bộ môn (3 điểm trường)', tg: 'Tháng 12/2026', ht: 'Chuyên đề', pt: 'Trần Minh Hậu (PHT)' },
                { tt: '6', nd: 'Kiểm tra công tác tổ chức kiểm tra, đánh giá cuối học kỳ I năm học 2026 - 2027', dt: 'Tổ ra đề, Ban coi chấm thi, các tổ bộ môn (Toàn trường)', tg: 'Tháng 12/2026', ht: 'Toàn diện', pt: 'Nguyễn Minh Trí (PHT)' },
                { tt: '7', nd: 'Kiểm tra công tác chuyển đổi số, an toàn thông tin và CSDL ngành Đúng - Đủ - Sạch - Sống', dt: 'Bộ phận CNTT, văn thư số, GVCN 53 lớp', tg: 'Tháng 01/2027', ht: 'Chuyên đề', pt: 'Lê Thanh Cường (HT)' },
                { tt: '8', nd: 'Sơ kết công tác KTNB học kỳ I và hoàn tất báo cáo gửi Sở GDĐT (hạn trước 20/01/2027)', dt: 'Toàn thể Ban KTNB và các tổ chuyên môn', tg: 'Tháng 01/2027', ht: 'Toàn diện', pt: 'Lê Thanh Cường (HT)' },
                { tt: '9', nd: 'Kiểm tra việc chấp hành quy định về dạy thêm, học thêm trong và ngoài nhà trường', dt: 'Toàn thể giáo viên trong trường (3 điểm trường)', tg: 'Tháng 02/2027', ht: 'Chuyên đề', pt: 'Lê Thanh Cường (HT)' },
                { tt: '10', nd: 'Kiểm tra công tác giáo dục hòa nhập 25 HS khuyết tật (CV 3326) và tư vấn tâm lý học đường', dt: 'GVCN có HS khuyết tật, Tổ tư vấn tâm lý (3 điểm trường)', tg: 'Tháng 03/2027', ht: 'Chuyên đề', pt: 'Trần Minh Hậu (PHT)' },
                { tt: '11', nd: 'Kiểm tra hoạt động sư phạm của nhà giáo (Đợt 2: 08 giáo viên cấp THCS và THPT)', dt: '08 GV các tổ KHXH, GDTC, Toán-Tin, Văn (3 điểm trường)', tg: 'Tháng 03/2027', ht: 'Toàn diện', pt: 'Nguyễn Minh Trí (PHT)' },
                { tt: '12', nd: 'Kiểm tra công tác ôn tập thi tốt nghiệp THPT năm 2027 (K12) và ôn thi tuyển sinh lớp 10 (K9)', dt: 'Tổ trưởng và các GV dạy ôn thi Khối 9, 12 (Toàn trường)', tg: 'Tháng 04/2027', ht: 'Chuyên đề', pt: 'Nguyễn Minh Trí (PHT)' },
                { tt: '13', nd: 'Kiểm tra an toàn trường học, PCCC, y tế học đường và vệ sinh môi trường tại 3 điểm trường', dt: 'Bộ phận Y tế, Bảo vệ, Phục vụ vệ sinh (3 điểm trường)', tg: 'Tháng 04/2027', ht: 'Chuyên đề', pt: 'Trần Minh Hậu (PHT)' },
                { tt: '14', nd: 'Kiểm tra đánh giá xếp loại HS cuối năm, quản lý học bạ, hồ sơ tốt nghiệp và tổng kết KTNB', dt: 'Tổ Văn thư, GVCN 53 lớp, Ban KTNB (hạn nộp 18/05/2027)', tg: 'Tháng 05/2027', ht: 'Toàn diện', pt: 'Lê Thanh Cường (HT)' },
              ].map((item) =>
                new TableRow({
                  children: [
                    new TableCell({ width: { size: 600, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.tt, size: 20 })] })] }),
                    new TableCell({ width: { size: 3000, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ children: [new TextRun({ text: item.nd, size: 20 })] })] }),
                    new TableCell({ width: { size: 2000, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ children: [new TextRun({ text: item.dt, size: 20 })] })] }),
                    new TableCell({ width: { size: 1200, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.tg, size: 20 })] })] }),
                    new TableCell({ width: { size: 1200, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.ht, size: 20 })] })] }),
                    new TableCell({ width: { size: 1469, type: WidthType.DXA }, borders: cellGridBorder, children: [new Paragraph({ children: [new TextRun({ text: item.pt, size: 20, bold: true })] })] }),
                  ],
                })
              ),
            ],
          }),

          // IV. TỔ CHỨC THỰC HIỆN
          new Paragraph({
            spacing: { before: 160, after: 60 },
            children: [
              new TextRun({ text: 'IV. TỔ CHỨC THỰC HIỆN VÀ CHẾ ĐỘ THÔNG TIN BÁO CÁO', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Ban Kiểm tra nội bộ:', bold: true, font: 'Times New Roman', size: 23 }),
              new TextRun({ text: ' Chịu sự chỉ đạo trực tiếp của Hiệu trưởng; thành lập các tổ kiểm tra cho từng đợt, xây dựng Kế hoạch tiến hành kiểm tra (Mẫu 03), lập Biên bản kiểm tra (Mẫu 04), Báo cáo kết quả kiểm tra (Mẫu 05) trình Hiệu trưởng ban hành Thông báo kết quả kiểm tra (Mẫu 06).', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Lưu trữ hồ sơ:', bold: true, font: 'Times New Roman', size: 23 }),
              new TextRun({ text: ' Bộ phận Văn thư nhà trường chịu trách nhiệm tiếp nhận và lập danh mục lưu trữ hồ sơ của từng cuộc kiểm tra theo quy định tại Nghị định 30/2020/NĐ-CP và Thông tư số 08/2025/TT-BGDĐT.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. Chế độ thông tin, báo cáo Sở GDĐT (qua Phòng Tổ chức cán bộ):', bold: true, font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Gửi Kế hoạch kiểm tra nội bộ và Quyết định thành lập Ban kiểm tra nội bộ: trước ngày 31 tháng 10 năm 2026.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Gửi Báo cáo sơ kết công tác kiểm tra nội bộ học kỳ I: trước ngày 20 tháng 01 năm 2027.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Gửi Báo cáo tổng kết công tác kiểm tra nội bộ năm học và kết quả tự đánh giá chấm điểm thi đua: trước ngày 18 tháng 5 năm 2027.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({ text: '- Địa chỉ tiếp nhận: Phòng Tổ chức cán bộ Sở GDĐT (email: tochuccanbo@dongthap.edu.vn; công chức phụ trách ông Lê Thanh Phong, ĐT: 094.333.4774).', font: 'Times New Roman', size: 23, italics: true }),
            ],
          }),

          // Sign-off Table
          createSignOffTable(
            [
              'Sở GDĐT Đồng Tháp (Phòng TCCB) (b/c);',
              'Ban Giám hiệu nhà trường (chỉ đạo);',
              'Ban Kiểm tra nội bộ (thực hiện);',
              '06 Tổ chuyên môn, Tổ Văn phòng (thực hiện);',
              'Ban TTND, CĐCS, Đoàn Đội (phối hợp);',
              'Website nhà trường (công khai);',
              'Lưu: VT, Ban KTNB.'
            ],
            '',
            'HIỆU TRƯỞNG',
            'Lê Thanh Cường'
          ),
        ],
      },
    ],
  });

  const planBuffer = await Packer.toBuffer(planDoc);
  const planPath = path.join(downloadsDir, 'KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
  fs.writeFileSync(planPath, planBuffer);
  console.log('Saved:', planPath);

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

          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15/9/2020 của Bộ GDĐT ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05/8/2025 của Chính phủ về hoạt động kiểm tra chuyên ngành;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Quyết định số 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 và Công văn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ;', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 160 },
            children: [
              new TextRun({ text: 'Xét phẩm chất đạo đức, năng lực chuyên môn của cán bộ, giáo viên và đề nghị của bộ phận chuyên môn,', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({ text: 'QUYẾT ĐỊNH:', bold: true, font: 'Times New Roman', size: 26 }),
            ],
          }),

          // Điều 1
          new Paragraph({
            children: [
              new TextRun({ text: 'Điều 1. ', bold: true, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: 'Thành lập Ban kiểm tra nội bộ Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027 gồm các ông (bà) có tên sau đây:', font: 'Times New Roman', size: 24 }),
            ],
          }),
          ...[
            { name: 'Lê Thanh Cường', cv: 'Hiệu trưởng', vt: 'Trưởng ban' },
            { name: 'Nguyễn Minh Trí', cv: 'Phó Hiệu trưởng', vt: 'Phó Trưởng ban Thường trực' },
            { name: 'Trần Minh Hậu', cv: 'Phó Hiệu trưởng', vt: 'Phó Trưởng ban' },
            { name: 'Huỳnh Văn Bé', cv: 'Chủ tịch CĐCS - Trưởng ban TTND', vt: 'Thành viên' },
            { name: 'Bùi Thị Thúy Hằng', cv: 'Tổ trưởng Tổ Toán - Tin', vt: 'Thành viên' },
            { name: 'Trần Văn Hoàng', cv: 'Tổ trưởng Tổ Ngữ văn', vt: 'Thành viên' },
            { name: 'Nguyễn Văn Nam', cv: 'Tổ trưởng Tổ Khoa học Tự nhiên', vt: 'Thành viên' },
            { name: 'Phạm Thị Mai', cv: 'Tổ trưởng Tổ Khoa học Xã hội', vt: 'Thành viên' },
            { name: 'Đỗ Thị Loan', cv: 'Tổ trưởng Tổ Tiếng Anh', vt: 'Thành viên' },
            { name: 'Lê Hoàng Dũng', cv: 'Tổ trưởng Tổ GDTC-GDQPAN-Nghệ thuật', vt: 'Thành viên' },
            { name: 'Nguyễn Thị Lan', cv: 'Kế toán trưởng', vt: 'Thành viên' },
            { name: 'Lê Thị Mai', cv: 'Cán bộ Văn thư - Thủ quỹ', vt: 'Thư ký Ban' },
          ].map((m, idx) =>
            new Paragraph({
              spacing: { line: 240, after: 20 },
              children: [
                new TextRun({ text: `${idx + 1}. Ông (bà) `, font: 'Times New Roman', size: 23 }),
                new TextRun({ text: m.name, bold: true, font: 'Times New Roman', size: 23 }),
                new TextRun({ text: ` - Chức vụ: ${m.cv}; Đảm nhiệm: `, font: 'Times New Roman', size: 23 }),
                new TextRun({ text: m.vt, bold: true, font: 'Times New Roman', size: 23 }),
                new TextRun({ text: '.', font: 'Times New Roman', size: 23 }),
              ],
            })
          ),

          // Điều 2
          new Paragraph({
            spacing: { before: 120 },
            children: [
              new TextRun({ text: 'Điều 2. Nhiệm vụ và quyền hạn của Ban kiểm tra nội bộ', bold: true, font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Ban kiểm tra nội bộ hoạt động theo sự chỉ đạo trực tiếp của Hiệu trưởng; có nhiệm vụ giúp Hiệu trưởng xây dựng kế hoạch tiến hành, tổ chức kiểm tra việc thực hiện nhiệm vụ giáo dục, quy chế chuyên môn, quản lý tài chính tài sản, cơ sở dữ liệu ngành và nền nếp học sinh tại cả 3 điểm trường.', font: 'Times New Roman', size: 23 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Tổ trưởng và các thành viên kiểm tra có quyền yêu cầu đối tượng được kiểm tra cung cấp kịp thời, chính xác tài liệu, hồ sơ sổ sách, giải trình các nội dung liên quan; lập biên bản kiểm tra trung thực, lập báo cáo kết quả và tham mưu biện pháp xử lý sau kiểm tra.', font: 'Times New Roman', size: 23 }),
            ],
          }),

          // Điều 3, 4
          new Paragraph({
            spacing: { before: 120 },
            children: [
              new TextRun({ text: 'Điều 3. ', bold: true, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: 'Quyết định này có hiệu lực thi hành kể từ ngày ký đến hết năm học 2026 - 2027.', font: 'Times New Roman', size: 24 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({ text: 'Điều 4. ', bold: true, font: 'Times New Roman', size: 24 }),
              new TextRun({ text: 'Các Phó Hiệu trưởng, các ông (bà) có tên tại Điều 1, các Tổ chuyên môn, bộ phận Văn phòng và các cá nhân là đối tượng kiểm tra chịu trách nhiệm thi hành Quyết định này./.', font: 'Times New Roman', size: 24 }),
            ],
          }),

          createSignOffTable(
            [
              'Sở GDĐT Đồng Tháp (Phòng TCCB) (b/c);',
              'Như Điều 4 (thực hiện);',
              'Lưu: VT, Ban KTNB.'
            ],
            '',
            'HIỆU TRƯỞNG',
            'Lê Thanh Cường'
          ),
        ],
      },
    ],
  });

  const committeeBuffer = await Packer.toBuffer(committeeDoc);
  const committeePath = path.join(downloadsDir, 'QUYET_DINH_BAN_KIEM_TRA_NOI_BO_2026_2027.docx');
  fs.writeFileSync(committeePath, committeeBuffer);
  console.log('Saved:', committeePath);

  // 3. GENERATE FULL 6 TEMPLATES DOCX (MẪU 01 ĐẾN 06)
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
          createHeaderTable(
            'SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP',
            'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
            'TÀI LIỆU NGHIỆP VỤ',
            'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
            'Độc lập - Tự do - Hạnh phúc',
            'Năm học 2026 - 2027'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 60 },
            children: [
              new TextRun({ text: 'PHỤ LỤC BIỂU MẪU CÔNG TÁC KIỂM TRA NỘI BỘ', bold: true, font: 'Times New Roman', size: 28 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({ text: '(Chuẩn hóa theo Công văn số 1134/SGDĐT-TCCB ngày 17/10/2025 và Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 của Sở GDĐT Đồng Tháp)', italics: true, font: 'Times New Roman', size: 22 }),
            ],
          }),

          // MẪU 01
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({ text: 'MẪU SỐ 01: QUYẾT ĐỊNH BAN HÀNH KẾ HOẠCH KIỂM TRA NỘI BỘ NĂM HỌC', bold: true, font: 'Times New Roman', size: 25 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mục đích sử dụng: Ban hành Kế hoạch kiểm tra nội bộ nhà trường đầu năm học và danh mục các cuộc kiểm tra trong năm.', font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Thẩm quyền ký: Hiệu trưởng nhà trường.', font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mốc thời gian gửi Sở GDĐT (Phòng TCCB): Trước ngày 31 tháng 10 hằng năm.', font: 'Times New Roman', size: 22, bold: true }),
            ],
          }),

          // MẪU 02
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({ text: 'MẪU SỐ 02: QUYẾT ĐỊNH THÀNH LẬP BAN KIỂM TRA NỘI BỘ NĂM HỌC', bold: true, font: 'Times New Roman', size: 25 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mục đích sử dụng: Quyết định hành chính xác lập cơ cấu nhân sự Ban KTNB, phân công nhiệm vụ cụ thể cho từng thành viên.', font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Cơ cấu bắt buộc: Hiệu trưởng/Phó Hiệu trưởng làm Trưởng ban; Phó Hiệu trưởng làm Phó Trưởng ban; các Tổ trưởng chuyên môn, Trưởng ban TTND, Kế toán, Văn thư làm thành viên.', font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mốc thời gian gửi Sở GDĐT (Phòng TCCB): Đính kèm cùng Kế hoạch trước ngày 31 tháng 10.', font: 'Times New Roman', size: 22, bold: true }),
            ],
          }),

          // MẪU 03
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({ text: 'MẪU SỐ 03: KẾ HOẠCH TIẾN HÀNH KIỂM TRA (Tổ/Đoàn kiểm tra)', bold: true, font: 'Times New Roman', size: 25 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mục đích sử dụng: Trưởng đoàn/Tổ trưởng kiểm tra xây dựng trước mỗi đợt kiểm tra để phân công cụ thể thành viên, thời gian làm việc, phương pháp thu thập chứng cứ và thông báo cho đối tượng.', font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Phê duyệt: Phải có chữ ký phê duyệt của Người ra quyết định kiểm tra (Hiệu trưởng).', font: 'Times New Roman', size: 22 }),
            ],
          }),

          // MẪU 04
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({ text: 'MẪU SỐ 04: BIÊN BẢN KIỂM TRA (Hiện trường / Trực tiếp)', bold: true, font: 'Times New Roman', size: 25 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mục đích sử dụng: Ghi nhận trung thực, cụ thể toàn bộ diễn biến, tài liệu thu thập, ưu điểm, tồn tại, nguyên nhân và kiến nghị ngay khi làm việc với đối tượng.', font: 'Times New Roman', size: 22 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Chữ ký bắt buộc: Người được kiểm tra, Tổ kiểm tra và Người ghi biên bản cùng ký xác nhận. Lập tối thiểu 02 bản gốc.', font: 'Times New Roman', size: 22 }),
            ],
          }),

          // MẪU 05
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({ text: 'MẪU SỐ 05: BÁO CÁO KẾT QUẢ KIỂM TRA', bold: true, font: 'Times New Roman', size: 25 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mục đích sử dụng: Tổ kiểm tra báo cáo toàn diện kết quả xác minh, đánh giá mức độ vi phạm hoặc biểu dương cá nhân, đề xuất biện pháp xử lý lên Hiệu trưởng.', font: 'Times New Roman', size: 22 }),
            ],
          }),

          // MẪU 06
          new Paragraph({
            spacing: { before: 200, after: 60 },
            children: [
              new TextRun({ text: 'MẪU SỐ 06: THÔNG BÁO KẾT QUẢ KIỂM TRA (Kết luận của Hiệu trưởng)', bold: true, font: 'Times New Roman', size: 25 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '- Mục đích sử dụng: Kết luận chính thức có giá trị thi hành của Hiệu trưởng; gửi đối tượng thực hiện khắc phục, công khai trong toàn đơn vị và gửi Sở GDĐT báo cáo.', font: 'Times New Roman', size: 22 }),
            ],
          }),
        ],
      },
    ],
  });

  const formsBuffer = await Packer.toBuffer(formsDoc);
  const formsPath = path.join(downloadsDir, 'TRON_BO_6_BIEU_MAU_KIEM_TRA_NOI_BO_HD1134.docx');
  fs.writeFileSync(formsPath, formsBuffer);
  console.log('Saved:', formsPath);
}

generateAllInspectionDocuments().then(() => {
  console.log('Successfully generated all inspection documents!');
});

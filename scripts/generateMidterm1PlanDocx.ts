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

export async function generateMidterm1PlanDocx(outputPath: string): Promise<void> {
  const FONT_NAME = 'Times New Roman';
  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' }
  };

  const thinBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    left: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
    right: { style: BorderStyle.SINGLE, size: 4, color: '000000' }
  };

  const children: (Paragraph | Table)[] = [];

  // ==========================================
  // 1. HEADER 2 COLUMNS (Chuẩn Nghị định 30/2020/NĐ-CP)
  // ==========================================
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 45, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP',
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
                    bold: true,
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: 'Số: 45/KH-THCS&THPTĐBK',
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 55, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                    bold: true,
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Độc lập - Tự do - Hạnh phúc',
                    bold: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: 'Tháp Mười, ngày 16 tháng 10 năm 2026',
                    italics: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
  children.push(headerTable);

  // ==========================================
  // 2. TIÊU ĐỀ KẾ HOẠCH
  // ==========================================
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 100 },
      children: [
        new TextRun({
          text: 'KẾ HOẠCH',
          bold: true,
          size: 28,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: 'Tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027',
          bold: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 280 },
      children: [
        new TextRun({
          text: '(Áp dụng đồng bộ cho Cấp THCS và Cấp THPT tại các Điểm trường)',
          italics: true,
          size: 24,
          font: FONT_NAME
        })
      ]
    })
  );

  // ==========================================
  // 3. CĂN CỨ PHÁP LÝ
  // ==========================================
  const legalBases = [
    'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ Giáo dục và Đào tạo về việc ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;',
    'Căn cứ Thông tư số 22/2021/TT-BGDĐT ngày 20 tháng 7 năm 2021 của Bộ Giáo dục và Đào tạo Quy định về đánh giá học sinh trung học cơ sở và học sinh trung học phổ thông;',
    'Căn cứ Quyết định số 764/QĐ-BGDĐT ngày 08 tháng 3 năm 2024 của Bộ Giáo dục và Đào tạo quy định về cấu trúc định dạng đề thi Kỳ thi tốt nghiệp THPT từ năm 2025;',
    'Căn cứ Công văn số 7991/BGDĐT-GDTrH ngày 20 tháng 12 năm 2024 của Bộ Giáo dục và Đào tạo về việc hướng dẫn xây dựng ma trận, bảng đặc tả đề kiểm tra định kỳ các môn học cấp THCS, THPT;',
    'Căn cứ Công văn số 471/SGDĐT-GDPT ngày 22 tháng 8 năm 2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện kiểm tra, đánh giá đối với cấp THCS, THPT;',
    'Căn cứ Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của Ủy ban nhân dân tỉnh Đồng Tháp về việc thành lập Trường THCS và THPT Đốc Binh Kiều trên cơ sở sáp nhập Trường THCS Đốc Binh Kiều, Trường THCS Tân Kiều và Trường THPT Đốc Binh Kiều;',
    'Căn cứ Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25 tháng 9 năm 2026 của Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027;',
    'Căn cứ Kế hoạch số 39/KH-THCS&THPTĐBK ngày 05 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều về việc tổ chức thực hiện kiểm tra, đánh giá học sinh năm học 2026 - 2027;',
    'Căn cứ Thông báo kết luận số 186/TB-THCS-THPT ngày 09 tháng 10 năm 2026 của Ban Giám hiệu Trường THCS và THPT Đốc Binh Kiều về việc tiếp thu, giải đáp và chỉ đạo thực hiện ý kiến, kiến nghị của 06 tổ chuyên môn;',
    'Căn cứ tình hình thực tế về quy mô mạng lưới 53 lớp với 2.111 học sinh tại 03 điểm trường (Điểm trường chính, Điểm trường Đốc Binh Kiều và Điểm trường Tân Kiều cách 11 km) cùng đội ngũ 120 cán bộ quản lý, giáo viên, nhân viên nhà trường.'
  ];

  legalBases.forEach(lb => {
    children.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: 450 },
        spacing: { after: 80, line: 300 },
        children: [
          new TextRun({
            text: lb,
            italics: true,
            size: 26,
            font: FONT_NAME
          })
        ]
      })
    );
  });

  children.push(
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { before: 100, after: 200, line: 320 },
      children: [
        new TextRun({
          text: 'Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027 với các nội dung chi tiết, cụ thể như sau:',
          size: 26,
          font: FONT_NAME
        })
      ]
    })
  );

  // Helper functions for formatting sections
  const addHeading1 = (title: string) => {
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 240, after: 120 },
        children: [
          new TextRun({
            text: title,
            bold: true,
            size: 27,
            font: FONT_NAME
          })
        ]
      })
    );
  };

  const addHeading2 = (title: string) => {
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        indent: { left: 240 },
        spacing: { before: 140, after: 80 },
        children: [
          new TextRun({
            text: title,
            bold: true,
            size: 26,
            font: FONT_NAME
          })
        ]
      })
    );
  };

  const addParagraph = (text: string, isItalic = false, indent = 450) => {
    children.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: indent },
        spacing: { after: 100, line: 300 },
        children: [
          new TextRun({
            text,
            italics: isItalic,
            size: 26,
            font: FONT_NAME
          })
        ]
      })
    );
  };

  const addBullet = (text: string, boldPrefix = '') => {
    const runs: TextRun[] = [];
    if (boldPrefix) {
      runs.push(new TextRun({ text: boldPrefix, bold: true, size: 26, font: FONT_NAME }));
    }
    runs.push(new TextRun({ text, size: 26, font: FONT_NAME }));
    children.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { left: 450 },
        spacing: { after: 80, line: 300 },
        children: runs
      })
    );
  };

  // ==========================================
  // PHẦN I: MỤC ĐÍCH, YÊU CẦU
  // ==========================================
  addHeading1('I. MỤC ĐÍCH, YÊU CẦU');
  addHeading2('1. Mục đích:');
  addBullet(' Thực hiện nghiêm túc, đúng quy định của Thông tư số 22/2021/TT-BGDĐT và Công văn số 471/SGDĐT-GDPT về công tác kiểm tra, đánh giá định kỳ giữa học kỳ I năm học 2026 - 2027 ở cả hai cấp học (THCS và THPT) trên địa bàn trường sau sáp nhập.', '- ');
  addBullet(' Đánh giá khách quan, toàn diện và thực chất mức độ đạt được của học sinh về phẩm chất và năng lực theo yêu cầu cần đạt của Chương trình Giáo dục phổ thông 2018 sau nửa đầu học kỳ I (từ Tuần 1 đến hết Tuần 8 của năm học).', '- ');
  addBullet(' Cung cấp thông tin phản hồi kịp thời, chính xác cho học sinh để tự điều chỉnh phương pháp học tập; giúp cán bộ quản lý và giáo viên điều chỉnh phương pháp dạy học, nâng cao hiệu lực quản lý chuyên môn, khắc phục tình trạng dạy chay, học tủ, học vẹt.', '- ');
  addBullet(' Đổi mới cấu trúc định dạng đề kiểm tra cấp THPT tiệm cận 100% với đề thi tốt nghiệp THPT năm 2025 theo Quyết định số 764/QĐ-BGDĐT của Bộ GDĐT; từng bước rèn luyện năng lực tư duy, kỹ năng phân tích và làm quen cấu trúc đề mới cho học sinh khối 10, 11 và cấp THCS.', '- ');
  addBullet(' Thống nhất đồng bộ quy trình ra đề, in sao, bảo mật, coi kiểm tra, chấm bài và quản trị điểm số giữa Cấp THCS và Cấp THPT tại cả 03 điểm trường (Điểm trường chính, Điểm trường Đốc Binh Kiều, Điểm trường Tân Kiều cách 11 km).', '- ');

  addHeading2('2. Yêu cầu:');
  addBullet(' Thực hiện nghiêm túc kế hoạch thời gian và lịch kiểm tra tập trung theo hướng dẫn của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp và Kế hoạch số 39/KH-THCS&THPTĐBK của nhà trường.', '- ');
  addBullet(' Nội dung đề kiểm tra bám sát chuẩn kiến thức, kỹ năng và yêu cầu cần đạt của Chương trình GDPT 2018 theo tiến độ phân phối chương trình tính đến thời điểm kiểm tra; tuyệt đối không kiểm tra những nội dung vượt quá yêu cầu cần đạt hoặc phần kiến thức giảm tải.', '- ');
  addBullet(' Đề kiểm tra phải được biên soạn dựa trên Ma trận và Bảng đặc tả đã được Ban Giám hiệu phê duyệt; bảo đảm độ phân hóa, phân loại được trình độ học sinh, phù hợp với thời gian quy định cho từng bộ môn.', '- ');
  addBullet(' Tổ chức coi kiểm tra nghiêm túc, đúng quy chế, an toàn, không gây áp lực tâm lý nặng nề cho học sinh. Tổ chức chấm bài công tâm, khách quan, chính xác, công bằng, đúng hướng dẫn chấm và thang điểm quy định.', '- ');
  addBullet(' Tăng cường ứng dụng công nghệ thông tin: Chấm máy 100% phần trắc nghiệm; quản lý điểm số điện tử trên hệ thống phần mềm VnEdu; đồng bộ dữ liệu điểm số phục vụ học bạ số theo Kế hoạch số 18/KH-THCS&THPTĐBK.', '- ');

  // ==========================================
  // PHẦN II: ĐỐI TƯỢNG, HÌNH THỨC, THỜI GIAN LÀM BÀI VÀ CẤU TRÚC ĐỀ KIỂM TRA
  // ==========================================
  addHeading1('II. ĐỐI TƯỢNG, HÌNH THỨC, THỜI GIAN LÀM BÀI VÀ CẤU TRÚC ĐỀ KIỂM TRA');
  addHeading2('1. Đối tượng kiểm tra:');
  addParagraph('Toàn bộ học sinh đang theo học tại Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027 gồm 53 lớp với 2.111 học sinh, cụ thể:');
  addBullet(' Cấp THPT (Khối 10, 11, 12): 14 lớp với 529 học sinh (Khối 10: 5 lớp - 203 HS; Khối 11: 4 lớp - 141 HS; Khối 12: 5 lớp - 185 HS), học tập và kiểm tra tập trung tại Điểm trường chính.', '- ');
  addBullet(' Cấp THCS (Khối 6, 7, 8, 9): 39 lớp với 1.582 học sinh (Khối 6: 10 lớp - 411 HS; Khối 7: 9 lớp - 367 HS; Khối 8: 10 lớp - 398 HS; Khối 9: 10 lớp - 406 HS), học tập và kiểm tra tại 02 cơ sở: Điểm trường Đốc Binh Kiều (24 lớp - 980 HS) và Điểm trường Tân Kiều (15 lớp - 602 HS).', '- ');
  addBullet(' Đối với 25 học sinh khuyết tật học hòa nhập (22 HS cấp THCS, 03 HS cấp THPT): Thực hiện kiểm tra, đánh giá theo quy định riêng của Thông tư số 22/2021/TT-BGDĐT và Kế hoạch giáo dục hòa nhập số 26/KH-THCS&THPTĐBK của nhà trường.', '- ');

  addHeading2('2. Danh mục môn kiểm tra tập trung và môn kiểm tra tại lớp:');
  addBullet(' Các môn kiểm tra tập trung (Nhà trường ra đề và xếp lịch chung):', 'a) ');
  addBullet('  + Cấp THCS: Ngữ văn, Toán, Khoa học tự nhiên, Tiếng Anh, Lịch sử và Địa lí, Giáo dục công dân (bổ sung theo Thông báo kết luận số 186/TB-THCS-THPT).', '   ');
  addBullet('  + Cấp THPT: Ngữ văn, Toán, Tiếng Anh, Vật lí, Hóa học, Sinh học, Lịch sử, Địa lí, Giáo dục kinh tế và pháp luật, Tin học, Công nghệ (căn cứ theo tổ hợp môn lựa chọn của từng lớp).', '   ');
  addBullet(' Các môn kiểm tra tại lớp (Giáo viên bộ môn chủ động kiểm tra theo TKB tuần 8 và tuần 9):', 'b) ');
  addBullet('  + Cấp THCS: Công nghệ, Tin học, Giáo dục thể chất, Nghệ thuật (Âm nhạc, Mỹ thuật), Hoạt động trải nghiệm hướng nghiệp (HĐTN, HN), Nội dung giáo dục địa phương.', '   ');
  addBullet('  + Cấp THPT: Giáo dục thể chất, Giáo dục Quốc phòng và An ninh, Hoạt động trải nghiệm hướng nghiệp, Nội dung giáo dục địa phương.', '   ');

  addHeading2('3. Thời gian làm bài và Cấu trúc đề kiểm tra (Theo Thông báo kết luận 186/TB):');
  addParagraph('Căn cứ Thông báo kết luận số 186/TB-THCS-THPT ngày 09/10/2026 của Ban Giám hiệu nhà trường, cấu trúc đề kiểm tra định kỳ giữa học kỳ I được quy định chi tiết như sau:');

  // Bảng cấu trúc đề kiểm tra
  const structureTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 5, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn học & Khối lớp', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 13, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Cấu trúc định dạng đề', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ghi chú & Tỷ lệ điểm', bold: true, size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 1: Toán THCS
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '1', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Toán THCS (6, 7, 8, 9)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Phần I (TN nhiều lựa chọn): 28 câu = 7,0đ\n- Phần II (Đúng/Sai): 0đ\n- Phần III (Trả lời ngắn): 0đ\n- Phần Tự luận: 3,0đ', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '70% Trắc nghiệm + 30% Tự luận. Đã thống nhất theo đề xuất của Tổ Toán tại Thông báo 186/TB.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 2: Toán 10, 11
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '2', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Toán THPT (10, 11)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Phần I (TN nhiều lựa chọn): 12 câu = 3,0đ\n- Phần II (TN Đúng/Sai): 2 câu (8 ý) = 2,0đ\n- Phần III (TN Trả lời ngắn): 4 câu = 2,0đ\n- Phần Tự luận: 3,0đ', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '70% Trắc nghiệm kết hợp 3 dạng + 30% Tự luận rèn kỹ năng cho học sinh.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 3: Toán 12
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '3', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Toán Khối 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Phần I (12 câu nhiều lựa chọn) = 3,0đ\n- Phần II (4 câu Đúng/Sai - 16 ý) = 4,0đ\n- Phần III (6 câu Trả lời ngắn) = 3,0đ', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '100% Trắc nghiệm khách quan chuẩn cấu trúc tốt nghiệp THPT 2025 của Bộ GDĐT.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 4: Ngữ văn 6-12
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '4', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ngữ văn (6 đến 12)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Khối 6, 7, 8: Đọc hiểu 6,0đ + Viết 4,0đ\n- Khối 9: Đọc hiểu 5,0đ + Viết 5,0đ\n- Khối 10, 11: Đọc hiểu 4,0 - 5,0đ + Viết 5,0 - 6,0đ\n- Khối 12: Đọc hiểu 4,0đ + Viết 6,0đ (NLXH 2,0đ, NLVH 4,0đ)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '100% Tự luận. Ngữ liệu đọc hiểu nằm ngoài SGK bảo đảm đánh giá năng lực thực chất.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 5: KHTN THCS
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '5', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Khoa học tự nhiên (6, 7, 8, 9)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Phần I (TN nhiều lựa chọn): 28 câu = 7,0đ\n- Tự luận: 3,0đ (tổng hợp)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tỷ lệ điểm giữa Lý - Hóa - Sinh phân bổ theo tỷ lệ tiết PPCT thực tế tại thời điểm kiểm tra.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 6: Công nghệ THCS
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '6', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Công nghệ THCS (6, 7, 8, 9)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Phần I (TN nhiều lựa chọn): 28 câu = 7,0đ\n- Tự luận: 3,0đ', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Kiểm tra tại lớp theo TKB tuần 8 - 9.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 7: Vật lí 10, 11
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Vật lí Khối 10, 11', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Phần I (16 câu TN nhiều lựa chọn) = 4,0đ\n- Phần II (2 câu Đúng/Sai - 8 ý) = 2,0đ\n- Phần III (4 câu Trả lời ngắn) = 1,0đ\n- Phần Tự luận: 3,0đ', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Cấu trúc kết hợp 3 dạng trắc nghiệm và tự luận (Thông báo 186/TB).', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 8: Các môn trắc nghiệm 12
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '8', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Vật lí, Hóa, Sinh, Sử, Địa, GDKT&PL, Tin, CN lớp 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '50 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Phần I (TN nhiều lựa chọn): 18-28 lệnh hỏi\n- Phần II (TN Đúng/Sai): 4 câu (16 ý hỏi)\nTheo cấu trúc chuẩn 40 lệnh hỏi của Bộ GDĐT', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thời gian 50 phút (điều chỉnh từ 45 lên 50 phút theo Thông báo 186/TB). 100% trắc nghiệm.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 9: LS&ĐL, GDCD THCS
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Lịch sử & Địa lí, GDCD cấp THCS', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'LS&ĐL: 60p\nGDCD: 45p', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Trắc nghiệm Phần I: 50% - 70%\n- Tự luận: 30% - 50%\nMôn LS&ĐL phân chia Lịch sử 50% - Địa lí 50%', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Bổ sung GDCD vào kiểm tra tập trung theo nguyện vọng của Tổ Sử - Địa - GDCD.', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      // Row 10: Tiếng Anh
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '10', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tiếng Anh (Khối 6 đến 12)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '- Cấp THCS: Nghe (2,0đ) + Đọc (2,5đ) + Kiến thức NN (2,5đ) + Viết (3,0đ)\n- Cấp THPT: Trắc nghiệm kết hợp tự luận viết', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tổ chức thi Nghe tập trung toàn phòng. Kỹ năng Nói THPT đánh giá linh hoạt trong giờ học.', size: 22, font: FONT_NAME })] })] })
        ]
      })
    ]
  });
  children.push(structureTable);

  addHeading2('4. Quy chuẩn kỹ thuật tính điểm câu hỏi Đúng/Sai (Phần II):');
  addParagraph('Căn cứ Quyết định số 764/QĐ-BGDĐT của Bộ GDĐT và Thông báo số 186/TB-THCS-THPT của Ban Giám hiệu, quy tắc tính điểm phần trắc nghiệm Đúng/Sai được tính lũy tiến theo số ý trả lời đúng trong 01 câu hỏi (mỗi câu gồm 4 ý a, b, c, d):');
  addBullet(' Thí sinh chỉ lựa chọn chính xác 01 ý trong 01 câu hỏi được: 0,10 điểm.', '- ');
  addBullet(' Thí sinh chỉ lựa chọn chính xác 02 ý trong 01 câu hỏi được: 0,25 điểm.', '- ');
  addBullet(' Thí sinh chỉ lựa chọn chính xác 03 ý trong 01 câu hỏi được: 0,50 điểm.', '- ');
  addBullet(' Thí sinh lựa chọn chính xác cả 04 ý trong 01 câu hỏi được: 1,00 điểm trọn vẹn cho câu đó.', '- ');
  addParagraph('Yêu cầu các tổ chuyên môn quán triệt kỹ quy tắc lũy tiến này cho toàn thể giáo viên và học sinh, tuyệt đối không tính cào bằng 0,25 điểm/ý để bảo đảm tính phân hóa và tránh việc học sinh đoán mò.');

  // ==========================================
  // PHẦN III: CÔNG TÁC XÂY DỰNG MA TRẬN, BẢNG ĐẶC TẢ VÀ RA ĐỀ KIỂM TRA
  // ==========================================
  addHeading1('III. CÔNG TÁC XÂY DỰNG MA TRẬN, BẢNG ĐẶC TẢ VÀ RA ĐỀ KIỂM TRA');
  addHeading2('1. Xây dựng Ma trận và Bảng đặc tả đề kiểm tra:');
  addBullet(' Các tổ, nhóm chuyên môn tổ chức họp thống nhất Ma trận và Bảng đặc tả đề kiểm tra giữa kỳ I theo đúng hướng dẫn tại Công văn số 7991/BGDĐT-GDTrH và Công văn số 471/SGDĐT-GDPT.', '- ');
  addBullet(' Tỷ lệ các mức độ đánh giá: Nhận biết khoảng 40%; Thông hiểu khoảng 30%; Vận dụng khoảng 30% (trong đó vận dụng cao chiếm khoảng 10%). Riêng khối 12 bám sát mức độ đề thi tốt nghiệp THPT năm 2025.', '- ');
  addBullet(' Về việc công bố và bảo mật (Thực hiện đúng Thông báo số 186/TB): Ma trận tổng quát được công bố công khai cho học sinh trước ngày 20/10/2026 để định hướng ôn tập. Riêng Bảng đặc tả chi tiết kèm theo Đề kiểm tra và Hướng dẫn chấm được giáo viên nộp bảo mật trực tiếp cho Phó Hiệu trưởng chuyên môn duyệt, không phổ biến công khai nhằm tránh lộ nội dung chính của đề kiểm tra (đặc biệt đối với các môn Khoa học xã hội).', '- ');

  addHeading2('2. Phân công ra đề và phản biện chéo:');
  addBullet(' Nhà trường ưu tiên phân công giáo viên đang trực tiếp giảng dạy tại khối lớp ra đề kiểm tra để bám sát thực tế chương trình và đối tượng học sinh.', '- ');
  addBullet(' Mỗi môn học/khối lớp được phân công 02 giáo viên ra đề độc lập: 01 đề chính thức và 01 đề dự bị. Mỗi đề phải kèm theo Hướng dẫn chấm, biểu điểm chi tiết (đến 0,25 điểm hoặc theo quy chuẩn) và phiếu soi đáp án trắc nghiệm.', '- ');
  addBullet(' Tổ trưởng chuyên môn chỉ đạo tổ chức phản biện chéo giữa các giáo viên trong nhóm bộ môn để kiểm tra tính chính xác về kiến thức, câu chữ, thời lượng và định dạng đề thi; ký xác nhận thẩm định trước khi nộp lên Ban Giám hiệu.', '- ');
  addBullet(' Thời hạn nộp đề kiểm tra: Tổ trưởng chuyên môn nộp toàn bộ file đề (chính thức, dự bị, ma trận, bảng đặc tả, đáp án) có đặt mật khẩu cho Thầy Phó Hiệu trưởng Nguyễn Minh Trí chậm nhất trước 17h00 ngày 23/10/2026.', '- ');

  addHeading2('3. In sao, đóng gói và bảo mật đề kiểm tra:');
  addBullet(' Hiệu trưởng ra quyết định thành lập Tổ in sao đề kiểm tra tại các cơ sở, bảo đảm đầy đủ thành phần cách ly, bảo mật theo quy định.', '- ');
  addBullet(' Đề kiểm tra trắc nghiệm được trộn thành tối thiểu 04 mã đề khác nhau đối với mỗi khối lớp (giữ nguyên câu hỏi và đáp án nhưng hoán vị thứ tự câu và phương án lựa chọn).', '- ');
  addBullet(' Đề kiểm tra sau khi in sao được kiểm đếm đủ số lượng theo danh sách phòng thi, đóng gói vào túi chuyên dụng, dán kín, niêm phong và đóng dấu giáp lai; lập biên bản bàn giao cho Chủ tịch Hội đồng coi kiểm tra lưu giữ trong tủ bảo mật có khóa chắc chắn.', '- ');

  // ==========================================
  // PHẦN IV: TỔ CHỨC COI KIỂM TRA TẬP TRUNG
  // ==========================================
  addHeading1('IV. TỔ CHỨC COI KIỂM TRA TẬP TRUNG');
  addHeading2('1. Thời gian và Địa điểm kiểm tra:');
  addBullet(' Thời gian tổ chức kiểm tra tập trung: Tuần 9 năm học 2026 - 2027, bắt đầu từ Thứ Hai ngày 02/11/2026 đến hết Thứ Sáu ngày 06/11/2026 theo Lịch kiểm tra chi tiết tại Phụ lục I.', '- ');
  addBullet(' Địa điểm tổ chức:', '- ');
  addBullet('  + Điểm trường chính: Tổ chức kiểm tra tập trung cho toàn bộ học sinh Cấp THPT (Khối 10, 11, 12) gồm 14 lớp, 529 học sinh.', '   ');
  addBullet('  + Điểm trường Đốc Binh Kiều: Tổ chức kiểm tra tập trung cho học sinh Cấp THCS các lớp từ A1 đến A6 của các khối 6, 7, 8, 9 gồm 24 lớp, 980 học sinh.', '   ');
  addBullet('  + Điểm trường Tân Kiều: Tổ chức kiểm tra tập trung cho học sinh Cấp THCS các lớp từ A7 trở đi của các khối 6, 7, 8, 9 gồm 15 lớp, 602 học sinh.', '   ');

  addHeading2('2. Bố trí phòng kiểm tra và Sắp xếp học sinh:');
  addBullet(' Danh sách học sinh trong từng phòng kiểm tra được sắp xếp theo thứ tự bảng chữ cái tiếng Việt (a, b, c,...) theo từng khối lớp hoặc theo nhóm môn lựa chọn (đối với lớp 11, 12).', '- ');
  addBullet(' Mỗi phòng kiểm tra bố trí không quá 24 đến 26 học sinh; bảo đảm khoảng cách ngồi: 01 học sinh/bàn 02 chỗ ngồi hoặc 02 học sinh/bàn 04 chỗ ngồi; học sinh ngồi so le và không được trao đổi trong giờ làm bài.', '- ');
  addBullet(' Cửa phòng thi phải dán danh sách thí sinh, sơ đồ chỗ ngồi và quy chế phòng kiểm tra; phòng thi bảo đảm đủ ánh sáng, quạt mát và vệ sinh sạch sẽ.', '- ');

  addHeading2('3. Phân công cán bộ coi kiểm tra:');
  addBullet(' Bố trí 01 cán bộ coi kiểm tra/phòng; mỗi điểm trường bố trí cán bộ giám thị hành lang bao quát (tỷ lệ 03 - 04 phòng thi/01 giám thị hành lang).', '- ');
  addBullet(' Tuyệt đối không phân công giáo viên coi kiểm tra môn học do mình đang trực tiếp giảng dạy tại khối lớp đó.', '- ');
  addBullet(' Cán bộ coi kiểm tra phải có mặt trước giờ làm bài 30 phút để nhận túi đề, nhận phòng thi, gọi thí sinh vào phòng, kiểm tra thẻ học sinh/danh sách, hướng dẫn học sinh điền thông tin và tô mã đề, số báo danh vào phiếu trả lời trắc nghiệm đúng quy chuẩn.', '- ');
  addBullet(' Trong giờ làm bài, cán bộ coi kiểm tra bao quát nghiêm túc, không làm việc riêng, không sử dụng điện thoại di động; xử lý nghiêm các trường hợp mang tài liệu hoặc thiết bị gian lận công nghệ cao vào phòng thi.', '- ');

  // ==========================================
  // PHẦN V: TỔ CHỨC LÀM PHÁCH, CHẤM BÀI VÀ QUẢN LÝ ĐIỂM SỐ
  // ==========================================
  addHeading1('V. TỔ CHỨC LÀM PHÁCH, CHẤM BÀI VÀ QUẢN LÝ ĐIỂM SỐ');
  addHeading2('1. Thu bài, bàn giao và làm phách:');
  addBullet(' Ngay sau khi hết giờ làm bài, cán bộ coi kiểm tra thu đủ số bài thi, kiểm đếm số tờ giấy thi, xếp bài theo đúng số thứ tự danh sách; cùng thí sinh cuối phòng ký biên bản phòng thi và niêm phong túi bài thi nộp về cho Thư ký Hội đồng tại Văn phòng điểm trường.', '- ');
  addBullet(' Đối với bài kiểm tra tự luận (môn Ngữ văn và phần tự luận của các môn): Tổ Văn phòng thực hiện đánh mã phách, rọc phách bảo mật theo đúng quy trình trước khi bàn giao cho Tổ trưởng chấm bài.', '- ');
  addBullet(' Tổ Văn phòng và Tổ trưởng chuyên môn lập biên bản giao nhận bài chấm ghi rõ số bài, số túi, số phách và ký xác nhận đầy đủ.', '- ');

  addHeading2('2. Tổ chức chấm bài kiểm tra:');
  addBullet(' Chấm bài kiểm tra thực hiện theo hình thức tập trung tại phòng hội đồng các điểm trường dưới sự điều hành của Phó Hiệu trưởng phụ trách.', '- ');
  addBullet(' Chấm bài tự luận:', 'a) ');
  addBullet('  + Tổ chuyên môn tổ chức thảo luận kỹ hướng dẫn chấm, biểu điểm; tiến hành chấm chung tối thiểu 05 bài ngẫu nhiên để thống nhất cách vận dụng đáp án và thang điểm trước khi chấm đại trà.', '   ');
  addBullet('  + Mỗi bài kiểm tra tự luận phải được chấm nghiêm túc; giáo viên chấm ghi rõ điểm thành phần từng câu, tổng hợp điểm toàn bài bằng cả số và chữ bằng mực đỏ; ký và ghi rõ họ tên trên bài thi.', '   ');
  addBullet('  + Trên bài kiểm tra gốc không được làm tròn điểm (ví dụ: ghi rõ 7,25 - bảy phẩy hai lăm; 8,50 - tám phẩy năm). Nếu có sửa chữa điểm: gạch điểm cũ, ghi điểm mới bên cạnh và giáo viên chấm ký xác nhận ngay chỗ sửa.', '   ');
  addBullet(' Chấm bài trắc nghiệm:', 'b) ');
  addBullet('  + Phiếu trả lời trắc nghiệm của học sinh được thu gom nguyên vẹn, kiểm tra khớp số lượng và bàn giao cho Tổ chấm trắc nghiệm bằng máy.', '   ');
  addBullet('  + Sử dụng phần mềm chuyên dụng quét phiếu trắc nghiệm; lập biên bản quét bài, xuất file dữ liệu điểm và biên bản nhận diện lỗi tô sai số báo danh, mã đề; có sự giám sát của Thanh tra nhân dân.', '   ');
  addBullet(' Thời hạn hoàn thành chấm bài: Chậm nhất sau 04 ngày kể từ ngày kết thúc môn kiểm tra (hoàn thành trước ngày 10/11/2026).', 'c) ');

  addHeading2('3. Quy trình ghép phách và nhập điểm vào hệ thống VnEdu:');
  addBullet(' Sau khi chấm xong, Tổ Văn phòng tiến hành ghép phách bài tự luận, kiểm tra tính khớp đúng giữa phách và thân bài thi.', '- ');
  addBullet(' Điểm kiểm tra giữa kỳ được nhập trực tiếp vào Hệ thống phần mềm quản lý trường học VnEdu theo tài khoản phân quyền:', '- ');
  addBullet('  + Đối với môn trắc nghiệm: Tổ kỹ thuật import file điểm quét từ máy vào hệ thống.', '   ');
  addBullet('  + Đối với môn tự luận: Giáo viên bộ môn (hoặc bộ phận văn phòng) nhập điểm theo danh sách lớp; đối soát cẩn thận tránh nhầm lẫn.', '   ');
  addBullet(' Quy định làm tròn điểm số trên hệ thống phần mềm: Thực hiện theo Thông tư số 22/2021/TT-BGDĐT, điểm số của bài kiểm tra được tính theo thang điểm 10 và làm tròn đến 01 chữ số thập phân trên hệ thống (ví dụ: 6,25 làm tròn thành 6,3; 6,75 làm tròn thành 6,8).', '- ');
  addBullet(' Thời hạn khóa sổ điểm giữa kỳ I trên hệ thống VnEdu: Trước 17h00 ngày 11/11/2026.', '- ');

  // ==========================================
  // PHẦN VI: TRẢ BÀI, SỬA BÀI, PHÚC KHẢO VÀ KIỂM TRA BỔ SUNG
  // ==========================================
  addHeading1('VI. TRẢ BÀI, SỬA BÀI, PHÚC KHẢO VÀ KIỂM TRA BỔ SUNG');
  addHeading2('1. Trả bài và Sửa bài kiểm tra cho học sinh:');
  addBullet(' Trong tuần 10 (từ ngày 09/11/2026 đến ngày 14/11/2026), giáo viên bộ môn nhận bài kiểm tra từ văn phòng để phát cho học sinh đối chiếu kết quả trong các tiết học chính khóa trên lớp.', '- ');
  addBullet(' Quy trình sửa bài trên lớp:', '- ');
  addBullet('  + Hướng dẫn học sinh phân tích đề bài, nhận diện các lỗi sai phổ biến về kiến thức, kỹ năng trình bày, lập luận.', '   ');
  addBullet('  + Công bố đáp án chuẩn và biểu điểm; giải đáp thắc mắc của học sinh về kết quả chấm.', '   ');
  addBullet('  + Nhận xét cụ thể về sự tiến bộ của từng nhóm đối tượng học sinh; khích lệ tinh thần học tập.', '   ');
  addBullet(' Thu hồi và lưu trữ bài kiểm tra: Sau khi học sinh xem và đối soát xong trong tiết học, giáo viên bộ môn thu lại toàn bộ bài kiểm tra, kiểm đếm đủ số lượng và nộp về cho Văn thư nhà trường lưu trữ vào hồ sơ chuyên môn theo quy định (thời hạn lưu trữ tối thiểu 01 năm học).', '- ');

  addHeading2('2. Phúc khảo bài kiểm tra:');
  addBullet(' Mọi học sinh đều có quyền xin phúc khảo bài kiểm tra nếu nhận thấy điểm số chưa khớp với bài làm thực tế.', '- ');
  addBullet(' Học sinh nộp Đơn đề nghị phúc khảo bài kiểm tra (theo mẫu của trường) tại Văn phòng điểm trường trong thời hạn 03 ngày làm việc kể từ ngày giáo viên trả bài trên lớp.', '- ');
  addBullet(' Phó Hiệu trưởng phụ trách chuyên môn lập danh sách, rút bài thi và phân công 02 giáo viên khác trong tổ chuyên môn chấm lại bài phúc khảo.', '- ');
  addBullet(' Nếu kết quả chấm phúc khảo có thay đổi điểm số: Lập biên bản điều chỉnh điểm có chữ ký của người chấm cũ, người chấm mới, Tổ trưởng chuyên môn và trình Hiệu trưởng phê duyệt trước khi cập nhật điểm mới trên hệ thống VnEdu. Thời gian giải quyết phúc khảo hoàn tất trong 03 ngày làm việc.', '- ');

  addHeading2('3. Tổ chức kiểm tra bổ sung (Kiểm tra bù):');
  addBullet(' Học sinh vắng kiểm tra có lý do chính đáng (do ốm đau có xác nhận của cơ sở y tế, tai nạn, việc gia đình đột xuất có đơn xin phép hợp lệ của cha mẹ học sinh) được nhà trường bố trí kiểm tra bù.', '- ');
  addBullet(' Đề kiểm tra bù sử dụng Đề kiểm tra dự bị của đợt kiểm tra, bảo đảm tương đương về cấu trúc, ma trận và độ khó.', '- ');
  addBullet(' Thời gian tổ chức kiểm tra bù: Tổ chức tập trung trong tuần 10, hoàn thành dứt điểm trước ngày 14/11/2026 để kịp thời tổng hợp điểm số.', '- ');
  addBullet(' Trường hợp học sinh tự ý bỏ kiểm tra không có lý do chính đáng: Nhận điểm 0 (không) theo đúng quy định của Thông tư số 22/2021/TT-BGDĐT.', '- ');

  // ==========================================
  // PHẦN VII: SƠ KẾT, RÚT KINH NGHIỆM VÀ KẾ HOẠCH PHỤ ĐẠO - BỒI DƯỠNG
  // ==========================================
  addHeading1('VII. SƠ KẾT, RÚT KINH NGHIỆM VÀ KẾ HOẠCH PHỤ ĐẠO - BỒI DƯỠNG');
  addParagraph('Ngay sau khi hoàn thành công tác chấm bài và tổng hợp điểm số giữa học kỳ I, nhà trường tổ chức các hoạt động chuyên môn trọng tâm:');
  addBullet(' Thống kê, phân tích dữ liệu điểm số: Bộ phận chuyên môn xuất báo cáo phổ điểm từng môn học, từng khối lớp, so sánh chất lượng giữa các lớp và giữa 03 điểm trường; đánh giá tỷ lệ học sinh đạt mức Tốt, Khá, Đạt và Chưa đạt.', '1. ');
  addBullet(' Sinh hoạt tổ chuyên môn rút kinh nghiệm: Các tổ chuyên môn tổ chức phiên sinh hoạt đánh giá chất lượng đề kiểm tra, mức độ đáp ứng của học sinh đối với định dạng đề mới; thảo luận giải pháp khắc phục các điểm yếu về kỹ năng làm bài của học sinh.', '2. ');
  addBullet(' Xây dựng Kế hoạch phụ đạo học sinh chưa đạt chuẩn: Giáo viên bộ môn lập danh sách học sinh có kết quả kiểm tra dưới 5,0 điểm, phân tích nguyên nhân (yếu kiến thức nền, hổng kỹ năng, thiếu chuyên cần); tổ chức các lớp phụ đạo, ôn tập bổ trợ kiến thức ngoài giờ hoàn toàn miễn phí từ Tuần 11 đến Tuần 16.', '3. ');
  addBullet(' Bồi dưỡng học sinh có năng khiếu: Phát hiện và tuyển chọn học sinh đạt điểm xuất sắc để bồi dưỡng đội tuyển học sinh giỏi các môn văn hóa cấp trường, chuẩn bị tham gia kỳ thi chọn học sinh giỏi cấp tỉnh và các sân chơi trí tuệ.', '4. ');

  // ==========================================
  // PHẦN VIII: BẢNG TIẾN ĐỘ THỜI GIAN THỰC HIỆN
  // ==========================================
  addHeading1('VIII. BẢNG TIẾN ĐỘ THỜI GIAN THỰC HIỆN (TỪ 16/10 ĐẾN 14/11/2026)');
  addParagraph('Bảng tiến độ phân công công việc cụ thể:');

  const timelineTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 42, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung công việc', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Bộ phận chủ trì', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Sản phẩm / Kết quả', bold: true, size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '16/10 - 20/10/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ban hành Kế hoạch số 42/KH; Tổ chuyên môn thống nhất Ma trận, Bảng đặc tả; công bố ma trận và đề cương ôn tập cho học sinh.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ban Giám hiệu, Tổ trưởng chuyên môn', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Kế hoạch ban hành; Đề cương gửi học sinh', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Trước 17h00 ngày 23/10/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Hoàn thành biên soạn đề chính thức, đề dự bị, hướng dẫn chấm; phản biện chéo và nộp đề bảo mật cho PHT chuyên môn.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Giáo viên ra đề, Tổ trưởng chuyên môn', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '100% đề thi được duyệt bảo mật', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '26/10 - 30/10/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Lập danh sách phòng thi, số báo danh, sơ đồ phòng; in sao, đóng gói, niêm phong đề kiểm tra tại các điểm trường.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tổ Văn phòng, Ban In sao đề', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Túi đề niêm phong; DS phòng thi niêm yết', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '02/11 - 06/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tổ chức coi kiểm tra tập trung theo lịch tại 03 điểm trường; thu bài, bàn giao và làm phách bài tự luận.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Hội đồng coi thi, Tổ Văn phòng', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Kiểm tra an toàn, đúng quy chế; bài thi rọc phách', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '04/11 - 10/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Chấm bài kiểm tra tập trung (chấm máy trắc nghiệm, chấm 2 vòng tự luận); ghép phách, đối soát điểm.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tổ chấm thi, Tổ Văn phòng', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '100% bài thi được chấm xong, bảo mật điểm', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Trước 17h00 ngày 11/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Hoàn thành nhập điểm giữa kỳ I vào hệ thống VnEdu; kiểm tra đối soát dữ liệu và khóa sổ điểm đợt 1.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Giáo viên bộ môn, Ban Quản trị CNTT', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Điểm số cập nhật đầy đủ trên VnEdu', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '09/11 - 14/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Trả bài, sửa bài trên lớp cho học sinh; thu bài lưu trữ; nhận đơn và giải quyết phúc khảo; tổ chức kiểm tra bù.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'GV bộ môn, Hội đồng phúc khảo', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Học sinh đối soát xong; giải quyết xong phúc khảo', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '16/11/2026 trở đi', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Họp sơ kết rút kinh nghiệm; triển khai kế hoạch phụ đạo học sinh yếu kém và bồi dưỡng học sinh giỏi.', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ban Giám hiệu, Tổ chuyên môn', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Các lớp phụ đạo, bồi dưỡng hoạt động', size: 22, font: FONT_NAME })] })] })
        ]
      })
    ]
  });
  children.push(timelineTable);

  // ==========================================
  // PHẦN IX: KINH PHÍ VÀ CƠ SỞ VẬT CHẤT
  // ==========================================
  addHeading1('IX. KINH PHÍ VÀ ĐIỀU KIỆN CƠ SỞ VẬT CHẤT');
  addParagraph('1. Kinh phí thực hiện: Kinh phí chi cho công tác ra đề, in sao đề, coi kiểm tra, chấm bài kiểm tra và làm phách được chi từ nguồn kinh phí chi thường xuyên của nhà trường năm học 2026 - 2027 và thực hiện đúng theo Quy chế chi tiêu nội bộ đã được Hội nghị cán bộ, viên chức thông qua.');
  addParagraph('2. Điều kiện cơ sở vật chất: Bộ phận Thiết bị - Văn phòng chuẩn bị đầy đủ giấy in, mực in, máy in siêu tốc, máy scan chấm trắc nghiệm, niêm phong, phòng bảo quản đề bài thi có camera giám sát và tủ sắt khóa an toàn tại cả 03 điểm trường.');

  // ==========================================
  // PHẦN X: TỔ CHỨC THỰC HIỆN VÀ PHÂN CÔNG NHIỆM VỤ ("6 RÕ")
  // ==========================================
  addHeading1('X. TỔ CHỨC THỰC HIỆN VÀ PHÂN CÔNG NHIỆM VỤ ("6 RÕ")');
  addParagraph('Thực hiện nghiêm túc phương châm: "Rõ người, rõ việc, rõ thời gian, rõ trách nhiệm, rõ sản phẩm, rõ thẩm quyền":');

  addHeading2('1. Thầy Hiệu trưởng Lê Thanh Cường (Trưởng ban Chỉ đạo):');
  addBullet(' Lãnh đạo, chỉ đạo toàn diện kỳ kiểm tra giữa học kỳ I trong toàn trường; chịu trách nhiệm trước Giám đốc Sở GDĐT về tính an toàn, bảo mật, nghiêm túc và chất lượng của kỳ kiểm tra.', '- ');
  addBullet(' Ban hành Kế hoạch số 42/KH, các Quyết định thành lập Hội đồng ra đề, in sao đề, coi kiểm tra, chấm kiểm tra và phúc khảo.', '- ');
  addBullet(' Phê duyệt dự toán kinh phí và các trường hợp điều chỉnh điểm số sau phúc khảo theo đúng quy định.', '- ');

  addHeading2('2. Thầy Phó Hiệu trưởng Nguyễn Minh Trí (Phó Trưởng ban Thường trực):');
  addBullet(' Trực tiếp phụ trách công tác chuyên môn toàn trường; chỉ đạo xây dựng ma trận, bảng đặc tả và duyệt đề kiểm tra chính thức, dự bị của tất cả các khối lớp.', '- ');
  addBullet(' Điều hành trực tiếp công tác coi thi, chấm thi tại Điểm trường chính (Cấp THPT) và chỉ đạo chung công tác chấm thi trắc nghiệm bằng máy.', '- ');
  addBullet(' Kiểm tra tiến độ chấm bài, đối soát điểm và đôn đốc khóa sổ điểm VnEdu đúng thời hạn 11/11/2026.', '- ');

  addHeading2('3. Các đồng chí Phó Hiệu trưởng phụ trách các Điểm trường cơ sở:');
  addBullet(' Thầy Phó Hiệu trưởng phụ trách Điểm trường Đốc Binh Kiều: Điều hành toàn diện công tác chuẩn bị cơ sở vật chất, in sao đề, tổ chức coi thi, chấm thi và quản lý bài thi của 24 lớp THCS (980 học sinh).', '- ');
  addBullet(' Thầy Phó Hiệu trưởng phụ trách Điểm trường Tân Kiều: Điều hành toàn diện công tác in sao đề, tổ chức coi thi, chấm thi và bảo mật tại Điểm Tân Kiều (15 lớp THCS, 602 học sinh cách điểm chính 11 km); bảo đảm tiến độ đồng bộ, không để khoảng cách địa lý ảnh hưởng đến kỳ kiểm tra.', '- ');

  addHeading2('4. Tổ trưởng các Tổ chuyên môn (06 tổ):');
  addBullet(' Tổ chức rà soát tiến độ dạy học, bảo đảm dạy đủ phân phối chương trình trước ngày kiểm tra.', '- ');
  addBullet(' Chỉ đạo nhóm bộ môn thống nhất ma trận, bảng đặc tả; phân công giáo viên ra đề và phản biện chéo; chịu trách nhiệm về tính chính xác và chất lượng của đề kiểm tra.', '- ');
  addBullet(' Điều hành công tác chấm chung 05 bài, giám sát tiến độ chấm bài của tổ; tổ chức sinh hoạt rút kinh nghiệm sau kiểm tra và xây dựng kế hoạch phụ đạo học sinh yếu, bồi dưỡng học sinh giỏi.', '- ');

  addHeading2('5. Tổ Văn phòng, Kế toán, Văn thư, Y tế:');
  addBullet(' Tổ trưởng Tổ Văn phòng: Phân công nhân viên phục vụ in sao đề, chuẩn bị văn phòng phẩm, ấn chỉ thi, danh sách phòng thi, đánh số báo danh; tổ chức rọc phách, bảo mật bài tự luận và nhập điểm theo phân công.', '- ');
  addBullet(' Nhân viên Kế toán: Lập dự trù và thanh toán chế độ coi thi, chấm thi, in sao đề kịp thời theo Quy chế chi tiêu nội bộ.', '- ');
  addBullet(' Nhân viên Y tế học đường: Trực y tế tại các điểm trường trong suốt các buổi kiểm tra, kịp thời sơ cấp cứu, chăm sóc sức khỏe cho học sinh và cán bộ làm nhiệm vụ.', '- ');

  addHeading2('6. Giáo viên bộ môn (102 giáo viên):');
  addBullet(' Thực hiện nghiêm túc phân công ra đề, phản biện, coi kiểm tra và chấm bài của nhà trường.', '- ');
  addBullet(' Hướng dẫn học sinh ôn tập theo ma trận; sửa bài kiểm tra chu đáo trên lớp; cập nhật điểm số chính xác vào phần mềm VnEdu đúng thời hạn quy định.', '- ');

  addHeading2('7. Giáo viên chủ nhiệm (53 giáo viên):');
  addBullet(' Phổ biến đầy đủ kế hoạch, lịch kiểm tra, quy chế phòng thi đến học sinh và cha mẹ học sinh.', '- ');
  addBullet(' Đôn đốc học sinh đi học và có mặt tại phòng kiểm tra đúng giờ; theo dõi chặt chẽ sĩ số, nắm rõ nguyên nhân học sinh vắng thi để kịp thời báo cáo Lãnh đạo trường xem xét cho kiểm tra bổ sung.', '- ');

  // ==========================================
  // FOOTER: NƠI NHẬN & CHỮ KÝ
  // ==========================================
  const signTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: 'Nơi nhận:',
                    bold: true,
                    italics: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: '- Sở GDĐT Đồng Tháp (để báo cáo);\n- Ban Giám hiệu (để chỉ đạo);\n- 06 Tổ chuyên môn, Tổ Văn phòng (để thực hiện);\n- Điểm Đốc Binh Kiều, Điểm Tân Kiều (để thực hiện);\n- Ban ĐD Cha mẹ học sinh (để phối hợp);\n- Lưu: VT, CM.',
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'HIỆU TRƯỞNG',
                    bold: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 700 },
                children: [
                  new TextRun({
                    text: '(Ký số, đóng dấu)',
                    italics: true,
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Lê Thanh Cường',
                    bold: true,
                    size: 26,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
  children.push(signTable);

  // ==========================================
  // PHỤ LỤC I: LỊCH KIỂM TRA TẬP TRUNG GIỮA HỌC KỲ I
  // ==========================================
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 360, after: 100 },
      pageBreakBefore: true,
      children: [
        new TextRun({
          text: 'PHỤ LỤC I',
          bold: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: 'LỊCH KIỂM TRA TẬP TRUNG GIỮA HỌC KỲ I NĂM HỌC 2026 - 2027',
          bold: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: '(Kèm theo Kế hoạch số 42/KH-THCS&THPTĐBK ngày 16 tháng 10 năm 2026 của Trường THCS và THPT Đốc Binh Kiều)',
          italics: true,
          size: 23,
          font: FONT_NAME
        })
      ]
    })
  );

  // 1. CẤP THCS
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 140, after: 80 },
      children: [
        new TextRun({
          text: '1. CẤP TRUNG HỌC CƠ SỞ (Tổ chức tại Điểm trường Đốc Binh Kiều và Điểm trường Tân Kiều):',
          bold: true,
          size: 25,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: 'a) Khối 8 và Khối 9 (Kiểm tra buổi Sáng - Giờ phát đề: Tiết 1 lúc 7h25, Tiết 2 lúc 9h25):',
          bold: true,
          italics: true,
          size: 24,
          font: FONT_NAME
        })
      ]
    })
  );

  const thcsSangTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian làm bài', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hình thức', bold: true, size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 9h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ngữ văn 8, 9', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tự luận', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9h30 - 10h15', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Giáo dục công dân 8, 9', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TN + Tự luận', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 9h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Toán 8, 9', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '70% TN + 30% TL', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9h30 - 10h30', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Lịch sử và Địa lí 8, 9', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TN + Tự luận', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 8h30', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tiếng Anh 8, 9', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nghe + Đọc + Viết', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9h00 - 10h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Khoa học tự nhiên 8, 9', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '70% TN + 30% TL', size: 22, font: FONT_NAME })] })] })
        ]
      })
    ]
  });
  children.push(thcsSangTable);

  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 140, after: 80 },
      children: [
        new TextRun({
          text: 'b) Khối 6 và Khối 7 (Kiểm tra buổi Chiều - Giờ phát đề: Tiết 1 lúc 13h25, Tiết 2 lúc 15h25):',
          bold: true,
          italics: true,
          size: 24,
          font: FONT_NAME
        })
      ]
    })
  );

  const thcsChieuTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian làm bài', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hình thức', bold: true, size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 15h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ngữ văn 6, 7', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Tự luận', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '15h30 - 16h15', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Giáo dục công dân 6, 7', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TN + Tự luận', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 15h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Toán 6, 7', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '70% TN + 30% TL', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '15h30 - 16h30', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Lịch sử và Địa lí 6, 7', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TN + Tự luận', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 14h30', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tiếng Anh 6, 7', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nghe + Đọc + Viết', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '15h00 - 16h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Khoa học tự nhiên 6, 7', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '70% TN + 30% TL', size: 22, font: FONT_NAME })] })] })
        ]
      })
    ]
  });
  children.push(thcsChieuTable);

  // 2. CẤP THPT
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 200, after: 80 },
      children: [
        new TextRun({
          text: '2. CẤP TRUNG HỌC PHỔ THÔNG (Tổ chức tập trung tại Điểm trường chính):',
          bold: true,
          size: 25,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: 'a) Khối 11 và Khối 12 (Kiểm tra buổi Sáng - Bắt đầu từ 7h30):',
          bold: true,
          italics: true,
          size: 24,
          font: FONT_NAME
        })
      ]
    })
  );

  const thptSangTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian làm bài', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ghi chú', bold: true, size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 9h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ngữ văn 11, 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tự luận 100%', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9h30 - 10h15 (K11)\n9h30 - 10h20 (K12)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Vật lí 11, 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'K11: 45 phút\nK12: 50 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'K11: TN + TL\nK12: 100% TN', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 9h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Toán 11, 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'K11: TN + TL\nK12: 100% TN', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9h30 - 10h15 (K11)\n9h30 - 10h20 (K12)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Sinh học 11, 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'K11: 45 phút\nK12: 50 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 8h30', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tiếng Anh 11, 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Trắc nghiệm + Viết', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9h00 - 9h45 (K11)\n9h00 - 9h50 (K12)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Địa lí 11, 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'K11: 45 phút\nK12: 50 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Năm, 05/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 8h15 (K11)\n7h30 - 8h20 (K12)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Hóa học HOẶC GDKT&PL (11, 12)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'K11: 45 phút\nK12: 50 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Năm, 05/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '8h45 - 9h30 (K11)\n8h45 - 9h35 (K12)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tin học HOẶC Công nghệ (11, 12)', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'K11: 45 phút\nK12: 50 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Sáu, 06/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7h30 - 8h15 (K11)\n7h30 - 8h20 (K12)', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Lịch sử 11, 12', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'K11: 45 phút\nK12: 50 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      })
    ]
  });
  children.push(thptSangTable);

  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 140, after: 80 },
      children: [
        new TextRun({
          text: 'b) Khối 10 (Kiểm tra buổi Chiều - Bắt đầu từ 13h30):',
          bold: true,
          italics: true,
          size: 24,
          font: FONT_NAME
        })
      ]
    })
  );

  const thptChieuTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: thinBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 22, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 18, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian làm bài', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 25, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ghi chú', bold: true, size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 15h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Ngữ văn 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tự luận 100%', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Hai, 02/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '15h30 - 16h15', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Vật lí 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'TN + Tự luận', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 15h00', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Toán 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '90 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: '70% TN + 30% TL', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Ba, 03/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '15h30 - 16h15', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Sinh học 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 14h30', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tiếng Anh 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '60 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Trắc nghiệm + Viết', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Tư, 04/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '15h00 - 15h45', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Địa lí 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Năm, 05/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 14h15', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Hóa học HOẶC GDKT&PL 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Năm, 05/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '14h45 - 15h30', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Tin học HOẶC Công nghệ 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Thứ Sáu, 06/11/2026', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '13h30 - 14h15', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Lịch sử 10', bold: true, size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '45 phút', size: 22, font: FONT_NAME })] })] }),
          new TableCell({ borders: thinBorder, children: [new Paragraph({ children: [new TextRun({ text: 'Theo môn lựa chọn', size: 22, font: FONT_NAME })] })] })
        ]
      })
    ]
  });
  children.push(thptChieuTable);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,    // 20mm
              bottom: 1134, // 20mm
              left: 1701,   // 30mm
              right: 850    // 15mm
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Trường THCS & THPT Đốc Binh Kiều - Kế hoạch KTĐG Giữa Học kỳ I (2026 - 2027)',
                    size: 18,
                    italics: true,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ['Trang ', PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES],
                    size: 20,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        },
        children
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated DOCX to ${outputPath}`);
}

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

// Helper for standard borders
const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 4,
  color: '94A3B8'
};

const tableBorders = {
  top: thinBorder,
  bottom: thinBorder,
  left: thinBorder,
  right: thinBorder,
  insideHorizontal: thinBorder,
  insideVertical: thinBorder
};

const cellPadding = {
  top: 100,
  bottom: 100,
  left: 140,
  right: 140
};

export async function generateMidtermExamPlanDocx(outputPath: string) {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 20mm
              bottom: 1134, // 20mm
              left: 1701, // 30mm
              right: 850 // 15mm
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
                    text: 'Kế hoạch kiểm tra giữa học kỳ I năm học 2026 - 2027 - Trường THCS & THPT Đốc Binh Kiều',
                    font: 'Times New Roman',
                    size: 18,
                    italics: true,
                    color: '64748B'
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
                    children: [PageNumber.CURRENT],
                    font: 'Times New Roman',
                    size: 20
                  })
                ]
              })
            ]
          })
        },
        children: [
          // 1. Header Table (Quốc hiệu & Đơn vị ban hành)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 45, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'SỞ GDĐT TỈNH ĐỒNG THÁP',
                            font: 'Times New Roman',
                            size: 24
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'TRƯỜNG THCS VÀ THPT',
                            font: 'Times New Roman',
                            size: 24,
                            bold: true
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'ĐỐC BINH KIỀU',
                            font: 'Times New Roman',
                            size: 24,
                            bold: true
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 },
                        children: [
                          new TextRun({
                            text: '───────────────',
                            font: 'Times New Roman',
                            size: 20
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Số: 45/KH-THCS&THPTĐBK',
                            font: 'Times New Roman',
                            size: 24,
                            bold: true
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                            font: 'Times New Roman',
                            size: 24,
                            bold: true
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'Độc lập - Tự do - Hạnh phúc',
                            font: 'Times New Roman',
                            size: 26,
                            bold: true
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 },
                        children: [
                          new TextRun({
                            text: '─────────────────────────',
                            font: 'Times New Roman',
                            size: 20
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({
                            text: 'Tháp Mười, ngày 16 tháng 10 năm 2026',
                            font: 'Times New Roman',
                            size: 24,
                            italics: true
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // Space
          new Paragraph({ spacing: { before: 200, after: 100 } }),

          // 2. Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'KẾ HOẠCH',
                font: 'Times New Roman',
                size: 32,
                bold: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'Tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027',
                font: 'Times New Roman',
                size: 28,
                bold: true
              })
            ]
          }),

          // 3. Legal Basis
          ...[
            'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15/9/2020 của Bộ trưởng Bộ Giáo dục và Đào tạo về việc ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;',
            'Căn cứ Thông tư số 22/2021/TT-BGDĐT ngày 20/7/2021 của Bộ trưởng Bộ Giáo dục và Đào tạo Quy định về đánh giá học sinh trung học cơ sở và học sinh trung học phổ thông;',
            'Căn cứ Công văn số 7991/BGDĐT-GDTrH ngày 20/12/2024 của Bộ Giáo dục và Đào tạo về việc hướng dẫn xây dựng ma trận, bảng đặc tả đề kiểm tra định kì các môn học cấp THCS, THPT;',
            'Căn cứ Công văn số 471/SGDĐT-GDPT ngày 14/4/2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện kiểm tra, đánh giá đối với cấp THCS, THPT;',
            'Căn cứ Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25/9/2026 của Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027;',
            'Căn cứ Kế hoạch số 39/KH-THCS&THPTĐBK ngày 05/10/2026 của Trường THCS và THPT Đốc Binh Kiều về tổ chức thực hiện kiểm tra, đánh giá học sinh năm học 2026 - 2027;'
          ].map((text) =>
            new Paragraph({
              spacing: { after: 80 },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text,
                  font: 'Times New Roman',
                  size: 24,
                  italics: true
                })
              ]
            })
          ),

          new Paragraph({
            spacing: { before: 100, after: 150 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027 như sau:',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),

          // I. MỤC ĐÍCH, YÊU CẦU
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'I. MỤC ĐÍCH, YÊU CẦU',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: '1. Mục đích',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),
          ...[
            '- Đánh giá khách quan, toàn diện và thực chất mức độ hoàn thành nhiệm vụ học tập, rèn luyện của học sinh theo yêu cầu cần đạt của Chương trình GDPT 2018 sau nửa đầu học kỳ I;',
            '- Cung cấp thông tin phản hồi kịp thời, chính xác để giáo viên điều chỉnh phương pháp dạy học, nâng cao chất lượng giáo dục; giúp học sinh nhận rõ ưu điểm, hạn chế để có phương pháp học tập phù hợp và tiến bộ;',
            '- Giúp Ban Giám hiệu và các Tổ chuyên môn rút kinh nghiệm trong công tác quản lý chuyên môn, kịp thời chỉ đạo dạy học phân hóa, tổ chức phụ đạo học sinh chưa đạt yêu cầu và bồi dưỡng học sinh có năng khiếu;',
            '- Thống nhất quy trình kiểm tra, đánh giá định kỳ giữa cấp THCS và cấp THPT trong toàn trường sau khi sáp nhập, bảo đảm đồng bộ, nghiêm túc, công bằng tại cả 03 cơ sở: Trụ sở chính (Điểm chính THPT), Điểm Trường THCS Đốc Binh Kiều và Điểm Trường THCS Tân Kiều.'
          ].map((text) =>
            new Paragraph({
              spacing: { after: 60 },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text,
                  font: 'Times New Roman',
                  size: 24
                })
              ]
            })
          ),

          new Paragraph({
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({
                text: '2. Yêu cầu',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),
          ...[
            '- Đánh giá vì sự tiến bộ của học sinh; coi trọng việc động viên, khuyến khích sự cố gắng rèn luyện; không so sánh học sinh này với học sinh khác gây áp lực tâm lý tiêu cực;',
            '- Kiểm tra đúng theo tiến độ phân phối chương trình, bảo đảm hoàn thành nội dung kiến thức tính đến hết tuần 8 theo kế hoạch giáo dục đã phê duyệt. Tuyệt đối không kiểm tra vượt quá yêu cầu cần đạt hoặc mức độ cần đạt;',
            '- Đề kiểm tra phải được xây dựng dựa trên ma trận, bản đặc tả chuẩn mực; bảo đảm tỷ lệ nhận thức 4:3:3 (Nhận biết 40% - Thông hiểu 30% - Vận dụng 30%); đối với cấp THPT bám sát định dạng cấu trúc đề thi tốt nghiệp THPT từ năm 2025 của Bộ GDĐT;',
            '- Các khâu ra đề, thẩm định, in sao, coi kiểm tra, làm phách, chấm bài và nhập điểm phải được thực hiện an toàn, nghiêm túc, công bằng, khách quan và bảo mật tuyệt đối.'
          ].map((text) =>
            new Paragraph({
              spacing: { after: 60 },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text,
                  font: 'Times New Roman',
                  size: 24
                })
              ]
            })
          ),

          // II. ĐỐI TƯỢNG, ĐỊA ĐIỂM VÀ QUY MÔ KIỂM TRA
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'II. ĐỐI TƯỢNG, ĐỊA ĐIỂM VÀ QUY MÔ KIỂM TRA',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 100 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'Toàn bộ học sinh đang theo học tại Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027 gồm 53 lớp với 2.111 học sinh (Cấp THPT: 14 lớp, 529 học sinh; Cấp THCS: 39 lớp, 1.582 học sinh), cụ thể:',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),

          // Table quy mô
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TT', bold: true, font: 'Times New Roman', size: 22 })] })]
                  }),
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Cơ sở / Điểm trường', bold: true, font: 'Times New Roman', size: 22 })] })]
                  }),
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Khối lớp', bold: true, font: 'Times New Roman', size: 22 })] })]
                  }),
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Số lớp / Số HS', bold: true, font: 'Times New Roman', size: 22 })] })]
                  }),
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Cán bộ phụ trách cơ sở', bold: true, font: 'Times New Roman', size: 22 })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '1', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Trụ sở chính (Điểm chính cấp THPT)', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Khối 10 (5 lớp)\nKhối 11 (4 lớp)\nKhối 12 (5 lớp)', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '14 lớp\n529 học sinh', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'PHT Nguyễn Minh Trí\n(Phụ trách chung CM & Trụ sở chính)', font: 'Times New Roman', size: 22 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '2', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Điểm Trường THCS Đốc Binh Kiều', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Khối 6 (6 lớp)\nKhối 7 (6 lớp)\nKhối 8 (6 lớp)\nKhối 9 (6 lớp)', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '24 lớp\n966 học sinh', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Phó Hiệu trưởng phụ trách Điểm ĐBK\n& Tổ trưởng Điểm ĐBK', font: 'Times New Roman', size: 22 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '3', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Điểm Trường THCS Tân Kiều', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Khối 6 (4 lớp)\nKhối 7 (3 lớp)\nKhối 8 (4 lớp)\nKhối 9 (4 lớp)', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '15 lớp\n616 học sinh', font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Phó Hiệu trưởng phụ trách Điểm Tân Kiều\n& Cán bộ quản lý cơ sở Tân Kiều', font: 'Times New Roman', size: 22 })] })] })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({ columnSpan: 3, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TỔNG CỘNG TOÀN TRƯỜNG', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '53 lớp / 2.111 HS', bold: true, font: 'Times New Roman', size: 22 })] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Ban Giám hiệu chỉ đạo thống nhất', font: 'Times New Roman', size: 22 })] })] })
                ]
              })
            ]
          }),

          // III. HÌNH THỨC, THỜI LƯỢNG VÀ CẤU TRÚC ĐỀ KIỂM TRA
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'III. HÌNH THỨC, THỜI LƯỢNG VÀ CẤU TRÚC ĐỀ KIỂM TRA',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: '1. Hình thức kiểm tra',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'a) Kiểm tra tập trung trên giấy:',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: ' Áp dụng đối với các môn học cốt lõi theo lịch chung toàn trường, xếp phòng kiểm tra theo danh sách A, B, C toàn khối:\n' +
                  '- Cấp THPT (Khối 10, 11, 12): Ngữ văn, Toán, Tiếng Anh, Vật lí, Hóa học, Sinh học, Lịch sử, Địa lí, Giáo dục kinh tế và pháp luật, Tin học, Công nghệ (Công nghiệp/Nông nghiệp).\n' +
                  '- Cấp THCS (Khối 6, 7, 8, 9): Ngữ văn, Toán, Tiếng Anh, Khoa học tự nhiên, Lịch sử và Địa lí, Giáo dục công dân.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'b) Kiểm tra tại lớp theo thời khóa biểu:',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: ' Áp dụng đối với các môn kiểm tra bằng nhận xét, thực hành, sản phẩm học tập hoặc đặc thù vận động:\n' +
                  '- Cấp THPT: Giáo dục thể chất, Giáo dục Quốc phòng và An ninh, Hoạt động trải nghiệm - hướng nghiệp, Nội dung giáo dục địa phương.\n' +
                  '- Cấp THCS: Tin học, Công nghệ, Nghệ thuật (Âm nhạc, Mĩ thuật), Giáo dục thể chất, Hoạt động trải nghiệm - hướng nghiệp, Nội dung giáo dục địa phương.\n' +
                  '- Giáo viên bộ môn chủ động bố trí thực hiện kiểm tra trong tuần 7 và tuần 8 theo thời khóa biểu chính khóa, bảo đảm có đầy đủ tiêu chí đánh giá, phiếu chấm nhận xét và công bố điểm cho học sinh trước tuần kiểm tra tập trung.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 80 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'c) Kiểm tra kỹ năng nói môn Tiếng Anh (Khối 10, 11 và THCS):',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: ' Tổ chức kiểm tra kỹ năng nói trực tiếp theo chủ đề chuyên môn đã thống nhất trong tuần từ ngày 26/10/2026 đến ngày 30/10/2026. Điểm kiểm tra nói chiếm 2,0 điểm trong tổng điểm bài kiểm tra định kỳ môn Tiếng Anh (đối với khối 10, 11) hoặc được tích hợp theo hướng dẫn chuyên môn của Sở GDĐT.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({
                text: '2. Thời gian làm bài',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),
          ...[
            '- Cấp THCS: Môn Ngữ văn, Toán: 90 phút/bài; Môn Tiếng Anh, Khoa học tự nhiên, Lịch sử và Địa lí: 60 phút/bài; Môn Giáo dục công dân: 45 phút/bài.',
            '- Cấp THPT: Môn Ngữ văn, Toán: 90 phút/bài; Môn Tiếng Anh: 60 phút/bài; Các môn Vật lí, Hóa học, Sinh học, Lịch sử, Địa lí, Giáo dục kinh tế và pháp luật, Tin học, Công nghệ: 45 phút/bài (riêng học sinh khối 12 làm quen định dạng tốt nghiệp THPT thời lượng tương đương phân bổ 50 phút theo ma trận chuyên sâu).'
          ].map((text) =>
            new Paragraph({
              spacing: { after: 60 },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text,
                  font: 'Times New Roman',
                  size: 24
                })
              ]
            })
          ),

          new Paragraph({
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({
                text: '3. Định dạng cấu trúc đề và tỷ lệ phân bổ điểm',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'a) Tỷ lệ các mức độ nhận thức:',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: ' Tất cả các đề kiểm tra định kỳ phải bảo đảm tỷ lệ nhận thức: Nhận biết 40% (4,0 điểm) - Thông hiểu 30% (3,0 điểm) - Vận dụng 30% (3,0 điểm). Không ra câu hỏi vượt quá chuẩn kiến thức kỹ năng hoặc ngoài nội dung chương trình GDPT 2018.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'b) Cấu trúc đề kiểm tra cấp THPT (Tiệm cận định dạng cấu trúc đề thi tốt nghiệp THPT 2025):',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: ' Đề kiểm tra kết hợp giữa trắc nghiệm khách quan (7,0 điểm) và tự luận (3,0 điểm) hoặc theo quy định từng môn:\n' +
                  '- Phần I: Câu hỏi trắc nghiệm nhiều lựa chọn 4 phương án, chọn 01 đáp án đúng. Mỗi câu trả lời đúng được 0,25 điểm.\n' +
                  '- Phần II: Câu hỏi trắc nghiệm dạng Đúng/Sai. Mỗi câu hỏi gồm 04 ý lệnh (a, b, c, d). Điểm tính lũy tiến: đúng 01 ý được 0,1 điểm; đúng 02 ý được 0,25 điểm; đúng 03 ý được 0,5 điểm; đúng 04 ý được 1,0 điểm.\n' +
                  '- Phần III: Câu hỏi trắc nghiệm dạng trả lời ngắn. Học sinh tính toán và ghi kết quả vào ô tương ứng: môn Toán mỗi câu đúng được 0,5 điểm; các môn khác mỗi câu đúng được 0,25 điểm.\n' +
                  '- Phần Tự luận: Kiểm tra năng lực vận dụng, lập luận, chứng minh hoặc giải quyết vấn đề thực tiễn (3,0 điểm).\n' +
                  '- Môn Ngữ văn: Tự luận 100% (Đọc hiểu 4,0 điểm + Viết 6,0 điểm). Ngữ liệu đọc hiểu lấy ngoài các bộ sách giáo khoa hiện hành.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'c) Cấu trúc đề kiểm tra cấp THCS:',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: ' Thực hiện theo Công văn số 471/SGDĐT-GDPT và tinh thần đổi mới của Công văn 7991/BGDĐT-GDTrH:\n' +
                  '- Môn Ngữ văn: Tự luận 100% (Đọc hiểu 5,0 - 6,0 điểm + Viết 4,0 - 5,0 điểm). Ngữ liệu không trùng lặp với văn bản đã học trong sách giáo khoa.\n' +
                  '- Môn Toán: Trắc nghiệm khách quan 7,0 điểm (Phần I hoặc kết hợp Đúng/Sai) + Tự luận 3,0 điểm.\n' +
                  '- Môn Khoa học tự nhiên, Lịch sử - Địa lí, GDCD: Trắc nghiệm khách quan 7,0 điểm + Tự luận 3,0 điểm.\n' +
                  '- Môn Tiếng Anh: Trắc nghiệm khách quan kết hợp Tự luận (Nghe - Đọc - Viết 8,0 điểm + Nói 2,0 điểm).',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),

          // IV. CÔNG TÁC XÂY DỰNG MA TRẬN, ĐẶC TẢ VÀ RA ĐỀ KIỂM TRA
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'IV. CÔNG TÁC XÂY DỰNG MA TRẬN, ĐẶC TẢ VÀ RA ĐỀ KIỂM TRA',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          ...[
            '1. Yêu cầu đối với đề kiểm tra:\n' +
            '- Đề kiểm tra phải bám sát mục tiêu, nội dung kiến thức và yêu cầu cần đạt trong chương trình GDPT 2018 tính đến hết tuần 8 của học kỳ I;\n' +
            '- Nội dung bảo đảm tính khoa học, chuẩn xác, lời văn rõ ràng, tường minh; bảo đảm tính phân hóa tốt, không đánh đố, không vượt quá mức độ nhận thức của học sinh;\n' +
            '- Mỗi đề kiểm tra bắt buộc phải đi kèm Ma trận đề, Bản đặc tả chi tiết, Đáp án và Hướng dẫn chấm chi tiết đến 0,25 điểm (tự luận) và biểu điểm cụ thể cho từng câu trắc nghiệm.',
            '2. Quy trình ra đề và nộp đề kiểm tra:\n' +
            '- Các Tổ chuyên môn tổ chức họp thống nhất ma trận, bản đặc tả đề kiểm tra cho từng khối lớp tại các cơ sở, nộp về Ban Giám hiệu (thầy Nguyễn Minh Trí) phê duyệt trước ngày 20/10/2026;\n' +
            '- Ban Giám hiệu phân công giáo viên ra đề. Mỗi môn học ở từng khối lớp ra tối thiểu 02 đề: 01 ĐỀ CHÍNH THỨC và 01 ĐỀ DỰ BỊ có ma trận và độ tương đương nhau;\n' +
            '- Giáo viên được phân công ra đề chịu trách nhiệm cá nhân về tính chính xác, khoa học và bảo mật tuyệt đối của đề kiểm tra. Đề kiểm tra nộp file Word định dạng chuẩn và bản in có ký tên niêm phong trong phong bì kín nộp về Thư ký Hội đồng trước ngày 24/10/2026.',
            '3. Công tác bảo mật và in sao đề kiểm tra:\n' +
            '- Thành lập Ban In sao đề kiểm tra do Hiệu trưởng ra quyết định. Khu vực in sao được bố trí độc lập, cách ly, niêm phong cửa và có phương án bảo vệ an ninh trật tự tuyệt đối;\n' +
            '- Cán bộ in sao kiểm đếm chính xác số lượng đề theo từng phòng thi của từng khối lớp tại 03 cơ sở; đóng gói vào túi niêm phong riêng cho từng phòng thi, ghi rõ: Cơ sở, Khối, Phòng, Môn, Số lượng đề, Ngày kiểm tra, Giờ phát đề;\n' +
            '- Bàn giao túi đề thi niêm phong cho Trưởng điểm thi/Phó Hiệu trưởng phụ trách các cơ sở trước giờ kiểm tra ít nhất 60 phút, có biên bản bàn giao lưu hồ sơ kiểm tra.'
          ].map((text) =>
            new Paragraph({
              spacing: { after: 80 },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text,
                  font: 'Times New Roman',
                  size: 24
                })
              ]
            })
          ),

          // V. TỔ CHỨC CÁC BAN VÀ QUY TRÌNH COI, CHẤM KIỂM TRA
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'V. TỔ CHỨC CÁC BAN VÀ QUY TRÌNH COI, CHẤM KIỂM TRA',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: '1. Thành lập các Ban phục vụ kỳ kiểm tra:',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: ' Hiệu trưởng ký ban hành Quyết định thành lập các Ban:\n' +
                  '- Ban Chỉ đạo và Tổ chức kiểm tra chung toàn trường;\n' +
                  '- Ban Ra đề, thẩm định và duyệt đề kiểm tra;\n' +
                  '- Ban In sao và đóng gói đề kiểm tra;\n' +
                  '- Ban Coi kiểm tra tại 03 cơ sở (Trụ sở chính, Điểm Đốc Binh Kiều, Điểm Tân Kiều);\n' +
                  '- Ban Làm phách, rọc phách bài tự luận;\n' +
                  '- Ban Chấm kiểm tra (Tổ chấm trắc nghiệm bằng máy và các Tổ chấm tự luận);\n' +
                  '- Ban Phúc khảo kết quả kiểm tra.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: '2. Quy định về phòng kiểm tra và số báo danh:',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: '\n- Danh sách học sinh từng khối lớp tại mỗi cơ sở được xếp theo thứ tự bảng chữ cái A, B, C toàn khối;\n' +
                  '- Bố trí tối đa 24 học sinh/phòng thi; khoảng cách giữa 2 học sinh ngồi cạnh nhau bảo đảm tối thiểu 1,2m;\n' +
                  '- Mỗi phòng kiểm tra bố trí 02 cán bộ coi thi (giám thị), thực hiện đổi chéo giám thị giữa các phòng và các buổi kiểm tra, không bố trí giáo viên coi thi đúng môn mình đang trực tiếp giảng dạy tại khối lớp đó;\n' +
                  '- Cán bộ coi kiểm tra yêu cầu học sinh để toàn bộ ba lô, tài liệu, thiết bị thông minh, điện thoại di động tại khu vực quy định ngoài phòng thi trước khi vào phòng.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 80 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: '3. Quy trình làm phách và chấm bài kiểm tra:',
                bold: true,
                font: 'Times New Roman',
                size: 24
              }),
              new TextRun({
                text: '\n- Thu bài và bàn giao: Ngay sau khi hết giờ làm bài, giám thị kiểm đếm đủ số bài, số tờ giấy thi, niêm phong túi bài thi và bàn giao cho Thư ký Hội đồng coi thi tại cơ sở;\n' +
                  '- Làm phách bài tự luận: Ban Làm phách tiến hành đánh số phách, rọc phách độc lập, bảo mật tuyệt đối túi đầu phách trong tủ khóa niêm phong trước khi giao bài cho Ban Chấm;\n' +
                  '- Chấm bài tự luận: Tổ chức chấm tập trung theo hình thức chấm 2 vòng độc lập. Giáo viên chấm 1 chấm bằng bút đỏ, ghi điểm vào phiếu chấm; Giáo viên chấm 2 chấm bằng bút xanh trực tiếp lên bài. Xử lý điểm lệch theo đúng quy chế (chênh lệch dưới 0,5 điểm lấy điểm trung bình; từ 0,5 đến dưới 1,0 điểm hai giám khảo đối thoại thống nhất; từ 1,0 điểm trở lên chuyển Tổ trưởng tổ chức chấm vòng 3);\n' +
                  '- Chấm trắc nghiệm: Thực hiện chấm tập trung bằng phần mềm quét quang học chuyên dụng trên máy tính, có sự giám sát của Thanh tra nhân dân và Ban Giám hiệu, xuất biên bản chấm quét và file dữ liệu điểm gốc ngay sau khi hoàn thành.',
                font: 'Times New Roman',
                size: 24
              })
            ]
          }),

          // VI. TRẢ BÀI, NHẬP ĐIỂM, PHÚC KHẢO VÀ KIỂM TRA BỔ SUNG
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'VI. TRẢ BÀI, NHẬP ĐIỂM, PHÚC KHẢO VÀ KIỂM TRA BỔ SUNG',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          ...[
            '1. Quy trình trả bài và sửa bài kiểm tra trên lớp:\n' +
            '- Trong tuần ngay sau đợt kiểm tra tập trung (từ ngày 09/11 đến ngày 14/11/2026), giáo viên bộ môn dành tối thiểu 01 tiết học trên lớp để trả bài, hướng dẫn học sinh sửa bài, phân tích các lỗi sai phổ biến và giải đáp thắc mắc cho học sinh;\n' +
            '- Khi phát bài cho học sinh xem, giáo viên yêu cầu học sinh không được cầm bút bi, bút chì hoặc gôm tẩy trong lúc kiểm tra bài; học sinh kiểm tra đối chiếu điểm và ký tên vào bảng điểm xác nhận;\n' +
            '- Sau khi sửa bài xong, giáo viên thu lại toàn bộ bài kiểm tra định kỳ để lưu trữ hồ sơ chuyên môn theo quy định tại Thông tư 22/2021/TT-BGDĐT.',
            '2. Nhập điểm và quản lý dữ liệu trên hệ thống CSDL ngành:\n' +
            '- Giáo viên bộ môn hoàn thành nhập đầy đủ số cột điểm kiểm tra thường xuyên và điểm kiểm tra giữa kỳ vào hệ thống quản lý học sinh điện tử (VnEdu/CSDL ngành) trước 17h00 ngày 11/11/2026;\n' +
            '- Giáo viên chủ nhiệm rà soát, kiểm tra sự khớp nối dữ liệu điểm của tất cả học sinh trong lớp, xuất phiếu liên lạc điện tử thông báo kết quả học tập giữa kỳ cho phụ huynh học sinh.',
            '3. Giải quyết đơn yêu cầu phúc khảo:\n' +
            '- Học sinh có nguyện vọng phúc khảo bài kiểm tra nộp Đơn đề nghị phúc khảo về Văn phòng nhà trường (hoặc Văn phòng tại điểm trường) trong thời hạn 03 ngày kể từ ngày công bố điểm;\n' +
            '- Ban Phúc khảo tiến hành rút phách, kiểm tra khớp phách và phân công cán bộ chấm phúc khảo lại bài thi. Kết quả phúc khảo được công bố công khai cho học sinh trong vòng 03 ngày làm việc kể từ ngày hết hạn nhận đơn.',
            '4. Tổ chức kiểm tra bổ sung (kiểm tra bù):\n' +
            '- Học sinh vắng kiểm tra có lý do chính đáng (ốm đau đột xuất có giấy tờ y tế, tai nạn, lý do bất khả kháng có xác nhận của gia đình và GVCN) được tham gia kỳ kiểm tra bổ sung;\n' +
            '- Kỳ kiểm tra bổ sung sử dụng ĐỀ KIỂM TRA DỰ BỊ có ma trận và độ khó tương đương đề chính thức, tổ chức tập trung vào ngày 12/11/2026;\n' +
            '- Học sinh vắng kiểm tra không có lý do chính đáng nhận điểm 0 (không) theo đúng Quy chế đánh giá, xếp loại học sinh hiện hành.'
          ].map((text) =>
            new Paragraph({
              spacing: { after: 80 },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text,
                  font: 'Times New Roman',
                  size: 24
                })
              ]
            })
          ),

          // VII. KẾ HOẠCH TIẾN ĐỘ THỜI GIAN THỰC HIỆN CHI TIẾT
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'VII. KẾ HOẠCH TIẾN ĐỘ THỜI GIAN THỰC HIỆN CHI TIẾT',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),

          // Timeline Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'TT', bold: true, font: 'Times New Roman', size: 22 })] })]
                  }),
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung công việc', bold: true, font: 'Times New Roman', size: 22 })] })]
                  }),
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời gian thực hiện', bold: true, font: 'Times New Roman', size: 22 })] })]
                  }),
                  new TableCell({
                    shading: { fill: 'F1F5F9' },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Người phụ trách / Đơn vị phối hợp', bold: true, font: 'Times New Roman', size: 22 })] })]
                  })
                ]
              }),
              ...[
                ['1', 'Xây dựng và triển khai dự thảo Kế hoạch kiểm tra giữa học kỳ I', '12/10/2026', 'PHT Nguyễn Minh Trí, BGH'],
                ['2', 'Ban hành chính thức Kế hoạch; phổ biến đến toàn thể GV, NV và HS tại 03 cơ sở', '16/10/2026', 'Hiệu trưởng, PHT, TTCM'],
                ['3', 'Họp Tổ chuyên môn thống nhất ma trận, bản đặc tả; biên soạn đề cương ôn tập cho học sinh', 'Trước 20/10/2026', 'Tổ trưởng chuyên môn, GV bộ môn'],
                ['4', 'Ban hành Quyết định thành lập các Ban phục vụ kỳ kiểm tra; phân công người ra đề chính thức và dự bị', '21/10/2026', 'Hiệu trưởng, Thư ký Hội đồng'],
                ['5', 'Tổ chức kiểm tra các môn tại lớp (GDTC, GDQPAN, HĐTNHN, Công nghệ, Tin học THCS...)', '26/10 - 31/10/2026 (Tuần 8)', 'Giáo viên bộ môn theo TKB'],
                ['6', 'Tổ chức kiểm tra kỹ năng nói môn Tiếng Anh', '26/10 - 30/10/2026', 'Tổ Tiếng Anh, GV bộ môn Tiếng Anh'],
                ['7', 'Nộp đề kiểm tra (kèm ma trận, bản đặc tả, đáp án chi tiết có niêm phong) về Thư ký BGH', 'Trước 11h00 ngày 24/10/2026', 'Giáo viên được phân công ra đề'],
                ['8', 'Thẩm định, duyệt đề và in sao, đóng gói, niêm phong đề kiểm tra tập trung', '27/10 - 30/10/2026', 'Ban In sao đề, PHT Nguyễn Minh Trí'],
                ['9', 'Chuẩn bị phòng thi, số báo danh, danh sách thí sinh và cơ sở vật chất tại 03 cơ sở', 'Trước ngày 31/10/2026', 'PHT cơ sở, Tổ Văn phòng, Giám thị'],
                ['10', 'Tổ chức KIỂM TRA TẬP TRUNG TẠI 03 CƠ SỞ (cùng thời gian, đề chung toàn khối)', '02/11 - 06/11/2026 (Tuần 9)', 'Ban Coi kiểm tra, Toàn thể CB-GV-HS'],
                ['11', 'Làm phách, bảo mật phách và bàn giao bài thi tự luận cho Ban Chấm', '06/11/2026 (sau mỗi buổi thi)', 'Ban Làm phách, Thư ký'],
                ['12', 'Chấm bài kiểm tra tập trung (chấm máy trắc nghiệm và chấm 2 vòng độc lập tự luận)', '04/11 - 08/11/2026', 'Ban Chấm kiểm tra, TTCM, GV'],
                ['13', 'Hồi phách, ghép điểm và nhập điểm lên hệ thống VnEdu/CSDL ngành', 'Hoàn thành trước 17h00 ngày 11/11/2026', 'Tổ Thư ký, Giáo viên bộ môn'],
                ['14', 'Trả bài, sửa bài trực tiếp trên lớp cho học sinh; đối chiếu và ký biên bản xác nhận điểm', '09/11 - 14/11/2026 (Tuần 10)', 'Giáo viên bộ môn'],
                ['15', 'Tổ chức kiểm tra bổ sung cho học sinh vắng có lý do chính đáng', '12/11/2026', 'BGH, GVBM liên quan'],
                ['16', 'Tiếp nhận đơn và tổ chức chấm phúc khảo bài kiểm tra', '12/11 - 16/11/2026', 'Văn phòng, Ban Phúc khảo'],
                ['17', 'Họp Tổ chuyên môn rút kinh nghiệm kỳ kiểm tra; xây dựng kế hoạch phụ đạo HS yếu kém', '16/11 - 18/11/2026', 'Tổ trưởng chuyên môn, GV bộ môn'],
                ['18', 'Tổng hợp kết quả toàn trường, đánh giá chất lượng và báo cáo Sở GDĐT', 'Trước 20/11/2026', 'PHT Nguyễn Minh Trí, Hiệu trưởng']
              ].map(([tt, nd, tg, ng]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tt, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: nd, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tg, font: 'Times New Roman', size: 22 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ng, font: 'Times New Roman', size: 22 })] })] })
                  ]
                })
              )
            ]
          }),

          // VIII. TỔ CHỨC THỰC HIỆN VÀ PHÂN CÔNG TRÁCH NHIỆM
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'VIII. TỔ CHỨC THỰC HIỆN VÀ PHÂN CÔNG TRÁCH NHIỆM',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          ...[
            '1. Ban Giám hiệu:\n' +
            '- Hiệu trưởng: Chỉ đạo toàn diện kỳ kiểm tra; ban hành Kế hoạch, các Quyết định thành lập Ban; trực tiếp phê duyệt đề kiểm tra chính thức; chịu trách nhiệm cao nhất về tính bảo mật và kỷ cương của kỳ kiểm tra.\n' +
            '- Phó Hiệu trưởng phụ trách chuyên môn (Thầy Nguyễn Minh Trí): Điều hành chung tiến độ chuyên môn; trực tiếp chỉ đạo xây dựng ma trận, duyệt bản đặc tả đề kiểm tra; chỉ đạo khâu in sao, bảo mật đề và điều phối công tác coi, chấm thi tại Trụ sở chính (khối 10, 11, 12); tổng hợp báo cáo chung toàn trường.\n' +
            '- Các Phó Hiệu trưởng phụ trách Điểm trường (Điểm THCS Đốc Binh Kiều và Điểm THCS Tân Kiều): Chịu trách nhiệm trực tiếp về công tác chuẩn bị cơ sở vật chất, phòng thi, điều hành Ban Coi kiểm tra tại điểm trường; bảo đảm giao nhận đề và bài thi đúng quy trình bảo mật; giải quyết các tình huống phát sinh tại chỗ và báo cáo kịp thời về Ban Giám hiệu.',
            '2. Tổ trưởng, Nhóm trưởng chuyên môn:\n' +
            '- Tổ chức sinh hoạt tổ thống nhất ma trận, bản đặc tả và đề cương ôn tập đúng chuẩn kiến thức kỹ năng;\n' +
            '- Phân công giáo viên ra đề, thẩm định đề trước khi nộp về Ban Giám hiệu;\n' +
            '- Tổ chức học tập, quán triệt đáp án và hướng dẫn chấm thống nhất trong toàn tổ trước khi chấm; chỉ đạo chấm 2 vòng độc lập nghiêm túc;\n' +
            '- Tổ chức họp tổ đánh giá rút kinh nghiệm sau kiểm tra, phân tích phổ điểm các lớp để có giải pháp nâng cao chất lượng.',
            '3. Giáo viên bộ môn:\n' +
            '- Hoàn thành chương trình dạy học, kiểm tra thường xuyên và tổ chức ôn tập chu đáo cho học sinh trước kỳ kiểm tra;\n' +
            '- Thực hiện nghiêm túc nhiệm vụ ra đề, coi kiểm tra, chấm bài, trả bài và vào điểm đúng thời hạn quy định;\n' +
            '- Chủ động phối hợp với giáo viên chủ nhiệm nắm bắt tình hình học sinh, tham gia kiểm tra bù và phụ đạo học sinh có kết quả chưa đạt.',
            '4. Giáo viên chủ nhiệm:\n' +
            '- Phổ biến kịp thời, đầy đủ lịch kiểm tra, quy chế phòng thi và nội quy học sinh đến từng học sinh và phụ huynh;\n' +
            '- Thường xuyên theo dõi sĩ số, động viên học sinh ôn thi tốt; phối hợp xác minh và hoàn thiện hồ sơ xin kiểm tra bổ sung đối với học sinh vắng có lý do chính đáng.',
            '5. Bộ phận Văn phòng, Kế toán, Thiết bị, Y tế và Bảo vệ:\n' +
            '- Bộ phận Văn phòng chuẩn bị đầy đủ ấn phẩm, biểu mẫu, giấy thi, phiếu trả lời trắc nghiệm, phù hiệu giám thị và cơ sở vật chất;\n' +
            '- Bộ phận Thiết bị bảo đảm hệ thống loa phát thanh (phục vụ môn nghe Tiếng Anh), máy in, máy photocopy hoạt động thông suốt;\n' +
            '- Bộ phận Y tế trực sơ cấp cứu, chuẩn bị sẵn thuốc men phòng trường hợp học sinh có vấn đề sức khỏe;\n' +
            '- Bộ phận Bảo vệ bảo đảm an ninh trật tự, an toàn giao thông tại cổng trường và khuôn viên các điểm trường;\n' +
            '- Kế toán bảo đảm kinh phí tổ chức theo quy định tài chính và Quy chế chi tiêu nội bộ.'
          ].map((text) =>
            new Paragraph({
              spacing: { after: 80 },
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text,
                  font: 'Times New Roman',
                  size: 24
                })
              ]
            })
          ),

          new Paragraph({
            spacing: { before: 100, after: 150 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: 'Trên đây là Kế hoạch tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều. Ban Giám hiệu yêu cầu tất cả các tổ chuyên môn, các bộ phận đoàn thể, cán bộ, giáo viên, nhân viên và học sinh toàn trường nghiêm túc triển khai thực hiện./.',
                font: 'Times New Roman',
                size: 24,
                italics: true
              })
            ]
          }),

          // Signatures and Recipients Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 45, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Nơi nhận:',
                            font: 'Times New Roman',
                            size: 22,
                            bold: true,
                            italics: true
                          })
                        ]
                      }),
                      ...[
                        '- Sở GDĐT Đồng Tháp (báo cáo);',
                        '- Ban Giám hiệu (chỉ đạo, thực hiện);',
                        '- Các Tổ CM, Tổ VP (thực hiện);',
                        '- 03 Điểm trường (thực hiện);',
                        '- Ban ĐD Cha mẹ học sinh (phối hợp);',
                        '- Đoàn trường, Đội TNTP (phối hợp);',
                        '- Website trường (công khai);',
                        '- Lưu: VT, CM.'
                      ].map((r) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: r,
                              font: 'Times New Roman',
                              size: 20
                            })
                          ]
                        })
                      )
                    ]
                  }),
                  new TableCell({
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: 'HIỆU TRƯỞNG',
                            font: 'Times New Roman',
                            size: 24,
                            bold: true
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 800, after: 100 },
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: '(Ký tên, đóng dấu)',
                            font: 'Times New Roman',
                            size: 20,
                            italics: true
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // Page Break for Appendices
          new Paragraph({ pageBreakBefore: true }),

          // PHỤ LỤC I: LỊCH KIỂM TRA TẬP TRUNG CẤP THPT
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'PHỤ LỤC I',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'LỊCH KIỂM TRA TẬP TRUNG GIỮA HỌC KỲ I NĂM HỌC 2026 - 2027\nCẤP TRUNG HỌC PHỔ THÔNG (TRỤ SỞ CHÍNH - KHỐI 10, 11, 12)\n(Kèm theo Kế hoạch số 45/KH-THCS&THPTĐBK ngày 16/10/2026 của Hiệu trưởng)',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({
                text: '1. Khối 11 và Khối 12 (Kiểm tra buổi Sáng - Tập trung tại Trụ sở chính):',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),

          // Schedule THPT Sáng
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ phát đề', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ làm bài', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Khối', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ghi chú', bold: true, font: 'Times New Roman', size: 20 })] })] })
                ]
              }),
              ...[
                ['Thứ Hai, 02/11/2026', '7h25', '7h30 - 9h00', 'Ngữ văn', '11, 12', '90 phút', 'Tự luận (Đọc hiểu + Viết ngoài SGK)'],
                ['Thứ Hai, 02/11/2026', '9h25', '9h30 - 10h15', 'Vật lí', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                ['Thứ Ba, 03/11/2026', '7h25', '7h30 - 9h00', 'Toán', '11, 12', '90 phút', 'Trắc nghiệm 3 phần + Tự luận'],
                ['Thứ Ba, 03/11/2026', '9h25', '9h30 - 10h15', 'Sinh học', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                ['Thứ Tư, 04/11/2026', '7h25', '7h30 - 8h30', 'Tiếng Anh', '11, 12', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết)'],
                ['Thứ Tư, 04/11/2026', '8h55', '9h00 - 9h45', 'Địa lí', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                ['Thứ Năm, 05/11/2026', '7h25', '7h30 - 8h15', 'Hóa học / GDKT&PL', '11, 12', '45 phút', 'Phòng & đề riêng theo môn lựa chọn'],
                ['Thứ Năm, 05/11/2026', '8h40', '8h45 - 9h30', 'Tin học / Công nghệ', '11, 12', '45 phút', 'Phòng & đề riêng theo môn lựa chọn'],
                ['Thứ Sáu, 06/11/2026', '7h25', '7h30 - 8h15', 'Lịch sử', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận']
              ].map(([t, g發, gL, m, k, tl, gc]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: g發, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: gL, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m, bold: true, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: k, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tl, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: gc, font: 'Times New Roman', size: 20 })] })] })
                  ]
                })
              )
            ]
          }),

          new Paragraph({
            spacing: { before: 150, after: 80 },
            children: [
              new TextRun({
                text: '2. Khối 10 (Kiểm tra buổi Chiều - Tập trung tại Trụ sở chính):',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),

          // Schedule THPT Chiều (Khối 10)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ phát đề', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ làm bài', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Khối', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Ghi chú', bold: true, font: 'Times New Roman', size: 20 })] })] })
                ]
              }),
              ...[
                ['Thứ Hai, 02/11/2026', '13h25', '13h30 - 15h00', 'Ngữ văn', '10', '90 phút', 'Tự luận (Đọc hiểu 4,0đ + Viết 6,0đ)'],
                ['Thứ Hai, 02/11/2026', '15h25', '15h30 - 16h15', 'Vật lí', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                ['Thứ Ba, 03/11/2026', '13h25', '13h30 - 15h00', 'Toán', '10', '90 phút', 'Trắc nghiệm 3 phần + Tự luận'],
                ['Thứ Ba, 03/11/2026', '15h25', '15h30 - 16h15', 'Sinh học', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                ['Thứ Tư, 04/11/2026', '13h25', '13h30 - 14h30', 'Tiếng Anh', '10', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết)'],
                ['Thứ Tư, 04/11/2026', '14h55', '15h00 - 15h45', 'Địa lí', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                ['Thứ Năm, 05/11/2026', '13h25', '13h30 - 14h15', 'Hóa học / GDKT&PL', '10', '45 phút', 'Phòng & đề riêng theo môn lựa chọn'],
                ['Thứ Năm, 05/11/2026', '14h40', '14h45 - 15h30', 'Tin học / Công nghệ', '10', '45 phút', 'Phòng & đề riêng theo môn lựa chọn'],
                ['Thứ Sáu, 06/11/2026', '13h25', '13h30 - 14h15', 'Lịch sử', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận']
              ].map(([t, g發, gL, m, k, tl, gc]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: g發, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: gL, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m, bold: true, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: k, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tl, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: gc, font: 'Times New Roman', size: 20 })] })] })
                  ]
                })
              )
            ]
          }),

          // Page Break for THCS Schedule
          new Paragraph({ pageBreakBefore: true }),

          // PHỤ LỤC II: LỊCH KIỂM TRA TẬP TRUNG CẤP THCS
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'PHỤ LỤC II',
                font: 'Times New Roman',
                size: 26,
                bold: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'LỊCH KIỂM TRA TẬP TRUNG GIỮA HỌC KỲ I NĂM HỌC 2026 - 2027\nCẤP TRUNG HỌC CƠ SỞ (ĐIỂM TRƯỜNG ĐỐC BINH KIỀU & ĐIỂM TRƯỜNG TÂN KIỀU)\n(Kèm theo Kế hoạch số 45/KH-THCS&THPTĐBK ngày 16/10/2026 của Hiệu trưởng)',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),

          new Paragraph({
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({
                text: '1. Khối 8 và Khối 9 (Kiểm tra buổi Sáng - Bắt đầu từ 7h30):',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),

          // Schedule THCS Sáng (Khối 8, 9)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ phát đề', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ làm bài', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hình thức & Cấu trúc đề', bold: true, font: 'Times New Roman', size: 20 })] })] })
                ]
              }),
              ...[
                ['Thứ Hai, 02/11/2026', '7h25', '7h30 - 9h00', 'Ngữ văn 8, 9', '90 phút', 'Tự luận 100% (Khối 9: Đọc hiểu 5đ + Viết 5đ; Khối 8: Đọc hiểu 6đ + Viết 4đ)'],
                ['Thứ Hai, 02/11/2026', '9h25', '9h30 - 10h15', 'Giáo dục công dân 8, 9', '45 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                ['Thứ Ba, 03/11/2026', '7h25', '7h30 - 9h00', 'Toán 8, 9', '90 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                ['Thứ Ba, 03/11/2026', '9h25', '9h30 - 10h30', 'Lịch sử và Địa lí 8, 9', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                ['Thứ Tư, 04/11/2026', '7h25', '7h30 - 8h30', 'Tiếng Anh 8, 9', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết; Nói thi trước)'],
                ['Thứ Tư, 04/11/2026', '8h55', '9h00 - 10h00', 'Khoa học tự nhiên 8, 9', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)']
              ].map(([t, g發, gL, m, tl, ht]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: g發, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: gL, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m, bold: true, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tl, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ht, font: 'Times New Roman', size: 20 })] })] })
                  ]
                })
              )
            ]
          }),

          new Paragraph({
            spacing: { before: 150, after: 80 },
            children: [
              new TextRun({
                text: '2. Khối 6 và Khối 7 (Kiểm tra buổi Chiều - Bắt đầu từ 13h30):',
                font: 'Times New Roman',
                size: 24,
                bold: true
              })
            ]
          }),

          // Schedule THCS Chiều (Khối 6, 7)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorders,
            rows: [
              new TableRow({
                children: [
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thứ, Ngày', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ phát đề', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Giờ làm bài', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Môn kiểm tra', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời lượng', bold: true, font: 'Times New Roman', size: 20 })] })] }),
                  new TableCell({ shading: { fill: 'F1F5F9' }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Hình thức & Cấu trúc đề', bold: true, font: 'Times New Roman', size: 20 })] })] })
                ]
              }),
              ...[
                ['Thứ Hai, 02/11/2026', '13h25', '13h30 - 15h00', 'Ngữ văn 6, 7', '90 phút', 'Tự luận 100% (Đọc hiểu 6,0đ + Viết 4,0đ ngoài SGK)'],
                ['Thứ Hai, 02/11/2026', '15h25', '15h30 - 16h15', 'Giáo dục công dân 6, 7', '45 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                ['Thứ Ba, 03/11/2026', '13h25', '13h30 - 15h00', 'Toán 6, 7', '90 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                ['Thứ Ba, 03/11/2026', '15h25', '15h30 - 16h30', 'Lịch sử và Địa lí 6, 7', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                ['Thứ Tư, 04/11/2026', '13h25', '13h30 - 14h30', 'Tiếng Anh 6, 7', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết; Nói thi trước)'],
                ['Thứ Tư, 04/11/2026', '14h55', '15h00 - 16h00', 'Khoa học tự nhiên 6, 7', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)']
              ].map(([t, g發, gL, m, tl, ht]) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: g發, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: gL, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: m, bold: true, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: tl, font: 'Times New Roman', size: 20 })] })] }),
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ht, font: 'Times New Roman', size: 20 })] })] })
                  ]
                })
              )
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated Midterm Exam Plan DOCX at: ${outputPath}`);
}

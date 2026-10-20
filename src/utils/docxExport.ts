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
  BorderStyle,
  UnderlineType,
} from 'docx';
import { SchoolDocument } from '../types/document';
import { DepartmentMeeting } from '../types/meeting';

export function createSchoolDocumentDocx(doc: SchoolDocument): Document {
  const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
  const cellGridBorder = {
    top: tableBorder,
    bottom: tableBorder,
    left: tableBorder,
    right: tableBorder,
  };
  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideVertical: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  const cellNoBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  // Trang A4 = 210mm = 11906 twips.
  // Lề: Trái 25mm (1417 twips), Phải 18mm (1020 twips), Trên 20mm (1134 twips), Dưới 20mm (1134 twips)
  // Chiều rộng khả dụng của trang in = 11906 - 1417 - 1020 = 9469 twips.
  // Cột trái: 4100 twips (~43.3%), Cột phải: 5369 twips (~56.7%)
  // Đảm bảo "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" không bao giờ rớt chữ "NAM",
  // "Độc lập - Tự do - Hạnh phúc" cân đối ngay ngắn và địa danh ngày tháng cùng hàng số ký hiệu.
  const colLeftWidth = 4100;
  const colRightWidth = 5369;
  const totalHeaderWidth = colLeftWidth + colRightWidth;

  // Header 2-column table conforming to Vietnamese State Administration Standards & Decree 30/2020/NĐ-CP
  const headerTable = new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [colLeftWidth, colRightWidth],
    width: { size: totalHeaderWidth, type: WidthType.DXA },
    borders: noBorder,
    rows: [
      // Hàng 1: Cơ quan ban hành (trái) và Quốc hiệu, Tiêu ngữ (phải)
      new TableRow({
        children: [
          // Left: Cơ quan ban hành (Font 12pt = size 24)
          new TableCell({
            width: { size: colLeftWidth, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: doc.issuingAuthorityTop || 'SỞ GDĐT TỈNH ĐỒNG THÁP',
                    size: 24, // 12pt
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { after: 20 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'TRƯỜNG THCS VÀ THPT',
                    bold: true,
                    size: 24, // 12pt
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { after: 10 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'ĐỐC BINH KIỀU',
                    bold: true,
                    size: 24, // 12pt
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { after: 20 },
              }),
              // Đường kẻ ngang dưới tên đơn vị: dài 1/3 - 1/2 độ dài tên (7 ký tự gạch)
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '───────',
                    size: 14, // 7pt nét thanh mảnh
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { before: 0, after: 40 },
              }),
            ],
          }),
          // Right: Quốc hiệu, Tiêu ngữ (Cột rộng 5369 twips để không bao giờ bị nhảy chữ NAM)
          new TableCell({
            width: { size: colRightWidth, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                    bold: true,
                    size: 24, // 12pt chuẩn Nghị định 30 (12-13pt), vừa vặn tuyệt đối 1 hàng
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { after: 20 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Độc lập - Tự do - Hạnh phúc',
                    bold: true,
                    size: 26, // 13pt
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { after: 20 },
              }),
              // Đường kẻ ngang dưới Tiêu ngữ: dài bằng độ dài dòng chữ (16 ký tự gạch)
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '────────────────',
                    size: 14, // 7pt nét thanh mảnh
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { before: 0, after: 40 },
              }),
            ],
          }),
        ],
      }),
      // Hàng 2: Số ký hiệu văn bản (trái) và Địa danh, Ngày tháng năm (phải) - NGANG BẰNG NHAU TUYỆT ĐỐI
      new TableRow({
        children: [
          new TableCell({
            width: { size: colLeftWidth, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: doc.documentNumber || 'Số:    /KH-THCS&THPTĐBK',
                    size: 24, // 12pt
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { before: 20, after: 20 },
              }),
            ],
          }),
          new TableCell({
            width: { size: colRightWidth, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: doc.signDate || 'Đồng Tháp, ngày 09 tháng 10 năm 2026',
                    italics: true,
                    size: 26, // 13pt
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { before: 20, after: 20 },
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const docChildren: (Paragraph | Table)[] = [
    headerTable,
    new Paragraph({ spacing: { before: 180, after: 120 } }),
    // Document Title: KẾ HOẠCH (size 30 = 15pt bold)
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: doc.title.toUpperCase(),
          bold: true,
          size: 30, // 15pt
          font: 'Times New Roman',
        }),
      ],
      spacing: { before: 80, after: 40 },
    }),
  ];

  // Subtitle / Trích yếu: e.g. "Triển khai thực hiện học bạ số kể từ năm học 2026 - 2027" (size 28 = 14pt bold, có đường kẻ hở không đè dấu nặng)
  if (doc.subTitle) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: doc.subTitle,
            bold: true,
            size: 28, // 14pt
            font: 'Times New Roman',
          }),
        ],
        spacing: { after: 20 },
      }),
      // Đường kẻ ngang dưới trích yếu: dài 1/3 - 1/2 độ dài dòng chữ theo NĐ 30, hở ra không đè lên dấu nặng
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: '───────────────',
            size: 14, // 7pt nét thanh mảnh
            font: 'Times New Roman',
          }),
        ],
        spacing: { before: 0, after: 200 },
      })
    );
  } else {
    docChildren.push(new Paragraph({ spacing: { after: 180 } }));
  }

  // Legal bases: Indent 1.27cm (720 twips), font 14pt (size 28), italic, justified
  if (doc.legalBases && doc.legalBases.length > 0) {
    doc.legalBases.forEach((base, idx) => {
      const fullText = base.startsWith('Căn cứ') ? base : `Căn cứ ${base}`;
      const isLast = idx === doc.legalBases.length - 1;
      let formattedText = fullText;
      if (isLast) {
        if (!formattedText.endsWith('.')) formattedText = formattedText.replace(/;$/, '') + '.';
      } else {
        if (!formattedText.endsWith(';')) formattedText = formattedText.replace(/\.$/, '') + ';';
      }

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: formattedText,
              size: 28, // 14pt
              font: 'Times New Roman',
            }),
          ],
          indent: { firstLine: 567 }, // 1.0cm indent
          spacing: { line: 280, after: 60 },
        })
      );
    });
  }

  // Transition phrase if plan
  if (doc.type === 'plan') {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({
            text: `Nay Trường THCS và THPT Đốc Binh Kiều xây dựng ${doc.subTitle ? (doc.subTitle.toLowerCase().startsWith('kế hoạch') ? doc.subTitle : `Kế hoạch ${doc.subTitle.toLowerCase()}`) : (doc.title.toLowerCase().startsWith('kế hoạch') ? doc.title : `Kế hoạch ${doc.title.toLowerCase()}`)} như sau:`,
            size: 28, // 14pt
            font: 'Times New Roman',
          }),
        ],
        indent: { firstLine: 720 },
        spacing: { line: 280, after: 120 },
      })
    );
  }

  // Helper function to format runs with bold support and markdown ** parsing
  const formatParagraphRuns = (text: string, defaultBold?: boolean): TextRun[] => {
    const runs: TextRun[] = [];
    const parts = text.split(/(\*\*.*?\*\*)/g);
    for (const part of parts) {
      if (!part) continue;
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        if (inner) {
          runs.push(
            new TextRun({
              text: inner,
              bold: true,
              size: 28, // 14pt
              font: 'Times New Roman',
            })
          );
        }
      } else {
        runs.push(
          new TextRun({
            text: part,
            bold: defaultBold,
            size: 28, // 14pt
            font: 'Times New Roman',
          })
        );
      }
    }
    return runs.length > 0
      ? runs
      : [
          new TextRun({
            text,
            bold: defaultBold,
            size: 28,
            font: 'Times New Roman',
          }),
        ];
  };

  // Helper function to render a section's heading and content/tables
  const renderSection = (sec: { heading: string; content: string }) => {
    const isAppendix = sec.heading.toUpperCase().startsWith('PHỤ LỤC');
    if (isAppendix) {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: sec.heading.toUpperCase(),
              bold: true,
              size: 28, // 14pt
              font: 'Times New Roman',
            }),
          ],
          spacing: { before: 240, after: 140 },
        })
      );
    } else {
      // Heading: Roman numeral heading bold 14pt (thụt đầu dòng 1.0cm = 567 twips theo Nghị định 30; canh đều hai bên)
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: sec.heading,
              bold: true,
              size: 28, // 14pt
              font: 'Times New Roman',
            }),
          ],
          indent: { firstLine: 567 }, // Thụt đầu dòng 1.0cm chuẩn thể thức
          spacing: { before: 140, after: 100 },
        })
      );
    }

    // Content paragraphs and tables
    const lines = sec.content.split('\n');
    const blocks: Array<{ type: 'paragraph'; text: string } | { type: 'table'; rows: string[][] }> = [];
    let tableLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableLines.push(trimmed);
      } else {
        if (tableLines.length > 0) {
          const parsedRows = tableLines
            .filter((tl) => !tl.includes('---'))
            .map((tl) => tl.split('|').map((c) => c.trim()).slice(1, -1));
          if (parsedRows.length > 0) {
            blocks.push({ type: 'table', rows: parsedRows });
          }
          tableLines = [];
        }
        if (trimmed.length > 0) {
          blocks.push({ type: 'paragraph', text: trimmed });
        }
      }
    }

    if (tableLines.length > 0) {
      const parsedRows = tableLines
        .filter((tl) => !tl.includes('---'))
        .map((tl) => tl.split('|').map((c) => c.trim()).slice(1, -1));
      if (parsedRows.length > 0) {
        blocks.push({ type: 'table', rows: parsedRows });
      }
    }

    blocks.forEach((block) => {
      if (block.type === 'table') {
        const contentTable = new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: tableBorder,
            bottom: tableBorder,
            left: tableBorder,
            right: tableBorder,
            insideHorizontal: tableBorder,
            insideVertical: tableBorder,
          },
          rows: block.rows.map((rowCells, rIdx) => {
            const isHeader = rIdx === 0;
            return new TableRow({
              children: rowCells.map((cellText, cIdx) => {
                const isCenter = cIdx === 0 || cellText.length <= 6 || (/^\d/.test(cellText) && cellText.length < 15);
                const cleanText = cellText.replace(/\*\*/g, '');
                return new TableCell({
                  borders: cellNoBorder,
                  children: [
                    new Paragraph({
                      alignment: isHeader ? AlignmentType.CENTER : isCenter ? AlignmentType.CENTER : AlignmentType.LEFT,
                      children: [
                        new TextRun({
                          text: cleanText || ' ',
                          bold: isHeader || cellText.includes('**'),
                          size: 24, // 12pt
                          font: 'Times New Roman',
                        }),
                      ],
                      spacing: { line: 240, before: 60, after: 60 },
                    }),
                  ],
                });
              }),
            });
          }),
        });

        docChildren.push(new Paragraph({ spacing: { before: 80 } }));
        docChildren.push(contentTable);
        docChildren.push(new Paragraph({ spacing: { after: 120 } }));
        return;
      }

      const trimmed = block.text;
      const isNumbered = /^\d+(\.\d+)*\./.test(trimmed);
      const isLetterSub = /^[a-zđ]\)/i.test(trimmed);

      // Thụt đầu dòng 1.0cm (567 twips) thống nhất tuyệt đối theo Nghị định 30/2020/NĐ-CP
      // Tất cả dòng 2 trở đi thẳng hàng lề trái trang, không bao giờ bị thụt thò lồi lõm
      const runs = formatParagraphRuns(
        trimmed,
        isNumbered ? true : undefined
      );

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: runs,
          indent: { firstLine: 567 }, // 1.0cm chuẩn chỉ
          spacing: { line: 280, before: isNumbered ? 100 : 30, after: 50 },
        })
      );
    });
  };

  const regularSections = doc.sections.filter(
    (sec) => !sec.heading.toUpperCase().startsWith('PHỤ LỤC')
  );
  const appendixSections = doc.sections.filter((sec) =>
    sec.heading.toUpperCase().startsWith('PHỤ LỤC')
  );

  // Render regular sections first
  if (regularSections.length > 0) {
    regularSections.forEach(renderSection);
  } else {
    appendixSections.forEach(renderSection);
  }

  // Footer: Recipients (Left 11-12pt) & Signer (Right 13-14pt bold)
  const signerLines = (doc.signerRole || 'KT. HIỆU TRƯỞNG\nPHÓ HIỆU TRƯỞNG').split('\n');
  const footerColLeft = 4500;
  const footerColRight = 4969;
  const footerTable = new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [footerColLeft, footerColRight],
    width: { size: footerColLeft + footerColRight, type: WidthType.DXA },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          // Left: Nơi nhận (Font 12pt bold italic, list items 11pt)
          new TableCell({
            width: { size: footerColLeft, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Nơi nhận:',
                    bold: true,
                    italics: true,
                    size: 24, // 12pt
                    font: 'Times New Roman',
                  }),
                ],
                spacing: { after: 20 },
              }),
              ...(doc.recipients && doc.recipients.length > 0
                ? doc.recipients.map((r) => {
                    const text = r.startsWith('-') ? r : `- ${r}`;
                    if (text.includes('Lưu:')) {
                      return '- Lưu: VT, Tr.';
                    }
                    return text;
                  })
                : [
                    '- Sở GDĐT Đồng Tháp (để báo cáo);',
                    '- Hiệu trưởng (để chỉ đạo);',
                    '- Các Phó Hiệu trưởng (để phối hợp);',
                    '- Các tổ chuyên môn, tổ văn phòng (để thực hiện);',
                    '- Ban ĐD Cha mẹ học sinh (để phối hợp);',
                    '- Đoàn trường, Đội TNTP (để phối hợp);',
                    '- Lưu: VT, Tr.',
                  ]
              ).map(
                (r) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: r,
                        size: 22, // 11pt
                        font: 'Times New Roman',
                      }),
                    ],
                    spacing: { line: 220, after: 20 },
                  })
              ),
            ],
          }),
          // Right: Chức vụ & Họ tên người ký
          new TableCell({
            width: { size: footerColRight, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              ...signerLines.map(
                (line, idx) =>
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: line.toUpperCase(),
                        bold: true,
                        size: idx === 0 && line.includes('KT.') ? 26 : 28, // 13-14pt
                        font: 'Times New Roman',
                      }),
                    ],
                    spacing: { after: 20 },
                  })
              ),
              // Blank spacing for signature & seal: Enter xuống thêm các hàng rộng rãi để Thầy ký và đóng dấu
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 280 } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 280 } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 280 } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 280 } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 280 } }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: doc.signerName || 'Nguyễn Minh Trí',
                    bold: true,
                    size: 28, // 14pt
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  docChildren.push(
    new Paragraph({ spacing: { before: 200, after: 100 } }),
    footerTable
  );

  // If there were regular sections, render appendix sections after the main document's signature block
  if (regularSections.length > 0 && appendixSections.length > 0) {
    appendixSections.forEach(renderSection);
  }

  // Document setup: Standard A4 margins according to Nghị định 30/2020/NĐ-CP
  // Lề trên: 20mm (1134 twips)
  // Lề dưới: 20mm (1134 twips)
  // Lề trái: 25mm (1417 twips - chuẩn 25-30mm của Nghị định 30)
  // Lề phải: 18mm (1020 twips - chuẩn 15-20mm của Nghị định 30)
  const docxFile = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134, // 20mm (2 cm)
              bottom: 1134, // 20mm (2 cm)
              left: 1417, // 25mm (2.5 cm - lề trái)
              right: 1020, // 18mm (1.8 cm - lề phải)
            },
          },
        },
        children: docChildren,
      },
    ],
  });

  return docxFile;
}

export async function exportDocumentToDocx(doc: SchoolDocument): Promise<void> {
  const docxFile = createSchoolDocumentDocx(doc);
  const blob = await Packer.toBlob(docxFile);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  const safeFilename = `${doc.type.toUpperCase()}_${(doc.subTitle || doc.title).replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g, '_').substring(0, 40)}.docx`;
  anchor.download = safeFilename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export async function exportMeetingToDocx(meeting: DepartmentMeeting): Promise<void> {
  if (meeting.id === 'tra-loi-hop-to-cm-lan-3-08-10-2026') {
    const anchor = document.createElement('a');
    anchor.href = '/api/department-meetings/download/tra-loi-lan-3';
    anchor.download = 'TRẢ LỜI HỌP TỔ LẦN 3 - 08-10-2026.docx';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return;
  }

  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    insideVertical: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  const cellNoBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  const colLeftWidth = 4100;
  const colRightWidth = 5369;
  const totalHeaderWidth = colLeftWidth + colRightWidth;

  const headerTable = new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [colLeftWidth, colRightWidth],
    width: { size: totalHeaderWidth, type: WidthType.DXA },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: colLeftWidth, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'SỞ GDĐT TỈNH ĐỒNG THÁP', font: 'Times New Roman', size: 24, bold: false }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU', font: 'Times New Roman', size: 24, bold: true }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: meeting.departmentName.toUpperCase(), font: 'Times New Roman', size: 24, bold: true }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: meeting.meetingNumber || 'Số: .../BB', font: 'Times New Roman', size: 24, bold: false }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: colRightWidth, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', font: 'Times New Roman', size: 24, bold: true }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Độc lập - Tự do - Hạnh phúc', font: 'Times New Roman', size: 26, bold: true, underline: { type: UnderlineType.SINGLE } }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 120 },
                children: [
                  new TextRun({ text: meeting.meetingDate || 'Tháp Mười, năm 2026', font: 'Times New Roman', size: 24, italics: true }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const children: (Paragraph | Table)[] = [
    headerTable,
    new Paragraph({ spacing: { before: 240 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: 'BIÊN BẢN HỌP TỔ CHUYÊN MÔN', font: 'Times New Roman', size: 32, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 180 },
      children: [
        new TextRun({ text: `(${meeting.week} - ${meeting.semester} - Năm học ${meeting.schoolYear})`, font: 'Times New Roman', size: 26, italics: true, bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [
        new TextRun({ text: '1. Thời gian: ', font: 'Times New Roman', size: 26, bold: true }),
        new TextRun({ text: meeting.meetingDate, font: 'Times New Roman', size: 26 }),
      ],
    }),
    new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [
        new TextRun({ text: '2. Địa điểm: ', font: 'Times New Roman', size: 26, bold: true }),
        new TextRun({ text: meeting.location, font: 'Times New Roman', size: 26 }),
      ],
    }),
    new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [
        new TextRun({ text: '3. Thành phần tham dự: ', font: 'Times New Roman', size: 26, bold: true }),
        new TextRun({ text: `Có mặt: ${meeting.attendees.present}/${meeting.attendees.total} thành viên; Vắng: ${meeting.attendees.absent || '0'}`, font: 'Times New Roman', size: 26 }),
      ],
    }),
    new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [
        new TextRun({ text: '4. Chủ trì: ', font: 'Times New Roman', size: 26, bold: true }),
        new TextRun({ text: meeting.leader, font: 'Times New Roman', size: 26 }),
      ],
    }),
    new Paragraph({
      spacing: { before: 60, after: 120 },
      children: [
        new TextRun({ text: '5. Thư ký: ', font: 'Times New Roman', size: 26, bold: true }),
        new TextRun({ text: meeting.secretary, font: 'Times New Roman', size: 26 }),
      ],
    }),
    new Paragraph({
      spacing: { before: 120, after: 120 },
      children: [
        new TextRun({ text: 'CHỦ ĐỀ SINH HOẠT CHUYÊN MÔN: ', font: 'Times New Roman', size: 26, bold: true, color: '1E3A8A' }),
        new TextRun({ text: meeting.topic, font: 'Times New Roman', size: 26, bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { before: 180, after: 60 },
      children: [
        new TextRun({ text: 'NỘI DUNG VÀ DIỄN BIẾN CUỘC HỌP:', font: 'Times New Roman', size: 26, bold: true }),
      ],
    }),
  ];

  // Parse lines in meeting.content
  const contentLines = meeting.content.split('\n');
  contentLines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      children.push(new Paragraph({ spacing: { before: 60 } }));
      return;
    }
    const isHeading = /^[I|V|X]+\.|\d+\.\s+[A-ZÀ-Ỹ]/.test(trimmed);
    children.push(
      new Paragraph({
        spacing: { before: isHeading ? 140 : 60, after: 60 },
        children: [
          new TextRun({
            text: trimmed,
            font: 'Times New Roman',
            size: 26,
            bold: isHeading,
          }),
        ],
      })
    );
  });

  // Nghị quyết / Kết luận
  if (meeting.resolutions && meeting.resolutions.length > 0) {
    children.push(new Paragraph({ spacing: { before: 180 } }));
    children.push(
      new Paragraph({
        spacing: { before: 120, after: 80 },
        children: [
          new TextRun({ text: 'KẾT LUẬN VÀ NGHỊ QUYẾT CỦA TỔ TRƯỞNG:', font: 'Times New Roman', size: 26, bold: true }),
        ],
      })
    );
    meeting.resolutions.forEach((res, idx) => {
      children.push(
        new Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: 360 },
          children: [
            new TextRun({ text: `${idx + 1}. `, font: 'Times New Roman', size: 26, bold: true }),
            new TextRun({ text: res, font: 'Times New Roman', size: 26 }),
          ],
        })
      );
    });
  }

  // Phân công nhiệm vụ cụ thể 2 tuần tiếp theo
  if (meeting.tasks && meeting.tasks.length > 0) {
    children.push(new Paragraph({ spacing: { before: 180 } }));
    children.push(
      new Paragraph({
        spacing: { before: 120, after: 80 },
        children: [
          new TextRun({ text: 'PHÂN CÔNG NHIỆM VỤ CỤ THỂ 2 TUẦN TIẾP THEO:', font: 'Times New Roman', size: 26, bold: true }),
        ],
      })
    );

    const taskBorder = {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    };

    const taskRows = [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 800, type: WidthType.DXA },
            borders: taskBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, font: 'Times New Roman', size: 22 })] })],
          }),
          new TableCell({
            width: { size: 4400, type: WidthType.DXA },
            borders: taskBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nội dung nhiệm vụ', bold: true, font: 'Times New Roman', size: 22 })] })],
          }),
          new TableCell({
            width: { size: 2200, type: WidthType.DXA },
            borders: taskBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Người phụ trách', bold: true, font: 'Times New Roman', size: 22 })] })],
          }),
          new TableCell({
            width: { size: 2069, type: WidthType.DXA },
            borders: taskBorder,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Thời hạn', bold: true, font: 'Times New Roman', size: 22 })] })],
          }),
        ],
      }),
      ...(meeting.tasks || []).map((t, idx) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 800, type: WidthType.DXA },
              borders: taskBorder,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}`, font: 'Times New Roman', size: 22 })] })],
            }),
            new TableCell({
              width: { size: 4400, type: WidthType.DXA },
              borders: taskBorder,
              children: [new Paragraph({ children: [new TextRun({ text: t.task || (t as any).title || '', font: 'Times New Roman', size: 22 })] })],
            }),
            new TableCell({
              width: { size: 2200, type: WidthType.DXA },
              borders: taskBorder,
              children: [new Paragraph({ children: [new TextRun({ text: t.assignee || (t as any).assignedTo || '', font: 'Times New Roman', size: 22 })] })],
            }),
            new TableCell({
              width: { size: 2069, type: WidthType.DXA },
              borders: taskBorder,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t.deadline || '', font: 'Times New Roman', size: 22 })] })],
            }),
          ],
        })
      ),
    ];

    children.push(
      new Table({
        layout: TableLayoutType.FIXED,
        width: { size: 9469, type: WidthType.DXA },
        columnWidths: [800, 4400, 2200, 2069],
        rows: taskRows,
      })
    );
  }

  // Footer Signatures
  const sigTable = new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [4734, 4735],
    width: { size: 9469, type: WidthType.DXA },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4734, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 240 },
                children: [new TextRun({ text: 'THƯ KÝ', bold: true, font: 'Times New Roman', size: 26 })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 22 })],
              }),
              new Paragraph({ spacing: { before: 900 } }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: meeting.secretary || 'Thư ký', bold: true, font: 'Times New Roman', size: 26 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 4735, type: WidthType.DXA },
            borders: cellNoBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 240 },
                children: [new TextRun({ text: 'TỔ TRƯỞNG CHUYÊN MÔN', bold: true, font: 'Times New Roman', size: 26 })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: 22 })],
              }),
              new Paragraph({ spacing: { before: 900 } }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: meeting.leader || 'Tổ trưởng chuyên môn', bold: true, font: 'Times New Roman', size: 26 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  children.push(sigTable);

  const docxFile = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,
              bottom: 1134,
              left: 1417,
              right: 1020,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(docxFile);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  const safeDept = (meeting.departmentName || 'TO_CHUYEN_MON').replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g, '_');
  const safeWeek = (meeting.week || 'TUAN').replace(/[^a-zA-Z0-9]/g, '_');
  const safeFilename = `BIEN_BAN_HOP_${safeDept}_${safeWeek}.docx`;
  anchor.download = safeFilename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}


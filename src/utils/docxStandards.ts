/**
 * BỘ QUY CHUẨN THỂ THỨC VĂN BẢN XUẤT DOCX
 * Tuân thủ nghiêm ngặt:
 * 1. Nghị định số 30/2020/NĐ-CP của Chính phủ về công tác văn thư.
 * 2. Hướng dẫn số 36-HD/VPTW và Quy định của Ban Bí thư về thể thức văn bản Đảng.
 * 3. Bộ mã ký tự Unicode Times New Roman, khổ giấy A4, định lề đóng gáy chuẩn quốc gia.
 */

import {
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  TableLayoutType,
  Header,
  Footer,
  PageNumber,
} from 'docx';

// =============================================================================
// 1. THÔNG SỐ TRANG IN KHỔ A4 CHUẨN (Tính bằng dxa / twips: 1 inch = 1440 dxa; 1 cm = 567 dxa)
// =============================================================================
export const DOCX_PAGE_SETUP = {
  // A4: 210mm x 297mm (11906 dxa x 16838 dxa)
  size: {
    width: 11906,
    height: 16838,
  },
  // Lề trang chuẩn Nghị định 30 (Lề trái 30mm để đóng gáy/đóng dấu, lề phải 15mm, trên 20mm, dưới 20mm)
  margin: {
    top: 1134,    // 20 mm
    bottom: 1134, // 20 mm
    left: 1701,   // 30 mm (Chuẩn đóng dấu lưu trữ)
    right: 850,   // 15 mm
  },
  // Chiều rộng khả dụng của phần nội dung = 11906 - 1701 - 850 = 9355 dxa
  contentWidth: 9355,
  colLeftWidth: 4100,  // Cột trái Header (Cơ quan / Số hiệu) ~ 43.8%
  colRightWidth: 5255, // Cột phải Header (Quốc hiệu / Ngày tháng) ~ 56.2%
};

// Cỡ chữ chuẩn (Docx tính theo half-points: 1pt = 2 half-points)
export const FONT_SIZES = {
  TITLE_TYPE: 30,       // 15pt: Tên loại văn bản (KẾ HOẠCH, QUY CHẾ, NGHỊ QUYẾT...)
  TITLE_SUBJECT: 28,    // 14pt: Trích yếu nội dung
  CHAPTER_HEADING: 28,  // 14pt: Chương I, Phần thứ nhất...
  ARTICLE_HEADING: 28,  // 14pt: Điều 1, Mục 1...
  BODY: 28,             // 14pt: Toàn bộ nội dung thân bài (chuẩn NĐ 30: 13-14pt, chọn 14pt đồng nhất)
  BODY_SMALL: 26,       // 13pt: Bảng biểu dài hoặc văn bản dày
  LEGAL_BASIS: 28,      // 14pt: Căn cứ pháp lý
  HEADER_TOP: 24,       // 12pt: Tên cơ quan cấp trên
  HEADER_ORG: 24,       // 12pt: Tên cơ quan ban hành (hoặc 13pt)
  HEADER_NUMBER: 24,    // 12pt: Số ký hiệu văn bản
  HEADER_NATION: 24,    // 12pt: CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
  HEADER_MOTTO: 26,     // 13pt: Độc lập - Tự do - Hạnh phúc
  HEADER_DATE: 26,      // 13pt: Địa danh, ngày tháng năm (nghiêng)
  SIGNER_ROLE: 28,      // 14pt: BÍ THƯ / HIỆU TRƯỞNG
  SIGNER_NAME: 28,      // 14pt: Họ và tên người ký (chữ hoa đầu, in đậm)
  RECIPIENTS_TITLE: 24, // 12pt: Nơi nhận:
  RECIPIENTS_ITEM: 22,  // 11pt: Danh sách cơ quan nhận
  TABLE_HEADER: 24,     // 12pt: Tiêu đề cột bảng
  TABLE_CELL: 24,       // 12pt: Nội dung ô trong bảng
  LINE_DECOR: 14,       // 7pt: Đường kẻ trang trí mảnh
};

// Thụt đầu dòng chuẩn: 1.0cm = 567 dxa hoặc 1.27cm = 720 dxa
export const INDENT_FIRST_LINE = 567; // 1.0 cm chuẩn mực

// Giãn dòng và đoạn chuẩn (line: 280 ~ 1.2 dòng; spacing before/after tinh tế)
export const PARAGRAPH_SPACING = {
  line: 280,
  before: 60,
  after: 60,
};

const BORDER_SINGLE_BLACK = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
export const TABLE_CELL_BORDER_GRID = {
  top: BORDER_SINGLE_BLACK,
  bottom: BORDER_SINGLE_BLACK,
  left: BORDER_SINGLE_BLACK,
  right: BORDER_SINGLE_BLACK,
};

export const TABLE_CELL_BORDER_NONE = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
};

// =============================================================================
// 2. CÁC HÀM TẠO THÀNH PHẦN VĂN BẢN CHUẨN XÁC
// =============================================================================

/**
 * Tạo đoạn văn nội dung thông thường (chuẩn 14pt, canh đều 2 bên, thụt đầu dòng đúng 1.0cm)
 */
export function createBodyParagraph(
  text: string,
  options?: {
    bold?: boolean;
    italic?: boolean;
    indentFirstLine?: boolean;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
    spacingBefore?: number;
    spacingAfter?: number;
  }
): Paragraph {
  const shouldIndent = options?.indentFirstLine ?? true;
  const runs: TextRun[] = [];

  // Hỗ trợ markdown bold **...**
  if (text.includes('**')) {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    for (const part of parts) {
      if (!part) continue;
      if (part.startsWith('**') && part.endsWith('**')) {
        runs.push(
          new TextRun({
            text: part.slice(2, -2),
            bold: true,
            italics: options?.italic ?? false,
            font: 'Times New Roman',
            size: FONT_SIZES.BODY,
          })
        );
      } else {
        runs.push(
          new TextRun({
            text: part,
            bold: options?.bold ?? false,
            italics: options?.italic ?? false,
            font: 'Times New Roman',
            size: FONT_SIZES.BODY,
          })
        );
      }
    }
  } else {
    runs.push(
      new TextRun({
        text,
        bold: options?.bold ?? false,
        italics: options?.italic ?? false,
        font: 'Times New Roman',
        size: FONT_SIZES.BODY,
      })
    );
  }

  return new Paragraph({
    alignment: options?.align ?? AlignmentType.JUSTIFIED,
    indent: shouldIndent ? { firstLine: INDENT_FIRST_LINE } : undefined,
    spacing: {
      line: PARAGRAPH_SPACING.line,
      before: options?.spacingBefore ?? PARAGRAPH_SPACING.before,
      after: options?.spacingAfter ?? PARAGRAPH_SPACING.after,
    },
    children: runs,
  });
}

/**
 * Tạo dòng đề mục Chương / Phần (In hoa, đậm, căn giữa, cỡ 14pt)
 */
export function createChapterHeading(title: string, subtitle?: string): Paragraph[] {
  const paragraphs: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: subtitle ? 60 : 120 },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.CHAPTER_HEADING,
        }),
      ],
    }),
  ];

  if (subtitle) {
    paragraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 120 },
        children: [
          new TextRun({
            text: subtitle.toUpperCase(),
            bold: true,
            font: 'Times New Roman',
            size: FONT_SIZES.CHAPTER_HEADING,
          }),
        ],
      })
    );
  }

  return paragraphs;
}

/**
 * Tạo dòng đề mục Điều / Mục (In đậm, thụt đầu dòng 1.0cm, cỡ 14pt)
 */
export function createArticleHeading(headingText: string): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: INDENT_FIRST_LINE },
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text: headingText,
        bold: true,
        font: 'Times New Roman',
        size: FONT_SIZES.ARTICLE_HEADING,
      }),
    ],
  });
}

/**
 * Tạo dòng mục nhỏ Khoản (1, 2, 3...) hoặc Điểm (a, b, c...)
 */
export function createSubItem(
  prefix: string,
  content: string,
  options?: { boldPrefix?: boolean }
): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: INDENT_FIRST_LINE },
    spacing: { line: PARAGRAPH_SPACING.line, before: 40, after: 40 },
    children: [
      new TextRun({
        text: prefix + ' ',
        bold: options?.boldPrefix ?? true,
        font: 'Times New Roman',
        size: FONT_SIZES.BODY,
      }),
      new TextRun({
        text: content,
        font: 'Times New Roman',
        size: FONT_SIZES.BODY,
      }),
    ],
  });
}

/**
 * Tạo căn cứ pháp lý chuẩn (Nghiêng, thụt lề 1.0cm, cuối có dấu ; hoặc .)
 */
export function createLegalBasisParagraph(text: string, isLast = false): Paragraph {
  let cleaned = text.trim();
  if (!cleaned.startsWith('Căn cứ') && !cleaned.startsWith('- Căn cứ')) {
    cleaned = `Căn cứ ${cleaned}`;
  }
  // Bỏ dấu câu cũ ở cuối để chuẩn hóa
  cleaned = cleaned.replace(/[;\.\,]$/, '');
  const ending = isLast ? '.' : ';';

  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: INDENT_FIRST_LINE },
    spacing: { line: PARAGRAPH_SPACING.line, before: 30, after: 30 },
    children: [
      new TextRun({
        text: cleaned + ending,
        italics: true,
        font: 'Times New Roman',
        size: FONT_SIZES.LEGAL_BASIS,
      }),
    ],
  });
}

/**
 * Tạo tiêu đề văn bản (Tên loại văn bản in hoa đậm 15pt, Trích yếu 14pt đậm có đường kẻ ngắn)
 */
export function createDocumentTitleBlock(typeTitle: string, subjectTitle?: string): Paragraph[] {
  const result: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 60 },
      children: [
        new TextRun({
          text: typeTitle.toUpperCase(),
          bold: true,
          font: 'Times New Roman',
          size: FONT_SIZES.TITLE_TYPE,
        }),
      ],
    }),
  ];

  if (subjectTitle) {
    result.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [
          new TextRun({
            text: subjectTitle,
            bold: true,
            font: 'Times New Roman',
            size: FONT_SIZES.TITLE_SUBJECT,
          }),
        ],
      }),
      // Đường kẻ ngang dưới trích yếu bằng 1/3 - 1/2 độ dài dòng chữ
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 180 },
        children: [
          new TextRun({
            text: '───────────────',
            size: FONT_SIZES.LINE_DECOR,
            font: 'Times New Roman',
          }),
        ],
      })
    );
  } else {
    result.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 180 },
        children: [
          new TextRun({
            text: '─────',
            size: FONT_SIZES.LINE_DECOR,
            font: 'Times New Roman',
          }),
        ],
      })
    );
  }

  return result;
}

/**
 * Tạo Header Table chuẩn văn bản Đảng (ĐẢNG BỘ XÃ ĐỐC BINH KIỀU / ĐẢNG CỘNG SẢN VIỆT NAM)
 */
export function createPartyDocHeaderTable(
  docNumber: string,
  dateStr: string,
  superiorOrg = 'ĐẢNG BỘ XÃ ĐỐC BINH KIỀU'
): Table {
  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [DOCX_PAGE_SETUP.colLeftWidth, DOCX_PAGE_SETUP.colRightWidth],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    borders: {
      top: TABLE_CELL_BORDER_NONE.top,
      bottom: TABLE_CELL_BORDER_NONE.bottom,
      left: TABLE_CELL_BORDER_NONE.left,
      right: TABLE_CELL_BORDER_NONE.right,
      insideHorizontal: TABLE_CELL_BORDER_NONE.top,
      insideVertical: TABLE_CELL_BORDER_NONE.left,
    },
    rows: [
      new TableRow({
        children: [
          // Bên trái: Cơ quan cấp trên & Cơ quan ban hành
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colLeftWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: superiorOrg,
                    size: FONT_SIZES.HEADER_TOP,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 10 },
                children: [
                  new TextRun({
                    text: 'ĐẢNG ỦY TRƯỜNG THCS VÀ THPT',
                    bold: true,
                    size: FONT_SIZES.HEADER_ORG,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: 'ĐỐC BINH KIỀU',
                    bold: true,
                    size: FONT_SIZES.HEADER_ORG,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              // Dấu hoa thị * * * ngăn cách
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40 },
                children: [
                  new TextRun({
                    text: '* * *',
                    size: 20,
                    bold: true,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
          // Bên phải: ĐẢNG CỘNG SẢN VIỆT NAM
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colRightWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: 'ĐẢNG CỘNG SẢN VIỆT NAM',
                    bold: true,
                    size: FONT_SIZES.HEADER_MOTTO,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              // Đường kẻ ngang dưới tiêu ngữ Đảng
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40 },
                children: [
                  new TextRun({
                    text: '────────────────',
                    size: FONT_SIZES.LINE_DECOR,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Hàng 2: Số ký hiệu (trái) và Địa danh, ngày tháng (phải) ngang hàng nhau
      new TableRow({
        children: [
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colLeftWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 20 },
                children: [
                  new TextRun({
                    text: docNumber.startsWith('Số') ? docNumber : `Số ${docNumber}`,
                    size: FONT_SIZES.HEADER_NUMBER,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colRightWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 20 },
                children: [
                  new TextRun({
                    text: dateStr,
                    italics: true,
                    size: FONT_SIZES.HEADER_DATE,
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
}

/**
 * Tạo Header Table chuẩn hành chính Nhà nước theo Nghị định 30/2020/NĐ-CP
 */
export function createAdminDocHeaderTable(
  superiorOrg: string,
  issuingOrg: string,
  docNumber: string,
  dateStr: string
): Table {
  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [DOCX_PAGE_SETUP.colLeftWidth, DOCX_PAGE_SETUP.colRightWidth],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    borders: {
      top: TABLE_CELL_BORDER_NONE.top,
      bottom: TABLE_CELL_BORDER_NONE.bottom,
      left: TABLE_CELL_BORDER_NONE.left,
      right: TABLE_CELL_BORDER_NONE.right,
      insideHorizontal: TABLE_CELL_BORDER_NONE.top,
      insideVertical: TABLE_CELL_BORDER_NONE.left,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colLeftWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: superiorOrg.toUpperCase(),
                    size: FONT_SIZES.HEADER_TOP,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: issuingOrg.toUpperCase(),
                    bold: true,
                    size: FONT_SIZES.HEADER_ORG,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40 },
                children: [
                  new TextRun({
                    text: '───────',
                    size: FONT_SIZES.LINE_DECOR,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colRightWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                    bold: true,
                    size: FONT_SIZES.HEADER_NATION,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 20 },
                children: [
                  new TextRun({
                    text: 'Độc lập - Tự do - Hạnh phúc',
                    bold: true,
                    size: FONT_SIZES.HEADER_MOTTO,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40 },
                children: [
                  new TextRun({
                    text: '────────────────',
                    size: FONT_SIZES.LINE_DECOR,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colLeftWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 20 },
                children: [
                  new TextRun({
                    text: docNumber.startsWith('Số') ? docNumber : `Số: ${docNumber}`,
                    size: FONT_SIZES.HEADER_NUMBER,
                    font: 'Times New Roman',
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colRightWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 20 },
                children: [
                  new TextRun({
                    text: dateStr,
                    italics: true,
                    size: FONT_SIZES.HEADER_DATE,
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
}

/**
 * Tạo khối Nơi nhận & Chữ ký chuẩn Nghị định 30 và Văn bản Đảng
 */
export function createSignatureBlockTable(
  signerRole: string,
  signerName: string,
  recipients: string[],
  options?: {
    headerRole?: string; // Ví dụ: "T/M. ĐẢNG ỦY" hoặc "T/M. BAN CHẤP HÀNH" hoặc "KT. HIỆU TRƯỞNG"
  }
): Table {
  const colLeft = 4100;
  const colRight = 5255;

  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [colLeft, colRight],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    borders: {
      top: TABLE_CELL_BORDER_NONE.top,
      bottom: TABLE_CELL_BORDER_NONE.bottom,
      left: TABLE_CELL_BORDER_NONE.left,
      right: TABLE_CELL_BORDER_NONE.right,
      insideHorizontal: TABLE_CELL_BORDER_NONE.top,
      insideVertical: TABLE_CELL_BORDER_NONE.left,
    },
    rows: [
      new TableRow({
        children: [
          // Cột trái: Nơi nhận (12pt nghiêng đậm, các mục 11pt đứng thường)
          new TableCell({
            width: { size: colLeft, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                spacing: { before: 120, after: 40 },
                children: [
                  new TextRun({
                    text: 'Nơi nhận:',
                    bold: true,
                    italics: true,
                    size: FONT_SIZES.RECIPIENTS_TITLE,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              ...recipients.map((r) => {
                const text = r.trim().startsWith('-') ? r.trim() : `- ${r.trim()}`;
                return new Paragraph({
                  spacing: { line: 220, after: 20 },
                  children: [
                    new TextRun({
                      text,
                      size: FONT_SIZES.RECIPIENTS_ITEM,
                      font: 'Times New Roman',
                    }),
                  ],
                });
              }),
            ],
          }),
          // Cột phải: Chức vụ, chữ ký, họ tên người ký
          new TableCell({
            width: { size: colRight, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              ...(options?.headerRole
                ? [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 120, after: 20 },
                      children: [
                        new TextRun({
                          text: options.headerRole.toUpperCase(),
                          bold: true,
                          size: FONT_SIZES.SIGNER_ROLE,
                          font: 'Times New Roman',
                        }),
                      ],
                    }),
                  ]
                : []),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: options?.headerRole ? 0 : 120, after: 40 },
                children: [
                  new TextRun({
                    text: signerRole.toUpperCase(),
                    bold: true,
                    size: FONT_SIZES.SIGNER_ROLE,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              // Khoảng trống ký tên chuẩn mực (4 dòng trống)
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 260 } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 260 } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 260 } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 260 } }),
              // Họ và tên người ký
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: signerName,
                    bold: true,
                    size: FONT_SIZES.SIGNER_NAME,
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
}

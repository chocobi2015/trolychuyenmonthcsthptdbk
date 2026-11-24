/**
 * BỘ QUY CHUẨN THỂ THỨC VĂN BẢN XUẤT DOCX
 * Tuân thủ nghiêm ngặt:
 * 1. Nghị định số 30/2020/NĐ-CP của Chính phủ về công tác văn thư.
 * 2. Hướng dẫn số 36-HD/VPTW và Quy định của Ban Bí thư về thể thức văn bản Đảng.
 * 3. Bộ mã ký tự Unicode Times New Roman, khổ giấy A4, định lề đóng gáy chuẩn quốc gia.
 * 4. Thống nhất tuyệt đối:
 *    - Căn cứ ban hành văn bản trình bày chữ đứng thường (không in nghiêng).
 *    - Thụt lề đầu dòng đúng 1.0cm (567 dxa) cho dòng đầu tiên; từ dòng thứ 2 căn đều sát 2 bên lề giấy (left = 0).
 *    - Giãn dòng đồng bộ 1.15 (line: 276, LineRuleType.AUTO), khoảng cách đoạn khoa học.
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
  LineRuleType,
  VerticalAlign,
} from 'docx';

// =============================================================================
// 1. THÔNG SỐ TRANG IN KHỔ A4 CHUẨN (1 inch = 1440 dxa; 1 cm = 567 dxa)
// =============================================================================
export const DOCX_PAGE_SETUP = {
  // A4: 210mm x 297mm (11906 dxa x 16838 dxa)
  size: {
    width: 11906,
    height: 16838,
  },
  // Lề trang chuẩn Nghị định 30: Trái 30mm (1701), Phải 15mm (850), Trên 20mm (1134), Dưới 20mm (1134)
  margin: {
    top: 1134,    // 20 mm
    bottom: 1134, // 20 mm
    left: 1701,   // 30 mm (Chuẩn đóng gáy lưu trữ)
    right: 850,   // 15 mm
  },
  // Chiều rộng vùng soạn thảo = 11906 - 1701 - 850 = 9355 dxa (16.5 cm)
  contentWidth: 9355,
  colLeftWidth: 3855,  // Cột trái Header (~6.8 cm) — gọn gàng, không chạm cột phải
  colRightWidth: 5500, // Cột phải Header (~9.7 cm) — đảm bảo Quốc hiệu 1 dòng duy nhất
};

// Cỡ chữ chuẩn (Docx tính theo half-points: 1pt = 2 half-points)
export const FONT_SIZES = {
  TITLE_TYPE: 30,       // 15pt: Tên loại văn bản (KẾ HOẠCH, QUY CHẾ, QUYẾT ĐỊNH...)
  TITLE_SUBJECT: 28,    // 14pt: Trích yếu nội dung
  CHAPTER_HEADING: 28,  // 14pt: Chương I, Phần A...
  ARTICLE_HEADING: 28,  // 14pt: Điều 1, Mục I, 1...
  BODY: 28,             // 14pt: Toàn bộ nội dung văn bản (chuẩn NĐ 30: 13-14pt, thống nhất 14pt)
  BODY_SMALL: 26,       // 13pt: Phụ chú / Trích dẫn phụ
  LEGAL_BASIS: 28,      // 14pt: Căn cứ pháp lý (chữ đứng thường, không in nghiêng)
  HEADER_TOP: 24,       // 12pt: Tên cơ quan chủ quản cấp trên (chữ hoa đứng thường)
  HEADER_ORG: 24,       // 12pt: Tên cơ quan ban hành (chữ hoa đứng đậm)
  HEADER_NUMBER: 26,    // 13pt: Số, ký hiệu văn bản (chuẩn NĐ 30: 13pt đứng thường)
  HEADER_NATION: 24,    // 12pt: CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM (đậm, không xuống hàng)
  HEADER_MOTTO: 26,     // 13pt: Độc lập - Tự do - Hạnh phúc (đậm)
  HEADER_DATE: 26,      // 13pt: Địa danh và ngày tháng năm (nghiêng)
  SIGNER_ROLE: 28,      // 14pt: HIỆU TRƯỞNG / BÍ THƯ
  SIGNER_NAME: 28,      // 14pt: Họ và tên người ký (in đậm)
  RECIPIENTS_TITLE: 24, // 12pt: Nơi nhận: (nghiêng, đậm)
  RECIPIENTS_ITEM: 22,  // 11pt: Danh sách nơi nhận (đứng thường)
  TABLE_HEADER: 24,     // 12pt: Tiêu đề cột bảng
  TABLE_CELL: 24,       // 12pt: Nội dung ô trong bảng tiêu chuẩn
  TABLE_COMPACT: 22,    // 11pt: Bảng phụ lục nhiều cột (6 cột) đảm bảo dễ đọc
  LINE_DECOR: 14,       // 7pt: Đường kẻ trang trí thanh mảnh
};

// Thụt đầu dòng chuẩn Nghị định 30: 1.0cm = 567 dxa (CHỈ thụt dòng đầu tiên, left = 0)
export const INDENT_FIRST_LINE = 567;

// Giãn dòng & giãn đoạn chuẩn đồng bộ (1.15 dòng = 276 twips với AUTO)
export const PARAGRAPH_SPACING = {
  line: 276,
  lineRule: LineRuleType.AUTO,
  before: 40,
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

export const TABLE_BORDER_NONE = {
  top: TABLE_CELL_BORDER_NONE.top,
  bottom: TABLE_CELL_BORDER_NONE.bottom,
  left: TABLE_CELL_BORDER_NONE.left,
  right: TABLE_CELL_BORDER_NONE.right,
  insideHorizontal: TABLE_CELL_BORDER_NONE.top,
  insideVertical: TABLE_CELL_BORDER_NONE.left,
};

export const TABLE_CELL_MARGINS_DATA = {
  top: 80,
  bottom: 80,
  left: 100,
  right: 100,
};

// =============================================================================
// HÀM PHỤ TRỢ: NGẮT DÒNG TÊN CƠ QUAN CHUẨN MỰC (KHÔNG BAO GIỜ NGẮT GIỮA TÊN RIÊNG)
// =============================================================================
function splitAgencyLines(raw: string, kind: 'superior' | 'issuing'): string[] {
  const cleaned = raw.trim().toUpperCase();
  const collapsed = cleaned.replace(/\s+/g, ' ');
  if (kind === 'superior') {
    if (
      collapsed === 'SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP' ||
      collapsed === 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP' ||
      collapsed === 'SỞ GIÁO DỤC ĐÀO TẠO TỈNH ĐỒNG THÁP' ||
      collapsed === 'SỞ GIÁO DỤC ĐÀO TẠO ĐỒNG THÁP' ||
      collapsed === 'SỞ GDĐT TỈNH ĐỒNG THÁP' ||
      collapsed === 'SỞ GDĐT ĐỒNG THÁP'
    ) {
      return ['SỞ GDĐT TỈNH ĐỒNG THÁP'];
    }
  }
  if (cleaned.includes('\n')) {
    return cleaned.split('\n').map((s) => s.trim()).filter(Boolean);
  }
  if (kind === 'issuing') {
    if (cleaned.includes('TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU')) {
      return ['TRƯỜNG THCS VÀ THPT', 'ĐỐC BINH KIỀU'];
    }
    if (cleaned.includes('ĐẢNG ỦY TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU')) {
      return ['ĐẢNG ỦY TRƯỜNG THCS VÀ THPT', 'ĐỐC BINH KIỀU'];
    }
  }
  return [cleaned];
}

// =============================================================================
// 2. CÁC HÀM TẠO THÀNH PHẦN VĂN BẢN CHUẨN XÁC
// =============================================================================

/**
 * Tạo đoạn văn nội dung thông thường:
 * - Cỡ chữ 14pt Times New Roman
 * - Căn đều 2 bên (JUSTIFIED)
 * - CHỈ thụt dòng đầu tiên 1.0cm (567 dxa), từ dòng thứ 2 sát đều lề trái (left = 0)
 * - Giãn dòng đồng bộ 1.15
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
    keepNext?: boolean;
  }
): Paragraph {
  const shouldIndent = options?.indentFirstLine ?? true;
  const runs: TextRun[] = [];

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
    indent: shouldIndent ? { firstLine: INDENT_FIRST_LINE, left: 0 } : { left: 0 },
    keepNext: options?.keepNext,
    spacing: {
      line: PARAGRAPH_SPACING.line,
      lineRule: PARAGRAPH_SPACING.lineRule,
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
      keepNext: true,
      spacing: {
        line: PARAGRAPH_SPACING.line,
        lineRule: PARAGRAPH_SPACING.lineRule,
        before: 220,
        after: subtitle ? 40 : 100,
      },
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
        keepNext: true,
        spacing: {
          line: PARAGRAPH_SPACING.line,
          lineRule: PARAGRAPH_SPACING.lineRule,
          before: 0,
          after: 100,
        },
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
 * Tạo dòng đề mục Điều / Mục (In đậm đứng, thụt dòng đầu 1.0cm, left = 0, cỡ 14pt)
 */
export function createArticleHeading(
  headingText: string,
  options?: { spacingBefore?: number; spacingAfter?: number }
): Paragraph {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
    keepNext: true,
    spacing: {
      line: PARAGRAPH_SPACING.line,
      lineRule: PARAGRAPH_SPACING.lineRule,
      before: options?.spacingBefore ?? 160,
      after: options?.spacingAfter ?? 60,
    },
    children: [
      new TextRun({
        text: headingText,
        bold: true,
        italics: false,
        font: 'Times New Roman',
        size: FONT_SIZES.ARTICLE_HEADING,
      }),
    ],
  });
}

/**
 * Tạo dòng mục nhỏ gạch đầu dòng (-, +) hoặc Khoản (1, 2...) / Điểm (a, b...)
 * LUÔN CHỈ thụt dòng đầu 1.0cm, dòng 2 trở đi thẳng hàng sát lề trái (left = 0)
 */
export function createSubItem(
  prefix: string,
  content: string,
  options?: { boldPrefix?: boolean }
): Paragraph {
  const runs: TextRun[] = [
    new TextRun({
      text: prefix + ' ',
      bold: options?.boldPrefix ?? true,
      font: 'Times New Roman',
      size: FONT_SIZES.BODY,
    }),
  ];

  if (content.includes('**')) {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    for (const part of parts) {
      if (!part) continue;
      if (part.startsWith('**') && part.endsWith('**')) {
        runs.push(
          new TextRun({
            text: part.slice(2, -2),
            bold: true,
            font: 'Times New Roman',
            size: FONT_SIZES.BODY,
          })
        );
      } else {
        runs.push(
          new TextRun({
            text: part,
            font: 'Times New Roman',
            size: FONT_SIZES.BODY,
          })
        );
      }
    }
  } else {
    runs.push(
      new TextRun({
        text: content,
        font: 'Times New Roman',
        size: FONT_SIZES.BODY,
      })
    );
  }

  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
    spacing: {
      line: PARAGRAPH_SPACING.line,
      lineRule: PARAGRAPH_SPACING.lineRule,
      before: 40,
      after: 50,
    },
    children: runs,
  });
}

/**
 * Tạo căn cứ pháp lý chuẩn văn thư nhà trường:
 * - CHỮ ĐỨNG THƯỜNG (không in nghiêng) theo chuẩn thể thức quy định
 * - Thụt dòng đầu 1.0cm (567 dxa), left = 0, căn đều 2 bên
 * - Cuối mỗi căn cứ có dấu ; (căn cứ cuối cùng kết thúc bằng dấu . hoặc , theo ngữ cảnh)
 */
export function createLegalBasisParagraph(text: string, isLast = false, endWithComma = false): Paragraph {
  let cleaned = text.trim();
  if (
    !cleaned.startsWith('Căn cứ') &&
    !cleaned.startsWith('Theo đề nghị') &&
    !cleaned.startsWith('Xét đề nghị')
  ) {
    cleaned = `Căn cứ ${cleaned}`;
  }
  cleaned = cleaned.replace(/[;.,]$/, '');
  const ending = isLast ? (endWithComma ? ',' : '.') : ';';

  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
    spacing: {
      line: PARAGRAPH_SPACING.line,
      lineRule: PARAGRAPH_SPACING.lineRule,
      before: 40,
      after: 50,
    },
    children: [
      new TextRun({
        text: cleaned + ending,
        italics: false, // Bắt buộc chữ đứng thường, không in nghiêng
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
      keepNext: true,
      spacing: { before: 220, after: 40 },
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
    const subjectLines = subjectTitle.split('\n').map((s) => s.trim()).filter(Boolean);
    subjectLines.forEach((line, idx) => {
      result.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          keepNext: true,
          spacing: {
            line: PARAGRAPH_SPACING.line,
            lineRule: PARAGRAPH_SPACING.lineRule,
            before: 0,
            after: idx === subjectLines.length - 1 ? 20 : 20,
          },
          children: [
            new TextRun({
              text: line,
              bold: true,
              font: 'Times New Roman',
              size: FONT_SIZES.TITLE_SUBJECT,
            }),
          ],
        })
      );
    });
    result.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 160 },
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
        spacing: { before: 0, after: 160 },
        children: [
          new TextRun({
            text: '───────',
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
  const leftMargins = { top: 0, bottom: 0, left: 20, right: 120 };
  const rightMargins = { top: 0, bottom: 0, left: 100, right: 20 };

  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [DOCX_PAGE_SETUP.colLeftWidth, DOCX_PAGE_SETUP.colRightWidth],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    borders: TABLE_BORDER_NONE,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colLeftWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            margins: leftMargins,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 20, line: 240, lineRule: LineRuleType.AUTO },
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
                spacing: { before: 0, after: 10, line: 240, lineRule: LineRuleType.AUTO },
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
                spacing: { before: 0, after: 10, line: 240, lineRule: LineRuleType.AUTO },
                children: [
                  new TextRun({
                    text: 'ĐỐC BINH KIỀU',
                    bold: true,
                    size: FONT_SIZES.HEADER_ORG,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 30, line: 200, lineRule: LineRuleType.AUTO },
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
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colRightWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            margins: rightMargins,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 20, line: 240, lineRule: LineRuleType.AUTO },
                children: [
                  new TextRun({
                    text: 'ĐẢNG CỘNG SẢN VIỆT NAM',
                    bold: true,
                    size: FONT_SIZES.HEADER_MOTTO,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 30, line: 200, lineRule: LineRuleType.AUTO },
                children: [
                  new TextRun({
                    text: '──────────────────',
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
            margins: leftMargins,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 20, line: 240, lineRule: LineRuleType.AUTO },
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
            margins: rightMargins,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 20, line: 240, lineRule: LineRuleType.AUTO },
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
 * Tạo Header Table chuẩn hành chính Nhà nước theo Nghị định 30/2020/NĐ-CP:
 * - Cột trái (3855 dxa) và Cột phải (5500 dxa) có khoảng đệm rõ ràng, KHÔNG BAO GIỜ chạm chữ.
 * - Ngắt dòng chuẩn tên cơ quan (SỞ GDĐT TỈNH ĐỒNG THÁP gọn 1 dòng; TRƯỜNG THCS VÀ THPT / ĐỐC BINH KIỀU).
 * - Quốc hiệu "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" luôn gọn trên 1 hàng duy nhất.
 * - Hàng 2 căn thẳng hàng tuyệt đối giữa Số ký hiệu (trái) và Địa danh, ngày tháng năm (phải).
 */
export function createAdminDocHeaderTable(
  superiorOrg: string,
  issuingOrg: string,
  docNumber: string,
  dateStr: string
): Table {
  const superiorLines = splitAgencyLines(superiorOrg, 'superior');
  const issuingLines = splitAgencyLines(issuingOrg, 'issuing');
  const leftMargins = { top: 0, bottom: 0, left: 20, right: 120 };
  const rightMargins = { top: 0, bottom: 0, left: 100, right: 20 };

  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [DOCX_PAGE_SETUP.colLeftWidth, DOCX_PAGE_SETUP.colRightWidth],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    borders: TABLE_BORDER_NONE,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: DOCX_PAGE_SETUP.colLeftWidth, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            margins: leftMargins,
            verticalAlign: VerticalAlign.TOP,
            children: [
              ...superiorLines.map(
                (line, idx) =>
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: {
                      before: 0,
                      after: idx === superiorLines.length - 1 ? 20 : 0,
                      line: 240,
                      lineRule: LineRuleType.AUTO,
                    },
                    children: [
                      new TextRun({
                        text: line,
                        size: FONT_SIZES.HEADER_TOP,
                        font: 'Times New Roman',
                      }),
                    ],
                  })
              ),
              ...issuingLines.map(
                (line, idx) =>
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: {
                      before: 0,
                      after: idx === issuingLines.length - 1 ? 10 : 0,
                      line: 240,
                      lineRule: LineRuleType.AUTO,
                    },
                    children: [
                      new TextRun({
                        text: line,
                        bold: true,
                        size: FONT_SIZES.HEADER_ORG,
                        font: 'Times New Roman',
                      }),
                    ],
                  })
              ),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 30, line: 180, lineRule: LineRuleType.AUTO },
                children: [
                  new TextRun({
                    text: '────────',
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
            margins: rightMargins,
            verticalAlign: VerticalAlign.TOP,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 20, line: 240, lineRule: LineRuleType.AUTO },
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
                spacing: { before: 0, after: 10, line: 240, lineRule: LineRuleType.AUTO },
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
                spacing: { before: 0, after: 30, line: 180, lineRule: LineRuleType.AUTO },
                children: [
                  new TextRun({
                    text: '───────────────────',
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
            margins: leftMargins,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 30, after: 20, line: 240, lineRule: LineRuleType.AUTO },
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
            margins: rightMargins,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 30, after: 20, line: 240, lineRule: LineRuleType.AUTO },
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
    headerRole?: string; // Ví dụ: "TM. ĐẢNG ỦY", "KT. HIỆU TRƯỞNG"
  }
): Table {
  const colLeft = 4155;
  const colRight = 5200;

  return new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [colLeft, colRight],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    borders: TABLE_BORDER_NONE,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: colLeft, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            margins: { top: 0, bottom: 0, left: 0, right: 100 },
            children: [
              new Paragraph({
                spacing: { before: 120, after: 40, line: 240, lineRule: LineRuleType.AUTO },
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
                  spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 20 },
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
          new TableCell({
            width: { size: colRight, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            margins: { top: 0, bottom: 0, left: 100, right: 0 },
            children: [
              ...(options?.headerRole
                ? [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 120, after: 20, line: 240, lineRule: LineRuleType.AUTO },
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
                spacing: { before: options?.headerRole ? 0 : 120, after: 40, line: 240, lineRule: LineRuleType.AUTO },
                children: [
                  new TextRun({
                    text: signerRole.toUpperCase(),
                    bold: true,
                    size: FONT_SIZES.SIGNER_ROLE,
                    font: 'Times New Roman',
                  }),
                ],
              }),
              // Khoảng trống ký tên & đóng dấu (4 dòng trống)
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 276, lineRule: LineRuleType.AUTO } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 276, lineRule: LineRuleType.AUTO } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 276, lineRule: LineRuleType.AUTO } }),
              new Paragraph({ children: [new TextRun({ text: '' })], spacing: { line: 276, lineRule: LineRuleType.AUTO } }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40, line: 240, lineRule: LineRuleType.AUTO },
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

import * as fs from 'fs';
import * as path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TableLayoutType,
  LineRuleType,
} from 'docx';
import {
  DOCX_PAGE_SETUP,
  FONT_SIZES,
  INDENT_FIRST_LINE,
  PARAGRAPH_SPACING,
  TABLE_CELL_BORDER_GRID,
  TABLE_CELL_MARGINS_DATA,
  createAdminDocHeaderTable,
  createDocumentTitleBlock,
  createLegalBasisParagraph,
  createBodyParagraph,
  createArticleHeading,
  createSignatureBlockTable,
} from '../src/utils/docxStandards';

interface SchoolDocSection {
  heading: string;
  content: string;
}

interface PersistedDoc {
  id: string;
  documentNumber?: string;
  title?: string;
  subTitle?: string;
  signDate?: string;
  issuingAuthorityTop?: string;
  issuingAuthority?: string;
  signerRole?: string;
  signerName?: string;
  legalBases?: string[];
  sections?: SchoolDocSection[];
  recipients?: string[];
}

const FONT_NAME = 'Times New Roman';

function buildInlineRuns(text: string, sizeHalfPt = FONT_SIZES.BODY): TextRun[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  const isNumberedHeading = /^\d+(\.\d+)*\./.test(text.trim());
  const runs: TextRun[] = [];

  parts.forEach((part, idx) => {
    if (!part) return;
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      if (inner) {
        runs.push(
          new TextRun({
            text: inner,
            font: FONT_NAME,
            size: sizeHalfPt,
            bold: true,
          })
        );
      }
    } else {
      const colonIdx = part.indexOf(':');
      if (isNumberedHeading && idx === 0 && colonIdx !== -1 && colonIdx < 110) {
        const before = part.slice(0, colonIdx + 1);
        const after = part.slice(colonIdx + 1);
        runs.push(
          new TextRun({
            text: before,
            font: FONT_NAME,
            size: sizeHalfPt,
            bold: true,
          })
        );
        if (after) {
          runs.push(
            new TextRun({
              text: after,
              font: FONT_NAME,
              size: sizeHalfPt,
              bold: false,
            })
          );
        }
      } else {
        runs.push(
          new TextRun({
            text: part,
            font: FONT_NAME,
            size: sizeHalfPt,
            bold: isNumberedHeading && idx === 0 && text.trim().length < 110 && !part.includes('. '),
          })
        );
      }
    }
  });

  return runs;
}

function buildMarkdownTable(tLines: string[]): Table | null {
  const parsed: string[][] = [];
  for (const tl of tLines) {
    if (tl.includes('---')) continue;
    const cells = tl
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length > 0) parsed.push(cells);
  }
  if (parsed.length === 0) return null;

  const numCols = parsed[0].length;
  const colWidth = Math.floor(DOCX_PAGE_SETUP.contentWidth / numCols);
  const colWidths = Array.from({ length: numCols }, (_, i) =>
    i === numCols - 1
      ? DOCX_PAGE_SETUP.contentWidth - colWidth * (numCols - 1)
      : colWidth
  );

  return new Table({
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    layout: TableLayoutType.FIXED,
    rows: parsed.map((rowCells, rIdx) => {
      const isHeader = rIdx === 0;
      return new TableRow({
        tableHeader: isHeader,
        cantSplit: true,
        children: Array.from({ length: numCols }, (_, cIdx) => {
          const rawVal = rowCells[cIdx] || '—';
          const isBoldCell = isHeader || rawVal.includes('**');
          const cleanText = rawVal.replace(/\*\*/g, '').trim() || '—';
          const isCenter =
            isHeader ||
            cIdx === 0 ||
            cleanText.length <= 6 ||
            (/^\d/.test(cleanText) && cleanText.length < 15);

          return new TableCell({
            width: { size: colWidths[cIdx], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            shading: isHeader ? { fill: 'F2F2F2' } : undefined,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: isCenter ? AlignmentType.CENTER : AlignmentType.LEFT,
                indent: { left: 0, firstLine: 0 },
                spacing: {
                  before: 20,
                  after: 20,
                  line: PARAGRAPH_SPACING.line,
                  lineRule: LineRuleType.AUTO,
                },
                children: [
                  new TextRun({
                    text: cleanText,
                    font: FONT_NAME,
                    size: 22, // 11pt uniform table text
                    bold: isBoldCell,
                  }),
                ],
              }),
            ],
          });
        }),
      });
    }),
  });
}

async function generateMidtermPlanDocx() {
  const jsonPath = path.join(process.cwd(), 'src/data/persistedDocuments.json');
  const docs: PersistedDoc[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const docData = docs.find((d) => d.id === 'doc-kh-ktgk1-2026');
  if (!docData) {
    throw new Error('doc-kh-ktgk1-2026 not found in persistedDocuments.json');
  }

  const children: (Paragraph | Table)[] = [];

  // 1. Header chuẩn Nghị định 30/2020/NĐ-CP
  const signDate = (docData.signDate || 'Đốc Binh Kiều, ngày 16 tháng 10 năm 2026').replace(
    /Tháp Mười,\s*ngày/i,
    'Đốc Binh Kiều, ngày'
  );

  children.push(
    createAdminDocHeaderTable(
      'SỞ GIÁO DỤC VÀ ĐÀO TẠO\nTỈNH ĐỒNG THÁP',
      'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
      docData.documentNumber || 'Số: 45/KH-THCS&THPTĐBK',
      signDate
    )
  );

  // 2. Tên loại & Trích yếu
  children.push(
    ...createDocumentTitleBlock(
      docData.title || 'KẾ HOẠCH',
      docData.subTitle || 'Tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027'
    )
  );

  // 3. Căn cứ pháp lý (chữ đứng thường, thụt dòng đầu 1.0cm)
  const legalBases = docData.legalBases || [];
  legalBases.forEach((lb, idx) => {
    const isLast = idx === legalBases.length - 1;
    children.push(createLegalBasisParagraph(lb, isLast));
  });

  // 4. Câu dẫn
  children.push(
    createBodyParagraph(
      'Nay Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027 với các nội dung cụ thể như sau:',
      { spacingBefore: 80, spacingAfter: 100 }
    )
  );

  const renderSection = (sec: SchoolDocSection) => {
    const isAppendix = sec.heading.toUpperCase().startsWith('PHỤ LỤC');

    if (isAppendix) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          pageBreakBefore: true,
          keepNext: true,
          indent: { left: 0, firstLine: 0 },
          spacing: {
            before: 160,
            after: 100,
            line: PARAGRAPH_SPACING.line,
            lineRule: LineRuleType.AUTO,
          },
          children: [
            new TextRun({
              text: sec.heading.toUpperCase(),
              font: FONT_NAME,
              size: FONT_SIZES.BODY,
              bold: true,
            }),
          ],
        })
      );
    } else {
      children.push(createArticleHeading(sec.heading));
    }

    const lines = sec.content.split('\n');
    let tableLines: string[] = [];

    const flushTable = () => {
      if (tableLines.length === 0) return;
      const tbl = buildMarkdownTable(tableLines);
      if (tbl) {
        children.push(tbl);
        children.push(
          new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [],
          })
        );
      }
      tableLines = [];
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableLines.push(trimmed);
      } else {
        flushTable();
        if (trimmed) {
          children.push(
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              indent: { left: 0, firstLine: INDENT_FIRST_LINE },
              spacing: {
                before: 40,
                after: 60,
                line: PARAGRAPH_SPACING.line,
                lineRule: LineRuleType.AUTO,
              },
              children: buildInlineRuns(trimmed, FONT_SIZES.BODY),
            })
          );
        }
      }
    }
    flushTable();
  };

  const sections = docData.sections || [];
  const regularSections = sections.filter((s) => !s.heading.toUpperCase().startsWith('PHỤ LỤC'));
  const appendixSections = sections.filter((s) => s.heading.toUpperCase().startsWith('PHỤ LỤC'));

  regularSections.forEach(renderSection);

  // 5. Nơi nhận & Chữ ký
  const signerLines = (docData.signerRole || 'KT. HIỆU TRƯỞNG\nPHÓ HIỆU TRƯỞNG')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const headerRole = signerLines.length > 1 ? signerLines[0] : undefined;
  const mainRole = signerLines.length > 1 ? signerLines.slice(1).join(' ') : signerLines[0] || 'PHÓ HIỆU TRƯỞNG';

  children.push(
    createSignatureBlockTable(
      mainRole,
      docData.signerName || 'Nguyễn Minh Trí',
      docData.recipients || [
        '- Sở GDĐT Đồng Tháp (để báo cáo);',
        '- Ban Giám hiệu (để chỉ đạo, thực hiện);',
        '- Các Tổ CM, Tổ VP (để thực hiện);',
        '- 03 Điểm trường (để thực hiện);',
        '- Ban ĐD Cha mẹ học sinh (để phối hợp);',
        '- Đoàn trường, Đội TNTP (để phối hợp);',
        '- Website trường (để công khai);',
        '- Lưu: VT, CM.',
      ],
      headerRole ? { headerRole } : undefined
    )
  );

  // 6. Phụ lục đính kèm
  appendixSections.forEach(renderSection);

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: FONT_NAME,
            size: FONT_SIZES.BODY,
            color: '000000',
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            size: DOCX_PAGE_SETUP.size,
            margin: DOCX_PAGE_SETUP.margin,
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const targets = [
    path.join(process.cwd(), 'public/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx'),
    path.join(process.cwd(), 'dist/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx'),
    path.join(process.cwd(), 'KIEM TRA DANH GIA/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx'),
  ];

  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buffer);
    console.log(`[SUCCESS] Built Midterm Exam Plan DOCX -> ${target} (${buffer.length} bytes)`);
  }
}

generateMidtermPlanDocx().catch((err) => {
  console.error('Failed to generate Midterm Exam Plan DOCX:', err);
  process.exit(1);
});

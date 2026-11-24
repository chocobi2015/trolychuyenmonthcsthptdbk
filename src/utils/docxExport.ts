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
  LineRuleType,
} from 'docx';
import { SchoolDocument } from '../types/document';
import { DepartmentMeeting } from '../types/meeting';
import {
  DOCX_PAGE_SETUP,
  FONT_SIZES,
  INDENT_FIRST_LINE,
  PARAGRAPH_SPACING,
  TABLE_BORDER_NONE,
  TABLE_CELL_BORDER_GRID,
  TABLE_CELL_BORDER_NONE,
  TABLE_CELL_MARGINS_DATA,
  createAdminDocHeaderTable,
  createDocumentTitleBlock,
  createLegalBasisParagraph,
  createSignatureBlockTable,
} from './docxStandards';

export function createSchoolDocumentDocx(doc: SchoolDocument): Document {
  const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: '000000' };

  const headerTable = createAdminDocHeaderTable(
    doc.issuingAuthorityTop || 'SỞ GDĐT TỈNH ĐỒNG THÁP',
    doc.issuingAuthority || 'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
    doc.documentNumber || 'Số:    /KH-THCS&THPTĐBK',
    doc.signDate || 'Đốc Binh Kiều, ngày 09 tháng 10 năm 2026'
  );

  const docChildren: (Paragraph | Table)[] = [
    headerTable,
    ...createDocumentTitleBlock(doc.title, doc.subTitle),
  ];

  // Căn cứ pháp lý: chữ đứng thường (không in nghiêng), thụt đầu dòng 1.0cm, left = 0
  if (doc.legalBases && doc.legalBases.length > 0) {
    doc.legalBases.forEach((base, idx) => {
      const isLast = idx === doc.legalBases.length - 1;
      docChildren.push(createLegalBasisParagraph(base, isLast));
    });
  }

  // Câu chuyển tiếp cho Kế hoạch
  if (doc.type === 'plan') {
    const planLabel = doc.subTitle
      ? doc.subTitle.toLowerCase().startsWith('kế hoạch')
        ? doc.subTitle
        : `Kế hoạch ${doc.subTitle.charAt(0).toLowerCase() + doc.subTitle.slice(1)}`
      : doc.title.toLowerCase().startsWith('kế hoạch')
        ? doc.title
        : `Kế hoạch ${doc.title.toLowerCase()}`;

    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
        spacing: {
          line: PARAGRAPH_SPACING.line,
          lineRule: PARAGRAPH_SPACING.lineRule,
          before: 60,
          after: 100,
        },
        children: [
          new TextRun({
            text: `Nay Trường THCS và THPT Đốc Binh Kiều xây dựng ${planLabel} như sau:`,
            size: FONT_SIZES.BODY,
            font: 'Times New Roman',
          }),
        ],
      })
    );
  }

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
              size: FONT_SIZES.BODY,
              font: 'Times New Roman',
            })
          );
        }
      } else {
        runs.push(
          new TextRun({
            text: part,
            bold: defaultBold ?? false,
            size: FONT_SIZES.BODY,
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
            bold: defaultBold ?? false,
            size: FONT_SIZES.BODY,
            font: 'Times New Roman',
          }),
        ];
  };

  const renderSection = (sec: { heading: string; content: string }) => {
    const isAppendix = sec.heading.toUpperCase().startsWith('PHỤ LỤC');
    if (isAppendix) {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          keepNext: true,
          spacing: {
            line: PARAGRAPH_SPACING.line,
            lineRule: PARAGRAPH_SPACING.lineRule,
            before: 240,
            after: 120,
          },
          children: [
            new TextRun({
              text: sec.heading.toUpperCase(),
              bold: true,
              size: FONT_SIZES.CHAPTER_HEADING,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
          keepNext: true,
          spacing: {
            line: PARAGRAPH_SPACING.line,
            lineRule: PARAGRAPH_SPACING.lineRule,
            before: 160,
            after: 60,
          },
          children: [
            new TextRun({
              text: sec.heading,
              bold: true,
              size: FONT_SIZES.ARTICLE_HEADING,
              font: 'Times New Roman',
            }),
          ],
        })
      );
    }

    const lines = sec.content.split('\n');
    const blocks: Array<{ type: 'paragraph'; text: string } | { type: 'table'; rows: string[][] }> = [];
    let tableLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
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
        const numCols = Math.max(1, block.rows[0]?.length || 1);
        const colWidth = Math.floor(DOCX_PAGE_SETUP.contentWidth / numCols);
        const columnWidths = Array.from({ length: numCols }, (_, i) =>
          i === numCols - 1
            ? DOCX_PAGE_SETUP.contentWidth - colWidth * (numCols - 1)
            : colWidth
        );
        const cellFontSize = numCols >= 6 ? FONT_SIZES.TABLE_COMPACT : FONT_SIZES.TABLE_CELL;

        const contentTable = new Table({
          layout: TableLayoutType.FIXED,
          columnWidths,
          width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
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
              tableHeader: isHeader,
              children: rowCells.slice(0, numCols).map((cellText, cIdx) => {
                const cleanText = cellText.replace(/\*\*/g, '');
                const isCenter =
                  isHeader ||
                  cIdx === 0 ||
                  cleanText.length <= 6 ||
                  (/^\d/.test(cleanText) && cleanText.length < 15);
                return new TableCell({
                  width: { size: columnWidths[cIdx], type: WidthType.DXA },
                  borders: TABLE_CELL_BORDER_GRID,
                  margins: TABLE_CELL_MARGINS_DATA,
                  children: [
                    new Paragraph({
                      alignment: isCenter ? AlignmentType.CENTER : AlignmentType.LEFT,
                      spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
                      children: [
                        new TextRun({
                          text: cleanText || ' ',
                          bold: isHeader || cellText.includes('**'),
                          size: cellFontSize,
                          font: 'Times New Roman',
                        }),
                      ],
                    }),
                  ],
                });
              }),
            });
          }),
        });

        docChildren.push(new Paragraph({ spacing: { before: 60, after: 0 } }));
        docChildren.push(contentTable);
        docChildren.push(new Paragraph({ spacing: { before: 0, after: 80 } }));
        return;
      }

      const trimmed = block.text;
      const isNumberedHeading = /^\d+(\.\d+)*\.\s+[^:]+:?$/.test(trimmed) && trimmed.length < 120;
      const runs = formatParagraphRuns(trimmed, isNumberedHeading ? true : undefined);

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
          keepNext: isNumberedHeading,
          spacing: {
            line: PARAGRAPH_SPACING.line,
            lineRule: PARAGRAPH_SPACING.lineRule,
            before: isNumberedHeading ? 100 : 40,
            after: 50,
          },
          children: runs,
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

  if (regularSections.length > 0) {
    regularSections.forEach(renderSection);
  } else {
    appendixSections.forEach(renderSection);
  }

  const signerLines = (doc.signerRole || 'KT. HIỆU TRƯỞNG\nPHÓ HIỆU TRƯỞNG')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const headerRole = signerLines.length > 1 ? signerLines[0] : undefined;
  const mainRole = signerLines.length > 1 ? signerLines.slice(1).join(' ') : signerLines[0] || 'HIỆU TRƯỞNG';

  const recipients =
    doc.recipients && doc.recipients.length > 0
      ? doc.recipients.map((r) => {
          const text = r.startsWith('-') ? r : `- ${r}`;
          return text.includes('Lưu:') ? '- Lưu: VT, CM.' : text;
        })
      : [
          '- Sở GDĐT Đồng Tháp (để báo cáo);',
          '- Hiệu trưởng (để chỉ đạo);',
          '- Các Phó Hiệu trưởng (để phối hợp);',
          '- Các tổ chuyên môn, tổ văn phòng (để thực hiện);',
          '- Ban ĐD Cha mẹ học sinh (để phối hợp);',
          '- Đoàn trường, Đội TNTP (để phối hợp);',
          '- Lưu: VT, CM.',
        ];

  const footerTable = createSignatureBlockTable(
    mainRole,
    doc.signerName || 'Nguyễn Minh Trí',
    recipients,
    { headerRole }
  );

  docChildren.push(new Paragraph({ spacing: { before: 120, after: 60 } }), footerTable);

  if (regularSections.length > 0 && appendixSections.length > 0) {
    appendixSections.forEach(renderSection);
  }

  return new Document({
    styles: {
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
    },
    sections: [
      {
        properties: {
          page: {
            size: DOCX_PAGE_SETUP.size,
            margin: DOCX_PAGE_SETUP.margin,
          },
        },
        children: docChildren,
      },
    ],
  });
}

export async function exportDocumentToDocx(doc: SchoolDocument): Promise<void> {
  const docxFile = createSchoolDocumentDocx(doc);
  const blob = await Packer.toBlob(docxFile);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  const safeFilename = `${doc.type.toUpperCase()}_${(doc.subTitle || doc.title)
    .replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g, '_')
    .substring(0, 40)}.docx`;
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

  const headerTable = createAdminDocHeaderTable(
    'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
    meeting.departmentName.toUpperCase(),
    meeting.meetingNumber || 'Số: .../BB',
    meeting.meetingDate || 'Đốc Binh Kiều, năm 2026'
  );

  const children: (Paragraph | Table)[] = [
    headerTable,
    ...createDocumentTitleBlock(
      'BIÊN BẢN HỌP TỔ CHUYÊN MÔN',
      `${meeting.week} - ${meeting.semester} - Năm học ${meeting.schoolYear}`
    ),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
      spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 60, after: 40 },
      children: [
        new TextRun({ text: '1. Thời gian: ', font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
        new TextRun({ text: meeting.meetingDate, font: 'Times New Roman', size: FONT_SIZES.BODY }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
      spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 40, after: 40 },
      children: [
        new TextRun({ text: '2. Địa điểm: ', font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
        new TextRun({ text: meeting.location, font: 'Times New Roman', size: FONT_SIZES.BODY }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
      spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 40, after: 40 },
      children: [
        new TextRun({ text: '3. Thành phần tham dự: ', font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
        new TextRun({
          text: `Có mặt: ${meeting.attendees.present}/${meeting.attendees.total} thành viên; Vắng: ${meeting.attendees.absent || '0'}.`,
          font: 'Times New Roman',
          size: FONT_SIZES.BODY,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
      spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 40, after: 40 },
      children: [
        new TextRun({ text: '4. Chủ trì: ', font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
        new TextRun({ text: meeting.leader, font: 'Times New Roman', size: FONT_SIZES.BODY }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
      spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 40, after: 80 },
      children: [
        new TextRun({ text: '5. Thư ký: ', font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
        new TextRun({ text: meeting.secretary, font: 'Times New Roman', size: FONT_SIZES.BODY }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
      spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 80, after: 80 },
      children: [
        new TextRun({ text: 'CHỦ ĐỀ SINH HOẠT CHUYÊN MÔN: ', font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
        new TextRun({ text: meeting.topic, font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
      keepNext: true,
      spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 140, after: 60 },
      children: [
        new TextRun({ text: 'NỘI DUNG VÀ DIỄN BIẾN CUỘC HỌP:', font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
      ],
    }),
  ];

  const contentLines = meeting.content.split('\n');
  contentLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const isHeading = /^[IVX]+\.|\d+\.\s+[A-ZÀ-Ỹ]/.test(trimmed);
    children.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
        keepNext: isHeading,
        spacing: {
          line: PARAGRAPH_SPACING.line,
          lineRule: PARAGRAPH_SPACING.lineRule,
          before: isHeading ? 120 : 40,
          after: 50,
        },
        children: [
          new TextRun({
            text: trimmed,
            font: 'Times New Roman',
            size: FONT_SIZES.BODY,
            bold: isHeading,
          }),
        ],
      })
    );
  });

  if (meeting.resolutions && meeting.resolutions.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
        keepNext: true,
        spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 160, after: 60 },
        children: [
          new TextRun({
            text: 'KẾT LUẬN VÀ NGHỊ QUYẾT CỦA TỔ TRƯỞNG:',
            font: 'Times New Roman',
            size: FONT_SIZES.BODY,
            bold: true,
          }),
        ],
      })
    );
    meeting.resolutions.forEach((res, idx) => {
      children.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
          spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 40, after: 50 },
          children: [
            new TextRun({ text: `${idx + 1}. `, font: 'Times New Roman', size: FONT_SIZES.BODY, bold: true }),
            new TextRun({ text: res, font: 'Times New Roman', size: FONT_SIZES.BODY }),
          ],
        })
      );
    });
  }

  if (meeting.tasks && meeting.tasks.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        indent: { firstLine: INDENT_FIRST_LINE, left: 0 },
        keepNext: true,
        spacing: { line: PARAGRAPH_SPACING.line, lineRule: PARAGRAPH_SPACING.lineRule, before: 160, after: 80 },
        children: [
          new TextRun({
            text: 'PHÂN CÔNG NHIỆM VỤ CỤ THỂ 2 TUẦN TIẾP THEO:',
            font: 'Times New Roman',
            size: FONT_SIZES.BODY,
            bold: true,
          }),
        ],
      })
    );

    const taskCols = [755, 4300, 2300, 2000]; // Tổng = 9355 dxa
    const taskRows = [
      new TableRow({
        tableHeader: true,
        children: ['STT', 'Nội dung nhiệm vụ', 'Người phụ trách', 'Thời hạn'].map((heading, idx) =>
          new TableCell({
            width: { size: taskCols[idx], type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_GRID,
            margins: TABLE_CELL_MARGINS_DATA,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { line: 240, lineRule: LineRuleType.AUTO, before: 20, after: 20 },
                children: [new TextRun({ text: heading, bold: true, font: 'Times New Roman', size: FONT_SIZES.TABLE_HEADER })],
              }),
            ],
          })
        ),
      }),
      ...(meeting.tasks || []).map((t, idx) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: taskCols[0], type: WidthType.DXA },
              borders: TABLE_CELL_BORDER_GRID,
              margins: TABLE_CELL_MARGINS_DATA,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: `${idx + 1}`, font: 'Times New Roman', size: FONT_SIZES.TABLE_CELL })],
                }),
              ],
            }),
            new TableCell({
              width: { size: taskCols[1], type: WidthType.DXA },
              borders: TABLE_CELL_BORDER_GRID,
              margins: TABLE_CELL_MARGINS_DATA,
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun({
                      text: t.task || (t as any).title || '',
                      font: 'Times New Roman',
                      size: FONT_SIZES.TABLE_CELL,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: taskCols[2], type: WidthType.DXA },
              borders: TABLE_CELL_BORDER_GRID,
              margins: TABLE_CELL_MARGINS_DATA,
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun({
                      text: t.assignee || (t as any).assignedTo || '',
                      font: 'Times New Roman',
                      size: FONT_SIZES.TABLE_CELL,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: taskCols[3], type: WidthType.DXA },
              borders: TABLE_CELL_BORDER_GRID,
              margins: TABLE_CELL_MARGINS_DATA,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: t.deadline || '', font: 'Times New Roman', size: FONT_SIZES.TABLE_CELL })],
                }),
              ],
            }),
          ],
        })
      ),
    ];

    children.push(
      new Table({
        layout: TableLayoutType.FIXED,
        width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
        columnWidths: taskCols,
        rows: taskRows,
      })
    );
  }

  const sigTable = new Table({
    layout: TableLayoutType.FIXED,
    columnWidths: [4677, 4678],
    width: { size: DOCX_PAGE_SETUP.contentWidth, type: WidthType.DXA },
    borders: TABLE_BORDER_NONE,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 4677, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 240, after: 20 },
                children: [new TextRun({ text: 'THƯ KÝ', bold: true, font: 'Times New Roman', size: FONT_SIZES.SIGNER_ROLE })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: FONT_SIZES.RECIPIENTS_TITLE })],
              }),
              new Paragraph({ spacing: { before: 900 } }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: meeting.secretary || 'Thư ký', bold: true, font: 'Times New Roman', size: FONT_SIZES.SIGNER_NAME })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 4678, type: WidthType.DXA },
            borders: TABLE_CELL_BORDER_NONE,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 240, after: 20 },
                children: [new TextRun({ text: 'TỔ TRƯỞNG CHUYÊN MÔN', bold: true, font: 'Times New Roman', size: FONT_SIZES.SIGNER_ROLE })],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: '(Ký và ghi rõ họ tên)', italics: true, font: 'Times New Roman', size: FONT_SIZES.RECIPIENTS_TITLE })],
              }),
              new Paragraph({ spacing: { before: 900 } }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: meeting.leader || 'Tổ trưởng chuyên môn', bold: true, font: 'Times New Roman', size: FONT_SIZES.SIGNER_NAME })],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  children.push(sigTable);

  const docxFile = new Document({
    styles: {
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

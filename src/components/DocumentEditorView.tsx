import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  ChevronLeft, 
  BookOpen
} from 'lucide-react';
import { SchoolDocument } from '../types/document';
import { exportDocumentToDocx } from '../utils/docxExport';
import { AdministrativeDirectiveViewerModal } from './AdministrativeDirectiveViewerModal';

interface DocumentEditorViewProps {
  document: SchoolDocument;
  onUpdateDocument?: (doc: SchoolDocument) => void;
  onSaveToArchive?: (doc: SchoolDocument) => void;
  onBack?: () => void;
  onViewSourceDirective?: (directiveTitle: string, fullContent?: string) => void;
  onResetToDefault?: (docId: string) => void;
}

export const DocumentEditorView: React.FC<DocumentEditorViewProps> = ({
  document: doc,
  onBack,
  onViewSourceDirective,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);

  // Handle Copy full text for pasting into iDesk / VnResource
  const handleCopyText = async () => {
    try {
      if (doc.sourceText) {
        await navigator.clipboard.writeText(doc.sourceText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      let fullText = `${doc.issuingAuthorityTop || 'SỞ GDĐT TỈNH ĐỒNG THÁP'}\n${doc.issuingAuthority}\n${doc.documentNumber}\n\n`;
      fullText += `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n${doc.signDate}\n\n`;
      fullText += `${doc.title.toUpperCase()}\n`;
      if (doc.subTitle) fullText += `${doc.subTitle}\n\n`;

      if (doc.legalBases?.length) {
        fullText += doc.legalBases.map(b => b.startsWith('Căn cứ') ? `${b}.` : `Căn cứ ${b}.`).join('\n') + '\n\n';
      }

      doc.sections.forEach(sec => {
        fullText += `${sec.heading}\n${sec.content}\n\n`;
      });

      fullText += `Nơi nhận:\n${doc.recipients.map(r => r.startsWith('-') ? r : `- ${r}`).join('\n')}\n\n`;
      fullText += `${doc.signerRole}\n\n\n${doc.signerName}`;

      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  // Handle Export Word
  const handleExportWord = async () => {
    try {
      setIsDownloading(true);
      if (doc.sourceFileUrl) {
        window.location.assign(doc.sourceFileUrl);
        return;
      }
      await exportDocumentToDocx(doc);
    } catch (e) {
      console.error('Failed to export word', e);
    } finally {
      setIsDownloading(false);
    }
  };

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 print:hidden">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
              title="Quay lại danh sách văn bản"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-900 text-sm font-mono">{doc.documentNumber}</span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-blue-700 font-semibold">{doc.typeLabel}</span>
              {doc.sourceDirective && (
                <>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-medium">
                    Cụ thể hóa từ: {doc.sourceDirective}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-600 truncate max-w-lg mt-0.5 font-medium">
              {doc.subTitle ? `${doc.title} - ${doc.subTitle}` : doc.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Source Directive of So GDDT if available */}
          {doc.sourceDirective && (
            <button
              onClick={() => {
                if (onViewSourceDirective) {
                  onViewSourceDirective(doc.sourceDirective || '', doc.sourceDirectiveFullText);
                } else {
                  setShowSourceModal(true);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Xem văn bản chỉ đạo gốc của Sở GDĐT để đối chiếu"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Xem văn bản gốc của Sở</span>
            </button>
          )}

          {/* Copy Text */}
          <button
            onClick={handleCopyText}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
            title="Sao chép toàn văn để dán vào iDesk / VnResource"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép văn bản'}</span>
          </button>

          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
            title="In trực tiếp hoặc Lưu dạng file PDF chuẩn A4"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>In / Xuất PDF</span>
          </button>

          {/* Download Word DOCX */}
          <button
            onClick={handleExportWord}
            disabled={isDownloading}
            className="px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Đang xuất...' : 'Tải file Word (.docx)'}</span>
          </button>
        </div>
      </div>

      {/* A4 Paper Document Canvas - Strict Decree 30/2020/NĐ-CP Typography */}
      <div className="bg-slate-200/70 p-4 sm:p-8 rounded-xl flex justify-center overflow-x-auto print:bg-white print:p-0">
        <style dangerouslySetInnerHTML={{ __html: `
          @page {
            size: A4 portrait;
            margin-top: 2cm;
            margin-bottom: 2cm;
            margin-left: 3cm;
            margin-right: 2cm;
          }
          @media print {
            body { background: white !important; }
            .print\\:hidden { display: none !important; }
          }
        ` }} />

        <div 
          className={`bg-white text-slate-900 shadow-md print:shadow-none w-full max-w-[850px] min-h-[1130px] text-[14pt] leading-[1.4] transition-all ${doc.sourceHtml ? 'docx-backed' : ''}`}
          style={{
            fontFamily: '"Times New Roman", Times, serif',
            lineHeight: '1.4',
            paddingTop: '2cm',
            paddingBottom: '2cm',
            paddingLeft: '3cm',
            paddingRight: '2cm',
            boxSizing: 'border-box',
          }}
        >
          {/* Header 2-column table conforming to Decree 30 and School Sample */}
          <div className="grid grid-cols-12 gap-x-4 gap-y-2 pb-2 items-start">
            {/* Hàng 1 - Trái: Cơ quan ban hành (Font 13pt) */}
            <div className="col-span-5 text-center flex flex-col items-center">
              {/* Sở GDĐT Đồng Tháp: Font 13, chữ đứng, in hoa, không đậm */}
              <span className="text-[13pt] font-normal uppercase tracking-tight">
                {doc.issuingAuthorityTop || 'SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP'}
              </span>

              {/* Trường THCS và THPT: Font 13, chữ đứng, in hoa, ĐẬM */}
              <strong className="text-[13pt] font-bold uppercase tracking-tight mt-0.5">
                TRƯỜNG THCS VÀ THPT
              </strong>

              {/* ĐỐC BINH KIỀU: Font 13, in hoa, ĐẬM */}
              <strong className="text-[13pt] font-bold uppercase tracking-tight">
                ĐỐC BINH KIỀU
              </strong>

              {/* Gạch chân dưới ĐỐC BINH KIỀU: dài 1/3 đến 1/2 dòng chữ */}
              <div className="w-20 border-b-2 border-slate-900 mt-1.5 mb-1"></div>
            </div>

            {/* Hàng 1 - Phải: Quốc hiệu, Tiêu ngữ (Font 12.5 & 14pt) */}
            <div className="col-span-7 text-center flex flex-col items-center">
              {/* CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM: Font 12.5, in hoa, đứng, ĐẬM, không ngắt dòng */}
              <strong className="text-[12.5pt] font-bold uppercase tracking-tight whitespace-nowrap">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </strong>

              {/* Độc lập - Tự do - Hạnh phúc: Font 14, in thường, đứng, ĐẬM */}
              <div className="inline-block mt-0.5">
                <strong className="text-[14pt] font-bold">
                  Độc lập - Tự do - Hạnh phúc
                </strong>
                {/* Gạch chân dưới Tiêu ngữ: dài bằng 100% dòng chữ */}
                <div className="w-full border-b-2 border-slate-900 mt-1.5 mb-1"></div>
              </div>
            </div>

            {/* Hàng 2 - Trái: Số, ký hiệu */}
            <div className="col-span-5 text-center flex flex-col items-center justify-center">
              <span className="text-[13pt] font-normal">
                {doc.documentNumber || 'Số:    /KH-THCS&THPTĐBK'}
              </span>
            </div>

            {/* Hàng 2 - Phải: Địa danh và ngày tháng năm */}
            <div className="col-span-7 text-center flex flex-col items-center justify-center">
              <span className="text-[13.5pt] italic text-center block">
                {doc.signDate || 'Đồng Tháp, ngày 28 tháng 9 năm 2026'}
              </span>
            </div>
          </div>

          {/* Document Title & Subtitle */}
          <div className="text-center my-6">
            <h1 className="text-[15pt] sm:text-[16pt] font-bold uppercase tracking-wide">
              {doc.title}
            </h1>
            {doc.subTitle && (
              <div className="mt-1">
                <span className="text-[14pt] font-bold inline-block">
                  {doc.subTitle}
                </span>
                {/* Gạch chân dưới trích yếu */}
                <div className="w-36 border-b-2 border-slate-900 mx-auto mt-1.5"></div>
              </div>
            )}
          </div>

          {/* Legal Bases: Indented 1.0cm, font 14pt regular, text-justify */}
          {doc.legalBases && doc.legalBases.length > 0 && (
            <div className="space-y-1.5 mb-2 text-justify">
              {doc.legalBases.map((base, idx) => {
                const fullText = base.startsWith('Căn cứ') ? base : `Căn cứ ${base}`;
                const isLast = idx === (doc.legalBases?.length ?? 1) - 1;
                let formattedText = fullText;
                if (isLast) {
                  if (!formattedText.endsWith('.')) formattedText = formattedText.replace(/;$/, '') + '.';
                } else {
                  if (!formattedText.endsWith(';')) formattedText = formattedText.replace(/\.$/, '') + ';';
                }

                return (
                  <p key={idx} className="indent-[1cm] text-[14pt] leading-[1.4] text-slate-900 font-normal not-italic text-justify">
                    {formattedText}
                  </p>
                );
              })}
            </div>
          )}

          {/* Transition phrase if plan */}
          {doc.type === 'plan' && (
            <p className="indent-[1cm] text-[14pt] leading-[1.4] text-slate-900 mb-3 font-normal text-justify">
              Nay Trường THCS và THPT Đốc Binh Kiều xây dựng {doc.subTitle ? (doc.subTitle.toLowerCase().startsWith('kế hoạch') ? doc.subTitle : `Kế hoạch ${doc.subTitle.toLowerCase()}`) : (doc.title.toLowerCase().startsWith('kế hoạch') ? doc.title : `Kế hoạch ${doc.title.toLowerCase()}`)} như sau:
            </p>
          )}

          {/* Sections Body: Roman Numeral Headings, Numbered items, Indent 1.0cm */}
          <div className="space-y-3 text-justify">
            {doc.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {section.heading.toUpperCase().startsWith('PHỤ LỤC') ? (
                  <div className="pt-8 mt-8 border-t-2 border-dashed border-slate-300 text-center">
                    <span className="inline-block px-3 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
                      Văn bản đính kèm kế hoạch
                    </span>
                    <h2 className="font-bold text-[15pt] uppercase tracking-normal text-slate-950 text-center my-2">
                      {section.heading}
                    </h2>
                  </div>
                ) : (
                  <h2 className="font-bold text-[14pt] uppercase tracking-normal text-slate-950 my-[6pt] indent-[1cm] pl-0 text-justify">
                    {section.heading}
                  </h2>
                )}

                {(() => {
                  const lines = section.content.split('\n');
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
                      blocks.push({ type: 'paragraph', text: line });
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

                  return (
                    <div className="space-y-2">
                      {blocks.map((block, bIdx) => {
                        if (block.type === 'table') {
                          const headers = block.rows[0] || [];
                          const dataRows = block.rows.slice(1);
                          return (
                            <div key={bIdx} className="overflow-x-auto my-3">
                              <table className="w-full border-collapse border border-slate-800 text-[12pt] leading-[1.3] text-slate-900">
                                <thead>
                                  <tr className="bg-slate-100 font-bold">
                                    {headers.map((th, thIdx) => (
                                      <th
                                        key={thIdx}
                                        className="border border-slate-800 px-2 py-1.5 text-center font-bold"
                                      >
                                        {th}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {dataRows.map((cells, rIdx) => (
                                    <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                                      {cells.map((td, cIdx) => (
                                        <td
                                          key={cIdx}
                                          className={`border border-slate-800 px-2 py-1.5 ${
                                            cIdx === 0 || td.length <= 6 || (/^\d/.test(td) && td.length < 15)
                                              ? 'text-center'
                                              : 'text-left'
                                          }`}
                                        >
                                          {td}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }

                        const trimmed = block.text.trim();
                        if (!trimmed) return <div key={bIdx} className="h-1.5" />;

                        // Dấu cộng cấp 2 (sub-bullet): + ...
                        if (trimmed.startsWith('+')) {
                          return (
                            <p
                              key={bIdx}
                              className="indent-[1.5cm] pl-0 text-[14pt] leading-[1.4] text-justify text-slate-900 font-normal"
                            >
                              {trimmed}
                            </p>
                          );
                        }

                        // Dấu gạch đầu dòng cấp 1: - ...
                        if (trimmed.startsWith('-')) {
                          return (
                            <p
                              key={bIdx}
                              className="indent-[1cm] pl-0 text-[14pt] leading-[1.4] text-justify text-slate-900 font-normal"
                            >
                              {trimmed}
                            </p>
                          );
                        }

                        // Chữ cái hoặc số: a), b), c) hoặc 1., 2.
                        if (/^[a-z]\)/i.test(trimmed)) {
                          return (
                            <p
                              key={bIdx}
                              className="indent-[1cm] pl-0 text-[14pt] leading-[1.4] text-justify text-slate-900 font-normal"
                            >
                              {trimmed}
                            </p>
                          );
                        }

                        if (/^\d+\./.test(trimmed)) {
                          return (
                            <p
                              key={bIdx}
                              className="indent-[1cm] pl-0 text-[14pt] leading-[1.4] text-justify text-slate-900 font-semibold"
                            >
                              {trimmed}
                            </p>
                          );
                        }

                        return (
                          <p
                            key={bIdx}
                            className="indent-[1cm] pl-0 text-[14pt] leading-[1.4] text-justify text-slate-900 font-normal"
                          >
                            {trimmed}
                          </p>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>

          {/* Footer 2-column layout: Nơi nhận (Trái) & Chữ ký (Phải) */}
          <div className="grid grid-cols-12 gap-4 mt-8 pt-4 items-start">
            {/* Left: Nơi nhận */}
            <div className="col-span-6 text-left">
              <div className="mb-1">
                <span className="text-[12pt] font-bold italic tracking-tight">
                  Nơi nhận:
                </span>
              </div>

              <div className="space-y-0.5 text-[11pt] leading-[1.3] text-slate-800">
                {doc.recipients.map((rec, rIdx) => (
                  <span key={rIdx} className="block text-[11pt] font-normal">
                    {rec.startsWith('-') ? rec : `- ${rec}`}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Chức vụ & Họ tên người ký */}
            <div className="col-span-6 text-center flex flex-col items-center justify-between min-h-[170px]">
              <div>
                {doc.signerRole.split('\n').map((line, idx) => (
                  <strong
                    key={idx}
                    className={`block uppercase font-bold ${
                      idx === 0 && line.includes('KT.') ? 'text-[13pt]' : 'text-[14pt]'
                    }`}
                  >
                    {line}
                  </strong>
                ))}
              </div>

              {/* Space for physical signature / seal */}
              <div className="h-28 print:h-36" />

              <strong className="text-[14pt] font-bold tracking-tight text-slate-950">
                {doc.signerName}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Source Directive View Modal */}
      {showSourceModal && (
        <AdministrativeDirectiveViewerModal
          directive={{
            id: doc.sourceDirectiveId || 'directive-source',
            documentNumber: doc.sourceDirective || 'Văn bản chỉ đạo của Sở GDĐT',
            title: doc.sourceDirective || 'Chỉ đạo của Sở Giáo dục và Đào tạo Đồng Tháp',
            issuingAuthority: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP',
            signDate: 'Đồng Tháp',
            signer: 'KT. GIÁM ĐỐC - PHÓ GIÁM ĐỐC Nguyễn Phương Toàn',
            summary: doc.sourceDirective || '',
            fullContent: doc.sourceDirectiveFullText || doc.sourceDirective || 'Văn bản liên kết từ chỉ đạo của Sở GDĐT.',
            createdDate: new Date().toISOString(),
          }}
          onClose={() => setShowSourceModal(false)}
          onContextualize={() => setShowSourceModal(false)}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  CalendarCheck,
  Bookmark,
  CheckCircle2,
  Layers,
  Building2,
  Users,
  ShieldCheck,
  FileCheck2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const MidtermAssessmentPlanView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('all');

  // Bullet-proof download handler that works inside sandboxed iframes & direct links
  const handleDownloadWord = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    try {
      // Step 1: Fetch binary blob from server
      const response = await fetch('/api/documents/download/kh-kiem-tra-giua-hk1.docx');
      if (!response.ok) {
        throw new Error(`Tải file thất bại với mã lỗi ${response.status}`);
      }
      const blob = await response.blob();

      // Step 2: Trigger blob download in browser DOM
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Blob download failed, trying direct link fallback:', err);
      // Fallback: direct anchor download
      const fallbackLink = document.createElement('a');
      fallbackLink.href = '/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx';
      fallbackLink.download = 'KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx';
      fallbackLink.target = '_blank';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = async () => {
    try {
      const el = document.getElementById('midterm-plan-paper');
      if (el) {
        const text = el.innerText;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Banner & Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm print:hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                VĂN BẢN MỚI XÂY DỰNG • ĐÃ GOM ĐỦ 3 NGUỒN FILE
              </span>
              <span className="text-xs font-mono font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded border border-blue-300">
                Số: 45/KH-THCS&THPTĐBK
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Ban hành: Ngày 16/10/2026
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
              Kế Hoạch Kiểm Tra, Đánh Giá Giữa Học Kỳ I — Năm Học 2026 - 2027
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Xây dựng độc lập, chi tiết và cụ thể nhất cho <strong>Trường THCS và THPT Đốc Binh Kiều</strong>. Tổng hợp đầy đủ từ 3 nguồn tài liệu:
              <span className="inline-block mx-1 font-semibold text-blue-800">1. Kế hoạch năm số 39 của ĐBK</span> •
              <span className="inline-block mx-1 font-semibold text-emerald-800">2. Kế hoạch giữa HK1 trường THCS-THPT Mỹ Quý</span> •
              <span className="inline-block mx-1 font-semibold text-purple-800">3. Kế hoạch KTHK1 năm học trước của ĐBK</span>.
            </p>
          </div>

          {/* Quick Actions Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Download Word Button */}
            <button
              onClick={handleDownloadWord}
              disabled={isDownloading}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow transition active:scale-95 ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white border border-amber-500 hover:shadow-md'
              }`}
              title="Tải ngay file Word (.docx) chuẩn thể thức Nghị định 30/2020/NĐ-CP, mở ra dùng ngay không cần căn chỉnh"
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>
                {isDownloading
                  ? 'Đang chuẩn bị file...'
                  : downloadSuccess
                  ? '✓ Đã tải xuống file Word!'
                  : 'Xuất File Word (.docx)'}
              </span>
            </button>

            {/* Direct download link fallback */}
            <a
              href="/api/documents/download/kh-kiem-tra-giua-hk1.docx"
              download="KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx"
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Link tải trực tiếp"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
              <span>Link dự phòng</span>
            </a>

            {/* Copy Button */}
            <button
              onClick={handleCopyText}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
              title="Sao chép toàn bộ nội dung văn bản để dán vào iDesk hoặc Microsoft Word"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép toàn văn'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
              title="In trực tiếp hoặc Lưu file PDF chuẩn khổ giấy A4"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>In / Lưu PDF</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/70 text-blue-900 border border-blue-200/60">
            <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
            <div>
              <p className="font-bold">Quy mô 3 cơ sở</p>
              <p className="text-[11px] text-blue-700">53 lớp · 2.111 học sinh</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/70 text-amber-900 border border-amber-200/60">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <p className="font-bold">Thời gian kiểm tra</p>
              <p className="text-[11px] text-amber-700">Tuần 9 (02/11 - 06/11/2026)</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/70 text-emerald-900 border border-emerald-200/60">
            <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <div>
              <p className="font-bold">Cấu trúc đề mới</p>
              <p className="text-[11px] text-emerald-700">Trắc nghiệm 3 phần + Tự luận</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50/70 text-purple-900 border border-purple-200/60">
            <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
            <div>
              <p className="font-bold">Quy trình nghiêm ngặt</p>
              <p className="text-[11px] text-purple-700">Coi chéo · Làm phách · Chấm 2 vòng</p>
            </div>
          </div>
        </div>

        {/* Quick Jump Bar */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 overflow-x-auto pb-1">
          <span className="font-bold text-slate-700 shrink-0">Đi đến mục:</span>
          {[
            { id: 'sec-mucdich', label: 'I. Mục Đích & Yêu Cầu' },
            { id: 'sec-quymo', label: 'II. Quy Mô 53 Lớp (3 Cơ Sở)' },
            { id: 'sec-cautruc', label: 'III. Cấu Trúc Đề Các Môn' },
            { id: 'sec-rade', label: 'IV. Ra Đề & In Sao Bảo Mật' },
            { id: 'sec-coithi', label: 'V. Tổ Chức Coi & Chấm Thi' },
            { id: 'sec-tradiem', label: 'VI. Trả Bài & Kiểm Tra Bù' },
            { id: 'sec-tiendo', label: 'VII. Bảng Tiến Độ Thời Gian' },
            { id: 'sec-tochuc', label: 'VIII. Phân Công Trách Nhiệm' },
            { id: 'sec-lichthpt', label: 'Phụ Lục I: Lịch Thi THPT' },
            { id: 'sec-lichthcs', label: 'Phụ Lục II: Lịch Thi THCS' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-100 hover:text-blue-900 text-slate-700 shrink-0 transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main A4 Document Paper (Chuẩn thể thức Nghị định 30/2020/NĐ-CP) */}
      <div
        id="midterm-plan-paper"
        className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto print:p-0 print:shadow-none print:border-none print:rounded-none font-['Times_New_Roman',Times,serif] text-[13pt] sm:text-[14pt] leading-[1.4] text-slate-900"
        style={{ minHeight: '29.7cm' }}
      >
        {/* 1. Header 2 Cột Chuẩn Nghị Định 30/2020/NĐ-CP */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-200">
          {/* Cột trái: Cơ quan ban hành & Số hiệu */}
          <div className="col-span-5 text-center space-y-0.5">
            <p className="text-[12pt] sm:text-[13pt] font-normal uppercase text-slate-800">
              SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP
            </p>
            <p className="text-[12pt] sm:text-[13pt] font-bold uppercase text-slate-900 leading-tight">
              TRƯỜNG THCS VÀ THPT<br />ĐỐC BINH KIỀU
            </p>
            <div className="w-24 border-b border-slate-900 mx-auto my-1"></div>
            <p className="text-[13pt] font-medium text-slate-900 pt-0.5">
              Số: <strong>45/KH-THCS&THPTĐBK</strong>
            </p>
          </div>

          {/* Cột phải: Quốc hiệu, Tiêu ngữ & Địa danh ngày tháng */}
          <div className="col-span-7 text-center space-y-0.5">
            <p className="text-[12pt] sm:text-[13pt] font-bold uppercase text-slate-900">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </p>
            <p className="text-[13pt] sm:text-[14pt] font-bold text-slate-900">
              Độc lập - Tự do - Hạnh phúc
            </p>
            <div className="w-36 border-b border-slate-900 mx-auto my-1"></div>
            <p className="text-[13pt] sm:text-[14pt] italic text-slate-800 pt-1 text-right sm:pr-4">
              Tháp Mười, ngày 16 tháng 10 năm 2026
            </p>
          </div>
        </div>

        {/* 2. Tiêu Đề Văn Bản & Trích Yếu */}
        <div className="text-center py-6">
          <h2 className="text-[16pt] sm:text-[17pt] font-bold uppercase tracking-wide text-slate-950">
            KẾ HOẠCH
          </h2>
          <h3 className="text-[14pt] sm:text-[15pt] font-bold text-slate-900 mt-1">
            Tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027
          </h3>
          <div className="w-32 border-b-2 border-slate-900 mx-auto mt-2"></div>
        </div>

        {/* 3. Căn Cứ Pháp Lý */}
        <div className="space-y-1.5 mb-6 text-justify">
          <p className="indent-8 italic text-slate-800">
            Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15/9/2020 của Bộ Giáo dục và Đào tạo về việc ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;
          </p>
          <p className="indent-8 italic text-slate-800">
            Căn cứ Thông tư số 22/2021/TT-BGDĐT ngày 20/7/2021 của Bộ Giáo dục và Đào tạo Quy định về đánh giá học sinh trung học cơ sở và học sinh trung học phổ thông;
          </p>
          <p className="indent-8 italic text-slate-800">
            Căn cứ Công văn số 7991/BGDĐT-GDTrH ngày 20/12/2024 của Bộ Giáo dục và Đào tạo về việc hướng dẫn xây dựng ma trận, bảng đặc tả đề kiểm tra định kì các môn học cấp THCS, THPT;
          </p>
          <p className="indent-8 italic text-slate-800">
            Căn cứ Công văn số 471/SGDĐT-GDPT ngày 14/4/2025 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thực hiện kiểm tra, đánh giá đối với cấp THCS, THPT;
          </p>
          <p className="indent-8 italic text-slate-800">
            Căn cứ Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25/9/2026 của Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027;
          </p>
          <p className="indent-8 italic text-slate-800">
            Căn cứ Kế hoạch số 39/KH-THCS&THPTĐBK ngày 05/10/2026 của Trường THCS và THPT Đốc Binh Kiều về tổ chức thực hiện kiểm tra, đánh giá học sinh năm học 2026 - 2027;
          </p>
          <p className="indent-8 text-slate-900 pt-1">
            Nay Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027 với các nội dung chi tiết như sau:
          </p>
        </div>

        {/* 4. Nội Dung Chi Tiết Các Phần */}
        <div className="space-y-6 text-justify">
          {/* PHẦN I */}
          <div id="sec-mucdich" className="space-y-2">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              I. MỤC ĐÍCH, YÊU CẦU
            </h4>
            <div className="space-y-2">
              <p className="font-bold text-slate-900 indent-8">
                1. Mục đích:
              </p>
              <p className="indent-8">
                - Đánh giá khách quan, toàn diện và thực chất mức độ hoàn thành nhiệm vụ học tập, rèn luyện của học sinh theo yêu cầu cần đạt được quy định trong Chương trình Giáo dục phổ thông 2018 sau nửa đầu học kỳ I.
              </p>
              <p className="indent-8">
                - Cung cấp thông tin phản hồi kịp thời, chính xác để giáo viên điều chỉnh phương pháp dạy học, nâng cao chất lượng giáo dục; giúp học sinh nhận rõ ưu điểm và hạn chế để có phương pháp tự học phù hợp, tiến bộ.
              </p>
              <p className="indent-8">
                - Giúp Ban Giám hiệu và các Tổ chuyên môn rút kinh nghiệm sâu sắc trong công tác chỉ đạo chuyên môn; kịp thời tổ chức dạy học phân hóa, triển khai kế hoạch phụ đạo học sinh chưa đạt chuẩn và bồi dưỡng học sinh năng khiếu.
              </p>
              <p className="indent-8">
                - Thống nhất quy trình kiểm tra, đánh giá định kỳ đồng bộ giữa cấp THCS và cấp THPT sau khi sáp nhập trường; bảo đảm tính nghiêm túc, công bằng, bảo mật và kỷ cương tại cả 03 cơ sở: Trụ sở chính (Điểm chính THPT), Điểm Trường THCS Đốc Binh Kiều và Điểm Trường THCS Tân Kiều.
              </p>

              <p className="font-bold text-slate-900 indent-8 pt-1">
                2. Yêu cầu:
              </p>
              <p className="indent-8">
                - Đánh giá vì sự tiến bộ của học sinh; coi trọng việc động viên, khuyến khích sự cố gắng rèn luyện; tuyệt đối không so sánh học sinh này với học sinh khác gây áp lực tâm lý tiêu cực.
              </p>
              <p className="indent-8">
                - Kiểm tra đúng theo tiến độ phân phối chương trình, bảo đảm hoàn thành nội dung kiến thức tính đến hết tuần 8 theo Kế hoạch giáo dục nhà trường đã được phê duyệt. Tuyệt đối không kiểm tra vượt quá yêu cầu cần đạt hoặc vượt mức độ cần đạt.
              </p>
              <p className="indent-8">
                - Đề kiểm tra phải được xây dựng dựa trên ma trận, bản đặc tả chuẩn mực; bảo đảm tỷ lệ nhận thức 4:3:3 (Nhận biết 40% - Thông hiểu 30% - Vận dụng 30%); đối với cấp THPT tiệm cận định dạng cấu trúc đề thi tốt nghiệp THPT từ năm 2025 của Bộ Giáo dục và Đào tạo.
              </p>
              <p className="indent-8">
                - Các khâu ra đề, thẩm định, in sao, coi kiểm tra, làm phách, chấm bài và nhập điểm phải được thực hiện an toàn, nghiêm túc, công bằng, khách quan và bảo mật tuyệt đối theo đúng quy định.
              </p>
            </div>
          </div>

          {/* PHẦN II */}
          <div id="sec-quymo" className="space-y-3">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              II. ĐỐI TƯỢNG, ĐỊA ĐIỂM VÀ QUY MÔ KIỂM TRA
            </h4>
            <p className="indent-8">
              Kỳ kiểm tra được áp dụng cho toàn bộ học sinh đang theo học tại Trường THCS và THPT Đốc Binh Kiều trong năm học 2026 - 2027 với quy mô tổng cộng <strong>53 lớp với 2.111 học sinh</strong> (Cấp THPT gồm 14 lớp với 529 học sinh; Cấp THCS gồm 39 lớp với 1.582 học sinh) phân bổ tại 03 cơ sở như sau:
            </p>

            {/* Bảng Quy mô 53 lớp */}
            <div className="overflow-x-auto my-3">
              <table className="w-full border-collapse border border-slate-900 text-[12pt] sm:text-[13pt]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="border border-slate-900 p-2 w-12">TT</th>
                    <th className="border border-slate-900 p-2">Cơ sở / Điểm trường</th>
                    <th className="border border-slate-900 p-2">Khối lớp</th>
                    <th className="border border-slate-900 p-2 w-36">Số lớp / Số HS</th>
                    <th className="border border-slate-900 p-2">Cán bộ phụ trách cơ sở</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-900 p-2 text-center font-bold">1</td>
                    <td className="border border-slate-900 p-2 font-semibold">
                      Trụ sở chính (Điểm chính cấp THPT)
                    </td>
                    <td className="border border-slate-900 p-2">
                      Khối 10 (5 lớp)<br />
                      Khối 11 (4 lớp)<br />
                      Khối 12 (5 lớp)
                    </td>
                    <td className="border border-slate-900 p-2 text-center font-bold">
                      14 lớp<br />529 học sinh
                    </td>
                    <td className="border border-slate-900 p-2">
                      PHT Nguyễn Minh Trí<br />
                      <span className="text-xs text-slate-600">(Phụ trách chung CM & Trụ sở chính)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-2 text-center font-bold">2</td>
                    <td className="border border-slate-900 p-2 font-semibold">
                      Điểm Trường THCS Đốc Binh Kiều
                    </td>
                    <td className="border border-slate-900 p-2">
                      Khối 6 (6 lớp)<br />
                      Khối 7 (6 lớp)<br />
                      Khối 8 (6 lớp)<br />
                      Khối 9 (6 lớp)
                    </td>
                    <td className="border border-slate-900 p-2 text-center font-bold">
                      24 lớp<br />966 học sinh
                    </td>
                    <td className="border border-slate-900 p-2">
                      Phó Hiệu trưởng phụ trách Điểm ĐBK<br />
                      & Tổ trưởng Điểm ĐBK
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-900 p-2 text-center font-bold">3</td>
                    <td className="border border-slate-900 p-2 font-semibold">
                      Điểm Trường THCS Tân Kiều
                    </td>
                    <td className="border border-slate-900 p-2">
                      Khối 6 (4 lớp)<br />
                      Khối 7 (3 lớp)<br />
                      Khối 8 (4 lớp)<br />
                      Khối 9 (4 lớp)
                    </td>
                    <td className="border border-slate-900 p-2 text-center font-bold">
                      15 lớp<br />616 học sinh
                    </td>
                    <td className="border border-slate-900 p-2">
                      Phó Hiệu trưởng phụ trách Điểm Tân Kiều<br />
                      & Cán bộ quản lý cơ sở Tân Kiều
                    </td>
                  </tr>
                  <tr className="bg-slate-100 font-bold">
                    <td className="border border-slate-900 p-2 text-center" colSpan={2}>
                      TỔNG CỘNG TOÀN TRƯỜNG
                    </td>
                    <td className="border border-slate-900 p-2 text-center">
                      Toàn bộ 7 khối lớp (Khối 6 đến Khối 12)
                    </td>
                    <td className="border border-slate-900 p-2 text-center text-blue-900">
                      53 lớp / 2.111 HS
                    </td>
                    <td className="border border-slate-900 p-2 text-center">
                      Ban Giám hiệu chỉ đạo thống nhất
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* PHẦN III */}
          <div id="sec-cautruc" className="space-y-3">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              III. HÌNH THỨC, THỜI LƯỢNG VÀ CẤU TRÚC ĐỀ KIỂM TRA
            </h4>

            <p className="font-bold text-slate-900 indent-8">
              1. Hình thức kiểm tra:
            </p>
            <p className="indent-8">
              <strong>a) Kiểm tra tập trung trên giấy:</strong> Áp dụng đối với các môn học cốt lõi theo lịch chung toàn trường, chia theo danh sách phòng thi A, B, C toàn khối:
            </p>
            <p className="indent-12">
              - <em>Cấp THPT (Khối 10, 11, 12):</em> Ngữ văn, Toán, Tiếng Anh, Vật lí, Hóa học, Sinh học, Lịch sử, Địa lí, Giáo dục kinh tế và pháp luật, Tin học, Công nghệ.
            </p>
            <p className="indent-12">
              - <em>Cấp THCS (Khối 6, 7, 8, 9):</em> Ngữ văn, Toán, Tiếng Anh, Khoa học tự nhiên, Lịch sử và Địa lí, Giáo dục công dân.
            </p>

            <p className="indent-8 pt-1">
              <strong>b) Kiểm tra tại lớp theo thời khóa biểu:</strong> Áp dụng đối với các môn đánh giá bằng nhận xét, thực hành, sản phẩm học tập hoặc vận động:
            </p>
            <p className="indent-12">
              - <em>Cấp THPT:</em> Giáo dục thể chất, Giáo dục Quốc phòng và An ninh, Hoạt động trải nghiệm - hướng nghiệp, Nội dung giáo dục địa phương.
            </p>
            <p className="indent-12">
              - <em>Cấp THCS:</em> Tin học, Công nghệ, Nghệ thuật (Âm nhạc, Mĩ thuật), Giáo dục thể chất, Hoạt động trải nghiệm - hướng nghiệp, Nội dung giáo dục địa phương.
            </p>
            <p className="indent-12 text-slate-800">
              * Giáo viên bộ môn chủ động hoàn thành kiểm tra trong tuần 7 và tuần 8 theo thời khóa biểu chính khóa, bảo đảm đầy đủ phiếu chấm, tiêu chí đánh giá và công bố điểm trước tuần kiểm tra tập trung.
            </p>

            <p className="indent-8 pt-1">
              <strong>c) Kiểm tra kỹ năng nói môn Tiếng Anh:</strong> Thực hiện kiểm tra kỹ năng nói trực tiếp trong tuần từ ngày 26/10/2026 đến ngày 30/10/2026 theo chủ đề quy định. Điểm kiểm tra nói chiếm 2,0 điểm trong tổng điểm bài kiểm tra định kỳ môn Tiếng Anh.
            </p>

            <p className="font-bold text-slate-900 indent-8 pt-2">
              2. Thời gian làm bài:
            </p>
            <p className="indent-8">
              - <strong>Cấp THCS:</strong> Môn Ngữ văn, Toán: <strong>90 phút/bài</strong>; Môn Tiếng Anh, Khoa học tự nhiên, Lịch sử và Địa lí: <strong>60 phút/bài</strong>; Môn Giáo dục công dân: <strong>45 phút/bài</strong>.
            </p>
            <p className="indent-8">
              - <strong>Cấp THPT:</strong> Môn Ngữ văn, Toán: <strong>90 phút/bài</strong>; Môn Tiếng Anh: <strong>60 phút/bài</strong>; Các môn Vật lí, Hóa học, Sinh học, Lịch sử, Địa lí, GDKT&PL, Tin học, Công nghệ: <strong>45 phút/bài</strong> (riêng học sinh khối 12 làm quen định dạng tốt nghiệp THPT thời lượng tương đương phân bổ 50 phút theo ma trận chuyên sâu).
            </p>

            <p className="font-bold text-slate-900 indent-8 pt-2">
              3. Định dạng cấu trúc đề và tỷ lệ phân bổ điểm:
            </p>
            <p className="indent-8">
              <strong>a) Tỷ lệ các mức độ nhận thức:</strong> Tất cả các đề kiểm tra định kỳ phải bảo đảm tỷ lệ nhận thức: <strong>Nhận biết 40% (4,0 điểm) - Thông hiểu 30% (3,0 điểm) - Vận dụng 30% (3,0 điểm)</strong>.
            </p>
            <p className="indent-8">
              <strong>b) Cấu trúc đề kiểm tra cấp THPT (Tiệm cận định dạng thi tốt nghiệp THPT 2025):</strong>
            </p>
            <p className="indent-12">
              - <em>Phần I:</em> Trắc nghiệm nhiều lựa chọn 4 phương án, chọn 01 đáp án đúng (0,25 điểm/câu).
            </p>
            <p className="indent-12">
              - <em>Phần II:</em> Trắc nghiệm dạng Đúng/Sai. Mỗi câu gồm 4 lệnh a, b, c, d (tính lũy tiến 0,1 - 0,25 - 0,5 - 1,0 điểm).
            </p>
            <p className="indent-12">
              - <em>Phần III:</em> Trắc nghiệm dạng trả lời ngắn (Toán 0,5 điểm/câu; các môn khác 0,25 điểm/câu).
            </p>
            <p className="indent-12">
              - <em>Phần Tự luận:</em> Vận dụng, lập luận, giải quyết vấn đề thực tiễn (3,0 điểm).
            </p>
            <p className="indent-12">
              - <em>Riêng môn Ngữ văn:</em> Tự luận 100% (Đọc hiểu 4,0 điểm + Viết 6,0 điểm; ngữ liệu ngoài SGK).
            </p>
            <p className="indent-8">
              <strong>c) Cấu trúc đề kiểm tra cấp THCS:</strong>
            </p>
            <p className="indent-12">
              - <em>Môn Ngữ văn:</em> Tự luận 100% (Đọc hiểu 5,0 - 6,0 điểm + Viết 4,0 - 5,0 điểm; ngữ liệu ngoài SGK).
            </p>
            <p className="indent-12">
              - <em>Môn Toán, KHTN, Lịch sử - Địa lí, GDCD:</em> Trắc nghiệm khách quan 7,0 điểm + Tự luận 3,0 điểm (thống nhất theo đề xuất và năng lực giáo viên THCS).
            </p>
            <p className="indent-12">
              - <em>Môn Tiếng Anh:</em> Trắc nghiệm kết hợp Tự luận (Nghe - Đọc - Viết 8,0 điểm + Nói 2,0 điểm).
            </p>
          </div>

          {/* PHẦN IV */}
          <div id="sec-rade" className="space-y-2">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              IV. CÔNG TÁC XÂY DỰNG MA TRẬN, ĐẶC TẢ VÀ RA ĐỀ KIỂM TRA
            </h4>
            <p className="indent-8">
              <strong>1. Yêu cầu đối với đề kiểm tra:</strong> Bám sát mục tiêu, chuẩn kiến thức kỹ năng tính đến hết tuần 8 học kỳ I; nội dung khoa học, chuẩn xác, ngôn ngữ tường minh, bảo đảm tính phân hóa tốt, không đánh đố; bắt buộc kèm theo Ma trận đề, Bản đặc tả chi tiết, Đáp án và Thang điểm chi tiết đến 0,25 điểm (tự luận) và biểu điểm cụ thể cho từng câu trắc nghiệm.
            </p>
            <p className="indent-8">
              <strong>2. Quy trình ra đề và nộp đề kiểm tra:</strong> Tổ chuyên môn họp thống nhất ma trận, bản đặc tả; nộp Ban Giám hiệu (Thầy Nguyễn Minh Trí) phê duyệt trước ngày 20/10/2026. Mỗi môn học ở từng khối lớp ra tối thiểu 02 đề: <strong>01 ĐỀ CHÍNH THỨC</strong> và <strong>01 ĐỀ DỰ BỊ</strong> có độ khó tương đương. Giáo viên nộp file và bản in có ký tên niêm phong trong phong bì kín về Thư ký Hội đồng trước 11h00 ngày 24/10/2026.
            </p>
            <p className="indent-8">
              <strong>3. Công tác bảo mật và in sao:</strong> Ban In sao làm việc tại khu vực cách ly, niêm phong cửa, có giám sát an ninh. Đề được in sao và đóng gói niêm phong riêng cho từng phòng thi tại cả 03 cơ sở, ghi rõ thông tin phòng và môn thi. Bàn giao túi đề niêm phong cho Trưởng điểm thi trước giờ kiểm tra ít nhất 60 phút có biên bản giao nhận.
            </p>
          </div>

          {/* PHẦN V */}
          <div id="sec-coithi" className="space-y-2">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              V. TỔ CHỨC CÁC BAN VÀ QUY TRÌNH COI, CHẤM KIỂM TRA
            </h4>
            <p className="indent-8">
              <strong>1. Thành lập các Ban:</strong> Ban Chỉ đạo; Ban Ra đề & Thẩm định; Ban In sao; Ban Coi kiểm tra tại 03 cơ sở; Ban Làm phách; Ban Chấm kiểm tra (chấm máy trắc nghiệm và chấm tự luận); Ban Phúc khảo.
            </p>
            <p className="indent-8">
              <strong>2. Quy định phòng kiểm tra:</strong> Sắp xếp học sinh theo thứ tự bảng chữ cái A, B, C toàn khối; tối đa <strong>24 học sinh/phòng thi</strong>; khoảng cách chỗ ngồi tối thiểu 1,2m. Mỗi phòng bố trí 02 giám thị coi thi, thực hiện đảo chéo phòng và chéo buổi, tuyệt đối không bố trí giáo viên coi thi đúng môn mình đang trực tiếp giảng dạy tại khối lớp đó. Học sinh để toàn bộ ba lô, điện thoại, thiết bị thu phát sóng ngoài phòng thi.
            </p>
            <p className="indent-8">
              <strong>3. Quy trình làm phách và chấm bài:</strong> Ban Làm phách tiến hành đánh số phách, rọc phách độc lập, bảo mật tuyệt đối túi đầu phách trong tủ khóa niêm phong trước khi giao bài cho Ban Chấm. Bài tự luận được chấm tập trung theo hình thức <strong>chấm 2 vòng độc lập</strong> (vòng 1 chấm bút đỏ ghi phiếu, vòng 2 chấm bút xanh lên bài; xử lý điểm lệch nghiêm túc theo quy chế). Bài trắc nghiệm được chấm tập trung bằng máy quét quang học chuyên dụng có sự giám sát của Thanh tra nhân dân và Ban Giám hiệu.
            </p>
          </div>

          {/* PHẦN VI */}
          <div id="sec-tradiem" className="space-y-2">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              VI. TRẢ BÀI, NHẬP ĐIỂM, PHÚC KHẢO VÀ KIỂM TRA BỔ SUNG
            </h4>
            <p className="indent-8">
              <strong>1. Quy trình trả bài trên lớp:</strong> Trong tuần từ ngày 09/11 đến ngày 14/11/2026, giáo viên bộ môn dành tối thiểu 01 tiết học trên lớp để sửa bài, hướng dẫn học sinh nhận diện lỗi sai, giải đáp thắc mắc. Khi phát bài, học sinh không được cầm bút bi hoặc gôm tẩy; đối chiếu điểm và ký tên xác nhận vào bảng điểm; giáo viên thu hồi toàn bộ bài kiểm tra để lưu hồ sơ chuyên môn theo quy định.
            </p>
            <p className="indent-8">
              <strong>2. Nhập điểm lên hệ thống CSDL ngành:</strong> Giáo viên bộ môn hoàn thành nhập điểm thường xuyên và điểm giữa kỳ lên hệ thống VnEdu/CSDL ngành <strong>trước 17h00 ngày 11/11/2026</strong>. Giáo viên chủ nhiệm rà soát, đối soát và xuất phiếu báo điểm cho phụ huynh học sinh.
            </p>
            <p className="indent-8">
              <strong>3. Phúc khảo bài kiểm tra:</strong> Tiếp nhận Đơn xin phúc khảo trong vòng 03 ngày kể từ ngày công bố điểm; Ban Phúc khảo rút phách, chấm phúc khảo và công bố kết quả trong vòng 03 ngày làm việc.
            </p>
            <p className="indent-8">
              <strong>4. Kiểm tra bổ sung (kiểm tra bù):</strong> Học sinh vắng có lý do chính đáng (ốm đau có xác nhận y tế, lý do bất khả kháng) được tham gia kiểm tra bù bằng ĐỀ KIỂM TRA DỰ BỊ vào ngày <strong>12/11/2026</strong>. Học sinh vắng không lý do nhận điểm 0 theo quy chế.
            </p>
          </div>

          {/* PHẦN VII */}
          <div id="sec-tiendo" className="space-y-3">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              VII. KẾ HOẠCH TIẾN ĐỘ THỜI GIAN THỰC HIỆN CHI TIẾT
            </h4>

            {/* Bảng tiến độ */}
            <div className="overflow-x-auto my-3">
              <table className="w-full border-collapse border border-slate-900 text-[12pt] sm:text-[13pt]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="border border-slate-900 p-2 w-12">TT</th>
                    <th className="border border-slate-900 p-2">Nội dung công việc</th>
                    <th className="border border-slate-900 p-2 w-44">Thời gian thực hiện</th>
                    <th className="border border-slate-900 p-2">Người phụ trách / Phối hợp</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['1', 'Xây dựng và lấy ý kiến dự thảo Kế hoạch kiểm tra giữa học kỳ I', '12/10/2026', 'PHT Nguyễn Minh Trí, BGH'],
                    ['2', 'Ban hành chính thức Kế hoạch; phổ biến đến toàn thể GV, NV và HS tại 03 cơ sở', '16/10/2026', 'Hiệu trưởng, PHT, TTCM'],
                    ['3', 'Họp Tổ CM thống nhất ma trận, đặc tả; phát đề cương ôn tập cho học sinh', 'Trước 20/10/2026', 'Tổ trưởng CM, GV bộ môn'],
                    ['4', 'Ban hành Quyết định thành lập các Ban; phân công ra đề chính thức và dự bị', '21/10/2026', 'Hiệu trưởng, Thư ký Hội đồng'],
                    ['5', 'Tổ chức kiểm tra các môn tại lớp (GDTC, GDQPAN, HĐTNHN, Công nghệ...)', '26/10 - 31/10/2026', 'Giáo viên bộ môn theo TKB'],
                    ['6', 'Tổ chức kiểm tra kỹ năng nói môn Tiếng Anh', '26/10 - 30/10/2026', 'Tổ Tiếng Anh, GV Tiếng Anh'],
                    ['7', 'Nộp đề kiểm tra niêm phong kèm ma trận, đặc tả, đáp án về Thư ký BGH', 'Trước 11h00 ngày 24/10/2026', 'Giáo viên ra đề'],
                    ['8', 'Thẩm định, duyệt đề và in sao, đóng gói, niêm phong đề kiểm tra tập trung', '27/10 - 30/10/2026', 'Ban In sao, PHT Nguyễn Minh Trí'],
                    ['9', 'Chuẩn bị phòng thi, số báo danh, danh sách thí sinh tại 03 cơ sở', 'Trước 31/10/2026', 'PHT cơ sở, Tổ VP, Giám thị'],
                    ['10', 'TỔ CHỨC KIỂM TRA TẬP TRUNG TẠI 03 CƠ SỞ (Tuần 9)', '02/11 - 06/11/2026', 'Ban Coi kiểm tra, Toàn trường'],
                    ['11', 'Làm phách, bảo mật phách bài thi tự luận', '06/11/2026 (sau mỗi buổi)', 'Ban Làm phách, Thư ký'],
                    ['12', 'Chấm bài kiểm tra tập trung (chấm máy trắc nghiệm và tự luận 2 vòng)', '04/11 - 08/11/2026', 'Ban Chấm kiểm tra, TTCM, GV'],
                    ['13', 'Hồi phách, ghép điểm và nhập điểm lên hệ thống VnEdu/CSDL ngành', 'Trước 17h00 ngày 11/11/2026', 'Tổ Thư ký, Giáo viên bộ môn'],
                    ['14', 'Trả bài, sửa bài trên lớp cho học sinh; đối chiếu và ký biên bản xác nhận', '09/11 - 14/11/2026', 'Giáo viên bộ môn'],
                    ['15', 'Tổ chức kiểm tra bổ sung cho học sinh vắng có lý do', '12/11/2026', 'BGH, GVBM liên quan'],
                    ['16', 'Tiếp nhận đơn và tổ chức chấm phúc khảo bài kiểm tra', '12/11 - 16/11/2026', 'Văn phòng, Ban Phúc khảo'],
                    ['17', 'Họp Tổ CM rút kinh nghiệm; lập kế hoạch phụ đạo học sinh yếu', '16/11 - 18/11/2026', 'Tổ trưởng chuyên môn, GV bộ môn'],
                    ['18', 'Tổng hợp kết quả toàn trường, đánh giá chất lượng và báo cáo Sở GDĐT', 'Trước 20/11/2026', 'PHT Nguyễn Minh Trí, Hiệu trưởng']
                  ].map(([tt, nd, tg, pt]) => (
                    <tr key={tt} className={tt === '10' ? 'bg-amber-50/80 font-bold' : ''}>
                      <td className="border border-slate-900 p-2 text-center">{tt}</td>
                      <td className="border border-slate-900 p-2">{nd}</td>
                      <td className="border border-slate-900 p-2 text-center">{tg}</td>
                      <td className="border border-slate-900 p-2">{pt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PHẦN VIII */}
          <div id="sec-tochuc" className="space-y-2">
            <h4 className="font-bold uppercase text-[14pt] text-slate-950">
              VIII. TỔ CHỨC THỰC HIỆN VÀ PHÂN CÔNG TRÁCH NHIỆM
            </h4>
            <p className="indent-8">
              <strong>1. Ban Giám hiệu:</strong>
            </p>
            <p className="indent-12">
              - <em>Hiệu trưởng:</em> Chỉ đạo toàn diện; ban hành Kế hoạch, các Quyết định thành lập Ban; trực tiếp phê duyệt đề chính thức; chịu trách nhiệm cao nhất về bảo mật và kỷ cương.
            </p>
            <p className="indent-12">
              - <em>Phó Hiệu trưởng phụ trách chuyên môn (Thầy Nguyễn Minh Trí):</em> Điều hành chung tiến độ chuyên môn; trực tiếp duyệt ma trận, bản đặc tả; chỉ đạo in sao, bảo mật đề và điều phối coi, chấm thi tại Trụ sở chính (khối 10, 11, 12); tổng hợp báo cáo toàn trường.
            </p>
            <p className="indent-12">
              - <em>Các Phó Hiệu trưởng phụ trách Điểm trường (Điểm Đốc Binh Kiều & Tân Kiều):</em> Chịu trách nhiệm trực tiếp công tác chuẩn bị cơ sở vật chất, phòng thi, điều hành Ban Coi kiểm tra tại điểm trường; bảo đảm giao nhận đề và bài thi đúng quy trình bảo mật; giải quyết kịp thời các tình huống phát sinh tại chỗ.
            </p>
            <p className="indent-8">
              <strong>2. Tổ trưởng, Nhóm trưởng chuyên môn:</strong> Tổ chức thống nhất ma trận, đặc tả, đề cương; phân công ra đề; tổ chức thống nhất đáp án và chấm bài 2 vòng độc lập; chủ trì họp rút kinh nghiệm sau kiểm tra.
            </p>
            <p className="indent-8">
              <strong>3. Giáo viên bộ môn:</strong> Dạy đúng phân phối chương trình, ôn tập chu đáo; thực hiện nhiệm vụ ra đề, coi, chấm, sửa bài và nhập điểm đúng hạn.
            </p>
            <p className="indent-8">
              <strong>4. Giáo viên chủ nhiệm:</strong> Phổ biến lịch kiểm tra, nội quy đến học sinh và cha mẹ học sinh; theo dõi sĩ số, động viên học sinh; phối hợp lập hồ sơ kiểm tra bổ sung đối với học sinh vắng có lý do chính đáng.
            </p>
            <p className="indent-8">
              <strong>5. Bộ phận Văn phòng, Kế toán, Thiết bị, Y tế và Bảo vệ:</strong> Chuẩn bị đủ biểu mẫu, giấy thi, loa kiểm tra nghe Tiếng Anh; bảo đảm an ninh trật tự, an toàn phòng thi, y tế sơ cấp cứu; bảo đảm kinh phí tổ chức theo quy định.
            </p>
            <p className="indent-8 italic text-slate-800 pt-2">
              Trên đây là Kế hoạch tổ chức kiểm tra, đánh giá giữa học kỳ I năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều. Ban Giám hiệu yêu cầu tất cả các tổ chuyên môn, đoàn thể, cán bộ, giáo viên, nhân viên và học sinh toàn trường nghiêm túc triển khai thực hiện./.
            </p>
          </div>
        </div>

        {/* 5. Nơi Nhận & Chữ Ký Ban Giám Hiệu Chuẩn Nghị Định 30 */}
        <div className="grid grid-cols-12 gap-4 pt-10 mt-6 border-t border-slate-200">
          {/* Nơi nhận (Bên trái, font 11-12pt nghiêng) */}
          <div className="col-span-6 space-y-1">
            <p className="font-bold italic text-[12pt] text-slate-900">
              Nơi nhận:
            </p>
            <ul className="text-[11pt] space-y-0.5 text-slate-800">
              <li>- Sở GDĐT Đồng Tháp (để báo cáo);</li>
              <li>- Ban Giám hiệu (để chỉ đạo, thực hiện);</li>
              <li>- Các Tổ CM, Tổ VP (để thực hiện);</li>
              <li>- 03 Điểm trường (để thực hiện);</li>
              <li>- Ban ĐD Cha mẹ học sinh (để phối hợp);</li>
              <li>- Đoàn trường, Đội TNTP (để phối hợp);</li>
              <li>- Website trường (để công khai);</li>
              <li>- Lưu: VT, CM.</li>
            </ul>
          </div>

          {/* Chữ ký Hiệu trưởng / Phó hiệu trưởng (Bên phải) */}
          <div className="col-span-6 text-center space-y-1">
            <p className="font-bold uppercase text-[13pt] sm:text-[14pt] text-slate-900">
              KT. HIỆU TRƯỞNG<br />PHÓ HIỆU TRƯỞNG
            </p>
            <div className="h-20 sm:h-24 flex items-center justify-center">
              <span className="text-xs italic text-slate-400">
                (Đã ký và đóng dấu theo quy chế)
              </span>
            </div>
            <p className="font-bold text-[14pt] text-slate-950 uppercase">
              Nguyễn Minh Trí
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PHỤ LỤC I: LỊCH KIỂM TRA THPT */}
        {/* ======================================================== */}
        <div id="sec-lichthpt" className="pt-12 mt-12 border-t-2 border-dashed border-slate-300">
          <div className="text-center space-y-1 mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold uppercase tracking-wider">
              Phụ lục I đính kèm Kế hoạch số 45/KH-THCS&THPTĐBK
            </span>
            <h3 className="text-[14pt] sm:text-[15pt] font-bold uppercase text-slate-900">
              LỊCH KIỂM TRA TẬP TRUNG GIỮA HỌC KỲ I — NĂM HỌC 2026 - 2027<br />
              CẤP TRUNG HỌC PHỔ THÔNG (TRỤ SỞ CHÍNH)
            </h3>
            <p className="italic text-xs text-slate-600">
              (Áp dụng cho 14 lớp với 529 học sinh khối 10, 11, 12 tại Điểm trường chính)
            </p>
          </div>

          {/* 1. Khối 11 & Khối 12 Buổi Sáng */}
          <div className="space-y-2 mb-6">
            <h5 className="font-bold text-slate-900 text-[13pt]">
              1. Khối 11 và Khối 12 (Kiểm tra buổi Sáng — Bắt đầu từ 7h30):
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-[11pt] sm:text-[12pt]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="border border-slate-900 p-2">Thứ, Ngày</th>
                    <th className="border border-slate-900 p-2">Giờ phát đề</th>
                    <th className="border border-slate-900 p-2">Giờ làm bài</th>
                    <th className="border border-slate-900 p-2">Môn kiểm tra</th>
                    <th className="border border-slate-900 p-2">Khối</th>
                    <th className="border border-slate-900 p-2">Thời lượng</th>
                    <th className="border border-slate-900 p-2">Hình thức & Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Thứ Hai, 02/11/2026', '7h25', '7h30 - 9h00', 'Ngữ văn', '11, 12', '90 phút', 'Tự luận 100% (Đọc hiểu + Viết ngoài SGK)'],
                    ['Thứ Hai, 02/11/2026', '9h25', '9h30 - 10h15', 'Vật lí', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                    ['Thứ Ba, 03/11/2026', '7h25', '7h30 - 9h00', 'Toán', '11, 12', '90 phút', 'Trắc nghiệm 3 phần + Tự luận (K12: 100% TN)'],
                    ['Thứ Ba, 03/11/2026', '9h25', '9h30 - 10h15', 'Sinh học', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                    ['Thứ Tư, 04/11/2026', '7h25', '7h30 - 8h30', 'Tiếng Anh', '11, 12', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết)'],
                    ['Thứ Tư, 04/11/2026', '8h55', '9h00 - 9h45', 'Địa lí', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                    ['Thứ Năm, 05/11/2026', '7h25', '7h30 - 8h15', 'Hóa học / GDKT&PL', '11, 12', '45 phút', 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn'],
                    ['Thứ Năm, 05/11/2026', '8h40', '8h45 - 9h30', 'Tin học / Công nghệ', '11, 12', '45 phút', 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn'],
                    ['Thứ Sáu, 06/11/2026', '7h25', '7h30 - 8h15', 'Lịch sử', '11, 12', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận']
                  ].map(([thu, phat, lam, mon, khoi, tl, gc], idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-900 p-2 text-center font-medium">{thu}</td>
                      <td className="border border-slate-900 p-2 text-center">{phat}</td>
                      <td className="border border-slate-900 p-2 text-center font-semibold">{lam}</td>
                      <td className="border border-slate-900 p-2 font-bold text-blue-900">{mon}</td>
                      <td className="border border-slate-900 p-2 text-center">{khoi}</td>
                      <td className="border border-slate-900 p-2 text-center">{tl}</td>
                      <td className="border border-slate-900 p-2">{gc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Khối 10 Buổi Chiều */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-[13pt]">
              2. Khối 10 (Kiểm tra buổi Chiều — Bắt đầu từ 13h30):
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-[11pt] sm:text-[12pt]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="border border-slate-900 p-2">Thứ, Ngày</th>
                    <th className="border border-slate-900 p-2">Giờ phát đề</th>
                    <th className="border border-slate-900 p-2">Giờ làm bài</th>
                    <th className="border border-slate-900 p-2">Môn kiểm tra</th>
                    <th className="border border-slate-900 p-2">Khối</th>
                    <th className="border border-slate-900 p-2">Thời lượng</th>
                    <th className="border border-slate-900 p-2">Hình thức & Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Thứ Hai, 02/11/2026', '13h25', '13h30 - 15h00', 'Ngữ văn', '10', '90 phút', 'Tự luận 100% (Đọc hiểu 4,0đ + Viết 6,0đ)'],
                    ['Thứ Hai, 02/11/2026', '15h25', '15h30 - 16h15', 'Vật lí', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                    ['Thứ Ba, 03/11/2026', '13h25', '13h30 - 15h00', 'Toán', '10', '90 phút', 'Trắc nghiệm 3 phần + Tự luận'],
                    ['Thứ Ba, 03/11/2026', '15h25', '15h30 - 16h15', 'Sinh học', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                    ['Thứ Tư, 04/11/2026', '13h25', '13h30 - 14h30', 'Tiếng Anh', '10', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết)'],
                    ['Thứ Tư, 04/11/2026', '14h55', '15h00 - 15h45', 'Địa lí', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận'],
                    ['Thứ Năm, 05/11/2026', '13h25', '13h30 - 14h15', 'Hóa học / GDKT&PL', '10', '45 phút', 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn'],
                    ['Thứ Năm, 05/11/2026', '14h40', '14h45 - 15h30', 'Tin học / Công nghệ', '10', '45 phút', 'Cùng khung giờ, phòng và đề riêng theo môn lựa chọn'],
                    ['Thứ Sáu, 06/11/2026', '13h25', '13h30 - 14h15', 'Lịch sử', '10', '45 phút', 'Trắc nghiệm định dạng mới kết hợp Tự luận']
                  ].map(([thu, phat, lam, mon, khoi, tl, gc], idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-900 p-2 text-center font-medium">{thu}</td>
                      <td className="border border-slate-900 p-2 text-center">{phat}</td>
                      <td className="border border-slate-900 p-2 text-center font-semibold">{lam}</td>
                      <td className="border border-slate-900 p-2 font-bold text-blue-900">{mon}</td>
                      <td className="border border-slate-900 p-2 text-center">{khoi}</td>
                      <td className="border border-slate-900 p-2 text-center">{tl}</td>
                      <td className="border border-slate-900 p-2">{gc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PHỤ LỤC II: LỊCH KIỂM TRA THCS */}
        {/* ======================================================== */}
        <div id="sec-lichthcs" className="pt-12 mt-12 border-t-2 border-dashed border-slate-300">
          <div className="text-center space-y-1 mb-6">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold uppercase tracking-wider">
              Phụ lục II đính kèm Kế hoạch số 45/KH-THCS&THPTĐBK
            </span>
            <h3 className="text-[14pt] sm:text-[15pt] font-bold uppercase text-slate-900">
              LỊCH KIỂM TRA TẬP TRUNG GIỮA HỌC KỲ I — NĂM HỌC 2026 - 2027<br />
              CẤP TRUNG HỌC CƠ SỞ (ĐIỂM ĐỐC BINH KIỀU & ĐIỂM TÂN KIỀU)
            </h3>
            <p className="italic text-xs text-slate-600">
              (Áp dụng đồng bộ cho 39 lớp với 1.582 học sinh khối 6, 7, 8, 9 tại cả 02 cơ sở THCS)
            </p>
          </div>

          {/* 1. Khối 8 & Khối 9 Buổi Sáng */}
          <div className="space-y-2 mb-6">
            <h5 className="font-bold text-slate-900 text-[13pt]">
              1. Khối 8 và Khối 9 (Kiểm tra buổi Sáng — Bắt đầu từ 7h30):
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-[11pt] sm:text-[12pt]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="border border-slate-900 p-2">Thứ, Ngày</th>
                    <th className="border border-slate-900 p-2">Giờ phát đề</th>
                    <th className="border border-slate-900 p-2">Giờ làm bài</th>
                    <th className="border border-slate-900 p-2">Môn kiểm tra</th>
                    <th className="border border-slate-900 p-2">Thời lượng</th>
                    <th className="border border-slate-900 p-2">Hình thức & Cấu trúc đề</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Thứ Hai, 02/11/2026', '7h25', '7h30 - 9h00', 'Ngữ văn 8, 9', '90 phút', 'Tự luận 100% (Khối 9: Đọc hiểu 5đ + Viết 5đ; Khối 8: Đọc hiểu 6đ + Viết 4đ)'],
                    ['Thứ Hai, 02/11/2026', '9h25', '9h30 - 10h15', 'Giáo dục công dân 8, 9', '45 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                    ['Thứ Ba, 03/11/2026', '7h25', '7h30 - 9h00', 'Toán 8, 9', '90 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                    ['Thứ Ba, 03/11/2026', '9h25', '9h30 - 10h30', 'Lịch sử và Địa lí 8, 9', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                    ['Thứ Tư, 04/11/2026', '7h25', '7h30 - 8h30', 'Tiếng Anh 8, 9', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết; Nói thi trước)'],
                    ['Thứ Tư, 04/11/2026', '8h55', '9h00 - 10h00', 'Khoa học tự nhiên 8, 9', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)']
                  ].map(([thu, phat, lam, mon, tl, ht], idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-900 p-2 text-center font-medium">{thu}</td>
                      <td className="border border-slate-900 p-2 text-center">{phat}</td>
                      <td className="border border-slate-900 p-2 text-center font-semibold">{lam}</td>
                      <td className="border border-slate-900 p-2 font-bold text-emerald-900">{mon}</td>
                      <td className="border border-slate-900 p-2 text-center">{tl}</td>
                      <td className="border border-slate-900 p-2">{ht}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Khối 6 & Khối 7 Buổi Chiều */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-[13pt]">
              2. Khối 6 và Khối 7 (Kiểm tra buổi Chiều — Bắt đầu từ 13h30):
            </h5>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-[11pt] sm:text-[12pt]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-center">
                    <th className="border border-slate-900 p-2">Thứ, Ngày</th>
                    <th className="border border-slate-900 p-2">Giờ phát đề</th>
                    <th className="border border-slate-900 p-2">Giờ làm bài</th>
                    <th className="border border-slate-900 p-2">Môn kiểm tra</th>
                    <th className="border border-slate-900 p-2">Thời lượng</th>
                    <th className="border border-slate-900 p-2">Hình thức & Cấu trúc đề</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Thứ Hai, 02/11/2026', '13h25', '13h30 - 15h00', 'Ngữ văn 6, 7', '90 phút', 'Tự luận 100% (Đọc hiểu 6,0đ + Viết 4,0đ ngoài SGK)'],
                    ['Thứ Hai, 02/11/2026', '15h25', '15h30 - 16h15', 'Giáo dục công dân 6, 7', '45 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                    ['Thứ Ba, 03/11/2026', '13h25', '13h30 - 15h00', 'Toán 6, 7', '90 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                    ['Thứ Ba, 03/11/2026', '15h25', '15h30 - 16h30', 'Lịch sử và Địa lí 6, 7', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)'],
                    ['Thứ Tư, 04/11/2026', '13h25', '13h30 - 14h30', 'Tiếng Anh 6, 7', '60 phút', 'Trắc nghiệm + Tự luận (Nghe, Đọc, Viết; Nói thi trước)'],
                    ['Thứ Tư, 04/11/2026', '14h55', '15h00 - 16h00', 'Khoa học tự nhiên 6, 7', '60 phút', 'Trắc nghiệm khách quan (7,0đ) + Tự luận (3,0đ)']
                  ].map(([thu, phat, lam, mon, tl, ht], idx) => (
                    <tr key={idx}>
                      <td className="border border-slate-900 p-2 text-center font-medium">{thu}</td>
                      <td className="border border-slate-900 p-2 text-center">{phat}</td>
                      <td className="border border-slate-900 p-2 text-center font-semibold">{lam}</td>
                      <td className="border border-slate-900 p-2 font-bold text-emerald-900">{mon}</td>
                      <td className="border border-slate-900 p-2 text-center">{tl}</td>
                      <td className="border border-slate-900 p-2">{ht}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-500 italic print:hidden">
          Văn bản chuẩn hành chính lưu trữ chính thức tại Trường THCS và THPT Đốc Binh Kiều. Bạn có thể bấm "Xuất File Word (.docx)" ở thanh công cụ phía trên để tải bản Word gốc định dạng chuẩn Nghị định 30/2020/NĐ-CP.
        </div>
      </div>
    </div>
  );
};

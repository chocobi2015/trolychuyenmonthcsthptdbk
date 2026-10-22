import React, { useState } from 'react';
import {
  Download,
  Printer,
  Copy,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Building,
  Users,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Search,
  BookOpen
} from 'lucide-react';
import {
  SCHOOL_INSPECTION_BACKGROUND,
  SCHOOL_INSPECTION_OBJECTIVES,
  DETAILED_INSPECTION_PILLARS_UNABRIDGED,
  MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR
} from '../data/detailedInspectionPlanFullText';
import { SCHOOL_INSPECTION_COMMITTEE } from '../data/internalInspectionData';

export const ComprehensiveInspectionPlanDoc: React.FC = () => {
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({
    'pillar-01': true,
    'pillar-02': true,
    'pillar-03': true,
    'pillar-04': true,
    'pillar-05': true,
    'pillar-06': true,
    'pillar-07': true,
    'pillar-08': true,
    'pillar-09': true,
    'pillar-10': true,
    'pillar-11': true,
  });
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterCampus, setFilterCampus] = useState<string>('all');
  const [searchDocTerm, setSearchDocTerm] = useState<string>('');
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const toggleAllPillars = (expand: boolean) => {
    const newState: Record<string, boolean> = {};
    DETAILED_INSPECTION_PILLARS_UNABRIDGED.forEach((p) => {
      newState[p.id] = expand;
    });
    setExpandedPillars(newState);
  };

  const togglePillar = (id: string) => {
    setExpandedPillars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyFullPlan = () => {
    const docSummary = `KẾ HOẠCH CÔNG TÁC KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027
TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU
(Kế thừa hoàn chỉnh Kế hoạch 76 THPT ĐBK + Kế hoạch 134 THCS Tân Kiều + Hướng dẫn 1134 Sở GDĐT Đồng Tháp)
Quy mô: 53 lớp, 2.111 học sinh, 120 CB-GV-NV tại 3 điểm trường (Điểm chính THPT, Điểm THCS ĐBK, Điểm THCS Tân Kiều cách 11km).
11 Trụ cột kiểm tra bóc tách chi tiết và 29 đợt kiểm tra lớn trải dài 12 tháng (từ tháng 9/2026 đến tháng 8/2027).
Hiệu trưởng: Lê Thanh Cường đã ký ban hành.`;
    navigator.clipboard.writeText(docSummary);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredMonthlyInspections = MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR.filter((item) => {
    const matchMonth = filterMonth === 'all' || item.month.includes(filterMonth);
    const matchCampus = filterCampus === 'all' || item.campus.includes(filterCampus);
    const matchSearch =
      searchDocTerm === '' ||
      item.title.toLowerCase().includes(searchDocTerm.toLowerCase()) ||
      item.target.toLowerCase().includes(searchDocTerm.toLowerCase()) ||
      item.leadInspector.toLowerCase().includes(searchDocTerm.toLowerCase());
    return matchMonth && matchCampus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Action Bar & Quick TOC */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-2 z-20 backdrop-blur-md bg-white/95">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Mục lục nhanh:
            </span>
            <a href="#sec-header" className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-100 text-[11px] font-medium text-slate-700 hover:text-blue-700 transition">
              Căn cứ pháp lý
            </a>
            <a href="#sec-part-a" className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-100 text-[11px] font-medium text-slate-700 hover:text-blue-700 transition">
              A. Đặc điểm tình hình (3 điểm trường)
            </a>
            <a href="#sec-part-b" className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-100 text-[11px] font-medium text-slate-700 hover:text-blue-700 transition">
              B. Mục đích & Yêu cầu
            </a>
            <a href="#sec-part-c" className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-[11px] font-bold text-blue-700 transition">
              C. Bóc tách 11 Trụ cột kiểm tra
            </a>
            <a href="#sec-part-d" className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-[11px] font-bold text-indigo-700 transition">
              D. Lịch trình 29 đợt (12 tháng)
            </a>
            <a href="#sec-part-e" className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-100 text-[11px] font-medium text-slate-700 hover:text-blue-700 transition">
              E. Kinh phí (11km)
            </a>
            <a href="#sec-part-f" className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-100 text-[11px] font-medium text-slate-700 hover:text-blue-700 transition">
              F. Tổ chức thực hiện
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => toggleAllPillars(true)}
              className="px-2.5 py-1.5 rounded text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
            >
              Mở rộng tất cả
            </button>
            <button
              onClick={() => toggleAllPillars(false)}
              className="px-2.5 py-1.5 rounded text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
            >
              Thu gọn
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              title="In hoặc lưu dạng PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In văn bản</span>
            </button>
            <button
              onClick={handleCopyFullPlan}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              title="Sao chép tóm lược toàn văn"
            >
              {copyFeedback ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyFeedback ? 'Đã sao chép!' : 'Sao chép'}</span>
            </button>
            <a
              href="/downloads/KE_HOACH_KIEM_TRA_NOI_BO_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx"
              download
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file Word hoàn chỉnh (.docx)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Official Administrative Document Container */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-300 p-8 sm:p-12 space-y-10 font-serif text-slate-900 leading-relaxed text-sm">
        
        {/* Quốc hiệu, Tiêu ngữ & Tiêu đề cơ quan */}
        <div id="sec-header" className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b-2 border-slate-300">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs uppercase font-medium tracking-wide text-slate-600">
              SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP
            </div>
            <div className="text-sm uppercase font-bold text-slate-900">
              TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU
            </div>
            <div className="w-32 h-0.5 bg-slate-400 mx-auto sm:mx-0 my-1" />
            <div className="text-xs font-semibold text-slate-700">
              Số: 48/KH-THCS&THPTĐBK
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="text-xs uppercase font-bold tracking-wide text-slate-900">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div className="text-xs font-bold underline decoration-slate-400 text-slate-800">
              Độc lập - Tự do - Hạnh phúc
            </div>
            <div className="text-xs italic text-slate-600 pt-1">
              Tháp Mười, ngày 15 tháng 10 năm 2026
            </div>
          </div>
        </div>

        {/* Tiêu đề Kế hoạch */}
        <div className="text-center space-y-2 py-4">
          <div className="text-2xl sm:text-3xl font-extrabold uppercase text-slate-900 font-sans tracking-tight">
            KẾ HOẠCH
          </div>
          <div className="text-lg sm:text-xl font-bold uppercase text-blue-900 font-sans">
            CÔNG TÁC KIỂM TRA NỘI BỘ NĂM HỌC 2026 - 2027
          </div>
          <p className="text-xs italic text-slate-600 max-w-3xl mx-auto leading-normal">
            (Bản bóc tách chi tiết toàn diện: Kết hợp hoàn chỉnh giữa Kế hoạch số 76/KH-THPT ĐBK và Kế hoạch số 134/KH-THCS.TK của hai trường trước sáp nhập; bám sát Hướng dẫn số 1134/SGDĐT-TCCB của Sở GDĐT Đồng Tháp và chuẩn 120 nhân sự từ tệp NHÂN SỰ MỚI.xlsx)
          </p>
        </div>

        {/* Căn cứ pháp lý */}
        <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200 text-xs italic text-slate-700 space-y-1.5 leading-relaxed font-sans">
          <div className="font-bold text-slate-900 not-italic uppercase mb-2">Căn cứ pháp lý ban hành:</div>
          <div>- Căn cứ Luật Giáo dục ngày 14 tháng 6 năm 2019;</div>
          <div>- Căn cứ Luật Thanh tra ngày 14 tháng 11 năm 2022; Luật Thực hiện dân chủ ở cơ sở ngày 10 tháng 11 năm 2022;</div>
          <div>- Căn cứ Nghị định số 217/2025/NĐ-CP ngày 05 tháng 8 năm 2025 của Chính phủ về hoạt động kiểm tra chuyên ngành;</div>
          <div>- Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15 tháng 9 năm 2020 của Bộ GDĐT ban hành Điều lệ trường THCS, trường THPT và trường phổ thông có nhiều cấp học;</div>
          <div>- Căn cứ Thông tư số 22/2021/TT-BGDĐT ngày 20 tháng 7 năm 2021 của Bộ GDĐT quy định về đánh giá học sinh trung học cơ sở và học sinh trung học phổ thông;</div>
          <div>- Căn cứ Quyết định số 2606/QĐ-UBND ngày 13 tháng 8 năm 2026 của UBND tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều;</div>
          <div>- Căn cứ Công văn số 3953/SGDĐT-TCCB ngày 08 tháng 10 năm 2026 của Sở GDĐT Đồng Tháp V/v thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027;</div>
          <div>- Căn cứ Hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở GDĐT Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục trực thuộc;</div>
          <div>- Căn cứ Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25 tháng 9 năm 2026 của Trường THCS và THPT Đốc Binh Kiều,</div>
          <div className="not-italic font-medium text-slate-900 pt-2">
            Trường THCS và THPT Đốc Binh Kiều xây dựng Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 với các nội dung bóc tách chi tiết như sau:
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHẦN A: ĐẶC ĐIỂM TÌNH HÌNH */}
        {/* ========================================================================= */}
        <section id="sec-part-a" className="space-y-4">
          <div className="flex items-center gap-3 border-b-2 border-blue-800 pb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-800 text-white font-sans font-bold flex items-center justify-center text-sm shrink-0">
              A
            </span>
            <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900 font-sans">
              Đặc Điểm Tình Hình Của Nhà Trường Sau Sáp Nhập
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm font-sans">
            <h3 className="font-bold text-slate-900 text-sm">
              I. Khái quát quy mô trường lớp, học sinh, đội ngũ và cơ sở vật chất
            </h3>

            {/* 1. Quy mô 3 điểm trường */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-900">
                1. Quy mô các khối lớp học và số liệu huy động học sinh năm học 2026 - 2027:
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Năm học 2026 - 2027 là năm học đầu tiên nhà trường vận hành theo mô hình trường phổ thông liên cấp sau sáp nhập theo Quyết định số 2606/QĐ-UBND của UBND tỉnh Đồng Tháp. Toàn trường có tổng số <strong>53 lớp học</strong> với <strong>2.111 học sinh</strong> được tổ chức tại 3 điểm trường độc lập:
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 font-bold text-slate-800 border-b border-slate-200">
                    <tr>
                      <th className="p-3">Điểm trường & Địa chỉ</th>
                      <th className="p-3 text-center">Số lớp</th>
                      <th className="p-3 text-center">Học sinh</th>
                      <th className="p-3">Khối lớp vận hành</th>
                      <th className="p-3">Đặc thù & Nhiệm vụ trọng tâm</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {SCHOOL_INSPECTION_BACKGROUND.studentScale.campusBreakdown.map((cp, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">
                          <div>{cp.campusName}</div>
                          <div className="text-[11px] font-normal text-slate-500">{cp.address}</div>
                        </td>
                        <td className="p-3 text-center font-bold text-blue-700">{cp.classesCount} lớp</td>
                        <td className="p-3 text-center font-bold text-emerald-700">{cp.studentsCount} HS</td>
                        <td className="p-3 font-medium text-slate-700">{cp.grades}</td>
                        <td className="p-3 text-slate-600 text-[11px] leading-relaxed">{cp.specialFeatures}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50/80 font-bold text-slate-900">
                      <td className="p-3">TỔNG CỘNG TOÀN TRƯỜNG</td>
                      <td className="p-3 text-center text-blue-800">53 lớp</td>
                      <td className="p-3 text-center text-emerald-800">2.111 học sinh</td>
                      <td className="p-3">Khối 6, 7, 8, 9, 10, 11, 12</td>
                      <td className="p-3 text-blue-900">Có 25 học sinh khuyết tật học hòa nhập</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Đội ngũ 120 CB-GV-NV */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-900">
                2. Đội ngũ cán bộ quản lý, giáo viên, nhân viên (Chuẩn 120 nhân sự từ NHÂN SỰ MỚI):
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Đội ngũ sư phạm gồm <strong>120 cán bộ, giáo viên, nhân viên</strong> (Nữ: {SCHOOL_INSPECTION_BACKGROUND.staffScale.femaleCount}, Nam: {SCHOOL_INSPECTION_BACKGROUND.staffScale.maleCount}). Trong đó:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <li className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <strong>Trình độ chuyên môn:</strong> 100% đạt chuẩn theo Luật Giáo dục 2019; có <strong>09 Thạc sĩ</strong> chuyên ngành và QLGD.
                </li>
                <li className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <strong>Công tác Đảng:</strong> Có <strong>85 Đảng viên</strong> (đạt tỷ lệ 70.8%), luôn gương mẫu đi đầu trong mọi phong trào.
                </li>
                <li className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <strong>Trình độ CNTT & Ngoại ngữ:</strong> 100% có chứng chỉ CNTT; 78.5% đạt chuẩn năng lực Ngoại ngữ theo quy định.
                </li>
                <li className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <strong>Cơ cấu quản lý:</strong> Ban Giám hiệu 04 thành viên; 07 Tổ chuyên môn liên cấp và 01 Tổ Văn phòng.
                </li>
              </ul>

              {/* Bảng phân bổ 8 tổ chuyên môn */}
              <div className="mt-2 border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-100 p-2.5 text-xs font-bold text-slate-800 border-b border-slate-200">
                  Cơ cấu 08 Tổ chuyên môn và Tổ phục vụ sau sáp nhập:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-xs">
                  <div className="p-3 space-y-1.5">
                    {SCHOOL_INSPECTION_BACKGROUND.staffScale.departmentCounts.slice(0, 4).map((d, i) => (
                      <div key={i} className="flex items-start justify-between gap-2 pb-1 border-b border-slate-100 last:border-0">
                        <div>
                          <span className="font-semibold text-slate-900">{d.name}</span>
                          <div className="text-[11px] text-slate-500">Phụ trách: {d.head}</div>
                        </div>
                        <span className="font-bold text-blue-700 shrink-0">{d.count} người</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 space-y-1.5">
                    {SCHOOL_INSPECTION_BACKGROUND.staffScale.departmentCounts.slice(4).map((d, i) => (
                      <div key={i} className="flex items-start justify-between gap-2 pb-1 border-b border-slate-100 last:border-0">
                        <div>
                          <span className="font-semibold text-slate-900">{d.name}</span>
                          <div className="text-[11px] text-slate-500">Phụ trách: {d.head}</div>
                        </div>
                        <span className="font-bold text-blue-700 shrink-0">{d.count} người</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Cơ sở vật chất */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-900">
                3. Cơ sở vật chất, trang thiết bị dạy học hiện có tại 3 điểm trường:
              </h4>
              <p className="text-slate-700 leading-relaxed">
                Hệ thống cơ sở vật chất tích hợp từ 3 đơn vị trường cũ gồm: <strong>53 phòng học</strong> kiên cố và bán kiên cố; <strong>22 phòng bộ môn</strong> (gồm 8 phòng thí nghiệm Lý - Hóa - Sinh, 5 phòng máy vi tính với <strong>165 máy tính</strong> kết nối Internet an toàn, phòng Ngoại ngữ, phòng Đa năng, Âm nhạc, Mỹ thuật); <strong>03 thư viện</strong> chuẩn với trên 15.000 bản sách; <strong>03 phòng y tế học đường</strong> có trang thiết bị sơ cấp cứu; 13 tủ chữa cháy vách tường, 03 máy bơm chữa cháy công suất lớn, 48 bình chữa cháy và 38 camera giám sát an ninh.
              </p>
            </div>

            {/* II. Thuận lợi & Khó khăn */}
            <div className="space-y-3 pt-3">
              <h3 className="font-bold text-slate-900 text-sm">
                II. Đánh giá Thuận lợi và Khó khăn
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <div className="font-bold text-emerald-900 text-xs uppercase mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    1. Thuận lợi cơ bản:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {SCHOOL_INSPECTION_BACKGROUND.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                  <div className="font-bold text-amber-900 text-xs uppercase mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    2. Khó khăn, thách thức cần giải quyết:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {SCHOOL_INSPECTION_BACKGROUND.challenges.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN B: MỤC ĐÍCH YÊU CẦU */}
        {/* ========================================================================= */}
        <section id="sec-part-b" className="space-y-4 pt-6 border-t border-slate-200 font-sans">
          <div className="flex items-center gap-3 border-b-2 border-blue-800 pb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
              B
            </span>
            <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
              Mục Đích, Yêu Cầu Của Công Tác Kiểm Tra Nội Bộ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-blue-900">
                I. Mục đích:
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {SCHOOL_INSPECTION_OBJECTIVES.purposes.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-indigo-900">
                II. Yêu cầu nghiệp vụ:
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {SCHOOL_INSPECTION_OBJECTIVES.requirements.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN C: BÓC TÁCH CHI TIẾT 11 TRỤ CỘT */}
        {/* ========================================================================= */}
        <section id="sec-part-c" className="space-y-6 pt-6 border-t border-slate-200 font-sans">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-blue-800 pb-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
                C
              </span>
              <div>
                <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
                  Nội Dung Kiểm Tra Cụ Thể - Bóc Tách Chi Tiết 11 Lĩnh Vực
                </h2>
                <div className="text-xs text-slate-500 font-normal">
                  Hợp nhất toàn bộ nội dung từ Kế hoạch 76 (THPT ĐBK) & Kế hoạch 134 (THCS Tân Kiều)
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {DETAILED_INSPECTION_PILLARS_UNABRIDGED.map((pillar) => {
              const isExpanded = expandedPillars[pillar.id] !== false;
              return (
                <div
                  key={pillar.id}
                  className="border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-blue-300 transition"
                >
                  {/* Pillar Accordion Header */}
                  <div
                    onClick={() => togglePillar(pillar.id)}
                    className="p-4 bg-slate-50/90 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between gap-3 border-b border-slate-200 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                        {pillar.orderNumber}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {pillar.domainName}
                        </h4>
                        <div className="text-[11px] text-indigo-700 italic mt-0.5">
                          {pillar.sourceOrigin}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                        {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  </div>

                  {/* Pillar Body */}
                  {isExpanded && (
                    <div className="p-5 space-y-4 text-xs bg-white">
                      {/* Metric Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Kiểm tra toàn diện:</span>
                          <span className="font-semibold text-purple-700">{pillar.formatsAndMetrics.comprehensiveRate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Kiểm tra chuyên đề:</span>
                          <span className="font-semibold text-blue-700">{pillar.formatsAndMetrics.thematicRate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Kiểm tra đột xuất:</span>
                          <span className="font-semibold text-amber-700">{pillar.formatsAndMetrics.surpriseRate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Thời gian thực hiện:</span>
                          <span className="font-semibold text-emerald-700">{pillar.formatsAndMetrics.implementationTime}</span>
                        </div>
                      </div>

                      {/* Đối tượng & Lực lượng */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                          <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5 text-blue-900">
                            <Building className="w-3.5 h-3.5 text-blue-600" />
                            {pillar.orderNumber}.1. Đối tượng kiểm tra cụ thể:
                          </h5>
                          <ul className="space-y-1 text-slate-700 list-disc list-inside">
                            {pillar.targetsDetail.map((t, idx) => (
                              <li key={idx} className="leading-relaxed">{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                          <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5 text-indigo-900">
                            <Users className="w-3.5 h-3.5 text-indigo-600" />
                            {pillar.orderNumber}.2. Lực lượng kiểm tra (Phân công tên thật):
                          </h5>
                          <div className="space-y-1 text-slate-700">
                            <div><strong>Trưởng đoàn:</strong> {pillar.inspectionForce.lead}</div>
                            <div><strong>Phó Trưởng đoàn:</strong> {pillar.inspectionForce.deputies.join(', ')}</div>
                            <div className="text-[11px] text-slate-600">
                              <strong>Thành viên:</strong> {pillar.inspectionForce.members.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bóc tách chi tiết từng tiểu mục */}
                      <div className="space-y-3 pt-2">
                        <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-slate-900">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          {pillar.orderNumber}.3. Nội dung, tiêu chuẩn & hồ sơ bóc tách chi tiết:
                        </h5>
                        
                        <div className="space-y-3">
                          {pillar.breakdownSections.map((sec, sIdx) => (
                            <div key={sIdx} className="border border-slate-200 rounded-lg p-3 bg-slate-50/40">
                              <div className="font-bold text-slate-800 text-xs mb-1.5 text-blue-800">
                                {sec.heading}
                              </div>
                              <ul className="space-y-1.5 text-slate-700 text-xs">
                                {sec.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverable Records */}
                      <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 text-xs flex flex-wrap items-center gap-2">
                        <span className="font-bold text-emerald-900 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Sản phẩm & Hồ sơ kết luận:
                        </span>
                        {pillar.deliverableRecords.map((rec, rIdx) => (
                          <span key={rIdx} className="px-2 py-0.5 rounded bg-white text-emerald-800 border border-emerald-300 font-medium">
                            {rec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN D: LỊCH TRÌNH 29 ĐỢT KIỂM TRA 12 THÁNG */}
        {/* ========================================================================= */}
        <section id="sec-part-d" className="space-y-4 pt-6 border-t border-slate-200 font-sans">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-blue-800 pb-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
                D
              </span>
              <div>
                <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
                  Kế Hoạch Bóc Tách Chi Tiết Theo Từng Tháng Trong Năm Học (Trọn Vẹn 12 Tháng)
                </h2>
                <div className="text-xs text-slate-500 font-normal">
                  Từ Tháng 9/2026 đến Tháng 8/2027 · Tổng cộng 29 đợt kiểm tra lớn và chuyên đề
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold text-xs">
                {filteredMonthlyInspections.length} / 29 đợt hiển thị
              </span>
            </div>
          </div>

          {/* Filtering Tools */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium text-slate-700">Lọc theo tháng:</span>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="p-1.5 rounded border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none"
              >
                <option value="all">Toàn bộ 12 tháng</option>
                <option value="09/2026">Tháng 09/2026</option>
                <option value="10/2026">Tháng 10/2026</option>
                <option value="11/2026">Tháng 11/2026</option>
                <option value="12/2026">Tháng 12/2026</option>
                <option value="01/2027">Tháng 01/2027</option>
                <option value="02/2027">Tháng 02/2027</option>
                <option value="03/2027">Tháng 03/2027</option>
                <option value="04/2027">Tháng 04/2027</option>
                <option value="05/2027">Tháng 05/2027</option>
                <option value="06/2027">Tháng 06/2027 (Hè & Tốt nghiệp)</option>
                <option value="07/2027">Tháng 07/2027 (Tuyển sinh 10)</option>
                <option value="08/2027">Tháng 08/2027 (Chuẩn bị năm học mới)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium text-slate-700">Điểm trường:</span>
              <select
                value={filterCampus}
                onChange={(e) => setFilterCampus(e.target.value)}
                className="p-1.5 rounded border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none"
              >
                <option value="all">Tất cả điểm trường</option>
                <option value="Cả 3 điểm trường">Cả 3 điểm trường</option>
                <option value="Điểm chính (THPT)">Điểm chính (THPT)</option>
                <option value="Tân Kiều">Điểm THCS Tân Kiều (11km)</option>
                <option value="Đốc Binh Kiều">Điểm THCS Đốc Binh Kiều</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Tìm nội dung, đối tượng, người phụ trách..."
                value={searchDocTerm}
                onChange={(e) => setSearchDocTerm(e.target.value)}
                className="w-full px-3 py-1.5 rounded border border-slate-300 bg-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Full Schedule Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <thead className="bg-slate-100 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 text-center w-12">TT</th>
                    <th className="p-3 min-w-[130px]">Thời gian & Tháng</th>
                    <th className="p-3 min-w-[280px]">Nội dung kiểm tra & Nhiệm vụ cụ thể</th>
                    <th className="p-3 min-w-[200px]">Đối tượng & Điểm trường</th>
                    <th className="p-3 min-w-[170px]">Lực lượng kiểm tra</th>
                    <th className="p-3 min-w-[150px]">Sản phẩm & Căn cứ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredMonthlyInspections.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-blue-50/40 transition">
                      <td className="p-3 text-center font-bold text-slate-500 bg-slate-50/50">
                        {idx + 1}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-blue-900">{item.month}</div>
                        <div className="text-[11px] text-slate-600 font-mono mt-0.5">{item.timeframe}</div>
                        <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          item.category === 'Chuyên môn' ? 'bg-purple-100 text-purple-800' :
                          item.category === 'Nền nếp - Đoàn thể' ? 'bg-amber-100 text-amber-800' :
                          item.category === 'Tài chính - Cơ sở vật chất' ? 'bg-emerald-100 text-emerald-800' :
                          item.category === 'Khảo thí - Kiểm định' ? 'bg-rose-100 text-rose-800' :
                          'bg-sky-100 text-sky-800'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900 leading-snug">{item.title}</div>
                        <div className="mt-1 space-y-0.5 text-[11px] text-slate-600">
                          {item.specificTasks.map((t, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-1.5">
                              <span className="text-blue-500 font-bold">•</span>
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-800">{item.target}</div>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 mt-1">
                          <Building className="w-3 h-3 shrink-0" />
                          <span>{item.campus}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{item.leadInspector}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {item.teamMembers.slice(0, 3).join(', ')}
                          {item.teamMembers.length > 3 && ` (+${item.teamMembers.length - 3} người)`}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-emerald-800 text-[11px]">{item.expectedOutput}</div>
                        <div className="text-[10px] text-slate-500 italic mt-0.5">{item.legalBasis}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMonthlyInspections.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                Không tìm thấy đợt kiểm tra phù hợp với điều kiện tìm kiếm.
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN E: DỰ TRÙ KINH PHÍ */}
        {/* ========================================================================= */}
        <section id="sec-part-e" className="space-y-4 pt-6 border-t border-slate-200 font-sans">
          <div className="flex items-center gap-3 border-b-2 border-blue-800 pb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
              E
            </span>
            <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
              Dự Trù Kinh Phí Và Điều Kiện Đảm Bảo
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              1. <strong>Nguồn kinh phí:</strong> Sử dụng từ nguồn kinh phí chi thường xuyên của nhà trường năm học 2026 - 2027 và Quy chế chi tiêu nội bộ đã được Hội nghị cán bộ, công chức, viên chức thông qua.
            </p>
            <p>
              2. <strong>Chế độ thù lao và công tác phí:</strong> Thành viên Ban Kiểm tra nội bộ và các Đoàn kiểm tra được thanh toán chế độ kiêm nhiệm, hỗ trợ công tác phí theo quy định hiện hành của Nhà nước và Quy chế chi tiêu nội bộ của đơn vị.
            </p>
            <p>
              3. <strong>Hỗ trợ di chuyển giữa các điểm trường:</strong> Do đặc thù Điểm trường THCS Tân Kiều cách Điểm chính 11km, nhà trường bố trí định mức hỗ trợ xăng xe, phụ cấp di chuyển thực tế cho các thành viên đoàn kiểm tra khi thực hiện nhiệm vụ liên điểm trường.
            </p>
            <p>
              4. <strong>Văn phòng phẩm và in ấn tài liệu:</strong> Nhà trường bảo đảm đầy đủ văn phòng phẩm, in ấn biểu mẫu, lưu trữ hồ sơ nghiệp vụ cho Ban Kiểm tra nội bộ.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHẦN F: TỔ CHỨC THỰC HIỆN */}
        {/* ========================================================================= */}
        <section id="sec-part-f" className="space-y-4 pt-6 border-t border-slate-200 font-sans">
          <div className="flex items-center gap-3 border-b-2 border-blue-800 pb-2">
            <span className="w-8 h-8 rounded-lg bg-blue-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
              F
            </span>
            <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
              Tổ Chức Thực Hiện Và Phân Công Trách Nhiệm
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div>
              <strong>1. Trách nhiệm của Hiệu trưởng (Trưởng ban KTNB - Thầy Lê Thanh Cường):</strong>
              <p className="mt-1 pl-4 border-l-2 border-blue-600">
                Chịu trách nhiệm toàn diện trước Giám đốc Sở GDĐT về công tác kiểm tra nội bộ của đơn vị. Ban hành Quyết định thành lập Ban KTNB và các Quyết định kiểm tra theo từng chuyên đề; phê duyệt Kế hoạch chi tiết, thông báo kết luận kiểm tra và chỉ đạo khắc phục các thiếu sót sau kiểm tra.
              </p>
            </div>

            <div>
              <strong>2. Trách nhiệm của các Phó Hiệu trưởng (Phó Trưởng ban):</strong>
              <div className="mt-1 pl-4 border-l-2 border-indigo-600 space-y-1">
                <div>- <em>Thầy Nguyễn Minh Trí (PHT Thường trực):</em> Phụ trách công tác kiểm tra chuyên môn cấp THPT, quy trình khảo thí, ôn thi tốt nghiệp THPT và quản lý 07 Tổ chuyên môn.</div>
                <div>- <em>Cô Phan Thanh Thảo (PHT):</em> Phụ trách công tác kiểm tra nề nếp học sinh, hoạt động của GVCN 53 lớp, Thư viện - Thiết bị và giáo dục hòa nhập cho 25 học sinh khuyết tật.</div>
                <div>- <em>Thầy Nguyễn Thanh Tòng (PHT):</em> Phụ trách trực tiếp công tác kiểm tra và quản lý vận hành tại Điểm trường THCS Tân Kiều (cách 11km).</div>
              </div>
            </div>

            <div>
              <strong>3. Trách nhiệm của Thư ký (Thầy Nguyễn Văn Tới - Tổ trưởng Toán):</strong>
              <p className="mt-1 pl-4 border-l-2 border-teal-600">
                Tổng hợp kế hoạch, theo dõi lịch trình, chuẩn bị hồ sơ biên bản, dự thảo các báo cáo kết quả kiểm tra định kỳ và lập hồ sơ lưu trữ theo đúng quy định.
              </p>
            </div>

            <div>
              <strong>4. Trách nhiệm của các Tổ trưởng chuyên môn và Trưởng các Đoàn kiểm tra:</strong>
              <p className="mt-1 pl-4 border-l-2 border-amber-600">
                Thực hiện tự kiểm tra nội bộ tổ chuyên môn định kỳ hàng tháng; tham gia đầy đủ, nghiêm túc các đoàn kiểm tra khi được phân công; lập biên bản kiểm tra khách quan, trung thực và bàn giao hồ sơ đúng hạn.
              </p>
            </div>

            <div>
              <strong>5. Trách nhiệm của Ban Thanh tra nhân dân (Thầy Nguyễn Văn Giáp - Trưởng ban):</strong>
              <p className="mt-1 pl-4 border-l-2 border-rose-600">
                Phối hợp giám sát việc thực hiện Kế hoạch kiểm tra nội bộ, giám sát thực hiện Quy chế dân chủ ở cơ sở và công tác phòng chống tham nhũng, lãng phí trong nhà trường.
              </p>
            </div>

            <div>
              <strong>6. Trách nhiệm của đối tượng được kiểm tra:</strong>
              <p className="mt-1 pl-4 border-l-2 border-slate-600">
                Nghiêm túc chấp hành quyết định kiểm tra; cung cấp đầy đủ, chính xác, kịp thời hồ sơ, sổ sách, giáo án và các tài liệu liên quan; thực hiện nghiêm các kiến nghị trong kết luận kiểm tra.
              </p>
            </div>
          </div>
        </section>

        {/* Nơi nhận & Ký tên đóng dấu */}
        <div className="pt-8 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
          <div className="text-xs space-y-1 text-slate-600">
            <div className="font-bold text-slate-800 italic uppercase">Nơi nhận:</div>
            <div>- Sở GDĐT Đồng Tháp (để báo cáo);</div>
            <div>- Thanh tra Sở GDĐT Đồng Tháp;</div>
            <div>- Ban Giám hiệu (để chỉ đạo);</div>
            <div>- 08 Tổ chuyên môn & VP (để thực hiện);</div>
            <div>- Ban Thanh tra nhân dân (để giám sát);</div>
            <div>- Niêm yết công khai tại 3 điểm trường;</div>
            <div>- Lưu: VT, Hồ sơ Ban KTNB.</div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <div className="text-xs uppercase font-bold text-slate-900">
              HIỆU TRƯỞNG
            </div>
            <div className="text-xs italic text-slate-500 pb-16">
              (Đã ký và đóng dấu)
            </div>
            <div className="text-base font-bold text-slate-900 uppercase">
              Lê Thanh Cường
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

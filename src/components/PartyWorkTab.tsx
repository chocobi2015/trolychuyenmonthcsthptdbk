import React, { useState } from 'react';
import {
  FileText,
  Download,
  Users,
  Shield,
  Award,
  BookOpen,
  Calendar,
  Building,
  CheckCircle2,
  FileCheck,
  Flag,
  Share2,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface PartyCommitteeMember {
  stt: number;
  name: string;
  dob: string;
  roleInParty: string;
  roleInSchool: string;
  department: string;
  oldSchool: string;
  politicalTheory: string;
  qualification: string;
  duties: string;
  highlightTag?: string;
}

const PARTY_MEMBERS_BCH: PartyCommitteeMember[] = [
  {
    stt: 1,
    name: 'Lê Thanh Cường',
    dob: '17/10/1975',
    roleInParty: 'Bí thư Đảng ủy',
    roleInSchool: 'Hiệu trưởng',
    department: 'Ban Giám hiệu',
    oldSchool: 'THPT Đốc Binh Kiều',
    politicalTheory: 'Cao cấp LLCT',
    qualification: 'Thạc sỹ QLGD',
    duties: 'Phụ trách chung toàn Đảng bộ và nhà trường; trực tiếp phụ trách công tác tổ chức cán bộ, quy hoạch, bảo vệ chính trị nội bộ, tài chính tài sản; chủ trì các hội nghị Đảng ủy; giám sát chung 3 chi bộ.',
    highlightTag: 'Chủ trì toàn diện',
  },
  {
    stt: 2,
    name: 'Nguyễn Minh Trí',
    dob: '23/10/1986',
    roleInParty: 'Phó Bí thư Đảng ủy',
    roleInSchool: 'Phó Hiệu trưởng (Thường trực)',
    department: 'Ban Giám hiệu',
    oldSchool: 'THPT Đốc Binh Kiều',
    politicalTheory: 'Cao cấp LLCT',
    qualification: 'ĐHSP Vật lý - GDCT',
    duties: 'Thường trực Đảng ủy, điều hành công việc hàng ngày; phụ trách xây dựng Đảng, chính trị tư tưởng, thi đua khen thưởng Đảng bộ; trực tiếp quản lý chuyên môn cấp THPT (14 lớp, 529 HS); phụ trách giám sát Chi bộ 1 và Chi bộ 3.',
    highlightTag: 'Thường trực Đảng ủy',
  },
  {
    stt: 3,
    name: 'Trịnh Văn Sơn',
    dob: '25/05/1979',
    roleInParty: 'Đảng ủy viên - Bí thư Chi bộ 1',
    roleInSchool: 'Tổ phó Lịch sử - Địa lý - GDCD',
    department: 'Tổ KHXH (Điểm THPT)',
    oldSchool: 'THPT Đốc Binh Kiều',
    politicalTheory: 'Trung cấp LLCT',
    qualification: 'ĐHSP Lịch sử',
    duties: 'Bí thư Chi bộ 1 (Khối THPT và BGH); lãnh đạo nâng cao chất lượng dạy học THPT, bồi dưỡng học sinh giỏi môn KHXH, ôn thi tốt nghiệp THPT; theo dõi phát triển đảng viên trong học sinh THPT.',
    highlightTag: 'Bí thư Chi bộ 1',
  },
  {
    stt: 4,
    name: 'Nguyễn Thanh Tòng',
    dob: '04/08/1979',
    roleInParty: 'Đảng ủy viên - Bí thư Chi bộ 2',
    roleInSchool: 'Phó Hiệu trưởng',
    department: 'Ban Giám hiệu (Phụ trách điểm Tân Kiều)',
    oldSchool: 'THCS Tân Kiều',
    politicalTheory: 'Trung cấp LLCT',
    qualification: 'Đại học',
    duties: 'Bí thư Chi bộ 2 (Khối THCS Điểm Tân Kiều, 15 lớp, 602 HS); quản lý điều hành cơ sở vật chất, chuyên môn, nề nếp tại Điểm trường Tân Kiều (cách 11km); đầu mối đối ngoại với Đảng ủy, UBND xã Tân Kiều.',
    highlightTag: 'Bí thư Chi bộ 2',
  },
  {
    stt: 5,
    name: 'Lê Văn Nguyên',
    dob: '01/01/1975',
    roleInParty: 'Đảng ủy viên - Bí thư Chi bộ 3',
    roleInSchool: 'Tổ trưởng GDTC - QPAN - Nghệ thuật',
    department: 'Tổ GDTC - QPAN (Điểm ĐBK)',
    oldSchool: 'THCS Đốc Binh Kiều',
    politicalTheory: 'Trung cấp LLCT',
    qualification: 'Đại học Sư phạm',
    duties: 'Bí thư Chi bộ 3 (Khối THCS Điểm Đốc Binh Kiều, 24 lớp, 980 HS); lãnh đạo nề nếp kỷ cương cấp THCS; phụ trách phong trào TDTT, Hội khỏe Phù Đổng, GDQP-AN toàn trường; chỉ đạo phong trào Đội TNTP.',
    highlightTag: 'Bí thư Chi bộ 3',
  },
  {
    stt: 6,
    name: 'Lê Thị Ngọc Tuyền',
    dob: '02/11/1990',
    roleInParty: 'Đảng ủy viên',
    roleInSchool: 'Tổ trưởng Ngoại ngữ - Tin học',
    department: 'Tổ Ngoại ngữ - Tin học',
    oldSchool: 'THCS Tân Kiều',
    politicalTheory: 'Trung cấp LLCT',
    qualification: 'Thạc sĩ Ngôn ngữ',
    duties: 'Phụ trách công tác Tổ chức Đảng: Thẩm tra hồ sơ kết nạp Đảng, chuyển chính thức; quản lý quy hoạch cấp ủy Đảng bộ và chi bộ; theo dõi, bồi dưỡng đoàn viên ưu tú; chỉ tiêu kết nạp năm 2026 từ 03 - 04 đồng chí.',
    highlightTag: 'Công tác Tổ chức Đảng',
  },
  {
    stt: 7,
    name: 'Bùi Kim Huỳnh',
    dob: '19/04/1986',
    roleInParty: 'Đảng ủy viên',
    roleInSchool: 'Tổ trưởng KHTN (Lý - Hóa - Sinh - CN)',
    department: 'Tổ KHTN',
    oldSchool: 'THPT Đốc Binh Kiều',
    politicalTheory: 'Trung cấp LLCT',
    qualification: 'ĐHSP Vật lý',
    duties: 'Phụ trách công tác Kiểm tra, Giám sát Đảng: Xây dựng dự thảo và triển khai chương trình KTGS năm 2026 đối với 3 chi bộ và 85 đảng viên; giám sát việc học tập Chỉ thị 05-CT/TW, Nghị quyết TW4, đạo đức nhà giáo; xử lý đơn thư khiếu nại kỷ luật.',
    highlightTag: 'Kiểm tra - Giám sát',
  },
  {
    stt: 8,
    name: 'Lê Hồng Thúy',
    dob: '17/07/1975',
    roleInParty: 'Đảng ủy viên',
    roleInSchool: 'Tổ trưởng Lịch sử - Địa lý - GDCD',
    department: 'Tổ KHXH (Điểm ĐBK)',
    oldSchool: 'THCS Đốc Binh Kiều',
    politicalTheory: 'Trung cấp LLCT',
    qualification: 'Đại học Sư phạm',
    duties: 'Phụ trách công tác Văn thư, Lưu trữ Đảng: Thư ký các cuộc họp BCH Đảng bộ; soạn thảo nghị quyết, kết luận; quản lý văn bản đi, đến và con dấu Đảng ủy nghiêm ngặt; số hóa lưu trữ hồ sơ Đảng vụ.',
    highlightTag: 'Văn thư - Lưu trữ Đảng',
  },
  {
    stt: 9,
    name: 'Thái Văn Tiến',
    dob: '01/01/1978',
    roleInParty: 'Đảng ủy viên',
    roleInSchool: 'Tổ phó KHTN',
    department: 'Tổ KHTN (Điểm Tân Kiều)',
    oldSchool: 'THCS Tân Kiều',
    politicalTheory: 'Sơ cấp LLCT',
    qualification: 'Đại học Sư phạm',
    duties: 'Phụ trách công tác Tuyên giáo: Tổ chức học tập, quán triệt nghị quyết Đảng; bảo vệ nền tảng tư tưởng Đảng theo NQ 35-NQ/TW; nắm bắt diễn biến tư tưởng của 120 CB-GV-NV và 2.111 HS; phụ trách công tác dân vận, phối hợp Công đoàn và Đoàn thanh niên.',
    highlightTag: 'Công tác Tuyên giáo',
  },
  {
    stt: 10,
    name: 'Nguyễn Trung Hiếu',
    dob: '01/01/1984',
    roleInParty: 'Đảng ủy viên',
    roleInSchool: 'Tổ phó Ngoại ngữ - Tin học',
    department: 'Tổ Ngoại ngữ - Tin học',
    oldSchool: 'THPT Đốc Binh Kiều',
    politicalTheory: 'Trung cấp LLCT',
    qualification: 'ĐHSP Tiếng Anh',
    duties: 'Phụ trách công tác Đảng phí và Hồ sơ sổ sách Đảng: Quản lý, thu, trích nộp đảng phí của 85 đảng viên 3 chi bộ về Huyện ủy Tháp Mười; quản trị Phần mềm Cơ sở dữ liệu đảng viên 3.0; quản lý sổ đảng tịch, phát thẻ Đảng viên, thủ tục chuyển sinh hoạt Đảng.',
    highlightTag: 'Đảng phí & Sổ sách Đảng',
  },
];

interface DocumentMeta {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  date: string;
  fileName: string;
  downloadUrl: string;
  category: string;
  summary: string;
}

const PARTY_DOCUMENTS_META: DocumentMeta[] = [
  {
    id: 'doc-1',
    code: '01-QC/ĐU',
    title: 'Quy chế làm việc của Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030',
    subtitle: 'Quy định chi tiết thẩm quyền của tập thể BCH, chức trách 10 đồng chí Đảng ủy viên và nguyên tắc làm việc',
    date: '16/09/2026',
    fileName: '01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx',
    downloadUrl: '/downloads/01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx',
    category: 'Quy chế làm việc toàn khóa',
    summary: 'Gồm 5 Chương, 23 Điều bóc tách nhiệm vụ tập thể BCH Đảng bộ, thẩm quyền Bí thư Cường, Phó Bí thư Trí, 3 Bí thư Chi bộ và 5 Đảng ủy viên phụ trách nghiệp vụ (Tổ chức, Kiểm tra, Văn thư, Tuyên giáo, Đảng phí), nguyên tắc tập trung dân chủ và quan hệ công tác với Huyện ủy, Sở GDĐT và địa phương.',
  },
  {
    id: 'doc-2',
    code: '02-TB/ĐU',
    title: 'Thông báo phân công nhiệm vụ các đồng chí trong Ban Chấp hành Đảng bộ năm 2026',
    subtitle: 'Phân công cụ thể 10 đồng chí Đảng ủy viên phụ trách 3 chi bộ, 3 điểm trường và các mảng công tác Đảng',
    date: '18/09/2026',
    fileName: '02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx',
    downloadUrl: '/downloads/02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx',
    category: 'Phân công nhiệm vụ',
    summary: 'Chi tiết phân công nhiệm vụ 10 đồng chí trong Ban Chấp hành Đảng bộ khóa I theo đúng chỉ đạo mới: Bí thư Lê Thanh Cường, Phó Bí thư Nguyễn Minh Trí, 3 Bí thư Chi bộ (Trịnh Văn Sơn, Nguyễn Thanh Tòng, Lê Văn Nguyên) và 5 mảng nghiệp vụ (Tổ chức: cô Tuyền, Kiểm tra giám sát: cô Huỳnh, Văn thư lưu trữ: cô Thúy, Tuyên giáo: thầy Tiến, Đảng phí và sổ sách: thầy Hiếu).',
  },
  {
    id: 'doc-3',
    code: '03-CTr/ĐU',
    title: 'Chương trình hành động toàn khóa của Ban Chấp hành Đảng bộ khóa I, nhiệm kỳ 2025 – 2030',
    subtitle: 'Mục tiêu tổng quát, 17 chỉ tiêu chủ yếu, 3 khâu đột phá chiến lược và 6 nhóm giải pháp lãnh đạo toàn diện',
    date: '20/09/2026',
    fileName: '03_CTr_Hanh_dong_toan_khoa_2025_2030.docx',
    downloadUrl: '/downloads/03_CTr_Hanh_dong_toan_khoa_2025_2030.docx',
    category: 'Chương trình hành động toàn khóa',
    summary: 'Chiến lược phát triển Đảng bộ và nhà trường giai đoạn 2025 - 2030 sau sáp nhập 3 trường: Xây dựng trường chuẩn quốc gia, liên thông chất lượng 2 cấp THCS - THPT, 17 chỉ tiêu cụ thể (HSG 60-80 giải, tốt nghiệp trên 99.5%, kết nạp 15-20 đảng viên, 100% BHYT, giáo dục hòa nhập 25 HS khuyết tật) và 3 khâu đột phá chuyển đổi số - văn hóa nhà trường.',
  },
  {
    id: 'doc-4',
    code: '04-CTr/ĐU',
    title: 'Chương trình hành động năm 2026 của Ban Chấp hành Đảng bộ sau sáp nhập 3 trường',
    subtitle: 'Nhiệm vụ trọng tâm, 10 chỉ tiêu hành động năm 2026 và kế hoạch vận hành đồng bộ 3 điểm trường',
    date: '22/09/2026',
    fileName: '04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx',
    downloadUrl: '/downloads/04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx',
    category: 'Chương trình hành động năm 2026',
    summary: 'Chương trình hành động năm bản lề 2026 sau khi hoàn tất sáp nhập 3 trường, chuẩn bị Đại hội Đảng toàn quốc lần thứ XIV. Tập trung 10 chỉ tiêu trọng tâm: Đảng bộ HTTNV trở lên, kết nạp 3-4 đảng viên, 15 giải HSG văn hóa, hội thảo chuyên môn, giảm bỏ học dưới 0.4%, tốt nghiệp trên 99.8%, 100% giáo viên kỹ năng số, 100% BHYT.',
  },
];

export const PartyWorkTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'documents' | 'personnel' | 'overview'>('documents');
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-1');

  const selectedDoc = PARTY_DOCUMENTS_META.find(d => d.id === selectedDocId) || PARTY_DOCUMENTS_META[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-amber-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-red-600/40">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <Flag className="w-80 h-80 text-amber-300" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 backdrop-blur-sm rounded-full text-amber-200 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-300/30">
            <Flag className="w-3.5 h-3.5" /> Đảng bộ Trường THCS và THPT Đốc Binh Kiều · Khóa I (2025 - 2030)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            HỒ SƠ CÔNG TÁC ĐẢNG BỘ SAU SÁP NHẬP
          </h1>
          <p className="text-red-100 text-sm leading-relaxed mb-4">
            Hệ thống 04 văn kiện chính thức đã được tùy biến toàn diện theo cơ cấu mới của Trường THCS và THPT Đốc Binh Kiều 
            (sáp nhập từ 3 trường: THPT Đốc Binh Kiều, THCS Đốc Binh Kiều, THCS Tân Kiều). Dữ liệu nhân sự 120 CB-GV-NV, 
            85 Đảng viên, 03 Chi bộ trực thuộc, 53 lớp, 2.111 học sinh và Ban Chấp hành gồm 10 đồng chí.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
              <span className="text-red-200 block text-[11px]">Ban Chấp hành Đảng bộ</span>
              <strong className="text-base text-amber-300">10 Đồng chí</strong>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
              <span className="text-red-200 block text-[11px]">Tổng số Đảng viên</span>
              <strong className="text-base text-white">85 Đảng viên</strong> <span className="text-[10px] text-red-200">(70.8%)</span>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
              <span className="text-red-200 block text-[11px]">Chi bộ trực thuộc</span>
              <strong className="text-base text-amber-300">03 Chi bộ</strong> <span className="text-[10px] text-red-200">(3 Điểm trường)</span>
            </div>
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
              <span className="text-red-200 block text-[11px]">Văn kiện ban hành mới</span>
              <strong className="text-base text-white">04 File Word (.docx)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSubTab('documents')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'documents'
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" /> 04 Văn Kiện Đảng Bộ Mới
          </button>
          <button
            onClick={() => setActiveSubTab('personnel')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'personnel'
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> Danh Sách 10 Đ/c BCH Đảng Bộ
          </button>
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeSubTab === 'overview'
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" /> Cơ Cấu 3 Chi Bộ & Quy Mô
          </button>
        </div>

        {/* Quick Batch Download Button */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">Thư mục tải về: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">public/downloads/</code> & <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">ĐẢNG BỘ/</code></span>
        </div>
      </div>

      {/* SUBTAB 1: 04 DOCUMENTS */}
      {activeSubTab === 'documents' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Document list sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-red-600" /> Chọn văn kiện để xem & tải
              </h2>
              <div className="space-y-2">
                {PARTY_DOCUMENTS_META.map((doc, idx) => {
                  const isSelected = doc.id === selectedDocId;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/20'
                          : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800 font-mono">
                          {doc.code}
                        </span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {doc.date}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-2 mb-1">
                        {idx + 1}. {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {doc.subtitle}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> DOCX chuẩn A4
                        </span>
                        <a
                          href={doc.downloadUrl}
                          download={doc.fileName}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition-colors"
                        >
                          <Download className="w-3 h-3" /> Tải về
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Batch Download Box */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-900">
              <h4 className="font-bold mb-1 flex items-center gap-1.5 text-amber-800">
                <FileCheck className="w-4 h-4 text-amber-600" /> Lưu trữ sẵn sàng trong hệ thống
              </h4>
              <p className="text-amber-800/80 mb-3 leading-relaxed">
                Tất cả 04 file DOCX đã được tạo và lưu trữ đồng thời ở 2 vị trí thư mục của dự án:
              </p>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700 mb-3">
                <li>• /public/downloads/01_QC_DU_...docx</li>
                <li>• /public/downloads/02_TB_Phan_cong_...docx</li>
                <li>• /public/downloads/03_CTr_Hanh_dong_...docx</li>
                <li>• /public/downloads/04_CTr_Hanh_dong_...docx</li>
                <li className="text-red-700 font-semibold">• ĐẢNG BỘ/ (chứa cả 4 file mới cùng file gốc)</li>
              </ul>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/downloads/01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx"
                  download
                  className="bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/60 py-1.5 px-2 rounded-lg text-center font-medium text-[11px] flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" /> Tải Quy chế
                </a>
                <a
                  href="/downloads/02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx"
                  download
                  className="bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/60 py-1.5 px-2 rounded-lg text-center font-medium text-[11px] flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" /> Tải Phân công
                </a>
                <a
                  href="/downloads/03_CTr_Hanh_dong_toan_khoa_2025_2030.docx"
                  download
                  className="bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/60 py-1.5 px-2 rounded-lg text-center font-medium text-[11px] flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" /> CTr Toàn khóa
                </a>
                <a
                  href="/downloads/04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx"
                  download
                  className="bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/60 py-1.5 px-2 rounded-lg text-center font-medium text-[11px] flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" /> CTr Năm 2026
                </a>
              </div>
            </div>
          </div>

          {/* Document Preview Pane (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 mb-1">
                  {selectedDoc.category} · Số {selectedDoc.code}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{selectedDoc.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Ngày ban hành: {selectedDoc.date} · Đơn vị: Đảng bộ Trường THCS và THPT Đốc Binh Kiều</p>
              </div>
              <a
                href={selectedDoc.downloadUrl}
                download={selectedDoc.fileName}
                className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-red-700/20 transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" /> Tải File Word (.DOCX)
              </a>
            </div>

            {/* Document Content Simulation */}
            <div className="mt-6 bg-slate-50/50 rounded-xl p-6 border border-slate-200/80 font-serif text-slate-800 space-y-4 max-h-[680px] overflow-y-auto text-sm leading-relaxed">
              {/* Header block */}
              <div className="grid grid-cols-2 text-center pb-4 border-b border-slate-300">
                <div>
                  <p className="font-bold uppercase text-xs">ĐẢNG BỘ HUYỆN THÁP MƯỜI</p>
                  <p className="font-bold uppercase text-xs text-red-700">ĐẢNG ỦY TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU</p>
                  <p className="text-xs text-slate-500">* * *</p>
                  <p className="font-bold text-xs mt-1">Số: {selectedDoc.code}</p>
                </div>
                <div>
                  <p className="font-bold uppercase text-xs">ĐẢNG CỘNG SẢN VIỆT NAM</p>
                  <p className="text-xs text-slate-500">-----------------------</p>
                  <p className="italic text-xs mt-1">Đốc Binh Kiều, ngày {selectedDoc.date}</p>
                </div>
              </div>

              {/* Title */}
              <div className="text-center py-4">
                <h2 className="text-base font-extrabold uppercase text-red-800 tracking-wide">
                  {selectedDoc.id === 'doc-1' && 'QUY CHẾ LÀM VIỆC CỦA BAN CHẤP HÀNH ĐẢNG BỘ'}
                  {selectedDoc.id === 'doc-2' && 'THÔNG BÁO PHÂN CÔNG NHIỆM VỤ CÁC ĐỒNG CHÍ ĐẢNG ỦY VIÊN'}
                  {selectedDoc.id === 'doc-3' && 'CHƯƠNG TRÌNH HÀNH ĐỘNG TOÀN KHÓA 2025 - 2030'}
                  {selectedDoc.id === 'doc-4' && 'CHƯƠNG TRÌNH HÀNH ĐỘNG NĂM 2026 SAU SÁP NHẬP'}
                </h2>
                <p className="font-bold text-xs uppercase text-slate-700 mt-1">
                  {selectedDoc.id === 'doc-1' && 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU KHÓA I, NHIỆM KỲ 2025 – 2030'}
                  {selectedDoc.id === 'doc-2' && 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU NĂM 2026'}
                  {selectedDoc.id === 'doc-3' && 'CỦA BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU KHÓA I'}
                  {selectedDoc.id === 'doc-4' && 'NĂM ĐẦU TIÊN VẬN HÀNH SAU KHI SÁP NHẬP 3 TRƯỜNG'}
                </p>
              </div>

              {/* Dynamic Preview Content based on Document ID */}
              {selectedDoc.id === 'doc-1' && (
                <div className="space-y-3 font-sans text-xs">
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900">
                    <strong>Tóm tắt cấu trúc:</strong> Văn bản gồm 05 Chương, 23 Điều bóc tách nhiệm vụ tập thể Ban chấp hành và chi tiết thẩm quyền của 10 đồng chí trong Đảng ủy mới, điều chỉnh hoàn toàn tình trạng khuyết Bí thư trước đây, quy định mối quan hệ công tác giữa Đảng ủy với 03 Chi bộ và chính quyền 2 xã Đốc Binh Kiều, Tân Kiều.
                  </div>
                  <h4 className="font-bold text-red-800 uppercase mt-3">Chương I: Nhiệm vụ, quyền hạn của tập thể BCH Đảng bộ</h4>
                  <p className="text-justify text-slate-700">Lãnh đạo toàn diện 3 điểm trường (THPT Đốc Binh Kiều, THCS Đốc Binh Kiều, THCS Tân Kiều) với 120 cán bộ giáo viên nhân viên, 85 đảng viên, 53 lớp và 2.111 học sinh. Cụ thể hóa đường lối của Đảng và chỉ đạo của Sở GDĐT Đồng Tháp; ban hành nghị quyết chuyên đề về nâng cao chất lượng dạy học và chuyển đổi số.</p>
                  <h4 className="font-bold text-red-800 uppercase mt-3">Chương II: Nhiệm vụ, quyền hạn của 10 đồng chí Đảng ủy viên</h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
                    <li><strong>Điều 3:</strong> Bí thư Đảng ủy - Đồng chí Lê Thanh Cường (Hiệu trưởng): Lãnh đạo toàn diện, công tác cán bộ, quy hoạch, tài chính tài sản, chủ trì hội nghị Đảng ủy.</li>
                    <li><strong>Điều 4:</strong> Phó Bí thư Đảng ủy - Đồng chí Nguyễn Minh Trí (PHT Thường trực): Thường trực Đảng ủy, phụ trách công tác xây dựng Đảng, giám sát Chi bộ 1 và Chi bộ 3, phụ trách chuyên môn THPT.</li>
                    <li><strong>Điều 5:</strong> ĐUV, Bí thư Chi bộ 1 - Đồng chí Trịnh Văn Sơn: Lãnh đạo Chi bộ 1 (Khối THPT & BGH), bồi dưỡng HSG môn KHXH, ôn thi tốt nghiệp THPT, phát triển đảng học sinh lớp 12.</li>
                    <li><strong>Điều 6:</strong> ĐUV, Bí thư Chi bộ 2 - Đồng chí Nguyễn Thanh Tòng (PHT): Lãnh đạo Chi bộ 2 (Khối THCS Tân Kiều, 15 lớp, 602 HS), điều hành điểm trường Tân Kiều cách 11km.</li>
                    <li><strong>Điều 7:</strong> ĐUV, Bí thư Chi bộ 3 - Đồng chí Lê Văn Nguyên: Lãnh đạo Chi bộ 3 (Khối THCS ĐBK, 24 lớp, 980 HS), phụ trách phong trào TDTT, HKPĐ, GDQP-AN toàn trường.</li>
                    <li><strong>Điều 8:</strong> ĐUV phụ trách Tổ chức Đảng - Đồng chí Lê Thị Ngọc Tuyền: Thẩm tra hồ sơ kết nạp Đảng, chuyển chính thức, quy hoạch cấp ủy.</li>
                    <li><strong>Điều 9:</strong> ĐUV phụ trách Kiểm tra, Giám sát Đảng - Đồng chí Bùi Kim Huỳnh: Chương trình kiểm tra giám sát năm, kỷ luật Đảng, giải quyết khiếu nại.</li>
                    <li><strong>Điều 10:</strong> ĐUV phụ trách Văn thư, Lưu trữ Đảng - Đồng chí Lê Hồng Thúy: Thư ký cuộc họp BCH, biên bản nghị quyết, quản lý con dấu và số hóa lưu trữ hồ sơ Đảng.</li>
                    <li><strong>Điều 11:</strong> ĐUV phụ trách Tuyên giáo - Đồng chí Thái Văn Tiến: Công tác tư tưởng, học tập nghị quyết, NQ 35-NQ/TW, nắm bắt dư luận 3 điểm trường, dân vận đoàn thể.</li>
                    <li><strong>Điều 12:</strong> ĐUV phụ trách Đảng phí & Hồ sơ sổ sách - Đồng chí Nguyễn Trung Hiếu: Quản lý CSDL Đảng viên 3.0, thu trích nộp đảng phí của 85 đồng chí, thẻ Đảng, sổ sách.</li>
                  </ul>
                  <h4 className="font-bold text-red-800 uppercase mt-3">Chương III, IV & V: Nguyên tắc, chế độ làm việc và quan hệ công tác</h4>
                  <p className="text-justify text-slate-700">Nguyên tắc tập trung dân chủ; họp định kỳ 1 tháng/lần; quy định đi thực tế 3 điểm trường; phối hợp với Huyện ủy Tháp Mười, Sở GDĐT Đồng Tháp, Đảng ủy xã Đốc Binh Kiều và xã Tân Kiều.</p>
                </div>
              )}

              {selectedDoc.id === 'doc-2' && (
                <div className="space-y-3 font-sans text-xs">
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-emerald-900">
                    <strong>Phân công nhiệm vụ cụ thể năm 2026:</strong> Bóc tách chi tiết trách nhiệm, quyền hạn và phạm vi công tác của từng đồng chí trong Ban Chấp hành Đảng bộ khóa I theo đúng thông tin phê duyệt mới, bảo đảm không chồng chéo, không bỏ trống bất kỳ cơ sở nào trong 3 điểm trường.
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-slate-300 text-[11px]">
                      <thead>
                        <tr className="bg-slate-200/80 text-slate-800 font-bold">
                          <th className="p-2 border border-slate-300 w-8">STT</th>
                          <th className="p-2 border border-slate-300">Đồng chí</th>
                          <th className="p-2 border border-slate-300">Chức vụ Đảng & Chính quyền</th>
                          <th className="p-2 border border-slate-300">Nhiệm vụ phân công cụ thể</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PARTY_MEMBERS_BCH.map((m) => (
                          <tr key={m.stt} className="hover:bg-slate-100/60 border-b border-slate-200">
                            <td className="p-2 border border-slate-300 text-center font-bold">{m.stt}</td>
                            <td className="p-2 border border-slate-300 font-semibold text-slate-900">{m.name}</td>
                            <td className="p-2 border border-slate-300">
                              <span className="text-red-700 font-medium block">{m.roleInParty}</span>
                              <span className="text-slate-500 text-[10px]">{m.roleInSchool}</span>
                            </td>
                            <td className="p-2 border border-slate-300 text-slate-700 leading-tight">{m.duties}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selectedDoc.id === 'doc-3' && (
                <div className="space-y-3 font-sans text-xs">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-blue-900">
                    <strong>Chương trình toàn khóa 2025 - 2030:</strong> Xác lập tầm nhìn chiến lược, 17 chỉ tiêu định lượng toàn khóa và 3 khâu đột phá nhằm đưa trường đạt chuẩn quốc gia, liên thông chuyên môn 2 cấp học và xây dựng tập thể đoàn kết.
                  </div>
                  <h4 className="font-bold text-red-800 uppercase mt-2">Hệ thống 17 chỉ tiêu chủ yếu toàn khóa:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <strong className="text-slate-800 block mb-1">Xây dựng Đảng & Đoàn thể:</strong>
                      <p>• Đảng bộ xếp loại Hoàn thành tốt nhiệm vụ trở lên (ít nhất 2 năm HTXSNV).</p>
                      <p>• Kết nạp 15 - 20 đảng viên mới trong nhiệm kỳ.</p>
                      <p>• 100% chi bộ đạt HTTNV; 100% đảng viên hoàn thành nhiệm vụ.</p>
                      <p>• Đoàn trường & Công đoàn đạt Hoàn thành xuất sắc 5 năm liền.</p>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-slate-200">
                      <strong className="text-slate-800 block mb-1">Chuyên môn & Giáo dục:</strong>
                      <p>• Thi HSG cấp tỉnh: Đạt 60 - 80 giải trong nhiệm kỳ.</p>
                      <p>• Tỷ lệ tốt nghiệp THPT bình quân trên 99.5%.</p>
                      <p>• Tỷ lệ hoàn thành chương trình THCS trên 98.5%.</p>
                      <p>• Giảm tỷ lệ học sinh bỏ học dưới 0.4%.</p>
                      <p>• 100% học sinh khuyết tật (25 em) được lập kế hoạch giáo dục hòa nhập.</p>
                    </div>
                  </div>
                  <h4 className="font-bold text-red-800 uppercase mt-2">3 Khâu đột phá toàn khóa:</h4>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-700">
                    <li><strong>Đột phá 1:</strong> Chuyển đổi số liên cơ sở và quản trị số học đường (họp không giấy tờ, sổ điểm và học bạ điện tử).</li>
                    <li><strong>Đột phá 2:</strong> Liên thông chất lượng dạy và học giữa 2 cấp THCS và THPT, chiến lược bồi dưỡng HSG từ lớp 9 lên THPT.</li>
                    <li><strong>Đột phá 3:</strong> Xây dựng văn hóa nhà trường đoàn kết, nhân ái sau sáp nhập, phát huy tinh thần gương mẫu của 85 đảng viên.</li>
                  </ol>
                </div>
              )}

              {selectedDoc.id === 'doc-4' && (
                <div className="space-y-3 font-sans text-xs">
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-purple-900">
                    <strong>Chương trình năm 2026:</strong> Xác định nhiệm vụ then chốt trong năm đầu tiên vận hành sau sáp nhập, ổn định ngay tư tưởng của 120 CB-GV-NV và nề nếp học tập của 2.111 học sinh.
                  </div>
                  <h4 className="font-bold text-red-800 uppercase mt-2">10 Chỉ tiêu hành động năm 2026:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white p-2.5 rounded border border-slate-200 space-y-1">
                      <p><strong>(1)</strong> Xếp loại Đảng bộ: Hoàn thành tốt nhiệm vụ trở lên.</p>
                      <p><strong>(2)</strong> Kết nạp đảng viên mới: 03 - 04 đồng chí.</p>
                      <p><strong>(3)</strong> Học sinh giỏi cấp tỉnh: Đạt ít nhất 15 giải (THCS: 7, THPT: 8).</p>
                      <p><strong>(4)</strong> Hội thảo chuyên môn: Tổ chức 02 buổi hội thảo cấp cụm/tỉnh.</p>
                      <p><strong>(5)</strong> Tỉ lệ học sinh bỏ học: Dưới 0.4% trên cả 3 điểm trường.</p>
                    </div>
                    <div className="bg-white p-2.5 rounded border border-slate-200 space-y-1">
                      <p><strong>(6)</strong> Tỉ lệ tốt nghiệp THPT năm 2026: Đạt trên 99.8%.</p>
                      <p><strong>(7)</strong> Kỹ năng số giáo viên: 100% được bồi dưỡng CNTT & AI.</p>
                      <p><strong>(8)</strong> Ngoại khóa: 02 hoạt động hướng nghiệp + 02 chuyến về nguồn.</p>
                      <p><strong>(9)</strong> Bảo hiểm y tế học sinh: Đạt 100% (2.111/2.111 HS).</p>
                      <p><strong>(10)</strong> Đoàn thể: Công đoàn & Đoàn trường Hoàn thành xuất sắc.</p>
                    </div>
                  </div>
                  <h4 className="font-bold text-red-800 uppercase mt-2">Lộ trình triển khai 4 quý năm 2026:</h4>
                  <p className="text-slate-700 leading-normal">
                    <strong>Quý I:</strong> Ban hành quy chế làm việc, ổn định bộ máy, kiểm tra nề nếp sau Tết.<br/>
                    <strong>Quý II:</strong> Ôn thi tốt nghiệp THPT, xét tốt nghiệp THCS, sơ kết 6 tháng đầu năm.<br/>
                    <strong>Quý III:</strong> Khai giảng năm học 2026-2027 đồng loạt tại 3 điểm trường, rà soát phòng ốc thiết bị.<br/>
                    <strong>Quý IV:</strong> Kiểm tra chuyên đề các chi bộ, đánh giá phân loại đảng viên, tổng kết năm 2026.
                  </p>
                </div>
              )}

              {/* Sign Block */}
              <div className="pt-6 border-t border-slate-300 grid grid-cols-2 text-xs">
                <div>
                  <p className="font-bold italic">Nơi nhận:</p>
                  <p className="text-[11px] text-slate-600">- Ban Thường vụ Huyện ủy Tháp Mười (b/c);<br/>- Sở GDĐT Đồng Tháp (b/c);<br/>- 03 Chi bộ trực thuộc;<br/>- Ban Giám hiệu nhà trường;<br/>- Lưu Đảng ủy.</p>
                </div>
                <div className="text-center">
                  <p className="font-bold uppercase">T/M ĐẢNG ỦY</p>
                  <p className="font-bold uppercase text-red-700">BÍ THƯ</p>
                  <div className="h-16 flex items-center justify-center">
                    <span className="font-serif italic text-slate-400 text-sm">(Đã ký)</span>
                  </div>
                  <p className="font-bold text-slate-900">Lê Thanh Cường</p>
                  <p className="text-[10px] text-slate-500">Hiệu trưởng Trường THCS và THPT Đốc Binh Kiều</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: PERSONNEL 10 MEMBERS */}
      {activeSubTab === 'personnel' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-600" /> BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU (10 ĐỒNG CHÍ)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chỉ định bởi Ban Thường vụ Huyện ủy Tháp Mười theo cơ cấu sau sáp nhập 3 trường. Đầy đủ các đồng chí Bí thư, Phó Bí thư, 3 Bí thư Chi bộ và 5 Đảng ủy viên phụ trách nghiệp vụ.
              </p>
            </div>
            <a
              href="/downloads/02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx"
              download
              className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Tải Thông Báo Phân Công (DOCX)
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PARTY_MEMBERS_BCH.map((member) => (
              <div
                key={member.stt}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-sm border border-red-200">
                      {member.stt}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {member.name}
                        {member.stt === 1 && (
                          <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                            Bí thư
                          </span>
                        )}
                        {member.stt === 2 && (
                          <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                            Phó Bí thư
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-red-700 font-medium">{member.roleInParty}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {member.highlightTag}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Chức vụ trường:</span>
                    <strong className="text-slate-800">{member.roleInSchool}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Tổ / Đơn vị:</span>
                    <strong className="text-slate-800">{member.department}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Trường trước sáp nhập:</span>
                    <span className="text-slate-700">{member.oldSchool}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Lý luận chính trị & Bằng cấp:</span>
                    <span className="text-slate-700">{member.politicalTheory} · {member.qualification}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Nhiệm vụ phân công trong Đảng ủy:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-100 p-2.5 rounded-lg">
                    {member.duties}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: 3 CHI BỘ & QUY MÔ TRƯỜNG */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Chi bộ 1 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-2 h-full bg-blue-600 absolute left-0 top-0 bottom-0" />
              <div className="pl-3">
                <span className="text-[11px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Chi bộ 1 trực thuộc
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">CHI BỘ KHỐI THPT & BGH</h3>
                <p className="text-xs text-slate-500 mt-0.5">Điểm trường chính · 14 lớp · 529 Học sinh</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Bí thư Chi bộ:</span>
                    <strong className="text-slate-800">Đ/c Trịnh Văn Sơn (ĐUV)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Đảng ủy viên giám sát:</span>
                    <strong className="text-slate-800">Đ/c Nguyễn Minh Trí (PBT)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Thành phần đảng viên:</span>
                    <span className="text-slate-700">Tổ BGH, Tổ Toán, Văn, KHTN, KHXH, NN, GDTC</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Trọng tâm nhiệm vụ:</span>
                    <span className="text-blue-700 font-semibold">Ôn thi tốt nghiệp & Bồi dưỡng HSG THPT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chi bộ 2 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-2 h-full bg-emerald-600 absolute left-0 top-0 bottom-0" />
              <div className="pl-3">
                <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Chi bộ 2 trực thuộc
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">CHI BỘ ĐIỂM TÂN KIỀU</h3>
                <p className="text-xs text-slate-500 mt-0.5">Điểm Tân Kiều (cách 11km) · 15 lớp · 602 Học sinh</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Bí thư Chi bộ:</span>
                    <strong className="text-slate-800">Đ/c Nguyễn Thanh Tòng (PHT, ĐUV)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Đảng ủy viên giám sát:</span>
                    <strong className="text-slate-800">Đ/c Lê Thanh Cường (Bí thư ĐU)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Thành phần đảng viên:</span>
                    <span className="text-slate-700">CB-GV-NV giảng dạy tại điểm trường Tân Kiều</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Trọng tâm nhiệm vụ:</span>
                    <span className="text-emerald-700 font-semibold">Điều hành CSVC, duy trì sĩ số, xóa bỏ khoảng cách</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chi bộ 3 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-2 h-full bg-amber-600 absolute left-0 top-0 bottom-0" />
              <div className="pl-3">
                <span className="text-[11px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Chi bộ 3 trực thuộc
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">CHI BỘ ĐIỂM ĐỐC BINH KIỀU</h3>
                <p className="text-xs text-slate-500 mt-0.5">Điểm THCS Đốc Binh Kiều · 24 lớp · 980 Học sinh</p>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Bí thư Chi bộ:</span>
                    <strong className="text-slate-800">Đ/c Lê Văn Nguyên (ĐUV)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Đảng ủy viên giám sát:</span>
                    <strong className="text-slate-800">Đ/c Nguyễn Minh Trí (PBT)</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-500">Thành phần đảng viên:</span>
                    <span className="text-slate-700">CB-GV-NV giảng dạy cấp THCS điểm Đốc Binh Kiều</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Trọng tâm nhiệm vụ:</span>
                    <span className="text-amber-700 font-semibold">Kỷ cương học đường, phong trào Đội & TDTT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scale Summary Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-red-600" /> BẢNG TỔNG HỢP QUY MÔ ĐẢNG VIÊN VÀ HỌC SINH TOÀN TRƯỜNG SAU SÁP NHẬP
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold">
                    <th className="p-2.5 border border-slate-200">Điểm trường & Chi bộ</th>
                    <th className="p-2.5 border border-slate-200 text-center">Số lớp</th>
                    <th className="p-2.5 border border-slate-200 text-center">Số học sinh</th>
                    <th className="p-2.5 border border-slate-200 text-center">HS khuyết tật hòa nhập</th>
                    <th className="p-2.5 border border-slate-200 text-center">Cán bộ GV-NV</th>
                    <th className="p-2.5 border border-slate-200 text-center">Đảng viên</th>
                    <th className="p-2.5 border border-slate-200">Ghi chú vị trí & khoảng cách</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 border border-slate-200 font-medium">
                      <strong>Điểm chính THPT</strong> (Chi bộ 1)
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold">14 lớp</td>
                    <td className="p-2.5 border border-slate-200 text-center">529 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center font-semibold text-amber-700">05 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center">45 người</td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold text-red-700">34 ĐV</td>
                    <td className="p-2.5 border border-slate-200 text-slate-600">Trụ sở Đảng ủy & Ban Giám hiệu</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 border border-slate-200 font-medium">
                      <strong>Điểm THCS Đốc Binh Kiều</strong> (Chi bộ 3)
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold">24 lớp</td>
                    <td className="p-2.5 border border-slate-200 text-center">980 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center font-semibold text-amber-700">12 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center">44 người</td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold text-red-700">29 ĐV</td>
                    <td className="p-2.5 border border-slate-200 text-slate-600">Cơ sở THCS Đốc Binh Kiều cũ</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 border border-slate-200 font-medium">
                      <strong>Điểm THCS Tân Kiều</strong> (Chi bộ 2)
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold">15 lớp</td>
                    <td className="p-2.5 border border-slate-200 text-center">602 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center font-semibold text-amber-700">08 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center">31 người</td>
                    <td className="p-2.5 border border-slate-200 text-center font-bold text-red-700">22 ĐV</td>
                    <td className="p-2.5 border border-slate-200 text-slate-600">Cơ sở Tân Kiều cũ (cách 11km)</td>
                  </tr>
                  <tr className="bg-red-50/70 font-bold text-slate-900">
                    <td className="p-2.5 border border-slate-200">
                      TỔNG CỘNG TOÀN TRƯỜNG
                    </td>
                    <td className="p-2.5 border border-slate-200 text-center text-red-700">53 LỚP</td>
                    <td className="p-2.5 border border-slate-200 text-center text-red-700">2.111 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center text-amber-800">25 HS</td>
                    <td className="p-2.5 border border-slate-200 text-center text-slate-900">120 CB-GV-NV</td>
                    <td className="p-2.5 border border-slate-200 text-center text-red-800">85 ĐẢNG VIÊN (70.8%)</td>
                    <td className="p-2.5 border border-slate-200 text-slate-800">03 Chi bộ trực thuộc</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Search, 
  Copy, 
  Check, 
  Download, 
  FileSpreadsheet, 
  Database, 
  Sparkles, 
  Info,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import studentMasterData from '../data/schoolStudentMasterData.json';

interface SchoolStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SchoolStudentsModal: React.FC<SchoolStudentsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCampus, setSelectedCampus] = useState<'all' | 'main' | 'dbk' | 'tankieu'>('all');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  // Filter classes
  const filteredClasses = useMemo(() => {
    return studentMasterData.classes.filter((c) => {
      if (selectedCampus !== 'all' && c.campusId !== selectedCampus) return false;
      if (selectedGrade !== 'all' && c.grade !== selectedGrade) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchName = c.className.toLowerCase().includes(query);
        const matchCampus = c.campusName.toLowerCase().includes(query);
        const matchGrade = `khối ${c.grade}`.includes(query);
        if (!matchName && !matchCampus && !matchGrade) return false;
      }
      return true;
    });
  }, [selectedCampus, selectedGrade, searchTerm]);

  // Filter totals
  const filterTotalClasses = filteredClasses.length;
  const filterTotalStudents = filteredClasses.reduce((sum, c) => sum + c.studentCount, 0);

  // Copy structured text to clipboard
  const handleCopySummary = () => {
    const text = `SỐ LIỆU QUY MÔ TRƯỜNG LỚP VÀ HỌC SINH NĂM HỌC 2026 - 2027
TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU (SỞ GDĐT TỈNH ĐỒNG THÁP)
(Căn cứ danh sách học sinh toàn trường, chuẩn 100% khớp file Excel)

1. TỔNG QUY MÔ TOÀN TRƯỜNG:
- Tổng số: 53 lớp với 2.111 học sinh (Cấp THCS: 39 lớp / 1.582 HS; Cấp THPT: 14 lớp / 529 HS).

2. PHÂN BỔ THEO 03 ĐIỂM TRƯỜNG:
- Điểm chính (Cấp THPT): 14 lớp với 529 học sinh
  + Khối 10 (05 lớp): 10CB1 (35), 10CB2 (30), 10CB3 (46), 10CB4 (47), 10CB5 (45) -> 203 HS
  + Khối 11 (04 lớp): 11CB1 (43), 11CB2 (34), 11CB3 (35), 11CB4 (29) -> 141 HS
  + Khối 12 (05 lớp): 12CB1 (28), 12CB2 (23), 12CB3 (47), 12CB4 (47), 12CB5 (40) -> 185 HS

- Điểm Trường Đốc Binh Kiều (Cấp THCS - 6 lớp đầu mỗi khối 6-9): 24 lớp với 980 học sinh
  + Khối 6 (06 lớp): 6A1 (41), 6A2 (41), 6A3 (41), 6A4 (40), 6A5 (41), 6A6 (41) -> 245 HS
  + Khối 7 (06 lớp): 7A1 (41), 7A2 (40), 7A3 (42), 7A4 (37), 7A5 (37), 7A6 (37) -> 234 HS
  + Khối 8 (06 lớp): 8A1 (42), 8A2 (40), 8A3 (41), 8A4 (44), 8A5 (43), 8A6 (41) -> 251 HS
  + Khối 9 (06 lớp): 9A1 (42), 9A2 (38), 9A3 (44), 9A4 (41), 9A5 (42), 9A6 (43) -> 250 HS

- Điểm Trường Tân Kiều (Cấp THCS - các lớp từ A7 trở đi, cách 11km): 15 lớp với 602 học sinh
  + Khối 6 (04 lớp): 6A7 (41), 6A8 (43), 6A9 (40), 6A10 (42) -> 166 HS
  + Khối 7 (03 lớp): 7A7 (44), 7A8 (45), 7A9 (44) -> 133 HS
  + Khối 8 (04 lớp): 8A7 (36), 8A8 (38), 8A9 (36), 8A10 (37) -> 147 HS
  + Khối 9 (04 lớp): 9A7 (39), 9A8 (37), 9A9 (40), 9A10 (40) -> 156 HS

3. TỔNG HỢP THEO KHỐI:
- Khối 6: 10 lớp, 411 HS (ĐBK: 245 HS, Tân Kiều: 166 HS)
- Khối 7: 9 lớp, 367 HS (ĐBK: 234 HS, Tân Kiều: 133 HS)
- Khối 8: 10 lớp, 398 HS (ĐBK: 251 HS, Tân Kiều: 147 HS)
- Khối 9: 10 lớp, 406 HS (ĐBK: 250 HS, Tân Kiều: 156 HS)
- Khối 10: 5 lớp, 203 HS (Điểm chính)
- Khối 11: 4 lớp, 141 HS (Điểm chính)
- Khối 12: 5 lớp, 185 HS (Điểm chính)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-start justify-between gap-4 border-b border-blue-800">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ĐÃ LƯU VĨNH VIỄN TRÊN WEBAPP</span>
              </span>
              <span className="text-xs text-blue-200 flex items-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nguồn: DANH SÁCH HỌC SINH TOÀN TRƯỜNG.xlsx</span>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mt-1.5 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-300" />
              <span>Dữ Liệu Học Sinh & 53 Lớp Học Tại 03 Điểm Trường</span>
            </h2>
            <p className="text-xs text-blue-200/90 mt-0.5">
              Năm học 2026 - 2027 • Trường THCS và THPT Đốc Binh Kiều (Sở GDĐT tỉnh Đồng Tháp)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
              title="Sao chép toàn bộ số liệu chuẩn vào bộ nhớ đệm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép số liệu'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Summary Cards (3 Campuses) */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Main Campus */}
          <div 
            onClick={() => setSelectedCampus(selectedCampus === 'main' ? 'all' : 'main')}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedCampus === 'main' 
                ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>1. Điểm Chính (THPT)</span>
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                14 Lớp
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-blue-900">529</span>
              <span className="text-xs font-semibold text-slate-600">học sinh</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-tight">
              Khối 10: 203 HS (5 lớp) • Khối 11: 141 HS (4 lớp) • Khối 12: 185 HS (5 lớp)
            </p>
          </div>

          {/* Doc Binh Kieu Campus */}
          <div 
            onClick={() => setSelectedCampus(selectedCampus === 'dbk' ? 'all' : 'dbk')}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedCampus === 'dbk' 
                ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-500/20 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>2. Điểm Đốc Binh Kiều (THCS)</span>
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                24 Lớp
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-900">980</span>
              <span className="text-xs font-semibold text-slate-600">học sinh</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-tight">
              6 lớp đầu mỗi khối 6-9: K6 (245 HS), K7 (234 HS), K8 (251 HS), K9 (250 HS)
            </p>
          </div>

          {/* Tan Kieu Campus */}
          <div 
            onClick={() => setSelectedCampus(selectedCampus === 'tankieu' ? 'all' : 'tankieu')}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedCampus === 'tankieu' 
                ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm' 
                : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>3. Điểm Tân Kiều (THCS - 11km)</span>
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                15 Lớp
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-900">602</span>
              <span className="text-xs font-semibold text-slate-600">học sinh</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-tight">
              Từ lớp A7 trở đi: K6 (166 HS), K7 (133 HS), K8 (147 HS), K9 (156 HS)
            </p>
          </div>

          {/* Whole School Total */}
          <div 
            onClick={() => { setSelectedCampus('all'); setSelectedGrade('all'); }}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedCampus === 'all' && selectedGrade === 'all'
                ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wide flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Toàn Trường THCS & THPT</span>
              </span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                53 Lớp
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-950">2.111</span>
              <span className="text-xs font-semibold text-slate-600">học sinh</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-tight">
              Cấp THCS: 39 lớp (1.582 HS) • Cấp THPT: 14 lớp (529 HS) • Bình quân: 39,83 HS/lớp
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3 sm:px-5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Campus tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">Điểm trường:</span>
            <button
              onClick={() => setSelectedCampus('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                selectedCampus === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả (53 lớp)
            </button>
            <button
              onClick={() => setSelectedCampus('main')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                selectedCampus === 'main'
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              Điểm chính THPT (14 lớp)
            </button>
            <button
              onClick={() => setSelectedCampus('dbk')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                selectedCampus === 'dbk'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Điểm Đốc Binh Kiều (24 lớp)
            </button>
            <button
              onClick={() => setSelectedCampus('tankieu')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                selectedCampus === 'tankieu'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Điểm Tân Kiều (15 lớp)
            </button>
          </div>

          {/* Grade tabs */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500 font-medium mr-1">Khối:</span>
            {[6, 7, 8, 9, 10, 11, 12].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(selectedGrade === g ? 'all' : g)}
                className={`w-7 h-7 rounded-md text-xs font-bold transition flex items-center justify-center ${
                  selectedGrade === g
                    ? 'bg-blue-700 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {g}
              </button>
            ))}
            {selectedGrade !== 'all' && (
              <button
                onClick={() => setSelectedGrade('all')}
                className="text-[11px] text-blue-600 hover:underline ml-1"
              >
                Tất cả
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm tên lớp (vd: 6A1, 10CB1)..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Classes Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3 text-center w-12 border-r border-slate-200">STT</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Lớp Học</th>
                  <th className="py-2.5 px-3 text-center border-r border-slate-200">Khối</th>
                  <th className="py-2.5 px-3 text-center border-r border-slate-200">Cấp Học</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Điểm Trường Phụ Trách</th>
                  <th className="py-2.5 px-3 text-center border-r border-slate-200 font-extrabold text-blue-900">Sĩ Số Học Sinh</th>
                  <th className="py-2.5 px-3">Ghi Chú Phân Bổ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClasses.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-blue-50/40 transition">
                    <td className="py-2 px-3 text-center text-slate-500 font-mono border-r border-slate-200">{idx + 1}</td>
                    <td className="py-2 px-3 font-bold text-slate-900 border-r border-slate-200 flex items-center gap-1.5">
                      <GraduationCap className={`w-3.5 h-3.5 ${c.level === 'THPT' ? 'text-indigo-600' : 'text-blue-600'}`} />
                      <span>{c.className}</span>
                    </td>
                    <td className="py-2 px-3 text-center font-semibold text-slate-800 border-r border-slate-200">
                      Khối {c.grade}
                    </td>
                    <td className="py-2 px-3 text-center border-r border-slate-200">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.level === 'THPT' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {c.level}
                      </span>
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 font-medium text-slate-700">
                      <span className="flex items-center gap-1">
                        <MapPin className={`w-3 h-3 ${
                          c.campusId === 'main' 
                            ? 'text-blue-600' 
                            : c.campusId === 'dbk' 
                            ? 'text-amber-600' 
                            : 'text-emerald-600'
                        }`} />
                        <span>{c.campusName}</span>
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center font-black text-blue-900 text-sm border-r border-slate-200">
                      {c.studentCount}
                    </td>
                    <td className="py-2 px-3 text-slate-600 text-[11px]">
                      {c.campusId === 'main' && 'Điểm chính THPT (14 lớp cấp 3)'}
                      {c.campusId === 'dbk' && '6 lớp đầu mỗi khối THCS (6-9)'}
                      {c.campusId === 'tankieu' && 'Các lớp còn lại mỗi khối THCS (từ A7 trở đi, cách 11km)'}
                    </td>
                  </tr>
                ))}

                {filteredClasses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      Không tìm thấy lớp học nào phù hợp với bộ lọc hiện tại.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                <tr>
                  <td colSpan={5} className="py-2.5 px-3 text-right border-r border-slate-200 uppercase text-xs">
                    Tổng cộng kết quả lọc:
                  </td>
                  <td className="py-2.5 px-3 text-center text-blue-950 font-black text-base border-r border-slate-200">
                    {filterTotalStudents} HS
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 font-semibold text-xs">
                    ({filterTotalClasses} lớp được chọn)
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Bộ số liệu này đã được lưu vào mã nguồn và cơ sở dữ liệu server để tự động đưa vào toàn bộ các Kế hoạch, Quyết định và Báo cáo.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép số liệu!' : 'Sao chép dạng văn bản'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition"
            >
              Đóng cửa sổ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

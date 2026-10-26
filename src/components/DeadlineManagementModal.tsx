import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Calendar, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Edit3, 
  FileText, 
  Filter, 
  Sparkles, 
  Building2,
  Users,
  Search,
  BellRing
} from 'lucide-react';
import { SchoolDeadline, DeadlinePriority, calculateDaysRemaining } from '../types/deadline';

interface DeadlineManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  deadlines: SchoolDeadline[];
  onAddDeadline: (dl: Omit<SchoolDeadline, 'id' | 'createdAt'>) => void;
  onUpdateDeadline: (id: string, updates: Partial<SchoolDeadline>) => void;
  onDeleteDeadline: (id: string) => void;
  onScanDirectivesForDeadlines?: () => void;
}

export const DeadlineManagementModal: React.FC<DeadlineManagementModalProps> = ({
  isOpen,
  onClose,
  deadlines,
  onAddDeadline,
  onUpdateDeadline,
  onDeleteDeadline,
  onScanDirectivesForDeadlines,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'upcoming' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('2026-10-30');
  const [sourceDocument, setSourceDocument] = useState('Kế hoạch trường số 45/KH-THCS&THPTĐBK');
  const [assignedDepartment, setAssignedDepartment] = useState('Ban Giám hiệu & Tổ Chuyên môn');
  const [priority, setPriority] = useState<DeadlinePriority>('high');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleResetForm = () => {
    setTitle('');
    setDeadlineDate('2026-10-30');
    setSourceDocument('');
    setAssignedDepartment('');
    setPriority('high');
    setDescription('');
    setIsAddingNew(false);
    setEditingId(null);
  };

  const handleSaveDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadlineDate) return;

    if (editingId) {
      onUpdateDeadline(editingId, {
        title: title.trim(),
        deadlineDate,
        sourceDocument: sourceDocument.trim() || 'Văn bản nội bộ',
        assignedDepartment: assignedDepartment.trim() || 'Nhà trường',
        priority,
        description: description.trim(),
      });
    } else {
      onAddDeadline({
        title: title.trim(),
        deadlineDate,
        sourceDocument: sourceDocument.trim() || 'Văn bản nội bộ',
        assignedDepartment: assignedDepartment.trim() || 'Nhà trường',
        priority,
        status: 'pending',
        description: description.trim(),
        isAutomated: false,
      });
    }
    handleResetForm();
  };

  const handleStartEdit = (dl: SchoolDeadline) => {
    setEditingId(dl.id);
    setTitle(dl.title);
    setDeadlineDate(dl.deadlineDate);
    setSourceDocument(dl.sourceDocument);
    setAssignedDepartment(dl.assignedDepartment);
    setPriority(dl.priority);
    setDescription(dl.description || '');
    setIsAddingNew(true);
  };

  // Tính số ngày còn lại
  const enrichedDeadlines = deadlines.map((d) => ({
    ...d,
    daysRemaining: calculateDaysRemaining(d.deadlineDate),
  }));

  // Lọc dữ liệu
  const filteredDeadlines = enrichedDeadlines.filter((d) => {
    // Tìm kiếm
    const matchesQuery = 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sourceDocument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.assignedDepartment.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesQuery) return false;

    if (activeFilter === 'completed') return d.status === 'completed';
    if (d.status === 'completed') return false; // Các filter khác chỉ xem chưa hoàn thành

    if (activeFilter === 'urgent') return d.daysRemaining <= 3;
    if (activeFilter === 'upcoming') return d.daysRemaining > 3 && d.daysRemaining <= 7;
    return true;
  }).sort((a, b) => a.daysRemaining - b.daysRemaining);

  const urgentCount = enrichedDeadlines.filter((d) => d.status !== 'completed' && d.daysRemaining <= 3).length;
  const upcomingCount = enrichedDeadlines.filter((d) => d.status !== 'completed' && d.daysRemaining > 3 && d.daysRemaining <= 7).length;
  const completedCount = enrichedDeadlines.filter((d) => d.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center text-rose-300 shrink-0">
              <BellRing className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  Quản Lý Hạn Chót Báo Cáo & Deadline Công Việc
                </h3>
                {urgentCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white animate-pulse">
                    {urgentCount} việc khẩn
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Đồng bộ tự động từ Công văn Sở GDĐT, Kế hoạch nhà trường & Cập nhật thủ công
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Filters + Search + Add Button */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Tất cả ({deadlines.length - completedCount})
            </button>
            <button
              onClick={() => setActiveFilter('urgent')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
                activeFilter === 'urgent'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              Khẩn cấp ≤ 3 ngày ({urgentCount})
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
                activeFilter === 'upcoming'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-800 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Sắp tới hạn 4-7 ngày ({upcomingCount})
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1 ${
                activeFilter === 'completed'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Đã xong ({completedCount})
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm deadline, công văn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs w-44 sm:w-56 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => {
                handleResetForm();
                setIsAddingNew(!isAddingNew);
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-1 shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingNew ? 'Đóng form' : 'Thêm deadline'}</span>
            </button>
          </div>
        </div>

        {/* New / Edit Form Banner */}
        {isAddingNew && (
          <form 
            onSubmit={handleSaveDeadline} 
            className="p-4 bg-blue-50/70 border-b border-blue-200 text-xs animate-in slide-in-from-top-2 duration-150"
          >
            <div className="font-bold text-slate-800 mb-2 flex items-center justify-between">
              <span>{editingId ? 'Cập nhật thông tin hạn chót:' : 'Thêm mới hạn chót nhiệm vụ / báo cáo:'}</span>
              <button 
                type="button" 
                onClick={handleResetForm} 
                className="text-slate-500 hover:text-slate-800 text-[11px]"
              >
                Hủy bỏ
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Nội dung nhiệm vụ / Tên báo cáo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nộp bộ đề kiểm tra giữa HK1 về BGH duyệt"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Ngày hết hạn (Deadline) *
                </label>
                <input
                  type="date"
                  required
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Mức độ ưu tiên
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as DeadlinePriority)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="urgent">🚨 Khẩn cấp (Ưu tiên số 1)</option>
                  <option value="high">⚠️ Quan trọng (Cấp Sở / BGH)</option>
                  <option value="normal">📌 Bình thường (Định kỳ)</option>
                  <option value="low">🌱 Nhắc nhở theo dõi</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Căn cứ văn bản (Sở GDĐT hoặc Trường)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Công văn số 3953/SGDĐT-TCCB"
                  value={sourceDocument}
                  onChange={(e) => setSourceDocument(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Bộ phận / Người phụ trách thực hiện
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Tổ trưởng chuyên môn, Tổ Văn phòng..."
                  value={assignedDepartment}
                  onChange={(e) => setAssignedDepartment(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Ghi chú hướng dẫn chi tiết
                </label>
                <input
                  type="text"
                  placeholder="Yêu cầu cụ thể, hình thức nộp (file giấy hay qua CSDL ngành)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 text-xs focus:ring-1 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-xs"
              >
                {editingId ? 'Lưu thay đổi' : 'Thêm vào danh sách'}
              </button>
            </div>
          </form>
        )}

        {/* Deadline Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredDeadlines.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="font-medium text-sm">Không tìm thấy deadline nào phù hợp</p>
              <p className="text-xs text-slate-400 mt-1">
                Tất cả nhiệm vụ đã được xử lý hoặc không có mục nào khớp với bộ lọc.
              </p>
            </div>
          ) : (
            filteredDeadlines.map((item) => {
              const isUrgent = item.daysRemaining <= 3 && item.status !== 'completed';
              const isUpcoming = item.daysRemaining > 3 && item.daysRemaining <= 7 && item.status !== 'completed';
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCompleted
                      ? 'bg-slate-50/80 border-slate-200 opacity-60'
                      : isUrgent
                      ? 'bg-rose-50/60 border-rose-300 ring-1 ring-rose-400/40 shadow-xs'
                      : isUpcoming
                      ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Left: Checkbox + Content */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateDeadline(item.id, {
                            status: isCompleted ? 'pending' : 'completed',
                          })
                        }
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'border border-slate-300 hover:border-blue-500 text-transparent hover:text-blue-500'
                        }`}
                        title={isCompleted ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                      >
                        <CheckCircle2 className="w-4 h-4 fill-current" />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {/* Countdown Badge */}
                          {isCompleted ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> ĐÃ HOÀN THÀNH
                            </span>
                          ) : isUrgent ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-600 text-white flex items-center gap-1 animate-pulse">
                              <AlertTriangle className="w-3 h-3 text-white" />
                              {item.daysRemaining <= 0 ? 'HÔM NAY HẾT HẠN!' : `CÒN ${item.daysRemaining} NGÀY`}
                            </span>
                          ) : isUpcoming ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> CÒN {item.daysRemaining} NGÀY
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                              Còn {item.daysRemaining} ngày
                            </span>
                          )}

                          {/* Source Document Tag */}
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {item.sourceDocument}
                          </span>

                          {/* Automated Badge */}
                          {item.isAutomated && (
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" /> Tự động trích xuất
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4
                          className={`text-sm font-bold text-slate-900 leading-snug ${
                            isCompleted ? 'line-through text-slate-500' : ''
                          }`}
                        >
                          {item.title}
                        </h4>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Meta: Department & Date */}
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            Phụ trách: <strong className="text-slate-700">{item.assignedDepartment}</strong>
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Hạn chót: <strong className="text-slate-800">{item.deadlineDate}</strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                        title="Chỉnh sửa deadline"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteDeadline(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Xóa deadline"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            Hệ thống quản trị thời hạn: Trường THCS & THPT Đốc Binh Kiều
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

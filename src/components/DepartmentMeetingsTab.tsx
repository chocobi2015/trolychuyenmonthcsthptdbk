import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  FileText, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Upload, 
  FileUp, 
  Sparkles, 
  Trash2, 
  Edit3, 
  Eye, 
  BookOpen, 
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  X
} from 'lucide-react';
import { DepartmentMeeting, DepartmentTask, DepartmentInfo } from '../types/meeting';
import { SCHOOL_DEPARTMENTS, INITIAL_DEPARTMENT_MEETINGS } from '../data/departmentMeetingsData';
import { DEPARTMENT_FEEDBACKS_MEETING_3, DepartmentFeedbackGroup } from '../data/meetingRepliesData';
import { exportMeetingToDocx } from '../utils/docxExport';
import { extractTextFromFile } from '../utils/fileReader';

export const DepartmentMeetingsTab: React.FC = () => {
  const [meetings, setMeetings] = useState<DepartmentMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [viewingMeeting, setViewingMeeting] = useState<DepartmentMeeting | null>(null);
  const [opinionDeptFilter, setOpinionDeptFilter] = useState<string>('all');
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null);
  const [showAiContextModal, setShowAiContextModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Form states for creating / editing
  const [formDeptId, setFormDeptId] = useState('toan');
  const [formMeetingNumber, setFormMeetingNumber] = useState('');
  const [formWeek, setFormWeek] = useState('Tuần 1 - 2');
  const [formSemester, setFormSemester] = useState('Học kỳ I');
  const [formSchoolYear, setFormSchoolYear] = useState('2026 - 2027');
  const [formMeetingDate, setFormMeetingDate] = useState('');
  const [formLocation, setFormLocation] = useState('Phòng sinh hoạt chuyên môn - Điểm trường chính');
  const [formLeader, setFormLeader] = useState('');
  const [formSecretary, setFormSecretary] = useState('');
  const [formAttendeesTotal, setFormAttendeesTotal] = useState(14);
  const [formAttendeesPresent, setFormAttendeesPresent] = useState(14);
  const [formAttendeesAbsent, setFormAttendeesAbsent] = useState('Không');
  const [formTopic, setFormTopic] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formResolutionsText, setFormResolutionsText] = useState('');
  const [formTasks, setFormTasks] = useState<DepartmentTask[]>([]);
  const [activeFormTab, setActiveFormTab] = useState<'form' | 'upload_paste'>('form');
  const [pastedRawText, setPastedRawText] = useState('');
  const [isParsingText, setIsParsingText] = useState(false);

  // Load meetings from server or fallback
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/department-meetings');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setMeetings(json.data);
            try {
              localStorage.setItem('dbk_department_meetings', JSON.stringify(json.data));
            } catch (e) {}
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not load meetings from server, using local fallback:', err);
      }

      // Check localStorage
      try {
        const local = localStorage.getItem('dbk_department_meetings');
        if (local) {
          const parsed = JSON.parse(local);
          // If local has the old mock meetings (length > 3 or has meeting-toan-t1-2), prefer INITIAL_DEPARTMENT_MEETINGS
          const hasOldMock = parsed.some((m: any) => m.id === 'meeting-toan-t1-2' || m.id === 'meeting-tin-t1-2');
          const hasMeeting3 = parsed.some((m: any) => m.id === 'tra-loi-hop-to-cm-lan-3-08-10-2026');
          if (Array.isArray(parsed) && parsed.length > 0 && !hasOldMock && hasMeeting3) {
            setMeetings(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error(e);
      }

      // Default initial meetings
      setMeetings(INITIAL_DEPARTMENT_MEETINGS);
      try {
        localStorage.setItem('dbk_department_meetings', JSON.stringify(INITIAL_DEPARTMENT_MEETINGS));
      } catch (e) {}
      setIsLoading(false);
    };

    fetchMeetings();
  }, []);

  const saveMeetingToStorageAndServer = async (meeting: DepartmentMeeting) => {
    setMeetings(prev => {
      const idx = prev.findIndex(m => m.id === meeting.id);
      let updated: DepartmentMeeting[];
      if (idx !== -1) {
        updated = [...prev];
        updated[idx] = meeting;
      } else {
        updated = [meeting, ...prev];
      }
      try {
        localStorage.setItem('dbk_department_meetings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await fetch('/api/department-meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meeting),
      });
    } catch (err) {
      console.warn('Failed to sync meeting to server disk:', err);
    }
  };

  const deleteMeeting = async (id: string) => {
    if (!window.confirm('Thầy có chắc chắn muốn xóa biên bản họp tổ này không?')) return;

    setMeetings(prev => {
      const updated = prev.filter(m => m.id !== id);
      try {
        localStorage.setItem('dbk_department_meetings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      await fetch(`/api/department-meetings/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete meeting on server:', err);
    }

    if (viewingMeeting?.id === id) {
      setViewingMeeting(null);
    }
  };

  const handleOpenCreateModal = (prefillDeptId?: string) => {
    const dept = SCHOOL_DEPARTMENTS.find(d => d.id === (prefillDeptId || formDeptId)) || SCHOOL_DEPARTMENTS[0];
    setEditingMeetingId(null);
    setFormDeptId(dept.id);
    setFormMeetingNumber(`Số: 0${meetings.filter(m => m.departmentId === dept.id).length + 1}/BB-${dept.shortName.substring(0, 3).toUpperCase()}`);
    setFormWeek('Tuần 1 - 2');
    setFormSemester('Học kỳ I');
    setFormSchoolYear('2026 - 2027');
    setFormMeetingDate('14:00, Thứ Sáu ngày 05/09/2026');
    setFormLocation(`Văn phòng ${dept.name} - Điểm trường chính`);
    setFormLeader(dept.headTeacher + ' (Tổ trưởng)');
    setFormSecretary(dept.deputyHeadTeacher ? dept.deputyHeadTeacher + ' (Tổ phó)' : 'Giáo viên trong tổ');
    setFormAttendeesTotal(dept.memberCount);
    setFormAttendeesPresent(dept.memberCount);
    setFormAttendeesAbsent('Không');
    setFormTopic(`Sinh hoạt chuyên môn định kỳ 2 tuần/lần, rà soát tiến độ dạy học và phân công nhiệm vụ`);
    setFormContent(`I. ĐÁNH GIÁ TÌNH HÌNH CÔNG TÁC 2 TUẦN QUA:
- 100% giáo viên trong tổ thực hiện nghiêm túc quy chế chuyên môn, giờ giấc lên lớp tại cả 3 điểm trường (Điểm chính THPT, Điểm THCS Đốc Binh Kiều và Điểm Tân Kiều).
- Đã hoàn tất ký duyệt Kế hoạch bài dạy (giáo án) trên hệ thống điện tử đúng thời hạn quy định.
- Tình hình nền nếp học tập của học sinh các khối lớp phụ trách nhìn chung ổn định; một số lớp cuối cấp đã chủ động tăng tốc học tập.

II. KẾ HOẠCH VÀ PHƯƠNG HƯỚNG CÔNG TÁC 2 TUẦN TỚI:
- Bám sát khung kế hoạch giáo dục môn học, bảo đảm tiến độ phân phối chương trình theo Chương trình GDPT 2018.
- Tiếp tục tổ chức phụ đạo củng cố kiến thức cho học sinh có kết quả học tập ở mức Chưa đạt trong các buổi học thứ 2 (hoàn toàn miễn phí, không thu tiền).
- Tổ chức sinh hoạt chuyên môn theo hướng nghiên cứu bài học (bước 1: xây dựng bài học minh họa, bước 2: tiến hành dạy thử nghiệm và dự giờ).
- Tăng cường ứng dụng công nghệ thông tin và trí tuệ nhân tạo (AI) an toàn theo đúng 10 nguyên tắc của nhà trường.`);
    setFormResolutionsText(`100% giáo viên hoàn thành nhập điểm kiểm tra thường xuyên vào sổ điểm điện tử đúng hạn.
Thống nhất kế hoạch dự giờ, thao giảng định kỳ 2 tiết/giáo viên trong học kỳ I.
Giáo viên giảng dạy tại Điểm trường Tân Kiều (cách 11km) chủ động phương tiện, báo cáo kịp thời vướng mắc về thiết bị.`);
    setFormTasks([
      {
        id: `t-${Date.now()}-1`,
        task: 'Hoàn thiện giáo án minh họa sinh hoạt theo nghiên cứu bài học',
        assignee: dept.deputyHeadTeacher || dept.headTeacher,
        deadline: '15/09/2026',
        status: 'in_progress',
      },
      {
        id: `t-${Date.now()}-2`,
        task: 'Lập danh sách học sinh cần phụ đạo buổi 2 gửi Ban Giám hiệu',
        assignee: 'Giáo viên bộ môn các khối lớp',
        deadline: '18/09/2026',
        status: 'pending',
      }
    ]);
    setPastedRawText('');
    setActiveFormTab('form');
    setIsEditorModalOpen(true);
  };

  const handleOpenEditModal = (meeting: DepartmentMeeting) => {
    setEditingMeetingId(meeting.id);
    setFormDeptId(meeting.departmentId);
    setFormMeetingNumber(meeting.meetingNumber);
    setFormWeek(meeting.week);
    setFormSemester(meeting.semester);
    setFormSchoolYear(meeting.schoolYear);
    setFormMeetingDate(meeting.meetingDate);
    setFormLocation(meeting.location);
    setFormLeader(meeting.leader);
    setFormSecretary(meeting.secretary);
    setFormAttendeesTotal(meeting.attendees.total);
    setFormAttendeesPresent(meeting.attendees.present);
    setFormAttendeesAbsent(meeting.attendees.absent || 'Không');
    setFormTopic(meeting.topic);
    setFormContent(meeting.content);
    setFormResolutionsText(meeting.resolutions.join('\n'));
    setFormTasks(meeting.tasks || []);
    setActiveFormTab('form');
    setIsEditorModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const dept = SCHOOL_DEPARTMENTS.find(d => d.id === formDeptId) || SCHOOL_DEPARTMENTS[0];
    const resolutions = formResolutionsText
      .split('\n')
      .map(s => s.trim().replace(/^[-*•\d.]+\s*/, ''))
      .filter(Boolean);

    const updatedMeeting: DepartmentMeeting = {
      id: editingMeetingId || `meeting-${formDeptId}-${Date.now()}`,
      departmentId: dept.id,
      departmentName: dept.name,
      meetingNumber: formMeetingNumber || `Số: 01/BB-${dept.shortName.substring(0, 3).toUpperCase()}`,
      week: formWeek,
      semester: formSemester,
      schoolYear: formSchoolYear,
      meetingDate: formMeetingDate,
      location: formLocation,
      leader: formLeader,
      secretary: formSecretary,
      attendees: {
        total: Number(formAttendeesTotal) || dept.memberCount,
        present: Number(formAttendeesPresent) || dept.memberCount,
        absent: formAttendeesAbsent || 'Không',
      },
      topic: formTopic,
      content: formContent,
      resolutions: resolutions.length > 0 ? resolutions : ['Toàn thể các thành viên trong tổ nhất trí cao với nội dung cuộc họp.'],
      tasks: formTasks,
      createdAt: editingMeetingId ? (meetings.find(m => m.id === editingMeetingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveMeetingToStorageAndServer(updatedMeeting);
    setIsEditorModalOpen(false);
    setSaveSuccessMsg(`Đã lưu thành công biên bản họp ${dept.name} (${formWeek})`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Toggle task status
  const handleToggleTaskStatus = (meetingId: string, taskId: string) => {
    setMeetings(prev => {
      const updated = prev.map(m => {
        if (m.id !== meetingId) return m;
        const newTasks = m.tasks.map(t => {
          if (t.id !== taskId) return t;
          const nextStatus: 'pending' | 'in_progress' | 'completed' = 
            t.status === 'completed' ? 'in_progress' : 'completed';
          return { ...t, status: nextStatus };
        });
        const newMeeting = { ...m, tasks: newTasks, updatedAt: new Date().toISOString() };
        saveMeetingToStorageAndServer(newMeeting);
        return newMeeting;
      });
      return updated;
    });
  };

  // Parse raw text or uploaded document
  const handleParseRawText = (rawText: string) => {
    if (!rawText.trim()) return;
    setIsParsingText(true);

    try {
      // Find department
      let foundDept = SCHOOL_DEPARTMENTS[0];
      for (const d of SCHOOL_DEPARTMENTS) {
        if (rawText.toLowerCase().includes(d.name.toLowerCase()) || rawText.toLowerCase().includes(d.shortName.toLowerCase())) {
          foundDept = d;
          break;
        }
      }
      setFormDeptId(foundDept.id);

      // Meeting number
      const mNumMatch = rawText.match(/Số:\s*([0-9a-zA-Z\/\-_]+)/i);
      if (mNumMatch) setFormMeetingNumber(`Số: ${mNumMatch[1]}`);

      // Week match
      const weekMatch = rawText.match(/Tuần\s*([0-9\s\-]+)/i);
      if (weekMatch) setFormWeek(`Tuần ${weekMatch[1].trim()}`);

      // Topic match
      const topicMatch = rawText.match(/(?:Chủ đề|Nội dung chính|Về việc)[:\s]+([^\n]+)/i);
      if (topicMatch) setFormTopic(topicMatch[1].trim());

      // Meeting date match
      const dateMatch = rawText.match(/(?:Thời gian|Hôm nay|ngày)[:\s]+([^\n]+)/i);
      if (dateMatch) setFormMeetingDate(dateMatch[1].trim());

      // Location match
      const locMatch = rawText.match(/(?:Địa điểm)[:\s]+([^\n]+)/i);
      if (locMatch) setFormLocation(locMatch[1].trim());

      // Leader match
      const leaderMatch = rawText.match(/(?:Chủ trì|Chủ tọa)[:\s]+([^\n]+)/i);
      if (leaderMatch) setFormLeader(leaderMatch[1].trim());

      // Secretary match
      const secMatch = rawText.match(/(?:Thư ký)[:\s]+([^\n]+)/i);
      if (secMatch) setFormSecretary(secMatch[1].trim());

      // Set raw content into formContent
      setFormContent(rawText);

      setActiveFormTab('form');
    } finally {
      setIsParsingText(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsParsingText(true);
      const extractedText = await extractTextFromFile(file);
      setPastedRawText(extractedText);
      handleParseRawText(extractedText);
    } catch (err: any) {
      alert(`Không thể trích xuất tệp: ${err.message || 'Lỗi không xác định'}`);
    } finally {
      setIsParsingText(false);
    }
  };

  const handleCopyMeetingText = (m: DepartmentMeeting) => {
    const text = `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nTRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU\n${m.departmentName.toUpperCase()}\n${m.meetingNumber}\n\nBIÊN BẢN HỌP TỔ CHUYÊN MÔN (${m.week} - ${m.semester})\n1. Thời gian: ${m.meetingDate}\n2. Địa điểm: ${m.location}\n3. Chủ trì: ${m.leader}\n4. Thư ký: ${m.secretary}\n5. Thành phần: ${m.attendees.present}/${m.attendees.total} thành viên (Vắng: ${m.attendees.absent || '0'})\n\nCHỦ ĐỀ: ${m.topic}\n\nNỘI DUNG CUỘC HỌP:\n${m.content}\n\nKẾT LUẬN & NGHỊ QUYẾT:\n${m.resolutions.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nPHÂN CÔNG NHIỆM VỤ:\n${m.tasks.map(t => `- [${t.status === 'completed' ? 'Đã xong' : 'Đang làm'}] ${t.task} (Phụ trách: ${t.assignee}, Hạn: ${t.deadline})`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedId(m.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter meetings
  const filteredMeetings = meetings.filter(m => {
    const matchDept = selectedDeptId === 'all' || m.departmentId === selectedDeptId;
    const matchWeek = selectedWeek === 'all' || m.week.includes(selectedWeek);
    const matchSearch = !searchTerm || 
      m.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.tasks.some(t => t.task.toLowerCase().includes(searchTerm.toLowerCase()) || t.assignee.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchDept && matchWeek && matchSearch;
  });

  // Calculate statistics
  const totalTasks = meetings.reduce((acc, m) => acc + (m.tasks?.length || 0), 0);
  const completedTasks = meetings.reduce((acc, m) => acc + (m.tasks?.filter(t => t.status === 'completed').length || 0), 0);
  const distinctDeptsWithMeetings = new Set(meetings.map(m => m.departmentId)).size;

  return (
    <div className="space-y-6">
      {/* Banner & Intro */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
              <Users className="w-3.5 h-3.5 text-indigo-300" />
              <span>Hồ Sơ Chuyên Môn • Sinh Hoạt Tổ 2 Tuần/Lần</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Tổ Chuyên Môn & Biên Bản Họp Định Kỳ
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Nơi cập nhật toàn bộ nội dung sinh hoạt tổ chuyên môn mỗi 2 tuần, biên bản họp tổ của 07 tổ chuyên môn và tổ văn phòng trường THCS & THPT Đốc Binh Kiều. Dữ liệu này cung cấp <strong className="text-indigo-200">ngữ cảnh thực tế sâu sắc nhất</strong> để BGH và AI hiểu rõ công việc, tiến độ và vướng mắc của từng tổ khi xây dựng các kế hoạch triển khai của nhà trường.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={() => handleOpenCreateModal()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm / Nộp Biên Bản Mới</span>
            </button>
            <button
              onClick={() => setShowAiContextModal(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 font-semibold text-sm transition-all cursor-pointer backdrop-blur-sm"
              title="Xem ngữ cảnh chuyên môn tổng hợp cho AI"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ngữ Cảnh Chuyên Môn Cho AI</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-indigo-800/60">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Tổ Chuyên Môn</div>
            <div className="text-xl font-bold text-white mt-1">7 Tổ + 1 VP</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">102 GV & 18 NV</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Hồ Sơ & Văn Bản</div>
            <div className="text-xl font-bold text-white mt-1">{meetings.length} Văn bản</div>
            <div className="text-[11px] text-indigo-300 mt-0.5">2 Hướng dẫn + 2 Trả lời họp tổ (Lần 2 & 3)</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Nhiệm Vụ 2 Tuần</div>
            <div className="text-xl font-bold text-white mt-1">{totalTasks} Nhiệm vụ</div>
            <div className="text-[11px] text-emerald-400 mt-0.5">Đã hoàn thành {completedTasks}/{totalTasks}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-xs text-slate-400 font-medium">Chu kỳ Sinh Hoạt</div>
            <div className="text-xl font-bold text-white mt-1">2 Tuần / Lần</div>
            <div className="text-[11px] text-amber-300 mt-0.5">Theo Điều lệ trường học</div>
          </div>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-medium">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Departments Horizontal Selector / Quick View */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Chọn Tổ Chuyên Môn Để Lọc Hoặc Nộp Biên Bản</span>
          </h2>
          <span className="text-xs text-slate-500">Bấm vào tổ để xem nhanh hoặc thêm biên bản</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-left flex flex-col justify-between border cursor-pointer ${
              selectedDeptId === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span>Tất cả các tổ</span>
            <span className={`text-[11px] font-normal mt-1 ${selectedDeptId === 'all' ? 'text-indigo-200' : 'text-slate-500'}`}>
              {meetings.length} biên bản
            </span>
          </button>
          {SCHOOL_DEPARTMENTS.map(dept => {
            const count = meetings.filter(m => m.departmentId === dept.id).length;
            const isSelected = selectedDeptId === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-left flex flex-col justify-between border cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span className="truncate">{dept.shortName}</span>
                <span className={`text-[11px] font-normal mt-1 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {count} biên bản • {dept.memberCount} GV
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo chủ đề, nội dung, người chủ trì, nhiệm vụ..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-600 whitespace-nowrap">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Đợt họp:</span>
          </div>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full sm:w-auto"
          >
            <option value="all">Tất cả các tuần (Tuần 1 - 35)</option>
            <option value="Tuần 1 - 2">Tuần 1 - 2 (Đầu năm học)</option>
            <option value="Tuần 3 - 4">Tuần 3 - 4</option>
            <option value="Tuần 5 - 6">Tuần 5 - 6 (Chuẩn bị giữa kỳ I)</option>
            <option value="Tuần 7 - 8">Tuần 7 - 8</option>
            <option value="Tuần 9 - 10">Tuần 9 - 10 (Sơ kết giữa kỳ I)</option>
          </select>

          <button
            onClick={() => handleOpenCreateModal(selectedDeptId !== 'all' ? selectedDeptId : undefined)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer shadow-sm ml-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Nộp biên bản mới</span>
          </button>
        </div>
      </div>

      {/* Meeting Cards List */}
      <div className="space-y-4">
        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Chưa tìm thấy biên bản họp tổ phù hợp</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Thầy có thể thay đổi bộ lọc hoặc bấm nút "Nộp biên bản mới" để đưa nội dung họp tổ lên hệ thống.
            </p>
            <button
              onClick={() => handleOpenCreateModal()}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nộp biên bản ngay</span>
            </button>
          </div>
        ) : (
          filteredMeetings.map((meeting) => {
            const isAllDepts = meeting.departmentId === 'all';
            const dept = SCHOOL_DEPARTMENTS.find(d => d.id === meeting.departmentId) || {
              id: 'all',
              name: meeting.departmentName || 'Chỉ đạo Toàn trường (07 Tổ CM & VP)',
              shortName: 'Toàn trường',
              color: 'text-indigo-800',
              bgLight: 'bg-indigo-50',
              borderLight: 'border-indigo-300'
            };
            return (
              <div 
                key={meeting.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-all overflow-hidden"
              >
                {/* Header row of card */}
                <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${dept.bgLight} ${dept.color} border ${dept.borderLight}`}>
                        {dept.name}
                      </span>
                      {meeting.id === 'tra-loi-hop-to-cm-lan-3-08-10-2026' && (
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          BẢNG TỔNG HỢP & TRẢ LỜI CỦA BGH (08/10/2026)
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200">
                        {meeting.meetingNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {meeting.week}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {meeting.meetingDate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => setViewingMeeting(meeting)}>
                      {meeting.topic}
                    </h3>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {meeting.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        Chủ trì: <strong className="text-slate-800">{meeting.leader}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        Thư ký: <strong className="text-slate-800">{meeting.secretary}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        Tham dự: <strong className="text-emerald-700">{meeting.attendees.present}/{meeting.attendees.total}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 self-start">
                    <button
                      onClick={() => setViewingMeeting(meeting)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all cursor-pointer"
                      title="Xem toàn văn chuẩn A4"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem A4</span>
                    </button>
                    {meeting.id === 'tra-loi-hop-to-cm-lan-3-08-10-2026' ? (
                      <a
                        href="/api/department-meetings/download/tra-loi-lan-3"
                        download="TRẢ LỜI HỌP TỔ LẦN 3 - 08-10-2026.docx"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
                        title="Tải tệp Word (.docx) chuẩn thể thức Nghị định 30"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Tải file Word .docx</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => exportMeetingToDocx(meeting)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                        title="Xuất file Word .docx"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        <span>Word</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleCopyMeetingText(meeting)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                      title="Sao chép toàn văn biên bản"
                    >
                      {copiedId === meeting.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(meeting)}
                      className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                      title="Chỉnh sửa biên bản"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMeeting(meeting.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                      title="Xóa biên bản"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content snippet & Resolutions */}
                <div className="p-5 bg-slate-50/60 grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Tóm tắt diễn biến & thảo luận chuyên môn:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed line-clamp-3 bg-white p-3 rounded-lg border border-slate-200/80">
                      {meeting.content.replace(/^I\..*?\n/, '').substring(0, 320)}...
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Nghị quyết thống nhất của tổ ({meeting.resolutions?.length || 0}):</span>
                    </div>
                    <ul className="space-y-1 bg-white p-3 rounded-lg border border-slate-200/80">
                      {(meeting.resolutions || []).slice(0, 3).map((res, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-700 leading-snug">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span className="line-clamp-1">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Assigned Tasks for 2 weeks */}
                {meeting.tasks && meeting.tasks.length > 0 && (
                  <div className="px-5 py-3 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Phân công nhiệm vụ 2 tuần tới:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 flex-1 sm:justify-end">
                      {meeting.tasks.map(task => (
                        <div
                          key={task.id}
                          onClick={() => handleToggleTaskStatus(meeting.id, task.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-all ${
                            task.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 line-through'
                              : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                          }`}
                          title={`Bấm để chuyển trạng thái (Người nhận: ${task.assignee}, Hạn: ${task.deadline})`}
                        >
                          {task.status === 'completed' ? (
                            <CheckSquare className="w-3 h-3 text-emerald-600 shrink-0" />
                          ) : (
                            <Square className="w-3 h-3 text-amber-600 shrink-0" />
                          )}
                          <span className="font-medium truncate max-w-xs">{task.task}</span>
                          <span className="text-[10px] opacity-75 font-mono">({task.assignee})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: View Meeting Minutes Standard A4 Format */}
      {viewingMeeting && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn border border-slate-200">
            {/* Modal Top Bar */}
            <div className="px-6 py-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base">
                    {viewingMeeting.id === 'tra-loi-hop-to-cm-lan-3-08-10-2026'
                      ? 'Bảng Tổng Hợp Ý Kiến 6 Tổ & Trả Lời Của BGH (Lần 3 - 08/10/2026)'
                      : `Biên Bản Họp ${viewingMeeting.departmentName} (${viewingMeeting.week})`}
                  </h3>
                  <div className="text-[11px] text-slate-400">
                    {viewingMeeting.meetingNumber} • {viewingMeeting.meetingDate}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {viewingMeeting.id === 'tra-loi-hop-to-cm-lan-3-08-10-2026' ? (
                  <a
                    href="/api/department-meetings/download/tra-loi-lan-3"
                    download="TRẢ LỜI HỌP TỔ LẦN 3 - 08-10-2026.docx"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                    title="Tải tệp Word (.docx) chuẩn thể thức Nghị định 30"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Word (.docx)</span>
                  </a>
                ) : (
                  <button
                    onClick={() => exportMeetingToDocx(viewingMeeting)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất Word (.docx)</span>
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In</span>
                </button>
                <button
                  onClick={() => handleCopyMeetingText(viewingMeeting)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </button>
                <button
                  onClick={() => setViewingMeeting(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100">
              {viewingMeeting.id === 'tra-loi-hop-to-cm-lan-3-08-10-2026' ? (
                /* Formal Administrative Document (Văn bản Kế hoạch / Thông báo trả lời theo Tổ từ trên xuống dưới - Nghị định 30) */
                <div className="bg-white rounded-xl shadow-lg border border-slate-300 p-6 sm:p-12 max-w-4xl mx-auto space-y-6 font-serif text-slate-900 leading-relaxed text-sm">
                  {/* Header 2 Columns Quốc hiệu & Cơ quan ban hành */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200 text-center">
                    <div>
                      <div className="text-xs text-slate-700">SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP</div>
                      <div className="text-xs sm:text-sm font-bold uppercase text-slate-900">TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU</div>
                      <div className="text-xs text-slate-800 font-semibold pt-1">Số: 186/TB-THCS-THPT</div>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold uppercase text-slate-900">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                      <div className="text-xs sm:text-sm font-bold underline underline-offset-4 text-slate-900">Độc lập - Tự do - Hạnh phúc</div>
                      <div className="text-xs italic text-slate-600 pt-1">Tháp Mười, ngày 09 tháng 10 năm 2026</div>
                    </div>
                  </div>

                  {/* Document Title */}
                  <div className="text-center py-3 space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold uppercase text-slate-950">
                      THÔNG BÁO KẾT LUẬN
                    </h2>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Về việc tiếp thu, giải đáp và chỉ đạo thực hiện ý kiến, kiến nghị<br />
                      của các tổ chuyên môn tại kỳ họp định kỳ lần 3, ngày 08/10/2026
                    </h3>
                  </div>

                  {/* Căn cứ pháp lý */}
                  <div className="space-y-1.5 text-xs text-slate-700 italic border-l-2 border-indigo-400 pl-4 py-1">
                    <p>• Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15/9/2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;</p>
                    <p>• Căn cứ Kế hoạch thời gian năm học 2026 - 2027 và Kế hoạch giáo dục nhà trường của Trường THCS và THPT Đốc Binh Kiều;</p>
                    <p>• Căn cứ Biên bản họp định kỳ lần 3 ngày 08/10/2026 của 06 Tổ chuyên môn trong nhà trường;</p>
                  </div>

                  <p className="indent-8 text-justify text-slate-800">
                    Ban Giám hiệu Trường THCS và THPT Đốc Binh Kiều đã tổng hợp đầy đủ các ý kiến, kiến nghị và đề xuất của từng tổ chuyên môn. Nhằm kịp thời tháo gỡ khó khăn, thống nhất quy trình chuyên môn và bảo đảm thực hiện thắng lợi nhiệm vụ năm học, Ban Giám hiệu thông báo kết luận tiếp thu, giải đáp chi tiết theo từng tổ chuyên môn như sau:
                  </p>

                  {/* Action & Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3.5 bg-blue-50 border border-blue-200 rounded-xl gap-3 font-sans not-italic">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-blue-950 flex items-center gap-1 mr-1">
                        <Filter className="w-3.5 h-3.5 text-blue-700" />
                        <span>Xem theo tổ:</span>
                      </span>
                      {[
                        { id: 'all', label: 'Tất cả 06 Tổ' },
                        { id: 'toan', label: 'I. Tổ Toán' },
                        { id: 'ly-hoa-sinh-cn', label: 'II. Tổ KHTN - Công nghệ' },
                        { id: 'van-tv-tb', label: 'III. Tổ Ngữ văn' },
                        { id: 'su-dia-gdcd', label: 'IV. Tổ Sử - Địa - GDCD' },
                        { id: 'the-duc-gdqp-nt', label: 'V. Tổ Thể dục - GDQPAN' },
                        { id: 'tieng-anh-tin-hoc', label: 'VI. Tổ Tiếng Anh - Tin học' }
                      ].map(f => (
                        <button
                          key={f.id}
                          onClick={() => setOpinionDeptFilter(f.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                            opinionDeptFilter === f.id
                              ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    <a
                      href="/api/department-meetings/download/tra-loi-lan-3"
                      download="TRẢ LỜI HỌP TỔ LẦN 3 - 08-10-2026.docx"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shrink-0 shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Bản Word (.docx)</span>
                    </a>
                  </div>

                  {/* Body Content: Trình bày từ trên xuống dưới THEO TỔ (Dạng văn bản kế hoạch) */}
                  <div className="space-y-8 pt-2">
                    {DEPARTMENT_FEEDBACKS_MEETING_3.filter(
                      dept => opinionDeptFilter === 'all' || dept.deptId === opinionDeptFilter
                    ).map((dept) => (
                      <div key={dept.deptId} className="space-y-4">
                        {/* Heading Tổ */}
                        <div className="border-b-2 border-slate-900 pb-1.5 pt-2 flex items-center justify-between">
                          <h4 className="text-base sm:text-lg font-bold uppercase text-slate-950 tracking-wide">
                            {dept.orderRom}. {dept.deptName}
                          </h4>
                          <span className="font-sans text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 font-semibold">
                            {dept.opinions.length} nội dung
                          </span>
                        </div>

                        {/* Opinions list inside department */}
                        <div className="space-y-6 pl-1 sm:pl-3">
                          {dept.opinions.map((op, opIdx) => (
                            <div key={opIdx} className="space-y-3">
                              {/* Opinion Title */}
                              <div className="font-bold text-slate-950 text-sm sm:text-base flex items-baseline gap-2">
                                <span className="text-blue-900">{opIdx + 1}.</span>
                                <span>{op.title}</span>
                                {op.contributor && (
                                  <span className="font-normal italic text-xs text-slate-600 font-sans">
                                    ({op.contributor})
                                  </span>
                                )}
                              </div>

                              {/* a) Nội dung ý kiến đề xuất */}
                              <div className="bg-slate-50 border-l-4 border-slate-400 p-3.5 rounded-r-lg space-y-2">
                                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                                  <span>a) Nội dung ý kiến, đề xuất của Tổ:</span>
                                </div>
                                <div className="space-y-1.5 text-slate-800 text-xs sm:text-sm pl-2">
                                  {op.opinionContent.map((line, lIdx) => (
                                    <p key={lIdx} className="leading-relaxed">
                                      {line}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* b) Trả lời và chỉ đạo của Ban Giám hiệu */}
                              <div className="bg-emerald-50/70 border-l-4 border-emerald-600 p-3.5 rounded-r-lg space-y-2">
                                <div className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5 font-sans">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                  <span>b) {op.responseTitle}</span>
                                </div>
                                <div className="space-y-1.5 text-slate-900 text-xs sm:text-sm pl-2">
                                  {op.responseContent.map((line, rIdx) => (
                                    <p key={rIdx} className="leading-relaxed">
                                      {line}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* Legal basis & Assignment info */}
                              {(op.legalBasis || op.assignment) && (
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-slate-600 pl-4 pt-0.5">
                                  {op.legalBasis && (
                                    <div className="flex items-center gap-1">
                                      <strong className="text-slate-800">Căn cứ:</strong>
                                      <span className="italic">{op.legalBasis}</span>
                                    </div>
                                  )}
                                  {op.assignment && (
                                    <div className="flex items-center gap-1">
                                      <strong className="text-slate-800">Đơn vị thực hiện:</strong>
                                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                                        {op.assignment}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Section VII: TỔ CHỨC THỰC HIỆN */}
                  {opinionDeptFilter === 'all' && (
                    <div className="border-t-2 border-slate-900 pt-5 mt-8 space-y-3">
                      <h4 className="text-base sm:text-lg font-bold uppercase text-slate-950">
                        VII. TỔ CHỨC THỰC HIỆN
                      </h4>
                      <div className="space-y-2 text-slate-800 text-xs sm:text-sm pl-2">
                        <p>
                          <strong>1.</strong> Ban Giám hiệu phân công các đồng chí Phó Hiệu trưởng phụ trách chuyên môn trực tiếp rà soát, bổ sung các nội dung đã thống nhất vào Kế hoạch kiểm tra đánh giá của nhà trường; chỉ đạo văn phòng chuyên môn ban hành phụ lục điều chỉnh gửi về các tổ bộ môn.
                        </p>
                        <p>
                          <strong>2.</strong> Các đồng chí Tổ trưởng chuyên môn chịu trách nhiệm phổ biến chi tiết toàn bộ nội dung văn bản này đến từng cán bộ, giáo viên, nhân viên trong tổ tại phiên họp chuyên môn gần nhất; tổ chức thực hiện nghiêm túc, đúng tiến độ.
                        </p>
                        <p>
                          <strong>3.</strong> Bộ phận Kế toán - Văn phòng khẩn trương hoàn thiện hồ sơ rà soát thâm niên nhà giáo của giáo viên theo đúng chỉ đạo tại văn bản này; lập bảng kê chi trả dạy thay, dạy thừa giờ kịp thời, chính xác cho thầy cô giáo.
                        </p>
                        <p>
                          <strong>4.</strong> Toàn thể cán bộ, giáo viên, nhân viên nhà trường nêu cao tinh thần trách nhiệm, tăng cường đoàn kết nội bộ, thực hiện tốt kỷ cương nền nếp và văn hóa ứng xử sư phạm, chung tay xây dựng trường học hạnh phúc, hoàn thành xuất sắc nhiệm vụ năm học 2026 - 2027./.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Footer & Signatures */}
                  <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-300 font-serif text-xs">
                    <div className="space-y-1">
                      <div className="font-bold italic text-slate-900">Nơi nhận:</div>
                      <div className="text-slate-700 leading-relaxed text-[11px]">
                        - Lãnh đạo trường (để chỉ đạo);<br />
                        - 06 Tổ chuyên môn (để thực hiện);<br />
                        - Bộ phận VP, Kế toán (để thực hiện);<br />
                        - Lưu: VT, BGH.
                      </div>
                    </div>
                    <div className="text-center space-y-14">
                      <div>
                        <div className="font-bold uppercase text-slate-900">TM. BAN GIÁM HIỆU</div>
                        <div className="font-bold uppercase text-slate-900">HIỆU TRƯỞNG</div>
                        <div className="italic text-slate-500 text-[11px]">(Đã ký và đóng dấu)</div>
                      </div>
                      <div className="font-bold text-slate-900 text-sm">
                        Lê Thanh Cường
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Simulated A4 Document Paper */
                <div className="bg-white shadow-lg border border-slate-300 max-w-3xl mx-auto p-8 sm:p-12 text-slate-900 font-serif leading-relaxed text-sm">
                  {/* Header 2 Columns */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                    <div className="text-center space-y-0.5">
                      <div className="text-xs font-normal">SỞ GDĐT TỈNH ĐỒNG THÁP</div>
                      <div className="text-xs font-bold uppercase">TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU</div>
                      <div className="text-xs font-bold uppercase text-indigo-900">{viewingMeeting.departmentName}</div>
                      <div className="text-xs font-normal text-slate-600 pt-1">{viewingMeeting.meetingNumber}</div>
                    </div>
                    <div className="text-center space-y-0.5">
                      <div className="text-xs font-bold uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                      <div className="text-xs font-bold underline underline-offset-4">Độc lập - Tự do - Hạnh phúc</div>
                      <div className="text-xs italic text-slate-600 pt-1.5">{viewingMeeting.meetingDate}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="text-center py-6 space-y-1">
                    <h1 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
                      {viewingMeeting.id.includes('tra-loi')
                        ? 'BẢNG TỔNG HỢP Ý KIẾN HỌP TỔ CHUYÊN MÔN VÀ TRẢ LỜI CỦA BGH'
                        : 'BIÊN BẢN HỌP TỔ CHUYÊN MÔN'}
                    </h1>
                    <p className="text-xs italic font-semibold text-slate-700">
                      ({viewingMeeting.week} - {viewingMeeting.semester} - Năm học {viewingMeeting.schoolYear})
                    </p>
                  </div>

                  {/* Meeting Meta */}
                  <div className="space-y-1.5 py-2 border-b border-slate-200 text-xs">
                    <div><strong>1. Thời gian:</strong> {viewingMeeting.meetingDate}</div>
                    <div><strong>2. Địa điểm:</strong> {viewingMeeting.location}</div>
                    <div>
                      <strong>3. Thành phần tham dự:</strong> Có mặt {viewingMeeting.attendees.present}/{viewingMeeting.attendees.total} thành viên; 
                      {viewingMeeting.attendees.absent ? ` Vắng: ${viewingMeeting.attendees.absent}` : ' Vắng: Không'}
                    </div>
                    <div><strong>4. Chủ trì:</strong> {viewingMeeting.leader}</div>
                    <div><strong>5. Thư ký:</strong> {viewingMeeting.secretary}</div>
                  </div>

                  {/* Topic */}
                  <div className="my-4 p-3 bg-indigo-50/70 border-l-4 border-indigo-600 rounded-r text-xs">
                    <span className="font-bold text-indigo-950 uppercase">Chủ đề sinh hoạt chuyên môn: </span>
                    <span className="font-semibold text-indigo-900">{viewingMeeting.topic}</span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4 my-6 text-xs sm:text-sm">
                    <div className="font-bold uppercase tracking-wider text-slate-900">
                      NỘI DUNG VÀ DIỄN BIẾN CUỘC HỌP:
                    </div>
                    <div className="whitespace-pre-line leading-relaxed text-slate-800 space-y-2">
                      {viewingMeeting.content}
                    </div>
                  </div>

                  {/* Resolutions */}
                  {viewingMeeting.resolutions && viewingMeeting.resolutions.length > 0 && (
                    <div className="my-6 space-y-2 text-xs sm:text-sm">
                      <div className="font-bold uppercase tracking-wider text-slate-900">
                        KẾT LUẬN VÀ NGHỊ QUYẾT:
                      </div>
                      <ol className="list-decimal pl-5 space-y-1.5 text-slate-800">
                        {viewingMeeting.resolutions.map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Tasks Table */}
                  {viewingMeeting.tasks && viewingMeeting.tasks.length > 0 && (
                    <div className="my-6 space-y-2 text-xs">
                      <div className="font-bold uppercase tracking-wider text-slate-900">
                        PHÂN CÔNG NHIỆM VỤ CỤ THỂ:
                      </div>
                      <table className="w-full border-collapse border border-slate-300 text-left">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border border-slate-300 p-2 text-center w-10">STT</th>
                            <th className="border border-slate-300 p-2">Nội dung nhiệm vụ</th>
                            <th className="border border-slate-300 p-2 w-44">Người phụ trách</th>
                            <th className="border border-slate-300 p-2 w-28 text-center">Thời hạn</th>
                            <th className="border border-slate-300 p-2 w-28 text-center">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewingMeeting.tasks.map((t, idx) => (
                            <tr key={t.id}>
                              <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                              <td className="border border-slate-300 p-2">{t.task}</td>
                              <td className="border border-slate-300 p-2">{t.assignee}</td>
                              <td className="border border-slate-300 p-2 text-center">{t.deadline}</td>
                              <td className="border border-slate-300 p-2 text-center">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {t.status === 'completed' ? 'Đã xong' : 'Đang làm'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-slate-200 text-center text-xs">
                    <div className="space-y-16">
                      <div>
                        <div className="font-bold uppercase">THƯ KÝ</div>
                        <div className="italic text-slate-500">(Ký và ghi rõ họ tên)</div>
                      </div>
                      <div className="font-bold">{viewingMeeting.secretary}</div>
                    </div>
                    <div className="space-y-16">
                      <div>
                        <div className="font-bold uppercase">
                          {viewingMeeting.id.includes('tra-loi') ? 'HIỆU TRƯỞNG' : 'TỔ TRƯỞNG CHUYÊN MÔN'}
                        </div>
                        <div className="italic text-slate-500">(Ký và ghi rõ họ tên)</div>
                      </div>
                      <div className="font-bold">{viewingMeeting.leader}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Modal: Create / Edit Meeting Minutes Form */}
      {isEditorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn border border-slate-200">
            {/* Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileUp className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base">
                  {editingMeetingId ? 'Chỉnh Sửa Biên Bản Họp Tổ' : 'Nộp Biên Bản Họp Tổ Chuyên Môn (2 Tuần/Lần)'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 shrink-0 gap-4">
              <button
                onClick={() => setActiveFormTab('form')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeFormTab === 'form'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Nhập Form Biểu Mẫu Chuẩn
              </button>
              <button
                onClick={() => setActiveFormTab('upload_paste')}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeFormTab === 'upload_paste'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Tải File (.docx / .pdf) Hoặc Dán Văn Bản</span>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeFormTab === 'upload_paste' ? (
                <div className="space-y-6">
                  {/* File Upload Box */}
                  <div className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 rounded-xl p-6 text-center transition-all">
                    <FileUp className="w-10 h-10 text-indigo-500 mx-auto mb-2" />
                    <h4 className="font-bold text-slate-800 text-sm">Tải lên tệp biên bản của Tổ (.docx, .pdf, .txt)</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Hệ thống tự động đọc và bóc tách các trường: Tổ chuyên môn, ngày họp, chủ trì, thư ký, nội dung và phân công nhiệm vụ.
                    </p>
                    <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Chọn tệp từ máy tính</span>
                      <input 
                        type="file" 
                        accept=".docx,.pdf,.txt" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Raw text paste area */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase">
                      Hoặc Dán Toàn Bộ Nội Dung Biên Bản Họp Tổ Vào Đây:
                    </label>
                    <textarea
                      rows={8}
                      value={pastedRawText}
                      onChange={(e) => setPastedRawText(e.target.value)}
                      placeholder="Dán toàn văn biên bản họp tổ (bao gồm thời gian, thành phần, nội dung đánh giá 2 tuần qua, phương hướng 2 tuần tới, phân công nhiệm vụ)..."
                      className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleParseRawText(pastedRawText)}
                        disabled={!pastedRawText.trim() || isParsingText}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-lg cursor-pointer transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Tự Động Bóc Tách Vào Biểu Mẫu Chuẩn</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveForm} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tổ chuyên môn *</label>
                      <select
                        value={formDeptId}
                        onChange={(e) => {
                          const newDeptId = e.target.value;
                          setFormDeptId(newDeptId);
                          const dept = SCHOOL_DEPARTMENTS.find(d => d.id === newDeptId);
                          if (dept) {
                            setFormMeetingNumber(`Số: 0${meetings.filter(m => m.departmentId === dept.id).length + 1}/BB-${dept.shortName.substring(0, 3).toUpperCase()}`);
                            setFormLeader(dept.headTeacher + ' (Tổ trưởng)');
                            setFormSecretary(dept.deputyHeadTeacher ? dept.deputyHeadTeacher + ' (Tổ phó)' : 'Giáo viên trong tổ');
                            setFormAttendeesTotal(dept.memberCount);
                            setFormAttendeesPresent(dept.memberCount);
                          }
                        }}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        required
                      >
                        {SCHOOL_DEPARTMENTS.map(d => (
                          <option key={d.id} value={d.id}>{d.name} ({d.memberCount} GV)</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Số biên bản *</label>
                      <input
                        type="text"
                        value={formMeetingNumber}
                        onChange={(e) => setFormMeetingNumber(e.target.value)}
                        placeholder="Số: 01/BB-TT"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Đợt họp / Tuần *</label>
                      <select
                        value={formWeek}
                        onChange={(e) => setFormWeek(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      >
                        <option value="Tuần 1 - 2">Tuần 1 - 2</option>
                        <option value="Tuần 3 - 4">Tuần 3 - 4</option>
                        <option value="Tuần 5 - 6">Tuần 5 - 6</option>
                        <option value="Tuần 7 - 8">Tuần 7 - 8</option>
                        <option value="Tuần 9 - 10">Tuần 9 - 10</option>
                        <option value="Tuần 11 - 12">Tuần 11 - 12</option>
                        <option value="Tuần 13 - 14">Tuần 13 - 14</option>
                        <option value="Tuần 15 - 16">Tuần 15 - 16</option>
                        <option value="Tuần 17 - 18">Tuần 17 - 18</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Học kỳ</label>
                      <input
                        type="text"
                        value={formSemester}
                        onChange={(e) => setFormSemester(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Năm học</label>
                      <input
                        type="text"
                        value={formSchoolYear}
                        onChange={(e) => setFormSchoolYear(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Thời gian họp *</label>
                      <input
                        type="text"
                        value={formMeetingDate}
                        onChange={(e) => setFormMeetingDate(e.target.value)}
                        placeholder="14:00, Thứ Sáu ngày 05/09/2026"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Địa điểm họp</label>
                      <input
                        type="text"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        placeholder="Văn phòng tổ - Điểm trường chính"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Chủ trì (Tổ trưởng) *</label>
                      <input
                        type="text"
                        value={formLeader}
                        onChange={(e) => setFormLeader(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Thư ký *</label>
                      <input
                        type="text"
                        value={formSecretary}
                        onChange={(e) => setFormSecretary(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tham dự (Có mặt / Tổng số)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={formAttendeesPresent}
                          onChange={(e) => setFormAttendeesPresent(Number(e.target.value))}
                          className="w-20 px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-center"
                        />
                        <span className="text-slate-400">/</span>
                        <input
                          type="number"
                          value={formAttendeesTotal}
                          onChange={(e) => setFormAttendeesTotal(Number(e.target.value))}
                          className="w-20 px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Chủ đề sinh hoạt chuyên môn *</label>
                    <input
                      type="text"
                      value={formTopic}
                      onChange={(e) => setFormTopic(e.target.value)}
                      placeholder="Triển khai kế hoạch năm học, đổi mới phương pháp giảng dạy..."
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nội dung diễn biến và thảo luận chi tiết *
                    </label>
                    <textarea
                      rows={6}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="I. Đánh giá 2 tuần qua...&#10;II. Kế hoạch 2 tuần tới..."
                      className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 leading-relaxed font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kết luận & Nghị quyết thống nhất của tổ (Mỗi dòng 1 nghị quyết)
                    </label>
                    <textarea
                      rows={3}
                      value={formResolutionsText}
                      onChange={(e) => setFormResolutionsText(e.target.value)}
                      placeholder="100% giáo viên hoàn thành giáo án đúng hạn...&#10;Thống nhất phân công dạy buổi 2..."
                      className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  {/* Tasks in form */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700">
                        Phân công nhiệm vụ cụ thể 2 tuần tiếp theo ({formTasks.length})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setFormTasks([
                            ...formTasks,
                            {
                              id: `t-${Date.now()}-${formTasks.length + 1}`,
                              task: 'Nhiệm vụ mới',
                              assignee: 'Giáo viên trong tổ',
                              deadline: '2 tuần tới',
                              status: 'pending',
                            }
                          ]);
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Thêm nhiệm vụ</span>
                      </button>
                    </div>

                    {formTasks.map((task, idx) => (
                      <div key={task.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
                        <div className="col-span-6">
                          <input
                            type="text"
                            value={task.task}
                            onChange={(e) => {
                              const updated = [...formTasks];
                              updated[idx].task = e.target.value;
                              setFormTasks(updated);
                            }}
                            placeholder="Tên nhiệm vụ..."
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="text"
                            value={task.assignee}
                            onChange={(e) => {
                              const updated = [...formTasks];
                              updated[idx].assignee = e.target.value;
                              setFormTasks(updated);
                            }}
                            placeholder="Người phụ trách..."
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={task.deadline}
                            onChange={(e) => {
                              const updated = [...formTasks];
                              updated[idx].deadline = e.target.value;
                              setFormTasks(updated);
                            }}
                            placeholder="Hạn chót..."
                            className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setFormTasks(formTasks.filter((_, i) => i !== idx));
                            }}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submit buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsEditorModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
                    >
                      {editingMeetingId ? 'Cập Nhật Biên Bản' : 'Lưu Biên Bản Vào Kho Dữ Liệu'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: AI Context Summary Drawer */}
      {showAiContextModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn border border-slate-200">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">Ngữ Cảnh Hoạt Động Chuyên Môn Của 07 Tổ Cho AI</h3>
              </div>
              <button
                onClick={() => setShowAiContextModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl">
                <p className="font-bold">Mục đích cung cấp ngữ cảnh chuyên môn:</p>
                <p className="mt-1">
                  Toàn bộ các biên bản họp tổ 2 tuần/lần ở tab này phản ánh chân thực nhất thực tế dạy và học: các vướng mắc tại Điểm Tân Kiều cách 11km, việc phụ đạo học sinh yếu buổi 2, triển khai 12 tiết giáo dục AI cốt lõi, ngân hàng đề kiểm tra và chuẩn bị thi tốt nghiệp 2027.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Tóm Tắt Tình Hình Các Tổ Đang Ghi Nhận ({meetings.length} biên bản):
                </h4>
                {SCHOOL_DEPARTMENTS.map(dept => {
                  const deptMeetings = meetings.filter(m => m.departmentId === dept.id);
                  return (
                    <div key={dept.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-xs ${dept.color}`}>{dept.name}</span>
                        <span className="text-[11px] text-slate-500">
                          {deptMeetings.length} biên bản • Tổ trưởng: {dept.headTeacher}
                        </span>
                      </div>
                      {deptMeetings.length > 0 ? (
                        <div className="text-xs text-slate-600 space-y-1">
                          <p><strong>Chủ đề gần nhất:</strong> {deptMeetings[0].topic}</p>
                          <p><strong>Nghị quyết:</strong> {deptMeetings[0].resolutions?.[0] || 'Chấp hành nghiêm túc tiến độ.'}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">Chưa nộp biên bản đợt này</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowAiContextModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { DepartmentInfo, DepartmentMeeting } from '../types/meeting';

export const SCHOOL_DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'toan',
    name: 'Tổ Toán',
    shortName: 'Toán',
    headTeacher: 'Thầy Nguyễn Văn Hưng',
    deputyHeadTeacher: 'Cô Lê Thị Mai',
    memberCount: 14,
    subjects: ['Toán 6', 'Toán 7', 'Toán 8', 'Toán 9', 'Toán 10', 'Toán 11', 'Toán 12'],
    color: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200'
  },
  {
    id: 'van',
    name: 'Tổ Ngữ văn - Thư viện - Thiết bị',
    shortName: 'Ngữ văn',
    headTeacher: 'Cô Trần Thị Kim Chi',
    deputyHeadTeacher: 'Thầy Đỗ Minh Hoàng',
    memberCount: 16,
    subjects: ['Ngữ văn 6 - 12', 'Văn hóa đọc', 'Công tác Thư viện', 'Thiết bị dạy học'],
    color: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderLight: 'border-emerald-200'
  },
  {
    id: 'khtn',
    name: 'Tổ Khoa học Tự nhiên - Công nghệ',
    shortName: 'KHTN - Công nghệ',
    headTeacher: 'Thầy Lê Hoàng Nam',
    deputyHeadTeacher: 'Cô Phan Bích Thủy',
    memberCount: 20,
    subjects: ['KHTN 6-9', 'Vật lí 10-12', 'Hóa học 10-12', 'Sinh học 10-12', 'Công nghệ 6-12', 'STEM'],
    color: 'text-teal-700',
    bgLight: 'bg-teal-50',
    borderLight: 'border-teal-200'
  },
  {
    id: 'khxh',
    name: 'Tổ Khoa học Xã hội',
    shortName: 'KH Xã hội',
    headTeacher: 'Cô Phạm Thị Thu Trang',
    deputyHeadTeacher: 'Thầy Nguyễn Văn Đức',
    memberCount: 16,
    subjects: ['Lịch sử & Địa lí 6-9', 'Lịch sử 10-12', 'Địa lí 10-12', 'GDCD 6-9', 'GDKT&PL 10-12'],
    color: 'text-amber-700',
    bgLight: 'bg-amber-50',
    borderLight: 'border-amber-200'
  },
  {
    id: 'ngoaingu-tin',
    name: 'Tổ Ngoại ngữ - Tin học',
    shortName: 'Ngoại ngữ - Tin',
    headTeacher: 'Thầy Đặng Văn Phúc',
    deputyHeadTeacher: 'Cô Vũ Thị Lan',
    memberCount: 18,
    subjects: ['Tiếng Anh 6-12', 'Tin học 6-12', 'Chuyên đề Giáo dục Trí tuệ nhân tạo (AI)'],
    color: 'text-indigo-700',
    bgLight: 'bg-indigo-50',
    borderLight: 'border-indigo-200'
  },
  {
    id: 'gdtc',
    name: 'Tổ Giáo dục thể chất - QPAN - Nghệ thuật',
    shortName: 'GDTC - QPAN - NT',
    headTeacher: 'Thầy Huỳnh Tấn Đạt',
    deputyHeadTeacher: 'Thầy Trương Minh Hiếu',
    memberCount: 18,
    subjects: ['Giáo dục thể chất 6-12', 'GDQPAN 10-12', 'Âm nhạc', 'Mĩ thuật', 'Hoạt động trải nghiệm'],
    color: 'text-rose-700',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200'
  },
  {
    id: 'vanphong',
    name: 'Tổ Văn phòng',
    shortName: 'Văn phòng',
    headTeacher: 'Thầy Võ Quốc Tuấn',
    deputyHeadTeacher: 'Cô Bùi Thị Thùy',
    memberCount: 14,
    subjects: ['Văn thư - Lưu trữ', 'Kế toán - Tài chính', 'Y tế học đường', 'Bảo vệ - Phục vụ'],
    color: 'text-purple-700',
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200'
  }
];

export const INITIAL_DEPARTMENT_MEETINGS: DepartmentMeeting[] = [
  {
    id: 'meeting-toan-t1-2',
    departmentId: 'toan',
    departmentName: 'Tổ Toán',
    meetingNumber: 'Số: 01/BB-TT',
    week: 'Tuần 1 - 2',
    semester: 'Học kỳ I',
    schoolYear: '2026 - 2027',
    meetingDate: '14:00, Thứ Sáu ngày 05/09/2026',
    location: 'Văn phòng Tổ Toán - Điểm trường chính',
    leader: 'Thầy Nguyễn Văn Hưng (Tổ trưởng)',
    secretary: 'Cô Lê Thị Mai (Tổ phó)',
    attendees: {
      present: 14,
      total: 14,
      absent: 'Không',
      list: ['Nguyễn Văn Hưng', 'Lê Thị Mai', 'Nguyễn Tấn Lực', 'Võ Hoàng Quân', 'Trần Thị Hằng', 'Phạm Minh Trí', 'Đặng Thảo Vy', 'Ngô Quốc Bảo', 'Lê Văn Thêm', 'Trương Kim Phụng', 'Đỗ Thanh Sang', 'Nguyễn Thị Cẩm', 'Bùi Văn Hậu', 'Trần Hoài Nam']
    },
    topic: 'Triển khai Kế hoạch giáo dục tổ bộ môn đầu năm, phân công giảng dạy 3 điểm trường và thống nhất dạy học 2 buổi/ngày',
    content: `I. ĐÁNH GIÁ CÔNG TÁC CHUẨN BỊ ĐẦU NĂM HỌC:
- 100% giáo viên trong tổ đã nhận lớp, kiểm tra phòng học và nắm sĩ số học sinh các khối 6 đến 12 tại 3 điểm trường (Điểm chính THPT, Điểm THCS Đốc Binh Kiều và Điểm Tân Kiều cách 11km).
- Tổ trưởng thông qua Quyết định phân công chuyên môn của Hiệu trưởng và lịch xếp thời khóa biểu buổi sáng (chính khóa) và buổi chiều (tăng cường 2 buổi/ngày).

II. THẢO LUẬN VÀ THỐNG NHẤT KẾ HOẠCH DẠY HỌC MÔN TOÁN:
1. Phân phối chương trình:
- Thống nhất khung phân phối chương trình môn Toán năm học 2026 - 2027 bám sát Thông tư 32/2018/TT-BGDĐT.
- Bố trí thời lượng ôn tập cho Khối 9 chuẩn bị thi vào 10 (tập trung 3 chủ đề: Đại số biến đổi biểu thức, Hệ phương trình - Hàm số bậc nhất và Hình học phẳng thực tế).
- Bố trí thời lượng chuyên đề lựa chọn và ôn tập phân hóa cho Khối 12 thi tốt nghiệp THPT theo định dạng mới (Quyết định 764 của Bộ GDĐT).

2. Kế hoạch dạy học 2 buổi/ngày (buổi chiều):
- Cấp THCS: Phụ đạo học sinh yếu kém miễn phí 100%, không thu bất kỳ khoản tiền nào.
- Cấp THPT: Ôn thi tốt nghiệp THPT cho Khối 12 và bồi dưỡng đội tuyển HSG cấp tỉnh khối 10, 11, 12 (chỉ tiêu đạt tối thiểu 03 giải HSG môn Toán cấp tỉnh).

3. Đổi mới phương pháp và ứng dụng công nghệ:
- Tích hợp sử dụng Geogebra, Desmos trong giảng dạy hình học và đại số.
- Phối hợp với Tổ Tin học trong chuyên đề AI: hướng dẫn học sinh dùng AI trực quan hóa đồ thị và tự kiểm tra bài toán.`,
    resolutions: [
      '100% giáo viên trong tổ hoàn thành Kế hoạch bài dạy (giáo án) 2 tuần đầu trước ngày 07/09/2026.',
      'Thống nhất giáo án chung theo từng khối lớp; tăng cường trao đổi tài liệu qua Google Drive của tổ.',
      'Nghiêm cấm tuyệt đối việc ép buộc học sinh học thêm hoặc cắt xén chương trình chính khóa sang dạy buổi 2.',
      'Giáo viên phụ trách điểm Tân Kiều (thầy Trí, thầy Quân) được ưu tiên xếp lịch dạy liền buổi để thuận tiện đi lại.'
    ],
    tasks: [
      {
        id: 't-toan-1',
        task: 'Hoàn thiện Kế hoạch dạy học môn Toán khối 6-9 và 10-12 gửi BGH duyệt',
        assignee: 'Thầy Nguyễn Văn Hưng',
        deadline: '10/09/2026',
        status: 'completed'
      },
      {
        id: 't-toan-2',
        task: 'Lập danh sách học sinh có học lực Chưa đạt cần phụ đạo buổi 2',
        assignee: 'Các giáo viên phụ trách khối 6, 7, 8, 9, 10',
        deadline: '15/09/2026',
        status: 'completed'
      },
      {
        id: 't-toan-3',
        task: 'Khảo sát năng khiếu và thành lập đội tuyển HSG Toán 9 và Toán 12',
        assignee: 'Cô Lê Thị Mai & Thầy Nguyễn Tấn Lực',
        deadline: '18/09/2026',
        status: 'in_progress'
      }
    ],
    notes: 'Cuộc họp diễn ra nghiêm túc, 14/14 thầy cô thống nhất cao với nghị quyết của tổ.',
    createdAt: '2026-09-05T16:30:00Z'
  },
  {
    id: 'meeting-tin-t1-2',
    departmentId: 'ngoaingu-tin',
    departmentName: 'Tổ Ngoại ngữ - Tin học',
    meetingNumber: 'Số: 01/BB-NNTH',
    week: 'Tuần 1 - 2',
    semester: 'Học kỳ I',
    schoolYear: '2026 - 2027',
    meetingDate: '14:30, Thứ Sáu ngày 05/09/2026',
    location: 'Phòng Lab Tiếng Anh - Điểm trường chính',
    leader: 'Thầy Đặng Văn Phúc (Tổ trưởng)',
    secretary: 'Cô Vũ Thị Lan (Tổ phó)',
    attendees: {
      present: 18,
      total: 18,
      absent: 'Không',
      list: ['Đặng Văn Phúc', 'Vũ Thị Lan', 'Nguyễn Thanh Tùng', 'Trần Ngọc Trâm', 'Phạm Quốc Cường', 'Lê Thị Diễm', 'Bùi Tấn Tài', 'Võ Hoàng Yến', 'Hồ Minh Thuận', 'Đỗ Thảo Vy', 'Trương Minh Khoa', 'Nguyễn Thị Hồng', 'Phan Văn Bé', 'Lê Hữu Nghĩa', 'Dương Thị Tuyết', 'Huỳnh Quốc Thái', 'Nguyễn Kim Loan', 'Trần Bá Vương']
    },
    topic: 'Triển khai Kế hoạch số 18/KH-THCS&THPTĐBK về giáo dục Trí tuệ nhân tạo (AI), rà soát phòng máy 3 điểm trường và kế hoạch Tiếng Anh',
    content: `I. TRIỂN KHAI KẾ HOẠCH GIÁO DỤC TRÍ TUỆ NHÂN TẠO (AI) NĂM HỌC 2026 - 2027:
- Thầy Đặng Văn Phúc quán triệt Kế hoạch số 1059/KH-SGDĐT của Sở GDĐT Đồng Tháp và Kế hoạch số 18/KH-THCS&THPTĐBK của nhà trường vừa ban hành.
- Nhóm Tin học (06 giáo viên: Thầy Phúc, Thầy Cường, Thầy Tài, Thầy Nghĩa, Thầy Thái, Thầy Khoa) chịu trách nhiệm chính xây dựng bài giảng 12 tiết cốt lõi dạy vào buổi chiều cho 53 lớp.
- Phân công giáo viên Tin học phụ trách cụ thể từng điểm trường:
  + Điểm chính (THPT - 24 lớp): Thầy Phúc, Thầy Cường, Thầy Tài.
  + Điểm Đốc Binh Kiều (THCS - 16 lớp): Thầy Thái, Thầy Khoa.
  + Điểm Tân Kiều (THCS - 13 lớp): Thầy Nghĩa (trực tiếp cắm chốt tại Tân Kiều để hỗ trợ giáo viên và học sinh).

II. RÀ SOÁT CƠ SỞ VẬT CHẤT VÀ PHẦN MỀM AN TOÀN:
- Đã kiểm tra 48 máy tính tại Điểm chính, 36 máy tại Đốc Binh Kiều, 32 máy tại Tân Kiều. Tất cả kết nối mạng Internet ổn định.
- Thống nhất danh mục công cụ an toàn: Google Teachable Machine, Scratch 3.0 AI, Quick Draw, Canva Education.
- Quán triệt 10 Nguyên tắc sử dụng AI: Cấm học sinh gian lận, cấm nộp nguyên văn bài do AI viết, cấm dùng trong phòng thi.
- Biên soạn bộ phiếu bài tập "AI Unplugged" (không máy tính) cho các tiết học thảo luận tình huống đạo đức hoặc khi phòng máy bị quá tải.

III. KẾ HOẠCH NÂNG CAO CHẤT LƯỢNG MÔN TIẾNG ANH:
- Cô Vũ Thị Lan triển khai kế hoạch ôn luyện 4 kỹ năng; tận dụng phần mềm phát âm và AI hội thoại có kiểm soát để học sinh luyện nói.
- Lên kế hoạch bồi dưỡng học sinh thi chứng chỉ tiếng Anh và thi HSG cấp tỉnh.`,
    resolutions: [
      'Nhóm Tin học hoàn thiện khung bài giảng 12 tiết chuyên đề AI trước ngày 12/09/2026.',
      'Tổ chức cho 100% học sinh các lớp ký cam kết tuân thủ 10 quy tắc sử dụng AI trong tuần 2.',
      'Thành lập Câu lạc bộ "Tin học & AI Đốc Binh Kiều", dự kiến ra mắt vào tuần 4.',
      'Duy trì trực kỹ thuật hỗ trợ giáo viên các tổ chuyên môn khác trong việc đưa ứng dụng CNTT vào bài giảng.'
    ],
    tasks: [
      {
        id: 't-tin-1',
        task: 'Biên soạn bộ giáo án mẫu 12 tiết chuyên đề AI cốt lõi cho cấp THCS và THPT',
        assignee: 'Nhóm Tin học (Thầy Cường, Thầy Tài, Thầy Nghĩa)',
        deadline: '12/09/2026',
        status: 'completed'
      },
      {
        id: 't-tin-2',
        task: 'In ấn 200 bộ phiếu bài tập Unplugged AI gửi về 3 điểm trường',
        assignee: 'Thầy Lê Hữu Nghĩa',
        deadline: '14/09/2026',
        status: 'completed'
      },
      {
        id: 't-tin-3',
        task: 'Lập danh sách học sinh nòng cốt đăng ký tham gia CLB AI Đốc Binh Kiều',
        assignee: 'Thầy Huỳnh Quốc Thái & Thầy Trương Minh Khoa',
        deadline: '20/09/2026',
        status: 'in_progress'
      }
    ],
    notes: 'Tổ Ngoại ngữ - Tin học thể hiện tinh thần tiên phong, sẵn sàng hoàn thành tốt nhiệm vụ chuyển đổi số của nhà trường.',
    createdAt: '2026-09-05T17:00:00Z'
  },
  {
    id: 'meeting-van-t1-2',
    departmentId: 'van',
    departmentName: 'Tổ Ngữ văn - Thư viện - Thiết bị',
    meetingNumber: 'Số: 01/BB-NV',
    week: 'Tuần 1 - 2',
    semester: 'Học kỳ I',
    schoolYear: '2026 - 2027',
    meetingDate: '14:00, Thứ Bảy ngày 06/09/2026',
    location: 'Văn phòng Tổ Ngữ văn - Điểm trường chính',
    leader: 'Cô Trần Thị Kim Chi (Tổ trưởng)',
    secretary: 'Thầy Đỗ Minh Hoàng (Tổ phó)',
    attendees: {
      present: 16,
      total: 16,
      absent: 'Không',
      list: ['Trần Thị Kim Chi', 'Đỗ Minh Hoàng', 'Nguyễn Thị Bích Ngọc', 'Lê Thị Thu Thủy', 'Võ Thị Hồng Nhung', 'Phan Văn Trọng', 'Trần Thị Thu Hà', 'Bùi Thị Thanh Tâm', 'Ngô Văn Tèo', 'Huỳnh Thị Diễm Trang', 'Đặng Thảo Nguyên', 'Lê Hoài Thương', 'Phạm Thị Thùy Dung', 'Nguyễn Quốc Hùng', 'Trần Văn Kiệt', 'Lê Minh Phụng']
    },
    topic: 'Thống nhất kế hoạch dạy học Ngữ văn 6-12, phương pháp dạy đọc hiểu - viết theo CT GDPT 2018 và quy chế chấm bài liêm chính',
    content: `I. QUÁN TRIỆT YÊU CẦU DẠY HỌC MÔN NGỮ VĂN NĂM HỌC 2026 - 2027:
- Tiếp tục đổi mới mạnh mẽ phương pháp dạy học theo định hướng phát triển phẩm chất, năng lực; tránh lối dạy học văn mẫu, học thuộc lòng máy móc.
- Sử dụng ngữ liệu mở ngoài sách giáo khoa trong các đề kiểm tra đọc hiểu và viết theo đúng chỉ đạo của Bộ GDĐT và Sở GDĐT.
- Thống nhất cấu trúc bài kiểm tra định kỳ môn Ngữ văn:
  + Cấp THCS (Khối 6-8): Phần Đọc hiểu 6,0 điểm + Phần Viết 4,0 điểm.
  + Khối 9 & Cấp THPT (Khối 10, 11, 12): Tự luận 100% (Đọc hiểu 5,0 điểm + Viết 5,0 điểm).

II. PHỐI HỢP CÔNG TÁC THƯ VIỆN VÀ VĂN HÓA ĐỌC:
- Bộ phận Thư viện (cô Thu Thủy, thầy Kiệt) giới thiệu danh mục sách văn học mới và tài liệu tham khảo cho học sinh 3 điểm trường.
- Tổ chức các buổi "Tiết đọc thư viện" lồng ghép vào kế hoạch dạy học 2 buổi/ngày.

III. GIÁO DỤC LIÊM CHÍNH HỌC THUẬT VÀ QUY TẮC VỀ AI:
- Hướng dẫn học sinh kỹ năng phân tích, cảm thụ văn học độc lập; tuyệt đối cấm chép văn từ internet hoặc dùng AI viết văn để nộp bài.
- Giáo viên chấm bài kỹ lưỡng, ghi nhận xét cụ thể, chỉ ra điểm mạnh, điểm cần khắc phục của từng học sinh.`,
    resolutions: [
      '100% giáo viên nộp Kế hoạch bài dạy đúng hạn, thẩm định ma trận và bảng đặc tả trước khi lên lớp.',
      'Tổ chức 01 chuyên đề nghiên cứu bài học cấp tổ môn Ngữ văn lớp 9 và lớp 12 trong tháng 10/2026.',
      'Tăng cường phụ đạo học sinh có kỹ năng viết còn hạn chế vào các buổi chiều.'
    ],
    tasks: [
      {
        id: 't-van-1',
        task: 'Tổng hợp ngân hàng ngữ liệu đọc hiểu ngoài SGK cho các khối 6, 7, 8, 9, 10, 11, 12',
        assignee: 'Nhóm trưởng các khối lớp',
        deadline: '20/09/2026',
        status: 'in_progress'
      },
      {
        id: 't-van-2',
        task: 'Lập danh sách học sinh bồi dưỡng HSG Ngữ văn lớp 9 và lớp 12',
        assignee: 'Cô Trần Thị Kim Chi & Thầy Đỗ Minh Hoàng',
        deadline: '15/09/2026',
        status: 'completed'
      }
    ],
    notes: 'Cuộc họp diễn ra sôi nổi, các thầy cô thống nhất cao về định hướng đổi mới phương pháp dạy văn.',
    createdAt: '2026-09-06T16:00:00Z'
  },
  {
    id: 'meeting-khtn-t3-4',
    departmentId: 'khtn',
    departmentName: 'Tổ Khoa học Tự nhiên - Công nghệ',
    meetingNumber: 'Số: 02/BB-KHTN',
    week: 'Tuần 3 - 4',
    semester: 'Học kỳ I',
    schoolYear: '2026 - 2027',
    meetingDate: '14:00, Thứ Bảy ngày 19/09/2026',
    location: 'Phòng Thí nghiệm Hóa - Sinh - Điểm trường chính',
    leader: 'Thầy Lê Hoàng Nam (Tổ trưởng)',
    secretary: 'Cô Phan Bích Thủy (Tổ phó)',
    attendees: {
      present: 20,
      total: 20,
      absent: 'Không',
      list: ['Lê Hoàng Nam', 'Phan Bích Thủy', 'Trần Văn Hòa', 'Nguyễn Thị Tuyết Mai', 'Đặng Quốc Huy', 'Lê Thị Thu Vân', 'Võ Văn Hậu', 'Trương Hoài Thương', 'Phạm Thị Mỹ Duyên', 'Bùi Văn Sang', 'Nguyễn Hữu Tài', 'Đỗ Thị Kim Ngân', 'Trần Quốc Đạt', 'Huỳnh Văn Lắm', 'Lê Minh Trí', 'Võ Thị Bích Tuyền', 'Nguyễn Văn Đạt', 'Đặng Thảo Vy', 'Phan Quốc Việt', 'Lý Hải Đăng']
    },
    topic: 'Triển khai Kế hoạch số 21/KH về hồ sơ sổ sách điện tử, chuẩn bị thiết bị thực hành thí nghiệm và các chuyên đề STEM',
    content: `I. QUÁN TRIỆT KẾ HOẠCH SỐ 21/KH-THCS&THPTĐBK VỀ SỔ SÁCH ĐIỆN TỬ:
- Thầy Lê Hoàng Nam triển khai Công văn 3635/SGDĐT-GDPT và Kế hoạch số 21/KH của trường vừa ký ban hành ngày 18/9/2026.
- 100% giáo viên trong tổ chuyển đổi sang quản lý giáo án điện tử (file PDF/Word lưu trên hệ thống), ký số cá nhân hợp lệ, không in giáo án giấy tràn lan.
- Thực hiện nghiêm túc quy định nhập điểm kiểm tra thường xuyên lên sổ điểm điện tử đúng tiến độ, không để dồn cột điểm.

II. BẢO ĐẢM THIẾT BỊ THÍ NGHIỆM TẠI 3 ĐIỂM TRƯỜNG:
- Rà soát hóa chất, dụng cụ thực hành tại Điểm chính và 2 điểm THCS Đốc Binh Kiều, Tân Kiều.
- Bảo đảm 100% các bài thực hành bắt buộc trong chương trình KHTN 6-9, Vật lí, Hóa học, Sinh học 10-12 được tổ chức cho học sinh làm trực tiếp trên phòng bộ môn.
- Có phương án luân chuyển bộ đồ dùng thí nghiệm dùng chung giữa Điểm Đốc Binh Kiều và Điểm Tân Kiều một cách an toàn.

III. KẾ HOẠCH TỔ CHỨC CÁC HOẠT ĐỘNG GIÁO DỤC STEM:
- Mỗi giáo viên trong tổ xây dựng ít nhất 01 chủ đề dạy học STEM trong học kỳ I.
- Thành lập nhóm hướng dẫn học sinh nghiên cứu đề tài Khoa học kỹ thuật cấp trường: dự kiến 02 đề tài (về chế phẩm sinh học từ phế phẩm nông nghiệp địa phương và mô hình năng lượng xanh).`,
    resolutions: [
      '100% giáo viên hoàn tất việc đưa giáo án lên hệ thống sổ sách điện tử trước Chủ nhật hàng tuần.',
      'Bộ phận thiết bị hoàn thành kiểm kê, lau chùi phòng thí nghiệm trước ngày 25/09/2026.',
      'Thống nhất lịch thực hành bộ môn không để trùng lặp giữa các khối lớp.'
    ],
    tasks: [
      {
        id: 't-khtn-1',
        task: 'Lập lịch sử dụng phòng thực hành thí nghiệm tại cả 3 điểm trường',
        assignee: 'Cô Phan Bích Thủy & Thầy Trần Văn Hòa',
        deadline: '23/09/2026',
        status: 'completed'
      },
      {
        id: 't-khtn-2',
        task: 'Phê duyệt 02 đề tài NCKH kỹ thuật học sinh của tổ gửi về BGH',
        assignee: 'Thầy Lê Hoàng Nam & Thầy Đặng Quốc Huy',
        deadline: '30/09/2026',
        status: 'in_progress'
      }
    ],
    notes: 'Tổ KHTN - Công nghệ quyết tâm thực hiện nghiêm kỷ cương sổ sách điện tử và phát huy tối đa hiệu quả phòng thí nghiệm.',
    createdAt: '2026-09-19T16:30:00Z'
  },
  {
    id: 'meeting-khxh-t3-4',
    departmentId: 'khxh',
    departmentName: 'Tổ Khoa học Xã hội',
    meetingNumber: 'Số: 02/BB-KHXH',
    week: 'Tuần 3 - 4',
    semester: 'Học kỳ I',
    schoolYear: '2026 - 2027',
    meetingDate: '14:30, Thứ Sáu ngày 18/09/2026',
    location: 'Văn phòng Tổ KHXH - Điểm trường chính',
    leader: 'Cô Phạm Thị Thu Trang (Tổ trưởng)',
    secretary: 'Thầy Nguyễn Văn Đức (Tổ phó)',
    attendees: {
      present: 16,
      total: 16,
      absent: 'Không',
      list: ['Phạm Thị Thu Trang', 'Nguyễn Văn Đức', 'Trần Thị Thu Sương', 'Lê Văn Hiền', 'Đỗ Thị Kiều Oanh', 'Võ Quốc Thắng', 'Bùi Thị Bích Liên', 'Trương Văn Hải', 'Nguyễn Thị Thùy Linh', 'Lê Hữu Trí', 'Phan Văn Phong', 'Huỳnh Thị Diễm Trinh', 'Đặng Minh Tâm', 'Nguyễn Văn Hùng', 'Trần Thị Thanh Thảo', 'Lê Thị Thu Hằng']
    },
    topic: 'Đổi mới phương pháp dạy học Lịch sử - Địa lý, tích hợp giáo dục địa phương Đồng Tháp và chuẩn bị đề kiểm tra định kỳ',
    content: `I. TRIỂN KHAI CHUYÊN MÔN THEO CHƯƠNG TRÌNH GDPT 2018:
- Đổi mới phương pháp dạy học các môn Lịch sử, Địa lí, Giáo dục công dân và Giáo dục kinh tế & Pháp luật: Tăng cường sử dụng lược đồ, bản đồ số, hình ảnh tư liệu, video lịch sử.
- Tích hợp nội dung Giáo dục địa phương tỉnh Đồng Tháp: Địa lý vùng Đồng Tháp Mười, khu di tích Gò Tháp, văn hóa làng nghề và lịch sử đấu tranh cách mạng của quê hương Đốc Binh Kiều.

II. ĐỔI MỚI KIỂM TRA ĐÁNH GIÁ VÀ NGÂN HÀNG CÂU HỎI:
- Bám sát Công văn 471/SGDĐT-GDPT và Quyết định 764/QĐ-BGDĐT: Đổi mới cấu trúc câu hỏi trắc nghiệm khách quan kết hợp tự luận.
- Nghiêm cấm việc cho học sinh học thuộc lòng các câu hỏi kiểm tra dạng đáp án sẵn; tăng cường các câu hỏi yêu cầu giải thích, liên hệ thực tiễn và nhận xét đánh giá sự kiện.

III. THỰC HIỆN KẾ HOẠCH HỒ SƠ SỔ SÁCH ĐIỆN TỬ:
- 100% giáo viên trong tổ ký số hồ sơ kế hoạch bài dạy, quản lý sổ theo dõi đánh giá học sinh trên môi trường số; thực hiện đúng chỉ đạo của Kế hoạch 21/KH của trường.`,
    resolutions: [
      'Hoàn thiện biên soạn hệ thống câu hỏi kiểm tra đánh giá thường xuyên cho các khối lớp trước ngày 25/09/2026.',
      'Tổ chức 01 chuyến học tập ngoại khóa trải nghiệm thực tế tại Khu di tích Quốc gia đặc biệt Gò Tháp cho học sinh khối 8 và khối 10 trong học kỳ I.',
      'Tổ chức sinh hoạt chuyên môn theo nghiên cứu bài học môn Lịch sử 11 vào tuần 6.'
    ],
    tasks: [
      {
        id: 't-khxh-1',
        task: 'Biên soạn tài liệu tham khảo giáo dục địa phương tích hợp vào bài giảng',
        assignee: 'Cô Trần Thị Thu Sương & Thầy Lê Văn Hiền',
        deadline: '28/09/2026',
        status: 'in_progress'
      },
      {
        id: 't-khxh-2',
        task: 'Nộp kế hoạch chuyên đề nghiên cứu bài học môn Lịch sử về BGH',
        assignee: 'Thầy Nguyễn Văn Đức',
        deadline: '25/09/2026',
        status: 'completed'
      }
    ],
    notes: 'Toàn thể giáo viên trong tổ tích cực thảo luận, thống nhất kế hoạch hoạt động của tổ trong học kỳ I.',
    createdAt: '2026-09-18T16:30:00Z'
  },
  {
    id: 'meeting-toan-t5-6',
    departmentId: 'toan',
    departmentName: 'Tổ Toán',
    meetingNumber: 'Số: 03/BB-TT',
    week: 'Tuần 5 - 6',
    semester: 'Học kỳ I',
    schoolYear: '2026 - 2027',
    meetingDate: '14:00, Thứ Sáu ngày 02/10/2026',
    location: 'Văn phòng Tổ Toán - Điểm trường chính',
    leader: 'Thầy Nguyễn Văn Hưng (Tổ trưởng)',
    secretary: 'Cô Lê Thị Mai (Tổ phó)',
    attendees: {
      present: 14,
      total: 14,
      absent: 'Không',
      list: ['Nguyễn Văn Hưng', 'Lê Thị Mai', 'Nguyễn Tấn Lực', 'Võ Hoàng Quân', 'Trần Thị Hằng', 'Phạm Minh Trí', 'Đặng Thảo Vy', 'Ngô Quốc Bảo', 'Lê Văn Thêm', 'Trương Kim Phụng', 'Đỗ Thanh Sang', 'Nguyễn Thị Cẩm', 'Bùi Văn Hậu', 'Trần Hoài Nam']
    },
    topic: 'Thống nhất ma trận, bảng đặc tả và ngân hàng đề kiểm tra giữa học kỳ I môn Toán 6-12 theo Công văn 471 và Kế hoạch 39/KH',
    content: `I. QUÁN TRIỆT KẾ HOẠCH KIỂM TRA ĐÁNH GIÁ CỦA NHÀ TRƯỜNG:
- Thầy Nguyễn Văn Hưng triển khai Kế hoạch số 39/KH-THCS&THPTĐBK của nhà trường về kiểm tra, đánh giá học sinh năm học 2026 - 2027 và lịch kiểm tra tập trung giữa học kỳ I bắt đầu từ ngày 02/11/2026.
- Môn Toán 8, 9, 10, 11, 12 kiểm tra tập trung toàn trường thời gian 90 phút; Môn Toán 6, 7 kiểm tra buổi chiều thời gian 90 phút.
- Thống nhất cấu trúc đề thi giữa kỳ I:
  + Cấp THCS: 70% trắc nghiệm (nhiều lựa chọn) + 30% tự luận (bài toán thực tế và hình học).
  + Cấp THPT: Cấu trúc 3 phần theo định hướng Bộ GDĐT (Phần I: 12 câu trắc nghiệm 4 lựa chọn; Phần II: 4 câu trắc nghiệm Đúng/Sai; Phần III: 6 câu trắc nghiệm Trả lời ngắn).

II. PHÂN CÔNG GIÁO VIÊN RA ĐỀ VÀ PHẢN BIỆN ĐỀ:
- Khối 6: Thầy Lực (ra đề 1), Cô Phụng (ra đề 2), Cô Hằng (phản biện chéo).
- Khối 7: Thầy Thêm (ra đề 1), Thầy Sang (ra đề 2), Thầy Quân (phản biện chéo).
- Khối 8: Cô Vy (ra đề 1), Thầy Bảo (ra đề 2), Thầy Trí (phản biện chéo - phụ trách điểm Tân Kiều).
- Khối 9: Thầy Quân (ra đề 1), Cô Mai (ra đề 2), Thầy Hưng (phản biện chéo).
- Khối 10: Thầy Nam (ra đề 1), Cô Cẩm (ra đề 2), Thầy Hậu (phản biện chéo).
- Khối 11: Cô Hằng (ra đề 1), Thầy Lực (ra đề 2), Cô Mai (phản biện chéo).
- Khối 12: Thầy Hưng (ra đề 1), Cô Mai (ra đề 2), Thầy Lực (phản biện chéo).
- Thời hạn nộp đề kiểm tra kèm ma trận, bảng đặc tả về Tổ trưởng: Trước ngày 19/10/2026 để tổng hợp gửi BGH duyệt.

III. RÀ SOÁT TIẾN ĐỘ CHƯƠNG TRÌNH VÀ BỒI DƯỠNG HSG:
- 100% giáo viên bảo đảm đúng tiến độ tuần 5, không dạy dồn ép tiết.
- Đội tuyển HSG Toán 9 (05 học sinh) và Toán 12 (06 học sinh) duy trì ôn tập 02 buổi/tuần vào các chiều thứ Ba và thứ Năm.`,
    resolutions: [
      '100% giáo viên hoàn thành ma trận, bảng đặc tả đề kiểm tra giữa kỳ theo đúng phân công trước ngày 12/10/2026.',
      'Bảo đảm tính bảo mật tuyệt đối của đề kiểm tra; người ra đề chịu trách nhiệm cá nhân về tính chính xác và bảo mật.',
      'Tổ chức ôn tập chu đáo cho học sinh trên lớp, không tạo áp lực tâm lý thi cử cho các em.'
    ],
    tasks: [
      {
        id: 't-toan-mid1',
        task: 'Duyệt ma trận và bảng đặc tả đề kiểm tra Toán các khối 6 đến 12',
        assignee: 'Thầy Nguyễn Văn Hưng & Cô Lê Thị Mai',
        deadline: '15/10/2026',
        status: 'pending'
      },
      {
        id: 't-toan-mid2',
        task: 'Hoàn thiện ngân hàng đề kiểm tra giữa kỳ nộp về Ban Giám hiệu',
        assignee: 'Tổ trưởng chuyên môn',
        deadline: '19/10/2026',
        status: 'pending'
      }
    ],
    notes: 'Tổ Toán thống nhất 100% về ma trận đề và phân công nhiệm vụ ra đề kiểm tra giữa kỳ I.',
    createdAt: '2026-10-02T16:30:00Z'
  }
];

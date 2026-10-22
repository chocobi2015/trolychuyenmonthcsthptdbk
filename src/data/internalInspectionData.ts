/**
 * Dữ liệu Chuyên đề Kiểm tra nội bộ (Internal Inspection)
 * Trường THCS và THPT Đốc Binh Kiều - Năm học 2026 - 2027
 * 
 * Căn cứ pháp lý:
 * 1. Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 của Sở GDĐT Đồng Tháp V/v thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027
 * 2. Công văn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT Đồng Tháp V/v hướng dẫn thực hiện công tác kiểm tra nội bộ năm học 2025 - 2026
 * 3. Nghị định số 217/2025/NĐ-CP ngày 05/8/2025 của Chính phủ về hoạt động kiểm tra chuyên ngành
 * 4. Quyết định số 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp về việc thành lập Trường THCS và THPT Đốc Binh Kiều
 * 5. Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25/9/2026 của Hiệu trưởng
 */

export interface InspectionDirective {
  id: string;
  number: string;
  title: string;
  issuer: string;
  issueDate: string;
  signBy: string;
  summary: string;
  fullPdfUrl: string;
  pdfFilename: string;
  keyPoints: string[];
  deadlines?: { task: string; dueDate: string; status: 'completed' | 'in_progress' | 'upcoming' }[];
  contactOfficer?: { name: string; phone: string; email: string; department: string };
  isReferenceDoc?: boolean;
  fileFormat?: 'pdf' | 'docx' | 'doc' | 'xlsx';
}

export interface InspectionPillar {
  id: string;
  orderNumber: number;
  title: string;
  target: string;
  force: string;
  standardsAndCriteria: string[];
  frequency: string;
  sourceRef: string; // e.g. "Kế hoạch 134 & KH 76 & HD 1134"
}

export interface InspectionScheduleItem {
  id: string;
  orderNumber: number;
  title: string;
  target: string;
  timeframe: string; // e.g. "Tháng 10/2026"
  dateRange: string; // e.g. "15/10/2026 - 28/10/2026"
  method: 'Kiểm tra toàn diện' | 'Kiểm tra chuyên đề' | 'Kiểm tra đột xuất';
  campus: 'Điểm chính (THPT)' | 'Điểm Đốc Binh Kiều (THCS)' | 'Điểm Tân Kiều (THCS)' | 'Cả 3 điểm trường';
  teamLeader: string;
  teamMembers: string[];
  scope: string;
  status: 'completed' | 'in_progress' | 'scheduled';
}

export interface InspectionCommitteeMember {
  id: string;
  orderNumber: number;
  fullName: string;
  roleInSchool: string;
  roleInCommittee: 'Trưởng ban' | 'Phó Trưởng ban' | 'Phó Trưởng ban Thường trực' | 'Thành viên' | 'Thư ký';
  assignedDuty: string;
}

export interface InspectionFormTemplate {
  formId: string;
  formNumber: string; // e.g. "MẪU SỐ 01"
  title: string;
  purpose: string;
  signAuthority: string;
  issuedWith: string;
  sampleData: {
    title: string;
    sections: { heading: string; content: string }[];
  };
}

// 1. Văn bản chỉ đạo chính thức từ Sở GDĐT & Văn bản tham khảo năm trước
export const OFFICIAL_INSPECTION_DIRECTIVES: InspectionDirective[] = [
  {
    id: 'cv-3953-2026',
    number: 'Số: 3953/SGDĐT-TCCB',
    title: 'Công văn V/v thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027',
    issuer: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP',
    issueDate: 'Đồng Tháp, ngày 08 tháng 10 năm 2026',
    signBy: 'KT. GIÁM ĐỐC - PHÓ GIÁM ĐỐC Võ Văn Hiếu',
    summary: 'Sở GDĐT Đồng Tháp chỉ đạo các đơn vị trực thuộc tiếp tục thực hiện công tác kiểm tra nội bộ năm học 2026 - 2027 theo Công văn hướng dẫn số 1134/SGDĐT-TCCB ngày 17/10/2025; quy định rõ trách nhiệm người đứng đầu và 3 mốc thời hạn báo cáo bắt buộc.',
    fullPdfUrl: '/downloads/3953_CV_THUC_HIEN_CONG_TAC_KIEM_TRA_NOI_BO_2026_2027.pdf',
    pdfFilename: '3953_CV_THUC_HIEN_CONG_TAC_KIEM_TRA_NOI_BO_2026_2027.pdf',
    fileFormat: 'pdf',
    isReferenceDoc: false,
    keyPoints: [
      'Năm học 2026 - 2027, Thủ trưởng các đơn vị trực thuộc tiếp tục thực hiện công tác KTNB bám sát Công văn hướng dẫn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT.',
      'Căn cứ nhiệm vụ năm học và điều kiện thực tế (nhất là sau sáp nhập 3 điểm trường), xây dựng Kế hoạch kiểm tra nội bộ bảo đảm chủ động, linh hoạt, tập trung khắc phục những hạn chế, vướng mắc.',
      'Lựa chọn nội dung kiểm tra có trọng tâm, trọng điểm, không chồng chéo và không gây cản trở hoạt động giảng dạy bình thường.',
      'Thủ trưởng cơ sở giáo dục trực tiếp chịu trách nhiệm trước Giám đốc Sở GDĐT về chất lượng và tiến độ công tác KTNB.'
    ],
    deadlines: [
      {
        task: 'Kế hoạch kiểm tra nội bộ & Quyết định thành lập Ban kiểm tra nội bộ năm học',
        dueDate: 'Trước ngày 31/10/2026',
        status: 'in_progress',
      },
      {
        task: 'Báo cáo sơ kết công tác kiểm tra nội bộ học kỳ I',
        dueDate: 'Trước ngày 20/01/2027',
        status: 'upcoming',
      },
      {
        task: 'Báo cáo tổng kết công tác KTNB năm học & kết quả tự đánh giá chấm điểm thi đua',
        dueDate: 'Trước ngày 18/05/2027',
        status: 'upcoming',
      },
    ],
    contactOfficer: {
      name: 'Lê Thanh Phong',
      phone: '094.333.4774',
      email: 'tochuccanbo@dongthap.edu.vn',
      department: 'Phòng Tổ chức cán bộ - Sở GDĐT tỉnh Đồng Tháp',
    },
  },
  {
    id: 'hd-1134-2025',
    number: 'Số: 1134/SGDĐT-TCCB',
    title: 'Hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục',
    issuer: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP',
    issueDate: 'Đồng Tháp, ngày 17 tháng 10 năm 2025',
    signBy: 'GIÁM ĐỐC Lê Quang Trí',
    summary: 'Văn bản quy định chi tiết toàn diện về mục đích, yêu cầu, 4 nhóm nội dung kiểm tra, thẩm quyền thành lập Ban KTNB, quy trình tiến hành 3 bước (chuẩn bị, tiến hành, kết thúc), xử lý sau kiểm tra, quy cách lưu trữ hồ sơ và trọn bộ 06 biểu mẫu chuẩn.',
    fullPdfUrl: '/downloads/1134_HD_KIEM_TRA_NOI_BO_2025_2026_SGDDT_DONG_THAP.pdf',
    pdfFilename: '1134_HD_KIEM_TRA_NOI_BO_2025_2026_SGDDT_DONG_THAP.pdf',
    fileFormat: 'pdf',
    isReferenceDoc: false,
    keyPoints: [
      'Bốn nhóm nội dung kiểm tra trọng tâm: 1) Việc thực hiện nhiệm vụ của Thủ trưởng đơn vị (chiến lược, tài chính, tài sản, CSDL Đúng - Đủ - Sạch - Sống, an toàn trường học); 2) Hoạt động sư phạm của giáo viên & nhân viên; 3) Hoạt động của tổ chuyên môn & bộ phận thư viện, thiết bị, tài chính; 4) Quản lý chất lượng giáo dục.',
      'Ban KTNB trường học do Hiệu trưởng ra quyết định thành lập: Hiệu trưởng (hoặc Phó Hiệu trưởng) làm Trưởng ban, Phó Hiệu trưởng làm Phó Trưởng ban, thành viên là các tổ trưởng chuyên môn, giáo viên cốt cán, thanh tra nhân dân.',
      'Quy trình kiểm tra chuẩn 3 bước: 1. Ban hành Quyết định kiểm tra & Kế hoạch tiến hành kiểm tra (Mẫu 03); 2. Kiểm tra hồ sơ minh chứng, kiểm tra thực tế, lập Biên bản kiểm tra (Mẫu 04); 3. Lập Báo cáo kết quả kiểm tra (Mẫu 05) và ban hành Thông báo kết luận kiểm tra (Mẫu 06).',
      'Hồ sơ mỗi cuộc kiểm tra phải bàn giao cho văn thư lưu trữ đầy đủ theo Nghị định 30/2020/NĐ-CP và Thông tư số 08/2025/TT-BGDĐT.'
    ],
  },
  {
    id: 'kh-76-thptdbk-2025',
    number: 'Số: 76/KH-THPTĐBK',
    title: 'Kế hoạch công tác kiểm tra nội bộ năm học 2025 - 2026 (Trường THPT Đốc Binh Kiều cũ)',
    issuer: 'TRƯỜNG THPT ĐỐC BINH KIỀU',
    issueDate: 'Đồng Tháp, ngày 20 tháng 10 năm 2025',
    signBy: 'HIỆU TRƯỞNG Lê Thanh Cường & PHT Nguyễn Minh Trí',
    summary: 'Kế hoạch kiểm tra nội bộ cấp THPT của trường năm trước, quy định chi tiết kiểm tra toàn diện 4 tổ CM, kiểm tra dạy 2 buổi/ngày, kiểm tra ôn thi tốt nghiệp THPT, hồ sơ ĐKDT, quản lý tài chính, nề nếp học sinh và các ban ngoài giờ.',
    fullPdfUrl: '/downloads/76_KH_THPTDBK_KTNB_2025_2026.doc',
    pdfFilename: '76_KH_THPTDBK_KTNB_2025_2026.doc',
    fileFormat: 'doc',
    isReferenceDoc: true,
    keyPoints: [
      'Kiểm tra toàn diện 4 tổ chuyên môn: Tổ Ngữ văn, Toán, Vật lý-CN-TD-GDQPAN; kiểm tra chuyên đề 3 tổ còn lại (Sinh-Công nghệ-Hóa, Sử-Địa-GDKTPL, Tin học-Ngoại ngữ).',
      'Kiểm tra dạy học 2 buổi/ngày, dạy thêm học thêm: Ban điều hành và tổ kiểm tra thường xuyên hàng ngày.',
      'Trọng tâm khối THPT: Công tác ôn tập thi tốt nghiệp THPT, hồ sơ ĐKDT tốt nghiệp, kiểm tra học kỳ 2 và xét duyệt thi đua, sáng kiến kinh nghiệm.',
      'Kế hoạch xuyên suốt cả các tháng hè 6, 7, 8: Chuẩn bị thi tuyển sinh lớp 10, kiểm tra cơ sở vật chất, thiết bị, thư viện hè và chuẩn bị năm học mới.'
    ],
  },
  {
    id: 'kh-134-thcstk-2025',
    number: 'Số: 134/KH-THCSTK',
    title: 'Kế hoạch kiểm tra nội bộ năm học 2025 - 2026 (Trường THCS Tân Kiều cũ)',
    issuer: 'TRƯỜNG THCS TÂN KIỀU',
    issueDate: 'Tân Kiều, ngày 05 tháng 9 năm 2025',
    signBy: 'HIỆU TRƯỞNG Nguyễn Thanh Tòng',
    summary: 'Kế hoạch kiểm tra nội bộ rất chi tiết với 11 nhóm nội dung kiểm tra, chỉ tiêu kiểm tra toàn diện 70% giáo viên, 100% chuyên đề HSSS, kiểm tra ứng dụng CNTT và công nghệ AI trong dạy học, quản lý cấp phát văn bằng chứng chỉ và dự trù kinh phí theo quy chế chi tiêu nội bộ.',
    fullPdfUrl: '/downloads/134_KH_THCSTK_KTNB_2025_2026.docx',
    pdfFilename: '134_KH_THCSTK_KTNB_2025_2026.docx',
    fileFormat: 'docx',
    isReferenceDoc: true,
    keyPoints: [
      'Cấu trúc mẫu mực với 11 nhóm nội dung kiểm tra cụ thể hóa đầy đủ đối tượng, lực lượng, hình thức, chỉ tiêu và nội dung chi tiết.',
      'Chỉ tiêu cụ thể: Kiểm tra toàn diện 70% giáo viên; 100% chuyên đề HSSS; kiểm tra nề nếp tổ chủ nhiệm 3 lần/năm; kiểm tra văn bằng chứng chỉ 2 lần/năm.',
      'Đột phá công nghệ: Kiểm tra việc ứng dụng CNTT và ứng dụng công nghệ trí tuệ nhân tạo (AI) trong soạn giảng và sử dụng thiết bị dạy học.',
      'Quy định rõ dự trù kinh phí thực hiện kiểm tra trích từ kinh phí hoạt động đơn vị theo Quy chế chi tiêu nội bộ.'
    ],
  },
  {
    id: 'nhan-su-moi-2026',
    number: 'Tệp Excel: NHÂN SỰ MỚI.xlsx',
    title: 'Danh sách nhân sự chính thức 120 CB-GV-NV Trường THCS & THPT Đốc Binh Kiều sau sáp nhập',
    issuer: 'HỘI ĐỒNG SÁP NHẬP & BAN GIÁM HIỆU',
    issueDate: 'Tháp Mười, tháng 10 năm 2026',
    signBy: 'HIỆU TRƯỞNG Lê Thanh Cường',
    summary: 'Danh sách nhân sự chính thức của trường sau khi sáp nhập 3 trường/điểm trường cũ (THPT Đốc Binh Kiều, THCS Đốc Binh Kiều, THCS Tân Kiều). Gồm 120 cán bộ, giáo viên, nhân viên được phân bổ vào 8 tổ chuyên môn và Ban Giám hiệu, là căn cứ nhân sự tuyệt đối để phân công Ban kiểm tra nội bộ và các đoàn kiểm tra.',
    fullPdfUrl: '/downloads/NHAN_SU_MOI_THCS_THPT_DOC_BINH_KIEU.xlsx',
    pdfFilename: 'NHAN_SU_MOI_THCS_THPT_DOC_BINH_KIEU.xlsx',
    fileFormat: 'xlsx',
    isReferenceDoc: true,
    keyPoints: [
      'Quy mô toàn trường: 120 CB-GV-NV (63 nữ, 57 nam, 85 đảng viên chiếm 70.8%, 9 thạc sĩ).',
      'Ban Giám hiệu: 04 thành viên (Thầy Lê Thanh Cường - Hiệu trưởng; Thầy Nguyễn Minh Trí - PHT Thường trực; Cô Phan Thanh Thảo - PHT; Thầy Nguyễn Thanh Tòng - PHT).',
      '07 Tổ chuyên môn liên cấp: Toán (15), Ngữ văn - TV - TB (17), KHTN - Công nghệ (26), Lịch sử - Địa lý - GDCD (16), Ngoại ngữ - Tin học (16), GDTC - GDQP-AN - Nghệ thuật (12) và Tổ Văn phòng (14).',
      'Toàn bộ danh sách 22 thành viên Ban Kiểm tra nội bộ và các đoàn kiểm tra theo từng chuyên đề đều lấy chuẩn 100% từ tệp này.'
    ],
  },
];

// 2. Mười một (11) Trụ cột Kiểm tra Nội bộ Toàn diện (Kết hợp hoàn chỉnh KH 76 & KH 134)
export const SCHOOL_INSPECTION_PILLARS: InspectionPillar[] = [
  {
    id: 'pillar-01',
    orderNumber: 1,
    title: 'Hoạt động của các tổ chuyên môn, bộ phận thư viện, thiết bị, thực hành và phòng máy vi tính',
    target: '06 Tổ chuyên môn, nhân viên thư viện (Nguyễn Thị Xuyến, Hồ Văn Hữu, Trần Thị Ngọc Tý), nhân viên thiết bị (Phạm Thị Lệ Huyên, Nguyễn Văn Chữ, Trần Hoàng Yến Ngọc) và giáo viên phụ trách phòng Tin học tại cả 3 điểm trường.',
    force: 'Hiệu trưởng, 03 Phó Hiệu trưởng và các Tổ trưởng chuyên môn.',
    standardsAndCriteria: [
      'Xây dựng kế hoạch năm, tháng của tổ chuyên môn phù hợp Kế hoạch giáo dục số 34/KH của nhà trường theo Chương trình GDPT 2018.',
      'Chất lượng sinh hoạt tổ chuyên môn định kỳ 2 tuần/lần, đổi mới phương pháp dạy học, ma trận và bảng đặc tả đề kiểm tra theo định hướng phát triển năng lực.',
      'Bộ phận Thư viện: Quản lý kho sách, phòng đọc, phần mềm thư viện điện tử, thống kê lượt mượn đọc hàng tháng và luân chuyển sách giữa 3 điểm trường.',
      'Bộ phận Thiết bị - Thực hành - Vi tính: Quản lý phòng bộ môn Lý, Hóa, Sinh, Tin học; sổ nhật ký mượn trả thiết bị; an toàn hóa chất thí nghiệm.',
      'Ứng dụng CNTT và ứng dụng công nghệ trí tuệ nhân tạo (AI) trong soạn giảng, kiểm tra đánh giá và chuyển đổi số (kế thừa KH 134).'
    ],
    frequency: 'Kiểm tra toàn diện 100% các tổ và bộ phận (2 lần/năm); kiểm tra chuyên đề định kỳ hàng tháng; kiểm tra đột xuất 2 lần/năm.',
    sourceRef: 'Kết hợp Kế hoạch 134/KH-THCSTK (Mục III.1) và Kế hoạch 76/KH-THPTĐBK (Phụ lục)',
  },
  {
    id: 'pillar-02',
    orderNumber: 2,
    title: 'Kiểm tra hoạt động sư phạm và thực hiện nhiệm vụ của giáo viên',
    target: 'Tất cả 102 giáo viên thuộc 06 tổ chuyên môn đang giảng dạy tại 3 điểm trường (53 lớp).',
    force: 'Hiệu trưởng, 03 Phó Hiệu trưởng, Tổ trưởng, Tổ phó chuyên môn và giáo viên cốt cán.',
    standardsAndCriteria: [
      'Phẩm chất chính trị, đạo đức, lối sống, ý thức tổ chức kỷ luật, văn hóa công vụ và quan hệ đồng nghiệp, học sinh.',
      'Thực hiện quy chế chuyên môn: Kế hoạch bài dạy theo Công văn 5512, kế hoạch dạy học cá nhân, chuẩn bị đồ dùng dạy học trước khi lên lớp.',
      'Đổi mới phương pháp dạy học, dự giờ học tập kinh nghiệm (tối thiểu 1 tiết/tuần đối với GV trẻ, 2 tiết/tháng đối với GV khác).',
      'Đánh giá học sinh: Soạn ma trận, bảng đặc tả, đáp án chi tiết thang điểm 0,25đ; chấm chữa bài, vào điểm phần mềm CSDL đúng hạn.',
      'Chỉ tiêu: Kiểm tra toàn diện tối thiểu 70% giáo viên trong năm; 100% giáo viên được kiểm tra chuyên đề hồ sơ sổ sách; 30% kiểm tra đột xuất dự giờ không báo trước.'
    ],
    frequency: 'Thực hiện hàng tháng từ tháng 9/2026 đến tháng 5/2027.',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.2) và Kế hoạch 76/KH-THPTĐBK (Mục B.II)',
  },
  {
    id: 'pillar-03',
    orderNumber: 3,
    title: 'Kiểm tra nề nếp học tập, rèn luyện của học sinh và công tác giáo viên chủ nhiệm',
    target: 'Giáo viên chủ nhiệm 53 lớp, Tổ trưởng tổ chủ nhiệm, Đoàn Thanh niên, Tổng phụ trách Đội, lực lượng Bảo vệ và 2.111 học sinh.',
    force: 'Ban Giám hiệu, Bí thư Đoàn trường Ngô Anh Tuấn, Tổ trưởng Văn phòng và Ban Đại diện CMHS.',
    standardsAndCriteria: [
      'Tổ chủ nhiệm và GVCN: Triển khai nội quy trường lớp, sổ chủ nhiệm, theo dõi sĩ số chuyên cần, phối hợp phụ huynh học sinh.',
      'Quản lý học bạ số, sổ gọi tên ghi điểm điện tử, quy trình nhận xét đánh giá sự tiến bộ của học sinh.',
      'Tổ chức Đoàn, Hội, Đội: Tổ chức các phong trào thi đua nền nếp, hoạt động trải nghiệm, giáo dục kỹ năng sống và phòng chống bạo lực học đường.',
      'Lực lượng Bảo vệ: Trực cổng trường, giám sát học sinh ra vào, phát hiện kịp thời các vi phạm nội quy, an toàn giao thông trước cổng trường.',
      'Hoạt động của các Tiểu ban ngoài giờ: Ban tư vấn tâm lý học sinh, Ban phòng chống ma túy, Ban an toàn giao thông.'
    ],
    frequency: 'Kiểm tra tổ chủ nhiệm 3 lần/năm; kiểm tra Đoàn - Đội 2 lần/năm; kiểm tra hồ sơ lớp 2 lần/năm; bảo vệ 3 lần/năm; đột xuất khi cần.',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.3) và Kế hoạch 76/KH-THPTĐBK (Mục B.III & Phụ lục)',
  },
  {
    id: 'pillar-04',
    orderNumber: 4,
    title: 'Kiểm tra việc dạy học 2 buổi/ngày; quản lý dạy thêm, học thêm trong và ngoài nhà trường',
    target: 'Toàn thể giáo viên tham gia dạy học 2 buổi/ngày, dạy phụ đạo, bồi dưỡng và các hoạt động giáo dục có thu tiền.',
    force: 'Ban Điều hành dạy 2 buổi/ngày, Tổ kiểm tra dạy thêm học thêm, Ban Giám hiệu.',
    standardsAndCriteria: [
      'Chấp hành Thông tư quy định về dạy thêm học thêm của Bộ GDĐT và Công văn số 738/SGDĐT-TTr của Sở GDĐT Đồng Tháp.',
      'Việc phân công giáo viên, thời khóa biểu dạy 2 buổi/ngày bảo đảm đúng kế hoạch giáo dục, không gây quá tải cho học sinh.',
      'Tổ chức dạy phụ đạo miễn phí cho học sinh yếu kém và bồi dưỡng học sinh giỏi; nghiêm cấm ép buộc học sinh học thêm dưới mọi hình thức.',
      'Giáo viên ký cam kết không vi phạm quy định dạy thêm học thêm ngoài nhà trường; giải quyết kịp thời phản ánh của phụ huynh.'
    ],
    frequency: 'Kiểm tra thường xuyên hàng ngày tại trường (100% GV dạy); kiểm tra hồ sơ sổ sách 2 lần/năm; kiểm tra đột xuất khi có phản ánh.',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.4) và Kế hoạch 76/KH-THPTĐBK (Mục B.IV)',
  },
  {
    id: 'pillar-05',
    orderNumber: 5,
    title: 'Kiểm tra hoạt động của Tổ Văn phòng, công tác tài chính, kế toán và quản lý tài sản công',
    target: 'Tổ trưởng Văn phòng Trần Văn Út; nhân viên Kế toán (Nguyễn Văn Quân, Nguyễn Thị Thúy Huỳnh); Văn thư (Nguyễn Thị Kim Ngọc, Huỳnh Thị Thu Ngoan, Nguyễn Thị Kim Kha); Y tế (Minh Tho, Trần Thị Bích Hạnh); Thủ quỹ và Bảo vệ.',
    force: 'Hiệu trưởng Lê Thanh Cường, Đảng ủy, Ban Thanh tra nhân dân và Kế toán kiểm tra chéo.',
    standardsAndCriteria: [
      'Công tác hành chính - văn thư: Tiếp nhận, luân chuyển văn bản đi/đến trên hệ thống iDesk Sở; quản lý con dấu; lưu trữ hồ sơ theo Nghị định 30/2020/NĐ-CP và Thông tư 08/2025/TT-BGDĐT.',
      'Công tác tài chính - kế toán: Lập dự toán, chấp hành ngân sách nhà nước, các khoản thu hộ (BHYT học sinh), quản lý quỹ Ban đại diện CMHS theo Thông tư 55, công khai tài chính theo Thông tư 36.',
      'Công tác y tế học đường: Tủ thuốc sơ cấp cứu, khám sức khỏe ban đầu cho học sinh đầu năm học, đảm bảo nguồn nước uống tinh khiết tại 3 điểm trường.',
      'Bảo vệ và PCCC: Bảo quản tài sản công, hệ thống camera an ninh, 2 máy bơm chữa cháy, 11 tủ chữa cháy, kiểm tra định kỳ bình chữa cháy.'
    ],
    frequency: 'Kiểm tra toàn diện Tổ Văn phòng 2 lần/năm; kiểm tra chuyên đề tài chính kế toán 2 lần/năm (tháng 10 và tháng 5); đột xuất khi cần.',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.5) và Kế hoạch 76/KH-THPTĐBK (Mục B.V)',
  },
  {
    id: 'pillar-06',
    orderNumber: 6,
    title: 'Kiểm tra công tác quản lý của Thủ trưởng đơn vị (Hiệu trưởng và các Phó Hiệu trưởng)',
    target: 'Hiệu trưởng Lê Thanh Cường và 03 Phó Hiệu trưởng (Nguyễn Minh Trí, Phan Thanh Thảo, Nguyễn Thanh Tòng).',
    force: 'Thành viên Ban Kiểm tra nội bộ được phân công, đại diện Cấp ủy Đảng và Ban Thanh tra nhân dân.',
    standardsAndCriteria: [
      'Xây dựng và tổ chức thực hiện kế hoạch năm học, học kỳ, hàng tháng; cụ thể hóa các chỉ đạo của Sở GDĐT Đồng Tháp.',
      'Công tác quản lý, thực hiện chế độ chính sách, tiền lương, phụ cấp cho 120 cán bộ, giáo viên, nhân viên sau sáp nhập.',
      'Thực hiện Quy chế dân chủ cơ sở theo Thông tư số 11/2020/TT-BGDĐT và Luật Thực hiện dân chủ ở cơ sở năm 2022.',
      'Công tác chỉ đạo xây dựng trường đạt chuẩn quốc gia, kiểm định chất lượng giáo dục và kiểm tra đánh giá theo chuẩn nghề nghiệp giáo viên, cán bộ quản lý.'
    ],
    frequency: 'Kiểm tra toàn diện 2 lần/năm (Học kỳ 1 vào tháng 12/2026; Học kỳ 2 vào tháng 05/2027).',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.6) và Kế hoạch 76/KH-THPTĐBK (Mục B.VI)',
  },
  {
    id: 'pillar-07',
    orderNumber: 7,
    title: 'Kiểm tra công tác tiếp công dân, giải quyết khiếu nại, giải quyết tố cáo',
    target: 'Bộ phận tiếp công dân, cán bộ phụ trách tiếp nhận đơn thư, Hiệu trưởng và Ban Giám hiệu.',
    force: 'Ban Kiểm tra nội bộ, Ban Thanh tra nhân dân trường học.',
    standardsAndCriteria: [
      'Niêm yết công khai lịch tiếp công dân định kỳ của Hiệu trưởng, nội quy phòng tiếp dân, hòm thư góp ý.',
      'Mở sổ theo dõi tiếp công dân, ghi chép đầy đủ nội dung khiếu nại, kiến nghị, phản ánh của công dân, giáo viên, cha mẹ học sinh.',
      'Quy trình xử lý đơn thư khiếu nại, tố cáo đúng thời hạn, đúng thẩm quyền pháp luật quy định, không để tồn đọng khiếu kiện kéo dài.'
    ],
    frequency: 'Kiểm tra toàn diện 1 lần/năm (vào tháng 04/2027); kiểm tra đột xuất ngay khi có phát sinh đơn thư khiếu nại, tố cáo.',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.7) và Kế hoạch 76/KH-THPTĐBK (Mục B.VII)',
  },
  {
    id: 'pillar-08',
    orderNumber: 8,
    title: 'Giám sát, kiểm tra công tác phòng, chống tham nhũng, lãng phí và thực hành tiết kiệm',
    target: 'Hiệu trưởng, 03 Phó Hiệu trưởng, Kế toán, Thủ quỹ và các bộ phận mua sắm, quản lý tài sản, cơ sở vật chất.',
    force: 'Hiệu trưởng, Cấp ủy Đảng, Công đoàn cơ sở, Ban Thanh tra nhân dân.',
    standardsAndCriteria: [
      'Thành lập Ban chỉ đạo phòng chống tham nhũng và ban hành Kế hoạch phòng chống tham nhũng, lãng phí năm học 2026 - 2027.',
      'Kê khai minh bạch tài sản, thu nhập của các chức danh theo quy định của pháp luật.',
      'Tích hợp nội dung phòng chống tham nhũng vào giảng dạy môn GDCD (cấp THCS) và GDKT&PL (cấp THPT) theo chỉ đạo của Sở GDĐT.',
      'Giám sát các khoản chi tiêu công, đấu thầu mua sắm thiết bị, văn phòng phẩm, quản lý điện nước, tài sản công không để thất thoát, lãng phí.'
    ],
    frequency: 'Giám sát thường xuyên hàng tháng; báo cáo định kỳ vào tháng 01/2027 (sơ kết HK1) và tháng 05/2027 (tổng kết năm học); kiểm tra khi có dấu hiệu.',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.8) và Kế hoạch 76/KH-THPTĐBK (Mục B.VIII)',
  },
  {
    id: 'pillar-09',
    orderNumber: 9,
    title: 'Kiểm tra việc thực hiện các cuộc vận động và phong trào thi đua của ngành',
    target: 'Toàn thể 120 cán bộ quản lý, giáo viên, nhân viên và học sinh toàn trường.',
    force: 'Hiệu trưởng, 03 Phó Hiệu trưởng, Cấp ủy Đảng, Ban Chấp hành Công đoàn và Đoàn Thanh niên.',
    standardsAndCriteria: [
      'Thực hiện Kết luận số 01-KL/TW về tiếp tục học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh.',
      'Cuộc vận động "Mỗi thầy cô giáo là một tấm gương đạo đức, tự học và sáng tạo", xây dựng trường học hạnh phúc, an toàn, thân thiện.',
      'Phong trào thi đua đổi mới sáng tạo trong dạy và học, phong trào tự làm thiết bị dạy học và nghiên cứu khoa học kỹ thuật, viết SKKN.',
      'Thực hiện kỷ luật kỷ cương hành chính, chuẩn mực đạo đức nhà giáo, chống tiêu cực và bệnh thành tích trong giáo dục.'
    ],
    frequency: 'Giám sát thường xuyên qua các đợt thi đua 20/11, 26/03, sơ kết học kỳ và tổng kết năm học.',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.9)',
  },
  {
    id: 'pillar-10',
    orderNumber: 10,
    title: 'Kiểm tra công tác quản lý, cấp phát và sử dụng văn bằng, chứng chỉ (tốt nghiệp THCS & THPT)',
    target: 'Cán bộ Văn thư phụ trách quản lý văn bằng, chứng chỉ và hồ sơ tốt nghiệp.',
    force: 'Phó Hiệu trưởng phụ trách chuyên môn Nguyễn Minh Trí, Tổ trưởng Văn phòng Trần Văn Út, Ban Thanh tra nhân dân.',
    standardsAndCriteria: [
      'Công tác tiếp nhận phôi bằng tốt nghiệp THCS và THPT từ Sở GDĐT Đồng Tháp; bảo quản an toàn phôi bằng chưa cấp phát.',
      'Sổ cấp phát văn bằng: Ghi chép đầy đủ số hiệu bằng, số vào sổ, ngày cấp, chữ ký người nhận hoặc giấy ủy quyền hợp pháp nếu nhận thay.',
      'Lưu trữ hồ sơ xét công nhận tốt nghiệp THCS, danh sách học sinh tốt nghiệp THPT qua các khóa theo quy định lưu trữ vĩnh viễn.',
      'Thông báo công khai trên website trường để học sinh các khóa về nhận bằng tốt nghiệp đúng thời hạn.'
    ],
    frequency: 'Kiểm tra chuyên đề định kỳ 2 lần/năm (vào tháng 12/2026 và tháng 05/2027; kiểm tra hè tháng 07/2027).',
    sourceRef: 'Kế hoạch 134/KH-THCSTK (Mục III.10) và Kế hoạch 76/KH-THPTĐBK (Phụ lục tháng 6, 7)',
  },
  {
    id: 'pillar-11',
    orderNumber: 11,
    title: 'Kiểm tra các nhiệm vụ trọng tâm đặc thù của năm học sáp nhập 2026 - 2027',
    target: 'Các Điểm trường THCS Đốc Binh Kiều, Điểm Tân Kiều (11km), Khối 9, Khối 12 và 25 học sinh khuyết tật học hòa nhập.',
    force: 'Ban Giám hiệu (Hiệu trưởng và 3 Phó Hiệu trưởng), Tổ trưởng chuyên môn, Tổ tư vấn tâm lý.',
    standardsAndCriteria: [
      'Thực hiện Công văn số 3326/SGDĐT-GDTrH: Lập hồ sơ Kế hoạch giáo dục cá nhân cho 25 HS khuyết tật, điều chỉnh đề kiểm tra và đánh giá học sinh hòa nhập.',
      'Công tác ôn tập thi tốt nghiệp THPT năm 2027 cho học sinh Khối 12 và ôn thi tuyển sinh vào lớp 10 cho học sinh Khối 9.',
      'Kiểm tra điều kiện cơ sở vật chất, luân chuyển giáo viên dạy liên điểm tại Điểm trường Tân Kiều (cách 11km).',
      'Vận hành cơ sở dữ liệu ngành "Đúng - Đủ - Sạch - Sống", số hóa 100% học bạ số và chữ ký số giáo viên.'
    ],
    frequency: 'Kiểm tra chuyên đề định kỳ xuyên suốt năm học và cao điểm tháng 11/2026, tháng 3/2027, tháng 4/2027.',
    sourceRef: 'Kế hoạch giáo dục số 34/KH, CV 3326/SGDĐT-GDTrH và Kế hoạch 76/KH-THPTĐBK (Tháng 4, 5, 6)',
  },
];

// 2. Ban Kiểm tra nội bộ Trường THCS & THPT Đốc Binh Kiều năm học 2026 - 2027
// (Ban hành kèm Quyết định số 49/QĐ-THCS-THPTĐBK ngày 15/10/2026)
// Căn cứ danh sách nhân sự chính thức từ tệp NHÂN SỰ MỚI.xlsx (120 CB-GV-NV toàn trường)
export const SCHOOL_INSPECTION_COMMITTEE: InspectionCommitteeMember[] = [
  {
    id: 'mbr-1',
    orderNumber: 1,
    fullName: 'Lê Thanh Cường',
    roleInSchool: 'Hiệu trưởng',
    roleInCommittee: 'Trưởng ban',
    assignedDuty: 'Chỉ đạo chung toàn bộ công tác kiểm tra nội bộ nhà trường; phê duyệt Kế hoạch KTNB, ký các Quyết định kiểm tra và ban hành Thông báo kết quả kiểm tra; trực tiếp kiểm tra công tác quản lý tài chính, tài sản, cơ sở dữ liệu ngành và phòng chống tham nhũng lãng phí.',
  },
  {
    id: 'mbr-2',
    orderNumber: 2,
    fullName: 'Nguyễn Minh Trí',
    roleInSchool: 'Phó Hiệu trưởng',
    roleInCommittee: 'Phó Trưởng ban Thường trực',
    assignedDuty: 'Thường trực Ban KTNB; phụ trách theo dõi công tác KTNB chuyên môn toàn trường & cấp THPT (Khối 10, 11, 12 tại Điểm chính); trực tiếp làm Trưởng các đoàn kiểm tra quy chế chuyên môn, kiểm tra đánh giá định kỳ, ôn thi tốt nghiệp THPT và quản lý dạy thêm học thêm.',
  },
  {
    id: 'mbr-3',
    orderNumber: 3,
    fullName: 'Phan Thanh Thảo',
    roleInSchool: 'Phó Hiệu trưởng',
    roleInCommittee: 'Phó Trưởng ban',
    assignedDuty: 'Phụ trách công tác KTNB tại Điểm trường THCS Đốc Binh Kiều (24 lớp, 980 học sinh); trực tiếp làm Trưởng các đoàn kiểm tra hồ sơ sổ sách chuyên môn cấp THCS, công tác thiết bị thí nghiệm thực hành, an toàn trường học và giáo dục hòa nhập học sinh khuyết tật.',
  },
  {
    id: 'mbr-4',
    orderNumber: 4,
    fullName: 'Nguyễn Thanh Tòng',
    roleInSchool: 'Phó Hiệu trưởng',
    roleInCommittee: 'Phó Trưởng ban',
    assignedDuty: 'Phụ trách công tác KTNB tại Điểm trường THCS Tân Kiều cách 11km (15 lớp, 602 học sinh); trực tiếp làm Trưởng các đoàn kiểm tra chuyên đề thực hiện CT GDPT 2018, bảo quản cơ sở vật chất, trang thiết bị dạy học và an toàn giao thông, y tế học đường tại điểm trường Tân Kiều.',
  },
  {
    id: 'mbr-5',
    orderNumber: 5,
    fullName: 'Nguyễn Văn Tới',
    roleInSchool: 'Tổ trưởng Tổ Toán',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra chuyên đề quy chế chuyên môn môn Toán; kiểm tra việc xây dựng ma trận, bảng đặc tả, đề kiểm tra định kỳ; kiểm tra việc ứng dụng CNTT và chấm chữa bài môn Toán tại các điểm trường.',
  },
  {
    id: 'mbr-6',
    orderNumber: 6,
    fullName: 'Tô Thị Lắm',
    roleInSchool: 'Tổ trưởng Tổ Ngữ văn - Thư viện - Thiết bị',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra quy chế chuyên môn môn Ngữ văn, hồ sơ bài dạy theo CV 5512; kiểm tra việc đổi mới phương pháp dạy học phát triển phẩm chất năng lực học sinh và kiểm tra đánh giá môn Ngữ văn.',
  },
  {
    id: 'mbr-7',
    orderNumber: 7,
    fullName: 'Lê Hồng Thúy',
    roleInSchool: 'Tổ trưởng Tổ Lịch sử - Địa lý-GDCD-GDKTPL',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra quy chế chuyên môn các môn Lịch sử, Địa lý, GDCD/GDKT&PL; kiểm tra việc lồng ghép giáo dục đạo đức, kỹ năng sống, an toàn pháp luật và công tác tư vấn tâm lý học sinh.',
  },
  {
    id: 'mbr-8',
    orderNumber: 8,
    fullName: 'Bùi Kim Huỳnh',
    roleInSchool: 'Tổ trưởng Tổ Vật lý-Hóa học-Sinh học-CN',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra việc thực hiện chương trình môn KHTN (cấp THCS) và Vật lý, Hóa học, Sinh học, Công nghệ (cấp THPT); kiểm tra sổ theo dõi thực hành và an toàn thí nghiệm tại 3 điểm trường.',
  },
  {
    id: 'mbr-9',
    orderNumber: 9,
    fullName: 'Lê Thị Ngọc Tuyền',
    roleInSchool: 'Tổ trưởng Tổ Ngoại ngữ - Tin học',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra chuyên đề dạy và học Ngoại ngữ (Tiếng Anh), việc khai thác phòng học tiếng và thiết bị nghe nhìn; kiểm tra công tác dạy Tin học và ứng dụng phần mềm tại các điểm trường.',
  },
  {
    id: 'mbr-10',
    orderNumber: 10,
    fullName: 'Lê Văn Nguyên',
    roleInSchool: 'Tổ trưởng Tổ GDTC - QPAN - Nghệ thuật',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra công tác giáo dục thể chất, sân bãi luyện tập thể dục thể thao, an toàn mô hình vũ khí trang thiết bị GDQP-AN và các hoạt động văn hóa nghệ thuật tại các điểm trường.',
  },
  {
    id: 'mbr-11',
    orderNumber: 11,
    fullName: 'Trần Văn Út',
    roleInSchool: 'Tổ trưởng Tổ Văn phòng (Kế toán)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tư vấn, phối hợp kiểm tra hồ sơ chứng từ kế toán, thu - chi ngân sách nhà nước, công tác xã hội hóa giáo dục, kinh phí hoạt động Ban đại diện CMHS và việc công khai tài chính theo Thông tư 36.',
  },
  {
    id: 'mbr-12',
    orderNumber: 12,
    fullName: 'Ngô Anh Tuấn',
    roleInSchool: 'Giáo viên - Phụ trách Đoàn trường',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Phối hợp kiểm tra nền nếp, kỷ cương học sinh, công tác phòng chống bạo lực học đường, an toàn giao thông; kiểm tra hoạt động phong trào Đoàn - Đội và các hoạt động trải nghiệm hướng nghiệp.',
  },
  {
    id: 'mbr-13',
    orderNumber: 13,
    fullName: 'Trần Quốc Huy',
    roleInSchool: 'Tổ phó Tổ Toán (Điểm Tân Kiều)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia các đoàn kiểm tra quy chế chuyên môn và hoạt động sư phạm của giáo viên tại Điểm trường THCS Tân Kiều.',
  },
  {
    id: 'mbr-14',
    orderNumber: 14,
    fullName: 'Trương Văn Nghĩa',
    roleInSchool: 'Tổ phó Tổ Ngữ văn (Điểm Đốc Binh Kiều)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia các đoàn kiểm tra chuyên đề Ngữ văn, hồ sơ bài dạy và giáo dục hòa nhập tại Điểm trường THCS Đốc Binh Kiều.',
  },
  {
    id: 'mbr-15',
    orderNumber: 15,
    fullName: 'Huỳnh Thị Vân Nhi',
    roleInSchool: 'Tổ phó Tổ Ngữ văn (Điểm Tân Kiều)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia các đoàn kiểm tra hoạt động sư phạm nhà giáo và nền nếp chuyên môn tại Điểm trường THCS Tân Kiều.',
  },
  {
    id: 'mbr-16',
    orderNumber: 16,
    fullName: 'Thái Văn Tiến',
    roleInSchool: 'Tổ phó Tổ KHTN-CN (Điểm Tân Kiều)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia đoàn kiểm tra chuyên đề thực hiện Chương trình GDPT 2018 môn KHTN và thiết bị dạy học tại Điểm Tân Kiều.',
  },
  {
    id: 'mbr-17',
    orderNumber: 17,
    fullName: 'Phạm Biên Thùy',
    roleInSchool: 'Tổ phó Tổ KHTN-CN (Điểm chính THPT)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra phòng thí nghiệm thực hành Vật lý, Hóa học, Sinh học cấp THPT và kiểm tra đề thi định kỳ.',
  },
  {
    id: 'mbr-18',
    orderNumber: 18,
    fullName: 'Nguyễn Thị Hiếu',
    roleInSchool: 'Tổ phó Tổ KHTN-CN (Điểm Đốc Binh Kiều)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra công tác thực hành thí nghiệm và hoạt động sư phạm giáo viên KHTN tại Điểm trường THCS Đốc Binh Kiều.',
  },
  {
    id: 'mbr-19',
    orderNumber: 19,
    fullName: 'Nguyễn Trung Hiếu',
    roleInSchool: 'Tổ phó Tổ Ngoại ngữ - Tin học (Điểm chính THPT)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra công tác chuyển đổi số, cơ sở dữ liệu ngành Đúng - Đủ - Sạch - Sống, hệ thống bảo mật thông tin và ứng dụng phần mềm.',
  },
  {
    id: 'mbr-20',
    orderNumber: 20,
    fullName: 'Nguyễn Văn Quân',
    roleInSchool: 'Tổ phó Tổ Văn phòng (Kế toán Điểm Đốc Binh Kiều)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra sổ sách kế toán, các khoản thu chi đầu năm và quản lý tài sản tại Điểm trường THCS Đốc Binh Kiều.',
  },
  {
    id: 'mbr-21',
    orderNumber: 21,
    fullName: 'Nguyễn Thị Thúy Huỳnh',
    roleInSchool: 'Tổ phó Tổ Văn phòng (Kế toán Điểm Tân Kiều)',
    roleInCommittee: 'Thành viên',
    assignedDuty: 'Tham gia kiểm tra hồ sơ tài chính, cơ sở vật chất và các khoản vận động tài trợ tại Điểm trường THCS Tân Kiều.',
  },
  {
    id: 'mbr-22',
    orderNumber: 22,
    fullName: 'Nguyễn Thị Kim Ngọc',
    roleInSchool: 'Cán bộ Văn thư (Điểm chính THPT)',
    roleInCommittee: 'Thư ký',
    assignedDuty: 'Thư ký Ban KTNB; ghi biên bản các cuộc họp Ban; tiếp nhận, tập hợp hồ sơ các cuộc kiểm tra và thực hiện bàn giao lưu trữ hồ sơ theo Nghị định 30/2020/NĐ-CP và Thông tư 08/2025/TT-BGDĐT.',
  },
];

// 3. Danh mục 14 cuộc kiểm tra chi tiết trong năm học 2026 - 2027
// (Ban hành kèm Kế hoạch số 48/KH-THCS&THPTĐBK của nhà trường)
export const SCHOOL_INSPECTION_SCHEDULE: InspectionScheduleItem[] = [
  {
    id: 'insp-01',
    orderNumber: 1,
    title: 'Kiểm tra công tác quản lý đầu năm học, nền nếp học sinh và xây dựng kế hoạch giáo dục của các tổ chuyên môn',
    target: '06 Tổ chuyên môn, Tổ Văn phòng, Đoàn Thanh niên, Tổng phụ trách Đội',
    timeframe: 'Tháng 10/2026',
    dateRange: '15/10/2026 - 25/10/2026',
    method: 'Kiểm tra toàn diện',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Nguyễn Minh Trí (PHT)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Lê Hồng Thúy (TT KHXH)', 'Nguyễn Thị Kim Ngọc (Thư ký)'],
    scope: 'Kiểm tra việc ban hành và phê duyệt Kế hoạch dạy học theo CV 5512; biên bản sinh hoạt tổ chuyên môn định kỳ 2 tuần/lần; nền nếp chuyên cần của 2.111 học sinh tại 53 lớp.',
    status: 'in_progress',
  },
  {
    id: 'insp-02',
    orderNumber: 2,
    title: 'Kiểm tra công tác quản lý tài chính, thu nộp đầu năm học, các khoản vận động tài trợ và quỹ Ban đại diện CMHS',
    target: 'Bộ phận Tài chính - Kế toán, Thủ quỹ, Hiệu trưởng và Ban đại diện CMHS trường',
    timeframe: 'Tháng 10/2026',
    dateRange: '20/10/2026 - 30/10/2026',
    method: 'Kiểm tra chuyên đề',
    campus: 'Điểm chính (THPT)',
    teamLeader: 'Lê Thanh Cường (HT)',
    teamMembers: ['Trần Văn Út (Tổ trưởng VP)', 'Nguyễn Văn Quân (Tổ phó VP)', 'Nguyễn Thị Thúy Huỳnh (Tổ phó VP)', 'Nguyễn Thị Kim Ngọc (Thư ký)'],
    scope: 'Kiểm tra biên lai, sổ sách thu bảo hiểm y tế, học phí (nếu có), kinh phí hoạt động Ban đại diện CMHS theo Thông tư 55/2011/TT-BGDĐT; kiểm tra việc niêm yết công khai tài chính theo đúng quy định.',
    status: 'in_progress',
  },
  {
    id: 'insp-03',
    orderNumber: 3,
    title: 'Kiểm tra chuyên đề thực hiện Chương trình GDPT 2018 và công tác quản lý cơ sở vật chất tại Điểm trường Tân Kiều (cách 11km)',
    target: 'Cán bộ, giáo viên và các lớp THCS tại Điểm Tân Kiều (Khối 6-9, từ lớp A7)',
    timeframe: 'Tháng 11/2026',
    dateRange: '05/11/2026 - 12/11/2026',
    method: 'Kiểm tra chuyên đề',
    campus: 'Điểm Tân Kiều (THCS)',
    teamLeader: 'Nguyễn Thanh Tòng (PHT phụ trách Điểm Tân Kiều)',
    teamMembers: ['Trần Quốc Huy (Tổ phó Toán)', 'Huỳnh Thị Vân Nhi (Tổ phó Ngữ văn)', 'Thái Văn Tiến (Tổ phó KHTN)', 'Phạm Thị Mỹ Châu (Tổ phó LS-ĐL)'],
    scope: 'Kiểm tra điều kiện dạy học sau sáp nhập tại điểm trường xa nhất (11km); phòng học, trang thiết bị, bảo quản tài sản công, nền nếp lên lớp của giáo viên được điều động luân chuyển dạy liên điểm.',
    status: 'scheduled',
  },
  {
    id: 'insp-04',
    orderNumber: 4,
    title: 'Kiểm tra hoạt động sư phạm của nhà giáo (Đợt 1: 06 giáo viên cấp THCS và THPT)',
    target: '06 giáo viên thuộc các tổ Toán, Ngữ văn, KHTN, Ngoại ngữ-Tin học',
    timeframe: 'Tháng 11/2026',
    dateRange: '15/11/2026 - 28/11/2026',
    method: 'Kiểm tra toàn diện',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Nguyễn Minh Trí (PHT)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Thị Ngọc Tuyền (TT NN-Tin)'],
    scope: 'Dự giờ mỗi giáo viên từ 2-3 tiết; kiểm tra toàn bộ hồ sơ bài dạy, kế hoạch bồi dưỡng cá nhân, việc kiểm tra đánh giá thường xuyên trên phần mềm và văn hóa công vụ.',
    status: 'scheduled',
  },
  {
    id: 'insp-05',
    orderNumber: 5,
    title: 'Kiểm tra công tác quản lý, khai thác thiết bị dạy học, phòng thí nghiệm thực hành và hoạt động Thư viện',
    target: 'Cán bộ phụ trách thiết bị, nhân viên thư viện, các phòng bộ môn tại 3 điểm trường',
    timeframe: 'Tháng 12/2026',
    dateRange: '02/12/2026 - 10/12/2026',
    method: 'Kiểm tra chuyên đề',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Phan Thanh Thảo (PHT phụ trách Điểm THCS Đốc Binh Kiều)',
    teamMembers: ['Nguyễn Thanh Tòng (PHT)', 'Nguyễn Văn Chữ (Thiết bị)', 'Hồ Văn Hữu (Thư viện)', 'Phạm Thị Lệ Huyên (Thiết bị)', 'Nguyễn Thị Kim Ngọc (Thư ký)'],
    scope: 'Kiểm tra sổ mượn trả thiết bị; việc giáo viên đưa học sinh lên phòng thực hành Lý - Hóa - Sinh; tình trạng bảo quản hóa chất độc hại; vệ sinh và số lượng đầu sách, máy tính tra cứu thư viện.',
    status: 'scheduled',
  },
  {
    id: 'insp-06',
    orderNumber: 6,
    title: 'Kiểm tra công tác tổ chức kiểm tra, đánh giá cuối học kỳ I năm học 2026 - 2027',
    target: 'Tổ in sao đề, Ban coi thi, Ban chấm thi và các Tổ chuyên môn toàn trường',
    timeframe: 'Tháng 12/2026',
    dateRange: '18/12/2026 - 30/12/2026',
    method: 'Kiểm tra toàn diện',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Nguyễn Minh Trí (PHT)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Hồng Thúy (TT KHXH)', 'Nguyễn Trung Hiếu (Tổ phó Tin học)'],
    scope: 'Kiểm tra bảo mật in sao đề thi theo quy chế; quy trình coi, thu bài thi; tiến độ và tính chính xác trong chấm bài, nhập điểm vào hệ thống phần mềm CSDL ngành, tránh sai lệch và kiểm soát rủi ro.',
    status: 'scheduled',
  },
  {
    id: 'insp-07',
    orderNumber: 7,
    title: 'Kiểm tra công tác chuyển đổi số, an toàn thông tin và cơ sở dữ liệu ngành "Đúng - Đủ - Sạch - Sống"',
    target: 'Cán bộ quản trị phần mềm, văn thư số, giáo viên chủ nhiệm 53 lớp',
    timeframe: 'Tháng 01/2027',
    dateRange: '05/01/2027 - 12/01/2027',
    method: 'Kiểm tra chuyên đề',
    campus: 'Điểm chính (THPT)',
    teamLeader: 'Lê Thanh Cường (HT)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Nguyễn Trung Hiếu (Tổ phó Tin học)', 'Mai Phước Lộc (GV Tin học)', 'Nguyễn Thị Kim Ngọc (Văn thư)'],
    scope: 'Kiểm tra việc cập nhật mã định danh học sinh, sổ theo dõi và đánh giá điện tử, ký số học bạ số; hệ thống bảo mật thông tin nội bộ, việc thực hiện gửi nhận văn bản điện tử trên iDesk Sở.',
    status: 'scheduled',
  },
  {
    id: 'insp-08',
    orderNumber: 8,
    title: 'Sơ kết công tác kiểm tra nội bộ học kỳ I và tổng hợp báo cáo gửi Sở GDĐT Đồng Tháp',
    target: 'Toàn thể Ban Kiểm tra nội bộ, các tổ bộ môn và bộ phận trực thuộc',
    timeframe: 'Tháng 01/2027',
    dateRange: '14/01/2027 - 19/01/2027',
    method: 'Kiểm tra toàn diện',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Lê Thanh Cường (HT)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Nguyễn Thị Kim Ngọc (Thư ký)'],
    scope: 'Rà soát toàn bộ kết quả kiểm tra các đợt HK1; đối chiếu việc khắc phục sai sót của các đối tượng; hoàn thiện Báo cáo sơ kết KTNB HK1 nộp Sở GDĐT trước ngày 20/01/2027 theo Công văn 3953.',
    status: 'scheduled',
  },
  {
    id: 'insp-09',
    orderNumber: 9,
    title: 'Kiểm tra việc chấp hành quy định về dạy thêm, học thêm trong và ngoài nhà trường',
    target: 'Toàn thể cán bộ, giáo viên trong trường (đặc biệt giáo viên các môn Văn, Toán, Tiếng Anh, Lý, Hóa)',
    timeframe: 'Tháng 02/2027',
    dateRange: '15/02/2027 - 25/02/2027',
    method: 'Kiểm tra chuyên đề',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Lê Thanh Cường (HT)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Ngô Anh Tuấn (Phụ trách Đoàn)'],
    scope: 'Kiểm tra việc ký cam kết không dạy thêm trái quy định; kiểm tra việc tổ chức phụ đạo học sinh yếu kém và bồi dưỡng HSG có thu tiền hay không; khảo sát ý kiến phụ huynh học sinh.',
    status: 'scheduled',
  },
  {
    id: 'insp-10',
    orderNumber: 10,
    title: 'Kiểm tra công tác giáo dục hòa nhập cho 25 học sinh khuyết tật và hoạt động tư vấn tâm lý, phòng chống bạo lực học đường',
    target: 'Giáo viên chủ nhiệm có HS khuyết tật (25 HS tại 3 điểm trường), Tổ tư vấn tâm lý học đường',
    timeframe: 'Tháng 03/2027',
    dateRange: '03/03/2027 - 12/03/2027',
    method: 'Kiểm tra chuyên đề',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Phan Thanh Thảo (PHT phụ trách Điểm THCS Đốc Binh Kiều)',
    teamMembers: ['Nguyễn Thanh Tòng (PHT)', 'Lê Hồng Thúy (TT KHXH)', 'Trương Văn Nghĩa (Tổ phó Ngữ văn)', 'Ngô Anh Tuấn (Phụ trách Đoàn)'],
    scope: 'Kiểm tra hồ sơ theo dõi kế hoạch giáo dục cá nhân cho 25 HS khuyết tật theo Công văn 3326; kiểm tra việc điều chỉnh mục tiêu, đề kiểm tra định kỳ cho HS hòa nhập; hồ sơ tư vấn tâm lý học sinh.',
    status: 'scheduled',
  },
  {
    id: 'insp-11',
    orderNumber: 11,
    title: 'Kiểm tra hoạt động sư phạm của nhà giáo (Đợt 2: 08 giáo viên cấp THCS và THPT)',
    target: '08 giáo viên thuộc các tổ KHXH, GDTC-QPAN-Nghệ thuật, Toán, Ngữ văn',
    timeframe: 'Tháng 03/2027',
    dateRange: '15/03/2027 - 28/03/2027',
    method: 'Kiểm tra toàn diện',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Nguyễn Minh Trí (PHT)',
    teamMembers: ['Lê Hồng Thúy (TT KHXH)', 'Lê Văn Nguyên (TT GDTC-QPAN)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Thị Ngọc Tuyền (TT NN-Tin)'],
    scope: 'Dự giờ đánh giá tiết dạy theo tiêu chí phát triển năng lực; kiểm tra kế hoạch bài dạy điện tử, việc sử dụng đồ dùng dạy học; chấm chữa bài cho học sinh và kết quả rèn luyện của lớp phụ trách.',
    status: 'scheduled',
  },
  {
    id: 'insp-12',
    orderNumber: 12,
    title: 'Kiểm tra công tác ôn tập thi tốt nghiệp THPT năm 2027 (Khối 12) và ôn thi tuyển sinh lớp 10 (Khối 9)',
    target: 'Tổ trưởng chuyên môn và các giáo viên trực tiếp giảng dạy ôn thi Khối 9 và Khối 12',
    timeframe: 'Tháng 04/2027',
    dateRange: '05/04/2027 - 15/04/2027',
    method: 'Kiểm tra chuyên đề',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Nguyễn Minh Trí (PHT)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Lê Thị Ngọc Tuyền (TT Ngoại ngữ)', 'Bùi Kim Huỳnh (TT KHTN)'],
    scope: 'Kiểm tra kế hoạch ôn thi, ngân hàng câu hỏi phân hóa theo năng lực; điểm thi thử; việc tổ chức dạy phụ đạo bổ trợ kiến thức cho nhóm học sinh có nguy cơ trượt tốt nghiệp.',
    status: 'scheduled',
  },
  {
    id: 'insp-13',
    orderNumber: 13,
    title: 'Kiểm tra an toàn trường học, công tác phòng cháy chữa cháy, y tế học đường và vệ sinh môi trường',
    target: 'Bộ phận Y tế trường học, Bảo vệ, Phục vụ vệ sinh tại cả 3 điểm trường',
    timeframe: 'Tháng 04/2027',
    dateRange: '18/04/2027 - 26/04/2027',
    method: 'Kiểm tra chuyên đề',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Phan Thanh Thảo (PHT) & Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Minh Tho (Y tế THPT)', 'Trần Thị Bích Hạnh (Y tế THCS)', 'Nguyễn Ngọc Cường (Bảo vệ)', 'Nguyễn Văn Thuấn (Bảo vệ)', 'Huỳnh Quang Huy (Bảo vệ)'],
    scope: 'Kiểm tra hạn sử dụng và áp suất bình chữa cháy; tủ thuốc y tế sơ cấp cứu học sinh; nguồn nước uống tinh khiết cho học sinh; vệ sinh khu nhà vệ sinh học sinh tại 3 điểm trường.',
    status: 'scheduled',
  },
  {
    id: 'insp-14',
    orderNumber: 14,
    title: 'Kiểm tra đánh giá xếp loại học sinh cuối năm, quản lý học bạ, hồ sơ tốt nghiệp và tổng kết công tác KTNB năm học 2026 - 2027',
    target: 'Tổ Văn thư, Giáo viên chủ nhiệm 53 lớp, Ban KTNB và Ban Giám hiệu',
    timeframe: 'Tháng 05/2027',
    dateRange: '03/05/2027 - 15/05/2027',
    method: 'Kiểm tra toàn diện',
    campus: 'Cả 3 điểm trường',
    teamLeader: 'Lê Thanh Cường (HT)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Nguyễn Thị Kim Ngọc (Thư ký)'],
    scope: 'Kiểm tra quy trình xét tốt nghiệp THCS Khối 9, hoàn tất hồ sơ dự thi tốt nghiệp THPT Khối 12; hoàn thiện Báo cáo tổng kết công tác KTNB năm học và tự chấm điểm thi đua gửi Sở GDĐT trước 18/05/2027.',
    status: 'scheduled',
  },
];

// 4. Trọn bộ 06 Biểu mẫu chuẩn nghiệp vụ kiểm tra nội bộ theo Phụ lục Công văn 1134/SGDĐT-TCCB
export const OFFICIAL_INSPECTION_TEMPLATES: InspectionFormTemplate[] = [
  {
    formId: 'mau-01',
    formNumber: 'MẪU SỐ 01',
    title: 'Quyết định Ban hành Kế hoạch kiểm tra nội bộ & Kế hoạch kiểm tra nội bộ năm học',
    purpose: 'Căn cứ pháp lý cao nhất tại đơn vị, ban hành công khai Kế hoạch KTNB đầu năm học và danh mục các cuộc kiểm tra trong năm.',
    signAuthority: 'Hiệu trưởng ký tên và đóng dấu',
    issuedWith: 'Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 (Số: 48/KH-THCS&THPTĐBK)',
    sampleData: {
      title: 'QUYẾT ĐỊNH Về việc ban hành Kế hoạch kiểm tra nội bộ năm học 2026 - 2027',
      sections: [
        {
          heading: 'Điều 1. Ban hành Kế hoạch',
          content: 'Ban hành kèm theo Quyết định này Kế hoạch kiểm tra nội bộ năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều.',
        },
        {
          heading: 'Điều 2. Trách nhiệm thi hành',
          content: 'Các Phó Hiệu trưởng, Ban Kiểm tra nội bộ, các Tổ chuyên môn, bộ phận Văn phòng, cá nhân và tổ chức có liên quan chịu trách nhiệm thi hành Quyết định này.',
        },
        {
          heading: 'Nội dung Kế hoạch kiểm tra nội bộ (Kèm theo)',
          content: 'Bao gồm: I. Mục đích yêu cầu; II. Nội dung kiểm tra (4 nhóm trọng tâm); III. Tổ chức thực hiện; IV. Danh mục 14 cuộc kiểm tra chi tiết theo các tháng trong năm học.',
        },
      ],
    },
  },
  {
    formId: 'mau-02',
    formNumber: 'MẪU SỐ 02',
    title: 'Quyết định Thành lập Ban kiểm tra nội bộ năm học',
    purpose: 'Quyết định hành chính xác lập cơ cấu nhân sự Ban KTNB nhà trường, quyền hạn và phân công nhiệm vụ cụ thể.',
    signAuthority: 'Hiệu trưởng ký tên và đóng dấu',
    issuedWith: 'Danh sách 12 thành viên Ban Kiểm tra nội bộ Trường THCS và THPT Đốc Binh Kiều',
    sampleData: {
      title: 'QUYẾT ĐỊNH Về việc thành lập Ban kiểm tra nội bộ năm học 2026 - 2027',
      sections: [
        {
          heading: 'Điều 1. Thành lập Ban',
          content: 'Thành lập Ban kiểm tra nội bộ Trường THCS và THPT Đốc Binh Kiều năm học 2026 - 2027 gồm 12 ông (bà) có tên trong danh sách đính kèm, do ông Lê Thanh Cường - Hiệu trưởng làm Trưởng ban.',
        },
        {
          heading: 'Điều 2. Nhiệm vụ và quyền hạn',
          content: 'Ban Kiểm tra nội bộ có nhiệm vụ xây dựng kế hoạch tiến hành, tổ chức kiểm tra theo kế hoạch được phê duyệt hoặc đột xuất; lập biên bản, báo cáo kết quả và tham mưu xử lý sau kiểm tra.',
        },
        {
          heading: 'Điều 3. Hiệu lực thi hành',
          content: 'Quyết định này có hiệu lực kể từ ngày ký đến khi kết thúc năm học 2026 - 2027.',
        },
      ],
    },
  },
  {
    formId: 'mau-03',
    formNumber: 'MẪU SỐ 03',
    title: 'Kế hoạch tiến hành kiểm tra của Tổ (Đoàn) kiểm tra',
    purpose: 'Do Trưởng đoàn/Tổ trưởng kiểm tra lập cho từng cuộc kiểm tra cụ thể và trình Hiệu trưởng phê duyệt trước khi tiến hành.',
    signAuthority: 'T/M Tổ kiểm tra ký; Hiệu trưởng phê duyệt',
    issuedWith: 'Theo từng Quyết định kiểm tra chuyên đề hoặc định kỳ',
    sampleData: {
      title: 'KẾ HOẠCH TIẾN HÀNH KIỂM TRA (Mẫu số 03/HD1134)',
      sections: [
        {
          heading: 'I. Mục đích, yêu cầu',
          content: 'Xem xét thực tế việc thực hiện quy chế chuyên môn, hồ sơ sổ sách và các quy định ngành; tư vấn, hỗ trợ kịp thời để nâng cao chất lượng dạy học.',
        },
        {
          heading: 'II. Nội dung kiểm tra',
          content: '1. Nội dung kiểm tra: Hồ sơ bài dạy theo CV 5512, việc kiểm tra đánh giá thường xuyên, nền nếp lên lớp; 2. Đối tượng: 06 giáo viên thuộc 4 tổ bộ môn; 3. Thời kỳ: Từ đầu năm học đến thời điểm kiểm tra; 4. Thời hạn: 10 ngày làm việc.',
        },
        {
          heading: 'III. Tổ chức thực hiện',
          content: 'Phân công cụ thể thành viên dự giờ, thành viên kiểm tra hồ sơ bài dạy, thời gian thông báo trước cho đối tượng và lịch làm việc trực tiếp.',
        },
      ],
    },
  },
  {
    formId: 'mau-04',
    formNumber: 'MẪU SỐ 04',
    title: 'Biên bản kiểm tra',
    purpose: 'Ghi nhận trung thực toàn bộ diễn biến, kết quả xác minh minh chứng, ưu điểm, tồn tại, nguyên nhân và kiến nghị ngay tại hiện trường làm việc.',
    signAuthority: 'Người được kiểm tra, Tổ kiểm tra và Người ghi biên bản cùng ký xác nhận',
    issuedWith: 'Lập thành 02 bản có giá trị pháp lý như nhau (mỗi bên giữ 01 bản)',
    sampleData: {
      title: 'BIÊN BẢN KIỂM TRA (Mẫu số 04/HD1134)',
      sections: [
        {
          heading: 'I. Thành phần làm việc',
          content: '1. Tổ kiểm tra: Ghi rõ họ tên, chức danh; 2. Đối tượng được kiểm tra: Ghi rõ họ tên, bộ môn/lớp phụ trách; 3. Người chứng kiến (nếu có).',
        },
        {
          heading: 'II. Kết quả kiểm tra cụ thể',
          content: 'Ghi nhận chi tiết từng nội dung: Thực hiện chương trình dạy học, hồ sơ giáo án, dự giờ thực tế, việc sử dụng thiết bị dạy học.',
        },
        {
          heading: 'III. Đánh giá chung',
          content: '1. Ưu điểm: Nắm vững chuẩn kiến thức, ứng dụng công nghệ thông tin; 2. Tồn tại: Một số bài dạy chưa phân hóa đối tượng HS; 3. Nguyên nhân: Sĩ số đông tại các lớp THCS.',
        },
        {
          heading: 'IV. Kiến nghị của tổ kiểm tra & Ý kiến người được kiểm tra',
          content: 'Tổ kiểm tra đề nghị tiếp tục phát huy ưu điểm, khắc phục tồn tại trước ngày 15 tháng sau. Người được kiểm tra thống nhất với toàn bộ biên bản.',
        },
      ],
    },
  },
  {
    formId: 'mau-05',
    formNumber: 'MẪU SỐ 05',
    title: 'Báo cáo Kết quả kiểm tra',
    purpose: 'Tổ kiểm tra tổng hợp toàn bộ số liệu, kết quả xác minh, đánh giá mức độ hoàn thành nhiệm vụ và đề xuất hình thức xử lý/khen thưởng trình Hiệu trưởng.',
    signAuthority: 'T/M Tổ kiểm tra báo cáo ký',
    issuedWith: 'Gửi Hiệu trưởng nhà trường để ra Thông báo kết luận',
    sampleData: {
      title: 'BÁO CÁO Kết quả kiểm tra (Mẫu số 05/HD1134)',
      sections: [
        {
          heading: '1. Khái quát chung',
          content: 'Tình hình tổ chức, đội ngũ, số lượng giáo viên và điều kiện cơ sở vật chất của bộ phận được kiểm tra.',
        },
        {
          heading: '2. Kết quả kiểm tra, xác minh',
          content: 'Mô tả cụ thể việc chấp hành các quy định, số lượng tiết dạy đạt loại Giỏi/Khá, hồ sơ sổ sách đạt yêu cầu, các sai sót nếu có và mức độ ảnh hưởng.',
        },
        {
          heading: '3. Kết luận và biện pháp xử lý',
          content: 'Kết luận rõ ràng về kết quả đạt được, trách nhiệm của tập thể và cá nhân. Đề xuất Hiệu trưởng khen thưởng cá nhân tiêu biểu và nhắc nhở uốn nắn các hạn chế.',
        },
      ],
    },
  },
  {
    formId: 'mau-06',
    formNumber: 'MẪU SỐ 06',
    title: 'Thông báo Kết quả kiểm tra',
    purpose: 'Văn bản kết luận chính thức của Hiệu trưởng, gửi đến đối tượng kiểm tra để thực hiện, gửi Sở GDĐT để báo cáo và công khai trong toàn đơn vị.',
    signAuthority: 'Hiệu trưởng ký tên và đóng dấu',
    issuedWith: 'Lưu trữ hồ sơ văn thư và gửi đối tượng kiểm tra thực hiện',
    sampleData: {
      title: 'THÔNG BÁO Kết quả kiểm tra (Mẫu số 06/HD1134)',
      sections: [
        {
          heading: '1. Khái quát và kết quả kiểm tra',
          content: 'Thông báo toàn diện kết quả xác minh, khẳng định các ưu điểm đạt được và chỉ rõ những thiếu sót cần chấn chỉnh.',
        },
        {
          heading: '2. Kết luận của Hiệu trưởng',
          content: 'Kết luận rõ ràng trách nhiệm của bộ phận, tổ chuyên môn và cá nhân liên quan; chỉ đạo biện pháp xử lý theo thẩm quyền.',
        },
        {
          heading: '3. Kiến nghị và thời hạn khắc phục',
          content: 'Yêu cầu các cá nhân, bộ phận khắc phục dứt điểm các tồn tại trước ngày quy định; báo cáo kết quả khắc phục bằng văn bản về Ban Giám hiệu.',
        },
      ],
    },
  },
];

// 5. Checklist Hồ sơ lưu trữ của một cuộc kiểm tra theo Nghị định 30/2020/NĐ-CP & Thông tư 08/2025/TT-BGDĐT
export const INSPECTION_ARCHIVE_CHECKLIST = [
  { item: 'Quyết định thành lập và Quy chế hoạt động của Ban Kiểm tra nội bộ', required: true, note: 'Ban hành đầu năm học (Mẫu 02)' },
  { item: 'Kế hoạch kiểm tra nội bộ năm học kèm Quyết định ban hành', required: true, note: 'Ban hành trước 31/10 (Mẫu 01)' },
  { item: 'Quyết định kiểm tra của từng cuộc/chuyên đề', required: true, note: 'Hiệu trưởng ký trước khi tiến hành' },
  { item: 'Kế hoạch tiến hành kiểm tra được Hiệu trưởng phê duyệt', required: true, note: 'Mẫu số 03' },
  { item: 'Báo cáo tự kiểm tra, giải trình của đối tượng kiểm tra', required: true, note: 'Hồ sơ đối tượng nộp trước kiểm tra' },
  { item: 'Biên bản kiểm tra có đầy đủ chữ ký các bên', required: true, note: 'Mẫu số 04, tối thiểu 2 bản gốc' },
  { item: 'Tài liệu minh chứng thu nhận (phiếu dự giờ, bản sao sổ sách, ảnh chụp...)', required: true, note: 'Đóng kèm hồ sơ cuộc kiểm tra' },
  { item: 'Báo cáo kết quả kiểm tra của Tổ kiểm tra', required: true, note: 'Mẫu số 05' },
  { item: 'Thông báo kết quả kiểm tra của Hiệu trưởng', required: true, note: 'Mẫu số 06, đóng dấu đỏ' },
  { item: 'Báo cáo khắc phục tồn tại sau kiểm tra của đối tượng', required: false, note: 'Nộp sau thời hạn khắc phục nếu có hạn chế' },
];

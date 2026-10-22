/**
 * KẾ HOẠCH KIỂM TRA NỘI BỘ TOÀN DIỆN VÀ BÓC TÁCH CHI TIẾT
 * TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU - NĂM HỌC 2026 - 2027
 * 
 * Kết hợp hoàn chỉnh giữa:
 * - Kế hoạch số 76/KH-THPT ĐBK ngày 20/10/2025 (Trường THPT Đốc Binh Kiều cũ)
 * - Kế hoạch số 134/KH-THCS.TK ngày 05/09/2025 (Trường THCS Tân Kiều cũ)
 * - Hướng dẫn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT Đồng Tháp
 * - Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 của Sở GDĐT Đồng Tháp
 * - Danh sách 120 cán bộ, giáo viên, nhân viên chính thức từ tệp NHÂN SỰ MỚI.xlsx
 */

export interface DetailedInspectionPillar {
  id: string;
  orderNumber: number;
  domainName: string;
  sourceOrigin: string; // Kế thừa từ KH 76 / KH 134 / HD 1134
  targetsDetail: string[];
  inspectionForce: {
    lead: string;
    deputies: string[];
    members: string[];
  };
  formatsAndMetrics: {
    comprehensiveRate: string; // e.g. "70% giáo viên / 100% các tổ"
    thematicRate: string;      // e.g. "100% hồ sơ sổ sách"
    surpriseRate: string;      // e.g. "30% giáo viên đột xuất không báo trước"
    routineFrequency: string;  // e.g. "Hàng ngày đối với dạy 2 buổi/ngày"
    implementationTime: string;
  };
  breakdownSections: {
    heading: string;
    items: string[];
  }[];
  deliverableRecords: string[];
}

export interface MonthlyDetailedInspection {
  id: string;
  month: string; // e.g. "Tháng 09/2026"
  monthNumber: number;
  timeframe: string;
  title: string;
  category: 'Chuyên môn' | 'Nền nếp - Đoàn thể' | 'Tài chính - Cơ sở vật chất' | 'Hành chính - Quản trị' | 'Khảo thí - Kiểm định';
  campus: string;
  target: string;
  leadInspector: string;
  teamMembers: string[];
  specificTasks: string[];
  expectedOutput: string;
  legalBasis: string;
}

// A. ĐẶC ĐIỂM TÌNH HÌNH CỦA TRƯỜNG SAU SÁP NHẬP
export const SCHOOL_INSPECTION_BACKGROUND = {
  schoolName: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
  academicYear: '2026 - 2027',
  mergerDecision: 'Quyết định số 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp',
  planNumber: 'Số: 48/KH-THCS&THPTĐBK ngày 15 tháng 10 năm 2026',
  
  // 1. Quy mô trường lớp & học sinh
  studentScale: {
    totalClasses: 53,
    totalStudents: 2111,
    campusBreakdown: [
      {
        campusName: 'Điểm chính (Khối THPT Đốc Binh Kiều)',
        address: 'Ấp 1, xã Đốc Binh Kiều, huyện Tháp Mười, tỉnh Đồng Tháp',
        classesCount: 14,
        studentsCount: 529,
        grades: 'Khối 10, Khối 11, Khối 12',
        specialFeatures: 'Tập trung học sinh cấp THPT toàn xã và vùng lân cận; điểm tổ chức kỳ thi tốt nghiệp THPT và ôn thi đại học.'
      },
      {
        campusName: 'Điểm trường THCS Đốc Binh Kiều',
        address: 'Trung tâm xã Đốc Binh Kiều, huyện Tháp Mười',
        classesCount: 24,
        studentsCount: 980,
        grades: 'Khối 6, Khối 7, Khối 8, Khối 9 (từ lớp A1 đến A6)',
        specialFeatures: 'Quy mô học sinh THCS đông nhất; tập trung 20 học sinh khuyết tật học hòa nhập.'
      },
      {
        campusName: 'Điểm trường THCS Tân Kiều (cách 11km)',
        address: 'Ấp Tân Kiều, xã Tân Kiều cũ (nay sáp nhập), huyện Tháp Mười',
        classesCount: 15,
        studentsCount: 602,
        grades: 'Khối 6, Khối 7, Khối 8, Khối 9 (từ lớp A7 trở đi)',
        specialFeatures: 'Địa bàn cách xa điểm chính 11km; có 05 học sinh khuyết tật học hòa nhập; giáo viên bộ môn được phân công dạy liên điểm.'
      }
    ]
  },

  // 2. Đội ngũ cán bộ, giáo viên, nhân viên (Chuẩn 120 nhân sự từ NHÂN SỰ MỚI)
  staffScale: {
    totalStaff: 120,
    femaleCount: 63,
    maleCount: 57,
    partyMembersCount: 85, // Tỉ lệ 70.8%
    masterDegreeCount: 9,
    standardQualificationRate: '100% đạt chuẩn và trên chuẩn theo Luật Giáo dục 2019',
    itCertificateRate: '100% cán bộ, giáo viên đạt chuẩn CNTT cơ bản và nâng cao',
    foreignLanguageRate: '78.5% có chứng chỉ ngoại ngữ theo khung năng lực 6 bậc',
    departmentCounts: [
      { name: 'Ban Giám hiệu', count: 4, head: 'Lê Thanh Cường (HT)' },
      { name: 'Tổ Văn phòng', count: 14, head: 'Trần Văn Út (Tổ trưởng) - Nguyễn Văn Quân, Nguyễn Thị Thúy Huỳnh (Tổ phó)' },
      { name: 'Tổ Toán', count: 15, head: 'Nguyễn Văn Tới (Tổ trưởng) - Trần Quốc Huy, Nguyễn Thị Bích Lang (Tổ phó)' },
      { name: 'Tổ Ngữ văn - Thư viện - Thiết bị', count: 17, head: 'Tô Thị Lắm (Tổ trưởng) - Trương Văn Nghĩa, Huỳnh Thị Vân Nhi (Tổ phó)' },
      { name: 'Tổ Lịch sử - Địa lý - GDCD - GDKT&PL', count: 16, head: 'Lê Hồng Thúy (Tổ trưởng) - Trịnh Văn Sơn (Tổ phó)' },
      { name: 'Tổ Vật lý - Hóa học - Sinh học - Công nghệ', count: 26, head: 'Bùi Kim Huỳnh (Tổ trưởng) - Thái Văn Tiến, Phạm Biên Thùy, Nguyễn Thị Hiếu (Tổ phó)' },
      { name: 'Tổ Ngoại ngữ - Tin học', count: 16, head: 'Lê Thị Ngọc Tuyền (Tổ trưởng) - Nguyễn Trung Hiếu, Nguyễn Thị Mai Khanh (Tổ phó)' },
      { name: 'Tổ GDTC - GDQP-AN - Nghệ thuật', count: 12, head: 'Lê Văn Nguyên (Tổ trưởng) - Ngô Anh Tuấn (Đoàn trường)' }
    ]
  },

  // 3. Cơ sở vật chất tại 3 điểm trường
  facilityScale: {
    classroomsCount: 53,
    subjectRoomsCount: 22, // Gồm Lý, Hóa, Sinh, Tin học, Tiếng Anh, Đa năng, Mỹ thuật, Âm nhạc
    laboratoriesCount: 8,
    computerLabsCount: 5,  // Tổng 165 máy vi tính kết nối mạng cáp quang an toàn
    librariesCount: 3,     // 01 thư viện chuẩn xuất sắc tại Điểm chính, 02 thư viện tại 2 điểm THCS
    infirmariesCount: 3,   // 3 phòng y tế học đường có tủ thuốc sơ cấp cứu
    fireProtectionEquipment: '13 tủ chữa cháy vách tường, 03 máy bơm chữa cháy công suất lớn, 48 bình chữa cháy CO2 và bột MFZ4 định kỳ kiểm định áp suất',
    surveillanceCamerasCount: 38 // Hệ thống camera an ninh giám sát cổng trường, hành lang, phòng thi
  },

  // 4. Đánh giá Thuận lợi & Khó khăn
  strengths: [
    'Được sự quan tâm lãnh đạo sâu sát của Huyện ủy, UBND huyện Tháp Mười, Đảng ủy xã Đốc Binh Kiều và sự hướng dẫn nghiệp vụ thanh tra, kiểm tra thường xuyên của Thanh tra Sở GDĐT Đồng Tháp.',
    'Sau sáp nhập, quy mô trường liên cấp tạo nên sức mạnh tổng hợp: nguồn lực đội ngũ 120 CB-GV-NV dồi dào, khắc phục triệt để tình trạng thừa thiếu cục bộ giáo viên bộ môn; giáo viên THPT và THCS có điều kiện sinh hoạt chuyên môn liên thông, hỗ trợ phương pháp dạy học theo Chương trình GDPT 2018.',
    'Tập thể sư phạm có tinh thần đoàn kết, ý thức kỷ cương, trách nhiệm nghề nghiệp cao; 85 đảng viên phát huy tốt vai trò tiên phong gương mẫu.',
    'Cơ sở vật chất, phòng bộ môn, thiết bị dạy học được tích hợp từ 3 đơn vị đáp ứng tốt yêu cầu đổi mới phương pháp và ứng dụng công nghệ thông tin, ứng dụng AI trong giảng dạy.'
  ],
  challenges: [
    'Quy mô quản lý trải dài trên 3 điểm trường; Điểm trường THCS Tân Kiều cách điểm chính 11km gây khó khăn trong công tác kiểm tra trực tiếp hàng ngày và luân chuyển cơ sở vật chất, sách báo thư viện.',
    'Đội ngũ cán bộ tham gia Ban KTNB chủ yếu là kiêm nhiệm (vừa giảng dạy, vừa làm công tác chủ nhiệm hoặc quản lý tổ chuyên môn), quỹ thời gian dành cho các đợt kiểm tra chuyên sâu còn hạn hẹp.',
    'Đối tượng học sinh đa dạng từ lớp 6 đến lớp 12 với tâm sinh lý lứa tuổi khác nhau; trường có 25 học sinh khuyết tật học hòa nhập đòi hỏi quy trình kiểm tra đánh giá chuyên biệt, sát thực tế.'
  ]
};

// B. MỤC ĐÍCH VÀ YÊU CẦU CỦA CÔNG TÁC KIỂM TRA NỘI BỘ
export const SCHOOL_INSPECTION_OBJECTIVES = {
  purposes: [
    'Tự kiểm tra nội bộ là công cụ lãnh đạo, chỉ đạo then chốt của Hiệu trưởng nhằm đánh giá toàn diện, chính xác việc thực hiện các nhiệm vụ giáo dục, quy chế chuyên môn, chế độ tài chính và văn hóa công vụ tại cả 3 điểm trường.',
    'Kịp thời phát hiện những tồn tại, thiếu sót, sai lệch trong công tác quản lý của tổ chuyên môn, hoạt động sư phạm của giáo viên và nề nếp học tập của học sinh; từ đó tư vấn, hướng dẫn, thúc đẩy các bộ phận khắc phục, chấn chỉnh kịp thời, nâng cao kỷ cương trường học.',
    'Là căn cứ thực tiễn tin cậy để Hiệu trưởng và Hội đồng thi đua đánh giá, xếp loại viên chức cuối năm, xét thi đua, khen thưởng, bổ nhiệm, luân chuyển và quy hoạch cán bộ đúng năng lực, sở trường.',
    'Ngăn chặn, đẩy lùi các biểu hiện tiêu cực, bệnh thành tích trong thi cử; kiểm soát chặt chẽ việc dạy thêm, học thêm; quản lý minh bạch các nguồn thu, bảo vệ tài sản công và phòng chống tham nhũng, lãng phí.'
  ],
  requirements: [
    'Kiểm tra phải đảm bảo tính chính xác, khách quan, trung thực, công khai, dân chủ và đúng pháp luật; phản ánh đúng thực chất, tuyệt đối không làm qua loa, hình thức.',
    'Tiến hành kiểm tra đúng quy trình nghiệp vụ 3 bước theo Hướng dẫn số 1134/SGDĐT-TCCB: Ban hành Quyết định & Kế hoạch kiểm tra (Mẫu 03) -> Tiến hành kiểm tra thực tế, lập Biên bản (Mẫu 04) -> Báo cáo kết quả (Mẫu 05) và ban hành Thông báo kết luận (Mẫu 06).',
    'Kết hợp hài hòa giữa kiểm tra định kỳ theo kế hoạch với kiểm tra đột xuất; kiểm tra không gây gián đoạn hoặc cản trở hoạt động dạy học bình thường của thầy và trò.',
    'Mọi cuộc kiểm tra đều phải thiết lập hồ sơ đầy đủ, có chữ ký của đối tượng kiểm tra và bàn giao lưu trữ lâu dài tại Văn thư nhà trường theo Nghị định 30/2020/NĐ-CP và Thông tư số 08/2025/TT-BGDĐT.'
  ]
};

// C. MƯỜI MỘT (11) TRỤ CỘT KIỂM TRA NỘI BỘ BÓC TÁCH CHI TIẾT
export const DETAILED_INSPECTION_PILLARS_UNABRIDGED: DetailedInspectionPillar[] = [
  {
    id: 'pillar-01',
    orderNumber: 1,
    domainName: 'Kiểm tra hoạt động của 07 Tổ chuyên môn, bộ phận Thư viện, Thiết bị, Phòng thực hành, Vi tính và Ứng dụng AI',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.1), Kế hoạch 76/KH-THPTĐBK (Mục B.I) và Hướng dẫn 1134/SGDĐT-TCCB',
    targetsDetail: [
      '07 Tổ chuyên môn: Toán, Ngữ văn - TV - TB, KHTN - Công nghệ, Lịch sử - Địa lý - GDCD, Ngoại ngữ - Tin học, GDTC - QPAN - Nghệ thuật, Tổ Văn phòng.',
      'Bộ phận Thư viện: 03 viên chức/nhân viên (Bà Nguyễn Thị Xuyến tại THPT, Bà Trần Thị Ngọc Tý tại THCS ĐBK, Ông Hồ Văn Hữu tại THCS Tân Kiều).',
      'Bộ phận Thiết bị - Thực hành: 03 nhân viên (Bà Phạm Thị Lệ Huyên tại THPT, Bà Trần Hoàng Yến Ngọc tại THCS ĐBK, Ông Nguyễn Văn Chữ tại THCS Tân Kiều).',
      'Phòng máy vi tính: 05 phòng máy và các giáo viên phụ trách phòng Tin học (Thầy Nguyễn Trung Hiếu, Thầy Mai Phước Lộc, Cô Đỗ Thị Thu Thảo).'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (Hiệu trưởng) & Thầy Nguyễn Minh Trí (PHT Thường trực)',
      deputies: ['Cô Phan Thanh Thảo (PHT)', 'Thầy Nguyễn Thanh Tòng (PHT)'],
      members: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Hồng Thúy (TT KHXH)', 'Lê Thị Ngọc Tuyền (TT Ngoại ngữ)', 'Lê Văn Nguyên (TT GDTC)', 'Trần Văn Út (TT Văn phòng)']
    },
    formatsAndMetrics: {
      comprehensiveRate: '100% các tổ chuyên môn và bộ phận phục vụ được kiểm tra toàn diện 2 lần/năm (HK1 và HK2).',
      thematicRate: '100% hồ sơ quản lý tổ và sổ sách thư viện thiết bị được kiểm tra chuyên đề định kỳ hàng tháng.',
      surpriseRate: 'Tối thiểu 02 lần kiểm tra đột xuất việc sử dụng phòng bộ môn và quản lý thiết bị dạy học trong năm.',
      routineFrequency: 'Hàng tháng theo dõi tiến độ sinh hoạt chuyên môn định kỳ 2 tuần/lần.',
      implementationTime: 'Từ tháng 09/2026 đến hết tháng 05/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra công tác quản lý và sinh hoạt của Tổ chuyên môn',
        items: [
          'Kiểm tra việc xây dựng Kế hoạch dạy học của tổ chuyên môn (Mẫu phụ lục 1 kèm theo Công văn 5512/BGDĐT-GDTrH): Cấu trúc, nội dung, phân phối thời lượng theo chuẩn phát triển năng lực; tính thống nhất giữa 3 điểm trường.',
          'Kiểm tra kế hoạch tổ chức các hoạt động giáo dục (Mẫu phụ lục 2 CV 5512): Kế hoạch ngoại khóa, trải nghiệm, nghiên cứu khoa học kỹ thuật, giáo dục STEM/STEAM.',
          'Kiểm tra biên bản sinh hoạt tổ chuyên môn: Duy trì nghiêm túc định kỳ 2 tuần/lần; đổi mới nội dung sinh hoạt tổ tập trung vào "nghiên cứu bài học", tháo gỡ những bài học khó trong SGK mới CT GDPT 2018.',
          'Kiểm tra công tác quản lý hồ sơ của Tổ trưởng: Kế hoạch kiểm tra nội bộ của tổ đối với tổ viên; kế hoạch bồi dưỡng học sinh giỏi lớp 9, lớp 12 và phụ đạo học sinh có kết quả học tập chưa đạt.',
          'Kiểm tra ma trận, bảng đặc tả và ngân hàng câu hỏi đề kiểm tra giữa kỳ, cuối kỳ: Đảm bảo 4 mức độ nhận thức (Biết, Hiểu, Vận dụng, Vận dụng cao); barem điểm chi tiết đến 0,25đ.'
        ]
      },
      {
        heading: 'b) Kiểm tra hoạt động của Bộ phận Thư viện trường học',
        items: [
          'Kiểm tra hệ thống hồ sơ, sổ sách thư viện: Sổ đăng ký tổng quát, sổ đăng ký cá biệt, sổ đăng ký sách giáo khoa, sổ nhật ký bạn đọc theo Quyết định 01/2003/QĐ-BGDĐT.',
          'Kiểm tra phần mềm thư viện số: Tỷ lệ số hóa kho sách, mã vạch quản lý sách, thống kê lượt mượn đọc hàng tháng của giáo viên và học sinh tại cả 3 điểm trường.',
          'Kiểm tra công tác luân chuyển sách báo giữa Điểm chính THPT và 2 Điểm trường THCS (đặc biệt Điểm Tân Kiều cách 11km), bảo đảm học sinh vùng sâu có đủ sách đọc bổ trợ.',
          'Kiểm tra việc bảo quản, bảo dưỡng kho sách, phòng đọc giáo viên và học sinh; tổ chức Ngày hội đọc sách và phong tràu giới thiệu sách hay dưới cờ.'
        ]
      },
      {
        heading: 'c) Kiểm tra Bộ phận Thiết bị, Phòng thí nghiệm thực hành, Phòng máy vi tính và Ứng dụng AI',
        items: [
          'Kiểm tra sổ theo dõi mượn - trả thiết bị dạy học: Đối chiếu giữa số tiết thực hành trong phân phối chương trình môn KHTN, Vật lý, Hóa học, Sinh học, Công nghệ với số lượt mượn thiết bị thực tế của giáo viên.',
          'Kiểm tra an toàn phòng thí nghiệm: Quy trình bảo quản hóa chất độc hại, bình dập lửa tại chỗ, hệ thống bồn rửa khử độc, tủ hút khí độc và nội quy phòng thí nghiệm.',
          'Kiểm tra phòng máy vi tính: Tình trạng kỹ thuật của 165 máy tính tại 5 phòng máy; việc giáo viên Tin học cài đặt phần mềm học tập, an toàn an ninh mạng và nhật ký sử dụng phòng máy.',
          'Kiểm tra việc ứng dụng công nghệ trí tuệ nhân tạo (AI): Kiểm tra giáo viên khai thác công cụ AI hỗ trợ soạn giáo án, tạo hình ảnh minh họa, thiết kế bài giảng tương tác và kiểm tra đánh giá (kế thừa điểm sáng từ Kế hoạch 134/KH-THCSTK).'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản kiểm tra toàn diện Tổ chuyên môn (Mẫu 04/HD1134).',
      'Biên bản kiểm tra bộ phận Thư viện - Thiết bị và Phòng thực hành.',
      'Báo cáo kết quả kiểm tra chuyên môn học kỳ 1 và học kỳ 2.'
    ]
  },
  {
    id: 'pillar-02',
    orderNumber: 2,
    domainName: 'Kiểm tra việc thực hiện nhiệm vụ của giáo viên (Hoạt động sư phạm của nhà giáo)',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.2), Kế hoạch 76/KH-THPTĐBK (Mục B.II) và Thông tư 22/2021/TT-BGDĐT',
    targetsDetail: [
      'Toàn thể 102 giáo viên trực tiếp giảng dạy tại 53 lớp thuộc 3 điểm trường (khối 6, 7, 8, 9, 10, 11, 12).',
      'Giáo viên mới tiếp nhận sau sáp nhập, giáo viên giảng dạy liên điểm trường và giáo viên dạy các môn khối 9, khối 12.'
    ],
    inspectionForce: {
      lead: 'Thầy Nguyễn Minh Trí (PHT Thường trực - Phụ trách chuyên môn)',
      deputies: ['Cô Phan Thanh Thảo (PHT)', 'Thầy Nguyễn Thanh Tòng (PHT)'],
      members: ['Các Tổ trưởng, Tổ phó chuyên môn tương ứng', 'Giáo viên cốt cán môn học', 'Đại diện Ban Thanh tra nhân dân']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Kiểm tra toàn diện 70% tổng số giáo viên toàn trường trong năm học (tương đương 71 giáo viên: Đợt 1 kiểm tra 35 giáo viên vào tháng 11/2026; Đợt 2 kiểm tra 36 giáo viên vào tháng 03/2027).',
      thematicRate: 'Kiểm tra chuyên đề hồ sơ sổ sách giáo án: 100% giáo viên (kiểm tra định kỳ hàng tháng qua tổ chuyên môn và BGH kiểm tra xác suất).',
      surpriseRate: 'Kiểm tra đột xuất không báo trước (dự giờ lên lớp, kiểm tra giáo án tại chỗ): 30% tổng số giáo viên.',
      routineFrequency: 'Kiểm tra nền nếp lên lớp, giờ giấc, trang phục, tác phong sư phạm hàng tuần.',
      implementationTime: 'Xuyên suốt từ tháng 09/2026 đến tháng 05/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra phẩm chất chính trị, đạo đức, lối sống, ý thức tổ chức kỷ luật và văn hóa công vụ',
        items: [
          'Chấp hành chủ trương, đường lối của Đảng, chính sách pháp luật của Nhà nước và các chỉ đạo của ngành giáo dục.',
          'Ý thức chấp hành kỷ luật lao động, thực hiện nghiêm giờ giấc giảng dạy, không cắt xén chương trình, không bỏ giờ, không sử dụng điện thoại làm việc riêng trong giờ lên lớp.',
          'Đạo đức nhà giáo, chuẩn mực ứng xử với đồng nghiệp, học sinh và phụ huynh; thực hiện nghiêm quy tắc văn hóa công vụ, chống bạo lực học đường và xâm phạm nhân phẩm học sinh.',
          'Tinh thần tự học, tự bồi dưỡng nâng cao trình độ chuyên môn, tham gia đầy đủ các lớp tập huấn CT GDPT 2018.'
        ]
      },
      {
        heading: 'b) Kiểm tra việc thực hiện quy chế chuyên môn và hồ sơ sổ sách bài dạy',
        items: [
          'Hồ sơ giáo viên theo Điều lệ trường học: Kế hoạch giáo dục của giáo viên (Mẫu phụ lục 3 CV 5512); Kế hoạch bài dạy (giáo án - Mẫu phụ lục 4 CV 5512); sổ theo dõi và đánh giá học sinh; sổ ghi nhật ký giảng dạy.',
          'Chất lượng Kế hoạch bài dạy (giáo án): Xác định rõ mục tiêu bài học (năng lực, phẩm chất); thiết bị và học liệu; chuỗi hoạt động học (Mở đầu, Hình thành kiến thức, Luyện tập, Vận dụng); sản phẩm học tập dự kiến của học sinh.',
          'Kiểm tra việc sử dụng sách giáo khoa đã được UBND tỉnh Đồng Tháp phê duyệt trong giảng dạy; khai thác ngữ liệu, bài tập phù hợp đối tượng học sinh.',
          'Tích hợp dạy học nội dung giáo dục địa phương tỉnh Đồng Tháp, bảo vệ môi trường, an toàn giao thông và chuyển đổi số vào từng môn học.'
        ]
      },
      {
        heading: 'c) Kiểm tra hoạt động giảng dạy thông qua dự giờ và khảo sát chất lượng học sinh',
        items: [
          'Mỗi giáo viên được kiểm tra toàn diện phải được dự giờ từ 2 đến 3 tiết dạy (trong đó có ít nhất 1 tiết dự giờ đột xuất).',
          'Đánh giá tiết dạy theo định hướng phát triển năng lực người học: Mức độ học sinh tích cực, chủ động tham gia hoạt động học; sự tương tác giữa thầy - trò và trò - trò; hiệu quả sử dụng thiết bị dạy học và CNTT.',
          'Khảo sát nhanh mức độ tiếp thu bài của học sinh qua phiếu trắc nghiệm hoặc vấn đáp sau tiết dự giờ để đối chiếu hiệu quả thực tế.',
          'Nhận xét, rút kinh nghiệm trực tiếp với giáo viên ngay sau tiết dạy theo tinh thần tư vấn, xây dựng, giúp giáo viên tiến bộ.'
        ]
      },
      {
        heading: 'd) Kiểm tra công tác đánh giá học sinh và thực hiện phần mềm sổ điểm điện tử',
        items: [
          'Thực hiện đúng Thông tư số 22/2021/TT-BGDĐT: Đủ số lần kiểm tra đánh giá thường xuyên (ĐGTX) và định kỳ (ĐGĐK) theo quy định.',
          'Quy trình chấm bài: Chấm bài có nhận xét cụ thể, chỉ ra lỗi sai của học sinh; trả bài đúng thời hạn; sửa bài trên lớp chu đáo.',
          'Tiến độ nhập điểm vào hệ thống Cơ sở dữ liệu ngành: Cập nhật kịp thời, chính xác, không tùy tiện sửa điểm khi chưa có phê duyệt của Ban Giám hiệu.'
        ]
      }
    ],
    deliverableRecords: [
      'Phiếu đánh giá tiết dạy giáo viên (kèm chữ ký người dự và giáo viên).',
      'Biên bản kiểm tra hoạt động sư phạm nhà giáo.',
      'Bảng tổng hợp xếp loại giáo viên từng đợt kiểm tra.'
    ]
  },
  {
    id: 'pillar-03',
    orderNumber: 3,
    domainName: 'Kiểm tra nền nếp học tập, rèn luyện của học sinh và công tác Giáo viên chủ nhiệm',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.3) và Kế hoạch 76/KH-THPTĐBK (Mục B.III)',
    targetsDetail: [
      'Giáo viên chủ nhiệm của toàn bộ 53 lớp (14 lớp THPT, 24 lớp THCS ĐBK, 15 lớp THCS Tân Kiều).',
      'Tổ chức Đoàn Thanh niên Cộng sản Hồ Chí Minh (Đoàn trường) và Đội Thiếu niên Tiền phong Hồ Chí Minh (Liên đội).',
      'Lực lượng Bảo vệ trường học trực cổng tại 3 điểm trường (04 nhân viên: Nguyễn Ngọc Cường, Nguyễn Văn Thuấn, Huỳnh Quang Huy...).',
      'Tiểu ban Tư vấn tâm lý học sinh, Ban phòng chống bạo lực học đường và toàn bộ 2.111 học sinh.'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (HT) & Cô Phan Thanh Thảo (PHT)',
      deputies: ['Thầy Nguyễn Thanh Tòng (PHT)', 'Thầy Nguyễn Minh Trí (PHT)'],
      members: ['Ngô Anh Tuấn (Bí thư Đoàn trường)', 'Tổng phụ trách Đội', 'Trần Văn Út (Tổ trưởng Văn phòng)', 'Đại diện Ban đại diện CMHS trường']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Kiểm tra hoạt động Tổ chủ nhiệm: 03 lần/năm (Đầu năm, giữa năm, cuối năm).',
      thematicRate: 'Kiểm tra hồ sơ sổ sách lớp (Sổ chủ nhiệm, sổ đầu bài, học bạ điện tử): 03 lần/năm.',
      surpriseRate: 'Kiểm tra nền nếp học sinh và giám sát cổng trường của bảo vệ: Kiểm tra đột xuất hàng tuần.',
      routineFrequency: 'Theo dõi sĩ số chuyên cần học sinh hàng ngày trên phần mềm điểm danh.',
      implementationTime: 'Từ tháng 09/2026 đến tháng 05/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra việc xây dựng và thực thi các văn bản quy định nền nếp',
        items: [
          'Kiểm tra Nội quy nhà trường, Nội quy lớp học: Cấu trúc đủ 3 thành phần (Những điều không được làm; Những điều phải tích cực làm; Điều khoản thi hành).',
          'Văn bản hướng dẫn thi đua, khen thưởng học sinh và quy trình xử lý kỷ luật học sinh vi phạm theo Thông tư 32/2020/TT-BGDĐT.',
          'Quy định quy trình tiết sinh hoạt lớp hàng tuần và tiết sinh hoạt dưới cờ đầu tuần: Đổi mới sinh hoạt cờ theo chủ đề chủ điểm, lồng ghép giáo dục kỹ năng sống.'
        ]
      },
      {
        heading: 'b) Kiểm tra hoạt động của Giáo viên chủ nhiệm lớp',
        items: [
          'Kiểm tra Sổ chủ nhiệm: Kế hoạch chủ nhiệm năm, tháng, tuần; nắm chắc hoàn cảnh gia đình học sinh (đặc biệt học sinh có hoàn cảnh khó khăn, học sinh khuyết tật hòa nhập, học sinh cá biệt).',
          'Sổ đầu bài: Đảm bảo ghi chép đầy đủ tên bài dạy, tiết PPCT, nhận xét tiết học của GV bộ môn, chữ ký đầy đủ và không bị tẩy xóa.',
          'Công tác phối hợp với cha mẹ học sinh: Tổ chức họp CMHS đầu năm, giữa năm, cuối năm; liên lạc thông tin hai chiều qua nhóm Zalo lớp, sổ liên lạc điện tử; kịp thời thông báo khi học sinh nghỉ học không phép.'
        ]
      },
      {
        heading: 'c) Kiểm tra hoạt động của Đoàn Thanh niên, Liên đội và Phong trào học sinh',
        items: [
          'Kiểm tra kế hoạch hoạt động phong trào Đoàn - Đội: Tổ chức các hoạt động giáo dục truyền thống, văn nghệ, thể dục thể thao, an toàn giao thông, phòng chống ma túy và thuốc lá điện tử.',
          'Hoạt động của Đội Cờ đỏ, Đội Tự quản học sinh trong việc chấm điểm thi đua nề nếp giữa các lớp; tính khách quan, công bằng trong xếp loại tuần.',
          'Hoạt động của Ban tư vấn tâm lý học đường: Lập sổ nhật ký tư vấn, tiếp nhận và hỗ trợ các trường hợp học sinh gặp khó khăn tâm lý, khủng hoảng tuổi dậy thì, mâu thuẫn bạn bè.'
        ]
      },
      {
        heading: 'd) Kiểm tra trách nhiệm của lực lượng Bảo vệ trực cổng',
        items: [
          'Kiểm tra việc trực mở - đóng cổng trường đúng giờ quy định; không cho học sinh tự ý rời khỏi trường trong giờ học khi chưa có giấy phép của GVCN hoặc BGH.',
          'Kiểm tra việc kiểm soát khách đến liên hệ công tác: Sổ ghi chép thông tin khách vào trường, cấp phát thẻ khách, hướng dẫn vào phòng tiếp dân.',
          'Giám sát an toàn giao thông trước cổng trường giờ cao điểm tan học; phối hợp công an xã Đốc Binh Kiều giải tán tụ tập, buôn bán hàng rong trước cổng trường.'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản kiểm tra công tác chủ nhiệm và hồ sơ sổ đầu bài lớp.',
      'Bảng tổng hợp xếp loại nền nếp học sinh 53 lớp từng đợt.',
      'Báo cáo kiểm tra công tác đảm bảo an ninh trật tự, an toàn trường học.'
    ]
  },
  {
    id: 'pillar-04',
    orderNumber: 4,
    domainName: 'Kiểm tra việc dạy học 2 buổi/ngày; Quản lý dạy thêm, học thêm trong và ngoài nhà trường',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.4), Kế hoạch 76/KH-THPTĐBK (Mục B.IV), Thông tư 29/2024/TT-BGDĐT và Công văn 738/SGDĐT-TTr',
    targetsDetail: [
      'Toàn thể cán bộ, giáo viên tham gia dạy học 2 buổi/ngày tại cấp THCS và cấp THPT.',
      'Tất cả giáo viên có dạy thêm ngoài nhà trường hoặc dạy phụ đạo, bồi dưỡng tại trường.',
      'Ban Điều hành dạy học 2 buổi/ngày và Tổ kiểm tra dạy thêm học thêm của trường.'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
      deputies: ['Thầy Nguyễn Minh Trí (PHT)', 'Thầy Nguyễn Thanh Tòng (PHT)'],
      members: ['Ban Điều hành dạy 2 buổi/ngày', 'Các Tổ trưởng chuyên môn', 'Ban Thanh tra nhân dân', 'Đại diện Công đoàn trường']
    },
    formatsAndMetrics: {
      comprehensiveRate: '100% giáo viên tham gia dạy học 2 buổi/ngày được kiểm tra hồ sơ giáo án và sổ theo dõi.',
      thematicRate: 'Kiểm tra hồ sơ cam kết không dạy thêm trái quy định: 100% cán bộ, giáo viên toàn trường ký cam kết.',
      surpriseRate: 'Kiểm tra đột xuất việc chấp hành quy định dạy thêm tại các điểm ngoài nhà trường khi có tin báo hoặc phản ánh của phụ huynh.',
      routineFrequency: 'Kiểm tra thường xuyên hàng ngày tại trường về sĩ số lớp và thời khóa biểu buổi 2.',
      implementationTime: 'Học kỳ 1 (Tháng 9 đến tháng 12/2026); Học kỳ 2 (Tháng 01 đến tháng 05/2027).'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra việc thực hiện dạy học 2 buổi/ngày',
        items: [
          'Kiểm tra kế hoạch dạy học 2 buổi/ngày của nhà trường: Căn cứ pháp lý, mục tiêu giáo dục, phương án tổ chức, thời lượng các môn học bổ trợ, không gây quá tải cho học sinh.',
          'Kiểm tra việc tổ chức phụ đạo học sinh có kết quả học tập chưa đạt: Phân loại đúng đối tượng; tuyệt đối KHÔNG thu tiền phụ đạo đối với học sinh yếu kém.',
          'Kiểm tra công tác bồi dưỡng học sinh giỏi: Kế hoạch bồi dưỡng, nội dung chuyên đề nâng cao, việc tạo nguồn học sinh tham gia kỳ thi chọn HSG cấp huyện và tỉnh.',
          'Kiểm tra sổ gọi tên ghi điểm, giáo án buổi 2: Nội dung củng cố, rèn kỹ năng thực hành, tránh dạy trước chương trình buổi chính khóa.'
        ]
      },
      {
        heading: 'b) Kiểm tra công tác quản lý dạy thêm, học thêm theo Thông tư mới',
        items: [
          'Kiểm tra việc ký cam kết của 102 giáo viên: 100% giáo viên ký cam kết không tổ chức dạy thêm trái quy định, không ép buộc học sinh học thêm dưới bất kỳ hình thức nào.',
          'Kiểm tra đối với các lớp học thêm trong nhà trường (nếu có cấp phép): Đơn tự nguyện của cha mẹ học sinh; cơ sở vật chất đảm bảo ánh sáng, bàn ghế, vệ sinh; mức thu học phí theo đúng quy định của HĐND và UBND tỉnh Đồng Tháp.',
          'Kiểm tra việc chấp hành quy định đối với giáo viên tham gia dạy thêm ngoài nhà trường: Phải báo cáo bằng văn bản với Hiệu trưởng danh sách học sinh đang dạy thêm, không dạy thêm học sinh chính khóa của mình khi chưa có sự đồng ý của cấp thẩm quyền.'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản kiểm tra hoạt động dạy 2 buổi/ngày.',
      'Bản cam kết không dạy thêm trái quy định của 100% giáo viên.',
      'Báo cáo định kỳ công tác quản lý dạy thêm học thêm gửi Sở GDĐT.'
    ]
  },
  {
    id: 'pillar-05',
    orderNumber: 5,
    domainName: 'Kiểm tra hoạt động của Tổ Văn phòng, công tác Tài chính, Kế toán và Quản lý tài sản công',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.5), Kế hoạch 76/KH-THPTĐBK (Mục B.V), Thông tư 36/2017/TT-BGDĐT và Thông tư 61/2017/TT-BTC',
    targetsDetail: [
      'Tổ trưởng Tổ Văn phòng: Thầy Trần Văn Út.',
      'Bộ phận Tài chính - Kế toán: Thầy Nguyễn Văn Quân (Điểm THCS ĐBK), Cô Nguyễn Thị Thúy Huỳnh (Điểm THCS Tân Kiều).',
      'Bộ phận Thủ quỹ nhà trường.',
      'Bộ phận Văn thư - Lưu trữ: Cô Nguyễn Thị Kim Ngọc (THPT), Cô Huỳnh Thị Thu Ngoan (THCS ĐBK), Cô Nguyễn Thị Kim Kha (THCS Tân Kiều).',
      'Bộ phận Y tế học đường: Cô Minh Tho, Cô Trần Thị Bích Hạnh.',
      'Bộ phận Bảo vệ và Phục vụ tại cả 3 điểm trường.'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
      deputies: ['Thầy Nguyễn Minh Trí (PHT)', 'Cô Phan Thanh Thảo (PHT)', 'Thầy Nguyễn Thanh Tòng (PHT)'],
      members: ['Đại diện Cấp ủy Chi bộ', 'Ban Thanh tra nhân dân', 'Tổ trưởng các tổ chuyên môn', 'Kế toán kiểm tra chéo']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Kiểm tra toàn diện Tổ Văn phòng 2 lần/năm (Tháng 12/2026 và tháng 05/2027).',
      thematicRate: 'Kiểm tra chuyên đề tài chính - kế toán và các khoản thu hộ: 02 lần/năm (Đầu năm học và kết thúc năm tài chính).',
      surpriseRate: 'Kiểm tra đột xuất quỹ tiền mặt, chứng từ tiếp khách, xuất nhập kho tài sản.',
      routineFrequency: 'Hàng tháng đối chiếu số liệu báo cáo tài chính nội bộ.',
      implementationTime: 'Tháng 10/2026, Tháng 12/2026, Tháng 02/2027 và Tháng 05/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra công tác Tài chính, Kế toán và Quản lý ngân sách',
        items: [
          'Kiểm tra việc xây dựng Quy chế chi tiêu nội bộ năm học: Đảm bảo dân chủ, công khai, lấy ý kiến tập thể hội đồng sư phạm và được thông qua tại Hội nghị viên chức người lao động.',
          'Kiểm tra chứng từ thu chi ngân sách nhà nước cấp: Tính hợp lệ, hợp pháp của hóa đơn chứng từ; chi đúng mục đích, đúng định mức tiêu chuẩn; không để nợ đọng chứng từ.',
          'Kiểm tra các khoản thu hộ: Thu Bảo hiểm y tế học sinh (đạt chỉ tiêu 100% học sinh tham gia BHYT), bảo hiểm thân thể tự nguyện; nộp tiền kịp thời cho cơ quan BHXH huyện Tháp Mười, không để thất thoát.',
          'Kiểm tra công tác quản lý kinh phí hoạt động của Ban đại diện Cha mẹ học sinh theo đúng Thông tư số 55/2011/TT-BGDĐT: Nhà trường KHÔNG đứng ra thu, không quy định mức kinh phí bình quân, Ban đại diện tự quản lý và chi cho các hoạt động trực tiếp của học sinh.',
          'Kiểm tra việc thực hiện công khai minh bạch tài chính theo Thông tư 36/2017/TT-BGDĐT và Thông tư 61/2017/TT-BTC: Niêm yết công khai tại bảng tin 3 điểm trường và trên website trường.'
        ]
      },
      {
        heading: 'b) Kiểm tra công tác Hành chính, Văn thư và Quản lý hồ sơ cơ quan',
        items: [
          'Kiểm tra việc gửi nhận văn bản trên phần mềm iDesk của Sở GDĐT: Tiếp nhận, phân loại, chuyển giao văn bản đến đúng hạn; phát hành văn bản đi đúng thẩm quyền, đúng thể thức Nghị định 30/2020/NĐ-CP.',
          'Kiểm tra việc quản lý và sử dụng con dấu, chữ ký số chuyên dùng: Bảo mật an toàn con dấu của trường; chỉ đóng dấu văn bản khi đã có chữ ký chính thức của Hiệu trưởng hoặc người được ủy quyền.',
          'Kiểm tra hồ sơ lưu trữ cơ quan: Giấy tờ chứng nhận quyền sử dụng đất tại 3 điểm trường, hồ sơ thiết kế xây dựng, quyết định thành lập sáp nhập trường; hồ sơ cán bộ viên chức (120 túi hồ sơ theo quy định của Bộ Nội vụ).'
        ]
      },
      {
        heading: 'c) Kiểm tra công tác Y tế học đường và Vệ sinh môi trường',
        items: [
          'Kiểm tra danh mục thuốc sơ cấp cứu, dụng cụ y tế ban đầu tại 3 phòng y tế; hạn sử dụng của cơ số thuốc; sổ theo dõi khám sức khỏe ban đầu của học sinh.',
          'Kiểm tra công tác phòng chống dịch bệnh truyền nhiễm trong học đường (sốt xuất huyết, tay chân miệng, cúm mùa...).',
          'Kiểm tra nguồn nước uống tinh khiết cho học sinh, nước sinh hoạt và công tác vệ sinh hàng ngày của các khu nhà vệ sinh tại 3 điểm trường.'
        ]
      },
      {
        heading: 'd) Kiểm tra công tác Bảo vệ, Phòng cháy chữa cháy và Bảo quản tài sản công',
        items: [
          'Kiểm tra công tác quản lý tài sản công: Mở sổ theo dõi tài sản, máy móc, bàn ghế, ti vi, máy chiếu tại 53 lớp học; định kỳ kiểm kê tài sản cuối năm.',
          'Kiểm tra hệ thống PCCC: Biên bản nghiệm thu kiểm định của Cảnh sát PCCC; việc vận hành thử định kỳ 03 máy bơm chữa cháy; hạn nạp khí của 48 bình chữa cháy.',
          'Lịch trực bảo vệ ca đêm và ngày nghỉ lễ, tết: Đảm bảo quân số thường trực 24/24h, bảo vệ tuyệt đối an toàn trụ sở cơ quan và tài sản nhà nước.'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản kiểm tra công tác tài chính, kế toán và quy chế chi tiêu nội bộ.',
      'Biên bản kiểm tra công tác văn thư lưu trữ và quản lý con dấu.',
      'Biên bản kiểm tra an toàn PCCC, cơ sở vật chất và y tế học đường.'
    ]
  },
  {
    id: 'pillar-06',
    orderNumber: 6,
    domainName: 'Kiểm tra công tác quản lý của Thủ trưởng đơn vị (Hiệu trưởng và các Phó Hiệu trưởng)',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.6), Kế hoạch 76/KH-THPTĐBK (Mục B.VI) và Thông tư 11/2020/TT-BGDĐT',
    targetsDetail: [
      'Thầy Lê Thanh Cường - Hiệu trưởng (Người đứng đầu cơ quan).',
      'Thầy Nguyễn Minh Trí - Phó Hiệu trưởng (Phụ trách chuyên môn).',
      'Cô Phan Thanh Thảo - Phó Hiệu trưởng (Phụ trách Điểm THCS ĐBK).',
      'Thầy Nguyễn Thanh Tòng - Phó Hiệu trưởng (Phụ trách Điểm Tân Kiều).'
    ],
    inspectionForce: {
      lead: 'Đồng chí Bí thư Chi bộ & Trưởng Ban Thanh tra nhân dân',
      deputies: ['Chủ tịch Công đoàn cơ sở'],
      members: ['Thành viên Ban Kiểm tra nội bộ được phân công', 'Tổ trưởng các tổ chuyên môn', 'Đại diện giáo viên các điểm trường']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Kiểm tra toàn diện công tác quản lý: 02 lần/năm (Học kỳ 1 vào tháng 12/2026; Học kỳ 2 vào tháng 05/2027).',
      thematicRate: 'Giám sát việc thực hiện quy chế dân chủ cơ sở và giải quyết quyền lợi giáo viên: Thường xuyên.',
      surpriseRate: 'Kiểm tra khi có yêu cầu chỉ đạo của Sở GDĐT hoặc có kiến nghị của viên chức.',
      routineFrequency: 'Đánh giá công tác lãnh đạo tại các cuộc họp giao ban hàng tháng.',
      implementationTime: 'Tháng 12/2026 và Tháng 05/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra việc xây dựng và triển khai kế hoạch năm học',
        items: [
          'Kiểm tra tính pháp lý, tính khoa học của Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK: Cụ thể hóa kịp thời các nhiệm vụ năm học của Bộ GDĐT và Sở GDĐT Đồng Tháp.',
          'Kiểm tra kế hoạch phân công nhiệm vụ trong Ban Giám hiệu: Phân định rõ thẩm quyền, trách nhiệm của từng cá nhân đối với 3 điểm trường và các mảng công tác.',
          'Tiến độ triển khai và hiệu quả thực hiện các chỉ tiêu năm học: Tỷ lệ học sinh lên lớp, tỷ lệ học sinh khá giỏi, tỷ lệ thi đỗ tốt nghiệp THPT, chất lượng phổ cập GD THCS.'
        ]
      },
      {
        heading: 'b) Quản lý, thực hiện chế độ chính sách đối với đội ngũ và học sinh',
        items: [
          'Kiểm tra việc giải quyết chế độ nâng bậc lương thường xuyên, phụ cấp thâm niên, phụ cấp ưu đãi nghề cho 120 CB-GV-NV đúng thời hạn.',
          'Thực hiện chế độ chính sách miễn giảm học phí, hỗ trợ chi phí học tập cho học sinh diện chính sách, học sinh nghèo, học sinh khuyết tật hòa nhập theo Nghị định 81/2021/NĐ-CP.',
          'Thực hiện đánh giá chuẩn nghề nghiệp giáo viên cơ sở giáo dục phổ thông theo Thông tư 20/2018/TT-BGDĐT và chuẩn Hiệu trưởng theo Thông tư 14/2018/TT-BGDĐT.'
        ]
      },
      {
        heading: 'c) Thực hiện Quy chế dân chủ ở cơ sở và công tác kiểm định chất lượng',
        items: [
          'Kiểm tra việc thực hiện Thông tư số 11/2020/TT-BGDĐT và Luật Thực hiện dân chủ ở cơ sở năm 2022: Công khai những việc viên chức được biết, được bàn, được làm, được kiểm tra giám sát.',
          'Hoạt động phối hợp giữa Ban Giám hiệu với Ban Chấp hành Công đoàn và Ban Thanh tra nhân dân.',
          'Kế hoạch cải tiến chất lượng giáo dục và lộ trình xây dựng trường đạt chuẩn quốc gia sau sáp nhập.'
        ]
      }
    ],
    deliverableRecords: [
      'Báo cáo tự kiểm tra công tác quản lý của người đứng đầu đơn vị.',
      'Biên bản giám sát của Ban Thanh tra nhân dân về thực hiện quy chế dân chủ.',
      'Hồ sơ đánh giá, xếp loại viên chức năm học.'
    ]
  },
  {
    id: 'pillar-07',
    orderNumber: 7,
    domainName: 'Kiểm tra công tác Tiếp công dân, Giải quyết khiếu nại, Giải quyết tố cáo',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.7), Kế hoạch 76/KH-THPTĐBK (Mục B.VII) và Luật Tiếp công dân',
    targetsDetail: [
      'Hiệu trưởng - Người chịu trách nhiệm chính về tiếp công dân và giải quyết khiếu nại tố cáo.',
      'Cán bộ được phân công trực tiếp công dân thường xuyên (Tổ Văn phòng).',
      'Hòm thư góp ý đặt tại 3 điểm trường.'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
      deputies: ['Trưởng Ban Thanh tra nhân dân'],
      members: ['Chủ tịch Công đoàn cơ sở', 'Cán bộ pháp chế/văn thư']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Kiểm tra toàn diện công tác tiếp dân: 01 lần/năm (Tháng 04/2027).',
      thematicRate: 'Kiểm tra sổ theo dõi tiếp dân và hòm thư góp ý: Hàng tháng.',
      surpriseRate: 'Kiểm tra đột xuất ngay khi có phát sinh đơn thư khiếu nại, tố cáo hoặc phản ánh vượt cấp.',
      routineFrequency: 'Hiệu trưởng trực tiếp công dân định kỳ ít nhất 01 ngày trong 01 tháng và tiếp đột xuất khi có yêu cầu.',
      implementationTime: 'Thường xuyên trong năm; đợt cao điểm tháng 04/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra điều kiện và quy chế tiếp công dân',
        items: [
          'Kiểm tra Phòng tiếp công dân: Bố trí nơi tiếp dân thuận tiện, trang nghiêm, có bàn ghế, nước uống, sổ ghi chép, máy vi tính.',
          'Niêm yết công khai: Lịch tiếp công dân của Hiệu trưởng; Nội quy tiếp công dân; Quy trình giải quyết khiếu nại, tố cáo, kiến nghị, phản ánh.',
          'Phân công viên chức trực tiếp dân thường xuyên vào các ngày làm việc trong tuần.'
        ]
      },
      {
        heading: 'b) Kiểm tra sổ sách và quy trình xử lý đơn thư',
        items: [
          'Kiểm tra Sổ theo dõi tiếp công dân: Ghi chép đầy đủ họ tên, địa chỉ, nội dung kiến nghị, người tiếp nhận và kết quả xử lý.',
          'Kiểm tra quy trình xử lý đơn thư: Phân loại đơn thuộc thẩm quyền và không thuộc thẩm quyền; thụ lý giải quyết đúng thời hạn luật định, không để chậm trễ, kéo dài.',
          'Kiểm tra công tác mở hòm thư góp ý định kỳ hàng tuần (có biên bản mở hòm thư với sự tham gia của đại diện Cấp ủy, Công đoàn, TTND).'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản kiểm tra công tác tiếp công dân và xử lý đơn thư.',
      'Sổ theo dõi tiếp công dân có xác nhận của lãnh đạo đơn vị.'
    ]
  },
  {
    id: 'pillar-08',
    orderNumber: 8,
    domainName: 'Giám sát, kiểm tra công tác Phòng, chống tham nhũng, lãng phí và thực hành tiết kiệm',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.8), Kế hoạch 76/KH-THPTĐBK (Mục B.VIII) và Luật Phòng chống tham nhũng',
    targetsDetail: [
      'Ban Giám hiệu, Kế toán, Thủ quỹ, nhân viên mua sắm tài sản, thiết bị.',
      'Tất cả 120 cán bộ, giáo viên, nhân viên toàn trường.'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
      deputies: ['Bí thư Chi bộ', 'Trưởng Ban Thanh tra nhân dân'],
      members: ['Chủ tịch Công đoàn', 'Tổ trưởng các tổ chuyên môn']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Giám sát thường xuyên hàng tháng và báo cáo định kỳ 2 lần/năm.',
      thematicRate: 'Kiểm tra 100% việc kê khai minh bạch tài sản, thu nhập của các chức danh bắt buộc.',
      surpriseRate: 'Kiểm tra đột xuất ngay khi có dấu hiệu tiêu cực, lãng phí hoặc phản ánh của giáo viên, phụ huynh.',
      routineFrequency: 'Giám sát các khoản chi tiêu công hàng tháng.',
      implementationTime: 'Xuyên suốt năm học 2026 - 2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra việc xây dựng kế hoạch và kê khai tài sản',
        items: [
          'Kiểm tra Kế hoạch phòng chống tham nhũng, lãng phí năm học 2026 - 2027 của nhà trường.',
          'Kiểm tra hồ sơ kê khai tài sản, thu nhập của các đối tượng thuộc diện kê khai theo Nghị định 130/2020/NĐ-CP; việc công khai bản kê khai tại cơ quan.',
          'Kiểm tra việc tích hợp nội dung phòng chống tham nhũng vào môn học GDCD (cấp THCS) và môn GDKT&PL (cấp THPT) theo chỉ đạo của Bộ GDĐT.'
        ]
      },
      {
        heading: 'b) Kiểm tra thực hành tiết kiệm, chống lãng phí trong quản lý tài sản và tài chính',
        items: [
          'Kiểm tra việc quản lý, sử dụng điện, nước, văn phòng phẩm, cước viễn thông tại các phòng làm việc và lớp học.',
          'Kiểm tra quy trình mua sắm, sửa chữa tài sản công: Có dự toán, biên bản nghiệm thu, hóa đơn hợp pháp; chống lạm dụng mua sắm không cần thiết.',
          'Kiểm tra công tác quản lý các nguồn tài trợ, xã hội hóa giáo dục: Thu - chi minh bạch, không để xảy ra thất thoát, tư lợi cá nhân.'
        ]
      }
    ],
    deliverableRecords: [
      'Báo cáo sơ kết, tổng kết công tác phòng chống tham nhũng năm học.',
      'Biên bản kiểm tra công tác công khai tài sản và chi tiêu công.'
    ]
  },
  {
    id: 'pillar-09',
    orderNumber: 9,
    domainName: 'Kiểm tra việc thực hiện các Cuộc vận động và Phong trào thi đua của ngành',
    sourceOrigin: 'Bóc tách từ Kế hoạch 134/KH-THCS.TK (Mục III.9) và Kế hoạch giáo dục số 34/KH',
    targetsDetail: [
      'Toàn thể 120 cán bộ, giáo viên, nhân viên và 2.111 học sinh toàn trường.',
      'Các tổ chuyên môn, tổ chức Công đoàn, Đoàn Thanh niên, Đội Thiếu niên.'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
      deputies: ['Chủ tịch Công đoàn', 'Bí thư Đoàn trường'],
      members: ['Các Tổ trưởng chuyên môn', 'Ban Thi đua khen thưởng trường']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Đánh giá thi đua định kỳ theo các đợt cao điểm (20/11, 26/03, sơ kết HK1, tổng kết năm học).',
      thematicRate: '100% giáo viên đăng ký đề tài Sáng kiến kinh nghiệm (SKKN) hoặc đổi mới phương pháp được kiểm tra tiến độ.',
      surpriseRate: 'Kiểm tra thực tế các góc không gian xanh, lớp học hạnh phúc.',
      routineFrequency: 'Hàng tháng theo dõi điểm thi đua các tổ bộ môn.',
      implementationTime: 'Từ tháng 09/2026 đến tháng 05/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra thực hiện các cuộc vận động lớn',
        items: [
          'Thực hiện Kết luận số 01-KL/TW về tiếp tục học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh: Bản đăng ký tu dưỡng rèn luyện của từng cá nhân.',
          'Cuộc vận động "Mỗi thầy cô giáo là một tấm gương đạo đức, tự học và sáng tạo": Đánh giá qua tác phong, lối sống và nỗ lực nâng cao tay nghề.',
          'Phong trào xây dựng "Trường học thân thiện, học sinh tích cực", trường học hạnh phúc: Môi trường sư phạm xanh - sạch - đẹp - an toàn; không khí học đường dân chủ, gắn kết.'
        ]
      },
      {
        heading: 'b) Kiểm tra phong trào thi đua đổi mới sáng tạo và nghiên cứu khoa học',
        items: [
          'Kiểm tra phong trào tự làm thiết bị, đồ dùng dạy học tự làm phục vụ giảng dạy Chương trình GDPT 2018.',
          'Kiểm tra hồ sơ sáng kiến kinh nghiệm (SKKN): Tính mới, tính khả thi và hiệu quả áp dụng vào thực tiễn giảng dạy của đơn vị.',
          'Phong trào hướng dẫn học sinh nghiên cứu khoa học kỹ thuật cấp trường, chuẩn bị tham gia hội thi KHKT cấp tỉnh.'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản chấm và xét duyệt sáng kiến kinh nghiệm cấp trường.',
      'Bảng tổng hợp xếp loại thi đua các tổ và cá nhân năm học 2026 - 2027.'
    ]
  },
  {
    id: 'pillar-10',
    orderNumber: 10,
    domainName: 'Kiểm tra công tác quản lý, cấp phát và sử dụng Văn bằng, Chứng chỉ tốt nghiệp',
    sourceOrigin: 'Bóc tách kết hợp từ Kế hoạch 134/KH-THCS.TK (Mục III.10) và Kế hoạch 76/KH-THPTĐBK (Phụ lục tháng 6, 7)',
    targetsDetail: [
      'Cán bộ Văn thư phụ trách quản lý văn bằng, chứng chỉ (Cô Nguyễn Thị Kim Ngọc, Cô Huỳnh Thị Thu Ngoan, Cô Nguyễn Thị Kim Kha).',
      'Hồ sơ xét tốt nghiệp THCS và hồ sơ dự thi tốt nghiệp THPT qua các khóa.'
    ],
    inspectionForce: {
      lead: 'Thầy Nguyễn Minh Trí (PHT phụ trách chuyên môn)',
      deputies: ['Thầy Trần Văn Út (Tổ trưởng Văn phòng)'],
      members: ['Đại diện Ban Giám hiệu', 'Ban Thanh tra nhân dân']
    },
    formatsAndMetrics: {
      comprehensiveRate: 'Kiểm tra chuyên đề định kỳ 02 lần/năm (Tháng 12/2026 và Tháng 05/2027; kiểm tra hè vào tháng 07/2027).',
      thematicRate: '100% phôi bằng tiếp nhận từ Sở GDĐT phải được đối chiếu với danh sách học sinh đỗ tốt nghiệp.',
      surpriseRate: 'Kiểm tra đột xuất kho lưu trữ văn bằng chưa cấp phát.',
      routineFrequency: 'Cập nhật sổ cấp phát văn bằng mỗi khi có học sinh hoặc người được ủy quyền đến nhận bằng.',
      implementationTime: 'Tháng 12/2026, Tháng 05/2027 và Tháng 07/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra công tác quản lý phôi bằng và văn bằng tốt nghiệp',
        items: [
          'Kiểm tra việc tiếp nhận, quản lý phôi bằng tốt nghiệp THCS và bằng tốt nghiệp THPT từ Sở GDĐT Đồng Tháp: Có biên bản giao nhận, sổ nhập kho, bảo quản trong tủ khóa an toàn chống ẩm, chống cháy.',
          'Kiểm tra số lượng bằng tồn chưa phát của các khóa học trước: Thống kê danh sách cụ thể, nguyên nhân học sinh chưa nhận; công khai thông báo trên website trường để học sinh đến nhận bằng.'
        ]
      },
      {
        heading: 'b) Kiểm tra quy trình cấp phát bằng và lưu trữ hồ sơ vĩnh viễn',
        items: [
          'Kiểm tra Sổ cấp phát văn bằng: Ghi chép đầy đủ số hiệu bằng, số vào sổ cấp bằng, họ tên, ngày sinh, chữ ký người trực tiếp nhận bằng; giấy ủy quyền hợp pháp có công chứng nếu nhận thay.',
          'Tuyệt đối không thu bất kỳ khoản phí nào khi phát bằng tốt nghiệp cho học sinh.',
          'Kiểm tra hồ sơ lưu trữ gốc: Quyết định công nhận tốt nghiệp THCS, danh sách học sinh tốt nghiệp THPT, bảng ghi tên ghi điểm kỳ thi tốt nghiệp theo quy định lưu trữ vĩnh viễn.'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản kiểm tra công tác quản lý và cấp phát văn bằng tốt nghiệp.',
      'Sổ cấp phát văn bằng tốt nghiệp THCS và THPT có xác nhận kiểm kê định kỳ.'
    ]
  },
  {
    id: 'pillar-11',
    orderNumber: 11,
    domainName: 'Kiểm tra các nhiệm vụ trọng tâm đặc thù của năm học sáp nhập (Giáo dục hòa nhập, Ôn thi tốt nghiệp & Lớp 10, Điểm Tân Kiều 11km)',
    sourceOrigin: 'Bóc tách từ Kế hoạch 76/KH-THPTĐBK (Tháng 4, 5, 6, 7), Công văn số 3326/SGDĐT-GDTrH và Kế hoạch giáo dục số 34/KH',
    targetsDetail: [
      '25 học sinh khuyết tật học hòa nhập và các giáo viên trực tiếp giảng dạy (20 HS tại THCS ĐBK, 05 HS tại THCS Tân Kiều).',
      'Công tác dạy ôn thi tốt nghiệp THPT năm 2027 cho học sinh Khối 12 tại Điểm chính.',
      'Công tác dạy ôn thi tuyển sinh vào lớp 10 cho học sinh Khối 9 tại 2 Điểm trường THCS.',
      'Cơ sở vật chất, luân chuyển giáo viên dạy liên điểm tại Điểm Tân Kiều cách 11km.'
    ],
    inspectionForce: {
      lead: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
      deputies: ['Thầy Nguyễn Minh Trí (PHT)', 'Cô Phan Thanh Thảo (PHT)', 'Thầy Nguyễn Thanh Tòng (PHT)'],
      members: ['Tổ trưởng các tổ chuyên môn', 'Tổ tư vấn tâm lý học đường', 'Cán bộ quản trị phần mềm CSDL']
    },
    formatsAndMetrics: {
      comprehensiveRate: '100% học sinh khuyết tật có Kế hoạch giáo dục cá nhân và được kiểm tra chuyên đề hồ sơ.',
      thematicRate: '100% các lớp ôn thi Khối 9 và Khối 12 được kiểm tra kế hoạch ôn tập và chất lượng khảo sát thử.',
      surpriseRate: 'Kiểm tra đột xuất nền nếp giảng dạy của giáo viên luân chuyển tại Điểm trường Tân Kiều cách 11km.',
      routineFrequency: 'Theo dõi hàng tuần tiến độ ôn thi tốt nghiệp và dữ liệu số hóa học bạ số.',
      implementationTime: 'Xuyên suốt năm học; cao điểm tháng 11/2026, tháng 3/2027, tháng 4/2027, tháng 6-7/2027.'
    },
    breakdownSections: [
      {
        heading: 'a) Kiểm tra thực hiện Công văn số 3326 về Giáo dục hòa nhập học sinh khuyết tật',
        items: [
          'Kiểm tra hồ sơ Kế hoạch giáo dục cá nhân (KHGDCN) cho từng học sinh khuyết tật: Có xác nhận của Hội đồng đánh giá, chữ ký của cha mẹ học sinh và các giáo viên bộ môn.',
          'Kiểm tra việc điều chỉnh mục tiêu bài học, phân loại mức độ khuyết tật để giảm tải nội dung phù hợp năng lực học sinh.',
          'Kiểm tra đề kiểm tra định kỳ và đánh giá xếp loại học sinh hòa nhập: Ra đề kiểm tra riêng hoặc điều chỉnh mức độ yêu cầu; ghi nhận sự tiến bộ theo quy định tại Thông tư 22.'
        ]
      },
      {
        heading: 'b) Kiểm tra công tác Ôn tập thi tốt nghiệp THPT (Khối 12) và Tuyển sinh lớp 10 (Khối 9)',
        items: [
          'Kiểm tra Kế hoạch ôn tập thi tốt nghiệp THPT của các tổ chuyên môn: Ngân hàng câu hỏi, bám sát cấu trúc đề thi mẫu của Bộ GDĐT theo CT GDPT 2018.',
          'Kiểm tra công tác phân nhóm học sinh theo học lực để tổ chức dạy bổ trợ; phụ đạo miễn phí cho học sinh có nguy cơ trượt tốt nghiệp.',
          'Kiểm tra các kỳ khảo sát thi thử: Quy trình coi, chấm thi nghiêm túc, phân tích ma trận phổ điểm để kịp thời điều chỉnh phương pháp dạy học.',
          'Kiểm tra việc thu nhận và kiểm tra chéo hồ sơ đăng ký dự thi (ĐKDT) tốt nghiệp THPT của học sinh lớp 12, đảm bảo 100% không có sai sót về mã định danh, hộ khẩu, chế độ ưu tiên.'
        ]
      },
      {
        heading: 'c) Kiểm tra điều kiện dạy học và quản lý tại Điểm trường Tân Kiều (cách 11km)',
        items: [
          'Kiểm tra việc thực hiện thời khóa biểu của giáo viên được điều động luân chuyển dạy liên điểm giữa Điểm chính và Điểm Tân Kiều; đảm bảo quyền lợi phụ cấp công tác.',
          'Kiểm tra việc vận hành phòng học bộ môn, máy vi tính và thiết bị dạy học tại cơ sở Tân Kiều, không để phòng học bỏ trống gây lãng phí.',
          'Kiểm tra công tác an toàn trường học, bảo quản tài sản công sau giờ học tại điểm trường phụ.'
        ]
      },
      {
        heading: 'd) Kiểm tra Vận hành Cơ sở dữ liệu ngành "Đúng - Đủ - Sạch - Sống"',
        items: [
          'Kiểm tra việc cập nhật 100% mã định danh cá nhân của 2.111 học sinh trên hệ thống CSDL ngành của Bộ GDĐT.',
          'Kiểm tra số hóa học bạ điện tử, việc sử dụng chữ ký số cá nhân của 102 giáo viên bộ môn và Ban Giám hiệu.',
          'Đảm bảo an toàn thông tin, bảo mật mật khẩu hệ thống phần mềm quản lý trường học.'
        ]
      }
    ],
    deliverableRecords: [
      'Biên bản kiểm tra công tác giáo dục hòa nhập học sinh khuyết tật.',
      'Biên bản kiểm tra công tác ôn tập thi tốt nghiệp THPT và hồ sơ ĐKDT.',
      'Biên bản kiểm tra điều kiện dạy học tại Điểm trường Tân Kiều.'
    ]
  }
];

// D. BẢNG PHỤ LỤC LỊCH KIỂM TRA NỘI BỘ 12 THÁNG BÓC TÁCH CHI TIẾT (TỪ THÁNG 9 ĐẾN THÁNG 8)
export const MONTHLY_INSPECTION_SCHEDULE_FULL_YEAR: MonthlyDetailedInspection[] = [
  // THÁNG 09/2026
  {
    id: 'insp-m09-01',
    month: 'Tháng 09/2026',
    monthNumber: 9,
    timeframe: '05/09/2026 - 15/09/2026',
    title: 'Kiểm tra công tác huy động học sinh ra lớp, sĩ số đầu năm và sắp xếp lớp học sau sáp nhập',
    category: 'Hành chính - Quản trị',
    campus: 'Cả 3 điểm trường',
    target: 'Tổ trưởng Văn phòng, GVCN 53 lớp, Ban tuyển sinh',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Trần Văn Út (TT Văn phòng)'],
    specificTasks: [
      'Kiểm tra danh sách học sinh ra lớp so với kế hoạch huy động (53 lớp, 2.111 HS).',
      'Kiểm tra việc tiếp nhận học sinh chuyển trường, phân lớp học sinh khối 6 và khối 10.',
      'Kiểm tra việc bố trí phòng học tại cả 3 điểm trường.'
    ],
    expectedOutput: 'Báo cáo thống kê số liệu đầu năm học nộp Sở GDĐT; danh sách học sinh chính thức 53 lớp.',
    legalBasis: 'Kế hoạch năm học số 34/KH-THCS&THPTĐBK'
  },
  {
    id: 'insp-m09-02',
    month: 'Tháng 09/2026',
    monthNumber: 9,
    timeframe: '18/09/2026 - 28/09/2026',
    title: 'Kiểm tra việc chuẩn bị cơ sở vật chất, sách giáo khoa, thiết bị dạy học phục vụ năm học mới',
    category: 'Tài chính - Cơ sở vật chất',
    campus: 'Cả 3 điểm trường',
    target: 'Nhân viên thiết bị, nhân viên thư viện, nhân viên bảo vệ tại 3 điểm trường',
    leadInspector: 'Cô Phan Thanh Thảo (PHT) & Thầy Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Phạm Thị Lệ Huyên (TB THPT)', 'Nguyễn Thị Xuyến (TV THPT)', 'Nguyễn Văn Chữ (TB THCS TK)', 'Hồ Văn Hữu (TV THCS TK)', 'Huỳnh Quang Huy (Bảo vệ)'],
    specificTasks: [
      'Kiểm tra việc cung ứng sách giáo khoa CT GDPT 2018 cho học sinh, không để học sinh thiếu sách.',
      'Kiểm tra thiết bị dạy học tối thiểu lớp 6-9 và lớp 10-12; vệ sinh phòng thí nghiệm, phòng máy vi tính.',
      'Kiểm tra hệ thống điện nước, ánh sáng và vệ sinh tại 53 phòng học.'
    ],
    expectedOutput: 'Biên bản kiểm tra điều kiện cơ sở vật chất đầu năm học; phương án sửa chữa tài sản hư hỏng.',
    legalBasis: 'Công văn hướng dẫn CSVC Sở GDĐT'
  },

  // THÁNG 10/2026
  {
    id: 'insp-m10-01',
    month: 'Tháng 10/2026',
    monthNumber: 10,
    timeframe: '05/10/2026 - 15/10/2026',
    title: 'Kiểm tra việc xây dựng Kế hoạch dạy học theo CV 5512 của 07 Tổ chuyên môn',
    category: 'Chuyên môn',
    campus: 'Cả 3 điểm trường',
    target: '07 Tổ chuyên môn (Toán, Văn, KHTN, KHXH, Ngoại ngữ-Tin, GDTC, Văn phòng)',
    leadInspector: 'Thầy Nguyễn Minh Trí (PHT phụ trách chuyên môn)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Hồng Thúy (TT KHXH)', 'Lê Thị Ngọc Tuyền (TT Ngoại ngữ)', 'Lê Văn Nguyên (TT GDTC)'],
    specificTasks: [
      'Kiểm tra tính pháp lý và khoa học của Kế hoạch dạy học (Phụ lục 1 CV 5512).',
      'Kiểm tra kế hoạch hoạt động giáo dục, trải nghiệm, nghiên cứu KHKT (Phụ lục 2).',
      'Kiểm tra việc phân công chuyên môn giáo viên đảm bảo đủ định mức, công bằng, đúng năng lực.'
    ],
    expectedOutput: 'Quyết định phê duyệt Kế hoạch giáo dục 07 Tổ chuyên môn năm học 2026 - 2027.',
    legalBasis: 'Công văn 5512/BGDĐT-GDTrH và HD 1134/SGDĐT'
  },
  {
    id: 'insp-m10-02',
    month: 'Tháng 10/2026',
    monthNumber: 10,
    timeframe: '15/10/2026 - 25/10/2026',
    title: 'Kiểm tra nền nếp học tập, kỷ cương học đường và hoạt động của Ban quản lý nề nếp học sinh',
    category: 'Nền nếp - Đoàn thể',
    campus: 'Cả 3 điểm trường',
    target: 'GVCN 53 lớp, Đoàn Thanh niên, Tổng phụ trách Đội, Đội cờ đỏ, Nhân viên bảo vệ',
    leadInspector: 'Thầy Lê Thanh Cường (HT) & Cô Phan Thanh Thảo (PHT)',
    teamMembers: ['Ngô Anh Tuấn (Bí thư Đoàn trường)', 'Trần Văn Út (TT Văn phòng)', 'Nguyễn Ngọc Cường (Bảo vệ)', 'Đại diện Ban đại diện CMHS'],
    specificTasks: [
      'Kiểm tra việc triển khai Nội quy trường lớp (3 thành phần) đến 2.111 học sinh.',
      'Kiểm tra sĩ số chuyên cần, trang phục, tác phong học sinh khi vào cổng trường.',
      'Kiểm tra hoạt động chấm thi đua nền nếp của Đội cờ đỏ và sổ theo dõi của bảo vệ.'
    ],
    expectedOutput: 'Biên bản kiểm tra nề nếp học sinh; danh sách nhắc nhở học sinh vi phạm an toàn giao thông.',
    legalBasis: 'Điều lệ trường phổ thông Thông tư 32/2020/TT-BGDĐT'
  },
  {
    id: 'insp-m10-03',
    month: 'Tháng 10/2026',
    monthNumber: 10,
    timeframe: '20/10/2026 - 30/10/2026',
    title: 'Kiểm tra công tác quản lý tài chính, thu hộ - chi hộ đầu năm học và kinh phí Ban đại diện CMHS',
    category: 'Tài chính - Cơ sở vật chất',
    campus: 'Điểm chính (THPT) & 2 Điểm THCS',
    target: 'Bộ phận Tài chính - Kế toán, Thủ quỹ, Ban đại diện CMHS trường',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
    teamMembers: ['Trần Văn Út (Tổ trưởng VP)', 'Nguyễn Văn Quân (Kế toán THCS ĐBK)', 'Nguyễn Thị Thúy Huỳnh (Kế toán THCS TK)', 'Ban Thanh tra nhân dân'],
    specificTasks: [
      'Kiểm tra sổ sách, biên lai thu tiền BHYT học sinh; việc nộp về cơ quan BHXH.',
      'Kiểm tra công tác thu kinh phí hoạt động Ban đại diện CMHS theo đúng Thông tư 55/2011.',
      'Kiểm tra việc niêm yết công khai các khoản thu đầu năm học theo Thông tư 36/2017/TT-BGDĐT.'
    ],
    expectedOutput: 'Biên bản kiểm tra công tác tài chính đầu năm học; không để xảy ra lạm thu.',
    legalBasis: 'Thông tư 55/2011/TT-BGDĐT và Thông tư 36/2017/TT-BGDĐT'
  },

  // THÁNG 11/2026
  {
    id: 'insp-m11-01',
    month: 'Tháng 11/2026',
    monthNumber: 11,
    timeframe: '02/11/2026 - 10/11/2026',
    title: 'Kiểm tra chuyên đề điều kiện dạy học và quản lý CSVC tại Điểm trường Tân Kiều (cách 11km)',
    category: 'Hành chính - Quản trị',
    campus: 'Điểm Tân Kiều (THCS)',
    target: 'Cán bộ quản lý, giáo viên bộ môn và các lớp THCS tại Điểm Tân Kiều (Khối 6-9, từ lớp A7)',
    leadInspector: 'Thầy Nguyễn Thanh Tòng (PHT phụ trách Điểm Tân Kiều)',
    teamMembers: ['Trần Quốc Huy (Tổ phó Toán)', 'Huỳnh Thị Vân Nhi (Tổ phó Văn)', 'Thái Văn Tiến (Tổ phó KHTN)', 'Phạm Thị Mỹ Châu (Tổ phó KHXH)'],
    specificTasks: [
      'Kiểm tra điều kiện thực tế của 15 phòng học, 02 phòng bộ môn và 01 phòng máy vi tính tại Tân Kiều.',
      'Kiểm tra việc thực hiện thời khóa biểu của giáo viên được phân công dạy liên điểm.',
      'Kiểm tra công tác bảo quản tài sản, thiết bị và vệ sinh môi trường học đường.'
    ],
    expectedOutput: 'Biên bản kiểm tra chuyên đề Điểm trường Tân Kiều; đề xuất hỗ trợ kinh phí sửa chữa nhỏ.',
    legalBasis: 'Kế hoạch quản lý sáp nhập trường liên cấp'
  },
  {
    id: 'insp-m11-02',
    month: 'Tháng 11/2026',
    monthNumber: 11,
    timeframe: '10/11/2026 - 25/11/2026',
    title: 'Kiểm tra toàn diện hoạt động sư phạm nhà giáo (Đợt 1: 35 giáo viên cấp THCS và THPT)',
    category: 'Chuyên môn',
    campus: 'Cả 3 điểm trường',
    target: '35 giáo viên thuộc các tổ Toán, Ngữ văn, KHTN, Ngoại ngữ-Tin học, KHXH, GDTC',
    leadInspector: 'Thầy Nguyễn Minh Trí (PHT Thường trực)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Hồng Thúy (TT KHXH)', 'Lê Thị Ngọc Tuyền (TT Ngoại ngữ)', 'Lê Văn Nguyên (TT GDTC)'],
    specificTasks: [
      'Dự giờ đánh giá từ 2-3 tiết dạy đối với từng giáo viên (kết hợp báo trước và đột xuất).',
      'Kiểm tra toàn bộ hồ sơ bài dạy (CV 5512), kế hoạch bồi dưỡng cá nhân.',
      'Kiểm tra việc chấm bài, nhận xét và vào điểm phần mềm CSDL ngành.'
    ],
    expectedOutput: '35 Biên bản kiểm tra hoạt động sư phạm giáo viên; tổng hợp kết quả xếp loại chuyên môn.',
    legalBasis: 'Thông tư 22/2021/TT-BGDĐT và Điều lệ trường phổ thông'
  },
  {
    id: 'insp-m11-03',
    month: 'Tháng 11/2026',
    monthNumber: 11,
    timeframe: '20/11/2026 - 30/11/2026',
    title: 'Kiểm tra hoạt động của Tổ chủ nhiệm lớp và sổ sách chủ nhiệm 53 lớp',
    category: 'Nền nếp - Đoàn thể',
    campus: 'Cả 3 điểm trường',
    target: 'Giáo viên chủ nhiệm 53 lớp tại 3 điểm trường',
    leadInspector: 'Cô Phan Thanh Thảo (PHT)',
    teamMembers: ['Ngô Anh Tuấn (Bí thư Đoàn)', 'Trần Văn Út (TT Văn phòng)', 'Các Tổ phó chuyên môn phụ trách điểm'],
    specificTasks: [
      'Kiểm tra Sổ chủ nhiệm lớp: Kế hoạch tuần, tháng, biện pháp quản lý học sinh cá biệt.',
      'Kiểm tra Sổ đầu bài: Đầy đủ chữ ký giáo viên bộ môn, nhận xét tiết học nghiêm túc.',
      'Kiểm tra hồ sơ học sinh khuyết tật hòa nhập (kế hoạch giáo dục cá nhân).'
    ],
    expectedOutput: 'Biên bản kiểm tra công tác chủ nhiệm lớp học kỳ 1.',
    legalBasis: 'Điều lệ trường phổ thông TT 32/2020'
  },

  // THÁNG 12/2026
  {
    id: 'insp-m12-01',
    month: 'Tháng 12/2026',
    monthNumber: 12,
    timeframe: '01/12/2026 - 10/12/2026',
    title: 'Kiểm tra hoạt động Thư viện, Thiết bị, Phòng thực hành thí nghiệm và Phòng máy vi tính',
    category: 'Tài chính - Cơ sở vật chất',
    campus: 'Cả 3 điểm trường',
    target: '03 viên chức Thư viện, 03 nhân viên Thiết bị, giáo viên quản lý phòng máy Tin học',
    leadInspector: 'Cô Phan Thanh Thảo (PHT) & Thầy Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Nguyễn Thị Xuyến (TV)', 'Phạm Thị Lệ Huyên (TB)', 'Nguyễn Văn Chữ (TB)', 'Hồ Văn Hữu (TV)', 'Nguyễn Trung Hiếu (Tổ phó Tin học)'],
    specificTasks: [
      'Kiểm tra sổ theo dõi mượn trả thiết bị thí nghiệm của giáo viên các môn KHTN, Lý, Hóa, Sinh.',
      'Kiểm tra việc sử dụng phần mềm thư viện số và luân chuyển sách giữa 3 điểm trường.',
      'Kiểm tra an toàn hóa chất thí nghiệm và tình trạng hoạt động của 165 máy vi tính.'
    ],
    expectedOutput: 'Biên bản kiểm tra hoạt động thư viện - thiết bị học kỳ 1; kiến nghị bảo trì máy tính.',
    legalBasis: 'Quyết định 01/2003/QĐ-BGDĐT và quy chuẩn phòng bộ môn'
  },
  {
    id: 'insp-m12-02',
    month: 'Tháng 12/2026',
    monthNumber: 12,
    timeframe: '15/12/2026 - 30/12/2026',
    title: 'Kiểm tra công tác tổ chức kiểm tra, đánh giá cuối học kỳ I năm học 2026 - 2027',
    category: 'Khảo thí - Kiểm định',
    campus: 'Cả 3 điểm trường',
    target: 'Tổ ra đề in sao đề thi, Ban coi thi, Ban chấm thi và các Tổ chuyên môn toàn trường',
    leadInspector: 'Thầy Nguyễn Minh Trí (PHT Thường trực)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Hồng Thúy (TT KHXH)', 'Lê Thị Ngọc Tuyền (TT Ngoại ngữ)', 'Nguyễn Thị Kim Ngọc (Thư ký)'],
    specificTasks: [
      'Kiểm tra quy trình bảo mật in sao đề thi cuối kỳ I theo quy chế.',
      'Kiểm tra việc thực hiện nhiệm vụ của giám thị coi thi tại 53 phòng thi.',
      'Kiểm tra việc chấm thi, chấm chung ít nhất 5% số bài; tiến độ nhập điểm vào CSDL ngành.'
    ],
    expectedOutput: 'Biên bản thanh tra kỳ kiểm tra cuối kỳ I; Báo cáo chất lượng giáo dục học kỳ I.',
    legalBasis: 'Thông tư 22/2021/TT-BGDĐT'
  },
  {
    id: 'insp-m12-03',
    month: 'Tháng 12/2026',
    monthNumber: 12,
    timeframe: '20/12/2026 - 31/12/2026',
    title: 'Kiểm tra công tác quản lý tài chính, khóa sổ kế toán năm tài chính 2026 và quyết toán ngân sách',
    category: 'Tài chính - Cơ sở vật chất',
    campus: 'Điểm chính (THPT)',
    target: 'Tổ Văn phòng, bộ phận Kế toán (Trần Văn Út, Nguyễn Văn Quân, Nguyễn Thị Thúy Huỳnh), Thủ quỹ',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
    teamMembers: ['Đại diện Cấp ủy Chi bộ', 'Trưởng Ban Thanh tra nhân dân', 'Chủ tịch Công đoàn'],
    specificTasks: [
      'Kiểm tra sổ sách kế toán, chứng từ thanh toán năm 2026 trước thời điểm khóa sổ ngân sách.',
      'Kiểm kê quỹ tiền mặt và tài khoản tiền gửi tại Kho bạc Nhà nước huyện Tháp Mười.',
      'Kiểm tra việc công khai dự toán và quyết toán tài chính cuối năm theo Thông tư 61/2017/TT-BTC.'
    ],
    expectedOutput: 'Biên bản kiểm tra tài chính năm 2026; Báo cáo quyết toán ngân sách nhà nước.',
    legalBasis: 'Luật Ngân sách Nhà nước và Thông tư 61/2017/TT-BTC'
  },

  // THÁNG 01/2027
  {
    id: 'insp-m01-01',
    month: 'Tháng 01/2027',
    monthNumber: 1,
    timeframe: '04/01/2027 - 12/01/2027',
    title: 'Kiểm tra công tác chuyển đổi số, an toàn thông tin và cơ sở dữ liệu ngành "Đúng - Đủ - Sạch - Sống"',
    category: 'Hành chính - Quản trị',
    campus: 'Điểm chính (THPT)',
    target: 'Cán bộ quản trị phần mềm CSDL, văn thư số, GVCN 53 lớp',
    leadInspector: 'Thầy Lê Thanh Cường (HT)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Nguyễn Trung Hiếu (Tổ phó Tin học)', 'Mai Phước Lộc (GV Tin học)', 'Nguyễn Thị Kim Ngọc (Văn thư)'],
    specificTasks: [
      'Kiểm tra việc cập nhật 100% mã định danh cá nhân học sinh trên hệ thống vnEdu/CSDL ngành.',
      'Kiểm tra sổ điểm điện tử, quy trình ký số học bạ điện tử của giáo viên bộ môn và GVCN.',
      'Kiểm tra hệ thống bảo mật thông tin, việc quản trị cổng thông tin điện tử nhà trường.'
    ],
    expectedOutput: 'Biên bản kiểm tra công tác chuyển đổi số; xác nhận đồng bộ 100% dữ liệu ngành.',
    legalBasis: 'Chỉ đạo chuyển đổi số ngành giáo dục tỉnh Đồng Tháp'
  },
  {
    id: 'insp-m01-02',
    month: 'Tháng 01/2027',
    monthNumber: 1,
    timeframe: '12/01/2027 - 19/01/2027',
    title: 'Sơ kết công tác kiểm tra nội bộ học kỳ I và hoàn thiện Báo cáo nộp Sở GDĐT (hạn trước 20/01/2027)',
    category: 'Hành chính - Quản trị',
    campus: 'Cả 3 điểm trường',
    target: 'Toàn thể Ban Kiểm tra nội bộ, các tổ bộ môn và bộ phận trực thuộc',
    leadInspector: 'Thầy Lê Thanh Cường (HT)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Nguyễn Thị Kim Ngọc (Thư ký Ban KTNB)'],
    specificTasks: [
      'Rà soát toàn bộ kết quả kiểm tra các đợt trong học kỳ 1.',
      'Đánh giá việc khắc phục hạn chế của các tập thể, cá nhân sau kiểm tra.',
      'Hoàn thiện Báo cáo sơ kết KTNB học kỳ I nộp Sở GDĐT trước ngày 20/01/2027 theo quy định.'
    ],
    expectedOutput: 'Báo cáo sơ kết công tác kiểm tra nội bộ học kỳ I năm học 2026 - 2027 nộp Sở GDĐT.',
    legalBasis: 'Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026'
  },

  // THÁNG 02/2027
  {
    id: 'insp-m02-01',
    month: 'Tháng 02/2027',
    monthNumber: 2,
    timeframe: '08/02/2027 - 15/02/2027',
    title: 'Kiểm tra nền nếp học tập của học sinh đầu học kỳ II và công tác duy trì sĩ số sau Tết',
    category: 'Nền nếp - Đoàn thể',
    campus: 'Cả 3 điểm trường',
    target: 'GVCN 53 lớp, Đoàn trường, Liên đội, Nhân viên bảo vệ cổng',
    leadInspector: 'Cô Phan Thanh Thảo (PHT) & Thầy Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Ngô Anh Tuấn (Bí thư Đoàn)', 'Tổng phụ trách Đội', 'Trần Văn Út (TT Văn phòng)', 'Các Tổ phó phụ trách điểm trường'],
    specificTasks: [
      'Kiểm tra sĩ số chuyên cần học sinh trở lại lớp sau kỳ nghỉ Tết Nguyên đán.',
      'Nắm bắt các trường hợp học sinh có nguy cơ bỏ học để phối hợp chính quyền địa phương vận động.',
      'Kiểm tra nền nếp thực hiện nội quy trường học đầu học kỳ II.'
    ],
    expectedOutput: 'Báo cáo sĩ số học sinh sau Tết; kế hoạch giúp đỡ học sinh có hoàn cảnh khó khăn.',
    legalBasis: 'Chỉ đạo của UBND tỉnh về duy trì sĩ số học sinh'
  },
  {
    id: 'insp-m02-02',
    month: 'Tháng 02/2027',
    monthNumber: 2,
    timeframe: '15/02/2027 - 26/02/2027',
    title: 'Kiểm tra việc chấp hành quy định về dạy thêm, học thêm trong và ngoài nhà trường',
    category: 'Chuyên môn',
    campus: 'Cả 3 điểm trường & Các điểm ngoài trường',
    target: 'Toàn thể giáo viên trong trường (đặc biệt các môn Văn, Toán, Tiếng Anh, Lý, Hóa, Sinh)',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Chủ tịch Công đoàn', 'Ban Thanh tra nhân dân'],
    specificTasks: [
      'Kiểm tra việc thực hiện cam kết không dạy thêm trái quy định của giáo viên.',
      'Kiểm tra việc tổ chức dạy phụ đạo tại trường (đảm bảo không thu tiền học sinh yếu).',
      'Khảo sát ý kiến phụ huynh học sinh; xác minh các phản ánh về dạy thêm trái phép (nếu có).'
    ],
    expectedOutput: 'Biên bản kiểm tra dạy thêm học thêm; xử lý nghiêm các trường hợp vi phạm nếu có.',
    legalBasis: 'Thông tư 29/2024/TT-BGDĐT và CV 738/SGDĐT'
  },

  // THÁNG 03/2027
  {
    id: 'insp-m03-01',
    month: 'Tháng 03/2027',
    monthNumber: 3,
    timeframe: '02/03/2027 - 12/03/2027',
    title: 'Kiểm tra công tác giáo dục hòa nhập 25 học sinh khuyết tật và hoạt động tư vấn tâm lý học đường',
    category: 'Chuyên môn',
    campus: 'Cả 3 điểm trường',
    target: 'GVCN có học sinh khuyết tật (25 HS tại 3 điểm trường), Tổ tư vấn tâm lý học đường',
    leadInspector: 'Cô Phan Thanh Thảo (PHT) & Thầy Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Lê Hồng Thúy (TT KHXH)', 'Trương Văn Nghĩa (Tổ phó Văn)', 'Ngô Anh Tuấn (Bí thư Đoàn)', 'Cán bộ y tế học đường'],
    specificTasks: [
      'Kiểm tra Kế hoạch giáo dục cá nhân (KHGDCN) cho 25 học sinh khuyết tật theo CV 3326.',
      'Kiểm tra việc điều chỉnh đề kiểm tra và nhận xét đánh giá sự tiến bộ của học sinh hòa nhập.',
      'Kiểm tra sổ theo dõi tư vấn tâm lý học sinh; các chuyên đề phòng chống bạo lực học đường.'
    ],
    expectedOutput: 'Biên bản kiểm tra công tác giáo dục hòa nhập; hồ sơ theo dõi tiến bộ của 25 HS khuyết tật.',
    legalBasis: 'Công văn số 3326/SGDĐT-GDTrH-TX&CN'
  },
  {
    id: 'insp-m03-02',
    month: 'Tháng 03/2027',
    monthNumber: 3,
    timeframe: '15/03/2027 - 30/03/2027',
    title: 'Kiểm tra toàn diện hoạt động sư phạm nhà giáo (Đợt 2: 36 giáo viên cấp THCS và THPT)',
    category: 'Chuyên môn',
    campus: 'Cả 3 điểm trường',
    target: '36 giáo viên các tổ chuyên môn (hoàn thành chỉ tiêu 70% GV toàn trường được kiểm tra toàn diện)',
    leadInspector: 'Thầy Nguyễn Minh Trí (PHT Thường trực)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Hồng Thúy (TT KHXH)', 'Lê Thị Ngọc Tuyền (TT Ngoại ngữ)', 'Lê Văn Nguyên (TT GDTC)'],
    specificTasks: [
      'Dự giờ đánh giá tiết dạy phát triển năng lực; kiểm tra kế hoạch bài dạy CV 5512.',
      'Kiểm tra việc đổi mới phương pháp dạy học và kiểm tra đánh giá theo Thông tư 22.',
      'Kiểm tra việc sử dụng thiết bị dạy học, đồ dùng dạy học tự làm và ứng dụng AI.'
    ],
    expectedOutput: '36 Biên bản kiểm tra hoạt động sư phạm giáo viên đợt 2.',
    legalBasis: 'Thông tư 22/2021/TT-BGDĐT'
  },

  // THÁNG 04/2027
  {
    id: 'insp-m04-01',
    month: 'Tháng 04/2027',
    monthNumber: 4,
    timeframe: '05/04/2027 - 15/04/2027',
    title: 'Kiểm tra công tác ôn tập thi tốt nghiệp THPT năm 2027 (Khối 12) và ôn thi tuyển sinh lớp 10 (Khối 9)',
    category: 'Chuyên môn',
    campus: 'Điểm chính THPT & 2 Điểm THCS',
    target: 'Tổ trưởng chuyên môn và các giáo viên trực tiếp giảng dạy ôn thi Khối 9 và Khối 12',
    leadInspector: 'Thầy Nguyễn Minh Trí (PHT phụ trách chuyên môn)',
    teamMembers: ['Nguyễn Văn Tới (TT Toán)', 'Tô Thị Lắm (TT Ngữ văn)', 'Lê Thị Ngọc Tuyền (TT Ngoại ngữ)', 'Bùi Kim Huỳnh (TT KHTN)', 'Lê Hồng Thúy (TT KHXH)'],
    specificTasks: [
      'Kiểm tra kế hoạch ôn thi tốt nghiệp THPT năm 2027 theo cấu trúc đề mới của Bộ GDĐT.',
      'Kiểm tra việc phân hóa đối tượng học sinh, phụ đạo bổ trợ cho học sinh có nguy cơ trượt tốt nghiệp.',
      'Kiểm tra công tác chuẩn bị kỳ thi thử tốt nghiệp THPT và thi thử vào lớp 10.'
    ],
    expectedOutput: 'Biên bản kiểm tra công tác ôn thi tốt nghiệp; phương án hỗ trợ học sinh yếu.',
    legalBasis: 'Hướng dẫn thi tốt nghiệp THPT của Bộ GDĐT'
  },
  {
    id: 'insp-m04-02',
    month: 'Tháng 04/2027',
    monthNumber: 4,
    timeframe: '15/04/2027 - 25/04/2027',
    title: 'Kiểm tra hồ sơ đăng ký dự thi (ĐKDT) tốt nghiệp THPT của học sinh Khối 12',
    category: 'Khảo thí - Kiểm định',
    campus: 'Điểm chính (THPT)',
    target: 'GVCN Khối 12 (14 lớp THPT), cán bộ phụ trách nhập dữ liệu thi tốt nghiệp, Tổ Văn phòng',
    leadInspector: 'Thầy Lê Thanh Cường (HT) & Thầy Nguyễn Minh Trí (PHT)',
    teamMembers: ['Trần Văn Út (TT Văn phòng)', 'Nguyễn Thị Kim Ngọc (Văn thư)', 'Nguyễn Trung Hiếu (Tổ phó Tin học)'],
    specificTasks: [
      'Kiểm tra đối chiếu thông tin cá nhân học sinh ĐKDT: Họ tên, ngày sinh, CCCD/mã định danh.',
      'Kiểm tra diện ưu tiên, khuyến khích (chứng chỉ nghề, học sinh giỏi...) đảm bảo chính xác 100%.',
      'Kiểm tra việc in phiếu đăng ký cho học sinh và phụ huynh ký xác nhận.'
    ],
    expectedOutput: 'Biên bản kiểm tra chéo hồ sơ ĐKDT tốt nghiệp THPT; danh sách thí sinh chính thức.',
    legalBasis: 'Quy chế thi tốt nghiệp THPT của Bộ GDĐT'
  },
  {
    id: 'insp-m04-03',
    month: 'Tháng 04/2027',
    monthNumber: 4,
    timeframe: '20/04/2027 - 29/04/2027',
    title: 'Kiểm tra an toàn trường học, công tác PCCC, y tế học đường và vệ sinh môi trường tại 3 điểm trường',
    category: 'Tài chính - Cơ sở vật chất',
    campus: 'Cả 3 điểm trường',
    target: 'Bộ phận Y tế, Bảo vệ, Phục vụ vệ sinh tại 3 điểm trường',
    leadInspector: 'Cô Phan Thanh Thảo (PHT) & Thầy Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Minh Tho (Y tế)', 'Trần Thị Bích Hạnh (Y tế)', 'Nguyễn Ngọc Cường (BV)', 'Nguyễn Văn Thuấn (BV)', 'Huỳnh Quang Huy (BV)'],
    specificTasks: [
      'Kiểm tra hạn sử dụng và áp suất của 48 bình chữa cháy; chạy thử 03 máy bơm chữa cháy.',
      'Kiểm tra tủ thuốc sơ cấp cứu y tế, kiểm tra nguồn nước uống học sinh.',
      'Kiểm tra công tác đảm bảo an toàn điện, an toàn lan can lớp học trước mùa mưa bão.'
    ],
    expectedOutput: 'Biên bản kiểm tra an toàn trường học và PCCC; phương án bổ sung thuốc y tế.',
    legalBasis: 'Quy chuẩn trường học an toàn phòng chống tai nạn thương tích'
  },

  // THÁNG 05/2027
  {
    id: 'insp-m05-01',
    month: 'Tháng 05/2027',
    monthNumber: 5,
    timeframe: '03/05/2027 - 15/05/2027',
    title: 'Kiểm tra công tác tổ chức kiểm tra cuối học kỳ II, đánh giá xếp loại học sinh và xét tốt nghiệp THCS',
    category: 'Khảo thí - Kiểm định',
    campus: 'Cả 3 điểm trường',
    target: 'Ban coi chấm thi học kỳ II, Hội đồng xét công nhận tốt nghiệp THCS, GVCN 53 lớp',
    leadInspector: 'Thầy Lê Thanh Cường (HT) & Thầy Nguyễn Minh Trí (PHT)',
    teamMembers: ['Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Các Tổ trưởng chuyên môn', 'Nguyễn Thị Kim Ngọc (Thư ký)'],
    specificTasks: [
      'Kiểm tra quy trình tổ chức kiểm tra cuối kỳ II đảm bảo nghiêm túc, khách quan.',
      'Kiểm tra việc hoàn thiện điểm số, đánh giá học sinh trên phần mềm CSDL ngành theo TT 22.',
      'Kiểm tra hồ sơ xét công nhận tốt nghiệp THCS cho học sinh Khối 9 (cả 2 Điểm trường THCS).'
    ],
    expectedOutput: 'Biên bản xét tốt nghiệp THCS Khối 9; Báo cáo tổng kết chất lượng giáo dục năm học.',
    legalBasis: 'Quy chế xét công nhận tốt nghiệp THCS và Thông tư 22'
  },
  {
    id: 'insp-m05-02',
    month: 'Tháng 05/2027',
    monthNumber: 5,
    timeframe: '10/05/2027 - 18/05/2027',
    title: 'Kiểm tra công tác xét duyệt thi đua, sáng kiến kinh nghiệm và tổng kết công tác KTNB nộp Sở GDĐT',
    category: 'Hành chính - Quản trị',
    campus: 'Cả 3 điểm trường',
    target: 'Hội đồng Thi đua - Khen thưởng, Hội đồng chấm SKKN, Ban Kiểm tra nội bộ',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Chủ tịch Công đoàn', 'Trần Văn Út (TT Văn phòng)'],
    specificTasks: [
      'Kiểm tra tính pháp lý của hồ sơ đề nghị thi đua, khen thưởng các tổ và cá nhân.',
      'Kiểm tra kết quả chấm và công nhận sáng kiến kinh nghiệm cấp trường.',
      'Hoàn tất Báo cáo tổng kết công tác KTNB năm học và tự chấm điểm tiêu chí nộp Sở GDĐT trước 18/05/2027.'
    ],
    expectedOutput: 'Báo cáo tổng kết công tác KTNB năm học 2026 - 2027 nộp Sở GDĐT trước ngày 18/05/2027.',
    legalBasis: 'Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026'
  },
  {
    id: 'insp-m05-03',
    month: 'Tháng 05/2027',
    monthNumber: 5,
    timeframe: '18/05/2027 - 28/05/2027',
    title: 'Kiểm tra công tác hoàn thiện học bạ điện tử, hồ sơ lưu trữ và bàn giao cơ sở vật chất cuối năm',
    category: 'Hành chính - Quản trị',
    campus: 'Cả 3 điểm trường',
    target: 'GVCN 53 lớp, giáo viên bộ môn, cán bộ văn thư lưu trữ, kế toán tài sản',
    leadInspector: 'Cô Phan Thanh Thảo (PHT) & Thầy Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Trần Văn Út (TT Văn phòng)', 'Các Tổ phó phụ trách điểm trường', 'Nguyễn Thị Kim Ngọc (Văn thư)'],
    specificTasks: [
      'Kiểm tra 100% học bạ điện tử đã được ký số đầy đủ của GVBM, GVCN và Hiệu trưởng.',
      'Kiểm tra việc bàn giao phòng học, chìa khóa, trang thiết bị lớp học cho bộ phận cơ sở vật chất.',
      'Kiểm tra hồ sơ lưu trữ các cuộc kiểm tra nội bộ trong năm học theo Nghị định 30/2020.'
    ],
    expectedOutput: 'Biên bản bàn giao tài sản hè; xác nhận hoàn thành 100% ký số học bạ điện tử.',
    legalBasis: 'Nghị định 30/2020/NĐ-CP và Thông tư 08/2025/TT-BGDĐT'
  },

  // THÁNG 06/2027 (Kế thừa từ Phụ lục KH 76)
  {
    id: 'insp-m06-01',
    month: 'Tháng 06/2027',
    monthNumber: 6,
    timeframe: '01/06/2027 - 12/06/2027',
    title: 'Kiểm tra công tác chuẩn bị Điểm thi Kỳ thi Tốt nghiệp THPT năm 2027',
    category: 'Khảo thí - Kiểm định',
    campus: 'Điểm chính (THPT Đốc Binh Kiều)',
    target: 'Cơ sở vật chất Điểm thi, phòng thi, phòng làm việc của Hội đồng thi, hệ thống camera, máy nổ dự phòng',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng - Trưởng điểm thi)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Trần Văn Út (Tổ trưởng VP)', 'Nguyễn Ngọc Cường (Bảo vệ)', 'Minh Tho (Y tế)'],
    specificTasks: [
      'Kiểm tra 14 phòng thi chính thức và 02 phòng thi dự phòng theo quy chế của Bộ GDĐT.',
      'Kiểm tra phòng chứa đề thi và bài thi: Tủ sắt khóa chắc chắn, camera giám sát 24/24h có lưu điện.',
      'Kiểm tra điều kiện y tế sơ cấp cứu, phòng chống dịch bệnh và an toàn vệ sinh thực phẩm cho cán bộ coi thi.'
    ],
    expectedOutput: 'Biên bản kiểm tra điều kiện an toàn Điểm thi tốt nghiệp THPT của Đoàn kiểm tra Sở GDĐT.',
    legalBasis: 'Quy chế thi tốt nghiệp THPT của Bộ GDĐT'
  },
  {
    id: 'insp-m06-02',
    month: 'Tháng 06/2027',
    monthNumber: 6,
    timeframe: '15/06/2027 - 30/06/2027',
    title: 'Kiểm tra công tác thu nhận hồ sơ và chuẩn bị tuyển sinh vào lớp 10 năm học 2027 - 2028',
    category: 'Hành chính - Quản trị',
    campus: 'Điểm chính (THPT)',
    target: 'Ban Tuyển sinh lớp 10 nhà trường, Tổ Văn phòng tiếp nhận hồ sơ',
    leadInspector: 'Thầy Lê Thanh Cường (HT) & Thầy Nguyễn Minh Trí (PHT)',
    teamMembers: ['Trần Văn Út (TT Văn phòng)', 'Nguyễn Thị Kim Ngọc (Văn thư)', 'Nguyễn Trung Hiếu (Tổ phó Tin học)'],
    specificTasks: [
      'Kiểm tra công tác tiếp nhận hồ sơ tuyển sinh vào lớp 10 của học sinh tốt nghiệp THCS.',
      'Kiểm tra tính chính xác của học bạ, giấy khai sinh, giấy tờ ưu tiên tuyển sinh.',
      'Kiểm tra việc nhập dữ liệu phần mềm tuyển sinh trực tuyến của Sở GDĐT.'
    ],
    expectedOutput: 'Biên bản kiểm tra tiếp nhận hồ sơ tuyển sinh lớp 10; danh sách đăng ký dự tuyển.',
    legalBasis: 'Kế hoạch tuyển sinh vào lớp 10 của Sở GDĐT Đồng Tháp'
  },

  // THÁNG 07/2027 (Kế thừa từ Phụ lục KH 76 & KH 134)
  {
    id: 'insp-m07-01',
    month: 'Tháng 07/2027',
    monthNumber: 7,
    timeframe: '05/07/2027 - 16/07/2027',
    title: 'Kiểm tra công tác quản lý, cấp phát bằng tốt nghiệp THCS và THPT hè',
    category: 'Khảo thí - Kiểm định',
    campus: 'Điểm chính (THPT) & 2 Điểm THCS',
    target: 'Cán bộ văn thư phụ trách văn bằng, hồ sơ tốt nghiệp',
    leadInspector: 'Thầy Nguyễn Minh Trí (PHT)',
    teamMembers: ['Trần Văn Út (TT Văn phòng)', 'Nguyễn Thị Kim Ngọc (Văn thư)', 'Huỳnh Thị Thu Ngoan (Văn thư)', 'Nguyễn Thị Kim Kha (Văn thư)'],
    specificTasks: [
      'Kiểm tra việc tiếp nhận bằng tốt nghiệp THCS và THPT từ Sở GDĐT phát cho học sinh.',
      'Kiểm tra sổ theo dõi cấp phát văn bằng: Đúng người, đúng chữ ký, đối chiếu CCCD hợp lệ.',
      'Kiểm tra bảo quản an toàn số lượng phôi bằng và văn bằng chưa phát.'
    ],
    expectedOutput: 'Biên bản kiểm kê văn bằng chứng chỉ hè 2027.',
    legalBasis: 'Quy chế quản lý văn bằng chứng chỉ của Bộ GDĐT'
  },
  {
    id: 'insp-m07-02',
    month: 'Tháng 07/2027',
    monthNumber: 7,
    timeframe: '18/07/2027 - 30/07/2027',
    title: 'Kiểm tra cơ sở vật chất hè, bảo quản thiết bị, thư viện và tiến độ sửa chữa chuẩn bị năm học mới',
    category: 'Tài chính - Cơ sở vật chất',
    campus: 'Cả 3 điểm trường',
    target: 'Bộ phận Cơ sở vật chất, bảo vệ trực hè, đơn vị thi công sửa chữa nhỏ',
    leadInspector: 'Cô Phan Thanh Thảo (PHT) & Thầy Nguyễn Thanh Tòng (PHT)',
    teamMembers: ['Trần Văn Út (TT Văn phòng)', 'Phạm Thị Lệ Huyên (TB)', 'Nguyễn Văn Chữ (TB)', 'Nguyễn Ngọc Cường (BV)', 'Huỳnh Quang Huy (BV)'],
    specificTasks: [
      'Kiểm tra tình trạng bảo quản tài sản, máy móc vi tính trong thời gian nghỉ hè (tránh ẩm mốc, côn trùng).',
      'Kiểm tra tiến độ quét vôi, sửa chữa bàn ghế, hệ thống điện nước, nhà vệ sinh tại 3 điểm trường.',
      'Kiểm tra an toàn PCCC và an ninh trật tự khuôn viên trường trong hè.'
    ],
    expectedOutput: 'Báo cáo hiện trạng cơ sở vật chất hè; danh mục đề xuất mua sắm bổ sung đầu năm học mới.',
    legalBasis: 'Kế hoạch bảo trì cơ sở vật chất nhà trường'
  },

  // THÁNG 08/2027 (Kế thừa từ Phụ lục KH 76)
  {
    id: 'insp-m08-01',
    month: 'Tháng 08/2027',
    monthNumber: 8,
    timeframe: '02/08/2027 - 15/08/2027',
    title: 'Kiểm tra công tác tuyển sinh đầu cấp (Lớp 6 và Lớp 10) và tập huấn chính trị hè cho đội ngũ',
    category: 'Hành chính - Quản trị',
    campus: 'Cả 3 điểm trường',
    target: 'Ban Tuyển sinh lớp 6, lớp 10; toàn thể 120 cán bộ, giáo viên, nhân viên',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Các Tổ trưởng chuyên môn'],
    specificTasks: [
      'Kiểm tra kết quả tuyển sinh vào lớp 6 tại 2 Điểm trường THCS và tuyển sinh lớp 10 tại Điểm THPT.',
      'Kiểm tra danh sách học sinh trúng tuyển niêm yết công khai và duyệt kết quả với Sở GDĐT.',
      'Kiểm tra việc tham gia tập huấn chính trị hè và bồi dưỡng chuyên môn CT GDPT 2018 của 100% CB-GV-NV.'
    ],
    expectedOutput: 'Quyết định công nhận danh sách học sinh trúng tuyển lớp 6 và lớp 10; Báo cáo tập huấn hè.',
    legalBasis: 'Kế hoạch thời gian năm học mới của UBND tỉnh Đồng Tháp'
  },
  {
    id: 'insp-m08-02',
    month: 'Tháng 08/2027',
    monthNumber: 8,
    timeframe: '16/08/2027 - 31/08/2027',
    title: 'Kiểm tra toàn diện công tác chuẩn bị khai giảng năm học mới 2027 - 2028',
    category: 'Hành chính - Quản trị',
    campus: 'Cả 3 điểm trường',
    target: 'Toàn thể 120 CB-GV-NV, các tổ chuyên môn, văn phòng, đoàn thể tại 3 điểm trường',
    leadInspector: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
    teamMembers: ['Nguyễn Minh Trí (PHT)', 'Phan Thanh Thảo (PHT)', 'Nguyễn Thanh Tòng (PHT)', 'Chủ tịch Công đoàn', 'Bí thư Đoàn', 'Các Tổ trưởng'],
    specificTasks: [
      'Kiểm tra việc hoàn thiện biên chế lớp, phân công nhiệm vụ chuyên môn năm học mới.',
      'Kiểm tra thời khóa biểu tuần 1 và kế hoạch dạy học của các tổ chuyên môn.',
      'Kiểm tra công tác vệ sinh trường lớp, trang hoàng khánh tiết, chuẩn bị Lễ Khai giảng ngày 05/9.'
    ],
    expectedOutput: 'Biên bản nghiệm thu công tác chuẩn bị năm học mới 2027 - 2028.',
    legalBasis: 'Chỉ thị năm học mới của Bộ GDĐT và Sở GDĐT Đồng Tháp'
  }
];

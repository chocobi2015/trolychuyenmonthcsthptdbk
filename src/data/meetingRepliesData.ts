export interface OpinionItem {
  id: number;
  category: string;
  department: string;
  contributor?: string;
  opinion: string;
  opinionDetails?: string[];
  tableData?: { headers: string[]; rows: string[][] };
  response: string;
  responseDetails?: string[];
  legalBasis?: string;
  actionUnit?: string;
  note?: string;
}

export const OPINIONS_MEETING_3_DATA: OpinionItem[] = [
  {
    id: 1,
    category: '1. Khảo thí & Cấu trúc đề kiểm tra',
    department: 'Tổ Toán',
    contributor: 'Tổ Toán (Cấp THCS & THPT)',
    opinion: 'Đề xuất cấu trúc đề kiểm tra định kỳ môn Toán do GV THCS chưa được tập huấn câu hỏi Đúng/Sai, Trả lời ngắn.',
    opinionDetails: [
      'Toán THCS: Trắc nghiệm Phần I (28 câu = 7,0đ, 0,25đ/câu); Phần II: 0đ; Phần III: 0đ; Tự luận: 3,0đ; Thời gian làm bài: 90 phút.',
      'Toán THPT (Khối 10, 11): TN Phần I: 12 câu (3,0đ); TN Phần II Đúng/Sai: 2 câu (2,0đ); TN Phần III Trả lời ngắn: 4 câu (2,0đ); Tự luận: 3,0đ; Thời gian làm bài: 90 phút.',
      'Riêng khối 12: Thực hiện 100% theo đúng cấu trúc đề thi tốt nghiệp THPT năm 2025 của Bộ GDĐT.'
    ],
    tableData: {
      headers: ['Môn học', 'TN Phần I (Nhiều lựa chọn)', 'TN Phần II (Đúng/Sai)', 'TN Phần III (Trả lời ngắn)', 'Tự luận', 'Thời gian'],
      rows: [
        ['Toán THCS', '7,0đ (28 câu)', '0đ', '0đ', '3,0đ', '90 phút'],
        ['Toán THPT (10, 11)', '3,0đ (12 câu)', '2,0đ (2 câu)', '2,0đ (4 câu)', '3,0đ', '90 phút'],
        ['Toán 12', '100% theo cấu trúc đề thi tốt nghiệp THPT 2025 của Bộ GDĐT', '', '', '', '90 phút']
      ]
    },
    response: 'Ban Giám hiệu ĐỒNG Ý hoàn toàn với đề xuất của Tổ Toán.',
    responseDetails: [
      'Cấp THCS: Thống nhất áp dụng cấu trúc 70% Trắc nghiệm nhiều lựa chọn (Phần I - 28 câu) + 30% Tự luận (3,0 điểm), thời gian 90 phút. Cấu trúc này sát thực tế năng lực học sinh THCS, giảm tải áp lực tâm lý và thuận tiện trong chấm thi.',
      'Cấp THPT (Khối 10, 11): Thống nhất áp dụng định dạng kết hợp cả 3 dạng trắc nghiệm và tự luận (3,0đ) để rèn luyện kỹ năng tiếp cận định dạng thi mới cho học sinh.',
      'Khối 12: Bắt buộc thực hiện đúng 100% theo cấu trúc đề thi tốt nghiệp THPT từ năm 2025 của Bộ GDĐT.'
    ],
    legalBasis: 'Thông tư 22/2021/TT-BGDĐT; Quyết định 764/QĐ-BGDĐT ngày 08/3/2024 của Bộ GDĐT.',
    actionUnit: 'Tổ Toán & GV bộ môn',
    note: 'Đã phê duyệt'
  },
  {
    id: 2,
    category: '1. Khảo thí & Cấu trúc đề kiểm tra',
    department: 'Tổ Vật lý - Hóa - Sinh - KHTN - Công nghệ',
    contributor: 'Nhóm bộ môn KHTN, Công nghệ, Vật lí',
    opinion: 'Đề xuất số câu hỏi và cấu trúc đề kiểm tra định kỳ môn KHTN, Công nghệ, Vật lý (10, 11) có thay đổi so với kế hoạch ban đầu của trường.',
    opinionDetails: [
      'Công nghệ 6, 7, 8, 9: TN Phần I: 7,0đ (28 câu); Phần II: 0đ; Phần III: 0đ; Tự luận: 3,0đ; Thời gian: 45 phút.',
      'Khoa học tự nhiên (THCS): TN Phần I: 7,0đ (28 câu); Phần II: 0đ; Phần III: 0đ; Tự luận: 3,0đ; Thời gian: 60 phút.',
      'Vật lí (10, 11): TN Phần I: 4,0đ (16 câu); TN Phần II Đúng/Sai: 2,0đ (2 câu); TN Phần III: 1,0đ (4 câu); Tự luận: 3,0đ; Thời gian: 45 phút.'
    ],
    tableData: {
      headers: ['Môn học', 'TN Phần I (Nhiều lựa chọn)', 'TN Phần II (Đúng/Sai)', 'TN Phần III (Trả lời ngắn)', 'Tự luận', 'Thời gian'],
      rows: [
        ['Công nghệ 6, 7, 8, 9', '7,0đ (28 câu)', '0đ', '0đ', '3,0đ', '45 phút'],
        ['Khoa học tự nhiên (THCS)', '7,0đ (28 câu)', '0đ', '0đ', '3,0đ', '60 phút'],
        ['Vật lí (10, 11)', '4,0đ (16 câu)', '2,0đ (2 câu)', '1,0đ (4 câu)', '3,0đ', '45 phút']
      ]
    },
    response: 'Ban Giám hiệu THỐNG NHẤT VÀ PHÊ DUYỆT cấu trúc đề kiểm tra định kỳ do Tổ đề xuất.',
    responseDetails: [
      'Môn Công nghệ và KHTN (THCS): Chấp thuận định dạng 7,0đ trắc nghiệm nhiều lựa chọn + 3,0đ tự luận. Thời gian KHTN 60 phút, Công nghệ 45 phút là phù hợp quy định.',
      'Môn Vật lí (10, 11): Chấp thuận cấu trúc 4,0đ (TN I) + 2,0đ (TN II) + 1,0đ (TN III) + 3,0đ (Tự luận), thời gian 45 phút. Tổ trưởng duyệt ma trận - đặc tả trước khi ra đề.'
    ],
    legalBasis: 'Kế hoạch giáo dục nhà trường số 38/KH-THCS&THPTĐBK; Thông tư 22/2021/TT-BGDĐT.',
    actionUnit: 'Tổ Lý - Hóa - Sinh - KHTN - Công nghệ',
    note: 'Đã phê duyệt'
  },
  {
    id: 3,
    category: '1. Khảo thí & Cấu trúc đề kiểm tra',
    department: 'Tổ Sử - Địa - GDCD - GDKTPL',
    contributor: 'Nhóm bộ môn KHXH',
    opinion: 'Các ý kiến góp ý cụ thể về Kế hoạch kiểm tra, đánh giá của trường (Kế hoạch số 39):',
    opinionDetails: [
      'a) Trang 3, mục 2.b: Danh mục kiểm tra tập trung chưa có môn GDCD.',
      'b) Trang 4, Phần II: Câu hỏi trắc nghiệm Đúng/Sai quy định đúng 1 ý được 0,1đ; Tổ đề nghị mỗi ý đúng được 0,25đ.',
      'c) Trang 8, mục III, Bước 1: Đề nghị nhóm 3 môn chỉ nộp ma trận cho chuyên môn phê duyệt. GV nào được phân công ra đề thì soạn và nộp bảng đặc tả trực tiếp cho chuyên môn để bảo mật, vì môn xã hội nếu công bố bảng đặc tả thì gần như lộ nội dung chính của đề.',
      'd) Trang 8: Lịch kiểm tra giữa kỳ 2 đang xếp vào tuần 26, đề nghị dời sang tuần 27 vì PPCT THCS xây dựng tiết kiểm tra vào tuần 27.',
      'e) Trang 14, 16, 17: Thời gian kiểm tra môn LS&ĐL, GDCD bị ghi nhầm thời gian giữa các bảng.',
      'f) Trang 15: Thời gian kiểm tra môn Lịch sử, Địa lí, GDKTPL lớp 12 ghi 45 phút; Tổ đề nghị điều chỉnh thành 50 phút.'
    ],
    response: 'Ban Giám hiệu giải đáp và điều chỉnh cụ thể từng nội dung như sau:',
    responseDetails: [
      'Mục a (Môn GDCD): Môn GDCD cấp THCS kiểm tra theo thời khóa biểu trên lớp bằng ma trận và đề thống nhất của tổ; nhà trường bổ sung ghi chú rõ ràng vào kế hoạch.',
      'Mục b (Thang điểm câu hỏi Đúng/Sai): Bộ GDĐT quy định chấm theo phân hóa năng lực (1 ý: 0,1đ; 2 ý: 0,25đ; 3 ý: 0,5đ; 4 ý: 1,0đ). Đối với khối 10, 11 kiểm tra nội bộ chấm kết hợp tự luận, Tổ trưởng lập văn bản ma trận thang điểm cụ thể trình PHT duyệt trước khi kiểm tra.',
      'Mục c (Bảo mật bảng đặc tả môn xã hội): HOÀN TOÀN NHẤT TRÍ. Công khai ma trận để học sinh định hướng ôn tập; Bảng đặc tả chi tiết và Đề thi do GV ra đề bảo mật và nộp trực tiếp cho PHT chuyên môn.',
      'Mục d (Lịch kiểm tra GK2): TIẾP THU VÀ ĐIỀU CHỈNH dời sang Tuần 27 để khớp với PPCT cấp THCS.',
      'Mục e (Đính chính thời gian): Giao Bộ phận chuyên môn rà soát và đính chính thống nhất tại trang 14, 16, 17: LS&ĐL THCS 45 phút/phân môn (hoặc 60 phút/bài tích hợp), GDCD THCS 45 phút.',
      'Mục f (Thời gian môn lớp 12): ĐỒNG Ý ĐIỀU CHỈNH thời gian kiểm tra định kỳ môn Lịch sử, Địa lí, GDKTPL lớp 12 thành 50 phút (chuẩn hóa theo định dạng thi tốt nghiệp THPT 2025).'
    ],
    legalBasis: 'Quyết định 764/QĐ-BGDĐT; Thông tư 22/2021/TT-BGDĐT; Kế hoạch 39/KH-THCS&THPTĐBK.',
    actionUnit: 'PHT Chuyên môn & Tổ Sử - Địa - GDCD - GDKTPL',
    note: 'Đã thống nhất & đính chính'
  },
  {
    id: 4,
    category: '1. Khảo thí & Cấu trúc đề kiểm tra',
    department: 'Tổ Ngữ văn - Thư viện - Thiết bị',
    contributor: 'Thầy Nghĩa (Điểm ĐBK)',
    opinion: 'Đề xuất nguyên tắc ra đề kiểm tra định kỳ: Nên ưu tiên phân công giáo viên có trực tiếp dạy khối lớp đó ra đề để bám sát nội dung, phân hóa đối tượng và chương trình giảng dạy.',
    response: 'Ban Giám hiệu NHẤT TRÍ CAO với đề xuất.',
    responseDetails: [
      'Ban chuyên môn yêu cầu các Tổ trưởng chuyên môn khi phân công ra đề kiểm tra định kỳ phải ưu tiên giáo viên đang trực tiếp đứng lớp khối thi đó biên soạn ma trận, đặc tả và đề thi.',
      'Phân công 01 giáo viên cùng nhóm bộ môn thực hiện phản biện đề độc lập trước khi gửi duyệt bảo mật.'
    ],
    legalBasis: 'Quy chế chuyên môn năm học 2026 - 2027 của Trường THCS & THPT Đốc Binh Kiều.',
    actionUnit: 'Tổ trưởng các Tổ chuyên môn',
    note: 'Áp dụng từ đợt KT giữa kỳ I'
  },
  {
    id: 5,
    category: '2. Chế độ chính sách & Bảo hiểm xã hội',
    department: 'Tổ Vật lý - Hóa - Sinh - KHTN - Công nghệ',
    contributor: 'Cô Nguyễn Kim Ngân',
    opinion: 'Nhờ Lãnh đạo trường xem xét chế độ phụ cấp thâm niên nhà giáo của Cô Nguyễn Kim Ngân: Tháng 9/2011 đi dạy hợp đồng và có đóng BHXH bắt buộc. Năm 2012 nhận nhiệm sở tập sự theo quy định, năm 2018 mới được hưởng thâm niên 5%, đến tháng 8/2026 hưởng 13%. Hỏi: Theo Nghị định 77/2021/NĐ-CP thì thời gian dạy hợp đồng từ năm 2011 có được tính hưởng thâm niên không?',
    response: 'Ban Giám hiệu đã chỉ đạo rà soát và trả lời hướng dẫn cụ thể căn cứ pháp lý:',
    responseDetails: [
      'Căn cứ Khoản 1 Điều 3 Nghị định số 77/2021/NĐ-CP ngày 01/8/2021 của Chính phủ: Thời gian giảng dạy, giáo dục có đóng bảo hiểm xã hội bắt buộc trong các cơ sở giáo dục công lập được tính hưởng phụ cấp thâm niên nhà giáo (thời gian tập sự không tính hưởng).',
      'Phân tích trường hợp Cô Ngân: Khoảng thời gian từ tháng 09/2011 đến thời điểm nhận quyết định tập sự năm 2012 (nếu có Hợp đồng làm công việc giảng dạy và có tham gia đóng BHXH bắt buộc đầy đủ) ĐỦ ĐIỀU KIỆN ĐƯỢC TÍNH CỘNG DỒN vào thời gian công tác để tính hưởng phụ cấp thâm niên nghề.',
      'Việc trước đây chưa tính cộng dồn thời gian hợp đồng có đóng BHXH dẫn đến mốc tính thâm niên bị chậm.',
      'Chỉ đạo giải quyết: Nhà trường giao Bộ phận Kế toán - Tổ chức cán bộ tiếp nhận hồ sơ gốc của Cô Ngân (Hợp đồng lao động 2011, Sổ BHXH xác nhận quá trình đóng BHXH, Quyết định tuyển dụng và Quyết định công nhận hết thời gian tập sự). Sau khi đối chiếu xác thực, nhà trường sẽ lập văn bản đề nghị Sở GDĐT Đồng Tháp xem xét điều chỉnh mốc hưởng phụ cấp thâm niên và truy lĩnh theo đúng quy định pháp luật.'
    ],
    legalBasis: 'Nghị định số 77/2021/NĐ-CP ngày 01/8/2021 của Chính phủ quy định chế độ phụ cấp thâm niên nhà giáo.',
    actionUnit: 'Bộ phận Kế toán - TCCB & Cô Nguyễn Kim Ngân',
    note: '[Kế toán tiếp nhận hồ sơ trong tháng 10/2026]'
  },
  {
    id: 6,
    category: '2. Chế độ chính sách & Ngày giờ công',
    department: 'Tổ Sử - Địa - GDCD - GDKTPL',
    contributor: 'Điểm trường Tân Kiều & Điểm ĐBK',
    opinion: 'Chế độ ngày giờ công và giải quyết dạy thay cho giáo viên:',
    opinionDetails: [
      'a) Tuần 4: Cô Châu (điểm trường Tân Kiều) nằm viện do phẫu thuật giác mạc -> Giáo viên dạy thay có được kê tiết tính thừa giờ/thanh toán dạy thay không?',
      'b) Trường hợp giáo viên đang giảng dạy bị bệnh đột xuất tại trường: Quy trình giải quyết cho nghỉ và phân công dạy thay.'
    ],
    response: 'Ban Giám hiệu hướng dẫn quy trình và quyền lợi của giáo viên như sau:',
    responseDetails: [
      'Về trường hợp Cô Châu: Căn cứ Thông tư 28/2009/TT-BGDĐT và Quy chế chi tiêu nội bộ của trường, giáo viên được phân công dạy thay hợp lệ cho đồng nghiệp nghỉ nằm viện phẫu thuật ĐƯỢC KÊ TÍNH TIẾT DẠY THAY ĐẦY ĐỦ. Tổ trưởng lập Bảng tổng hợp tiết dạy thay gửi BGH duyệt để tính thừa giờ theo quy chế.',
      'Về giáo viên bệnh đột xuất: Khi xảy ra đột xuất tại trường, GV hoặc đồng nghiệp báo ngay cho Y tế trường sơ cứu, đồng thời thông báo cho BGH và Tổ trưởng để bố trí người quản lý lớp thay ngay buổi học đó, đảm bảo an toàn tuyệt đối cho học sinh. Sau đó GV bổ sung giấy tờ y tế (giấy nghỉ việc hưởng BHXH) để giải quyết chế độ ốm đau theo Luật BHXH.'
    ],
    legalBasis: 'Thông tư 28/2009/TT-BGDĐT; Thông tư 15/2020/TT-BGDĐT; Quy chế chi tiêu nội bộ trường.',
    actionUnit: 'Tổ trưởng chuyên môn & Bộ phận Kế toán',
    note: 'Đã hướng dẫn cụ thể'
  },
  {
    id: 7,
    category: '3. Cải cách hành chính & Hồ sơ sổ sách',
    department: 'Tổ Ngữ văn - Thư viện - Thiết bị',
    contributor: 'Thầy Nghĩa (Điểm ĐBK)',
    opinion: 'Đề xuất cải cách thủ tục hành chính trong sinh hoạt tổ và kiểm tra giáo án:',
    opinionDetails: [
      'Giảm bớt thủ tục hành chính: Họp tổ Chuyên môn 2 lần/tháng thì có thể đan xen giữa trực tiếp và trực tuyến.',
      'Kiểm tra KHBD: Yêu cầu nộp vào các khoảng thời gian hợp lý, tránh dồn vào lúc công việc quá nhiều như ôn thi hoặc kiểm tra định kỳ.'
    ],
    response: 'Ban Giám hiệu HOÀN TOÀN ĐỒNG THUẬN VÀ CHỈ ĐẠO THỰC HIỆN NGAY:',
    responseDetails: [
      'Về họp tổ chuyên môn: Cho phép Tổ chuyên môn linh hoạt tổ chức 01 lần họp trực tiếp (sinh hoạt chuyên môn theo nghiên cứu bài học, thao giảng, chuyên đề) và 01 lần họp trực tuyến (giao ban chuyên môn, đánh giá công việc). Tổ trưởng vẫn lập biên bản lưu trữ điện tử đầy đủ.',
      'Về kiểm tra KHBD: Tổ trưởng chuyên môn xây dựng kế hoạch kiểm tra giáo án phân kỳ đều đặn trong tháng, tuyệt đối không dồn lịch thu kiểm tra vào các tuần cao điểm ôn tập, kiểm tra định kỳ hay sơ kết.'
    ],
    legalBasis: 'Thông tư 32/2020/TT-BGDĐT; Chỉ đạo chuyển đổi số ngành Giáo dục tỉnh Đồng Tháp.',
    actionUnit: 'Tổ trưởng các Tổ chuyên môn',
    note: 'Áp dụng thực hiện ngay'
  },
  {
    id: 8,
    category: '4. Đạo đức nhà giáo & Tâm lý sư phạm',
    department: 'Tổ Ngữ văn - Thư viện - Thiết bị',
    contributor: 'Cô Thảo (Tân Kiều), Cô Dương (ĐBK)',
    opinion: 'Đề xuất về quy trình xác minh thông tin phản ánh và hình thức xử lý góp ý đối với giáo viên:',
    opinionDetails: [
      'Khi GV có vi phạm/phản ánh, nếu đưa tên lên Website thì cần xác minh chính xác, tránh nhầm lẫn ảnh hưởng tâm lý GV.',
      'Xử lý vi phạm công bằng, đúng quy trình, khách quan, không thiên vị.',
      'Ghi rõ cụ thể vi phạm điều gì, tránh ghi chung chung như "GV bị HS phản ánh về phương pháp giảng dạy" làm GV hoang mang lo lắng.',
      'Không nên nêu tên GV vi phạm lên toàn trường gây áp lực tâm lý nặng nề; nên báo về Tổ Chuyên môn để nhắc nhở, giúp đỡ đồng nghiệp.'
    ],
    response: 'Ban Giám hiệu khẳng định quan điểm chỉ đạo nhân văn, sư phạm và chuẩn mực:',
    responseDetails: [
      '1. Tuyệt đối KHÔNG đăng tải thông tin phản ánh chưa xác minh hoặc thông tin phê bình cá nhân giáo viên lên Website nhà trường hay các phương tiện thông tin công cộng.',
      '2. Mọi thông tin phản ánh từ phụ huynh, học sinh phải được BGH và Tổ chuyên môn xác minh thận trọng, khách quan, có sự làm việc và lắng nghe giải trình trực tiếp từ giáo viên.',
      '3. Khi góp ý hoặc nhắc nhở, phải chỉ rõ nội dung, tình huống và căn cứ chuyên môn cụ thể, không nhận xét mơ hồ, chung chung.',
      '4. Ưu tiên hình thức trao đổi riêng với cá nhân hoặc gửi nội dung về Tổ chuyên môn để sinh hoạt, nhắc nhở mang tính xây dựng, đồng hành cùng giáo viên tiến bộ, tránh việc nêu tên trước hội đồng toàn trường gây áp lực tâm lý tiêu cực.'
    ],
    legalBasis: 'Quy định về đạo đức nhà giáo (Quyết định 16/2008/QĐ-BGDĐT); Điều lệ trường trung học.',
    actionUnit: 'Ban Giám hiệu & Các Tổ trưởng chuyên môn',
    note: 'Quán triệt toàn trường'
  },
  {
    id: 9,
    category: '5. Hoạt động thể thao & Môn GDTC',
    department: 'Tổ Thể dục - GDQPAN - Nghệ thuật',
    contributor: 'Tập thể Tổ Thể dục',
    opinion: 'Thực hiện Công văn 3701/SGDĐT-VP ngày 22/09/2026 về cắt giảm cuộc thi, chuẩn bị Hội thao truyền thống học sinh năm 2027:',
    opinionDetails: [
      'GV có HS năng khiếu chủ động lên kế hoạch tập luyện các môn (Cầu lông, Đá cầu, Bóng chuyền, Điền kinh, Bơi lội...) chuẩn bị tham gia Hội thao truyền thống học sinh năm 2027.',
      'Môn GDTC THCS: Chủ đề Thể thao tự chọn (TTTC) tối thiểu dạy 2 nội dung/khối (Bóng chuyền, bóng đá, đá cầu...).'
    ],
    response: 'Ban Giám hiệu BIỂU DƯƠNG VÀ ỦNG HỘ CHỦ ĐỘNG CỦA TỔ:',
    responseDetails: [
      'Thống nhất giao Tổ Thể dục khảo sát và lập Kế hoạch huấn luyện năng khiếu thể thao từ đầu năm học 2026 - 2027 để chuẩn bị tham gia Hội thao năm 2027. BGH sẽ tạo điều kiện tối đa về cơ sở vật chất sân bãi, thiết bị tập luyện và kinh phí hỗ trợ.',
      'Thống nhất môn GDTC cấp THCS tổ chức giảng dạy tối thiểu 2 nội dung Thể thao tự chọn/khối lớp theo đúng chương trình GDPT 2018 và điều kiện thực tế của 2 điểm trường.'
    ],
    legalBasis: 'Công văn 3701/SGDĐT-VP ngày 22/09/2026 của Sở GDĐT Đồng Tháp; CT GDPT 2018.',
    actionUnit: 'Tổ Thể dục - GDQPAN - Nghệ thuật',
    note: 'Đã phê duyệt chủ trương'
  },
  {
    id: 10,
    category: '6. Tổ Tiếng Anh - Tin học',
    department: 'Tổ Tiếng Anh - Tin học',
    contributor: 'Tập thể Tổ Tiếng Anh - Tin học',
    opinion: 'Tổ đã tiến hành họp và quán triệt các hướng dẫn của nhà trường. Không có đề xuất, kiến nghị phát sinh.',
    response: 'Ban Giám hiệu ghi nhận tinh thần đồng thuận, nhất trí cao của tập thể Tổ Tiếng Anh - Tin học trong việc triển khai kế hoạch giáo dục.',
    legalBasis: 'Biên bản họp tổ chuyên môn ngày 08/10/2026.',
    actionUnit: 'Tổ Tiếng Anh - Tin học',
    note: 'Ghi nhận'
  }
];

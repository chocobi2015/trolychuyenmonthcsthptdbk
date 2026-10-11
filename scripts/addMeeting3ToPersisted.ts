import * as fs from 'fs';
import * as path from 'path';

const PERSISTED_PATH = path.join(process.cwd(), 'src/data/persistedDepartmentMeetings.json');

const newMeeting = {
  id: 'tra-loi-hop-to-cm-lan-3-08-10-2026',
  departmentId: 'all',
  departmentName: 'TẤT CẢ CÁC TỔ CHUYÊN MÔN',
  meetingNumber: 'Số: 03/TB-THCS&THPTĐBK',
  week: 'Tuần 5 - 6 (Học kỳ I)',
  semester: 'Học kỳ I',
  schoolYear: '2026 - 2027',
  meetingDate: '08:00, Thứ Sáu ngày 09/10/2026',
  location: 'Hội trường Ban Giám hiệu - Trường THCS & THPT Đốc Binh Kiều',
  leader: 'Thầy Lê Thanh Cường (Hiệu trưởng)',
  secretary: 'Thầy Nguyễn Minh Trí (Phó Hiệu trưởng phụ trách CM)',
  attendees: {
    present: 120,
    total: 120,
    absent: 'Không',
    list: ['120 Cán bộ, giáo viên, nhân viên từ 6 tổ chuyên môn toàn trường']
  },
  topic: 'Bảng tổng hợp ý kiến 6 Tổ chuyên môn & Nội dung trả lời, chỉ đạo của Ban Giám hiệu (Phiên họp Tổ lần 3 ngày 08/10/2026)',
  content: `SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP
TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU
Số: 03/TB-THCS&THPTĐBK

CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
Tháp Mười, ngày 09 tháng 10 năm 2026

BẢNG TỔNG HỢP Ý KIẾN HỌP TỔ CHUYÊN MÔN VÀ NỘI DUNG TRẢ LỜI, CHỈ ĐẠO CỦA BAN GIÁM HIỆU
(Sau phiên họp Tổ chuyên môn lần 3 ngày 08/10/2026 của 06 Tổ chuyên môn)

I. LĨNH VỰC KHẢO THÍ, ĐỀ KIỂM TRA ĐỊNH KỲ & KẾ HOẠCH ĐÁNH GIÁ (KẾ HOẠCH SỐ 39)
1. Cấu trúc đề kiểm tra định kỳ môn Toán (Tổ Toán):
- Đề xuất của Tổ:
  + Cấp THCS: Do GV chưa được tập huấn câu hỏi Đúng/Sai và Trả lời ngắn, đề xuất cấu trúc gồm: Trắc nghiệm Phần I (nhiều lựa chọn) 7,0 điểm (28 câu x 0,25đ); Phần II: 0đ; Phần III: 0đ; Tự luận: 3,0 điểm; Thời gian: 90 phút.
  + Cấp THPT (Khối 10, 11): TN Phần I: 12 câu (3,0đ); TN Phần II Đúng/Sai: 2 câu (2,0đ); TN Phần III Trả lời ngắn: 4 câu (2,0đ); Tự luận: 3,0đ; Thời gian: 90 phút.
  + Khối 12: Thực hiện 100% theo định dạng đề thi tốt nghiệp THPT 2025 của Bộ GDĐT.
- Trả lời của Ban Giám hiệu: ĐỒNG Ý HOÀN TOÀN. Thống nhất áp dụng cấu trúc 7,0đ TN + 3,0đ TL cho THCS; khối 10, 11 tiếp cận định dạng mới có kết hợp tự luận; khối 12 chuẩn hóa 100% theo đề tốt nghiệp THPT 2025.

2. Cấu trúc đề kiểm tra định kỳ môn KHTN, Công nghệ, Vật lý 10-11 (Tổ Vật lý - Hóa - Sinh - KHTN - Công nghệ):
- Đề xuất của Tổ:
  + Công nghệ 6, 7, 8, 9: TN Phần I (28 câu = 7,0đ) + Tự luận (3,0đ), 45 phút.
  + Khoa học tự nhiên (THCS): TN Phần I (28 câu = 7,0đ) + Tự luận (3,0đ), 60 phút.
  + Vật lí 10, 11: TN Phần I (16 câu = 4,0đ) + TN Phần II Đúng/Sai (2 câu = 2,0đ) + TN Phần III Trả lời ngắn (4 câu = 1,0đ) + Tự luận (3,0đ), 45 phút.
- Trả lời của Ban Giám hiệu: THỐNG NHẤT VÀ PHÊ DUYỆT. Các môn THCS áp dụng 7,0đ TN + 3,0đ TL. Môn Vật lí 10, 11 áp dụng cấu trúc phối hợp 3 phần trắc nghiệm + tự luận theo đề xuất.

3. Kế hoạch kiểm tra, đánh giá số 39/KH-THCS&THPTĐBK (Tổ Sử - Địa - GDCD - GDKTPL):
- Nội dung ý kiến:
  + Trang 3 mục 2.b kiểm tra tập trung chưa có môn GDCD: BGH giải đáp môn GDCD kiểm tra theo TKB lớp bằng ma trận và đề thống nhất của tổ; nhà trường bổ sung ghi chú rõ ràng vào kế hoạch.
  + Trang 4 Phần II câu hỏi Đúng/Sai (đúng 1 ý 0,1đ, tổ đề nghị 0,25đ/ý): BGH hướng dẫn thực hiện theo thang điểm chuẩn Bộ GDĐT (0,1đ - 0,25đ - 0,5đ - 1,0đ); đối với bài kiểm tra khối 10, 11 chấm kết hợp tự luận thì Tổ trưởng thống nhất ma trận cụ thể trình PHT duyệt.
  + Trang 8 mục III bước 1 (bảo mật bảng đặc tả môn xã hội): HOÀN TOÀN NHẤT TRÍ. Chỉ công khai ma trận cho học sinh định hướng ôn tập; Bảng đặc tả chi tiết và Đề thi do GV ra đề bảo mật và nộp trực tiếp cho PHT chuyên môn, tránh lộ đề môn xã hội.
  + Trang 8 (Lịch kiểm tra Giữa kỳ 2 tuần 26 đề nghị sang tuần 27): TIẾP THU VÀ ĐIỀU CHỈNH sang Tuần 27 để khớp với Phân phối chương trình (PPCT) cấp THCS.
  + Trang 14, 16, 17 (Thời gian kiểm tra LS&ĐL, GDCD bị ghi nhầm): BGH giao Ban Chuyên môn rà soát và đính chính thống nhất: LS&ĐL THCS 45 phút/phân môn (hoặc 60 phút/bài tích hợp), GDCD THCS 45 phút.
  + Trang 15 phụ lục (Thời gian kiểm tra môn Lịch sử, Địa lí, GDKTPL lớp 12 ghi 45 phút): ĐỒNG Ý ĐIỀU CHỈNH THÀNH 50 PHÚT (chuẩn hóa theo định dạng thi tốt nghiệp THPT 2025).

4. Phân công ra đề kiểm tra định kỳ (Tổ Ngữ văn):
- Đề xuất của Thầy Nghĩa: Ưu tiên phân công GV đang trực tiếp giảng dạy tại khối lớp đó ra đề.
- Trả lời của Ban Giám hiệu: HOÀN TOÀN NHẤT TRÍ. Tổ trưởng phân công GV đang đứng lớp trực tiếp ra đề và 01 GV phản biện độc lập để bám sát chương trình và trình độ học sinh.

II. LĨNH VỰC CHẾ ĐỘ CHÍNH SÁCH, NGÀY GIỜ CÔNG & BẢO HIỂM XÃ HỘI
5. Chế độ phụ cấp thâm niên nhà giáo theo Nghị định 77/2021/NĐ-CP (Tổ Lý - Hóa - Sinh):
- Trường hợp Cô Nguyễn Kim Ngân: Dạy hợp đồng có đóng BHXH từ tháng 9/2011; năm 2012 nhận nhiệm sở tập sự theo quy định, năm 2018 mới hưởng thâm niên 5%, đến tháng 8/2026 hưởng 13%.
- Trả lời của Ban Giám hiệu:
  + Căn cứ Khoản 1 Điều 3 Nghị định số 77/2021/NĐ-CP ngày 01/8/2021 của Chính phủ, thời gian giảng dạy có đóng BHXH bắt buộc tại cơ sở giáo dục công lập trước khi tập sự ĐƯỢC TÍNH CỘNG DỒN để xét hưởng phụ cấp thâm niên nghề.
  + Ban Giám hiệu giao Bộ phận Kế toán - Tổ chức cán bộ tiếp nhận hồ sơ gốc của Cô Ngân (Hợp đồng lao động 2011, Sổ BHXH, Quyết định tuyển dụng và Quyết định công nhận hết tập sự) để đối chiếu, lập văn bản trình Sở GDĐT Đồng Tháp xem xét điều chỉnh mốc thâm niên và truy lĩnh theo quy định.

6. Chế độ ngày giờ công và giải quyết dạy thay (Tổ Sử - Địa - GDCD - GDKTPL):
- Cô Châu (điểm Tân Kiều) phẫu thuật giác mạc: GV dạy thay ĐƯỢC KÊ TÍNH TIẾT DẠY THAY ĐẦY ĐỦ theo Thông tư 28/2009/TT-BGDĐT và Quy chế chi tiêu nội bộ. Tổ trưởng lập Bảng tổng hợp tiết dạy thay gửi BGH duyệt.
- Giáo viên đang giảng dạy bị bệnh đột xuất tại trường: Kịp thời sơ cứu y tế, báo ngay BGH và Tổ trưởng bố trí GV quản lý lớp thay ngay buổi học đó để đảm bảo an toàn cho học sinh; sau đó GV bổ sung giấy tờ nghỉ việc hưởng BHXH.

III. LĨNH VỰC CẢI CÁCH HÀNH CHÍNH & HỒ SƠ SỔ SÁCH
7. Sinh hoạt tổ chuyên môn và kiểm tra KHBD (Tổ Ngữ văn):
- Họp tổ 2 lần/tháng đan xen trực tiếp và trực tuyến: ĐỒNG Ý. Cho phép 01 lần họp trực tiếp (chuyên đề, nghiên cứu bài học, thao giảng) và 01 lần họp trực tuyến/giao ban số có lập biên bản điện tử để giảm bớt áp lực thủ tục hành chính.
- Kiểm tra KHBD: Giao Tổ trưởng phân kỳ lịch kiểm tra hợp lý, tuyệt đối tránh dồn lịch kiểm tra vào các tuần cao điểm thi/ôn tập. Duy trì ký duyệt điện tử trên vnEdu.

IV. LĨNH VỰC ĐẠO ĐỨC NHÀ GIÁO, XỬ LÝ PHẢN ÁNH & TÂM LÝ SƯ PHẠM
8. Xác minh phản ánh và hình thức xử lý góp ý đối với giáo viên (Tổ Ngữ văn - Cô Thảo, Cô Dương):
- Ban Giám hiệu khẳng định quan điểm chỉ đạo nhân văn, sư phạm và chuẩn mực:
  + Tuyệt đối KHÔNG đăng tải thông tin phản ánh chưa xác minh hoặc thông tin kỷ luật cá nhân lên Website trường hay mạng xã hội.
  + Mọi phản ánh phải được BGH và Tổ chuyên môn xác minh độc lập, khách quan, lắng nghe giáo viên giải trình.
  + Khi nhắc nhở, chỉ rõ nội dung tình huống cụ thể, không nhận xét chung chung gây hoang mang.
  + Ưu tiên trao đổi riêng hoặc giao Tổ chuyên môn giúp đỡ nội bộ, hạn chế tối đa nêu tên trước toàn trường làm ảnh hưởng tâm lý sư phạm.

V. LĨNH VỰC THỂ THAO & MÔN GIÁO DỤC THỂ CHẤT
9. Kế hoạch bồi dưỡng học sinh chuẩn bị Hội thao 2027 và dạy TTTC (Tổ Thể dục):
- Thực hiện CV 3701/SGDĐT-VP: Giao Tổ Thể dục xây dựng Kế hoạch tập luyện học sinh năng khiếu các môn (Cầu lông, Đá cầu, Điền kinh, Bóng chuyền, Bơi lội...) chuẩn bị Hội thao truyền thống 2027. BGH đảm bảo sân bãi, thiết bị và kinh phí hỗ trợ.
- Môn GDTC THCS dạy tối thiểu 2 nội dung thể thao tự chọn/khối theo CT GDPT 2018.

VI. TỔ TIẾNG ANH - TIN HỌC
10. Ghi nhận tổ đã quán triệt đầy đủ và không có ý kiến đề xuất phát sinh thêm.`,
  resolutions: [
    'Phê duyệt cấu trúc đề kiểm tra định kỳ môn Toán, KHTN, Công nghệ THCS theo định dạng 70% trắc nghiệm (Phần I - 28 câu) + 30% tự luận; môn Vật lí 10-11 theo cấu trúc phối hợp 3 phần trắc nghiệm + tự luận; khối 12 thực hiện 100% định dạng đề thi tốt nghiệp THPT 2025.',
    'Điều chỉnh thời gian làm bài kiểm tra định kỳ lớp 12 các môn Lịch sử, Địa lí, GDKTPL từ 45 phút lên 50 phút; chuyển lịch kiểm tra giữa kỳ 2 sang Tuần 27 cho khớp PPCT THCS; bảo mật bảng đặc tả môn xã hội.',
    'Bộ phận Kế toán - TCCB tiếp nhận hồ sơ gốc của Cô Nguyễn Kim Ngân để hoàn tất thủ tục trình cấp có thẩm quyền xem xét cộng dồn thời gian dạy hợp đồng đóng BHXH năm 2011 để tính phụ cấp thâm niên nhà giáo theo Nghị định 77/2021/NĐ-CP.',
    'Giải quyết chế độ kê tiết dạy thay đầy đủ cho giáo viên dạy thay Cô Châu (nằm viện phẫu thuật) và hướng dẫn quy trình xử lý trường hợp giáo viên bệnh đột xuất tại trường.',
    'Cho phép Tổ chuyên môn linh hoạt tổ chức đan xen 01 lần họp trực tiếp và 01 lần họp trực tuyến/tháng; phân kỳ lịch kiểm tra KHBD hợp lý, không dồn vào cao điểm thi.',
    'Quán triệt nguyên tắc nhân văn trong quản lý: Tuyệt đối không đưa thông tin phản ánh chưa xác minh lên Website trường; ưu tiên góp ý sư phạm trong nội bộ tổ chuyên môn, bảo vệ danh dự và tâm lý nhà giáo.',
    'Giao Tổ Thể dục xây dựng Kế hoạch bồi dưỡng năng khiếu TDTT chuẩn bị Hội thao truyền thống học sinh năm 2027 và thực hiện dạy tối thiểu 2 môn TTTC/khối lớp.'
  ],
  tasks: [
    {
      id: 'task-3-1',
      task: 'Rà soát, tiếp nhận hồ sơ BHXH của Cô Nguyễn Kim Ngân và làm văn bản đề nghị điều chỉnh thâm niên theo NĐ 77/2021',
      assignee: 'Bộ phận Kế toán - TCCB & Cô Ngân',
      deadline: '20/10/2026',
      status: 'in_progress'
    },
    {
      id: 'task-3-2',
      task: 'Hoàn thiện ma trận, bảng đặc tả bảo mật và phân công GV ra đề kiểm tra định kỳ giữa kỳ I theo đúng cấu trúc phê duyệt',
      assignee: 'Tổ trưởng 6 Tổ chuyên môn & PHT Nguyễn Minh Trí',
      deadline: '18/10/2026',
      status: 'pending'
    },
    {
      id: 'task-3-3',
      task: 'Lập Bảng tổng hợp tiết dạy thay của Cô Châu gửi BGH và Kế toán để xác nhận tính ngày giờ công, thừa giờ',
      assignee: 'Tổ trưởng Tổ Sử - Địa & Điểm trưởng Tân Kiều',
      deadline: '15/10/2026',
      status: 'pending'
    },
    {
      id: 'task-3-4',
      task: 'Khảo sát năng khiếu học sinh và lập Kế hoạch huấn luyện chuẩn bị Hội thao truyền thống 2027 theo CV 3701/SGDĐT-VP',
      assignee: 'Tổ trưởng Tổ Thể dục & Đoàn trường',
      deadline: '25/10/2026',
      status: 'pending'
    }
  ],
  notes: 'Đính kèm tệp văn bản chính thức: TRẢ LỜI HỌP TỔ LẦN 3 - 08-10-2026.docx chuẩn thể thức hành chính Nghị định 30/2020/NĐ-CP.',
  createdAt: '2026-10-09T08:00:00.000Z',
  updatedAt: '2026-10-11T14:00:00.000Z'
};

const raw = fs.readFileSync(PERSISTED_PATH, 'utf-8');
const meetings = JSON.parse(raw);

// Check if already exists
const existingIndex = meetings.findIndex((m: any) => m.id === newMeeting.id);
if (existingIndex !== -1) {
  meetings[existingIndex] = newMeeting;
} else {
  // Insert at appropriate place (at index 3, right after hd-hop-to-cm-lan-3)
  const hdIndex = meetings.findIndex((m: any) => m.id === 'hd-hop-to-cm-lan-3-08-10-2026');
  if (hdIndex !== -1) {
    meetings.splice(hdIndex + 1, 0, newMeeting);
  } else {
    meetings.push(newMeeting);
  }
}

fs.writeFileSync(PERSISTED_PATH, JSON.stringify(meetings, null, 2), 'utf-8');
console.log('Successfully updated persistedDepartmentMeetings.json. Total count:', meetings.length);

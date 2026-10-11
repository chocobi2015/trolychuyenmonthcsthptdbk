import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  PageNumber
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';

export interface DepartmentFeedback {
  deptId: string;
  deptName: string;
  orderRom: string;
  opinions: {
    title: string;
    contributor?: string;
    opinionContent: string[];
    responseTitle: string;
    responseContent: string[];
    legalBasis?: string;
    assignment?: string;
  }[];
}

export const DEPARTMENT_FEEDBACKS_MEETING_3: DepartmentFeedback[] = [
  {
    deptId: 'toan',
    deptName: 'TỔ TOÁN',
    orderRom: 'I',
    opinions: [
      {
        title: 'Ý kiến 1: Về cấu trúc đề kiểm tra định kỳ môn Toán',
        contributor: 'Tổ Toán (Cấp THCS và THPT)',
        opinionContent: [
          'Đối với cấu trúc đề kiểm tra định kỳ, do giáo viên dạy cấp THCS chưa được tập huấn biên soạn câu hỏi dạng Đúng/Sai (Phần II) và dạng trả lời ngắn (Phần III) nên tổ đề xuất cấu trúc như sau:',
          '1. Toán THCS: Trắc nghiệm Phần I (nhiều lựa chọn) gồm 28 câu = 7,0 điểm (0,25 điểm/câu); Phần II (Đúng/Sai): 0 điểm; Phần III (Trả lời ngắn): 0 điểm; Tự luận: 3,0 điểm. Thời gian làm bài: 90 phút.',
          '2. Toán THPT (khối 10, 11): Trắc nghiệm Phần I gồm 12 câu = 3,0 điểm (0,25 điểm/câu); Trắc nghiệm Phần II (Đúng/Sai) gồm 2 câu = 2,0 điểm (mỗi câu 4 ý, tổng cộng 8 ý hỏi); Trắc nghiệm Phần III (Trả lời ngắn) gồm 4 câu = 2,0 điểm (0,5 điểm/câu); Tự luận: 3,0 điểm. Thời gian làm bài: 90 phút.',
          '3. Riêng khối 12: Thực hiện theo định dạng cấu trúc đề thi tốt nghiệp THPT năm 2025 của Bộ Giáo dục và Đào tạo (100% trắc nghiệm khách quan, thời gian làm bài 90 phút).'
        ],
        responseTitle: 'Trả lời và chỉ đạo của Ban Giám hiệu:',
        responseContent: [
          'Ban Giám hiệu thống nhất phê duyệt cấu trúc đề kiểm tra định kỳ theo đề xuất của Tổ Toán, cụ thể:',
          '- Đối với cấp THCS: Thống nhất áp dụng cấu trúc: 70% Trắc nghiệm nhiều lựa chọn Phần I (28 câu = 7,0 điểm) + 30% Tự luận (3,0 điểm), thời gian làm bài 90 phút. Cấu trúc này phù hợp với thực tế đội ngũ giáo viên THCS đang tiếp cận Chương trình GDPT 2018, giúp học sinh ổn định tâm lý và thuận tiện trong tổ chức chấm bài.',
          '- Giao Tổ trưởng chuyên môn Toán xây dựng kế hoạch bồi dưỡng, tập huấn nội bộ cho giáo viên THCS kỹ năng biên soạn câu hỏi Đúng/Sai và trả lời ngắn thông qua các buổi sinh hoạt chuyên môn theo nghiên cứu bài học, chuẩn bị lộ trình áp dụng từng bước cho các năm học tiếp theo.',
          '- Đối với cấp THPT (khối 10, 11): Đồng ý áp dụng cấu trúc kết hợp (Phần I: 3,0 điểm; Phần II: 2,0 điểm; Phần III: 2,0 điểm; Tự luận: 3,0 điểm, thời gian 90 phút) nhằm rèn luyện và chuẩn bị sớm năng lực làm quen các định dạng trắc nghiệm mới cho học sinh.',
          '- Riêng khối 12: Bắt buộc thực hiện đúng 100% theo định dạng cấu trúc đề thi tốt nghiệp THPT năm 2025 quy định tại Quyết định số 764/QĐ-BGDĐT ngày 08/03/2024 của Bộ Giáo dục và Đào tạo.'
        ],
        legalBasis: 'Căn cứ Thông tư 22/2021/TT-BGDĐT và Quyết định số 764/QĐ-BGDĐT của Bộ GDĐT.',
        assignment: 'Tổ trưởng Tổ Toán và giáo viên giảng dạy môn Toán cấp THCS & THPT.'
      }
    ]
  },
  {
    deptId: 'ly-hoa-sinh-cn',
    deptName: 'TỔ VẬT LÝ – HÓA HỌC – SINH HỌC – KHTN – CÔNG NGHỆ',
    orderRom: 'II',
    opinions: [
      {
        title: 'Ý kiến 1: Về cấu trúc đề kiểm tra định kỳ môn Công nghệ, KHTN và Vật lý (10, 11)',
        contributor: 'Tập thể Tổ bộ môn KHTN - Công nghệ',
        opinionContent: [
          'Tổ đề xuất số câu hỏi và cấu trúc đề kiểm tra định kỳ các môn KHTN, Công nghệ, Vật lý (10, 11) có điều chỉnh so với dự thảo kế hoạch kiểm tra của Trường như sau:',
          '1. Công nghệ khối 6, 7, 8, 9: Trắc nghiệm Phần I: 7,0 điểm (28 câu); Trắc nghiệm Phần II: 0 điểm; Trắc nghiệm Phần III: 0 điểm; Tự luận: 3,0 điểm. Thời gian làm bài: 45 phút.',
          '2. Khoa học tự nhiên (KHTN khối 6, 7, 8, 9): Trắc nghiệm Phần I: 7,0 điểm (28 câu); Trắc nghiệm Phần II: 0 điểm; Trắc nghiệm Phần III: 0 điểm; Tự luận: 3,0 điểm. Thời gian làm bài: 60 phút.',
          '3. Vật lí khối 10, 11: Trắc nghiệm Phần I: 4,0 điểm (16 câu); Trắc nghiệm Phần II (Đúng/Sai): 2,0 điểm (2 câu, 8 ý hỏi); Trắc nghiệm Phần III (Trả lời ngắn): 1,0 điểm (4 câu, 0,25đ/câu); Tự luận: 3,0 điểm. Thời gian làm bài: 45 phút.'
        ],
        responseTitle: 'Trả lời và chỉ đạo của Ban Giám hiệu:',
        responseContent: [
          'Ban Giám hiệu thống nhất phê duyệt cấu trúc kiểm tra định kỳ do Tổ đề xuất:',
          '- Môn Công nghệ cấp THCS: Thống nhất áp dụng cấu trúc Phần I (7,0 điểm/28 câu) + Tự luận (3,0 điểm), thời gian 45 phút.',
          '- Môn Khoa học tự nhiên cấp THCS: Thống nhất cấu trúc Phần I (7,0 điểm/28 câu) + Tự luận (3,0 điểm), thời gian 60 phút. Yêu cầu nhóm bộ môn KHTN xây dựng ma trận phân định tỷ lệ điểm hài hòa giữa các phân môn (Vật lý, Hóa học, Sinh học) tương ứng với số tiết thực dạy trong phân phối chương trình tính đến thời điểm kiểm tra.',
          '- Môn Vật lí khối 10, 11: Thống nhất áp dụng cấu trúc kết hợp (Phần I: 4,0 điểm; Phần II: 2,0 điểm; Phần III: 1,0 điểm; Tự luận: 3,0 điểm, thời gian 45 phút).',
          '- Đối với khối 12 các môn Vật lý, Hóa học, Sinh học: Thực hiện nghiêm túc 100% định dạng đề thi tốt nghiệp THPT từ năm 2025 theo đúng văn bản hướng dẫn của Bộ Giáo dục và Đào tạo (40 lệnh hỏi, thời gian làm bài 50 phút).'
        ],
        legalBasis: 'Căn cứ Thông tư 22/2021/TT-BGDĐT; Kế hoạch giáo dục nhà trường năm học 2026 - 2027.',
        assignment: 'Tổ trưởng chuyên môn và nhóm trưởng bộ môn Lý, Hóa, Sinh, KHTN, Công nghệ.'
      },
      {
        title: 'Ý kiến 2: Về xem xét chế độ phụ cấp thâm niên nhà giáo của Cô Nguyễn Kim Ngân',
        contributor: 'Cô Nguyễn Kim Ngân (Giáo viên trong tổ kiến nghị)',
        opinionContent: [
          'Nhờ lãnh đạo trường xem xét dùm trường hợp của Cô Nguyễn Kim Ngân: Cô Ngân tháng 9/2011 đi dạy hợp đồng và có đóng bảo hiểm xã hội. Đến năm 2012 Cô Ngân nhận nhiệm sở và đi dạy thực hiện chế độ tập sự theo quy định nên đến năm 2018 Cô Ngân mới được hưởng thâm niên 5% và đến tháng 8/2026 thì thâm niên hưởng 13%.',
          'Theo Nghị định 77/2021/NĐ-CP thì trường hợp này có được tính hưởng thâm niên từ năm 2011 hay không?'
        ],
        responseTitle: 'Trả lời và giải quyết của Ban Giám hiệu:',
        responseContent: [
          '- Căn cứ pháp lý: Nghị định số 77/2021/NĐ-CP ngày 01/8/2021 của Chính phủ quy định về chế độ phụ cấp thâm niên nhà giáo. Tại Điều 2 và Khoản 1 Điều 3 quy định: Thời gian tính hưởng phụ cấp thâm niên là thời gian giảng dạy, giáo dục có đóng bảo hiểm xã hội bắt buộc trong các cơ sở giáo dục công lập. Khoản 2 Điều 3 quy định: Thời gian tập sự, thử việc không được tính hưởng phụ cấp thâm niên.',
          '- Về trường hợp cụ thể của Cô Nguyễn Kim Ngân: Giai đoạn hợp đồng có đóng BHXH bắt buộc từ tháng 9/2011 đến trước khi tập sự năm 2012 nếu đúng vị trí việc làm giảng dạy tại cơ sở giáo dục công lập thì hoàn toàn ĐỦ ĐIỀU KIỆN được cộng dồn vào thời gian công tác tính hưởng phụ cấp thâm niên nhà giáo.',
          '- Chỉ đạo giải quyết: Ban Giám hiệu giao bộ phận Kế toán - Văn phòng khẩn trương rà soát lại toàn bộ hồ sơ gốc của cô Nguyễn Kim Ngân (hợp đồng giảng dạy năm 2011, sổ BHXH, quyết định tuyển dụng và hoàn thành tập sự 2012). Kế toán trường lập hồ sơ xác minh và có văn bản xin ý kiến hướng dẫn nghiệp vụ của Phòng Giáo dục Trung học / Phòng Kế hoạch - Tài chính Sở GDĐT để giải quyết điều chỉnh mốc tính thâm niên và truy lĩnh chế độ cho cô Ngân đúng quy định, hoàn thành dứt điểm trong tháng 10/2026.'
        ],
        legalBasis: 'Căn cứ Nghị định số 77/2021/NĐ-CP ngày 01/8/2021 của Chính phủ.',
        assignment: 'Bộ phận Kế toán - Văn phòng phối hợp cá nhân cô Nguyễn Kim Ngân thực hiện.'
      }
    ]
  },
  {
    deptId: 'van-tv-tb',
    deptName: 'TỔ NGỮ VĂN – THƯ VIỆN – THIẾT BỊ',
    orderRom: 'III',
    opinions: [
      {
        title: 'Ý kiến 1: Kiến nghị của Thầy Nghĩa (Điểm Đốc Binh Kiều)',
        contributor: 'Thầy Nghĩa (Điểm Đốc Binh Kiều)',
        opinionContent: [
          '1. Nên giảm bớt thủ tục hành chính, cụ thể họp tổ Chuyên môn 2 lần/tháng thì có thể đan xen giữa trực tiếp và trực tuyến.',
          '2. Kiểm tra Kế hoạch bài dạy (KHBD) nên yêu cầu giáo viên nộp vào các khoảng thời gian hợp lý, tránh nộp khi công việc quá nhiều như ôn kiểm tra hoặc thi định kỳ...',
          '3. Đề xuất ra đề kiểm tra định kỳ: Nên chọn giáo viên có dạy khối lớp đó ra đề để bám sát nội dung, chương trình.'
        ],
        responseTitle: 'Trả lời và chỉ đạo của Ban Giám hiệu:',
        responseContent: [
          '- Về hình thức họp tổ chuyên môn đan xen trực tiếp và trực tuyến: Ban Giám hiệu hoàn toàn nhất trí. Theo Thông tư 32/2020/TT-BGDĐT, tổ chuyên môn sinh hoạt định kỳ 2 tuần/lần. Nhà trường khuyến khích đẩy mạnh chuyển đổi số: các phiên họp mang tính chất triển khai công việc, kế hoạch tháng có thể tổ chức trực tuyến qua Google Meet/Zoom; các phiên họp chuyên đề trọng tâm, sinh hoạt chuyên môn theo nghiên cứu bài học, thao giảng dự giờ thì tổ chức trực tiếp. Tổ trưởng chủ động đăng ký hình thức họp phù hợp.',
          '- Về thời gian kiểm tra hồ sơ Kế hoạch bài dạy (KHBD): Nhà trường tiếp thu ý kiến. Ban Giám hiệu và Tổ trưởng chuyên môn sẽ thống nhất lịch kiểm tra hồ sơ cố định, tránh các tuần cao điểm ôn tập, kiểm tra định kỳ hoặc thời gian giáo viên tập trung chấm bài, vào điểm để giảm tải áp lực cho đội ngũ thầy cô.',
          '- Về phân công giáo viên ra đề kiểm tra định kỳ: Nhà trường thống nhất nguyên tắc: BGH ưu tiên phân công giáo viên đang trực tiếp giảng dạy tại khối lớp ra đề để bảo đảm bám sát chương trình và đặc điểm học sinh, kết hợp phản biện chéo giữa các giáo viên cùng nhóm môn để đảm bảo tính khách quan và chất lượng đề kiểm tra.'
        ],
        legalBasis: 'Thông tư số 32/2020/TT-BGDĐT; Kế hoạch chuyển đổi số ngành giáo dục.',
        assignment: 'Tổ trưởng Tổ Ngữ văn và Phó Hiệu trưởng phụ trách chuyên môn.'
      },
      {
        title: 'Ý kiến 2: Kiến nghị của Cô Thảo (Điểm Tân Kiều)',
        contributor: 'Cô Thảo (Điểm Tân Kiều)',
        opinionContent: [
          '1. Khi giáo viên vi phạm, nếu có đưa tên lên Website thì cần xác minh chính xác, tránh nhầm lẫn ảnh hưởng tâm lý giáo viên.',
          '2. Nếu có vi phạm, xử lý công bằng, đúng quy trình, không thiên vị.',
          '3. Ghi rõ vi phạm điều gì, tránh ghi chung chung như: "GV bị HS phản ánh về phương pháp giảng dạy" làm GV lo lắng vì không biết vi phạm cụ thể là gì để khắc phục, tránh tái phạm.'
        ],
        responseTitle: 'Trả lời và cam kết của Ban Giám hiệu:',
        responseContent: [
          '- Về việc đưa tên lên Website và xác minh thông tin: Ban Giám hiệu khẳng định nguyên tắc quản lý: Nhà trường TUYỆT ĐỐI KHÔNG đăng tải công khai danh tính cá nhân giáo viên có sơ suất hoặc khuyết điểm lên Website/Cổng thông tin điện tử của trường. Mọi phản ánh từ học sinh, phụ huynh đều phải được BGH và Tổ chuyên môn kiểm tra, xác minh thận trọng, lắng nghe ý kiến giải trình của giáo viên trước khi đưa ra kết luận.',
          '- Về tính công bằng và quy trình xử lý: Nhà trường cam kết xử lý khách quan, công tâm, đúng quy trình, đúng thẩm quyền theo Luật Viên chức và Quy chế làm việc của cơ quan, không bao che nhưng cũng tuyệt đối không định kiến, không thiên vị.',
          '- Về nội dung thông báo cụ thể: Ban Giám hiệu hoàn toàn nhất trí. Nghiêm cấm việc nhận xét hoặc đánh giá mơ hồ, chung chung. Mọi nhắc nhở, góp ý phải nêu rõ nội dung cụ thể (ở tiết học nào, nội dung gì, quy định nào chưa thực hiện đúng) để giáo viên nắm bắt rõ nguyên nhân, kịp thời rút kinh nghiệm và điều chỉnh phương pháp sư phạm.'
        ],
        legalBasis: 'Luật Viên chức 2010; Luật sửa đổi bổ sung một số điều của Luật Cán bộ, CC, VC 2019.',
        assignment: 'Ban Giám hiệu nhà trường và Tổ trưởng Tổ Ngữ văn.'
      },
      {
        title: 'Ý kiến 3: Kiến nghị của Cô Dương (Điểm Đốc Binh Kiều)',
        contributor: 'Cô Dương (Điểm Đốc Binh Kiều)',
        opinionContent: [
          'Không nên nêu tên giáo viên vi phạm lên toàn trường vì sẽ tạo áp lực tâm lý nặng nề cho giáo viên; có thể báo về tổ Chuyên môn để tổ chức góp ý, nhắc nhở nội bộ.'
        ],
        responseTitle: 'Trả lời và định hướng của Ban Giám hiệu:',
        responseContent: [
          '- Ban Giám hiệu hoàn toàn tiếp thu và đồng thuận với ý kiến đóng góp của Cô Dương.',
          '- Định hướng của nhà trường là xây dựng "Môi trường học đường hạnh phúc", văn hóa ứng xử nhân văn, tôn trọng và đồng hành cùng nhà giáo. Đối với các thiếu sót về chuyên môn, Ban Giám hiệu sẽ trực tiếp trao đổi riêng với giáo viên hoặc gửi thông tin nội bộ cho Tổ trưởng chuyên môn để tổ sinh hoạt, góp ý chân tình, giúp đỡ đồng nghiệp cùng hoàn thiện, không bêu tên hay phê bình trước toàn thể hội đồng sư phạm nhà trường.'
        ],
        legalBasis: 'Kế hoạch xây dựng Trường học hạnh phúc của Ngành Giáo dục Đào tạo.',
        assignment: 'Ban Giám hiệu và Ban Chấp hành Công đoàn cơ sở.'
      }
    ]
  },
  {
    deptId: 'su-dia-gdcd',
    deptName: 'TỔ SỬ – ĐỊA – GDCD – GDKT&PL',
    orderRom: 'IV',
    opinions: [
      {
        title: 'Ý kiến 1: Về Kế hoạch Kiểm tra, đánh giá định kỳ của nhà trường',
        contributor: 'Tổ Sử - Địa - GDCD - GDKT&PL',
        opinionContent: [
          'Tổ có các ý kiến cụ thể đóng góp vào Kế hoạch kiểm tra đánh giá như sau:',
          '1. Trang 3 mục 2.b: Kiểm tra tập trung hiện chưa có môn GDCD, đề nghị bổ sung môn GDCD vào danh mục kiểm tra tập trung.',
          '2. Trang 4: Phần II Câu hỏi trắc nghiệm dạng Đúng / Sai: Hiện quy định đúng 1 ý được 0,1 điểm, đề nghị điều chỉnh thành mỗi ý được 0,25 điểm.',
          '3. Trang 8 mục III Bước 1: Nhóm 3 bộ môn trong Tổ đề nghị trước mắt nộp ma trận cho chuyên môn phê duyệt. Giáo viên nào được phân công ra đề môn/khối nào thì giáo viên đó soạn và nộp bảng đặc tả trực tiếp cho chuyên môn. Vì môn xã hội nếu công bố bảng đặc tả trước thì nội dung chính của Đề kiểm tra gần như bị lộ.',
          '4. Trang 8: Thời gian kiểm tra giữa kỳ 2 theo kế hoạch ghi tuần 26, đề nghị kiểm tra sang tuần 27 vì PPCT THCS xây dựng kiểm tra vào tuần 27 (kế hoạch ghi tuần 26 bị cấn tiến độ).',
          '5. Trang 14, 16, 17: Thời gian kiểm tra môn Lịch sử & Địa lí, GDCD cấp THCS bị ghi nhầm thời gian, đề nghị đính chính.',
          '6. Trang 15 phụ lục kiểm tra: Thời gian kiểm tra môn Lịch sử, Địa lí, GDKT&PL lớp 12 ghi 45 phút, tổ đề nghị nâng lên 50 phút.'
        ],
        responseTitle: 'Trả lời và chỉ đạo của Ban Giám hiệu:',
        responseContent: [
          '- Về môn GDCD (mục 1): Tiếp thu ý kiến của Tổ, Ban Giám hiệu bổ sung môn GDCD vào danh mục kiểm tra tập trung theo đúng tiến độ chung.',
          '- Về thang điểm câu hỏi Đúng/Sai Phần II (mục 2): Ban Giám hiệu giải thích và hướng dẫn: Theo định dạng cấu trúc đề thi của Bộ GDĐT (Quyết định số 764/QĐ-BGDĐT), cách tính điểm Phần II là tính điểm lũy tiến theo số ý đúng trong một câu hỏi (chọn đúng 1 ý được 0,1 điểm; đúng 2 ý được 0,25 điểm; đúng 3 ý được 0,5 điểm; đúng cả 4 ý được 1,0 điểm cho cả câu). Đây là quy chuẩn quốc gia nhằm phân hóa năng lực và hạn chế việc đoán mò, không áp dụng cào bằng 0,25 điểm/ý. Đề nghị tổ thực hiện đúng theo quy chuẩn kỹ thuật của Bộ GDĐT.',
          '- Về nộp ma trận và bảng đặc tả (mục 3): Ban Giám hiệu chấp thuận đề xuất rất xác đáng này. Nhằm bảo đảm tuyệt đối tính bảo mật của đề kiểm tra các môn Khoa học Xã hội, Tổ chuyên môn chỉ công bố Ma trận tổng quát cho học sinh ôn tập. Bảng đặc tả chi tiết kèm đề kiểm tra và đáp án do giáo viên ra đề gửi trực tiếp, bảo mật cho Ban Giám hiệu duyệt.',
          '- Về tuần kiểm tra giữa kỳ 2 (mục 4): Ban Giám hiệu thống nhất điều chỉnh lịch kiểm tra giữa kỳ 2 sang Tuần 27 để khớp hoàn toàn với Phân phối chương trình cấp THCS.',
          '- Về đính chính thời gian kiểm tra tại các trang 14, 16, 17 (mục 5): Bộ phận chuyên môn tiếp thu và đã chỉnh sửa chính xác thời lượng môn LS&ĐL, GDCD THCS theo Thông tư 22/2021/TT-BGDĐT.',
          '- Về thời gian kiểm tra môn Lịch sử, Địa lí, GDKT&PL lớp 12 (mục 6): Thống nhất điều chỉnh từ 45 phút lên 50 phút, đồng bộ với định dạng đề thi tốt nghiệp THPT năm 2025 của Bộ GDĐT.'
        ],
        legalBasis: 'Thông tư 22/2021/TT-BGDĐT; Quyết định 764/QĐ-BGDĐT của Bộ GDĐT.',
        assignment: 'Bộ phận chuyên môn nhà trường và Tổ trưởng Tổ Sử - Địa - GDCD - GDKT&PL.'
      },
      {
        title: 'Ý kiến 2: Về ngày giờ công và giải quyết chế độ cho giáo viên ốm đau, thai sản',
        contributor: 'Tổ Sử - Địa - GDCD - GDKT&PL',
        opinionContent: [
          '1. Tuần 4: Cô Châu (điểm trường Tân Kiều) nằm viện do mổ giác mạc: Giáo viên dạy thay có được kê tiết (tính thừa giờ/thanh toán dạy thay) không?',
          '2. Giáo viên đang dạy bị bệnh đột xuất trong buổi dạy: Nhà trường giải quyết chế độ nghỉ và bố trí quản lý lớp như thế nào?'
        ],
        responseTitle: 'Trả lời và hướng dẫn của Ban Giám hiệu:',
        responseContent: [
          '- Về trường hợp Cô Châu nằm viện mổ mắt (mục 1): Căn cứ Thông tư 28/2009/TT-BGDĐT và Thông tư 15/2020/TT-BGDĐT về chế độ làm việc của giáo viên phổ thông, giáo viên ốm đau có giấy ra viện/nghỉ hưởng BHXH hợp lệ thì không bị trừ định mức tiết dạy. Giáo viên được BGH phân công dạy thay cô Châu được kê tiết dạy thay (dạy thừa giờ) và được thanh toán kinh phí dạy thừa giờ theo Quy chế chi tiêu nội bộ của nhà trường. Tổ trưởng chuyên môn lập bảng tổng hợp số tiết dạy thay gửi bộ phận Kế toán để thực hiện chi trả.',
          '- Về trường hợp giáo viên bệnh đột xuất trong buổi dạy (mục 2):',
          '  + Về xử lý tức thời: Giáo viên báo ngay cho Tổ trưởng chuyên môn và Phó Hiệu trưởng trực ngày (hoặc Tổng phụ trách/Giám thị) để kịp thời cử giáo viên trống tiết quản lý lớp, bảo đảm an toàn cho học sinh và hỗ trợ giáo viên đến phòng Y tế học đường hoặc cơ sở y tế gần nhất.',
          '  + Về chế độ và dạy bù: Giáo viên sau đó bổ sung giấy tờ y tế/chứng nhận nghỉ việc hưởng BHXH. Các tiết học bị gián đoạn sẽ được Tổ chuyên môn xếp lịch dạy bù hoặc tính giờ dạy thay theo đúng quy chế hiện hành.'
        ],
        legalBasis: 'Thông tư 28/2009/TT-BGDĐT; Thông tư 15/2020/TT-BGDĐT; Luật Bảo hiểm xã hội.',
        assignment: 'Tổ trưởng chuyên môn và bộ phận Kế toán - Y tế nhà trường.'
      }
    ]
  },
  {
    deptId: 'the-duc-gdqp-nt',
    deptName: 'TỔ THỂ DỤC – GDQPAN – NGHỆ THUẬT',
    orderRom: 'V',
    opinions: [
      {
        title: 'Ý kiến 1: Về tham gia Hội thao truyền thống học sinh năm 2027',
        contributor: 'Tổ Thể dục - GDQPAN - Nghệ thuật',
        opinionContent: [
          'Công văn số 3701/SGDĐT-VP ngày 22/09/2026 của Sở GDĐT V/v cắt giảm các cuộc thi, hồ sơ sổ sách hội họp và báo cáo gửi Sở Giáo dục có nội dung tổ chức Hội thao truyền thống học sinh trong năm 2027 gồm các môn: Cầu lông, Đá cầu, Bóng chuyền, Điền kinh, Bơi lội... cấp TH, THCS, THPT. Tổ kiến nghị nhà trường có định hướng kế hoạch chuẩn bị.'
        ],
        responseTitle: 'Trả lời và chỉ đạo của Ban Giám hiệu:',
        responseContent: [
          'Ban Giám hiệu ghi nhận và thống nhất chủ trương chuẩn bị sớm. Giao Tổ Thể dục - GDQPAN xây dựng Kế hoạch tham gia Hội thao học sinh truyền thống năm 2027 ngay từ đầu năm học 2026 - 2027. Nhà trường sẽ tạo điều kiện tối đa về cơ sở vật chất (sân tập, dụng cụ thi đấu) và cân đối kinh phí hỗ trợ công tác huấn luyện, bồi dưỡng theo đúng Quy chế chi tiêu nội bộ của đơn vị.'
        ],
        legalBasis: 'Công văn số 3701/SGDĐT-VP ngày 22/09/2026 của Sở GDĐT Đồng Tháp.',
        assignment: 'Tổ Thể dục - GDQPAN - Nghệ thuật.'
      },
      {
        title: 'Ý kiến 2: Về bồi dưỡng học sinh năng khiếu thể thao',
        contributor: 'Tổ Thể dục - GDQPAN - Nghệ thuật',
        opinionContent: [
          'Giáo viên có học sinh năng khiếu thì lên kế hoạch tập luyện sớm để đạt thành tích tốt.'
        ],
        responseTitle: 'Trả lời và chỉ đạo của Ban Giám hiệu:',
        responseContent: [
          'Ban Giám hiệu rất hoan nghênh tinh thần trách nhiệm và chủ động của các thầy cô. Giao các giáo viên bộ môn tiến hành rà soát, tuyển chọn các em học sinh có tố chất, năng khiếu thể thao qua giờ dạy chính khóa; lập danh sách đội tuyển năng khiếu và xây dựng kế hoạch tập luyện chi tiết (thời gian, địa điểm, nội dung huấn luyện) trình BGH phê duyệt để tổ chức tập luyện ngoài giờ hiệu quả, bảo đảm an toàn tuyệt đối cho học sinh.'
        ],
        legalBasis: 'Kế hoạch hoạt động thể dục thể thao năm học 2026 - 2027 của nhà trường.',
        assignment: 'Giáo viên bộ môn Thể dục - GDQPAN.'
      },
      {
        title: 'Ý kiến 3: Về nội dung Thể thao tự chọn (TTTC) môn GDTC THCS',
        contributor: 'Tổ Thể dục - GDQPAN - Nghệ thuật',
        opinionContent: [
          'Môn Giáo dục thể chất cấp THCS có chủ đề Thể thao tự chọn (TTTC) tối thiểu dạy 2 nội dung/khối (Bóng chuyền, Bóng đá, Đá cầu...).'
        ],
        responseTitle: 'Trả lời và chỉ đạo của Ban Giám hiệu:',
        responseContent: [
          'Thống nhất thực hiện nghiêm túc theo Chương trình GDPT 2018 môn GDTC cấp THCS. Giao Tổ trưởng chuyên môn chỉ đạo nhóm bộ môn căn cứ điều kiện thực tế sân bãi, trang thiết bị tại 2 điểm trường (Đốc Binh Kiều và Tân Kiều) cùng nguyện vọng của đa số học sinh để lựa chọn tối thiểu 2 môn thể thao tự chọn phù hợp nhất, đưa vào Kế hoạch giáo dục môn học ngay từ đầu năm học.'
        ],
        legalBasis: 'Chương trình GDPT 2018 môn Giáo dục thể chất.',
        assignment: 'Tổ trưởng chuyên môn và nhóm giáo viên GDTC cấp THCS.'
      }
    ]
  },
  {
    deptId: 'tieng-anh-tin-hoc',
    deptName: 'TỔ TIẾNG ANH – TIN HỌC',
    orderRom: 'VI',
    opinions: [
      {
        title: 'Ý kiến đóng góp, đề xuất với nhà trường',
        contributor: 'Tổ Tiếng Anh - Tin học',
        opinionContent: [
          'Tổ thảo luận, thống nhất toàn bộ các nội dung chỉ đạo chuyên môn của Ban Giám hiệu nhà trường và không có đề xuất, kiến nghị gì thêm.'
        ],
        responseTitle: 'Ý kiến ghi nhận của Ban Giám hiệu:',
        responseContent: [
          'Ban Giám hiệu ghi nhận và biểu dương tinh thần trách nhiệm, sự đồng thuận cao và tinh thần chủ động triển khai kế hoạch năm học của tập thể Tổ Tiếng Anh - Tin học.',
          'Đề nghị Tổ tiếp tục phát huy tinh thần đoàn kết, đẩy mạnh ứng dụng công nghệ thông tin và chuyển đổi số trong giảng dạy, tích cực bồi dưỡng nâng cao năng lực ngoại ngữ và tin học cho học sinh theo các kế hoạch trọng tâm của nhà trường.'
        ],
        legalBasis: 'Kế hoạch thực hiện nhiệm vụ năm học 2026 - 2027.',
        assignment: 'Tập thể Tổ Tiếng Anh - Tin học.'
      }
    ]
  }
];

export async function generateMeetingReplyDocx(outputPath: string): Promise<void> {
  const FONT_NAME = 'Times New Roman';
  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' }
  };

  const children: (Paragraph | Table)[] = [];

  // Header 2 columns (chuẩn Nghị định 30/2020/NĐ-CP)
  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 45, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO ĐỒNG THÁP',
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
                    bold: true,
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: 'Số: 186/TB-THCS-THPT',
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 55, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM',
                    bold: true,
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Độc lập - Tự do - Hạnh phúc',
                    bold: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: 'Tháp Mười, ngày 09 tháng 10 năm 2026',
                    italics: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
  children.push(headerTable);

  // Document Title (In đậm, canh giữa)
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 100 },
      children: [
        new TextRun({
          text: 'THÔNG BÁO KẾT LUẬN',
          bold: true,
          size: 28,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: 'Về việc tiếp thu, giải đáp và chỉ đạo thực hiện ý kiến, kiến nghị',
          bold: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 280 },
      children: [
        new TextRun({
          text: 'của các tổ chuyên môn tại kỳ họp định kỳ lần 3, ngày 08/10/2026',
          bold: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    })
  );

  // Phần Căn cứ pháp lý & Mở đầu
  children.push(
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 120, line: 300 },
      children: [
        new TextRun({
          text: 'Căn cứ Thông tư số 32/2020/TT-BGDĐT ngày 15/9/2020 của Bộ Giáo dục và Đào tạo ban hành Điều lệ trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;',
          italics: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 120, line: 300 },
      children: [
        new TextRun({
          text: 'Căn cứ Kế hoạch thời gian năm học 2026 - 2027 và Kế hoạch giáo dục nhà trường của Trường THCS và THPT Đốc Binh Kiều;',
          italics: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 180, line: 300 },
      children: [
        new TextRun({
          text: 'Căn cứ Biên bản họp định kỳ lần 3 ngày 08/10/2026 của 06 Tổ chuyên môn trong nhà trường;',
          italics: true,
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 240, line: 320 },
      children: [
        new TextRun({
          text: 'Ban Giám hiệu Trường THCS và THPT Đốc Binh Kiều đã tổng hợp đầy đủ các ý kiến, kiến nghị và đề xuất của từng tổ chuyên môn. Nhằm kịp thời tháo gỡ khó khăn, thống nhất quy trình chuyên môn và bảo đảm thực hiện thắng lợi nhiệm vụ năm học, Ban Giám hiệu thông báo kết luận tiếp thu, giải đáp chi tiết theo từng tổ chuyên môn như sau:',
          size: 26,
          font: FONT_NAME
        })
      ]
    })
  );

  // Render từng Tổ từ trên xuống dưới dạng văn bản hành chính kế hoạch (KHÔNG DÙNG BẢNG TO)
  DEPARTMENT_FEEDBACKS_MEETING_3.forEach((dept) => {
    // Tiêu đề Tổ
    children.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 240, after: 140 },
        children: [
          new TextRun({
            text: `${dept.orderRom}. ${dept.deptName}`,
            bold: true,
            size: 27,
            font: FONT_NAME
          })
        ]
      })
    );

    // Từng ý kiến của tổ
    dept.opinions.forEach((op, opIdx) => {
      // Tên ý kiến / Tiêu đề mục
      children.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          indent: { left: 240 },
          spacing: { before: 140, after: 80 },
          children: [
            new TextRun({
              text: `${opIdx + 1}. ${op.title}`,
              bold: true,
              size: 26,
              font: FONT_NAME
            }),
            op.contributor ? new TextRun({
              text: ` (${op.contributor})`,
              italics: true,
              size: 25,
              font: FONT_NAME
            }) : new TextRun({ text: '' })
          ]
        })
      );

      // Nội dung ý kiến của tổ
      children.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          indent: { left: 400 },
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: 'a) Nội dung ý kiến, đề xuất của Tổ:',
              bold: true,
              italics: true,
              size: 26,
              font: FONT_NAME
            })
          ]
        })
      );

      op.opinionContent.forEach((line) => {
        children.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 600 },
            spacing: { after: 60, line: 300 },
            children: [
              new TextRun({
                text: line,
                size: 26,
                font: FONT_NAME
              })
            ]
          })
        );
      });

      // Trả lời của Ban Giám hiệu
      children.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          indent: { left: 400 },
          spacing: { before: 80, after: 60 },
          children: [
            new TextRun({
              text: 'b) ' + op.responseTitle,
              bold: true,
              italics: true,
              size: 26,
              font: FONT_NAME
            })
          ]
        })
      );

      op.responseContent.forEach((line) => {
        children.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 600 },
            spacing: { after: 60, line: 300 },
            children: [
              new TextRun({
                text: line,
                size: 26,
                font: FONT_NAME
              })
            ]
          })
        );
      });

      // Căn cứ pháp lý & phân công nếu có
      if (op.legalBasis || op.assignment) {
        const metaTexts: TextRun[] = [];
        if (op.legalBasis) {
          metaTexts.push(
            new TextRun({
              text: '- Căn cứ: ',
              bold: true,
              size: 25,
              font: FONT_NAME
            }),
            new TextRun({
              text: `${op.legalBasis}  `,
              italics: true,
              size: 25,
              font: FONT_NAME
            })
          );
        }
        if (op.assignment) {
          metaTexts.push(
            new TextRun({
              text: '- Đơn vị thực hiện: ',
              bold: true,
              size: 25,
              font: FONT_NAME
            }),
            new TextRun({
              text: op.assignment,
              size: 25,
              font: FONT_NAME
            })
          );
        }

        children.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 600 },
            spacing: { before: 60, after: 120, line: 300 },
            children: metaTexts
          })
        );
      }
    });
  });

  // Mục Tổ chức thực hiện
  children.push(
    new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 280, after: 140 },
      children: [
        new TextRun({
          text: 'VII. TỔ CHỨC THỰC HIỆN',
          bold: true,
          size: 27,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 100, line: 300 },
      children: [
        new TextRun({
          text: '1. Ban Giám hiệu phân công các đồng chí Phó Hiệu trưởng phụ trách chuyên môn trực tiếp rà soát, bổ sung các nội dung đã thống nhất vào Kế hoạch kiểm tra đánh giá của nhà trường; chỉ đạo văn phòng chuyên môn ban hành phụ lục điều chỉnh gửi về các tổ bộ môn.',
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 100, line: 300 },
      children: [
        new TextRun({
          text: '2. Các đồng chí Tổ trưởng chuyên môn chịu trách nhiệm phổ biến chi tiết toàn bộ nội dung văn bản này đến từng cán bộ, giáo viên, nhân viên trong tổ tại phiên họp chuyên môn gần nhất; tổ chức thực hiện nghiêm túc, đúng tiến độ.',
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 100, line: 300 },
      children: [
        new TextRun({
          text: '3. Bộ phận Kế toán - Văn phòng khẩn trương hoàn thiện hồ sơ rà soát thâm niên nhà giáo của giáo viên theo đúng chỉ đạo tại văn bản này; lập bảng kê chi trả dạy thay, dạy thừa giờ kịp thời, chính xác cho thầy cô giáo.',
          size: 26,
          font: FONT_NAME
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { firstLine: 450 },
      spacing: { after: 240, line: 300 },
      children: [
        new TextRun({
          text: '4. Toàn thể cán bộ, giáo viên, nhân viên nhà trường nêu cao tinh thần trách nhiệm, tăng cường đoàn kết nội bộ, thực hiện tốt kỷ cương nền nếp và văn hóa ứng xử sư phạm, chung tay xây dựng trường học hạnh phúc, hoàn thành xuất sắc nhiệm vụ năm học 2026 - 2027./.',
          size: 26,
          font: FONT_NAME
        })
      ]
    })
  );

  // Footer / Ký tên và Nơi nhận
  const signTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: 'Nơi nhận:',
                    bold: true,
                    italics: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: '- Lãnh đạo trường (để chỉ đạo);',
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: '- 06 Tổ chuyên môn (để thực hiện);',
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: '- Bộ phận VP, Kế toán (để thực hiện);',
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: '- Lưu: VT, BGH.',
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            borders: noBorder,
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'TM. BAN GIÁM HIỆU',
                    bold: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 800 },
                children: [
                  new TextRun({
                    text: 'HIỆU TRƯỞNG',
                    bold: true,
                    size: 24,
                    font: FONT_NAME
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: '(Đã ký và đóng dấu)',
                    italics: true,
                    size: 22,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
  children.push(signTable);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1134,    // 20mm
              bottom: 1134, // 20mm
              left: 1701,   // 30mm
              right: 850    // 15mm
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Trường THCS & THPT Đốc Binh Kiều - Trả lời họp tổ chuyên môn lần 3',
                    size: 18,
                    italics: true,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ['Trang ', PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES],
                    size: 20,
                    font: FONT_NAME
                  })
                ]
              })
            ]
          })
        },
        children
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated DOCX to ${outputPath}`);
}

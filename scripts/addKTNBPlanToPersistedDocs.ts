import * as fs from 'fs';
import * as path from 'path';

const persistedPath = path.join(process.cwd(), 'src', 'data', 'persistedDocuments.json');

const ktnbDoc = {
  id: 'doc-kh-ktnb-2026',
  type: 'plan',
  typeLabel: 'Kế hoạch',
  documentNumber: 'Số: 48/KH-THCS&THPTĐBK',
  title: 'KẾ HOẠCH',
  subTitle: 'Kiểm tra nội bộ năm học 2026 - 2027',
  signDate: 'Tháp Mười, ngày 15 tháng 10 năm 2026',
  createdDate: '2026-10-15',
  issuingAuthorityTop: 'SỞ GDĐT TỈNH ĐỒNG THÁP',
  issuingAuthority: 'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
  signerRole: 'HIỆU TRƯỞNG',
  signerName: 'Lê Thanh Cường',
  sourceDirectiveId: 'directive-3953-ktnb',
  sourceDirective: 'Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 & Công văn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT Đồng Tháp',
  legalBases: [
    'Nghị định số 217/2025/NĐ-CP ngày 05/8/2025 của Chính phủ về hoạt động kiểm tra chuyên ngành;',
    'Quyết định số 2606/QĐ-UBND ngày 13/8/2026 của UBND tỉnh Đồng Tháp về việc sáp nhập thành lập Trường THCS và THPT Đốc Binh Kiều;',
    'Công văn số 3953/SGDĐT-TCCB ngày 08/10/2026 của Sở GDĐT Đồng Tháp V/v thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027;',
    'Công văn số 1134/SGDĐT-TCCB ngày 17/10/2025 của Sở GDĐT Đồng Tháp về hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục;',
    'Kế hoạch giáo dục nhà trường số 34/KH-THCS&THPTĐBK ngày 25/9/2026 của Trường THCS và THPT Đốc Binh Kiều.'
  ],
  sections: [
    {
      heading: 'I. MỤC ĐÍCH, YÊU CẦU',
      content: '1. Mục đích:\n- Đánh giá toàn diện các hoạt động giáo dục, điều kiện dạy và học trong phạm vi quản lý của nhà trường sau khi sáp nhập quản lý 3 điểm trường (Điểm chính THPT, Điểm THCS Đốc Binh Kiều và Điểm Tân Kiều cách 11km) với quy mô 53 lớp, 2.111 học sinh và 120 cán bộ, giáo viên, nhân viên.\n- Giúp Ban Giám hiệu thu thập thông tin khách quan, chính xác để chỉ đạo điều hành khoa học; kịp thời biểu dương những tập thể, cá nhân hoàn thành xuất sắc nhiệm vụ và uốn nắn, khắc phục các hạn chế, sai sót.\n\n2. Yêu cầu:\n- Kiểm tra đúng quy định pháp luật; bảo đảm tính chính xác, khách quan, công khai, dân chủ và kịp thời; không làm cản trở hoạt động giảng dạy bình thường của giáo viên và học sinh.\n- Có trọng tâm, trọng điểm, kết hợp chặt chẽ giữa kiểm tra thường xuyên theo kế hoạch và kiểm tra đột xuất; phân công rõ người, rõ việc, rõ thẩm quyền và thời hạn giải quyết.'
    },
    {
      heading: 'II. NỘI DUNG VÀ NHIỆM VỤ KIỂM TRA TRỌNG TÂM',
      content: '1. Kiểm tra việc thực hiện nhiệm vụ của Ban Giám hiệu:\n- Việc thực hiện Quy chế dân chủ ở cơ sở; xây dựng và công khai chiến lược phát triển;\n- Quản lý tài chính, ngân sách, các khoản thu hộ - chi hộ, kinh phí hoạt động Ban đại diện CMHS theo Thông tư 55/2011/TT-BGDĐT;\n- Quản lý cơ sở vật chất, an toàn trường học, PCCC, phòng chống tham nhũng, lãng phí và tiếp công dân.\n\n2. Kiểm tra hoạt động sư phạm của giáo viên:\n- Kiểm tra việc chấp hành quy chế chuyên môn: kế hoạch bài dạy theo CV 5512, dự giờ tiết dạy phát triển năng lực học sinh;\n- Đổi mới phương pháp và kiểm tra đánh giá thường xuyên, định kỳ theo Thông tư 22/2021/TT-BGDĐT;\n- Chấp hành nghiêm quy định cấm dạy thêm, học thêm trái phép; đạo đức nhà giáo và văn hóa công vụ.\n\n3. Kiểm tra hoạt động của 06 Tổ chuyên môn và bộ phận phục vụ:\n- Nền nếp sinh hoạt chuyên môn 2 tuần/lần; hồ sơ quản lý của Tổ trưởng; việc bồi dưỡng HSG và phụ đạo HS yếu;\n- Công tác văn thư lưu trữ hồ sơ theo Nghị định 30/2020/NĐ-CP và Thông tư 08/2025/TT-BGDĐT;\n- Quản lý và khai thác thiết bị dạy học, phòng thí nghiệm thực hành Lý - Hóa - Sinh và thư viện tại 3 điểm trường.\n\n4. Quản lý chất lượng giáo dục, chuyển đổi số và giáo dục hòa nhập:\n- Công tác ra đề, coi, chấm thi định kỳ; vận hành CSDL ngành Đúng - Đủ - Sạch - Sống; số hóa học bạ điện tử;\n- Thực hiện Kế hoạch giáo dục hòa nhập cho 25 học sinh khuyết tật theo Công văn số 3326/SGDĐT-GDTrH-TX&CN.'
    },
    {
      heading: 'III. DANH MỤC 14 CUỘC KIỂM TRA TRONG NĂM HỌC 2026 - 2027',
      content: '| TT | Nội dung kiểm tra | Đối tượng & Điểm trường | Thời gian | Hình thức | Người phụ trách |\n| :---: | :--- | :--- | :---: | :---: | :--- |\n| 1 | Kiểm tra công tác quản lý đầu năm học, nền nếp học sinh và kế hoạch giáo dục của các tổ chuyên môn | 06 Tổ chuyên môn, Đoàn Đội (Cả 3 điểm trường) | Tháng 10/2026 | Toàn diện | Nguyễn Minh Trí (PHT) |\n| 2 | Kiểm tra công tác quản lý tài chính, thu nộp đầu năm, vận động tài trợ và quỹ Ban đại diện CMHS | Bộ phận Tài chính, Thủ quỹ, BĐD CMHS (Điểm chính) | Tháng 10/2026 | Chuyên đề | Lê Thanh Cường (HT) |\n| 3 | Kiểm tra chuyên đề thực hiện CT GDPT 2018 và CSVC tại Điểm trường Tân Kiều (cách 11km) | Cán bộ, GV và học sinh THCS Điểm Tân Kiều | Tháng 11/2026 | Chuyên đề | Trần Minh Hậu (PHT) |\n| 4 | Kiểm tra hoạt động sư phạm của nhà giáo (Đợt 1: 06 giáo viên cấp THCS và THPT) | 06 GV các tổ Toán-Tin, Văn, KHTN, Tiếng Anh | Tháng 11/2026 | Toàn diện | Nguyễn Minh Trí (PHT) |\n| 5 | Kiểm tra công tác thiết bị dạy học, phòng thí nghiệm thực hành và Thư viện tại 3 điểm trường | Cán bộ thiết bị, thư viện, phòng bộ môn (3 điểm trường) | Tháng 12/2026 | Chuyên đề | Trần Minh Hậu (PHT) |\n| 6 | Kiểm tra công tác tổ chức kiểm tra, đánh giá cuối học kỳ I năm học 2026 - 2027 | Tổ ra đề, Ban coi chấm thi, các tổ bộ môn (Toàn trường) | Tháng 12/2026 | Toàn diện | Nguyễn Minh Trí (PHT) |\n| 7 | Kiểm tra công tác chuyển đổi số, an toàn thông tin và CSDL ngành Đúng - Đủ - Sạch - Sống | Bộ phận CNTT, văn thư số, GVCN 53 lớp | Tháng 01/2027 | Chuyên đề | Lê Thanh Cường (HT) |\n| 8 | Sơ kết công tác KTNB học kỳ I và hoàn tất báo cáo gửi Sở GDĐT (hạn trước 20/01/2027) | Toàn thể Ban KTNB và các tổ chuyên môn | Tháng 01/2027 | Toàn diện | Lê Thanh Cường (HT) |\n| 9 | Kiểm tra việc chấp hành quy định về dạy thêm, học thêm trong và ngoài nhà trường | Toàn thể giáo viên trong trường (3 điểm trường) | Tháng 02/2027 | Chuyên đề | Lê Thanh Cường (HT) |\n| 10 | Kiểm tra công tác giáo dục hòa nhập 25 HS khuyết tật (CV 3326) và tư vấn tâm lý học đường | GVCN có HS khuyết tật, Tổ tư vấn tâm lý (3 điểm trường) | Tháng 03/2027 | Chuyên đề | Trần Minh Hậu (PHT) |\n| 11 | Kiểm tra hoạt động sư phạm của nhà giáo (Đợt 2: 08 giáo viên cấp THCS và THPT) | 08 GV các tổ KHXH, GDTC, Toán-Tin, Văn (3 điểm trường) | Tháng 03/2027 | Toàn diện | Nguyễn Minh Trí (PHT) |\n| 12 | Kiểm tra công tác ôn tập thi tốt nghiệp THPT năm 2027 (K12) và ôn thi tuyển sinh lớp 10 (K9) | Tổ trưởng và các GV dạy ôn thi Khối 9, 12 (Toàn trường) | Tháng 04/2027 | Chuyên đề | Nguyễn Minh Trí (PHT) |\n| 13 | Kiểm tra an toàn trường học, PCCC, y tế học đường và vệ sinh môi trường tại 3 điểm trường | Bộ phận Y tế, Bảo vệ, Phục vụ vệ sinh (3 điểm trường) | Tháng 04/2027 | Chuyên đề | Trần Minh Hậu (PHT) |\n| 14 | Kiểm tra đánh giá xếp loại HS cuối năm, quản lý học bạ, hồ sơ tốt nghiệp và tổng kết KTNB | Tổ Văn thư, GVCN 53 lớp, Ban KTNB (hạn nộp 18/05/2027) | Tháng 05/2027 | Toàn diện | Lê Thanh Cường (HT) |'
    },
    {
      heading: 'IV. TỔ CHỨC THỰC HIỆN VÀ CHẾ ĐỘ THÔNG TIN BÁO CÁO',
      content: '1. Ban Kiểm tra nội bộ:\n- Hoạt động theo sự chỉ đạo trực tiếp của Hiệu trưởng; thành lập các tổ kiểm tra cho từng đợt, xây dựng Kế hoạch tiến hành kiểm tra (Mẫu 03), lập Biên bản kiểm tra (Mẫu 04), Báo cáo kết quả kiểm tra (Mẫu 05) trình Hiệu trưởng ban hành Thông báo kết quả kiểm tra (Mẫu 06).\n\n2. Lưu trữ hồ sơ:\n- Bộ phận Văn thư nhà trường chịu trách nhiệm tiếp nhận và lập danh mục lưu trữ hồ sơ của từng cuộc kiểm tra theo quy định tại Nghị định 30/2020/NĐ-CP và Thông tư số 08/2025/TT-BGDĐT.\n\n3. Chế độ thông tin, báo cáo Sở GDĐT (qua Phòng Tổ chức cán bộ):\n- Gửi Kế hoạch kiểm tra nội bộ và Quyết định thành lập Ban kiểm tra nội bộ: trước ngày 31 tháng 10 năm 2026.\n- Gửi Báo cáo sơ kết công tác kiểm tra nội bộ học kỳ I: trước ngày 20 tháng 01 năm 2027.\n- Gửi Báo cáo tổng kết công tác kiểm tra nội bộ năm học và kết quả tự đánh giá chấm điểm thi đua: trước ngày 18 tháng 5 năm 2027.\n- Địa chỉ tiếp nhận: Phòng Tổ chức cán bộ Sở GDĐT (email: tochuccanbo@dongthap.edu.vn; công chức phụ trách ông Lê Thanh Phong, ĐT: 094.333.4774).'
    }
  ],
  recipients: [
    'Sở GDĐT Đồng Tháp (Phòng TCCB) (b/c);',
    'Ban Giám hiệu nhà trường (chỉ đạo);',
    'Ban Kiểm tra nội bộ (thực hiện);',
    '06 Tổ chuyên môn, Tổ Văn phòng (thực hiện);',
    'Ban TTND, CĐCS, Đoàn Đội (phối hợp);',
    'Website nhà trường (công khai);',
    'Lưu: VT, Ban KTNB.'
  ],
  status: 'official',
  updatedAt: new Date().toISOString()
};

let docs: any[] = [];
if (fs.existsSync(persistedPath)) {
  docs = JSON.parse(fs.readFileSync(persistedPath, 'utf8'));
}

// Remove old if exists
docs = docs.filter((d) => d.id !== 'doc-kh-ktnb-2026');

// Insert after doc-kh-ktgk1-2026
docs.splice(1, 0, ktnbDoc);

fs.writeFileSync(persistedPath, JSON.stringify(docs, null, 2), 'utf8');
console.log('Added doc-kh-ktnb-2026 to persistedDocuments.json! Total:', docs.length);

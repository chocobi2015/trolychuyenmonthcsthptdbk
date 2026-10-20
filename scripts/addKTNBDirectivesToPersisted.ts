import * as fs from 'fs';
import * as path from 'path';

const persistedPath = path.join(process.cwd(), 'src', 'data', 'persistedDirectives.json');

// Read extracted text
const cv3953Text = `UBND TỈNH ĐỒNG THÁP
SỞ GIÁO DỤC VÀ ĐÀO TẠO

CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

Số: 3953 /SGDĐT-TCCB
Đồng Tháp, ngày 08 tháng 10 năm 2026

V/v thực hiện công tác kiểm tra nội bộ tại đơn vị

Kính gửi:
- Ủy ban nhân dân các xã, phường;
- Thủ trưởng các đơn vị trực thuộc Sở.

Căn cứ Công văn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở Giáo dục và Đào tạo (Sở GDĐT) về việc hướng dẫn thực hiện công tác kiểm tra nội bộ (KTNB) năm học 2025 - 2026, để công tác KTNB tại các đơn vị đi vào nền nếp, ổn định, Sở GDĐT đề nghị các đơn vị trực thuộc Sở GDĐT và Ủy ban nhân dân (UBND) các xã, phường tổ chức triển khai thực hiện, tăng cường công tác quản lý, trong đó lưu ý thực hiện đúng trách nhiệm theo quy định, tập trung các nội dung sau:

1. Năm học 2026 - 2027, UBND các xã, phường và Thủ trưởng các đơn vị trực thuộc Sở GDĐT tiếp tục thực hiện công tác KTNB theo Công văn hướng dẫn số 1134/SGDĐT-TCCB ngày 17 tháng 10 năm 2025 của Sở GDĐT về việc hướng dẫn thực hiện công tác KTNB năm học 2025 - 2026.

2. UBND các xã, phường tiếp tục triển khai, xây dựng hướng dẫn nội dung KTNB có trọng tâm, trọng điểm, bám sát Công văn hướng dẫn số 1134/SGDĐT-TCCB; rà soát và lựa chọn những nội dung mà các đơn vị trường trên địa bàn còn hạn chế để tổ chức kiểm tra phù hợp, tập trung khắc phục các hạn chế, thiếu sót, vướng mắc của đơn vị.

3. Thủ trưởng các đơn vị trực thuộc Sở GDĐT tổ chức quán triệt, phổ biến đầy đủ các nội dung; căn cứ nhiệm vụ năm học và điều kiện thực tế của nhà trường, xây dựng kế hoạch kiểm tra nội bộ bảo đảm chủ động, linh hoạt; lựa chọn nội dung kiểm tra trong số các nội dung của Công văn hướng dẫn số 1134/SGDĐT-TCCB phù hợp với tình hình của đơn vị.

4. Chế độ thông tin, báo cáo
Thủ trưởng các đơn vị trực thuộc Sở GDĐT báo cáo trực tiếp về Sở GDĐT.
UBND các xã, phường nhận báo cáo công tác KTNB từ các đơn vị Trường trên địa bàn thuộc thẩm quyền quản lý, tổng hợp nội dung kiểm tra và báo cáo về Sở GDĐT.

Hồ sơ liên quan công tác kiểm tra nội bộ về Sở GDĐT (qua Phòng Tổ chức cán bộ) gồm:
- Kế hoạch kiểm tra nội bộ và Quyết định thành lập Ban kiểm tra nội bộ trước ngày 31 tháng 10 hằng năm.
- Báo cáo sơ kết công tác kiểm tra nội bộ học kỳ I trước ngày 20 tháng 01 hằng năm.
- Báo cáo tổng kết công tác kiểm tra nội bộ năm học và kết quả tự đánh giá chấm điểm thi đua trước ngày 18 tháng 5 hằng năm.
- Gửi trực tiếp về Sở GDĐT (qua Phòng Tổ chức cán bộ). Thực hiện báo cáo đột xuất khi có vấn đề phức tạp hoặc khi được đề nghị.

Sở GDĐT đề nghị các đơn vị trực thuộc Sở GDĐT và UBND các xã, phường tổ chức triển khai thực hiện Công văn này. Trong quá trình thực hiện, nếu có khó khăn, vướng mắc, đề nghị các đơn vị kịp thời liên hệ Sở GDĐT (qua Phòng Tổ chức cán bộ, email: tochuccanbo@dongthap.edu.vn) hoặc công chức phụ trách công tác kiểm tra của Sở GDĐT, ông Lê Thanh Phong, số điện thoại 094.333.4774, để được trao đổi, hướng dẫn thực hiện./.

Nơi nhận:
- Như trên (thực hiện);
- Giám đốc, Phó Giám đốc (theo dõi);
- Trường TH, THCS và THPT Tương Lai (thực hiện);
- Trường THPT tư thục Ấp Bắc (thực hiện);
- Lưu: VT, TCCB. (LTP06b).

KT. GIÁM ĐỐC
PHÓ GIÁM ĐỐC
Võ Văn Hiếu`;

let hd1134Text = '';
try {
  const body = fs.readFileSync('temp_1134_body.txt', 'utf8');
  const app = fs.readFileSync('temp_1134_appendix.txt', 'utf8');
  hd1134Text = body + '\n\n' + app;
} catch (e) {
  hd1134Text = 'Toàn văn Hướng dẫn số 1134/SGDĐT-TCCB của Sở Giáo dục và Đào tạo Đồng Tháp.';
}

const dir3953 = {
  id: 'directive-3953-ktnb',
  documentNumber: 'Số: 3953/SGDĐT-TCCB',
  title: 'Công văn V/v thực hiện công tác kiểm tra nội bộ tại đơn vị năm học 2026 - 2027',
  issuingAuthority: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP',
  signDate: 'Đồng Tháp, ngày 08 tháng 10 năm 2026',
  signer: 'KT. GIÁM ĐỐC - PHÓ GIÁM ĐỐC Võ Văn Hiếu',
  topic: 'Kiểm tra nội bộ',
  createdDate: '2026-10-08T00:00:00.000Z',
  fileSize: '187 KB (Bản scan PDF có ký số của Sở GDĐT)',
  summary: 'Chỉ đạo của Sở GDĐT Đồng Tháp: Năm học 2026 - 2027 tiếp tục thực hiện công tác kiểm tra nội bộ bám sát Công văn hướng dẫn số 1134/SGDĐT-TCCB ngày 17/10/2025; Thủ trưởng cơ sở giáo dục chủ động xây dựng Kế hoạch KTNB phù hợp đặc điểm nhà trường, phân công Ban KTNB; thực hiện nghiêm 3 mốc thời hạn báo cáo gửi Sở GDĐT (qua Phòng TCCB: trước 31/10 gửi Kế hoạch + Quyết định Ban KTNB; trước 20/01 gửi Báo cáo sơ kết HK1; trước 18/05 gửi Báo cáo tổng kết và Tự chấm điểm thi đua).',
  fileName: '3953_CV_THUC_HIEN_CONG_TAC_KIEM_TRA_NOI_BO_2026_2027.pdf',
  linkedSchoolDocumentIds: ['doc-kh-ktnb-2026'],
  fullContent: cv3953Text
};

const dir1134 = {
  id: 'directive-1134-ktnb',
  documentNumber: 'Số: 1134/SGDĐT-TCCB',
  title: 'Hướng dẫn thực hiện công tác kiểm tra nội bộ tại các cơ sở giáo dục',
  issuingAuthority: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP',
  signDate: 'Đồng Tháp, ngày 17 tháng 10 năm 2025',
  signer: 'GIÁM ĐỐC Lê Quang Trí',
  topic: 'Kiểm tra nội bộ',
  createdDate: '2025-10-17T00:00:00.000Z',
  fileSize: '966 KB (Toàn văn 20 trang & Trọn bộ 06 Biểu mẫu nghiệp vụ Phụ lục)',
  summary: 'Hướng dẫn toàn diện của Sở GDĐT Đồng Tháp về công tác kiểm tra nội bộ: Mục đích, yêu cầu; 4 nhóm nội dung kiểm tra trọng tâm (Thủ trưởng đơn vị, hoạt động sư phạm nhà giáo, tổ chuyên môn & bộ phận phục vụ, quản lý chất lượng); thẩm quyền thành lập Ban KTNB; quy trình kiểm tra 3 bước (chuẩn bị, tiến hành, kết thúc); xử lý sau kiểm tra; quy cách lưu trữ hồ sơ theo NĐ 30/2020 và TT 08/2025; trọn bộ 06 biểu mẫu chuẩn nghiệp vụ hành chính.',
  fileName: '1134_HD_KIEM_TRA_NOI_BO_2025_2026_SGDDT_DONG_THAP.pdf',
  linkedSchoolDocumentIds: ['doc-kh-ktnb-2026'],
  fullContent: hd1134Text
};

let directives: any[] = [];
if (fs.existsSync(persistedPath)) {
  directives = JSON.parse(fs.readFileSync(persistedPath, 'utf8'));
}

// Remove old duplicates if any
directives = directives.filter((d) => d.id !== 'directive-3953-ktnb' && d.id !== 'directive-1134-ktnb');

// Insert at top of directives
directives.unshift(dir1134);
directives.unshift(dir3953);

fs.writeFileSync(persistedPath, JSON.stringify(directives, null, 2), 'utf8');
console.log('Successfully updated persistedDirectives.json with both KTNB directives! Total:', directives.length);

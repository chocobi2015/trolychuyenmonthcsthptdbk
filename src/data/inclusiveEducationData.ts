import { SchoolDocument, DepartmentDirective } from '../types/document';

/**
 * Dữ liệu Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở GDĐT Đồng Tháp
 * V/v hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh khuyết tật
 */
export const DIRECTIVE_3326_GDHN: DepartmentDirective = {
  id: 'directive-3326-gdhn',
  documentNumber: 'Số: 3326/SGDĐT-GDPT',
  title: 'Hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh khuyết tật tại các cơ sở giáo dục mầm non, phổ thông',
  topic: 'Giáo dục hòa nhập',
  issuingAuthority: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP',
  signDate: 'Đồng Tháp, ngày 27 tháng 8 năm 2026',
  signer: 'KT. GIÁM ĐỐC - PHÓ GIÁM ĐỐC Nguyễn Phương Toàn',
  summary: 'Hướng dẫn toàn diện của Sở GDĐT Đồng Tháp về công tác giáo dục hòa nhập học sinh khuyết tật: huy động tiếp nhận, bố trí tối đa không quá 02 HSKT/lớp, bắt buộc lập Kế hoạch giáo dục cá nhân (KHGDCN), cho phép điều chỉnh/miễn giảm môn học theo TTLT 42/2013, kiểm tra đánh giá theo KHGDCN, quy định hồ sơ tinh gọn không lập sổ sách riêng trùng lặp, chế độ chính sách cho học sinh và giáo viên dạy hòa nhập.',
  fileName: 'CV 3326-HD GIAO DUC HOA NHAP HSKT-GDPT.pdf',
  fileSize: '1.8 MB (Bản ký số điện tử của Sở GDĐT)',
  createdDate: '2026-08-27T00:00:00.000Z',
  linkedSchoolDocumentIds: ['doc-kh-gdhn-15'],
  fullContent: `UBND TỈNH ĐỒNG THÁP                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
SỞ GIÁO DỤC VÀ ĐÀO TẠO                        Độc lập - Tự do - Hạnh phúc
Số: 3326/SGDĐT-GDPT                    Đồng Tháp, ngày 27 tháng 8 năm 2026

V/v hướng dẫn công tác giáo dục
hòa nhập đối với trẻ em, học sinh
khuyết tật tại các cơ sở giáo dục
mầm non, phổ thông

Kính gửi:
- Uỷ ban nhân dân các xã, phường;
- Thủ trưởng các đơn vị trực thuộc Sở.

Căn cứ Luật số 51/2010/QH12 của Quốc hội về Luật Người khuyết tật;
Căn cứ Thông tư số 03/2018/TT-BGDĐT ngày 29 tháng 01 năm 2018 của Bộ Giáo dục và Đào tạo (GDĐT) quy định về giáo dục hòa nhập đối với người khuyết tật;
Căn cứ Thông tư số 15/2026/TT-BGDĐT ngày 24 tháng 3 năm 2026 của Bộ GDĐT ban hành Điều lệ trường tiểu học, trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học;
Căn cứ các quy định hiện hành về phân quyền, phân cấp, phân định thẩm quyền trong lĩnh vực giáo dục phổ thông;

Sở GDĐT hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh (gọi chung là học sinh) khuyết tật tại các cơ sở giáo dục mầm non, phổ thông như sau:

I. MỤC ĐÍCH, YÊU CẦU
1. Đảm bảo học sinh khuyết tật (HSKT) được thực hiện quyền học tập bình đẳng, được tôn trọng, hỗ trợ và tham gia các hoạt động giáo dục phù hợp; thực hiện đầy đủ quyền, chính sách về giáo dục theo quy định.
2. Thực hiện tốt công tác rà soát, thống kê, nắm thông tin số trẻ khuyết tật trên địa bàn, nhằm kịp thời tư vấn cho gia đình có biện pháp can thiệp sớm, đưa trẻ khuyết tật đến trường học hòa nhập.
3. Tổ chức giáo dục trên cơ sở khả năng, nhu cầu và tình trạng khuyết tật đã được xác định của từng học sinh; điều chỉnh hoạt động dạy học, hỗ trợ và đánh giá nhằm phát huy khả năng, sự tiến bộ và mức độ tham gia của HSKT.
4. Đảm bảo công tác giáo dục hòa nhập được thực hiện thống nhất, thực chất và phù hợp với điều kiện của cơ sở giáo dục; đảm bảo khả năng tiếp cận giáo dục, môi trường học tập an toàn, thân thiện và không kỳ thị, phân biệt đối xử; xác định rõ trách nhiệm của người đứng đầu, giáo viên và các lực lượng phối hợp trong tổ chức giáo dục, hỗ trợ và theo dõi sự tiến bộ của HSKT.

II. NỘI DUNG HƯỚNG DẪN
1. Huy động, tiếp nhận, rà soát và bố trí học sinh
a) Các cơ sở giáo dục phối hợp với Uỷ ban nhân dân cấp xã nắm chắc số học sinh trong độ tuổi đi học, đặc biệt trong đó có trẻ khuyết tật để có biện pháp huy động trẻ khuyết tật trong độ tuổi tham gia giáo dục hòa nhập.
b) Việc tiếp nhận, nhập học, tuyển sinh đối với HSKT thực hiện theo quy định hiện hành của từng cấp học; không đặt thêm điều kiện ngoài quy định.
c) Trường hợp học sinh có biểu hiện khó khăn nghi do khuyết tật nhưng chưa có giấy xác nhận khuyết tật, cơ sở giáo dục không tự xác định dạng khuyết tật hoặc mức độ khuyết tật; tiếp tục đảm bảo việc học theo quy định chung, trao đổi với cha mẹ/người đại diện và hướng dẫn thực hiện thủ tục xác định mức độ khuyết tật theo quy định hiện hành. Khi cơ quan có thẩm quyền đề nghị, cơ sở giáo dục cung cấp thông tin về khó khăn trong học tập, sinh hoạt, giao tiếp của học sinh theo quy định.
d) Người đứng đầu cơ sở giáo dục sắp xếp, bố trí các lớp học phù hợp với HSKT, đảm bảo mỗi lớp học hòa nhập có không quá 02 (hai) HSKT. Trường hợp đặc biệt, căn cứ điều kiện thực tế, người đứng đầu cơ sở giáo dục có thể bố trí thêm để HSKT có nhu cầu học hòa nhập được đi học. Quy định về số lượng HSKT trong lớp không được vận dụng thành điều kiện từ chối tiếp nhận HSKT học hòa nhập.

2. Kế hoạch giáo dục cá nhân (KHGDCN)
a) Mỗi HSKT học hòa nhập có kế hoạch giáo dục cá nhân (KHGDCN). Giáo viên được phân công chủ trì, phối hợp với cha mẹ/người đại diện, nhân viên hỗ trợ giáo dục người khuyết tật (nếu được bố trí) và các lực lượng có liên quan để xây dựng, thực hiện KHGDCN trên cơ sở khả năng, nhu cầu của học sinh, chương trình giáo dục và điều kiện thực tế của cơ sở giáo dục.
b) KHGDCN gồm các thông tin về: Khả năng, nhu cầu và đặc điểm cá nhân; mục tiêu năm học và mục tiêu học kỳ; thời gian, nội dung, biện pháp, người thực hiện; kết quả đánh giá và nội dung điều chỉnh sau đánh giá.
(KHGDCN (tham khảo) tại Phụ lục đính kèm Công văn)

3. Tổ chức thực hiện chương trình và hoạt động giáo dục
a) Cơ sở giáo dục tổ chức giáo dục HSKT học hòa nhập theo chương trình giáo dục hiện hành của cấp học; căn cứ khả năng, nhu cầu của học sinh và mục tiêu trong KHGDCN để lựa chọn nội dung hỗ trợ, phương pháp, hình thức tổ chức, học liệu, phương tiện và điều kiện tham gia phù hợp.
b) Trường hợp HSKT không có khả năng đáp ứng yêu cầu của chương trình giáo dục chung, người đứng đầu cơ sở giáo dục quyết định điều chỉnh, miễn, giảm, thay thế một số nội dung môn học, hoạt động giáo dục cho phù hợp theo Điều 3 Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC và phải thể hiện trong KHGDCN.
c) Khi cần hỗ trợ riêng trong một bài học hoặc hoạt động giáo dục, giáo viên thể hiện nội dung hỗ trợ cần thiết trong kế hoạch bài dạy/kế hoạch chuyên môn đang sử dụng, không yêu cầu lập một kế hoạch bài dạy riêng cho lớp có HSKT.
d) Tạo điều kiện để HSKT tham gia các hoạt động giáo dục phù hợp; phát huy khả năng, sở trường, kỹ năng xã hội, kỹ năng tự phục vụ và kỹ năng đặc thù khi có nhu cầu.

4. Kiểm tra, đánh giá; xét lên lớp và hoàn thành chương trình
a) Việc theo dõi, đánh giá HSKT học hòa nhập thực hiện theo chương trình giáo dục và quy định hiện hành của từng cấp học; đảm bảo phù hợp với khả năng, nhu cầu của từng học sinh, chú trọng động viên, khuyến khích sự nỗ lực và tiến bộ trong quá trình giáo dục.
b) Đối với giáo dục mầm non: Việc theo dõi, đánh giá sự phát triển của trẻ khuyết tật thực hiện theo Chương trình giáo dục mầm non và các quy định hiện hành...
c) Đối với giáo dục phổ thông:
- Đối với môn học, hoạt động giáo dục mà HSKT có khả năng đáp ứng yêu cầu của chương trình giáo dục chung, việc kiểm tra, đánh giá thực hiện theo quy định của cấp học và các quy định hiện hành có liên quan.
- Đối với môn học, hoạt động giáo dục hoặc nội dung mà học sinh không có khả năng đáp ứng yêu cầu của chương trình giáo dục chung, việc đánh giá căn cứ kết quả thực hiện KHGDCN theo quy định. Không kiểm tra, đánh giá những nội dung môn học hoặc hoạt động giáo dục đã được miễn theo quyết định của người có thẩm quyền.
- Kết quả đánh giá được sử dụng để điều chỉnh hoạt động dạy học, hỗ trợ và KHGDCN khi cần thiết.
d) Đối với giáo dục phổ thông, việc xét lên lớp, hoàn thành chương trình lớp học, chương trình cấp học và công nhận kết quả học tập thực hiện theo quy định hiện hành của cấp học. Trường hợp HSKT không đáp ứng chương trình giáo dục chung, việc xem xét kết quả thực hiện KHGDCN thực hiện theo quy định về chính sách giáo dục đối với người khuyết tật; không đặt thêm tiêu chí, hồ sơ hoặc thủ tục riêng đối với học sinh.

5. Hồ sơ và quản lý thông tin
a) Hồ sơ của HSKT học hòa nhập thực hiện theo khoản 2 Điều 8 Thông tư số 03/2018/TT-BGDĐT, gồm hồ sơ theo quy định của cấp học, giấy xác nhận khuyết tật do cơ quan có thẩm quyền cấp và KHGDCN.
b) Cơ sở giáo dục sử dụng hồ sơ học sinh hiện có; không lập thêm một bộ hồ sơ giáo dục hòa nhập trùng lặp. Công văn này không yêu cầu lập riêng sổ theo dõi HSKT, sao chép lại giấy tờ đã có hoặc tập hợp toàn bộ bài kiểm tra thành hồ sơ riêng, trừ trường hợp có quy định khác hoặc cần thiết để thực hiện quyền, chính sách và hỗ trợ trực tiếp cho HSKT.
c) Khi học sinh chuyển lớp, chuyển trường hoặc chuyển cấp, cơ sở giáo dục bàn giao KHGDCN và thông tin cần thiết theo quy định hiện hành để đảm bảo tính liên tục của việc hỗ trợ; việc quản lý, sử dụng thông tin đúng mục đích và quyền riêng tư của học sinh.

6. Chế độ, chính sách
a) Học sinh: Việc thực hiện chính sách về học phí, học bổng, phương tiện, đồ dùng học tập và các chính sách giáo dục khác đối với người khuyết tật thực hiện theo đối tượng, điều kiện, trình tự, thủ tục của quy định hiện hành.
b) Giáo viên: Chế độ đối với nhà giáo trực tiếp giảng dạy người khuyết tật theo phương thức giáo dục hòa nhập thực hiện theo quy định hiện hành (Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC).

III. TỔ CHỨC THỰC HIỆN
1. Sở Giáo dục và Đào tạo: Hướng dẫn chuyên môn; tổ chức hoặc phối hợp bồi dưỡng nghiệp vụ GD hòa nhập; phối hợp với UBND cấp xã theo dõi kiểm tra.
2. Đề nghị Uỷ ban nhân dân các xã, phường: Tổ chức triển khai, rà soát, huy động trẻ khuyết tật đến trường; thực hiện trách nhiệm xác định mức độ khuyết tật.
3. Các cơ sở giáo dục mầm non, phổ thông:
a) Người đứng đầu chịu trách nhiệm tổ chức giáo dục hòa nhập; bố trí lớp, phân công giáo viên; chỉ đạo xây dựng, thực hiện, rà soát KHGDCN; quyết định các nội dung thuộc thẩm quyền theo quy định.
b) Giáo viên được phân công thực hiện KHGDCN, tổ chức dạy học và theo dõi, đánh giá; phối hợp cha mẹ/người đại diện, nhân viên hỗ trợ đảm bảo hỗ trợ liên tục, thiết thực.
c) Quản lý hồ sơ, bảo mật thông tin; thực hiện chế độ báo cáo theo quy định.

Nơi nhận:
- Như trên;
- Giám đốc, các Phó Giám đốc Sở (để báo cáo);
- Lưu: VT, GDPT (ND).

KT. GIÁM ĐỐC
PHÓ GIÁM ĐỐC
Nguyễn Phương Toàn`
};

/**
 * Công văn số 3408/SGDĐT-GDPT ngày 04/9/2026 của Sở GDĐT Đồng Tháp
 * V/v thống kê và đăng ký nhu cầu hỗ trợ giáo dục hòa nhập năm học 2026 - 2027
 */
export const DIRECTIVE_3408_GDHN: DepartmentDirective = {
  id: 'directive-3408-gdhn',
  documentNumber: 'Số: 3408/SGDĐT-GDPT',
  title: 'Thống kê và đăng ký nhu cầu hỗ trợ giáo dục hòa nhập năm học 2026 - 2027',
  topic: 'Giáo dục hòa nhập',
  issuingAuthority: 'SỞ GDĐT TỈNH ĐỒNG THÁP',
  signDate: 'Đồng Tháp, ngày 04 tháng 9 năm 2026',
  signer: 'KT. GIÁM ĐỐC - PHÓ GIÁM ĐỐC Huỳnh Thanh Hùng',
  summary: 'Yêu cầu các cơ sở giáo dục phổ thông thống kê chính xác số lượng học sinh khuyết tật đang theo học tại từng điểm trường (mã định danh, lớp, dạng tật, mức độ, tình trạng bỏ học, địa chỉ gia đình) và đăng ký nhu cầu hỗ trợ giáo dục hòa nhập năm học 2026 - 2027.',
  fullContent: `UBND TỈNH ĐỒNG THÁP
SỞ GIÁO DỤC VÀ ĐÀO TẠO
Số: 3408/SGDĐT-GDPT
V/v thống kê và đăng ký nhu cầu hỗ trợ giáo dục hòa nhập năm học 2026 - 2027

CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
Đồng Tháp, ngày 04 tháng 9 năm 2026

Kính gửi: Các trường THPT, trường THCS-THPT trên địa bàn tỉnh Đồng Tháp.

Nhằm chuẩn bị tốt các điều kiện hỗ trợ chuyên môn, tập huấn giáo viên và trang cấp phương tiện hỗ trợ cho học sinh khuyết tật học hòa nhập năm học 2026 - 2027; Sở Giáo dục và Đào tạo yêu cầu các đơn vị:
1. Rà soát, lập danh sách thống kê toàn bộ học sinh khuyết tật học hòa nhập tại cơ sở giáo dục (bao gồm các điểm trường nhánh, phân hiệu).
2. Hoàn thành Biểu mẫu Phụ lục gồm:
   - Phần I: Thống kê số lượng học sinh khuyết tật (Họ tên, mã định danh, năm sinh, giới tính, dạng tật, mức độ, lớp, điểm trường, địa chỉ, số điện thoại).
   - Phần II: Đăng ký nhu cầu hỗ trợ giáo dục hòa nhập (Tập huấn chuyên môn, đánh giá phân loại nhu cầu, xây dựng KHGDCN, rèn luyện kỹ năng đặc thù, tư vấn hỗ trợ CSGD và gia đình).
3. Báo cáo bằng văn bản về Sở GDĐT (qua Phòng GDPT) trước ngày 10/9/2026.

KT. GIÁM ĐỐC - PHÓ GIÁM ĐỐC Huỳnh Thanh Hùng (đã ký)`,
  createdDate: '2026-09-04T08:00:00Z',
  fileName: 'cv_3408_sgddt_thong_ke_nhu_cau_gdhn.pdf',
  fileSize: '1.2 MB',
  linkedSchoolDocumentIds: ['doc-kh-gdhn-15']
};

/**
 * Đăng ký 7 nhu cầu hỗ trợ GDHN theo Công văn số 3408/SGDĐT-GDPT
 */
export const INCLUSIVE_DEMAND_SURVEY = [
  {
    stt: 1,
    content: 'Phát hiện sớm và can thiệp giáo dục sớm (bậc học THCS/THPT không chọn)',
    urgencyLevel: 'Không chọn (Cấp THCS/THPT)',
    schoolNote: 'Thuộc thẩm quyền cấp Mầm non và Tiểu học theo hướng dẫn Sở GDĐT.'
  },
  {
    stt: 2,
    content: 'Tập huấn, bồi dưỡng chuyên môn về GDHN cho giáo viên giảng dạy',
    urgencyLevel: '(1) - Rất cấp thiết',
    schoolNote: 'Cần thiết bồi dưỡng phương pháp dạy học hòa nhập cho giáo viên tại Điểm Tân Kiều (12 HSKT) và Điểm Đốc Binh Kiều (10 HSKT).'
  },
  {
    stt: 3,
    content: 'Đánh giá, xác định khả năng và phân loại nhu cầu giáo dục đối với HSKT',
    urgencyLevel: '(2) - Cấp thiết',
    schoolNote: 'Hỗ trợ công cụ đánh giá tâm lý, nhận thức cho học sinh khuyết tật trí tuệ và khuyết tật tâm thần.'
  },
  {
    stt: 4,
    content: 'Xây dựng kế hoạch giáo dục cá nhân (KHGDCN) cho HSKT',
    urgencyLevel: '(1) - Rất cấp thiết',
    schoolNote: 'Hướng dẫn chuẩn hóa 9 mục theo phụ lục Công văn 3326/SGDĐT-GDPT cho 25 giáo viên chủ trì.'
  },
  {
    stt: 5,
    content: 'Rèn luyện kĩ năng đặc thù, kĩ năng sống phù hợp với khả năng và nhu cầu của HSKT',
    urgencyLevel: '(1) - Rất cấp thiết',
    schoolNote: 'Đặc biệt quan trọng đối với học sinh khuyết tật nặng (06 em: 1 ung bướu ác, 1 nhìn, 1 tâm thần, 1 khác, 2 trí tuệ nặng).'
  },
  {
    stt: 6,
    content: 'Tư vấn, hỗ trợ cơ sở giáo dục, giáo viên và gia đình trong các hoạt động chăm sóc, giáo dục hoà nhập',
    urgencyLevel: '(2) - Cấp thiết',
    schoolNote: 'Phối hợp trạm y tế xã Đốc Binh Kiều, xã Tân Kiều và phụ huynh chăm sóc sức khỏe học sinh.'
  },
  {
    stt: 7,
    content: 'Hỗ trợ tham gia huy động HSKT đến trường (bậc học THPT không chọn)',
    urgencyLevel: '(2) - Cấp thiết',
    schoolNote: 'Phối hợp chính quyền địa phương 2 xã vận động 100% học sinh duy trì đi học, không để em nào bỏ học.'
  }
];

/**
 * Kế hoạch số 35/KH-THCS&THPTĐBK của Trường THCS và THPT Đốc Binh Kiều
 * ĐÃ ĐƯỢC ĐIỀU CHỈNH CHUẨN XÁC 100% THEO PHỤ LỤC CÔNG VĂN 3408/SGDĐT-GDPT:
 * - Quy mô: 25 học sinh khuyết tật học hòa nhập
 * - Cấp THPT (Điểm chính): 03 học sinh (10CB2, 11CB3, 11CB1)
 * - Cấp THCS - Điểm Đốc Binh Kiều: 10 học sinh (6A1, 6A4, 7A2, 7A3, 7A4, 8A1, 8A2, 8A4)
 * - Cấp THCS - Điểm Tân Kiều (cách 11km): 12 học sinh (6A9, 6A10, 7A9, 8A9, 8A10, 9A9, 9A10)
 */
export const OFFICIAL_INCLUSIVE_EDUCATION_PLAN: SchoolDocument = {
  id: 'doc-kh-gdhn-15',
  type: 'plan',
  typeLabel: 'Kế hoạch',
  documentNumber: 'Số: 15/KH-THCS&THPTĐBK',
  title: 'KẾ HOẠCH',
  subTitle: 'Thực hiện công tác giáo dục hòa nhập học sinh khuyết tật năm học 2026 - 2027',
  issuingAuthorityTop: 'SỞ GDĐT TỈNH ĐỒNG THÁP',
  issuingAuthority: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
  signerRole: 'KT. HIỆU TRƯỞNG\nPHÓ HIỆU TRƯỞNG',
  signerName: 'Nguyễn Minh Trí',
  signDate: 'Đốc Binh Kiều, ngày 28 tháng 8 năm 2026',
  createdDate: '2026-08-28T08:00:00Z',
  legalBases: [
    'Luật Người khuyết tật số 51/2010/QH12 ngày 17/6/2010 của Quốc hội',
    'Thông tư số 03/2018/TT-BGDĐT ngày 29/01/2018 của Bộ Giáo dục và Đào tạo ban hành Quy định về giáo dục hòa nhập đối với người khuyết tật',
    'Thông tư số 15/2026/TT-BGDĐT ngày 24/3/2026 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Điều lệ trường trung học',
    'Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC ngày 31/12/2013 của Bộ GDĐT, Bộ LĐTBXH và Bộ Tài chính quy định chính sách về giáo dục đối với người khuyết tật',
    'Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh khuyết tật tại các cơ sở giáo dục mầm non, phổ thông',
    'Công văn số 3408/SGDĐT-GDPT ngày 04/9/2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc thống kê và đăng ký nhu cầu hỗ trợ giáo dục hòa nhập năm học 2026 - 2027',
    'Kế hoạch số 34/KH-THCS&THPTĐBK ngày 25/8/2026 của Trường THCS và THPT Đốc Binh Kiều về Kế hoạch Giáo dục Nhà trường năm học 2026 - 2027'
  ],
  sections: [
    {
      heading: 'I. MỤC ĐÍCH, YÊU CẦU',
      content: `1. Mục đích:
- Đảm bảo quyền học tập bình đẳng, nhân văn cho toàn bộ 25 học sinh khuyết tật (HSKT) học hòa nhập tại Trường THCS và THPT Đốc Binh Kiều; xây dựng môi trường học tập an toàn, thân thiện, tương trợ, không kỳ thị và không phân biệt đối xử.
- Phát huy tối đa khả năng, sở trường, mức độ tiến bộ và kỹ năng sống tự lập của từng học sinh khuyết tật; giúp các em từng bước hòa nhập vào tập thể lớp và cộng đồng xã hội.
- Nâng cao năng lực chuyên môn, trách nhiệm sư phạm và tình thương yêu của đội ngũ 102 giáo viên toàn trường đối với học sinh có hoàn cảnh đặc biệt; thực hiện đúng, đủ, kịp thời các chế độ, chính sách ưu đãi của Nhà nước cho học sinh và giáo viên dạy hòa nhập.

2. Yêu cầu:
- Bám sát chỉ đạo chuyên môn tại Công văn số 3326/SGDĐT-GDPT và Công văn số 3408/SGDĐT-GDPT của Sở GDĐT Đồng Tháp: 100% học sinh khuyết tật (25/25 em) có Kế hoạch giáo dục cá nhân (KHGDCN) được xây dựng khoa học, thiết thực và theo dõi chặt chẽ tiến bộ theo từng học kỳ.
- Bố trí lớp học hợp lý: Mỗi lớp hòa nhập chỉ bố trí không quá 02 (hai) HSKT. Giảm sĩ số lớp hòa nhập theo đúng quy định để giáo viên bộ môn có điều kiện quan tâm, kèm cặp.
- Kiểm tra, đánh giá theo hướng động viên, khích lệ sự nỗ lực; đánh giá dựa trên mức độ hoàn thành KHGDCN của học sinh; tuyệt đối không áp dụng máy móc thang điểm chuẩn chính khóa đối với các nội dung học sinh đã được miễn, giảm theo quyết định của nhà trường.
- Tinh giản hồ sơ, thủ tục hành chính: Quản lý đúng 03 loại giấy tờ (Hồ sơ học sinh; Giấy xác nhận khuyết tật; KHGDCN); bảo mật thông tin cá nhân và tôn trọng quyền riêng tư của học sinh.`
    },
    {
      heading: 'II. ĐẶC ĐIỂM TÌNH HÌNH HỌC SINH KHUYẾT TẬT THEO CÁC ĐIỂM TRƯỜNG NĂM HỌC 2026 - 2027',
      content: `1. Quy mô học sinh khuyết tật toàn trường:
Năm học 2026 - 2027, toàn trường có tổng số 53 lớp với 2.111 học sinh, trong đó có chính xác 25 học sinh khuyết tật học hòa nhập (chiếm tỷ lệ 1,18% tổng số học sinh). Căn cứ Phụ lục thống kê chính thức (theo Công văn số 3408/SGDĐT-GDPT của Sở GDĐT), số lượng học sinh khuyết tật được phân bổ tại 03 điểm trường cụ thể như sau:

a) Cấp THPT - Điểm chính Đốc Binh Kiều (14 lớp THPT, 530 HS):
- Tổng số: 03 học sinh khuyết tật (chiếm 12% tổng số HSKT toàn trường).
- Danh sách lớp:
  + Lớp 10CB2: 01 học sinh (Lương Nguyễn Anh Duy - Trí tuệ, Mức độ Nặng; Ấp 2, xã Đốc Binh Kiều).
  + Lớp 11CB1: 01 học sinh (Nguyễn Phúc Thịnh - Trí tuệ, Mức độ Nhẹ; Ấp 2, xã Đốc Binh Kiều).
  + Lớp 11CB3: 01 học sinh (Nguyễn Trọng Nghĩa - Trí tuệ, Mức độ Nhẹ; Ấp Kinh Bích, xã Nhơn Ninh).
- Cơ cấu mức độ: 01 em khuyết tật nặng, 02 em khuyết tật nhẹ; 100% học sinh nam.
- Phương án bố trí: Bố trí đều vào 03 lớp độc lập (10CB2, 11CB1, 11CB3), mỗi lớp chỉ có đúng 01 học sinh khuyết tật.

b) Cấp THCS - Điểm Đốc Binh Kiều (24 lớp THCS, 980 HS):
- Tổng số: 10 học sinh khuyết tật (chiếm 40% tổng số HSKT toàn trường).
- Danh sách lớp:
  + Lớp 6A1: 01 học sinh (Nguyễn Nhựt Anh - Trí tuệ, Mức độ Nhẹ; Ấp 2).
  + Lớp 6A4: 01 học sinh (Nguyễn Thị Ngọc Duyên - Khiếm thị/Nhìn, Mức độ Nặng; Ấp 5).
  + Lớp 7A2: 01 học sinh (Cao Huỳnh Đàng - Khuyết tật khác, Mức độ Nhẹ; Ấp 4).
  + Lớp 7A3: 01 học sinh (Bùi Tiết Nhi - Khuyết tật khác, Mức độ Nặng; Ấp 4).
  + Lớp 7A4: 02 học sinh (Lê Nguyễn Phi Long - Khác, Nhẹ; Nguyễn Thị Bảo Ngọc - Khác, Nhẹ; Ấp 5).
  + Lớp 8A1: 02 học sinh (Võ Gia Mỹ - Thần kinh, Tâm thần, Nặng; Nguyễn Đoàn Phúc Khang - Trí tuệ, Nặng; Ấp 2 & Ấp 5).
  + Lớp 8A2: 01 học sinh (Lê Thị Nhã Ca - Trí tuệ, Mức độ Nhẹ; Ấp 2).
  + Lớp 8A4: 01 học sinh (Bùi Văn Khang - Trí tuệ, Mức độ Nhẹ; Ấp 4).
- Cơ cấu mức độ: 04 em khuyết tật nặng (01 nhìn, 01 khác, 01 thần kinh-tâm thần, 01 trí tuệ) và 06 em khuyết tật nhẹ.
- Tỷ lệ giới tính: 05 nữ, 05 nam; 100% cư ngụ trên địa bàn xã Đốc Binh Kiều (Ấp 2, Ấp 4, Ấp 5).
- Phương án bố trí: Xếp vào 08 lớp (trong đó lớp 7A4 và 8A1 có 02 em; các lớp 6A1, 6A4, 7A2, 7A3, 8A2, 8A4 có 01 em).

c) Cấp THCS - Điểm Tân Kiều (cách Điểm chính 11km - 15 lớp THCS, 601 HS):
- Tổng số: 12 học sinh khuyết tật (chiếm 48% tổng số HSKT toàn trường - đây là điểm trường có số lượng HSKT theo học đông nhất).
- Danh sách lớp:
  + Lớp 6A9: 02 học sinh (Trần Gia Huy - Trí tuệ, Nhẹ; Nguyễn Thị Kiều Trúc - Trí tuệ, Nhẹ).
  + Lớp 6A10: 02 học sinh (Lê Vũ Lam Phương - Trí tuệ, Nhẹ; Nguyễn Bảo Trâm - Trí tuệ, Nhẹ).
  + Lớp 7A9: 02 học sinh (Lê Nhựt Khánh - Trí tuệ, Nhẹ; Trần Thị Kiều Oanh - Trí tuệ, Nhẹ).
  + Lớp 8A9: 01 học sinh (Nguyễn Thành Mỹ - Trí tuệ, Nhẹ).
  + Lớp 8A10: 02 học sinh (Lê Thị Lin Đa - Trí tuệ, Nhẹ; Lê Thị Trúc Linh - Trí tuệ, Nhẹ).
  + Lớp 9A9: 01 học sinh (Nguyễn Lâm Khang - Trí tuệ, Nhẹ; Ấp Mỹ Hoà, Tháp Mười).
  + Lớp 9A10: 02 học sinh (Phạm Văn Thanh Trí Cao - Trí tuệ, Nhẹ; Võ Thị Anh Thư - Ung bướu ác tính, Mức độ Nặng).
- Cơ cấu mức độ: 01 em khuyết tật nặng (em Võ Thị Anh Thư - ung bướu ác tính), 11 em khuyết tật trí tuệ mức độ nhẹ.
- Tỷ lệ giới tính: 05 nữ, 07 nam; phần lớn cư trú tại Ấp Tân Kiều và Ấp 7 xã Đốc Binh Kiều, 01 em tại xã Nhơn Ninh và 01 em tại xã Mỹ Hòa.
- Phương án bố trí: Phân bổ vào 07 lớp (mỗi lớp 6A9, 6A10, 7A9, 8A10, 9A10 bố trí đúng 02 em; lớp 8A9 và 9A9 bố trí 01 em).

2. Thuận lợi:
- Được sự quan tâm, chỉ đạo kịp thời, hướng dẫn cụ thể của Sở GDĐT Đồng Tháp qua Công văn số 3326/SGDĐT-GDPT và Công văn số 3408/SGDĐT-GDPT.
- Đội ngũ Ban Giám hiệu (04 cán bộ quản lý) và tập thể 102 giáo viên tâm huyết, giàu lòng nhân ái, có bề dày kinh nghiệm hỗ trợ học sinh yếu thế.
- 100% học sinh khuyết tật (25/25 em) đều duy trì đi học đầy đủ, không có học sinh bỏ học trong năm học 2025 - 2026.

3. Khó khăn và thách thức:
- Điểm trường Tân Kiều cách điểm chính 11km nhưng tập trung tới 12 học sinh khuyết tật (gần 50% toàn trường), trong đó có học sinh mắc bệnh hiểm nghèo (ung bướu ác tính) và học sinh trí tuệ học chậm, đòi hỏi công tác quản lý chuyên môn và y tế học đường phải được quan tâm đặc biệt.
- Nhà trường chưa có biên chế giáo viên chuyên trách về giáo dục đặc biệt; giáo viên bộ môn vừa phải hoàn thành chương trình GDPT 2018 vừa phải cá thể hóa bài dạy hòa nhập.
- Điều kiện kinh tế của nhiều gia đình học sinh khuyết tật còn khó khăn (Ấp Tân Kiều, Ấp 7 vùng sâu, cha mẹ đi làm ăn xa), việc phối hợp rèn luyện kỹ năng tại gia đình gặp nhiều trở ngại.`
    },
    {
      heading: 'III. NHIỆM VỤ VÀ CÁC BIỆN PHÁP TRỌNG TÂM',
      content: `1. Huy động, tiếp nhận và phân công sắp xếp lớp học:
- Phối hợp chặt chẽ với UBND xã Đốc Binh Kiều, UBND xã Tân Kiều và trạm y tế 2 xã trong công tác điều tra phổ cập, rà soát trẻ khuyết tật trong độ tuổi để huy động 100% các em có khả năng học tập đến trường; duy trì sĩ số, kiên quyết không để em nào phải bỏ học vì hoàn cảnh khó khăn hay bệnh tật.
- Tiếp nhận học sinh khuyết tật đúng quy định, thủ tục đơn giản, nhân văn; không đặt ra bất kỳ rào cản hay điều kiện nào ngoài quy định.
- Hiệu trưởng ban hành Quyết định phân công giáo viên chủ nhiệm và giáo viên bộ môn dạy 18 lớp có học sinh hòa nhập; ưu tiên phân công giáo viên có kinh nghiệm, giàu lòng vị tha và nhiệt tình.

2. Xây dựng và quản lý Kế hoạch giáo dục cá nhân (KHGDCN):
- Thời hạn: Hoàn thành xây dựng và phê duyệt 25 bản KHGDCN trước ngày 30/9/2026.
- Quy trình: Giáo viên chủ nhiệm chủ trì, phối hợp với giáo viên các bộ môn, cha mẹ học sinh và nhân viên y tế trường học tìm hiểu đặc điểm thể chất, tâm lý và nhu cầu của từng em để xây dựng KHGDCN theo mẫu Phụ lục Công văn số 3326/SGDĐT-GDPT.
- Nội dung KHGDCN chuẩn hóa 9 mục:
  + Phần I: Thông tin chung học sinh và gia đình (Họ tên, mã định danh, địa chỉ, người đỡ đầu).
  + Phần II: Đặc điểm chính (Điểm mạnh, hạn chế, nhu cầu cần hỗ trợ cụ thể).
  + Phần III: Mục tiêu giáo dục cá nhân năm học (chỉ ghi các môn học/hoạt động cần cá thể hóa, không chép toàn bộ chương trình lớp).
  + Phần IV & V: Mục tiêu và Kế hoạch thực hiện Học kỳ I (nội dung, biện pháp, phương tiện, người thực hiện, mức độ đạt: 1 - Đạt, 2 - Đạt cần hỗ trợ, 3 - Chưa đạt).
  + Phần VI: Nhận xét tiến bộ và điều chỉnh sau Học kỳ I.
  + Phần VII, VIII & IX: Mục tiêu, Kế hoạch và Đánh giá Học kỳ II.
- Phê duyệt: Giáo viên chủ trì ký, Cha mẹ học sinh ký xác nhận, Phó Hiệu trưởng Nguyễn Minh Trí ký duyệt đóng dấu lưu trữ.

3. Điều chỉnh nội dung dạy học và thực hiện miễn, giảm môn học:
- Thực hiện nghiêm túc quy định tại Điều 3 Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC:
  + Đối với học sinh khuyết tật nặng và mắc bệnh hiểm nghèo (như em Võ Thị Anh Thư 9A10 - Ung bướu ác tính): Miễn toàn bộ các môn vận động mạnh (Giáo dục thể chất), điều chỉnh giảm số tiết học lý thuyết, tạo điều kiện cho em nghỉ điều trị bệnh định kỳ mà không bị gián đoạn kết quả học tập.
  + Đối với học sinh khuyết tật nhìn nặng (em Nguyễn Thị Ngọc Duyên 6A4): Bố trí ngồi bàn đầu dãy giữa đủ ánh sáng, phóng to cỡ chữ đề bài và phiếu học tập từ 18pt trở lên; miễn phần quan sát tranh ảnh chi tiết nhỏ.
  + Đối với học sinh khuyết tật thần kinh - tâm thần nặng (em Võ Gia Mỹ 8A1): Ưu tiên rèn luyện kỹ năng cảm xúc, giao tiếp hòa đồng, tránh gây áp lực căng thẳng; bố trí góc yên tĩnh khi em có biểu hiện mệt mỏi.
  + Đối với 16 học sinh khuyết tật trí tuệ: Điều chỉnh giảm yêu cầu cần đạt của các môn khoa học tự nhiên (Toán, KHTN, Vật lí, Hóa học); tập trung hình thành kỹ năng đọc hiểu cơ bản, tính toán thông dụng, kỹ năng tự phục vụ và kỹ năng giao tiếp xã hội.
- Thẩm quyền quyết định: Căn cứ đề xuất của Tổ chuyên môn và GVCN, Phó Hiệu trưởng Nguyễn Minh Trí ký ban hành Quyết định miễn, giảm hoặc điều chỉnh môn học cho từng học sinh và ghi nhận rõ vào KHGDCN.
- Trong giáo án hàng ngày: Giáo viên tích hợp nội dung hỗ trợ học sinh khuyết tật vào Kế hoạch bài dạy hiện có; tuyệt đối không yêu cầu soạn một giáo án riêng biệt.

4. Kiểm tra, đánh giá, xét lên lớp và công nhận tốt nghiệp:
- Thực hiện phương châm: "Động viên, khích lệ sự nỗ lực và tiến bộ là chính; không so sánh học sinh khuyết tật với học sinh bình thường".
- Đối với các môn không được miễn: Kiểm tra linh hoạt (tăng thêm thời gian làm bài, kiểm tra vấn đáp, kiểm tra qua sản phẩm thực hành hoặc đánh giá qua quá trình tham gia hoạt động).
- Đối với các môn đã được miễn: Không ghi điểm số, không tính vào điểm trung bình chung; ghi chú rõ "Được miễn theo quy định về giáo dục hòa nhập".
- Đánh giá định kỳ kết quả rèn luyện và học tập được căn cứ trên mức độ hoàn thành các mục tiêu đề ra trong KHGDCN.
- Xét lên lớp và xét tốt nghiệp THCS, THPT: Áp dụng đúng chính sách ưu tiên theo quy định của Bộ GDĐT và Thông tư liên tịch 42/2013; công nhận học sinh hoàn thành chương trình cấp học khi đạt các mục tiêu cơ bản trong KHGDCN.

5. Hồ sơ và quản lý thông tin tinh gọn, bảo mật:
- Hồ sơ giáo dục hòa nhập gồm đúng 03 thành phần: (1) Hồ sơ học sinh theo quy định chung; (2) Bản sao Giấy xác nhận khuyết tật có chứng thực; (3) Kế hoạch giáo dục cá nhân (KHGDCN) bản chính.
- Thực hiện đúng chỉ đạo của Sở GDĐT: Tuyệt đối không lập thêm Sổ theo dõi HSKT riêng, không sao chép bài kiểm tra thành tập hồ sơ dày cộp. Toàn bộ thông tin được cập nhật vào phần mềm quản lý học sinh và CSDL ngành giáo dục.
- Tuyệt đối bảo mật thông tin cá nhân và tình trạng khuyết tật của học sinh, không bêu tên các em trong các buổi sinh hoạt chung làm tổn thương tâm lý học sinh.

6. Chế độ, chính sách ưu đãi đối với học sinh và giáo viên:
- Đối với 25 học sinh khuyết tật:
  + Miễn 100% học phí và các khoản đóng góp theo Nghị định số 81/2021/NĐ-CP.
  + Hướng dẫn cha mẹ học sinh hoàn thiện hồ sơ để hưởng chính sách trợ cấp xã hội hàng tháng và hỗ trợ chi phí học tập theo Thông tư liên tịch 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC.
  + Ưu tiên cấp phát sách giáo khoa, học bổng khuyến học và hỗ trợ đồ dùng học tập từ nguồn quỹ khuyến học của nhà trường và các nhà hảo tâm.
- Đối với giáo viên giảng dạy:
  + Chi trả đầy đủ chế độ phụ cấp trách nhiệm giảng dạy hòa nhập theo Thông tư liên tịch 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC (tính theo số tiết dạy thực tế có học sinh khuyết tật và hệ số lương tương ứng).
  + Kế toán tổng hợp số tiết dạy hòa nhập hàng tháng, tham mưu thanh toán đúng kỳ cùng với tiền lương, đảm bảo minh bạch, không để giáo viên bị thiệt thòi quyền lợi.`
    },
    {
      heading: 'IV. GIẢI PHÁP ĐẶC THÙ CHO TỪNG ĐIỂM TRƯỜNG VÀ CƠ SỞ VẬT CHẤT',
      content: `1. Giải pháp đặc thù cho Điểm Tân Kiều (cách 11km - 12 HSKT):
- Đây là điểm trường tập trung số lượng học sinh khuyết tật đông nhất (12 em), khoảng cách xa trung tâm. Nhà trường chỉ đạo:
  + Bố trí 100% các lớp có HSKT (6A9, 6A10, 7A9, 8A9, 8A10, 9A9, 9A10) học tại tầng trệt, gần khu vệ sinh và phòng y tế để các em di chuyển thuận lợi.
  + Cử cán bộ phụ trách Điểm trường và Phó Hiệu trưởng Nguyễn Minh Trí trực tiếp dự giờ, kiểm tra định kỳ 2 tuần/lần để kịp thời hỗ trợ phương pháp cho giáo viên.
  + Phòng y tế Điểm Tân Kiều phối hợp thường xuyên với Trạm Y tế xã Tân Kiều, có sổ theo dõi sức khỏe riêng đối với em Võ Thị Anh Thư (ung bướu ác tính) và các em khuyết tật nặng.
  + Phân công các giáo viên có kinh nghiệm chủ trì KHGDCN, phát động phong trào "Bạn giúp bạn" tại tất cả 7 lớp hòa nhập của Điểm Tân Kiều.

2. Giải pháp cho Điểm Đốc Binh Kiều (10 HSKT):
- Bố trí các lớp 6A1, 6A4, 7A2, 7A3, 7A4, 8A1, 8A2, 8A4 tại dãy phòng học tầng trệt; trang bị hệ thống chiếu sáng đạt chuẩn cho lớp 6A4 có học sinh khiếm thị nặng.
- Cán bộ y tế túc trực sơ cấp cứu, hỗ trợ em Võ Gia Mỹ (8A1 - thần kinh tâm thần nặng) khi học sinh có biểu hiện kích động hoặc mệt mỏi.

3. Giải pháp cho Cấp THPT - Điểm chính (03 HSKT):
- Giáo viên bộ môn THPT phối hợp chặt chẽ với Đoàn trường để tổ chức các hoạt động rèn luyện kỹ năng sống, kỹ năng tự phục vụ và hướng nghiệp phù hợp cho 3 em học sinh khuyết tật trí tuệ lớp 10CB2, 11CB1, 11CB3.
- Xây dựng lộ trình xét tốt nghiệp THPT theo đúng quy chế ưu tiên của Bộ GDĐT.`
    },
    {
      heading: 'V. ĐĂNG KÝ NHU CẦU HỖ TRỢ VỚI SỞ GDĐT ĐỒNG THÁP',
      content: `Thực hiện Công văn số 3408/SGDĐT-GDPT ngày 04/9/2026 của Sở GDĐT, Nhà trường đăng ký chính thức các nhu cầu hỗ trợ sau:
1. Tập huấn, bồi dưỡng chuyên môn về GDHN cho giáo viên: (1) - Rất cấp thiết (đặc biệt cho 18 giáo viên dạy các lớp hòa nhập tại Điểm Tân Kiều và Điểm Đốc Binh Kiều).
2. Xây dựng kế hoạch giáo dục cá nhân (KHGDCN) cho HSKT: (1) - Rất cấp thiết (hướng dẫn cụ thể hóa biểu mẫu theo Công văn 3326).
3. Rèn luyện kĩ năng đặc thù, kĩ năng sống phù hợp với khả năng và nhu cầu của HSKT: (1) - Rất cấp thiết (cho 06 học sinh khuyết tật nặng).
4. Đánh giá, xác định khả năng và phân loại nhu cầu GD đối với HSKT: (2) - Cấp thiết.
5. Tư vấn, hỗ trợ CSGD, giáo viên và gia đình trong các hoạt động chăm sóc, giáo dục hoà nhập: (2) - Cấp thiết.
6. Hỗ trợ tham gia huy động HSKT đến trường: (2) - Cấp thiết.
* Đề xuất với Sở GDĐT: Hỗ trợ trang cấp tài liệu chuyên khảo về giáo dục hòa nhập học sinh khuyết tật trí tuệ; tổ chức các chuyên đề can thiệp giáo dục hòa nhập liên trường tại cụm Tháp Mười.`
    },
    {
      heading: 'VI. TỔ CHỨC THỰC HIỆN',
      content: `1. Ban Giám hiệu nhà trường:
- Thầy Hiệu trưởng Lê Thanh Cường: Chỉ đạo chung; phê duyệt các quyết định phân công chuyên môn, quyết định phê duyệt KHGDCN và chi trả chế độ chính sách.
- Thầy Phó Hiệu trưởng Nguyễn Minh Trí (Trưởng ban Giáo dục hòa nhập):
  + Trực tiếp xây dựng và chỉ đạo thực hiện Kế hoạch này; phê duyệt Kế hoạch giáo dục cá nhân (KHGDCN) của toàn bộ 25 học sinh khuyết tật; ban hành quyết định miễn, giảm, điều chỉnh môn học theo thẩm quyền.
  + Thường xuyên kiểm tra, dự giờ các lớp học hòa nhập tại cả 3 điểm trường (đặc biệt là Điểm Tân Kiều cách 11km); kịp thời tháo gỡ khó khăn về phương pháp giảng dạy cho giáo viên.
  + Chủ trì sơ kết công tác hòa nhập cuối Học kỳ I và tổng kết năm học; báo cáo kết quả về Phòng Giáo dục Phổ thông Sở GDĐT Đồng Tháp.

2. Các Tổ chuyên môn (06 tổ chuyên môn):
- Tổ chức sinh hoạt chuyên đề: "Phương pháp dạy học phân hóa và hỗ trợ học sinh khuyết tật trong lớp học hòa nhập".
- Hướng dẫn giáo viên trong tổ điều chỉnh mục tiêu bài dạy, biên soạn đề kiểm tra định kỳ phù hợp với năng lực của từng học sinh khuyết tật theo đúng KHGDCN đã phê duyệt.

3. Tổ Văn phòng - Kế toán:
- Bộ phận Kế toán: Rà soát, lập danh sách miễn giảm học phí cho 25 học sinh khuyết tật; tính toán chi trả kịp thời, chính xác chế độ phụ cấp dạy hòa nhập cho giáo viên theo từng học kỳ.
- Bộ phận Văn thư: Lưu trữ, quản lý hồ sơ hòa nhập bảo mật, an toàn; thực hiện bàn giao đầy đủ KHGDCN khi học sinh chuyển cấp, chuyển trường.

4. Giáo viên chủ nhiệm các lớp có HSKT:
- Chủ trì phối hợp với giáo viên bộ môn, cha mẹ học sinh xây dựng, hoàn thiện KHGDCN trước ngày 30/9/2026.
- Thường xuyên giữ mối liên hệ mật thiết với phụ huynh; quan tâm, theo dõi diễn biến tâm lý, hỗ trợ các em hòa đồng với bạn bè; xây dựng đôi bạn cùng tiến giúp đỡ nhau trong học tập.
- Đánh giá sự tiến bộ của học sinh theo KHGDCN vào cuối mỗi học kỳ.

5. Giáo viên bộ môn:
- Nghiên cứu kỹ KHGDCN của học sinh trong lớp mình giảng dạy; chuẩn bị biện pháp hỗ trợ thích hợp trong từng tiết dạy; thực hiện kiểm tra, đánh giá vì sự tiến bộ của học sinh.

6. Đoàn trường, Đội TNTP và Ban đại diện Cha mẹ học sinh:
- Tuyên truyền, giáo dục học sinh toàn trường tinh thần nhân ái, tương thân tương ái, giúp đỡ bạn khuyết tật; tuyệt đối không để xảy ra hiện tượng trêu chọc, kỳ thị, bạo lực học đường.
- Ban đại diện Cha mẹ học sinh phối hợp chặt chẽ với nhà trường trong việc hỗ trợ phương tiện đi lại, chăm sóc sức khỏe và động viên tinh thần các em học sinh có hoàn cảnh đặc biệt./.`
    }
  ],
  recipients: [
    'Sở GDĐT Đồng Tháp (để báo cáo);',
    'UBND xã Đốc Binh Kiều, xã Tân Kiều (để phối hợp);',
    'Hiệu trưởng (để chỉ đạo);',
    'Các Phó Hiệu trưởng (để phối hợp);',
    '07 tổ trong nhà trường (06 tổ CM và 01 tổ VP) (để thực hiện);',
    'Ban đại diện Cha mẹ học sinh trường (để phối hợp);',
    'Đoàn trường, Đội TNTP (để phối hợp);',
    'Lưu: VT, Tr.'
  ],
  status: 'official'
};

/**
 * Danh sách hồ sơ 25 học sinh khuyết tật học hòa nhập tại Trường THCS và THPT Đốc Binh Kiều
 * ĐƯỢC CHUẨN HÓA 100% THEO PHỤ LỤC CÔNG VĂN SỐ 3408/SGDĐT-GDPT NGÀY 04/9/2026 CỦA SỞ GDĐT ĐỒNG THÁP
 */
export interface InclusiveStudentProfile {
  id: string;
  stt: number;
  nationalId: string; // Mã định danh học sinh (12 số)
  fullName: string;
  birthYear: number;
  gender: 'Nam' | 'Nữ';
  isFemale: 'Có' | 'Không';
  ethnicity: string;
  disabilityType: string;
  disabilityLevel: 'Nhẹ' | 'Nặng';
  className: string;
  schoolCampus: 'Điểm chính (THPT)' | 'Điểm Đốc Binh Kiều (THCS)' | 'Điểm Tân Kiều (THCS)';
  gradeGroup: 'Khối 6' | 'Khối 7' | 'Khối 8' | 'Khối 9' | 'Khối 10' | 'Khối 11' | 'Khối 12';
  droppedOut: 'Không';
  homeAddress: string;
  phone: string;
  leadTeacher: string; // Giáo viên chủ trì KHGDCN (GVCN)
  supportMeasures: string; // Biện pháp hỗ trợ chính
  exemptedSubjects: string; // Môn được miễn, giảm
  planStatus: 'Đã hoàn thành KHGDCN' | 'Đang theo dõi HK I' | 'Đang rà soát';
}

export const INCLUSIVE_STUDENTS_LIST: InclusiveStudentProfile[] = [
  // ==========================================
  // NHÓM 1: CẤP THPT - ĐIỂM CHÍNH (03 HỌC SINH)
  // ==========================================
  {
    id: 'hskt-thpt-01',
    stt: 1,
    nationalId: '087211016166',
    fullName: 'Lương Nguyễn Anh Duy',
    birthYear: 2011,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nặng',
    className: '10CB2',
    schoolCampus: 'Điểm chính (THPT)',
    gradeGroup: 'Khối 10',
    droppedOut: 'Không',
    homeAddress: 'Ấp 2, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0974034662',
    leadTeacher: 'Nguyễn Văn Hải (GVCN 10CB2)',
    supportMeasures: 'Bố trí học sinh ngồi bàn đầu cạnh cán sự học tập, giảm tải yêu cầu bài tập trừu tượng, tăng cường giao tiếp xã hội',
    exemptedSubjects: 'Miễn phần tính toán nâng cao các môn tự nhiên; điều chỉnh đánh giá theo KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-thpt-02',
    stt: 2,
    nationalId: '080210004521',
    fullName: 'Nguyễn Trọng Nghĩa',
    birthYear: 2010,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '11CB3',
    schoolCampus: 'Điểm chính (THPT)',
    gradeGroup: 'Khối 11',
    droppedOut: 'Không',
    homeAddress: 'Ấp Kinh Bích, xã Nhơn Ninh',
    phone: '0912145722',
    leadTeacher: 'Trần Minh Đức (GVCN 11CB3)',
    supportMeasures: 'Khích lệ tham gia phát biểu, hướng dẫn làm bài tập theo phiếu học tập cá thể hóa',
    exemptedSubjects: 'Điều chỉnh yêu cầu môn Toán và Tiếng Anh; xét tốt nghiệp THPT theo kết quả KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-thpt-03',
    stt: 3,
    nationalId: '087208014512',
    fullName: 'Nguyễn Phúc Thịnh',
    birthYear: 2008,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '11CB1',
    schoolCampus: 'Điểm chính (THPT)',
    gradeGroup: 'Khối 11',
    droppedOut: 'Không',
    homeAddress: 'Ấp 2, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0245944728',
    leadTeacher: 'Lê Hoàng Phong (GVCN 11CB1)',
    supportMeasures: 'Hướng dẫn phương pháp tự học, rèn luyện kỹ năng thực hành và định hướng nghề nghiệp',
    exemptedSubjects: 'Giảm mức độ yêu cầu các bài kiểm tra tự luận phức tạp',
    planStatus: 'Đã hoàn thành KHGDCN'
  },

  // ==========================================
  // NHÓM 2: CẤP THCS - ĐIỂM TÂN KIỀU (12 HỌC SINH)
  // (Cách điểm chính 11km, tập trung đông nhất)
  // ==========================================
  {
    id: 'hskt-tk-01',
    stt: 4,
    nationalId: '087314004208',
    fullName: 'Lê Vũ Lam Phương',
    birthYear: 2014,
    gender: 'Nữ',
    isFemale: 'Có',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '6A10',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 6',
    droppedOut: 'Không',
    homeAddress: 'Ấp Tân Kiều, xã Đốc Binh Kiều',
    phone: '0939001517',
    leadTeacher: 'Nguyễn Thị Hồng (GVCN 6A10 Điểm Tân Kiều)',
    supportMeasures: 'Bố trí học sinh ngồi bàn đầu, đôi bạn cùng tiến giúp đỡ trong giờ học',
    exemptedSubjects: 'Điều chỉnh yêu cầu cần đạt môn Toán và Ngữ văn phù hợp nhận thức',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-02',
    stt: 5,
    nationalId: '080215007333',
    fullName: 'Trần Gia Huy',
    birthYear: 2015,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '6A9',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 6',
    droppedOut: 'Không',
    homeAddress: 'Ấp 5, xã Nhơn Ninh',
    phone: '0327452027',
    leadTeacher: 'Trần Văn Tươi (GVCN 6A9 Điểm Tân Kiều)',
    supportMeasures: 'Động viên khích lệ, hướng dẫn từng bước nhỏ khi làm bài tập trên lớp',
    exemptedSubjects: 'Giảm độ khó bài kiểm tra định kỳ các môn KHTN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-03',
    stt: 6,
    nationalId: '087315007967',
    fullName: 'Nguyễn Bảo Trâm',
    birthYear: 2015,
    gender: 'Nữ',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '6A10',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 6',
    droppedOut: 'Không',
    homeAddress: 'Ấp Tân Kiều, xã Đốc Binh Kiều',
    phone: '0796466604',
    leadTeacher: 'Nguyễn Thị Hồng (GVCN 6A10 Điểm Tân Kiều)',
    supportMeasures: 'Rèn luyện khả năng ghi nhớ và diễn đạt câu hoàn chỉnh, phối hợp phụ huynh',
    exemptedSubjects: 'Điều chỉnh bài kiểm tra bằng hình thức trắc nghiệm trực quan',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-04',
    stt: 7,
    nationalId: '087314015253',
    fullName: 'Nguyễn Thị Kiều Trúc',
    birthYear: 2014,
    gender: 'Nữ',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '6A9',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 6',
    droppedOut: 'Không',
    homeAddress: 'Ấp Tân Kiều, xã Đốc Binh Kiều',
    phone: '0365790163',
    leadTeacher: 'Trần Văn Tươi (GVCN 6A9 Điểm Tân Kiều)',
    supportMeasures: 'Khích lệ phát biểu, rèn kỹ năng giao tiếp và tính toán số học thông dụng',
    exemptedSubjects: 'Đánh giá môn Toán theo thang mục tiêu trong KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-05',
    stt: 8,
    nationalId: '087214014107',
    fullName: 'Lê Nhựt Khánh',
    birthYear: 2013,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '7A9',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 7',
    droppedOut: 'Không',
    homeAddress: 'Ấp Tân Kiều, xã Đốc Binh Kiều',
    phone: '0973873088',
    leadTeacher: 'Võ Thành Được (GVCN 7A9 Điểm Tân Kiều)',
    supportMeasures: 'Phân công học sinh khá kèm cặp, hỗ trợ đọc hiểu đề cương ôn tập',
    exemptedSubjects: 'Điều chỉnh chỉ tiêu học tập theo mục tiêu KHGDCN Học kỳ I',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-06',
    stt: 9,
    nationalId: '087214011937',
    fullName: 'Trần Thị Kiều Oanh',
    birthYear: 2012,
    gender: 'Nữ',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '7A9',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 7',
    droppedOut: 'Không',
    homeAddress: 'Ấp 7, xã Đốc Binh Kiều',
    phone: '0907652623',
    leadTeacher: 'Võ Thành Được (GVCN 7A9 Điểm Tân Kiều)',
    supportMeasures: 'Tạo cơ hội tham gia các hoạt động tập thể, rèn luyện kỹ năng sống tự lập',
    exemptedSubjects: 'Giảm tải nội dung lý thuyết môn Lịch sử & Địa lí, KHTN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-07',
    stt: 10,
    nationalId: '087212001456',
    fullName: 'Nguyễn Thành Mỹ',
    birthYear: 2012,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '8A9',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 8',
    droppedOut: 'Không',
    homeAddress: 'Ấp Tân Kiều, xã Đốc Binh Kiều',
    phone: '0865634800',
    leadTeacher: 'Huỳnh Văn Sang (GVCN 8A9 Điểm Tân Kiều)',
    supportMeasures: 'Giáo viên bộ môn hỗ trợ bài tập cơ bản, khích lệ tự tin phát biểu',
    exemptedSubjects: 'Đánh giá linh hoạt môn Tiếng Anh và KHTN theo KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-08',
    stt: 11,
    nationalId: '087313002933',
    fullName: 'Lê Thị Lin Đa',
    birthYear: 2013,
    gender: 'Nữ',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '8A10',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 8',
    droppedOut: 'Không',
    homeAddress: 'Ấp 7, xã Đốc Binh Kiều',
    phone: '0962761470',
    leadTeacher: 'Đoàn Văn Tốt (GVCN 8A10 Điểm Tân Kiều)',
    supportMeasures: 'Quan tâm hỗ trợ tâm lý lứa tuổi, khen thưởng kịp thời khi em có tiến bộ',
    exemptedSubjects: 'Giảm yêu cầu môn Toán phần hình học phức tạp',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-09',
    stt: 12,
    nationalId: '087312017809',
    fullName: 'Lê Thị Trúc Linh',
    birthYear: 2012,
    gender: 'Nữ',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '8A10',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 8',
    droppedOut: 'Không',
    homeAddress: 'Ấp 7, xã Đốc Binh Kiều',
    phone: '0915018643',
    leadTeacher: 'Đoàn Văn Tốt (GVCN 8A10 Điểm Tân Kiều)',
    supportMeasures: 'Học nhóm cùng bạn, củng cố kiến thức đọc viết và tính toán cơ bản',
    exemptedSubjects: 'Điều chỉnh bài kiểm tra thường xuyên theo hướng kiểm tra vấn đáp',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-10',
    stt: 13,
    nationalId: '087211005476',
    fullName: 'Nguyễn Lâm Khang',
    birthYear: 2011,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '9A9',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 9',
    droppedOut: 'Không',
    homeAddress: 'Ấp Mỹ Hoà, xã Tháp Mười',
    phone: '0337381008',
    leadTeacher: 'Phan Văn Kiệt (GVCN 9A9 Điểm Tân Kiều)',
    supportMeasures: 'Ôn tập kiến thức cốt lõi, tư vấn hướng nghiệp học nghề phù hợp sau THCS',
    exemptedSubjects: 'Xét tốt nghiệp THCS theo kết quả thực hiện KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-11',
    stt: 14,
    nationalId: '087209015538',
    fullName: 'Phạm Văn Thanh Trí Cao',
    birthYear: 2009,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '9A10',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 9',
    droppedOut: 'Không',
    homeAddress: 'Ấp Tân Kiều, xã Đốc Binh Kiều',
    phone: '0984660481',
    leadTeacher: 'Nguyễn Văn Đầy (GVCN 9A10 Điểm Tân Kiều)',
    supportMeasures: 'Hướng dẫn hoàn thành chương trình lớp 9, tư vấn học nghề và kỹ năng tự lập',
    exemptedSubjects: 'Xét công nhận tốt nghiệp THCS theo chính sách ưu tiên hòa nhập',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-tk-12',
    stt: 15,
    nationalId: '087311003318',
    fullName: 'Võ Thị Anh Thư',
    birthYear: 2011,
    gender: 'Nữ',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Ung bướu ác tính',
    disabilityLevel: 'Nặng',
    className: '9A10',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    gradeGroup: 'Khối 9',
    droppedOut: 'Không',
    homeAddress: 'Ấp 7, xã Đốc Binh Kiều',
    phone: '0385242920',
    leadTeacher: 'Nguyễn Văn Đầy (GVCN 9A10 Điểm Tân Kiều)',
    supportMeasures: 'Hỗ trợ đặc biệt về y tế học đường, theo dõi sức khỏe chặt chẽ, tạo điều kiện nghỉ điều trị bệnh định kỳ, giao phiếu học tập tại nhà khi em phải nằm viện',
    exemptedSubjects: 'Miễn 100% môn Giáo dục thể chất và các hoạt động lao động, thực hành nặng; bảo lưu kết quả và xét tốt nghiệp THCS nhân văn',
    planStatus: 'Đã hoàn thành KHGDCN'
  },

  // ==========================================
  // NHÓM 3: CẤP THCS - ĐIỂM ĐỐC BINH KIỀU (10 HỌC SINH)
  // ==========================================
  {
    id: 'hskt-dbk-01',
    stt: 16,
    nationalId: '080214000731',
    fullName: 'Nguyễn Nhựt Anh',
    birthYear: 2014,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí Tuệ',
    disabilityLevel: 'Nhẹ',
    className: '6A1',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 6',
    droppedOut: 'Không',
    homeAddress: 'Ấp 2, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0388989382',
    leadTeacher: 'Lê Văn Minh (GVCN 6A1 Điểm ĐBK)',
    supportMeasures: 'Bố trí ngồi bàn đầu dãy giữa, giáo viên bộ môn hướng dẫn bài tập cơ bản',
    exemptedSubjects: 'Giảm tải nội dung môn Toán và KHTN; đánh giá dựa trên mức độ hoàn thành KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-02',
    stt: 17,
    nationalId: '087315004017',
    fullName: 'Nguyễn Thị Ngọc Duyên',
    birthYear: 2015,
    gender: 'Nữ',
    isFemale: 'Có',
    ethnicity: 'Kinh',
    disabilityType: 'Khuyết tật nhìn (Thị giác)',
    disabilityLevel: 'Nặng',
    className: '6A4',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 6',
    droppedOut: 'Không',
    homeAddress: 'Ấp 5, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0354329147',
    leadTeacher: 'Phạm Thị Lan (GVCN 6A4 Điểm ĐBK)',
    supportMeasures: 'Bố trí ngồi bàn đầu gần bảng và cửa sổ đủ ánh sáng tự nhiên; phóng to tài liệu cỡ chữ 18pt trở lên; cho phép bạn cùng bàn hỗ trợ đọc to đề bài',
    exemptedSubjects: 'Miễn phần quan sát hình vẽ nhỏ và kính hiển vi; cho phép làm bài kiểm tra vấn đáp hoặc kéo dài thêm thời gian',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-03',
    stt: 18,
    nationalId: '087211000756',
    fullName: 'Cao Huỳnh Đàng',
    birthYear: 2011,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Khác',
    disabilityLevel: 'Nhẹ',
    className: '7A2',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 7',
    droppedOut: 'Không',
    homeAddress: 'Ấp 4, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0971076410',
    leadTeacher: 'Nguyễn Thị Kim Thoa (GVCN 7A2 Điểm ĐBK)',
    supportMeasures: 'Hỗ trợ rèn luyện thể chất phù hợp, động viên tham gia phong trào tập thể',
    exemptedSubjects: 'Điều chỉnh một số nội dung thực hành thể lực nặng môn Giáo dục thể chất',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-04',
    stt: 19,
    nationalId: '087313010266',
    fullName: 'Bùi Tiết Nhi',
    birthYear: 2013,
    gender: 'Nữ',
    isFemale: 'Có',
    ethnicity: 'Kinh',
    disabilityType: 'Khác',
    disabilityLevel: 'Nặng',
    className: '7A3',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 7',
    droppedOut: 'Không',
    homeAddress: 'Ấp 4, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0352662166',
    leadTeacher: 'Trương Văn Hùng (GVCN 7A3 Điểm ĐBK)',
    supportMeasures: 'Quan tâm hỗ trợ chăm sóc sức khỏe, bàn ghế ngồi tầng trệt lối đi thông thoáng',
    exemptedSubjects: 'Miễn môn Giáo dục thể chất phần chạy bền, nhảy cao; điều chỉnh nội dung đánh giá',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-05',
    stt: 20,
    nationalId: '084213000279',
    fullName: 'Lê Nguyễn Phi Long',
    birthYear: 2013,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Khác',
    disabilityLevel: 'Nhẹ',
    className: '7A4',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 7',
    droppedOut: 'Không',
    homeAddress: 'Ấp 5, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0906977300',
    leadTeacher: 'Võ Thị Bích Ngọc (GVCN 7A4 Điểm ĐBK)',
    supportMeasures: 'Xây dựng mối quan hệ bạn bè hòa đồng, hỗ trợ ôn tập kiến thức trọng tâm',
    exemptedSubjects: 'Điều chỉnh mức độ yêu cầu các bài kiểm tra định kỳ',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-06',
    stt: 21,
    nationalId: '087314007521',
    fullName: 'Nguyễn Thị Bảo Ngọc',
    birthYear: 2014,
    gender: 'Nữ',
    isFemale: 'Có',
    ethnicity: 'Kinh',
    disabilityType: 'Khác',
    disabilityLevel: 'Nhẹ',
    className: '7A4',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 7',
    droppedOut: 'Không',
    homeAddress: 'Ấp 5, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0396793010',
    leadTeacher: 'Võ Thị Bích Ngọc (GVCN 7A4 Điểm ĐBK)',
    supportMeasures: 'Động viên khích lệ tinh thần, tạo cơ hội tham gia các hoạt động Đội TNTP',
    exemptedSubjects: 'Đánh giá học tập theo tiến bộ ghi nhận trong KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-07',
    stt: 22,
    nationalId: '087311003616',
    fullName: 'Võ Gia Mỹ',
    birthYear: 2011,
    gender: 'Nữ',
    isFemale: 'Có',
    ethnicity: 'Kinh',
    disabilityType: 'Thần kinh - Tâm thần',
    disabilityLevel: 'Nặng',
    className: '8A1',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 8',
    droppedOut: 'Không',
    homeAddress: 'Ấp 2, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0856509345',
    leadTeacher: 'Đặng Hoàng Nam (GVCN 8A1 Điểm ĐBK)',
    supportMeasures: 'Chăm sóc tâm lý đặc biệt, tạo không khí học tập vui tươi nhẹ nhàng, tránh quát mắng hay gây áp lực; bố trí góc yên tĩnh và có cán bộ y tế theo dõi',
    exemptedSubjects: 'Miễn các môn học có tính chất kiểm tra căng thẳng; đánh giá sự tiến bộ về cảm xúc và kỹ năng hòa đồng bạn bè',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-08',
    stt: 23,
    nationalId: '087211004119',
    fullName: 'Nguyễn Đoàn Phúc Khang',
    birthYear: 2011,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nặng',
    className: '8A1',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 8',
    droppedOut: 'Không',
    homeAddress: 'Ấp 5, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0918009985',
    leadTeacher: 'Đặng Hoàng Nam (GVCN 8A1 Điểm ĐBK)',
    supportMeasures: 'Giáo viên phân công bạn giúp đỡ từng thao tác, kiên nhẫn giảng giải kiến thức sinh hoạt đời thường',
    exemptedSubjects: 'Miễn phần tính toán phức tạp; đánh giá kết quả theo mức độ hoàn thành kỹ năng tự lập cơ bản',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-09',
    stt: 24,
    nationalId: '098712011839',
    fullName: 'Lê Thị Nhã Ca',
    birthYear: 2012,
    gender: 'Nữ',
    isFemale: 'Có',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '8A2',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 8',
    droppedOut: 'Không',
    homeAddress: 'Ấp 2, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0856509345',
    leadTeacher: 'Bùi Thị Mai (GVCN 8A2 Điểm ĐBK)',
    supportMeasures: 'Động viên học sinh tự tin giao tiếp, hướng dẫn ghi chép bài ngắn gọn dễ hiểu',
    exemptedSubjects: 'Giảm độ khó bài kiểm tra giữa kì và cuối kì các môn tự nhiên',
    planStatus: 'Đã hoàn thành KHGDCN'
  },
  {
    id: 'hskt-dbk-10',
    stt: 25,
    nationalId: '087211002338',
    fullName: 'Bùi Văn Khang',
    birthYear: 2011,
    gender: 'Nam',
    isFemale: 'Không',
    ethnicity: 'Kinh',
    disabilityType: 'Trí tuệ',
    disabilityLevel: 'Nhẹ',
    className: '8A4',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    gradeGroup: 'Khối 8',
    droppedOut: 'Không',
    homeAddress: 'Ấp 4, xã Đốc Binh Kiều, Đồng Tháp',
    phone: '0354250722',
    leadTeacher: 'Nguyễn Văn Trung (GVCN 8A4 Điểm ĐBK)',
    supportMeasures: 'Rèn luyện kỹ năng tự phục vụ, phối hợp gia đình nhắc nhở chuyên cần đến lớp',
    exemptedSubjects: 'Đánh giá môn Toán và Ngữ văn theo mức độ đạt trong KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN'
  }
];

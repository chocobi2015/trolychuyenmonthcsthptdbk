import { SchoolDocument, DepartmentDirective } from '../types/document';

/**
 * Dữ liệu Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở GDĐT Đồng Tháp
 * V/v hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh khuyết tật
 */
export const DIRECTIVE_3326_GDHN: DepartmentDirective = {
  id: 'directive-3326-gdhn',
  documentNumber: 'Số: 3326/SGDĐT-GDPT',
  title: 'Hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh khuyết tật tại các cơ sở giáo dục mầm non, phổ thông',
  issuingAuthority: 'SỞ GIÁO DỤC VÀ ĐÀO TẠO TỈNH ĐỒNG THÁP',
  signDate: 'Đồng Tháp, ngày 27 tháng 8 năm 2026',
  signer: 'KT. GIÁM ĐỐC - PHÓ GIÁM ĐỐC Nguyễn Phương Toàn',
  topic: 'Giáo dục hòa nhập',
  fileSize: '485 KB (Bản scan PDF có ký số kèm Phụ lục KHGDCN)',
  summary: 'Hướng dẫn toàn diện của Sở GDĐT Đồng Tháp về công tác giáo dục hòa nhập học sinh khuyết tật: huy động tiếp nhận, bố trí tối đa không quá 02 HSKT/lớp, bắt buộc lập Kế hoạch giáo dục cá nhân (KHGDCN), cho phép điều chỉnh/miễn giảm môn học theo TTLT 42/2013, kiểm tra đánh giá theo KHGDCN, quy định hồ sơ tinh gọn không lập sổ sách riêng trùng lặp, chế độ chính sách cho học sinh và giáo viên dạy hòa nhập.',
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
Thông tư số 03/2018/TT-BGDĐT ngày 29 tháng 01 năm 2018 của Bộ Giáo dục và Đào tạo (GDĐT) quy định về giáo dục hòa nhập đối với người khuyết tật;
Thông tư số 15/2026/TT-BGDĐT ngày 24 tháng 3 năm 2026 của Bộ GDĐT ban hành Điều lệ trường tiểu học, trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học; căn cứ các quy định hiện hành về phân quyền, phân cấp, phân định thẩm quyền trong lĩnh vực giáo dục phổ thông;
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
Nguyễn Phương Toàn`,
  createdDate: '2026-08-27T00:00:00.000Z',
  fileName: 'CV 3326-HD GIAO DUC HOA NHAP HSKT-GDPT.pdf',
  linkedSchoolDocumentIds: ['doc-kh-gdhn-35'],
};

/**
 * Kế hoạch Giáo dục hòa nhập năm học 2026 - 2027 của Trường THCS và THPT Đốc Binh Kiều
 * (Số: 35/KH-THCS&THPTĐBK, do Phó Hiệu trưởng Nguyễn Minh Trí ký duyệt)
 */
export const OFFICIAL_INCLUSIVE_EDUCATION_PLAN: SchoolDocument = {
  id: 'doc-kh-gdhn-35',
  type: 'plan',
  typeLabel: 'Kế hoạch',
  documentNumber: 'Số: 35/KH-THCS&THPTĐBK',
  title: 'KẾ HOẠCH',
  subTitle: 'Thực hiện công tác giáo dục hòa nhập học sinh khuyết tật năm học 2026 - 2027',
  signDate: 'Đồng Tháp, ngày 08 tháng 9 năm 2026',
  createdDate: '2026-09-08T00:00:00.000Z',
  issuingAuthorityTop: 'SỞ GDĐT TỈNH ĐỒNG THÁP',
  issuingAuthority: 'TRƯỜNG THCS VÀ THPT\nĐỐC BINH KIỀU',
  signerRole: 'KT. HIỆU TRƯỞNG\nPHÓ HIỆU TRƯỞNG',
  signerName: 'Nguyễn Minh Trí',
  sourceDirectiveId: 'directive-3326-gdhn',
  sourceDirective: 'Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở GDĐT Đồng Tháp về hướng dẫn công tác giáo dục hòa nhập',
  sourceDirectiveFullText: `Căn cứ Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở GDĐT tỉnh Đồng Tháp về việc hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh khuyết tật tại các cơ sở giáo dục mầm non, phổ thông;\nCăn cứ Luật Người khuyết tật số 51/2010/QH12;\nCăn cứ Thông tư số 03/2018/TT-BGDĐT ngày 29/01/2018 của Bộ GDĐT quy định về giáo dục hòa nhập đối với người khuyết tật;\nCăn cứ Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC về chính sách giáo dục đối với người khuyết tật;\nCăn cứ Kế hoạch Giáo dục Nhà trường số 34/KH-THCS&THPTĐBK ngày 25/9/2026 của Trường THCS và THPT Đốc Binh Kiều.`,
  legalBases: [
    'Luật số 51/2010/QH12 ngày 17/6/2010 của Quốc hội về Người khuyết tật',
    'Thông tư số 03/2018/TT-BGDĐT ngày 29/01/2018 của Bộ trưởng Bộ Giáo dục và Đào tạo quy định về giáo dục hòa nhập đối với người khuyết tật',
    'Thông tư số 15/2026/TT-BGDĐT ngày 24/3/2026 của Bộ trưởng Bộ Giáo dục và Đào tạo ban hành Điều lệ trường tiểu học, trường trung học cơ sở, trường trung học phổ thông và trường phổ thông có nhiều cấp học',
    'Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC ngày 31/12/2013 của Bộ GDĐT, Bộ LĐTBXH và Bộ Tài chính quy định chính sách về giáo dục đối với người khuyết tật',
    'Công văn số 3326/SGDĐT-GDPT ngày 27/8/2026 của Sở Giáo dục và Đào tạo tỉnh Đồng Tháp về việc hướng dẫn công tác giáo dục hòa nhập đối với trẻ em, học sinh khuyết tật tại các cơ sở giáo dục mầm non, phổ thông',
    'Kế hoạch số 34/KH-THCS&THPTĐBK ngày 25/9/2026 của Trường THCS và THPT Đốc Binh Kiều về Kế hoạch Giáo dục Nhà trường năm học 2026 - 2027'
  ],
  sections: [
    {
      heading: 'I. MỤC ĐÍCH, YÊU CẦU',
      content: `1. Mục đích:
- Đảm bảo quyền học tập bình đẳng, nhân văn cho 100% học sinh khuyết tật (HSKT) học hòa nhập tại Trường THCS và THPT Đốc Binh Kiều; tạo môi trường học tập an toàn, thân thiện, không kỳ thị, phân biệt đối xử.
- Phát huy tối đa khả năng, sở trường, mức độ tiến bộ và kỹ năng sống tự lập của từng học sinh khuyết tật; giúp các em từng bước hòa nhập vào tập thể lớp và cộng đồng xã hội.
- Nâng cao năng lực chuyên môn, trách nhiệm sư phạm và tình thương yêu của đội ngũ 102 giáo viên toàn trường đối với học sinh có hoàn cảnh đặc biệt; thực hiện đúng, đủ, kịp thời các chế độ, chính sách ưu đãi của Nhà nước cho học sinh và giáo viên dạy hòa nhập.

2. Yêu cầu:
- Bám sát chỉ đạo chuyên môn tại Công văn số 3326/SGDĐT-GDPT của Sở GDĐT Đồng Tháp: 100% học sinh khuyết tật có Kế hoạch giáo dục cá nhân (KHGDCN) được xây dựng khoa học, thiết thực và theo dõi chặt chẽ tiến bộ theo từng học kỳ.
- Bố trí lớp học hợp lý: Mỗi lớp hòa nhập chỉ bố trí không quá 02 (hai) HSKT. Giảm sĩ số lớp hòa nhập theo đúng quy định để giáo viên bộ môn có điều kiện quan tâm, kèm cặp.
- Kiểm tra, đánh giá theo hướng động viên, khích lệ sự nỗ lực; đánh giá dựa trên mức độ hoàn thành KHGDCN của học sinh; tuyệt đối không áp dụng máy móc thang điểm chuẩn chính khóa đối với các nội dung học sinh đã được miễn, giảm theo quyết định của nhà trường.
- Tinh giản hồ sơ, thủ tục hành chính: Tuyệt đối không lập thêm sổ theo dõi riêng rườm rà, không yêu cầu sao chép lại giấy tờ trùng lặp; quản lý hồ sơ bảo mật, tôn trọng quyền riêng tư của học sinh.`
    },
    {
      heading: 'II. ĐẶC ĐIỂM TÌNH HÌNH HỌC SINH KHUYẾT TẬT CỦA NHÀ TRƯỜNG NĂM HỌC 2026 - 2027',
      content: `1. Quy mô học sinh khuyết tật toàn trường:
Năm học 2026 - 2027, toàn trường có tổng số 53 lớp với 2.111 học sinh, trong đó có 25 học sinh khuyết tật học hòa nhập (chiếm tỷ lệ 1,18% tổng số học sinh toàn trường). Phân bổ cụ thể tại 03 điểm trường như sau:

a) Điểm chính (Cấp THPT - 14 lớp, 530 HS):
- Tổng số: 03 học sinh khuyết tật (01 học sinh khối 10, 01 học sinh khối 11, 01 học sinh khối 12).
- Dạng tật: 01 khuyết tật vận động chi dưới, 01 khuyết tật nhìn (khiếm thị nhẹ), 01 khuyết tật nghe (khiếm thính nhẹ đeo máy trợ thính).
- Bố trí: Xếp đều vào 3 lớp độc lập, đảm bảo mỗi lớp chỉ có đúng 01 HSKT.

b) Điểm Đốc Binh Kiều (Cấp THCS - 24 lớp, 980 HS):
- Tổng số: 16 học sinh khuyết tật (Khối 6: 05 em; Khối 7: 04 em; Khối 8: 04 em; Khối 9: 03 em).
- Dạng tật: 06 khuyết tật trí tuệ/khó khăn học tập nhẹ; 04 khuyết tật vận động; 03 khuyết tật ngôn ngữ/giao tiếp; 02 khuyết tật thính giác; 01 tự kỷ nhẹ.
- Bố trí: Xếp vào 11 lớp học hòa nhập (trong đó 05 lớp có 02 HSKT, 06 lớp có 01 HSKT).

c) Điểm Tân Kiều (Cấp THCS - 15 lớp, 601 HS):
- Tổng số: 06 học sinh khuyết tật (Khối 6: 02 em; Khối 7: 01 em; Khối 8: 02 em; Khối 9: 01 em).
- Dạng tật: 03 khuyết tật trí tuệ nhẹ; 02 khuyết tật vận động; 01 khó khăn đọc viết (chậm phát triển ngôn ngữ).
- Bố trí: Xếp vào 04 lớp học hòa nhập (02 lớp có 02 HSKT, 02 lớp có 01 HSKT).

2. Thuận lợi:
- Được sự quan tâm, chỉ đạo kịp thời, hướng dẫn cụ thể của Sở GDĐT Đồng Tháp thông qua Công văn số 3326/SGDĐT-GDPT.
- Đội ngũ Ban Giám hiệu (04 cán bộ quản lý) và tập thể 102 giáo viên tâm huyết, giàu lòng nhân ái, luôn quan tâm, động viên học sinh yếu thế.
- Cơ sở vật chất 3 điểm trường khang trang, các phòng học ở tầng trệt được ưu tiên sắp xếp cho các lớp có học sinh khuyết tật vận động để các em đi lại an toàn.

3. Khó khăn:
- Nhà trường chưa có giáo viên chuyên trách về giáo dục đặc biệt; giáo viên dạy văn hóa chủ yếu kiêm nhiệm công tác hòa nhập.
- Một số gia đình học sinh có hoàn cảnh kinh tế khó khăn, cha mẹ đi làm ăn xa, việc phối hợp rèn luyện kỹ năng sống tại nhà còn hạn chế.`
    },
    {
      heading: 'III. NHIỆM VỤ VÀ CÁC BIỆN PHÁP TRỌNG TÂM',
      content: `1. Huy động, tiếp nhận và phân công sắp xếp lớp học:
- Phối hợp chặt chẽ với UBND xã Đốc Binh Kiều và xã Tân Kiều trong công tác điều tra phổ cập, rà soát trẻ khuyết tật trong độ tuổi để huy động 100% các em có khả năng học tập đến trường.
- Tiếp nhận học sinh khuyết tật đúng quy định, thủ tục đơn giản; không đặt ra bất kỳ rào cản hay điều kiện nào ngoài quy định.
- Đối với học sinh nghi có khó khăn nhưng chưa có Giấy xác nhận khuyết tật: Nhà trường tiếp tục tổ chức dạy học bình thường, chủ động gặp gỡ cha mẹ học sinh hướng dẫn quy trình, thủ tục đề nghị Hội đồng xác định mức độ khuyết tật cấp xã cấp giấy xác nhận theo quy định của Luật Người khuyết tật.
- Hiệu trưởng ban hành Quyết định phân công giáo viên chủ nhiệm và giáo viên bộ môn dạy các lớp hòa nhập; ưu tiên phân công giáo viên có kinh nghiệm sư phạm vững vàng, giàu lòng vị tha và nhiệt tình.

2. Xây dựng và quản lý Kế hoạch giáo dục cá nhân (KHGDCN):
- Thời gian hoàn thành: Trong tháng 9 năm 2026 (hoàn thành trước ngày 30/9/2026).
- Quy trình: Giáo viên chủ nhiệm chủ trì, phối hợp với giáo viên các bộ môn, cha mẹ học sinh và nhân viên y tế trường học thu thập thông tin về đặc điểm, khả năng, sở trường và nhu cầu của từng em; thống nhất mục tiêu cả năm và mục tiêu Học kỳ I.
- Nội dung KHGDCN áp dụng chuẩn xác theo biểu mẫu Phụ lục đính kèm Công văn số 3326/SGDĐT-GDPT của Sở GDĐT:
  + Phần I: Thông tin chung học sinh và gia đình.
  + Phần II: Đặc điểm chính (Điểm mạnh, Hạn chế, Nhu cầu cụ thể).
  + Phần III: Mục tiêu giáo dục cá nhân năm học (chỉ ghi các môn học/hoạt động cần cá thể hóa, hỗ trợ riêng, không chép toàn bộ chương trình lớp).
  + Phần IV & V: Mục tiêu và Kế hoạch thực hiện Học kỳ I (nội dung, biện pháp, phương tiện, người thực hiện, mức độ đạt: 1 - Đạt, 2 - Đạt cần hỗ trợ, 3 - Chưa đạt).
  + Phần VI: Nhận xét tiến bộ và điều chỉnh sau Học kỳ I.
  + Phần VII, VIII & IX: Mục tiêu, Kế hoạch và Đánh giá Học kỳ II.
- Phê duyệt: Giáo viên chủ trì ký, Cha mẹ học sinh ký xác nhận, Phó Hiệu trưởng Nguyễn Minh Trí ký duyệt đóng dấu lưu trữ.

3. Điều chỉnh nội dung dạy học và thực hiện miễn, giảm môn học:
- Thực hiện nghiêm túc quy định tại Điều 3 Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC:
  + Đối với học sinh khuyết tật vận động nặng: Miễn toàn bộ môn Giáo dục thể chất, nội dung thực hành môn Giáo dục quốc phòng và an ninh (đối với cấp THPT).
  + Đối với học sinh khuyết tật thính giác, ngôn ngữ nặng: Miễn môn Tiếng Anh (hoặc điều chỉnh miễn phần kỹ năng nghe - nói, chỉ đánh giá đọc - viết cơ bản).
  + Đối với học sinh khuyết tật trí tuệ: Điều chỉnh giảm yêu cầu cần đạt của các môn khoa học tự nhiên (Toán, Vật lí, Hóa học); tập trung hình thành kỹ năng đọc hiểu cơ bản, tính toán thông dụng, kỹ năng tự phục vụ và kỹ năng giao tiếp xã hội.
- Thẩm quyền quyết định: Căn cứ đề xuất của Tổ chuyên môn và giáo viên chủ nhiệm, Phó Hiệu trưởng Nguyễn Minh Trí ký ban hành Quyết định miễn, giảm hoặc điều chỉnh nội dung môn học cho từng học sinh và ghi nhận rõ vào KHGDCN.
- Trong giáo án bài dạy hàng ngày: Giáo viên tích hợp nội dung hỗ trợ học sinh khuyết tật vào Kế hoạch bài dạy hiện có; tuyệt đối không yêu cầu soạn một giáo án riêng biệt.

4. Kiểm tra, đánh giá, xét lên lớp và công nhận tốt nghiệp:
- Thực hiện phương châm: "Động viên, khích lệ sự nỗ lực và tiến bộ là chính; không so sánh học sinh khuyết tật với học sinh bình thường".
- Đối với các môn không được miễn: Thực hiện kiểm tra, đánh giá linh hoạt về hình thức (cho phép làm bài tại lớp với thời gian dài hơn, kiểm tra vấn đáp, kiểm tra qua sản phẩm thực hành hoặc đánh giá qua quá trình tham gia hoạt động).
- Đối với các nội dung/môn học đã được miễn theo quyết định: Không ghi điểm số, không tính vào điểm trung bình chung; ghi chú rõ "Được miễn theo quy định về giáo dục hòa nhập".
- Đánh giá định kỳ kết quả rèn luyện và học tập được căn cứ trên mức độ hoàn thành các mục tiêu đề ra trong KHGDCN.
- Xét lên lớp và xét tốt nghiệp THCS, THPT: Thực hiện đúng chính sách ưu tiên theo quy định của Bộ GDĐT và Thông tư liên tịch 42/2013; công nhận học sinh hoàn thành chương trình cấp học khi đạt các mục tiêu cơ bản trong KHGDCN.

5. Hồ sơ và quản lý thông tin tinh gọn, bảo mật:
- Hồ sơ giáo dục hòa nhập gồm đúng 03 thành phần: (1) Hồ sơ học sinh theo quy định chung của cấp học; (2) Bản sao Giấy xác nhận khuyết tật có chứng thực; (3) Kế hoạch giáo dục cá nhân (KHGDCN) bản chính.
- Thực hiện đúng tinh thần Công văn 3326: Tuyệt đối không lập thêm Sổ theo dõi HSKT riêng, không sao chép lại bài kiểm tra thành tập hồ sơ dày cộp. Toàn bộ thông tin được cập nhật vào phần mềm quản lý học sinh và cơ sở dữ liệu ngành giáo dục.
- Tuyệt đối bảo mật thông tin cá nhân và tình trạng khuyết tật của học sinh, không công khai bêu tên các em trong các buổi sinh hoạt chung làm tổn thương tâm lý học sinh.

6. Chế độ, chính sách ưu đãi đối với học sinh và giáo viên:
- Đối với 25 học sinh khuyết tật:
  + Miễn 100% học phí và các khoản đóng góp theo quy định tại Nghị định số 81/2021/NĐ-CP.
  + Hướng dẫn cha mẹ học sinh hoàn thiện hồ sơ để hưởng chính sách trợ cấp xã hội hàng tháng và hỗ trợ chi phí học tập theo Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC.
  + Ưu tiên cấp phát sách giáo khoa, học bổng khuyến học và hỗ trợ đồ dùng học tập từ nguồn quỹ khuyến học của nhà trường và các nhà hảo tâm.
- Đối với giáo viên giảng dạy:
  + Chi trả đầy đủ chế độ phụ cấp trách nhiệm giảng dạy hòa nhập theo quy định tại Thông tư liên tịch số 42/2013/TTLT-BGDĐT-BLĐTBXH-BTC (tính theo số tiết dạy thực tế có học sinh khuyết tật và hệ số lương tương ứng).
  + Bộ phận Kế toán tổng hợp số tiết dạy hòa nhập hàng tháng, tham mưu thanh toán đúng kỳ cùng với tiền lương, đảm bảo minh bạch, không để giáo viên bị thiệt thòi quyền lợi.`
    },
    {
      heading: 'IV. KINH PHÍ VÀ CƠ SỞ VẬT CHẤT HỖ TRỢ',
      content: `1. Cơ sở vật chất và an toàn trường học:
- Bố trí 100% các lớp học có học sinh khuyết tật vận động tại tầng trệt ở cả 3 điểm trường (Điểm chính, Điểm Đốc Binh Kiều, Điểm Tân Kiều).
- Đảm bảo bàn ghế đúng quy cách, có lối đi thuận tiện cho xe lăn hoặc nạng chống; hệ thống chiếu sáng, quạt mát trong phòng học đạt tiêu chuẩn.
- Bố trí phòng y tế học đường tại cả 3 điểm trường có đầy đủ thuốc thiết yếu, cán bộ y tế túc trực sơ cấp cứu khi học sinh có biểu hiện mệt mỏi hoặc trở ngại sức khỏe.

2. Kinh phí thực hiện:
- Nguồn ngân sách nhà nước cấp sự nghiệp giáo dục năm 2026 và 2027 được sử dụng chi trả chế độ phụ cấp dạy hòa nhập cho giáo viên và mua sắm bổ sung đồ dùng hỗ trợ giáo dục hòa nhập.
- Nguồn quỹ Khuyến học nhà trường, Ban đại diện Cha mẹ học sinh và các nguồn tài trợ hợp pháp để khen thưởng, trao học bổng cho học sinh khuyết tật vượt khó vươn lên trong học tập.`
    },
    {
      heading: 'V. TỔ CHỨC THỰC HIỆN',
      content: `1. Ban Giám hiệu nhà trường:
- Thầy Hiệu trưởng Lê Thanh Cường: Chỉ đạo chung; phê duyệt các quyết định phân công chuyên môn, quyết định phê duyệt KHGDCN và chi trả chế độ chính sách.
- Thầy Phó Hiệu trưởng Nguyễn Minh Trí (Trưởng ban Giáo dục hòa nhập):
  + Trực tiếp xây dựng và chỉ đạo thực hiện Kế hoạch này; phê duyệt Kế hoạch giáo dục cá nhân (KHGDCN) của 25 học sinh khuyết tật; ban hành quyết định miễn, giảm, điều chỉnh môn học theo thẩm quyền.
  + Thường xuyên kiểm tra, dự giờ các lớp học hòa nhập tại cả 3 điểm trường; kịp thời tháo gỡ khó khăn về phương pháp giảng dạy cho giáo viên.
  + Chủ trì sơ kết công tác hòa nhập cuối Học kỳ I và tổng kết năm học; báo cáo kết quả về Phòng Giáo dục Phổ thông Sở GDĐT Đồng Tháp.

2. Các Tổ chuyên môn (06 tổ chuyên môn):
- Tổ chức sinh hoạt chuyên môn chuyên đề: "Phương pháp dạy học phân hóa và hỗ trợ học sinh khuyết tật trong lớp học hòa nhập".
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
- Kịp thời phản ánh với giáo viên chủ nhiệm và Ban Giám hiệu về những chuyển biến hoặc khó khăn của học sinh để điều chỉnh kế hoạch kịp thời.

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
 * Phân bổ chuẩn xác theo hồ sơ quản lý thực tế tại 3 điểm trường
 */
export interface InclusiveStudentProfile {
  id: string;
  code: string; // Mã hồ sơ HSKT
  fullName: string;
  birthYear: number;
  gender: 'Nam' | 'Nữ';
  grade: 'Khối 6' | 'Khối 7' | 'Khối 8' | 'Khối 9' | 'Khối 10' | 'Khối 11' | 'Khối 12';
  className: string;
  schoolCampus: 'Điểm chính (THPT)' | 'Điểm Đốc Binh Kiều (THCS)' | 'Điểm Tân Kiều (THCS)';
  disabilityType: string;
  disabilityLevel: 'Nhẹ' | 'Vừa' | 'Nặng';
  certNumber: string; // Số Giấy xác nhận khuyết tật do UBND xã cấp
  certDate: string;
  leadTeacher: string; // Giáo viên chủ trì KHGDCN (GVCN)
  supportMeasures: string; // Biện pháp hỗ trợ chính
  exemptedSubjects: string; // Môn được miễn, giảm
  planStatus: 'Đã hoàn thành KHGDCN' | 'Đang theo dõi HK I' | 'Đang rà soát';
}

export const INCLUSIVE_STUDENTS_LIST: InclusiveStudentProfile[] = [
  // CẤP THPT - ĐIỂM CHÍNH (03 HS)
  {
    id: 'hskt-thpt-01',
    code: 'HSKT-ĐBK-10A1-01',
    fullName: 'Lê Văn An',
    birthYear: 2011,
    gender: 'Nam',
    grade: 'Khối 10',
    className: '10A1',
    schoolCampus: 'Điểm chính (THPT)',
    disabilityType: 'Khuyết tật nhìn (Khiếm thị nhẹ, thị lực giảm nặng mắt trái)',
    disabilityLevel: 'Nhẹ',
    certNumber: '42/XN-KT/UBND-ĐBK',
    certDate: '15/06/2024',
    leadTeacher: 'Nguyễn Văn Hải (GVCN 10A1)',
    supportMeasures: 'Bố trí ngồi bàn đầu dãy giữa, phóng to cỡ chữ tài liệu, hỗ trợ chiếu sáng',
    exemptedSubjects: 'Điều chỉnh bài kiểm tra trắc nghiệm cỡ chữ 18pt; miễn phần thực hành quan sát kính hiển vi môn Sinh',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-thpt-02',
    code: 'HSKT-ĐBK-11A2-01',
    fullName: 'Trần Thị Mỹ Duyên',
    birthYear: 2010,
    gender: 'Nữ',
    grade: 'Khối 11',
    className: '11A2',
    schoolCampus: 'Điểm chính (THPT)',
    disabilityType: 'Khuyết tật vận động (Liệt nhẹ chi dưới bẩm sinh, đi lại cần nạng hỗ trợ)',
    disabilityLevel: 'Vừa',
    certNumber: '19/XN-KT/UBND-ĐBK',
    certDate: '20/08/2023',
    leadTeacher: 'Phạm Thị Thùy Dung (GVCN 11A2)',
    supportMeasures: 'Phòng học bố trí tầng trệt, bàn ghế kê sát cửa ra vào, có bạn giúp đỡ di chuyển',
    exemptedSubjects: 'Miễn toàn bộ môn Giáo dục thể chất và phần thực hành điều lệnh môn GDQP-AN',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-thpt-03',
    code: 'HSKT-ĐBK-12A3-01',
    fullName: 'Nguyễn Quốc Bảo',
    birthYear: 2009,
    gender: 'Nam',
    grade: 'Khối 12',
    className: '12A3',
    schoolCampus: 'Điểm chính (THPT)',
    disabilityType: 'Khuyết tật nghe (Khiếm thính nhẹ tai phải, đeo máy trợ thính)',
    disabilityLevel: 'Nhẹ',
    certNumber: '55/XN-KT/UBND-TK',
    certDate: '10/09/2022',
    leadTeacher: 'Đặng Hoàng Nam (GVCN 12A3)',
    supportMeasures: 'Bố trí ngồi bàn đầu đối diện giáo viên, giáo viên nói rõ, có phụ đề bài giảng',
    exemptedSubjects: 'Miễn kỹ năng Nghe (Listening) môn Tiếng Anh trong các bài kiểm tra định kỳ',
    planStatus: 'Đã hoàn thành KHGDCN',
  },

  // CẤP THCS - ĐIỂM ĐỐC BINH KIỀU (16 HS)
  {
    id: 'hskt-dbk-01',
    code: 'HSKT-ĐBK-6A1-01',
    fullName: 'Phạm Huỳnh Minh Khoa',
    birthYear: 2015,
    gender: 'Nam',
    grade: 'Khối 6',
    className: '6A1',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ nhẹ (Chậm tiếp thu, khó khăn ghi nhớ)',
    disabilityLevel: 'Nhẹ',
    certNumber: '08/XN-KT/UBND-ĐBK',
    certDate: '12/05/2025',
    leadTeacher: 'Võ Thị Bích Liên (GVCN 6A1)',
    supportMeasures: 'Hướng dẫn lặp lại nhiều lần, chia nhỏ kiến thức, sử dụng tranh ảnh trực quan',
    exemptedSubjects: 'Điều chỉnh yêu cầu môn Toán và KHTN: chỉ làm các câu hỏi nhận biết cơ bản',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-02',
    code: 'HSKT-ĐBK-6A2-01',
    fullName: 'Đặng Ngọc Ánh',
    birthYear: 2015,
    gender: 'Nữ',
    grade: 'Khối 6',
    className: '6A2',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật ngôn ngữ (Nói ngọng nặng, khó diễn đạt câu dài)',
    disabilityLevel: 'Nhẹ',
    certNumber: '11/XN-KT/UBND-ĐBK',
    certDate: '22/07/2025',
    leadTeacher: 'Nguyễn Thanh Tùng (GVCN 6A2)',
    supportMeasures: 'Kiên nhẫn lắng nghe, khuyến khích trả lời viết, không ngắt lời',
    exemptedSubjects: 'Miễn trả lời miệng môn Ngữ văn và Tiếng Anh; thay thế bằng trả lời qua phiếu viết',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-03',
    code: 'HSKT-ĐBK-6A3-01',
    fullName: 'Lê Thành Đạt',
    birthYear: 2015,
    gender: 'Nam',
    grade: 'Khối 6',
    className: '6A3',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật vận động (Bại liệt nhẹ tay phải, cầm viết khó khăn)',
    disabilityLevel: 'Vừa',
    certNumber: '15/XN-KT/UBND-ĐBK',
    certDate: '05/06/2025',
    leadTeacher: 'Trần Thị Kim Loan (GVCN 6A3)',
    supportMeasures: 'Bàn ghế kê vừa tầm với, cho phép kéo dài thêm 15 phút thời gian làm bài kiểm tra',
    exemptedSubjects: 'Miễn nội dung ném bóng, xà đơn trong môn GDTC; không chấm điểm chữ đẹp',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-04',
    code: 'HSKT-ĐBK-6A4-01',
    fullName: 'Huỳnh Gia Hân',
    birthYear: 2015,
    gender: 'Nữ',
    grade: 'Khối 6',
    className: '6A4',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Tự kỷ nhẹ (Hạn chế tương tác xã hội, nhạy cảm với tiếng ồn)',
    disabilityLevel: 'Nhẹ',
    certNumber: '21/XN-KT/UBND-ĐBK',
    certDate: '18/08/2025',
    leadTeacher: 'Lê Thị Thu Hằng (GVCN 6A4)',
    supportMeasures: 'Xây dựng góc tĩnh tâm ở lớp, có bạn thân đồng hành trong các hoạt động nhóm',
    exemptedSubjects: 'Điều chỉnh không bắt buộc thuyết trình trước đám đông trong Hoạt động trải nghiệm',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-05',
    code: 'HSKT-ĐBK-6A5-01',
    fullName: 'Trương Hoàng Nam',
    birthYear: 2015,
    gender: 'Nam',
    grade: 'Khối 6',
    className: '6A5',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật thính giác (Khiếm thính mức độ nhẹ cả 2 tai)',
    disabilityLevel: 'Nhẹ',
    certNumber: '29/XN-KT/UBND-TK',
    certDate: '02/08/2025',
    leadTeacher: 'Đỗ Văn Phúc (GVCN 6A5)',
    supportMeasures: 'Ngồi bàn đầu đối diện bục giảng, giáo viên viết tóm tắt đề mục lên bảng',
    exemptedSubjects: 'Miễn phần thi nghe môn Tiếng Anh',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-06',
    code: 'HSKT-ĐBK-7A1-01',
    fullName: 'Nguyễn Văn Hùng',
    birthYear: 2014,
    gender: 'Nam',
    grade: 'Khối 7',
    className: '7A1',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ (Học chậm, tiếp thu hạn chế)',
    disabilityLevel: 'Nhẹ',
    certNumber: '05/XN-KT/UBND-ĐBK',
    certDate: '14/09/2024',
    leadTeacher: 'Trịnh Thị Lan (GVCN 7A1)',
    supportMeasures: 'Giao bài tập mức độ nhận biết, hướng dẫn kèm cặp từng bước',
    exemptedSubjects: 'Giảm nội dung lý thuyết trừu tượng môn Toán 7, KHTN 7',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-07',
    code: 'HSKT-ĐBK-7A2-01',
    fullName: 'Bùi Thị Mai',
    birthYear: 2014,
    gender: 'Nữ',
    grade: 'Khối 7',
    className: '7A2',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật vận động chi dưới',
    disabilityLevel: 'Nhẹ',
    certNumber: '18/XN-KT/UBND-ĐBK',
    certDate: '09/07/2024',
    leadTeacher: 'Ngô Quốc Dũng (GVCN 7A2)',
    supportMeasures: 'Lớp học tầng 1 (trệt), có tay vịn cầu thang, bàn học phù hợp',
    exemptedSubjects: 'Miễn các bài chạy cự ly, nhảy cao trong môn GDTC',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-08',
    code: 'HSKT-ĐBK-7A3-01',
    fullName: 'Võ Minh Quân',
    birthYear: 2014,
    gender: 'Nam',
    grade: 'Khối 7',
    className: '7A3',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật ngôn ngữ (Nói ngọng, phản xạ giao tiếp chậm)',
    disabilityLevel: 'Nhẹ',
    certNumber: '25/XN-KT/UBND-ĐBK',
    certDate: '12/08/2024',
    leadTeacher: 'Đinh Thị Cẩm Nhung (GVCN 7A3)',
    supportMeasures: 'Rèn luyện nói chậm từng từ, động viên tham gia phát biểu theo cặp',
    exemptedSubjects: 'Không kiểm tra đọc diễn cảm miệng môn Ngữ văn',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-09',
    code: 'HSKT-ĐBK-7A4-01',
    fullName: 'Lê Hoàng Yến',
    birthYear: 2014,
    gender: 'Nữ',
    grade: 'Khối 7',
    className: '7A4',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ nhẹ',
    disabilityLevel: 'Nhẹ',
    certNumber: '31/XN-KT/UBND-ĐBK',
    certDate: '19/08/2024',
    leadTeacher: 'Hoàng Văn Thắng (GVCN 7A4)',
    supportMeasures: 'Phân công bạn học giỏi ngồi cùng bàn hỗ trợ, hướng dẫn học theo sơ đồ tư duy',
    exemptedSubjects: 'Giảm yêu cầu bài tập nâng cao các môn tự nhiên',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-10',
    code: 'HSKT-ĐBK-8A1-01',
    fullName: 'Trần Văn Thiện',
    birthYear: 2013,
    gender: 'Nam',
    grade: 'Khối 8',
    className: '8A1',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật vận động tay trái',
    disabilityLevel: 'Nhẹ',
    certNumber: '14/XN-KT/UBND-ĐBK',
    certDate: '10/05/2023',
    leadTeacher: 'Bùi Thị Thanh Tâm (GVCN 8A1)',
    supportMeasures: 'Hỗ trợ nâng đỡ trang bị thí nghiệm môn KHTN',
    exemptedSubjects: 'Miễn nội dung chống đẩy, xà đơn trong GDTC',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-11',
    code: 'HSKT-ĐBK-8A2-01',
    fullName: 'Nguyễn Thị Cẩm Tú',
    birthYear: 2013,
    gender: 'Nữ',
    grade: 'Khối 8',
    className: '8A2',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ nhẹ',
    disabilityLevel: 'Nhẹ',
    certNumber: '22/XN-KT/UBND-ĐBK',
    certDate: '15/07/2023',
    leadTeacher: 'Lý Quốc Huy (GVCN 8A2)',
    supportMeasures: 'Tập trung rèn kỹ năng tự học và giải toán đơn giản',
    exemptedSubjects: 'Điều chỉnh đề kiểm tra Toán và Hóa học 8',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-12',
    code: 'HSKT-ĐBK-8A3-01',
    fullName: 'Lâm Văn Tài',
    birthYear: 2013,
    gender: 'Nam',
    grade: 'Khối 8',
    className: '8A3',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật thính giác nhẹ',
    disabilityLevel: 'Nhẹ',
    certNumber: '33/XN-KT/UBND-TK',
    certDate: '01/08/2023',
    leadTeacher: 'Vũ Thị Hồng Hạnh (GVCN 8A3)',
    supportMeasures: 'Bố trí ngồi bàn 1, giáo viên phát âm to, rõ',
    exemptedSubjects: 'Miễn phần thi nghe môn Tiếng Anh',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-13',
    code: 'HSKT-ĐBK-8A4-01',
    fullName: 'Dương Thị Thu Thảo',
    birthYear: 2013,
    gender: 'Nữ',
    grade: 'Khối 8',
    className: '8A4',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật ngôn ngữ',
    disabilityLevel: 'Nhẹ',
    certNumber: '38/XN-KT/UBND-ĐBK',
    certDate: '11/08/2023',
    leadTeacher: 'Tạ Văn Đức (GVCN 8A4)',
    supportMeasures: 'Khuyến khích giao tiếp bằng câu ngắn, dùng cử chỉ và viết',
    exemptedSubjects: 'Miễn đọc to trước lớp',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-14',
    code: 'HSKT-ĐBK-9A1-01',
    fullName: 'Hồ Hoàng Long',
    birthYear: 2012,
    gender: 'Nam',
    grade: 'Khối 9',
    className: '9A1',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật vận động chi dưới',
    disabilityLevel: 'Vừa',
    certNumber: '09/XN-KT/UBND-ĐBK',
    certDate: '10/06/2022',
    leadTeacher: 'Cao Thị Thu Trang (GVCN 9A1)',
    supportMeasures: 'Lớp học trệt, bạn bè hỗ trợ mang cặp, đưa đón',
    exemptedSubjects: 'Miễn toàn bộ môn Giáo dục thể chất',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-15',
    code: 'HSKT-ĐBK-9A2-01',
    fullName: 'Phan Thị Diệu Hiền',
    birthYear: 2012,
    gender: 'Nữ',
    grade: 'Khối 9',
    className: '9A2',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ nhẹ',
    disabilityLevel: 'Nhẹ',
    certNumber: '17/XN-KT/UBND-ĐBK',
    certDate: '25/07/2022',
    leadTeacher: 'Trần Văn Minh (GVCN 9A2)',
    supportMeasures: 'Ôn tập kiến thức cơ bản lớp 9, tư vấn hướng nghiệp học nghề',
    exemptedSubjects: 'Điều chỉnh đề kiểm tra Toán, Văn 9 mức độ cơ bản; xét tốt nghiệp theo KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-dbk-16',
    code: 'HSKT-ĐBK-9A3-01',
    fullName: 'Nguyễn Tấn Lực',
    birthYear: 2012,
    gender: 'Nam',
    grade: 'Khối 9',
    className: '9A3',
    schoolCampus: 'Điểm Đốc Binh Kiều (THCS)',
    disabilityType: 'Khuyết tật nhìn (Thị lực kém)',
    disabilityLevel: 'Nhẹ',
    certNumber: '26/XN-KT/UBND-ĐBK',
    certDate: '08/08/2022',
    leadTeacher: 'Lê Văn Trọng (GVCN 9A3)',
    supportMeasures: 'Ngồi đầu dãy bàn, đề kiểm tra in chữ to 16pt',
    exemptedSubjects: 'Không chấm các bài vẽ biểu đồ quá chi tiết trong Địa lý',
    planStatus: 'Đã hoàn thành KHGDCN',
  },

  // CẤP THCS - ĐIỂM TÂN KIỀU (06 HS)
  {
    id: 'hskt-tk-01',
    code: 'HSKT-TK-6B1-01',
    fullName: 'Lê Phúc Hậu',
    birthYear: 2015,
    gender: 'Nam',
    grade: 'Khối 6',
    className: '6B1',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ nhẹ (Chậm hiểu, hay quên)',
    disabilityLevel: 'Nhẹ',
    certNumber: '03/XN-KT/UBND-TK',
    certDate: '15/06/2025',
    leadTeacher: 'Nguyễn Văn Đạt (GVCN 6B1)',
    supportMeasures: 'Kèm cặp riêng sau buổi học, hướng dẫn phương pháp học trực quan',
    exemptedSubjects: 'Điều chỉnh yêu cầu cần đạt môn Toán và KHTN 6',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-tk-02',
    code: 'HSKT-TK-6B2-01',
    fullName: 'Nguyễn Thị Hồng Nhung',
    birthYear: 2015,
    gender: 'Nữ',
    grade: 'Khối 6',
    className: '6B2',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    disabilityType: 'Khó khăn đọc viết (Chậm phát triển ngôn ngữ)',
    disabilityLevel: 'Nhẹ',
    certNumber: '07/XN-KT/UBND-TK',
    certDate: '28/07/2025',
    leadTeacher: 'Trần Thị Ngọc Giàu (GVCN 6B2)',
    supportMeasures: 'Rèn đọc từng đoạn ngắn, không bắt đọc trước lớp đông',
    exemptedSubjects: 'Miễn đánh giá đọc diễn cảm môn Ngữ văn',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-tk-03',
    code: 'HSKT-TK-7B1-01',
    fullName: 'Trần Quốc Đạt',
    birthYear: 2014,
    gender: 'Nam',
    grade: 'Khối 7',
    className: '7B1',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    disabilityType: 'Khuyết tật vận động chi dưới',
    disabilityLevel: 'Nhẹ',
    certNumber: '12/XN-KT/UBND-TK',
    certDate: '19/08/2024',
    leadTeacher: 'Lê Hoàng Khang (GVCN 7B1)',
    supportMeasures: 'Phòng học trệt, bàn ghế thuận tiện lối đi',
    exemptedSubjects: 'Miễn các nội dung chạy nhanh, nhảy xa trong GDTC 7',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-tk-04',
    code: 'HSKT-TK-8B1-01',
    fullName: 'Phạm Thị Thúy Kiều',
    birthYear: 2013,
    gender: 'Nữ',
    grade: 'Khối 8',
    className: '8B1',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ nhẹ',
    disabilityLevel: 'Nhẹ',
    certNumber: '16/XN-KT/UBND-TK',
    certDate: '04/07/2023',
    leadTeacher: 'Nguyễn Thị Thu Cúc (GVCN 8B1)',
    supportMeasures: 'Giáo viên bộ môn hướng dẫn bài tập cơ bản, khích lệ tự tin',
    exemptedSubjects: 'Giảm độ khó bài kiểm tra định kỳ các môn tự nhiên',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-tk-05',
    code: 'HSKT-TK-8B2-01',
    fullName: 'Võ Minh Luân',
    birthYear: 2013,
    gender: 'Nam',
    grade: 'Khối 8',
    className: '8B2',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    disabilityType: 'Khuyết tật vận động (Bàn tay phải yếu, viết chậm)',
    disabilityLevel: 'Nhẹ',
    certNumber: '20/XN-KT/UBND-TK',
    certDate: '12/08/2023',
    leadTeacher: 'Đoàn Văn Tốt (GVCN 8B2)',
    supportMeasures: 'Cho phép dùng bài in sẵn điền khuyết, kéo dài thời gian kiểm tra',
    exemptedSubjects: 'Miễn môn Thể dục phần xà, ném bóng',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
  {
    id: 'hskt-tk-06',
    code: 'HSKT-TK-9B1-01',
    fullName: 'Bùi Thanh Trúc',
    birthYear: 2012,
    gender: 'Nữ',
    grade: 'Khối 9',
    className: '9B1',
    schoolCampus: 'Điểm Tân Kiều (THCS)',
    disabilityType: 'Khuyết tật trí tuệ nhẹ',
    disabilityLevel: 'Nhẹ',
    certNumber: '24/XN-KT/UBND-TK',
    certDate: '18/06/2022',
    leadTeacher: 'Huỳnh Văn Sang (GVCN 9B1)',
    supportMeasures: 'Ôn tập kiến thức cốt lõi, phối hợp gia đình tư vấn hướng nghiệp',
    exemptedSubjects: 'Xét tốt nghiệp THCS theo kết quả thực hiện KHGDCN',
    planStatus: 'Đã hoàn thành KHGDCN',
  },
];

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Header,
  Footer,
  PageNumber,
  AlignmentType,
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';
import {
  DOCX_PAGE_SETUP,
  FONT_SIZES,
  createBodyParagraph,
  createChapterHeading,
  createArticleHeading,
  createLegalBasisParagraph,
  createDocumentTitleBlock,
  createPartyDocHeaderTable,
  createSignatureBlockTable,
  createSubItem,
} from '../src/utils/docxStandards';

export async function generateAllPartyDocuments() {
  console.log('--- BẮT ĐẦU TẠO 4 VĂN KIỆN CÔNG TÁC ĐẢNG BỘ CHUẨN ĐÚNG THỂ THỨC NGHỊ ĐỊNH 30 & ĐẢNG ---');

  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  const dangBoDir = path.join(process.cwd(), 'ĐẢNG BỘ');
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });
  if (!fs.existsSync(dangBoDir)) fs.mkdirSync(dangBoDir, { recursive: true });

  const commonPageProps = {
    page: {
      size: DOCX_PAGE_SETUP.size,
      margin: DOCX_PAGE_SETUP.margin,
    },
  };

  const createCommonFooter = () =>
    new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'Trang ', font: 'Times New Roman', size: 20 }),
            new TextRun({ children: [PageNumber.CURRENT], font: 'Times New Roman', size: 20 }),
            new TextRun({ text: ' / ', font: 'Times New Roman', size: 20 }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: 'Times New Roman', size: 20 }),
          ],
        }),
      ],
    });

  // =========================================================================
  // FILE 1: 01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx
  // =========================================================================
  console.log('Generating File 1: Quy chế làm việc BCH Đảng bộ 2025 - 2030 (Chuẩn thể thức)...');

  const doc1 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: FONT_SIZES.BODY },
          paragraph: { spacing: { line: 280, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: commonPageProps,
        footers: { default: createCommonFooter() },
        children: [
          createPartyDocHeaderTable('01-QC/ĐU', 'Đốc Binh Kiều, ngày 16 tháng 9 năm 2026', 'ĐẢNG BỘ XÃ ĐỐC BINH KIỀU'),
          ...createDocumentTitleBlock('QUY CHẾ LÀM VIỆC', 'CỦA BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU\nKHÓA I, NHIỆM KỲ 2025 – 2030'),

          createLegalBasisParagraph('Căn cứ Điều lệ Đảng Cộng sản Việt Nam;'),
          createLegalBasisParagraph('Căn cứ Quy định số 294-QĐ/TW ngày 26/5/2025 của Ban Chấp hành Trung ương Đảng về thi hành Điều lệ Đảng;'),
          createLegalBasisParagraph('Căn cứ chủ trương của Trung ương và Tỉnh ủy Đồng Tháp về tổ chức mô hình chính quyền địa phương 02 cấp và sáp nhập đơn vị hành chính xã Tân Kiều vào xã Đốc Binh Kiều;'),
          createLegalBasisParagraph('Căn cứ Quyết định của Ủy ban nhân dân tỉnh Đồng Tháp về việc sáp nhập Trường THPT Đốc Binh Kiều, Trường THCS Đốc Binh Kiều và Trường THCS Tân Kiều thành Trường THCS và THPT Đốc Binh Kiều;'),
          createLegalBasisParagraph('Căn cứ Quyết định của Ban Thường vụ Đảng ủy xã Đốc Binh Kiều về việc chỉ định Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030 gồm 10 đồng chí;'),
          createLegalBasisParagraph('Căn cứ Nghị quyết Đại hội Đảng bộ xã Đốc Binh Kiều và Phương hướng, mục tiêu, nhiệm vụ công tác xây dựng Đảng của Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030;', true),

          createBodyParagraph('Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030 ban hành Quy chế làm việc như sau:'),

          ...createChapterHeading('Chương I', 'NHIỆM VỤ, QUYỀN HẠN CỦA TẬP THỂ'),
          createArticleHeading('Điều 1. Nhiệm vụ, quyền hạn của Ban Chấp hành Đảng bộ'),
          createBodyParagraph('1. Thực hiện đầy đủ nhiệm vụ, quyền hạn của cấp uỷ cơ sở trực thuộc Đảng bộ xã Đốc Binh Kiều theo quy định của Điều lệ Đảng, các quy định, hướng dẫn của Trung ương, Tỉnh ủy Đồng Tháp và Đảng ủy xã Đốc Binh Kiều. Lãnh đạo, chỉ đạo toàn diện các tổ chức trong hệ thống chính trị nhà trường (Ban Giám hiệu, Công đoàn cơ sở, Đoàn TNCS Hồ Chí Minh, Hội Khuyến học) và 03 chi bộ trực thuộc, cùng toàn thể 85 đảng viên, 120 cán bộ, giáo viên, nhân viên thực hiện nghiêm đường lối, chủ trương của Đảng, chính sách, pháp luật của Nhà nước.'),
          createBodyParagraph('2. Lãnh đạo thực hiện thắng lợi nhiệm vụ chính trị trọng tâm của đơn vị mới sau sáp nhập: Quản lý và phát triển chất lượng dạy và học trên cả 03 điểm trường (Điểm chính THPT Đốc Binh Kiều, Điểm THCS Đốc Binh Kiều, Điểm THCS Tân Kiều thuộc địa bàn xã Đốc Binh Kiều sau sáp nhập) với quy mô 53 lớp, 2.111 học sinh (trong đó có 25 học sinh khuyết tật học hòa nhập); cụ thể hóa các chỉ đạo chuyên môn của Sở Giáo dục và Đào tạo Đồng Tháp và nhiệm vụ phát triển kinh tế - xã hội của Đảng ủy, UBND xã Đốc Binh Kiều.'),
          createBodyParagraph('3. Quyết định chương trình làm việc toàn khóa, chương trình công tác và kế hoạch kiểm tra, giám sát hằng năm của Đảng ủy; ban hành Quy chế làm việc của Đảng ủy, phân công nhiệm vụ cụ thể cho từng Đảng ủy viên; ban hành các nghị quyết chuyên đề về nâng cao chất lượng giáo dục, chuyển đổi số và công tác cán bộ.'),
          createBodyParagraph('4. Lãnh đạo công tác xây dựng Đảng vững mạnh về chính trị, tư tưởng, đạo đức, tổ chức và cán bộ:'),
          createSubItem('-', 'Tổ chức học tập, quán triệt sâu sắc các nghị quyết, chỉ thị, kết luận của Trung ương và Đảng bộ xã Đốc Binh Kiều; bảo vệ nền tảng tư tưởng của Đảng, kiên quyết đấu tranh phản bác các quan điểm sai trái, thù địch theo Nghị quyết số 35-NQ/TW của Bộ Chính trị.', { boldPrefix: false }),
          createSubItem('-', 'Đẩy mạnh việc học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh gắn với thực hiện Kết luận số 21-KL/TW về xây dựng, chỉnh đốn Đảng; xây dựng chuẩn mực văn hóa nhà trường, tinh thần tương trợ, đoàn kết thống nhất giữa đội ngũ giáo viên từ 3 trường sau sáp nhập; phấn đấu trong nhiệm kỳ có ít nhất 02 mô hình tập thể, cá nhân tiêu biểu được Đảng ủy cấp trên khen thưởng.', { boldPrefix: false }),
          createBodyParagraph('5. Lãnh đạo, chỉ đạo 03 chi bộ trực thuộc (Chi bộ 1, Chi bộ 2, Chi bộ 3) thực hiện tốt quy chế dân chủ ở cơ sở; thường xuyên lắng nghe, nắm bắt và giải quyết kịp thời tâm tư, nguyện vọng của cán bộ, giáo viên, nhân viên, học sinh và nhân dân trên địa bàn xã Đốc Binh Kiều.'),
          createBodyParagraph('6. Lãnh đạo công tác phát triển đảng viên mới: Chú trọng phát hiện, bồi dưỡng nguồn kết nạp là giáo viên trẻ, giáo viên dạy giỏi và đoàn viên học sinh lớp 12 ưu tú; phấn đấu hàng năm kết nạp từ 03 - 04 đảng viên mới, hoàn thành và vượt chỉ tiêu Đảng ủy xã Đốc Binh Kiều giao.'),
          createBodyParagraph('7. Lãnh đạo công tác tổ chức, cán bộ theo phân cấp quản lý: Tham gia ý kiến, kiến nghị với Sở GDĐT Đồng Tháp về quy hoạch, bổ nhiệm cán bộ quản lý (Ban Giám hiệu); quyết định theo thẩm quyền việc quy hoạch cấp ủy, bổ nhiệm tổ trưởng, tổ phó chuyên môn, nâng lương, thi đua khen thưởng và kỷ luật viên chức.'),
          createBodyParagraph('8. Lãnh đạo và tổ chức thực hiện công tác kiểm tra, giám sát, kỷ luật của Đảng; đấu tranh phòng, chống tham nhũng, lãng phí, tiêu cực; ngăn chặn, đẩy lùi suy thoái về tư tưởng chính trị, đạo đức, lối sống, “tự diễn biến”, “tự chuyển hóa” trong nội bộ.'),
          createBodyParagraph('9. Quyết định các chủ trương, biện pháp quan trọng về đầu tư cơ sở vật chất, quản lý trang thiết bị dạy học, tài chính công khai và phân bổ nguồn lực công bằng giữa 3 điểm trường, bảo đảm điều kiện tốt nhất cho 53 lớp học.'),
          createBodyParagraph('10. Định kỳ tổ chức tự phê bình và phê bình, lấy phiếu tín nhiệm cán bộ quản lý theo quy định; thực hiện nghiêm túc chế độ báo cáo định kỳ và đột xuất với Ban Thường vụ Đảng ủy xã Đốc Binh Kiều và Sở GDĐT Đồng Tháp.'),

          ...createChapterHeading('Chương II', 'NHIỆM VỤ, QUYỀN HẠN CỦA CÁ NHÂN CÁC ĐỒNG CHÍ ĐẢNG ỦY VIÊN'),
          createArticleHeading('Điều 2. Nhiệm vụ, quyền hạn chung của Đảng ủy viên'),
          createBodyParagraph('1. Chịu trách nhiệm trước Ban Chấp hành Đảng bộ về toàn bộ kết quả lãnh đạo, chỉ đạo trong lĩnh vực, chi bộ hoặc cơ sở trường được phân công phụ trách.'),
          createBodyParagraph('2. Nêu cao tính tiên phong, gương mẫu chấp hành Cương lĩnh chính trị, Điều lệ Đảng, chính sách pháp luật của Nhà nước và quy tắc ứng xử nhà giáo; giữ gìn khối đoàn kết thống nhất nội bộ; kiên quyết phòng, chống quan liêu, tham nhũng, lãng phí.'),
          createBodyParagraph('3. Tham gia đầy đủ, đúng giờ các kỳ họp của Đảng ủy; chủ động nghiên cứu tài liệu, tích cực thảo luận, biểu quyết các chủ trương, nghị quyết của Đảng ủy và nghiêm túc thực hiện nghị quyết khi đã được tập thể thông qua.'),
          createBodyParagraph('4. Thường xuyên giữ mối liên hệ chặt chẽ với cán bộ, đảng viên, viên chức và học sinh ở cơ sở; chịu sự giám sát của tổ chức đảng và nhân dân nơi công tác, cư trú.'),

          createArticleHeading('Điều 3. Nhiệm vụ, quyền hạn của Bí thư Đảng uỷ - Đồng chí Lê Thanh Cường (Hiệu trưởng)'),
          createBodyParagraph('1. Là người đứng đầu Ban Chấp hành Đảng bộ, chịu trách nhiệm cao nhất trước Đảng ủy xã Đốc Binh Kiều, Giám đốc Sở GDĐT và Đảng bộ trường về toàn bộ hoạt động lãnh đạo của Đảng ủy và nhà trường trên cả 03 điểm trường.'),
          createBodyParagraph('2. Chủ trì các công việc của Đảng ủy; triệu tập, chủ trì và kết luận các hội nghị của Đảng ủy; chủ động trao đổi trong Thường trực Đảng ủy về những chủ trương lớn, chiến lược phát triển giáo dục sau sáp nhập.'),
          createBodyParagraph('3. Trực tiếp chỉ đạo công tác tổ chức, cán bộ; công tác quy hoạch nguồn cấp ủy, Ban Giám hiệu, tổ trưởng chuyên môn; chỉ đạo công tác bảo vệ chính trị nội bộ và công tác tài chính, tài sản nhà trường.'),
          createBodyParagraph('4. Trực tiếp lãnh đạo, chỉ đạo các nhiệm vụ đột phá trọng tâm toàn khóa: Nâng cao chất lượng thi tốt nghiệp THPT, phát triển quy mô trường lớp đạt chuẩn quốc gia, đổi mới quản trị nhà trường theo định hướng chuyển đổi số.'),
          createBodyParagraph('5. Thay mặt Ban Chấp hành Đảng bộ ký các nghị quyết, chỉ thị, kế hoạch, chương trình hành động, tờ trình gửi Đảng ủy xã Đốc Binh Kiều, Sở GDĐT và các văn bản chỉ đạo quan trọng của Đảng ủy.'),
          createBodyParagraph('6. Giữ mối liên hệ công tác thường xuyên với Thường trực Đảng ủy xã Đốc Binh Kiều, HĐND, UBND xã Đốc Binh Kiều và Lãnh đạo Sở GDĐT Đồng Tháp.'),

          createArticleHeading('Điều 4. Nhiệm vụ, quyền hạn của Phó Bí thư Đảng uỷ - Đồng chí Nguyễn Minh Trí (Phó Hiệu trưởng)'),
          createBodyParagraph('1. Là thường trực của Đảng ủy, chịu trách nhiệm trước Bí thư Đảng ủy và Ban Chấp hành về việc điều hành, giải quyết các công việc thường nhật của Đảng bộ; thay mặt Bí thư chủ trì công việc của Đảng bộ khi Bí thư đi vắng hoặc được ủy quyền.'),
          createBodyParagraph('2. Trực tiếp phụ trách công tác xây dựng Đảng, công tác tư tưởng chính trị, nâng cao năng lực lãnh đạo của các tổ chức cơ sở đảng; chỉ đạo chuẩn bị nội dung, chương trình các kỳ họp thường kỳ và đột xuất của Đảng ủy.'),
          createBodyParagraph('3. Phụ trách công tác thi đua, khen thưởng của Đảng bộ; theo dõi, đôn đốc các chi bộ và đoàn thể thực hiện các chỉ tiêu nghị quyết đã đề ra.'),
          createBodyParagraph('4. Về chuyên môn chính quyền: Trực tiếp phụ trách công tác chuyên môn cấp THPT (14 lớp, 529 học sinh), kế hoạch ôn thi tốt nghiệp THPT, kỳ thi chọn học sinh giỏi cấp THPT và nề nếp kỷ cương học sinh cấp THPT tại điểm chính.'),
          createBodyParagraph('5. Trực tiếp theo dõi, giám sát toàn diện hoạt động của Chi bộ 1 và Chi bộ 3; ký các văn bản của Đảng ủy theo thẩm quyền hoặc khi được Bí thư ủy quyền.'),

          createArticleHeading('Điều 5. Nhiệm vụ, quyền hạn của Đảng ủy viên, Bí thư Chi bộ 1 - Đồng chí Trịnh Văn Sơn (Tổ phó KHXH)'),
          createBodyParagraph('1. Phụ trách toàn diện công tác Đảng tại Chi bộ 1 (Chi bộ Khối THPT và Ban Giám hiệu - Văn phòng điểm trường chính).'),
          createBodyParagraph('2. Lãnh đạo cán bộ, giáo viên cấp THPT thực hiện nghiêm túc kế hoạch giáo dục nhà trường, phân phối chương trình GDPT 2018, đổi mới phương pháp giảng dạy và kiểm tra đánh giá theo định hướng phát triển năng lực.'),
          createBodyParagraph('3. Trực tiếp chỉ đạo công tác bồi dưỡng học sinh giỏi văn hóa cấp tỉnh môn KHXH, công tác ôn thi tốt nghiệp THPT năm 2026 và các năm tiếp theo, bảo đảm giữ vững tỷ lệ tốt nghiệp trên 99.5%.'),
          createBodyParagraph('4. Phối hợp với Đoàn Thanh niên phát hiện, bồi dưỡng nguồn học sinh ưu tú lớp 12 và giáo viên trẻ để giới thiệu cho Đảng ủy xem xét kết nạp.'),

          createArticleHeading('Điều 6. Nhiệm vụ, quyền hạn của Đảng ủy viên, Bí thư Chi bộ 2 - Đồng chí Nguyễn Thanh Tòng (Phó Hiệu trưởng)'),
          createBodyParagraph('1. Phụ trách toàn diện công tác Đảng tại Chi bộ 2 (Chi bộ Khối THCS Điểm trường Tân Kiều - gồm 15 lớp, 602 học sinh).'),
          createBodyParagraph('2. Trực tiếp phụ trách điều hành mọi mặt hoạt động chuyên môn, cơ sở vật chất, an ninh trật tự, nề nếp học sinh tại Điểm trường Tân Kiều (cơ sở cách điểm chính 11km thuộc xã Đốc Binh Kiều).'),
          createBodyParagraph('3. Giữ mối quan hệ phối hợp thường xuyên với Đảng ủy, HĐND, UBND, Ủy ban MTTQ Việt Nam xã Đốc Binh Kiều và các cơ quan đóng trên địa bàn Tân Kiều nhằm làm tốt công tác xã hội hóa giáo dục, duy trì sĩ số, phòng chống bỏ học.'),
          createBodyParagraph('4. Chỉ đạo công tác bồi dưỡng học sinh giỏi THCS, phụ đạo học sinh yếu kém và thực hiện giáo dục hòa nhập cho học sinh khuyết tật tại điểm Tân Kiều.'),

          createArticleHeading('Điều 7. Nhiệm vụ, quyền hạn của Đảng ủy viên, Bí thư Chi bộ 3 - Đồng chí Lê Văn Nguyên (Tổ trưởng GDTC - QPAN - Nghệ thuật)'),
          createBodyParagraph('1. Phụ trách toàn diện công tác Đảng tại Chi bộ 3 (Chi bộ Khối THCS Điểm trường Đốc Binh Kiều - gồm 24 lớp, 980 học sinh).'),
          createBodyParagraph('2. Lãnh đạo đảng viên, giáo viên nâng cao nề nếp học tập, kỷ cương học đường tại điểm Đốc Binh Kiều; triển khai hiệu quả chương trình GDPT 2018 cấp THCS.'),
          createBodyParagraph('3. Phụ trách phong trào thể dục thể thao, Hội khỏe Phù Đổng, giáo dục quốc phòng - an ninh và hoạt động văn hóa - nghệ thuật trên toàn trường; xây dựng môi trường học đường xanh - sạch - đẹp - an toàn.'),
          createBodyParagraph('4. Chỉ đạo công tác Đội TNTP Hồ Chí Minh và giáo dục kỹ năng sống cho học sinh cấp THCS.'),

          createArticleHeading('Điều 8. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Tổ chức Đảng - Đồng chí Lê Thị Ngọc Tuyền (Tổ trưởng Ngoại ngữ - Tin học)'),
          createBodyParagraph('1. Tham mưu cho Đảng ủy về công tác tổ chức xây dựng Đảng, củng cố kiện toàn các chi bộ trực thuộc sau sáp nhập.'),
          createBodyParagraph('2. Hướng dẫn, thẩm định và chuẩn bị đầy đủ hồ sơ trình Đảng ủy xem xét, đề nghị Đảng ủy xã Đốc Binh Kiều quyết định kết nạp đảng viên mới và công nhận đảng viên chính thức đúng quy trình, tiêu chuẩn.'),
          createBodyParagraph('3. Theo dõi, quản lý công tác rà soát quy hoạch cấp ủy nhiệm kỳ hiện tại và nhiệm kỳ kế tiếp; công tác đào tạo, bồi dưỡng lý luận chính trị và chuyên môn nghiệp vụ cho đảng viên.'),
          createBodyParagraph('4. Chủ trì tổng hợp báo cáo công tác tổ chức, thống kê số lượng chất lượng đảng viên phục vụ công tác đánh giá, xếp loại cuối năm.'),

          createArticleHeading('Điều 9. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Kiểm tra, Giám sát Đảng - Đồng chí Bùi Kim Huỳnh (Tổ trưởng KHTN)'),
          createBodyParagraph('1. Tham mưu xây dựng dự thảo và tổ chức triển khai Chương trình kiểm tra, giám sát toàn khóa và kế hoạch kiểm tra, giám sát hằng năm của Đảng ủy.'),
          createBodyParagraph('2. Trực tiếp thực hiện các cuộc kiểm tra, giám sát chuyên đề đối với 03 chi bộ và đảng viên trong việc chấp hành Điều lệ Đảng, nghị quyết cấp ủy, quy chế làm việc và thực hiện nhiệm vụ chuyên môn.'),
          createBodyParagraph('3. Giám sát việc tu dưỡng, rèn luyện phẩm chất đạo đức, lối sống, trách nhiệm nêu gương của cán bộ, đảng viên; giám sát việc thực hiện Chỉ thị 05-CT/TW và công tác phòng, chống tham nhũng, lãng phí, tiêu cực.'),
          createBodyParagraph('4. Tiếp nhận, thẩm tra, xác minh và tham mưu Đảng ủy giải quyết kịp thời đơn thư khiếu nại, tố cáo liên quan đến tổ chức đảng và đảng viên theo đúng thẩm quyền.'),

          createArticleHeading('Điều 10. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Văn thư, Lưu trữ Đảng - Đồng chí Lê Hồng Thúy (Tổ trưởng KHXH)'),
          createBodyParagraph('1. Đảm nhiệm vai trò Thư ký tại các kỳ họp thường kỳ và đột xuất của Ban Chấp hành Đảng bộ; ghi biên bản đầy đủ, trung thực, chính xác các ý kiến thảo luận và kết luận của đồng chí chủ trì.'),
          createBodyParagraph('2. Dự thảo các thông báo kết luận cuộc họp, nghị quyết, công văn của Đảng ủy theo phân công của Bí thư và Phó Bí thư.'),
          createBodyParagraph('3. Quản lý hệ thống văn bản đi, văn bản đến của Đảng ủy; thực hiện việc đăng ký, chuyển giao, xử lý văn bản theo đúng quy định bảo mật tài liệu của Đảng.'),
          createBodyParagraph('4. Quản lý, sử dụng con dấu của Đảng ủy đúng nguyên tắc, an toàn tuyệt đối; chủ trì công tác lập hồ sơ lưu trữ và số hóa kho lưu trữ văn kiện Đảng bộ.'),

          createArticleHeading('Điều 11. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Tuyên giáo - Đồng chí Thái Văn Tiến (Tổ phó KHTN)'),
          createBodyParagraph('1. Tham mưu Đảng ủy tổ chức học tập, quán triệt, tuyên truyền các chủ trương, nghị quyết, chỉ thị của Đảng, chính sách, pháp luật của Nhà nước cho 100% cán bộ, giáo viên, nhân viên và học sinh.'),
          createBodyParagraph('2. Phụ trách công tác bảo vệ nền tảng tư tưởng của Đảng, đấu tranh phản bác thông tin xấu độc trên không gian mạng theo Nghị quyết số 35-NQ/TW của Bộ Chính trị.'),
          createBodyParagraph('3. Thường xuyên nắm bắt diễn biến tư tưởng, tâm tư, nguyện vọng của cán bộ, đảng viên, viên chức tại cả 03 điểm trường; kịp thời báo cáo, đề xuất Đảng ủy giải pháp định hướng tư tưởng, giữ vững khối đoàn kết nội bộ.'),
          createBodyParagraph('4. Phụ trách công tác dân vận, xây dựng khối đại đoàn kết toàn trường; chỉ đạo, định hướng nội dung tuyên truyền cho Công đoàn và Đoàn Thanh niên.'),

          createArticleHeading('Điều 12. Nhiệm vụ, quyền hạn của Đảng ủy viên phụ trách Đảng phí và Hồ sơ sổ sách Đảng - Đồng chí Nguyễn Trung Hiếu (Tổ phó Ngoại ngữ - Tin học)'),
          createBodyParagraph('1. Quản lý, theo dõi toàn bộ hệ thống sổ sách nghiệp vụ đảng viên: Sổ danh sách đảng viên toàn Đảng bộ (85 đồng chí), sổ cấp phát thẻ Đảng, huy hiệu Đảng và sổ biên bản sinh hoạt.'),
          createBodyParagraph('2. Trực tiếp quản trị, cập nhật và khai thác Phần mềm Cơ sở dữ liệu đảng viên 3.0 bảo đảm chính xác, an toàn, bảo mật thông tin tuyệt đối.'),
          createBodyParagraph('3. Hướng dẫn, theo dõi, đôn đốc 03 chi bộ thực hiện việc thu, nộp đảng phí hàng tháng đúng quy định; thực hiện trích nộp đảng phí về Đảng ủy xã Đốc Binh Kiều đầy đủ, đúng thời hạn; lập dự toán và quyết toán kinh phí hoạt động đảng vụ công khai, minh bạch.'),
          createBodyParagraph('4. Hướng dẫn nghiệp vụ hồ sơ chuyển sinh hoạt đảng (chuyển đi, chuyển đến, chuyển sinh hoạt đảng tạm thời) cho đảng viên trong Đảng bộ.'),

          ...createChapterHeading('Chương III', 'NGUYÊN TẮC VÀ CHẾ ĐỘ LÀM VIỆC'),
          createArticleHeading('Điều 13. Nguyên tắc làm việc'),
          createBodyParagraph('1. Ban Chấp hành Đảng bộ làm việc theo nguyên tắc tập trung dân chủ, tập thể lãnh đạo, cá nhân phụ trách; thiểu số phục tùng đa số, cấp dưới phục tùng cấp trên, cá nhân phục tùng tổ chức.'),
          createBodyParagraph('2. Mọi chủ trương, đường lối, nghị quyết, kế hoạch công tác lớn về nhân sự, tài chính, cơ sở vật chất của Đảng bộ đều phải được thảo luận dân chủ và quyết định theo đa số (trên 1/2 tổng số Đảng ủy viên biểu quyết tán thành).'),
          createBodyParagraph('3. Đảng ủy viên có quyền phát biểu, tranh luận và bảo lưu ý kiến cá nhân trong hội nghị, nhưng khi nghị quyết đã được ban hành thì phải tuyệt đối chấp hành và nói, làm theo đúng nghị quyết của Đảng.'),

          createArticleHeading('Điều 14. Chế độ hội nghị của Đảng uỷ'),
          createBodyParagraph('1. Đảng uỷ họp định kỳ mỗi tháng một lần vào tuần đầu tiên của tháng; khi cần thiết có thể triệu tập hội nghị bất thường hoặc sinh hoạt chuyên đề.'),
          createBodyParagraph('2. Hội nghị Đảng uỷ chỉ tiến hành khi có ít nhất 2/3 tổng số ủy viên BCH đương nhiệm tham dự. Trường hợp vắng mặt phải báo cáo lý do và được đồng chí Bí thư (hoặc Phó Bí thư chủ trì) đồng ý.'),
          createBodyParagraph('3. Văn phòng Đảng ủy (đồng chí Thúy) có trách nhiệm gửi tài liệu họp cho các Đảng ủy viên nghiên cứu trước ít nhất 02 ngày làm việc.'),

          createArticleHeading('Điều 15. Chế độ thông tin, báo cáo và bảo mật'),
          createBodyParagraph('1. Thực hiện nghiêm chế độ báo cáo định kỳ tháng, quý, 6 tháng, 9 tháng, năm và báo cáo đột xuất gửi Ban Thường vụ Đảng ủy xã Đốc Binh Kiều.'),
          createBodyParagraph('2. Các Đảng ủy viên và 03 Chi bộ trực thuộc thực hiện báo cáo tình hình hoạt động của chi bộ, tổ chuyên môn cho Thường trực Đảng ủy trước ngày 25 hàng tháng.'),
          createBodyParagraph('3. Cán bộ, đảng viên phải chấp hành nghiêm quy định về bảo vệ bí mật của Đảng và Nhà nước; tuyệt đối không cung cấp, phát tán tài liệu nội bộ chưa được công bố ra ngoài hoặc lên không gian mạng.'),

          createArticleHeading('Điều 16. Chế độ kiểm tra, giám sát'),
          createBodyParagraph('1. Hằng năm, Đảng uỷ ban hành Kế hoạch kiểm tra, giám sát và phân công cụ thể cho đồng chí phụ trách công tác kiểm tra giám sát (đ/c Bùi Kim Huỳnh) chủ trì thực hiện.'),
          createBodyParagraph('2. Mỗi chi bộ trực thuộc và từng Đảng ủy viên ít nhất 01 lần/năm được kiểm tra hoặc giám sát chuyên đề về việc thực hiện chức trách, nhiệm vụ được giao.'),

          createArticleHeading('Điều 17. Chế độ đi cơ sở dự sinh hoạt chi bộ và tiếp xúc cán bộ, giáo viên, học sinh'),
          createBodyParagraph('1. Các đồng chí trong Thường trực Đảng ủy và Đảng ủy viên được phân công định kỳ hàng tháng về dự sinh hoạt cùng các chi bộ trực thuộc (Chi bộ 1, Chi bộ 2, Chi bộ 3) để nắm bắt thực tế, hướng dẫn nâng cao chất lượng sinh hoạt chi bộ.'),
          createBodyParagraph('2. Lãnh đạo Đảng ủy định kỳ tổ chức đối thoại, lắng nghe ý kiến đóng góp của cán bộ, giáo viên, nhân viên 3 điểm trường và học sinh, giải quyết thấu đáo các khó khăn, vướng mắc phát sinh.'),

          ...createChapterHeading('Chương IV', 'MỐI QUAN HỆ CÔNG TÁC'),
          createArticleHeading('Điều 18. Với Đảng ủy xã Đốc Binh Kiều (Cấp ủy cấp trên trực tiếp)'),
          createBodyParagraph('Đảng ủy chịu sự lãnh đạo, chỉ đạo trực tiếp, toàn diện của Ban Chấp hành, Ban Thường vụ Đảng ủy xã Đốc Binh Kiều; chấp hành nghiêm các nghị quyết, chỉ thị, quy định và sự kiểm tra, giám sát của cấp ủy cấp trên.'),

          createArticleHeading('Điều 19. Với Sở Giáo dục và Đào tạo Đồng Tháp'),
          createBodyParagraph('Đảng ủy lãnh đạo Ban Giám hiệu chấp hành nghiêm sự chỉ đạo về chuyên môn nghiệp vụ, kế hoạch năm học, công tác thanh tra kiểm tra và các hướng dẫn quản lý giáo dục của Sở GDĐT Đồng Tháp.'),

          createArticleHeading('Điều 20. Với Hội đồng nhân dân, Ủy ban nhân dân xã Đốc Binh Kiều'),
          createBodyParagraph('Đảng ủy giữ mối quan hệ phối hợp chặt chẽ với Thường trực HĐND, UBND xã Đốc Binh Kiều nhằm phối hợp giữ gìn an ninh trật tự trường học, an toàn giao thông, quản lý học sinh ngoài giờ và phối hợp thực hiện tốt công tác xã hội hóa giáo dục trên toàn địa bàn xã (bao gồm cả khu vực Tân Kiều).'),

          createArticleHeading('Điều 21. Với Ban Giám hiệu, Công đoàn và Đoàn Thanh niên nhà trường'),
          createBodyParagraph('1. Đảng ủy lãnh đạo Ban Giám hiệu theo nguyên tắc tập thể lãnh đạo, phân công cá nhân phụ trách; tôn trọng và phát huy thẩm quyền, trách nhiệm quản lý, điều hành của Hiệu trưởng theo Điều lệ trường trung học.'),
          createBodyParagraph('2. Đảng ủy lãnh đạo Công đoàn cơ sở, Đoàn TNCS Hồ Chí Minh thông qua nghị quyết và phân công đảng viên nòng cốt tham gia ban chấp hành các đoàn thể; tạo điều kiện thuận lợi nhất để các tổ chức đoàn thể hoạt động theo đúng điều lệ.'),

          createArticleHeading('Điều 22. Với 03 Chi bộ trực thuộc'),
          createBodyParagraph('Đảng ủy lãnh đạo, chỉ đạo trực tiếp, toàn diện đối với 03 chi bộ trực thuộc. Các chi bộ có trách nhiệm cụ thể hóa và thực hiện nghiêm túc các nghị quyết, chỉ thị của Đảng ủy; định kỳ báo cáo và xin ý kiến Đảng ủy về những vấn đề quan trọng vượt thẩm quyền.'),

          ...createChapterHeading('Chương V', 'ĐIỀU KHOẢN THI HÀNH'),
          createArticleHeading('Điều 23. Tổ chức thực hiện'),
          createBodyParagraph('1. Các đồng chí trong Ban Chấp hành Đảng bộ, các chi bộ trực thuộc và toàn thể cán bộ, đảng viên Trường THCS và THPT Đốc Binh Kiều có trách nhiệm thực hiện nghiêm túc Quy chế này.'),
          createBodyParagraph('2. Quy chế này có hiệu lực kể từ ngày ký. Trong quá trình thực hiện, nếu có nội dung cần sửa đổi, bổ sung, Ban Chấp hành Đảng bộ sẽ xem xét, quyết định theo đa số.'),

          createSignatureBlockTable(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Đảng ủy xã Đốc Binh Kiều (để báo cáo);',
              'Sở GDĐT Đồng Tháp (để báo cáo);',
              'HĐND, UBND xã Đốc Binh Kiều (để phối hợp);',
              'Ban Giám hiệu nhà trường;',
              '03 Chi bộ trực thuộc;',
              'Các đồng chí Đảng ủy viên;',
              'Lưu: Đảng ủy.'
            ],
            { headerRole: 'T/M. ĐẢNG ỦY' }
          ),
        ],
      },
    ],
  });

  const buffer1 = await Packer.toBuffer(doc1);
  const path1Downloads = path.join(downloadsDir, '01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx');
  const path1DangBo = path.join(dangBoDir, '01_QC_DU_Quy_che_lam_viec_BCH_Dang_bo_2025_2030.docx');
  fs.writeFileSync(path1Downloads, buffer1);
  fs.writeFileSync(path1DangBo, buffer1);
  console.log('Saved File 1 successfully!');

  // =========================================================================
  // FILE 2: 02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx
  // =========================================================================
  console.log('Generating File 2: Thông báo phân công nhiệm vụ 10 ĐUV năm 2026 (Chuẩn thể thức)...');

  const doc2 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: FONT_SIZES.BODY },
          paragraph: { spacing: { line: 280, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: commonPageProps,
        footers: { default: createCommonFooter() },
        children: [
          createPartyDocHeaderTable('02-TB/ĐU', 'Đốc Binh Kiều, ngày 18 tháng 9 năm 2026', 'ĐẢNG BỘ XÃ ĐỐC BINH KIỀU'),
          ...createDocumentTitleBlock(
            'THÔNG BÁO',
            'Phân công nhiệm vụ các đồng chí trong Ban Chấp hành Đảng bộ\nTrường THCS và THPT Đốc Binh Kiều năm 2026'
          ),

          createLegalBasisParagraph('Căn cứ Điều lệ Đảng Cộng sản Việt Nam;'),
          createLegalBasisParagraph('Căn cứ Quyết định của Ban Thường vụ Đảng ủy xã Đốc Binh Kiều về việc chỉ định Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I, nhiệm kỳ 2025 – 2030 gồm 10 đồng chí;'),
          createLegalBasisParagraph('Căn cứ Quy chế làm việc số 01-QC/ĐU ngày 16/9/2026 của Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều;', true),

          createBodyParagraph('Xét yêu cầu nhiệm vụ lãnh đạo toàn diện nhà trường sau sáp nhập 3 trường (quy mô 120 cán bộ giáo viên nhân viên, 85 đảng viên, 53 lớp với 2.111 học sinh tại 03 điểm trường trên địa bàn xã Đốc Binh Kiều) và kết quả phiên họp Ban Chấp hành Đảng bộ;'),
          createBodyParagraph('Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều thông báo phân công nhiệm vụ cụ thể cho các đồng chí trong Ban Chấp hành Đảng bộ như sau:'),

          createArticleHeading('1. Đồng chí Lê Thanh Cường - Bí thư Đảng ủy (Hiệu trưởng):'),
          createSubItem('-', 'Phụ trách chung và chịu trách nhiệm toàn diện trước Đảng ủy xã Đốc Binh Kiều, Giám đốc Sở GDĐT về toàn bộ hoạt động của Đảng bộ và nhà trường tại cả 03 điểm trường.', { boldPrefix: false }),
          createSubItem('-', 'Trực tiếp phụ trách công tác tổ chức cán bộ; quy hoạch, đào tạo, bồi dưỡng cán bộ; công tác bảo vệ chính trị nội bộ; công tác tài chính, tài sản nhà trường.', { boldPrefix: false }),
          createSubItem('-', 'Chủ trì và điều hành các kỳ họp định kỳ và đột xuất của Ban Chấp hành Đảng bộ.', { boldPrefix: false }),
          createSubItem('-', 'Trực tiếp chỉ đạo các định hướng chiến lược: Xây dựng trường đạt chuẩn quốc gia, đổi mới phương thức quản lý sau sáp nhập, chuyển đổi số và nâng cao chất lượng giáo dục toàn diện.', { boldPrefix: false }),
          createSubItem('-', 'Phụ trách giám sát chung cả 03 chi bộ trực thuộc.', { boldPrefix: false }),

          createArticleHeading('2. Đồng chí Nguyễn Minh Trí - Phó Bí thư Đảng ủy (Phó Hiệu trưởng):'),
          createSubItem('-', 'Là thường trực Đảng ủy, chịu trách nhiệm giúp Bí thư điều hành, giải quyết các công việc thường xuyên của Đảng bộ; thay mặt Bí thư chủ trì giải quyết công việc khi Bí thư đi vắng hoặc được ủy nhiệm.', { boldPrefix: false }),
          createSubItem('-', 'Trực tiếp phụ trách công tác xây dựng Đảng, công tác tư tưởng chính trị; chỉ đạo công tác chuẩn bị nội dung các hội nghị của Đảng ủy; phụ trách công tác thi đua, khen thưởng của Đảng bộ.', { boldPrefix: false }),
          createSubItem('-', 'Về chính quyền: Trực tiếp phụ trách công tác chuyên môn cấp THPT (14 lớp, 529 học sinh), kế hoạch ôn thi tốt nghiệp THPT, kỳ thi chọn học sinh giỏi cấp THPT và nề nếp học sinh cấp THPT tại điểm chính.', { boldPrefix: false }),
          createSubItem('-', 'Phụ trách theo dõi, chỉ đạo trực tiếp Chi bộ 1 và Chi bộ 3.', { boldPrefix: false }),

          createArticleHeading('3. Đồng chí Trịnh Văn Sơn - Đảng ủy viên, Bí thư Chi bộ 1 (Tổ phó KHXH):'),
          createSubItem('-', 'Trực tiếp làm Bí thư Chi bộ 1 (Khối THPT và Ban Giám hiệu - Văn phòng điểm trường chính), lãnh đạo toàn diện công tác Đảng tại Chi bộ 1.', { boldPrefix: false }),
          createSubItem('-', 'Lãnh đạo đảng viên tổ Toán, Văn, KHTN, KHXH, Ngoại ngữ - Tin học thuộc khối THPT nâng cao chất lượng dạy học theo CT GDPT 2018.', { boldPrefix: false }),
          createSubItem('-', 'Trực tiếp phụ trách công tác bồi dưỡng đội tuyển học sinh giỏi các môn KHXH cấp THPT; công tác phát hiện, bồi dưỡng đoàn viên học sinh lớp 12 ưu tú tạo nguồn phát triển Đảng.', { boldPrefix: false }),

          createArticleHeading('4. Đồng chí Nguyễn Thanh Tòng - Đảng ủy viên, Bí thư Chi bộ 2 (Phó Hiệu trưởng):'),
          createSubItem('-', 'Trực tiếp làm Bí thư Chi bộ 2 (Khối THCS Điểm trường Tân Kiều - gồm 15 lớp, 602 học sinh).', { boldPrefix: false }),
          createSubItem('-', 'Trực tiếp quản lý, điều hành toàn diện cơ sở vật chất, chuyên môn, nề nếp kỷ cương dạy và học tại Điểm trường Tân Kiều (thuộc địa bàn xã Đốc Binh Kiều, cách điểm chính 11km).', { boldPrefix: false }),
          createSubItem('-', 'Phụ trách công tác bồi dưỡng học sinh giỏi cấp THCS tại Tân Kiều; làm đầu mối giữ mối liên hệ mật thiết với Đảng ủy, UBND xã Đốc Binh Kiều và các ấp trên địa bàn khu vực Tân Kiều.', { boldPrefix: false }),

          createArticleHeading('5. Đồng chí Lê Văn Nguyên - Đảng ủy viên, Bí thư Chi bộ 3 (Tổ trưởng GDTC - QPAN - Nghệ thuật):'),
          createSubItem('-', 'Trực tiếp làm Bí thư Chi bộ 3 (Khối THCS Điểm trường Đốc Binh Kiều - gồm 24 lớp, 980 học sinh).', { boldPrefix: false }),
          createSubItem('-', 'Lãnh đạo đảng viên khối THCS tại điểm Đốc Binh Kiều hoàn thành tốt nhiệm vụ giảng dạy và giáo dục học sinh; phụ trách phong trào thể dục thể thao, HKPĐ, GDQP-AN toàn trường.', { boldPrefix: false }),
          createSubItem('-', 'Chỉ đạo phong trào Đội TNTP Hồ Chí Minh và rèn luyện kỹ năng sống cho học sinh THCS.', { boldPrefix: false }),

          createArticleHeading('6. Đồng chí Lê Thị Ngọc Tuyền - Đảng ủy viên (Tổ trưởng Ngoại ngữ - Tin học):'),
          createSubItem('-', 'Phụ trách công tác Tổ chức Đảng: Hướng dẫn, kiểm tra và chuẩn bị hồ sơ xét kết nạp đảng viên mới; hồ sơ chuyển đảng chính thức trình Đảng ủy xem xét đề nghị Đảng ủy xã Đốc Binh Kiều quyết định; chỉ tiêu kết nạp năm 2026 là từ 03 - 04 đồng chí.', { boldPrefix: false }),
          createSubItem('-', 'Theo dõi, tham mưu rà soát bổ sung quy hoạch cấp ủy Đảng bộ và các chi bộ trực thuộc; quản lý hồ sơ bồi dưỡng lý luận chính trị và nhận thức về Đảng cho quần chúng ưu tú.', { boldPrefix: false }),

          createArticleHeading('7. Đồng chí Bùi Kim Huỳnh - Đảng ủy viên (Tổ trưởng KHTN):'),
          createSubItem('-', 'Phụ trách công tác Kiểm tra, Giám sát Đảng: Xây dựng dự thảo và triển khai Kế hoạch kiểm tra, giám sát năm 2026 của Đảng ủy đối với 03 chi bộ trực thuộc và đảng viên.', { boldPrefix: false }),
          createSubItem('-', 'Giám sát đảng viên trong việc thực hiện nhiệm vụ chuyên môn, đạo đức nhà giáo, việc học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh; tham mưu xử lý đơn thư khiếu nại, tố cáo và kỷ luật Đảng.', { boldPrefix: false }),

          createArticleHeading('8. Đồng chí Lê Hồng Thúy - Đảng ủy viên (Tổ trưởng KHXH):'),
          createSubItem('-', 'Phụ trách công tác Văn thư, Lưu trữ Đảng: Đảm nhiệm vai trò Thư ký các cuộc họp Đảng ủy; ghi chép biên bản nghị quyết, soạn thảo văn bản kết luận theo chỉ đạo của Thường trực.', { boldPrefix: false }),
          createSubItem('-', 'Quản lý văn bản đi, đến của Đảng bộ; bảo quản và sử dụng con dấu Đảng ủy đúng quy định; thực hiện số hóa văn kiện và sắp xếp hồ sơ lưu trữ Đảng ủy bảo mật, khoa học.', { boldPrefix: false }),

          createArticleHeading('9. Đồng chí Thái Văn Tiến - Đảng ủy viên (Tổ phó KHTN):'),
          createSubItem('-', 'Phụ trách công tác Tuyên giáo: Tổ chức học tập, tuyên truyền nghị quyết của Đảng ủy xã và cấp ủy cấp trên; bảo vệ nền tảng tư tưởng Đảng theo Nghị quyết 35-NQ/TW.', { boldPrefix: false }),
          createSubItem('-', 'Nắm bắt tình hình diễn biến tư tưởng, tâm tư, nguyện vọng của 120 CB-GV-NV và 2.111 học sinh tại cả 3 điểm trường; phụ trách công tác dân vận, xây dựng khối đoàn kết nội bộ, chỉ đạo phong trào Công đoàn và Đoàn thanh niên.', { boldPrefix: false }),

          createArticleHeading('10. Đồng chí Nguyễn Trung Hiếu - Đảng ủy viên (Tổ phó Ngoại ngữ - Tin học):'),
          createSubItem('-', 'Phụ trách công tác Đảng phí và Hồ sơ sổ sách Đảng: Quản trị, cập nhật và đồng bộ Phần mềm Cơ sở dữ liệu đảng viên 3.0 của toàn Đảng bộ (85 đảng viên).', { boldPrefix: false }),
          createSubItem('-', 'Trực tiếp theo dõi, thu và trích nộp đảng phí của 03 chi bộ đầy đủ, kịp thời về Đảng ủy xã Đốc Binh Kiều; quản lý sổ danh sách đảng viên, sổ cấp phát huy hiệu Đảng và thẻ Đảng viên; hướng dẫn thủ tục chuyển sinh hoạt Đảng.', { boldPrefix: false }),

          ...createChapterHeading('QUY ĐỊNH THỰC HIỆN'),
          createBodyParagraph('1. Các đồng chí Đảng ủy viên căn cứ nhiệm vụ được phân công, chủ động xây dựng kế hoạch công tác cụ thể hằng tháng, hằng quý; phối hợp chặt chẽ với các bộ phận liên quan để hoàn thành tốt nhiệm vụ được giao.'),
          createBodyParagraph('2. Định kỳ trước ngày 25 hàng tháng, các đồng chí báo cáo kết quả thực hiện nhiệm vụ được phân công về Thường trực Đảng ủy để tổng hợp phục vụ kỳ họp lệ tháng của Ban Chấp hành.'),
          createBodyParagraph('3. Trong quá trình thực hiện, nếu có khó khăn, vướng mắc hoặc phát sinh công việc đột xuất, các đồng chí kịp thời báo cáo đồng chí Bí thư hoặc Phó Bí thư để xem xét, điều chỉnh cho phù hợp.'),

          createSignatureBlockTable(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Đảng ủy xã Đốc Binh Kiều (để báo cáo);',
              'Ban Giám hiệu nhà trường;',
              '03 Chi bộ trực thuộc;',
              'Các đồng chí Đảng ủy viên (để thực hiện);',
              'Công đoàn, Đoàn thanh niên;',
              'Lưu: Đảng ủy.'
            ],
            { headerRole: 'T/M. ĐẢNG ỦY' }
          ),
        ],
      },
    ],
  });

  const buffer2 = await Packer.toBuffer(doc2);
  const path2Downloads = path.join(downloadsDir, '02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx');
  const path2DangBo = path.join(dangBoDir, '02_TB_Phan_cong_nhiem_vu_BCH_Dang_bo_2026.docx');
  fs.writeFileSync(path2Downloads, buffer2);
  fs.writeFileSync(path2DangBo, buffer2);
  console.log('Saved File 2 successfully!');

  // =========================================================================
  // FILE 3: 03_CTr_Hanh_dong_toan_khoa_2025_2030.docx
  // =========================================================================
  console.log('Generating File 3: Chương trình hành động toàn khóa 2025 - 2030 (Chuẩn thể thức)...');

  const doc3 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: FONT_SIZES.BODY },
          paragraph: { spacing: { line: 280, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: commonPageProps,
        footers: { default: createCommonFooter() },
        children: [
          createPartyDocHeaderTable('03-CTr/ĐU', 'Đốc Binh Kiều, ngày 20 tháng 9 năm 2026', 'ĐẢNG BỘ XÃ ĐỐC BINH KIỀU'),
          ...createDocumentTitleBlock(
            'CHƯƠNG TRÌNH HÀNH ĐỘNG TOÀN KHÓA',
            'CỦA BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU\nKHÓA I, NHIỆM KỲ 2025 – 2030'
          ),

          createLegalBasisParagraph('Thực hiện Nghị quyết Đại hội Đảng toàn quốc lần thứ XIV; Nghị quyết Đại hội Đảng bộ tỉnh Đồng Tháp; Nghị quyết Đại hội Đảng bộ xã Đốc Binh Kiều;'),
          createLegalBasisParagraph('Căn cứ Đề án sáp nhập đơn vị hành chính xã Tân Kiều vào xã Đốc Binh Kiều và sáp nhập 3 trường: THPT Đốc Binh Kiều, THCS Đốc Binh Kiều, THCS Tân Kiều thành Trường THCS và THPT Đốc Binh Kiều;', true),

          createBodyParagraph('Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều khóa I ban hành Chương trình hành động toàn khóa nhiệm kỳ 2025 – 2030 với các nội dung trọng tâm như sau:'),

          ...createChapterHeading('I. MỤC TIÊU VÀ HỆ THỐNG CHỈ TIÊU CHỦ YẾU'),
          createArticleHeading('1. Mục tiêu tổng quát'),
          createBodyParagraph('Xây dựng Đảng bộ Trường THCS và THPT Đốc Binh Kiều thực sự trong sạch, vững mạnh tiêu biểu; giữ vững khối đại đoàn kết thống nhất giữa đội ngũ 120 cán bộ, giáo viên, nhân viên từ 3 trường sau sáp nhập; nâng cao năng lực lãnh đạo và sức chiến đấu của 03 chi bộ trực thuộc; phát huy vai trò tiên phong gương mẫu của 85 đảng viên.'),
          createBodyParagraph('Tập trung lãnh đạo thực hiện thắng lợi Chương trình Giáo dục phổ thông 2018 trên cả 2 cấp THCS và THPT; nâng cao chất lượng giáo dục toàn diện và giáo dục mũi nhọn học sinh giỏi; giữ vững tỷ lệ tốt nghiệp THPT trên 99.5%; đảm bảo quyền học tập tiến bộ của 2.111 học sinh thuộc 53 lớp trên toàn địa bàn xã Đốc Binh Kiều, trong đó chăm sóc chu đáo 25 học sinh khuyết tật học hòa nhập; hiện đại hóa cơ sở vật chất ở cả 03 điểm trường, phấn đấu đạt trường chuẩn quốc gia giai đoạn 2025 – 2030.'),

          createArticleHeading('2. Hệ thống các chỉ tiêu chủ yếu toàn khóa (16 chỉ tiêu)'),
          createArticleHeading('2.1. Về công tác xây dựng Đảng và hệ thống chính trị:'),
          createSubItem('(1)', 'Hàng năm, Đảng bộ xếp loại từ “Hoàn thành tốt nhiệm vụ” trở lên, trong đó có ít nhất 02 năm đạt “Hoàn thành xuất sắc nhiệm vụ”.'),
          createSubItem('(2)', 'Trong nhiệm kỳ, kết nạp từ 15 đến 20 đảng viên mới (chú trọng cán bộ trẻ, giáo viên giỏi và đoàn viên học sinh THPT ưu tú).'),
          createSubItem('(3)', '100% chi bộ trực thuộc (03 chi bộ) hàng năm đạt mức “Hoàn thành tốt nhiệm vụ”, không có chi bộ yếu kém.'),
          createSubItem('(4)', 'Hàng năm có 100% đảng viên hoàn thành nhiệm vụ, trong đó trên 90% đảng viên hoàn thành tốt nhiệm vụ, 15% - 20% đảng viên hoàn thành xuất sắc nhiệm vụ.'),
          createSubItem('(5)', 'Trong nhiệm kỳ, phấn đấu có ít nhất 02 mô hình tập thể hoặc cá nhân được cấp ủy cấp trên khen thưởng về “Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh” và “Dân vận khéo”.'),
          createSubItem('(6)', 'Có ít nhất 02 đảng viên được cấp ủy khen thưởng danh hiệu “Đảng viên hoàn thành xuất sắc nhiệm vụ 05 năm liền”.'),

          createArticleHeading('2.2. Về chuyên môn, chất lượng giáo dục và phát triển nhân lực:'),
          createSubItem('(7)', 'Đạt từ 60 đến 80 giải học sinh giỏi văn hóa cấp tỉnh trong cả nhiệm kỳ (cả cấp THCS và cấp THPT).'),
          createSubItem('(8)', 'Tỷ lệ tốt nghiệp THPT bình quân hàng năm đạt từ 99.5% trở lên (luôn cao hơn mặt bằng chung của tỉnh Đồng Tháp).'),
          createSubItem('(9)', 'Tỷ lệ học sinh THCS hoàn thành chương trình lớp học đạt trên 98.5%; tỷ lệ xét công nhận tốt nghiệp THCS đạt 100%.'),
          createSubItem('(10)', 'Tỷ lệ học sinh nghỉ bỏ học ở cả 03 điểm trường được duy trì ở mức dưới 0.4% (thấp hơn bình quân chung toàn tỉnh).'),
          createSubItem('(11)', 'Đạt tỷ lệ 100% cán bộ, giáo viên hoàn thành bồi dưỡng kỹ năng số, ứng dụng công nghệ thông tin và AI an toàn trong giảng dạy hằng năm.'),
          createSubItem('(12)', 'Nâng cao trình độ đội ngũ: Phấn đấu có thêm từ 05 - 08 cán bộ, giáo viên hoàn thành chương trình Thạc sĩ (nâng tổng số lên 14-17 Thạc sĩ); 100% cán bộ quản lý đạt trình độ Trung cấp LLCT trở lên.'),
          createSubItem('(13)', '100% học sinh khuyết tật học hòa nhập (25 em) được lập hồ sơ kế hoạch giáo dục cá nhân và theo dõi đánh giá vì sự tiến bộ theo đúng Công văn số 3326/SGDĐT-GDTrH-TX&CN.'),

          createArticleHeading('2.3. Về hoạt động ngoại khóa, đoàn thể và cơ sở vật chất:'),
          createSubItem('(14)', 'Tỷ lệ học sinh tham gia Bảo hiểm y tế đạt 100% tại cả 3 điểm trường (2.111/2.111 học sinh).'),
          createSubItem('(15)', 'Hàng năm tổ chức ít nhất 02 hoạt động trải nghiệm hướng nghiệp và 02 chuyến về nguồn, giáo dục truyền thống cách mạng cho học sinh tại Khu di tích Gò Tháp và Di tích Đốc Binh Kiều.'),
          createSubItem('(16)', 'Đoàn TNCS Hồ Chí Minh và Công đoàn cơ sở nhà trường đạt danh hiệu “Hoàn thành xuất sắc nhiệm vụ” 05 năm liên tục.'),

          createArticleHeading('2.4. Về thi đua tập thể:'),
          createSubItem('(17)', 'Phấn đấu tập thể nhà trường đạt danh hiệu “Tập thể Lao động Xuất sắc” ít nhất 03 lần trong nhiệm kỳ, nhận Cờ thi đua của UBND tỉnh Đồng Tháp và hoàn thành công nhận Trường đạt Chuẩn quốc gia mức độ 1.'),

          ...createChapterHeading('II. BA KHÂU ĐỘT PHÁ TOÀN KHÓA'),
          createBodyParagraph('1. **Đột phá 1:** Đồng bộ hóa cơ chế điều hành và chuyển đổi số liên cơ sở (03 điểm trường trên địa bàn xã Đốc Binh Kiều). Xóa bỏ khoảng cách địa lý 11km giữa điểm chính và Điểm Tân Kiều bằng mô hình quản trị số: Họp giao ban trực tuyến kết hợp trực tiếp, điều hành hồ sơ trên môi trường số, 100% giáo án, học bạ và sổ điểm điện tử.'),
          createBodyParagraph('2. **Đột phá 2:** Liên thông chất lượng dạy và học giữa 2 cấp THCS và THPT. Xây dựng chiến lược đào tạo mũi nhọn học sinh giỏi và ôn thi tuyển sinh, tốt nghiệp bài bản ngay từ khối THCS chuyển tiếp lên THPT, giữ vững vị thế chất lượng của trường trong cụm thi đua tỉnh Đồng Tháp.'),
          createBodyParagraph('3. **Đột phá 3:** Xây dựng văn hóa nhà trường đoàn kết, nhân ái, gương mẫu sau sáp nhập. Phát huy tinh thần tiên phong của 85 đảng viên, khơi dậy khát vọng cống hiến của 120 CB-GV-NV, chăm lo chu đáo đời sống vật chất và tinh thần cho người lao động.'),

          ...createChapterHeading('III. NHIỆM VỤ VÀ CÁC GIẢI PHÁP CHỦ YẾU'),
          createArticleHeading('1. Đổi mới phương thức lãnh đạo của Đảng ủy và nâng cao hiệu lực quản lý của Ban Giám hiệu'),
          createSubItem('-', 'Đổi mới mạnh mẽ lề lối làm việc theo hướng sâu sát cơ sở, phân công rõ người, rõ việc, rõ thời gian hoàn thành cho 10 đồng chí Đảng ủy viên.', { boldPrefix: false }),
          createSubItem('-', 'Duy trì nghiêm mô hình “Cuộc họp không văn bản giấy”, khai thác tối đa nền tảng số để trao đổi công việc nhanh chóng, tiết kiệm.', { boldPrefix: false }),
          createSubItem('-', 'Đẩy mạnh cải cách thủ tục hành chính học đường; công khai minh bạch mọi quy trình công tác, chế độ chính sách và các khoản thu chi tài chính.', { boldPrefix: false }),

          createArticleHeading('2. Công tác xây dựng, chỉnh đốn Đảng và nâng cao chất lượng đội ngũ'),
          createSubItem('-', 'Tăng cường giáo dục chính trị tư tưởng, rèn luyện phẩm chất đạo đức nhà giáo, chống các biểu hiện suy thoái, “tự diễn biến”, “tự chuyển hóa”.', { boldPrefix: false }),
          createSubItem('-', 'Nâng cao chất lượng sinh hoạt tại 03 chi bộ trực thuộc (Chi bộ 1: Khối THPT & BGH; Chi bộ 2: Khối THCS Tân Kiều; Chi bộ 3: Khối THCS Đốc Binh Kiều), gắn nội dung sinh hoạt Đảng với việc giải quyết các vấn đề chuyên môn nóng bỏng của từng cơ sở.', { boldPrefix: false }),
          createSubItem('-', 'Thực hiện nghiêm túc quy định về trách nhiệm nêu gương của cán bộ quản lý, đảng viên; lấy kết quả hoàn thành nhiệm vụ giáo dục làm thước đo đánh giá xếp loại cuối năm.', { boldPrefix: false }),

          createArticleHeading('3. Lãnh đạo thực hiện thắng lợi nhiệm vụ chuyên môn và phát triển học sinh'),
          createSubItem('-', 'Bố trí, sắp xếp đội ngũ 102 giáo viên hợp lý theo chuyên môn, bảo đảm cân đối giữa các bộ môn và 3 điểm trường.', { boldPrefix: false }),
          createSubItem('-', 'Tăng cường thanh tra, kiểm tra nội bộ học đường theo hướng dẫn của Sở GDĐT Đồng Tháp; đổi mới sinh hoạt chuyên môn theo hình thức nghiên cứu bài học.', { boldPrefix: false }),
          createSubItem('-', 'Xây dựng kế hoạch phụ đạo học sinh có nguy cơ học lực yếu kém, kiên quyết kéo giảm tỷ lệ bỏ học dưới 0.4%; hỗ trợ tận tình 25 học sinh khuyết tật học hòa nhập.', { boldPrefix: false }),

          createArticleHeading('4. Xây dựng cơ sở vật chất và tăng cường công tác đoàn thể'),
          createSubItem('-', 'Tranh thủ các nguồn lực đầu tư của tỉnh và địa phương để kiên cố hóa, bổ sung phòng học bộ môn, máy vi tính và thiết bị thể dục thể thao tại 3 điểm trường.', { boldPrefix: false }),
          createSubItem('-', 'Phát huy tối đa vai trò của Công đoàn, Đoàn Thanh niên, Hội Khuyến học trong việc vận động học sinh, chăm lo học sinh có hoàn cảnh khó khăn.', { boldPrefix: false }),

          ...createChapterHeading('IV. TỔ CHỨC THỰC HIỆN'),
          createBodyParagraph('1. Đảng ủy tổ chức hội nghị toàn Đảng bộ quán triệt Chương trình hành động toàn khóa đến 100% đảng viên, cán bộ, giáo viên, nhân viên.'),
          createBodyParagraph('2. Cấp ủy 03 chi bộ trực thuộc, Ban Giám hiệu và các đoàn thể căn cứ Chương trình này xây dựng kế hoạch cụ thể hóa phù hợp với đặc thù từng cơ sở.'),
          createBodyParagraph('3. Giao đồng chí Bùi Kim Huỳnh (phụ trách kiểm tra giám sát) chủ trì, phối hợp với các Đảng ủy viên theo dõi, đôn đốc, định kỳ 6 tháng và hàng năm báo cáo Đảng ủy kết quả thực hiện.'),

          createSignatureBlockTable(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Đảng ủy xã Đốc Binh Kiều (để báo cáo);',
              'Sở GDĐT Đồng Tháp (để báo cáo);',
              '03 Chi bộ trực thuộc (để thực hiện);',
              'Ban Giám hiệu nhà trường (để thực hiện);',
              'Công đoàn, Đoàn trường (để phối hợp);',
              'Các đồng chí Đảng ủy viên;',
              'Lưu: Đảng ủy.'
            ],
            { headerRole: 'T/M. ĐẢNG ỦY' }
          ),
        ],
      },
    ],
  });

  const buffer3 = await Packer.toBuffer(doc3);
  const path3Downloads = path.join(downloadsDir, '03_CTr_Hanh_dong_toan_khoa_2025_2030.docx');
  const path3DangBo = path.join(dangBoDir, '03_CTr_Hanh_dong_toan_khoa_2025_2030.docx');
  fs.writeFileSync(path3Downloads, buffer3);
  fs.writeFileSync(path3DangBo, buffer3);
  console.log('Saved File 3 successfully!');

  // =========================================================================
  // FILE 4: 04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx
  // =========================================================================
  console.log('Generating File 4: Chương trình hành động năm 2026 sau sáp nhập (Chuẩn thể thức)...');

  const doc4 = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: FONT_SIZES.BODY },
          paragraph: { spacing: { line: 280, before: 60, after: 60 } },
        },
      },
    },
    sections: [
      {
        properties: commonPageProps,
        footers: { default: createCommonFooter() },
        children: [
          createPartyDocHeaderTable('04-CTr/ĐU', 'Đốc Binh Kiều, ngày 22 tháng 9 năm 2026', 'ĐẢNG BỘ XÃ ĐỐC BINH KIỀU'),
          ...createDocumentTitleBlock(
            'CHƯƠNG TRÌNH HÀNH ĐỘNG NĂM 2026',
            'CỦA BAN CHẤP HÀNH ĐẢNG BỘ TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU, KHÓA I\n(NĂM ĐẦU TIÊN VẬN HÀNH BỘ MÁY SAU SÁP NHẬP 3 TRƯỜNG)'
          ),

          createLegalBasisParagraph('Căn cứ Nghị quyết Đại hội Đảng toàn quốc lần thứ XIV;'),
          createLegalBasisParagraph('Căn cứ Nghị quyết của Đảng ủy xã Đốc Binh Kiều về nhiệm vụ chính trị năm 2026;'),
          createLegalBasisParagraph('Căn cứ Chương trình hành động toàn khóa số 03-CTr/ĐU của Ban Chấp hành Đảng bộ Trường THCS và THPT Đốc Binh Kiều, nhiệm kỳ 2025 – 2030;', true),

          createBodyParagraph('Năm 2026 có ý nghĩa đặc biệt quan trọng: Là năm diễn ra Đại hội đại biểu toàn quốc lần thứ XIV của Đảng; đồng thời là năm học bản lề đầu tiên Trường THCS và THPT Đốc Binh Kiều đi vào vận hành sau quyết định sáp nhập 3 trường: THPT Đốc Binh Kiều, THCS Đốc Binh Kiều và THCS Tân Kiều, trong bối cảnh xã Tân Kiều đã sáp nhập vào xã Đốc Binh Kiều và triển khai mô hình chính quyền địa phương 02 cấp.'),
          createBodyParagraph('Để ổn định nhanh chóng tổ chức bộ máy, củng cố sự đoàn kết nhất trí của 120 cán bộ, giáo viên, nhân viên, phát huy vai trò hạt nhân chính trị của 85 đảng viên tại 03 chi bộ trực thuộc, bảo đảm quyền lợi học tập của 2.111 học sinh thuộc 53 lớp trên cả 03 điểm trường, Ban Chấp hành Đảng bộ xây dựng Chương trình hành động năm 2026 như sau:'),

          ...createChapterHeading('I. MỤC TIÊU VÀ 10 CHỈ TIÊU TRỌNG TÂM NĂM 2026'),
          createArticleHeading('1. Mục tiêu chung'),
          createBodyParagraph('Tập trung lãnh đạo, chỉ đạo vận hành thông suốt, hiệu lực, hiệu quả bộ máy quản lý tại 03 điểm trường; ổn định tư tưởng, củng cố tình đoàn kết gắn bó trong toàn thể đội ngũ; đảm bảo kỷ cương nền nếp dạy và học; nâng cao chất lượng thi tốt nghiệp THPT, kỳ thi chọn học sinh giỏi cấp tỉnh và chăm lo giáo dục hòa nhập cho 25 học sinh khuyết tật; xây dựng Đảng bộ trong sạch, vững mạnh tiêu biểu của xã Đốc Binh Kiều.'),

          createArticleHeading('2. Hệ thống 10 chỉ tiêu trọng tâm năm 2026'),
          createSubItem('(1)', 'Xếp loại Đảng bộ: Đạt mức “Hoàn thành tốt nhiệm vụ” trở lên, phấn đấu đạt “Hoàn thành xuất sắc nhiệm vụ”.'),
          createSubItem('(2)', 'Công tác phát triển Đảng: Kết nạp từ 03 - 04 đảng viên mới (trong đó có 01 học sinh THPT ưu tú và 02-03 giáo viên trẻ).'),
          createSubItem('(3)', 'Học sinh giỏi văn hóa cấp tỉnh: Đạt ít nhất 15 giải cấp tỉnh trong năm 2026 (cấp THCS 07 giải, cấp THPT 08 giải).'),
          createSubItem('(4)', 'Hội thảo chuyên môn: Tổ chức ít nhất 02 buổi hội thảo, chuyên đề chuyên môn cấp cụm/tỉnh về đổi mới phương pháp giảng dạy và kiểm tra đánh giá theo CT GDPT 2018 liên thông 2 cấp THCS - THPT.'),
          createSubItem('(5)', 'Tỷ lệ học sinh nghỉ bỏ học: Duy trì ở mức dưới 0.4% trên cả 03 điểm trường (thấp hơn mặt bằng chung của tỉnh).'),
          createSubItem('(6)', 'Tỷ lệ tốt nghiệp THPT: Đạt từ 99.8% trở lên, nâng điểm trung bình các môn thi tốt nghiệp nằm trong tốp đầu của tỉnh Đồng Tháp.'),
          createSubItem('(7)', 'Chuyển đổi số giáo viên: Đạt tỷ lệ 100% cán bộ, giáo viên được bồi dưỡng kỹ năng số và ứng dụng CNTT, AI an toàn trong giáo dục.'),
          createSubItem('(8)', 'Hoạt động ngoại khóa: Tổ chức ít nhất 02 hoạt động hướng nghiệp - khởi nghiệp và 02 hoạt động trải nghiệm “Về nguồn” cho học sinh 3 điểm trường.'),
          createSubItem('(9)', 'Bảo hiểm y tế học sinh: Đạt tỷ lệ 100% học sinh tham gia BHYT (2.111/2.111 học sinh).'),
          createSubItem('(10)', 'Đoàn thể: Công đoàn cơ sở và Đoàn Thanh niên trường xếp loại “Hoàn thành xuất sắc nhiệm vụ”.'),

          ...createChapterHeading('II. CÁC NHÓM GIẢI PHÁP CHỦ YẾU NĂM 2026'),
          createArticleHeading('1. Đổi mới phương thức lãnh đạo, điều hành của Đảng ủy và Ban Giám hiệu'),
          createSubItem('-', 'Thiết lập quy chế giao ban trực tuyến định kỳ giữa Ban Giám hiệu với cán bộ phụ trách Điểm trường Tân Kiều (11km) và Điểm Đốc Binh Kiều để nắm bắt tình hình hằng ngày.', { boldPrefix: false }),
          createSubItem('-', 'Đẩy mạnh thực hiện mô hình “Cuộc họp không văn bản giấy”; phân công công việc khoa học theo năng lực sở trường của 10 đồng chí Đảng ủy viên, tránh chồng chéo hoặc bỏ sót nhiệm vụ.', { boldPrefix: false }),
          createSubItem('-', 'Tuyên dương, khen thưởng kịp thời các tập thể, cá nhân có thành tích xuất sắc, có sáng kiến hay trong việc ổn định đơn vị sau sáp nhập.', { boldPrefix: false }),

          createArticleHeading('2. Về công tác xây dựng, chỉnh đốn Đảng và tư tưởng chính trị'),
          createSubItem('-', 'Nâng cao chất lượng sinh hoạt của 03 chi bộ trực thuộc: Chi bộ 1 (Khối THPT & BGH), Chi bộ 2 (Khối THCS Tân Kiều), Chi bộ 3 (Khối THCS Đốc Binh Kiều); thực hiện sinh hoạt chuyên đề ít nhất 01 lần/quý.', { boldPrefix: false }),
          createSubItem('-', 'Thực hiện nghiêm túc quy định về trách nhiệm nêu gương của cán bộ, đảng viên, trước hết là Hiệu trưởng, các Phó Hiệu trưởng và Bí thư chi bộ.', { boldPrefix: false }),
          createSubItem('-', 'Đẩy mạnh công tác kiểm tra, giám sát thường xuyên đối với đảng viên về kỷ luật phát ngôn, phẩm chất đạo đức nhà giáo và trách nhiệm giảng dạy.', { boldPrefix: false }),

          createArticleHeading('3. Về thực hiện nhiệm vụ chính trị, chuyên môn dạy học'),
          createSubItem('-', 'Ban Giám hiệu xây dựng kế hoạch phân công chuyên môn công bằng, minh bạch, tạo điều kiện thuận lợi nhất cho giáo viên đi lại giảng dạy giữa các điểm trường.', { boldPrefix: false }),
          createSubItem('-', 'Tập trung cao độ cho công tác ôn thi tốt nghiệp THPT năm 2026; tổ chức phụ đạo cho học sinh học lực yếu, học sinh có hoàn cảnh khó khăn.', { boldPrefix: false }),
          createSubItem('-', 'Triển khai nghiêm túc kế hoạch giáo dục hòa nhập cho 25 học sinh khuyết tật theo Công văn số 3326/SGDĐT-GDTrH-TX&CN; tuyệt đối không bỏ rơi học sinh yếu thế.', { boldPrefix: false }),
          createSubItem('-', 'Khai thác, sử dụng hiệu quả phòng tin học, phòng thí nghiệm thực hành và thiết bị nghe nhìn ở cả 3 điểm trường; đẩy mạnh số hóa hồ sơ sổ sách.', { boldPrefix: false }),

          createArticleHeading('4. Về công tác đoàn thể và phối hợp xã hội'),
          createSubItem('-', 'Công đoàn cơ sở phát động phong trào thi đua “Đoàn kết - Đổi mới - Sáng tạo”; kịp thời thăm hỏi, trợ cấp cho các giáo viên, nhân viên có hoàn cảnh khó khăn sau sáp nhập.', { boldPrefix: false }),
          createSubItem('-', 'Đoàn trường và Liên đội Đội phối hợp tổ chức các sân chơi văn nghệ, thể thao liên cơ sở nhằm gắn kết tình bạn giữa học sinh THCS và THPT.', { boldPrefix: false }),
          createSubItem('-', 'Giữ mối liên hệ chặt chẽ với Đảng ủy, HĐND, UBND xã Đốc Binh Kiều để phối hợp giữ vững an ninh trật tự trường học trên toàn địa bàn xã.', { boldPrefix: false }),

          ...createChapterHeading('III. LỘ TRÌNH TỔ CHỨC THỰC HIỆN NĂM 2026'),
          createBodyParagraph('1. **Quý I/2026:** Kiện toàn tổ chức bộ máy, ban hành Quy chế làm việc 01-QC/ĐU, Thông báo phân công nhiệm vụ 02-TB/ĐU; tổ chức kỷ niệm các ngày lễ lớn; kiểm tra nề nếp sau Tết Nguyên đán.'),
          createBodyParagraph('2. **Quý II/2026:** Đẩy mạnh bồi dưỡng học sinh giỏi; tổ chức các đợt thi thử và ôn tập cao điểm thi tốt nghiệp THPT; xét công nhận tốt nghiệp THCS; sơ kết công tác Đảng 6 tháng đầu năm.'),
          createBodyParagraph('3. **Quý III/2026:** Đánh giá kết quả thi tốt nghiệp THPT; chuẩn bị chu đáo cơ sở vật chất, đội ngũ đón chào năm học mới 2026 - 2027 cho 53 lớp và 2.111 học sinh; tổ chức Khai giảng đồng bộ tại 3 điểm trường.'),
          createBodyParagraph('4. **Quý IV/2026:** Tổ chức kiểm tra chuyên đề các chi bộ; kiểm điểm, đánh giá, xếp loại chất lượng tổ chức đảng, đảng viên và tổng kết công tác Đảng năm 2026; bình xét thi đua khen thưởng.'),

          createSignatureBlockTable(
            'BÍ THƯ',
            'Lê Thanh Cường',
            [
              'Ban Thường vụ Đảng ủy xã Đốc Binh Kiều (để báo cáo);',
              'Sở GDĐT Đồng Tháp (để báo cáo);',
              'HĐND, UBND xã Đốc Binh Kiều (để phối hợp);',
              'Ban Giám hiệu nhà trường (để thực hiện);',
              '03 Chi bộ trực thuộc (để thực hiện);',
              'Các đồng chí Đảng ủy viên;',
              'Lưu: Đảng ủy.'
            ],
            { headerRole: 'T/M. ĐẢNG ỦY' }
          ),
        ],
      },
    ],
  });

  const buffer4 = await Packer.toBuffer(doc4);
  const path4Downloads = path.join(downloadsDir, '04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx');
  const path4DangBo = path.join(dangBoDir, '04_CTr_Hanh_dong_nam_2026_sau_sap_nhap.docx');
  fs.writeFileSync(path4Downloads, buffer4);
  fs.writeFileSync(path4DangBo, buffer4);
  console.log('Saved File 4 successfully!');

  console.log('--- HOÀN THÀNH TẠO 4 VĂN KIỆN CÔNG TÁC ĐẢNG BỘ ĐÃ ĐẠT CHUẨN NGHỊ ĐỊNH 30 VÀ ĐẢNG ---');
}

generateAllPartyDocuments().catch(console.error);

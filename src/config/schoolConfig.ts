/**
 * CẤU HÌNH TRUNG TÂM TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU
 * Tập trung một nguồn duy nhất (Single Source of Truth) cho tiêu ngữ hành chính,
 * địa chỉ 03 điểm trường và Ban Giám hiệu để chỉ cần sửa 1 nơi khi thay đổi.
 */

export const SCHOOL_CONFIG = {
  superiorAgency: 'SỞ GDĐT TỈNH ĐỒNG THÁP',
  schoolNameLines: ['TRƯỜNG THCS VÀ THPT', 'ĐỐC BINH KIỀU'] as const,
  schoolNameFull: 'TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
  location: 'Đốc Binh Kiều',
  commune: 'xã Đốc Binh Kiều, tỉnh Đồng Tháp',
  schoolYear: '2026 - 2027',
  partySuperior: 'ĐẢNG BỘ XÃ ĐỐC BINH KIỀU',
  partyCommittee: 'ĐẢNG ỦY TRƯỜNG THCS VÀ THPT ĐỐC BINH KIỀU',
  campuses: [
    {
      id: 'main',
      name: 'Điểm chính (Khối THPT)',
      address: 'Ấp 3, xã Đốc Binh Kiều, tỉnh Đồng Tháp',
      classes: 14,
      students: 529,
    },
    {
      id: 'thcs-dbk',
      name: 'Điểm trường THCS Đốc Binh Kiều',
      address: 'Ấp 1, xã Đốc Binh Kiều, tỉnh Đồng Tháp',
      classes: 24,
      students: 980,
    },
    {
      id: 'thcs-tk',
      name: 'Điểm trường THCS Tân Kiều',
      address: 'Ấp Tân Kiều, xã Đốc Binh Kiều, tỉnh Đồng Tháp',
      classes: 15,
      students: 602,
    },
  ],
  leadership: {
    principal: {
      title: 'Thầy',
      formalTitle: 'Ông',
      fullName: 'Lê Thanh Cường',
      role: 'Hiệu trưởng',
      partyRole: 'Bí thư Đảng ủy',
    },
    vicePrincipals: [
      {
        title: 'Thầy',
        formalTitle: 'Ông',
        fullName: 'Nguyễn Minh Trí',
        role: 'Phó Hiệu trưởng',
        partyRole: 'Phó Bí thư Đảng ủy',
        campus: 'Điểm chính (Khối THPT) & Chuyên môn toàn trường',
      },
      {
        title: 'Thầy',
        formalTitle: 'Ông',
        fullName: 'Phan Thanh Thảo',
        role: 'Phó Hiệu trưởng',
        campus: 'Điểm trường THCS Đốc Binh Kiều (24 lớp, 980 HS)',
      },
      {
        title: 'Thầy',
        formalTitle: 'Ông',
        fullName: 'Nguyễn Thanh Tòng',
        role: 'Phó Hiệu trưởng',
        partyRole: 'Bí thư Chi bộ 2',
        campus: 'Điểm trường THCS Tân Kiều (15 lớp, 602 HS)',
      },
    ],
  },
} as const;

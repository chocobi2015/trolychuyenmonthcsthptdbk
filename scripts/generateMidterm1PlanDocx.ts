import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export async function generateMidterm1PlanDocx(outputPath: string): Promise<void> {
  const scriptPath = path.resolve(process.cwd(), 'scripts/build_official_plan_docx.py');
  execSync(`python3 "${scriptPath}"`, { stdio: 'inherit' });
  
  if (outputPath && fs.existsSync('public/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx') && outputPath !== path.resolve(process.cwd(), 'public/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx')) {
    fs.copyFileSync('public/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx', outputPath);
  }
}

const isMain = process.argv[1] && process.argv[1].endsWith('generateMidterm1PlanDocx.ts');
if (isMain) {
  const defaultOutput = path.resolve(process.cwd(), 'public/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
  generateMidterm1PlanDocx(defaultOutput)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

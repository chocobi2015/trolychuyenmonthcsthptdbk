import * as path from 'path';
import * as fs from 'fs';
import { generateMidterm1PlanDocx } from './generateMidterm1PlanDocx';

export async function generateMidtermExamPlanDocx(outputPath: string): Promise<void> {
  return generateMidterm1PlanDocx(outputPath);
}

const isMain = process.argv[1] && process.argv[1].endsWith('generateMidtermExamPlanDocx.ts');
if (isMain) {
  const defaultOutput = path.resolve(process.cwd(), 'public/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
  generateMidtermExamPlanDocx(defaultOutput)
    .then(() => {
      const distTarget = path.resolve(process.cwd(), 'dist/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
      if (fs.existsSync(path.dirname(distTarget))) {
        fs.copyFileSync(defaultOutput, distTarget);
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

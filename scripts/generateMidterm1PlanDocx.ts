import * as fs from 'fs';
import * as path from 'path';
import { Packer } from 'docx';
import { createSchoolDocumentDocx } from '../src/utils/docxExport';
import { SchoolDocument } from '../src/types/document';

export async function generateMidterm1PlanDocx(outputPath: string): Promise<void> {
  let doc: SchoolDocument | undefined;

  const persistedPath = path.resolve(process.cwd(), 'src/data/persistedDocuments.json');
  if (fs.existsSync(persistedPath)) {
    try {
      const docs = JSON.parse(fs.readFileSync(persistedPath, 'utf-8'));
      doc = docs.find((d: any) => d.id === 'doc-kh-ktgk1-2026');
    } catch (e) {
      console.warn('Could not read from persistedDocuments.json, falling back to mockDocuments');
    }
  }

  if (!doc) {
    const { INITIAL_SCHOOL_DOCUMENTS } = await import('../src/data/mockDocuments');
    doc = INITIAL_SCHOOL_DOCUMENTS.find((d: any) => d.id === 'doc-kh-ktgk1-2026') as SchoolDocument;
  }

  if (!doc) {
    throw new Error('Document doc-kh-ktgk1-2026 not found');
  }

  const docx = createSchoolDocumentDocx(doc);
  const buffer = await Packer.toBuffer(docx);

  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`[generateMidterm1PlanDocx] Successfully generated ${outputPath} (${buffer.length} bytes) using Decree 30 standards`);
}

const isMain = process.argv[1] && process.argv[1].endsWith('generateMidterm1PlanDocx.ts');
if (isMain) {
  const defaultOutput = path.resolve(process.cwd(), 'public/downloads/KH_KIEM_TRA_GIUA_HK1_2026_2027_THCS_THPT_DOC_BINH_KIEU.docx');
  generateMidterm1PlanDocx(defaultOutput)
    .then(() => {
      // Also sync to dist/downloads if dist exists
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

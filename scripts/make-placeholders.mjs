// PENEDU 플레이스홀더 파일 생성 스크립트
// - public/files/prompt-activity.pdf : 최소 유효 PDF (활동지 자리표시자)
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const filesDir = join(root, "public", "files");
mkdirSync(filesDir, { recursive: true });

function buildPdf(textLines) {
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  let content = "BT /F1 16 Tf 72 760 Td 22 TL\n";
  for (const line of textLines) content += `(${esc(line)}) Tj T*\n`;
  content += "ET";
  const objs = [];
  objs[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objs[2] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
  objs[3] =
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>";
  objs[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objs[5] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 1; i < objs.length; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objs[i]}\nendobj\n`;
  }
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objs.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objs.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  return Buffer.from(pdf, "latin1");
}

const pdf = buildPdf([
  "PENEDU - activity sheet (placeholder)",
  "",
  "Replace public/files/prompt-activity.pdf",
  "with the real handout PDF later.",
]);
writeFileSync(join(filesDir, "prompt-activity.pdf"), pdf);

writeFileSync(
  join(filesDir, "README.txt"),
  [
    "이 폴더는 다운로드 파일 플레이스홀더예요.",
    "",
    "- prompt-activity.pdf : 활동지 PDF 자리표시자 (실제 활동지로 교체하세요)",
  ].join("\n"),
);

console.log("placeholder files written:");
console.log("- public/files/prompt-activity.pdf");
console.log("- public/files/README.txt");

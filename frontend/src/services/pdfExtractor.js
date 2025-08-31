import * as pdfjsLib from "pdfjs-dist";
// 👇 use ?url so Vite treats it as an asset URL, not a module
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractTextFromPDF(file, onProgress) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map(it => it.str || "").join(" ") + "\n\n";
    
    if (onProgress) onProgress({ page: i, total: pdf.numPages });
  }
  
  return fullText.trim();
}
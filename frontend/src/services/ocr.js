import Tesseract from "tesseract.js";

export async function extractTextFromImage(file, onProgress) {
  const { data: { text } } = await Tesseract.recognize(file, "eng", {
    logger: (m) => {
      if (m.status === "recognizing text" && onProgress) {
        onProgress(Math.round(m.progress * 100));
      }
    }
  });

  return text || "";
}
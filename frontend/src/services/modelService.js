import { pipeline } from "@xenova/transformers";

let sentimentPipeline = null;
let summarizerPipeline = null;

export async function preloadPipelines() {
  if (!sentimentPipeline) sentimentPipeline = await pipeline("sentiment-analysis");
  if (!summarizerPipeline) summarizerPipeline = await pipeline("summarization");
  return { sentimentPipeline, summarizerPipeline };
}

export async function analyzeWithLocalModels(text) {
  await preloadPipelines();

  const sentiment = await sentimentPipeline(text);

  // Always summarize
  let summaryResult = await summarizerPipeline(text, { min_length: 20, max_length: 80 });

  return {
    sentiment,
    stats: {},        // keep your stats object here
    advice: [],       // keep your advice array here
    altText: "",      // keep alt text here
    model: {
      summary: summaryResult?.[0]?.summary_text || summaryResult?.[0]?.summary || null
    }
  };
}

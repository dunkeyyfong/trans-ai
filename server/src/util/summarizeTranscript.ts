import { encoding_for_model } from 'tiktoken';
import {callOpenAI} from "./openaiConfig"
import {splitIntoChunks} from "./splitIntoChunks"
import {combineSummaries} from "./combineSummaries"


export const encoder = encoding_for_model('gpt-4');

export async function summarizeTranscript(transcript: string) {
  const MAX_TOKENS = 8192; // Tổng giới hạn cho GPT-4
  const promptTemplate = 'Đây là nội dung của một video. Dựa hoàn toàn vào nội dung sau đây, tóm tắt chính xác: "{chunk}". Nội dung nói về cái gì, các yếu tố chính, và timeline quan trọng (nếu có). Không thêm thông tin suy diễn ngoài dữ liệu cung cấp.';
  const promptTokens = encoder.encode(promptTemplate.replace('{chunk}', '')).length;

  // Áp dụng giới hạn an toàn 80% để tránh overflow
  const maxChunkTokens = Math.floor((MAX_TOKENS - promptTokens) * 0.8);

  console.log('Total transcript tokens:', encoder.encode(transcript).length);
  console.log('Prompt tokens:', promptTokens);
  console.log('Max chunk tokens:', maxChunkTokens);

  const chunks = splitIntoChunks(transcript, maxChunkTokens);
  const summaries = [];

  console.log('Number of chunks:', chunks.length);
  chunks.forEach((chunk, index) => {
    const chunkTokens = encoder.encode(chunk).length;
    console.log(`Chunk ${index + 1}: ${chunkTokens} tokens`);
  });

  for (const chunk of chunks) {
    const prompt = promptTemplate.replace('{chunk}', chunk);
    const totalTokens = encoder.encode(prompt).length;

    if (totalTokens > MAX_TOKENS) {
      console.error(`Prompt too long for chunk: ${totalTokens} tokens`);
      continue; // Skip chunk
    }

    const summary = await callOpenAI(prompt);
    console.log(`Summary for chunk ${chunks.indexOf(chunk) + 1}:`, summary);
    summaries.push(summary);
  }

  const finalSummary = await combineSummaries(summaries);
  return finalSummary;
}
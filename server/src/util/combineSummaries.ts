import { callOpenAI } from './openaiConfig'

export async function combineSummaries(summaries: string[]) {
  if (summaries.length === 1) return summaries[0]

  const combinePrompt = `Đây là các tóm tắt từ nội dung video. Gộp các tóm tắt sau thành một tóm tắt tổng quát, chính xác, tập trung vào nội dụng, chi tiết hơn về các timeline, tách thành từng dòng trong timeline. và timeline quan trọng: "${summaries.join('\n\n')}".`
  return await callOpenAI(combinePrompt)
}

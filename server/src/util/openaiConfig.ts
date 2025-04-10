import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: `${process.env.OPENAI_KEY}`, // Thay bằng API key của bạn
});

export async function callOpenAI(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Đổi sang 'gpt-4-32k' nếu có
      messages: [
        { role: 'system', content: 'Bạn là một trợ lý tóm tắt nội dung chính xác, chỉ dựa vào dữ liệu được cung cấp.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.5,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error with OpenAI:', error);
    return 'Failed to summarize this chunk';
  }
}
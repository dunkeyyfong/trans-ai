import { encoder } from './summarizeTranscript'

export function splitIntoChunks(text, maxTokens) {
  const tokens = encoder.encode(text)
  const chunks = []
  const safeLimit = Math.floor(maxTokens) // đã áp dụng safety từ trên

  let currentChunkTokens = []

  for (let i = 0; i < tokens.length; i++) {
    currentChunkTokens.push(tokens[i])
    if (currentChunkTokens.length >= safeLimit || i === tokens.length - 1) {
      const chunkText = encoder.decode(currentChunkTokens)
      const chunkStr = typeof chunkText === 'string' ? chunkText : Buffer.from(chunkText).toString()
      chunks.push(chunkStr.trim())
      currentChunkTokens = []
    }
  }

  return chunks
}

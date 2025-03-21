export async function download(videoId: string, onProgress: ProgressCallback, accessToken: string, API_URL: string) {
  const response = await fetch(`${API_URL}/api/download?videoId=${videoId}`, {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  });

  const reader = response.body?.getReader()

  if (!reader) {
    throw new Error('No reader found')
  }

  return streamResponse(reader, onProgress)
}

type ProgressCallback = (output: string) => void

export async function streamResponse(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onProgress: ProgressCallback
  ): Promise<string> {
    return await new Promise(resolve => {
      const decoder = new TextDecoder()
      let result = ''
      const readChunk = ({
        done,
        value
      }: ReadableStreamReadResult<Uint8Array>) => {
        if (done) {
          resolve(result)
          return
        }
  
        const output = decoder.decode(value)
        result += output
        onProgress(output)
        reader.read().then(readChunk)
      }
  
      reader.read().then(readChunk)
    })
  }
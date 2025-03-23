export async function processVideo(
  videoId: string,
  accessToken: string,
  API_URL: string,
  callback: ProgressCallback
): Promise<false | string> {
  callback('Downloading audio...\n')
  await download(videoId, callback, accessToken, API_URL)

  callback('\nTranscribing audio. It takes a while...\n')
  const srt = await transcribe(videoId, callback)

  if (srt) {
    callback('\nTranslating text...\n')
    const result = await translate(srt, callback)
    callback('\nDone!\n')
    return result
  }

  return false
}

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
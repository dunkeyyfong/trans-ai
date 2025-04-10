export async function processVideo(
  videoId: string,
  callback: ProgressCallback,
  accessToken: string,
  API_URL: string,
  lang: string
): Promise<false | string> {
  console.log('[processVideo] Starting with videoId:', videoId, 'API_URL:', API_URL, 'lang:', lang)
  callback('Downloading audio...\n')
  try {
    await download(videoId, callback, accessToken, API_URL)
    console.log('[processVideo] Download completed successfully')

    callback('\nTranscribing audio. It takes a while...\n')
    const srt = await transcribe(videoId, callback, accessToken, API_URL)
    console.log('[processVideo] Transcription completed:', srt ? 'Successfully' : 'Failed')

    if (srt) {
      callback('\nTranslating text...\n')
      const result = await translate(srt, callback, accessToken, API_URL, lang)
      console.log('[processVideo] Translation result:', result)
      callback('\nDone!\n')
      return result
    }

    console.log('[processVideo] Process failed at transcription step')
    return false
  } catch (error) {
    console.error('[processVideo] Error:', error)
    return false
  }
}

export async function download(videoId: string, onProgress: ProgressCallback, accessToken: string, API_URL: string) {
  console.log('[download] Starting for videoId:', videoId, 'API_URL:', API_URL)
  try {
    const response = await fetch(`${API_URL}/api/download?videoId=${videoId}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    });
    console.log('[download] Response status:', response.status, response.statusText)

    const reader = response.body?.getReader()

    if (!reader) {
      console.error('[download] No reader found in response')
      throw new Error('No reader found')
    }

    console.log('[download] Reader obtained, starting stream')
    return streamResponse(reader, onProgress)
  } catch (error) {
    console.error('[download] Error during download:', error)
    throw error
  }
}

export async function transcribe(videoId: string, onProgress: ProgressCallback, accessToken: string, API_URL: string) {
  console.log('[transcribe] Starting for videoId:', videoId, 'API_URL:', API_URL)
  try {
    const response = await fetch(`${API_URL}/api/transcribe?videoId=${videoId}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    });
    console.log('[transcribe] Response status:', response.status, response.statusText)

    const reader = response.body?.getReader()

    if (reader) {
      console.log('[transcribe] Reader obtained, starting stream')
      return streamResponse(reader, onProgress)
    } else {
      console.error('[transcribe] No reader found in response')
      return false
    }
  } catch (error) {
    console.error('[transcribe] Error during transcription:', error)
    return false
  }
}

export async function translate(srt: string, onProgress: ProgressCallback, accessToken: string, API_URL: string, lang: string) {
  console.log('[translate] Starting translation to language:', lang, 'API_URL:', API_URL)
  console.log('[translate] SRT input length:', srt.length, 'characters')
  try {
    const response = await fetch(`${API_URL}/api/translate?lang=${lang}`, {
      method: "POST",
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        "Authorization": `Bearer ${accessToken}`
      },
      body: srt,
    });
    console.log('[translate] Response status:', response.status, response.statusText)

    const reader = response.body?.getReader()

    if (reader) {
      console.log('[translate] Reader obtained, starting stream')
      const result = await streamResponse(reader, onProgress)
      console.log('[translate] Translation completed, result length:', result.length, 'characters')
      
      // Process the result to remove duplicate entries
      const processedResult = removeDuplicatedSubtitles(
        result
          .split('\n')
          .filter(line => !line.startsWith('[Error]'))
          .join('\n')
      )
      
      return processedResult
    } else {
      console.error('[translate] No reader found in response')
      return false
    }
  } catch (error) {
    console.error('[translate] Error during translation:', error)
    return false
  }
}

// Function to remove duplicated subtitles
function removeDuplicatedSubtitles(srtContent: string): string {
  // Split by subtitle entries (usually separated by double newlines)
  const entries = srtContent.split('\n\n').filter(entry => entry.trim().length > 0)
  const uniqueEntries: string[] = []
  
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    // Check if this entry contains a duplicate (the same number and timestamp appearing twice)
    const lines = entry.split('\n')
    if (lines.length >= 4) {
      // Check if line 1 and line 3 are identical (subtitle number)
      // and if line 2 and line 4 are identical (timestamp)
      if (lines[0] === lines[2] && lines[1] === lines[3]) {
        // This is a duplicated entry, create a new entry with just the first half
        uniqueEntries.push([lines[0], lines[1], lines[4]].join('\n'))
      } else {
        // Not a duplicate, add as is
        uniqueEntries.push(entry)
      }
    } else {
      // Not enough lines to be a duplicate, add as is
      uniqueEntries.push(entry)
    }
  }
  
  return uniqueEntries.join('\n\n')
}

type ProgressCallback = (output: string) => void

export async function streamResponse(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onProgress: ProgressCallback
  ): Promise<string> {
    console.log('[streamResponse] Starting stream processing')
    let chunkCount = 0
    let totalBytes = 0
    
    return await new Promise(resolve => {
      const decoder = new TextDecoder()
      let result = ''
      const readChunk = ({
        done,
        value,
      }: ReadableStreamReadResult<Uint8Array>) => {
        if (done) {
          console.log(`[streamResponse] Stream completed: ${chunkCount} chunks, ${totalBytes} bytes total, result length: ${result.length} characters`)
          resolve(result)
          return
        }
        
        chunkCount++
        totalBytes += value?.length || 0
        console.log(`[streamResponse] Received chunk #${chunkCount}, size: ${value?.length || 0} bytes`)
  
        const output = decoder.decode(value)
        result += output
        onProgress(output)
        reader.read().then(readChunk)
      }
  
      reader.read().then(readChunk)
    })
  }

  export const fetchYouTubeTitle = async (url: string) => {
    console.log('[fetchYouTubeTitle] Fetching title for URL:', url)
    try {
      const response = await fetch(`https://noembed.com/embed?url=${url}`);
      console.log('[fetchYouTubeTitle] Response status:', response.status, response.statusText)
      const data = await response.json();
      console.log('[fetchYouTubeTitle] Data received:', data)
      
      if (data.title) {
        console.log('[fetchYouTubeTitle] Title found:', data.title)
        return data.title;
      } else {
        console.log('[fetchYouTubeTitle] No title found in data')
        return "Unknown Video";
      }
    } catch (error) {
      console.error("[fetchYouTubeTitle] Error fetching video title:", error);
      return "Error Fetching Title";
    }
  };
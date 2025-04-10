import xml2js from 'xml2js'

export async function getTranscriptText(link: string) {
  try {
    const response = await fetch(link)
    const xmlText = await response.text()

    const parser = new xml2js.Parser({ explicitArray: false })
    const result = await parser.parseStringPromise(xmlText)
    const textNodes = result.transcript.text || []

    const transcript = textNodes
      .map((node) => node._ || '')
      .join(' ')
      .trim()
      .replace(/\n/g, ' ')

    return transcript || null
  } catch (error) {
    console.error('Error processing subtitles:', error)
    return null
  }
}

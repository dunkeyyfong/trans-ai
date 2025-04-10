import { Request, Response } from 'express'
import { extractCaptionsFromHtml } from '../../util/extractCaptionsFromHtml'
import { getTranscriptText } from '../../util/getTranscriptText'
import { summarizeTranscript } from '../../util/summarizeTranscript'

export const getSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoUrl } = req.query as { videoUrl?: string } // Ensuring proper typing for query params

    if (!videoUrl) {
      res.status(400).json({ error: 'Invalid YouTube URL' }) // <- No return here
      return
    }

    const url = `https://www.youtube.com/watch?v=${videoUrl}`

    try {
      const response = await fetch(url)
      const html = await response.text()
      const captionsData = extractCaptionsFromHtml(html)

      if (captionsData.error) {
        res.status(404).json({ error: 'No captions available' })
        return
      }

      const selectedCaption = captionsData.find((c: { language: string }) => c.language === 'English') || captionsData[0]
      const transcript = await getTranscriptText(selectedCaption.link)

      if (!transcript) {
        res.status(404).json({ error: 'No subtitles found' })
        return
      }

      console.log('Transcript:', transcript)

      const summary = await summarizeTranscript(transcript)
      res.json({ summary })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'Failed to fetch or process captions' })
    }
  } catch (error) {
    console.error(error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

import { Response, Request } from 'express'
import { spawn } from 'node:child_process'

export const postDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoId } = req.body as { videoId: string }

    if (typeof videoId !== 'string') {
      res.status(400).json({ error: 'Invalid request' })
      return
    }

    console.log('video ID:', videoId)

    const scriptPath = '/app/server/scripts/download_audio.sh'
    const cmd = spawn('/bin/bash', [scriptPath, videoId])

    let errorOccurred = false

    cmd.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    cmd.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
      errorOccurred = true
    })

    cmd.on('close', (code) => {
      if (!res.headersSent) {
        if (code === 0 && !errorOccurred) {
          res.status(200).json({ success: true, message: 'Download completed successfully' })
        } else {
          res.status(500).json({ success: false, message: `Download process exited with code ${code}` })
        }
      }
    })
    
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
    console.error(error)
  }
}

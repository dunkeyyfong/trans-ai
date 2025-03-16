import { Response, Request } from 'express'
import { spawn } from 'node:child_process'
import path from 'path'

export const postDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoId } = req.body as { videoId: string }

    if (typeof videoId !== 'string') {
        res.status(400).json({ error: 'Invalid request' })
        return
    }

    console.log('video ID:', videoId)

    const scriptPath = '/app/server/scripts/download_audio.sh';
    const cmd = spawn('/bin/bash', [scriptPath, videoId]);
    
    cmd.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })
    
    cmd.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })
    
    cmd.on('close', (code) => {
      if (code === 0) {
        res.status(200).json({ success: true, message: 'Download completed successfully' })
      } else {
        res.status(500).json({ success: false, message: `Download process exited with code ${code}` })
      }
    })

    res.status(200).json({ message: "Video ID", videoId })
    
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}

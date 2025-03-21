import { Response, Request } from 'express'
import { spawn } from 'node:child_process'
import { transferChildProcessOutput } from '~/util/shell'

export const getDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoId } = req.query as { videoId: string }

    if (typeof videoId !== 'string') {
      res.status(400).json({ error: 'Invalid request' })
      return
    }

    const scriptPath = '/app/server/scripts/download_audio.sh'
    const cmd = spawn('/bin/bash', [scriptPath, videoId])

    transferChildProcessOutput(cmd, res)
    
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
    console.error(error)
  }
}

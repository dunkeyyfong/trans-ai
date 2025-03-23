import { Response, Request } from 'express'
import { spawn } from 'node:child_process'
import { transferChildProcessOutput } from '~/util/shell'

export const getTranscribe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { videoId } = req.query as { videoId: string }

    if (typeof videoId !== 'string') {
      res.status(400).json({ error: 'Invalid request' })
      return
    }

    const scriptPath = '/app/server/scripts/transcribe.py'

    const cmd = spawn(
        'python3',
        [scriptPath, videoId],
        {
        cwd: process.cwd()
        }
    )

    transferChildProcessOutput(cmd, res)
    
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
    console.error(error)
  }
}

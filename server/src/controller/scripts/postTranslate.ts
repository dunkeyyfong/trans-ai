import { Response, Request } from 'express'
import { spawn } from 'node:child_process'
import { transferChildProcessOutput } from '~/util/shell'

export const postTranslate = async (req: Request, res: Response): Promise<void> => {
  try {
    const srt = req.body as string
    const lang = req.query.lang as string

    if (typeof srt !== 'string' || typeof lang !== 'string') {
        res.status(400).json({ error: 'Invalid request' })
        return
      }

    const scriptPath = '/app/server/scripts/translate.py'

    const cmd = spawn(
        'python3',
        [scriptPath, '-L', lang],
        {
        cwd: process.cwd()
        }
    )
    cmd.stdin.write(srt)
    cmd.stdin.end()

    transferChildProcessOutput(cmd, res)
    
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
    console.error(error)
  }
}

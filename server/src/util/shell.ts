import { ChildProcessWithoutNullStreams } from "child_process";
import { Response } from "express";

export const transferChildProcessOutput = (cmd: ChildProcessWithoutNullStreams, res: Response) => {
    const sendLine = (message: string) => {
        message.toString().split('\n').forEach(line => {
            if (line.trim() !== '') {
                res.write(line + '\n')
            }
        })
    }

    cmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        sendLine(data)
    })

    cmd.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
        sendLine(data)
    })

    cmd.on('close', (code) => {
        sendLine(code?.toString() || 'Unknown error')
    })

    cmd.stdout.pipe(res)

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    })
}
import { ChildProcessWithoutNullStreams } from "child_process";
import { Response } from "express";

export const transferChildProcessOutput = (cmd: ChildProcessWithoutNullStreams, res: Response) => {
    // Thiết lập response headers trước
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    })

    // Sử dụng pipe thay vì xử lý thủ công để tránh trùng lặp
    cmd.stdout.pipe(res, { end: false })
    
    // Xử lý các lỗi và log cho debug
    cmd.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
        // Chỉ ghi lỗi ra console, không gửi đến client để tránh trùng lặp
    })

    // Khi child process kết thúc
    cmd.on('close', (code) => {
        console.log(`Child process exited with code ${code}`)
        res.end() // Kết thúc response khi process hoàn tất
    })
}
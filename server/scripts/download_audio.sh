#!/bin/bash

#!/bin/bash

VIDEO_ID=$1

[ -z "$VIDEO_ID" ] && echo "Usage: $0 <video_id>" && exit 1

TMP_DIR="./tmp"
mkdir -p "$TMP_DIR"

SUBTITLE_FILE="$TMP_DIR/$VIDEO_ID.srt"
AUDIO_FILE="$TMP_DIR/$VIDEO_ID.m4a"

# Tải phụ đề (nếu có)
yt-dlp "https://www.youtube.com/watch?v=$VIDEO_ID" --write-auto-sub --sub-lang vi  --sub-format vtt --convert-subs srt --skip-download -o "$SUBTITLE_FILE" 2>&1

# Kiểm tra nếu phụ đề không tồn tại thì tải âm thanh
if [ ! -f "$SUBTITLE_FILE" ]; then
    echo "Không tìm thấy phụ đề, tải âm thanh..."
    yt-dlp "https://www.youtube.com/watch?v=$VIDEO_ID" --format m4a -o "$AUDIO_FILE" 2>&1
else
    echo "Tải phụ đề thành công: $SUBTITLE_FILE"
fi

 
#  The script downloads the audio of a YouTube video using  yt-dlp  and saves it in the  audio  directory. 
#  The  yt-dlp  command downloads the best audio quality available for the video. 
#  The script takes the video ID as an argument. 
#  The script is executable: 
#  chmod +x server/scripts/download_audio.sh
 
#  The script is called from the  download_audio  function in the  server/src/index.ts  file:
#!/bin/bash

VIDEO_ID=$1

[ -z "$VIDEO_ID" ] && echo "ERROR: No video ID specified" && exit 1

yt-dlp "https://www.youtube.com/watch?v=$VIDEO_ID" --format m4a -o "./tmp/%(id)s.%(ext)s" 2>&1

 
#  The script downloads the audio of a YouTube video using  yt-dlp  and saves it in the  audio  directory. 
#  The  yt-dlp  command downloads the best audio quality available for the video. 
#  The script takes the video ID as an argument. 
#  The script is executable: 
#  chmod +x server/scripts/download_audio.sh
 
#  The script is called from the  download_audio  function in the  server/src/index.ts  file:
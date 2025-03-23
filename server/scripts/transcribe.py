from openai import OpenAI
from dotenv import load_dotenv
import os
import sys

load_dotenv()

api_key = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=api_key)

video_id = sys.argv[1]
tmp_dir = os.path.join(os.getcwd(), '/app/server/tmp')
audio_file_path = os.path.join(tmp_dir, video_id + '.m4a')

audio_file = open(audio_file_path, "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1",
  response_format="srt",
  file=audio_file
)

print(f"Transcribing {audio_file_path}...")
print(transcript)
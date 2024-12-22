from transformers import pipeline
import librosa
import os
import sys

# Video ID và file âm thanh
video_id = sys.argv[1]
tmp_dir = os.path.join(os.getcwd(), 'tmp')
audio_file_path = os.path.join(tmp_dir, video_id + '.wav')

# Load pipeline với mô hình Whisper
model_name = "openai/whisper-large-v3"
whisper_pipeline = pipeline("automatic-speech-recognition", model=model_name)

# Load và xử lý file âm thanh với librosa
waveform, sample_rate = librosa.load(audio_file_path, sr=None)

# Resample nếu cần thiết
if sample_rate != 16000:
    waveform = librosa.resample(waveform, orig_sr=sample_rate, target_sr=16000)
    sample_rate = 16000

# Chia âm thanh thành các đoạn nhỏ để lấy timestamps
chunk_duration = 15  # mỗi đoạn 15 giây
total_duration = len(waveform) / sample_rate  # tổng thời gian của file âm thanh
chunks = []
timestamps = []

for start in range(0, int(total_duration), chunk_duration):
    end = min(start + chunk_duration, total_duration)
    start_sample = int(start * sample_rate)
    end_sample = int(end * sample_rate)
    chunks.append(waveform[start_sample:end_sample])
    timestamps.append((start, end))

# Tạo transcription cho từng đoạn
srt_output = []
for idx, (chunk, (start, end)) in enumerate(zip(chunks, timestamps)):
    # Chuyển đổi chunk thành numpy array (cần thiết cho pipeline)
    chunk = chunk.astype("float32")
    
    # Dự đoán transcription
    transcription = whisper_pipeline(chunk, sampling_rate=16000)["text"]
    
    # Định dạng timestamp
    def format_time(seconds):
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)
        seconds = int(seconds % 60)
        milliseconds = int((seconds % 1) * 1000)
        return f"{hours:02}:{minutes:02}:{seconds:02},{milliseconds:03}"

    start_time = format_time(start)
    end_time = format_time(end)
    
    # Thêm vào kết quả SRT
    srt_output.append(f"{idx + 1}\n{start_time} --> {end_time}\n{transcription}\n")

# Lưu kết quả vào file SRT
output_srt_path = os.path.join(tmp_dir, f"{video_id}.srt")
with open(output_srt_path, "w", encoding="utf-8") as srt_file:
    srt_file.writelines(srt_output)

print(f"Transcription saved to {output_srt_path}")
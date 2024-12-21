from openai import OpenAI
from dotenv import load_dotenv
import os
import sys
import pysrt

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_KEY")
input_data = sys.stdin.read()
subs = pysrt.from_string(input_data)
# Initialize OpenAI client
client = OpenAI(api_key=api_key)

# Translation prompt
prompt_base = (
    "You are a multilingual translator. "
    "Translate the following text precisely into the Japanese with the polite and formal style. "
    "Translate from [START] to [END]:\n[START]\n"
)

def translate_text(text):
    prompt = prompt_base
    prompt += text + "\n[END]"

    response = client.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        max_tokens=3000,
        temperature=0,
    )
    translated = response.choices[0].text.strip()
    if translated.startswith('「'):
        translated = translated[1:]
    if translated.endswith('」'):
        translated = translated[:-1]
    return translated


for index, subtitle in enumerate(subs):
    subtitle.text = translate_text(subtitle.text)
    print(subtitle, flush=True)
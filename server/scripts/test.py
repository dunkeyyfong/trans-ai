from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("OPENAI_KEY")

client = OpenAI(api_key=api_key)

# Lấy danh sách models
response = client.models.list()

# In danh sách models
for model in response.data:
    print(f"Model ID: {model.id}")
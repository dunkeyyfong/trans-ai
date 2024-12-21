import os
import openai
openai.api_key = os.getenv('OPENAI_KEY')
print(openai.Model.list())
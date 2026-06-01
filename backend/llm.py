import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "llama-3.1-8b-instant"

def ask_llm(question, chunks):
    context = "\n\n".join(chunks)

    prompt = f'''
Answer the question based on the document context.

Context:
{context}

Question:
{question}

Provide a clear answer.
'''

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content


def generate_welcome_message(text):
    prompt = f'''
Analyze this PDF content and generate JSON only.

Format:
{{
    "summary": "short summary",
    "questions": [
        "question 1",
        "question 2",
        "question 3",
        "question 4"
    ]
}}

PDF Content:
{text[:4000]}
'''

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content

    try:
        return json.loads(content)
    except:
        return {
            "summary": "Document uploaded successfully.",
            "questions": [
                "What is this document about?",
                "Give me a summary",
                "What are the key points?",
                "Explain important topics"
            ]
        }
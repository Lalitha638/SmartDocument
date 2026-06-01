import os
import re
import uuid
import chromadb

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from parser import extract_text_from_pdf
from chunker import split_text
from embedder import create_embeddings
from retriever import retrieve_chunks
from llm import ask_llm, generate_welcome_message

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = chromadb.PersistentClient(path="./chroma_db")

documents = []

def clean_doc_id(filename):
    filename = re.sub(r"[\[\]\(\){}]", "", filename)
    filename = re.sub(r"[^a-zA-Z0-9._-]", "_", filename)
    return filename.lower()


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    unique_name = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)

    chunks = split_text(text)

    embeddings = create_embeddings(chunks)

    doc_id = clean_doc_id(file.filename)

    collection = client.get_or_create_collection(name=doc_id)

    ids = [str(i) for i in range(len(chunks))]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids
    )

    documents.append({
        "doc_id": doc_id,
        "name": file.filename
    })

    welcome = generate_welcome_message(text)

    return {
        "doc_id": doc_id,
        "name": file.filename,
        "welcome": welcome
    }


@app.post("/ask")
async def ask_question(data: dict):
    doc_id = data.get("doc_id")
    question = data.get("question")

    chunks = retrieve_chunks(doc_id, question)

    answer = ask_llm(question, chunks)

    return {
        "answer": answer,
        "citations": chunks
    }


@app.get("/documents")
async def list_documents():
    return documents


frontend_path = "../frontend/build"

if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        return FileResponse(os.path.join(frontend_path, "index.html"))
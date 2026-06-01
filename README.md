# Smart Document Q&A App

## Features
- FastAPI backend
- React frontend
- PDF upload
- ChromaDB vector search
- Groq Llama3 integration
- Suggested questions
- Multi-document support

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Create `.env` file:

```env
GROQ_API_KEY=your_key_here
```

Run backend:

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install
npm run build
```

The React build folder is automatically served by FastAPI.

---

## Run Full App

After frontend build:

```bash
cd backend

uvicorn main:app --reload
```

Open:

http://127.0.0.1:8000
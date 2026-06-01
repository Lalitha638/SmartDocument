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
#
<img width="841" height="502" alt="SmartDoc_p0" src="https://github.com/user-attachments/assets/90870b7a-f9f0-43bd-84f5-afb8ae880253" />
#
<img width="842" height="509" alt="SmartDoc_p1" src="https://github.com/user-attachments/assets/ddaac071-a89d-4a00-a5cb-900ed58c01b1" />




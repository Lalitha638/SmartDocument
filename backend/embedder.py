from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def create_embeddings(chunks):
    return model.encode(chunks).tolist()

def create_query_embedding(query):
    return model.encode([query])[0].tolist()
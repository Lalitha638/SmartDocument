import chromadb
from embedder import create_query_embedding

client = chromadb.PersistentClient(path="./chroma_db")

def get_collection(doc_id):
    return client.get_or_create_collection(name=doc_id)

def retrieve_chunks(doc_id, question, top_k=5):
    collection = get_collection(doc_id)

    embedding = create_query_embedding(question)

    results = collection.query(
        query_embeddings=[embedding],
        n_results=top_k
    )

    docs = results["documents"][0]

    return docs
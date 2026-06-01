import React from "react";
import { useDropzone } from "react-dropzone";

function Sidebar({
  documents,
  setDocuments,
  selectedDoc,
  setSelectedDoc
}) {

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    setDocuments((prev) => [...prev, data]);
    setSelectedDoc(data);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"]
    }
  });

  return (
    <div className="sidebar">
      <h2>🤖 Smart Docs</h2>

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & Drop PDF</p>
      </div>

      <div className="doc-list">
        {documents.map((doc) => (
          <div
            key={doc.doc_id}
            className={
              selectedDoc?.doc_id === doc.doc_id
                ? "doc-item active"
                : "doc-item"
            }
            onClick={() => setSelectedDoc(doc)}
          >
            {doc.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
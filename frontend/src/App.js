import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="app">
      <Sidebar
        documents={documents}
        setDocuments={setDocuments}
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
      />

      <ChatArea selectedDoc={selectedDoc} />
    </div>
  );
}

export default App;
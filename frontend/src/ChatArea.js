import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import WelcomeBot from "./WelcomeBot";

function ChatArea({ selectedDoc }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendQuestion = async (questionText = input) => {
    if (!selectedDoc || !questionText) return;

    const userMessage = {
      role: "user",
      content: questionText
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setInput("");

    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        doc_id: selectedDoc.doc_id,
        question: questionText
      })
    });

    const data = await response.json();

    const aiMessage = {
      role: "ai",
      content: data.answer,
      citations: data.citations
    };

    setMessages((prev) => [...prev, aiMessage]);

    setLoading(false);
  };

  if (!selectedDoc) {
    return (
      <div className="empty-state">
        <div className="robot">🤖</div>
        <h2>Upload a PDF to get started</h2>
      </div>
    );
  }

  return (
    <div className="chat-area">
      <WelcomeBot
        welcome={selectedDoc.welcome}
        onQuestionClick={sendQuestion}
      />

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "message user"
                : "message ai"
            }
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>

            {msg.role === "ai" && (
              <div className="citation-box">
                {msg.citations?.slice(0, 1).map((c, i) => (
                  <p key={i}>{c.substring(0, 200)}...</p>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />

        <button onClick={() => sendQuestion()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatArea;
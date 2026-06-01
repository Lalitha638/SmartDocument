import React from "react";

function WelcomeBot({ welcome, onQuestionClick }) {
  if (!welcome) return null;

  return (
    <div className="welcome-box">
      <div className="bot-header">🤖 AI Assistant</div>

      <p>{welcome.summary}</p>

      <div className="chip-container">
        {welcome.questions.map((q, index) => (
          <button
            key={index}
            className="chip"
            onClick={() => onQuestionClick(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeBot;
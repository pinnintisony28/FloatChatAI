// frontend/src/components/FloatingChat.tsx
import React, { useState } from "react";
import VizRenderer from "./VizRenderer";
import "./FloatingChat.css"; // Import the CSS file

type Msg = { from: "user" | "bot"; text: string; payload?: any };

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  async function sendMessage() {
    if (!input.trim()) return;

    // Add user message to chat
    const userMsg: Msg = { from: "user", text: input };
    setMessages(m => [...m, userMsg]);
    setInput("");

    try {
      // Send current message + chat history to backend
      const res = await fetch("http://localhost:4000/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages // send previous messages for context
        })
      });

      const json = await res.json();

      // Construct bot message: include summary and explanation
      const botText = json.summary ?? "No summary available.";
      const explanation = json.explanation ? `💡 Explanation: ${json.explanation}` : "";
      const botMsg: Msg = { from: "bot", text: `${botText}\n${explanation}`, payload: json };

      setMessages(m => [...m, botMsg]);

    } catch (e) {
      // Show error message in chat
      setMessages(m => [...m, { from: "bot", text: "Error contacting server." }]);
    }
  }

  return (
    <div className="floating-chat-container">
      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            FloatChat AI
          </div>

          {/* Messages */}
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-chat">
                Start a conversation about agricultural and ocean data...
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`message-wrapper ${m.from}-message`}>
                  <div className="message-sender">{m.from}</div>
                  <div className="message-bubble">
                    {m.text.split("\n").map((line, idx) => (
                      <p key={idx} style={{ margin: "4px 0" }}>{line}</p>
                    ))}
                  </div>
                  {m.payload?.chart && (
                    <div className="viz-container">
                      <VizRenderer chart={m.payload.chart} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Input area */}
          <div className="chat-input-area">
            <input
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Ask about rainfall, SST, yields..."
            />
            <button
              className="send-button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`floating-chat-button ${messages.length > 0 ? 'pulse' : ''}`}
      >
        🌨️ Chat with me
      </button>
    </div>
  );
}

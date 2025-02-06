"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";

// Memoized Message component
const ChatMessage = memo(({ message }) => (
  <div
    style={{
      alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
      maxWidth: "80%",
      marginBottom: "10px",
    }}
  >
    <div
      style={{
        backgroundColor: message.sender === "user" ? "#e6f2ff" : "#f1f1f1",
        padding: "10px",
        borderRadius: "10px",
        wordWrap: "break-word",
      }}
    >
      {message.text}
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";

// Memoized TabButton component
const TabButton = memo(({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      fontWeight: isActive ? "bold" : "normal",
      color: "#000",
    }}
  >
    {label}
  </button>
));

TabButton.displayName = "TabButton";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");

  const chatContainerRef = useRef(null);
  const prevChatLengthRef = useRef(0);

  // Optimized chat initialization
  useEffect(() => {
    try {
      const storedChat = localStorage.getItem("jobstell_chatHistory");
      setChat(storedChat ? JSON.parse(storedChat) : []);
    } catch (e) {
      console.error("Error parsing chat history:", e);
      setChat([]);
    }
  }, []);

  // Optimized chat saving
  useEffect(() => {
    if (chat.length > 0 && chat.length !== prevChatLengthRef.current) {
      localStorage.setItem("jobstell_chatHistory", JSON.stringify(chat));
      prevChatLengthRef.current = chat.length;
    }
  }, [chat]);

  // Optimized scroll effect
  useEffect(() => {
    if (chatContainerRef.current && chat.length > prevChatLengthRef.current) {
      const scrollToBottom = () => {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      };
      requestAnimationFrame(scrollToBottom);
    }
  }, [chat]);

  // Memoized handlers
  const sendMessage = useCallback(async () => {
    if (!message.trim() || loading) return;

    const trimmedMessage = message.trim();
    setLoading(true);

    const greetingKeywords = new Set([
      "hi",
      "hello",
      "hey",
      "hi there",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
      "whats up",
      "what's up",
      "wassup",
    ]);

    const isFirstGreeting =
      chat.filter((msg) => msg.sender === "user").length === 0 &&
      greetingKeywords.has(trimmedMessage.toLowerCase());

    const hasAIGreeted = chat.some(
      (msg) => msg.sender === "ai" && /\b(hey|hello|hi)\b/i.test(msg.text)
    );

    const shouldAIGreet = isFirstGreeting && !hasAIGreeted;
    const conversationHistory = chat
      .map((msg) => `${msg.sender === "user" ? "User" : "AI"} : ${msg.text}`)
      .join("\n");

    const userMessage = { sender: "user", text: trimmedMessage };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Conversation Context:\n${conversationHistory}\n\nCurrent Query: ${trimmedMessage}\n\nProvide a contextually relevant response focusing on interview preparation.`,
          conversationHistory: chat,
          shouldAIGreet,
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.response ||
            "I apologize, but I couldn't process your request.",
        },
      ]);
    } catch (err) {
      console.error("Error in sendMessage:", err);
      setChat((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, there was a connection issue. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [message, chat, loading]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !loading) {
        sendMessage();
      }
    },
    [sendMessage, loading]
  );

  const toggleChatVisibility = useCallback(() => {
    setIsChatVisible((prev) => !prev);
  }, []);

  const newChatHandler = useCallback(() => {
    setChat([
      {
        sender: "ai",
        text: "Hello! I'm the Jobstell AI assistant. How can I help you prepare for your interview today?",
      },
    ]);
    localStorage.removeItem("jobstell_chatHistory");
  }, []);

  // Rest of the JSX remains the same, but using memoized components
  if (!isChatVisible) {
    return (
      <button
        onClick={toggleChatVisibility}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        💬
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "400px",
        height: "500px",
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        zIndex: 1000,
        color: "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 15px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h3 style={{ margin: 0, fontWeight: 600 }}>Jobstell Interview AI</h3>
        <button
          onClick={toggleChatVisibility}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ❌
        </button>
      </div>

      <div style={{ flexGrow: 1, overflowY: "auto", padding: "15px" }}>
        {activeTab === "home" && <p>home</p>}
        {activeTab === "messages" && (
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {chat.length > 1 && (
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <button
                  onClick={newChatHandler}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Start New Chat
                </button>
              </div>
            )}

            <div
              ref={chatContainerRef}
              style={{
                flexGrow: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                marginBottom: "10px",
              }}
            >
              {chat.map((msg, index) => (
                <ChatMessage key={index} message={msg} />
              ))}
              {loading && (
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "10px",
                    backgroundColor: "#f1f1f1",
                    borderRadius: "10px",
                  }}
                >
                  Thinking...
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                padding: "10px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about interview preparation..."
                disabled={loading}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #e0e0e0",
                  marginRight: "10px",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor:
                    loading || !message.trim() ? "not-allowed" : "pointer",
                  opacity: loading || !message.trim() ? 0.5 : 1,
                }}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
        {activeTab === "help" && <p>help</p>}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderTop: "1px solid #e0e0e0",
          padding: "10px 0",
          color: "#000",
        }}
      >
        <TabButton
          label="Home"
          isActive={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        />
        <TabButton
          label="Messages"
          isActive={activeTab === "messages"}
          onClick={() => setActiveTab("messages")}
        />
        <TabButton
          label="Help"
          isActive={activeTab === "help"}
          onClick={() => setActiveTab("help")}
        />
      </div>

      {error && (
        <div
          style={{
            color: "red",
            padding: "5px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

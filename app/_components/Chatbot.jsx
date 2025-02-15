"use client";
import { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);
  // New state for active tab ("home", "messages", "help")
  const [activeTab, setActiveTab] = useState("messages");

  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  // Initialize chat on component mount from localStorage
  useEffect(() => {
    const storedChat = localStorage.getItem("jobstell_chatHistory");
    if (storedChat) {
      try {
        const parsedChat = JSON.parse(storedChat);
        setChat(parsedChat.length > 0 ? parsedChat : []);
      } catch (e) {
        console.error("Error parsing chat history:", e);
        setChat([]);
      }
    } else {
      setChat([]);
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (chat.length > 0) {
      localStorage.setItem("jobstell_chatHistory", JSON.stringify(chat));
    }
  }, [chat]);

  // Helper function to retry fetch on failure
  async function fetchWithRetry(url, options, retries = 2, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(
            `Non-200 response: ${response.statusText}, Details: ${errorData}`
          );
        }
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // Send message function with updated greeting logic
  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);

    // Define greeting keywords
    const greetingKeywords = [
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
    ];

    // If the user's message exactly matches one of these keywords, we consider it a greeting.
    const isGreeting = greetingKeywords.some(
      (keyword) => message.toLowerCase().trim() === keyword
    );
    // Set shouldAIGreet true if it’s a greeting; false otherwise.
    const shouldAIGreet = isGreeting;

    // Prepare conversation history (for context)
    const conversationHistory = chat
      .map((msg) => `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`)
      .join("\n");

    const enhancedPrompt = `
    Conversation Context:
    ${conversationHistory}

    Current Query: ${message}
    
    Provide a contextually relevant response focusing on interview preparation.
    `;

    // Add user message to chat immediately
    const userMessage = { sender: "user", text: message };
    const newChat = [...chat, userMessage];
    setChat(newChat);
    setMessage("");

    try {
      // Make a single API call using fetchWithRetry
      const res = await fetchWithRetry("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          conversationHistory: chat,
          shouldGreet: shouldAIGreet,
        }),
      });
      const data = await res.json();
      const aiMessage = {
        sender: "ai",
        text:
          data.response || "I apologize, but I couldn't process your request.",
      };
      setChat([...newChat, aiMessage]);
    } catch (err) {
      console.error("Error in sendMessage:", err);
      const errorMessage = {
        sender: "ai",
        text: "Sorry, there was a connection issue. Please try again.",
      };
      setChat([...newChat, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  // Toggle chat visibility
  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  // Start a new chat (resets chat history with the welcome message)
  const newChatHandler = () => {
    const welcomeMessage = {
      sender: "ai",
      text: "Hello! I'm the Jobstell AI assistant. How can I help you prepare for your interview today?",
    };
    setChat([welcomeMessage]);
    localStorage.removeItem("jobstell_chatHistory");
  };

  return (
    <div>
      {/* Chatbot Icon */}
      {!isChatVisible && (
        <button
          className="bg-primary-500 box-shadow"
          onClick={toggleChatVisibility}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",

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
      )}

      {/* Chat Window */}
      {isChatVisible && (
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
          {/* Chat Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <h3 style={{ margin: 0, fontWeight: 600 }}>
              Jobstell Interview AI
            </h3>
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

          {/* Main Content Area (based on activeTab) */}
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "15px",
            }}
          >
            {activeTab === "home" && <p>home</p>}

            {activeTab === "messages" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* New Chat Button */}
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

                {/* Chat Messages Container */}
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
                    <div
                      key={index}
                      style={{
                        alignSelf:
                          msg.sender === "user" ? "flex-end" : "flex-start",
                        maxWidth: "80%",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor:
                            msg.sender === "user" ? "#e6f2ff" : "#f1f1f1",
                          padding: "10px",
                          borderRadius: "10px",
                          wordWrap: "break-word",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
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

                {/* Message Input Area */}
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

          {/* Tab Bar */}
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
            <button
              onClick={() => setActiveTab("home")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: activeTab === "home" ? "bold" : "normal",
                color: "#000",
              }}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: activeTab === "messages" ? "bold" : "normal",
                color: "#000",
              }}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab("help")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: activeTab === "help" ? "bold" : "normal",
                color: "#000",
              }}
            >
              Help
            </button>
          </div>

          {/* Error Display */}
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
      )}
    </div>
  );
}

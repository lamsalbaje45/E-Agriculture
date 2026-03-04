import { useState, useEffect, useRef } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("krishiconnect_chat");
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      // Initial welcome message
      setMessages([
        {
          id: 1,
          text: "Hello! Welcome to E-Agriculture customer support. How can we help you today?",
          sender: "support",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("krishiconnect_chat", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mock responses from support
  const getSupportResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("order") ||
      lowerMessage.includes("delivery")
    ) {
      return "Thank you for your question. You can track your orders in the 'Your Orders' section. For specific delivery updates, please provide your order number.";
    }
    if (
      lowerMessage.includes("product") ||
      lowerMessage.includes("quality")
    ) {
      return "We ensure all products meet quality standards. If you have concerns about a specific product, please describe the issue and we'll assist you right away.";
    }
    if (
      lowerMessage.includes("payment") ||
      lowerMessage.includes("wallet")
    ) {
      return "We support eSewa and Khalti for payments. If you're having payment issues, ensure your wallet has sufficient balance and try again.";
    }
    if (
      lowerMessage.includes("return") ||
      lowerMessage.includes("refund")
    ) {
      return "We offer returns within 7 days of delivery. Please visit your order details to initiate a return request.";
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can we assist you today?";
    }

    return "Thank you for your message. We'll get back to you shortly. For urgent matters, please contact support@eagriculture.com";
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate support response delay
    setTimeout(() => {
      const supportMsg = {
        id: messages.length + 2,
        text: getSupportResponse(input),
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMsg]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the chat history?"
      )
    ) {
      setMessages([
        {
          id: 1,
          text: "Hello! Welcome to E-Agriculture customer support. How can we help you today?",
          sender: "support",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg border">
      {/* Header */}
      <div className="bg-forestGreen text-white p-4 rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-bold">Customer Support</h2>
        <button
          onClick={clearChat}
          className="text-sm bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-forestGreen text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "user"
                    ? "text-green-100"
                    : "text-gray-500"
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white rounded-b-lg">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-forestGreen"
            rows="2"
          />
          <button
            onClick={handleSend}
            className="bg-forestGreen text-white px-4 py-2 rounded-lg hover:bg-darkGreen"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

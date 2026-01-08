import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState("");
  const chatRef = useRef(null);
  const chatbotRef = useRef(null);

  // Close chatbot on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Initialize chat
  useEffect(() => {
    if (open) {
      setMessages([
        { sender: "bot", text: "👋 Hello! How can I assist you today?" },
        { sender: "bot", options: ["Services", "Contact", "Other Queries"] },
      ]);
      setShowInput(true);
      setContext("");
    }
  }, [open]);

  // Scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Bot reply with typing effect
  const botReply = (response, delay = 700) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, delay);
  };

  // Reset chat
  const resetChat = () => {
    setMessages([
      { sender: "bot", text: "Chat reset. 👋 How can I help you again?" },
      { sender: "bot", options: ["Services", "Contact", "Other Queries"] },
    ]);
    setContext("");
  };

  // Option click handler
  const handleOptionClick = (option) => {
    setMessages((prev) => [...prev, { sender: "user", text: option }]);

    switch (option) {
      case "Services":
        setContext("services");
        botReply({ sender: "bot", text: "We offer the following services:" });
        botReply(
          {
            sender: "bot",
            options: [
              "Staffing Augmentation",
              "Application Management",
              "Application Development",
            ],
          },
          1200
        );
        break;
      case "Contact":
        setContext("contact");
        botReply({
          sender: "bot",
          text: "📞 You can reach us on our Contact Page:",
          link: "/contact",
        });
        botReply({
          sender: "bot",
          text: "Would you like to chat with support or call directly?",
          options: ["Chat with Support", "Call Us"],
        });
        break;
      case "Other Queries":
        setContext("other");
        botReply({ sender: "bot", text: "🧐 Tell me, how can I help you?" });
        break;
      case "Staffing Augmentation":
        botReply({
          sender: "bot",
          text: "Here’s the page for Staffing Augmentation:",
          link: "/staffing-augmentation",
        });
        break;
      case "Application Management":
        botReply({
          sender: "bot",
          text: "Here’s the page for Application Management:",
          link: "/application-support",
        });
        break;
      case "Application Development":
        botReply({
          sender: "bot",
          text: "Here’s the page for Application Development:",
          link: "/application-development",
        });
        break;
      case "Chat with Support":
        botReply({
          sender: "bot",
          text: "You can directly message us on WhatsApp 👉https://wa.me/918179401321",
        });
        break;
      case "Call Us":
        botReply({ sender: "bot", text: "📞 You can call us at: +918179401321" });
        break;
      default:
        break;
    }
  };

  // User typed input
  const handleSend = () => {
    if (!userInput.trim()) return;
    const query = userInput.toLowerCase();
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      // Predefined user queries
      if (["hi", "hello", "hey"].some((g) => query.includes(g))) {
        botReply({
          sender: "bot",
          text: "👋 Hello! How can I help you today? You can ask about Services, Contact, or Other Queries.",
          options: ["Services", "Contact", "Other Queries"],
        });
      } else if (query.includes("service")) {
        botReply({
          sender: "bot",
          text:
            "💼 We provide services like Staffing Augmentation, Application Management, and Application Development. You can click on them to know more.",
          options: [
            "Staffing Augmentation",
            "Application Management",
            "Application Development",
          ],
        });
      } else if (query.includes("price") || query.includes("cost")) {
        botReply({
          sender: "bot",
          text:
            "💰 For pricing details, please contact us on WhatsApp: https://wa.me/91912345678",
        });
      } else if (query.includes("company") || query.includes("about")) {
        botReply({
          sender: "bot",
          text: `🏢 BrightHorizon Infotech is a dynamic SAP consulting firm providing high-quality solutions and services worldwide. Our experts help businesses optimize systems, improve efficiency, and achieve growth.`,
        });
      } else if (query.includes("thank")) {
        botReply({
          sender: "bot",
          text: "😊 You’re welcome! Anything else I can help with?",
          options: ["Services", "Contact", "Other Queries"],
        });
      } else if (query.includes("bye") || query.includes("goodbye")) {
        botReply({
          sender: "bot",
          text: "👋 Goodbye! Have a great day.",
        });
      } else if (query.includes("more") || query.includes("options")) {
        botReply({
          sender: "bot",
          text: "Here are your options again:",
          options: ["Services", "Contact", "Other Queries"],
        });
      } else {
        botReply({
          sender: "bot",
          text:
            "🤔 I'm not sure about that. You can ask about Services, Contact info, or Company details.",
        });
      }
      setIsTyping(false);
    }, 900);
  };

  if (!open) return null;

  return (
    <div
      ref={chatbotRef}
      className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden z-50 animate-fadeIn"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-3 rounded-t-3xl text-white">
        🤖
        <h3 className="text-sm font-semibold">BrightHorizon Chatbot 🤖</h3>
        <div className="ml-auto flex gap-2">
          <button
            onClick={resetChat}
            className="hover:scale-110 transition-transform text-xs"
            title="Reset Chat"
          >
            🔄
          </button>
          <button
            onClick={onClose}
            className="hover:scale-110 transition-transform text-xs"
            title="Close"
          >
            ✖
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ maxHeight: "400px" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-2xl text-sm max-w-[75%] whitespace-pre-line transform transition-all duration-300 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none shadow-lg scale-100 hover:scale-105"
                  : "bg-gray-100 text-gray-800 rounded-bl-none shadow-md"
              }`}
            >
              {msg.text}
              {msg.link && (
                <div className="mt-1">
                  <a
                    href={msg.link}
                    className="text-blue-600 underline text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Go to Page
                  </a>
                </div>
              )}
              {msg.options && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {msg.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full shadow-md transition-all hover:scale-110"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-2xl text-sm flex items-center gap-2">
              <span className="animate-pulse">Typing</span>
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {showInput && (
        <div className="p-3 border-t border-gray-300 flex gap-2 bg-white rounded-b-3xl">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-black border border-gray-400 rounded-full px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-purple-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform text-sm shadow-md"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

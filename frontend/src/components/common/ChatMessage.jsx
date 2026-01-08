import React from "react";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;

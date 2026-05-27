function MessageBubble({ message }) {

  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm md:text-base
        ${
          isUser
            ? "bg-linear-to-r from-purple-600 to-violet-500"
            : "bg-[#1e1e1e] border border-gray-800"
        }`}
      >
        {message.text}
      </div>

    </div>
  );
}

export default MessageBubble;
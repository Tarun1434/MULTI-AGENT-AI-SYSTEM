import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import LoadingDots from "./LoadingDots";

function ChatWindow({ messages, loading }) {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4">

      {messages.length === 0 ? (

        <div className="h-full flex flex-col items-center justify-center text-center">

          {/* AI Logo */}
          <div className="w-20 h-20 mb-6 rounded-3xl bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
            AI
          </div>

          {/* Heading */}
          <h1 className="text-2xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            How can I help you today?
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-gray-400 max-w-xl px-4">
            Ask coding doubts, upload PDFs, summarize documents,
            generate notes and learn smarter with AI.
          </p>

          {/* Suggestion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full max-w-2xl px-4">

            <div className="bg-[#171717] border border-gray-800 rounded-2xl p-4 text-left hover:border-purple-500 transition cursor-pointer">
              📄 Summarize a PDF
            </div>

            <div className="bg-[#171717] border border-gray-800 rounded-2xl p-4 text-left hover:border-purple-500 transition cursor-pointer">
              💻 Explain Code
            </div>

            <div className="bg-[#171717] border border-gray-800 rounded-2xl p-4 text-left hover:border-purple-500 transition cursor-pointer">
              📚 Generate Notes
            </div>

            <div className="bg-[#171717] border border-gray-800 rounded-2xl p-4 text-left hover:border-purple-500 transition cursor-pointer">
              🧠 Ask Anything
            </div>

          </div>

        </div>

      ) : (

        <div className="max-w-5xl mx-auto space-y-4">

          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
            />
          ))}

          {loading && <LoadingDots />}

          <div ref={bottomRef}></div>

        </div>

      )}

    </div>
  );
}

export default ChatWindow;
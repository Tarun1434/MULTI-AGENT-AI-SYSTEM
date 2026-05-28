import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { FiCopy, FiCheck } from "react-icons/fi";

function MessageBubble({ message }) {

  const isUser = message.role === "user";

  const [copied, setCopied] =
    useState(false);

  // =========================================
  // COPY MESSAGE
  // =========================================
  const handleCopy = async () => {

    await navigator.clipboard.writeText(
      message.text
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`relative max-w-[80%] px-5 py-4 rounded-2xl text-sm md:text-base whitespace-pre-wrap
        ${
          isUser
            ? "bg-linear-to-r from-purple-600 to-violet-500"
            : "bg-[#1e1e1e] border border-gray-800"
        }`}
      >

        {/* COPY BUTTON */}
        {!isUser && (

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          >

            {copied ? (
              <FiCheck size={18} />
            ) : (
              <FiCopy size={18} />
            )}

          </button>
        )}

        {isUser ? (

          message.text

        ) : (

          <ReactMarkdown
            components={{

              code({
                inline,
                className,
                children,
                ...props
              }) {

                const match =
                  /language-(\w+)/.exec(
                    className || ""
                  );

                return !inline &&
                  match ? (

                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(
                      /\n$/,
                      ""
                    )}
                  </SyntaxHighlighter>

                ) : (

                  <code className="bg-black px-1 py-0.5 rounded">
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.text}
          </ReactMarkdown>

        )}

      </div>

    </div>
  );
}

export default MessageBubble;
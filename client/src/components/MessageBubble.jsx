import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  const [copied, setCopied] =
    useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        message.text
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.log(error);
    }
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
        className={`relative max-w-[92%] md:max-w-[80%] px-4 md:px-5 py-3 md:py-4 rounded-2xl text-sm md:text-base whitespace-pre-wrap break-words shadow-lg
        ${
          isUser
            ? "bg-linear-to-r from-purple-600 to-violet-500 text-white"
            : "bg-[#171717] border border-gray-800 text-gray-100"
        }`}
      >

        {/* COPY BUTTON */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 md:top-3 md:right-3 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition"
          >
            {copied ? (
              <FiCheck size={18} />
            ) : (
              <FiCopy size={18} />
            )}
          </button>
        )}

        {/* USER MESSAGE */}
        {isUser ? (

          <div className="leading-7">
            {message.text}
          </div>

        ) : (

          <div className="prose prose-invert max-w-none prose-p:my-2 prose-pre:my-3">

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
                      customStyle={{
                        borderRadius: "12px",
                        overflowX: "auto",
                        fontSize: "14px",
                        marginTop: "12px",
                        marginBottom: "12px",
                      }}
                      {...props}
                    >
                      {String(children).replace(
                        /\n$/,
                        ""
                      )}
                    </SyntaxHighlighter>

                  ) : (

                    <code className="bg-[#0d0d0d] px-1.5 py-0.5 rounded text-purple-300">
                      {children}
                    </code>

                  );
                },

                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      {children}
                    </a>
                  );
                },

              }}
            >
              {message.text}
            </ReactMarkdown>

          </div>

        )}

      </div>
    </div>
  );
}

export default MessageBubble;
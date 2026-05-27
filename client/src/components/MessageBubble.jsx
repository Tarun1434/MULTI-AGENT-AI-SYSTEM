import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MessageBubble({ message }) {

  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-[80%] px-5 py-4 rounded-2xl text-sm md:text-base whitespace-pre-wrap
        ${
          isUser
            ? "bg-linear-to-r from-purple-600 to-violet-500"
            : "bg-[#1e1e1e] border border-gray-800"
        }`}
      >

        {isUser ? (

          message.text

        ) : (

          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {

                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
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
import MessageBubble from "./MessageBubble";
import LoadingDots from "./LoadingDots";
function ChatWindow({ messages, loading  }) {

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">

      {messages.length === 0 ? (

        <div className="h-full flex flex-col items-center justify-center">

          <h1 className="text-5xl font-bold mb-4 text-center bg-linear-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            How can I help you today?
          </h1>

          <p className="text-gray-400">
            Ask coding doubts, upload PDFs, and learn smarter with AI.
          </p>

        </div>

      ) : (

       <div className="max-w-4xl mx-auto space-y-4">

  {messages.map((msg, index) => (
    <MessageBubble key={index} message={msg} />
  ))}

  {loading && <LoadingDots />}

</div>

      )}

    </div>
  );
}

export default ChatWindow;
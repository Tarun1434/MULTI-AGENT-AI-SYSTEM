function Sidebar({
  chatSessions = [],
  currentChatIndex = 0,
  setCurrentChatIndex,
  createNewChat,
}) {

  return (
    <div className="w-64 bg-[#111111] border-r border-gray-800 flex flex-col h-screen">

      {/* LOGO */}
      <div className="p-5 border-b border-gray-800">

        <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
          AI Assistant
        </h1>

      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* NEW CHAT BUTTON */}
        <button
          onClick={createNewChat}
          className="w-full bg-linear-to-r from-purple-600 to-violet-500 py-3 rounded-xl hover:opacity-90 transition mb-5"
        >
          + New Chat
        </button>

        {/* CHAT LIST */}
        <div className="space-y-2">

          {chatSessions.length > 0 ? (

            chatSessions.map((chat, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentChatIndex(index)
                }
                className={`w-full text-left px-4 py-3 rounded-xl text-sm truncate transition
                ${
                  currentChatIndex === index
                    ? "bg-purple-600 text-white"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222222]"
                }`}
              >
                {chat.title || "New Chat"}
              </button>

            ))

          ) : (

            <p className="text-gray-500 text-sm">
              No chats yet
            </p>

          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-800">

        <p className="text-xs text-gray-500 text-center">
          Powered by Groq AI
        </p>

      </div>

    </div>
  );
}

export default Sidebar;
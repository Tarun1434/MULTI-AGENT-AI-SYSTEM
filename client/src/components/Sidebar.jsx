import { FiTrash2 } from "react-icons/fi";

function Sidebar({
  chatSessions = [],
  currentChatIndex = 0,
  setCurrentChatIndex,
  createNewChat,
  deleteChat,
}) {
  return (
    <div className="w-[280px] md:w-72 bg-[#111111] border-r border-gray-800 flex flex-col h-screen">

      {/* LOGO */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center font-bold text-white">
            AI
          </div>

          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
            AI Assistant
          </h1>

        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* NEW CHAT */}
        <button
          onClick={createNewChat}
          className="w-full bg-gradient-to-r from-purple-600 to-violet-500 py-3 rounded-xl hover:opacity-90 transition mb-5 font-medium"
        >
          + New Chat
        </button>

        {/* HISTORY TITLE */}
        <div className="mb-3">
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Recent Chats
          </p>
        </div>

        {/* CHAT LIST */}
        <div className="space-y-2">

          {chatSessions.length > 0 ? (

            [...chatSessions]
              .reverse()
              .map((chat, reversedIndex) => {

                const actualIndex =
                  chatSessions.length -
                  1 -
                  reversedIndex;

                return (

                  <div
                    key={actualIndex}
                    className={`flex items-center rounded-xl transition
                    ${
                      currentChatIndex === actualIndex
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-[#1a1a1a] text-gray-300 hover:bg-[#222222]"
                    }`}
                  >

                    {/* Chat Title */}
                    <button
                      onClick={() =>
                        setCurrentChatIndex(
                          actualIndex
                        )
                      }
                      className="flex-1 text-left px-4 py-3 text-sm truncate"
                    >
                      {chat.title || "New Chat"}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => {

                        const confirmDelete =
                          window.confirm(
                            "Delete this chat?"
                          );

                        if (
                          confirmDelete
                        ) {

                          deleteChat(
                            actualIndex
                          );

                        }

                      }}
                      className="px-3 py-3 text-gray-400 hover:text-red-500 transition"
                    >
                      <FiTrash2 size={16} />
                    </button>

                  </div>

                );

              })

          ) : (

            <div className="text-center text-gray-500 text-sm mt-6">
              No chats yet
            </div>

          )}

        </div>

      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-800">

        <div className="flex items-center gap-2 justify-center">

          <div className="w-2 h-2 rounded-full bg-green-500"></div>

          <p className="text-xs text-gray-500">
            Powered by Groq AI
          </p>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;
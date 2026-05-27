function Sidebar() {
  return (
    <div className="w-64 bg-[#171717] border-r border-gray-800 p-4 hidden md:flex flex-col">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-6 bg-linear-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
        AI Assistant
      </h1>

      {/* New Chat Button */}
      <button className="bg-linear-to-r from-purple-600 to-violet-500 hover:opacity-90 transition rounded-xl p-3 text-left font-medium mb-6">
        + New Chat
      </button>

      {/* Recent Chats */}
      <div className="text-gray-400 text-sm mb-3">
        Recent Chats
      </div>

      <div className="space-y-2">
        <div className="bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer">
          Java OOPS
        </div>

        <div className="bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#2a2a2a] cursor-pointer">
          MERN Stack
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
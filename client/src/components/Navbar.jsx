import { Menu } from "lucide-react";

function Navbar({ toggleSidebar }) {
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-800 bg-[#0f0f0f]/95 backdrop-blur">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-300 hover:text-white"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="w-10 h-10 rounded-xl bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg">
          AI
        </div>

        {/* Title */}
        <div>
          <h1 className="text-base md:text-xl font-bold text-white">
            AI Study Assistant
          </h1>

          <p className="hidden md:block text-xs text-gray-500">
            Powered by Groq AI
          </p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a1a] border border-gray-700">

          <div className="w-2 h-2 rounded-full bg-green-500"></div>

          <span className="text-xs text-gray-300">
            Online
          </span>

        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-600 to-pink-500 flex items-center justify-center text-sm font-bold text-white cursor-pointer">
          T
        </div>

      </div>

    </div>
  );
}

export default Navbar;
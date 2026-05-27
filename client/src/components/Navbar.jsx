function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">

      {/* Title */}
      <h1 className="text-2xl font-bold bg-linear-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
        AI Study Assistant
      </h1>

      {/* Buttons */}
      <div className="flex gap-3">

        <button className="px-4 py-2 rounded-xl bg-[#1e1e1e] hover:bg-[#2a2a2a] transition cursor-pointer">
          Login
        </button>

        <button className="px-4 py-2 rounded-xl bg-linear-to-r from-purple-600 to-violet-500 hover:opacity-90 transition cursor-pointer">
          Sign Up
        </button>

      </div>

    </div>
  );
}

export default Navbar;
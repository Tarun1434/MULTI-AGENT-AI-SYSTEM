function LoadingDots() {
  return (
    <div className="flex justify-start">

      <div className="bg-[#1e1e1e] border border-gray-800 px-5 py-4 rounded-2xl flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.15)]">

        <span className="w-3 h-3 rounded-full bg-purple-400 animate-bounce"></span>

        <span
          className="w-3 h-3 rounded-full bg-violet-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-3 h-3 rounded-full bg-fuchsia-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>

      </div>

    </div>
  );
}

export default LoadingDots;
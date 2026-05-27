import { useState } from "react";

function InputBox({ onSend }) {

  const [input, setInput] = useState("");

  const handleSubmit = () => {

    onSend(input);

    setInput("");
  };

  return (
    <div className="p-4 border-t border-gray-800">

      <div className="max-w-4xl mx-auto flex items-center bg-[#1e1e1e] border border-gray-800 rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(168,85,247,0.15)]">

        <input
          type="text"
          placeholder="Message AI Study Assistant..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 " 
        />

        <button
          onClick={handleSubmit}
          className="ml-4 bg-linear-to-r from-purple-600 to-violet-500 px-5 py-2 rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default InputBox;
import { useState } from "react";

import { FiPaperclip } from "react-icons/fi";

import axios from "axios";

function InputBox({ onSend }) {

  const [input, setInput] = useState("");

  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {

    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleSubmit();
    }
  };

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();

    formData.append("pdf", file);

    try {

    const response =   await axios.post(
        "http://localhost:5000/upload",
        formData
      );
      console.log(response.data);
      console.log("PDF Uploaded");

    } catch (error) {
         
       console.log(error.response?.data || error);
    }
  };

  return (
    <div className="p-4 border-t border-gray-800">

      {/* File Name */}
      {fileName && (
        <div className="max-w-4xl mx-auto text-sm text-purple-400 mb-2">
          Uploaded: {fileName}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-[#1e1e1e] border border-gray-800 rounded-2xl px-4 py-3 shadow-[0_0_30px_rgba(168,85,247,0.15)]">

        <div className="flex items-center gap-3">

          {/* Upload Button */}
          <label className="cursor-pointer text-gray-400 hover:text-white transition">

            <FiPaperclip size={22} />

            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileUpload}
            />

          </label>

          {/* Input */}
          <textarea
            rows="1"
            placeholder="Message AI Study Assistant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 resize-none"
          />

        </div>

        {/* Send Button */}
        <div className="flex justify-end mt-3">

          <button
            onClick={handleSubmit}
            className="bg-linear-to-r from-purple-600 to-violet-500 px-5 py-2 rounded-xl hover:opacity-90 transition"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default InputBox;
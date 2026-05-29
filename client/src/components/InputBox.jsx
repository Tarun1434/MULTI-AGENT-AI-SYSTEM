import { useState } from "react";
import { FiPaperclip, FiSend, FiX } from "react-icons/fi";
import axios from "axios";

function InputBox({ onSend ,fileName, setFileName, }) {

  const [input, setInput] = useState("");
 

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

 const handleRemovePdf = async () => {

  console.log("❌ DELETE CLICKED");

  try {

    const response =
      await axios.post(
        "https://multi-agent-ai-system-41nv.onrender.com/clear-pdf"
      );

    console.log(response.data);

    setFileName("");

  } catch (error) {

    console.log(error);
  }
};

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();

    formData.append("pdf", file);

    try {

      const response = await axios.post(
        "https://multi-agent-ai-system-41nv.onrender.com/upload",
        formData
      );

      console.log(response.data);

    } catch (error) {

      console.log(
        error.response?.data || error
      );
    }
  };

  return (

    <div className="border-t border-gray-800 bg-[#0f0f0f] px-3 md:px-6 py-3">

      {/* Uploaded PDF */}
      {fileName && (

        <div className="max-w-5xl mx-auto mb-3">

          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs md:text-sm">

            <span className="truncate max-w-[200px] md:max-w-[400px]">
              📄 {fileName}
            </span>

            <button
              onClick={handleRemovePdf}
              className="text-red-400 hover:text-red-300 transition"
            >
              <FiX size={16} />
            </button>

          </div>

        </div>

      )}

      <div className="max-w-5xl mx-auto">

        <div className="flex items-end gap-2 bg-[#171717] border border-gray-800 rounded-3xl px-3 py-3 shadow-lg">

          {/* Upload */}
          <label className="cursor-pointer text-gray-400 hover:text-white transition mb-2">

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
            value={input}
            placeholder="Message AI Study Assistant..."
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none max-h-40 overflow-y-auto"
          />

          {/* Send */}
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-linear-to-r from-purple-600 to-violet-500 flex items-center justify-center hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
          >

            <FiSend size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}

export default InputBox;
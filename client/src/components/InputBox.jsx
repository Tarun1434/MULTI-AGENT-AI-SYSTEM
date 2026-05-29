import { useState } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";
import axios from "axios";

function InputBox({ onSend }) {

  const [input, setInput] =
    useState("");

  const [fileName, setFileName] =
    useState("");

  const handleSubmit = () => {

    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

       return ;
    }
  };

  const handleFileUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setFileName(file.name);

      const formData =
        new FormData();

      formData.append(
        "pdf",
        file
      );

      try {

        const response =
          await axios.post(
            "https://multi-agent-ai-system-41nv.onrender.com/upload",
            formData
          );

        console.log(
          response.data
        );

      } catch (error) {

        console.log(
          error.response?.data ||
          error
        );
      }
    };

  return (

    <div className="border-t border-gray-800 bg-[#0f0f0f] px-3 md:px-6 py-3">

      {/* Uploaded File */}
      {fileName && (

        <div className="max-w-5xl mx-auto mb-2">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs md:text-sm">

            📄 {fileName}

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
              onChange={
                handleFileUpload
              }
            />

          </label>

          {/* Input */}
          <textarea
            rows="1"
            value={input}
            placeholder="Message AI Study Assistant..."
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
          
            className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none max-h-40 overflow-y-auto"
          />

          {/* Send */}
          <button
            onClick={
              handleSubmit
            }
            disabled={
              !input.trim()
            }
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
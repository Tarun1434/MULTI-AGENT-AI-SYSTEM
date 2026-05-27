import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";

function Home() {

  const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(false);

 const handleSend = async (text) => {

  if (!text.trim()) return;

  const userMessage = {
    role: "user",
    text: text,
  };

  setMessages((prev) => [...prev, userMessage]);

  setLoading(true);

  try {

    const response = await axios.post(
      "http://localhost:5000/chat",
      {
        message: text,
      }
    );

    const aiMessage = {
      role: "assistant",
      text: response.data.reply,
    };

    setMessages((prev) => [...prev, aiMessage]);

  } catch (error) {

    const errorMessage = {
      role: "assistant",
      text: "Something went wrong.",
    };

    setMessages((prev) => [...prev, errorMessage]);
  }

  setLoading(false);
};
  return (
    <div className="bg-[#0f0f0f] text-white h-screen flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <ChatWindow messages={messages} loading={loading} />

        <InputBox onSend={handleSend} />

      </div>

    </div>
  );
}

export default Home;
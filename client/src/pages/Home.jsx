import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import LoginModal from "../components/LoginModal";
import axios from "axios";
function Home() {
const [fileName, setFileName] = useState("");
const [chatSessions, setChatSessions] =
  useState([]);

const [currentChatIndex, setCurrentChatIndex] =
  useState(0);

const [loading, setLoading] =
  useState(false);

  const [sidebarOpen, setSidebarOpen] =
  useState(false);

// =========================================
  // LOAD SAVED CHATS
  // =========================================
  useEffect(() => {

    const savedChats =
      localStorage.getItem("chatSessions");

    if (savedChats) {

      setChatSessions(
        JSON.parse(savedChats)
      );

    } else {

      setChatSessions([
        {
          title: "New Chat",
          messages: [],
        },
      ]);
    }

  }, []);

  // =========================================
  // SAVE CHATS
  // =========================================
  useEffect(() => {

    if (chatSessions.length > 0) {

      localStorage.setItem(
        "chatSessions",
        JSON.stringify(chatSessions)
      );
    }

  }, [chatSessions]);

  // =========================================
  // LOGIN CHECK
  // =========================================

  // CURRENT CHAT
  const currentChat =
  chatSessions.length > 0
    ? chatSessions[currentChatIndex]
    : {
        title: "New Chat",
        messages: [],
      };

  // =========================================
  // SEND MESSAGE
  // =========================================
  const handleSend = async (text) => {

    if (!text.trim()) return;

    // COPY CHATS
    let updatedChats = [...chatSessions];

    // AUTO TITLE
    if (
      updatedChats[currentChatIndex]
        .title === "New Chat"
    ) {

      updatedChats[currentChatIndex] = {
        ...updatedChats[currentChatIndex],

        title: text.slice(0, 25),
      };
    }

    // USER MESSAGE
    updatedChats[currentChatIndex] = {

      ...updatedChats[currentChatIndex],

      messages: [
        ...updatedChats[currentChatIndex]
          .messages,

        {
          role: "user",
          text,
        },
      ],
    };

    setChatSessions(updatedChats);

    setLoading(true);

    try {

      const response = await fetch(
        "https://multi-agent-ai-system-41nv.onrender.com/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let aiText = "";

      // EMPTY AI MESSAGE
      updatedChats = [...updatedChats];

      updatedChats[currentChatIndex] = {

        ...updatedChats[currentChatIndex],

        messages: [
          ...updatedChats[currentChatIndex]
            .messages,

          {
            role: "assistant",
            text: "",
          },
        ],
      };

      setChatSessions(updatedChats);

      while (true) {

        const { done, value } =
          await reader.read();

        if (done) break;

        const chunk =
          decoder.decode(value);

        aiText += chunk
          .replace('{"reply":"', "")
          .replace('"}', "");

        updatedChats = [...updatedChats];

        const updatedMessages =
          [
            ...updatedChats[
              currentChatIndex
            ].messages,
          ];

        updatedMessages[
          updatedMessages.length - 1
        ] = {
          role: "assistant",
          text: aiText,
        };

        updatedChats[currentChatIndex] = {

          ...updatedChats[
            currentChatIndex
          ],

          messages: updatedMessages,
        };

        setChatSessions(updatedChats);
      }

    } catch (error) {

      console.log(error);
    }

    setLoading(false);
  };

  // =========================================
  // CREATE NEW CHAT
  // =========================================


const createNewChat = async () => {

  try {

    await axios.post(
      "https://multi-agent-ai-system-41nv.onrender.com/clear-pdf"
    );
      setFileName("");
  } catch (error) {

    console.log(error);
  }

  const currentChat =
    chatSessions[currentChatIndex];

  // Don't create multiple empty chats
  if (
    currentChat &&
    currentChat.messages.length === 0
  ) {
    return;
  }

  const newChat = {
    title: "New Chat",
    messages: [],
  };

  const updatedChats = [
    ...chatSessions,
    newChat,
  ];

  setChatSessions(updatedChats);

  setCurrentChatIndex(
    updatedChats.length - 1
  );
};

 // =========================================
  // delte chat
  // =========================================
  const deleteChat = (indexToDelete) => {

  const updatedChats =
    chatSessions.filter(
      (_, index) =>
        index !== indexToDelete
    );

  if (
    updatedChats.length === 0
  ) {

    const newChat = {
      title: "New Chat",
      messages: [],
    };

    setChatSessions([
      newChat,
    ]);

    setCurrentChatIndex(0);

    return;
  }

  setChatSessions(
    updatedChats
  );

  if (
    currentChatIndex >=
    updatedChats.length
  ) {
    setCurrentChatIndex(
      updatedChats.length - 1
    );
  }
};
 return (
  <div className="bg-[#0f0f0f] text-white h-screen flex overflow-hidden">

    {/* Mobile Overlay */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/60 z-40 md:hidden"
        onClick={() =>
          setSidebarOpen(false)
        }
      />
    )}

    {/* Sidebar */}
    <div
      className={`
      fixed md:static
      z-50
      h-screen
      transition-all duration-300
      ${sidebarOpen
        ? "left-0"
        : "-left-full md:left-0"}
      `}
    >
     <Sidebar
  chatSessions={chatSessions}
  currentChatIndex={
    currentChatIndex
  }
  setCurrentChatIndex={
    setCurrentChatIndex
  }
  createNewChat={
    createNewChat
  }
  deleteChat={deleteChat}
/>
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col min-w-0">

      <Navbar
        toggleSidebar={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      />

      <ChatWindow
        messages={
          currentChat?.messages || []
        }
        loading={loading}
      />

      <InputBox
  onSend={handleSend}
  fileName={fileName}
  setFileName={setFileName}
/>

    </div>

  </div>
);
}

export default Home;
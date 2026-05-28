import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBox from "../components/InputBox";
import LoginModal from "../components/LoginModal";

function Home() {

  const [chatSessions, setChatSessions] =
    useState([]);

  const [currentChatIndex, setCurrentChatIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem("isLoggedIn")
      === "true"
    );

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
  if (!isLoggedIn) {

    return (
      <LoginModal
        setIsLoggedIn={
          setIsLoggedIn
        }
      />
    );
  }

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
        "http://localhost:5000/chat",
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
  const createNewChat = () => {

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

  return (
    <div className="bg-[#0f0f0f] text-white h-screen flex">

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
      />

      <div className="flex-1 flex flex-col">

        <Navbar />

       <ChatWindow
  messages={
    currentChat?.messages || []
  }
  loading={loading}
/>

        <InputBox onSend={handleSend} />

      </div>

    </div>
  );
}

export default Home;
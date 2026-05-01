// src/components/ChatBot.jsx
import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

const ChatBot = () => {
  useEffect(() => {
    createChat({
      webhookUrl:
        "http://localhost:5678/webhook/2d30195e-5e4e-4924-bea9-16d313a04f52/chat",

      mode: "window",

      showWelcomeScreen: true,

      initialMessages: [
        "👋 Hi! Welcome to EduPaath",
        "Ask me about courses, career, coding doubts, or progress 🚀"
      ],

      i18n: {
        en: {
          title: "EduPaath AI Assistant",
          subtitle: "Your learning companion 📚",
          footer: "",
          getStarted: "Start Chat",
          inputPlaceholder: "Ask your question..."
        }
      }
    });
  }, []);

  return null;
};

export default ChatBot;
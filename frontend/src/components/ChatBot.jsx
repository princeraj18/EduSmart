// src/components/ChatBot.jsx
import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

const ChatBot = () => {
  useEffect(() => {
    let mounted = true

    const init = async () => {
      // prefer environment-configured webhook; fall back to the previous local value
      const webhookUrl = import.meta.env.VITE_CHAT_WEBHOOK_URL || "http://localhost:5678/webhook/2d30195e-5e4e-4924-bea9-16d313a04f52/chat"

      if (!webhookUrl) return

      // quick reachability check to avoid unhandled network errors in the chat lib
      try {
        await fetch(webhookUrl, { method: 'OPTIONS' })
      } catch (err) {
        // server not available — log and skip initializing the chat
        // This prevents the console spam and unhandled promise rejections seen when the server is down.
        // eslint-disable-next-line no-console
        console.warn('Chat webhook unreachable; chat disabled.', err)
        return
      }

      if (!mounted) return

      try {
        createChat({
          webhookUrl,
          mode: "window",
          showWelcomeScreen: true,
          initialMessages: [
            "👋 Hi! Welcome to EduPaath",
            "I can help with courses, career roadmap, coding doubts, and progress tracking."
          ],
          i18n: {
            en: {
              title: "EduPaath AI Mentor",
              subtitle: "Ask anything about learning 🚀",
              footer: "",
              getStarted: "Start Learning",
              inputPlaceholder: "Ask your learning question..."
            }
          }
        })
      } catch (err) {
        // catch synchronous errors from createChat
        // eslint-disable-next-line no-console
        console.warn('createChat failed:', err)
      }
    }

    init()

    return () => {
      mounted = false
    }
  }, [])

  return null
}

export default ChatBot
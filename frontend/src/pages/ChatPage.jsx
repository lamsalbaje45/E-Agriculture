import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function ChatPage() {
  const { socket } = useAuth();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const preferredContactId = Number(location.state?.contactId) || null;

  const loadConversations = async () => {
    const response = await api.get("/chat/conversations");
    setConversations(response.data);
  };

  const loadMessages = async (userId) => {
    const response = await api.get(`/chat/${userId}`);
    setMessages(response.data);
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (!conversations.length) {
      setSelected(null);
      return;
    }

    if (preferredContactId) {
      const preferredConversation = conversations.find(
        (conversation) => Number(conversation.contact_id) === preferredContactId
      );

      if (preferredConversation) {
        setSelected((current) =>
          current?.contact_id === preferredConversation.contact_id ? current : preferredConversation
        );
        return;
      }
    }

    setSelected((current) => {
      if (current) {
        const matchingConversation = conversations.find(
          (conversation) => Number(conversation.contact_id) === Number(current.contact_id)
        );

        if (matchingConversation) {
          return matchingConversation;
        }
      }

      return conversations[0];
    });
  }, [conversations, preferredContactId]);

  useEffect(() => {
    if (selected?.contact_id) {
      loadMessages(selected.contact_id);
    }
  }, [selected]);

  useEffect(() => {
    if (!socket) {
      return undefined;
    }

    const onMessage = (message) => {
      if (message.sender_id === selected?.contact_id || message.receiver_id === selected?.contact_id) {
        setMessages((current) => [...current, message]);
      }
      loadConversations();
    };

    socket.on("chat:message", onMessage);
    return () => socket.off("chat:message", onMessage);
  }, [socket, selected]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!selected || !text.trim()) {
      return;
    }

    const response = await api.post("/chat", {
      receiverId: selected.contact_id,
      message: text,
    });

    setMessages((current) => [...current, response.data]);
    setText("");
    loadConversations();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <aside className="glass rounded-[2rem] p-4 shadow-panel">
        <h2 className="px-2 py-3 text-xl font-semibold text-bark">Conversations</h2>
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={`${conversation.contact_id}-${conversation.last_message_at}`}
              className={`w-full rounded-2xl px-4 py-3 text-left ${
                selected?.contact_id === conversation.contact_id ? "bg-moss text-white" : "bg-white/80 text-bark"
              }`}
              onClick={() => setSelected(conversation)}
            >
              <p className="font-semibold">{conversation.contact_name}</p>
              <p className="text-sm opacity-70">{conversation.last_message}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="glass flex min-h-[60vh] flex-col rounded-[2rem] p-4 shadow-panel sm:min-h-[65vh]">
        <div className="border-b border-bark/10 px-3 py-4">
          <h2 className="break-words text-xl font-semibold text-bark sm:text-2xl">{selected?.contact_name || "Select a conversation"}</h2>
        </div>
        <div className="flex-1 space-y-3 overflow-auto px-3 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-full break-words rounded-3xl px-4 py-3 sm:max-w-xl ${
                message.sender_id === selected?.contact_id ? "bg-white" : "ml-auto bg-leaf/30"
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
        <form className="flex flex-col gap-3 border-t border-bark/10 px-3 pt-4 sm:flex-row" onSubmit={sendMessage}>
          <input
            className="flex-1 rounded-2xl border border-bark/10 bg-white px-4 py-3"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="rounded-2xl bg-clay px-5 py-3 font-semibold text-white sm:self-auto">Send</button>
        </form>
      </section>
    </div>
  );
}

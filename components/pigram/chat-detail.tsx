"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Users } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";
import type { Conversation, Message } from "@/lib/pigram-types";
import MessageBubble from "./message-bubble";
import GroupDetails from "./group-details";

interface ChatDetailProps {
  conversation: Conversation;
  onBack: () => void;
}

export default function ChatDetail({ conversation, onBack }: ChatDetailProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getMessages, addMessage, typingIndicators } = usePigram();

  useEffect(() => {
    const msgs = getMessages(conversation.id);
    setMessages(msgs);
  }, [conversation.id, getMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: "msg_" + Date.now(),
      conversationId: conversation.id,
      senderId: "current_user",
      text: messageText,
      timestamp: Date.now(),
      status: "sent",
    };

    addMessage(conversation.id, newMessage);
    setMessageText("");

    setTimeout(() => {
      const updatedMessage: Message = {
        ...newMessage,
        status: "delivered",
      };
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? updatedMessage : m))
      );
    }, 500);
  };

  const displayName = conversation.isGroup
    ? conversation.groupName || "Group Chat"
    : conversation.participants[0] || "Unknown";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="font-semibold">{displayName}</h2>
            <p className="text-xs text-muted-foreground">
              {conversation.participants.length} participant
              {conversation.participants.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Video size={20} />
          </button>
          {conversation.isGroup && (
            <button
              onClick={() => setShowGroupDetails(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Group Info"
            >
              <Users size={20} />
            </button>
          )}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        {typingIndicators.length > 0 && (
          <div className="flex items-center gap-2 p-2">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <div className="flex items-end gap-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Paperclip size={20} className="text-muted-foreground" />
          </button>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-muted text-foreground rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
          >
            <Send size={20} className="text-blue-500" />
          </button>
        </div>
      </div>

      {showGroupDetails && (
        <GroupDetails
          group={conversation}
          onClose={() => setShowGroupDetails(false)}
        />
      )}
    </div>
  );
}

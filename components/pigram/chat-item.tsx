"use client";

import React from "react";
import { usePigram } from "@/contexts/pigram-context";
import type { Conversation } from "@/lib/pigram-types";

interface ChatItemProps {
  conversation: Conversation;
  onClick: () => void;
}

export default function ChatItem({ conversation, onClick }: ChatItemProps) {
  const displayName = conversation.isGroup
    ? conversation.groupName || "Group Chat"
    : conversation.participants[0] || "Unknown";

  const lastMessagePreview = conversation.lastMessage
    ? conversation.lastMessage.text || "[Media]"
    : "No messages yet";

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <button
      onClick={onClick}
      className="w-full p-4 border-b border-border hover:bg-muted transition-colors text-left"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold truncate">{displayName}</h3>
            {conversation.lastMessageTime && (
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatTime(conversation.lastMessageTime)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {lastMessagePreview}
          </p>
        </div>
        {conversation.unreadCount > 0 && (
          <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
            {conversation.unreadCount}
          </div>
        )}
      </div>
    </button>
  );
}

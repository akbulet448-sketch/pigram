"use client";

import React from "react";
import { usePigram } from "@/contexts/pigram-context";
import type { Conversation } from "@/lib/pigram-types";

interface ChatItemProps {
  conversation: Conversation;
  onClick: () => void;
}

export default function ChatItem({ conversation, onClick }: ChatItemProps) {
  const { contacts } = usePigram();

  const displayName = conversation.isGroup
    ? conversation.groupName || "Group Chat"
    : conversation.participants[0] || "Unknown";

  // Get contact for online status
  const contactId = conversation.isGroup ? undefined : conversation.participants[0];
  const contact = contactId ? contacts.find(c => c.id === contactId) : undefined;
  const isOnline = contact?.status === 'online';

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
      className="w-full p-3 border-b border-border hover:bg-muted/50 transition-colors text-left active:bg-muted"
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold truncate text-foreground">{displayName}</h3>
            {conversation.lastMessageTime && (
              <span className="text-xs text-muted-foreground flex-shrink-0 font-medium">
                {formatTime(conversation.lastMessageTime)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate line-clamp-1">
            {lastMessagePreview}
          </p>
        </div>
        {conversation.unreadCount > 0 && (
          <div className="w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
            {conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
          </div>
        )}
      </div>
    </button>
  );
}

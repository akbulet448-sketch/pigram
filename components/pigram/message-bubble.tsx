"use client";

import React from "react";
import { CheckCheck, Check, Edit2, Trash2 } from "lucide-react";
import type { Message } from "@/lib/pigram-types";

interface MessageBubbleProps {
  message: Message;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function MessageBubble({ message, onDelete, onEdit }: MessageBubbleProps) {
  const isOwn = message.senderId === "current_user";
  const [showActions, setShowActions] = React.useState(false);
  const [reactions, setReactions] = React.useState<string[]>([]);

  const toggleReaction = (emoji: string) => {
    if (reactions.includes(emoji)) {
      setReactions(reactions.filter(r => r !== emoji));
    } else {
      setReactions([...reactions, emoji]);
    }
  };

  const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3 group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex flex-col max-w-xs lg:max-w-md">
        <div
          className={`px-4 py-2.5 rounded-2xl transition-all ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-none shadow-sm"
              : "bg-muted text-foreground rounded-bl-none shadow-sm"
          }`}
        >
          {message.mediaUrl && message.mediaType === "image" && (
            <div className="mb-2 rounded-lg overflow-hidden">
              <img
                src={message.mediaUrl}
                alt="Message image"
                className="rounded-lg max-w-xs max-h-48 object-cover"
              />
            </div>
          )}
          {message.mediaUrl && message.mediaType === "video" && (
            <div className="mb-2 rounded-lg overflow-hidden">
              <video
                src={message.mediaUrl}
                controls
                className="rounded-lg max-w-xs max-h-48"
              />
            </div>
          )}
          {message.mediaUrl && message.mediaType === "audio" && (
            <div className="mb-2">
              <audio src={message.mediaUrl} controls className="w-full" />
            </div>
          )}
          {message.text && <p className="text-sm break-words">{message.text}</p>}
          {message.edited && (
            <p className="text-xs opacity-60 mt-1">(edited)</p>
          )}
          <div className="flex items-center justify-end gap-1.5 mt-1">
            <span className="text-xs opacity-70">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {isOwn && (
              message.status === "read" ? (
                <CheckCheck size={14} className="opacity-100" />
              ) : (
                <Check size={14} className="opacity-70" />
              )
            )}
          </div>
        </div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex gap-1 mt-1 px-2 flex-wrap">
            {reactions.map((emoji, idx) => (
              <div
                key={idx}
                className="text-sm bg-muted rounded-full px-2 py-0.5 cursor-pointer hover:bg-muted/80 transition-colors"
                onClick={() => toggleReaction(emoji)}
              >
                {emoji}
              </div>
            ))}
          </div>
        )}

        {/* Message Actions */}
        {showActions && (
          <div className={`flex gap-2 mt-1 ${isOwn ? "justify-end" : "justify-start"}`}>
            {!isOwn && (
              <div className="flex gap-1 bg-card rounded-lg p-1 shadow-md">
                {reactionEmojis.slice(0, 3).map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => toggleReaction(emoji)}
                    className="hover:bg-muted rounded px-2 py-1 text-sm transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            {isOwn && (
              <div className="flex gap-1 bg-card rounded-lg p-1 shadow-md">
                {onEdit && (
                  <button
                    onClick={() => onEdit(message.id)}
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(message.id)}
                    className="p-1.5 hover:bg-destructive/20 hover:text-destructive rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

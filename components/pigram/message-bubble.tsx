"use client";

import React from "react";
import { CheckCheck, Check } from "lucide-react";
import type { Message } from "@/lib/pigram-types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isOwn = message.senderId === "current_user";

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        }`}
      >
        {message.mediaUrl && message.mediaType === "image" && (
          <div className="mb-2">
            <img
              src={message.mediaUrl}
              alt="Message image"
              className="rounded max-w-xs max-h-48 object-cover"
            />
          </div>
        )}
        {message.mediaUrl && message.mediaType === "video" && (
          <div className="mb-2">
            <video
              src={message.mediaUrl}
              controls
              className="rounded max-w-xs max-h-48"
            />
          </div>
        )}
        {message.mediaUrl && message.mediaType === "audio" && (
          <div className="mb-2">
            <audio src={message.mediaUrl} controls className="w-full" />
          </div>
        )}
        {message.text && <p className="text-sm break-words">{message.text}</p>}
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-70">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isOwn && (
            message.status === "read" ? (
              <CheckCheck size={14} />
            ) : (
              <Check size={14} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

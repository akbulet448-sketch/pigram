"use client";

import React from "react";
import { Phone, Video, MessageCircle, UserPlus } from "lucide-react";
import type { User } from "@/lib/pigram-types";

interface UserProfileCardProps {
  user: User;
  onCall?: () => void;
  onVideo?: () => void;
  onMessage?: () => void;
  onAddContact?: () => void;
  isContact?: boolean;
}

export default function UserProfileCard({
  user,
  onCall,
  onVideo,
  onMessage,
  onAddContact,
  isContact = false,
}: UserProfileCardProps) {
  const isOnline = user.status === "online";
  const lastSeenText = user.lastSeen
    ? new Date(user.lastSeen).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
      {/* Header Background */}
      <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>

      {/* Profile Content */}
      <div className="px-6 pb-6 -mt-12 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold border-4 border-card shadow-md">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            {isOnline && (
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-card shadow-sm"></div>
            )}
          </div>
          {!isContact && onAddContact && (
            <button
              onClick={onAddContact}
              className="mt-4 p-2.5 hover:bg-muted rounded-full transition-colors"
            >
              <UserPlus size={20} className="text-primary" />
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">{user.displayName}</h2>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isOnline ? "bg-green-500" : "bg-muted-foreground"
              }`}
            ></div>
            <p className="text-xs text-muted-foreground">
              {isOnline ? "Active now" : `Last seen at ${lastSeenText}`}
            </p>
          </div>
        </div>

        {/* Status Message */}
        {user.statusMessage && (
          <p className="text-sm italic text-muted-foreground mb-4 p-2 bg-muted rounded-lg">
            {user.statusMessage}
          </p>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {onMessage && (
            <button
              onClick={onMessage}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-2.5 transition-colors font-medium text-sm"
            >
              <MessageCircle size={18} />
              Message
            </button>
          )}
          {onVideo && (
            <button
              onClick={onVideo}
              className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl py-2.5 transition-colors font-medium text-sm"
            >
              <Video size={18} />
              Video
            </button>
          )}
          {onCall && (
            <button
              onClick={onCall}
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl py-2.5 transition-colors font-medium text-sm"
            >
              <Phone size={18} />
              Call
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

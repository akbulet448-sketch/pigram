"use client";

import React from "react";
import { MessageCircle, Phone, Video } from "lucide-react";
import type { Contact } from "@/lib/pigram-types";

interface ContactItemProps {
  contact: Contact;
}

export default function ContactItem({ contact }: ContactItemProps) {
  const isOnline = contact.status === 'online';
  const lastSeenText = contact.lastSeen
    ? new Date(contact.lastSeen).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  return (
    <div className="flex items-center justify-between p-3 border-b border-border hover:bg-muted/50 transition-colors active:bg-muted">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-sm">
            {contact.displayName.charAt(0).toUpperCase()}
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate text-foreground">{contact.displayName}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {isOnline ? "Active now" : `Last seen at ${lastSeenText}`}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
        <button className="p-2.5 hover:bg-primary/10 rounded-lg transition-colors text-primary hover:text-primary">
          <MessageCircle size={18} />
        </button>
        <button className="p-2.5 hover:bg-primary/10 rounded-lg transition-colors text-primary hover:text-primary">
          <Phone size={18} />
        </button>
        <button className="p-2.5 hover:bg-primary/10 rounded-lg transition-colors text-primary hover:text-primary">
          <Video size={18} />
        </button>
      </div>
    </div>
  );
}

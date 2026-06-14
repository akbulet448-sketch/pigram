"use client";

import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import type { Contact } from "@/lib/pigram-types";

interface ContactItemProps {
  contact: Contact;
}

export default function ContactItem({ contact }: ContactItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border hover:bg-muted transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
          {contact.displayName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{contact.displayName}</h3>
          <p className="text-sm text-muted-foreground truncate">
            @{contact.username}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-foreground">
          <MessageCircle size={20} />
        </button>
        <button className="p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-foreground">
          <Phone size={20} />
        </button>
      </div>
    </div>
  );
}

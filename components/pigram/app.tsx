"use client";

import React from "react";
import { MessageCircle, Phone, Users, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { usePigram } from "@/contexts/pigram-context";
import { usePiAuth } from "@/contexts/pi-auth-context";
import ChatsTab from "@/components/pigram/chats-tab";
import ContactsTab from "@/components/pigram/contacts-tab";
import CallsTab from "@/components/pigram/calls-tab";
import SettingsTab from "@/components/pigram/settings-tab";
import { PigramDataInitializer } from "@/components/pigram/data-initializer";
import { MeetingLinkHandler } from "@/components/pigram/meeting-link-handler";

export default function PigramApp() {
  const [activeTab, setActiveTab] = useState<
    "chats" | "contacts" | "calls" | "settings"
  >("chats");
  const { setCurrentUser } = usePigram();
  const { sdk } = usePiAuth();

  useEffect(() => {
    if (sdk) {
      const piUser = sdk.user;
      if (piUser) {
        setCurrentUser({
          id: piUser.uid || "user_" + Date.now(),
          username: piUser.username || "User",
          displayName: piUser.username || "User",
          avatar: piUser.avatar || undefined,
          piId: piUser.uid || "",
        });
      }
    }
  }, [sdk, setCurrentUser]);

  const renderTab = () => {
    switch (activeTab) {
      case "chats":
        return <ChatsTab />;
      case "contacts":
        return <ContactsTab />;
      case "calls":
        return <CallsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <ChatsTab />;
    }
  };

  return (
    <>
      <PigramDataInitializer />
      <MeetingLinkHandler />
      <div className="flex flex-col h-screen bg-background text-foreground max-w-md mx-auto w-full">
        <div className="flex-1 overflow-y-auto pb-20">{renderTab()}</div>

        {/* Bottom Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background max-w-md mx-auto w-full">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab("chats")}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === "chats"
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageCircle size={24} />
              <span className="text-xs">Chats</span>
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === "contacts"
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users size={24} />
              <span className="text-xs">Contacts</span>
            </button>
            <button
              onClick={() => setActiveTab("calls")}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === "calls"
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Phone size={24} />
              <span className="text-xs">Calls</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                activeTab === "settings"
                  ? "text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Settings size={24} />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

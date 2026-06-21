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
import ProfileSetup from "@/components/pigram/profile-setup";
import { PigramDataInitializer } from "@/components/pigram/data-initializer";
import { MeetingLinkHandler } from "@/components/pigram/meeting-link-handler";

export default function PigramApp() {
  const [activeTab, setActiveTab] = useState<
    "chats" | "contacts" | "calls" | "settings"
  >("chats");
  const { setCurrentUser, profileCompleted, setProfileCompleted, currentUser } = usePigram();
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

  const handleProfileComplete = (displayName: string, avatar?: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        displayName,
        avatar,
      });
    }
    setProfileCompleted(true);
  };

  // Show profile setup if not completed
  if (!profileCompleted) {
    return <ProfileSetup onProfileComplete={handleProfileComplete} />;
  }

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
      <div style={{ minHeight: "100vh", background: "white", color: "black" }} className="flex flex-col max-w-md mx-auto w-full">
        <div className="flex-1 overflow-y-auto pb-20">{renderTab()}</div>

        {/* Bottom Tab Bar */}
        <div style={{ borderTop: "1px solid #e5e7eb", background: "white", position: "fixed", bottom: 0, left: 0, right: 0 }} className="max-w-md mx-auto w-full">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab("chats")}
              style={{ color: activeTab === "chats" ? "#3b82f6" : "#9ca3af" }}
              className="flex-1 py-4 flex flex-col items-center gap-1 transition-colors hover:text-gray-700"
            >
              <MessageCircle size={24} />
              <span className="text-xs">Chats</span>
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              style={{ color: activeTab === "contacts" ? "#3b82f6" : "#9ca3af" }}
              className="flex-1 py-4 flex flex-col items-center gap-1 transition-colors hover:text-gray-700"
            >
              <Users size={24} />
              <span className="text-xs">Contacts</span>
            </button>
            <button
              onClick={() => setActiveTab("calls")}
              style={{ color: activeTab === "calls" ? "#3b82f6" : "#9ca3af" }}
              className="flex-1 py-4 flex flex-col items-center gap-1 transition-colors hover:text-gray-700"
            >
              <Phone size={24} />
              <span className="text-xs">Calls</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              style={{ color: activeTab === "settings" ? "#3b82f6" : "#9ca3af" }}
              className="flex-1 py-4 flex flex-col items-center gap-1 transition-colors hover:text-gray-700"
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

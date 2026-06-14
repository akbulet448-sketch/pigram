"use client";

import React, { useState } from "react";
import { LogOut, Moon, Sun, Copy, Share2 } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { useTheme } from "next-themes";
import CreateMeetingDialog from "./create-meeting-dialog";

export default function SettingsTab() {
  const { currentUser, setCurrentUser, conversations } = usePigram();
  const { sdk } = usePiAuth();
  const { theme, setTheme } = useTheme();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);

  const userGroups = conversations.filter((c) => c.isGroup);

  const handleUpdateProfile = () => {
    if (currentUser && displayName.trim()) {
      setCurrentUser({
        ...currentUser,
        displayName: displayName.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCopyPiId = () => {
    if (currentUser?.piId) {
      navigator.clipboard.writeText(currentUser.piId);
      alert("Pi ID copied!");
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Section */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Profile</h2>
          {currentUser && (
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser.displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Display Name</p>
                  <p className="font-semibold truncate">{currentUser.displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{currentUser.username}
                  </p>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-background text-foreground rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter display name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateProfile}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setDisplayName(currentUser.displayName);
                      }}
                      className="flex-1 bg-muted hover:bg-border text-foreground rounded px-3 py-2 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2 transition-colors"
                >
                  Edit Profile
                </button>
              )}

              {/* Pi ID */}
              <div className="pt-2 border-t border-border space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Pi Account ID</p>
                    <p className="font-mono text-sm truncate">{currentUser.piId}</p>
                  </div>
                  <button
                    onClick={handleCopyPiId}
                    className="p-2 hover:bg-background rounded transition-colors"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Group Management Section */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">My Groups ({userGroups.length})</h2>
          {userGroups.length === 0 ? (
            <div className="bg-muted p-4 rounded-lg text-center text-muted-foreground">
              <p className="text-sm">No groups yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {userGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-muted p-3 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {group.groupName?.charAt(0) || "G"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{group.groupName}</p>
                      <p className="text-xs text-muted-foreground">
                        {group.participants.length} members
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Group Meetings Section */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Group Meetings</h2>
          <button
            onClick={() => setShowCreateMeeting(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded px-4 py-3 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            Create New Meeting
          </button>
          <p className="text-sm text-muted-foreground">
            Start a group meeting with shareable invite link
          </p>
        </div>

        {/* Appearance */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Appearance</h2>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full bg-muted hover:bg-border text-foreground rounded px-4 py-3 transition-colors flex items-center justify-between"
          >
            <span>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
            {theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Notifications</h2>
          <div className="bg-muted p-4 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded"
              />
              <span>Push notifications</span>
            </label>
          </div>
        </div>

        {/* About */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">About</h2>
          <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">App Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Built with</span>
              <span>App Studio</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white rounded px-4 py-3 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <CreateMeetingDialog
        open={showCreateMeeting}
        onOpenChange={setShowCreateMeeting}
        onMeetingCreated={(meetingId, inviteLink) => {
          alert("Meeting created! Invite link copied to clipboard:\n\n" + inviteLink);
        }}
      />
    </div>
  );
}

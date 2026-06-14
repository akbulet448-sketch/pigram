"use client";

import React, { useState } from "react";
import { ArrowLeft, X, Plus, Users } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";
import type { Conversation } from "@/lib/pigram-types";

interface GroupDetailsProps {
  group: Conversation;
  onClose: () => void;
}

export default function GroupDetails({ group, onClose }: GroupDetailsProps) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberUsername, setNewMemberUsername] = useState("");
  const { contacts, addGroupMember, removeGroupMember } = usePigram();

  const groupMembers = group.participants.map((id) => {
    const contact = contacts.find((c) => c.id === id);
    return contact || { id, displayName: "Unknown", username: "" };
  });

  const handleAddMember = () => {
    const contact = contacts.find(
      (c) =>
        c.username.toLowerCase() === newMemberUsername.toLowerCase() ||
        c.id === newMemberUsername
    );
    if (contact) {
      addGroupMember(group.id, contact.id);
      setNewMemberUsername("");
      setShowAddMember(false);
    } else {
      alert("Contact not found");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center overflow-y-auto">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4 my-8 max-h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold">Group Info</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Group Header */}
          <div className="text-center pb-4">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
              {group.groupName?.charAt(0) || "G"}
            </div>
            <h3 className="text-xl font-bold">{group.groupName}</h3>
            {group.groupDescription && (
              <p className="text-sm text-muted-foreground mt-1">
                {group.groupDescription}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-2">
              {group.participants.length} members
            </p>
          </div>

          {/* Members Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">Members</h4>
              <button
                onClick={() => setShowAddMember(!showAddMember)}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Add Member Form */}
            {showAddMember && (
              <div className="bg-muted p-3 rounded mb-3 space-y-2">
                <input
                  type="text"
                  value={newMemberUsername}
                  onChange={(e) => setNewMemberUsername(e.target.value)}
                  placeholder="Enter username or ID"
                  className="w-full bg-background text-foreground rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddMember}
                    disabled={!newMemberUsername.trim()}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-muted text-white rounded px-3 py-2 transition-colors text-sm"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMember(false);
                      setNewMemberUsername("");
                    }}
                    className="flex-1 bg-muted hover:bg-border text-foreground rounded px-3 py-2 transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Members List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {groupMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {member.displayName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.displayName}
                      </p>
                      {member.username && (
                        <p className="text-xs text-muted-foreground truncate">
                          @{member.username}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeGroupMember(group.id, member.id)}
                    className="p-1 hover:bg-red-500/20 text-red-500 rounded transition-colors flex-shrink-0"
                    title="Remove member"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Group Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            <button className="w-full bg-muted hover:bg-border text-foreground rounded px-3 py-2 transition-colors text-sm">
              Leave Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

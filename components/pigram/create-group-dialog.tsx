"use client";

import React, { useState } from "react";
import { X, Plus, Check } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";
import type { Contact } from "@/lib/pigram-types";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGroupCreated: (groupId: string) => void;
}

export default function CreateGroupDialog({
  open,
  onOpenChange,
  onGroupCreated,
}: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { contacts, currentUser, addConversation } = usePigram();

  const filteredContacts = contacts.filter(
    (c) =>
      !selectedContacts.find((s) => s.id === c.id) &&
      (c.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToggleContact = (contact: Contact) => {
    setSelectedContacts((prev) =>
      prev.find((c) => c.id === contact.id)
        ? prev.filter((c) => c.id !== contact.id)
        : [...prev, contact]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedContacts.length === 0) {
      alert("Please enter a group name and select at least one contact");
      return;
    }

    const groupId = "group_" + Date.now();
    const participants = [
      currentUser?.id || "user",
      ...selectedContacts.map((c) => c.id),
    ];

    addConversation({
      id: groupId,
      participants,
      isGroup: true,
      groupName: groupName.trim(),
      groupDescription: groupDescription.trim() || undefined,
      unreadCount: 0,
      createdAt: Date.now(),
      createdBy: currentUser?.id,
    });

    setGroupName("");
    setGroupDescription("");
    setSelectedContacts([]);
    setSearchQuery("");
    onOpenChange(false);
    onGroupCreated(groupId);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4 max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Create Group</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Group Name */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full mt-1 bg-muted text-foreground rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
            />
          </div>

          {/* Group Description */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Description (optional)
            </label>
            <textarea
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="What is this group about?"
              className="w-full mt-1 bg-muted text-foreground rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground resize-none h-20"
            />
          </div>

          {/* Selected Participants */}
          {selectedContacts.length > 0 && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Selected Members ({selectedContacts.length})
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-blue-500/20 text-blue-600 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                  >
                    {contact.displayName}
                    <button
                      onClick={() => handleToggleContact(contact)}
                      className="hover:text-blue-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Search & Selection */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Add Members
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full mt-1 bg-muted text-foreground rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
            />
          </div>

          {/* Available Contacts */}
          <div className="space-y-1 max-h-48 overflow-y-auto bg-muted rounded p-2">
            {filteredContacts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                {searchQuery ? "No contacts found" : "All contacts selected or no contacts available"}
              </p>
            ) : (
              filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleToggleContact(contact)}
                  className="w-full text-left p-2 hover:bg-background rounded transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                      {contact.displayName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {contact.displayName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        @{contact.username}
                      </p>
                    </div>
                  </div>
                  <Plus size={18} className="text-muted-foreground flex-shrink-0" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 flex gap-2">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-muted hover:bg-border text-foreground rounded px-4 py-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedContacts.length === 0}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-muted disabled:text-muted-foreground text-white rounded px-4 py-2 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}

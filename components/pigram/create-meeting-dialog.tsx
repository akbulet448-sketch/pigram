"use client";

import React, { useState } from "react";
import { X, Plus, Users } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";

interface CreateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMeetingCreated: (meetingId: string, inviteLink: string) => void;
}

export default function CreateMeetingDialog({
  open,
  onOpenChange,
  onMeetingCreated,
}: CreateMeetingDialogProps) {
  const [meetingName, setMeetingName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(6);
  const [copied, setCopied] = useState(false);
  const { currentUser, createMeeting } = usePigram();

  const handleCreateMeeting = () => {
    if (!meetingName.trim()) {
      alert("Please enter a meeting name");
      return;
    }

    const meetingId = "meeting_" + Date.now();
    const inviteLink = `${window.location.origin}?meeting=${meetingId}`;

    createMeeting({
      id: meetingId,
      creatorId: currentUser?.id || "user",
      creatorName: currentUser?.displayName || "Unknown",
      name: meetingName.trim(),
      description: meetingDescription.trim() || undefined,
      inviteLink,
      participants: [currentUser?.id || "user"],
      startTime: Date.now(),
      maxParticipants,
      isActive: true,
    });

    // Copy to clipboard
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    setMeetingName("");
    setMeetingDescription("");
    setMaxParticipants(6);
    onOpenChange(false);
    onMeetingCreated(meetingId, inviteLink);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Create Meeting</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Meeting Name */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Meeting Name
            </label>
            <input
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              placeholder="e.g., Team Sync"
              className="w-full mt-1 bg-muted text-foreground rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground"
            />
          </div>

          {/* Meeting Description */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Description (optional)
            </label>
            <textarea
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              placeholder="Add meeting details..."
              className="w-full mt-1 bg-muted text-foreground rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground resize-none h-20"
            />
          </div>

          {/* Max Participants */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Max Participants: {maxParticipants}
            </label>
            <input
              type="range"
              min="2"
              max="10"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
              className="w-full mt-2 accent-blue-500"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 6 for smooth video
            </p>
          </div>

          {/* Creator Info */}
          <div className="bg-muted p-3 rounded text-sm">
            <p className="text-muted-foreground">Meeting Creator</p>
            <p className="font-medium">{currentUser?.displayName}</p>
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
            onClick={handleCreateMeeting}
            disabled={!meetingName.trim()}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-muted disabled:text-muted-foreground text-white rounded px-4 py-2 transition-colors flex items-center justify-center gap-2"
          >
            <Users size={18} />
            {copied ? "Link Copied!" : "Create Meeting"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { usePigram } from "@/contexts/pigram-context";
import type { GroupMeeting } from "@/lib/pigram-types";

/**
 * MeetingLinkHandler checks URL params for meeting invites
 * If ?meeting=<meetingId> is present, it creates/joins the meeting
 */
export function MeetingLinkHandler() {
  const { createMeeting, conversations, addConversation } = usePigram();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;

    const params = new URLSearchParams(window.location.search);
    const meetingId = params.get("meeting");

    if (meetingId) {
      // Check if meeting already exists
      const existingMeeting = conversations.find((c) => c.id === `meeting_${meetingId}`);

      if (!existingMeeting) {
        // Create new meeting from link
        const newMeeting: GroupMeeting = {
          id: `meeting_${meetingId}`,
          creatorId: "external_user",
          creatorName: "Meeting Creator",
          name: "Group Meeting",
          inviteLink: window.location.href,
          participants: ["current_user"],
          startTime: Date.now(),
          maxParticipants: 6,
        };

        createMeeting(newMeeting);

        // Also add to conversations for visibility
        addConversation({
          id: `meeting_${meetingId}`,
          participants: [],
          isGroup: true,
          groupName: "Group Meeting",
          unreadCount: 0,
        });
      }

      // Clean URL to remove meeting param
      window.history.replaceState({}, document.title, window.location.pathname);
      setProcessed(true);
    } else {
      setProcessed(true);
    }
  }, [processed, createMeeting, conversations, addConversation]);

  return null;
}

"use client";

import React, { useEffect } from "react";
import { usePigram } from "@/contexts/pigram-context";
import type { Contact, Conversation, Message } from "@/lib/pigram-types";

export function PigramDataInitializer() {
  const {
    addContact,
    addConversation,
    addMessage,
  } = usePigram();

  useEffect(() => {
    // Initialize demo contacts
    const demoContacts: Contact[] = [
      {
        id: "contact_1",
        username: "alice_π",
        displayName: "Alice",
        piId: "pi_alice_123",
        addedAt: Date.now() - 86400000,
      },
      {
        id: "contact_2",
        username: "bob_π",
        displayName: "Bob",
        piId: "pi_bob_456",
        addedAt: Date.now() - 172800000,
      },
      {
        id: "contact_3",
        username: "charlie_π",
        displayName: "Charlie",
        piId: "pi_charlie_789",
        addedAt: Date.now() - 259200000,
      },
    ];

    demoContacts.forEach((contact) => {
      addContact(contact);
    });

    // Initialize demo conversations
    const conversations: Conversation[] = [
      {
        id: "conv_1",
        participants: ["alice_π"],
        isGroup: false,
        unreadCount: 2,
        lastMessageTime: Date.now() - 300000,
      },
      {
        id: "conv_2",
        participants: ["bob_π", "charlie_π"],
        isGroup: true,
        groupName: "Project Team",
        unreadCount: 0,
        lastMessageTime: Date.now() - 3600000,
      },
    ];

    conversations.forEach((conv) => {
      addConversation(conv);
    });

    // Initialize demo messages for first conversation
    const demoMessages: Message[] = [
      {
        id: "msg_1",
        conversationId: "conv_1",
        senderId: "alice_π",
        text: "Hey! How are you?",
        timestamp: Date.now() - 600000,
        status: "read",
      },
      {
        id: "msg_2",
        conversationId: "conv_1",
        senderId: "current_user",
        text: "I'm good! Just working on the app",
        timestamp: Date.now() - 540000,
        status: "delivered",
      },
      {
        id: "msg_3",
        conversationId: "conv_1",
        senderId: "alice_π",
        text: "That's awesome! Let me know if you need help",
        timestamp: Date.now() - 480000,
        status: "read",
      },
      {
        id: "msg_4",
        conversationId: "conv_1",
        senderId: "current_user",
        text: "Thanks for offering!",
        timestamp: Date.now() - 300000,
        status: "sent",
      },
    ];

    demoMessages.forEach((msg) => {
      addMessage("conv_1", msg);
    });

    // Add sample messages to group chat
    const groupMessages: Message[] = [
      {
        id: "msg_5",
        conversationId: "conv_2",
        senderId: "bob_π",
        text: "Let's sync up tomorrow at 3pm",
        timestamp: Date.now() - 7200000,
        status: "read",
      },
      {
        id: "msg_6",
        conversationId: "conv_2",
        senderId: "charlie_π",
        text: "Sounds good! I'll send the docs",
        timestamp: Date.now() - 6000000,
        status: "read",
      },
    ];

    groupMessages.forEach((msg) => {
      addMessage("conv_2", msg);
    });
  }, [addContact, addConversation, addMessage]);

  return null;
}

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type {
  Message,
  Conversation,
  Contact,
  Call,
  GroupMeeting,
  User,
  TypingIndicator,
} from "@/lib/pigram-types";

interface PigramContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  conversations: Conversation[];
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, conversation: Partial<Conversation>) => void;
  messages: Map<string, Message[]>;
  addMessage: (conversationId: string, message: Message) => void;
  getMessages: (conversationId: string) => Message[];
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  calls: Call[];
  addCall: (call: Call) => void;
  updateCall: (id: string, call: Partial<Call>) => void;
  meetings: GroupMeeting[];
  createMeeting: (meeting: GroupMeeting) => void;
  updateMeeting: (id: string, meeting: Partial<GroupMeeting>) => void;
  typingIndicators: TypingIndicator[];
  setTypingIndicator: (indicator: TypingIndicator | null) => void;
  searchContacts: (query: string) => Contact[];
  searchConversations: (query: string) => Conversation[];
  addGroupMember: (groupId: string, memberId: string) => void;
  removeGroupMember: (groupId: string, memberId: string) => void;
}

const PigramContext = createContext<PigramContextType | undefined>(undefined);

export function PigramProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Map<string, Message[]>>(new Map());
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [calls, setCalls] = useState<Call[]>([]);
  const [meetings, setMeetings] = useState<GroupMeeting[]>([]);
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>(
    []
  );

  const addConversation = useCallback((conversation: Conversation) => {
    setConversations((prev) => {
      const existing = prev.find((c) => c.id === conversation.id);
      if (existing) return prev;
      return [conversation, ...prev];
    });
  }, []);

  const updateConversation = useCallback(
    (id: string, updates: Partial<Conversation>) => {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      );
    },
    []
  );

  const addMessage = useCallback((conversationId: string, message: Message) => {
    setMessages((prev) => {
      const conversationMessages = prev.get(conversationId) || [];
      return new Map(prev).set(conversationId, [...conversationMessages, message]);
    });
  }, []);

  const getMessages = useCallback(
    (conversationId: string) => messages.get(conversationId) || [],
    [messages]
  );

  const addContact = useCallback((contact: Contact) => {
    setContacts((prev) => {
      const existing = prev.find((c) => c.id === contact.id);
      if (existing) return prev;
      return [...prev, contact];
    });
  }, []);

  const addCall = useCallback((call: Call) => {
    setCalls((prev) => [call, ...prev]);
  }, []);

  const updateCall = useCallback((id: string, updates: Partial<Call>) => {
    setCalls((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  const createMeeting = useCallback((meeting: GroupMeeting) => {
    setMeetings((prev) => [meeting, ...prev]);
  }, []);

  const updateMeeting = useCallback((id: string, updates: Partial<GroupMeeting>) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }, []);

  const setTypingIndicator = useCallback((indicator: TypingIndicator | null) => {
    if (indicator === null) {
      setTypingIndicators((prev) => []);
    } else {
      setTypingIndicators([indicator]);
    }
  }, []);

  const searchContacts = useCallback(
    (query: string) => {
      const lower = query.toLowerCase();
      return contacts.filter(
        (c) =>
          c.displayName.toLowerCase().includes(lower) ||
          c.username.toLowerCase().includes(lower)
      );
    },
    [contacts]
  );

  const searchConversations = useCallback(
    (query: string) => {
      const lower = query.toLowerCase();
      return conversations.filter(
        (c) =>
          (c.groupName?.toLowerCase().includes(lower)) ||
          c.participants.some((p) => p.toLowerCase().includes(lower))
      );
    },
    [conversations]
  );

  const addGroupMember = useCallback((groupId: string, memberId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === groupId && !c.participants.includes(memberId)) {
          return {
            ...c,
            participants: [...c.participants, memberId],
          };
        }
        return c;
      })
    );
  }, []);

  const removeGroupMember = useCallback((groupId: string, memberId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === groupId) {
          return {
            ...c,
            participants: c.participants.filter((p) => p !== memberId),
          };
        }
        return c;
      })
    );
  }, []);

  const value: PigramContextType = {
    currentUser,
    setCurrentUser,
    conversations,
    addConversation,
    updateConversation,
    messages,
    addMessage,
    getMessages,
    contacts,
    addContact,
    calls,
    addCall,
    updateCall,
    meetings,
    createMeeting,
    updateMeeting,
    typingIndicators,
    setTypingIndicator,
    searchContacts,
    searchConversations,
    addGroupMember,
    removeGroupMember,
  };

  return (
    <PigramContext.Provider value={value}>{children}</PigramContext.Provider>
  );
}

export function usePigram() {
  const context = useContext(PigramContext);
  if (context === undefined) {
    throw new Error("usePigram must be used within a PigramProvider");
  }
  return context;
}

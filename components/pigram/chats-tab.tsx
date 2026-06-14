"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, X, Users } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";
import ChatItem from "./chat-item";
import ChatDetail from "./chat-detail";
import NewChatDialog from "./new-chat-dialog";
import CreateGroupDialog from "./create-group-dialog";

export default function ChatsTab() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const { conversations, searchConversations, getMessages, updateConversation } = usePigram();

  useEffect(() => {
    // Update conversations with the latest message
    conversations.forEach((conv) => {
      const messages = getMessages(conv.id);
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        updateConversation(conv.id, {
          lastMessage,
          lastMessageTime: lastMessage.timestamp,
        });
      }
    });
  }, [conversations, getMessages, updateConversation]);

  const filteredConversations = searchQuery
    ? searchConversations(searchQuery)
    : conversations.sort(
        (a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0)
      );

  const selectedChat = conversations.find((c) => c.id === selectedChatId);

  if (selectedChat) {
    return (
      <ChatDetail
        conversation={selectedChat}
        onBack={() => setSelectedChatId(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCreateGroup(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Create Group"
            >
              <Users size={24} />
            </button>
            <button
              onClick={() => setShowNewChat(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="New Chat"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-muted text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No conversations yet. Start a new chat!</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ChatItem
              key={conversation.id}
              conversation={conversation}
              onClick={() => setSelectedChatId(conversation.id)}
            />
          ))
        )}
      </div>

      <NewChatDialog
        open={showNewChat}
        onOpenChange={setShowNewChat}
        onChatCreated={(chatId) => {
          setSelectedChatId(chatId);
          setShowNewChat(false);
        }}
      />

      <CreateGroupDialog
        open={showCreateGroup}
        onOpenChange={setShowCreateGroup}
        onGroupCreated={(groupId) => {
          setSelectedChatId(groupId);
          setShowCreateGroup(false);
        }}
      />
    </div>
  );
}

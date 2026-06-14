"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePigram } from "@/contexts/pigram-context";

interface NewChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChatCreated: (chatId: string) => void;
}

export default function NewChatDialog({
  open,
  onOpenChange,
  onChatCreated,
}: NewChatDialogProps) {
  const [username, setUsername] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { addConversation } = usePigram();

  const handleCreate = () => {
    if (isGroup && !groupName.trim()) return;
    if (!isGroup && !username.trim()) return;

    const conversationId = "conv_" + Date.now();
    const newConversation = {
      id: conversationId,
      participants: isGroup ? [] : [username],
      isGroup,
      groupName: isGroup ? groupName : undefined,
      unreadCount: 0,
      lastMessageTime: Date.now(),
    };

    addConversation(newConversation);
    onChatCreated(conversationId);
    setUsername("");
    setGroupName("");
    setIsGroup(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <label className="flex items-center gap-2 flex-1 cursor-pointer">
              <input
                type="radio"
                checked={!isGroup}
                onChange={() => {
                  setIsGroup(false);
                  setGroupName("");
                }}
              />
              <span>One-on-one</span>
            </label>
            <label className="flex items-center gap-2 flex-1 cursor-pointer">
              <input
                type="radio"
                checked={isGroup}
                onChange={() => {
                  setIsGroup(true);
                  setUsername("");
                }}
              />
              <span>Group Chat</span>
            </label>
          </div>

          {isGroup ? (
            <Input
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          ) : (
            <Input
              placeholder="Enter Pi username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600">
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePigram } from "@/contexts/pigram-context";
import type { Contact } from "@/lib/pigram-types";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddContactDialog({
  open,
  onOpenChange,
}: AddContactDialogProps) {
  const [username, setUsername] = useState("");
  const { addContact } = usePigram();

  const handleAddContact = () => {
    if (!username.trim()) return;

    const newContact: Contact = {
      id: "contact_" + Date.now(),
      username: username,
      displayName: username,
      piId: "pi_" + username,
      addedAt: Date.now(),
    };

    addContact(newContact);
    setUsername("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Contact</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Enter Pi username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddContact()}
          />

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddContact}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

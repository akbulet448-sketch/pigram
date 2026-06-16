"use client";

import React, { useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";
import ContactItem from "./contact-item";
import AddContactDialog from "./add-contact-dialog";

export default function ContactsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddContact, setShowAddContact] = useState(false);
  const { contacts, searchContacts } = usePigram();

  const filteredContacts = searchQuery ? searchContacts(searchQuery) : contacts;

  // Separate online and offline contacts
  const onlineContacts = filteredContacts.filter(c => c.status === 'online');
  const offlineContacts = filteredContacts.filter(c => c.status !== 'online');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <button
            onClick={() => setShowAddContact(true)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
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

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No contacts yet. Add one to get started!</p>
          </div>
        ) : (
          <>
            {/* Online Contacts */}
            {onlineContacts.length > 0 && (
              <>
                <div className="sticky top-0 bg-background/80 backdrop-blur-sm px-4 py-2 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Online ({onlineContacts.length})
                  </p>
                </div>
                {onlineContacts.map((contact) => (
                  <ContactItem key={contact.id} contact={contact} />
                ))}
              </>
            )}

            {/* Offline Contacts */}
            {offlineContacts.length > 0 && (
              <>
                <div className="sticky top-0 bg-background/80 backdrop-blur-sm px-4 py-2 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Contacts ({offlineContacts.length})
                  </p>
                </div>
                {offlineContacts.map((contact) => (
                  <ContactItem key={contact.id} contact={contact} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <AddContactDialog
        open={showAddContact}
        onOpenChange={setShowAddContact}
      />
    </div>
  );
}

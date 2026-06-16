"use client";

import React, { useState } from "react";
import { Camera, CheckCircle } from "lucide-react";

interface ProfileSetupProps {
  onProfileComplete: (displayName: string, avatar?: string) => void;
}

export default function ProfileSetup({ onProfileComplete }: ProfileSetupProps) {
  const [displayName, setDisplayName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const avatarColors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
  ];

  const avatarInitials = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const handleComplete = () => {
    if (!displayName.trim()) {
      alert("Please enter your name");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onProfileComplete(displayName.trim(), avatarColors[selectedAvatar]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground max-w-md mx-auto w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 pt-16 pb-12">
        <h1 className="text-3xl font-bold mb-2">Welcome to Pigram</h1>
        <p className="text-blue-100">Create your profile to get started</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Avatar Selection */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Choose Your Avatar</h2>
          <div className="grid grid-cols-3 gap-4">
            {avatarColors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAvatar(idx)}
                className={`w-20 h-20 rounded-full ${color} flex items-center justify-center text-white text-3xl font-bold transition-all ${
                  selectedAvatar === idx
                    ? "ring-4 ring-blue-500 scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                {avatarInitials[idx]}
              </button>
            ))}
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">What&apos;s your name?</h2>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleComplete()}
            placeholder="Enter your full name"
            maxLength={50}
            className="w-full bg-muted text-foreground rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground text-lg"
            autoFocus
          />
          <p className="text-sm text-muted-foreground">
            {displayName.length}/50 characters
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-sm">About Your Profile</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Your name will be visible to your contacts</li>
            <li>• You can change it anytime in Settings</li>
            <li>• Your profile is linked to your Pi account</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-background p-6">
        <button
          onClick={handleComplete}
          disabled={!displayName.trim() || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold rounded-lg px-4 py-3 transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Profile...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Continue to Pigram
            </>
          )}
        </button>
      </div>
    </div>
  );
}

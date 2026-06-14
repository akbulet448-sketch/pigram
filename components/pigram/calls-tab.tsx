"use client";

import React, { useState } from "react";
import { ArrowLeft, X, Copy, Share2 } from "lucide-react";
import { usePigram } from "@/contexts/pigram-context";
import CreateMeetingDialog from "./create-meeting-dialog";
import type { Call } from "@/lib/pigram-types";

export default function CallsTab() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [incomingCall, setIncomingCall] = useState<Call | null>(null);
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const { calls, addCall, updateCall } = usePigram();

  React.useEffect(() => {
    if (activeCall) {
      const interval = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerCall = (call: Call) => {
    const updatedCall: Call = {
      ...call,
      status: "active",
      startTime: Date.now(),
    };
    setActiveCall(updatedCall);
    updateCall(call.id, updatedCall);
    setIncomingCall(null);
  };

  const handleDeclineCall = (call: Call) => {
    updateCall(call.id, { status: "ended", endTime: Date.now() });
    setIncomingCall(null);
  };

  const handleEndCall = () => {
    if (activeCall) {
      const duration = Math.floor((Date.now() - activeCall.startTime) / 1000);
      updateCall(activeCall.id, {
        status: "ended",
        endTime: Date.now(),
        duration,
      });
      setActiveCall(null);
      setCallDuration(0);
    }
  };

  // Simulate incoming call
  const simulateIncomingCall = () => {
    const incomingCall: Call = {
      id: "call_" + Date.now(),
      callerId: "user_john",
      callerName: "John Doe",
      recipientId: "current_user",
      recipientName: "You",
      type: "video",
      status: "incoming",
      startTime: Date.now(),
    };
    setIncomingCall(incomingCall);
  };

  if (incomingCall) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-4xl">
            {incomingCall.callerName.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-center">
              {incomingCall.callerName}
            </h2>
            <p className="text-blue-200 text-center mt-2">
              Incoming {incomingCall.type} call
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 pb-12">
          <button
            onClick={() => handleDeclineCall(incomingCall)}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
          >
            <X size={28} />
          </button>
          <button
            onClick={() => handleAnswerCall(incomingCall)}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (activeCall) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-4">
          <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-5xl">
            {activeCall.recipientName.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-center">
              {activeCall.recipientName}
            </h2>
            <p className="text-blue-200 text-center mt-2 text-2xl font-mono">
              {formatDuration(callDuration)}
            </p>
          </div>
        </div>

        <div className="bg-blue-900 bg-opacity-50 backdrop-blur p-6 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 9v2h-5v5h-2v-5H5v-2h5V4h2v5h5zm2-7H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16.5c-1.383 0-2.75-.288-4-1.012-1.171-.718-2.881-.719-4.052 0l-1.915 1.177A1.498 1.498 0 0 1 9 16.5c-2.761 0-6-1.657-6-5 0-1.381.446-2.625 1.148-3.569.229-2.524 2.236-4.431 4.75-4.431.5 0 1.081.108 1.547.37 2.062 1.15 4.854.903 6.31 0 .466-.262 1.047-.37 1.547-.37 2.514 0 4.521 1.906 4.75 4.431C23.554 10.875 24 12.119 24 13.5c0 3.343-3.239 5-6 5zm-9-13c-1.656 0-3 1.343-3 3s1.344 3 3 3 3-1.343 3-3-1.344-3-3-3z" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleEndCall}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors mx-auto"
          >
            <X size={28} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 z-10">
        <h1 className="text-2xl font-bold mb-4">Calls</h1>
        <div className="flex gap-2">
          <button
            onClick={simulateIncomingCall}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
          >
            Simulate Call
          </button>
          <button
            onClick={() => setShowCreateMeeting(true)}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
          >
            <Share2 size={16} />
            Meeting
          </button>
        </div>
      </div>

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto">
        {calls.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>No call history yet</p>
          </div>
        ) : (
          calls.map((call) => (
            <div
              key={call.id}
              className="p-4 border-b border-border hover:bg-muted transition-colors cursor-pointer flex items-center justify-between"
              onClick={() => setSelectedCall(call)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {call.recipientName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{call.recipientName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {call.type === "video" ? "📹 Video" : "☎️ Audio"} •{" "}
                    {call.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {call.duration
                    ? formatDuration(call.duration)
                    : new Date(call.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <CreateMeetingDialog
        open={showCreateMeeting}
        onOpenChange={setShowCreateMeeting}
        onMeetingCreated={(meetingId, inviteLink) => {
          alert("Meeting created! Invite link copied to clipboard:\n\n" + inviteLink);
        }}
      />
    </div>
  );
}

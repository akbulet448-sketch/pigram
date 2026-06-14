export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  piId: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'document';
  mediaUrl?: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  participants: string[];
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  groupDescription?: string;
  lastMessage?: Message;
  lastMessageTime?: number;
  unreadCount: number;
  createdAt?: number;
  createdBy?: string;
}

export interface Contact {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  piId: string;
  addedAt: number;
}

export interface Call {
  id: string;
  callerId: string;
  callerName: string;
  recipientId: string;
  recipientName: string;
  type: 'audio' | 'video';
  status: 'outgoing' | 'incoming' | 'active' | 'ended';
  startTime: number;
  endTime?: number;
  duration?: number;
}

export interface GroupMeeting {
  id: string;
  creatorId: string;
  creatorName: string;
  name: string;
  description?: string;
  inviteLink: string;
  participants: string[];
  startTime: number;
  endTime?: number;
  maxParticipants: number;
  isActive: boolean;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  piId: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: number;
  statusMessage?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName?: string;
  text?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'document';
  mediaUrl?: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  reactions?: Record<string, string[]>; // emoji -> user ids
  edited?: boolean;
  editedAt?: number;
  pinned?: boolean;
  replyTo?: string;
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
  muteNotifications?: boolean;
  archived?: boolean;
}

export interface Contact {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  piId: string;
  addedAt: number;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: number;
}

export interface Call {
  id: string;
  callerId: string;
  callerName: string;
  recipientId: string;
  recipientName: string;
  type: 'audio' | 'video';
  status: 'outgoing' | 'incoming' | 'active' | 'ended' | 'missed';
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

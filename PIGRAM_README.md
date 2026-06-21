# Pigram - Full-Featured Social Chat App

Pigram is a comprehensive mobile-web social and chat application built with Next.js, React, and Pi Network authentication. It provides real-time messaging, media sharing, audio/video calls, and group meetings with shareable invite links.

## Features

### 📱 Core Chat Features
- **One-on-One Messaging**: Real-time text communication between users
- **Group Chats**: Create group conversations with multiple participants
- **Message Status Indicators**: See if messages are sent, delivered, or read
- **Typing Indicators**: Know when someone is composing a message
- **Search**: Search through conversations by name or content
- **Message Timestamps**: Auto-formatted timestamps (e.g., "5m", "2h", "3d")
- **Unread Badges**: Track unread message counts

### 🎥 Media & Calls
- **Media Sharing**: Send images, videos, audio, and documents
- **Peer-to-Peer Audio Calls**: Direct audio calling between users
- **Peer-to-Peer Video Calls**: Direct video calling with duration tracking
- **Call History**: Complete log of all calls with duration and type
- **Call Controls**: Mute, speaker toggle, and call duration display

### 👥 Contacts Management
- **Contact List**: Maintain a list of Pi-verified contacts
- **Add Contacts**: Add new contacts by Pi username
- **Contact Search**: Find contacts quickly
- **Quick Actions**: Message or call directly from contact card

### 🤝 Group Meetings
- **Create Meetings**: Start new group meeting rooms
- **Shareable Links**: Generate invite links for easy sharing
- **Direct Join**: Click links to join meetings instantly
- **Meeting Tiles**: Display up to 4-6 participants
- **Meeting Controls**: Mute, speaker toggle, leave button

### 👤 User Profiles
- **Profile Management**: Edit display name and profile picture
- **Pi Account Integration**: Display Pi ID and account info
- **Profile Status**: Show online/offline status (ready for real-time integration)

### ⚙️ Settings
- **Theme Support**: Toggle between light and dark modes
- **Notifications**: Enable/disable push notifications
- **App Info**: Version and build information
- **Logout**: Secure session termination with Pi Network
- **Meeting Link Generation**: Create shareable group meeting links

## Architecture

### Components Structure
```
components/pigram/
├── app.tsx                 # Main app with tab navigation
├── chats-tab.tsx          # Chat list and search
├── chat-item.tsx          # Individual chat preview
├── chat-detail.tsx        # Chat messaging interface
├── message-bubble.tsx     # Message display component
├── new-chat-dialog.tsx    # New chat creation dialog
├── contacts-tab.tsx       # Contact management tab
├── contact-item.tsx       # Contact card component
├── add-contact-dialog.tsx # Add new contact dialog
├── calls-tab.tsx          # Call history and active calls
├── settings-tab.tsx       # User settings and profile
└── data-initializer.tsx   # Demo data setup
```

### State Management
- **PigramProvider**: Global context for chat data
- **Conversations**: One-on-one and group chats
- **Messages**: Organized by conversation
- **Contacts**: User contact list
- **Calls**: Call history and active calls
- **Meetings**: Group meeting rooms

### Pi Network Integration
- **Authentication**: Uses Pi SDK for secure user identity
- **Pi Auth Context**: Manages SDK initialization and user session
- **User Profile**: Displays Pi account information

## UI/UX Highlights

### Mobile-First Design
- **Bottom Tab Navigation**: Easy thumb access to all main sections
- **Touch-Friendly**: Large tap targets (48x48px minimum)
- **Responsive Layout**: Adapts to all screen sizes
- **Smooth Animations**: Transitions between tabs and screens

### Visual Hierarchy
- **Chat Bubbles**: Right-aligned for sent, left-aligned for received
- **Color Coding**: Blue for sent, gray for received
- **Status Indicators**: Double-check marks for read messages
- **Avatar Initials**: Quick visual identification

### Dark/Light Theme
- Built-in theme toggle
- System preference support
- Smooth transitions

## Getting Started

### Requirements
- Node.js 16+
- Pi Network account for authentication
- Modern browser with WebAuthn support

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Configuration
1. Ensure Pi Network SDK is properly configured in `lib/system-config.ts`
2. The app initializes with demo data automatically
3. Pi authentication happens on app startup

## Demo Data

The app comes pre-loaded with:
- **3 Demo Contacts**: Alice, Bob, and Charlie
- **2 Demo Conversations**: One-on-one chat and group chat
- **Sample Messages**: Past conversations for testing

These are initialized via the `PigramDataInitializer` component and stored in app state.

## Key Features Explained

### Message Status Flow
1. **Sent**: Message sent to backend
2. **Delivered**: Message received by recipient device
3. **Read**: Message viewed by recipient (simulated)

### Call Flow
1. **Incoming**: Receive call notification with accept/decline
2. **Active**: Ongoing call with duration timer
3. **Ended**: Call history with final duration

### Group Meeting Flow
1. Create meeting room
2. Generate shareable invite link
3. Share link via any method
4. Recipients click to join instantly
5. Video grid displays participants

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS v4, shadcn/ui components
- **Icons**: Lucide React
- **State**: React Context API
- **Auth**: Pi Network SDK
- **Forms**: React Hook Form with Zod validation

## Future Enhancements

- [ ] Real-time WebSocket integration
- [ ] End-to-end encryption
- [ ] Message reactions and replies
- [ ] Voice/video recording storage
- [ ] Call recording
- [ ] User presence indicators
- [ ] Message pinning
- [ ] File sharing with cloud storage
- [ ] Read receipts
- [ ] Message forwarding

## Security

- Uses Pi Network's built-in authentication
- User data stored locally on device (no server storage by default)
- Supports future E2E encryption
- Session management via Pi Auth

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

All modern browsers with ES2020+ support.

---

**Built with App Studio** - Mobile-first chat app powered by Pi Network

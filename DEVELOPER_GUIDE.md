# Pigram - Developer Quick Reference

## Quick Start

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

The app will:
1. Load Pi Network SDK
2. Authenticate the user via Pi
3. Show AuthLoadingScreen while initializing
4. Display the main Pigram interface once authenticated

## File Structure

### Main Entry Points
- `app/page.tsx` - Main page with PigramProvider
- `components/pigram/app.tsx` - Main app component with tab navigation

### Contexts
- `contexts/pi-auth-context.tsx` - Pi SDK authentication (DO NOT MODIFY)
- `contexts/pigram-context.tsx` - Chat state management

### Components by Feature

**Chats**
- `components/pigram/chats-tab.tsx` - Chat list view
- `components/pigram/chat-item.tsx` - Chat list item
- `components/pigram/chat-detail.tsx` - Individual chat view
- `components/pigram/message-bubble.tsx` - Message display
- `components/pigram/new-chat-dialog.tsx` - Create new chat

**Contacts**
- `components/pigram/contacts-tab.tsx` - Contact list
- `components/pigram/contact-item.tsx` - Contact card
- `components/pigram/add-contact-dialog.tsx` - Add contact

**Calls**
- `components/pigram/calls-tab.tsx` - Call history & active calls

**Settings**
- `components/pigram/settings-tab.tsx` - Settings & profile

**Utilities**
- `components/pigram/data-initializer.tsx` - Load demo data
- `components/pigram/meeting-link-handler.tsx` - Handle meeting URLs

### Type Definitions
- `lib/pigram-types.ts` - All TypeScript interfaces

### Documentation
- `lib/BUILD_SUMMARY.md` - Complete build overview
- `lib/PIGRAM_README.md` - Feature documentation
- `lib/FEATURE_CHECKLIST.md` - Implementation checklist

## Key Hooks

### usePigram()
Global chat state management hook.

```typescript
const {
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
} = usePigram();
```

### usePiAuth()
Pi Network authentication (do not modify).

```typescript
const {
  isAuthenticated,
  authMessage,
  hasError,
  sdk,
  products,
  restoredPurchases,
} = usePiAuth();
```

## Common Tasks

### Adding a Message
```typescript
const { addMessage } = usePigram();

const newMessage = {
  id: "msg_" + Date.now(),
  conversationId: "conv_123",
  senderId: "user_id",
  text: "Hello!",
  timestamp: Date.now(),
  status: "sent" as const,
};

addMessage("conv_123", newMessage);
```

### Creating a Conversation
```typescript
const { addConversation } = usePigram();

const newConv = {
  id: "conv_" + Date.now(),
  participants: ["user_123"],
  isGroup: false,
  unreadCount: 0,
  lastMessageTime: Date.now(),
};

addConversation(newConv);
```

### Adding a Contact
```typescript
const { addContact } = usePigram();

const newContact = {
  id: "contact_" + Date.now(),
  username: "john_π",
  displayName: "John",
  piId: "pi_john_123",
  addedAt: Date.now(),
};

addContact(newContact);
```

### Creating a Call
```typescript
const { addCall } = usePigram();

const newCall = {
  id: "call_" + Date.now(),
  callerId: "user_1",
  callerName: "Alice",
  recipientId: "user_2",
  recipientName: "Bob",
  type: "video" as const,
  status: "incoming" as const,
  startTime: Date.now(),
};

addCall(newCall);
```

## State Management Flow

```
User Action
    ↓
Component calls usePigram() hook
    ↓
Hook function updates state
    ↓
PigramContext re-renders affected components
    ↓
UI updates automatically
```

## Demo Data

Pre-loaded on startup:
- Alice, Bob, Charlie (contacts)
- One-on-one chat with Alice
- Group chat "Project Team"
- Sample message history

Initialized in `components/pigram/data-initializer.tsx`

## Styling

- **Framework**: Tailwind CSS v4
- **Colors**: CSS variables in `globals.css`
- **Components**: shadcn/ui from `components/ui/`
- **Icons**: Lucide React
- **Theme**: Next Themes (dark/light)

### Common Classes
```
bg-background     - Page background
text-foreground   - Text color
bg-muted          - Secondary background
text-muted-foreground - Secondary text
border-border     - Border color
```

## Theme Support

Light and dark themes are built-in via `next-themes`.

Toggle with:
```typescript
const { theme, setTheme } = useTheme();
setTheme(theme === "dark" ? "light" : "dark");
```

## Adding New Features

### New Tab
1. Create component in `components/pigram/new-feature-tab.tsx`
2. Import in `components/pigram/app.tsx`
3. Add case in renderTab() switch
4. Add button in bottom tab bar

### New Dialog
1. Create component in `components/pigram/`
2. Use shadcn `Dialog` component
3. Import where needed
4. Manage open/close state in parent

### New Message Type
1. Add to `Message` type in `lib/pigram-types.ts`
2. Handle in `message-bubble.tsx`
3. Add sending logic where messages are created

## Testing with Demo Data

The app automatically loads demo conversations and contacts. To add more:

Edit `components/pigram/data-initializer.tsx`:
```typescript
const demoContacts = [
  // Add more contacts here
];

const demoMessages = [
  // Add more messages here
];
```

## Important Notes

⚠️ **DO NOT MODIFY**:
- `contexts/pi-auth-context.tsx` - Pi authentication is mandatory
- `components/app-wrapper.tsx` - App wrapper with auth check
- `app/layout.tsx` - Root layout with Pi SDK

✅ **SAFE TO MODIFY**:
- All files in `components/pigram/`
- `contexts/pigram-context.tsx` - State management
- `lib/pigram-types.ts` - Add new types

## Performance Tips

1. **Message Rendering**: Currently renders all messages. For large chats, implement virtualization.
2. **Contact Search**: Already optimized with filter function.
3. **Re-renders**: useCallback in context prevents unnecessary re-renders.
4. **State Splitting**: Contacts, conversations, and messages are separate maps for efficient updates.

## Debugging

Console logs follow pattern: `[v0] descriptive message`

Example:
```typescript
console.log("[v0] Message sent:", newMessage);
```

## Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

The app is production-ready with:
- TypeScript for type safety
- Mobile-first responsive design
- Pi Network authentication
- Optimized performance
- Dark/light theme support

## Browser DevTools

- **React DevTools**: Inspect PigramProvider context
- **Network Tab**: Monitor Pi SDK calls
- **Console**: Watch for errors
- **Application Tab**: Check localStorage for theme preference

## Common Errors

### "usePigram must be used within PigramProvider"
- Make sure `PigramProvider` wraps the app in `page.tsx`
- Check that context is exported correctly

### "Pi SDK not initialized"
- This is handled by `PiAuthContext`
- Wait for `isAuthenticated` to be true before rendering

### Layout shifts
- Use `pb-20` on main container to account for fixed tab bar
- All fixed elements use `fixed bottom-0`

## Next Steps

1. ✅ Current: Full chat app functional
2. Next: Add WebSocket for real-time
3. Then: Add database persistence
4. Later: Add peer-to-peer calls (WebRTC)
5. Finally: Deploy to production

---

**Happy coding!** 🚀

# Group Features - Visual Overview

## Feature Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    PIGRAM APP                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ MESSAGES TAB │  │ SETTINGS TAB │  │  CALLS TAB   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│        ↓                   ↓                  ↓        │
│   [Create Group]    [Create Meeting]  [Create Meeting] │
│        ↓                   ↓                  ↓        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │Create Group  │  │Create Meeting│  │Create Meeting│ │
│  │Dialog        │  │Dialog        │  │Dialog        │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│        ↓                                               │
│  ┌──────────────────────────────────────────────────┐ │
│  │  PigramContext                                   │ │
│  │  ├─ addGroupMember()                             │ │
│  │  ├─ removeGroupMember()                          │ │
│  │  ├─ addConversation()                            │ │
│  │  └─ createMeeting()                              │ │
│  └──────────────────────────────────────────────────┘ │
│        ↓                                               │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Local State (Messages, Members, Meetings)        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
CreateGroupDialog
├─ Input: Group Name
├─ Input: Description
├─ Contact Selector
│  ├─ Search Bar
│  ├─ Available Contacts
│  └─ Selected Members Display
└─ Actions: Cancel, Create Group

CreateMeetingDialog
├─ Input: Meeting Name
├─ Input: Description
├─ Range: Max Participants
├─ Display: Creator Info
└─ Actions: Cancel, Create Meeting

GroupDetails (Modal)
├─ Display: Group Info
│  ├─ Avatar
│  ├─ Name
│  ├─ Description
│  └─ Member Count
├─ Member Management
│  ├─ Add Member
│  │  ├─ Search Input
│  │  └─ Actions: Add, Cancel
│  └─ Members List
│     ├─ Member Cards
│     └─ Remove Buttons
└─ Actions: Leave Group
```

## Data Flow Diagram

```
User Action
    ↓
[Dialog Component]
    ↓
Input Validation
    ↓
Create Data Structure
    ↓
Call Context Method
    ├─ addConversation()
    ├─ createMeeting()
    ├─ addGroupMember()
    └─ removeGroupMember()
    ↓
Update State
    ├─ conversations[]
    ├─ meetings[]
    └─ messages Map
    ↓
Re-render Components
    ├─ ChatItem updates
    ├─ SettingsTab updates
    └─ GroupDetails displays
    ↓
UI Updates
```

## User Journeys

### Journey 1: Create Group & Chat
```
Start → Messages Tab
    ↓
Click [Users Icon]
    ↓
Enter Group Name: "Team Project"
Enter Description: "Q3 Planning"
    ↓
Select Contacts: [Alice, Bob, Carol]
    ↓
Click [Create Group]
    ↓
Group Created ✓
    ↓
Auto-open Group Chat
    ↓
Group appears in Messages
    ↓
Ready to Send Messages
```

### Journey 2: Create & Share Meeting
```
Start → Settings Tab
    ↓
Click [Create New Meeting]
    ↓
Enter Name: "Weekly Sync"
Enter Description: "Team standup"
Set Participants: 8
    ↓
Click [Create Meeting]
    ↓
Meeting Created ✓
Link Auto-Copied ✓
    ↓
Share Link with Team
    ↓
Others Click Link
    ↓
Join Meeting Directly
```

### Journey 3: Manage Group Members
```
Start → Open Group Chat
    ↓
Click [Users Icon] in Header
    ↓
GroupDetails Modal Opens
    ↓
See Current Members:
├─ Alice
├─ Bob
├─ Carol
└─ You
    ↓
Click [+] to Add Member
    ↓
Enter Username: "Diana"
Click [Add]
    ↓
Diana Added ✓
Member List Updated ✓
    ↓
Click [X] on Bob
    ↓
Bob Removed ✓
Member List Updated ✓
```

## Access Points Map

```
HOME SCREEN
├─ TAB: Messages
│  ├─ [+] New Chat
│  └─ [👥] Create Group ← NEW!
│
├─ TAB: Contacts
│  └─ [+] Add Contact
│
├─ TAB: Calls
│  ├─ [Simulate Call]
│  └─ [Meeting] ← NEW!
│
└─ TAB: Settings
   ├─ Edit Profile
   ├─ My Groups ← NEW!
   ├─ [Create Meeting] ← NEW!
   ├─ Theme Toggle
   └─ Logout

GROUP CHAT HEADER
├─ [← Back]
├─ [Group Name]
├─ [☎️ Audio Call]
├─ [📹 Video Call]
├─ [👥] Group Info ← NEW!
└─ [⋯] More
```

## State Management

```
PigramContext
│
├─ conversations: Conversation[]
│  └─ Each contains:
│     ├─ id, participants, isGroup
│     ├─ groupName?, groupDescription?
│     ├─ lastMessage, unreadCount
│     └─ createdAt?, createdBy?
│
├─ meetings: GroupMeeting[]
│  └─ Each contains:
│     ├─ id, name, description?
│     ├─ inviteLink, participants
│     ├─ startTime, maxParticipants
│     └─ isActive
│
└─ Methods:
   ├─ addConversation()
   ├─ addGroupMember()
   ├─ removeGroupMember()
   ├─ createMeeting()
   └─ updateMeeting()
```

## UI Components Relationship

```
App
├─ ChatsTab
│  ├─ ChatList
│  │  └─ ChatItem (each chat)
│  ├─ ChatDetail (when selected)
│  │  └─ GroupDetails (if group)
│  └─ CreateGroupDialog
│
├─ SettingsTab
│  ├─ Profile Section
│  ├─ My Groups Section ← NEW
│  ├─ Create Meeting Button ← NEW
│  └─ CreateMeetingDialog
│
└─ CallsTab
   ├─ CallsList
   ├─ CallScreens
   ├─ Meeting Button ← NEW
   └─ CreateMeetingDialog
```

## Mobile Layout

```
┌─────────────────────┐
│  MESSAGES TAB       │
├─────────────────────┤
│ [+]  [👥] Search    │ ← Header with new Users btn
├─────────────────────┤
│ Chat 1              │
│ Chat 2 (GROUP)      │ ← Group shown in list
│ Chat 3              │
│ Chat 4 (GROUP)      │
├─────────────────────┤
│ [Messages] [+] ...  │ ← Bottom tabs
└─────────────────────┘

┌─────────────────────┐
│ GROUP CHAT          │
├─────────────────────┤
│ [<] Group Name [👥]│ ← Users button
├─────────────────────┤
│ Messages...         │
│ Messages...         │
├─────────────────────┤
│ [📎] Input [Send]   │
└─────────────────────┘

┌─────────────────────┐
│ GROUP INFO MODAL    │
├─────────────────────┤
│ [X] Group Info      │
├─────────────────────┤
│ 👥 Group Name       │
│ "Description..."    │
│                     │
│ Members (3)         │
│ ├─ 👤 Alice [X]     │
│ ├─ 👤 Bob [X]       │
│ └─ 👤 Carol [X]     │
│                     │
│ [+] Add Member      │
│ [Leave Group]       │
└─────────────────────┘
```

## Performance Considerations

```
✓ Context-based state (no prop drilling)
✓ Memoized callbacks (useCallback)
✓ Efficient re-renders
✓ Local state for dialogs
✓ No unnecessary API calls
✓ Validation before state update
✓ Optimized contact search
```

## Security & Access

```
✓ Pi SDK authentication required
✓ User ID tied to all groups
✓ Creator validation on creation
✓ Member verification before addition
✓ Local state only (no server)
✓ Invite links are generated, not user-facing
```

---

**Last Updated:** June 14, 2026
**Status:** Complete & Ready

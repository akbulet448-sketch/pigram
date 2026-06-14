# Quick Reference: Group Features

## At a Glance

| Feature | Location | Action | Result |
|---------|----------|--------|--------|
| Create Group Chat | Messages tab, Users icon | Fill form + select members | New group appears in chat list |
| Create Meeting | Settings or Calls tab | Fill meeting details | Invite link auto-copied |
| Manage Members | Group chat, Users icon | Add/remove members | Members list updated |
| View Groups | Settings tab | Scroll to "My Groups" | See all created groups |
| Leave Group | Group Info modal | Click "Leave Group" | Removed from group |

## Access Points

### Create Group
- **Icon:** Users icon
- **Path:** Messages tab → Users button
- **Keyboard:** N/A

### Create Meeting
- **Path 1:** Settings tab → "Create New Meeting" button
- **Path 2:** Calls tab → "Meeting" button
- **Result:** Auto-copy invite link to clipboard

### Group Info
- **Icon:** Users icon in header
- **Path:** Open group chat → Users button (top right)
- **Shows:** Members, info, actions

### My Groups
- **Path:** Settings tab → "My Groups" section
- **Shows:** All user groups with member counts

## Key Interactions

### Creating a Group
```
1. Click Users icon (Messages tab header)
2. Enter "Group Name" (required)
3. Enter "Description" (optional)
4. Search and select contacts
5. Click "Create Group"
→ Group appears in chat list, auto-opens
```

### Creating a Meeting
```
1. Click "Create New Meeting"
2. Enter "Meeting Name" (required)
3. Enter "Description" (optional)
4. Adjust "Max Participants" slider
5. Click "Create Meeting"
→ Link auto-copied, success alert shown
```

### Adding a Group Member
```
1. Open group chat
2. Click Users icon in header
3. Click Plus button
4. Enter username or contact ID
5. Click "Add"
→ Member added to group, list updated
```

### Removing a Group Member
```
1. Open group chat
2. Click Users icon in header
3. Click X next to member name
→ Member removed from group
```

## Component Locations

| Component | File |
|-----------|------|
| CreateGroupDialog | `components/pigram/create-group-dialog.tsx` |
| CreateMeetingDialog | `components/pigram/create-meeting-dialog.tsx` |
| GroupDetails | `components/pigram/group-details.tsx` |
| ChatsTab (updated) | `components/pigram/chats-tab.tsx` |
| SettingsTab (updated) | `components/pigram/settings-tab.tsx` |
| CallsTab (updated) | `components/pigram/calls-tab.tsx` |
| ChatDetail (updated) | `components/pigram/chat-detail.tsx` |

## Context Methods

```typescript
// Add member to group
usePigram().addGroupMember(groupId, memberId)

// Remove member from group
usePigram().removeGroupMember(groupId, memberId)

// Get all groups
usePigram().conversations.filter(c => c.isGroup)

// Create group
usePigram().addConversation({...groupData})

// Create meeting
usePigram().createMeeting({...meetingData})
```

## Mobile Considerations

- All dialogs are full mobile responsive
- Minimum tap target: 48x48px
- Keyboard-friendly inputs
- Scroll support for long lists
- Works in portrait and landscape
- Touch-optimized buttons

## Common Tasks

### Find a Group I Created
→ Settings tab → "My Groups" section → Scroll to find

### Invite Someone to a Meeting
→ Settings or Calls tab → "Create New Meeting" → Share the link

### Remove Someone from Group
→ Open group → Users icon → Click X on member

### See Who's in a Group
→ Open group → Users icon → See member list

### Change Group Name
→ Currently requires recreating group (enhancement in future)

### Leave a Group
→ Open group → Users icon → Click "Leave Group"

## Data Files

| Documentation | Content |
|---|---|
| `GROUP_FEATURES.md` | Comprehensive feature guide |
| `GROUP_UPDATE_SUMMARY.md` | Implementation summary |
| This file | Quick reference |

## Troubleshooting

**Group won't create?**
- Check group name is not empty
- Ensure at least 1 member selected

**Can't find contact to add?**
- Verify contact username or ID
- Check if contact is already in group

**Meeting link not copied?**
- Try again or check clipboard permissions
- Manual copy available in dialog

**Can't see My Groups?**
- Scroll down in Settings tab
- Create a group first to see section

## Tips & Tricks

1. **Quick Meeting:** Click Meeting button from Calls tab (fastest)
2. **Bulk Add Members:** Use Create Group dialog to add multiple at once
3. **Copy Link:** Meeting links auto-copy, but can be copied again
4. **Search Contacts:** Type while selecting members to filter
5. **Group Size:** Default 6 participants (adjustable 2-10)

---

For detailed documentation, see `GROUP_FEATURES.md`

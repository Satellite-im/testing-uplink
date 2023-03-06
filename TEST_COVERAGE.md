# UI Test Coverage Matrix

This document provides a test coverage matrix of the Uplink features that are already automated within this testing framework. This list was implemented considering the Uplink Testing Checklist from [here](https://github.com/Satellite-im/Uplink/blob/dev/ui/docs/testing/uplink-checklist.md). Items marked as [x] are already automated and the ones not marked are pending to be automated in the next days.

## **Functionality Checklist**

### **Overall functionalities**

- [x] Validate pre-release indicator is displayed along the application
- [x] Validate Nav bar menu is displayed on screen with access to the main functionalities of the application

### **Registration / Login**

**PIN Creation**

- [x] Limits PIN to a maximum of 32 characters.
- [x] Requires PIN to be a minimum of 4 characters.
- [x] Shows error if User tries to enter with less than 4 characters.
- [x] Shows error if User enters incorrect PIN.
- [x] Shows error if User attempts to proceed with empty PIN.
- [ ] Shows error if User enters a PIN with spaces
- [x] Display some indication of success when the user enters a valid PIN - Create Account button enabled.
- [x] Validate warning texts displayed in the screen alerting the user about the importance of the PIN

**Username**

- [x] Limits username to a maximum of 32 characters.
- [x] Requires a username to be a minimum of 4 characters.
- [x] Shows error if User enters Username with less than 4 characters.
- [x] Shows error if User enters Username that is more than 32 characters.
- [x] Shows error if User attempts to proceed with empty username.
- [x] Shows error if User enters a Username with non-alphanumberic characters
- [ ] Shows error if User enters a username with spaces
- [x] Displays some indication of success when the user enters a valid username.
- [x] Welcome Screen is displayed after entering valid pin and username

**Profile Picture**

- [x] Profile picture chooser should closely resemble the shape and appearance of how the profile will be displayed in app.
- [ ] Profile picture chooser should be responsive to fit multiple display sizes.
- [ ] Profile picture should include some clear indication to the user that they can interact with it to add a profile picture.
      **CTA Button**
- [x] The register button should use a reusable component and only appear clickable when all of the required information is submitted and there are no errors on the page.

### **Chat Page**

**Landing page for New Accounts**

- [x] "No active chats, wanna make one?" with option underneath to start one.
- [ ] Page indicator in Sidebar should indicate User they are on the Chat page.

**Current Chat**

- [ ] Any message you sent yourself should appear within a colored message bubble.
- [ ] Any message received should appear with a grey message bubble.
- [ ] The chat that you are in should be highlighted in the Sidebar.
- [ ] User Profile Pic should appear next to their Message and be up to date.
- [ ] Username should appear above each message or bulk of messages sent or received.
- [ ] Clicking the _Heart_ should add the friend to your _Favorites_.
- [ ] Currect chat should be displayed at top of the list in Sidebar.
- [ ] Timestamps should update in chat, and sidebar. (now, then goes by minutes-hours-days)
- [ ] Clicking _Phone_ icon should open call modal.
- [ ] Chat should close if User blocks friend they are in current chat with.
- [ ] Typing indicator appears (if user has that extension toggled on).
- [ ] Usernames are both displayed in call modal.
- [ ] Friends Username/Profile Pic/Status should be displayed at top of active chat.
- [ ] Tooltip should appear for _Call_ button.
- [ ] Tooltip should appear for _Video_ button.
- [ ] Tooltip should appear for _Upload_ button.
- [ ] Tooltip should appear for _Favorites_ button.
- [ ] User can reply to a message by right+clicking and selecting in context menu.
- [ ] User can react to a message by right+clicking and selecting in context menu.
- [ ] User should enter chat at the bottom with most recent messages.

### Calling & Video

- [ ] Call modal opens when User starts a call.
- [ ] Tooltip should appear for _End Call_ button.
- [ ] Tooltip should appear for _Enable Camera_ button.
- [ ] Tooltip should appear for _ScreenShare_ button.
- [ ] Call/Video sounds should mute when User clicks _Silence_.
- [ ] User should be navigated to Settings when they click _Settings_ button.
- [ ] Call should expand when User enters _Fullscreen_.
- [ ] Pop-Out player should appear when User enables it.
- [ ] While Pop-out is enabled original call should display _Media Detached_.

### **Friends**

**All Friends List**

- [x] Clicking Copy Code should copy User's did key
- [x] There should be an input field for us to paste a did key or user#short_id.
- [ ] Friends are ordered alphabetically.
- [ ] Profile picture should be present next to Username if friend has one.
- [ ] Profile Picture should update if a friend changes it.
- [ ] Online/Offline status should update when friends log in or off.
- [ ] Tooltip should appear when hovering cursor over _Unfriend_.
- [ ] Tooltip should appear when hovering cursor over _Block_.
- [ ] Tooltip should appear when hovering cursor over _All Friends_.
- [ ] Tooltip should appear when hovering cursor over _Pending_.
- [ ] Tooltip should appear when hovering cursor over _Blocked_.
- [ ] Tooltip should appear when hovering cursor over _Add_.
- [ ] Tooltip should appear when hovering cursor over _Chat_.
- [x] Clicking _Chat_ should navigate User to active chat with that friend.
- [ ] Friend Status should appear underneath username.
- [x] Clicking _Unfriend_ should remove that person from your friends list.
- [x] Clicking _Block_ should move that person to the blocked users list.
- [ ] Scrollbar should appear when user scrolls through friends list.
- [ ] User#short_id should appear after the friends username.
- [x] Right+Clicking on a friend should bring up the context menu.
- [x] Friend should be added to Favorites when User adds them with the context menu.
- [x] When User clicks _Chat_ in the context menu, they should be navigated to active chat with that friend.
- [ ] When User starts a call with the context menu they should be navigated to active call with that friend.
- [x] User should be able to remove a friend by using the context menu.
- [x] User should also be able to block a friend by using the context menu.
- [ ] Green indicator should appear when User paste a correct did key in the Add Friend input field.
- [ ] Online status / Device indicator should appear next to friends profile pic. (This should appear anywhere a friends profile pic is throughout entire app)

### Adding Friends

- [ ] Search Bar should display _Username#0000_ when user is not clicked into it.
- [ ] Error should appear when User has less than 4 chars typed.
- [ ] Search Input should display green indicator when User types more than 4 chars.
- [ ] Request should appear under _Pending_ after it is sent.
- [x] If user cancels request, the request should no longer appear in _Pending_.
- [ ] Error should appear if User sends 2nd friend request to the same person.
- [ ] Error should appear when User tries to add themselves.

**Pending Requests**

- [x] Pending requests view should display incoming and outgoing requests lists
- [x] Incoming Friend Request should have an _Deny_ or _Accept_ next it.
- [x] Profile Picture should appear with Username next to it.
- [ ] Incoming request should be ordered by _Most Relevant_.
- [ ] Notification counter should display correct amount of requests on _Pending_.
- [ ] Notification counter should display correct amount of requests on _Friends Page Button_
- [x] After accepting friend request, the pending request should clear and they should be added to the All Friends list.
- [x] After denying friend request, the pending request should clear and they should NOT be added to the All Friends list.
- [x] After canceling an outgoing friend request, the pending request should clear and they should NOT be added to the All Friends list.
- [ ] When User clicks _Accept Incoming Request_ in the context menu, request should be accepted and user added to the all friends list.
- [x] When User clicks _Deny Incoming Request_ in the context menu, request should be denied and user should NOT be added to the all friends list.
- [x] When User clicks _Cancel Outgoing Request_ in the context menu, outgoing request should be canceled and removed from the outgoing list.

**Blocked Friends**

- [x] Blocked users view should display a list of the blocked users
- [x] After selecting the "Unblock" button from someone on the blocked list, the user should be removed from the blocked list, but should NOT be added to the All Friends list.
- [x] When User clicks _Unblock_ in the context menu, user should be removed from blocked list but not added again to all friends list.

### Files

- [ ] Icon should open the Upload File Modal.
- [ ] Preview should be shown for Uploaded Files.
- [ ] Folder should highlight when User is drag+dropping a file into it.
- [ ] Folder should also be highlighted when User hovers cursor over it.
- [ ] Upload % should show when User is uploading Files
- [ ] Clicking the _Home_ button in Directory should take you to Files Home page.
- [ ] When User clicks New Folder typing indicator should appear and User can start typing without clicking into textbox first.
- [ ] Right clicking folder should open Context Menu with option to rename or delete.
- [ ] Scrollbar should appear when any Files are rendered off screen.
- [ ] Files Directory should show updated Folders name if Folder has been renamed.
- [ ] File Uploading should stop as soon as User hits _Cancel_.
- [ ] Size of file should show underneath preview.
- [ ] Amount of items/size of uploaded files should show underneath the Folder.
- [ ] Directory should be highlighted when User hovers cursor over it.
- [ ] Upload modal should show path of said file when User is drag+dropping a file into Modal.
- [ ] Clicking the X in right corner of Upload Modal should close said Modal.
- [ ] Progress Bar should show actual amount of Files uploaded.
- [x] Free Space should appear at the top of Files Page.
- [x] Total Space should appear at the top of Files Page.

### Settings

**Profile Page**

- [ ] _Change Avatar_ should appear when user hovers cursor over Profile Pic.
- [x] _Change Banner_ should appear when user hovers cursor over Banner area.
- [x] Clicking the Banner should open Users local files browser.
- [x] Clicking the Profile Picutre should open Users local files browser.
- [x] Clicking _Edit_ should display input fields for Username and Status.
- [x] Error message should appear when User tries to type a username longer than 32 characters.
- [x] Error message should appear when user attempts to save a username with less than 4 characters.
- [ ] Error message should appear when user attempts to save a username with spaces.
- [x] Error message should appear when user attempts to save a username with non-alphanumeric characters.
- [x] Error message should appear when User tries to type a status message longer than 128 characters.
- [x] Assert placeholder texts are displayed right now on input fields
- [x] Validate text descriptions from settings sections

**General**

- [x] User should land in General tab when entering Settings.
- [x] Text descriptions from settings section should be displayed
- [x] User should be able to toggle _Uplink Overlay_.
- [x] User should be able to toggle _Splash Screen_.
- [ ] Clicking Theme should open the Themes Dropdown.
- [ ] Clicking _Reset Theme_ should set the theme back to default.
- [ ] UI should change accordingly when User sets a new theme.
- [x] User should be able to change the language by selecting from the Language Dropdown menu.
- [x] User should be able to switch back the language to English US by selecting from the Language Dropdown menu.

**Privacy**

- [ ] Clicking _Backup Phrase_ in the _Privacy_ tab should backup Users account phrase.
- [x] Text descriptions from settings section should be displayed

**Audio**

- [x] User should be able to toggle _Interface Sounds_ on and off.
- [x] User should be able to toggle _Media Sounds_ on and off.
- [x] User should be able to toggle _Call Timer_ on and off.
- [x] Text descriptions from settings section should be displayed

**Files**

- [x] User should be able to toggle _Local Sync_ on and off.
- [ ] Clicking _Open Sync Folder_ should open the folder where Users local files are synced to.
- [x] Text descriptions from settings section should be displayed

**Extensions**

- [x] User should be able to toggle Placeholder on and off.
- [ ] Clicking _Open Extensions Folder_" should open Users extension folder.
- [x] Text descriptions from settings section should be displayed - Right now only placeholders

**Notifications**

- [ ] User should be able to grant permissions to receive notifications - non functional yet
- [ ] User should be able to enable notifications for incoming calls and messages
- [ ] If switch slider of enable notifications for incoming calls and messages is disabled, then the friends, messages and settings notifications switches are disabled
- [ ] If switch slider of enable notifications for incoming calls and messages is enabled, then the friends, messages and settings notifications switches are not blocked
- [ ] User can enable notifications for friend requests
- [ ] User can enable notifications for new messages
- [ ] User can enable notifications for updates and important alerts
- [ ] Text descriptions from settings section should be displayed - Right now only placeholders

**Developer**

- [x] Text descriptions from settings section should be displayed - Right now only placeholders
- [ ] Clicking _Developer Mode_ should open the debugger
- [x] Clicking _Open Codebase_ should take the User to Github Codebase
- [ ] Clicking _Test Notification_ should display a test notification from the OS triggered by the application
- [ ] Clicking _Open Cache_ should open the .Cache folder within Uplink.
- [ ] Clicking _Compress & Download Cache_ should compress the Users .Cache into a zip file.
- [ ] User can clear .Cache by clicking _Clear Cache_
- [ ] Logs should save in a file when User toggles on _Save Logs In A File_
- [x] Chat Sidebar should not appear when User is in Settings
- [ ] Dev tools should appear in top right corner when toggled on.
- [ ] Clicking Mobile dev tool should resize window to replicate a Mobile device.
- [ ] Clicking Tablet dev tool should resize window to replicate a Tablet.
- [ ] Clicking Desktop dev tool sohuld resize window to original Desktop view.
- [ ] Clicking fullscreen dev tool should resize window to take up entire screen.

### Sidebar

**Basics**

- [x] Sidebar should persist through Chat, Files, and Friends pages.
- [ ] Any active chats user has created should appear in Sidebar.
- [x] Sidebar should be hidden when User enters Settings.
- [x] Sidebar should display Users favorite chats (If user has any).
- [ ] User should be navigated to chat when they click a friend in their favorites.
- [ ] Sidebar sholud display all of Users chats with most relevant at the top.
- [ ] Notification bubble should appear on Chat icon if User has any.
- [ ] Notification bubble should appear on Friends icon if User has any.
- [ ] User can clear unread messages by right+clicking to open context menu.
- [ ] User can call a friend by right+clicking to open context menu.
- [ ] User can hide chat by right+clicking to open context menu.
- [ ] Tooltip should appear when hovering cursor over _Chat Page_ icon.
- [ ] Tooltip should appear when hovering cursor over _Files Page_ icon.
- [ ] Tooltip should appear when hovering cursor over _Friends Page_ icon.
- [ ] Tooltip should appear when hovering cursor over _Settings Page_ icon.
- [ ] User can search within Settings by clicking into Settings Search Bar.
- [ ] Call controls should appear in Sidebar when User enters a call.

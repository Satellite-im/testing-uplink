# UI Test Coverage Matrix

This document provides a test coverage matrix of the Uplink features already automated within this testing framework. Items marked as [x] are already automated, and the ones not marked are pending to be automated in the next days. This list was implemented considering the Uplink Testing Checklist from [here](https://github.com/Satellite-im/Uplink/blob/dev/ui/docs/testing/uplink-checklist.md).

## **Functionality Checklist**

### **Overall functionalities**

- [x] Validate Alpha indicator is displayed along the application
- [x] Validate Nav bar menu is displayed on the screen with access to the main functionalities of the application

### **Registration / Login**

**PIN Creation**

- [x] Limits PIN to a maximum of 32 characters.
- [x] Requires PIN to be a minimum of 4 characters.
- [x] Shows an error if a user tries to enter with less than 4 characters.
- [x] Shows an error if a user enters an incorrect PIN.
- [x] Shows an error if a user attempts to proceed with an empty PIN.
- [x] Shows an error if the user enters a PIN with spaces
- [x] Display some indication of success when the user enters a valid PIN - Create Account button enabled.
- [x] Validate warning texts displayed on the screen alerting the user about the importance of the PIN

**Username**

- [x] Limits username to a maximum of 32 characters.
- [x] Requires a username to be at least 4 characters.
- [x] Shows an error if the user enters a username with less than 4 characters.
- [x] Shows an error if the user enters a username with more than 32 characters.
- [x] Shows an error if the user attempts to proceed with an empty username.
- [x] Shows an error if the user enters a username with non-alphanumeric characters
- [x] Shows error if User enters a username with spaces
- [x] Displays some indication of success when the user enters a valid username.
- [x] Welcome Screen is displayed after entering a valid PIN and username

**Profile Picture**

- [x] Profile picture chooser should closely resemble the shape and appearance of how the profile will be displayed in-app.
- [ ] Profile picture chooser should be responsive to multiple display sizes.
- [ ] Profile picture should indicate to the user that they can interact with it to add a profile picture.
      **CTA Button**
- [x] The register button should use a reusable component and only appear clickable when all required information is submitted and there are no errors on the page.

### **Chat Page**

**Landing page for New Accounts**

- [x] "No active chats, wanna make one?" with an option underneath to start one.
- [ ] Page indicator in the sidebar should indicate to the user they are on the Chat page.

**Current Chat**

- [x] Any message you send yourself should appear within a colored message bubble.
- [x] Any message received should appear with a grey bubble.
- [ ] The chat you are in should be highlighted in the sidebar.
- [x] User Profile Pic should appear next to their message and be up to date.
- [x] Username should appear above each message or bulk of messages sent or received.
- [x] Clicking the _Heart_ should add the friend to your _Favorites_.
- [x] Current chat should be displayed at the top of the list in the sidebar.
- [x] Timestamps should be updated in chat and sidebar. (now, then goes by minutes-hours-days)
- [ ] Clicking _Phone_ icon should open call modal.
- [ ] Chat should close if the user blocks the friend they are in the current chat with.
- [x] Typing indicator appears (if the user has that extension toggled on).
- [ ] Usernames are both displayed in the call modal.
- [x] Friends Username/Profile Pic/Status should be displayed at the top of the active chat.
- [x] Tooltip should appear for _Call_ button.
- [x] Tooltip should appear for _Video_ button.
- [x] Tooltip should appear for _Upload_ button.
- [x] Tooltip should appear for _Favorites_ button.
- [x] User can reply to a message by right+clicking and selecting in the context menu.
- [x] User can react to a message by right+clicking and selecting in the context menu.
- [x] User should enter chat at the bottom with the most recent messages.

### Calling & Video

- [ ] Call modal opens when the user starts a call.
- [ ] Tooltip should appear for the _End Call_ button.
- [ ] Tooltip should appear for the _Enable Camera_ button.
- [ ] Tooltip should appear for the _ScreenShare_ button.
- [ ] Call/Video sounds should mute when the user clicks _Silence_.
- [ ] User should be navigated to Settings when they click the _Settings_ button.
- [ ] Call should expand when a user enters _Fullscreen_.
- [ ] Pop-Out player should appear when the user enables it.
- [ ] While Pop-out is enabled, the original call should display _Media Detached_.

### **Friends**

**All Friends List**

- [x] Clicking Copy Code should copy the user's did key
- [x] There should be an input field for us to paste a did key or user#short_id.
- [ ] Friends are ordered alphabetically.
- [x] Profile picture should be next to username if a friend has one.
- [ ] Profile Picture should update if a friend changes it.
- [x] Online/Offline status should update when friends log in or off.
- [x] Tooltip should appear when hovering the cursor over _Unfriend_.
- [x] Tooltip should appear when hovering the cursor over _Block_.
- [x] Tooltip should appear when hovering the cursor over _All Friends_.
- [x] Tooltip should appear when hovering the cursor over _Pending_.
- [x] Tooltip should appear when hovering the cursor over _Blocked_.
- [x] Tooltip should appear when hovering the cursor over _Add_.
- [x] Tooltip should appear when hovering the cursor over _Chat_.
- [x] Clicking _Chat_ should navigate the user to active chat with that friend.
- [x] Friend Status should appear underneath the username.
- [x] Clicking _Unfriend_ should remove that person from your friend's list.
- [x] Clicking _Block_ should move that person to the blocked user's list.
- [ ] Scrollbar should appear when users scroll through the friend list.
- [x] User#short_id should appear after the friend's username.
- [x] Right+Clicking on a friend should bring up the context menu.
- [x] Friend should be added to Favorites when the user adds them with the context menu.
- [x] When the user clicks _Chat_ in the context menu, they should be navigated to active chat with that friend.
- [ ] When the user starts a call with the context menu, they should be navigated to an active call with that friend.
- [x] User should be able to remove a friend using the context menu.
- [x] User should also be able to block a friend by using the context menu.
- [x] Green indicator should appear when the user pastes a correct did key in the Add Friend input field.
- [x] Online status / Device indicator should appear next to the friend's profile pic. (This should appear anywhere a friend profile pic is throughout the entire app)

### Adding Friends

- [x] Search Bar should display _Username#0000_ when user is not clicked into it.
- [x] Error should appear when the user has less than 4 chars typed.
- [x] Search Input should display a green indicator when the user types more than 4 chars.
- [x] Request should appear under _Pending_ after sending it.
- [x] If the user cancels the request, the request should no longer appear in _Pending_.
- [x] Error should appear if a user sends 2nd friend request to the same person.
- [x] Error should appear when users try to add themselves.

**Pending Requests**

- [x] Pending requests view should display incoming and outgoing requests lists
- [x] Incoming Friend Request should have an _Deny_ or _Accept_ next it.
- [x] Profile Picture should appear with username next to it.
- [ ] Incoming requests should be ordered by _Most Relevant_.
- [x] Notification counter should display the correct amount of requests on _Pending_.
- [x] Notification counter should display the correct amount of requests on _Friends Page Button_
- [x] After accepting a friend request, the pending request should clear, and they should be added to the All Friends list.
- [x] After denying a friend request, the pending request should clear, and they should NOT be added to the All Friends list.
- [x] After canceling an outgoing friend request, the pending request should clear, and they should NOT be added to the All Friends list.
- [x] When the user clicks _Accept Incoming Request_ in the context menu, the request should be accepted, and the user should be added to the all-friends list.
- [x] When the user clicks _Deny Incoming Request_ in the context menu, the request should be denied, and the user should NOT be added to the all friends list.
- [x] When the user clicks _Cancel Outgoing Request_ in the context menu, the outgoing request should be canceled and removed from the outgoing list.

**Blocked Friends**

- [x] Blocked users should display a list of the blocked users
- [x] After selecting the "Unblock" button from someone on the blocked list, the user should be removed from the blocked list but should NOT be added to the All Friends list.
- [x] When the user clicks _Unblock_ in the context menu, the user should be removed from the blocked list but not added again to the all friends list.

### Files

- [x] Icon should open the Upload File Modal.
- [x] Preview should be shown for Uploaded Files.
- [ ] Folder should highlight when the user is dragging and dropping a file into it.
- [ ] Folder should also be highlighted when the user hovers the cursor.
- [x] Upload % should show when the user is uploading Files
- [x] Clicking the _Home_ button in the directory should take you to the Files Home page.
- [x] When the user clicks, the New Folder typing indicator should appear, and the user can start typing without clicking into the textbox first.
- [x] Right-clicking folder should open the context menu with the option to rename or delete.
- [ ] Scrollbar should appear when any Files are rendered off-screen.
- [x] Files Directory should show updated Folders name if Folder has been renamed.
- [ ] File Uploading should stop when the user hits _Cancel_.
- [ ] Size of the file should show underneath the preview.
- [ ] Amount of items/size of uploaded files should show underneath the Folder.
- [ ] Directory should be highlighted when the user hovers the cursor.
- [ ] Upload modal should show the file's path when the user is drag+dropping a file into the Modal.
- [ ] Clicking the X in the right corner of Upload Modal should close said Modal.
- [ ] Progress Bar should show the actual amount of Files uploaded.
- [x] Free Space should appear at the top of the Files Page.
- [x] Total Space should appear at the top of the Files Page.

### Settings

**Profile Page**

- [x] _Change Avatar_ should appear when the user hovers the cursor over Profile Pic.
- [x] _Change Banner_ should appear when the user hovers the cursor over the Banner area.
- [x] Clicking the Banner should open users local files browser.
- [x] Clicking the Profile Picture should open the user's local files browser.
- [x] Clicking _Edit_ should display input fields for username and status.
- [x] Error message should appear when the user tries to type a username longer than 32 characters.
- [x] Error message should appear when a user attempts to save a username with less than 4 characters.
- [x] Error message should appear when a user attempts to save a username with spaces.
- [x] Error message should appear when a user attempts to save a username with non-alphanumeric characters.
- [x] Error message should appear when the user tries to type a status message longer than 128 characters.
- [x] Assert placeholder texts are displayed right now on input fields
- [x] Validate text descriptions from settings sections

**General**

- [x] User should land in the General tab when entering Settings.
- [x] Text descriptions from the settings section should be displayed
- [x] User should be able to toggle _Uplink Overlay_.
- [x] User should be able to toggle _Splash Screen_.
- [x] Clicking Theme should open the Themes Dropdown.
- [x] Clicking _Reset Theme_ should set the theme back to default.
- [x] UI should change when the user sets a new theme.
- [x] User should be able to change the language by selecting from the Language Dropdown menu.
- [x] User should be able to switch back the language to English US by selecting from the Language Dropdown menu.

**Audio**

- [x] User should be able to toggle _Interface Sounds_ on and off.
- [x] User should be able to toggle _Media Sounds_ on and off.
- [x] User should be able to toggle _Call Timer_ on and off.
- [x] Text descriptions from the settings section should be displayed

**Extensions**

- [x] User should be able to toggle the placeholder on and off.
- [ ] Clicking _Open Extensions Folder_" should open the user's extension folder.
- [x] Text descriptions from the settings section should be displayed - Right now, only placeholders

**Notifications**

- [x] User should be able to grant permissions to receive notifications - nonfunctional yet
- [x] User should be able to enable notifications for incoming calls and messages
- [x] If the switch slider of enable notifications for incoming calls and messages is disabled, then the friends, messages, and settings notifications switches are disabled
- [x] If the switch slider of enable notifications for incoming calls and messages is enabled, then the friends, messages, and settings notifications switches are not blocked
- [x] User can enable notifications for friend requests
- [x] User can enable notifications for new messages
- [x] User can enable notifications for updates and important alerts
- [x] Text descriptions from the settings section should be displayed - Right now, only placeholders

**Developer**

- [x] Text descriptions from the settings section should be displayed - Right now, only placeholders
- [x] Clicking _Developer Mode_ should open the debugger
- [x] Clicking _Open Codebase_ should take the user to Github Codebase
- [x] Clicking _Test Notification_ should display a test notification from the OS triggered by the application
- [ ] Clicking _Open Cache_ should open the .Cache folder within Uplink.
- [ ] Clicking _Compress & Download Cache_ should compress the Users .Cache into a zip file.
- [ ] User can clear .Cache by clicking _Clear Cache_
- [x] Logs should save in a file when the user toggles on _Save Logs In A File_
- [x] Chat Sidebar should not appear when the user is in Settings
- [ ] Dev tools should appear when toggled on in the top right corner.

### Sidebar

**Basics**

- [x] Sidebar should persist through Chat, Files, and Friends pages.
- [x] Any active chats the user has created should appear in the sidebar.
- [x] Sidebar should be hidden when the user enters Settings.
- [x] Sidebar should display the user's favorite chats (If the user has any).
- [x] Users should be navigated to chat when they click a friend in their favorites.
- [x] Sidebar should display all of the user's chats with the most relevant ones at the top.
- [x] Notification bubble should appear on the Chat icon if the user has any.
- [x] Notification bubble should appear on the Friends icon if the user has any.
- [x] User can clear unread messages by right+clicking to open the context menu.
- [x] User can call a friend by right+clicking to open the context menu.
- [x] User can hide chat by right+clicking to open the context menu.
- [x] Tooltip should appear when hovering cursor over _Chat Page_ icon.
- [x] Tooltip should appear when hovering cursor over _Files Page_ icon.
- [x] Tooltip should appear when hovering cursor over _Friends Page_ icon.
- [x] Tooltip should appear when hovering cursor over _Settings Page_ icon.
- [x] User can search within Settings by clicking on Settings Search Bar.
- [x] Call controls should appear in the sidebar when the user enters a call.

import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
let chatsSidebarFirstUser = new ChatsSidebar("userA");

export default async function groupChatTests() {
  it("Chat User A - Create Group Chat button tooltip", async () => {
    await chatsSidebarFirstUser.hoverOnCreateGroupButton();
    await chatsSidebarFirstUser.sidebarCreateGroupChatTooltip.waitForDisplayed();
    await chatsSidebarFirstUser.sidebarCreateGroupChatTooltipText.toHaveTextContaining(
      "Create Group Chat"
    );
  });

  it("Chat User A - Click on Create Group Chat and close modal", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await chatsSidebarFirstUser.createGroupChatSection.waitForDisplayed();

    // Click again on create group chat and modal will be closed
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await chatsSidebarFirstUser.createGroupChatSection.waitForExist({
      reverse: true,
    });
  });

  xit("Chat User A - Create Group Chat Modal contents", async () => {});
  xit("Chat User A - Attempt to create group chat with empty name", async () => {});
  xit("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {});
  xit("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {});
  xit("Chat User A - Create group chat with no participants", async () => {});
  xit("Chat User A - Search bar - Look for non existing user", async () => {});
  xit("Chat User A - Create group chat with a valid participant", async () => {});
  xit("Chat User A - Change group name", async () => {});
  xit("Chat User A - Send a message in the group", async () => {});
  xit("Chat User A - Send a message with attachment in the group", async () => {});
  xit("Chat User A - Reply to message in the group", async () => {});
  xit("Chat User A - React to message in the group", async () => {});
  xit("Chat User A - Show participants in group", async () => {});
  xit("Chat User A - Add group to favorites", async () => {});
  xit("Chat User A - Remove group from favorites", async () => {});
  xit("Chat User A - Edit Group - Change name of the group", async () => {});
  xit("Chat User A - Edit Group - Attempt to change name to empty", async () => {});
  xit("Chat User A - Edit Group - Attempt to change name to have more than 64 chars", async () => {});
  xit("Chat User A - Edit Group - Attempt to change name to have non alphanumeric chars", async () => {});
  xit("Chat User A - Edit Group - Add a participant", async () => {});
  xit("Chat User A - Edit Group - Remove a participant", async () => {});
  xit("Chat User A - Sidebar - Clear unreads", async () => {});
  xit("Chat User A - Sidebar - Delete chat", async () => {});
  xit("Chat User A - Sidebar - Delete group", async () => {});
  xit("Chat User A - Sidebar - Leave group", async () => {});
}

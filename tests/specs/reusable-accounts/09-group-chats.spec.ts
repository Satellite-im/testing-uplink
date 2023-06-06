import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
import CreateGroupChat from "../../screenobjects/chats/CreateGroupChat";
let chatsSidebarFirstUser = new ChatsSidebar("userA");
let createGroupFirstUser = new CreateGroupChat("userA");

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
    await createGroupFirstUser.createGroupChatSection.waitForDisplayed();

    // Click again on create group chat and modal will be closed
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.createGroupChatSection.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Create Group Chat Modal contents", async () => {
    // Open modal to create group chat
    await chatsSidebarFirstUser.clickOnCreateGroupChat();
    await createGroupFirstUser.createGroupChatSection.waitForDisplayed();

    // Validate contents
    await expect(createGroupFirstUser.groupNameInput).toBeDisplayed();
    await expect(createGroupFirstUser.userSearchInput).toBeDisplayed();
    await expect(createGroupFirstUser.friendContainer).toBeDisplayed();
    await expect(createGroupFirstUser.friendIndicatorOnline).toBeDisplayed();
    await expect(createGroupFirstUser.friendUserName).toBeDisplayed();
    await expect(createGroupFirstUser.friendUserNameText).toHaveTextContaining(
      "ChatUserB"
    );
    await expect(createGroupFirstUser.createGroupChatButton).toBeDisplayed();
  });

  xit("Chat User A - Attempt to create group chat with empty name", async () => {});

  it("Chat User A - Attempt to create group chat with alphanumeric chars in name", async () => {
    await createGroupFirstUser.typeOnGroupName("&*!@#^&!@^#!");
    await createGroupFirstUser.createGroupInputError.toBeDisplayed();
    await createGroupFirstUser.createGroupInputErrorText.toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );
    await createGroupFirstUser.clearGroupNameInput();
  });

  it("Chat User A - Attempt to create group chat with more than 64 chars in name", async () => {
    await createGroupFirstUser.typeOnGroupName(
      "01234567890123456789012345678901234567890123456789012345678912345"
    );
    await createGroupFirstUser.createGroupInputError.toBeDisplayed();
    await createGroupFirstUser.createGroupInputErrorText.toHaveTextContaining(
      "Maximum of 64 characters exceeded."
    );
    await createGroupFirstUser.clearGroupNameInput();
  });

  xit("Chat User A - Create group chat with no participants", async () => {});

  it("Chat User A - Search bar - Look for non existing user", async () => {
    await createGroupFirstUser.typeOnUsersSearchInput("zzz");
    await expect(createGroupFirstUser.friendContainer).not.toExist();
    await createGroupFirstUser.clearUserSearchInput();
  });

  it("Chat User A - Create group chat with a valid participant", async () => {
    await createGroupFirstUser.typeOnGroupName("My First Group");
    await createGroupFirstUser.typeOnUsersSearchInput("ChatUserB");
    await createGroupFirstUser.selectUserFromList("ChatUserB");
    await createGroupFirstUser.clickOnCreateGroupChat();
  });

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

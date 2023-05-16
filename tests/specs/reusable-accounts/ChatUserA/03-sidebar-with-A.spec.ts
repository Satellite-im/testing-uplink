import { getUserKey } from "../../../helpers/commands";
import ChatsSidebar from "../../../screenobjects/chats/ChatsSidebar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";

export default async function sidebarWithUserA() {
  it("Unblock Chat User A and send friend request again", async () => {
    // Tests start in Chat Screen with User B
    await FriendsScreen.goToAllFriendsList();

    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB");
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Wait until Chat User B accepts friend request and sends a message", async () => {
    // Wait until user B accepts the friend request
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Go to chat with User B
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await ChatsSidebar.sidebarChatsUserInfo.waitForExist({ timeout: 30000 });
  });

  it("Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await expect(ChatsSidebar.sidebarChatsUserNameValue).toHaveTextContaining(
      "ChatUserB"
    );

    // Validate last message contents
    await expect(ChatsSidebar.sidebarChatsUserStatusValue).toHaveTextContaining(
      "Helloagain..."
    );

    // Validate number of unread messages is displayed on sidebar
    await expect(ChatsSidebar.sidebarChatsUserBadgeNumber).toHaveTextContaining(
      "1"
    );

    // Validate time ago displayed on sidebar
    await expect(
      ChatsSidebar.sidebarChatsUserBadgeTimeAgo
    ).toHaveTextContaining(/- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/);
  });

  xit("Sidebar - Context Menu - Clear Unreads", async () => {
    // Validate Sidebar shows Username, last message contents, time ago and number of messages
    // Validate Sidebar shows Username and only last message contents
  });

  xit("Sidebar - Context Menu - Hide chat", async () => {
    // Validate Sidebar shows Username, last message contents, time ago and number of messages
    // Validate Sidebar shows Username and only last message contents
  });

  xit("Sidebar - Context Menu - Delete chat", async () => {
    // Validate Sidebar shows Username, last message contents, time ago and number of messages
    // Validate Sidebar shows Username and only last message contents
  });

  xit("Sidebar - Hamburger button", async () => {
    // Validate Sidebar shows Username, last message contents, time ago and number of messages
    // Validate Sidebar shows Username and only last message contents
  });

  xit("Sidebar - Persists between different sections of the app", async () => {});
}

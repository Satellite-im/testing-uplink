import { getUserKey, loginWithTestUser } from "../../../helpers/commands";
import ChatsSidebar from "../../../screenobjects/chats/ChatsSidebar";
import ContextMenuSidebar from "../../../screenobjects/chats/ContextMenuSidebar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";

export default async function sidebarWithUserA() {
  it("Unblock Chat User A and send friend request again", async () => {
    // Temp functions
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();

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

    // Wait until message is received
    await ChatsSidebar.waitForReceivingMessageOnSidebar();
  });

  it("Sidebar - Any active chats user has created should appear in Sidebar", async () => {
    // Validate Sidebar shows Username
    await ChatsSidebar.validateUsernameDisplayed("ChatUserB");

    // Validate last message contents
    await ChatsSidebar.validateLastMessageDisplayed("Helloagain...");

    // Validate number of unread messages is displayed on sidebar
    await ChatsSidebar.validateNumberOfUnreadMessages("1");

    // Validate time ago displayed on sidebar
    await ChatsSidebar.validateLastMessageTimeAgo();
  });

  it("Sidebar - Context Menu - Clear Unreads", async () => {
    await ChatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await ContextMenuSidebar.selectChatsClearUnreads();
    await ChatsSidebar.validateNoUnreadMessages();
  });

  it("Sidebar - Context Menu - Hide chat", async () => {
    await ChatsSidebar.openContextMenuOnSidebar("ChatUserB");
    await ContextMenuSidebar.selectChatsHideChat();
    await ChatsSidebar.validateNoSidebarChatsAreDisplayed();
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

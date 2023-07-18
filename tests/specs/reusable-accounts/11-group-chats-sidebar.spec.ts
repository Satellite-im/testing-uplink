import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import ChatsSidebar from "../../screenobjects/chats/ChatsSidebar";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";
import Topbar from "../../screenobjects/chats/Topbar";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let chatsTopbarSecondUser = new Topbar(USER_B_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);

export default async function groupChatSidebarTests() {
  it("Group Chat - Add group to favorites", async () => {
    // Return control of execution to User A and leave Participants List screen
    await chatsTopbarFirstUser.switchToOtherUserWindow();
    await chatsTopbarFirstUser.clickOnTopbar();

    // Click on Favorites button for Group Chat
    await chatsTopbarFirstUser.addToFavorites();
    await chatsTopbarFirstUser.favorites.waitForExist();

    // Favorites Sidebar should be displayed and showing the name of the group added to Favorites
    await expect(chatsTopbarFirstUser.favoritesUserImage).toBeDisplayed();
    await expect(
      chatsTopbarFirstUser.favoritesUserIndicatorOnline
    ).toBeDisplayed();
    await expect(chatsTopbarFirstUser.favoritesUserName).toHaveTextContaining(
      "NEWNAMEGROUP"
    );
  });

  it("Group Chat - Remove group from favorites", async () => {
    // Remove user from favorites and ensure that Favorites bar is hidden now
    await chatsTopbarFirstUser.removeFromFavorites();
    await chatsTopbarFirstUser.favorites.waitForExist({ reverse: true });

    // Go to another chat conversation
    await chatsTopbarFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserB");
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  it("Group Chat - Send message to the group with User B", async () => {
    // Switch test execution control to User B and send message to the group
    await chatsTopbarSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.typeMessageOnInput("HelloGroup!");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsMessagesSecondUser.waitForMessageSentToExist("HelloGroup!");

    // Switch control to User A
    await chatsLayoutFirstUser.switchToOtherUserWindow();
  });

  it("Group Chat - Sidebar - Any new messages received in group should appear in Sidebar", async () => {
    // Validate Sidebar shows Group Name
    await chatsSidebarFirstUser.validateUsernameDisplayed("NewNameGroup");

    // Validate last message content from group is displayed on sidebar
    await chatsSidebarFirstUser.validateLastMessageDisplayed("HelloGroup!");

    // Validate number of unread messages from the group is displayed on sidebar
    await chatsSidebarFirstUser.validateNumberOfUnreadMessages("1");

    // Validate time ago is displayed on sidebar for group chat
    await chatsSidebarFirstUser.validateLastMessageTimeAgo();
  });
}

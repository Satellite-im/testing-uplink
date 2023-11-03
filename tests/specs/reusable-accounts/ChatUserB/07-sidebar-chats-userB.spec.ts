import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function sidebarChatsTestsUserB() {
  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();

    // Validate that button badge displays the number of incoming requests
    await friendsScreenFirstUser.validateFriendsButtonBadgeIsShown;
    const friendsButtonBadgeText =
      await friendsScreenFirstUser.getValueFromFriendsButtonBadge();
    await expect(friendsButtonBadgeText).toEqual("1");
  });

  it("Chat User B - Accept incoming request", async () => {
    // Accept incoming request
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserA");
    await friendsScreenFirstUser.acceptFriendRequestButton.waitForExist({
      reverse: true,
    });

    // Return to Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Chat User B - Send message to User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenFirstUser.clickOnChatWithFriend();
    await chatsLayoutFirstUser.validateChatLayoutIsShown();

    // Send message with markdown to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("__hello__");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("hello");
  });

  it("Chat User B - Validate message was received", async () => {
    // With User B - Wait until message is received
    await chatsMessagesFirstUser.waitForReceivingMessage("Hi...");
  });

  it("Chat User B - Sidebar - Wait for receiving a a new message", async () => {
    // With User B - Wait until message is received
    await chatsMessagesFirstUser.waitForReceivingMessage("Hi...");
    const latestMessage =
      await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(latestMessage).toHaveTextContaining("Hi...");
  });

  it("Chat User B - Sidebar - If user deletes chat on remote side, it will be removed on local side as well", async () => {
    // After user deletes chat conversation on remote side, chat is deleted on local side and Welcome Image displayed again
    await welcomeScreenFirstUser.skeletalUser.waitForExist();
  });
}

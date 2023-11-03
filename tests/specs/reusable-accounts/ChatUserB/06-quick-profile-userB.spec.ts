import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";

let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function quickProfileTestsUserB() {
  it("Chat User B - Send message to User A", async () => {
    await chatsInputFirstUser.clickOnInputBar();
    await chatsInputFirstUser.typeMessageOnInput("click...");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("click...");
  });

  it("Chat User B - Validate friendship was removed", async () => {
    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Chat User B - Validate that User A is now a friend", async () => {
    // With User B - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.hoverOnFriendsButton();
    await friendsScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();

    // Validate friend is now on all friends list
    await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User B - Send message to User B", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.validateChatWithFriendButtonIsShown();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenFirstUser.clickOnChatWithFriend();

    // Validate that Topbar is displayed
    await chatsTopbarFirstUser.validateTopbarExists();

    // Send message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Accepted...");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Accepted...");
  });

  it("Chat User B - Validate that User A blocked User B", async () => {
    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await chatsInputFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
    await friendsScreenFirstUser.waitUntilFriendIsRemoved("ChatUserA");
  });
}

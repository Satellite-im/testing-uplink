import "module-alias/register";
import { getUserKey, loginWithTestUser } from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import Messages from "@screenobjects/chats/Messages";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function mainChatsTestsUserB() {
  it("Chat User B - Login with account previously created", async () => {
    // Login with account previously created
    await loginWithTestUser();
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA", USER_A_INSTANCE);
    await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateOutgoingListIsShown();
    await friendsScreenFirstUser.validateOutgoingListIsNotEmpty();

    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Chat User B - Validate friend request was accepted", async () => {
    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();

    // Validate friend is now on all friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User B - Wait until the other user is connected", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.hoverOnChatWithFriendButton("ChatUserA");
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsTopbarFirstUser.validateTopbarExists();
  });

  it("Chat User B - Assert message received from Chat User A", async () => {
    // Validate message received from Chat User A
    await chatsMessagesFirstUser.waitForReceivingMessage("Testing...😀");

    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Testing...😀");
  });

  it("Chat User B - Validate Chat Message Group from remote user displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Chat User B - Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });
}

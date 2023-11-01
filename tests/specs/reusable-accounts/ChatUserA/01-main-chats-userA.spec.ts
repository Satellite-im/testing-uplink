import "module-alias/register";
import { loginWithTestUser } from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import EmojiSelector from "@screenobjects/chats/EmojiSelector";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Topbar from "@screenobjects/chats/Topbar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let emojiSelectorFirstUser = new EmojiSelector(USER_A_INSTANCE);
let favoritesSidebarFirstUser = new FavoritesSidebar(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function mainChatsTestsUserA() {
  it("Chat User A - Login with account previously created", async () => {
    // Login with account previously created
    await loginWithTestUser();
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Chat User A - Accept friend request from User A and go to chat button", async () => {
    // With User A - Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.hoverOnPendingListButton();
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserB");

    // Validate friend is now on all friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    await friendsScreenFirstUser.validateAllFriendsListIsNotEmpty();

    // Go to Chat with User B
    await friendsScreenFirstUser.chatWithFriendButton.click();
  });

  it("Chat User A - Chat screen displays Messages secured text displayed on top of conversation", async () => {
    await chatsTopbarFirstUser.validateTopbarExists();

    // Validate E2E message is displayed on top of chat
    const encryptedMessagesText =
      await chatsLayoutFirstUser.encryptedMessagesText;
    await encryptedMessagesText.waitForExist();
    await expect(encryptedMessagesText).toHaveTextContaining(
      "Messages are secured by end-to-end encryption and sent over a peer-to-peer network.",
    );
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 before typing a text", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Chars Counter on Input Bar displays the number of chars of text entered", async () => {
    // Validate Char counter increases after typing a text
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await expect(inputCharCounter).toHaveTextContaining("10");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Add emoji to the message to be sent", async () => {
    // Add emoji to the message to be sent
    await chatsInputFirstUser.clickOnEmojiButton();
    await emojiSelectorFirstUser.clickOnEmoji("😀");

    // Validate Char counter increases after adding an emoji to input bar
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("11");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Input Bar - Click on send button will send the message to the other user", async () => {
    // Send message to the other user
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Testing...😀");

    const textFromMessage =
      await chatsMessagesFirstUser.getFirstMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("Testing...😀");
  });

  it("Input Bar - Chars Counter on Input Bar displays 0/1024 after sending a message", async () => {
    // Validate Char counter is displayed on Input Bar and it displays 0/1024
    const inputCharCounter = await chatsInputFirstUser.inputCharCounterText;
    const inputCharMaxText = await chatsInputFirstUser.inputCharMaxText;
    await expect(inputCharCounter).toHaveTextContaining("0");
    await expect(inputCharMaxText).toHaveTextContaining("/1024");
  });

  it("Chat User A - Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const messageText = await chatsMessagesFirstUser.getFirstMessageSentText();
    await expect(messageText).toHaveTextContaining("Testing...😀");
  });

  it("Chat User A - Validate Chat Message Group displays username picture", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Topbar information", async () => {
    // Validate user image, username is displayed on Chat Topbar
    await chatsTopbarFirstUser.validateTopbarUserImage();
    await chatsTopbarFirstUser.validateTopbarUserName("ChatUserB");
  });

  it("Chat User A - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await chatsTopbarFirstUser.addToFavorites();
    await favoritesSidebarFirstUser.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image
    await favoritesSidebarFirstUser.validateFavoritesUserImage("ChatUserB");
  });

  it("Chat User A - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await chatsTopbarFirstUser.removeFromFavorites();
  });
}

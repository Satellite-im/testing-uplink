import { loginWithTestUser } from "../../../helpers/commands";
import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import ContextMenu from "../../../screenobjects/chats/ContextMenu";
import InputBar from "../../../screenobjects/chats/InputBar";
import Messages from "../../../screenobjects/chats/Messages";
import MessageGroup from "../../../screenobjects/chats/MessageGroup";
import ReplyPrompt from "../../../screenobjects/chats/ReplyPrompt";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";
let chatsContextMenuFirstUser = new ContextMenu("userA");
let chatsInputFirstUser = new InputBar("userA");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsMessageGroupsFirstUser = new MessageGroup("userA");
let chatsReplyPromptFirstUser = new ReplyPrompt("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

export default async function acceptRequest() {
  it("Load Chat User B account and go to Friends Screen", async () => {
    // Go to Friends Screen
    await loginWithTestUser();
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
  });

  it("Accept Friend Request received from Chat User A", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();
    await friendsScreenFirstUser.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
  });

  it("Wait until the other user is online", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);

    // Wait until Chat User A is online
    await chatsTopbarFirstUser.topbarIndicatorOnline.waitForDisplayed({
      timeout: 240000,
    });
  });

  it("Assert message received from Chat User A", async () => {
    await chatsMessagesFirstUser.waitForReceivingMessage("Testing...");
  });

  it("Validate Chat Message received contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const textFromMessage =
      await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Testing...");
  });

  it("Validate Chat Message Group from remote user displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapReceivedImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsFirstUser.getLastGroupWrapReceivedOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Reply popup - Validate contents and close it", async () => {
    await chatsMessagesFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionReply();

    // Validate contents of Reply Pop Up
    await expect(chatsReplyPromptFirstUser.replyPopUp).toBeDisplayed();
    await expect(
      chatsReplyPromptFirstUser.replyPopUpCloseButton
    ).toBeDisplayed();
    await expect(
      chatsReplyPromptFirstUser.replyPopUpHeader
    ).toHaveTextContaining("REPLYING TO:");
    await expect(
      chatsReplyPromptFirstUser.replyPopUpIndicatorOnline
    ).toBeDisplayed();
    await expect(
      chatsReplyPromptFirstUser.replyPopUpRemoteTextToReplyValue
    ).toHaveTextContaining("Testing...");
    await expect(chatsReplyPromptFirstUser.replyPopUpUserImage).toBeDisplayed();

    await chatsReplyPromptFirstUser.closeReplyModal();
    await chatsReplyPromptFirstUser.waitForReplyModalToNotExist();
  });

  it("Reply - Reply to a message", async () => {
    await chatsMessagesFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionReply();

    // Type a reply and sent it
    await chatsReplyPromptFirstUser.replyPopUp.waitForDisplayed();
    await chatsInputFirstUser.typeMessageOnInput("Myreply...");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsReplyPromptFirstUser.waitForReplyModalToNotExist();
  });

  it("Send Reply - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await chatsMessagesFirstUser.getLastReply();
    const replySentText = await chatsMessagesFirstUser.getLastReplyText();
    await expect(replySent).toBeDisplayed();
    await expect(replySentText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const message = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(message).toHaveTextContaining("Myreply...");
  });

  it("Send Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Send Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chats - Received Message with Attachment - Text Message contents", async () => {
    await chatsMessagesFirstUser.chatMessageFileEmbedRemote.waitForDisplayed({
      timeout: 240000,
    });
    // Validate text from message containing attachment
    const message = await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached...");
  });

  it("Chats - Received Message with Attachment - File Metadata", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta =
      await chatsMessagesFirstUser.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chats - Received Message with Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName =
      await chatsMessagesFirstUser.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chats - Received Message with Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon =
      await chatsMessagesFirstUser.getLastMessageReceivedFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chats - Received Message with Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesFirstUser.getLastMessageReceivedDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });

  it("Chats - Validate that second message was edited", async () => {
    // Validate that last message is "edited"
    await chatsMessagesFirstUser.waitForReceivingMessage("edited...", 240000);
  });

  it("Validate that only deleted message is no longer in conversation", async () => {
    // Ensure that message "three.." was deleted
    await chatsMessagesFirstUser.waitForMessageToBeDeleted("Three...", 30000);
  });
}

import { loginWithTestUser } from "../../helpers/commands";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import ContextMenu from "../../screenobjects/chats/ContextMenu";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";
import ReplyPrompt from "../../screenobjects/chats/ReplyPrompt";
import Topbar from "../../screenobjects/chats/Topbar";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";

describe("Two users at the same time - Chat User B", async () => {
  it("Load Chat User B account and go to Friends Screen", async () => {
    // Go to Friends Screen
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });

  it("Accept Friend Request received from Chat User A", async () => {
    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
  });

  it("Wait until the other user is online", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);

    // Wait until Chat User A is online
    await Topbar.topbarIndicatorOnline.waitForDisplayed({
      timeout: 240000,
    });
  });

  it("Assert message received from Chat User A", async () => {
    await Messages.chatMessage.waitForDisplayed({ timeout: 30000 });
    const textFromMessage = await Messages.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("testing...");
  });

  it("Validate Chat Message received contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await Messages.getLastMessageReceivedLocator();
    await expect(lastMessage).toBeDisplayed();
  });

  it("Validate Chat Message Group from remote user displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await Messages.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await Messages.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await Messages.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Reply popup - Validate contents and close it", async () => {
    await Messages.openContextMenuOnReceivedMessage();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOption(0);

    // Validate contents of Reply Pop Up
    await expect(ReplyPrompt.replyPopUp).toBeDisplayed();
    await expect(ReplyPrompt.replyPopUpCloseButton).toBeDisplayed();
    await expect(ReplyPrompt.replyPopUpHeader).toHaveTextContaining(
      "REPLYING TO:"
    );
    await expect(ReplyPrompt.replyPopUpIndicatorOnline).toBeDisplayed();
    await expect(
      ReplyPrompt.replyPopUpRemoteTextToReplyValue
    ).toHaveTextContaining("testing...");
    await expect(ReplyPrompt.replyPopUpUserImage).toBeDisplayed();

    await ReplyPrompt.closeReplyModal();
    await ReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Reply - Reply to a message", async () => {
    await Messages.openContextMenuOnReceivedMessage();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOption(0);

    // Type a reply and sent it
    await ReplyPrompt.replyPopUp.waitForDisplayed();
    await InputBar.typeMessageOnInput("myreply...");
    await InputBar.clickOnSendMessage();
    await ReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Send Reply - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await Messages.getLastReplySent();
    const replySentText = await Messages.getLastReplySentText();
    await expect(replySent).toBeDisplayed();
    await expect(replySentText).toHaveTextContaining("testing...");

    // Validate reply message sent appears as last message
    const textFromMessage = await Messages.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("myreply...");
  });

  it("Send Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await Messages.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Send Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await Messages.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await Messages.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chats - Received Message with Attachment - Text Message contents", async () => {
    await Messages.chatMessageFileEmbedRemote.waitForDisplayed({
      timeout: 240000,
    });
    // Validate text from message containing attachment
    const textFromMessage = await Messages.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("attached...");
  });

  it("Chats - Received Message with Attachment - File Metadata", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await Messages.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chats - Received Message with Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await Messages.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chats - Received Message with Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await Messages.getLastMessageReceivedFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chats - Received Message with Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await Messages.getLastMessageReceivedDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });

  it("Chats - Validate that second message was edited", async () => {
    // Validate that last message is "edited"
    await Messages.waitForReceivingMessage("edited...", 240000);
  });

  it("Validate that only deleted message is no longer in conversation", async () => {
    // Ensure that message "three.." was deleted
    await Messages.waitForMessageToBeDeleted("three...", 30000);
  });

  after(async () => {
    // Pause for 30 seconds before finishing execution
    await browser.pause(30000);
  });
});

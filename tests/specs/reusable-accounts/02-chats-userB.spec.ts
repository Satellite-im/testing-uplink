import { loginWithTestUser } from "../../helpers/commands";
import ChatScreen from "../../screenobjects/ChatScreen";
import FriendsScreen from "../../screenobjects/FriendsScreen";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";

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
    await FriendsScreen.waitUntilFriendRequestIsReceived(280000);
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
  });

  it("Wait until the other user is online", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await (await FriendsScreen.chatWithFriendButton).waitForExist();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    // Wait until Chat User A is online
    await (
      await ChatScreen.topbarIndicatorOnline
    ).waitForDisplayed({ timeout: 240000 });
  });

  it("Assert message received from Chat User A", async () => {
    await (await ChatScreen.chatMessage).waitForDisplayed({ timeout: 30000 });
    const textFromMessage = await ChatScreen.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("testing...");
  });

  it("Validate Chat Message received contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await ChatScreen.getLastMessageReceivedLocator();
    await expect(lastMessage).toBeDisplayed();
  });

  it("Validate Chat Message Group from remote user displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Validate Chat Message received displays timestamp and user who sent it", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await ChatScreen.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveText(
      /^ChatUserA - (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Reply popup - Validate contents and close it", async () => {
    await ChatScreen.openContextMenuOnReceivedMessage();
    await ChatScreen.selectContextOption(0);

    // Validate contents of Reply Pop Up
    await expect(await ChatScreen.replyPopUp).toBeDisplayed();
    await expect(await ChatScreen.replyPopUpCloseButton).toBeDisplayed();
    await expect(await ChatScreen.replyPopUpHeader).toHaveTextContaining(
      "REPLYING TO:"
    );
    await expect(await ChatScreen.replyPopUpIndicatorOnline).toBeDisplayed();
    await expect(
      await ChatScreen.replyPopUpRemoteTextToReplyValue
    ).toHaveTextContaining("testing...");
    await expect(await ChatScreen.replyPopUpUserImage).toBeDisplayed();

    await ChatScreen.closeReplyModal();
    await ChatScreen.waitForReplyModalToNotExist();
  });

  it("Reply - Reply to a message", async () => {
    await ChatScreen.openContextMenuOnReceivedMessage();
    await ChatScreen.selectContextOption(0);

    // Type a reply and sent it
    await (await ChatScreen.replyPopUp).waitForDisplayed();
    await ChatScreen.typeMessageOnInput("this is a reply");
    await ChatScreen.clickOnSendMessage();
    await ChatScreen.waitForReplyModalToNotExist();
  });

  it("Send Reply - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await ChatScreen.getLastReplySent();
    const replySentText = await ChatScreen.getLastReplySentText();
    await expect(replySent).toBeDisplayed();
    await expect(replySentText).toHaveTextContaining("testing...");

    // Validate reply message sent appears as last message
    const textFromMessage = await ChatScreen.getLastMessageSentText();
    await expect(textFromMessage).toHaveTextContaining("this is a reply");
  });

  it("Send Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /^ChatUserB - (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Send Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chats - Received Message with Attachment", async () => {
    await (
      await ChatScreen.chatMessageFileEmbedRemote
    ).waitForExist({
      timeout: 280000,
    });
  });

  it("Chats - Received Message with Attachment - Text Message contents", async () => {
    // Validate text from message containing attachment
    const textFromMessage = await ChatScreen.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining(
      "message with attachment"
    );
  });

  it("Chats - Received Message with Attachment - File Metadata", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await ChatScreen.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chats - Received Message with Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await ChatScreen.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chats - Received Message with Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await ChatScreen.getLastMessageReceivedFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chats - Received Message with Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await ChatScreen.getLastMessageReceivedDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });

  it("Chats - Validate that second message was edited", async () => {
    // Validate that last message is "edited"
    await ChatScreen.waitForReceivingMessage("edited...", 240000);
  });

  it("Validate that only deleted message is no longer in conversation", async () => {
    // Ensure that message three was deleted
    await ChatScreen.waitForMessageToBeDeleted("message three", 30000);
  });

  after(async () => {
    // Pause for 30 seconds before finishing execution
    await browser.pause(30000);
  });
});

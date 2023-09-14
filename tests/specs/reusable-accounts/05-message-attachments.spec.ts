import "module-alias/register";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
import ComposeAttachment from "@screenobjects/chats/ComposeAttachment";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
let chatsAttachmentFirstUser = new ComposeAttachment(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);

export default async function messageAttachmentsTests() {
  1033;
  it("Chat User A - Validate compose attachments contents", async () => {
    // Switch back to first user window to continue with test execution and clear input bar
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.clearInputBar();

    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFileFromLocalDisk(
      "./tests/fixtures/testfile.txt"
    );

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentFirstUser.composeAttachmentsFileEmbed.waitForDisplayed(
      { timeout: 30000 }
    );
    await chatsAttachmentFirstUser.composeAttachmentsFileIcon.waitForDisplayed();
    await chatsAttachmentFirstUser.composeAttachmentsFileInfo.waitForDisplayed();

    await chatsAttachmentFirstUser.composeAttachmentsFileNameText.waitForDisplayed();
  });

  it("Chat User A - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsAttachmentFirstUser.deleteFileOnComposeAttachment();
  });

  it("Chat User A - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFileFromLocalDisk(
      "./tests/fixtures/testfile.txt"
    );

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentFirstUser.composeAttachmentsFileEmbed.waitForDisplayed();

    // Type a text message and send it
    await chatsInputFirstUser.typeMessageOnInput("Attached");
    await chatsInputFirstUser.clickOnSendMessage();
  });

  it("Chat User A - Message Sent With Attachment - Text contents", async () => {
    await chatsMessagesFirstUser.chatMessageFileEmbedLocal.waitForExist();
    // Validate text from message containing attachment
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached");
  });

  it("Chat User A - Message Sent With Attachment - File Meta Data", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await chatsMessagesFirstUser.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");
  });

  it("Chat User A - Message Sent With Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await chatsMessagesFirstUser.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");
  });

  it("Chat User A - Message Sent With Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await chatsMessagesFirstUser.getLastMessageSentFileIcon();
    await fileIcon.waitForDisplayed();
  });

  it("Chat User A - Message Sent With Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesFirstUser.getLastMessageSentDownloadButton();
    await fileDownloadButton.waitForDisplayed();

    // With User B - Validate that message with attachment was received
    await chatsInputSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.clickOnInputBar();
    await chatsMessagesSecondUser.chatMessageFileEmbedRemote.waitForExist();
  });

  it("Chat User B - Received Message with Attachment - Text Message contents", async () => {
    // Validate text from message containing attachment
    const message = await chatsMessagesSecondUser.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached");
  });

  it("Chat User B - Received Message with Attachment - File Metadata", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta =
      await chatsMessagesSecondUser.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");
  });

  it("Chat User B - Received Message with Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName =
      await chatsMessagesSecondUser.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");
  });

  it("Chat User B - Received Message with Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon =
      await chatsMessagesSecondUser.getLastMessageReceivedFileIcon();
    await fileIcon.waitForDisplayed();
  });

  it("Chat User B - Received Message with Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesSecondUser.getLastMessageReceivedDownloadButton();
    await fileDownloadButton.waitForDisplayed();
  });
}

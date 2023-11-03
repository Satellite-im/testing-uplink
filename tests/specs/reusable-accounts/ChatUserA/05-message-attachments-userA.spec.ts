import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ComposeAttachment from "@screenobjects/chats/ComposeAttachment";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
let chatsAttachmentFirstUser = new ComposeAttachment(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);

export default async function messageAttachmentsTestsUserA() {
  it("Send files from Browse Files - Message sent with attachments is shown on remote side", async () => {
    // Ensure that message sent with attached file is displayed on remote side
    // With User A- Validate that message with attachment was received
    await chatsInputFirstUser.clickOnInputBar();
    await chatsMessagesFirstUser.chatMessageFileEmbedRemote.waitForExist();

    // Validate text from message containing attachment
    const message = await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached");
  });

  it("Send Files on Chats - Validate compose attachments contents", async () => {
    // Continue with test execution and clear input bar
    await chatsInputFirstUser.clearInputBar();

    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFileFromLocalDisk(
      "./tests/fixtures/testfile.txt",
    );

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentFirstUser.composeAttachmentsFileEmbed.waitForExist();
    await chatsAttachmentFirstUser.composeAttachmentsFileIcon.waitForExist();
    await chatsAttachmentFirstUser.composeAttachmentsFileNameText.waitForExist();
  });

  it("Send Files on Chats - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsAttachmentFirstUser.deleteFileOnComposeAttachment();
  });

  it("Receive Files on Chats - Received Message with Attachment - Text Message contents", async () => {
    // With User B - Validate that message with attachment was received
    await chatsInputFirstUser.clickOnInputBar();
    await chatsMessagesFirstUser.chatMessageFileEmbedRemote.waitForExist();

    // Validate text from message containing attachment
    const message = await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached2");
  });

  it("Receive Files on Chats - Attachment File Contents", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta =
      await chatsMessagesFirstUser.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");

    // Validate filename is displayed correctly on last chat message sent
    const fileName =
      await chatsMessagesFirstUser.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");

    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon =
      await chatsMessagesFirstUser.getLastMessageReceivedFileIcon();
    await fileIcon.waitForExist();

    // Validate file download button is displayed correctly on last chat message sent
    await chatsMessagesFirstUser.hoverOnLastFileReceived();
    const fileDownloadButton =
      await chatsMessagesFirstUser.getLastMessageReceivedDownloadButton();
    await fileDownloadButton.waitForExist();
  });

  it("Chat Messages with Files - Remote user can download file received", async () => {
    // Download latest image file received
    await chatsMessagesFirstUser.downloadLastReceivedFile(".txt");
  });
}

import ComposeAttachment from "../../screenobjects/chats/ComposeAttachment";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";
let chatsAttachmentFirstUser = new ComposeAttachment("userA");
let chatsInputFirstUser = new InputBar("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsMessagesSecondUser = new Messages("userB");

export default async function messageAttachmentsTests() {
  it("Chat User A - Validate compose attachments contents", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFile("./tests/fixtures/testfile.txt");

    // Get the full path of file selected
    const expectedPath = await chatsInputFirstUser.getFilePath(
      "./tests/fixtures/testfile.txt"
    );

    // Validate contents on Compose Attachments are displayed
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileEmbed
    ).toBeDisplayed();
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileIcon
    ).toBeDisplayed();
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileInfo
    ).toBeDisplayed();

    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileNameText
    ).toHaveTextContaining(expectedPath);
  });

  it("Chat User A - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsAttachmentFirstUser.deleteFileOnComposeAttachment();

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentFirstUser.composeAttachmentsFileEmbed.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFile("./tests/fixtures/testfile.txt");

    // Validate contents on Compose Attachments are displayed
    await expect(
      chatsAttachmentFirstUser.composeAttachmentsFileEmbed
    ).toBeDisplayed();

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
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chat User A - Message Sent With Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesFirstUser.getLastMessageSentDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();

    // With User B - Validate that message with attachment was received
    await chatsMessagesSecondUser.chatMessageFileEmbedRemote.waitForDisplayed();
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
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chat User B - Received Message with Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesSecondUser.getLastMessageReceivedDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });
}

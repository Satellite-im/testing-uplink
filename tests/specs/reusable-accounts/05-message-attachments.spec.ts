import { launchAppForChatUserB } from "../../helpers/commands";
import ComposeAttachment from "../../screenobjects/chats/ComposeAttachment";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";

export default async function messageAttachmentsTests() {
  it("Chat User A - Validate compose attachments contents", async () => {
    // Click on upload button and attach a file to compose attachment
    await InputBar.uploadFile("./tests/fixtures/logo.jpg");

    // Get the full path of file selected
    const expectedPath = await InputBar.getFilePath(
      "./tests/fixtures/logo.jpg"
    );

    // Validate contents on Compose Attachments are displayed
    await expect(ComposeAttachment.composeAttachmentsFileEmbed).toBeDisplayed();
    await expect(ComposeAttachment.composeAttachmentsFileIcon).toBeDisplayed();
    await expect(ComposeAttachment.composeAttachmentsFileInfo).toBeDisplayed();

    await expect(
      ComposeAttachment.composeAttachmentsFileNameText
    ).toHaveTextContaining(expectedPath);
  });

  it("Chat User A - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await ComposeAttachment.deleteFileOnComposeAttachment();

    // Validate contents on Compose Attachments are displayed
    await ComposeAttachment.composeAttachmentsFileEmbed.waitForExist({
      reverse: true,
    });
  });

  it("Chat User A - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await InputBar.uploadFile("./tests/fixtures/logo.jpg");

    // Validate contents on Compose Attachments are displayed
    await expect(ComposeAttachment.composeAttachmentsFileEmbed).toBeDisplayed();

    // Type a text message and send it
    await InputBar.typeMessageOnInput("Attached...");
    await InputBar.clickOnSendMessage();
  });

  it("Chat User A - Message Sent With Attachment - Text contents", async () => {
    // Validate text from message containing attachment
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached...");
  });

  it("Chat User A - Message Sent With Attachment - File Meta Data", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await Messages.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chat User A - Message Sent With Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await Messages.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chat User A - Message Sent With Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await Messages.getLastMessageSentFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chat User A - Message Sent With Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await Messages.getLastMessageSentDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });

  it("Chat User B - Received Message with Attachment - Text Message contents", async () => {
    await launchAppForChatUserB();
    await Messages.chatMessageFileEmbedRemote.waitForDisplayed({
      timeout: 240000,
    });
    // Validate text from message containing attachment
    const message = await Messages.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached...");
  });

  it("Chat User B - Received Message with Attachment - File Metadata", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await Messages.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("7.75 kB");
  });

  it("Chat User B - Received Message with Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await Messages.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("logo.jpg");
  });

  it("Chat User B - Received Message with Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await Messages.getLastMessageReceivedFileIcon();
    await expect(fileIcon).toBeDisplayed();
  });

  it("Chat User B - Received Message with Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await Messages.getLastMessageReceivedDownloadButton();
    await expect(fileDownloadButton).toBeDisplayed();
  });
}

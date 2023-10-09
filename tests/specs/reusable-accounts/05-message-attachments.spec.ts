import "module-alias/register";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
import ComposeAttachment from "@screenobjects/chats/ComposeAttachment";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import SendFiles from "@screenobjects/chats/SendFiles";
let chatsAttachmentFirstUser = new ComposeAttachment(USER_A_INSTANCE);
let chatsAttachmentSecondUser = new ComposeAttachment(USER_B_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let filesScreenSecondUser = new FilesScreen(USER_B_INSTANCE);
let sendFilesSecondUser = new SendFiles(USER_B_INSTANCE);

export default async function messageAttachmentsTests() {
  it("Send files from Browse Files - No files are displayed on modal and user can close modal", async () => {
    // Go to upload button and then select Browser Files (from Uplink storage)
    await chatsInputSecondUser.openUploadFilesFromStorage();
    await sendFilesSecondUser.validateSendFilesModalIsShown();
    await sendFilesSecondUser.validateNoFilesAvailableIsShown();

    // Click outside of the modal to close it, in this case on the send message button
    await sendFilesSecondUser.clickOnCloseModal();
  });

  it("Send files from Browse Files - Upload an image on Files to run tests", async () => {
    // Go to Files Screen andand upload an image file before starting
    await chatsInputSecondUser.goToFiles();
    await filesScreenSecondUser.validateFilesScreenIsShown();
    await filesScreenSecondUser.uploadFile("./tests/fixtures/banner.jpg");
    await filesScreenSecondUser.validateFileOrFolderExist("banner.jpg");
  });

  it("Send files from Browse Files - Upload a txt file in a different folder", async () => {
    // Create a new folder and enter on it
    await filesScreenSecondUser.createFolder("testfolder01");
    await filesScreenSecondUser.validateFileOrFolderExist("testfolder01");
    await filesScreenSecondUser.clickOnFileOrFolder("testfolder01");

    // Upload one time the testfile.txt file
    await filesScreenSecondUser.uploadFile("./tests/fixtures/testfile.txt");
    await filesScreenSecondUser.validateFileOrFolderExist("testfile.txt");

    // Return to chat screen
    await filesScreenSecondUser.goToMainScreen();
  });

  it("Send files from Browse Files - Thumbnails are displayed on modal", async () => {
    // Open modal to send files from storage
    await chatsInputSecondUser.openUploadFilesFromStorage();
    await sendFilesSecondUser.validateSendFilesModalIsShown();

    // Go to Home Folder and validate thumbnail for file is shown
    await sendFilesSecondUser.clickOnHomeFolderCrumb();
    await filesScreenSecondUser.validateFileOrFolderExist("banner.jpg");
    await sendFilesSecondUser.validateThumbnailIsShown("banner.jpg");
  });

  it("Send files from Browse Files - User can navigate through folders and to home", async () => {
    // Navigate to testfolder01 and ensure thumbnail from testfile.txt is shown
    await sendFilesSecondUser.clickOnFileOrFolder("testfolder01");
    await filesScreenSecondUser.validateFileOrFolderExist("testfile.txt");
    await sendFilesSecondUser.validateThumbnailIsShown("testfile.txt");

    // Navigate to home folder and ensure thumbnail from banner.jpg is shown
    await sendFilesSecondUser.clickOnHomeFolderCrumb();
    await filesScreenSecondUser.validateFileOrFolderExist("banner.jpg");
    await sendFilesSecondUser.validateThumbnailIsShown("banner.jpg");
  });

  it("Send files from Browse Files - Go to files button redirects to Files", async () => {
    // Click on Go To Files button and validate User is redirected to Files Screen
    await sendFilesSecondUser.clickOnGoToFiles();
    await filesScreenSecondUser.validateFilesScreenIsShown();

    // Return to Chat Screen and open again the Send Files from Storage modal
    await filesScreenSecondUser.goToMainScreen();
    await chatsInputSecondUser.openUploadFilesFromStorage();
    await sendFilesSecondUser.validateSendFilesModalIsShown();
  });

  it("Send files from Browse Files - Send files button shows 0/8 files if no files are selected", async () => {
    // When no files are selected, Send Files button should display 0/8 File(s)
    await sendFilesSecondUser.validateSendFilesButtonText("Send 0/8 File(s)");
  });

  // Skipped since there is a bug reported for this button
  xit("Send files from Browse Files - User cannot click on send files if no files are selected", async () => {
    // Click on Send files button without any files selected
    await sendFilesSecondUser.clickOnSendFilesButton();

    // Ensure that Send Files Modal is still displayed
    await sendFilesSecondUser.validateSendFilesModalIsShown();
  });

  it("Send files from Browse Files - Can select files from different folders and send files counter is updated", async () => {
    // Select one file from root folder and ensure Send Files button displays 1/8 File(s)
    await sendFilesSecondUser.clickOnFileOrFolder("banner.jpg");
    await sendFilesSecondUser.validateSendFilesButtonText("Send 1/8 File(s)");

    // Go to testfolder01 and select one file from this folder
    await sendFilesSecondUser.clickOnFileOrFolder("testfolder01");
    await filesScreenSecondUser.validateFileOrFolderExist("testfile.txt");
    await sendFilesSecondUser.clickOnFileOrFolder("testfile.txt");

    // Ensure Send Files button displays 2/8 File(s)
    await sendFilesSecondUser.validateSendFilesButtonText("Send 2/8 File(s)");

    // Remove selection from file and valiate Send Files button displays 1/8 File(s)
    await sendFilesSecondUser.clickOnFileOrFolder("testfile.txt");
    await sendFilesSecondUser.validateSendFilesButtonText("Send 1/8 File(s)");
  });

  it("Send files from Browse Files - Files selected will be displayed on Compose Attachment", async () => {
    // Send the only image file previously selected
    await sendFilesSecondUser.clickOnSendFilesButton();

    // Validate file is displayed on Compose Attachment
    // Validate compose attachments displays the files to be uploaded before sending the message
    await chatsAttachmentSecondUser.validateComposeAttachmentsIsShown();

    // Obtain the list of attachments added to Compose Attachment
    await chatsAttachmentSecondUser.validateAttachmentWithFileNameIsAdded(
      "banner.jpg",
      true
    );
  });

  it("Send files from Browse Files - Message sent with attachments is shown on local side", async () => {
    // Type a text message and send it
    await chatsInputSecondUser.typeMessageOnInput("Attached");
    await chatsInputSecondUser.clickOnSendMessage();

    // Ensure that message sent with attached file is displayed on local side
    await chatsMessagesSecondUser.waitForMessageSentToExist("Attached");

    await chatsMessagesSecondUser.chatMessageFileEmbedLocal.waitForExist();

    // Validate text from message containing attachment
    const textMessage = await chatsMessagesSecondUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached");
  });

  // Skipping since it needs more work to be done
  xit("Chat Messages with Files - Local user can download file sent", async () => {
    // Download latest image file received
    await chatsMessagesSecondUser.downloadLastSentFile("downloaded.jpg");
  });

  it("Send files from Browse Files - Message sent with attachments is shown on remote side", async () => {
    // Ensure that message sent with attached file is displayed on remote side
    // With User A- Validate that message with attachment was received
    await chatsMessagesFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.clickOnInputBar();
    await chatsMessagesFirstUser.chatMessageFileEmbedRemote.waitForExist();

    // Validate text from message containing attachment
    const message = await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached");
  });

  // Skipping since it needs more work to be done
  xit("Chat Messages with Files - Remote user can download file received", async () => {
    // Download latest image file received
    await chatsMessagesFirstUser.downloadLastReceivedFile("downloaded.jpg");
  });

  it("Send Files on Chats - Validate compose attachments contents", async () => {
    // Switch to User B window
    await chatsInputSecondUser.switchToOtherUserWindow();

    // Continue with test execution and clear input bar
    await chatsInputSecondUser.clearInputBar();

    // Click on upload button and attach a file to compose attachment
    await chatsInputSecondUser.uploadFileFromLocalDisk(
      "./tests/fixtures/testfile.txt"
    );

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentSecondUser.composeAttachmentsFileEmbed.waitForExist();
    await chatsAttachmentSecondUser.composeAttachmentsFileIcon.waitForExist();
    await chatsAttachmentSecondUser.composeAttachmentsFileNameText.waitForExist();
  });

  it("Send Files on Chats - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsAttachmentSecondUser.deleteFileOnComposeAttachment();
  });

  it("Send File from Add Files - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.uploadFileFromLocalDisk(
      "./tests/fixtures/testfile.txt"
    );

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentFirstUser.composeAttachmentsFileEmbed.waitForExist();

    // Type a text message and send it
    await chatsInputFirstUser.typeMessageOnInput("Attached2");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Attached2");
  });

  it("Send Files on Chats - Message Sent With Attachment - Text contents", async () => {
    await chatsMessagesFirstUser.chatMessageFileEmbedLocal.waitForExist();

    // Validate text from message containing attachment
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached2");
  });

  it("Send Files on Chats - Message Sent With Attachment - File Meta Data", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await chatsMessagesFirstUser.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");
  });

  it("Send Files on Chats - Message Sent With Attachment - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName = await chatsMessagesFirstUser.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");
  });

  it("Send Files on Chats - Message Sent With Attachment - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await chatsMessagesFirstUser.getLastMessageSentFileIcon();
    await fileIcon.waitForExist();
  });

  it("Send Files on Chats - Message Sent With Attachment - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesFirstUser.getLastMessageSentDownloadButton();
    await fileDownloadButton.waitForExist();
  });

  it("Receive Files on Chats - Received Message with Attachment - Text Message contents", async () => {
    // With User B - Validate that message with attachment was received
    await chatsMessagesSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.clickOnInputBar();
    await chatsMessagesSecondUser.chatMessageFileEmbedRemote.waitForExist();

    // Validate text from message containing attachment
    const message = await chatsMessagesSecondUser.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached2");
  });

  it("Receive Files on Chats - File Metadata", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta =
      await chatsMessagesSecondUser.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");
  });

  it("Receive Files on Chats - File Name", async () => {
    // Validate filename is displayed correctly on last chat message sent
    const fileName =
      await chatsMessagesSecondUser.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");
  });

  it("Receive Files on Chats - File Icon", async () => {
    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon =
      await chatsMessagesSecondUser.getLastMessageReceivedFileIcon();
    await fileIcon.waitForExist();
  });

  it("Receive Files on Chats - Download Button", async () => {
    // Validate file download button is displayed correctly on last chat message sent
    const fileDownloadButton =
      await chatsMessagesSecondUser.getLastMessageReceivedDownloadButton();
    await fileDownloadButton.waitForExist();
  });
}

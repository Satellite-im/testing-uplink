require("module-alias/register");
import ComposeAttachment from "@screenobjects/chats/ComposeAttachment";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/MessageLocal";
import SendFiles from "@screenobjects/chats/SendFiles";
import Topbar from "@screenobjects/chats/Topbar";
import {
  activateFirstApplication,
  activateSecondApplication,
} from "@helpers/commands";
const chatsAttachmentFirstUser = new ComposeAttachment();
const chatsInputFirstUser = new InputBar();
const chatsMessagesFirstUser = new Messages();
const chatsTopbarFirstUser = new Topbar();
const filesScreenFirstUser = new FilesScreen();
const sendFilesFirstUser = new SendFiles();

export default async function messageAttachmentsTests() {
  it("Send files from Browse Files - No files are displayed on modal and user can close modal", async () => {
    // Go to upload button and then select Browser Files (from Uplink storage)
    await chatsInputFirstUser.clickOnUploadFile();
    await chatsInputFirstUser.selectUploadFromStorage();
    await sendFilesFirstUser.validateSendFilesModalIsShown();
    await sendFilesFirstUser.validateNoFilesAvailableIsShown();

    // Click outside of the modal to close it, in this case on the send message button
    await sendFilesFirstUser.clickOnCloseModal();
  });

  it("Send files from Browse Files - Upload an image on Files to run tests", async () => {
    // Go to Files Screen andand upload an image file before starting
    await chatsInputFirstUser.goToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();
    await filesScreenFirstUser.uploadFile("./tests/fixtures/banner.jpg");
    await filesScreenFirstUser.validateFileOrFolderExist("banner.jpg");
  });

  it("Send files from Browse Files - Upload a txt file in a different folder", async () => {
    // Create a new folder and enter on it
    await filesScreenFirstUser.createFolder("testfolder01");
    await filesScreenFirstUser.validateFileOrFolderExist("testfolder01");
    await filesScreenFirstUser.clickOnFileOrFolder("testfolder01");

    // Upload one time the testfile.txt file
    await filesScreenFirstUser.uploadFile("./tests/fixtures/testfile.txt");
    await filesScreenFirstUser.validateFileOrFolderExist("testfile.txt");

    // Return to chat screen
    await filesScreenFirstUser.goToMainScreen();
  });

  it("Send files from Browse Files - Thumbnails are displayed on modal", async () => {
    // Open modal to send files from storage
    await chatsTopbarFirstUser.validateTopbarExists();
    await chatsInputFirstUser.clickOnUploadFile();
    await chatsInputFirstUser.selectUploadFromStorage();
    await sendFilesFirstUser.validateSendFilesModalIsShown();

    // Go to Home Folder and validate thumbnail for file is shown
    await sendFilesFirstUser.clickOnHomeFolderCrumb();
    await filesScreenFirstUser.validateFileOrFolderExist("banner.jpg");
    await sendFilesFirstUser.validateThumbnailIsShown("banner.jpg");
  });

  it("Send files from Browse Files - User can navigate through folders and to home", async () => {
    // Navigate to testfolder01 and ensure thumbnail from testfile.txt is shown
    await sendFilesFirstUser.clickOnFolder("testfolder01");
    await filesScreenFirstUser.validateFileOrFolderExist("testfile.txt");

    // Navigate to home folder and ensure thumbnail from banner.jpg is shown
    await sendFilesFirstUser.clickOnHomeFolderCrumb();
    await filesScreenFirstUser.validateFileOrFolderExist("banner.jpg");
    await sendFilesFirstUser.validateThumbnailIsShown("banner.jpg");
  });

  it("Send files from Browse Files - Go to files button redirects to Files", async () => {
    // Click on Go To Files button and validate User is redirected to Files Screen
    await sendFilesFirstUser.clickOnGoToFiles();
    await filesScreenFirstUser.validateFilesScreenIsShown();

    // Return to Chat Screen and open again the Send Files from Storage modal
    await filesScreenFirstUser.goToMainScreen();
    await chatsTopbarFirstUser.validateTopbarExists();
    await chatsInputFirstUser.clickOnUploadFile();
    await chatsInputFirstUser.selectUploadFromStorage();
    await sendFilesFirstUser.validateSendFilesModalIsShown();
  });

  it("Send files from Browse Files - Send files button shows 0/8 files if no files are selected", async () => {
    // When no files are selected, Send Files button should display 0/8 File(s)
    await sendFilesFirstUser.validateSendFilesButtonText("Send 0/8 File(s)");
  });

  it("Send files from Browse Files - User cannot click on send files if no files are selected", async () => {
    // Click on Send files button without any files selected
    await sendFilesFirstUser.clickOnSendFilesButton();

    // Ensure that Send Files Modal is still displayed
    await sendFilesFirstUser.validateSendFilesModalIsShown();
  });

  it("Send files from Browse Files - Send files counter is updated", async () => {
    // Select one file from root folder and ensure Send Files button displays 1/8 File(s)
    await sendFilesFirstUser.clickOnFile("banner.jpg");
    await sendFilesFirstUser.validateSendFilesButtonText("Send 1/8 File(s)");
  });

  it("Send files from Browse Files - Files selected will be displayed on Compose Attachment", async () => {
    // Send the only image file previously selected
    await sendFilesFirstUser.clickOnSendFilesButton();

    // Validate file is displayed on Compose Attachment
    // Validate compose attachments displays the files to be uploaded before sending the message
    await chatsAttachmentFirstUser.validateComposeAttachmentsIsShown();

    // Obtain the list of attachments added to Compose Attachment
    await chatsAttachmentFirstUser.validateAttachmentWithFileNameIsAdded(
      "banner.jpg",
      true,
    );
  });

  it("Send files from Browse Files - Message sent with attachments is shown on local side", async () => {
    // Type a text message and send it
    await chatsInputFirstUser.typeMessageOnInput("Attached");
    await chatsInputFirstUser.pressEnterKeyOnInputBar();

    // Ensure that message sent with attached file is displayed on local side
    await chatsMessagesFirstUser.waitForMessageSentToExist("Attached");

    await chatsMessagesFirstUser.chatMessageFileEmbedLocal.waitForExist();

    // Validate text from message containing attachment
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached");
  });

  it("Send files from Browse Files - Message sent with attachments is shown on remote side", async () => {
    // Ensure that message sent with attached file is displayed on remote side
    // With User A- Validate that message with attachment was received
    await activateFirstApplication();
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
    await chatsAttachmentFirstUser.clickOnDeleteAttachment(0);
  });

  it("Send File from Add Files - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInputFirstUser.uploadFileFromLocalDisk(
      "./tests/fixtures/testfile.txt",
    );

    // Validate contents on Compose Attachments are displayed
    await chatsAttachmentFirstUser.composeAttachmentsFileEmbed.waitForExist();

    // Type a text message and send it
    await chatsInputFirstUser.typeMessageOnInput("Attached2");
    await chatsInputFirstUser.pressEnterKeyOnInputBar();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Attached2");
  });

  it("Send Files on Chats - Message Sent With Attachment - Attachment Contents", async () => {
    await chatsMessagesFirstUser.chatMessageFileEmbedLocal.waitForExist();

    // Validate text from message containing attachment
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached2");

    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await chatsMessagesFirstUser.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");

    // Validate filename is displayed correctly on last chat message sent
    const fileName = await chatsMessagesFirstUser.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");

    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await chatsMessagesFirstUser.getLastMessageSentFileIcon();
    await fileIcon.waitForExist();

    // Validate file download button is displayed correctly on last chat message sent
    await chatsMessagesFirstUser.hoverOnLastFileSent();
    const fileDownloadButton =
      await chatsMessagesFirstUser.getLastMessageSentDownloadButton();
    await fileDownloadButton.waitForExist();
  });

  it("Chat Messages with Files - Local user can download file sent", async () => {
    // Download latest image file received
    await chatsMessagesFirstUser.downloadLastSentFile(".txt");
  });

  it("Receive Files on Chats - Received Message with Attachment - Text Message contents", async () => {
    // With User B - Validate that message with attachment was received
    await activateSecondApplication();
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

require("module-alias/register");
import ComposeAttachment from "@screenobjects/chats/ComposeAttachment";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import SendFiles from "@screenobjects/chats/SendFiles";
import Topbar from "@screenobjects/chats/Topbar";
import {
  launchFirstApplication,
  launchSecondApplication,
} from "@helpers/commands";
const chatsAttachment = new ComposeAttachment();
const chatsInput = new InputBar();
const chatsTopbar = new Topbar();
const filesScreen = new FilesScreen();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();
const sendFiles = new SendFiles();

export default async function messageAttachmentsTests() {
  it("Send files from Browse Files - No files are displayed on modal and user can close modal", async () => {
    // Go to upload button and then select Browser Files (from Uplink storage)
    await chatsInput.clickOnUploadFile();
    await chatsInput.selectUploadFromStorage();
    await sendFiles.validateSendFilesModalIsShown();
    await sendFiles.validateNoFilesAvailableIsShown();

    // Click outside of the modal to close it, in this case on the send message button
    await sendFiles.clickOnCloseModal();
  });

  it("Send files from Browse Files - Upload an image on Files to run tests", async () => {
    // Go to Files Screen andand upload an image file before starting
    await chatsInput.goToFiles();
    await filesScreen.validateFilesScreenIsShown();
    await filesScreen.uploadFile("./tests/fixtures/banner.jpg");
    await filesScreen.validateFileOrFolderExist("banner.jpg");
  });

  it("Send files from Browse Files - Upload a txt file in a different folder", async () => {
    // Create a new folder and enter on it
    await filesScreen.createFolder("testfolder01");
    await filesScreen.validateFileOrFolderExist("testfolder01");
    await filesScreen.clickOnFileOrFolder("testfolder01");

    // Upload one time the testfile.txt file
    await filesScreen.uploadFile("./tests/fixtures/testfile.txt");
    await filesScreen.validateFileOrFolderExist("testfile.txt");

    // Return to chat screen
    await filesScreen.goToMainScreen();
  });

  it("Send files from Browse Files - Thumbnails are displayed on modal", async () => {
    // Open modal to send files from storage
    await chatsTopbar.validateTopbarExists();
    await chatsInput.clickOnUploadFile();
    await chatsInput.selectUploadFromStorage();
    await sendFiles.validateSendFilesModalIsShown();

    // Go to Home Folder and validate thumbnail for file is shown
    await sendFiles.clickOnHomeFolderCrumb();
    await filesScreen.validateFileOrFolderExist("banner.jpg");
    await sendFiles.validateThumbnailIsShown("banner.jpg");
  });

  it("Send files from Browse Files - User can navigate through folders and to home", async () => {
    // Navigate to testfolder01 and ensure thumbnail from testfile.txt is shown
    await sendFiles.clickOnFolder("testfolder01");
    await filesScreen.validateFileOrFolderExist("testfile.txt");

    // Navigate to home folder and ensure thumbnail from banner.jpg is shown
    await sendFiles.clickOnHomeFolderCrumb();
    await filesScreen.validateFileOrFolderExist("banner.jpg");
    await sendFiles.validateThumbnailIsShown("banner.jpg");
  });

  it("Send files from Browse Files - Go to files button redirects to Files", async () => {
    // Click on Go To Files button and validate User is redirected to Files Screen
    await sendFiles.clickOnGoToFiles();
    await filesScreen.validateFilesScreenIsShown();

    // Return to Chat Screen and open again the Send Files from Storage modal
    await filesScreen.goToMainScreen();
    await chatsTopbar.validateTopbarExists();
    await chatsInput.clickOnUploadFile();
    await chatsInput.selectUploadFromStorage();
    await sendFiles.validateSendFilesModalIsShown();
  });

  it("Send files from Browse Files - Send files button shows 0/8 files if no files are selected", async () => {
    // When no files are selected, Send Files button should display 0/8 File(s)
    await sendFiles.validateSendFilesButtonText("Send 0/8 File(s)");
  });

  it("Send files from Browse Files - User cannot click on send files if no files are selected", async () => {
    // Click on Send files button without any files selected
    await sendFiles.clickOnSendFilesButton();

    // Ensure that Send Files Modal is still displayed
    await sendFiles.validateSendFilesModalIsShown();
  });

  it("Send files from Browse Files - Send files counter is updated", async () => {
    // Select one file from root folder and ensure Send Files button displays 1/8 File(s)
    await sendFiles.clickOnFile("banner.jpg");
    await sendFiles.validateSendFilesButtonText("Send 1/8 File(s)");
  });

  it("Send files from Browse Files - Files selected will be displayed on Compose Attachment", async () => {
    // Send the only image file previously selected
    await sendFiles.clickOnSendFilesButton();

    // Validate file is displayed on Compose Attachment
    // Validate compose attachments displays the files to be uploaded before sending the message
    await chatsAttachment.validateComposeAttachmentsIsShown();

    // Obtain the list of attachments added to Compose Attachment
    await chatsAttachment.validateAttachmentWithFileNameIsAdded(
      "banner.jpg",
      true,
    );
  });

  it("Send files from Browse Files - Message sent with attachments is shown on local side", async () => {
    // Type a text message and send it
    await chatsInput.typeMessageOnInput("Attached");
    await chatsInput.pressEnterKeyOnInputBar();

    // Ensure that message sent with attached file is displayed on local side
    await messageLocal.waitForMessageSentToExist("Attached");

    await messageLocal.chatMessageFileEmbedLocal.waitForExist();

    // Validate text from message containing attachment
    const textMessage = await messageLocal.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached");
  });

  it("Send files from Browse Files - Message sent with attachments is shown on remote side", async () => {
    // Ensure that message sent with attached file is displayed on remote side
    // With User A- Validate that message with attachment was received
    await launchFirstApplication();
    await chatsInput.clickOnInputBar();
    await messageRemote.chatMessageFileEmbedRemote.waitForExist();

    // Validate text from message containing attachment
    const message = await messageRemote.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached");
  });

  it("Send Files on Chats - Validate compose attachments contents", async () => {
    // Continue with test execution and clear input bar
    await chatsInput.clearInputBar();

    // Click on upload button and attach a file to compose attachment
    await chatsInput.uploadFileFromLocalDisk("./tests/fixtures/testfile.txt");

    // Validate contents on Compose Attachments are displayed
    await chatsAttachment.composeAttachmentsFileEmbed.waitForExist();
    await chatsAttachment.composeAttachmentsFileIcon.waitForExist();
    await chatsAttachment.composeAttachmentsFileNameText.waitForExist();
  });

  it("Send Files on Chats - Delete attachment before sending the message", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsAttachment.clickOnDeleteAttachment(0);
  });

  it("Send File from Add Files - Select a file and send message with attachment", async () => {
    // Click on upload button and attach a file to compose attachment
    await chatsInput.uploadFileFromLocalDisk("./tests/fixtures/testfile.txt");

    // Validate contents on Compose Attachments are displayed
    await chatsAttachment.composeAttachmentsFileEmbed.waitForExist();

    // Type a text message and send it
    await chatsInput.typeMessageOnInput("Attached2");
    await chatsInput.pressEnterKeyOnInputBar();
    await messageLocal.waitForMessageSentToExist("Attached2");
  });

  it("Send Files on Chats - Message Sent With Attachment - Attachment Contents", async () => {
    await messageLocal.chatMessageFileEmbedLocal.waitForExist();

    // Validate text from message containing attachment
    const textMessage = await messageLocal.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Attached2");

    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await messageLocal.getLastMessageSentFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");

    // Validate filename is displayed correctly on last chat message sent
    const fileName = await messageLocal.getLastMessageSentFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");

    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await messageLocal.getLastMessageSentFileIcon();
    await fileIcon.waitForExist();

    // Validate file download button is displayed correctly on last chat message sent
    await messageLocal.hoverOnLastFileSent();
    const fileDownloadButton =
      await messageLocal.getLastMessageSentDownloadButton();
    await fileDownloadButton.waitForExist();
  });

  it("Chat Messages with Files - Local user can download file sent", async () => {
    // Download latest image file received
    await messageLocal.downloadLastSentFile(".txt");
  });

  it("Receive Files on Chats - Received Message with Attachment - Text Message contents", async () => {
    // With User B - Validate that message with attachment was received
    await launchSecondApplication();
    await chatsInput.clickOnInputBar();
    await messageRemote.chatMessageFileEmbedRemote.waitForExist();

    // Validate text from message containing attachment
    const message = await messageRemote.getLastMessageReceivedText();
    await expect(message).toHaveTextContaining("Attached2");
  });

  it("Receive Files on Chats - Attachment File Contents", async () => {
    // Validate file metadata is displayed correctly on last chat message sent
    const fileMeta = await messageRemote.getLastMessageReceivedFileMeta();
    await expect(fileMeta).toHaveTextContaining("47 B");

    // Validate filename is displayed correctly on last chat message sent
    const fileName = await messageRemote.getLastMessageReceivedFileName();
    await expect(fileName).toHaveTextContaining("testfile.txt");

    // Validate file icon is displayed correctly on last chat message sent
    const fileIcon = await messageRemote.getLastMessageReceivedFileIcon();
    await fileIcon.waitForExist();

    // Validate file download button is displayed correctly on last chat message sent
    await messageRemote.hoverOnLastFileReceived();
    const fileDownloadButton =
      await messageRemote.getLastMessageReceivedDownloadButton();
    await fileDownloadButton.waitForExist();
  });

  it("Chat Messages with Files - Remote user can download file received", async () => {
    // Download latest image file received
    await messageRemote.downloadLastReceivedFile(".txt");
  });
}

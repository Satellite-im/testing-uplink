import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ComposeAttachment from "@screenobjects/chats/ComposeAttachment";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import SendFiles from "@screenobjects/chats/SendFiles";
let chatsAttachmentFirstUser = new ComposeAttachment(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let sendFilesFirstUser = new SendFiles(USER_A_INSTANCE);

export default async function messageAttachmentsTestsUserB() {
  it("Send files from Browse Files - No files are displayed on modal and user can close modal", async () => {
    // Go to upload button and then select Browser Files (from Uplink storage)
    await chatsInputFirstUser.openUploadFilesFromStorage();
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
    await chatsInputFirstUser.openUploadFilesFromStorage();
    await sendFilesFirstUser.validateSendFilesModalIsShown();

    // Go to Home Folder and validate thumbnail for file is shown
    await sendFilesFirstUser.clickOnHomeFolderCrumb();
    await filesScreenFirstUser.validateFileOrFolderExist("banner.jpg");
    await sendFilesFirstUser.validateThumbnailIsShown("banner.jpg");
  });

  // Skipping test because it takes too much time for execution
  xit("Send files from Browse Files - User can navigate through folders and to home", async () => {
    // Navigate to testfolder01 and ensure thumbnail from testfile.txt is shown
    await sendFilesFirstUser.clickOnFileOrFolder("testfolder01");
    await filesScreenFirstUser.validateFileOrFolderExist("testfile.txt");
    await sendFilesFirstUser.validateThumbnailIsShown("testfile.txt");

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
    await chatsInputFirstUser.openUploadFilesFromStorage();
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
    await sendFilesFirstUser.clickOnFileOrFolder("banner.jpg");
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
}

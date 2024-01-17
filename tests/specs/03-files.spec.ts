require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
const chatsSidebar = new ChatsSidebar();
const filesScreen = new FilesScreen();
const friendsScreen = new FriendsScreen();

export default async function filesTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Files Screen
    await friendsScreen.goToFiles();
    await filesScreen.waitForIsShown(true);

    // Validate Pre Release Indicator
    await filesScreen.prereleaseIndicator.waitForExist();
    const prereleaseIndicatorText = await filesScreen.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback",
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await filesScreen.chatsButton.waitForExist();
    await filesScreen.filesButton.waitForExist();
    await filesScreen.friendsButton.waitForExist();
    await filesScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await chatsSidebar.sidebar.waitForExist();
    await chatsSidebar.chatSearchInput.waitForExist();
  });

  it("Validate Files Info is displayed in screen", async () => {
    await filesScreen.filesInfo.waitForExist();
    await filesScreen.filesInfoCurrentSizeLabel.waitForExist();
    await filesScreen.filesInfoCurrentSizeValue.waitForExist();
    await filesScreen.filesInfoMaxSizeLabel.waitForExist();
    await filesScreen.filesInfoMaxSizeValue.waitForExist();
  });

  it("Validate Files Breadcrumbs are displayed in screen", async () => {
    await filesScreen.filesBreadcrumbs.waitForExist();
    await filesScreen.crumbHomeDir.waitForExist();
  });

  it("Validate add folder and file buttons are displayed in screen", async () => {
    await filesScreen.addFolderButton.waitForExist();
    await filesScreen.uploadFileButton.waitForExist();
  });

  // Skipping test failing on CI
  xit("Validate tooltips for add folder or file buttons are displayed", async () => {
    // Validate New Folder button tooltip
    await filesScreen.hoverOnNewFolderButton();

    const addFolderTooltipText = await filesScreen.addFolderTooltipText;
    await expect(addFolderTooltipText).toHaveTextContaining("New Folder");

    // Validate Upload button tooltip
    await filesScreen.hoverOnUploadButton();
    const uploadFileTooltipText = await filesScreen.uploadFileTooltipText;
    await expect(uploadFileTooltipText).toHaveTextContaining("Upload");
  });

  it("Create a new folder and enter to it", async () => {
    await filesScreen.createFolder("testfolder01");
    await filesScreen.validateFileOrFolderExist("testfolder01");
    await filesScreen.clickOnFileOrFolder("testfolder01");
  });

  it("Create a subfolder inside the previous folder created and enter into it", async () => {
    await filesScreen.createFolder("testfolder02");
    await filesScreen.validateFileOrFolderExist("testfolder02");
    await filesScreen.clickOnFileOrFolder("testfolder02");
  });

  it("Click in the Folder button to take you to the selected folder", async () => {
    await filesScreen.clickOnFolderCrumb("testfolder01");
    const currentFolder = await filesScreen.getCurrentFolder();
    await expect(currentFolder).toEqual("testfolder01");
  });

  it("Click in the Home button should take you to Home folder", async () => {
    await filesScreen.clickOnHomeFolderCrumb();
    const currentFolder = await filesScreen.getCurrentFolder();
    await expect(currentFolder).toEqual("Home");
  });

  it("Upload file - Click on add file and select file", async () => {
    // Upload logo.jpg file
    await filesScreen.uploadFile("./tests/fixtures/logo.jpg");
  });

  // Skipped since file used for testing it shows the dialog for not enough time needed to validate this modal
  xit("Upload file - Validate progress indicator", async () => {
    // Validate progress % and filename displayed correctly
    const progressText = await filesScreen.getProgressUploadPercentage();
    await expect(progressText).toHaveTextContaining("% Uploaded");

    const fileNameProgress = await filesScreen.getProgressUploadFilename();
    await expect(fileNameProgress).toHaveTextContaining("logo.jpg");
  });

  it("Upload file - Progress indicator is closed and file appears on files list", async () => {
    // Wait until progress indicator disappears

    await filesScreen.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
    });

    // Once that progress indicator disappears, validate that file is loaded
    await filesScreen.validateFileOrFolderExist("logo.jpg");
  });

  it("Context Menu - Folder - Rename", async () => {
    // Open context menu for testfolder01 and select the first option "Rename"
    await filesScreen.openFilesContextMenu("testfolder01");
    await filesScreen.clickOnFolderRename();

    // Set the new name for the folder
    await filesScreen.updateNameFolder("newname");
    await filesScreen.validateFileOrFolderExist("newname");
  });

  it("Context Menu - Folder - Delete", async () => {
    // Open context menu for newname folder and select the second option "Delete"
    await filesScreen.openFilesContextMenu("newname");
    await filesScreen.clickOnFolderDelete();

    // Ensure that folder deleted does not exist anymore
    await filesScreen.validateFileOrFolderNotExist("newname");
  });

  it("Context Menu - File - Rename", async () => {
    // Open context menu for logo.jpg file and select the first option "Rename"
    await filesScreen.openFilesContextMenu("logo.jpg");
    await filesScreen.clickOnFilesRename();

    // Set the new name for the file
    await filesScreen.updateNameFile("newname", ".jpg");
    await filesScreen.validateFileOrFolderExist("newname.jpg");
  });

  it("Context Menu - File - Download", async () => {
    // Open context menu for newname.jpg and select the second option "Download"
    await filesScreen.openFilesContextMenu("newname.jpg");
    await filesScreen.downloadFile(".jpg");
  });

  it("Context Menu - File - Delete", async () => {
    // Open context menu for logo.jpg file and select the second option "Delete"
    await filesScreen.openFilesContextMenu("newname.jpg");
    await filesScreen.clickOnFilesDelete();

    // Ensure that file deleted does not exist anymore
    await filesScreen.validateFileOrFolderNotExist("newname.jpg");
  });

  it("Files - File Size Indicators without files shows GB Max and 0 bytes as current space", async () => {
    const filesInfoMaxSizeLabel = await filesScreen.filesInfoMaxSizeLabel;
    const filesInfoMaxSizeValue = await filesScreen.filesInfoMaxSizeValue;
    const filesInfoCurrentSizeLabel =
      await filesScreen.filesInfoCurrentSizeLabel;
    const filesInfoCurrentSizeValue =
      await filesScreen.filesInfoCurrentSizeValue;

    await expect(filesInfoMaxSizeLabel).toHaveTextContaining("Max Size:");
    await expect(filesInfoMaxSizeValue).toHaveTextContaining("GB");
    await expect(filesInfoCurrentSizeLabel).toHaveTextContaining(
      "Used Space:",
    );
    await expect(filesInfoCurrentSizeValue).toHaveTextContaining("0 bytes");
  });

  it("Files - File Size Indicators after uploading a file are updated", async () => {
    // Upload app-macos.zip file
    await filesScreen.uploadFile("./tests/fixtures/app-macos.zip");

    // Wait until progress indicator disappears
    await filesScreen.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
      timeout: 60000,
    });

    // Once that progress indicator disappears, validate that file is loaded
    await filesScreen.validateFileOrFolderExist("app-macos.zip", 30000);

    // Finally, ensure that file size indicators are updated
    const filesInfoMaxSizeLabel = await filesScreen.filesInfoMaxSizeLabel;
    const filesInfoMaxSizeValue = await filesScreen.filesInfoMaxSizeValue;
    const filesInfoCurrentSizeLabel =
      await filesScreen.filesInfoCurrentSizeLabel;
    const filesInfoCurrentSizeValue =
      await filesScreen.filesInfoCurrentSizeValue;
    await expect(filesInfoMaxSizeLabel).toHaveTextContaining("Max Size:");
    await expect(filesInfoMaxSizeValue).toHaveTextContaining("GB");
    await expect(filesInfoCurrentSizeLabel).toHaveTextContaining(
      "Used Space:",
    );
    await expect(filesInfoCurrentSizeValue).toHaveTextContaining("13.2 MB");
  });

  it("Files - File is renamed when uploading a file with existing file name", async () => {
    // Upload app-macos.zip file again
    await filesScreen.uploadFile("./tests/fixtures/app-macos.zip");

    // Wait until progress indicator disappears
    await filesScreen.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
      timeout: 60000,
    });

    // Once that progress indicator disappears, validate that file is loaded and is automatically renamed to avoid name conflicts
    await filesScreen.validateFileOrFolderExist("app-macos (1).zip", 30000);
  });

  it("Files - Attempt to rename a file with existing file name", async () => {
    // Open context menu for app-macos (1).zip file and select the option "Rename"
    await filesScreen.openFilesContextMenu("app-macos (1).zip");
    await filesScreen.clickOnFilesRename();

    // Attempt to set the new name for the file as app-macos.zip and wait for error toast notification to be closed
    await filesScreen.typeOnFileNameInput("app-macos");
    await filesScreen.waitUntilNotificationIsClosed();

    // Type the previous filename for app-macos (1) so it can keep the original name. Ensure that file still exists in Screen
    await filesScreen.typeOnFileNameInput("app-macos (1)");
    await filesScreen.validateFileOrFolderExist("app-macos (1).zip", 60000);
  });

  it("Files - Attempt to create a folder with empty name", async () => {
    // Click on Create Folder button, wait for input to be displayed and hit enter on keyboard
    await filesScreen.createEmptyNameFolder();

    // Validate that error message is displayed
    await filesScreen.inputError.waitForExist();
    const inputErrorText = await filesScreen.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 1 character.",
    );

    // Click again on Create Folder button to cancel operation
    await filesScreen.addFolderButton.click();
  });

  it("Files - Attempt to create a folder with existing folder name", async () => {
    // First, create a folder named "testfolder01"
    await filesScreen.createFolder("testfolder01");
    await filesScreen.validateFileOrFolderExist("testfolder01");

    // Click on Create Folder and type the existing folder name "testfolder01"
    await filesScreen.clickOnCreateFolder();
    await filesScreen.typeOnFolderNameInput("testfolder01");

    // Wait until error toast notification is closed and type a valid name for the new folder
    await filesScreen.waitUntilNotificationIsClosed();
    await filesScreen.typeOnFolderNameInput("testfolder02");

    // Ensure that new folder was created with name "testfolder02"
    await filesScreen.validateFileOrFolderExist("testfolder02");
  });

  it("Files - Attempt to rename a folder with existing folder name", async () => {
    // Open context menu for testfolder02 and select the first option "Rename"
    await filesScreen.openFilesContextMenu("testfolder02");
    await filesScreen.clickOnFolderRename();

    // Attempt to change the name of testfolder02 to existing folder name testfolder01
    await filesScreen.typeOnFolderNameInput("testfolder01");

    // Wait until error toast notification is closed and type the existing folder name for testfolder02
    await filesScreen.waitUntilNotificationIsClosed();
    await filesScreen.typeOnFolderNameInput("testfolder02");
    await filesScreen.validateFileOrFolderExist("testfolder02");
  });
}

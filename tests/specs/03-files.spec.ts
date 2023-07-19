import FilesScreen from "../screenobjects/files/FilesScreen";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);

export default async function files() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Files Screen
    await friendsScreenFirstUser.goToFiles();
    await filesScreenFirstUser.waitForIsShown(true);

    // Validate Pre Release Indicator
    await filesScreenFirstUser.prereleaseIndicator.waitForDisplayed();
    await expect(
      filesScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await filesScreenFirstUser.chatsButton.waitForExist();
    await filesScreenFirstUser.filesButton.waitForExist();
    await filesScreenFirstUser.friendsButton.waitForExist();
    await filesScreenFirstUser.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await filesScreenFirstUser.chatSearchInput.waitForDisplayed();
    await filesScreenFirstUser.sidebar.waitForDisplayed();
    await filesScreenFirstUser.sidebarChildren.waitForDisplayed();
    await filesScreenFirstUser.sidebarSearch.waitForDisplayed();
  });

  it("Validate Files Info is displayed in screen", async () => {
    await filesScreenFirstUser.filesInfo.waitForDisplayed();
    await filesScreenFirstUser.filesInfoCurrentSizeLabel.waitForDisplayed();
    await filesScreenFirstUser.filesInfoCurrentSizeValue.waitForDisplayed();
    await filesScreenFirstUser.filesInfoMaxSizeLabel.waitForDisplayed();
    await filesScreenFirstUser.filesInfoMaxSizeValue.waitForDisplayed();
  });

  it("Validate Files Breadcrumbs are displayed in screen", async () => {
    await filesScreenFirstUser.filesBreadcrumbs.waitForDisplayed();
    await filesScreenFirstUser.crumb.waitForDisplayed();
  });

  it("Validate add folder and file buttons are displayed in screen", async () => {
    await filesScreenFirstUser.addFolderButton.waitForDisplayed();
    await filesScreenFirstUser.uploadFileButton.waitForDisplayed();
  });

  it("Validate tooltips for add folder or file buttons are displayed", async () => {
    // Validate New Folder button tooltip
    await filesScreenFirstUser.hoverOnNewFolderButton();
    await filesScreenFirstUser.addFolderTooltip.waitForExist();
    await expect(
      filesScreenFirstUser.addFolderTooltipText
    ).toHaveTextContaining("New Folder");

    // Validate Upload button tooltip
    await filesScreenFirstUser.hoverOnUploadButton();
    await filesScreenFirstUser.uploadFileTooltip.waitForExist();
    await expect(
      filesScreenFirstUser.uploadFileTooltipText
    ).toHaveTextContaining("Upload");
  });

  it("Create a new folder and enter to it", async () => {
    await filesScreenFirstUser.createFolder("testfolder01");
    await filesScreenFirstUser.validateFileOrFolderExist("testfolder01");
    await filesScreenFirstUser.clickOnFileOrFolder("testfolder01");
  });

  it("Create a subfolder inside the previous folder created and enter into it", async () => {
    await filesScreenFirstUser.createFolder("testfolder02");
    await filesScreenFirstUser.validateFileOrFolderExist("testfolder02");
    await filesScreenFirstUser.clickOnFileOrFolder("testfolder02");
  });

  it("Click in the Folder button to take you to the selected folder", async () => {
    await filesScreenFirstUser.clickOnFolderCrumb("testfolder01");
    const currentFolder = await filesScreenFirstUser.getCurrentFolder();
    await expect(currentFolder).toEqual("testfolder01");
  });

  it("Click in the Home button should take you to Home folder", async () => {
    await filesScreenFirstUser.clickOnHomeFolderCrumb();
    const currentFolder = await filesScreenFirstUser.getCurrentFolder();
    await expect(currentFolder).toEqual("Home");
  });

  it("Upload file - Click on add file and select file", async () => {
    // Upload logo.jpg file
    await filesScreenFirstUser.uploadFile("./tests/fixtures/logo.jpg");
  });

  // Skipped since file used for testing it shows the dialog for not enough time needed to validate this modal
  xit("Upload file - Validate progress indicator", async () => {
    // Validate progress % and filename displayed correctly
    const progressText =
      await filesScreenFirstUser.getProgressUploadPercentage();
    await expect(progressText).toHaveTextContaining("% Uploaded");

    const fileNameProgress =
      await filesScreenFirstUser.getProgressUploadFilename();
    await expect(fileNameProgress).toHaveTextContaining("logo.jpg");
  });

  it("Upload file - Progress indicator is closed and file appears on files list", async () => {
    // Wait until progress indicator disappears

    await filesScreenFirstUser.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
    });

    // Once that progress indicator disappears, validate that file is loaded
    await filesScreenFirstUser.validateFileOrFolderExist("logo.jpg");
  });

  it("Context Menu - Folder - Rename", async () => {
    // Open context menu for testfolder01 and select the first option "Rename"
    await filesScreenFirstUser.openFilesContextMenu("testfolder01");
    await filesScreenFirstUser.clickOnFolderRename();

    // Set the new name for the folder
    await filesScreenFirstUser.updateNameFileFolder("newname");
    await filesScreenFirstUser.validateFileOrFolderExist("newname");
  });

  it("Context Menu - Folder - Delete", async () => {
    // Open context menu for newname folder and select the second option "Delete"
    await filesScreenFirstUser.openFilesContextMenu("newname");
    await filesScreenFirstUser.clickOnFolderDelete();

    // Ensure that folder deleted does not exist anymore
    await filesScreenFirstUser.validateFileOrFolderNotExist("newname");
  });

  // Skipping tests on files due to rename issue
  xit("Context Menu - File - Rename", async () => {
    // Open context menu for logo.jpg file and select the first option "Rename"
    await filesScreenFirstUser.openFilesContextMenu("logo.jpg");
    await filesScreenFirstUser.clickOnFilesRename();

    // Set the new name for the file
    await filesScreenFirstUser.updateNameFileFolder("newname", ".jpg");
    await filesScreenFirstUser.validateFileOrFolderExist("newname.jpg");
  });

  // Needs research on how to implement on Windows
  xit("Context Menu - File - Download", async () => {
    // Open context menu for newname.jpg and select the second option "Download"
    await filesScreenFirstUser.openFilesContextMenu("newname.jpg");
    await filesScreenFirstUser.downloadFile("saved.jpg");
  });

  it("Context Menu - File - Delete", async () => {
    // Open context menu for logo.jpg file and select the second option "Delete"
    await filesScreenFirstUser.openFilesContextMenu("logo.jpg");
    await filesScreenFirstUser.clickOnFilesDelete();

    // Ensure that file deleted does not exist anymore
    await filesScreenFirstUser.validateFileOrFolderNotExist("logo.jpg");
  });

  it("Files - File Size Indicators without files show 1 GB Max and 0 bytes as current space", async () => {
    await expect(
      filesScreenFirstUser.filesInfoMaxSizeLabel
    ).toHaveTextContaining("Max Size:");
    await expect(
      filesScreenFirstUser.filesInfoMaxSizeValue
    ).toHaveTextContaining("1 GB");
    await expect(
      filesScreenFirstUser.filesInfoCurrentSizeLabel
    ).toHaveTextContaining("Current Space:");
    await expect(
      filesScreenFirstUser.filesInfoCurrentSizeValue
    ).toHaveTextContaining("0 bytes");
  });

  it("Files - File Size Indicators after uploading a file are updated", async () => {
    // Upload app-macos.zip file
    await filesScreenFirstUser.uploadFile("./tests/fixtures/app-macos.zip");

    // Wait until progress indicator disappears
    await filesScreenFirstUser.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
    });

    // Once that progress indicator disappears, validate that file is loaded
    await filesScreenFirstUser.validateFileOrFolderExist("app-macos.zip");

    // Finally, ensure that file size indicators are updated
    await expect(
      filesScreenFirstUser.filesInfoMaxSizeLabel
    ).toHaveTextContaining("Max Size:");
    await expect(
      filesScreenFirstUser.filesInfoMaxSizeValue
    ).toHaveTextContaining("1 GB");
    await expect(
      filesScreenFirstUser.filesInfoCurrentSizeLabel
    ).toHaveTextContaining("Current Space:");
    await expect(
      filesScreenFirstUser.filesInfoCurrentSizeValue
    ).toHaveTextContaining("13.2 MB");
  });

  it("Files - File is renamed when uploading a file with existing file name", async () => {
    // Upload app-macos.zip file again
    await filesScreenFirstUser.uploadFile("./tests/fixtures/app-macos.zip");

    // Wait until progress indicator disappears
    await filesScreenFirstUser.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
    });

    // Once that progress indicator disappears, validate that file is loaded and is automatically renamed to avoid name conflicts
    await filesScreenFirstUser.validateFileOrFolderExist("app-macos (1).zip");
  });

  // Skipping test due to rename files issue
  xit("Files - Attempt to rename a file with existing file name", async () => {
    // Open context menu for app-macos (1).zip file and select the option "Rename"
    await filesScreenFirstUser.openFilesContextMenu("app-macos (1).zip");
    await filesScreenFirstUser.clickOnFilesRename();

    // Attempt to set the new name for the file as app-macos.zip and wait for error toast notification to be closed
    await filesScreenFirstUser.typeOnFileFolderNameInput("app-macos");
    await filesScreenFirstUser.waitUntilNotificationIsClosed();

    // Type the previous filename for app-macos (1) so it can keep the original name. Ensure that file still exists in Screen
    await filesScreenFirstUser.typeOnFileFolderNameInput("app-macos (1)");
    await filesScreenFirstUser.validateFileOrFolderExist("app-macos (1).zip");
  });

  it("Files - Attempt to create a folder with existing folder name", async () => {
    // First, create a folder named "testfolder01"
    await filesScreenFirstUser.createFolder("testfolder01");
    await filesScreenFirstUser.validateFileOrFolderExist("testfolder01");

    // Click on Create Folder and type the existing folder name "testfolder01"
    await filesScreenFirstUser.clickOnCreateFolder();
    await filesScreenFirstUser.typeOnFileFolderNameInput("testfolder01");

    // Wait until error toast notification is closed and type a valid name for the new folder
    await filesScreenFirstUser.waitUntilNotificationIsClosed();
    await filesScreenFirstUser.typeOnFileFolderNameInput("testfolder02");

    // Ensure that new folder was created with name "testfolder02"
    await filesScreenFirstUser.validateFileOrFolderExist("testfolder02");
  });

  // Skipping test due to rename issue
  xit("Files - Attempt to rename a folder with existing folder name", async () => {
    // Open context menu for testfolder02 and select the first option "Rename"
    await filesScreenFirstUser.openFilesContextMenu("testfolder02");
    await filesScreenFirstUser.clickOnFolderRename();

    // Attempt to change the name of testfolder02 to existing folder name testfolder01
    await filesScreenFirstUser.typeOnFileFolderNameInput("testfolder01");

    // Wait until error toast notification is closed and type the existing folder name for testfolder02
    await filesScreenFirstUser.waitUntilNotificationIsClosed();
    await filesScreenFirstUser.typeOnFileFolderNameInput("testfolder02");
    await filesScreenFirstUser.validateFileOrFolderExist("testfolder02");
  });
}

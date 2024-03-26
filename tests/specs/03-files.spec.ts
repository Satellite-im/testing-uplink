require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";

export default async function filesTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Files Screen
    await FriendsScreen.goToFiles();
    await FilesScreen.waitForIsShown(true);

    // Validate Pre Release Indicator
    await FilesScreen.releaseIndicator.waitForExist();
    const releaseIndicatorText = await FilesScreen.releaseIndicatorText;
    await expect(releaseIndicatorText).toHaveText("Alpha | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await FilesScreen.chatsButton.waitForExist();
    await FilesScreen.filesButton.waitForExist();
    await FilesScreen.friendsButton.waitForExist();
    await FilesScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await ChatsSidebar.sidebar.waitForExist();
    await ChatsSidebar.chatSearchInput.waitForExist();
  });

  it("Validate Files Info is displayed in screen", async () => {
    await FilesScreen.filesInfo.waitForExist();
    await FilesScreen.filesInfoCurrentSizeLabel.waitForExist();
    await FilesScreen.filesInfoCurrentSizeValue.waitForExist();
    await FilesScreen.filesInfoMaxSizeLabel.waitForExist();
    await FilesScreen.filesInfoMaxSizeValue.waitForExist();
  });

  it("Validate Files Breadcrumbs are displayed in screen", async () => {
    await FilesScreen.filesBreadcrumbs.waitForExist();
    await FilesScreen.crumbHomeDir.waitForExist();
  });

  it("Validate add folder and file buttons are displayed in screen", async () => {
    await FilesScreen.addFolderButton.waitForExist();
    await FilesScreen.uploadFileButton.waitForExist();
  });

  // Skipping test failing on CI
  xit("Validate tooltips for add folder or file buttons are displayed", async () => {
    // Validate New Folder button tooltip
    await FilesScreen.hoverOnNewFolderButton();

    const addFolderTooltipText = await FilesScreen.addFolderTooltipText;
    await expect(addFolderTooltipText).toHaveText("New Folder");

    // Validate Upload button tooltip
    await FilesScreen.hoverOnUploadButton();
    const uploadFileTooltipText = await FilesScreen.uploadFileTooltipText;
    await expect(uploadFileTooltipText).toHaveText("Upload");
  });

  it("Create a new folder and enter to it", async () => {
    await FilesScreen.createFolder("testfolder01");
    await FilesScreen.validateFileOrFolderExist("testfolder01");
    await FilesScreen.clickOnFileOrFolder("testfolder01");
  });

  it("Create a subfolder inside the previous folder created and enter into it", async () => {
    await FilesScreen.createFolder("testfolder02");
    await FilesScreen.validateFileOrFolderExist("testfolder02");
    await FilesScreen.clickOnFileOrFolder("testfolder02");
  });

  it("Click in the Folder button to take you to the selected folder", async () => {
    await FilesScreen.clickOnFolderCrumb("testfolder01");
    const currentFolder = await FilesScreen.getCurrentFolder();
    await expect(currentFolder).toEqual("testfolder01");
  });

  it("Click in the Home button should take you to Home folder", async () => {
    await FilesScreen.clickOnHomeFolderCrumb();
    const currentFolder = await FilesScreen.getCurrentFolder();
    await expect(currentFolder).toEqual("Home");
  });

  it("Upload file - Click on add file and select file", async () => {
    // Upload logo.jpg file
    await FilesScreen.uploadFile("./tests/fixtures/logo.jpg");
  });

  // Skipped since file used for testing it shows the dialog for not enough time needed to validate this modal
  xit("Upload file - Validate progress indicator", async () => {
    // Validate progress % and filename displayed correctly
    const progressText = await FilesScreen.getProgressUploadPercentage();
    await expect(progressText).toHaveText(
      expect.stringContaining("% Uploaded"),
    );

    const fileNameProgress = await FilesScreen.getProgressUploadFilename();
    await expect(fileNameProgress).toHaveText("logo.jpg");
  });

  it("Upload file - Progress indicator is closed and file appears on files list", async () => {
    // Wait until progress indicator disappears
    await FilesScreen.waitForFileUploadToComplete();

    // Once that progress indicator disappears, validate that file is loaded
    await FilesScreen.validateFileOrFolderExist("logo.jpg");
  });

  it("Context Menu - Folder - Rename", async () => {
    // Open context menu for testfolder01 and select the first option "Rename"
    await FilesScreen.openFilesContextMenu("testfolder01");
    await FilesScreen.clickOnFolderRename();

    // Set the new name for the folder
    await FilesScreen.updateNameFolder("newname");
    await FilesScreen.validateFileOrFolderExist("newname");
  });

  it("Context Menu - Folder - Delete", async () => {
    // Open context menu for newname folder and select the second option "Delete"
    await FilesScreen.openFilesContextMenu("newname");
    await FilesScreen.clickOnFolderDelete();

    // Ensure that folder deleted does not exist anymore
    await FilesScreen.validateFileOrFolderNotExist("newname");
  });

  it("Context Menu - File - Rename", async () => {
    // Open context menu for logo.jpg file and select the first option "Rename"
    await FilesScreen.openFilesContextMenu("logo.jpg");
    await FilesScreen.clickOnFilesRename();

    // Set the new name for the file
    await FilesScreen.updateNameFile("newname", ".jpg");
    await FilesScreen.validateFileOrFolderExist("newname.jpg");
  });

  it("Context Menu - File - Download", async () => {
    // Open context menu for newname.jpg and select the second option "Download"
    await FilesScreen.openFilesContextMenu("newname.jpg");
    await FilesScreen.downloadFile(".jpg");
  });

  it("Context Menu - File - Delete", async () => {
    // Open context menu for logo.jpg file and select the second option "Delete"
    await FilesScreen.openFilesContextMenu("newname.jpg");
    await FilesScreen.clickOnFilesDelete();

    // Ensure that file deleted does not exist anymore
    await FilesScreen.validateFileOrFolderNotExist("newname.jpg");
  });

  it("Files - File Size Indicators without files shows GB Max and 0 bytes as current space", async () => {
    const filesInfoMaxSizeLabel = await FilesScreen.filesInfoMaxSizeLabel;
    const filesInfoMaxSizeValue = await FilesScreen.filesInfoMaxSizeValue;
    const filesInfoCurrentSizeLabel =
      await FilesScreen.filesInfoCurrentSizeLabel;
    const filesInfoCurrentSizeValue =
      await FilesScreen.filesInfoCurrentSizeValue;

    await expect(filesInfoMaxSizeLabel).toHaveText(
      expect.stringContaining("Max Size:"),
    );
    await expect(filesInfoMaxSizeValue).toHaveText(
      expect.stringContaining("GB"),
    );
    await expect(filesInfoCurrentSizeLabel).toHaveText(
      expect.stringContaining("Used Space:"),
    );
    await expect(filesInfoCurrentSizeValue).toHaveText(
      expect.stringContaining("0 bytes"),
    );
  });

  it("Files - File Size Indicators after uploading a file are updated", async () => {
    // Upload app-macos.zip file
    await FilesScreen.uploadFile("./tests/fixtures/app-macos.zip");

    // Wait until progress indicator disappears
    await FilesScreen.waitForFileUploadToComplete();

    // Once that progress indicator disappears, validate that file is loaded
    await FilesScreen.validateFileOrFolderExist("app-macos.zip", 30000);

    // Finally, ensure that file size indicators are updated
    const filesInfoMaxSizeLabel = await FilesScreen.filesInfoMaxSizeLabel;
    const filesInfoMaxSizeValue = await FilesScreen.filesInfoMaxSizeValue;
    const filesInfoCurrentSizeLabel =
      await FilesScreen.filesInfoCurrentSizeLabel;
    const filesInfoCurrentSizeValue =
      await FilesScreen.filesInfoCurrentSizeValue;
    await expect(filesInfoMaxSizeLabel).toHaveText(
      expect.stringContaining("Max Size:"),
    );
    await expect(filesInfoMaxSizeValue).toHaveText(
      expect.stringContaining("GB"),
    );
    await expect(filesInfoCurrentSizeLabel).toHaveText(
      expect.stringContaining("Used Space:"),
    );
    await expect(filesInfoCurrentSizeValue).toHaveText(
      expect.stringContaining("13.2 MB"),
    );
  });

  it("Files - File is renamed when uploading a file with existing file name", async () => {
    // Upload app-macos.zip file again
    await FilesScreen.uploadFile("./tests/fixtures/app-macos.zip");

    // Wait until progress indicator disappears
    await FilesScreen.waitForFileUploadToComplete();

    // Once that progress indicator disappears, validate that file is loaded and is automatically renamed to avoid name conflicts
    await FilesScreen.validateFileOrFolderExist("app-macos (1).zip", 30000);
  });

  it("Files - Attempt to rename a file with existing file name", async () => {
    // Open context menu for app-macos (1).zip file and select the option "Rename"
    await FilesScreen.openFilesContextMenu("app-macos (1).zip");
    await FilesScreen.clickOnFilesRename();

    // Attempt to set the new name for the file as app-macos.zip and wait for error toast notification to be closed
    await FilesScreen.typeOnFileNameInput("app-macos");
    await FilesScreen.waitUntilNotificationIsClosed();

    // Type the previous filename for app-macos (1) so it can keep the original name. Ensure that file still exists in Screen
    await FilesScreen.typeOnFileNameInput("app-macos (1)");
    await FilesScreen.validateFileOrFolderExist("app-macos (1).zip", 60000);
  });

  it("Files - Attempt to create a folder with empty name", async () => {
    // Click on Create Folder button, wait for input to be displayed and hit enter on keyboard
    await FilesScreen.createEmptyNameFolder();

    // Validate that error message is displayed
    await FilesScreen.inputError.waitForExist();
    const inputErrorText = await FilesScreen.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 1 character.",
    );

    // Click again on Create Folder button to cancel operation
    await FilesScreen.addFolderButton.click();
  });

  it("Files - Attempt to create a folder with existing folder name", async () => {
    // First, create a folder named "testfolder01"
    await FilesScreen.createFolder("testfolder01");
    await FilesScreen.validateFileOrFolderExist("testfolder01");

    // Click on Create Folder and type the existing folder name "testfolder01"
    await FilesScreen.clickOnCreateFolder();
    await FilesScreen.typeOnFolderNameInput("testfolder01");

    // Wait until error toast notification is closed and type a valid name for the new folder
    await FilesScreen.waitUntilNotificationIsClosed();
    await FilesScreen.typeOnFolderNameInput("testfolder02");

    // Ensure that new folder was created with name "testfolder02"
    await FilesScreen.validateFileOrFolderExist("testfolder02");
  });

  it("Files - Attempt to rename a folder with existing folder name", async () => {
    // Open context menu for testfolder02 and select the first option "Rename"
    await FilesScreen.openFilesContextMenu("testfolder02");
    await FilesScreen.clickOnFolderRename();

    // Attempt to change the name of testfolder02 to existing folder name testfolder01
    await FilesScreen.typeOnFolderNameInput("testfolder01");

    // Wait until error toast notification is closed and type the existing folder name for testfolder02
    await FilesScreen.waitUntilNotificationIsClosed();
    await FilesScreen.typeOnFolderNameInput("testfolder02");
    await FilesScreen.validateFileOrFolderExist("testfolder02");
  });
}

import FilesScreen from "../screenobjects/FilesScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";

export default async function files() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Files Screen
    await FriendsScreen.goToFiles();
    await FilesScreen.waitForIsShown(true);

    // Validate Pre Release Indicator
    await expect(FilesScreen.prereleaseIndicator).toBeDisplayed();
    await expect(FilesScreen.prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback"
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await FilesScreen.chatsButton.waitForExist();
    await FilesScreen.filesButton.waitForExist();
    await FilesScreen.friendsButton.waitForExist();
    await FilesScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(FilesScreen.chatSearchInput).toBeDisplayed();
    await expect(FilesScreen.sidebar).toBeDisplayed();
    await expect(FilesScreen.sidebarChildren).toBeDisplayed();
    await expect(FilesScreen.sidebarSearch).toBeDisplayed();
  });

  it("Validate Files Info is displayed in screen", async () => {
    await expect(FilesScreen.filesInfo).toBeDisplayed();
    await expect(FilesScreen.filesInfoFreeSpaceLabel).toBeDisplayed();
    await expect(FilesScreen.filesInfoFreeSpaceValue).toBeDisplayed();
    await expect(FilesScreen.filesInfoTotalSpaceLabel).toBeDisplayed();
    await expect(FilesScreen.filesInfoTotalSpaceValue).toBeDisplayed();
  });

  it("Validate Files Breadcrumbs are displayed in screen", async () => {
    await expect(FilesScreen.filesBreadcrumbs).toBeDisplayed();
    await expect(FilesScreen.crumb).toBeDisplayed();
  });

  it("Validate add folder and file buttons are displayed in screen", async () => {
    await expect(FilesScreen.addFolderButton).toBeDisplayed();
    await expect(FilesScreen.uploadFileButton).toBeDisplayed();
  });

  it("Validate tooltips for add folder or file buttons are displayed", async () => {
    // Validate New Folder button tooltip
    await FilesScreen.hoverOnNewFolderButton();
    await FilesScreen.addFolderTooltip.waitForExist();
    await expect(FilesScreen.addFolderTooltipText).toHaveTextContaining(
      "New Folder"
    );

    // Validate Upload button tooltip
    await FilesScreen.hoverOnUploadButton();
    await FilesScreen.uploadFileTooltip.waitForExist();
    await expect(FilesScreen.uploadFileTooltipText).toHaveTextContaining(
      "Upload"
    );
  });

  it("Create a new folder and enter to it", async () => {
    await FilesScreen.createFolder("testfolder01");
    const newFolder = await FilesScreen.getLocatorOfFolderFile("testfolder01");
    await $(newFolder).waitForExist();
    await $(newFolder).click();
  });

  it("Create a subfolder inside the previous folder created and enter into it", async () => {
    await FilesScreen.createFolder("testfolder02");
    const newFolder = await FilesScreen.getLocatorOfFolderFile("testfolder02");
    await $(newFolder).waitForExist();
    await $(newFolder).click();
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
    await expect(progressText).toHaveTextContaining("% Uploaded");

    const fileNameProgress = await FilesScreen.getProgressUploadFilename();
    await expect(fileNameProgress).toHaveTextContaining("logo.jpg");
  });

  it("Upload file - Progress indicator is closed and file appears on files list", async () => {
    // Wait until progress indicator disappears

    await FilesScreen.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
    });

    // Once that progress indicator disappears, validate that file is loaded
    const newFile = await FilesScreen.getLocatorOfFolderFile("logo.jpg");
    await $(newFile).waitForExist();
  });

  it("Context Menu - Folder - Rename", async () => {
    // Open context menu for testfolder01 and select the first option "Rename"
    await FilesScreen.openFilesContextMenu("testfolder01");
    await FilesScreen.contextMenuOption[0].click();

    // Set the new name for the folder
    const renamedFolder = await FilesScreen.updateNameFileFolder("newname");
    await renamedFolder.waitForExist();
  });

  it("Context Menu - Folder - Delete", async () => {
    // Open context menu for newname folder and select the second option "Delete"
    await FilesScreen.openFilesContextMenu("newname");
    await FilesScreen.contextMenuOption[1].click();

    // Ensure that folder deleted does not exist anymore
    const nonExistingFolderLocator =
      await FilesScreen.getLocatorOfDeletedElement("newname");
    await $(nonExistingFolderLocator).waitForExist({ reverse: true });
  });

  it("Context Menu - File - Rename", async () => {
    // Open context menu for logo.jpg file and select the first option "Rename"
    await FilesScreen.openFilesContextMenu("logo.jpg");
    await FilesScreen.contextMenuOption[0].click();

    // Set the new name for the file
    const renamedFile = await FilesScreen.updateNameFileFolder(
      "newname",
      ".jpg"
    );
    await renamedFile.waitForExist();
  });

  // Needs research on how to implement on Windows
  xit("Context Menu - File - Download", async () => {
    // Open context menu for newname.jpg and select the second option "Download"
    await FilesScreen.openFilesContextMenu("newname.jpg");
    await FilesScreen.downloadFile("saved.jpg");
  });

  it("Context Menu - File - Delete", async () => {
    // Open context menu for newname.jpg file and select the second option "Delete"
    await FilesScreen.openFilesContextMenu("newname.jpg");
    await FilesScreen.contextMenuOption[2].click();

    // Ensure that file deleted does not exist anymore
    const nonExistingFile = await FilesScreen.getLocatorOfDeletedElement(
      "newname.jpg"
    );
    await $(nonExistingFile).waitForExist({ reverse: true });
  });
}

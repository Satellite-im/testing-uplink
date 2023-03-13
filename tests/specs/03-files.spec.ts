import FilesScreen from "../screenobjects/FilesScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";

export default async function files() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Files Screen
    await FriendsScreen.goToFiles();
    await FilesScreen.waitForIsShown(true);

    // Validate Pre Release Indicator
    await expect(await FilesScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await FilesScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await FilesScreen.buttonNav).toBeDisplayed();
    await expect(await FilesScreen.chatsButton).toBeDisplayed();
    await expect(await FilesScreen.filesButton).toBeDisplayed();
    await expect(await FilesScreen.friendsButton).toBeDisplayed();
    await expect(await FilesScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await FilesScreen.chatSearchInput).toBeDisplayed();
    await expect(await FilesScreen.sidebar).toBeDisplayed();
    await expect(await FilesScreen.sidebarChildren).toBeDisplayed();
    await expect(await FilesScreen.sidebarSearch).toBeDisplayed();
  });

  it("Validate Files Info is displayed in screen", async () => {
    await expect(await FilesScreen.filesInfo).toBeDisplayed();
    await expect(await FilesScreen.filesInfoFreeSpaceLabel).toBeDisplayed();
    await expect(await FilesScreen.filesInfoFreeSpaceValue).toBeDisplayed();
    await expect(await FilesScreen.filesInfoTotalSpaceLabel).toBeDisplayed();
    await expect(await FilesScreen.filesInfoTotalSpaceValue).toBeDisplayed();
  });

  it("Validate Files Breadcrumbs are displayed in screen", async () => {
    await expect(await FilesScreen.filesBreadcrumbs).toBeDisplayed();
    await expect(await FilesScreen.crumb).toBeDisplayed();
  });

  it("Validate add folder/file buttons are displayed in screen", async () => {
    await expect(await FilesScreen.addFolderButton).toBeDisplayed();
    await expect(await FilesScreen.uploadFileButton).toBeDisplayed();
  });

  it("Create a new folder and enter to it", async () => {
    await FilesScreen.createFolder("testfolder01");
    const newFolder = await FilesScreen.getLocatorOfFolderFile("testfolder01");
    expect(newFolder).toExist();
    await newFolder.click();
  });

  it("Create a subfolder inside the previous folder craeted and enter into it", async () => {
    await FilesScreen.createFolder("testfolder02");
    const newFolder = await FilesScreen.getLocatorOfFolderFile("testfolder02");
    expect(newFolder).toExist();
    await newFolder.click();
  });

  it("Click in the Folder button to take you to the selected folder", async () => {
    await FilesScreen.clickOnFolderCrumb("testfolder01");
    const currentFolder = await FilesScreen.getCurrentFolder();
    expect(currentFolder).toEqual("testfolder01");
  });

  it("Click in the Home button should take you to Home folder", async () => {
    await FilesScreen.clickOnHomeFolderCrumb();
    const currentFolder = await FilesScreen.getCurrentFolder();
    expect(currentFolder).toEqual("Home");
  });

  it("Upload file - Click on add file and select file", async () => {
    // Upload logo.jpg file
    await FilesScreen.uploadFile("./tests/fixtures/logo.jpg");
  });

  // Skipped since file used for testing it shows the dialog for not enough time needed to validate this modal
  xit("Upload file - Validate progress indicator", async () => {
    // Validate progress % and filename displayed correctly
    const progressText = await FilesScreen.getProgressUploadPercentage();
    expect(progressText).toHaveTextContaining("% Uploaded");

    const fileNameProgress = await FilesScreen.getProgressUploadFilename();
    expect(fileNameProgress).toHaveTextContaining("logo.jpg");
  });

  it("Upload file - Progress indicator is closed and file appears on files list", async () => {
    // Wait until progress indicator disappears
    await (
      await FilesScreen.uploadFileIndicatorProgress
    ).waitForExist({ reverse: true });

    // Once that progress indicator disappears, validate that file is loaded
    const newFile = await FilesScreen.getLocatorOfFolderFile("logo.jpg");
    expect(newFile).toExist();
  });

  it("Context Menu - Folder - Rename", async () => {
    // Open context menu for testfolder01 and select the first option "Rename"
    await FilesScreen.openFilesContextMenu("testfolder01");
    await FilesScreen.contextMenuOption[0].click();

    // Set the new name for the folder
    const renamedFolder = await FilesScreen.updateNameFileFolder("newname");
    expect(renamedFolder).toExist();
  });

  it("Context Menu - Folder - Delete", async () => {
    // Open context menu for newname folder and select the second option "Delete"
    await FilesScreen.openFilesContextMenu("newname");
    await FilesScreen.contextMenuOption[1].click();

    // Ensure that folder deleted does not exist anymore
    const nonExistingFolderLocator =
      await FilesScreen.getLocatorOfDeletedElement("newname");
    expect(await $(nonExistingFolderLocator)).not.toExist();
  });

  it("Context Menu - File - Rename", async () => {
    // Open context menu for logo.jpg file and select the first option "Rename"
    await FilesScreen.openFilesContextMenu("logo.jpg");
    await FilesScreen.contextMenuOption[0].click();

    // Set the new name for the file
    const renamedFile = await FilesScreen.updateNameFileFolder("newname");
    expect(renamedFile).toExist();
  });

  it("Context Menu - File - Download", async () => {
    // Open context menu for renamed.jpg and select the second option "Download"
    await FilesScreen.openFilesContextMenu("newname.jpg");
    await FilesScreen.downloadFile("saved.jpg");
  });

  it("Context Menu - File - Delete", async () => {
    // Open context menu for renamed.jpg file and select the second option "Delete"
    await FilesScreen.openFilesContextMenu("newname.jpg");
    await FilesScreen.contextMenuOption[2].click();

    // Ensure that file deleted does not exist anymore
    const nonExistingFile = await FilesScreen.getLocatorOfDeletedElement(
      "newname.jpg"
    );
    expect(await $(nonExistingFile)).not.toExist();
  });
}

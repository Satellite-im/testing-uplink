import FilesScreen from "../screenobjects/FilesScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";

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
    // Upload app-macos.zip file
    await FilesScreen.uploadFile("./tests/fixtures/app-macos.zip");
  });

  // Skipped since file used for testing it shows the dialog for not enough time needed to validate this modal
  xit("Upload file - Validate progress indicator", async () => {
    // Validate progress % and filename displayed correctly
    const progressText = await FilesScreen.getProgressUploadPercentage();
    expect(progressText).toHaveTextContaining("% Uploaded");

    const fileNameProgress = await FilesScreen.getProgressUploadFilename();
    expect(fileNameProgress).toHaveTextContaining("app-macos.zip");
  });

  it("Upload file - Progress indicator is closed and file appears on files list", async () => {
    // Wait until progress indicator disappears
    await (
      await FilesScreen.uploadFileIndicatorProgress
    ).waitForExist({ reverse: true });

    // Once that progress indicator disappears, validate that file is loaded
    const newFile = await FilesScreen.getLocatorOfFolderFile("app-macos.zip");
    expect(newFile).toExist();

    await FilesScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
  });
}

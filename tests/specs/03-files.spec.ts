import FilesScreen from "../screenobjects/FilesScreen";
import UplinkMainScreen from "../screenobjects/UplinkMainScreen";

describe("Files Screen Tests", async () => {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Files Screen
    await UplinkMainScreen.goToFiles();
    await FilesScreen.waitForIsShown(true);
    
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
  });

  it("Validate Files Breadcrumbs are displayed in screen", async () => {
    await expect(await FilesScreen.filesBreadcrumbs).toBeDisplayed();
    await expect(await FilesScreen.crumb).toBeDisplayed();
  });

  it("Validate Files List is displayed in screen", async () => {
    await expect(await FilesScreen.filesList).toBeDisplayed();
    await expect(await FilesScreen.filesBody).toBeDisplayed();
    await expect(await FilesScreen.fakeFile1).toBeDisplayed();
    await expect(await FilesScreen.fakeFolder1).toBeDisplayed();
    await expect(await FilesScreen.fakeFolder2).toBeDisplayed();
  });

  it("Validate add folder/file buttons are displayed in screen", async () => {
    await expect(await FilesScreen.addFileButton).toBeDisplayed();
    await expect(await FilesScreen.uploadFileButton).toBeDisplayed();

    //Return to main screen
    await FilesScreen.goToMainScreen();
  });
});

import FilesScreen from "../screenobjects/FilesScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";

describe("Files Screen Tests", async () => {
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

  xit("Create a new folder", async () => {});

  it("Validate add folder/file buttons are displayed in screen", async () => {
    await expect(await FilesScreen.addFileButton).toBeDisplayed();
    await expect(await FilesScreen.uploadFileButton).toBeDisplayed();
  });
});

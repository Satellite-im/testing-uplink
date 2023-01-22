import FriendsScreen from "../screenobjects/FriendsScreen";
import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Chats Main Screen Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
  })
  
  // Skipping test since the order of displaying for toast notifications is random now
  xit('Validate and close Toast Notifications', async() => {
    await expect(await UplinkMainScreen.toastNotifications).toBeExisting()
    await UplinkMainScreen.validateContentsToastNotification('TITLE2', 'content2')
    await UplinkMainScreen.validateContentsToastNotification('TITLE1', 'content1')
    await UplinkMainScreen.closeToastNotification('TITLE2')
    await UplinkMainScreen.closeToastNotification('TITLE1')
  })

  it("Validate that Friends Button has a Badge with Requests Pending", async () => {
    await UplinkMainScreen.validateTextFromButtonBadge('2')
  })

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await UplinkMainScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await UplinkMainScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await UplinkMainScreen.buttonNav).toBeDisplayed();
    await expect(await UplinkMainScreen.chatsButton).toBeDisplayed();
    await expect(await UplinkMainScreen.filesButton).toBeDisplayed();
    await expect(await UplinkMainScreen.friendsButton).toBeDisplayed();
    await expect(await UplinkMainScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await UplinkMainScreen.chatSearchInput).toBeDisplayed();
    await expect(await UplinkMainScreen.sidebar).toBeDisplayed();
    await expect(await UplinkMainScreen.sidebarChildren).toBeDisplayed();
    await expect(await UplinkMainScreen.sidebarSearch).toBeDisplayed();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await expect(await UplinkMainScreen.welcomeScreen).toBeDisplayed();
    await expect(await UplinkMainScreen.addFriendsButton).toBeDisplayed();
    const locator = await (
      await UplinkMainScreen.welcomeScreen
    ).$("~Add Someone");
    await expect(locator).toHaveTextContaining("Add Someone");
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await (await UplinkMainScreen.addFriendsButton).click()
    await FriendsScreen.waitForIsShown(true)
  });
});

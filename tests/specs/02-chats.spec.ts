import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Chats Main Screen Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
  });

  // Skipping test since the order of displaying for toast notifications is random now
  xit("Validate and close Toast Notifications", async () => {
    await expect(await WelcomeScreen.toastNotifications).toBeExisting();
    await WelcomeScreen.validateContentsToastNotification(
      "TITLE2",
      "content2"
    );
    await WelcomeScreen.validateContentsToastNotification(
      "TITLE1",
      "content1"
    );
    await WelcomeScreen.closeToastNotification("TITLE2");
    await WelcomeScreen.closeToastNotification("TITLE1");
  });

  it("Validate that Friends Button has a Badge with Requests Pending", async () => {
    await WelcomeScreen.validateTextFromButtonBadge("2");
  });

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await WelcomeScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await WelcomeScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await WelcomeScreen.buttonNav).toBeDisplayed();
    await expect(await WelcomeScreen.chatsButton).toBeDisplayed();
    await expect(await WelcomeScreen.filesButton).toBeDisplayed();
    await expect(await WelcomeScreen.friendsButton).toBeDisplayed();
    await expect(await WelcomeScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await WelcomeScreen.chatSearchInput).toBeDisplayed();
    await expect(await WelcomeScreen.sidebar).toBeDisplayed();
    await expect(await WelcomeScreen.sidebarChildren).toBeDisplayed();
    await expect(await WelcomeScreen.sidebarSearch).toBeDisplayed();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await expect(await WelcomeScreen.welcomeLayout).toBeDisplayed();
    await expect(await WelcomeScreen.addFriendsButton).toBeDisplayed();
    const locator = await (
      await WelcomeScreen.welcomeLayout
    ).$("~Add Someone");
    await expect(locator).toHaveTextContaining("Add Someone");
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await (await WelcomeScreen.addFriendsButton).click();
    await FriendsScreen.waitForIsShown(true);
  });
});

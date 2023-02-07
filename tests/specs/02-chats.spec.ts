import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Chats Main Screen Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
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
    const locator = await (await WelcomeScreen.welcomeLayout).$("~Add Someone");
    await expect(locator).toHaveTextContaining("Add Someone");
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await WelcomeScreen.clickAddSomeone();
    await FriendsScreen.waitForIsShown(true);
  });
});

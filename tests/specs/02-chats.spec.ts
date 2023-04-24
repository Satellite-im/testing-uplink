import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";

export default async function chats() {
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
    await expect(await WelcomeScreen.addSomeoneText).toHaveTextContaining(
      "Things are better with friends."
    );
  });

  it("Validate Main Nav Bar buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip
    await WelcomeScreen.hoverOnChatsButton();
    await expect(
      await WelcomeScreen.chatsButtonTooltipText
    ).toHaveTextContaining("Chats");

    // Validate Files button tooltip
    await WelcomeScreen.hoverOnFilesButton();
    await expect(
      await WelcomeScreen.filesButtonTooltipText
    ).toHaveTextContaining("Files");

    // Validate Friends button tooltip
    await WelcomeScreen.hoverOnFriendsButton();
    await expect(
      await WelcomeScreen.friendsButtonTooltipText
    ).toHaveTextContaining("Friends");

    // Validate Settings button tooltip
    await WelcomeScreen.hoverOnSettingsButton();
    await expect(
      await WelcomeScreen.settingsButtonTooltipText
    ).toHaveTextContaining("Settings");
  });

  it("Reduce font size before continuing execution", async () => {
    // Go to Settings and then to General Settings
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown();
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown();

    // Reduce the font size and return to Welcome Screen
    await SettingsGeneralScreen.clickOnFontScalingMinus();
    await SettingsGeneralScreen.goToMainScreen();
    await WelcomeScreen.waitForIsShown();
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await WelcomeScreen.clickAddSomeone();
    await FriendsScreen.waitForIsShown(true);
  });
}

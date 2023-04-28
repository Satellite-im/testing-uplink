import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";

export default async function chats() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(WelcomeScreen.prereleaseIndicator).toBeDisplayed();
    await expect(WelcomeScreen.prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback"
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(WelcomeScreen.chatsButton).toBeDisplayed();
    await expect(WelcomeScreen.filesButton).toBeDisplayed();
    await expect(WelcomeScreen.friendsButton).toBeDisplayed();
    await expect(WelcomeScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(WelcomeScreen.chatSearchInput).toBeDisplayed();
    await expect(WelcomeScreen.sidebar).toBeDisplayed();
    await expect(WelcomeScreen.sidebarChildren).toBeDisplayed();
    await expect(WelcomeScreen.sidebarSearch).toBeDisplayed();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await expect(WelcomeScreen.welcomeLayout).toBeDisplayed();
    await expect(WelcomeScreen.addFriendsButton).toBeDisplayed();
    await expect(WelcomeScreen.addSomeoneText).toHaveTextContaining(
      "Things are better with friends."
    );
  });

  it("Validate Main Nav Bar buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip
    await WelcomeScreen.hoverOnChatsButton();
    await WelcomeScreen.chatsButtonTooltip.waitForExist();
    await expect(WelcomeScreen.chatsButtonTooltipText).toHaveTextContaining(
      "Chats"
    );

    // Validate Files button tooltip
    await WelcomeScreen.hoverOnFilesButton();
    await WelcomeScreen.filesButtonTooltip.waitForExist();
    await expect(WelcomeScreen.filesButtonTooltipText).toHaveTextContaining(
      "Files"
    );

    // Validate Friends button tooltip
    await WelcomeScreen.hoverOnFriendsButton();
    await WelcomeScreen.friendsButtonTooltip.waitForExist();
    await expect(WelcomeScreen.friendsButtonTooltipText).toHaveTextContaining(
      "Friends"
    );

    // Validate Settings button tooltip
    await WelcomeScreen.hoverOnSettingsButton();
    await WelcomeScreen.settingsButtonTooltip.waitForExist();
    await expect(WelcomeScreen.settingsButtonTooltipText).toHaveTextContaining(
      "Settings"
    );
  });

  it("Reduce font size before continuing execution", async () => {
    // Execute only on MacOS
    const currentDriver = await WelcomeScreen.getCurrentDriver();
    if (currentDriver === "mac2") {
      // Go to Settings and then to General Settings
      await WelcomeScreen.goToSettings();
      await SettingsProfileScreen.waitForIsShown(true);
      await SettingsProfileScreen.goToGeneralSettings();
      await SettingsGeneralScreen.waitForIsShown(true);

      // Reduce the font size and return to Welcome Screen
      await SettingsGeneralScreen.clickOnFontScalingMinus();
      await SettingsGeneralScreen.goToMainScreen();
      await WelcomeScreen.waitForIsShown(true);
    }
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await WelcomeScreen.clickAddSomeone();
    await FriendsScreen.waitForIsShown(true);
  });
}

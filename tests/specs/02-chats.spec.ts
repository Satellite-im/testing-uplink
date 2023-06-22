import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let friendsScreenFirstUser = new FriendsScreen("userA");
let settingsGeneralFirstUser = new SettingsGeneralScreen("userA");
let settingsProfileFirstUser = new SettingsProfileScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

export default async function chats() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(welcomeScreenFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      welcomeScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(welcomeScreenFirstUser.chatsButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.filesButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.friendsButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(welcomeScreenFirstUser.chatSearchInput).toBeDisplayed();
    await expect(welcomeScreenFirstUser.sidebar).toBeDisplayed();
    await expect(welcomeScreenFirstUser.sidebarChildren).toBeDisplayed();
    await expect(welcomeScreenFirstUser.sidebarSearch).toBeDisplayed();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await expect(welcomeScreenFirstUser.welcomeLayout).toBeDisplayed();
    await expect(welcomeScreenFirstUser.addFriendsButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.addSomeoneText).toHaveTextContaining(
      "Things are better with friends."
    );
  });

  it("Validate Main Nav Bar buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip
    await welcomeScreenFirstUser.hoverOnChatsButton();
    await welcomeScreenFirstUser.chatsButtonTooltip.waitForExist();
    await expect(
      welcomeScreenFirstUser.chatsButtonTooltipText
    ).toHaveTextContaining("Chats");

    // Validate Files button tooltip
    await welcomeScreenFirstUser.hoverOnFilesButton();
    await welcomeScreenFirstUser.filesButtonTooltip.waitForExist();
    await expect(
      welcomeScreenFirstUser.filesButtonTooltipText
    ).toHaveTextContaining("Files");

    // Validate Friends button tooltip
    await welcomeScreenFirstUser.hoverOnFriendsButton();
    await welcomeScreenFirstUser.friendsButtonTooltip.waitForExist();
    await expect(
      welcomeScreenFirstUser.friendsButtonTooltipText
    ).toHaveTextContaining("Friends");

    // Validate Settings button tooltip
    await welcomeScreenFirstUser.hoverOnSettingsButton();
    await welcomeScreenFirstUser.settingsButtonTooltip.waitForExist();
    await expect(
      welcomeScreenFirstUser.settingsButtonTooltipText
    ).toHaveTextContaining("Settings");
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await welcomeScreenFirstUser.clickAddSomeone();
    await friendsScreenFirstUser.waitForIsShown(true);
  });
}

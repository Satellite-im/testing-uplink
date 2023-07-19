import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function chats() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await welcomeScreenFirstUser.prereleaseIndicator.waitForDisplayed();
    await expect(
      welcomeScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await welcomeScreenFirstUser.chatsButton.waitForDisplayed();
    await welcomeScreenFirstUser.filesButton.waitForDisplayed();
    await welcomeScreenFirstUser.friendsButton.waitForDisplayed();
    await welcomeScreenFirstUser.settingsButton.waitForDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await welcomeScreenFirstUser.chatSearchInput.waitForDisplayed();
    await welcomeScreenFirstUser.sidebar.waitForDisplayed();
    await welcomeScreenFirstUser.sidebarChildren.waitForDisplayed();
    await welcomeScreenFirstUser.sidebarSearch.waitForDisplayed();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await welcomeScreenFirstUser.welcomeLayout.waitForDisplayed();
    await welcomeScreenFirstUser.addFriendsButton.waitForDisplayed();
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

import "module-alias/register";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let slimbarFirstUser = new FavoritesSidebar(USER_A_INSTANCE);
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
    await chatsSidebarFirstUser.chatSearchInput.waitForDisplayed();
    await chatsSidebarFirstUser.sidebar.waitForDisplayed();
    await chatsSidebarFirstUser.sidebarChildren.waitForDisplayed();
    await chatsSidebarFirstUser.sidebarSearch.waitForDisplayed();
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

  it("Welcome Screen - Welcome Image is displayed when no conversations are available", async () => {
    await welcomeScreenFirstUser.welcomeImage.waitForExist();
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await welcomeScreenFirstUser.clickAddSomeone();
    await friendsScreenFirstUser.waitForIsShown(true);
  });

  it("Friends Screen - Image is displayed when no friends have been added yet", async () => {
    await friendsScreenFirstUser.allFriendsListImage.waitForExist();
  });

  it("Slimbar - Main Navigation buttons are displayed on slimbar", async () => {
    // Click on hamburguer button from Friends Screen
    await friendsScreenFirstUser.clickOnHamburgerButton();
    await slimbarFirstUser.waitForIsShown(true);

    // Ensure slimbar main navigation buttons are displayed
    await slimbarFirstUser.slimbarChatsButton.waitForDisplayed();
    await slimbarFirstUser.slimbarFilesButton.waitForDisplayed();
    await slimbarFirstUser.slimbarFriendsButton.waitForDisplayed();
    await slimbarFirstUser.slimbarSettingsButton.waitForDisplayed();
  });

  it("Slimbar - Main buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarChatsButton();
    await slimbarFirstUser.chatsButtonTooltip.waitForExist();
    await expect(slimbarFirstUser.chatsButtonTooltipText).toHaveTextContaining(
      "Chats"
    );

    // Validate Files button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarFilesButton();
    await slimbarFirstUser.filesButtonTooltip.waitForExist();
    await expect(slimbarFirstUser.filesButtonTooltipText).toHaveTextContaining(
      "Files"
    );

    // Validate Friends button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarFriendsButton();
    await slimbarFirstUser.friendsButtonTooltip.waitForExist();
    await expect(
      slimbarFirstUser.friendsButtonTooltipText
    ).toHaveTextContaining("Friends");

    // Validate Settings button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarSettingsButton();
    await slimbarFirstUser.settingsButtonTooltip.waitForExist();
    await expect(
      slimbarFirstUser.settingsButtonTooltipText
    ).toHaveTextContaining("Settings");
  });

  it("Slimbar - User can click on buttons from main navigation on slimbar", async () => {
    // Go to Chats Screen from Slimbar navigation button
    await slimbarFirstUser.clickOnSlimbarChatsButton();
    await welcomeScreenFirstUser.waitForIsShown(true);

    // Go to Files Screen from Slimbar navigation button
    await slimbarFirstUser.clickOnSlimbarFilesButton();
    await filesScreenFirstUser.waitForIsShown(true);

    // Go to Settings Screen from Slimbar navigation button
    await slimbarFirstUser.clickOnSlimbarSettingsButton();
    await settingsProfileFirstUser.waitForIsShown(true);

    // Go to Friends Screen from Slimbar navigation button
    await slimbarFirstUser.clickOnSlimbarFriendsButton();
    await friendsScreenFirstUser.waitForIsShown(true);

    // Show again Main Navigation bar
    await slimbarFirstUser.clickOnBackButton();
  });
}

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
    await welcomeScreenFirstUser.prereleaseIndicator.waitForExist();
    const prereleaseIndicatorText =
      await welcomeScreenFirstUser.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback"
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await welcomeScreenFirstUser.chatsButton.waitForExist();
    await welcomeScreenFirstUser.filesButton.waitForExist();
    await welcomeScreenFirstUser.friendsButton.waitForExist();
    await welcomeScreenFirstUser.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await chatsSidebarFirstUser.sidebar.waitForExist();
    await chatsSidebarFirstUser.sidebarChildren.waitForExist();
    await chatsSidebarFirstUser.sidebarSearch.waitForExist();
    await chatsSidebarFirstUser.chatSearchInput.waitForExist();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();
    await welcomeScreenFirstUser.addFriendsButton.waitForExist();
    const addSomeoneText = await welcomeScreenFirstUser.addSomeoneText;
    await expect(addSomeoneText).toHaveTextContaining(
      "Things are better with friends."
    );
  });

  // Skipping test failing on CI
  xit("Validate Main Nav Bar buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip
    await welcomeScreenFirstUser.hoverOnChatsButton();

    const chatsTooltipText =
      await welcomeScreenFirstUser.chatsButtonTooltipText;
    await expect(chatsTooltipText).toHaveTextContaining("Chats");

    // Validate Files button tooltip
    await welcomeScreenFirstUser.hoverOnFilesButton();

    const filesTooltipText =
      await welcomeScreenFirstUser.filesButtonTooltipText;
    await expect(filesTooltipText).toHaveTextContaining("Files");

    // Validate Friends button tooltip
    await welcomeScreenFirstUser.hoverOnFriendsButton();

    const friendsTooltipText =
      await welcomeScreenFirstUser.friendsButtonTooltipText;
    await expect(friendsTooltipText).toHaveTextContaining("Friends");

    // Validate Settings button tooltip
    await welcomeScreenFirstUser.hoverOnSettingsButton();

    const settingsTooltipText =
      await welcomeScreenFirstUser.settingsButtonTooltipText;
    await expect(settingsTooltipText).toHaveTextContaining("Settings");
  });

  it("Welcome Screen - Welcome Image is displayed when no conversations are available", async () => {
    await welcomeScreenFirstUser.welcomeImage.waitForExist();
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await welcomeScreenFirstUser.clickAddSomeone();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Friends Screen - Image is displayed when no friends have been added yet", async () => {
    await friendsScreenFirstUser.allFriendsListImage.waitForExist();
  });

  it("Slimbar - Main Navigation buttons are displayed on slimbar", async () => {
    // Click on hamburguer button from Friends Screen
    await friendsScreenFirstUser.clickOnHamburgerButton();
    await slimbarFirstUser.waitForIsShown(true);

    // Ensure slimbar main navigation buttons are displayed
    await slimbarFirstUser.slimbarChatsButton.waitForExist();
    await slimbarFirstUser.slimbarFilesButton.waitForExist();
    await slimbarFirstUser.slimbarFriendsButton.waitForExist();
    await slimbarFirstUser.slimbarSettingsButton.waitForExist();
  });

  // Skipping test failing on CI
  xit("Slimbar - Main buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarChatsButton();

    const chatsButtonTooltipText =
      await slimbarFirstUser.chatsButtonTooltipText;
    await expect(chatsButtonTooltipText).toHaveTextContaining("Chats");

    // Validate Files button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarFilesButton();

    const filesButtonTooltipText =
      await slimbarFirstUser.filesButtonTooltipText;
    await expect(filesButtonTooltipText).toHaveTextContaining("Files");

    // Validate Friends button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarFriendsButton();

    const friendsButtonTooltipText =
      await slimbarFirstUser.friendsButtonTooltipText;
    await expect(friendsButtonTooltipText).toHaveTextContaining("Friends");

    // Validate Settings button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarSettingsButton();

    const settingsButtonTooltipText =
      await slimbarFirstUser.settingsButtonTooltipText;
    await expect(settingsButtonTooltipText).toHaveTextContaining("Settings");
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
    await friendsScreenFirstUser.goToFiles(); // temporary line until Files Screen issues are fixed
  });
}

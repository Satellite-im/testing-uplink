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
    const prereleaseIndicator =
      await welcomeScreenFirstUser.prereleaseIndicator;
    const prereleaseIndicatorText =
      await welcomeScreenFirstUser.prereleaseIndicatorText;
    await prereleaseIndicator.waitForExist();
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback"
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    const chatsButton = await welcomeScreenFirstUser.chatsButton;
    const filesButton = await welcomeScreenFirstUser.filesButton;
    const friendsButton = await welcomeScreenFirstUser.friendsButton;
    const settingsButton = await welcomeScreenFirstUser.settingsButton;

    await chatsButton.waitForExist();
    await filesButton.waitForExist();
    await friendsButton.waitForExist();
    await settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    const sidebar = await chatsSidebarFirstUser.sidebar;
    const sidebarChildren = await chatsSidebarFirstUser.sidebarChildren;
    const sidebarSearch = await chatsSidebarFirstUser.sidebarSearch;
    const chatSearchInput = await chatsSidebarFirstUser.chatSearchInput;

    await sidebar.waitForExist();
    await sidebarChildren.waitForExist();
    await sidebarSearch.waitForExist();
    await chatSearchInput.waitForExist();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await welcomeScreenFirstUser.validateWelcomeScreenIsShown();

    const addFriendsButton = await welcomeScreenFirstUser.addFriendsButton;
    await addFriendsButton.waitForExist();

    const addSomeoneText = await welcomeScreenFirstUser.addSomeoneText;
    await expect(addSomeoneText).toHaveTextContaining(
      "Things are better with friends."
    );
  });

  it("Validate Main Nav Bar buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip
    await welcomeScreenFirstUser.hoverOnChatsButton();

    const chatsTooltip = await welcomeScreenFirstUser.chatsButtonTooltip;
    const chatsTooltipText =
      await welcomeScreenFirstUser.chatsButtonTooltipText;
    await chatsTooltip.waitForExist();
    await expect(chatsTooltipText).toHaveTextContaining("Chats");

    // Validate Files button tooltip
    await welcomeScreenFirstUser.hoverOnFilesButton();

    const filesTooltip = await welcomeScreenFirstUser.filesButtonTooltip;
    const filesTooltipText =
      await welcomeScreenFirstUser.filesButtonTooltipText;
    await filesTooltip.waitForExist();
    await expect(filesTooltipText).toHaveTextContaining("Files");

    // Validate Friends button tooltip
    await welcomeScreenFirstUser.hoverOnFriendsButton();

    const friendsTooltip = await welcomeScreenFirstUser.friendsButtonTooltip;
    const friendsTooltipText =
      await welcomeScreenFirstUser.friendsButtonTooltipText;
    await friendsTooltip.waitForExist();
    await expect(friendsTooltipText).toHaveTextContaining("Friends");

    // Validate Settings button tooltip
    await welcomeScreenFirstUser.hoverOnSettingsButton();

    const settingsTooltip = await welcomeScreenFirstUser.settingsButtonTooltip;
    const settingsTooltipText =
      await welcomeScreenFirstUser.settingsButtonTooltipText;
    await settingsTooltip.waitForExist();
    await expect(settingsTooltipText).toHaveTextContaining("Settings");
  });

  it("Welcome Screen - Welcome Image is displayed when no conversations are available", async () => {
    const welcomeImage = await welcomeScreenFirstUser.welcomeImage;
    await welcomeImage.waitForExist();
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await welcomeScreenFirstUser.clickAddSomeone();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Friends Screen - Image is displayed when no friends have been added yet", async () => {
    const allFriendsListImage =
      await friendsScreenFirstUser.allFriendsListImage;
    await allFriendsListImage.waitForExist();
  });

  it("Slimbar - Main Navigation buttons are displayed on slimbar", async () => {
    // Click on hamburguer button from Friends Screen
    await friendsScreenFirstUser.clickOnHamburgerButton();
    await slimbarFirstUser.waitForIsShown(true);

    // Ensure slimbar main navigation buttons are displayed
    const slimbarChatsButton = await slimbarFirstUser.slimbarChatsButton;
    const slinbarFilesButton = await slimbarFirstUser.slimbarFilesButton;
    const slimbarFriendsButton = await slimbarFirstUser.slimbarFriendsButton;
    const slimbarSettingsButton = await slimbarFirstUser.slimbarSettingsButton;

    await slimbarChatsButton.waitForExist();
    await slinbarFilesButton.waitForExist();
    await slimbarFriendsButton.waitForExist();
    await slimbarSettingsButton.waitForExist();
  });

  it("Slimbar - Main buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarChatsButton();

    const chatsButtonTooltip = await slimbarFirstUser.chatsButtonTooltip;
    const chatsButtonTooltipText =
      await slimbarFirstUser.chatsButtonTooltipText;
    await chatsButtonTooltip.waitForExist();
    await expect(chatsButtonTooltipText).toHaveTextContaining("Chats");

    // Validate Files button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarFilesButton();

    const filesButtonTooltip = await slimbarFirstUser.filesButtonTooltip;
    const filesButtonTooltipText =
      await slimbarFirstUser.filesButtonTooltipText;
    await filesButtonTooltip.waitForExist();
    await expect(filesButtonTooltipText).toHaveTextContaining("Files");

    // Validate Friends button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarFriendsButton();

    const friendsButtonTooltip = await slimbarFirstUser.friendsButtonTooltip;
    const friendsButtonTooltipText =
      await slimbarFirstUser.friendsButtonTooltipText;

    await friendsButtonTooltip.waitForExist();
    await expect(friendsButtonTooltipText).toHaveTextContaining("Friends");

    // Validate Settings button tooltip from Slimbar button
    await slimbarFirstUser.hoverOnSlimbarSettingsButton();

    const settingsButtonTooltip = await slimbarFirstUser.settingsButtonTooltip;
    const settingsButtonTooltipText =
      await slimbarFirstUser.settingsButtonTooltipText;
    await settingsButtonTooltip.waitForExist();
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
  });
}

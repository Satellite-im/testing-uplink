require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const filesScreen = new FilesScreen();
const friendsScreen = new FriendsScreen();
const chatsSidebar = new ChatsSidebar();
const settingsProfile = new SettingsProfileScreen();
const slimbar = new FavoritesSidebar();
const welcomeScreen = new WelcomeScreen();

export default async function chatsTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await welcomeScreen.prereleaseIndicator.waitForExist();
    const prereleaseIndicatorText = await welcomeScreen.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback",
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await welcomeScreen.chatsButton.waitForExist();
    await welcomeScreen.filesButton.waitForExist();
    await welcomeScreen.friendsButton.waitForExist();
    await welcomeScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await chatsSidebar.sidebar.waitForExist();
    await chatsSidebar.sidebarChildren.waitForExist();
    await chatsSidebar.sidebarSearch.waitForExist();
    await chatsSidebar.chatSearchInput.waitForExist();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await welcomeScreen.validateWelcomeScreenIsShown();
    await welcomeScreen.addFriendsButton.waitForExist();
    const addSomeoneText = await welcomeScreen.addSomeoneText;
    await expect(addSomeoneText).toHaveTextContaining(
      "Things are better with friends.",
    );
  });

  // Skipping test failing on CI
  xit("Validate Main Nav Bar buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip
    await welcomeScreen.hoverOnChatsButton();

    const chatsTooltipText = await welcomeScreen.chatsButtonTooltipText;
    await expect(chatsTooltipText).toHaveTextContaining("Chats");

    // Validate Files button tooltip
    await welcomeScreen.hoverOnFilesButton();

    const filesTooltipText = await welcomeScreen.filesButtonTooltipText;
    await expect(filesTooltipText).toHaveTextContaining("Files");

    // Validate Friends button tooltip
    await welcomeScreen.hoverOnFriendsButton();

    const friendsTooltipText = await welcomeScreen.friendsButtonTooltipText;
    await expect(friendsTooltipText).toHaveTextContaining("Friends");

    // Validate Settings button tooltip
    await welcomeScreen.hoverOnSettingsButton();

    const settingsTooltipText = await welcomeScreen.settingsButtonTooltipText;
    await expect(settingsTooltipText).toHaveTextContaining("Settings");
  });

  it("Welcome Screen - Welcome Image is displayed when no conversations are available", async () => {
    await welcomeScreen.welcomeImage.waitForExist();
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await welcomeScreen.clickAddSomeone();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Friends Screen - Image is displayed when no friends have been added yet", async () => {
    await friendsScreen.allFriendsListImage.waitForExist();
  });

  it("Slimbar - Main Navigation buttons are displayed on slimbar", async () => {
    // Click on hamburguer button from Friends Screen
    await friendsScreen.clickOnHamburgerButton();
    await slimbar.waitForIsShown(true);

    // Ensure slimbar main navigation buttons are displayed
    await slimbar.slimbarChatsButton.waitForExist();
    await slimbar.slimbarFilesButton.waitForExist();
    await slimbar.slimbarFriendsButton.waitForExist();
    await slimbar.slimbarSettingsButton.waitForExist();
  });

  // Skipping test failing on CI
  xit("Slimbar - Main buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip from Slimbar button
    await slimbar.hoverOnSlimbarChatsButton();

    const chatsButtonTooltipText = await slimbar.chatsButtonTooltipText;
    await expect(chatsButtonTooltipText).toHaveTextContaining("Chats");

    // Validate Files button tooltip from Slimbar button
    await slimbar.hoverOnSlimbarFilesButton();

    const filesButtonTooltipText = await slimbar.filesButtonTooltipText;
    await expect(filesButtonTooltipText).toHaveTextContaining("Files");

    // Validate Friends button tooltip from Slimbar button
    await slimbar.hoverOnSlimbarFriendsButton();

    const friendsButtonTooltipText = await slimbar.friendsButtonTooltipText;
    await expect(friendsButtonTooltipText).toHaveTextContaining("Friends");

    // Validate Settings button tooltip from Slimbar button
    await slimbar.hoverOnSlimbarSettingsButton();

    const settingsButtonTooltipText = await slimbar.settingsButtonTooltipText;
    await expect(settingsButtonTooltipText).toHaveTextContaining("Settings");
  });

  it("Slimbar - User can click on buttons from main navigation on slimbar", async () => {
    // Go to Chats Screen from Slimbar navigation button
    await slimbar.clickOnSlimbarChatsButton();
    await welcomeScreen.waitForIsShown(true);

    // Go to Files Screen from Slimbar navigation button
    await slimbar.clickOnSlimbarFilesButton();
    await filesScreen.waitForIsShown(true);

    // Go to Settings Screen from Slimbar navigation button
    await slimbar.clickOnSlimbarSettingsButton();
    await settingsProfile.waitForIsShown(true);

    // Go to Friends Screen from Slimbar navigation button
    await slimbar.clickOnSlimbarFriendsButton();
    await friendsScreen.waitForIsShown(true);

    // Show again Main Navigation bar
    await slimbar.clickOnBackButton();
  });
}

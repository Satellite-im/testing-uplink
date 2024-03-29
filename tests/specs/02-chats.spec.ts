require("module-alias/register");
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";

export default async function chatsTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await WelcomeScreen.releaseIndicator.waitForExist();
    const releaseIndicatorText = await WelcomeScreen.releaseIndicatorText;
    await expect(releaseIndicatorText).toHaveText("Alpha | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await WelcomeScreen.chatsButton.waitForExist();
    await WelcomeScreen.filesButton.waitForExist();
    await WelcomeScreen.friendsButton.waitForExist();
    await WelcomeScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await ChatsSidebar.sidebar.waitForExist();
    await ChatsSidebar.sidebarChildren.waitForExist();
    await ChatsSidebar.sidebarSearch.waitForExist();
    await ChatsSidebar.chatSearchInput.waitForExist();
  });

  it("Validate Welcome Screen is displayed", async () => {
    await WelcomeScreen.validateWelcomeScreenIsShown();
    await WelcomeScreen.addFriendsButton.waitForExist();
    const addSomeoneText = await WelcomeScreen.addSomeoneText;
    await expect(addSomeoneText).toHaveText("Things are better with friends.");
  });

  // Skipping test failing on CI
  xit("Validate Main Nav Bar buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip
    await WelcomeScreen.hoverOnChatsButton();

    const chatsTooltipText = await WelcomeScreen.chatsButtonTooltipText;
    await expect(chatsTooltipText).toHaveText("Chats");

    // Validate Files button tooltip
    await WelcomeScreen.hoverOnFilesButton();

    const filesTooltipText = await WelcomeScreen.filesButtonTooltipText;
    await expect(filesTooltipText).toHaveText("Files");

    // Validate Friends button tooltip
    await WelcomeScreen.hoverOnFriendsButton();

    const friendsTooltipText = await WelcomeScreen.friendsButtonTooltipText;
    await expect(friendsTooltipText).toHaveText("Friends");

    // Validate Settings button tooltip
    await WelcomeScreen.hoverOnSettingsButton();

    const settingsTooltipText = await WelcomeScreen.settingsButtonTooltipText;
    await expect(settingsTooltipText).toHaveText("Settings");
  });

  it("Welcome Screen - Welcome Image is displayed when no conversations are available", async () => {
    await WelcomeScreen.welcomeImage.waitForExist();
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await WelcomeScreen.clickAddSomeone();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Friends Screen - Image is displayed when no friends have been added yet", async () => {
    await FriendsScreen.allFriendsListImage.waitForExist();
  });

  it("Slimbar - Main Navigation buttons are displayed on slimbar", async () => {
    // Click on hamburguer button from Friends Screen
    await FriendsScreen.clickOnHamburgerButton();
    await FavoritesSidebar.waitForIsShown(true);

    // Ensure slimbar main navigation buttons are displayed
    await FavoritesSidebar.slimbarChatsButton.waitForExist();
    await FavoritesSidebar.slimbarFilesButton.waitForExist();
    await FavoritesSidebar.slimbarFriendsButton.waitForExist();
    await FavoritesSidebar.slimbarSettingsButton.waitForExist();
  });

  // Skipping test failing on CI
  xit("Slimbar - Main buttons tooltips are displayed", async () => {
    // Validate Chats button tooltip from Slimbar button
    await FavoritesSidebar.hoverOnSlimbarChatsButton();

    const chatsButtonTooltipText =
      await FavoritesSidebar.chatsButtonTooltipText;
    await expect(chatsButtonTooltipText).toHaveText("Chats");

    // Validate Files button tooltip from Slimbar button
    await FavoritesSidebar.hoverOnSlimbarFilesButton();

    const filesButtonTooltipText =
      await FavoritesSidebar.filesButtonTooltipText;
    await expect(filesButtonTooltipText).toHaveText("Files");

    // Validate Friends button tooltip from Slimbar button
    await FavoritesSidebar.hoverOnSlimbarFriendsButton();

    const friendsButtonTooltipText =
      await FavoritesSidebar.friendsButtonTooltipText;
    await expect(friendsButtonTooltipText).toHaveText("Friends");

    // Validate Settings button tooltip from Slimbar button
    await FavoritesSidebar.hoverOnSlimbarSettingsButton();

    const settingsButtonTooltipText =
      await FavoritesSidebar.settingsButtonTooltipText;
    await expect(settingsButtonTooltipText).toHaveText("Settings");
  });

  it("Slimbar - User can click on buttons from main navigation on slimbar", async () => {
    // Go to Chats Screen from Slimbar navigation button
    await FavoritesSidebar.clickOnSlimbarChatsButton();
    await WelcomeScreen.waitForIsShown(true);

    // Go to Files Screen from Slimbar navigation button
    await FavoritesSidebar.clickOnSlimbarFilesButton();
    await FilesScreen.waitForIsShown(true);

    // Go to Settings Screen from Slimbar navigation button
    await FavoritesSidebar.clickOnSlimbarSettingsButton();
    await SettingsProfileScreen.waitForIsShown(true);

    // Go to Friends Screen from Slimbar navigation button
    await FavoritesSidebar.clickOnSlimbarFriendsButton();
    await FriendsScreen.waitForIsShown(true);

    // Show again Main Navigation bar
    await FavoritesSidebar.clickOnBackButton();
  });
}

import FriendsScreen from "../screenobjects/FriendsScreen";
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
    expect(await WelcomeScreen.chatsButtonTooltip).toBeDisplayed();
    expect(await WelcomeScreen.chatsButtonTooltipText).toHaveTextContaining(
      "Chats"
    );

    // Validate Files button tooltip
    await WelcomeScreen.hoverOnFilesButton();
    expect(await WelcomeScreen.filesButtonTooltip).toBeDisplayed();
    expect(await WelcomeScreen.filesButtonTooltipText).toHaveTextContaining(
      "Files"
    );

    // Validate Friends button tooltip
    await WelcomeScreen.hoverOnFriendsButton();
    expect(await WelcomeScreen.friendsButtonTooltip).toBeDisplayed();
    expect(await WelcomeScreen.friendsButtonTooltipText).toHaveTextContaining(
      "Friends"
    );

    // Validate Settings button tooltip
    await WelcomeScreen.hoverOnSettingsButton();
    expect(await WelcomeScreen.settingsButtonTooltip).toBeDisplayed();
    expect(await WelcomeScreen.settingsButtonTooltipText).toHaveTextContaining(
      "Settings"
    );
  });

  it("Click on add someone redirects to Friends Page", async () => {
    await WelcomeScreen.clickAddSomeone();
    await FriendsScreen.waitForIsShown(true);
  });
}

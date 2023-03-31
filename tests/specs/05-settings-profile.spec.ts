import FilesScreen from "../screenobjects/FilesScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";

export default async function settingsProfile() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and select the Settings Screen to validate
    await FilesScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsProfileScreen.prereleaseIndicator
    ).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await SettingsProfileScreen.buttonNav).toBeDisplayed();
    await expect(await SettingsProfileScreen.chatsButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.filesButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.friendsButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await SettingsProfileScreen.sidebar).toBeDisplayed();
    await expect(await SettingsProfileScreen.sidebarChildren).toBeDisplayed();
    await expect(await SettingsProfileScreen.sidebarSearch).toBeDisplayed();
  });

  it("Settings Profile - Assert texts for Your New Profile dialog and dismiss it", async () => {
    expect(
      await SettingsProfileScreen.yourNewProfileHeaderText
    ).toHaveTextContaining("YOUR NEW PROFILE!");
    expect(
      await SettingsProfileScreen.yourNewProfileDescriptionTextOne
    ).toHaveTextContaining(
      "Tell the world all about yourself, well tell them as much as you can while we're still under construction, at least."
    );
    expect(
      await SettingsProfileScreen.yourNewProfileDescriptionTextTwo
    ).toHaveTextContaining(
      "First step, pick out a profile picture and maybe even a banner too!"
    );
    await SettingsProfileScreen.clickOnDismissButton();
  });

  it("Settings Profile - Assert screen and placeholder texts", async () => {
    // Assert username and status labels are displayed on screen
    await expect(
      await SettingsProfileScreen.usernameLabel
    ).toHaveTextContaining("USERNAME");
    await expect(await SettingsProfileScreen.statusLabel).toHaveTextContaining(
      "STATUS"
    );

    // Assert username and status placeholder values are displayed
    expect(await SettingsProfileScreen.usernameInput).toHaveTextContaining(
      "Test123"
    );
    expect(await SettingsProfileScreen.statusInput).toHaveTextContaining("");
  });

  it("Settings Profile - Click On Copy ID Button", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.clickOnCopyIDButton();
    expect(
      await SettingsProfileScreen.toastNotificationText
    ).toHaveTextContaining("Copied ID to clipboard!");

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();
  });

  it("Settings Profile - Copied ID can be placed on any text field", async () => {
    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();

    // Ensure that value placed in Status is the did key from the user
    expect(
      await SettingsProfileScreen.getStatusInputText()
    ).toHaveTextContaining("did:key:");
  });

  it("Settings Profile - Copy ID button contains the last characters from user did key", async () => {
    // Get expected Short DID Key from DID Key value pasted in Status field
    const userDidKey = await SettingsProfileScreen.getStatusInputText();
    const shortDidKey = await SettingsProfileScreen.getShortDidKey(userDidKey);

    // Ensure that the last 9 digits from Did:Key matches with the button text
    expect(
      await SettingsProfileScreen.getCopyIDButtonText()
    ).toHaveTextContaining(shortDidKey);

    // Clear value from status input
    await SettingsProfileScreen.deleteStatus();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Add profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/logo.jpg"
    );
  });

  it("Settings Profile - Validate change banner tooltip", async () => {
    // Hover on banner picture
    await SettingsProfileScreen.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    expect(await SettingsProfileScreen.profileBannerTooltip).toBeDisplayed();
    expect(
      await SettingsProfileScreen.profileBannerTooltip
    ).toHaveTextContaining("Change banner");
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Add banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );

    await (await SettingsProfileScreen.usernameInput).click();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/second-profile.png"
    );
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/second-banner.jpg"
    );
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Enter status value with more than 128 characters
    await SettingsProfileScreen.enterStatus(
      "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    );

    await expect(SettingsProfileScreen.inputError).toBeDisplayed();
    await expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
      "Maximum of 128 characters exceeded."
    );

    // Clear value from status input
    await SettingsProfileScreen.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Enter username value with less than 4 characters
    await SettingsProfileScreen.enterUsername("123");
    // Validate that error message is displayed
    await expect(SettingsProfileScreen.inputError).toBeDisplayed();
    await expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
      "Please enter at least 4 characters."
    );

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");
  });

  it("Settings Profile - Username - Spaces are not allowed", async () => {
    // Enter username value with spaces
    await SettingsProfileScreen.enterUsername("1234" + "             ");
    // Validate that error message is displayed
    await expect(await SettingsProfileScreen.inputError).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.inputErrorMessage
    ).toHaveTextContaining("Spaces are not allowed.");

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Enter username value with non-alphanumeric characters
    await SettingsProfileScreen.enterUsername("test&^%*%#$");
    // Validate that error message is displayed
    await expect(SettingsProfileScreen.inputError).toBeDisplayed();
    await expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Enter username value with more than 32 characters
    await SettingsProfileScreen.enterUsername(
      "12345678901234567890123456789012345"
    );
    // Validate that error message is displayed
    await expect(SettingsProfileScreen.inputError).toBeDisplayed();
    await expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
      "Maximum of 32 characters exceeded."
    );

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");
  });
}

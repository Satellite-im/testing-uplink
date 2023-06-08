import FilesScreen from "../screenobjects/files/FilesScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
let filesScreenFirstUser = new FilesScreen("userA");
let settingsProfileFirstUser = new SettingsProfileScreen("userA");

export default async function settingsProfile() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and select the Settings Screen to validate
    await filesScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);

    // Start validations
    await expect(settingsProfileFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await settingsProfileFirstUser.chatsButton.waitForExist();
    await settingsProfileFirstUser.filesButton.waitForExist();
    await settingsProfileFirstUser.friendsButton.waitForExist();
    await settingsProfileFirstUser.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(settingsProfileFirstUser.sidebar).toBeDisplayed();
    await expect(settingsProfileFirstUser.sidebarChildren).toBeDisplayed();
    await expect(settingsProfileFirstUser.sidebarSearch).toBeDisplayed();
  });

  it("Settings Profile - Assert texts for Your New Profile dialog", async () => {
    await settingsProfileFirstUser.yourNewProfile.waitForDisplayed();
    await expect(
      settingsProfileFirstUser.yourNewProfileHeaderTextValue
    ).toHaveTextContaining("YOUR NEW PROFILE!");
    await expect(
      settingsProfileFirstUser.yourNewProfileDescriptionTextOneValue
    ).toHaveTextContaining(
      "Tell the world all about yourself, well.. tell them as much as you can while we're still under construction, at least."
    );
    await expect(
      settingsProfileFirstUser.yourNewProfileDescriptionTextTwoValue
    ).toHaveTextContaining(
      "First step, pick out a profile picture and maybe even a banner too!"
    );
  });

  it("Settings Profile - Dismiss Your New Profile dialog", async () => {
    await settingsProfileFirstUser.clickOnDismissButton();
    await settingsProfileFirstUser.dismissButton.waitForExist({
      reverse: true,
    });
  });

  it("Settings Profile - Assert screen and placeholder texts", async () => {
    // Assert username and status labels are displayed on screen
    await expect(settingsProfileFirstUser.usernameLabel).toHaveTextContaining(
      "USERNAME"
    );
    await expect(settingsProfileFirstUser.statusLabel).toHaveTextContaining(
      "STATUS"
    );

    // Assert username and status placeholder values are displayed
    await expect(settingsProfileFirstUser.usernameInput).toHaveTextContaining(
      "Test123"
    );
    await expect(settingsProfileFirstUser.statusInput).toHaveTextContaining("");
  });

  it("Settings Profile - Validate Copy ID button tooltip", async () => {
    // Validate Copy ID button tooltip
    await settingsProfileFirstUser.hoverOnCopyID();
    await settingsProfileFirstUser.copyIDTooltip.waitForExist();
    await expect(
      settingsProfileFirstUser.copyIDTooltipText
    ).toHaveTextContaining("Copy ID");
  });

  it("Settings Profile - Click On Copy ID Button", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileFirstUser.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();
  });

  it("Settings Profile - Copied ID can be placed on any text field", async () => {
    // Paste copied DID Key into Status Input
    await settingsProfileFirstUser.pasteUserKeyInStatus();

    // Ensure that value placed in Status is the did key from the user
    await expect(
      settingsProfileFirstUser.getStatusInputText()
    ).toHaveTextContaining("did:key:");
  });

  // Skipping this test in the meantime the Uplink PR adding new aria label for Copy ID button is merged
  xit("Settings Profile - Copy ID button contains the last characters from user did key", async () => {
    // Get expected Short DID Key from DID Key value pasted in Status field
    const userDidKey = await settingsProfileFirstUser.getStatusInputValue();
    const shortDidKey = await settingsProfileFirstUser.getShortDidKey(
      userDidKey
    );

    // Ensure that the last 9 digits from Did:Key matches with the button text
    const copiedDid = await settingsProfileFirstUser.getCopyIDButtonText();
    await expect(copiedDid).toHaveTextContaining(shortDidKey);

    // Clear value from status input
    await settingsProfileFirstUser.deleteStatus();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Add profile picture", async () => {
    await settingsProfileFirstUser.uploadProfilePicture(
      "./tests/fixtures/logo.jpg"
    );
  });

  it("Settings Profile - Validate change banner tooltip", async () => {
    // Hover on banner picture
    await settingsProfileFirstUser.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    await settingsProfileFirstUser.profileBannerTooltip.waitForExist();
    await expect(
      settingsProfileFirstUser.profileBannerTooltip
    ).toHaveTextContaining("Change banner");
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Add banner picture", async () => {
    await settingsProfileFirstUser.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );

    await settingsProfileFirstUser.usernameInput.click();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change profile picture", async () => {
    await settingsProfileFirstUser.uploadProfilePicture(
      "./tests/fixtures/second-profile.png"
    );
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change banner picture", async () => {
    await settingsProfileFirstUser.uploadBannerPicture(
      "./tests/fixtures/second-banner.jpg"
    );
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Enter status value with more than 128 characters
    await settingsProfileFirstUser.enterStatus(
      "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    );

    await expect(settingsProfileFirstUser.inputError).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.inputErrorMessage
    ).toHaveTextContaining("Maximum of 128 characters exceeded.");

    // Clear value from status input
    await settingsProfileFirstUser.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Enter username value with less than 4 characters
    await settingsProfileFirstUser.enterUsername("123");
    // Validate that error message is displayed
    await expect(settingsProfileFirstUser.inputError).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.inputErrorMessage
    ).toHaveTextContaining("Please enter at least 4 characters.");

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username - Spaces are not allowed", async () => {
    // Enter username value with spaces
    await settingsProfileFirstUser.enterUsername("1234" + "             ");
    // Validate that error message is displayed
    await expect(settingsProfileFirstUser.inputError).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.inputErrorMessage
    ).toHaveTextContaining("Spaces are not allowed.");

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Enter username value with non-alphanumeric characters
    await settingsProfileFirstUser.enterUsername("test&^%*%#$");
    // Validate that error message is displayed
    await expect(settingsProfileFirstUser.inputError).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.inputErrorMessage
    ).toHaveTextContaining("Only alphanumeric characters are accepted.");

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Enter username value with more than 32 characters
    await settingsProfileFirstUser.enterUsername(
      "12345678901234567890123456789012345"
    );
    // Validate that error message is displayed
    await expect(settingsProfileFirstUser.inputError).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.inputErrorMessage
    ).toHaveTextContaining("Maximum of 32 characters exceeded.");

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });
}

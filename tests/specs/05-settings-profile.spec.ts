import "module-alias/register";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FilesScreen from "@screenobjects/files/FilesScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);

export default async function settingsProfile() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and select the Settings Screen to validate
    await filesScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);

    // Start validations
    const prereleaseIndicator =
      await settingsProfileFirstUser.prereleaseIndicator;
    await prereleaseIndicator.waitForExist();

    const prereleaseIndicatorText =
      await settingsProfileFirstUser.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback"
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    const chatsButton = await settingsProfileFirstUser.chatsButton;
    const filesButton = await settingsProfileFirstUser.filesButton;
    const friendsButton = await settingsProfileFirstUser.friendsButton;
    const settingsButton = await settingsProfileFirstUser.settingsButton;

    await chatsButton.waitForExist();
    await filesButton.waitForExist();
    await friendsButton.waitForExist();
    await settingsButton.waitForExist();
  });

  it("Settings Profile - Assert texts for Your New Profile dialog", async () => {
    const yourNewProfile = await settingsProfileFirstUser.yourNewProfile;
    await yourNewProfile.waitForExist();

    const yourNewProfileHeaderText =
      await settingsProfileFirstUser.yourNewProfileHeaderTextValue;
    await expect(yourNewProfileHeaderText).toHaveTextContaining(
      "YOUR NEW PROFILE!"
    );

    const yourNewProfileDescriptionOne =
      await settingsProfileFirstUser.yourNewProfileDescriptionTextOneValue;
    await expect(yourNewProfileDescriptionOne).toHaveTextContaining(
      "Tell the world all about yourself, well.. tell them as much as you can while we're still under construction, at least."
    );

    const yourNewProfileDescriptionTwo =
      await settingsProfileFirstUser.yourNewProfileDescriptionTextTwoValue;
    await expect(yourNewProfileDescriptionTwo).toHaveTextContaining(
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
    const usernameLabel = await settingsProfileFirstUser.usernameLabel;
    await expect(usernameLabel).toHaveTextContaining("USERNAME");

    const statusLabel = await settingsProfileFirstUser.statusLabel;
    await expect(statusLabel).toHaveTextContaining("STATUS");

    // Assert username and status placeholder values are displayed
    const usernameInput = await settingsProfileFirstUser.usernameInput;
    await expect(usernameInput).toHaveTextContaining("Test123");

    const statusInput = await settingsProfileFirstUser.statusInput;
    await expect(statusInput).toHaveTextContaining("");
  });

  it("Settings Profile - Validate Copy ID button tooltip", async () => {
    // Validate Copy ID button tooltip
    await settingsProfileFirstUser.hoverOnCopyID();

    const copyIDTooltip = await settingsProfileFirstUser.copyIDTooltip;
    await copyIDTooltip.waitForExist();

    const copyIDTooltipText = await settingsProfileFirstUser.copyIDTooltipText;
    await expect(copyIDTooltipText).toHaveTextContaining("Copy ID");
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
    const statusInputText =
      await settingsProfileFirstUser.getStatusInputElement();
    await expect(statusInputText).toHaveTextContaining("did:key:");

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
    const profileBannerTooltip =
      await settingsProfileFirstUser.profileBannerTooltip;
    await profileBannerTooltip.waitForExist();
    await expect(profileBannerTooltip).toHaveTextContaining("Change banner");
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Add banner picture", async () => {
    await settingsProfileFirstUser.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );

    const usernameInput = await settingsProfileFirstUser.usernameInput;
    await usernameInput.click();
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

    const inputError = await settingsProfileFirstUser.inputError;
    await inputError.waitForExist();

    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 128 characters exceeded."
    );

    // Clear value from status input
    await settingsProfileFirstUser.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Enter username value with less than 4 characters
    await settingsProfileFirstUser.enterUsername("123");
    // Validate that error message is displayed
    const inputError = await settingsProfileFirstUser.inputError;
    await inputError.waitForExist();

    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters."
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username - Spaces are not allowed", async () => {
    // Enter username value with spaces
    await settingsProfileFirstUser.enterUsername("1234" + "             ");
    // Validate that error message is displayed
    const inputError = await settingsProfileFirstUser.inputError;
    await inputError.waitForExist();

    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Enter username value with non-alphanumeric characters
    await settingsProfileFirstUser.enterUsername("test&^%*%#$");
    // Validate that error message is displayed

    const inputError = await settingsProfileFirstUser.inputError;
    await inputError.waitForExist();

    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): &^%*#$"
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Enter username value with more than 32 characters
    await settingsProfileFirstUser.enterUsername(
      "12345678901234567890123456789012345"
    );
    // Validate that error message is displayed
    const inputError = await settingsProfileFirstUser.inputError;
    await inputError.waitForExist();

    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded."
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });
}

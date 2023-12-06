require("module-alias/register");
import CropImageProfileModal from "@screenobjects/settings/CropToolProfileModal";
import FilesScreen from "@screenobjects/files/FilesScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import { USER_A_INSTANCE, MACOS_DRIVER } from "@helpers/constants";
const cropProfileFirstUser = new CropImageProfileModal(USER_A_INSTANCE);
const filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
const settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);

export default async function settingsProfile() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and select the Settings Screen to validate
    await filesScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);

    // Start validations
    await settingsProfileFirstUser.prereleaseIndicator.waitForExist();
    const prereleaseIndicatorText =
      await settingsProfileFirstUser.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback",
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await settingsProfileFirstUser.chatsButton.waitForExist();
    await settingsProfileFirstUser.filesButton.waitForExist();
    await settingsProfileFirstUser.friendsButton.waitForExist();
    await settingsProfileFirstUser.settingsButton.waitForExist();
  });

  it("Settings Profile - Assert texts for Your New Profile dialog", async () => {
    await settingsProfileFirstUser.yourNewProfile.waitForExist();
    const yourNewProfileHeaderText =
      await settingsProfileFirstUser.yourNewProfileHeaderTextValue;
    await expect(yourNewProfileHeaderText).toHaveTextContaining(
      "YOUR NEW PROFILE!",
    );
    const yourNewProfileDescriptionOne =
      await settingsProfileFirstUser.yourNewProfileDescriptionTextOneValue;
    await expect(yourNewProfileDescriptionOne).toHaveTextContaining(
      "Tell the world all about yourself, well.. tell them as much as you can while we're still under construction, at least.",
    );

    const yourNewProfileDescriptionTwo =
      await settingsProfileFirstUser.yourNewProfileDescriptionTextTwoValue;
    await expect(yourNewProfileDescriptionTwo).toHaveTextContaining(
      "First step, pick out a profile picture and maybe even a banner too!",
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

  it("Settings Profile - Profile picture - Display Crop Tool Modal", async () => {
    // Click on profile picture upload button and select the file logo.jpg
    await settingsProfileFirstUser.selectProfilePicture(
      "./tests/fixtures/logo.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await cropProfileFirstUser.validateCropToolModalIsShown();
  });

  it("Settings Profile - Profile Picture - Crop Tool Modal elements", async () => {
    // Validate Image Preview is displayed on Profile Picture Crop Tool Modal
    await cropProfileFirstUser.cropImagePreview.waitForExist();

    // Validate buttons to increase and decrease zoom are displayed on Profile Picture Crop Tool Modal
    await cropProfileFirstUser.cropImageRangeDecreaseButton.waitForExist();
    await cropProfileFirstUser.cropImageRangeIncreaseButton.waitForExist();

    // Validate input slider for zoom size is displayed on Profile Picture Crop Tool Modal
    await cropProfileFirstUser.cropImageRangeInputSlider.waitForExist();

    // Validate buttons to cancel or confirm edition are displayed on Profile Picture Crop Tool Modal
    await cropProfileFirstUser.cropImageTopbarButtonCancel.waitForExist();
    await cropProfileFirstUser.cropImageTopbarButtonConfirm.waitForExist();

    // Validate helper text is displayed on top of modal
    await cropProfileFirstUser.cropImageTopbarLabel.waitForExist();

    // Validate default value shown for zoom slider is 1
    const rangeValueText = await cropProfileFirstUser.cropImageRangeValueText;
    await expect(rangeValueText).toHaveTextContaining("1");
  });

  it("Settings Profile - Profile Picture - Close Crop Tool Modal", async () => {
    // Click on Cancel button and assert Crop Tool Modal is closed
    await cropProfileFirstUser.clickOnCancelButton();
    await cropProfileFirstUser.cropImageModal.waitForExist({ reverse: true });
  });

  it("Settings Profile - Profile Picture - Crop Image and add profile picture", async () => {
    // Click on profile picture upload button and select the file logo.jpg
    await settingsProfileFirstUser.selectProfilePicture(
      "./tests/fixtures/logo.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await cropProfileFirstUser.validateCropToolModalIsShown();

    // Click three times on increase button, then one time on decrease button
    await cropProfileFirstUser.clickMultipleTimesIncreaseButton(3);
    await cropProfileFirstUser.clickOnDecreaseRangeButton();

    // Validate final value shown for zoom slider is 1
    const rangeValueText = await cropProfileFirstUser.cropImageRangeValueText;
    await expect(rangeValueText).toHaveTextContaining("1.2");

    // Click on confirm button to save
    await cropProfileFirstUser.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await settingsProfileFirstUser.validateProfilePictureIsShown();
  });

  it("Settings Profile - Validate change banner tooltip", async () => {
    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Hover on banner picture
    await settingsProfileFirstUser.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    const profileBannerTooltip =
      await settingsProfileFirstUser.profileBannerTooltip;
    await expect(profileBannerTooltip).toHaveTextContaining("Change banner");
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Crop banner and add banner picture", async () => {
    // Click on banner picture upload button and select the file banner.jpg
    await settingsProfileFirstUser.selectBannerPicture(
      "./tests/fixtures/banner.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await cropProfileFirstUser.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await cropProfileFirstUser.clickOnIncreaseRangeButton();
    await cropProfileFirstUser.clickOnConfirmButton();

    // Validate new banner picture is displayed
    await settingsProfileFirstUser.validateBannerPictureIsShown();
  });

  it("Settings Profile - Change profile picture", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Click on profile picture upload button and select the file second-profile.jpg
    await settingsProfileFirstUser.selectProfilePicture(
      "./tests/fixtures/second-profile.png",
    );

    // Validate Crop Tool Modal is displayed
    await cropProfileFirstUser.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await cropProfileFirstUser.clickOnIncreaseRangeButton();
    await cropProfileFirstUser.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await settingsProfileFirstUser.validateProfilePictureIsShown();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change banner picture", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    await settingsProfileFirstUser.selectBannerPicture(
      "./tests/fixtures/second-banner.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await cropProfileFirstUser.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await cropProfileFirstUser.clickOnIncreaseRangeButton();
    await cropProfileFirstUser.clickOnConfirmButton();

    // Validate new banner picture is displayed
    await settingsProfileFirstUser.validateBannerPictureIsShown();
  });

  it("Settings Profile - Validate Copy ID button tooltip", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Validate Copy ID button tooltip
    await settingsProfileFirstUser.hoverOnCopyID();

    const copyIDTooltipText = await settingsProfileFirstUser.copyIDTooltipText;
    await expect(copyIDTooltipText).toHaveTextContaining("Copy ID");
  });

  it("Settings Profile - Click On Copy ID Button", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfileFirstUser.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Paste copied Username into Status Input
    await settingsProfileFirstUser.pasteUserNameInStatus("Test123");

    // Clear value from status input
    await settingsProfileFirstUser.deleteStatus();

    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();
  });

  it("Settings Profile - Right Click On Copy ID Button to Copy Username", async () => {
    const currentDriver = await settingsProfileFirstUser.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Right click on Copy ID button and select Copy ID
      await settingsProfileFirstUser.openCopyIDContextMenu();
      await settingsProfileFirstUser.clickOnContextMenuCopyId();

      // Wait for toast notification to be closed
      await settingsProfileFirstUser.waitUntilNotificationIsClosed();

      // Paste copied Username into Status Input
      await settingsProfileFirstUser.pasteUserNameInStatus("Test123");

      // Clear value from status input
      await settingsProfileFirstUser.deleteStatus();

      // Wait for toast notification to be closed
      await settingsProfileFirstUser.waitUntilNotificationIsClosed();
    }
  });

  it("Settings Profile - Right Click On Copy ID Button to Copy DID", async () => {
    const currentDriver = await settingsProfileFirstUser.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Right click on Copy DID button and select Copy ID
      await settingsProfileFirstUser.openCopyIDContextMenu();
      await settingsProfileFirstUser.clickOnContextMenuCopyDidKey();

      // Wait for toast notification to be closed
      await settingsProfileFirstUser.waitUntilNotificationIsClosed();

      // Paste copied Username into Status Input
      await settingsProfileFirstUser.pasteUserKeyInStatus();

      // Clear value from status input
      await settingsProfileFirstUser.deleteStatus();

      // Wait for toast notification to be closed
      await settingsProfileFirstUser.waitUntilNotificationIsClosed();
    }
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Enter status value with 129 characters
    await settingsProfileFirstUser.enterStatus(
      "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
    );

    // Validate input error message is displayed
    await browser.pause(1000);
    await settingsProfileFirstUser.inputError.waitForExist();
    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 128 characters exceeded.",
    );

    // Clear value from status input
    await settingsProfileFirstUser.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Enter username value with less than 4 characters
    await settingsProfileFirstUser.enterUsername("123");
    // Validate that error message is displayed
    await settingsProfileFirstUser.inputError.waitForExist();
    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters.",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username - Spaces are not allowed", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Enter username value with spaces
    await settingsProfileFirstUser.enterUsername("1234" + "             ");
    // Validate that error message is displayed
    await settingsProfileFirstUser.inputError.waitForExist();
    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed.",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Enter username value with non-alphanumeric characters
    await settingsProfileFirstUser.enterUsername("test&^%*%#$");
    // Validate that error message is displayed

    await settingsProfileFirstUser.inputError.waitForExist();
    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): &^%*#$",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

    // Enter username value with more than 32 characters
    await settingsProfileFirstUser.enterUsername(
      "12345678901234567890123456789012345",
    );
    // Validate that error message is displayed
    await settingsProfileFirstUser.inputError.waitForExist();
    const inputErrorText = await settingsProfileFirstUser.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded.",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfileFirstUser.enterUsername("Test123");

    // Wait for toast notification to be closed before starting next tests
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();
  });
}

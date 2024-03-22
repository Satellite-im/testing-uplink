require("module-alias/register");
import CropImageProfileModal from "@screenobjects/settings/CropToolProfileModal";
import FilesScreen from "@screenobjects/files/FilesScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import { MACOS_DRIVER } from "@helpers/constants";
import { getUserRecoverySeed, scrollDown } from "@helpers/commands";

export default async function settingsProfileTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and select the Settings Screen to validate
    await FilesScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Start validations
    await SettingsProfileScreen.releaseIndicator.waitForExist();
    const releaseIndicatorText =
      await SettingsProfileScreen.releaseIndicatorText;
    await expect(releaseIndicatorText).toHaveTextContaining(
      "Alpha | Issues/Feedback",
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await SettingsProfileScreen.chatsButton.waitForExist();
    await SettingsProfileScreen.filesButton.waitForExist();
    await SettingsProfileScreen.friendsButton.waitForExist();
    await SettingsProfileScreen.settingsButton.waitForExist();
  });

  it("Settings Profile - Assert texts for Your New Profile dialog", async () => {
    await SettingsProfileScreen.yourNewProfile.waitForExist();
    const yourNewProfileHeaderText =
      await SettingsProfileScreen.yourNewProfileHeaderTextValue;
    await expect(yourNewProfileHeaderText).toHaveTextContaining(
      "YOUR NEW PROFILE!",
    );
    const yourNewProfileDescriptionOne =
      await SettingsProfileScreen.yourNewProfileDescriptionTextOneValue;
    await expect(yourNewProfileDescriptionOne).toHaveTextContaining(
      "Tell the world all about yourself, well.. tell them as much as you can while we're still under construction, at least.",
    );

    const yourNewProfileDescriptionTwo =
      await SettingsProfileScreen.yourNewProfileDescriptionTextTwoValue;
    await expect(yourNewProfileDescriptionTwo).toHaveTextContaining(
      "First step, pick out a profile picture and maybe even a banner too!",
    );
  });

  it("Settings Profile - Dismiss Your New Profile dialog", async () => {
    await SettingsProfileScreen.clickOnDismissButton();
    await SettingsProfileScreen.dismissButton.waitForExist({
      reverse: true,
    });
  });

  it("Settings Profile - Assert screen and placeholder texts", async () => {
    // Assert username and status labels are displayed on screen
    const usernameLabel = await SettingsProfileScreen.usernameLabel;
    await expect(usernameLabel).toHaveTextContaining("USERNAME");

    const statusLabel = await SettingsProfileScreen.statusLabel;
    await expect(statusLabel).toHaveTextContaining("STATUS");

    // Assert username and status placeholder values are displayed
    const usernameInput = await SettingsProfileScreen.usernameInput;
    await expect(usernameInput).toHaveTextContaining("Test123");

    const statusInput = await SettingsProfileScreen.statusInput;
    await expect(statusInput).toHaveTextContaining("");
  });

  it("Settings Profile - Profile picture - Display Crop Tool Modal", async () => {
    // Click on profile picture upload button and select the file logo.jpg
    await SettingsProfileScreen.selectProfilePicture(
      "./tests/fixtures/logo.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await CropImageProfileModal.validateCropToolModalIsShown();
  });

  it("Settings Profile - Profile Picture - Crop Tool Modal elements", async () => {
    // Validate Image Preview is displayed on Profile Picture Crop Tool Modal
    await CropImageProfileModal.cropImagePreview.waitForExist();

    // Validate buttons to increase and decrease zoom are displayed on Profile Picture Crop Tool Modal
    await CropImageProfileModal.cropImageRangeDecreaseButton.waitForExist();
    await CropImageProfileModal.cropImageRangeIncreaseButton.waitForExist();

    // Validate input slider for zoom size is displayed on Profile Picture Crop Tool Modal
    await CropImageProfileModal.cropImageRangeInputSlider.waitForExist();

    // Validate buttons to cancel or confirm edition are displayed on Profile Picture Crop Tool Modal
    await CropImageProfileModal.cropImageTopbarButtonCancel.waitForExist();
    await CropImageProfileModal.cropImageTopbarButtonConfirm.waitForExist();

    // Validate helper text is displayed on top of modal
    await CropImageProfileModal.cropImageTopbarLabel.waitForExist();

    // Validate default value shown for zoom slider is 1
    const rangeValueText = await CropImageProfileModal.cropImageRangeValueText;
    await expect(rangeValueText).toHaveTextContaining("1");
  });

  it("Settings Profile - Profile Picture - Close Crop Tool Modal", async () => {
    // Click on Cancel button and assert Crop Tool Modal is closed
    await CropImageProfileModal.clickOnCancelButton();
    await CropImageProfileModal.cropImageModal.waitForExist({ reverse: true });
  });

  it("Settings Profile - Profile Picture - Crop Image and add profile picture", async () => {
    // Click on profile picture upload button and select the file logo.jpg
    await SettingsProfileScreen.selectProfilePicture(
      "./tests/fixtures/logo.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await CropImageProfileModal.validateCropToolModalIsShown();

    // Click three times on increase button, then one time on decrease button
    await CropImageProfileModal.clickMultipleTimesIncreaseButton(3);
    await CropImageProfileModal.clickOnDecreaseRangeButton();

    // Validate final value shown for zoom slider is 1
    const rangeValueText = await CropImageProfileModal.cropImageRangeValueText;
    await expect(rangeValueText).toHaveTextContaining("1.2");

    // Click on confirm button to save
    await CropImageProfileModal.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await SettingsProfileScreen.validateProfilePictureIsShown();
  });

  it("Settings Profile - Validate change banner tooltip", async () => {
    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Hover on banner picture
    await SettingsProfileScreen.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    const profileBannerTooltip =
      await SettingsProfileScreen.profileBannerTooltip;
    await expect(profileBannerTooltip).toHaveTextContaining("Change banner");
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Crop banner and add banner picture", async () => {
    // Click on banner picture upload button and select the file banner.jpg
    await SettingsProfileScreen.selectBannerPicture(
      "./tests/fixtures/banner.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await CropImageProfileModal.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await CropImageProfileModal.clickOnIncreaseRangeButton();
    await CropImageProfileModal.clickOnConfirmButton();

    // Validate new banner picture is displayed
    await SettingsProfileScreen.validateBannerPictureIsShown();
  });

  it("Settings Profile - Change profile picture", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Click on profile picture upload button and select the file second-profile.jpg
    await SettingsProfileScreen.selectProfilePicture(
      "./tests/fixtures/second-profile.png",
    );

    // Validate Crop Tool Modal is displayed
    await CropImageProfileModal.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await CropImageProfileModal.clickOnIncreaseRangeButton();
    await CropImageProfileModal.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await SettingsProfileScreen.validateProfilePictureIsShown();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change banner picture", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    await SettingsProfileScreen.selectBannerPicture(
      "./tests/fixtures/second-banner.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await CropImageProfileModal.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await CropImageProfileModal.clickOnIncreaseRangeButton();
    await CropImageProfileModal.clickOnConfirmButton();

    // Validate new banner picture is displayed
    await SettingsProfileScreen.validateBannerPictureIsShown();
  });

  it("Settings Profile - Validate Copy ID button tooltip", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Validate Copy ID button tooltip
    await SettingsProfileScreen.hoverOnCopyID();

    const copyIDTooltipText = await SettingsProfileScreen.copyIDTooltipText;
    await expect(copyIDTooltipText).toHaveTextContaining("Copy ID");
  });

  it("Settings Profile - Click On Copy ID Button", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied Username into Status Input
    await SettingsProfileScreen.pasteUserNameInStatus("Test123");

    // Clear value from status input
    await SettingsProfileScreen.deleteStatus();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();
  });

  it("Settings Profile - Right Click On Copy ID Button to Copy Username", async () => {
    const currentDriver = await SettingsProfileScreen.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Right click on Copy ID button and select Copy ID
      await SettingsProfileScreen.openCopyIDContextMenu();
      await SettingsProfileScreen.clickOnContextMenuCopyId();

      // Wait for toast notification to be closed
      await SettingsProfileScreen.waitUntilNotificationIsClosed();

      // Paste copied Username into Status Input
      await SettingsProfileScreen.pasteUserNameInStatus("Test123");

      // Clear value from status input
      await SettingsProfileScreen.deleteStatus();

      // Wait for toast notification to be closed
      await SettingsProfileScreen.waitUntilNotificationIsClosed();
    }
  });

  it("Settings Profile - Right Click On Copy ID Button to Copy DID", async () => {
    const currentDriver = await SettingsProfileScreen.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Right click on Copy DID button and select Copy ID
      await SettingsProfileScreen.openCopyIDContextMenu();
      await SettingsProfileScreen.clickOnContextMenuCopyDidKey();

      // Wait for toast notification to be closed
      await SettingsProfileScreen.waitUntilNotificationIsClosed();

      // Paste copied Username into Status Input
      await SettingsProfileScreen.pasteUserKeyInStatus();

      // Clear value from status input
      await SettingsProfileScreen.deleteStatus();

      // Wait for toast notification to be closed
      await SettingsProfileScreen.waitUntilNotificationIsClosed();
    }
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Enter status value with 129 characters
    await SettingsProfileScreen.enterStatus(
      "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
    );

    // Validate input error message is displayed
    await browser.pause(1000);
    await SettingsProfileScreen.inputError.waitForExist();
    const inputErrorText = await SettingsProfileScreen.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 128 characters exceeded.",
    );

    // Clear value from status input
    await SettingsProfileScreen.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Enter username value with less than 4 characters
    await SettingsProfileScreen.enterUsername("123");
    // Validate that error message is displayed
    await SettingsProfileScreen.inputError.waitForExist();
    const inputErrorText = await SettingsProfileScreen.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters.",
    );

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");
  });

  it("Settings Profile - Username - Spaces are not allowed", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Enter username value with spaces
    await SettingsProfileScreen.enterUsername("1234" + "             ");
    // Validate that error message is displayed
    await SettingsProfileScreen.inputError.waitForExist();
    const inputErrorText = await SettingsProfileScreen.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed.",
    );

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Enter username value with non-alphanumeric characters
    await SettingsProfileScreen.enterUsername("test&^%*%#$");
    // Validate that error message is displayed

    await SettingsProfileScreen.inputError.waitForExist();
    const inputErrorText = await SettingsProfileScreen.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): &^%*#$",
    );

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Enter username value with more than 32 characters
    await SettingsProfileScreen.enterUsername(
      "12345678901234567890123456789012345",
    );
    // Validate that error message is displayed
    await SettingsProfileScreen.inputError.waitForExist();
    const inputErrorText = await SettingsProfileScreen.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded.",
    );

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("Test123");

    // Wait for toast notification to be closed before starting next tests
    await SettingsProfileScreen.waitUntilNotificationIsClosed();
  });

  it("Settings Profile - Assert contents from Online Status and Recovery Seed", async () => {
    // Scroll to bottom of the screen
    await scrollDown(1000);

    // Validate contents of Online Status section on Settings Profile
    const onlineStatusHeader = await SettingsProfileScreen.onlineStatusHeader;
    const onlineStatusDescription =
      await SettingsProfileScreen.onlineStatusDescription;
    await expect(onlineStatusHeader).toHaveText("ONLINE STATUS");
    await expect(onlineStatusDescription).toHaveText(
      "Set the appearance of your online status",
    );

    // Validate contents of Recovery Seed section on Settings Profile
    const recoverySeedHeader = await SettingsProfileScreen.recoverySeedHeader;
    const recoverySeedDescription =
      await SettingsProfileScreen.recoverySeedDescription;

    await expect(recoverySeedHeader).toHaveText("RECOVERY SEED");
    await expect(recoverySeedDescription).toHaveText(
      'This seed represents the "master key" for your account. Keep this safe and secure somewhere in order to maintain proper control and security over your Uplink account.',
    );
  });

  it("Settings Profile - Online Status - Default status is Online", async () => {
    // Default Online Status is set to "Online"
    const currentOnlineStatus =
      await SettingsProfileScreen.selectorCurrentValue;
    await expect(currentOnlineStatus).toHaveText("Online");
  });

  it("Settings Profile - Online Status - Status can be changed", async () => {
    // Change Status to Idle
    await SettingsProfileScreen.selectIdleStatus();

    // Validate status is Idle now
    const currentOnlineStatus =
      await SettingsProfileScreen.selectorCurrentValue;
    await expect(currentOnlineStatus).toHaveText("Idle");
  });

  it("Settings Profile - Online Status - Status value remains when changing screen", async () => {
    // Go to a different screen, return to Settings Profile and validate status is still Idle
    await SettingsProfileScreen.goToFiles();
    await FilesScreen.goToSettings();

    // Validate status is still Idle
    const onlineStatus = await SettingsProfileScreen.selectorCurrentValue;
    await expect(onlineStatus).toHaveText("Idle");
  });

  it("Settings Profile - Recovery Seed - Reveal Seed Words", async () => {
    // Reveal Recovery Seed
    await SettingsProfileScreen.clickOnRevealRecoverySeed();

    // Return previously stored seeds
    const savedRecoverySeed = await getUserRecoverySeed("Test123");
    const wordsSavedRecoverySeed = await savedRecoverySeed.split(" ");

    // Validate seed words displayed are the same as the ones previously stored
    const seedWordsSettingsProfile = await SettingsProfileScreen.getSeedWords();
    await expect(seedWordsSettingsProfile.length).toEqual(12);
    await expect(seedWordsSettingsProfile).toEqual(wordsSavedRecoverySeed);
  });
}

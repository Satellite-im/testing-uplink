require("module-alias/register");
import CropImageProfileModal from "@screenobjects/settings/CropToolProfileModal";
import FilesScreen from "@screenobjects/files/FilesScreen";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import { MACOS_DRIVER } from "@helpers/constants";
import { getUserRecoverySeed, scrollDown } from "@helpers/commands";
const cropProfile = new CropImageProfileModal();
const filesScreen = new FilesScreen();
const settingsProfile = new SettingsProfileScreen();

export default async function settingsProfileTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and select the Settings Screen to validate
    await filesScreen.goToSettings();
    await settingsProfile.waitForIsShown(true);

    // Start validations
    await settingsProfile.prereleaseIndicator.waitForExist();
    const prereleaseIndicatorText =
      await settingsProfile.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback",
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await settingsProfile.chatsButton.waitForExist();
    await settingsProfile.filesButton.waitForExist();
    await settingsProfile.friendsButton.waitForExist();
    await settingsProfile.settingsButton.waitForExist();
  });

  it("Settings Profile - Assert texts for Your New Profile dialog", async () => {
    await settingsProfile.yourNewProfile.waitForExist();
    const yourNewProfileHeaderText =
      await settingsProfile.yourNewProfileHeaderTextValue;
    await expect(yourNewProfileHeaderText).toHaveTextContaining(
      "YOUR NEW PROFILE!",
    );
    const yourNewProfileDescriptionOne =
      await settingsProfile.yourNewProfileDescriptionTextOneValue;
    await expect(yourNewProfileDescriptionOne).toHaveTextContaining(
      "Tell the world all about yourself, well.. tell them as much as you can while we're still under construction, at least.",
    );

    const yourNewProfileDescriptionTwo =
      await settingsProfile.yourNewProfileDescriptionTextTwoValue;
    await expect(yourNewProfileDescriptionTwo).toHaveTextContaining(
      "First step, pick out a profile picture and maybe even a banner too!",
    );
  });

  it("Settings Profile - Dismiss Your New Profile dialog", async () => {
    await settingsProfile.clickOnDismissButton();
    await settingsProfile.dismissButton.waitForExist({
      reverse: true,
    });
  });

  it("Settings Profile - Assert screen and placeholder texts", async () => {
    // Assert username and status labels are displayed on screen
    const usernameLabel = await settingsProfile.usernameLabel;
    await expect(usernameLabel).toHaveTextContaining("USERNAME");

    const statusLabel = await settingsProfile.statusLabel;
    await expect(statusLabel).toHaveTextContaining("STATUS");

    // Assert username and status placeholder values are displayed
    const usernameInput = await settingsProfile.usernameInput;
    await expect(usernameInput).toHaveTextContaining("Test123");

    const statusInput = await settingsProfile.statusInput;
    await expect(statusInput).toHaveTextContaining("");
  });

  it("Settings Profile - Profile picture - Display Crop Tool Modal", async () => {
    // Click on profile picture upload button and select the file logo.jpg
    await settingsProfile.selectProfilePicture("./tests/fixtures/logo.jpg");

    // Validate Crop Tool Modal is displayed
    await cropProfile.validateCropToolModalIsShown();
  });

  it("Settings Profile - Profile Picture - Crop Tool Modal elements", async () => {
    // Validate Image Preview is displayed on Profile Picture Crop Tool Modal
    await cropProfile.cropImagePreview.waitForExist();

    // Validate buttons to increase and decrease zoom are displayed on Profile Picture Crop Tool Modal
    await cropProfile.cropImageRangeDecreaseButton.waitForExist();
    await cropProfile.cropImageRangeIncreaseButton.waitForExist();

    // Validate input slider for zoom size is displayed on Profile Picture Crop Tool Modal
    await cropProfile.cropImageRangeInputSlider.waitForExist();

    // Validate buttons to cancel or confirm edition are displayed on Profile Picture Crop Tool Modal
    await cropProfile.cropImageTopbarButtonCancel.waitForExist();
    await cropProfile.cropImageTopbarButtonConfirm.waitForExist();

    // Validate helper text is displayed on top of modal
    await cropProfile.cropImageTopbarLabel.waitForExist();

    // Validate default value shown for zoom slider is 1
    const rangeValueText = await cropProfile.cropImageRangeValueText;
    await expect(rangeValueText).toHaveTextContaining("1");
  });

  it("Settings Profile - Profile Picture - Close Crop Tool Modal", async () => {
    // Click on Cancel button and assert Crop Tool Modal is closed
    await cropProfile.clickOnCancelButton();
    await cropProfile.cropImageModal.waitForExist({ reverse: true });
  });

  it("Settings Profile - Profile Picture - Crop Image and add profile picture", async () => {
    // Click on profile picture upload button and select the file logo.jpg
    await settingsProfile.selectProfilePicture("./tests/fixtures/logo.jpg");

    // Validate Crop Tool Modal is displayed
    await cropProfile.validateCropToolModalIsShown();

    // Click three times on increase button, then one time on decrease button
    await cropProfile.clickMultipleTimesIncreaseButton(3);
    await cropProfile.clickOnDecreaseRangeButton();

    // Validate final value shown for zoom slider is 1
    const rangeValueText = await cropProfile.cropImageRangeValueText;
    await expect(rangeValueText).toHaveTextContaining("1.2");

    // Click on confirm button to save
    await cropProfile.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await settingsProfile.validateProfilePictureIsShown();
  });

  it("Settings Profile - Validate change banner tooltip", async () => {
    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Hover on banner picture
    await settingsProfile.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    const profileBannerTooltip = await settingsProfile.profileBannerTooltip;
    await expect(profileBannerTooltip).toHaveTextContaining("Change banner");
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Crop banner and add banner picture", async () => {
    // Click on banner picture upload button and select the file banner.jpg
    await settingsProfile.selectBannerPicture("./tests/fixtures/banner.jpg");

    // Validate Crop Tool Modal is displayed
    await cropProfile.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await cropProfile.clickOnIncreaseRangeButton();
    await cropProfile.clickOnConfirmButton();

    // Validate new banner picture is displayed
    await settingsProfile.validateBannerPictureIsShown();
  });

  it("Settings Profile - Change profile picture", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Click on profile picture upload button and select the file second-profile.jpg
    await settingsProfile.selectProfilePicture(
      "./tests/fixtures/second-profile.png",
    );

    // Validate Crop Tool Modal is displayed
    await cropProfile.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await cropProfile.clickOnIncreaseRangeButton();
    await cropProfile.clickOnConfirmButton();

    // Validate new profile picture is displayed
    await settingsProfile.validateProfilePictureIsShown();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change banner picture", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    await settingsProfile.selectBannerPicture(
      "./tests/fixtures/second-banner.jpg",
    );

    // Validate Crop Tool Modal is displayed
    await cropProfile.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await cropProfile.clickOnIncreaseRangeButton();
    await cropProfile.clickOnConfirmButton();

    // Validate new banner picture is displayed
    await settingsProfile.validateBannerPictureIsShown();
  });

  it("Settings Profile - Validate Copy ID button tooltip", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Validate Copy ID button tooltip
    await settingsProfile.hoverOnCopyID();

    const copyIDTooltipText = await settingsProfile.copyIDTooltipText;
    await expect(copyIDTooltipText).toHaveTextContaining("Copy ID");
  });

  it("Settings Profile - Click On Copy ID Button", async () => {
    // Click on Copy ID button and assert Toast Notification is displayed
    await settingsProfile.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();

    // Paste copied Username into Status Input
    await settingsProfile.pasteUserNameInStatus("Test123");

    // Clear value from status input
    await settingsProfile.deleteStatus();

    // Wait for toast notification to be closed
    await settingsProfile.waitUntilNotificationIsClosed();
  });

  it("Settings Profile - Right Click On Copy ID Button to Copy Username", async () => {
    const currentDriver = await settingsProfile.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Right click on Copy ID button and select Copy ID
      await settingsProfile.openCopyIDContextMenu();
      await settingsProfile.clickOnContextMenuCopyId();

      // Wait for toast notification to be closed
      await settingsProfile.waitUntilNotificationIsClosed();

      // Paste copied Username into Status Input
      await settingsProfile.pasteUserNameInStatus("Test123");

      // Clear value from status input
      await settingsProfile.deleteStatus();

      // Wait for toast notification to be closed
      await settingsProfile.waitUntilNotificationIsClosed();
    }
  });

  it("Settings Profile - Right Click On Copy ID Button to Copy DID", async () => {
    const currentDriver = await settingsProfile.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      // Right click on Copy DID button and select Copy ID
      await settingsProfile.openCopyIDContextMenu();
      await settingsProfile.clickOnContextMenuCopyDidKey();

      // Wait for toast notification to be closed
      await settingsProfile.waitUntilNotificationIsClosed();

      // Paste copied Username into Status Input
      await settingsProfile.pasteUserKeyInStatus();

      // Clear value from status input
      await settingsProfile.deleteStatus();

      // Wait for toast notification to be closed
      await settingsProfile.waitUntilNotificationIsClosed();
    }
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Enter status value with 129 characters
    await settingsProfile.enterStatus(
      "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
    );

    // Validate input error message is displayed
    await browser.pause(1000);
    await settingsProfile.inputError.waitForExist();
    const inputErrorText = await settingsProfile.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 128 characters exceeded.",
    );

    // Clear value from status input
    await settingsProfile.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Enter username value with less than 4 characters
    await settingsProfile.enterUsername("123");
    // Validate that error message is displayed
    await settingsProfile.inputError.waitForExist();
    const inputErrorText = await settingsProfile.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters.",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfile.enterUsername("Test123");
  });

  it("Settings Profile - Username - Spaces are not allowed", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Enter username value with spaces
    await settingsProfile.enterUsername("1234" + "             ");
    // Validate that error message is displayed
    await settingsProfile.inputError.waitForExist();
    const inputErrorText = await settingsProfile.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed.",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfile.enterUsername("Test123");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Enter username value with non-alphanumeric characters
    await settingsProfile.enterUsername("test&^%*%#$");
    // Validate that error message is displayed

    await settingsProfile.inputError.waitForExist();
    const inputErrorText = await settingsProfile.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): &^%*#$",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfile.enterUsername("Test123");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfile.waitUntilNotificationIsClosed();

    // Enter username value with more than 32 characters
    await settingsProfile.enterUsername("12345678901234567890123456789012345");
    // Validate that error message is displayed
    await settingsProfile.inputError.waitForExist();
    const inputErrorText = await settingsProfile.inputErrorMessage;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded.",
    );

    // Clear value from username input, then enter a valid value again
    await settingsProfile.enterUsername("Test123");

    // Wait for toast notification to be closed before starting next tests
    await settingsProfile.waitUntilNotificationIsClosed();
  });

  it("Settings Profile - Assert contents from Online Status and Recovery Seed", async () => {
    // Scroll to bottom of the screen
    await scrollDown(1000);

    // Validate contents of Online Status section on Settings Profile
    const onlineStatusHeader = await settingsProfile.onlineStatusHeader;
    const onlineStatusDescription =
      await settingsProfile.onlineStatusDescription;
    await expect(onlineStatusHeader).toHaveText("ONLINE STATUS");
    await expect(onlineStatusDescription).toHaveText(
      "Set the appearance of your online status",
    );

    // Validate contents of Recovery Seed section on Settings Profile
    const recoverySeedHeader = await settingsProfile.recoverySeedHeader;
    const recoverySeedDescription =
      await settingsProfile.recoverySeedDescription;

    await expect(recoverySeedHeader).toHaveText("RECOVERY SEED");
    await expect(recoverySeedDescription).toHaveText(
      'This seed represents the "master key" for your account. Keep this safe and secure somewhere in order to maintain proper control and security over your Uplink account.',
    );
  });

  it("Settings Profile - Online Status - Default status is Online", async () => {
    // Default Online Status is set to "Online"
    const currentOnlineStatus = await settingsProfile.selectorCurrentValue;
    await expect(currentOnlineStatus).toHaveText("Online");
  });

  it("Settings Profile - Online Status - Status can be changed", async () => {
    // Change Status to Idle
    await settingsProfile.selectIdleStatus();

    // Validate status is Idle now
    const currentOnlineStatus = await settingsProfile.selectorCurrentValue;
    await expect(currentOnlineStatus).toHaveText("Idle");
  });

  it("Settings Profile - Online Status - Status value remains when changing screen", async () => {
    // Go to a different screen, return to Settings Profile and validate status is still Idle
    await settingsProfile.goToFiles();
    await filesScreen.goToSettings();

    // Validate status is still Idle
    const onlineStatus = await settingsProfile.selectorCurrentValue;
    await expect(onlineStatus).toHaveText("Idle");
  });

  it("Settings Profile - Recovery Seed - Reveal Seed Words", async () => {
    // Reveal Recovery Seed
    await settingsProfile.clickOnRevealRecoverySeed();

    // Return previously stored seeds
    const savedRecoverySeed = await getUserRecoverySeed("Test123");
    const wordsSavedRecoverySeed = await savedRecoverySeed.split(" ");

    // Validate seed words displayed are the same as the ones previously stored
    const seedWordsSettingsProfile = await settingsProfile.getSeedWords();
    await expect(seedWordsSettingsProfile.length).toEqual(12);
    await expect(seedWordsSettingsProfile).toEqual(wordsSavedRecoverySeed);
  });
}

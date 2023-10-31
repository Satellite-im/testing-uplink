import "module-alias/register";
import { grabCacheFolder, maximizeWindow, saveTestKeys } from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import CreateUserScreen from "@screenobjects/account-creation/CreateUserScreen";
import CropImageProfileModal from "@screenobjects/settings/CropToolProfileModal";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let createPinFirstUser = new CreatePinScreen(USER_A_INSTANCE);
let createUserFirstUser = new CreateUserScreen(USER_A_INSTANCE);
let cropProfileFirstUser = new CropImageProfileModal(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function createSecondAccount() {
  it("Create Account button should be disabled if no pin has been entered", async () => {
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Unlock Screen - Reset Account is shown after right clicking on Help Button", async () => {
    // Right click on Help Button to show the help menu
    await createPinFirstUser.openHelpButtonMenu();

    // Right click again on Help Button to hide the help menu
    await createPinFirstUser.openHelpButtonMenu();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await createPinFirstUser.enterPin("1234");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createPinFirstUser.clickOnCreateAccount();
    await createUserFirstUser.waitForIsShown(true);
  });

  it("Enter valid username to continue", async () => {
    await createUserFirstUser.enterUsername("ChatUserB");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createUserFirstUser.clickOnCreateAccount();
    await welcomeScreenFirstUser.waitForIsShown(true);

    // Maximize Window on Execution
    await maximizeWindow(USER_A_INSTANCE);
  });

  it("Go to Settings with Chat User B", async () => {
    // Go to Settings Screen and select the Settings Screen to validate
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
  });

  it("Settings Profile - Profile Picture - Crop Image and add profile picture", async () => {
    // Click on profile picture upload button and select the file logo.jpg
    await settingsProfileFirstUser.selectProfilePicture(
      "./tests/fixtures/logo.jpg"
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

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Crop banner and add banner picture", async () => {
    // Click on banner picture upload button and select the file banner.jpg
    await settingsProfileFirstUser.selectBannerPicture(
      "./tests/fixtures/banner.jpg"
    );

    // Validate Crop Tool Modal is displayed
    await cropProfileFirstUser.validateCropToolModalIsShown();

    // Change the size of picture and click on confirm button to save
    await cropProfileFirstUser.clickOnIncreaseRangeButton();
    await cropProfileFirstUser.clickOnConfirmButton();

    // Validate new banner picture is displayed
    await settingsProfileFirstUser.validateBannerPictureIsShown();
  });

  it("Settings Profile - Click On Copy ID Button", async () => {
    // Wait for toast notification to be closed before starting test
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();

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

    const didkey = await settingsProfileFirstUser.getCopiedDidFromStatusInput();
    const username = "ChatUserA";
    // Grab cache folder and restart
    await saveTestKeys(username, didkey, USER_A_INSTANCE);

    // Update banner picture from user A
    await grabCacheFolder(username, USER_A_INSTANCE);

    // Clear value from status input
    await settingsProfileFirstUser.deleteStatus();
  });
}

require("module-alias/register");
import { resetApp } from "@helpers/commands";
import CreateOrImportScreen from "@screenobjects/account-creation/CreateOrImportScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import EnterRecoverySeedScreen from "@screenobjects/account-creation/EnterRecoverySeedScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const createOrImport = new CreateOrImportScreen();
const createPin = new CreatePinScreen();
const enterRecoverySeed = new EnterRecoverySeedScreen();
const welcomeScreen = new WelcomeScreen();

export default async function createAccountTests() {
  it("Enter Pin Screen - Clear cache, reset app and enter a valid pin", async () => {
    // Clear cache and reset app
    await resetApp();

    // Validate Enter Pin Screen is displayed and enter a valid pin
    await createPin.unlockWarningHeader.waitForExist();
    await createPin.enterPin("1234");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createPin.clickOnCreateAccount();
  });

  it("Enter Recovery Seed - Validate Screen Contents", async () => {
    // Validate Create or Import Account is displayed
    await createOrImport.waitForIsShown(true);

    // Click on Import Account
    await createOrImport.clickOnImportAccount();

    // Validate contents of Enter Recovery Seed Screen
    await enterRecoverySeed.waitForIsShown(true);
    const helperText = await enterRecoverySeed.recoverySeedHelperText;
    const screenTitle = await enterRecoverySeed.recoverySeedTitleText;
    await expect(helperText).toHaveTextContaining(
      "Type your recovery seed here. You may either enter one word at a time or all at once separated by spaces.",
    );
    await expect(screenTitle).toHaveTextContaining("RECOVERY SEED");
  });

  it("Save Recovery Seed Screen - Enter an invalid valid recovery seed", async () => {
    await welcomeScreen.waitForIsShown(true);
  });
}

require("module-alias/register");
import { getUserRecoverySeed, resetApp } from "@helpers/commands";
import CreateOrImportScreen from "@screenobjects/account-creation/CreateOrImportScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import EnterRecoverySeedScreen from "@screenobjects/account-creation/EnterRecoverySeedScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const createOrImport = new CreateOrImportScreen();
const createPin = new CreatePinScreen();
const enterRecoverySeed = new EnterRecoverySeedScreen();
const welcomeScreen = new WelcomeScreen();

export default async function importAccountTests() {
  it("Enter Pin Screen - Clear cache, reset app and enter a valid pin", async () => {
    // Clear cache and reset app
    await resetApp();

    // Validate Enter Pin Screen is displayed and enter a valid pin
    await createPin.waitForIsShown(true);
    await createPin.enterPinOnCreateAccount("1234");
    await createPin.waitUntilCreateAccountButtonIsEnabled();
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

  it("Save Recovery Seed Screen - Attempt to enter invalid recovery seed", async () => {
    await enterRecoverySeed.typeOnRecoverySeedInput("invalid");
    await enterRecoverySeed.clickOnRecoverAccountButton();
    await enterRecoverySeed.inputError.waitForExist();
    const inputErrorText = await enterRecoverySeed.inputErrorText;
    await expect(inputErrorText).toHaveText("Hmm, that seed didn't work.");
  });

  it("Save Recovery Seed Screen - Enter valid recovery seed and continue", async () => {
    const recoverySeed = await getUserRecoverySeed("Test123");
    await enterRecoverySeed.typeOnRecoverySeedInput(recoverySeed);
    await enterRecoverySeed.clickOnRecoverAccountButton();
    await welcomeScreen.waitForIsShown(true);
  });
}

require("module-alias/register");
import { getUserRecoverySeed, resetApp } from "@helpers/commands";
import CreateOrImportScreen from "@screenobjects/account-creation/CreateOrImportScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import EnterRecoverySeedScreen from "@screenobjects/account-creation/EnterRecoverySeedScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";

export default async function importAccountTests() {
  it("Enter Pin Screen - Clear cache, reset app and enter a valid pin", async () => {
    // Clear cache and reset app
    await resetApp();

    // Validate Enter Pin Screen is displayed and enter a valid pin
    await CreatePinScreen.waitForIsShown(true);
    await CreatePinScreen.enterPinOnCreateAccount("1234");
    await CreatePinScreen.waitUntilCreateAccountButtonIsEnabled();
    await CreatePinScreen.clickOnCreateAccount();
  });

  it("Enter Recovery Seed - Validate Screen Contents", async () => {
    // Validate Create or Import Account is displayed
    await CreateOrImportScreen.waitForIsShown(true);

    // Click on Import Account
    await CreateOrImportScreen.clickOnImportAccount();

    // Validate contents of Enter Recovery Seed Screen
    await EnterRecoverySeedScreen.waitForIsShown(true);
    const helperText = await EnterRecoverySeedScreen.recoverySeedHelperText;
    const screenTitle = await EnterRecoverySeedScreen.recoverySeedTitleText;
    await expect(helperText).toHaveText(
      "Type your recovery seed here. Each phrase should go into their respective box. Alternatively you can simply copy past your recovery seed in here.",
    );
    await expect(screenTitle).toHaveText("RECOVERY SEED");
  });

  it("Save Recovery Seed Screen - Attempt to enter invalid recovery seed", async () => {
    await EnterRecoverySeedScreen.enterSingleSeedWord("invalid", 1);
    await EnterRecoverySeedScreen.clickOnRecoverAccountButton();
    await EnterRecoverySeedScreen.inputError.waitForExist();
    const inputErrorText = await EnterRecoverySeedScreen.inputErrorText;
    await expect(inputErrorText).toHaveText("Hmm, that seed didn't work.");
    await EnterRecoverySeedScreen.clearFirstRecoverySeedWord();
  });

  it("Save Recovery Seed Screen - Enter valid recovery seed and continue", async () => {
    const recoverySeed = await getUserRecoverySeed("Test123");
    await EnterRecoverySeedScreen.enterSeedWords(recoverySeed);
    await EnterRecoverySeedScreen.clickOnRecoverAccountButton();
    await WelcomeScreen.waitForIsShown(true);
  });
}

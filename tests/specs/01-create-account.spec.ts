require("module-alias/register");
import { maximizeWindow, saveUserRecoverySeed } from "@helpers/commands";
import { WINDOWS_DRIVER } from "@helpers/constants";
import CreateOrImportScreen from "@screenobjects/account-creation/CreateOrImportScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import CreateUserScreen from "@screenobjects/account-creation/CreateUserScreen";
import SaveRecoverySeedScreen from "@screenobjects/account-creation/SaveRecoverySeedScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";

export default async function createAccountTests() {
  it("Enter Pin Screen - Validate warning texts are displayed on screen", async () => {
    const unlockWarningHeader = await CreatePinScreen.unlockWarningHeader;
    await unlockWarningHeader.waitForExist();
    await expect(unlockWarningHeader).toHaveText("LET'S CHOOSE YOUR PASSWORD");

    const unlockWarningParagraph = await CreatePinScreen.unlockWarningParagraph;
    await unlockWarningParagraph.waitForExist();
    await expect(unlockWarningParagraph).toHaveText(
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)",
    );
  });

  it("Enter Pin Screen - Create Account button should be disabled if no pin has been entered", async () => {
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  // Skipping test failing on CI
  xit("Enter Pin Screen -  - Help Button Tooltip", async () => {
    // Wait until app is reset
    await CreatePinScreen.unlockWarningHeader.waitForExist();

    // Validate Help Button tooltip
    await CreatePinScreen.hoverOnHelpButton();

    const helpButtonTooltipText = await CreatePinScreen.helpButtonTooltipText;
    await expect(helpButtonTooltipText).toHaveText("Help (right-click)");
  });

  it("Enter Pin Screen - Reset Account is shown after right clicking on Help Button", async () => {
    // Right click on Help Button to show the help menu
    await CreatePinScreen.openHelpButtonMenu();

    // Right click again on Help Button to hide the help menu
    await CreatePinScreen.openHelpButtonMenu();
  });

  it("Enter Pin Screen - Enter an empty pin", async () => {
    await CreatePinScreen.unlockWarningParagraph.waitForExist();
    await CreatePinScreen.enterPinOnCreateAccount("1");

    await CreatePinScreen.pinInput.clearValue();

    await CreatePinScreen.inputError.waitForExist();
    const inputErrorText = await CreatePinScreen.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Enter Pin Screen - Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPinOnCreateAccount("123");
    await CreatePinScreen.inputError.waitForExist();
    const inputErrorText = await CreatePinScreen.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await CreatePinScreen.pinInput.clearValue();
  });

  // Skipping test failing when appium stops typing
  xit("Enter Pin Screen - Enter a pin with more than 32 characters", async () => {
    await CreatePinScreen.enterPinOnCreateAccount(
      "12345678901234567890123456789012",
    );

    await CreatePinScreen.inputError.waitForExist();
    const inputErrorText = await CreatePinScreen.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 32 characters exceeded.",
    );
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await CreatePinScreen.pinInput.clearValue();
  });

  // Skipping test failing when appium stops typing
  xit("Enter Pin Screen - Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    await CreatePinScreen.pinInput.click();
    await CreatePinScreen.enterPinOnCreateAccount("1234" + "   ");
    await CreatePinScreen.inputError.waitForExist();
    const inputErrorText = await CreatePinScreen.inputErrorText;
    await expect(inputErrorText).toHaveText("Spaces are not allowed.");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await CreatePinScreen.pinInput.clearValue();
  });

  it("Enter Pin Screen - Enter a valid pin and continue creating a username", async () => {
    await CreatePinScreen.enterPinOnCreateAccount("1234");
    await CreatePinScreen.waitUntilCreateAccountButtonIsEnabled();
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await CreatePinScreen.clickOnCreateAccount();
  });

  it("Create or Import Account - Validate screen contents and click on Create New Account", async () => {
    await CreateOrImportScreen.waitForIsShown(true);

    const instructionsParagraph =
      await CreateOrImportScreen.recoveryParagraphText;
    const createOrImportHeader =
      await CreateOrImportScreen.createOrRecoverLabelText;
    await expect(instructionsParagraph).toHaveText(
      "We're going to create an account for you. On the next screen, you'll see a set of words. Screenshot this or write it down. This is the only way to backup your account.",
    );
    await expect(createOrImportHeader).toHaveText("ACCOUNT CREATION");
    await CreateOrImportScreen.clickOnCreateAccount();
  });

  it("Save Recovery Seed Screen - Contents validation", async () => {
    // Validate contents of Save Recovery Seed Screen
    await SaveRecoverySeedScreen.waitForIsShown(true);
    const helperText = await SaveRecoverySeedScreen.copySeedHelperText;
    const copySeedTitle = await SaveRecoverySeedScreen.copySeedWordsLabelText;
    await expect(helperText).toHaveText(
      "Write these words down in the order that they appear. Having the correct order is crucial when you are recovering your account.",
    );
    await expect(copySeedTitle).toHaveText("RECOVERY SEED");

    // Validate 12 recovery seed words are displayed on screen
    const seedWords = await SaveRecoverySeedScreen.getSeedWords();
    await expect(seedWords.length).toEqual(12);
  });

  it("Save Recovery Seed Screen - User can go back to previous screen", async () => {
    // Go Back to Create or Import Account screen
    await SaveRecoverySeedScreen.clickOnGoBackButton();
    await CreateOrImportScreen.waitForIsShown(true);

    // Return to Save Recovery Seed Screen
    await CreateOrImportScreen.clickOnCreateAccount();
  });

  it("Save Recovery Seed Screen - User can click Copy to Clipboard and then on I Saved It to continue", async () => {
    // Click on I Saved It Button to continue to Enter Username Screen
    await SaveRecoverySeedScreen.waitForIsShown(true);
    await SaveRecoverySeedScreen.clickOnCopySeedButton();
    const recoverySeed = await SaveRecoverySeedScreen.getSeedWords();
    await saveUserRecoverySeed("Test123", recoverySeed);
    await SaveRecoverySeedScreen.clickOnISavedItButton();
    await CreateUserScreen.waitForIsShown(true);
  });

  it("Enter Username Screen - Cannot continue with empty value", async () => {
    const helperText = await CreateUserScreen.createUserHelperText;
    const headerText = await CreateUserScreen.createUserLabelText;
    await expect(helperText).toHaveText(
      "Time to pick your username, you can change this later at any time in settings.",
    );
    await expect(headerText).toHaveText("ENTER USERNAME");

    await CreateUserScreen.enterUsername("1");
    await CreateUserScreen.enterUsername("");
    const statusOfButton =
      await CreateUserScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await CreateUserScreen.inputError.waitForExist();
    const inputErrorText = await CreateUserScreen.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
  });

  it("Enter Username Screen - Username with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12");
    const statusOfButton =
      await CreateUserScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await CreateUserScreen.inputError.waitForExist();
    const inputErrorText = await CreateUserScreen.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
  });

  it("Enter Username Screen - Username with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("123456789012345678901234567890123");
    const statusOfButton =
      await CreateUserScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await CreateUserScreen.inputError.waitForExist();
    const inputErrorText = await CreateUserScreen.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 32 characters exceeded.",
    );
  });

  it("Enter Username Screen - Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    await CreateUserScreen.usernameInput.click();
    await CreateUserScreen.enterUsername("1234" + "             ");
    const statusOfButton =
      await CreateUserScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await CreateUserScreen.inputError.waitForExist();
    const inputErrorText = await CreateUserScreen.inputErrorText;
    await expect(inputErrorText).toHaveText("Spaces are not allowed.");
  });

  it("Enter Username Screen - Username with non-alphanumeric characters", async () => {
    await CreateUserScreen.enterUsername("test..%@");
    const statusOfButton =
      await CreateUserScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await CreateUserScreen.inputError.waitForExist();
    const inputErrorText = await CreateUserScreen.inputErrorText;
    await expect(inputErrorText).toHaveText("Not allowed character(s): .%@");
  });

  it("Enter Username Screen - Enter valid username to continue", async () => {
    await CreateUserScreen.enterUsername("Test123");
    await CreateUserScreen.waitUntilCreateAccountButtonIsEnabled();
    const statusOfButton =
      await CreateUserScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await CreateUserScreen.clickOnCreateAccount();
    await WelcomeScreen.welcomeLayout.waitForExist({ timeout: 60000 });

    // If current driver is Windows, then maximize screen
    const currentDriver = await WelcomeScreen.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await maximizeWindow();
    }
  });
}

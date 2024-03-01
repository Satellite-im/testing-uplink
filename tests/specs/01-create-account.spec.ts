require("module-alias/register");
import { maximizeWindow, saveUserRecoverySeed } from "@helpers/commands";
import { WINDOWS_DRIVER } from "@helpers/constants";
import CreateOrImportScreen from "@screenobjects/account-creation/CreateOrImportScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import CreateUserScreen from "@screenobjects/account-creation/CreateUserScreen";
import SaveRecoverySeedScreen from "@screenobjects/account-creation/SaveRecoverySeedScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
const createOrImport = new CreateOrImportScreen();
const createPin = new CreatePinScreen();
const createUser = new CreateUserScreen();
const saveRecoverySeed = new SaveRecoverySeedScreen();
const welcomeScreen = new WelcomeScreen();

export default async function createAccountTests() {
  it("Enter Pin Screen - Validate warning texts are displayed on screen", async () => {
    const unlockWarningHeader = await createPin.unlockWarningHeader;
    await unlockWarningHeader.waitForExist();
    await expect(unlockWarningHeader).toHaveTextContaining([
      "LET'S CHOOSE YOUR PASSWORD",
      "WELCOME BACK,",
    ]);

    const unlockWarningParagraph = await createPin.unlockWarningParagraph;
    await unlockWarningParagraph.waitForExist();
    await expect(unlockWarningParagraph).toHaveTextContaining(
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)",
    );
  });

  it("Enter Pin Screen - Create Account button should be disabled if no pin has been entered", async () => {
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  // Skipping test failing on CI
  xit("Enter Pin Screen -  - Help Button Tooltip", async () => {
    // Wait until app is reset
    await createPin.unlockWarningHeader.waitForExist();

    // Validate Help Button tooltip
    await createPin.hoverOnHelpButton();

    const helpButtonTooltipText = await createPin.helpButtonTooltipText;
    await expect(helpButtonTooltipText).toHaveTextContaining(
      "Help (right-click)",
    );
  });

  it("Enter Pin Screen - Reset Account is shown after right clicking on Help Button", async () => {
    // Right click on Help Button to show the help menu
    await createPin.openHelpButtonMenu();

    // Right click again on Help Button to hide the help menu
    await createPin.openHelpButtonMenu();
  });

  it("Enter Pin Screen - Enter an empty pin", async () => {
    await createPin.unlockWarningParagraph.waitForExist();
    await createPin.enterPinOnCreateAccount("1");

    await createPin.pinInput.clearValue();

    await createPin.inputError.waitForExist();
    const inputErrorText = await createPin.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Enter Pin Screen - Enter a pin with less than 4 characters", async () => {
    await createPin.enterPinOnCreateAccount("123");
    await createPin.inputError.waitForExist();
    const inputErrorText = await createPin.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await createPin.pinInput.clearValue();
  });

  // Skipping test failing when appium stops typing
  xit("Enter Pin Screen - Enter a pin with more than 32 characters", async () => {
    await createPin.enterPinOnCreateAccount("12345678901234567890123456789012");

    await createPin.inputError.waitForExist();
    const inputErrorText = await createPin.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 32 characters exceeded.",
    );
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await createPin.pinInput.clearValue();
  });

  // Skipping test failing when appium stops typing
  xit("Enter Pin Screen - Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    await createPin.pinInput.click();
    await createPin.enterPinOnCreateAccount("1234" + "   ");
    await createPin.inputError.waitForExist();
    const inputErrorText = await createPin.inputErrorText;
    await expect(inputErrorText).toHaveText("Spaces are not allowed.");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await createPin.pinInput.clearValue();
  });

  it("Enter Pin Screen - Enter a valid pin and continue creating a username", async () => {
    await createPin.enterPinOnCreateAccount("1234");
    await createPin.waitUntilCreateAccountButtonIsEnabled();
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createPin.clickOnCreateAccount();
  });

  it("Create or Import Account - Validate screen contents and click on Create New Account", async () => {
    await createOrImport.waitForIsShown(true);

    const instructionsParagraph = await createOrImport.recoveryParagraphText;
    const createOrImportHeader = await createOrImport.createOrRecoverLabelText;
    await expect(instructionsParagraph).toHaveTextContaining(
      "We're going to create an account for you. On the next screen, you'll see a set of words. Screenshot this or write it down. This is the only way to backup your account.",
    );
    await expect(createOrImportHeader).toHaveTextContaining("ACCOUNT CREATION");
    await createOrImport.clickOnCreateAccount();
  });

  it("Save Recovery Seed Screen - Contents validation", async () => {
    // Validate contents of Save Recovery Seed Screen
    await saveRecoverySeed.waitForIsShown(true);
    const helperText = await saveRecoverySeed.copySeedHelperText;
    const copySeedTitle = await saveRecoverySeed.copySeedWordsLabelText;
    await expect(helperText).toHaveTextContaining(
      "Write these words down in the order that they appear. Having the correct order is crucial when you are recovering your account.",
    );
    await expect(copySeedTitle).toHaveTextContaining("RECOVERY SEED");

    // Validate 12 recovery seed words are displayed on screen
    const seedWords = await saveRecoverySeed.getSeedWords();
    await expect(seedWords.length).toEqual(12);
  });

  it("Save Recovery Seed Screen - User can go back to previous screen", async () => {
    // Go Back to Create or Import Account screen
    await saveRecoverySeed.clickOnGoBackButton();
    await createOrImport.waitForIsShown(true);

    // Return to Save Recovery Seed Screen
    await createOrImport.clickOnCreateAccount();
  });

  it("Save Recovery Seed Screen - User can click on I Saved It to continue", async () => {
    // Click on I Saved It Button to continue to Enter Username Screen
    await saveRecoverySeed.waitForIsShown(true);
    const recoverySeed = await saveRecoverySeed.getSeedWords();
    await saveUserRecoverySeed("Test123", recoverySeed);
    await saveRecoverySeed.clickOnISavedItButton();
    await createUser.waitForIsShown(true);
  });

  it("Enter Username Screen - Cannot continue with empty value", async () => {
    const helperText = await createUser.createUserHelperText;
    const headerText = await createUser.createUserLabelText;
    await expect(helperText).toHaveTextContaining(
      "Time to pick your username, you can change this later at any time in settings.",
    );
    await expect(headerText).toHaveTextContaining("ENTER USERNAME");

    await createUser.enterUsername("1");
    await createUser.enterUsername("");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
  });

  it("Enter Username Screen - Username with less than 4 characters and attempt to continue", async () => {
    await createUser.enterUsername("12");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
  });

  it("Enter Username Screen - Username with more than 32 characters and attempt to continue", async () => {
    await createUser.enterUsername("123456789012345678901234567890123");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 32 characters exceeded.",
    );
  });

  it("Enter Username Screen - Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    await createUser.usernameInput.click();
    await createUser.enterUsername("1234" + "             ");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveText("Spaces are not allowed.");
  });

  it("Enter Username Screen - Username with non-alphanumeric characters", async () => {
    await createUser.enterUsername("test..%@");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): .%@",
    );
  });

  it("Enter Username Screen - Enter valid username to continue", async () => {
    await createUser.enterUsername("Test123");
    await createUser.waitUntilCreateAccountButtonIsEnabled();
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createUser.clickOnCreateAccount();
    await welcomeScreen.welcomeLayout.waitForExist({ timeout: 60000 });

    // If current driver is Windows, then maximize screen
    const currentDriver = await welcomeScreen.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await maximizeWindow();
    }
  });
}

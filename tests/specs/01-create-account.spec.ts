require("module-alias/register");
import { maximizeWindow } from "@helpers/commands";
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
  it("Validate warning texts are displayed on screen", async () => {
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

  it("Create Account button should be disabled if no pin has been entered", async () => {
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  // Skipping test failing on CI
  xit("Unlock Screen - Help Button Tooltip", async () => {
    // Wait until app is reset
    await createPin.unlockWarningHeader.waitForExist();

    // Validate Help Button tooltip
    await createPin.hoverOnHelpButton();

    const helpButtonTooltipText = await createPin.helpButtonTooltipText;
    await expect(helpButtonTooltipText).toHaveTextContaining(
      "Help (right-click)",
    );
  });

  it("Unlock Screen - Reset Account is shown after right clicking on Help Button", async () => {
    // Right click on Help Button to show the help menu
    await createPin.openHelpButtonMenu();

    // Right click again on Help Button to hide the help menu
    await createPin.openHelpButtonMenu();
  });

  it("Enter an empty pin", async () => {
    await createPin.unlockWarningParagraph.waitForExist();
    await createPin.enterPin("1");

    await createPin.pinInput.clearValue();

    await createPin.inputError.waitForExist();
    const inputErrorText = await createPin.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Enter a pin with less than 4 characters", async () => {
    await createPin.enterPin("123");
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
  xit("Enter a pin with more than 32 characters", async () => {
    await createPin.enterPin("12345678901234567890123456789012");

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
  xit("Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    await createPin.pinInput.click();
    await createPin.enterPin("1234" + "   ");
    await createPin.inputError.waitForExist();
    const inputErrorText = await createPin.inputErrorText;
    await expect(inputErrorText).toHaveText("Spaces are not allowed.");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await createPin.pinInput.clearValue();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await createPin.enterPin("1234");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createPin.clickOnCreateAccount();
  });

  it("Create or Import Account Screen - Click on Create New Account and save receovery seed", async () => {
    await createOrImport.waitForIsShown(true);
    await createOrImport.clickOnCreateAccount();
    await saveRecoverySeed.waitForIsShown(true);
    await saveRecoverySeed.clickOnISavedItButton();
    await createUser.waitForIsShown(true);
  });

  it("Leave empty username and attempt to continue", async () => {
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

  it("Username with less than 4 characters and attempt to continue", async () => {
    await createUser.enterUsername("12");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Please enter at least 4 characters.",
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await createUser.enterUsername("123456789012345678901234567890123");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveText(
      "Maximum of 32 characters exceeded.",
    );
  });

  it("Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    await createUser.usernameInput.click();
    await createUser.enterUsername("1234" + "             ");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveText("Spaces are not allowed.");
  });

  it("Username with non-alphanumeric characters", async () => {
    await createUser.enterUsername("test..%@");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUser.inputError.waitForExist();
    const inputErrorText = await createUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): .%@",
    );
  });

  it("Enter valid username to continue", async () => {
    await createUser.enterUsername("Test123");
    const statusOfButton = await createPin.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createUser.clickOnCreateAccount();
    await welcomeScreen.waitForIsShown(true);

    // Maximize Window on Execution
    await maximizeWindow();
  });
}

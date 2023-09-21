import "module-alias/register";
import { maximizeWindow } from "@helpers/commands";
import { WINDOWS_DRIVER, USER_A_INSTANCE } from "@helpers/constants";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import CreateUserScreen from "@screenobjects/account-creation/CreateUserScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
let createPinFirstUser = new CreatePinScreen(USER_A_INSTANCE);
let createUserFirstUser = new CreateUserScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

export default async function createAccount() {
  it("Validate warning texts are displayed on screen", async () => {
    const unlockWarningHeader = await createPinFirstUser.unlockWarningHeader;
    await unlockWarningHeader.waitForExist();
    await expect(unlockWarningHeader).toHaveTextContaining([
      "LET'S CHOOSE YOUR PASSWORD",
      "WELCOME BACK,",
    ]);

    const unlockWarningParagraph =
      await createPinFirstUser.unlockWarningParagraph;
    await unlockWarningParagraph.waitForExist();
    await expect(unlockWarningParagraph).toHaveTextContaining(
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)"
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Unlock Screen - Help Button Tooltip", async () => {
    // Wait until app is reset
    const unlockWarningHeader = await createPinFirstUser.unlockWarningHeader;
    await unlockWarningHeader.waitForExist();

    // Validate Help Button tooltip
    await createPinFirstUser.hoverOnHelpButton();
    const helpButtonTooltip = await createPinFirstUser.helpButtonTooltip;
    await helpButtonTooltip.waitForExist();

    const helpButtonTooltipText =
      await createPinFirstUser.helpButtonTooltipText;
    await expect(helpButtonTooltipText).toHaveTextContaining(
      "Help (right-click)"
    );
  });

  it("Unlock Screen - Reset Account is shown after right clicking on Help Button", async () => {
    // Right click on Help Button to show the help menu
    await createPinFirstUser.openHelpButtonMenu();

    // Right click again on Help Button to hide the help menu
    await createPinFirstUser.openHelpButtonMenu();
  });

  it("Enter an empty pin", async () => {
    const unlockWarningParagraph =
      await createPinFirstUser.unlockWarningParagraph;
    await unlockWarningParagraph.waitForExist();
    await createPinFirstUser.enterPin("1");

    const pinInput = await createPinFirstUser.pinInput;
    await pinInput.clearValue();

    const inputError = await createPinFirstUser.inputError;
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Enter a pin with less than 4 characters", async () => {
    const pinInput = await createPinFirstUser.pinInput;
    await createPinFirstUser.enterPin("123");

    const inputError = await createPinFirstUser.inputError;
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await pinInput.clearValue();
  });

  it("Enter a pin with more than 32 characters", async () => {
    const pinInput = await createPinFirstUser.pinInput;
    await createPinFirstUser.enterPin("12345678901234567890123456789012345");

    const inputError = await createPinFirstUser.inputError;
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await pinInput.clearValue();
  });

  it("Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    const pinInput = await createPinFirstUser.pinInput;
    await pinInput.click();
    await createPinFirstUser.enterPin("1234" + "             ");
    const inputError = await createPinFirstUser.inputError;
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await pinInput.clearValue();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await createPinFirstUser.enterPin("1234");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createPinFirstUser.clickOnCreateAccount();
    await createUserFirstUser.waitForIsShown(true);
  });

  it("Leave empty username and attempt to continue", async () => {
    await createUserFirstUser.enterUsername("1");
    await createUserFirstUser.enterUsername("");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    const inputError = await createUserFirstUser.inputError;
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with less than 4 characters and attempt to continue", async () => {
    await createUserFirstUser.enterUsername("12");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    const inputError = await createUserFirstUser.inputError;
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await createUserFirstUser.enterUsername(
      "12345678901234567890123456789012345"
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    const inputError = await createUserFirstUser.inputError;
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
  });

  it("Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    const usernameInput = await createUserFirstUser.usernameInput;
    await usernameInput.click();
    await createUserFirstUser.enterUsername("1234" + "             ");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    const inputError = await createUserFirstUser.inputError;
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
  });

  it("Username with non-alphanumeric characters", async () => {
    await createUserFirstUser.enterUsername("test..%@");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    const inputError = await createUserFirstUser.inputError;
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await inputError.waitForExist();
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): .%@"
    );
  });

  it("Enter valid username to continue", async () => {
    await createUserFirstUser.enterUsername("Test123");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await createUserFirstUser.clickOnCreateAccount();
    await welcomeScreenFirstUser.waitForIsShown(true);

    // Maximize Window on Execution
    const currentDriver = await welcomeScreenFirstUser.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      await maximizeWindow(USER_A_INSTANCE);
    }
  });
}

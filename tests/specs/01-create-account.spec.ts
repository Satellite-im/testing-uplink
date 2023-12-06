import "module-alias/register";
import { maximizeWindow } from "@helpers/commands";
import { USER_A_INSTANCE } from "@helpers/constants";
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
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)",
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  // Skipping test failing on CI
  xit("Unlock Screen - Help Button Tooltip", async () => {
    // Wait until app is reset
    await createPinFirstUser.unlockWarningHeader.waitForExist();

    // Validate Help Button tooltip
    await createPinFirstUser.hoverOnHelpButton();

    const helpButtonTooltipText =
      await createPinFirstUser.helpButtonTooltipText;
    await expect(helpButtonTooltipText).toHaveTextContaining(
      "Help (right-click)",
    );
  });

  it("Unlock Screen - Reset Account is shown after right clicking on Help Button", async () => {
    // Right click on Help Button to show the help menu
    await createPinFirstUser.openHelpButtonMenu();

    // Right click again on Help Button to hide the help menu
    await createPinFirstUser.openHelpButtonMenu();
  });

  it("Enter an empty pin", async () => {
    await createPinFirstUser.unlockWarningParagraph.waitForExist();
    await createPinFirstUser.enterPin("1");

    await createPinFirstUser.pinInput.clearValue();

    await createPinFirstUser.inputError.waitForExist();
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters",
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Enter a pin with less than 4 characters", async () => {
    await createPinFirstUser.enterPin("123");
    await createPinFirstUser.inputError.waitForExist();
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters",
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await createPinFirstUser.pinInput.clearValue();
  });

  // Skipping test failing when appium stops typing
  xit("Enter a pin with more than 32 characters", async () => {
    await createPinFirstUser.enterPin("12345678901234567890123456789012");

    await createPinFirstUser.inputError.waitForExist();
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded",
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await createPinFirstUser.pinInput.clearValue();
  });

  // Skipping test failing when appium stops typing
  xit("Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    await createPinFirstUser.pinInput.click();
    await createPinFirstUser.enterPin("1234" + "   ");
    await createPinFirstUser.inputError.waitForExist();
    const inputErrorText = await createPinFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed.",
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await createPinFirstUser.pinInput.clearValue();
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

    await createUserFirstUser.inputError.waitForExist();
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters",
    );
  });

  it("Username with less than 4 characters and attempt to continue", async () => {
    await createUserFirstUser.enterUsername("12");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUserFirstUser.inputError.waitForExist();
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters",
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await createUserFirstUser.enterUsername(
      "123456789012345678901234567890123",
    );
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUserFirstUser.inputError.waitForExist();
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded",
    );
  });

  it("Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    await createUserFirstUser.usernameInput.click();
    await createUserFirstUser.enterUsername("1234" + "             ");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUserFirstUser.inputError.waitForExist();
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Spaces are not allowed.",
    );
  });

  it("Username with non-alphanumeric characters", async () => {
    await createUserFirstUser.enterUsername("test..%@");
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");

    await createUserFirstUser.inputError.waitForExist();
    const inputErrorText = await createUserFirstUser.inputErrorText;
    await expect(inputErrorText).toHaveTextContaining(
      "Not allowed character(s): .%@",
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
    await maximizeWindow(USER_A_INSTANCE);
  });
}

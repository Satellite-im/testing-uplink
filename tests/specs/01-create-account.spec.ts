import { maximizeWindow, resetApp } from "../helpers/commands";
import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";

export default async function createAccount() {
  it("Validate warning texts are displayed on screen", async () => {
    await expect(CreatePinScreen.unlockWarningHeader).toBeDisplayed();
    await expect(CreatePinScreen.unlockWarningHeader).toHaveTextContaining(
      "LET'S CHOOSE YOUR PASSWORD"
    );
    await expect(CreatePinScreen.unlockWarningParagraph).toBeDisplayed();
    await expect(CreatePinScreen.unlockWarningParagraph).toHaveTextContaining(
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)"
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Enter an empty pin", async () => {
    await CreatePinScreen.enterPin("1");
    await CreatePinScreen.pinInput.clearValue();
    await expect(CreatePinScreen.inputError).toBeDisplayed();
    await expect(CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
  });

  it("Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPin("123");
    await expect(CreatePinScreen.inputError).toBeDisplayed();
    await expect(CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await CreatePinScreen.pinInput.clearValue();
  });

  it("Enter a pin with more than 32 characters", async () => {
    await CreatePinScreen.enterPin("12345678901234567890123456789012345");
    await expect(CreatePinScreen.inputError).toBeDisplayed();
    await expect(CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await CreatePinScreen.pinInput.clearValue();
  });

  it("Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    await CreatePinScreen.pinInput.click();
    await CreatePinScreen.enterPin("1234" + "             ");
    await expect(CreatePinScreen.inputError).toBeDisplayed();
    await expect(CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await CreatePinScreen.pinInput.clearValue();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await CreatePinScreen.enterPin("1234");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await CreatePinScreen.clickOnCreateAccount();
    await CreateUserScreen.waitForIsShown(true);
  });

  it("Leave empty username and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1");
    await CreateUserScreen.enterUsername("");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await expect(CreateUserScreen.inputError).toBeDisplayed();
    await expect(CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await expect(CreateUserScreen.inputError).toBeDisplayed();
    await expect(CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12345678901234567890123456789012345");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await expect(CreateUserScreen.inputError).toBeDisplayed();
    await expect(CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
  });

  it("Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    await CreateUserScreen.usernameInput.click();
    await CreateUserScreen.enterUsername("1234" + "             ");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await expect(CreateUserScreen.inputError).toBeDisplayed();
    await expect(CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
  });

  it("Username with non-alphanumeric characters", async () => {
    await CreateUserScreen.enterUsername("test...");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("false");
    await expect(CreateUserScreen.inputError).toBeDisplayed();
    await expect(CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );
  });

  it("Enter valid username to continue", async () => {
    await CreateUserScreen.enterUsername("Test123");
    const statusOfButton =
      await CreatePinScreen.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual("true");
    await CreateUserScreen.clickOnCreateAccount();
    await WelcomeScreen.waitForIsShown(true);

    // Maximize Window on Execution
    const currentDriver = await WelcomeScreen.getCurrentDriver();
    if (currentDriver === "windows") {
      await maximizeWindow();
    }
  });
}

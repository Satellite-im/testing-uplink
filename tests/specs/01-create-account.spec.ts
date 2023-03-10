import { maximizeWindow } from "../helpers/commands";
import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";

export default async function createAccount() {
  it("Validate warning texts are displayed on screen", async () => {
    await expect(await CreatePinScreen.unlockWarningParagraph).toBeDisplayed();
    expect(await CreatePinScreen.un).toHaveTextContaining(
      "Your password is used to encrypt your data. It is never sent to any server. You should use a strong password that you don't use anywhere else."
    );
    await expect(await CreatePinScreen.unlockWarningParagraph).toBeDisplayed();
    expect(await CreatePinScreen.unlockWarningParagraph).toHaveTextContaining(
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)"
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
  });

  it("Enter an empty pin", async () => {
    await CreatePinScreen.enterPin("1");
    await (await CreatePinScreen.pinInput).clearValue();
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
  });

  it("Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPin("123");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a pin with more than 32 characters", async () => {
    await CreatePinScreen.enterPin("12345678901234567890123456789012345");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await (await CreatePinScreen.pinInput).clearValue();
  });

  // Test is failing because webdriverio handles spaces as dots and needs more research to avoid flakiness
  xit("Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    const emptySpaces = "    ";
    await CreatePinScreen.pinInput.addValue(`123${emptySpaces}`);
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await CreatePinScreen.enterPin("1234");
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "true"
    );
    await CreatePinScreen.clickOnCreateAccount();
    await CreateUserScreen.waitForIsShown(true);
  });

  it("Leave empty username and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1");
    await CreateUserScreen.enterUsername("");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12345678901234567890123456789012345");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
  });

  // Test is failing because webdriverio handles spaces as dots and needs more research to avoid flakiness
  xit("Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    const emptySpaces = "    ";
    await CreateUserScreen.usernameInput.addValue(`123${emptySpaces}`);
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
  });

  it("Username with non-alphanumeric characters", async () => {
    await CreateUserScreen.enterUsername("test...");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );
  });

  it("Enter valid username to continue", async () => {
    await CreateUserScreen.enterUsername("Test123");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "true"
    );
    await CreateUserScreen.clickOnCreateAccount();
    await WelcomeScreen.waitForIsShown(true);
    // Only maximize if current driver is windows
    const currentDriver = await WelcomeScreen.getCurrentDriver();
    if (currentDriver === "windows") {
      await maximizeWindow();
    }
  });
}

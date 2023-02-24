import { maximizeWindow } from "../../helpers/commands";
import CreatePinScreen from "../../screenobjects/CreatePinScreen";
import CreateUserScreen from "../../screenobjects/CreateUserScreen";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";

describe("Create Account Screen Tests", async () => {
  // Skipped since Prerelease indicator is no longer available
  xit("Validate Pre Release Indicator is displayed on Screen", async () => {
    // Create an account and go to Main Screen
    await CreatePinScreen.waitForIsShown(true);

    await expect(await CreatePinScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await CreatePinScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate warning texts are displayed on screen", async () => {
    await expect(await CreatePinScreen.unlockWarningParagraph).toBeDisplayed();
    expect(
      await CreatePinScreen.unlockWarningParagraphText
    ).toHaveTextContaining(
      "Your password is used to encrypt your data. It is never sent to any server. You should use a strong password that you don't use anywhere else."
    );
    await expect(await CreatePinScreen.unlockWarningSpan).toBeDisplayed();
    expect(await CreatePinScreen.unlockWarningSpanText).toHaveTextContaining(
      "If you forget this password we cannot help you retrieve it."
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    await expect(await CreatePinScreen.createAccountButton).not.toExist();
  });

  it("Enter an empty pin", async () => {
    await CreatePinScreen.enterPin("1");
    await (await CreatePinScreen.pinInput).clearValue();
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(await CreatePinScreen.createAccountButton).not.toExist();
  });

  it("Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPin("123");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(await CreatePinScreen.createAccountButton).not.toExist();
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
    await CreateUserScreen.enterUsername("test123");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "true"
    );
    await CreateUserScreen.clickOnCreateAccount();
    await WelcomeScreen.waitForIsShown(true);
    await maximizeWindow();
  });
});

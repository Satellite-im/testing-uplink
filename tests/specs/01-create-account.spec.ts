import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import UplinkMainScreen from "../screenobjects/UplinkMainScreen";

describe("Create Account Screen Tests", async () => {
  before(async () => {
    // Create an account and go to Main Screen
    await CreatePinScreen.waitForIsShown(true);
  });

  it("Validate Pre Release Indicator is displayed on Screen", async () => {
    await expect(await CreatePinScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await CreatePinScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate warning texts are displayed on screen", async () => {
    await expect(await CreatePinScreen.unlockWarningParagraph).toBeDisplayed();
    await expect(
      await CreatePinScreen.unlockWarningParagraph
    ).toHaveTextContaining(
      "Your password is used to encrypt your data. It is never sent to any server. You should use a strong password that you don't use anywhere else."
    );
    await expect(await CreatePinScreen.unlockWarningSpan).toBeDisplayed();
    await expect(await CreatePinScreen.unlockWarningSpan).toHaveTextContaining(
      "If you forget this password we cannot help you retrieve it."
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "false"
    );
  });

  it("Enter an empty pin", async () => {
    await CreatePinScreen.enterPin("1");
    await (await CreatePinScreen.pinInput).clearValue();
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputError).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "false"
    );
  });

  it("Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPin("123");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputError).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "false"
    );
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a pin with more than 32 characters", async () => {
    await CreatePinScreen.enterPin("12345678901234567890123456789012345");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputError).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "false"
    );
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await CreatePinScreen.enterPin("1234");
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "true"
    );
    await CreatePinScreen.clickOnCreateAccount();
    await CreateUserScreen.waitForIsShown(true);
  });

  it("Leave empty username and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1");
    await CreateUserScreen.enterUsername("");
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputError).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12");
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputError).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12345678901234567890123456789012345");
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputError).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
  });

  it("Enter valid username to continue", async () => {
    await CreateUserScreen.enterUsername("test123");
    await expect(await CreatePinScreen.createAccountButton).toHaveAttr(
      "enabled",
      "true"
    );
    await CreateUserScreen.clickOnCreateAccount();
    await UplinkMainScreen.waitForIsShown(true);
  });
});

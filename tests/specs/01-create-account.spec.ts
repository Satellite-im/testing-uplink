import { maximizeWindow } from "../helpers/commands";
import CreatePinScreen from "../screenobjects/CreatePinScreen";
import CreateUserScreen from "../screenobjects/CreateUserScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";

export default async function createAccount() {
  it("Validate warning texts are displayed on screen", async () => {
    await expect(await CreatePinScreen.unlockWarningHeader).toBeDisplayed();
    await expect(
      await CreatePinScreen.unlockWarningHeader
    ).toHaveTextContaining("LET'S CHOOSE YOUR PASSWORD");
    await expect(await CreatePinScreen.unlockWarningParagraph).toBeDisplayed();
    await expect(
      await CreatePinScreen.unlockWarningParagraph
    ).toHaveTextContaining(
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)"
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    await expect(
      await CreatePinScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
  });

  it("Enter an empty pin", async () => {
    await CreatePinScreen.enterPin("1");
    await (await CreatePinScreen.pinInput).clearValue();
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(
      await CreatePinScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
  });

  it("Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPin("123");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(
      await CreatePinScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a pin with more than 32 characters", async () => {
    await CreatePinScreen.enterPin("12345678901234567890123456789012345");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
    await expect(
      await CreatePinScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    await (await CreatePinScreen.pinInput).click();
    await CreatePinScreen.enterPin("1234" + "             ");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
    await expect(
      await CreatePinScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await CreatePinScreen.enterPin("1234");
    await expect(
      await CreatePinScreen.getStatusOfCreateAccountButton()
    ).toEqual("true");
    await CreatePinScreen.clickOnCreateAccount();
    await CreateUserScreen.waitForIsShown(true);
  });

  it("Leave empty username and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1");
    await CreateUserScreen.enterUsername("");
    await expect(
      await CreateUserScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12");
    await expect(
      await CreateUserScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12345678901234567890123456789012345");
    await expect(
      await CreateUserScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
  });

  it("Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    await (await CreateUserScreen.usernameInput).click();
    await CreateUserScreen.enterUsername("1234" + "             ");
    await expect(
      await CreateUserScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
  });

  it("Username with non-alphanumeric characters", async () => {
    await CreateUserScreen.enterUsername("test...");
    await expect(
      await CreateUserScreen.getStatusOfCreateAccountButton()
    ).toEqual("false");
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );
  });

  it("Enter valid username to continue", async () => {
    await CreateUserScreen.enterUsername("Test123");
    await expect(
      await CreateUserScreen.getStatusOfCreateAccountButton()
    ).toEqual("true");
    await CreateUserScreen.clickOnCreateAccount();
    await WelcomeScreen.waitForIsShown(true);

    // Maximize Window on Execution
    await maximizeWindow();
  });
}

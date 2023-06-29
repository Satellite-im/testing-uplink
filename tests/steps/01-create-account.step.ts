import { Given, When, Then } from "@wdio/cucumber-framework";
import { maximizeWindow } from "../helpers/commands";
import { WINDOWS_DRIVER, USER_A_INSTANCE } from "../helpers/constants";
import CreatePinScreen from "../screenobjects/account-creation/CreatePinScreen";
import CreateUserScreen from "../screenobjects/account-creation/CreateUserScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let createPinFirstUser = new CreatePinScreen(USER_A_INSTANCE);
let createUserFirstUser = new CreateUserScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

Given(
  /^I enter to the application for the first time with a fresh user$/,
  async () => {
    await createPinFirstUser.unlockWarningHeader.waitForDisplayed();
  }
);

Given(/^I am on the Create Username Screen$/, async () => {
  await createUserFirstUser.unlockLayout.waitForDisplayed();
});

When(
  /^I enter to the application for the first time with a fresh user$/,
  async () => {
    await createPinFirstUser.unlockWarningHeader.waitForDisplayed();
  }
);

When(/^I leave pin input empty$/, async () => {
  await createPinFirstUser.enterPin("1");
  await createPinFirstUser.pinInput.clearValue();
});

When(/^I leave username input empty$/, async () => {
  await createUserFirstUser.enterUsername("1");
  await createUserFirstUser.enterUsername("");
});

When(/^I type (.*) in pin input$/, async (pin: string) => {
  await createPinFirstUser.pinInput.clearValue();
  await createPinFirstUser.enterPin(pin);
});

When(/^I type (.*) in username input$/, async (pin: string) => {
  await createUserFirstUser.usernameInput.clearValue();
  await createUserFirstUser.enterUsername(pin);
});

When(/^I enter a PIN with spaces$/, async () => {
  await createPinFirstUser.pinInput.click();
  await createPinFirstUser.enterPin("1234" + "             ");
});

When(/^I enter a username with spaces$/, async () => {
  await createUserFirstUser.usernameInput.click();
  await createUserFirstUser.enterUsername("1234" + "             ");
});

When(/^I click on Create Account Button on Create Pin Screen$/, async () => {
  await createPinFirstUser.clickOnCreateAccount();
});

When(
  /^I click on Create Account Button on Create Username Screen$/,
  async () => {
    await createUserFirstUser.clickOnCreateAccount();
  }
);

Then(
  /^I should see that warning texts are displayed correctly on Pin Screen$/,
  async () => {
    await expect(createPinFirstUser.unlockWarningHeader).toHaveTextContaining([
      "LET'S CHOOSE YOUR PASSWORD",
      "WELCOME BACK,",
    ]);
    await expect(createPinFirstUser.unlockWarningParagraph).toBeDisplayed();
    await expect(
      createPinFirstUser.unlockWarningParagraph
    ).toHaveTextContaining(
      "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)"
    );
  }
);

Then(
  /^I should see that Create Pin Screen status of button is equal to (.*)$/,
  async (status: string) => {
    const statusOfButton =
      await createPinFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual(status);
  }
);

Then(
  /^I should see that Create User Screen status of button is equal to (.*)$/,
  async (status: string) => {
    const statusOfButton =
      await createUserFirstUser.getStatusOfCreateAccountButton();
    await expect(statusOfButton).toEqual(status);
  }
);

Then(
  /^I should see an error message for invalid PIN stating (.*)$/,
  async (status: string) => {
    await expect(createPinFirstUser.inputError).toBeDisplayed();
    await expect(createPinFirstUser.inputErrorText).toHaveTextContaining(
      status
    );
  }
);

Then(
  /^I should see an error message for invalid username stating (.*)$/,
  async (status: string) => {
    await expect(createUserFirstUser.inputError).toBeDisplayed();
    await expect(createUserFirstUser.inputErrorText).toHaveTextContaining(
      status
    );
  }
);

Then(/^I should be redirected to Create Username screen$/, async () => {
  await createUserFirstUser.waitForIsShown(true);
});

Then(/^I should be redirected to Welcome Screen$/, async () => {
  await welcomeScreenFirstUser.waitForIsShown(true);

  // Maximize Window on Execution
  const currentDriver = await welcomeScreenFirstUser.getCurrentDriver();
  if (currentDriver === WINDOWS_DRIVER) {
    await maximizeWindow(USER_A_INSTANCE);
  }
});

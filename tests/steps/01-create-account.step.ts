import { Given, When, Then } from "@wdio/cucumber-framework";
import { USER_A_INSTANCE } from "../helpers/constants";
import CreatePinScreen from "../screenobjects/account-creation/CreatePinScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let createPinFirstUser = new CreatePinScreen(USER_A_INSTANCE);

Given(/^I am on the Create Pin Screen with a fresh user$/, async () => {
  await expect(createPinFirstUser.unlockWarningHeader).toBeDisplayed();
});

When(/^Create Pin Screen is displayed for a fresh user$/, async () => {
  await expect(createPinFirstUser.unlockWarningHeader).toBeDisplayed();
});

When(/^I type any pin in pin input$/, async () => {
  await createPinFirstUser.enterPin("1");
});

When(/^I delete the entered pin$/, async () => {
  await createPinFirstUser.pinInput.clearValue();
});

Then(/^Warning texts are displayed correctly on screen$/, async () => {
  await expect(createPinFirstUser.unlockWarningHeader).toHaveTextContaining([
    "LET'S CHOOSE YOUR PASSWORD",
    "WELCOME BACK,",
  ]);
  await expect(createPinFirstUser.unlockWarningParagraph).toBeDisplayed();
  await expect(createPinFirstUser.unlockWarningParagraph).toHaveTextContaining(
    "(this is used to encrypt all of the data Uplink stores on your computer when you're not using it so nobody can read your data.)"
  );
});

Then(/^Create Pin Screen status of button is equal to Disabled$/, async () => {
  const statusOfButton =
    await createPinFirstUser.getStatusOfCreateAccountButton();
  await expect(statusOfButton).toEqual("false");
});

Then(
  /^Input Error is displayed on screen with message "Please enter at least 4 characters"$/,
  async () => {
    await expect(createPinFirstUser.inputError).toBeDisplayed();
    await expect(createPinFirstUser.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  }
);

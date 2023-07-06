import { Given, When, Then } from "@cucumber/cucumber";
import { createNewUserSecondInstance, saveTestKeys } from "../helpers/commands";
import { USER_B_INSTANCE } from "../helpers/constants";
import CreatePinScreen from "../screenobjects/account-creation/CreatePinScreen";
import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "../screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let createPinSecondUser = new CreatePinScreen(USER_B_INSTANCE);
let settingsGeneralSecondUser = new SettingsGeneralScreen(USER_B_INSTANCE);
let settingsNotificationsSecondUser = new SettingsNotificationsScreen(
  USER_B_INSTANCE
);
let settingsProfileSecondUser = new SettingsProfileScreen(USER_B_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

Given(
  /^I am on the Create Username Screen in the second instance$/,
  async () => {
    await createPinSecondUser.waitForIsShown(true);
  }
);

Given(
  /^I am on the Welcome Screen after creating a new account in the second instance$/,
  async () => {
    await welcomeScreenSecondUser.waitForIsShown(true);
  }
);

Given(
  /^I am on the Settings Profile Screen with a new account in the second instance$/,
  async () => {
    await settingsProfileSecondUser.waitForIsShown(true);
  }
);

Given(
  /^I am on the Settings General Screen with a new account in the second instance$/,
  async () => {
    await settingsGeneralSecondUser.waitForIsShown(true);
  }
);

Given(
  /^I am on the Settings Notifications Screen with a new account in the second instance$/,
  async () => {
    await settingsNotificationsSecondUser.waitForIsShown(true);
  }
);

When(
  /^I execute the command with the steps to Create a New User for the ChatUserB test user in the second instance$/,
  async () => {
    await createNewUserSecondInstance("ChatUserB");
  }
);

When(
  /^I go to the Settings Profile Screen from Welcome Screen in the second instance$/,
  async () => {
    await welcomeScreenSecondUser.goToSettings();
  }
);

When(
  /^I click on the Settings Profile Screen CopyID button in the second instance$/,
  async () => {
    await settingsProfileSecondUser.clickOnCopyIDButton();
  }
);

When(
  /^I paste the copied user key into status input field in the second instance$/,
  async () => {
    await settingsProfileSecondUser.pasteUserKeyInStatus();
  }
);

When(
  /^I go to the Settings General Screen from Settings Profile Screen in the second instance$/,
  async () => {
    await settingsProfileSecondUser.goToGeneralSettings();
  }
);

When(
  /^I click on the reduce font size button from Settings General in the second instance$/,
  async () => {
    await settingsGeneralSecondUser.clickOnFontScalingMinus();
  }
);

When(
  /^I go to the Settings Notification Screen from Settings General Screen in the second instance$/,
  async () => {
    await settingsGeneralSecondUser.goToNotificationsSettings();
  }
);

When(
  /^I click on the Friends Notifications switch slider from Settings Notifications Screen in the second instance$/,
  async () => {
    await settingsNotificationsSecondUser.clickOnFriendsNotifications();
  }
);

When(
  /^I click on the Messages Notifications switch slider from Settings Notifications Screen in the second instance$/,
  async () => {
    await settingsNotificationsSecondUser.clickOnMessagesNotifications();
  }
);

Then(
  /^I should be redirected to Welcome Screen in the second instance$/,
  async () => {
    await welcomeScreenSecondUser.waitForIsShown(true);
  }
);

Then(
  /^I should see a success toast notification displayed on Settings Profile Screen in the second instance$/,
  async () => {
    await settingsProfileSecondUser.waitUntilNotificationIsClosed();
  }
);

Then(
  /^I should see the Settings Profile status input shows did:key: in the second instance$/,
  async () => {}
);

Then(
  /^I should be able to save the test key from the ChatUserB user in the second instance$/,
  async () => {
    const inputTextElement =
      await settingsProfileSecondUser.getStatusInputText();
    const didkey = await inputTextElement.getText();
    await saveTestKeys("ChatUserB", didkey, USER_B_INSTANCE);
  }
);

Then(
  /^I should see Font Size value selected in the second instance is (.*)$/,
  async (fontSize: string) => {
    await expect(
      settingsGeneralSecondUser.fontScalingValue
    ).toHaveTextContaining(fontSize);
  }
);

Then(
  /^I should see the current value for Friends Notifications switch in the second instance is (.*)$/,
  async (value: string) => {
    const friendsToggle =
      await settingsNotificationsSecondUser.friendsNotificationsControllerValue;
    const friendsState = await settingsNotificationsSecondUser.getToggleState(
      friendsToggle
    );
    if (value === "enabled") {
      await expect(friendsState).toEqual("1");
    } else if (value === "disabled") {
      await expect(friendsState).toEqual("0");
    }
  }
);

Then(
  /^I should see the current value for Messages Notifications switch in the second instance is (.*)$/,
  async (value: string) => {
    const messagesToggle =
      await settingsNotificationsSecondUser.messagesNotificationsControllerValue;
    const messagesState = await settingsNotificationsSecondUser.getToggleState(
      messagesToggle
    );
    if (value === "enabled") {
      await expect(messagesState).toEqual("1");
    } else if (value === "disabled") {
      await expect(messagesState).toEqual("0");
    }
  }
);

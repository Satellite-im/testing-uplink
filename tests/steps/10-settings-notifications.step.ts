import { Given, When, Then } from "@cucumber/cucumber";
import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsNotificationsScreen from "../screenobjects/settings/SettingsNotificationsScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);
let settingsNotificationsFirstUser = new SettingsNotificationsScreen(
  USER_A_INSTANCE
);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

When(
  /^I go to the Settings Notifications Screen from Welcome Screen$/,
  async () => {
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
    await settingsProfileFirstUser.goToNotificationsSettings();
    await settingsNotificationsFirstUser.waitForIsShown(true);
  }
);

When(
  /^I go to the Settings Notifications Screen from Settings General Screen$/,
  async () => {
    await settingsGeneralFirstUser.goToNotificationsSettings();
    await settingsNotificationsFirstUser.waitForIsShown(true);
  }
);

When(
  /^I am on the Settings Notifications Screen with a new account$/,
  async () => {
    await settingsNotificationsFirstUser.waitForIsShown(true);
  }
);

When(
  /^I click on the Enable Notifications switch slider from Settings Notifications Screen$/,
  async () => {
    await settingsNotificationsFirstUser.clickOnEnabledNotifications();
  }
);

When(
  /^I click on the Friends Notifications switch slider from Settings Notifications Screen$/,
  async () => {
    await settingsNotificationsFirstUser.clickOnFriendsNotifications();
  }
);

When(
  /^I click on the Messages Notifications switch slider from Settings Notifications Screen$/,
  async () => {
    await settingsNotificationsFirstUser.clickOnMessagesNotifications();
  }
);

When(
  /^I click on the Settings Notifications switch slider from Settings Notifications Screen$/,
  async () => {
    await settingsNotificationsFirstUser.clickOnSettingsNotifications();
  }
);

Then(
  /^I should see the Enabled Notifications header and description are correct$/,
  async () => {
    await expect(
      settingsNotificationsFirstUser.enabledNotificationsHeader
    ).toHaveTextContaining("ENABLED");
    await expect(
      settingsNotificationsFirstUser.enabledNotificationsDescription
    ).toHaveTextContaining(
      "Enable notifications for incoming calls, messages, and more."
    );
  }
);

Then(
  /^I should see the Friends Notifications header and description are correct$/,
  async () => {
    await expect(
      settingsNotificationsFirstUser.friendsNotificationsHeader
    ).toHaveTextContaining("FRIENDS");
    await expect(
      settingsNotificationsFirstUser.friendsNotificationsDescription
    ).toHaveTextContaining("Enable notifications for friend requests.");
  }
);

Then(
  /^I should see the Messages Notifications header and description are correct$/,
  async () => {
    await expect(
      settingsNotificationsFirstUser.messagesNotificationsHeader
    ).toHaveTextContaining("MESSAGES");
    await expect(
      settingsNotificationsFirstUser.messagesNotificationsDescription
    ).toHaveTextContaining("Enable notifications for new messages.");
  }
);

Then(
  /^I should see the Settings Notifications header and description are correct$/,
  async () => {
    await expect(
      settingsNotificationsFirstUser.settingsNotificationsHeader
    ).toHaveTextContaining("SETTINGS");
    await expect(
      settingsNotificationsFirstUser.settingsNotificationsDescription
    ).toHaveText("Enable notifications for updates and important alerts.");
  }
);

Then(
  /^I should see the current value for Enabled Notifications switch is (.*)$/,
  async (value: string) => {
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState = await settingsNotificationsFirstUser.getToggleState(
      enabledToggle
    );
    if (value === "enabled") {
      await expect(enabledState).toEqual("1");
    } else if (value === "disabled") {
      await expect(enabledState).toEqual("0");
    }
  }
);

Then(
  /^I should see the current value for Friends Notifications switch is (.*)$/,
  async (value: string) => {
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState = await settingsNotificationsFirstUser.getToggleState(
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
  /^I should see the current value for Messages Notifications switch is (.*)$/,
  async (value: string) => {
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState = await settingsNotificationsFirstUser.getToggleState(
      messagesToggle
    );
    if (value === "enabled") {
      await expect(messagesState).toEqual("1");
    } else if (value === "disabled") {
      await expect(messagesState).toEqual("0");
    }
  }
);

Then(
  /^I should see the current value for Settings Notifications switch is (.*)$/,
  async (value: string) => {
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState = await settingsNotificationsFirstUser.getToggleState(
      settingsToggle
    );
    if (value === "enabled") {
      await expect(settingsState).toEqual("1");
    } else if (value === "disabled") {
      await expect(settingsState).toEqual("0");
    }
  }
);

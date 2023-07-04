import { Given, When, Then } from "@wdio/cucumber-framework";
import SettingsAccessibilityScreen from "../screenobjects/settings/SettingsAccessibilityScreen";
import SettingsNotificationsScreen from "../screenobjects/settings/SettingsNotificationsScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsAccessibilityFirstUser = new SettingsAccessibilityScreen(
  USER_A_INSTANCE
);
let settingsNotificationsFirstUser = new SettingsNotificationsScreen(
  USER_A_INSTANCE
);

Given(
  /^I go to the Settings Notifications Screen from Settings Accessibility Screen$/,
  async () => {
    await settingsAccessibilityFirstUser.goToNotificationsSettings();
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

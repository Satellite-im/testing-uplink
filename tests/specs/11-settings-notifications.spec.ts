import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsNotificationsScreen from "../screenobjects/SettingsNotificationsScreen";
import { loginWithRandomUser, showMainMenu } from "../helpers/commands";

describe("Settings - Notifications - Tests", async () => {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Login with a random user, show main menu, go to Settings Screen and finally select the Settings Screen to validate
    await loginWithRandomUser();
    await showMainMenu();
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });
});

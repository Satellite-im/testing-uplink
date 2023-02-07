import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsNotificationsScreen from "../screenobjects/SettingsNotificationsScreen";
import { loginWithRandomUser, showMainMenu } from "../helpers/commands";

describe("Settings - Developer - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await showMainMenu();
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });
});

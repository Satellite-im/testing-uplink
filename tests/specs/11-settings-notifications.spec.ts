import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsNotificationsScreen from "../screenobjects/SettingsNotificationsScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Developer - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });
});

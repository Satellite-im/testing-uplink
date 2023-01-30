import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import SettingsPrivacyScreen from "../screenobjects/SettingsPrivacyScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Privacy - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToPrivacySettings();
    await SettingsPrivacyScreen.waitForIsShown(true);
  });

  xit("Settings Privacy - Assert screen texts", async () => {});
});

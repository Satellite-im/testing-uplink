import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";
import { loginToApp } from "../helpers/commands";

describe("Settings - Privacy - Tests", async () => {
  before(async () => {
    await loginToApp('1234', 'test123');
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToPrivacySettings();
  });

  xit("Settings Privacy - Assert screen texts", async () => {});
});

import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";
import { loginWithNewAccount } from "../helpers/commands"

describe("Settings - Privacy - Tests", async () => {
  before(async () => {
    await loginWithNewAccount('1234', 'test123')
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToPrivacySettings();
  });

  xit("Settings Privacy - Assert screen texts", async () => {});
});

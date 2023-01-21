import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - Privacy - Tests", async () => {
  before(async () => {
    await SettingsMainScreen.goToMainScreen();
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToPrivacySettings();
  });

  xit("Settings Privacy - Assert screen texts", async () => {});
});

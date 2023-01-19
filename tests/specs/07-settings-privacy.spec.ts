import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - Privacy - Tests", async () => {
  before(async () => {
    await UplinkMainScreen.waitForIsShown(true);
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToPrivacySettings();
  });

  after(async () => {
    await SettingsMainScreen.goToMainScreen();
  })

  xit("Settings Privacy - Assert screen texts", async () => {});
});

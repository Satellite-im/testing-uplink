import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - Files - Tests", async () => {
  before(async () => {
    await SettingsMainScreen.goToMainScreen();
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToFilesSettings();
  });

  xit("Settings Files - Assert screen texts", async () => {});

  xit("Settings Files - Toggle switches to enabled", async () => {});

  xit("Settings Files - Toggle switches to enabled", async () => {});
});

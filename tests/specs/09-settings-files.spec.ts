import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";
import { loginToApp } from "../helpers/commands";

describe("Settings - Files - Tests", async () => {
  before(async () => {
    await loginToApp('1234', 'test123');
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToFilesSettings();
  });

  xit("Settings Files - Assert screen texts", async () => {});

  xit("Settings Files - Toggle switches to enabled", async () => {});

  xit("Settings Files - Toggle switches to enabled", async () => {});
});

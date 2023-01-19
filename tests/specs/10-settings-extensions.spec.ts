import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";
import { loginWithNewAccount } from "../helpers/commands"

describe("Settings - Extensions - Tests", async () => {
  before(async () => {
    await loginWithNewAccount('1234', 'test123')
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToExtensionsSettings();
  });

  xit("Settings Extensions - Assert screen texts", async () => {});

  xit("Settings Extensions - Toggle switches to enabled", async () => {});

  xit("Settings Extensions - Toggle switches to enabled", async () => {});
});

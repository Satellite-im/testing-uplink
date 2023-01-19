import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";
import { loginWithNewAccount } from "../helpers/commands"

describe("Settings - Audio - Tests", async () => {
  before(async () => {
    await loginWithNewAccount('1234', 'test123')
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToAudioSettings();
  });

  xit("Settings Audio - Assert screen texts", async () => {});

  xit("Settings Audio - Toggle switches to enabled", async () => {});

  xit("Settings Audio - Toggle switches to enabled", async () => {});
});

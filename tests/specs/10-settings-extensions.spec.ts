import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - Extensions - Tests", async () => {
  before(async () => {
    await SettingsMainScreen.goToMainScreen();
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToExtensionsSettings();
  });

  xit("Settings Extensions - Assert screen texts", async () => {});

  xit("Settings Extensions - Toggle switches to enabled", async () => {});

  xit("Settings Extensions - Toggle switches to enabled", async () => {});
});

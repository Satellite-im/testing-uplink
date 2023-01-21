import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - Developer - Tests", async () => {
  before(async () => {
    await SettingsMainScreen.goToMainScreen();
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToDeveloperSettings();
  });

  xit("Settings Developer - Assert screen texts", async () => {});

  xit("Settings Developer - Toggle switches to enabled", async () => {});

  xit("Settings Developer - Toggle switches to enabled", async () => {});

  xit("Settings Developer - Open codebase button", async () => {});

  xit("Settings Developer - Open folder button", async () => {});
});

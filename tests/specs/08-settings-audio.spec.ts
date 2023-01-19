import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - Audio - Tests", async () => {
  before(async () => {
    await UplinkMainScreen.waitForIsShown(true);
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToAudioSettings();
  });

  after(async () => {
    await SettingsMainScreen.goToMainScreen();
  })

  xit("Settings Audio - Assert screen texts", async () => {});

  xit("Settings Audio - Toggle switches to enabled", async () => {});

  xit("Settings Audio - Toggle switches to enabled", async () => {});
});

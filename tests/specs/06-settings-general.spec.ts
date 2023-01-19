import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - General - Tests", async () => {
  before(async () => {
    await UplinkMainScreen.waitForIsShown(true);
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
    await SettingsMainScreen.goToGeneralSettings();
  });

  after(async () => {
    await SettingsMainScreen.goToMainScreen();
  })

  xit("Settings General - Assert screen texts", async () => {});

  it("Settings General - Toggle switches to enabled", async () => {});

  xit("Settings General - Toggle switches to enabled", async () => {});

  xit("Settings General - Change theme dropdown selection", async () => {});

  xit("Settings General - Clear theme button", async () => {});

  xit("Settings General - Change language", async () => {});

  xit("Settings General - Switch back language to EN-US", async () => {});
});

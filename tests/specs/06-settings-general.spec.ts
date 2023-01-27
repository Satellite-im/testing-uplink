import WelcomeScreen from "../screenobjects/WelcomeScreen";
import { loginWithRandomUser } from "../helpers/commands";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";

describe("Settings - General - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToGeneralSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
  });

  xit("Settings General - Assert screen texts", async () => {});

  it("Settings General - Toggle switches to enabled", async () => {});

  xit("Settings General - Toggle switches to enabled", async () => {});

  xit("Settings General - Change theme dropdown selection", async () => {});

  xit("Settings General - Clear theme button", async () => {});

  xit("Settings General - Change language", async () => {});

  xit("Settings General - Switch back language to EN-US", async () => {});
});

import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import SettingsDeveloperScreen from "../screenobjects/SettingsDeveloperScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Developer - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.waitForIsShown(true);
  });

  xit("Settings Developer - Assert screen texts", async () => {});

  xit("Settings Developer - Toggle switches to enabled", async () => {});

  xit("Settings Developer - Toggle switches to enabled", async () => {});

  xit("Settings Developer - Open codebase button", async () => {});

  xit("Settings Developer - Open folder button", async () => {});
});

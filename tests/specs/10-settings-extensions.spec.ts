import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import SettingsExtensionsScreen from "../screenobjects/SettingsExtensionsScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Extensions - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToExtensionsSettings();
    await SettingsExtensionsScreen.waitForIsShown(true);
  });

  xit("Settings Extensions - Assert screen texts", async () => {});

  xit("Settings Extensions - Toggle switches to enabled", async () => {});

  xit("Settings Extensions - Toggle switches to enabled", async () => {});
});

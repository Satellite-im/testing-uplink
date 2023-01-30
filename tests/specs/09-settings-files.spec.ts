import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import SettingsFilesScreen from "../screenobjects/SettingsFilesScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Files - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToFilesSettings();
    await SettingsFilesScreen.waitForIsShown(true);
  });

  xit("Settings Files - Assert screen texts", async () => {});

  xit("Settings Files - Toggle switches to enabled", async () => {});

  xit("Settings Files - Toggle switches to enabled", async () => {});
});

import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import SettingsAudioScreen from "../screenobjects/SettingsAudioScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Audio - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToAudioSettings();
    await SettingsAudioScreen.waitForIsShown(true);
  });

  xit("Settings Audio - Assert screen texts", async () => {});

  xit("Settings Audio - Toggle switches to enabled", async () => {});

  xit("Settings Audio - Toggle switches to enabled", async () => {});
});

import SettingsNotificationsScreen from "../../screenobjects/SettingsNotificationsScreen";
import SettingsExtensionsScreen from "../../screenobjects/SettingsExtensionsScreen";

describe("Settings - Notifications - Tests", async () => {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsExtensionsScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });
});

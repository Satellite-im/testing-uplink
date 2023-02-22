import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsExtensionsScreen from "../screenobjects/SettingsExtensionsScreen";
import { loginWithRandomUser, showMainMenu } from "../helpers/commands";

describe("Settings - Extensions - Tests", async () => {
  it("Settings Extensions - Validate texts from Extension Placeholder", async () => {
    // Login with a random user, show main menu, go to Settings Screen and finally select the Settings Screen to validate
    await loginWithRandomUser();
    await showMainMenu();
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToExtensionsSettings();
    await SettingsExtensionsScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyHeader
    ).toHaveTextContaining("ENABLE AUTOMATICALLY");

    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyDescription
    ).toHaveTextContaining(
      "When turned on, new extensions will automatically be enabled by default."
    );
  });

  it("Settings Extensions - Activate the switch slider for Enable Automatically", async () => {
    // Click on Switch from Enable Automatically to activate it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from eEnable Automatically now has value = '1' (active)
    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyCheckbox
    ).toHaveAttrContaining("value", "1");
  });

  it("Settings Extensions - Deactivate the switch slider for Enable Automatically", async () => {
    // Click again on Switch from Enable Automatically to disable it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '0' (disabled)
    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyCheckbox
    ).toHaveAttrContaining("value", "0");
  });

  it("Settings Extensions - Open Extensions Folder", async () => {
    await SettingsExtensionsScreen.clickOnOpenExtensionsFolder();
  });
});

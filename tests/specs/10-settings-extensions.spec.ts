import FriendsScreen from "../screenobjects/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsExtensionsScreen from "../screenobjects/SettingsExtensionsScreen";
import { loginWithRandomUser, showMainMenu } from "../helpers/commands";

describe("Settings - Extensions - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await showMainMenu();
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToExtensionsSettings();
    await SettingsExtensionsScreen.waitForIsShown(true);
  });

  it("Settings Extensions - Validate texts from Extension Placeholder", async () => {
    await expect(
      await SettingsExtensionsScreen.extensionPlaceholderName
    ).toHaveTextContaining("Placeholder");

    await expect(
      await SettingsExtensionsScreen.extensionPlaceholderShortDescription
    ).toHaveTextContaining("NOBODY#1345");

    await expect(
      await SettingsExtensionsScreen.extensionPlaceholderLongDescription
    ).toHaveTextContaining(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    );
  });

  // Skipped for now since button does not perform any action
  xit("Settings Extensions - Open Extensions Folder", async () => {
    await SettingsExtensionsScreen.clickOnOpenExtensionsFolder();
  });

  it("Settings Extensions - Change extension placeholder to enabled", async () => {
    // Click on Switch from Extension Placeholder to activate it
    await SettingsExtensionsScreen.clickOnExtensionPlaceholderButton();

    // Validate that switch from extension placeholder now has value = '1' (active)
    await expect(
      await SettingsExtensionsScreen.extensionPlaceholderControllerValue
    ).toHaveAttrContaining("value", "1");
  });

  it("Settings Extensions - Change extension placeholder to disabled", async () => {
    // Click again on Switch from Extension Placeholder to disable it
    await SettingsExtensionsScreen.clickOnExtensionPlaceholderButton();

    // Validate that switch from extension placeholder now has value = '0' (disabled)
    await expect(
      await SettingsExtensionsScreen.extensionPlaceholderControllerValue
    ).toHaveAttrContaining("value", "0");
  });
});

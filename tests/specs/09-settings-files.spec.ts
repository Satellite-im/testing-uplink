import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsFilesScreen from "../screenobjects/SettingsFilesScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Files - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToFilesSettings();
    await SettingsFilesScreen.waitForIsShown(true);
  });

  it("Settings Files - Assert screen texts", async () => {
    // Validate LOCAL SYNC settings section texts
    await expect(
      await SettingsFilesScreen.localSyncHeader
    ).toHaveTextContaining("LOCAL SYNC");
    await expect(
      await SettingsFilesScreen.localSyncDescription
    ).toHaveTextContaining(
      "When enabled, files will be synced to your local machine."
    );

    // Validate OPEN SYNC FOLDER settings section texts
    await expect(
      await SettingsFilesScreen.openSyncFolderHeader
    ).toHaveTextContaining("OPEN SYNC FOLDER");
    await expect(
      await SettingsFilesScreen.openSyncFolderDescription
    ).toHaveTextContaining("Open the folder where your files are synced to.");
  });

  it("Settings Files - Update LOCAL SYNC switch to enabled", async () => {
    // Click on LOCAL SYNC switch to activate the option
    await SettingsFilesScreen.clickOnLocalSync();

    // Validate that switch has now value = '1' (active)
    await expect(
      await SettingsFilesScreen.localSyncControllerValue
    ).toHaveAttrContaining("value", "1");
  });

  it("Settings Files - Update LOCAL SYNC switch to disabled", async () => {
    // Click on LOCAL SYNC switch again to disable the option
    await SettingsFilesScreen.clickOnLocalSync();

    // Validate that switch has now value = '0' (disabled)
    await expect(
      await SettingsFilesScreen.localSyncControllerValue
    ).toHaveAttrContaining("value", "0");
  });

  // Test skipped for now because button does not perform any action
  xit("Settings Files - Click on Open Sync Folder button", async () => {
    await SettingsFilesScreen.clickOnOpenSyncFolder();
  });
});

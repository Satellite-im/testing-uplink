import SettingsAudioScreen from "../screenobjects/settings/SettingsAudioScreen";
import SettingsFilesScreen from "../screenobjects/settings/SettingsFilesScreen";
let settingsAudioFirstUser = new SettingsAudioScreen("userA");
let settingsFilesFirstUser = new SettingsFilesScreen("userA");

export default async function settingsFiles() {
  it("Settings Files - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsAudioFirstUser.goToFilesSettings();
    await settingsFilesFirstUser.waitForIsShown(true);

    // Validate LOCAL SYNC settings section texts
    await expect(settingsFilesFirstUser.localSyncHeader).toHaveTextContaining(
      "LOCAL SYNC"
    );
    await expect(
      settingsFilesFirstUser.localSyncDescription
    ).toHaveTextContaining(
      "When enabled, files will be synced to your local machine."
    );

    // Validate OPEN SYNC FOLDER settings section texts
    await expect(
      settingsFilesFirstUser.openSyncFolderHeader
    ).toHaveTextContaining("OPEN SYNC FOLDER");
    await expect(
      settingsFilesFirstUser.openSyncFolderDescription
    ).toHaveTextContaining("Open the folder where your files are synced to.");
  });

  it("Settings Files - Update LOCAL SYNC switch to enabled", async () => {
    // Click on LOCAL SYNC switch to activate the option
    await settingsFilesFirstUser.clickOnLocalSync();

    // Validate that switch has now value = '1' (active)
    const toggleElement = await settingsFilesFirstUser.localSyncControllerValue;
    const localSyncState = await settingsFilesFirstUser.getToggleState(
      toggleElement
    );

    await expect(localSyncState).toEqual("1");
  });

  it("Settings Files - Update LOCAL SYNC switch to disabled", async () => {
    // Click on LOCAL SYNC switch again to disable the option
    await settingsFilesFirstUser.clickOnLocalSync();

    // Validate that switch has now value = '0' (disabled)
    const toggleElement = await settingsFilesFirstUser.localSyncControllerValue;
    const localSyncState = await settingsFilesFirstUser.getToggleState(
      toggleElement
    );

    await expect(localSyncState).toEqual("0");
  });

  // Test skipped for now because button does not perform any action
  xit("Settings Files - Click on Open Sync Folder button", async () => {
    await settingsFilesFirstUser.clickOnOpenSyncFolder();
  });
}

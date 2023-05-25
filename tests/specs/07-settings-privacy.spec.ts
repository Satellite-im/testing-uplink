import SettingsPrivacyScreen from "../screenobjects/settings/SettingsPrivacyScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
let settingsPrivacyFirstUser = new SettingsPrivacyScreen("userA");
let settingsProfileFirstUser = new SettingsProfileScreen("userA");

export default async function settingsPrivacy() {
  it("Settings Privacy - Validate header and description texts from settings sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsProfileFirstUser.goToPrivacySettings();
    await settingsPrivacyFirstUser.waitForIsShown(true);

    // Start validations
    await expect(
      settingsPrivacyFirstUser.backupPhraseHeader
    ).toHaveTextContaining("BACKUP RECOVERY PHRASE");
    await expect(
      settingsPrivacyFirstUser.backupPhraseDescription
    ).toHaveTextContaining(
      "Back this phrase up! Along with your password this represents your account. If you lose it, we can't help you get it back."
    );
  });

  // Test skipped since button does not perform any action now
  xit("Settings Privacy - Click on Backup Phrase", async () => {
    await settingsPrivacyFirstUser.clickOnBackupPhrase();
  });
}

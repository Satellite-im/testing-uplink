import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import SettingsPrivacyScreen from "../screenobjects/settings/SettingsPrivacyScreen";

export default async function settingsPrivacy() {
  it("Settings Privacy - Validate header and description texts from settings sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsProfileScreen.goToPrivacySettings();
    await SettingsPrivacyScreen.waitForIsShown(true);

    // Start validations
    await expect(SettingsPrivacyScreen.backupPhraseHeader).toHaveTextContaining(
      "BACKUP RECOVERY PHRASE"
    );
    await expect(
      SettingsPrivacyScreen.backupPhraseDescription
    ).toHaveTextContaining(
      "Back this phrase up! Along with your password this represents your account. If you lose it, we can't help you get it back."
    );
  });

  // Test skipped since button does not perform any action now
  xit("Settings Privacy - Click on Backup Phrase", async () => {
    await SettingsPrivacyScreen.clickOnBackupPhrase();
  });
}

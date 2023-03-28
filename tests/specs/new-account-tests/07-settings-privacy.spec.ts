import SettingsProfileScreen from "../../screenobjects/SettingsProfileScreen";
import SettingsPrivacyScreen from "../../screenobjects/SettingsPrivacyScreen";
import { loginWithTestUser } from "../../helpers/commands";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";

describe("Settings Privacy Tests", async () => {
  it("Settings Privacy - Validate header and description texts from settings sections", async () => {
    await loginWithTestUser();
    await WelcomeScreen.goToSettings();

    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsProfileScreen.goToPrivacySettings();
    await SettingsPrivacyScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsPrivacyScreen.backupPhraseHeader
    ).toHaveTextContaining("BACKUP RECOVERY PHRASE");
    await expect(
      await SettingsPrivacyScreen.backupPhraseDescription
    ).toHaveTextContaining(
      "Back this phrase up! Along with your password this represents your account. If you lose it, we can't help you get it back."
    );
  });

  // Test skipped since button does not perform any action now
  xit("Settings Privacy - Click on Backup Phrase", async () => {
    await SettingsPrivacyScreen.clickOnBackupPhrase();
  });
});

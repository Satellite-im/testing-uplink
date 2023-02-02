import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import SettingsPrivacyScreen from "../screenobjects/SettingsPrivacyScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Privacy - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToPrivacySettings();
    await SettingsPrivacyScreen.waitForIsShown(true);
  });

  it("Settings Privacy - Validate header and description texts from settings sections", async () => {
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

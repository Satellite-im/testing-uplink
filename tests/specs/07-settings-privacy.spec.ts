import FriendsScreen from "../screenobjects/WelcomeScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsPrivacyScreen from "../screenobjects/SettingsPrivacyScreen";
import { loginWithRandomUser, showMainMenu } from "../helpers/commands";

describe("Settings - Privacy - Tests", async () => {
  it("Settings Privacy - Validate header and description texts from settings sections", async () => {
    // Login with a random user, show main menu, go to Settings Screen and finally select the Settings Screen to validate
    await loginWithRandomUser();
    await showMainMenu();
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToPrivacySettings();
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

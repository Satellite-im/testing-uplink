require("module-alias/register");
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";

export default async function settingsNotificationsTests() {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsAccessibilityScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });

  it("Settings Notifications - Validate header and description texts are correct", async () => {
    // Start validations
    const enabledHeader =
      await SettingsNotificationsScreen.enabledNotificationsHeader;
    const enabledDescription =
      await SettingsNotificationsScreen.enabledNotificationsDescription;
    await expect(enabledHeader).toHaveText("ENABLED");
    await expect(enabledDescription).toHaveText(
      "Enable notifications for incoming calls, messages, and more.",
    );

    const friendsHeader =
      await SettingsNotificationsScreen.friendsNotificationsHeader;
    const friendsDescription =
      await SettingsNotificationsScreen.friendsNotificationsDescription;
    await expect(friendsHeader).toHaveText("FRIENDS");
    await expect(friendsDescription).toHaveText(
      "Enable notifications for friend requests.",
    );

    const messagesHeader =
      await SettingsNotificationsScreen.messagesNotificationsHeader;
    const messagesDescription =
      await SettingsNotificationsScreen.messagesNotificationsDescription;
    await expect(messagesHeader).toHaveText("MESSAGES");
    await expect(messagesDescription).toHaveText(
      "Enable notifications for new messages.",
    );

    const settingsHeader =
      await SettingsNotificationsScreen.settingsNotificationsHeader;
    const settingsDescription =
      await SettingsNotificationsScreen.settingsNotificationsDescription;
    await expect(settingsHeader).toHaveText("SETTINGS");
    await expect(settingsDescription).toHaveText(
      "Enable notifications for updates and important alerts.",
    );
  });

  it("Settings Notifications - Disable all notifications by switching ENABLED toggle to off", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "0" (disabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    await SettingsNotificationsScreen.validateEnabledNotificationsIsDisabled();

    // Validate that toggle switch for FRIENDS has now value = "0" (disabled)
    await SettingsNotificationsScreen.validateFriendsNotificationsIsDisabled();

    // Validate that toggle switch for MESSAGES has now value = "0" (disabled)
    await SettingsNotificationsScreen.validateMessagesNotificationsIsDisabled();

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    await SettingsNotificationsScreen.validateSettingsNotificationsIsDisabled();
  });

  it("Settings Notifications - Enable again all notifications by switching ENABLED toggle to on", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    await SettingsNotificationsScreen.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS has now value = "1" (enabled)
    await SettingsNotificationsScreen.validateFriendsNotificationsIsEnabled();

    // Validate that toggle switch for MESSAGES has now value = "1" (enabled)
    await SettingsNotificationsScreen.validateMessagesNotificationsIsEnabled();

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    await SettingsNotificationsScreen.validateSettingsNotificationsIsDisabled();
  });

  it("Settings Notifications - Enable only FRIENDS notifications", async () => {
    // Deactivate toggle switches for FRIENDS and MESSAGES initially
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Click again on FRIENDS Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnFriendsNotifications();

    // Validate that toggle switch for ENABLED has now value = "1" (enabled)
    await SettingsNotificationsScreen.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS has now value = 1" (enabled)
    await SettingsNotificationsScreen.validateFriendsNotificationsIsEnabled();

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    await SettingsNotificationsScreen.validateMessagesNotificationsIsDisabled();

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    await SettingsNotificationsScreen.validateSettingsNotificationsIsDisabled();
  });

  it("Settings Notifications - Enable only MESSAGES notifications", async () => {
    // Deactivate toggle switches for FRIENDS
    await SettingsNotificationsScreen.clickOnFriendsNotifications();

    // Click on MESSAGES Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    await SettingsNotificationsScreen.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS now has value = "0" (disabled)
    await SettingsNotificationsScreen.validateFriendsNotificationsIsDisabled();

    // Validate that toggle switch for MESSAGES has now value = 1" (enabled)
    await SettingsNotificationsScreen.validateMessagesNotificationsIsEnabled();

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    await SettingsNotificationsScreen.validateSettingsNotificationsIsDisabled();
  });

  it("Settings Notifications - Enable only SETTINGS notifications", async () => {
    // Deactivate toggle switches for MESSAGES
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Click again on SETTINGS Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnSettingsNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    await SettingsNotificationsScreen.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS still has value = "0" (disabled)
    await SettingsNotificationsScreen.validateFriendsNotificationsIsDisabled();

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    await SettingsNotificationsScreen.validateMessagesNotificationsIsDisabled();

    // Validate that toggle switch for SETTINGS now has value = "1" (enabled)
    await SettingsNotificationsScreen.validateSettingsNotificationsIsEnabled();
  });
}

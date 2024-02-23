require("module-alias/register");
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
const settingsAccessibility = new SettingsAccessibilityScreen();
const settingsNotifications = new SettingsNotificationsScreen();

export default async function settingsNotificationsTests() {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsAccessibility.goToNotificationsSettings();
    await settingsNotifications.waitForIsShown(true);
  });

  it("Settings Notifications - Validate header and description texts are correct", async () => {
    // Start validations
    const enabledHeader =
      await settingsNotifications.enabledNotificationsHeader;
    const enabledDescription =
      await settingsNotifications.enabledNotificationsDescription;
    await expect(enabledHeader).toHaveTextContaining("ENABLED");
    await expect(enabledDescription).toHaveTextContaining(
      "Enable notifications for incoming calls, messages, and more.",
    );

    const friendsHeader =
      await settingsNotifications.friendsNotificationsHeader;
    const friendsDescription =
      await settingsNotifications.friendsNotificationsDescription;
    await expect(friendsHeader).toHaveTextContaining("FRIENDS");
    await expect(friendsDescription).toHaveTextContaining(
      "Enable notifications for friend requests.",
    );

    const messagesHeader =
      await settingsNotifications.messagesNotificationsHeader;
    const messagesDescription =
      await settingsNotifications.messagesNotificationsDescription;
    await expect(messagesHeader).toHaveTextContaining("MESSAGES");
    await expect(messagesDescription).toHaveTextContaining(
      "Enable notifications for new messages.",
    );

    const settingsHeader =
      await settingsNotifications.settingsNotificationsHeader;
    const settingsDescription =
      await settingsNotifications.settingsNotificationsDescription;
    await expect(settingsHeader).toHaveTextContaining("SETTINGS");
    await expect(settingsDescription).toHaveText(
      "Enable notifications for updates and important alerts.",
    );
  });

  it("Settings Notifications - Disable all notifications by switching ENABLED toggle to off", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "0" (disabled)
    await settingsNotifications.clickOnEnabledNotifications();
    await settingsNotifications.validateEnabledNotificationsIsDisabled();

    // Validate that toggle switch for FRIENDS has now value = "0" (disabled)
    await settingsNotifications.validateFriendsNotificationsIsDisabled();

    // Validate that toggle switch for MESSAGES has now value = "0" (disabled)
    await settingsNotifications.validateMessagesNotificationsIsDisabled();

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    await settingsNotifications.validateSettingsNotificationsIsDisabled();
  });

  it("Settings Notifications - Enable again all notifications by switching ENABLED toggle to on", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await settingsNotifications.clickOnEnabledNotifications();
    await settingsNotifications.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS has now value = "1" (enabled)
    await settingsNotifications.validateFriendsNotificationsIsEnabled();

    // Validate that toggle switch for MESSAGES has now value = "1" (enabled)
    await settingsNotifications.validateMessagesNotificationsIsEnabled();

    // Validate that toggle switch for SETTINGS has now value = "1" (enabled)
    await settingsNotifications.validateSettingsNotificationsIsEnabled();
  });

  it("Settings Notifications - Enable only FRIENDS notifications", async () => {
    // Deactivate toggle switches for FRIENDS and MESSAGES initially
    await settingsNotifications.clickOnFriendsNotifications();
    await settingsNotifications.clickOnMessagesNotifications();

    // Click again on FRIENDS Notifications to activate this toggle
    await settingsNotifications.clickOnFriendsNotifications();

    // Validate that toggle switch for ENABLED has now value = "1" (enabled)
    await settingsNotifications.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS has now value = 1" (enabled)
    await settingsNotifications.validateFriendsNotificationsIsEnabled();

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    await settingsNotifications.validateMessagesNotificationsIsDisabled();

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    await settingsNotifications.validateSettingsNotificationsIsDisabled();
  });

  it("Settings Notifications - Enable only MESSAGES notifications", async () => {
    // Deactivate toggle switches for FRIENDS
    await settingsNotifications.clickOnFriendsNotifications();

    // Click on MESSAGES Notifications to activate this toggle
    await settingsNotifications.clickOnMessagesNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    await settingsNotifications.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS now has value = "0" (disabled)
    await settingsNotifications.validateFriendsNotificationsIsDisabled();

    // Validate that toggle switch for MESSAGES has now value = 1" (enabled)
    await settingsNotifications.validateMessagesNotificationsIsEnabled();

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    await settingsNotifications.validateSettingsNotificationsIsDisabled();
  });

  it("Settings Notifications - Enable only SETTINGS notifications", async () => {
    // Deactivate toggle switches for MESSAGES
    await settingsNotifications.clickOnMessagesNotifications();

    // Click again on SETTINGS Notifications to activate this toggle
    await settingsNotifications.clickOnSettingsNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    await settingsNotifications.validateEnabledNotificationsIsEnabled();

    // Validate that toggle switch for FRIENDS still has value = "0" (disabled)
    await settingsNotifications.validateFriendsNotificationsIsDisabled();

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    await settingsNotifications.validateMessagesNotificationsIsDisabled();

    // Validate that toggle switch for SETTINGS now has value = "1" (enabled)
    await settingsNotifications.validateSettingsNotificationsIsEnabled();
  });
}

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
    const enabledToggle =
      await settingsNotifications.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotifications.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("0");

    // Validate that toggle switch for FRIENDS has now value = "0" (disabled)
    const friendsToggle =
      await settingsNotifications.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotifications.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = "0" (disabled)
    const messagesToggle =
      await settingsNotifications.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotifications.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    const settingsToggle =
      await settingsNotifications.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotifications.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable again all notifications by switching ENABLED toggle to on", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await settingsNotifications.clickOnEnabledNotifications();
    const enabledToggle =
      await settingsNotifications.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotifications.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = "1" (enabled)
    const friendsToggle =
      await settingsNotifications.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotifications.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES has now value = "1" (enabled)
    const messagesToggle =
      await settingsNotifications.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotifications.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS has now value = "1" (enabled)
    const settingsToggle =
      await settingsNotifications.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotifications.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only FRIENDS notifications", async () => {
    // Deactivate toggle switches for FRIENDS and MESSAGES initially
    await settingsNotifications.clickOnFriendsNotifications();
    await settingsNotifications.clickOnMessagesNotifications();

    // Click again on FRIENDS Notifications to activate this toggle
    await settingsNotifications.clickOnFriendsNotifications();

    // Validate that toggle switch for ENABLED has now value = "1" (enabled)
    const enabledToggle =
      await settingsNotifications.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotifications.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = 1" (enabled)
    const friendsToggle =
      await settingsNotifications.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotifications.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await settingsNotifications.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotifications.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await settingsNotifications.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotifications.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only MESSAGES notifications", async () => {
    // Deactivate toggle switches for FRIENDS
    await settingsNotifications.clickOnFriendsNotifications();

    // Click on MESSAGES Notifications to activate this toggle
    await settingsNotifications.clickOnMessagesNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledToggle =
      await settingsNotifications.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotifications.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS now has value = "0" (disabled)
    const friendsToggle =
      await settingsNotifications.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotifications.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = 1" (enabled)
    const messagesToggle =
      await settingsNotifications.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotifications.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await settingsNotifications.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotifications.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only SETTINGS notifications", async () => {
    // Deactivate toggle switches for MESSAGES
    await settingsNotifications.clickOnMessagesNotifications();

    // Click again on SETTINGS Notifications to activate this toggle
    await settingsNotifications.clickOnSettingsNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledToggle =
      await settingsNotifications.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotifications.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS still has value = "0" (disabled)
    const friendsToggle =
      await settingsNotifications.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotifications.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await settingsNotifications.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotifications.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS now has value = "1" (enabled)
    const settingsToggle =
      await settingsNotifications.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotifications.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("1");
  });
}

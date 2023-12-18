require("module-alias/register");
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
const settingsAccessibilityFirstUser = new SettingsAccessibilityScreen();
const settingsNotificationsFirstUser = new SettingsNotificationsScreen();

export default async function settingsNotifications() {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsAccessibilityFirstUser.goToNotificationsSettings();
    await settingsNotificationsFirstUser.waitForIsShown(true);
  });

  it("Settings Notifications - Validate header and description texts are correct", async () => {
    // Start validations
    const enabledHeader =
      await settingsNotificationsFirstUser.enabledNotificationsHeader;
    const enabledDescription =
      await settingsNotificationsFirstUser.enabledNotificationsDescription;
    await expect(enabledHeader).toHaveTextContaining("ENABLED");
    await expect(enabledDescription).toHaveTextContaining(
      "Enable notifications for incoming calls, messages, and more.",
    );

    const friendsHeader =
      await settingsNotificationsFirstUser.friendsNotificationsHeader;
    const friendsDescription =
      await settingsNotificationsFirstUser.friendsNotificationsDescription;
    await expect(friendsHeader).toHaveTextContaining("FRIENDS");
    await expect(friendsDescription).toHaveTextContaining(
      "Enable notifications for friend requests.",
    );

    const messagesHeader =
      await settingsNotificationsFirstUser.messagesNotificationsHeader;
    const messagesDescription =
      await settingsNotificationsFirstUser.messagesNotificationsDescription;
    await expect(messagesHeader).toHaveTextContaining("MESSAGES");
    await expect(messagesDescription).toHaveTextContaining(
      "Enable notifications for new messages.",
    );

    const settingsHeader =
      await settingsNotificationsFirstUser.settingsNotificationsHeader;
    const settingsDescription =
      await settingsNotificationsFirstUser.settingsNotificationsDescription;
    await expect(settingsHeader).toHaveTextContaining("SETTINGS");
    await expect(settingsDescription).toHaveText(
      "Enable notifications for updates and important alerts.",
    );
  });

  it("Settings Notifications - Disable all notifications by switching ENABLED toggle to off", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "0" (disabled)
    await settingsNotificationsFirstUser.clickOnEnabledNotifications();
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotificationsFirstUser.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("0");

    // Validate that toggle switch for FRIENDS has now value = "0" (disabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotificationsFirstUser.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = "0" (disabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotificationsFirstUser.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotificationsFirstUser.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable again all notifications by switching ENABLED toggle to on", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await settingsNotificationsFirstUser.clickOnEnabledNotifications();
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotificationsFirstUser.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = "1" (enabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotificationsFirstUser.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES has now value = "1" (enabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotificationsFirstUser.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS has now value = "1" (enabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotificationsFirstUser.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only FRIENDS notifications", async () => {
    // Deactivate toggle switches for FRIENDS and MESSAGES initially
    await settingsNotificationsFirstUser.clickOnFriendsNotifications();
    await settingsNotificationsFirstUser.clickOnMessagesNotifications();

    // Click again on FRIENDS Notifications to activate this toggle
    await settingsNotificationsFirstUser.clickOnFriendsNotifications();

    // Validate that toggle switch for ENABLED has now value = "1" (enabled)
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotificationsFirstUser.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = 1" (enabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotificationsFirstUser.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotificationsFirstUser.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotificationsFirstUser.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only MESSAGES notifications", async () => {
    // Deactivate toggle switches for FRIENDS
    await settingsNotificationsFirstUser.clickOnFriendsNotifications();

    // Click on MESSAGES Notifications to activate this toggle
    await settingsNotificationsFirstUser.clickOnMessagesNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotificationsFirstUser.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS now has value = "0" (disabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotificationsFirstUser.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = 1" (enabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotificationsFirstUser.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotificationsFirstUser.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only SETTINGS notifications", async () => {
    // Deactivate toggle switches for MESSAGES
    await settingsNotificationsFirstUser.clickOnMessagesNotifications();

    // Click again on SETTINGS Notifications to activate this toggle
    await settingsNotificationsFirstUser.clickOnSettingsNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState =
      await settingsNotificationsFirstUser.getToggleState(enabledToggle);
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS still has value = "0" (disabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState =
      await settingsNotificationsFirstUser.getToggleState(friendsToggle);
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState =
      await settingsNotificationsFirstUser.getToggleState(messagesToggle);
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS now has value = "1" (enabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState =
      await settingsNotificationsFirstUser.getToggleState(settingsToggle);
    await expect(settingsState).toEqual("1");
  });
}

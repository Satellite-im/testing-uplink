import SettingsNotificationsScreen from "../screenobjects/SettingsNotificationsScreen";
import SettingsAccessibilityScreen from "../screenobjects/SettingsAccessibilityScreen";

export default async function settingsNotifications() {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsAccessibilityScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });

  it("Settings Notifications - Validate header and description texts are correct", async () => {
    // Start validations
    await expect(
      SettingsNotificationsScreen.grantPermissionsHeader
    ).toHaveTextContaining("GRANT PERMISSIONS");
    await expect(
      SettingsNotificationsScreen.grantPermissionsDescription
    ).toHaveTextContaining("Grant permissions to receive notifications.");
    await expect(
      SettingsNotificationsScreen.enabledNotificationsHeader
    ).toHaveTextContaining("ENABLED");
    await expect(
      SettingsNotificationsScreen.enabledNotificationsDescription
    ).toHaveTextContaining(
      "Enable notifications for incoming calls, messages, and more."
    );
    await expect(
      SettingsNotificationsScreen.friendsNotificationsHeader
    ).toHaveTextContaining("FRIENDS");
    await expect(
      SettingsNotificationsScreen.friendsNotificationsDescription
    ).toHaveTextContaining("Enable notifications for friend requests.");
    await expect(
      SettingsNotificationsScreen.messagesNotificationsHeader
    ).toHaveTextContaining("MESSAGES");
    await expect(
      SettingsNotificationsScreen.messagesNotificationsDescription
    ).toHaveTextContaining("Enable notifications for new messages.");
    await expect(
      SettingsNotificationsScreen.settingsNotificationsHeader
    ).toHaveTextContaining("SETTINGS");
    await expect(
      SettingsNotificationsScreen.settingsNotificationsDescription
    ).toHaveText("Enable notifications for updates and important alerts.");
  });

  it("Settings Notifications - Disable all notifications by switching ENABLED toggle to off", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "0" (disabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    const enabledToggle =
      await SettingsNotificationsScreen.enabledNotificationsControllerValue;
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("0");

    // Validate that toggle switch for FRIENDS has now value = "0" (disabled)
    const friendsToggle =
      await SettingsNotificationsScreen.friendsNotificationsControllerValue;
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = "0" (disabled)
    const messagesToggle =
      await SettingsNotificationsScreen.messagesNotificationsControllerValue;
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    const settingsToggle =
      await SettingsNotificationsScreen.settingsNotificationsControllerValue;
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      settingsToggle
    );
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable again all notifications by switching ENABLED toggle to on", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    const enabledToggle =
      await SettingsNotificationsScreen.enabledNotificationsControllerValue;
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = "1" (enabled)
    const friendsToggle =
      await SettingsNotificationsScreen.friendsNotificationsControllerValue;
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES has now value = "1" (enabled)
    const messagesToggle =
      await SettingsNotificationsScreen.messagesNotificationsControllerValue;
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS has now value = "1" (enabled)
    const settingsToggle =
      await SettingsNotificationsScreen.settingsNotificationsControllerValue;
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      settingsToggle
    );
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only FRIENDS notifications", async () => {
    // Deactivate toggle switches for FRIENDS and MESSAGES initially
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Click again on FRIENDS Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnFriendsNotifications();

    // Validate that toggle switch for ENABLED has now value = "1" (enabled)
    const enabledToggle =
      await SettingsNotificationsScreen.enabledNotificationsControllerValue;
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = 1" (enabled)
    const friendsToggle =
      await SettingsNotificationsScreen.friendsNotificationsControllerValue;
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await SettingsNotificationsScreen.messagesNotificationsControllerValue;
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await SettingsNotificationsScreen.settingsNotificationsControllerValue;
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      settingsToggle
    );
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only MESSAGES notifications", async () => {
    // Deactivate toggle switches for FRIENDS
    await SettingsNotificationsScreen.clickOnFriendsNotifications();

    // Click on MESSAGES Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledToggle =
      await SettingsNotificationsScreen.enabledNotificationsControllerValue;
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS now has value = "0" (disabled)
    const friendsToggle =
      await SettingsNotificationsScreen.friendsNotificationsControllerValue;
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = 1" (enabled)
    const messagesToggle =
      await SettingsNotificationsScreen.messagesNotificationsControllerValue;
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await SettingsNotificationsScreen.settingsNotificationsControllerValue;
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      settingsToggle
    );
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only SETTINGS notifications", async () => {
    // Deactivate toggle switches for MESSAGES
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Click again on SETTINGS Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnSettingsNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledToggle =
      await SettingsNotificationsScreen.enabledNotificationsControllerValue;
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS still has value = "0" (disabled)
    const friendsToggle =
      await SettingsNotificationsScreen.friendsNotificationsControllerValue;
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await SettingsNotificationsScreen.messagesNotificationsControllerValue;
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS now has value = "1" (enabled)
    const settingsToggle =
      await SettingsNotificationsScreen.settingsNotificationsControllerValue;
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      settingsToggle
    );
    await expect(settingsState).toEqual("1");
  });
}

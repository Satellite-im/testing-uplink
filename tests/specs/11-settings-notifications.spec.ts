import SettingsNotificationsScreen from "../screenobjects/SettingsNotificationsScreen";
import SettingsExtensionsScreen from "../screenobjects/SettingsExtensionsScreen";

export default async function settingsNotifications() {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsExtensionsScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });

  it("Settings Notifications - Validate header and description texts are correct", async () => {
    // Start validations
    await expect(
      await SettingsNotificationsScreen.grantPermissionsHeader
    ).toHaveTextContaining("GRANT PERMISSIONS");
    await expect(
      await SettingsNotificationsScreen.grantPermissionsDescription
    ).toHaveTextContaining("Grant permissions to receive notifications.");
    await expect(
      await SettingsNotificationsScreen.enabledNotificationsHeader
    ).toHaveTextContaining("ENABLED");
    await expect(
      await SettingsNotificationsScreen.enabledNotificationsDescription
    ).toHaveTextContaining(
      "Enable notifications for incoming calls, messages, and more."
    );
    await expect(
      await SettingsNotificationsScreen.friendsNotificationsHeader
    ).toHaveTextContaining("FRIENDS");
    await expect(
      await SettingsNotificationsScreen.friendsNotificationsDescription
    ).toHaveTextContaining("Enable notifications for friend requests.");
    await expect(
      await SettingsNotificationsScreen.messagesNotificationsHeader
    ).toHaveTextContaining("MESSAGES");
    await expect(
      await SettingsNotificationsScreen.messagesNotificationsDescription
    ).toHaveTextContaining("Enable notifications for new messages.");
    await expect(
      await SettingsNotificationsScreen.settingsNotificationsHeader
    ).toHaveTextContaining("SETTINGS");
    await expect(
      await SettingsNotificationsScreen.settingsNotificationsDescription
    ).toHaveText("Enable notifications for updates and important alerts.");
  });

  // Failing on MacOS because the click is not switching in the correct element position, needs research
  xit("Settings Notifications - Toggle switches to enabled", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.enabledNotificationsControllerValue
    );
    expect(enabledState).toEqual("1");

    // Click on FRIENDS switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.friendsNotificationsControllerValue
    );
    expect(friendsState).toEqual("1");

    // Click on MESSAGES switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnMessagesNotifications();
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.messagesNotificationsControllerValue
    );
    expect(messagesState).toEqual("1");

    // Click on SETTINGS switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnSettingsNotifications();
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("1");
  });

  // Failing on MacOS because the click is not switching in the correct element position, needs research
  xit("Settings Notifications - Toggle switches to disabled", async () => {
    // Click on ENABLED switch slider to deactivate toggle and then validate that toggle has now value = "0" (disabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.enabledNotificationsControllerValue
    );
    expect(enabledState).toEqual("0");

    // Click on FRIENDS switch slider to deactivate toggle and then validate that toggle has now value = "0" (disabled)
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.friendsNotificationsControllerValue
    );
    expect(friendsState).toEqual("0");

    // Click on MESSAGES switch slider to deactivate toggle and then validate that toggle has now value = "0" (disabled)
    await SettingsNotificationsScreen.clickOnMessagesNotifications();
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.messagesNotificationsControllerValue
    );
    expect(messagesState).toEqual("0");

    // Click on SETTINGS switch slider to deactivate toggle and then validate that toggle has now value = "0" (disabled)
    await SettingsNotificationsScreen.clickOnSettingsNotifications();
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("0");
  });
}

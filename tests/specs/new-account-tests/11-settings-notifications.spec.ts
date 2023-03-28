import SettingsNotificationsScreen from "../../screenobjects/SettingsNotificationsScreen";
import { loginWithTestUser } from "../../helpers/commands";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";
import SettingsProfileScreen from "../../screenobjects/SettingsProfileScreen";

describe("Settings Notifications Tests", async () => {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    await loginWithTestUser();
    await WelcomeScreen.goToSettings();

    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsProfileScreen.goToNotificationsSettings();
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

  it("Settings Notification - Enable Settings Notifications", async () => {
    // Click on SETTINGS switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnSettingsNotifications();
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("1");
  });

  it("Settings Notifications - Disable all notifications by switching ENABLED toggle to off", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "0" (disabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.enabledNotificationsControllerValue
    );
    expect(enabledState).toEqual("0");

    // Validate that toggle switch for FRIENDS has now value = "0" (disabled)
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.friendsNotificationsControllerValue
    );
    expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = "0" (disabled)
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.messagesNotificationsControllerValue
    );
    expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable again all notifications by switching ENABLED toggle to on", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await SettingsNotificationsScreen.clickOnEnabledNotifications();
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.enabledNotificationsControllerValue
    );
    expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = "1" (enabled)
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.friendsNotificationsControllerValue
    );
    expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES has now value = "1" (enabled)
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.messagesNotificationsControllerValue
    );
    expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS has now value = "1" (enabled)
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("1");
  });

  it("Settings Notifications - Enable only FRIENDS notifications", async () => {
    // Deactivate toggle switches for FRIENDS, MESSAGES and SETTINGS initially
    await SettingsNotificationsScreen.clickOnFriendsNotifications();
    await SettingsNotificationsScreen.clickOnMessagesNotifications();
    await SettingsNotificationsScreen.clickOnSettingsNotifications();

    // Click again on FRIENDS Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnFriendsNotifications();

    // Validate that toggle switch for ENABLED has now value = "1" (enabled)
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.enabledNotificationsControllerValue
    );
    expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = 1" (enabled)
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.friendsNotificationsControllerValue
    );
    expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.messagesNotificationsControllerValue
    );
    expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only MESSAGES notifications", async () => {
    // Deactivate toggle switches for FRIENDS
    await SettingsNotificationsScreen.clickOnFriendsNotifications();

    // Click on MESSAGES Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.enabledNotificationsControllerValue
    );
    expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS now has value = "0" (disabled)
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.friendsNotificationsControllerValue
    );
    expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = 1" (enabled)
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.messagesNotificationsControllerValue
    );
    expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable only SETTINGS notifications", async () => {
    // Deactivate toggle switches for MESSAGES
    await SettingsNotificationsScreen.clickOnMessagesNotifications();

    // Click again on SETTINGS Notifications to activate this toggle
    await SettingsNotificationsScreen.clickOnSettingsNotifications();

    // Validate that toggle switch for ENABLED still has value = "1" (enabled)
    const enabledState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.enabledNotificationsControllerValue
    );
    expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS still has value = "0" (disabled)
    const friendsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.friendsNotificationsControllerValue
    );
    expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.messagesNotificationsControllerValue
    );
    expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS now has value = "1" (enabled)
    const settingsState = await SettingsNotificationsScreen.getToggleState(
      await SettingsNotificationsScreen.settingsNotificationsControllerValue
    );
    expect(settingsState).toEqual("1");
  });
});

import "module-alias/register";
import SettingsAccessibilityScreen from "@screenobjects/settings/SettingsAccessibilityScreen";
import SettingsNotificationsScreen from "@screenobjects/settings/SettingsNotificationsScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let settingsAccessibilityFirstUser = new SettingsAccessibilityScreen(
  USER_A_INSTANCE
);
let settingsNotificationsFirstUser = new SettingsNotificationsScreen(
  USER_A_INSTANCE
);

export default async function settingsNotifications() {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsAccessibilityFirstUser.goToNotificationsSettings();
    await settingsNotificationsFirstUser.waitForIsShown(true);
  });

  it("Settings Notifications - Validate header and description texts are correct", async () => {
    // Start validations
    await expect(
      settingsNotificationsFirstUser.enabledNotificationsHeader
    ).toHaveTextContaining("ENABLED");
    await expect(
      settingsNotificationsFirstUser.enabledNotificationsDescription
    ).toHaveTextContaining(
      "Enable notifications for incoming calls, messages, and more."
    );
    await expect(
      settingsNotificationsFirstUser.friendsNotificationsHeader
    ).toHaveTextContaining("FRIENDS");
    await expect(
      settingsNotificationsFirstUser.friendsNotificationsDescription
    ).toHaveTextContaining("Enable notifications for friend requests.");
    await expect(
      settingsNotificationsFirstUser.messagesNotificationsHeader
    ).toHaveTextContaining("MESSAGES");
    await expect(
      settingsNotificationsFirstUser.messagesNotificationsDescription
    ).toHaveTextContaining("Enable notifications for new messages.");
    await expect(
      settingsNotificationsFirstUser.settingsNotificationsHeader
    ).toHaveTextContaining("SETTINGS");
    await expect(
      settingsNotificationsFirstUser.settingsNotificationsDescription
    ).toHaveText("Enable notifications for updates and important alerts.");
  });

  it("Settings Notifications - Disable all notifications by switching ENABLED toggle to off", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "0" (disabled)
    await settingsNotificationsFirstUser.clickOnEnabledNotifications();
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState = await settingsNotificationsFirstUser.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("0");

    // Validate that toggle switch for FRIENDS has now value = "0" (disabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState = await settingsNotificationsFirstUser.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = "0" (disabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState = await settingsNotificationsFirstUser.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS has now value = "0" (disabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState = await settingsNotificationsFirstUser.getToggleState(
      settingsToggle
    );
    await expect(settingsState).toEqual("0");
  });

  it("Settings Notifications - Enable again all notifications by switching ENABLED toggle to on", async () => {
    // Click on ENABLED switch slider to activate toggles and then validate that toggle has now value = "1" (enabled)
    await settingsNotificationsFirstUser.clickOnEnabledNotifications();
    const enabledToggle =
      await settingsNotificationsFirstUser.enabledNotificationsControllerValue;
    const enabledState = await settingsNotificationsFirstUser.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = "1" (enabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState = await settingsNotificationsFirstUser.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES has now value = "1" (enabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState = await settingsNotificationsFirstUser.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS has now value = "1" (enabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState = await settingsNotificationsFirstUser.getToggleState(
      settingsToggle
    );
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
    const enabledState = await settingsNotificationsFirstUser.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS has now value = 1" (enabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState = await settingsNotificationsFirstUser.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("1");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState = await settingsNotificationsFirstUser.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState = await settingsNotificationsFirstUser.getToggleState(
      settingsToggle
    );
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
    const enabledState = await settingsNotificationsFirstUser.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS now has value = "0" (disabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState = await settingsNotificationsFirstUser.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES has now value = 1" (enabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState = await settingsNotificationsFirstUser.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("1");

    // Validate that toggle switch for SETTINGS still has value = "0" (disabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState = await settingsNotificationsFirstUser.getToggleState(
      settingsToggle
    );
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
    const enabledState = await settingsNotificationsFirstUser.getToggleState(
      enabledToggle
    );
    await expect(enabledState).toEqual("1");

    // Validate that toggle switch for FRIENDS still has value = "0" (disabled)
    const friendsToggle =
      await settingsNotificationsFirstUser.friendsNotificationsControllerValue;
    const friendsState = await settingsNotificationsFirstUser.getToggleState(
      friendsToggle
    );
    await expect(friendsState).toEqual("0");

    // Validate that toggle switch for MESSAGES still has value = "0" (disabled)
    const messagesToggle =
      await settingsNotificationsFirstUser.messagesNotificationsControllerValue;
    const messagesState = await settingsNotificationsFirstUser.getToggleState(
      messagesToggle
    );
    await expect(messagesState).toEqual("0");

    // Validate that toggle switch for SETTINGS now has value = "1" (enabled)
    const settingsToggle =
      await settingsNotificationsFirstUser.settingsNotificationsControllerValue;
    const settingsState = await settingsNotificationsFirstUser.getToggleState(
      settingsToggle
    );
    await expect(settingsState).toEqual("1");
  });
}

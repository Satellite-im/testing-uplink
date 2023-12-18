require("module-alias/register");
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsMessagesScreen from "@screenobjects/settings/SettingsMessagesScreen";
const settingsGeneralFirstUser = new SettingsGeneralScreen();
const settingsMessagesFirstUser = new SettingsMessagesScreen();

export default async function settingsMessages() {
  it("Settings Messages - Go To Messages Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsGeneralFirstUser.goToMessagesSettings();
    await settingsMessagesFirstUser.waitForIsShown(true);
  });

  it("Settings Messages - Validate header and description texts are correct", async () => {
    // Validate convert emoji texts
    const convertEmojiHeader =
      await settingsMessagesFirstUser.convertEmojiHeader;
    const convertEmojiDescription =
      await settingsMessagesFirstUser.convertEmojiDescription;
    await expect(convertEmojiHeader).toHaveTextContaining("CONVERT EMOJI");
    await expect(convertEmojiDescription).toHaveTextContaining(
      "Convert Emoji text like ':)' into an emoji symbol like '😊'.",
    );

    // Validate Markdown Support texts
    const markdownSupportHeader =
      await settingsMessagesFirstUser.markdownSupportHeader;
    const markdownSupportDescription =
      await settingsMessagesFirstUser.markdownSupportDescription;
    await expect(markdownSupportHeader).toHaveTextContaining(
      "MARKDOWN SUPPORT",
    );
    await expect(markdownSupportDescription).toHaveTextContaining(
      "Enables the support of the Markdown markup language in messaging.",
    );
  });

  it("Settings Messages - Disable both convert emoji and markdown support toggles", async () => {
    // Click on switch slider for Convert Emoji to disable option and then validate that toggle has now value = "0" (disabled)
    await settingsMessagesFirstUser.clickOnConvertEmoji();
    const convertEmojiToggle =
      await settingsMessagesFirstUser.convertEmojiControllerValue;
    const convertEmojiState =
      await settingsMessagesFirstUser.getToggleState(convertEmojiToggle);
    await expect(convertEmojiState).toEqual("0");

    // Click on switch slider for Markdown Support to disable option and then validate that toggle has now value = "0" (disabled)
    await settingsMessagesFirstUser.clickOnMarkdownSupport();
    const markdownSupportToggle =
      await settingsMessagesFirstUser.markdownSupportControllerValue;
    const markdownSupportState = await settingsMessagesFirstUser.getToggleState(
      markdownSupportToggle,
    );
    await expect(markdownSupportState).toEqual("0");
  });

  it("Settings Messages - Enable again both convert emoji and markdown support toggles", async () => {
    // Click on switch slider for Convert Emoji to enable option and then validate that toggle has now value = "1" (enabled)
    await settingsMessagesFirstUser.clickOnConvertEmoji();
    const convertEmojiToggle =
      await settingsMessagesFirstUser.convertEmojiControllerValue;
    const convertEmojiState =
      await settingsMessagesFirstUser.getToggleState(convertEmojiToggle);
    await expect(convertEmojiState).toEqual("1");

    // Click on switch slider for Markdown Support to enable option and then validate that toggle has now value = "1" (enabled)
    await settingsMessagesFirstUser.clickOnMarkdownSupport();
    const markdownSupportToggle =
      await settingsMessagesFirstUser.markdownSupportControllerValue;
    const markdownSupportState = await settingsMessagesFirstUser.getToggleState(
      markdownSupportToggle,
    );
    await expect(markdownSupportState).toEqual("1");
  });
}

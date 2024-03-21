require("module-alias/register");
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import SettingsMessagesScreen from "@screenobjects/settings/SettingsMessagesScreen";

export default async function settingsMessagesTests() {
  it("Settings Messages - Go To Messages Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsGeneralScreen.goToMessagesSettings();
    await SettingsMessagesScreen.waitForIsShown(true);
  });

  it("Settings Messages - Validate header and description texts are correct", async () => {
    // Validate convert emoji texts
    const convertEmojiHeader = await SettingsMessagesScreen.convertEmojiHeader;
    const convertEmojiDescription =
      await SettingsMessagesScreen.convertEmojiDescription;
    await expect(convertEmojiHeader).toHaveTextContaining("CONVERT EMOJI");
    await expect(convertEmojiDescription).toHaveTextContaining(
      "Convert Emoji text like ':)' into an emoji symbol like '😊'.",
    );

    // Validate Markdown Support texts
    const markdownSupportHeader =
      await SettingsMessagesScreen.markdownSupportHeader;
    const markdownSupportDescription =
      await SettingsMessagesScreen.markdownSupportDescription;
    await expect(markdownSupportHeader).toHaveTextContaining(
      "MARKDOWN SUPPORT",
    );
    await expect(markdownSupportDescription).toHaveTextContaining(
      "Enables the support of the Markdown markup language in messaging.",
    );
  });

  it("Settings Messages - Disable both convert emoji and markdown support toggles", async () => {
    // Click on switch slider for Convert Emoji to disable option and then validate that toggle has now value = "0" (disabled)
    await SettingsMessagesScreen.clickOnConvertEmoji();
    await SettingsMessagesScreen.validateConvertEmojiIsDisabled();

    // Click on switch slider for Markdown Support to disable option and then validate that toggle has now value = "0" (disabled)
    await SettingsMessagesScreen.clickOnMarkdownSupport();
    await SettingsMessagesScreen.validateMarkdownSupportIsDisabled();
  });

  it("Settings Messages - Enable again both convert emoji and markdown support toggles", async () => {
    // Click on switch slider for Convert Emoji to enable option and then validate that toggle has now value = "1" (enabled)
    await SettingsMessagesScreen.clickOnConvertEmoji();
    await SettingsMessagesScreen.validateConvertEmojiIsEnabled();

    // Click on switch slider for Markdown Support to enable option and then validate that toggle has now value = "1" (enabled)
    await SettingsMessagesScreen.clickOnMarkdownSupport();
    await SettingsMessagesScreen.validateMarkdownSupportIsEnabled();
  });
}

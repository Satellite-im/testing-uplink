import WelcomeScreen from "../screenobjects/WelcomeScreen";
import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsAudioScreen from "../screenobjects/SettingsAudioScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Audio - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);
    await SettingsGeneralScreen.goToAudioSettings();
    await SettingsAudioScreen.waitForIsShown(true);
  });

  it("Settings Audio - Assert screen texts", async () => {
    await expect(
      await SettingsAudioScreen.callTimerHeader
    ).toHaveTextContaining("CALL TIMER");
    await expect(
      await SettingsAudioScreen.callTimerDescription
    ).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration."
    );
  });

  it("Settings Audio - Call Audio switch to enabled", async () => {
    // Click on Call Timer switch to enable it
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that toggle switch has now value = '1' (active)
    await expect(
      await SettingsAudioScreen.callTimerControllerValue
    ).toHaveAttrContaining("value", "1");
  });

  it("Settings Audio - Call Audio  switch to disabled", async () => {
    // Click again on Call Timer switch to disable this option
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that toggle switch has now value = '0' (disabled)
    await expect(
      await SettingsAudioScreen.callTimerControllerValue
    ).toHaveAttrContaining("value", "0");
  });
});

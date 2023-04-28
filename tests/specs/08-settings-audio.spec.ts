import SettingsAudioScreen from "../screenobjects/SettingsAudioScreen";
import SettingsPrivacyScreen from "../screenobjects/SettingsPrivacyScreen";

export default async function settingsAudio() {
  it("Settings Audio - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsPrivacyScreen.goToAudioSettings();
    await SettingsAudioScreen.waitForIsShown(true);

    // Validate texts for Interface Sounds Settings Section
    await expect(
      SettingsAudioScreen.interfaceSoundsHeader
    ).toHaveTextContaining("INTERFACE SOUNDS");
    await expect(
      SettingsAudioScreen.interfaceSoundsDescription
    ).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app."
    );

    // Validate texts for Media Sounds Settings Section
    await expect(SettingsAudioScreen.mediaSoundsHeader).toHaveTextContaining(
      "MEDIA SOUNDS"
    );
    await expect(
      SettingsAudioScreen.mediaSoundsDescription
    ).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds."
    );

    // Validate texts for Message Sounds Settings Section
    await expect(SettingsAudioScreen.messageSoundsHeader).toHaveTextContaining(
      "MESSAGE SOUNDS"
    );
    await expect(
      SettingsAudioScreen.messageSoundsDescription
    ).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received."
    );

    // Validate texts for Call Timer Settings Section
    await expect(SettingsAudioScreen.callTimerHeader).toHaveTextContaining(
      "CALL TIMER"
    );
    await expect(SettingsAudioScreen.callTimerDescription).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration."
    );
  });

  it("Settings Audio - Disable switches enabled by default", async () => {
    // Since Media Sounds and Message Sounds are enabled by default, first we need to click on these checkboxes before starting the test
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
  });

  it("Settings Audio - Click on slider switches to enable the options", async () => {
    // Click on the four switch sliders from the Settings Sounds & Audio Screen
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that all toggles have now value = "1" (enabled)
    const toggleElementInterface =
      await SettingsAudioScreen.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await SettingsAudioScreen.getToggleState(
      toggleElementInterface
    );

    const toggleElementMedia =
      await SettingsAudioScreen.mediaSoundsControllerValue;
    const mediaSoundsStatus = await SettingsAudioScreen.getToggleState(
      toggleElementMedia
    );

    const toggleElementMessage =
      await SettingsAudioScreen.messageSoundsControllerValue;
    const messageSoundsStatus = await SettingsAudioScreen.getToggleState(
      toggleElementMessage
    );

    const toggleElementCallTimer =
      await SettingsAudioScreen.callTimerControllerValue;
    const callTimerStatus = await SettingsAudioScreen.getToggleState(
      toggleElementCallTimer
    );

    await expect(interfaceSoundsStatus).toEqual("1");
    await expect(mediaSoundsStatus).toEqual("1");
    await expect(messageSoundsStatus).toEqual("1");
    await expect(callTimerStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the four switch sliders from the Settings Sounds & Audio Screen
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that all toggles have now value = "0" (disabled)
    const toggleElementInterface =
      await SettingsAudioScreen.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await SettingsAudioScreen.getToggleState(
      toggleElementInterface
    );

    const toggleElementMedia =
      await SettingsAudioScreen.mediaSoundsControllerValue;
    const mediaSoundsStatus = await SettingsAudioScreen.getToggleState(
      toggleElementMedia
    );

    const toggleElementMessage =
      await SettingsAudioScreen.messageSoundsControllerValue;
    const messageSoundsStatus = await SettingsAudioScreen.getToggleState(
      toggleElementMessage
    );

    const toggleElementCallTimer =
      await SettingsAudioScreen.callTimerControllerValue;
    const callTimerStatus = await SettingsAudioScreen.getToggleState(
      toggleElementCallTimer
    );

    await expect(interfaceSoundsStatus).toEqual("0");
    await expect(mediaSoundsStatus).toEqual("0");
    await expect(messageSoundsStatus).toEqual("0");
    await expect(callTimerStatus).toEqual("0");
  });
}

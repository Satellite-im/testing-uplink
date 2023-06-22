import SettingsAudioScreen from "../screenobjects/settings/SettingsAudioScreen";
import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
let settingsAudioFirstUser = new SettingsAudioScreen("userA");
let settingsGeneralFirstUser = new SettingsGeneralScreen("userA");

export default async function settingsAudio() {
  it("Settings Audio - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsGeneralFirstUser.goToAudioSettings();
    await settingsAudioFirstUser.waitForIsShown(true);

    // Validate texts for Interface Sounds Settings Section
    await expect(
      settingsAudioFirstUser.interfaceSoundsHeader
    ).toHaveTextContaining("INTERFACE SOUNDS");
    await expect(
      settingsAudioFirstUser.interfaceSoundsDescription
    ).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app."
    );

    // Validate texts for Media Sounds Settings Section
    await expect(settingsAudioFirstUser.mediaSoundsHeader).toHaveTextContaining(
      "MEDIA SOUNDS"
    );
    await expect(
      settingsAudioFirstUser.mediaSoundsDescription
    ).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds."
    );

    // Validate texts for Message Sounds Settings Section
    await expect(
      settingsAudioFirstUser.messageSoundsHeader
    ).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(
      settingsAudioFirstUser.messageSoundsDescription
    ).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received."
    );

    // Validate texts for Call Timer Settings Section
    await expect(settingsAudioFirstUser.callTimerHeader).toHaveTextContaining(
      "CALL TIMER"
    );
    await expect(
      settingsAudioFirstUser.callTimerDescription
    ).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration."
    );
  });

  it("Settings Audio - Disable switches enabled by default", async () => {
    // Since Media Sounds and Message Sounds are enabled by default, first we need to click on these checkboxes before starting the test
    await settingsAudioFirstUser.clickOnMediaSounds();
    await settingsAudioFirstUser.clickOnMessageSounds();
  });

  it("Settings Audio - Click on slider switches to enable the options", async () => {
    // Click on the four switch sliders from the Settings Sounds & Audio Screen
    await settingsAudioFirstUser.clickOnInterfaceSounds();
    await settingsAudioFirstUser.clickOnMediaSounds();
    await settingsAudioFirstUser.clickOnMessageSounds();
    await settingsAudioFirstUser.clickOnCallTimer();

    // Validate that all toggles have now value = "1" (enabled)
    const toggleElementInterface =
      await settingsAudioFirstUser.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementInterface
    );

    const toggleElementMedia =
      await settingsAudioFirstUser.mediaSoundsControllerValue;
    const mediaSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementMedia
    );

    const toggleElementMessage =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const messageSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementMessage
    );

    const toggleElementCallTimer =
      await settingsAudioFirstUser.callTimerControllerValue;
    const callTimerStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementCallTimer
    );

    await expect(interfaceSoundsStatus).toEqual("1");
    await expect(mediaSoundsStatus).toEqual("1");
    await expect(messageSoundsStatus).toEqual("1");
    await expect(callTimerStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the four switch sliders from the Settings Sounds & Audio Screen
    await settingsAudioFirstUser.clickOnInterfaceSounds();
    await settingsAudioFirstUser.clickOnMediaSounds();
    await settingsAudioFirstUser.clickOnMessageSounds();
    await settingsAudioFirstUser.clickOnCallTimer();

    // Validate that all toggles have now value = "0" (disabled)
    const toggleElementInterface =
      await settingsAudioFirstUser.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementInterface
    );

    const toggleElementMedia =
      await settingsAudioFirstUser.mediaSoundsControllerValue;
    const mediaSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementMedia
    );

    const toggleElementMessage =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const messageSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementMessage
    );

    const toggleElementCallTimer =
      await settingsAudioFirstUser.callTimerControllerValue;
    const callTimerStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementCallTimer
    );

    await expect(interfaceSoundsStatus).toEqual("0");
    await expect(mediaSoundsStatus).toEqual("0");
    await expect(messageSoundsStatus).toEqual("0");
    await expect(callTimerStatus).toEqual("0");
  });
}

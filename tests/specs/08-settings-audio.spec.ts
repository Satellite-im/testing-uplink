import SettingsAudioScreen from "../screenobjects/SettingsAudioScreen";
import SettingsPrivacyScreen from "../screenobjects/SettingsPrivacyScreen";

describe("Settings - Audio - Tests", async () => {
  it("Settings Audio - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsPrivacyScreen.goToAudioSettings();
    await SettingsAudioScreen.waitForIsShown(true);

    // Validate texts for Interface Sounds Settings Section
    await expect(
      await SettingsAudioScreen.interfaceSoundsHeader
    ).toHaveTextContaining("INTERFACE SOUNDS");
    await expect(
      await SettingsAudioScreen.interfaceSoundsDescription
    ).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app."
    );

    // Validate texts for Media Sounds Settings Section
    await expect(
      await SettingsAudioScreen.mediaSoundsHeader
    ).toHaveTextContaining("MEDIA SOUNDS");
    await expect(
      await SettingsAudioScreen.mediaSoundsDescription
    ).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds."
    );

    // Validate texts for Message Sounds Settings Section
    await expect(
      await SettingsAudioScreen.messageSoundsHeader
    ).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(
      await SettingsAudioScreen.messageSoundsDescription
    ).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received."
    );

    // Validate texts for Call Timer Settings Section
    await expect(
      await SettingsAudioScreen.callTimerHeader
    ).toHaveTextContaining("CALL TIMER");
    await expect(
      await SettingsAudioScreen.callTimerDescription
    ).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration."
    );
  });

  it("Settings Audio - Click on slider switches to enable the options", async () => {
    // Since Media Sounds and Message Sounds are enabled by default, first we need to click on these checkboxes before starting the test
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();

    // Click on the four switch sliders from the Settings Sounds & Audio Screen
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that all toggles have now value = "1" (enabled)
    const interfaceSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.interfaceSoundsControllerValue
    );
    const mediaSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.mediaSoundsControllerValue
    );
    const messageSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.messageSoundsControllerValue
    );
    const callTimerStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.callTimerControllerValue
    );

    expect(interfaceSoundsStatus).toEqual("1");
    expect(mediaSoundsStatus).toEqual("1");
    expect(messageSoundsStatus).toEqual("1");
    expect(callTimerStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the four switch sliders from the Settings Sounds & Audio Screen
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that all toggles have now value = "0" (disabled)
    const interfaceSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.interfaceSoundsControllerValue
    );
    const mediaSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.mediaSoundsControllerValue
    );
    const messageSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.messageSoundsControllerValue
    );
    const callTimerStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.callTimerControllerValue
    );

    expect(interfaceSoundsStatus).toEqual("0");
    expect(mediaSoundsStatus).toEqual("0");
    expect(messageSoundsStatus).toEqual("0");
    expect(callTimerStatus).toEqual("0");
  });
});

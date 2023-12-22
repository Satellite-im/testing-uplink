require("module-alias/register");
import SettingsAudioScreen from "@screenobjects/settings/SettingsAudioScreen";
import SettingsMessagesScreen from "@screenobjects/settings/SettingsMessagesScreen";
const settingsAudio = new SettingsAudioScreen();
const settingsMessages = new SettingsMessagesScreen();

export default async function settingsAudioTests() {
  it("Settings Audio - Assert screen texts for input/output device and sample rate selection", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsMessages.goToAudioSettings();
    await settingsAudio.waitForIsShown(true);

    // Validate texts for Input Device Selection
    const inputDeviceHeader = await settingsAudio.inputDeviceHeader;
    const inputDeviceDescription = await settingsAudio.inputDeviceDescription;
    await expect(inputDeviceHeader).toHaveTextContaining("INPUT DEVICE");
    await expect(inputDeviceDescription).toHaveTextContaining(
      "Select your input device (microphone, usually).",
    );

    // Validate texts for Output Device Selection
    const outputDeviceHeader = await settingsAudio.outputDeviceHeader;
    const outputDeviceDescription = await settingsAudio.outputDeviceDescription;
    await expect(outputDeviceHeader).toHaveTextContaining("OUTPUT DEVICE");
    await expect(outputDeviceDescription).toHaveTextContaining(
      "This is where all sounds will be played. (Usually your headphones).",
    );
  });

  it("Settings Audio - Assert screen texts for Echo Cancellation and Interface Sounds", async () => {
    // Validate texts for Echo Cancellation Settings Section
    const echoCancellationHeader = await settingsAudio.echoCancellationHeader;
    const echoCancellationDescription =
      await settingsAudio.echoCancellationDescription;
    await expect(echoCancellationHeader).toHaveTextContaining(
      "ECHO CANCELLATION",
    );
    await expect(echoCancellationDescription).toHaveTextContaining(
      "Helps to minimize feedback from speakers into your microphone.",
    );

    // Validate texts for Interface Sounds Settings Section
    const interfaceSoundsHeader = await settingsAudio.interfaceSoundsHeader;
    const interfaceSoundsDescription =
      await settingsAudio.interfaceSoundsDescription;
    await expect(interfaceSoundsHeader).toHaveTextContaining(
      "INTERFACE SOUNDS",
    );
    await expect(interfaceSoundsDescription).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app.",
    );
  });

  it("Settings Audio - Assert screen texts for Media-Message Sounds and Call Timer", async () => {
    // Validate texts for Media Sounds Settings Section
    const mediaSoundsHeader = await settingsAudio.mediaSoundsHeader;
    const mediaSoundsDescription = await settingsAudio.mediaSoundsDescription;
    await expect(mediaSoundsHeader).toHaveTextContaining("MEDIA SOUNDS");
    await expect(mediaSoundsDescription).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds.",
    );

    // Validate texts for Message Sounds Settings Section
    const messageSoundsHeader = await settingsAudio.messageSoundsHeader;
    const messageSoundsDescription =
      await settingsAudio.messageSoundsDescription;
    await expect(messageSoundsHeader).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(messageSoundsDescription).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received.",
    );

    // Validate texts for Call Timer Settings Section
    const callTimerHeader = await settingsAudio.callTimerHeader;
    const callTimerDescription = await settingsAudio.callTimerDescription;
    await expect(callTimerHeader).toHaveTextContaining("CALL TIMER");
    await expect(callTimerDescription).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration.",
    );
  });

  it("Settings Audio - Disable switches enabled by default", async () => {
    // Since Echo Cancellation, Media Sounds and Message Sounds are enabled by default, first we need to click on these checkboxes before starting the test
    await settingsAudio.clickOnEchoCancellation();
    await settingsAudio.clickOnMediaSounds();
    await settingsAudio.clickOnMessageSounds();
  });

  it("Settings Audio - Click on slider switches to enable the options", async () => {
    // Click on the five switch sliders from the Settings Sounds & Audio Screen
    await settingsAudio.clickOnEchoCancellation();
    await settingsAudio.clickOnInterfaceSounds();
    await settingsAudio.clickOnMediaSounds();
    await settingsAudio.clickOnMessageSounds();
    await settingsAudio.clickOnCallTimer();

    // Validate that all toggles have now value = "1" (enabled)
    const toggleElementEcho = await settingsAudio.messageSoundsControllerValue;
    const echoCancellationStatus =
      await settingsAudio.getToggleState(toggleElementEcho);

    const toggleElementInterface =
      await settingsAudio.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await settingsAudio.getToggleState(
      toggleElementInterface,
    );

    const toggleElementMedia = await settingsAudio.mediaSoundsControllerValue;
    const mediaSoundsStatus =
      await settingsAudio.getToggleState(toggleElementMedia);

    const toggleElementMessage =
      await settingsAudio.messageSoundsControllerValue;
    const messageSoundsStatus =
      await settingsAudio.getToggleState(toggleElementMessage);

    const toggleElementTimer = await settingsAudio.messageSoundsControllerValue;
    const callTimerStatus =
      await settingsAudio.getToggleState(toggleElementTimer);

    await expect(echoCancellationStatus).toEqual("1");
    await expect(interfaceSoundsStatus).toEqual("1");
    await expect(mediaSoundsStatus).toEqual("1");
    await expect(messageSoundsStatus).toEqual("1");
    await expect(callTimerStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the four switch sliders from the Settings Sounds & Audio Screen
    await settingsAudio.clickOnEchoCancellation();
    await settingsAudio.clickOnInterfaceSounds();
    await settingsAudio.clickOnMediaSounds();
    await settingsAudio.clickOnMessageSounds();
    await settingsAudio.clickOnCallTimer();

    // Validate that all toggles have now value = "0" (disabled)
    const toggleElementEcho = await settingsAudio.messageSoundsControllerValue;
    const echoCancellationStatus =
      await settingsAudio.getToggleState(toggleElementEcho);

    const toggleElementInterface =
      await settingsAudio.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await settingsAudio.getToggleState(
      toggleElementInterface,
    );

    const toggleElementMedia = await settingsAudio.mediaSoundsControllerValue;
    const mediaSoundsStatus =
      await settingsAudio.getToggleState(toggleElementMedia);

    const toggleElementMessage =
      await settingsAudio.messageSoundsControllerValue;
    const messageSoundsStatus =
      await settingsAudio.getToggleState(toggleElementMessage);

    const toggleElementTimer = await settingsAudio.messageSoundsControllerValue;
    const callTimerStatus =
      await settingsAudio.getToggleState(toggleElementTimer);

    await expect(echoCancellationStatus).toEqual("0");
    await expect(interfaceSoundsStatus).toEqual("0");
    await expect(mediaSoundsStatus).toEqual("0");
    await expect(messageSoundsStatus).toEqual("0");
    await expect(callTimerStatus).toEqual("0");
  });
}

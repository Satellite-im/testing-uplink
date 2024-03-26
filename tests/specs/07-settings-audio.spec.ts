require("module-alias/register");
import SettingsAudioScreen from "@screenobjects/settings/SettingsAudioScreen";
import SettingsMessagesScreen from "@screenobjects/settings/SettingsMessagesScreen";

export default async function settingsAudioTests() {
  it("Settings Audio - Assert screen texts for input/output device and sample rate selection", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsMessagesScreen.goToAudioSettings();
    await SettingsAudioScreen.waitForIsShown(true);

    // Validate texts for Input Device Selection
    const inputDeviceHeader = await SettingsAudioScreen.inputDeviceHeader;
    const inputDeviceDescription =
      await SettingsAudioScreen.inputDeviceDescription;
    await expect(inputDeviceHeader).toHaveTextContaining("INPUT DEVICE");
    await expect(inputDeviceDescription).toHaveTextContaining(
      "Select your input device (microphone, usually).",
    );

    // Validate texts for Output Device Selection
    const outputDeviceHeader = await SettingsAudioScreen.outputDeviceHeader;
    const outputDeviceDescription =
      await SettingsAudioScreen.outputDeviceDescription;
    await expect(outputDeviceHeader).toHaveTextContaining("OUTPUT DEVICE");
    await expect(outputDeviceDescription).toHaveTextContaining(
      "This is where all sounds will be played. (Usually your headphones).",
    );
  });

  it("Settings Audio - Assert screen texts for Echo Cancellation and Interface Sounds", async () => {
    // Validate texts for Echo Cancellation Settings Section
    const echoCancellationHeader =
      await SettingsAudioScreen.echoCancellationHeader;
    const echoCancellationDescription =
      await SettingsAudioScreen.echoCancellationDescription;
    await expect(echoCancellationHeader).toHaveTextContaining(
      "ECHO CANCELLATION",
    );
    await expect(echoCancellationDescription).toHaveTextContaining(
      "Helps to minimize feedback from speakers into your microphone.",
    );

    // Validate texts for Interface Sounds Settings Section
    const interfaceSoundsHeader =
      await SettingsAudioScreen.interfaceSoundsHeader;
    const interfaceSoundsDescription =
      await SettingsAudioScreen.interfaceSoundsDescription;
    await expect(interfaceSoundsHeader).toHaveTextContaining(
      "INTERFACE SOUNDS",
    );
    await expect(interfaceSoundsDescription).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app.",
    );
  });

  it("Settings Audio - Assert screen texts for Media-Message Sounds and Call Timer", async () => {
    // Validate texts for Media Sounds Settings Section
    const mediaSoundsHeader = await SettingsAudioScreen.mediaSoundsHeader;
    const mediaSoundsDescription =
      await SettingsAudioScreen.mediaSoundsDescription;
    await expect(mediaSoundsHeader).toHaveTextContaining("MEDIA SOUNDS");
    await expect(mediaSoundsDescription).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds.",
    );

    // Validate texts for Message Sounds Settings Section
    const messageSoundsHeader = await SettingsAudioScreen.messageSoundsHeader;
    const messageSoundsDescription =
      await SettingsAudioScreen.messageSoundsDescription;
    await expect(messageSoundsHeader).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(messageSoundsDescription).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received.",
    );

    // Validate texts for Call Timer Settings Section
    const callTimerHeader = await SettingsAudioScreen.callTimerHeader;
    const callTimerDescription = await SettingsAudioScreen.callTimerDescription;
    await expect(callTimerHeader).toHaveTextContaining("CALL TIMER");
    await expect(callTimerDescription).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration.",
    );
  });

  it("Settings Audio - Disable switches enabled by default", async () => {
    // Since Echo Cancellation, Media Sounds and Message Sounds are enabled by default, first we need to click on these checkboxes before starting the test
    await SettingsAudioScreen.clickOnEchoCancellation();
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.clickOnCallTimer();
  });

  it("Settings Audio - Click on slider switches to enable the options", async () => {
    // Click on the switch slider from Settings Sounds & Audio Screen - Echo Cancellation
    await SettingsAudioScreen.clickOnEchoCancellation();
    await SettingsAudioScreen.validateEchoCancellationIsEnabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Interface Sounds
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.validateInterfaceSoundsIsEnabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Media Sounds
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.validateMediaSoundsIsEnabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Message Sounds
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.validateMessageSoundsIsEnabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Call Timer
    await SettingsAudioScreen.clickOnCallTimer();
    await SettingsAudioScreen.validateCallTimerIsEnabled();
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click on the switch slider from Settings Sounds & Audio Screen - Echo Cancellation
    await SettingsAudioScreen.clickOnEchoCancellation();
    await SettingsAudioScreen.validateEchoCancellationIsDisabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Interface Sounds
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.validateInterfaceSoundsIsDisabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Media Sounds
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.validateMediaSoundsIsDisabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Message Sounds
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.validateMessageSoundsIsDisabled();

    // Click on the switch slider from Settings Sounds & Audio Screen - Call Timer
    await SettingsAudioScreen.clickOnCallTimer();
    await SettingsAudioScreen.validateCallTimerIsDisabled();
  });
}

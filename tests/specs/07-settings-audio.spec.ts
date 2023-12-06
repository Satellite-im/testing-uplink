require("module-alias/register");
import SettingsAudioScreen from "@screenobjects/settings/SettingsAudioScreen";
import SettingsMessagesScreen from "@screenobjects/settings/SettingsMessagesScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let settingsAudioFirstUser = new SettingsAudioScreen(USER_A_INSTANCE);
let settingsMessagesFirstUser = new SettingsMessagesScreen(USER_A_INSTANCE);

export default async function settingsAudio() {
  it("Settings Audio - Assert screen texts for input/output device and sample rate selection", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsMessagesFirstUser.goToAudioSettings();
    await settingsAudioFirstUser.waitForIsShown(true);

    // Validate texts for Input Device Selection
    const inputDeviceHeader = await settingsAudioFirstUser.inputDeviceHeader;
    const inputDeviceDescription =
      await settingsAudioFirstUser.inputDeviceDescription;
    await expect(inputDeviceHeader).toHaveTextContaining("INPUT DEVICE");
    await expect(inputDeviceDescription).toHaveTextContaining(
      "Select your input device (microphone, usually).",
    );

    // Validate texts for Output Device Selection
    const outputDeviceHeader = await settingsAudioFirstUser.outputDeviceHeader;
    const outputDeviceDescription =
      await settingsAudioFirstUser.outputDeviceDescription;
    await expect(outputDeviceHeader).toHaveTextContaining("OUTPUT DEVICE");
    await expect(outputDeviceDescription).toHaveTextContaining(
      "This is where all sounds will be played. (Usually your headphones).",
    );
  });

  it("Settings Audio - Assert screen texts for Echo Cancellation and Interface Sounds", async () => {
    // Validate texts for Echo Cancellation Settings Section
    const echoCancellationHeader =
      await settingsAudioFirstUser.echoCancellationHeader;
    const echoCancellationDescription =
      await settingsAudioFirstUser.echoCancellationDescription;
    await expect(echoCancellationHeader).toHaveTextContaining(
      "ECHO CANCELLATION",
    );
    await expect(echoCancellationDescription).toHaveTextContaining(
      "Helps to minimize feedback from speakers into your microphone.",
    );

    // Validate texts for Interface Sounds Settings Section
    const interfaceSoundsHeader =
      await settingsAudioFirstUser.interfaceSoundsHeader;
    const interfaceSoundsDescription =
      await settingsAudioFirstUser.interfaceSoundsDescription;
    await expect(interfaceSoundsHeader).toHaveTextContaining(
      "INTERFACE SOUNDS",
    );
    await expect(interfaceSoundsDescription).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app.",
    );
  });

  it("Settings Audio - Assert screen texts for Media-Message Sounds and Call Timer", async () => {
    // Validate texts for Media Sounds Settings Section
    const mediaSoundsHeader = await settingsAudioFirstUser.mediaSoundsHeader;
    const mediaSoundsDescription =
      await settingsAudioFirstUser.mediaSoundsDescription;
    await expect(mediaSoundsHeader).toHaveTextContaining("MEDIA SOUNDS");
    await expect(mediaSoundsDescription).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds.",
    );

    // Validate texts for Message Sounds Settings Section
    const messageSoundsHeader =
      await settingsAudioFirstUser.messageSoundsHeader;
    const messageSoundsDescription =
      await settingsAudioFirstUser.messageSoundsDescription;
    await expect(messageSoundsHeader).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(messageSoundsDescription).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received.",
    );

    // Validate texts for Call Timer Settings Section
    const callTimerHeader = await settingsAudioFirstUser.callTimerHeader;
    const callTimerDescription =
      await settingsAudioFirstUser.callTimerDescription;
    await expect(callTimerHeader).toHaveTextContaining("CALL TIMER");
    await expect(callTimerDescription).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration.",
    );
  });

  it("Settings Audio - Disable switches enabled by default", async () => {
    // Since Echo Cancellation, Media Sounds and Message Sounds are enabled by default, first we need to click on these checkboxes before starting the test
    await settingsAudioFirstUser.clickOnEchoCancellation();
    await settingsAudioFirstUser.clickOnMediaSounds();
    await settingsAudioFirstUser.clickOnMessageSounds();
  });

  it("Settings Audio - Click on slider switches to enable the options", async () => {
    // Click on the five switch sliders from the Settings Sounds & Audio Screen
    await settingsAudioFirstUser.clickOnEchoCancellation();
    await settingsAudioFirstUser.clickOnInterfaceSounds();
    await settingsAudioFirstUser.clickOnMediaSounds();
    await settingsAudioFirstUser.clickOnMessageSounds();
    await settingsAudioFirstUser.clickOnCallTimer();

    // Validate that all toggles have now value = "1" (enabled)
    const toggleElementEcho =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const echoCancellationStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementEcho);

    const toggleElementInterface =
      await settingsAudioFirstUser.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementInterface,
    );

    const toggleElementMedia =
      await settingsAudioFirstUser.mediaSoundsControllerValue;
    const mediaSoundsStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementMedia);

    const toggleElementMessage =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const messageSoundsStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementMessage);

    const toggleElementTimer =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const callTimerStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementTimer);

    await expect(echoCancellationStatus).toEqual("1");
    await expect(interfaceSoundsStatus).toEqual("1");
    await expect(mediaSoundsStatus).toEqual("1");
    await expect(messageSoundsStatus).toEqual("1");
    await expect(callTimerStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the four switch sliders from the Settings Sounds & Audio Screen
    await settingsAudioFirstUser.clickOnEchoCancellation();
    await settingsAudioFirstUser.clickOnInterfaceSounds();
    await settingsAudioFirstUser.clickOnMediaSounds();
    await settingsAudioFirstUser.clickOnMessageSounds();
    await settingsAudioFirstUser.clickOnCallTimer();

    // Validate that all toggles have now value = "0" (disabled)
    const toggleElementEcho =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const echoCancellationStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementEcho);

    const toggleElementInterface =
      await settingsAudioFirstUser.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementInterface,
    );

    const toggleElementMedia =
      await settingsAudioFirstUser.mediaSoundsControllerValue;
    const mediaSoundsStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementMedia);

    const toggleElementMessage =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const messageSoundsStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementMessage);

    const toggleElementTimer =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const callTimerStatus =
      await settingsAudioFirstUser.getToggleState(toggleElementTimer);

    await expect(echoCancellationStatus).toEqual("0");
    await expect(interfaceSoundsStatus).toEqual("0");
    await expect(mediaSoundsStatus).toEqual("0");
    await expect(messageSoundsStatus).toEqual("0");
    await expect(callTimerStatus).toEqual("0");
  });
}

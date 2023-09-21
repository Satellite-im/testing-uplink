import "module-alias/register";
import SettingsAudioScreen from "@screenobjects/settings/SettingsAudioScreen";
import SettingsGeneralScreen from "@screenobjects/settings/SettingsGeneralScreen";
import { USER_A_INSTANCE } from "@helpers/constants";
let settingsAudioFirstUser = new SettingsAudioScreen(USER_A_INSTANCE);
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);

export default async function settingsAudio() {
  it("Settings Audio - Assert screen texts for input/output device and sample rate selection", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await settingsGeneralFirstUser.goToAudioSettings();
    await settingsAudioFirstUser.waitForIsShown(true);

    // Validate texts for Input Device Selection
    const inputDeviceHeader = await settingsAudioFirstUser.inputDeviceHeader;
    const inputDeviceDescription =
      await settingsAudioFirstUser.inputDeviceDescription;
    await expect(inputDeviceHeader).toHaveTextContaining("INPUT DEVICE");
    await expect(inputDeviceDescription).toHaveTextContaining(
      "Select your input device (microphone, usually)."
    );

    // Validate texts for Output Device Selection
    const outputDeviceHeader = await settingsAudioFirstUser.outputDeviceHeader;
    const outputDeviceDescription =
      await settingsAudioFirstUser.outputDeviceDescription;
    await expect(outputDeviceHeader).toHaveTextContaining("OUTPUT DEVICE");
    await expect(outputDeviceDescription).toHaveTextContaining(
      "This is where all sounds will be played. (Usually your headphones)."
    );

    // Validate texts for Sample Rate selection
    const sampleRateHeader = await settingsAudioFirstUser.sampleRateHeader;
    const sampleRateDescription =
      await settingsAudioFirstUser.sampleRateDescription;
    await expect(sampleRateHeader).toHaveTextContaining("SAMPLE RATE");
    await expect(sampleRateDescription).toHaveTextContaining(
      'Higher sample rates will capture more "frames" of your audio and sound "clearer".'
    );
  });

  it("Settings Audio - Assert screen texts for Noise Suppression and Echo Cancellation", async () => {
    // Validate texts for Noise Suppression Settings Section
    const noiseSuppressionHeader =
      await settingsAudioFirstUser.noiseSuppressionHeader;
    const noiseSuppressionDescription =
      await settingsAudioFirstUser.noiseSuppressionDescription;
    await expect(noiseSuppressionHeader).toHaveTextContaining(
      "NOISE SUPPRESSION"
    );
    await expect(noiseSuppressionDescription).toHaveTextContaining(
      "Helps to minimize background noise and focus on your voice."
    );

    // Validate texts for Echo Cancellation Settings Section
    const echoCancellationHeader =
      await settingsAudioFirstUser.echoCancellationHeader;
    const echoCancellationDescription =
      await settingsAudioFirstUser.echoCancellationDescription;
    await expect(echoCancellationHeader).toHaveTextContaining(
      "ECHO CANCELLATION"
    );
    await expect(echoCancellationDescription).toHaveTextContaining(
      "Helps to minimize feedback from speakers into your microphone."
    );
  });

  it("Settings Audio - Assert screen texts for switch sliders", async () => {
    // Validate texts for Interface Sounds Settings Section
    const interfaceSoundsHeader =
      await settingsAudioFirstUser.interfaceSoundsHeader;
    const interfaceSoundsDescription =
      await settingsAudioFirstUser.interfaceSoundsDescription;
    await expect(interfaceSoundsHeader).toHaveTextContaining(
      "INTERFACE SOUNDS"
    );
    await expect(interfaceSoundsDescription).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app."
    );

    // Validate texts for Media Sounds Settings Section
    const mediaSoundsHeader = await settingsAudioFirstUser.mediaSoundsHeader;
    const mediaSoundsDescription =
      await settingsAudioFirstUser.mediaSoundsDescription;
    await expect(mediaSoundsHeader).toHaveTextContaining("MEDIA SOUNDS");
    await expect(mediaSoundsDescription).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds."
    );

    // Validate texts for Message Sounds Settings Section
    const messageSoundsHeader =
      await settingsAudioFirstUser.messageSoundsHeader;
    const messageSoundsDescription =
      await settingsAudioFirstUser.messageSoundsDescription;
    await expect(messageSoundsHeader).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(messageSoundsDescription).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received."
    );

    // Validate texts for Call Timer Settings Section
    const callTimerHeader = await settingsAudioFirstUser.callTimerHeader;
    const callTimerDescription =
      await settingsAudioFirstUser.callTimerDescription;
    await expect(callTimerHeader).toHaveTextContaining("CALL TIMER");
    await expect(callTimerDescription).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration."
    );
  });

  it("Settings Audio - Validate Noise Suppression radio buttons can be selected", async () => {
    // Change Noise Suppression to Low, Medium, High and return it to None
    await settingsAudioFirstUser.selectNoiseSuppressionLow();
    await settingsAudioFirstUser.selectNoiseSuppressionMedium();
    await settingsAudioFirstUser.selectNoiseSuppressionHigh();
    await settingsAudioFirstUser.selectNoiseSuppressionNone();
  });

  it("Settings Audio - Validate Echo Cancellation radio buttons can be selected", async () => {
    // Change Echo Cancellation to Low, Medium, High and return it to None
    await settingsAudioFirstUser.selectEchoCancellationLow();
    await settingsAudioFirstUser.selectEchoCancellationMedium();
    await settingsAudioFirstUser.selectEchoCancellationHigh();
    await settingsAudioFirstUser.selectEchoCancellationNone();
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

    await expect(interfaceSoundsStatus).toEqual("1");
    await expect(mediaSoundsStatus).toEqual("1");
    await expect(messageSoundsStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the four switch sliders from the Settings Sounds & Audio Screen
    await settingsAudioFirstUser.clickOnInterfaceSounds();
    await settingsAudioFirstUser.clickOnMediaSounds();
    await settingsAudioFirstUser.clickOnMessageSounds();

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

    await expect(interfaceSoundsStatus).toEqual("0");
    await expect(mediaSoundsStatus).toEqual("0");
    await expect(messageSoundsStatus).toEqual("0");
  });
}

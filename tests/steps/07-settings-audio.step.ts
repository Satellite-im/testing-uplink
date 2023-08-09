import { Given, When, Then } from "@cucumber/cucumber";
import SettingsAudioScreen from "../screenobjects/settings/SettingsAudioScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsAudioFirstUser = new SettingsAudioScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

When(
  /^I go to the Settings Sounds and Audio Screen from Welcome Screen$/,
  async () => {
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
    await settingsProfileFirstUser.goToAudioSettings();
    await settingsAudioFirstUser.waitForIsShown(true);
  }
);

When(/^I am on the Settings Audio Screen with a new account$/, async () => {
  await settingsAudioFirstUser.waitForIsShown(true);
});

When(
  /^I click on the Interface Sounds switch slider from Settings Audio$/,
  async () => {
    await settingsAudioFirstUser.clickOnInterfaceSounds();
  }
);

When(
  /^I click on the Media Sounds switch slider from Settings Audio$/,
  async () => {
    await settingsAudioFirstUser.clickOnMediaSounds();
  }
);

When(
  /^I click on the Message Sounds switch slider from Settings Audio$/,
  async () => {
    await settingsAudioFirstUser.clickOnMessageSounds();
  }
);

When(
  /^I click on the Call Timer switch slider from Settings Audio$/,
  async () => {
    await settingsAudioFirstUser.clickOnCallTimer();
  }
);

Then(
  /^I should see the correct header and description displayed for Input Device$/,
  async () => {
    await expect(settingsAudioFirstUser.inputDeviceHeader).toHaveTextContaining(
      "INPUT DEVICE"
    );
    await expect(
      settingsAudioFirstUser.inputDeviceDescription
    ).toHaveTextContaining("Select your input device (microphone, usually).");
  }
);

Then(
  /^I should see the correct header and description displayed for Output Device$/,
  async () => {
    await expect(
      settingsAudioFirstUser.outputDeviceHeader
    ).toHaveTextContaining("OUTPUT DEVICE");
    await expect(
      settingsAudioFirstUser.outputDeviceDescription
    ).toHaveTextContaining(
      "This is where all sounds will be played. (Usually your headphones)."
    );
  }
);

Then(
  /^I should see the correct header and description displayed for Sample Rate$/,
  async () => {
    await expect(settingsAudioFirstUser.sampleRateHeader).toHaveTextContaining(
      "SAMPLE RATE"
    );
    await expect(
      settingsAudioFirstUser.sampleRateDescription
    ).toHaveTextContaining(
      'Higher sample rates will capture more "frames" of your audio and sound "clearer".'
    );
  }
);

Then(
  /^I should see the correct header and description displayed for Interface Sounds$/,
  async () => {
    await expect(
      settingsAudioFirstUser.interfaceSoundsHeader
    ).toHaveTextContaining("INTERFACE SOUNDS");
    await expect(
      settingsAudioFirstUser.interfaceSoundsDescription
    ).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app."
    );
  }
);

Then(
  /^I should see the correct header and description displayed for Media Sounds$/,
  async () => {
    await expect(settingsAudioFirstUser.mediaSoundsHeader).toHaveTextContaining(
      "MEDIA SOUNDS"
    );
    await expect(
      settingsAudioFirstUser.mediaSoundsDescription
    ).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds."
    );
  }
);

Then(
  /^I should see the correct header and description displayed for Message Sounds$/,
  async () => {
    await expect(
      settingsAudioFirstUser.messageSoundsHeader
    ).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(
      settingsAudioFirstUser.messageSoundsDescription
    ).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received."
    );
  }
);

Then(
  /^I should see the correct header and description displayed for Call Timer$/,
  async () => {
    await expect(settingsAudioFirstUser.callTimerHeader).toHaveTextContaining(
      "CALL TIMER"
    );
    await expect(
      settingsAudioFirstUser.callTimerDescription
    ).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration."
    );
  }
);

Then(
  /^I should see that Interface Sounds switch from Settings Audio is (.*)$/,
  async (value: string) => {
    const toggleElementInterface =
      await settingsAudioFirstUser.interfaceSoundsControllerValue;
    const interfaceSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementInterface
    );
    if (value === "enabled") {
      await expect(interfaceSoundsStatus).toEqual("1");
    } else if (value === "disabled") {
      await expect(interfaceSoundsStatus).toEqual("0");
    }
  }
);

Then(
  /^I should see that Media Sounds switch from Settings Audio is (.*)$/,
  async (value: string) => {
    const toggleElementMedia =
      await settingsAudioFirstUser.mediaSoundsControllerValue;
    const mediaSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementMedia
    );
    if (value === "enabled") {
      await expect(mediaSoundsStatus).toEqual("1");
    } else if (value === "disabled") {
      await expect(mediaSoundsStatus).toEqual("0");
    }
  }
);

Then(
  /^I should see that Message Sounds switch from Settings Audio is (.*)$/,
  async (value: string) => {
    const toggleElementMessage =
      await settingsAudioFirstUser.messageSoundsControllerValue;
    const messageSoundsStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementMessage
    );
    if (value === "enabled") {
      await expect(messageSoundsStatus).toEqual("1");
    } else if (value === "disabled") {
      await expect(messageSoundsStatus).toEqual("0");
    }
  }
);

Then(
  /^I should see that Call Timer switch from Settings Audio is (.*)$/,
  async (value: string) => {
    const toggleElementCallTimer =
      await settingsAudioFirstUser.callTimerControllerValue;
    const callTimerStatus = await settingsAudioFirstUser.getToggleState(
      toggleElementCallTimer
    );
    if (value === "enabled") {
      await expect(callTimerStatus).toEqual("1");
    } else if (value === "disabled") {
      await expect(callTimerStatus).toEqual("0");
    }
  }
);

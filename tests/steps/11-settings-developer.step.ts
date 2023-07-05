import { Given, When, Then } from "@cucumber/cucumber";
import SettingsDeveloperScreen from "../screenobjects/settings/SettingsDeveloperScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsDeveloperFirstUser = new SettingsDeveloperScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

When(
  /^I go to the Settings Developer Screen from Welcome Screen$/,
  async () => {
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
    await settingsProfileFirstUser.goToDeveloperSettings();
    await settingsDeveloperFirstUser.waitForIsShown(true);
  }
);

When(/^I am on the Settings Developer Screen with a new account$/, async () => {
  await settingsDeveloperFirstUser.waitForIsShown(true);
});

When(
  /^I click on the Save Logs switch slider from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.clickOnSaveLogs();
  }
);

When(
  /^I click on the Developer Mode switch slider from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.clickOnDeveloperMode();
  }
);

When(
  /^I click on the Test Notification button from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.clickOnTestNotifications();
  }
);

When(
  /^I click on the Open Folder button from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.clickOnOpenCache();
  }
);

When(
  /^I click on the Compress And Download Cache button from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.clickOnCompressAndDownloadCache();
  }
);

When(
  /^I click on the Print State button from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.clickOnPrintState();
  }
);

When(
  /^I click on the Clear Cache switch slider from Settings Developer Screen$/,
  async () => {
    await settingsDeveloperFirstUser.clickOnClearCache();
  }
);

Then(
  /^I should see the Developer Mode header and description are correct$/,
  async () => {
    await expect(
      settingsDeveloperFirstUser.developerModeHeader
    ).toHaveTextContaining("DEVELOPER MODE");
    await expect(
      settingsDeveloperFirstUser.developerModeDescription
    ).toHaveTextContaining(
      "Enabling developer mode adds logging and displays helpful debug information on the UI."
    );
  }
);

Then(
  /^I should see the Test Notification header and description are correct$/,
  async () => {
    await expect(
      settingsDeveloperFirstUser.testNotificationHeader
    ).toHaveTextContaining("TEST NOTIFICATION");
    await expect(
      settingsDeveloperFirstUser.testNotificationDescription
    ).toHaveTextContaining("Sends a test notification");
  }
);

Then(
  /^I should see the Open Cache header and description are correct$/,
  async () => {
    await expect(
      settingsDeveloperFirstUser.openCacheHeader
    ).toHaveTextContaining("OPEN CACHE");
    await expect(
      settingsDeveloperFirstUser.openCacheDescription
    ).toHaveTextContaining("Open the cache in your default file browser.");
  }
);

Then(
  /^I should see the Compress & Download Cache header and description are correct$/,
  async () => {
    await expect(
      settingsDeveloperFirstUser.compressAndDownloadCacheHeader
    ).toHaveTextContaining("COMPRESS & DOWNLOAD CACHE");
    await expect(
      settingsDeveloperFirstUser.compressAndDownloadCacheDescription
    ).toHaveTextContaining(
      "For debugging with other developers, you can compress your cache to zip and share it. Don't do this if this is a real account you use."
    );
  }
);

Then(
  /^I should see the Print State header and description are correct$/,
  async () => {
    await expect(
      settingsDeveloperFirstUser.printStateHeader
    ).toHaveTextContaining("PRINT STATE");
    await expect(
      settingsDeveloperFirstUser.printStateDescription
    ).toHaveTextContaining("Display State in the debug logger");
  }
);

Then(
  /^I should see the Clear Cache header and description are correct$/,
  async () => {
    await expect(
      settingsDeveloperFirstUser.clearCacheHeader
    ).toHaveTextContaining("CLEAR CACHE");
    await expect(
      settingsDeveloperFirstUser.clearCacheDescription
    ).toHaveTextContaining("Reset your account, basically.");
  }
);

Then(
  /^I should see the Save Logs In A File header and description are correct$/,
  async () => {
    await expect(
      settingsDeveloperFirstUser.saveLogsHeader
    ).toHaveTextContaining("SAVE LOGS IN A FILE");
    await expect(
      settingsDeveloperFirstUser.saveLogsDescription
    ).toHaveTextContaining(
      "Enabling this option, logs will be saved in a file and will be persistent."
    );
  }
);

Then(
  /^I should see the current value for Save Logs switch is (.*)$/,
  async (value: string) => {
    const toggleElement =
      await settingsDeveloperFirstUser.saveLogsControllerValue;
    const saveLogsStatus = await settingsDeveloperFirstUser.getToggleState(
      toggleElement
    );
    if (value === "enabled") {
      await expect(saveLogsStatus).toEqual("1");
    } else if (value === "disabled") {
      await expect(saveLogsStatus).toEqual("0");
    }
  }
);

Then(
  /^I should see the current value for Developer Mode switch is (.*)$/,
  async (value: string) => {
    const toggleElement =
      await settingsDeveloperFirstUser.developerModeControllerValue;
    const developerModeStatus = await settingsDeveloperFirstUser.getToggleState(
      toggleElement
    );
    if (value === "enabled") {
      await expect(developerModeStatus).toEqual("1");
    } else if (value === "disabled") {
      await expect(developerModeStatus).toEqual("0");
    }
  }
);

Then(/^I should see a Test Notification appearing in screen$/, async () => {
  console.log("Not implemented yet");
});

Then(
  /^I should see an explorer window showing the current cache folder on options$/,
  async () => {
    console.log("Not implemented yet");
  }
);

Then(
  /^I should see an explorer window showing a compressed file with the cache$/,
  async () => {
    console.log("Not implemented yet");
  }
);

Then(
  /^I should see a print state message displayed in developer console$/,
  async () => {
    console.log("Not implemented yet");
  }
);

Then(
  /^I should see an alert message asking if I want to clear the cache$/,
  async () => {
    console.log("Not implemented yet");
  }
);

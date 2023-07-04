import { Given, When, Then } from "@wdio/cucumber-framework";
import {
  createNewUser,
  grabCacheFolder,
  resetApp,
  saveTestKeys,
} from "../helpers/commands";
import { USER_A_INSTANCE } from "../helpers/constants";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

Given(/^I reset the application with clean cache$/, async () => {
  await resetApp(USER_A_INSTANCE);
});

When(
  /^I execute the command with the steps to Create a New User for the (.*) test user$/,
  async (user: string) => {
    if (user === "first") {
      await createNewUser("ChatUserA");
    } else if (user === "second") {
      await createNewUser("ChatUserB");
    }
  }
);

When(/^I am on the Welcome Screen with the new user$/, async () => {
  await welcomeScreenFirstUser.waitForIsShown(true);
});

When(
  /^I go to the Settings Profile Screen from the Welcome Screen$/,
  async () => {
    await welcomeScreenFirstUser.goToSettings();
  }
);

When(/^I see the Settings Profile Screen displayed$/, async () => {
  await settingsProfileFirstUser.waitForIsShown(true);
});

Then(/^I should see the Welcome Screen displayed$/, async () => {
  await welcomeScreenFirstUser.waitForIsShown(true);
});

Then(
  /^I should be able to save the test key from the (.*) user$/,
  async (user: string) => {
    const inputTextElement =
      await settingsProfileFirstUser.getStatusInputText();
    const didkey = await inputTextElement.getText();

    if (user === "first") {
      await saveTestKeys("ChatUserA", didkey, USER_A_INSTANCE);
    } else if (user === "second") {
      await saveTestKeys("ChatUserB", didkey, USER_A_INSTANCE);
    }
  }
);

Then(
  /^I should be able to grab the cache folder for the (.*) user$/,
  async (user: string) => {
    if (user === "first") {
      await grabCacheFolder("ChatUserA", USER_A_INSTANCE);
    } else if (user === "second") {
      await grabCacheFolder("ChatUserB", USER_A_INSTANCE);
    }
  }
);

Then(/^I should be able to reset the app to clean the cache$/, async () => {
  await resetApp(USER_A_INSTANCE);
});

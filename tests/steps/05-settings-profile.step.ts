import { Given, When, Then } from "@wdio/cucumber-framework";
import FilesScreen from "../screenobjects/files/FilesScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);

Given(/^I go to the Settings Profile Screen from Files Screens$/, async () => {
  // Go to Settings Screen and select the Settings Screen to validate
  await filesScreenFirstUser.goToSettings();
  await settingsProfileFirstUser.waitForIsShown(true);
});

When(/^I am on the Settings Profile Screen with a new account$/, async () => {
  await settingsProfileFirstUser.waitForIsShown(true);
});

When(
  /^I click on the Dismiss button from Your New Profile dialog$/,
  async () => {
    await settingsProfileFirstUser.clickOnDismissButton();
  }
);

When(/^I hover on the Settings Profile Screen CopyID button$/, async () => {
  await settingsProfileFirstUser.hoverOnCopyID();
});

When(/^I click on the Settings Profile Screen CopyID button$/, async () => {
  await settingsProfileFirstUser.clickOnCopyIDButton();
});

When(/^I paste the copied user key into status input field$/, async () => {
  await settingsProfileFirstUser.pasteUserKeyInStatus();
});

When(/^I clear the Settings Profile status value$/, async () => {
  await settingsProfileFirstUser.deleteStatus();
});

When(
  /^I upload the profile picture located in (.*)$/,
  async (filepath: string) => {
    await settingsProfileFirstUser.uploadProfilePicture(filepath);
  }
);

When(/^I hover on the banner from Settings Profile Screen$/, async () => {
  await settingsProfileFirstUser.hoverOnBanner();
});

When(
  /^I upload the profile banner located in (.*)$/,
  async (filepath: string) => {
    await settingsProfileFirstUser.uploadBannerPicture(filepath);
  }
);

When(/^I click on Settings Profile Username Input$/, async () => {
  await settingsProfileFirstUser.usernameInput.click();
});

When(
  /^I enter (.*) in the status field from Settings Profile Screen$/,
  async (status: string) => {
    await settingsProfileFirstUser.enterStatus(status);
  }
);

When(
  /^I enter (.*) in the username field from Settings Profile Screen$/,
  async (username: string) => {
    await settingsProfileFirstUser.enterUsername(username);
  }
);

When(
  /^I type spaces in the username field from Settings Profile Screen$/,
  async () => {
    await settingsProfileFirstUser.enterUsername("1234" + "             ");
  }
);

Then(
  /^I should see the Pre Release Indicator displayed on Settings Profile Screen$/,
  async () => {
    await expect(settingsProfileFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  }
);

Then(
  /^I should see the main buttons displayed on Settings Profile Screen$/,
  async () => {
    await settingsProfileFirstUser.chatsButton.waitForExist();
    await settingsProfileFirstUser.filesButton.waitForExist();
    await settingsProfileFirstUser.friendsButton.waitForExist();
    await settingsProfileFirstUser.settingsButton.waitForExist();
  }
);

Then(
  /^I should see the sidebar displayed on Settings Profile Screen$/,
  async () => {
    await expect(settingsProfileFirstUser.sidebar).toBeDisplayed();
    await expect(settingsProfileFirstUser.sidebarChildren).toBeDisplayed();
    await expect(settingsProfileFirstUser.sidebarSearch).toBeDisplayed();
  }
);

Then(
  /^I should see the Your New Profile dialog displayed on Settings Profile Screen$/,
  async () => {
    await settingsProfileFirstUser.yourNewProfile.waitForDisplayed();
  }
);

Then(
  /^I should see that the Your New Profile dialog texts are correct$/,
  async () => {
    await expect(
      settingsProfileFirstUser.yourNewProfileHeaderTextValue
    ).toHaveTextContaining("YOUR NEW PROFILE!");
    await expect(
      settingsProfileFirstUser.yourNewProfileDescriptionTextOneValue
    ).toHaveTextContaining(
      "Tell the world all about yourself, well.. tell them as much as you can while we're still under construction, at least."
    );
    await expect(
      settingsProfileFirstUser.yourNewProfileDescriptionTextTwoValue
    ).toHaveTextContaining(
      "First step, pick out a profile picture and maybe even a banner too!"
    );
  }
);

Then(
  /^I should no longer see the Your New Profile dialog displayed$/,
  async () => {
    await settingsProfileFirstUser.dismissButton.waitForExist({
      reverse: true,
    });
  }
);

Then(
  /^I should see the Settings Profile username input shows (.*)$/,
  async (username: string) => {
    await expect(settingsProfileFirstUser.usernameInput).toHaveTextContaining(
      username
    );
  }
);

Then(/^I should see the Settings Profile status input is empty$/, async () => {
  await expect(settingsProfileFirstUser.statusInput).toHaveTextContaining("");
});

Then(
  /^I should see the Settings Profile status input shows (.*)$/,
  async (status: string) => {
    await expect(settingsProfileFirstUser.statusInput).toHaveTextContaining(
      status
    );
  }
);

Then(
  /^I should see the Settings Profile username header is correct$/,
  async () => {
    await expect(settingsProfileFirstUser.usernameLabel).toHaveTextContaining(
      "USERNAME"
    );
  }
);

Then(
  /^I should see the Settings Profile status header is correct$/,
  async () => {
    await expect(settingsProfileFirstUser.statusLabel).toHaveTextContaining(
      "STATUS"
    );
  }
);

Then(
  /^I should see the Copy ID button tooltip displayed on screen$/,
  async () => {
    await settingsProfileFirstUser.copyIDTooltip.waitForExist();
    await expect(
      settingsProfileFirstUser.copyIDTooltipText
    ).toHaveTextContaining("Copy ID");
  }
);

Then(
  /^I should see a success toast notification displayed on Settings Profile Screen$/,
  async () => {
    // Wait for toast notification to be closed
    await settingsProfileFirstUser.waitUntilNotificationIsClosed();
  }
);

Then(
  /^I should see the profile picture uploaded in Settings Profile$/,
  async () => {
    await settingsProfileFirstUser.profilePicture.waitForExist();
  }
);

Then(
  /^I should see the profile banner uploaded in Settings Profile$/,
  async () => {
    await settingsProfileFirstUser.profileBanner.waitForExist();
  }
);
Then(
  /^I should see the Change Banner button tooltip displayed on screen$/,
  async () => {
    await settingsProfileFirstUser.profileBannerTooltip.waitForExist();
    await expect(
      settingsProfileFirstUser.profileBannerTooltip
    ).toHaveTextContaining("Change banner");
  }
);

Then(
  /^I should see an input error message displayed on Settings Profile Screen showing (.*)$/,
  async (errorMessage: string) => {
    await expect(settingsProfileFirstUser.inputError).toBeDisplayed();
    await expect(
      settingsProfileFirstUser.inputErrorMessage
    ).toHaveTextContaining(errorMessage);
  }
);

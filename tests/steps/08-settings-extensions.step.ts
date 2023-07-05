import { Given, When, Then } from "@cucumber/cucumber";
import SettingsExtensionsScreen from "../screenobjects/settings/SettingsExtensionsScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let settingsExtensionsFirstUser = new SettingsExtensionsScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

When(
  /^I go to the Settings Extensions Screen from Welcome Screen$/,
  async () => {
    await welcomeScreenFirstUser.goToSettings();
    await settingsProfileFirstUser.waitForIsShown(true);
    await settingsProfileFirstUser.goToExtensionsSettings();
    await settingsExtensionsFirstUser.waitForIsShown(true);
  }
);

When(
  /^I am on the Settings Extensions Screen with a new account$/,
  async () => {
    await settingsExtensionsFirstUser.waitForIsShown(true);
  }
);

When(
  /^I click on the explore button from Settings Extensions Screen$/,
  async () => {
    await settingsExtensionsFirstUser.clickOnExploreButton();
  }
);

When(
  /^I click on the extensions settings button from Settings Extensions Screen$/,
  async () => {
    await settingsExtensionsFirstUser.clickOnExtensionsSettingsButton();
  }
);

When(
  /^I click on the switch slider for Enable Automatically on Settings Extensions Screen$/,
  async () => {
    await settingsExtensionsFirstUser.clickOnEnableAutomatically();
  }
);

When(
  /^I click on open extensions folder button from Settings Extensions Screen$/,
  async () => {
    await settingsExtensionsFirstUser.clickOnOpenExtensionsFolder();
  }
);

Then(
  /^I should see the installed button displayed on Settings Extensions Screen$/,
  async () => {
    await expect(settingsExtensionsFirstUser.installedButton).toBeDisplayed();
  }
);

Then(
  /^I should see the explore button displayed on Settings Extensions Screen$/,
  async () => {
    await expect(settingsExtensionsFirstUser.exploreButton).toBeDisplayed();
  }
);

Then(
  /^I should see the search extensions button displayed on Settings Extensions Screen$/,
  async () => {
    await expect(
      settingsExtensionsFirstUser.extensionsSettingsButton
    ).toBeDisplayed();
  }
);

Then(
  /^I should see the alert text, header and placeholder with correct texts on Explore Extensions Screen$/,
  async () => {
    // Validate warning message, search extensions header and input are displayed
    await expect(
      settingsExtensionsFirstUser.installedAlertText
    ).toHaveTextContaining(
      "Extensions are pre-compiled on external hardware. For added security you can compile extensions from source and place in the `extensions` folder."
    );
    await expect(
      settingsExtensionsFirstUser.extensionsSearchHeader
    ).toHaveTextContaining("SEARCH EXTENSIONS");
    await expect(
      settingsExtensionsFirstUser.extensionsSearchInput
    ).toBeDisplayed();
    const placeholder =
      await settingsExtensionsFirstUser.getPlaceholderFromExtensionsInput();
    await expect(placeholder).toEqual("Extension name or description.");
  }
);

Then(
  /^I should see the Open Extensions header and description are correct$/,
  async () => {
    await expect(
      settingsExtensionsFirstUser.openExtensionsHeaderText
    ).toHaveTextContaining("OPEN EXTENSIONS FOLDER");
    await expect(
      settingsExtensionsFirstUser.openExtensionsDescriptionText
    ).toHaveTextContaining(
      "Open the local directory containing your installed extensions."
    );
  }
);

Then(
  /^I should see the Enable Automatically header and description are correct$/,
  async () => {
    await expect(
      settingsExtensionsFirstUser.enableAutomaticallyHeader
    ).toHaveTextContaining("ENABLE AUTOMATICALLY");
    await expect(
      settingsExtensionsFirstUser.enableAutomaticallyDescription
    ).toHaveTextContaining(
      "When turned on, new extensions will automatically be enabled by default."
    );
  }
);

Then(
  /^I should see the switch slider from Settings Extensions for Enable Automatically is (.*)$/,
  async (value: string) => {
    const toggleElement =
      await settingsExtensionsFirstUser.enableAutomaticallyControllerValue;
    const enableAutomaticallyState =
      await settingsExtensionsFirstUser.getToggleState(toggleElement);
    if (value === "enabled") {
      await expect(enableAutomaticallyState).toEqual("1");
    } else if (value === "disabled") {
      await expect(enableAutomaticallyState).toEqual("0");
    }
  }
);

Then(/^I should see the extensions folder opened on my computer$/, async () => {
  console.log("Not implemented yet");
});

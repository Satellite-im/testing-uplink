require("module-alias/register");
import createAccountTests from "@specs/01-create-account.spec";
import chatsTests from "@specs/02-chats.spec";
import filesTests from "@specs/03-files.spec";
import settingsProfileTests from "@specs/05-settings-profile.spec";
import settingsGeneralTests from "@specs/06-settings-general.spec";
import settingsMessagesTests from "@specs/15-settings-messages.spec";
import settingsAudioTests from "@specs/07-settings-audio.spec";
import settingsExtensionsTests from "@specs/08-settings-extensions.spec";
import settingsKeybindsTests from "@specs/18-settings-keybinds.spec";
import settingsNotificationsTests from "@specs/09-settings-notifications.spec";
import settingsAccessibilityTests from "@specs/10-settings-accessibility.spec";
import settingsAboutTests from "@specs/11-settings-about.spec";
import settingsLicensesTests from "@specs/12-settings-licenses.spec";
import settingsDeveloperTests from "@specs/13-settings-developer.spec";
import importAccountTests from "@specs/16-import-account.spec";
import offlineRequestsTests from "@specs/17-offline-requests.spec";

describe("MacOS Tests", function () {
  describe("Create Pin and Account Tests", createAccountTests.bind(this));
  describe("Chats Main Screen Tests", chatsTests.bind(this));
  describe("Files Screen Tests", filesTests.bind(this));
  describe("Settings Profile Tests", settingsProfileTests.bind(this));
  describe("Settings General Tests", settingsGeneralTests.bind(this));
  describe("Settings Message Tests", settingsMessagesTests.bind(this));
  describe("Settings Audio Tests", settingsAudioTests.bind(this));
  describe("Settings Extensions Tests", settingsExtensionsTests.bind(this));
  describe(
    "Settings Keyboard Shortcuts Tests",
    settingsKeybindsTests.bind(this),
  );
  describe(
    "Settings Accessibility Tests",
    settingsAccessibilityTests.bind(this),
  );
  describe(
    "Settings Notifications Tests",
    settingsNotificationsTests.bind(this),
  );
  describe("Settings About Tests", settingsAboutTests.bind(this));
  describe("Settings Licenses Tests", settingsLicensesTests.bind(this));
  describe("Settings Developer Tests", settingsDeveloperTests.bind(this));
  describe("Import Account Tests", importAccountTests.bind(this));
  describe("Offline Requests Tests", offlineRequestsTests.bind(this));
});

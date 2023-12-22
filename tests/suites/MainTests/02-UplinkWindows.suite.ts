require("module-alias/register");
import createAccount from "@specs/01-create-account.spec";
import chats from "@specs/02-chats.spec";
import files from "@specs/03-files.spec";
import settingsProfileTests from "@specs/05-settings-profile.spec";
import settingsGeneral from "@specs/06-settings-general.spec";
import settingsMessages from "@specs/15-settings-messages.spec";
import settingsAudio from "@specs/07-settings-audio.spec";
import settingsExtensions from "@specs/08-settings-extensions.spec";
import settingsNotifications from "@specs/09-settings-notifications.spec";
import settingsAccessibility from "@specs/10-settings-accessibility.spec";
import settingsAbout from "@specs/11-settings-about.spec";
import settingsLicenses from "@specs/12-settings-licenses.spec";
import settingsDeveloper from "@specs/13-settings-developer.spec";

describe("Windows Tests", function () {
  describe("Create Pin and Account Tests", createAccount.bind(this));
  describe("Chats Main Screen Tests", chats.bind(this));
  describe("Files Screen Tests", files.bind(this));
  describe("Settings Profile Tests", settingsProfileTests.bind(this));
  describe("Settings General Tests", settingsGeneral.bind(this));
  describe("Settings Messages Tests", settingsMessages.bind(this));
  describe("Settings Audio Tests", settingsAudio.bind(this));
  describe("Settings Extensions Tests", settingsExtensions.bind(this));
  describe("Settings Accessibility Tests", settingsAccessibility.bind(this));
  describe("Settings Notifications Tests", settingsNotifications.bind(this));
  describe("Settings About Tests", settingsAbout.bind(this));
  describe("Settings Licenses Tests", settingsLicenses.bind(this));
  describe("Settings Developer Tests", settingsDeveloper.bind(this));
});

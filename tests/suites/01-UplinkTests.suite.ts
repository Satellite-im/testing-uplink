import createAccount from "../specs/01-create-account.spec";
import chats from "../specs/02-chats.spec";
import files from "../specs/03-files.spec";
import settingsProfile from "../specs/05-settings-profile.spec";
import settingsGeneral from "../specs/06-settings-general.spec";
import settingsPrivacy from "../specs/07-settings-privacy.spec";
import settingsAudio from "../specs/08-settings-audio.spec";
import settingsFiles from "../specs/09-settings-files.spec";
import settingsExtensions from "../specs/10-settings-extensions.spec";
import settingsNotifications from "../specs/11-settings-notifications.spec";
import settingsDeveloper from "../specs/12-settings-developer.spec";
import settingsAccessibility from "../specs/13-settings-accessibility.spec";
import settingsAbout from "../specs/14-settings-about.spec";
import { deleteCache } from "../helpers/commands";

describe("Uplink UI Automated Tests", function () {
  describe("Create Pin and Account Tests", createAccount.bind(this));
  describe("Chats Main Screen Tests", chats.bind(this));
  describe("Files Screen Tests", files.bind(this));
  describe("Settings Profile Tests", settingsProfile.bind(this));
  describe("Settings General Tests", settingsGeneral.bind(this));
  describe("Settings Privacy Tests", settingsPrivacy.bind(this));
  describe("Settings Audio Tests", settingsAudio.bind(this));
  describe("Settings Files Tests", settingsFiles.bind(this));
  describe("Settings Extensions Tests", settingsExtensions.bind(this));
  describe("Settings Accessibility Tests", settingsAccessibility.bind(this));
  describe("Settings Notifications Tests", settingsNotifications.bind(this));
  describe("Settings Developer Tests", settingsDeveloper.bind(this));
  describe("Settings About Tests", settingsAbout.bind(this));

  after(function () {
    deleteCache();
  });
});

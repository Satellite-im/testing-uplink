import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import SettingsGeneralScreen from "../screenobjects/settings/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let settingsGeneralFirstUser = new SettingsGeneralScreen(USER_A_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

import { Given, When, Then } from "@wdio/cucumber-framework";

Given(/^I am on the Welcome Screen$/, async () => {
  await welcomeScreenFirstUser.waitForIsShown(true);
});

// Given user hovers on Chats or Files or Friends or Settings button
When(/^I hover on <button> button$/, async () => {
    if (<button> ===)
  await welcomeScreenFirstUser.hoverOnChatsButton();
});

Then(
  /^Validate Pre Release Indicator is displayed and has correct text$/,
  async () => {
    await expect(welcomeScreenFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      welcomeScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  }
);

Then(/^Validate Nav Bar and buttons are displayed$/, async () => {
  await expect(welcomeScreenFirstUser.chatsButton).toBeDisplayed();
  await expect(welcomeScreenFirstUser.filesButton).toBeDisplayed();
  await expect(welcomeScreenFirstUser.friendsButton).toBeDisplayed();
  await expect(welcomeScreenFirstUser.settingsButton).toBeDisplayed();
});

Then(/^Validate Sidebar is displayed in screen$/, async () => {
  await expect(welcomeScreenFirstUser.chatSearchInput).toBeDisplayed();
  await expect(welcomeScreenFirstUser.sidebar).toBeDisplayed();
  await expect(welcomeScreenFirstUser.sidebarChildren).toBeDisplayed();
  await expect(welcomeScreenFirstUser.sidebarSearch).toBeDisplayed();
});

Then(/^Validate Welcome Screen is displayed$/, async () => {
  await expect(welcomeScreenFirstUser.welcomeLayout).toBeDisplayed();
  await expect(welcomeScreenFirstUser.addFriendsButton).toBeDisplayed();
  await expect(welcomeScreenFirstUser.addSomeoneText).toHaveTextContaining(
    "Things are better with friends."
  );
});

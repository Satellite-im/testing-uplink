import { Given, When, Then } from "@cucumber/cucumber";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
import { loginWithTestUser } from "../helpers/commands";
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);

When(
  /^I log into the application with the previous account created$/,
  async () => {
    await loginWithTestUser();
  }
);

When(/^I am on the Welcome Screen after creating a new account$/, async () => {
  await welcomeScreenFirstUser.waitForIsShown(true);
});

When(/^I hover on Chats Button$/, async () => {
  await welcomeScreenFirstUser.hoverOnChatsButton();
});

When(/^I hover on Files Button$/, async () => {
  await welcomeScreenFirstUser.hoverOnFilesButton();
});

When(/^I hover on Friends Button$/, async () => {
  await welcomeScreenFirstUser.hoverOnFriendsButton();
});

When(/^I hover on Settings Button$/, async () => {
  await welcomeScreenFirstUser.hoverOnSettingsButton();
});

When(/^I click on Add Someone button$/, async () => {
  await welcomeScreenFirstUser.clickAddSomeone();
});

Then(
  /^I should see the Pre Release Indicator displayed on Screen$/,
  async () => {
    await expect(welcomeScreenFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      welcomeScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  }
);

Then(
  /^I should see the navigation bar with Chats, Files, Friends and Settings buttons displayed$/,
  async () => {
    await expect(welcomeScreenFirstUser.chatsButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.filesButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.friendsButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.settingsButton).toBeDisplayed();
  }
);

Then(/^I should see the sidebar displayed on screen$/, async () => {
  await expect(welcomeScreenFirstUser.chatSearchInput).toBeDisplayed();
  await expect(welcomeScreenFirstUser.sidebar).toBeDisplayed();
  await expect(welcomeScreenFirstUser.sidebarChildren).toBeDisplayed();
  await expect(welcomeScreenFirstUser.sidebarSearch).toBeDisplayed();
});

Then(
  /^I should see the Welcome Image and Welcome Text are displayed on screen$/,
  async () => {
    await expect(welcomeScreenFirstUser.welcomeLayout).toBeDisplayed();
    await expect(welcomeScreenFirstUser.addFriendsButton).toBeDisplayed();
    await expect(welcomeScreenFirstUser.addSomeoneText).toHaveTextContaining(
      "Things are better with friends."
    );
  }
);

Then(/^I should see the Chats Button tooltip displayed$/, async () => {
  await welcomeScreenFirstUser.chatsButtonTooltip.waitForExist();
  await expect(
    welcomeScreenFirstUser.chatsButtonTooltipText
  ).toHaveTextContaining("Chats");
});

Then(/^I should see the Files Button tooltip displayed$/, async () => {
  await welcomeScreenFirstUser.filesButtonTooltip.waitForExist();
  await expect(
    welcomeScreenFirstUser.filesButtonTooltipText
  ).toHaveTextContaining("Files");
});

Then(/^I should see the Friends Button tooltip displayed$/, async () => {
  await welcomeScreenFirstUser.friendsButtonTooltip.waitForExist();
  await expect(
    welcomeScreenFirstUser.friendsButtonTooltipText
  ).toHaveTextContaining("Friends");
});

Then(/^I should see the Settings Button tooltip displayed$/, async () => {
  await welcomeScreenFirstUser.settingsButtonTooltip.waitForExist();
  await expect(
    welcomeScreenFirstUser.settingsButtonTooltipText
  ).toHaveTextContaining("Settings");
});

Then(/^I should be redirected to Friends Screen$/, async () => {
  await friendsScreenFirstUser.waitForIsShown(true);
});

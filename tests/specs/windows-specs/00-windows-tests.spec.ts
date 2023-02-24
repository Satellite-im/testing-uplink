import { maximizeWindow } from "../../helpers/commands";
import ChatScreen from "../../screenobjects/ChatScreen";
import CreatePinScreen from "../../screenobjects/CreatePinScreen";
import CreateUserScreen from "../../screenobjects/CreateUserScreen";
import FilesScreen from "../../screenobjects/FilesScreen";
import FriendsScreen from "../../screenobjects/FriendsScreen";
import SettingsAudioScreen from "../../screenobjects/SettingsAudioScreen";
import SettingsExtensionsScreen from "../../screenobjects/SettingsExtensionsScreen";
import SettingsFilesScreen from "../../screenobjects/SettingsFilesScreen";
import SettingsDeveloperScreen from "../../screenobjects/SettingsDeveloperScreen";
import SettingsGeneralScreen from "../../screenobjects/SettingsGeneralScreen";
import SettingsNotificationsScreen from "../../screenobjects/SettingsNotificationsScreen";
import SettingsPrivacyScreen from "../../screenobjects/SettingsPrivacyScreen";
import SettingsProfileScreen from "../../screenobjects/SettingsProfileScreen";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";

describe("Create Account Screen Tests", async () => {
  // Skipped since Prerelease indicator is no longer available
  xit("Validate Pre Release Indicator is displayed on Screen", async () => {
    // Create an account and go to Main Screen
    await CreatePinScreen.waitForIsShown(true);

    await expect(await CreatePinScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await CreatePinScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate warning texts are displayed on screen", async () => {
    await expect(await CreatePinScreen.unlockWarningParagraph).toBeDisplayed();
    expect(
      await CreatePinScreen.unlockWarningParagraphText
    ).toHaveTextContaining(
      "Your password is used to encrypt your data. It is never sent to any server. You should use a strong password that you don't use anywhere else."
    );
    await expect(await CreatePinScreen.unlockWarningSpan).toBeDisplayed();
    expect(await CreatePinScreen.unlockWarningSpanText).toHaveTextContaining(
      "If you forget this password we cannot help you retrieve it."
    );
  });

  it("Create Account button should be disabled if no pin has been entered", async () => {
    await expect(await CreatePinScreen.createAccountButton).not.toExist();
  });

  it("Enter an empty pin", async () => {
    await CreatePinScreen.enterPin("1");
    await (await CreatePinScreen.pinInput).clearValue();
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(await CreatePinScreen.createAccountButton).not.toExist();
  });

  it("Enter a pin with less than 4 characters", async () => {
    await CreatePinScreen.enterPin("123");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
    await expect(await CreatePinScreen.createAccountButton).not.toExist();
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a pin with more than 32 characters", async () => {
    await CreatePinScreen.enterPin("12345678901234567890123456789012345");
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await (await CreatePinScreen.pinInput).clearValue();
  });

  // Test is failing because webdriverio handles spaces as dots and needs more research to avoid flakiness
  xit("Enter a pin with spaces", async () => {
    // Enter pin value with spaces
    const emptySpaces = "    ";
    await CreatePinScreen.pinInput.addValue(`123${emptySpaces}`);
    await expect(await CreatePinScreen.inputError).toBeDisplayed();
    await expect(await CreatePinScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await (await CreatePinScreen.pinInput).clearValue();
  });

  it("Enter a valid pin and continue creating a username", async () => {
    await CreatePinScreen.enterPin("1234");
    expect(await CreatePinScreen.getStatusOfCreateAccountButton()).toEqual(
      "true"
    );
    await CreatePinScreen.clickOnCreateAccount();
    await CreateUserScreen.waitForIsShown(true);
  });

  it("Leave empty username and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("1");
    await CreateUserScreen.enterUsername("");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with less than 4 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 4 characters"
    );
  });

  it("Username with more than 32 characters and attempt to continue", async () => {
    await CreateUserScreen.enterUsername("12345678901234567890123456789012345");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 32 characters exceeded"
    );
  });

  // Test is failing because webdriverio handles spaces as dots and needs more research to avoid flakiness
  xit("Username with spaces and attempt to continue", async () => {
    // Enter pin value with spaces
    const emptySpaces = "    ";
    await CreateUserScreen.usernameInput.addValue(`123${emptySpaces}`);
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
  });

  it("Username with non-alphanumeric characters", async () => {
    await CreateUserScreen.enterUsername("test...");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "false"
    );
    await expect(await CreateUserScreen.inputError).toBeDisplayed();
    await expect(await CreateUserScreen.inputErrorText).toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );
  });

  it("Enter valid username to continue", async () => {
    await CreateUserScreen.enterUsername("test123");
    expect(await CreateUserScreen.getStatusOfCreateAccountButton()).toEqual(
      "true"
    );
    await CreateUserScreen.clickOnCreateAccount();
    await WelcomeScreen.waitForIsShown(true);
    await maximizeWindow();
  });
});

describe("Chats Main Screen Tests", async () => {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await WelcomeScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await WelcomeScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await WelcomeScreen.buttonNav).toBeDisplayed();
    await expect(await WelcomeScreen.chatsButton).toBeDisplayed();
    await expect(await WelcomeScreen.filesButton).toBeDisplayed();
    await expect(await WelcomeScreen.friendsButton).toBeDisplayed();
    await expect(await WelcomeScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await WelcomeScreen.chatSearchInput).toBeDisplayed();
    await expect(await WelcomeScreen.sidebar).toBeDisplayed();
    await expect(await WelcomeScreen.sidebarChildren).toBeDisplayed();
    await expect(await WelcomeScreen.sidebarSearch).toBeDisplayed();
  });

  it("Validate Welcome Screen is displayed", async () => {
    const osDriver = await driver.capabilities.automationName;
    await expect(await WelcomeScreen.welcomeLayout).toBeDisplayed();

    // Execute only on MacOS because Add Someone button is only displayed on MacOS
    if (osDriver === "mac2") {
      await expect(await WelcomeScreen.addFriendsButton).toBeDisplayed();
      const locator = await (
        await WelcomeScreen.welcomeLayout
      ).$("~Add Someone");
      await expect(locator).toHaveTextContaining("Add Someone");
    }
  });

  it("Click on add someone redirects to Friends Page", async () => {
    const osDriver = await driver.capabilities.automationName;

    // Execute only on MacOS because Add Someone button is only displayed on MacOS
    if (osDriver === "mac2") {
      await WelcomeScreen.clickAddSomeone();
      await FriendsScreen.waitForIsShown(true);
    } else if (osDriver === "windows") {
      await WelcomeScreen.goToFriends();
    }
  });
});

describe("Files Screen Tests", async () => {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Files Screen
    await FriendsScreen.goToFiles();
    await FilesScreen.waitForIsShown(true);

    // Validate Pre Release Indicator
    await expect(await FilesScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await FilesScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await FilesScreen.buttonNav).toBeDisplayed();
    await expect(await FilesScreen.chatsButton).toBeDisplayed();
    await expect(await FilesScreen.filesButton).toBeDisplayed();
    await expect(await FilesScreen.friendsButton).toBeDisplayed();
    await expect(await FilesScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await FilesScreen.chatSearchInput).toBeDisplayed();
    await expect(await FilesScreen.sidebar).toBeDisplayed();
    await expect(await FilesScreen.sidebarChildren).toBeDisplayed();
    await expect(await FilesScreen.sidebarSearch).toBeDisplayed();
  });

  it("Validate Files Info is displayed in screen", async () => {
    await expect(await FilesScreen.filesInfo).toBeDisplayed();
    await expect(await FilesScreen.filesInfoFreeSpaceLabel).toBeDisplayed();
    await expect(await FilesScreen.filesInfoFreeSpaceValue).toBeDisplayed();
    await expect(await FilesScreen.filesInfoTotalSpaceLabel).toBeDisplayed();
    await expect(await FilesScreen.filesInfoTotalSpaceValue).toBeDisplayed();
  });

  it("Validate Files Breadcrumbs are displayed in screen", async () => {
    await expect(await FilesScreen.filesBreadcrumbs).toBeDisplayed();
    await expect(await FilesScreen.crumb).toBeDisplayed();
  });

  xit("Create a new folder", async () => {});

  it("Validate add folder/file buttons are displayed in screen", async () => {
    await expect(await FilesScreen.addFileButton).toBeDisplayed();
    await expect(await FilesScreen.uploadFileButton).toBeDisplayed();
  });
});

describe("Friends Screen Tests", async () => {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Friends Screen
    await FilesScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // Validate Pre Release Indicator is displayed
    await expect(await FriendsScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await FriendsScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await FriendsScreen.buttonNav).toBeDisplayed();
    await expect(await FriendsScreen.chatsButton).toBeDisplayed();
    await expect(await FriendsScreen.filesButton).toBeDisplayed();
    await expect(await FriendsScreen.friendsButton).toBeDisplayed();
    await expect(await FriendsScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await FriendsScreen.chatSearchInput).toBeDisplayed();
    await expect(await FriendsScreen.sidebar).toBeDisplayed();
    await expect(await FriendsScreen.sidebarChildren).toBeDisplayed();
    await expect(await FriendsScreen.sidebarSearch).toBeDisplayed();
  });

  it("Go to Friends Screen and validate elements displayed", async () => {
    await expect(await FriendsScreen.friendsLayout).toBeDisplayed();
    await expect(await FriendsScreen.settingsButton).toBeDisplayed();
  });

  it("User can copy its own ID by clicking on button", async () => {
    // Click on Copy ID button and grab clipboard value
    await FriendsScreen.clickOnCopyID();

    // Validate toast notification and close it
    const toastText = await FriendsScreen.getToastNotificationText();
    await expect(toastText).toEqual("Copied ID to clipboard!");
    await FriendsScreen.closeToastNotification();
    await FriendsScreen.toastNotification.waitForDisplayed({ reverse: true });

    // Paste copied ID into input field and assert input is equal to copied value
    await FriendsScreen.enterCopiedID();
    await expect(await FriendsScreen.addSomeoneInput).toHaveTextContaining(
      "did:key"
    );
  });

  it("User can type on user search input bar", async () => {
    await (await FriendsScreen.addSomeoneInput).click();
    await (await FriendsScreen.addSomeoneInput).clearValue();
    await (await FriendsScreen.addSomeoneInput).setValue("Hello");
    await expect(await FriendsScreen.addSomeoneInput).toHaveTextContaining(
      "Hello"
    );
  });

  // Skipped since it needs to be implemented
  xit("User Input Error Message is displayed when input is less than 56 characters", async () => {});

  // Skipped since it needs to be implemented
  xit("Add a friend", async () => {});

  it("Switch to Pending Friends view and validate elements displayed", async () => {
    await (await FriendsScreen.pendingFriendsButton).click();
    await expect(await FriendsScreen.incomingRequestsList).toBeDisplayed();
    await expect(await FriendsScreen.outgoingRequestsList).toBeDisplayed();
  });

  it("Switch to Blocked Friends view and validate elements displayed", async () => {
    await (await FriendsScreen.blockedFriendsButton).click();
    await expect(await FriendsScreen.blockedList).toBeDisplayed();
  });

  it("Switch to All Friends view and validate elements displayed", async () => {
    await (await FriendsScreen.allFriendsButton).click();
    await expect(await FriendsScreen.friendsList).toBeDisplayed();
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Go to Chat with Friend from Friends List", async () => {
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.chatWithFriend(friendName);

    //Validate Chat Screen is displayed and go back to Friends Screen
    await ChatScreen.waitForIsShown(true);
    await ChatScreen.goToFriends();
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Unfriend someone from Friends List", async () => {
    // Get a random user from list and unfriend it
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.removeOrDenyFriend(friendName);

    // Get current list of All friends and ensure that it does not include the removed user
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Block someone from Friends List", async () => {
    // Get a random user from list and block the user
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.blockUser(friendName);

    // Get current list of All friends and ensure that it does not include the blocked user
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);

    // Go to Blocked List and validate that user is there now
    await (await FriendsScreen.blockedFriendsButton).click();
    const blockedFriendsList = await FriendsScreen.getEntireFriendsList(
      "Blocked List"
    );
    await expect(blockedFriendsList.includes(friendName)).toEqual(true);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Accept incoming friend request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click();

    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Incoming Requests List"
    );
    await FriendsScreen.acceptIncomingRequest(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    const incomingRequestsList = await FriendsScreen.getEntireFriendsList(
      "Incoming Requests List"
    );
    await expect(incomingRequestsList.includes(friendName)).toEqual(false);

    // Go to the current list of All friends and ensure that now includes the friend accepted
    await (await FriendsScreen.allFriendsButton).click();
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(true);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Deny incoming friend request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click();

    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Incoming Requests List"
    );
    await FriendsScreen.removeOrDenyFriend(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    const incomingRequestsList = await FriendsScreen.getEntireFriendsList(
      "Incoming Requests List"
    );
    await expect(incomingRequestsList.includes(friendName)).toEqual(false);

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await (await FriendsScreen.allFriendsButton).click();
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Unfriend/Cancel outgoing friend request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click();

    // Get a random user from Outgoing Requests list and accept the request
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Outgoing Requests List"
    );
    await FriendsScreen.removeOrDenyFriend(friendName);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    const outgoingRequestsList = await FriendsScreen.getEntireFriendsList(
      "Outgoing Requests List"
    );
    await expect(outgoingRequestsList.includes(friendName)).toEqual(false);

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await (await FriendsScreen.allFriendsButton).click();
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Unblock someone from blocked friends list", async () => {
    // Go to Blocked Users Screen
    await (await FriendsScreen.blockedFriendsButton).click();

    // Get a random user from Blocked list and click on Unblock button
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Blocked List"
    );
    await FriendsScreen.removeOrDenyFriend(friendName);

    // Get the current list of Blocked list and validate that user does not appear there now
    const blockedList = await FriendsScreen.getEntireFriendsList(
      "Blocked List"
    );
    await expect(blockedList.includes(friendName)).toEqual(false);

    // Go to the current list of All friends and ensure that unblocked user is not on friends list as expected
    await (await FriendsScreen.allFriendsButton).click();
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Chat with Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await FriendsScreen.contextMenuOption[0].click();
    await ChatScreen.waitForIsShown(true);

    // Go back to Friends Screen
    await ChatScreen.goToFriends();
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Call to Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select second option "Call" from Context Menu
    await FriendsScreen.contextMenuOption[1].click();
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Add Friend to Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select third option "Favorites" from Context Menu
    await FriendsScreen.contextMenuOption[2].click();
    await expect(FriendsScreen.favoritesUserImage).toBeDisplayed();

    // Get username from Favorites
    const favoritedUser = friendName.toUpperCase();
    const currentFavorites = await FriendsScreen.getUsersFromFavorites();
    await expect(currentFavorites.includes(favoritedUser)).toEqual(true);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Remove Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select fourth option "Remove" from Context Menu
    await FriendsScreen.contextMenuOption[3].click();

    // Get current list of All friends and ensure user was removed from list
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Block Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Friends List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select last option "Favorites" from Context Menu
    await FriendsScreen.contextMenuOption[4].click();

    // Get current list of All friends and ensure that it does not include the blocked user
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);

    // Go to Blocked List and validate that user is there now
    await (await FriendsScreen.blockedFriendsButton).click();
    const blockedFriendsList = await FriendsScreen.getEntireFriendsList(
      "Blocked List"
    );
    await expect(blockedFriendsList.includes(friendName)).toEqual(true);
  });

  // Skipped because flow does not exist - But the logic would be to have this one in the context menu
  xit("Context Menu - Accept Incoming Request", async () => {});

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Deny Incoming Request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click();

    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Incoming Requests List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Deny Request" from Context Menu
    await FriendsScreen.contextMenuOption[0].click();

    // Get the current list of incoming requests and validate that user does not appear there now
    const incomingRequestsList = await FriendsScreen.getEntireFriendsList(
      "Incoming Requests List"
    );
    await expect(incomingRequestsList.includes(friendName)).toEqual(false);

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await (await FriendsScreen.allFriendsButton).click();
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Cancel Outgoing Request", async () => {
    // Go to Pending Requests Screen
    await (await FriendsScreen.pendingFriendsButton).click();

    // Get a random user from Outgoing Requests list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Outgoing Requests List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Cancel Request" from Context Menu
    await FriendsScreen.contextMenuOption[0].click();

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    const outgoingRequestsList = await FriendsScreen.getEntireFriendsList(
      "Outgoing Requests List"
    );
    await expect(outgoingRequestsList.includes(friendName)).toEqual(false);

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await (await FriendsScreen.allFriendsButton).click();
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });

  // Skipped since it will be modified to use real users instead of mock users
  xit("Context Menu - Unblock User", async () => {
    // Go to Blocked Users Screen
    await (await FriendsScreen.blockedFriendsButton).click();

    // Get a random user from Blocked list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromFriendsList(
      "Blocked List"
    );
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Unblock" from Context Menu
    await FriendsScreen.contextMenuOption[0].click();

    // Get the current list of Blocked list and validate that user does not appear there now
    const blockedList = await FriendsScreen.getEntireFriendsList(
      "Blocked List"
    );
    await expect(blockedList.includes(friendName)).toEqual(false);

    // Go to the current list of All friends and ensure that unblocked user is not on friends list, as expected
    await (await FriendsScreen.allFriendsButton).click();
    const allFriendsList = await FriendsScreen.getEntireFriendsList(
      "Friends List"
    );
    await expect(allFriendsList.includes(friendName)).toEqual(false);
  });
});

describe("Settings - General - Tests", async () => {
  it("Settings General - Validate header and description texts are correct", async () => {
    // Go to Settings Screen
    await FriendsScreen.goToSettings();
    await SettingsGeneralScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsGeneralScreen.uplinkOverlayHeader
    ).toHaveTextContaining("UPLINK OVERLAY");
    await expect(
      await SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Enable the on screen Uplink overlay. This will show active call information, as well as allow you to add custom widgets to your screen."
    );
    await expect(
      await SettingsGeneralScreen.splashScreenHeader
    ).toHaveTextContaining("SPLASH SCREEN");
    await expect(
      await SettingsGeneralScreen.splashScreenDescription
    ).toHaveTextContaining(
      "Disabling the splash screen could speed up load times."
    );
    await expect(await SettingsGeneralScreen.themeHeader).toHaveTextContaining(
      "THEME"
    );
    await expect(
      await SettingsGeneralScreen.themeDescription
    ).toHaveTextContaining("Change the theme of the app.");
    await expect(
      await SettingsGeneralScreen.resetThemeHeader
    ).toHaveTextContaining("RESET THEME");
    await expect(
      await SettingsGeneralScreen.resetThemeDescription
    ).toHaveTextContaining("Reset the theme to the default.");
    await expect(
      await SettingsGeneralScreen.appLanguageHeader
    ).toHaveTextContaining("APP LANGUAGE");
    await expect(await SettingsGeneralScreen.appLanguageDescription).toHaveText(
      "Change Language"
    );
  });

  it("Settings General - Toggle switches to enabled", async () => {
    // Click on Uplink Overlay and Splash Screen to activate toggles
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    await SettingsGeneralScreen.clickOnSplashScreen();

    // Validate that both toggles have now value = "1" (enabled)
    const uplinkOverlayState = await SettingsGeneralScreen.getToggleState(
      await SettingsGeneralScreen.uplinkOverlayControllerValue
    );
    const splashScreenState = await SettingsGeneralScreen.getToggleState(
      await SettingsGeneralScreen.splashScreenControllerValue
    );

    expect(uplinkOverlayState).toEqual("1");
    expect(splashScreenState).toEqual("1");
  });

  it("Settings General - Toggle switches to disabled", async () => {
    // Click on Uplink Overlay and Splash Screen to deactivate toggles
    await SettingsGeneralScreen.clickOnUplinkOverlay();
    await SettingsGeneralScreen.clickOnSplashScreen();

    // Validate that both toggles have now value = "0" (disabled)
    const uplinkOverlayState = await SettingsGeneralScreen.getToggleState(
      await SettingsGeneralScreen.uplinkOverlayControllerValue
    );
    const splashScreenState = await SettingsGeneralScreen.getToggleState(
      await SettingsGeneralScreen.splashScreenControllerValue
    );

    expect(uplinkOverlayState).toEqual("0");
    expect(splashScreenState).toEqual("0");
  });

  // Skipped for now since there are no themes to select
  xit("Settings General - Change theme dropdown selection", async () => {
    await SettingsGeneralScreen.clickOnThemeDropdown();
    await SettingsGeneralScreen.selectTheme("Default");
  });

  // Skipped for now since button does not perform any action
  xit("Settings General - Clear theme button", async () => {
    await SettingsGeneralScreen.clickOnResetTheme();
  });

  it("Settings General - Change language", async () => {
    // Open Language Picker and select Español México
    await SettingsGeneralScreen.clickOnAppLanguageDropdown();
    await SettingsGeneralScreen.selectAppLanguage("Español (México)");

    // Validate that language was changed to Español (México)
    await expect(
      await SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Habilitar la superposición de pantalla Uplink. Esto mostrará la información de llamadas activas y también te permitirá agregar widgets personalizados a tu pantalla."
    );
  });

  it("Settings General - Switch back language to EN-US", async () => {
    // Open Language Picker and select Español México
    await SettingsGeneralScreen.clickOnAppLanguageDropdown();
    await SettingsGeneralScreen.selectAppLanguage("English (USA)");

    // Validate that language was changed back to English (USA)
    await expect(
      await SettingsGeneralScreen.uplinkOverlayDescription
    ).toHaveTextContaining(
      "Enable the on screen Uplink overlay. This will show active call information, as well as allow you to add custom widgets to your screen."
    );
  });
});

describe("Settings - Profile - Tests", async () => {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsGeneralScreen.goToProfileSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsProfileScreen.prereleaseIndicator
    ).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await SettingsProfileScreen.buttonNav).toBeDisplayed();
    await expect(await SettingsProfileScreen.chatsButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.filesButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.friendsButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await SettingsProfileScreen.sidebar).toBeDisplayed();
    await expect(await SettingsProfileScreen.sidebarChildren).toBeDisplayed();
    await expect(await SettingsProfileScreen.sidebarSearch).toBeDisplayed();
  });

  it("Settings Profile - Assert screen and placeholder texts", async () => {
    // Assert username and status labels are displayed on screen
    await expect(
      await SettingsProfileScreen.usernameLabel
    ).toHaveTextContaining("USERNAME");
    await expect(await SettingsProfileScreen.statusLabel).toHaveTextContaining(
      "STATUS"
    );

    // Assert username and status placeholder values are displayed
    await expect(
      await SettingsProfileScreen.usernameInput
    ).toHaveTextContaining("Mock Username");
    await expect(await SettingsProfileScreen.statusInput).toHaveTextContaining(
      "Mock status messages are so 2008."
    );
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Add profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/logo.jpg"
    );
  });

  // Skipped for now since it needs research on how to implement hover on Windows Appium Driver
  xit("Settings Profile - Validate change banner tooltip", async () => {
    // Hover on banner picture
    await SettingsProfileScreen.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    await expect(SettingsProfileScreen.profileBannerTooltip).toBeDisplayed();
    await expect(
      SettingsProfileScreen.profileBannerTooltip
    ).toHaveTextContaining("Change banner");
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Add banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );
    await (await SettingsProfileScreen.usernameInput).click();
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Change profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/second-profile.png"
    );
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Change banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/second-banner.jpg"
    );
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Enter status value with more than 128 characters
    await SettingsProfileScreen.enterStatus(
      "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ).then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Maximum of 128 characters exceeded."
      );
    });

    // Clear value from status input
    await SettingsProfileScreen.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Enter username value with less than 4 characters
    await SettingsProfileScreen.enterUsername("123").then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Please enter at least 4 characters."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  // Test is failing because webdriverio handles spaces as dots and needs more research to avoid flakiness
  xit("Settings Profile - Spaces are not allowed", async () => {
    // Enter username value with spaces
    await SettingsProfileScreen.enterUsername("1234     ").then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Spaces are not allowed."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Enter username value with non-alphanumeric characters
    await SettingsProfileScreen.enterUsername("test&^%*%#$").then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Only alphanumeric characters are accepted."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Enter username value with more than 32 characters
    await SettingsProfileScreen.enterUsername(
      "12345678901234567890123456789012345"
    ).then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Maximum of 32 characters exceeded."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  // Skipped since we need to implement visual testing to test this button since element is not part of the DOM structure on Appium
  xit("Settings Profile - Status delete button", async () => {});
});

describe("Settings - Privacy - Tests", async () => {
  it("Settings Privacy - Validate header and description texts from settings sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsProfileScreen.goToPrivacySettings();
    await SettingsPrivacyScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsPrivacyScreen.backupPhraseHeader
    ).toHaveTextContaining("BACKUP RECOVERY PHRASE");
    await expect(
      await SettingsPrivacyScreen.backupPhraseDescription
    ).toHaveTextContaining(
      "Back this phrase up! Along with your password this represents your account. If you lose it, we can't help you get it back."
    );
  });

  // Test skipped since button does not perform any action now
  xit("Settings Privacy - Click on Backup Phrase", async () => {
    await SettingsPrivacyScreen.clickOnBackupPhrase();
  });
});

describe("Settings - Audio - Tests", async () => {
  it("Settings Audio - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsPrivacyScreen.goToAudioSettings();
    await SettingsAudioScreen.waitForIsShown(true);

    // Validate texts for Interface Sounds Settings Section
    await expect(
      await SettingsAudioScreen.interfaceSoundsHeader
    ).toHaveTextContaining("INTERFACE SOUNDS");
    await expect(
      await SettingsAudioScreen.interfaceSoundsDescription
    ).toHaveTextContaining(
      "When enabled, some additional sounds will play when you interact with the app."
    );

    // Validate texts for Media Sounds Settings Section
    await expect(
      await SettingsAudioScreen.mediaSoundsHeader
    ).toHaveTextContaining("MEDIA SOUNDS");
    await expect(
      await SettingsAudioScreen.mediaSoundsDescription
    ).toHaveTextContaining(
      "When enabled, media related events such as toggling microphone or headphones and other real time events, will play sounds."
    );

    // Validate texts for Message Sounds Settings Section
    await expect(
      await SettingsAudioScreen.messageSoundsHeader
    ).toHaveTextContaining("MESSAGE SOUNDS");
    await expect(
      await SettingsAudioScreen.messageSoundsDescription
    ).toHaveTextContaining(
      "When enabled you will hear a notification when a new message is received."
    );

    // Validate texts for Call Timer Settings Section
    await expect(
      await SettingsAudioScreen.callTimerHeader
    ).toHaveTextContaining("CALL TIMER");
    await expect(
      await SettingsAudioScreen.callTimerDescription
    ).toHaveTextContaining(
      "When enabled a timer will display when you're in a call showing it's duration."
    );
  });

  it("Settings Audio - Click on slider switches to enable the options", async () => {
    // Since Media Sounds and Message Sounds are enabled by default, first we need to click on these checkboxes before starting the test
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();

    // Click on the four switch sliders from the Settings Sounds & Audio Screen
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that all toggles have now value = "1" (enabled)
    const interfaceSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.interfaceSoundsControllerValue
    );
    const mediaSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.mediaSoundsControllerValue
    );
    const messageSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.messageSoundsControllerValue
    );
    const callTimerStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.callTimerControllerValue
    );

    expect(interfaceSoundsStatus).toEqual("1");
    expect(mediaSoundsStatus).toEqual("1");
    expect(messageSoundsStatus).toEqual("1");
    expect(callTimerStatus).toEqual("1");
  });

  it("Settings Audio - Click on slider switches to disable the options", async () => {
    // Click again on the four switch sliders from the Settings Sounds & Audio Screen
    await SettingsAudioScreen.clickOnInterfaceSounds();
    await SettingsAudioScreen.clickOnMediaSounds();
    await SettingsAudioScreen.clickOnMessageSounds();
    await SettingsAudioScreen.clickOnCallTimer();

    // Validate that all toggles have now value = "0" (disabled)
    const interfaceSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.interfaceSoundsControllerValue
    );
    const mediaSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.mediaSoundsControllerValue
    );
    const messageSoundsStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.messageSoundsControllerValue
    );
    const callTimerStatus = await SettingsAudioScreen.getToggleState(
      await SettingsAudioScreen.callTimerControllerValue
    );

    expect(interfaceSoundsStatus).toEqual("0");
    expect(mediaSoundsStatus).toEqual("0");
    expect(messageSoundsStatus).toEqual("0");
    expect(callTimerStatus).toEqual("0");
  });
});

describe("Settings - Files - Tests", async () => {
  it("Settings Files - Assert screen texts", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsAudioScreen.goToFilesSettings();
    await SettingsFilesScreen.waitForIsShown(true);

    // Validate LOCAL SYNC settings section texts
    await expect(
      await SettingsFilesScreen.localSyncHeader
    ).toHaveTextContaining("LOCAL SYNC");
    await expect(
      await SettingsFilesScreen.localSyncDescription
    ).toHaveTextContaining(
      "When enabled, files will be synced to your local machine."
    );

    // Validate OPEN SYNC FOLDER settings section texts
    await expect(
      await SettingsFilesScreen.openSyncFolderHeader
    ).toHaveTextContaining("OPEN SYNC FOLDER");
    await expect(
      await SettingsFilesScreen.openSyncFolderDescription
    ).toHaveTextContaining("Open the folder where your files are synced to.");
  });

  it("Settings Files - Update LOCAL SYNC switch to enabled", async () => {
    // Click on LOCAL SYNC switch to activate the option
    await SettingsFilesScreen.clickOnLocalSync();

    // Validate that switch has now value = '1' (active)
    const localSyncState = await SettingsFilesScreen.getToggleState(
      await SettingsFilesScreen.localSyncControllerValue
    );

    expect(localSyncState).toEqual("1");
  });

  it("Settings Files - Update LOCAL SYNC switch to disabled", async () => {
    // Click on LOCAL SYNC switch again to disable the option
    await SettingsFilesScreen.clickOnLocalSync();

    // Validate that switch has now value = '0' (disabled)
    const localSyncState = await SettingsFilesScreen.getToggleState(
      await SettingsFilesScreen.localSyncControllerValue
    );

    expect(localSyncState).toEqual("0");
  });

  // Test skipped for now because button does not perform any action
  xit("Settings Files - Click on Open Sync Folder button", async () => {
    await SettingsFilesScreen.clickOnOpenSyncFolder();
  });
});

describe("Settings - Extensions - Tests", async () => {
  it("Settings Extensions - Validate texts from Extension Placeholder", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsFilesScreen.goToExtensionsSettings();
    await SettingsExtensionsScreen.waitForIsShown(true);

    // Start validations
    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyHeader
    ).toHaveTextContaining("ENABLE AUTOMATICALLY");

    await expect(
      await SettingsExtensionsScreen.enableAutomaticallyDescription
    ).toHaveTextContaining(
      "When turned on, new extensions will automatically be enabled by default."
    );
  });

  it("Settings Extensions - Activate the switch slider for Enable Automatically", async () => {
    // Click on Switch from Enable Automatically to activate it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '1' (active)
    const enableAutomaticallyState =
      await SettingsExtensionsScreen.getToggleState(
        await SettingsExtensionsScreen.enableAutomaticallyControllerValue
      );

    expect(enableAutomaticallyState).toEqual("1");
  });

  it("Settings Extensions - Deactivate the switch slider for Enable Automatically", async () => {
    // Click again on Switch from Enable Automatically to disable it
    await SettingsExtensionsScreen.clickOnEnableAutomatically();

    // Validate that switch from Enable Automatically now has value = '0' (disabled)
    const enableAutomaticallyState =
      await SettingsExtensionsScreen.getToggleState(
        await SettingsExtensionsScreen.enableAutomaticallyControllerValue
      );

    expect(enableAutomaticallyState).toEqual("0");
  });

  // Skipped since it needs research on how to close external window from Explorer before proceeding with next tests
  xit("Settings Extensions - Open Extensions Folder", async () => {
    await SettingsExtensionsScreen.clickOnOpenExtensionsFolder();
  });
});

describe("Settings - Notifications - Tests", async () => {
  it("Settings - Notifications - Go To Notifications Settings", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsExtensionsScreen.goToNotificationsSettings();
    await SettingsNotificationsScreen.waitForIsShown(true);
  });
});

describe("Settings - Developer - Tests", async () => {
  it("Settings Developer - Validate headers and descriptions from Settings Sections", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsNotificationsScreen.goToDeveloperSettings();
    await SettingsDeveloperScreen.waitForIsShown(true);

    // Validate DEVELOPER MODE section
    await expect(
      await SettingsDeveloperScreen.developerModeHeader
    ).toHaveTextContaining("DEVELOPER MODE");
    await expect(
      await SettingsDeveloperScreen.developerModeDescription
    ).toHaveTextContaining(
      "Enabling developer mode adds logging and displays helpful debug information on the UI."
    );

    // Validate OPEN CODEBASE section
    await expect(
      await SettingsDeveloperScreen.openCodebaseHeader
    ).toHaveTextContaining("OPEN CODEBASE");
    await expect(
      await SettingsDeveloperScreen.openCodebaseDescription
    ).toHaveTextContaining("Opens the codebase in your default web browser.");

    // Validate TEST NOTIFICATION section
    await expect(
      await SettingsDeveloperScreen.testNotificationHeader
    ).toHaveTextContaining("TEST NOTIFICATION");
    await expect(
      await SettingsDeveloperScreen.testNotificationDescription
    ).toHaveTextContaining("Sends a test notification");

    // Validate OPEN CACHE section
    await expect(
      await SettingsDeveloperScreen.openCacheHeader
    ).toHaveTextContaining("OPEN CACHE");
    await expect(
      await SettingsDeveloperScreen.openCacheDescription
    ).toHaveTextContaining("Open the cache in your default file browser.");

    // Validate COMPRESS & DOWNLOAD CACHE section
    await expect(
      await SettingsDeveloperScreen.compressAndDownloadCacheHeader
    ).toHaveTextContaining("COMPRESS & DOWNLOAD CACHE");
    await expect(
      await SettingsDeveloperScreen.compressAndDownloadCacheDescription
    ).toHaveTextContaining(
      "For debugging with other developers, you can compress your cache to zip and share it. Don't do this if this is a real account you use."
    );

    // Validate PRINT STATE section
    await expect(
      await SettingsDeveloperScreen.printStateHeader
    ).toHaveTextContaining("PRINT STATE");
    await expect(
      await SettingsDeveloperScreen.printStateDescription
    ).toHaveTextContaining("Display State in the debug logger");

    // Validate CLEAR CACHE section
    await expect(
      await SettingsDeveloperScreen.clearCacheHeader
    ).toHaveTextContaining("CLEAR CACHE");
    await expect(
      await SettingsDeveloperScreen.clearCacheDescription
    ).toHaveTextContaining("Reset your account, basically.");

    // Validate SAVE LOGS IN A FILE section
    await expect(
      await SettingsDeveloperScreen.saveLogsHeader
    ).toHaveTextContaining("SAVE LOGS IN A FILE");
    await expect(
      await SettingsDeveloperScreen.saveLogsDescription
    ).toHaveTextContaining(
      "Enabling this option, logs will be saved in a file and will be persistent."
    );
  });

  // Needs rework to add scroll down step to the Save Logs button
  xit("Settings Developer - Enable Developer Mode and Save Logs switches", async () => {
    // Click on DEVELOPER MODE and SAVE LOGS IN FILE switches to activate the options
    await SettingsDeveloperScreen.clickOnDeveloperMode();

    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switches have now value = '1' (active)
    const developerModeStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.developerModeControllerValue
    );
    const saveLogsStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.saveLogsControllerValue
    );

    expect(developerModeStatus).toEqual("1");
    expect(saveLogsStatus).toEqual("1");
  });

  // Needs rework to add scroll down step to the Save Logs button
  xit("Settings Developer - Disable Developer Mode and Save Logs switches", async () => {
    // Click on DEVELOPER MODE and SAVE LOGS IN FILE switches to disable the options
    await SettingsDeveloperScreen.clickOnDeveloperMode();
    await SettingsDeveloperScreen.clickOnSaveLogs();

    // Validate that switches have now value = '0' (disabled)
    const developerModeStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.developerModeControllerValue
    );
    const saveLogsStatus = await SettingsDeveloperScreen.getToggleState(
      await SettingsDeveloperScreen.saveLogsControllerValue
    );

    expect(developerModeStatus).toEqual("0");
    expect(saveLogsStatus).toEqual("0");
  });

  it("Settings Developer - Open codebase button", async () => {
    await SettingsDeveloperScreen.clickOnOpenCodebase();
    await SettingsDeveloperScreen.returnToApp();
  });

  // Skipped because it needs the aria label fixed for test notifications button
  xit("Settings Developer - Click on Test Notification button", async () => {
    await SettingsDeveloperScreen.clickOnTestNotifications();
  });

  // Skipped for now because it is failing on CI - Needs research
  xit("Settings Developer - Open folder button", async () => {
    await SettingsDeveloperScreen.clickOnOpenCache();
    await SettingsDeveloperScreen.returnToApp();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Setings Developer - Compress & Download Cache", async () => {
    await SettingsDeveloperScreen.clickOnCompressAndDownloadCache();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Setings Developer - Print State button", async () => {
    await SettingsDeveloperScreen.clickOnPrintState();
  });

  // Skipped for now because no action is performed when clicking on the button
  xit("Setings Developer - Clear Cache", async () => {
    await SettingsDeveloperScreen.clickOnClearCache();
  });
});

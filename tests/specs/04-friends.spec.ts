import ChatScreen from "../screenobjects/ChatScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Friends Screen Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
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

  it("User can type on user search input bar", async () => {
    await (await FriendsScreen.addSomeoneInput).click();
    await (await FriendsScreen.addSomeoneInput).setValue("Hello");
    await expect(await FriendsScreen.addSomeoneInput).toHaveTextContaining(
      "Hello"
    );
  });

  // Skipped since it needs to be implemented
  xit("User Input Error Message is displayed when input is less than 56 characters", async () => {});

  // Skipped since it needs to be implemented
  xit("Add a friend", async () => {});

  // Skipped for now - Pending to add test steps
  xit("User can copy its own ID by clicking on button", async () => {});

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

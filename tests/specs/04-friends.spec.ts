import { resetAndLoginWithCache } from "../helpers/commands";
import ChatsLayout from "../screenobjects/chats/ChatsLayout";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import InputBar from "../screenobjects/chats/InputBar";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";

export default async function friends() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Friends Screen
    await resetAndLoginWithCache("FriendsTestUser");
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // Validate Pre Release Indicator is displayed
    await expect(FriendsScreen.prereleaseIndicator).toBeDisplayed();
    await expect(FriendsScreen.prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback"
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await FriendsScreen.chatsButton.waitForExist();
    await FriendsScreen.filesButton.waitForExist();
    await FriendsScreen.friendsButton.waitForExist();
    await FriendsScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(FriendsScreen.chatSearchInput).toBeDisplayed();
    await expect(FriendsScreen.sidebar).toBeDisplayed();
    await expect(FriendsScreen.sidebarChildren).toBeDisplayed();
    await expect(FriendsScreen.sidebarSearch).toBeDisplayed();
  });

  it("Go to Friends Screen and validate elements displayed", async () => {
    await expect(FriendsScreen.friendsLayout).toBeDisplayed();
    await expect(FriendsScreen.settingsButton).toBeDisplayed();
  });

  it("User can type on user search input bar", async () => {
    await FriendsScreen.enterFriendDidKey("Hello");
    await expect(FriendsScreen.addSomeoneInput).toHaveTextContaining("Hello");
  });

  it("Add Friend Input - Error is displayed when number of chars provided is less than expected", async () => {
    await expect(FriendsScreen.inputErrorText).toHaveTextContaining(
      "Please enter at least 9 characters."
    );
    await FriendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when non-alphanumeric chars are provided", async () => {
    await FriendsScreen.enterFriendDidKey("%%%%%%%%%%");
    await expect(FriendsScreen.inputErrorText).toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );
    await FriendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when spaces are provided", async () => {
    await FriendsScreen.enterFriendDidKey("123456789             ");
    await expect(FriendsScreen.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
    await FriendsScreen.deleteAddFriendInput();
  });

  it("User can copy its own ID by clicking on button", async () => {
    // Click on Copy ID button and grab clipboard value
    await FriendsScreen.clickOnCopyID();

    // Wait for toast notification to disappear
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Error is displayed when the user tries to add themselves", async () => {
    // Paste copied DID Key into Add Someone Input
    await FriendsScreen.pasteUserKeyInAddSomeone();

    // Click on Add Someone Button
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to disappear
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Error is displayed when number of chars provided is greater than expected", async () => {
    // Paste copied DID Key into Add Someone Input
    await FriendsScreen.pasteUserKeyInAddSomeone();

    // Add two more character to add someone input
    await FriendsScreen.enterFriendDidKey(
      "did:key:12345678901234567890123456789012345678901234567890"
    );
    await expect(FriendsScreen.inputErrorText).toHaveTextContaining(
      "Maximum of 56 characters exceeded."
    );
    await FriendsScreen.deleteAddFriendInput();
  });

  it("Switch to Pending Friends view and validate elements displayed", async () => {
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.incomingRequestsList.waitForDisplayed();
  });

  it("Switch to Blocked Friends view and validate elements displayed", async () => {
    await FriendsScreen.goToBlockedList();
    await FriendsScreen.blockedList.waitForDisplayed();
  });

  it("Switch to All Friends view and validate elements displayed", async () => {
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.friendsList.waitForDisplayed();
  });

  it("Go to Chat with Friend from Friends List", async () => {
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.chatWithFriend(friendName);

    //Validate Chat Screen is displayed and go back to Friends Screen
    await ChatsLayout.waitForIsShown(true);
  });

  it("Type a message and return to Friends Screen", async () => {
    await InputBar.typeMessageOnInput("testing...");
    await InputBar.clearInputBar();
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });

  it("Validate tooltips for Unfriend and Block buttons are displayed", async () => {
    // Validate Unfriend button tooltip
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const unfriendTooltipText = await FriendsScreen.getUserTooltipText(
      friendName
    );
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");

    // Validate Block button tooltip
    await FriendsScreen.hoverOnBlockButton(friendName);
    const blockTooltipText = await FriendsScreen.getUserTooltipText(friendName);
    await expect(blockTooltipText).toHaveTextContaining("Block");
  });

  it("Unfriend someone from Friends List", async () => {
    // Get a random user from list and unfriend it
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.removeOrCancelUser(friendName);

    // Go to Pending friends list and return to all friends list
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.goToAllFriendsList();

    // Get current list of All friends and ensure that it does not include the removed user
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await allFriendsList.includes(friendName);
    await expect(includesFriend).toEqual(false);
  });

  it("Block someone from Friends List", async () => {
    // Get a random user from list and block the user
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.blockUser(friendName);

    // Go to Blocked List and validate that user is there now
    await FriendsScreen.goToBlockedList();
    const blockedFriendsList = await FriendsScreen.getBlockedList();
    const includesFriend = await blockedFriendsList.includes(friendName);
    await expect(includesFriend).toEqual(true);

    // Get current list of All friends and ensure that it does not include the blocked user
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludesFriend = allFriendsList.includes(friendName);
    await expect(allListIncludesFriend).toEqual(false);
  });

  it("Validate tooltip for Deny Request button is displayed", async () => {
    // Go to Pending Requests Screen
    await FriendsScreen.goToPendingFriendsList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const denyTooltipText = await FriendsScreen.getUserTooltipText(friendName);
    await expect(denyTooltipText).toHaveTextContaining("Deny Request");
  });

  it("Validate tooltip for Unfriend button is displayed", async () => {
    // Validate Unfriend button tooltip from Outgoing List
    const outgoingFriendName = await FriendsScreen.getUserFromOutgoingList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(outgoingFriendName);
    const unfriendTooltipText = await FriendsScreen.getUserTooltipText(
      outgoingFriendName
    );
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");
  });

  it("Accept incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.acceptIncomingRequest(friendName);

    // Go to the current list of All friends and ensure that now includes the friend accepted
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allFriendsIncludes = await allFriendsList.includes(friendName);
    await expect(allFriendsIncludes).toEqual(true);

    // Get the current list of incoming requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    const incomingRequestsList = await FriendsScreen.getIncomingList();
    const incomingListIncludes = await incomingRequestsList.includes(
      friendName
    );
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Deny incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    const incomingRequestsList = await FriendsScreen.getIncomingList();
    const incomingListIncludes = incomingRequestsList.includes(friendName);
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Unfriend - Cancel outgoing friend request", async () => {
    // Get a random user from Outgoing Requests list and accept the request
    const friendName = await FriendsScreen.getUserFromOutgoingList();
    await FriendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    const outgoingRequestsList = await FriendsScreen.getOutgoingList();
    const outgoingListIncludes = await outgoingRequestsList.includes(
      friendName
    );
    expect(outgoingListIncludes).toEqual(false);
  });

  it("Validate tooltips for Unblock button is displayed", async () => {
    // Go to Blocked Users Screen
    await FriendsScreen.goToBlockedList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await FriendsScreen.getUserFromBlockedList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const unblockTooltipText = await FriendsScreen.getUserTooltipText(
      friendName
    );
    await expect(unblockTooltipText).toHaveTextContaining("Unblock");
  });

  it("Unblock someone from blocked friends list", async () => {
    // Get a random user from Blocked list and click on Unblock button
    const friendName = await FriendsScreen.getUserFromBlockedList();
    await FriendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that unblocked user is not on friends list as expected
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await FriendsScreen.goToBlockedList();
    const blockedList = await FriendsScreen.getBlockedList();
    const blockedListIncludes = await blockedList.includes(friendName);
    await expect(blockedListIncludes).toEqual(false);
  });

  it("Context Menu - Chat with Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    await FriendsScreen.goToAllFriendsList();
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await FriendsScreen.contextMenuOption[0].click();
    await ChatsLayout.waitForIsShown(true);
    await InputBar.typeMessageOnInput("testing...");
    await InputBar.clearInputBar();

    // Go back to Friends Screen
    await ChatsLayout.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });

  it("Context Menu - Add Friend to Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    let friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select second option "Favorites" from Context Menu
    await FriendsScreen.contextMenuOption[1].click();

    // Validate that username and user image bubble is now displayed on Favorites Sidebar
    await FriendsScreen.favorites.waitForDisplayed();
    // Favorites Sidebar should be displayed
    await expect(ChatsLayout.favoritesUserImage).toBeDisplayed();
    await expect(ChatsLayout.favoritesUserIndicatorOffline).toBeDisplayed();
    await expect(ChatsLayout.favoritesUserName).toHaveTextContaining(
      friendName.toUpperCase()
    );
  });

  it("Context Menu - Remove Friend from Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select second option "Remove from Favorites" from Context Menu
    await FriendsScreen.contextMenuOption[1].click();

    // Validate that favorites is hidden now
    await FriendsScreen.favorites.waitForExist({ reverse: true });
  });

  it("Context Menu - Remove Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select fourth option "Remove" from Context Menu
    await FriendsScreen.contextMenuOption[2].click();

    // Go to pending list and return to all friends list
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.goToAllFriendsList();

    // Get current list of All friends and ensure user was removed from list
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);
  });

  it("Context Menu - Block Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select last option "Block" from Context Menu
    await FriendsScreen.contextMenuOption[2].click();

    // Go to Blocked List and validate that user is there now
    await FriendsScreen.goToBlockedList();
    const blockedFriendsList = await FriendsScreen.getBlockedList();
    const blockedListIncludes = await blockedFriendsList.includes(friendName);
    await expect(blockedListIncludes).toEqual(true);

    // Get current list of All friends and ensure that it does not include the blocked user
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);
  });

  it("Context Menu - Accept Incoming Request", async () => {
    // Go to Pending Requests Screen
    await FriendsScreen.goToPendingFriendsList();

    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Accept" from Context Menu
    await FriendsScreen.contextMenuOption[0].click();

    // Go to the current list of All friends and ensure that accepted user is now in friends list
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(true);

    // Get the current list of incoming requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    const incomingRequestsList = await FriendsScreen.getIncomingList();
    const incomingListIncludes = await incomingRequestsList.includes(
      friendName
    );
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Context Menu - Deny Incoming Request", async () => {
    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Deny Request" from Context Menu
    await FriendsScreen.contextMenuOption[1].click();

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    const incomingRequestsList = await FriendsScreen.getIncomingList();
    const incomingListIncludes = await incomingRequestsList.includes(
      friendName
    );
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Context Menu - Cancel Outgoing Request", async () => {
    // Get a random user from Outgoing Requests list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromOutgoingList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Cancel Request" from Context Menu
    await FriendsScreen.contextMenuOption[0].click();

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    const outgoingRequestsList = await FriendsScreen.getOutgoingList();
    const outgoingListIncludes = outgoingRequestsList.includes(friendName);
    await expect(outgoingListIncludes).toEqual(false);
  });

  it("Context Menu - Unblock User", async () => {
    // Go to Blocked Users Screen
    await FriendsScreen.goToBlockedList();

    // Get a random user from Blocked list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromBlockedList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Unblock" from Context Menu
    await FriendsScreen.contextMenuOption[0].click();

    // Go to the current list of All friends and ensure that unblocked user is not on friends list, as expected
    await FriendsScreen.goToAllFriendsList();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await FriendsScreen.goToBlockedList();
    const blockedList = await FriendsScreen.getBlockedList();
    const blockedListIncludes = await blockedList.includes(friendName);
    await expect(blockedListIncludes).toEqual(false);
  });
}

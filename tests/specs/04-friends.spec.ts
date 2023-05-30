import { resetAndLoginWithCache } from "../helpers/commands";
import ChatsLayout from "../screenobjects/chats/ChatsLayout";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import InputBar from "../screenobjects/chats/InputBar";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let chatsInputFirstUser = new InputBar("userA");
let chatsLayoutFirstUser = new ChatsLayout("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

export default async function friends() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Friends Screen
    await resetAndLoginWithCache("FriendsTestUser");
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);

    // Validate Pre Release Indicator is displayed
    await expect(friendsScreenFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      friendsScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await friendsScreenFirstUser.chatsButton.waitForExist();
    await friendsScreenFirstUser.filesButton.waitForExist();
    await friendsScreenFirstUser.friendsButton.waitForExist();
    await friendsScreenFirstUser.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(friendsScreenFirstUser.chatSearchInput).toBeDisplayed();
    await expect(friendsScreenFirstUser.sidebar).toBeDisplayed();
    await expect(friendsScreenFirstUser.sidebarChildren).toBeDisplayed();
    await expect(friendsScreenFirstUser.sidebarSearch).toBeDisplayed();
  });

  it("Go to Friends Screen and validate elements displayed", async () => {
    await expect(friendsScreenFirstUser.friendsLayout).toBeDisplayed();
    await expect(friendsScreenFirstUser.settingsButton).toBeDisplayed();
  });

  it("User can type on user search input bar", async () => {
    await friendsScreenFirstUser.enterFriendDidKey("Hello");
    await expect(friendsScreenFirstUser.addSomeoneInput).toHaveTextContaining(
      "Hello"
    );
  });

  it("Add Friend Input - Error is displayed when number of chars provided is less than expected", async () => {
    await expect(friendsScreenFirstUser.inputErrorText).toHaveTextContaining(
      "Please enter at least 9 characters."
    );
    await friendsScreenFirstUser.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when non-alphanumeric chars are provided", async () => {
    await friendsScreenFirstUser.enterFriendDidKey("%%%%%%%%%%");
    await expect(friendsScreenFirstUser.inputErrorText).toHaveTextContaining(
      "Only alphanumeric characters are accepted."
    );
    await friendsScreenFirstUser.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when spaces are provided", async () => {
    await friendsScreenFirstUser.enterFriendDidKey("123456789             ");
    await expect(friendsScreenFirstUser.inputErrorText).toHaveTextContaining(
      "Spaces are not allowed."
    );
    await friendsScreenFirstUser.deleteAddFriendInput();
  });

  it("User can copy its own ID by clicking on button", async () => {
    // Click on Copy ID button and grab clipboard value
    await friendsScreenFirstUser.clickOnCopyID();

    // Wait for toast notification to disappear
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Error is displayed when the user tries to add themselves", async () => {
    // Paste copied DID Key into Add Someone Input
    await friendsScreenFirstUser.pasteUserKeyInAddSomeone();

    // Click on Add Someone Button
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to disappear
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Error is displayed when number of chars provided is greater than expected", async () => {
    // Paste copied DID Key into Add Someone Input
    await friendsScreenFirstUser.pasteUserKeyInAddSomeone();

    // Add two more character to add someone input
    await friendsScreenFirstUser.enterFriendDidKey(
      "did:key:12345678901234567890123456789012345678901234567890"
    );
    await expect(friendsScreenFirstUser.inputErrorText).toHaveTextContaining(
      "Maximum of 56 characters exceeded."
    );
    await friendsScreenFirstUser.deleteAddFriendInput();
  });

  it("Switch to Pending Friends view and validate elements displayed", async () => {
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.incomingRequestsList.waitForDisplayed();
  });

  it("Switch to Blocked Friends view and validate elements displayed", async () => {
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.blockedList.waitForDisplayed();
  });

  it("Switch to All Friends view and validate elements displayed", async () => {
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.friendsList.waitForDisplayed();
  });

  it("Go to Chat with Friend from Friends List", async () => {
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.chatWithFriend(friendName);

    //Validate Chat Screen is displayed and go back to Friends Screen
    await chatsLayoutFirstUser.waitForIsShown(true);
  });

  it("Type a message and return to Friends Screen", async () => {
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await chatsInputFirstUser.clearInputBar();
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
  });

  it("Validate tooltips for Unfriend and Block buttons are displayed", async () => {
    // Validate Unfriend button tooltip
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(friendName);
    const unfriendTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");

    // Validate Block button tooltip
    await friendsScreenFirstUser.hoverOnBlockButton(friendName);
    const blockTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(blockTooltipText).toHaveTextContaining("Block");
  });

  it("Unfriend someone from Friends List", async () => {
    // Get a random user from list and unfriend it
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.removeOrCancelUser(friendName);

    // Go to Pending friends list and return to all friends list
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.goToAllFriendsList();

    // Get current list of All friends and ensure that it does not include the removed user
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const includesFriend = await allFriendsList.includes(friendName);
    await expect(includesFriend).toEqual(false);
  });

  it("Block someone from Friends List", async () => {
    // Get a random user from list and block the user
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.blockUser(friendName);

    // Go to Blocked List and validate that user is there now
    await friendsScreenFirstUser.goToBlockedList();
    const blockedFriendsList = await friendsScreenFirstUser.getBlockedList();
    const includesFriend = await blockedFriendsList.includes(friendName);
    await expect(includesFriend).toEqual(true);

    // Get current list of All friends and ensure that it does not include the blocked user
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludesFriend = allFriendsList.includes(friendName);
    await expect(allListIncludesFriend).toEqual(false);
  });

  it("Validate tooltip for Deny Request button is displayed", async () => {
    // Go to Pending Requests Screen
    await friendsScreenFirstUser.goToPendingFriendsList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await friendsScreenFirstUser.getUserFromIncomingList();
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(friendName);
    const denyTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(denyTooltipText).toHaveTextContaining("Deny Request");
  });

  it("Validate tooltip for Unfriend button is displayed", async () => {
    // Validate Unfriend button tooltip from Outgoing List
    const outgoingFriendName =
      await friendsScreenFirstUser.getUserFromOutgoingList();
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(
      outgoingFriendName
    );
    const unfriendTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      outgoingFriendName
    );
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");
  });

  it("Accept incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await friendsScreenFirstUser.getUserFromIncomingList();
    await friendsScreenFirstUser.acceptIncomingRequest(friendName);

    // Go to the current list of All friends and ensure that now includes the friend accepted
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allFriendsIncludes = await allFriendsList.includes(friendName);
    await expect(allFriendsIncludes).toEqual(true);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    const incomingRequestsList = await friendsScreenFirstUser.getIncomingList();
    const incomingListIncludes = await incomingRequestsList.includes(
      friendName
    );
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Deny incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await friendsScreenFirstUser.getUserFromIncomingList();
    await friendsScreenFirstUser.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    const incomingRequestsList = await friendsScreenFirstUser.getIncomingList();
    const incomingListIncludes = incomingRequestsList.includes(friendName);
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Unfriend - Cancel outgoing friend request", async () => {
    // Get a random user from Outgoing Requests list and accept the request
    const friendName = await friendsScreenFirstUser.getUserFromOutgoingList();
    await friendsScreenFirstUser.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    const outgoingRequestsList = await friendsScreenFirstUser.getOutgoingList();
    const outgoingListIncludes = await outgoingRequestsList.includes(
      friendName
    );
    expect(outgoingListIncludes).toEqual(false);
  });

  it("Validate tooltips for Unblock button is displayed", async () => {
    // Go to Blocked Users Screen
    await friendsScreenFirstUser.goToBlockedList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await friendsScreenFirstUser.getUserFromBlockedList();
    await friendsScreenFirstUser.hoverOnUnfriendDenyUnblockButton(friendName);
    const unblockTooltipText = await friendsScreenFirstUser.getUserTooltipText(
      friendName
    );
    await expect(unblockTooltipText).toHaveTextContaining("Unblock");
  });

  it("Unblock someone from blocked friends list", async () => {
    // Get a random user from Blocked list and click on Unblock button
    const friendName = await friendsScreenFirstUser.getUserFromBlockedList();
    await friendsScreenFirstUser.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that unblocked user is not on friends list as expected
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await friendsScreenFirstUser.goToBlockedList();
    const blockedList = await friendsScreenFirstUser.getBlockedList();
    const blockedListIncludes = await blockedList.includes(friendName);
    await expect(blockedListIncludes).toEqual(false);
  });

  it("Context Menu - Chat with Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    await friendsScreenFirstUser.goToAllFriendsList();
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await friendsScreenFirstUser.clickOnContextMenuChat();
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await chatsInputFirstUser.clearInputBar();

    // Go back to Friends Screen
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.waitForIsShown(true);
  });

  it("Context Menu - Add Friend to Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    let friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select second option "Favorites" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuFavoritesAdd();

    // Validate that username and user image bubble is now displayed on Favorites Sidebar
    await friendsScreenFirstUser.favorites.waitForDisplayed();
    // Favorites Sidebar should be displayed
    await expect(chatsLayoutFirstUser.favoritesUserImage).toBeDisplayed();
    await expect(
      chatsLayoutFirstUser.favoritesUserIndicatorOffline
    ).toBeDisplayed();
    await expect(chatsLayoutFirstUser.favoritesUserName).toHaveTextContaining(
      friendName.toUpperCase()
    );
  });

  it("Context Menu - Remove Friend from Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select second option "Remove from Favorites" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuFavoritesRemove();

    // Validate that favorites is hidden now
    await friendsScreenFirstUser.favorites.waitForExist({ reverse: true });
  });

  it("Context Menu - Remove Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select fourth option "Remove" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuRemove();

    // Go to pending list and return to all friends list
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.goToAllFriendsList();

    // Get current list of All friends and ensure user was removed from list
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);
  });

  it("Context Menu - Block Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select last option "Block" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuBlock();

    // Go to Blocked List and validate that user is there now
    await friendsScreenFirstUser.goToBlockedList();
    const blockedFriendsList = await friendsScreenFirstUser.getBlockedList();
    const blockedListIncludes = await blockedFriendsList.includes(friendName);
    await expect(blockedListIncludes).toEqual(true);

    // Get current list of All friends and ensure that it does not include the blocked user
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);
  });

  it("Context Menu - Accept Incoming Request", async () => {
    // Go to Pending Requests Screen
    await friendsScreenFirstUser.goToPendingFriendsList();

    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await friendsScreenFirstUser.getUserFromIncomingList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select the only option "Accept" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuIncomingAccept();

    // Go to the current list of All friends and ensure that accepted user is now in friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(true);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    const incomingRequestsList = await friendsScreenFirstUser.getIncomingList();
    const incomingListIncludes = await incomingRequestsList.includes(
      friendName
    );
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Context Menu - Deny Incoming Request", async () => {
    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await friendsScreenFirstUser.getUserFromIncomingList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select the only option "Deny Request" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuIncomingDeny();

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    const incomingRequestsList = await friendsScreenFirstUser.getIncomingList();
    const incomingListIncludes = await incomingRequestsList.includes(
      friendName
    );
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Context Menu - Cancel Outgoing Request", async () => {
    // Get a random user from Outgoing Requests list and right click on it to get the context menu
    const friendName = await friendsScreenFirstUser.getUserFromOutgoingList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select the only option "Cancel Request" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuOutgoingCancel();

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    const outgoingRequestsList = await friendsScreenFirstUser.getOutgoingList();
    const outgoingListIncludes = outgoingRequestsList.includes(friendName);
    await expect(outgoingListIncludes).toEqual(false);
  });

  it("Context Menu - Unblock User", async () => {
    // Go to Blocked Users Screen
    await friendsScreenFirstUser.goToBlockedList();

    // Get a random user from Blocked list and right click on it to get the context menu
    const friendName = await friendsScreenFirstUser.getUserFromBlockedList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select the only option "Unblock" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuUnblock();

    // Go to the current list of All friends and ensure that unblocked user is not on friends list, as expected
    await friendsScreenFirstUser.goToAllFriendsList();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await friendsScreenFirstUser.goToBlockedList();
    const blockedList = await friendsScreenFirstUser.getBlockedList();
    const blockedListIncludes = await blockedList.includes(friendName);
    await expect(blockedListIncludes).toEqual(false);
  });
}

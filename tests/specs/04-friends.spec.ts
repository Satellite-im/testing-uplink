require("module-alias/register");
import { resetAndLoginWithCache } from "@helpers/commands";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import {
  CHAT_USER_B_ID,
  CHAT_USER_C_ID,
  CHAT_USER_J_ID,
} from "@helpers/constants";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
const users = ["ChatUserB", "ChatUserC", "ChatUserD"];

export default async function friendsTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await resetAndLoginWithCache("FriendsTestUser");
    await CreatePinScreen.loginWithTestUser();

    // Go to Friends Screen
    await WelcomeScreen.goToFriends();

    // Validate Pre Release Indicator is displayed
    await FriendsScreen.releaseIndicator.waitForExist();
    const releaseIndicatorText = await FriendsScreen.releaseIndicatorText;
    await expect(releaseIndicatorText).toHaveText("Alpha | Issues/Feedback");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await FriendsScreen.chatsButton.waitForExist();
    await FriendsScreen.filesButton.waitForExist();
    await FriendsScreen.friendsButton.waitForExist();
    await FriendsScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await ChatsSidebar.chatSearchInput.waitForExist();
    await ChatsSidebar.sidebar.waitForExist();
    await ChatsSidebar.sidebarChildren.waitForExist();
    await ChatsSidebar.sidebarSearch.waitForExist();
  });

  it("Go to Friends Screen and validate elements displayed", async () => {
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Friends Screen - Displays a badge showing 4 pending requests on Navigation Bar ", async () => {
    await FriendsScreen.buttonNavBarButtonBadge.waitForExist();
    const buttonBadgeText = await FriendsScreen.buttonNavBarButtonBadgeText;
    await expect(buttonBadgeText).toHaveText("4");
  });

  it("Friends Screen - Displays a badge showing 4 pending requests on Pending Friends Button", async () => {
    await FriendsScreen.friendsButtonBadge.waitForExist();
    const buttonBadgeText = await FriendsScreen.friendsButtonBadgeText;
    await expect(buttonBadgeText).toHaveText("4");
  });

  it("User can type on user search input bar", async () => {
    await FriendsScreen.enterFriendDidKey("Hello");

    const addSomeoneInput = await FriendsScreen.addSomeoneInput;
    await expect(addSomeoneInput).toHaveText("Hello");
  });

  it("Add Friend Input - Error is displayed when number of chars provided is less than expected", async () => {
    const inputError = await FriendsScreen.inputErrorText;
    await expect(inputError).toHaveText("Please enter at least 9 characters.");
    await FriendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when non-alphanumeric chars are provided", async () => {
    await FriendsScreen.enterFriendDidKey("%%%%%%%%%%");

    const inputError = await FriendsScreen.inputErrorText;
    await expect(inputError).toHaveText("Not allowed character(s): %");
    await FriendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when spaces are provided", async () => {
    await FriendsScreen.enterFriendDidKey("123456789             ");

    const inputError = await FriendsScreen.inputErrorText;
    await expect(inputError).toHaveText("Spaces are not allowed.");
    await FriendsScreen.deleteAddFriendInput();
  });

  it("User can copy its own username by clicking on button", async () => {
    // Click on Copy ID button
    await FriendsScreen.clickOnCopyID();

    // Wait for toast notification to disappear
    await FriendsScreen.waitUntilNotificationIsClosed();

    // Validate value copied from Copy ID is correct
    await FriendsScreen.pasteUserKeyInAddSomeone();
    const clipboardText = await FriendsScreen.getValueFromAddSomeoneInput();
    await expect(clipboardText).toHaveText(
      expect.stringContaining("ChatUserA#"),
    );
  });

  it("User can copy its own DID key using the context menu from Copy Button", async () => {
    // Right Click on Copy ID button and select Copy DID
    await FriendsScreen.openCopyIDContextMenu();
    await FriendsScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to disappear
    await FriendsScreen.waitUntilNotificationIsClosed();

    // Validate value copied from Copy DID is correct
    await FriendsScreen.pasteUserKeyInAddSomeone();
    const clipboardText = await FriendsScreen.getValueFromAddSomeoneInput();
    await expect(clipboardText).toHaveText(expect.stringContaining("did:key"));
  });

  it("User can copy its own username using the context menu from Copy Button", async () => {
    // Right Click on Copy ID button and select Copy ID
    await FriendsScreen.openCopyIDContextMenu();
    await FriendsScreen.clickOnContextMenuCopyId();

    // Wait for toast notification to disappear
    await FriendsScreen.waitUntilNotificationIsClosed();

    // Validate value copied from Copy ID is correct
    await FriendsScreen.pasteUserKeyInAddSomeone();
    const clipboardText = await FriendsScreen.getValueFromAddSomeoneInput();
    await expect(clipboardText).toHaveText(
      expect.stringContaining("ChatUserA#"),
    );
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
      "did:key:1234567890123456789012345678901234567890123456789",
    );

    const inputError = await FriendsScreen.inputErrorText;
    await expect(inputError).toHaveText("Maximum of 56 characters exceeded.");
    await FriendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Attempt to send friend request to a user with outgoing pending request", async () => {
    // Attempt to send a friend request to ChatUserL, who already received a not accepted yet friend request before
    await FriendsScreen.enterFriendDidKey(CHAT_USER_J_ID);

    // Click on Add Someone Button
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "Friend request is already pending!" is gone
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Attempt to send friend request again to a user who is already your friend", async () => {
    // Attempt to send a friend request to ChatUserB, who is already a friend
    await FriendsScreen.enterFriendDidKey(CHAT_USER_B_ID);

    // Click on Add Someone Button
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "You are already friends!" is gone
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Switch to Pending Friends view and validate elements displayed", async () => {
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
  });

  it("Switch to Blocked Friends view and validate elements displayed", async () => {
    // Go to blocked list and validate that No Requests text is shown
    await FriendsScreen.goToBlockedList();
    await FriendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await FriendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });

  it("Switch to All Friends view and validate elements displayed", async () => {
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
  });

  it("Favorites - Open Chat conversations with multiple users on Sidebar - Chat User B", async () => {
    // Open friend Context Menu of Chat User B
    await FriendsScreen.openFriendContextMenu(users[0]);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await FriendsScreen.clickOnContextMenuChat();
    await ChatsLayout.validateChatLayoutIsShown();
    await InputBar.typeMessageOnInput("Testing...");
    await InputBar.clearInputBar();

    // Go back to Friends Screen
    await ChatsLayout.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Favorites - Open Chat conversations with multiple users on Sidebar - Chat User C", async () => {
    // Open friend Context Menu of ChatUserC
    await FriendsScreen.openFriendContextMenu(users[1]);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await FriendsScreen.clickOnContextMenuChat();
    await ChatsLayout.validateChatLayoutIsShown();
    await InputBar.typeMessageOnInput("Testing...");
    await InputBar.clearInputBar();

    // Go back to Friends Screen
    await ChatsLayout.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Favorites - Open Chat conversations with multiple users on Sidebar - Chat User D", async () => {
    // Open friend Context Menu of ChatUserD
    await FriendsScreen.openFriendContextMenu(users[2]);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await FriendsScreen.clickOnContextMenuChat();
    await ChatsLayout.validateChatLayoutIsShown();
    await InputBar.typeMessageOnInput("Testing...");
    await InputBar.clearInputBar();

    // Go back to Friends Screen
    await ChatsLayout.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Favorites - Add multiple users to Favorites - User 1", async () => {
    // Open friend Context Menu for first user
    await FriendsScreen.openFriendContextMenu(users[0]);

    // Select "Favorites" from Context Menu to Add the user to Favorites
    await FriendsScreen.clickOnContextMenuFavoritesAdd();
  });

  it("Favorites - Add multiple users to Favorites - User 2", async () => {
    // Open friend Context Menu for second user
    await FriendsScreen.openFriendContextMenu(users[1]);

    // Select "Favorites" from Context Menu to Add the user to Favorites
    await FriendsScreen.clickOnContextMenuFavoritesAdd();
  });

  it("Favorites - Add multiple users to Favorites - User 3", async () => {
    // Open friend Context Menu for third user
    await FriendsScreen.openFriendContextMenu(users[2]);

    // Select "Favorites" from Context Menu to Add the user to Favorites
    await FriendsScreen.clickOnContextMenuFavoritesAdd();
  });

  it("Favorites - Validate Sidebar Favorites is displayed after adding users to favorites", async () => {
    // Validate that Favorites Sidebar is displayed
    await FavoritesSidebar.slimbar.waitForExist();
  });

  it("Favorites - Remove all users from Favorites - User 1", async () => {
    // Open Context Menu from first user listed in Friends List
    await FriendsScreen.openFriendContextMenu(users[0]);

    // Select second option "Remove from Favorites" from Context Menu
    await FriendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Favorites - Remove all users from Favorites - User 2", async () => {
    // Open Context Menu from second user listed in Friends List
    await FriendsScreen.openFriendContextMenu(users[1]);

    // Select second option "Remove from Favorites" from Context Menu
    await FriendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Favorites - Remove all users from Favorites - User 3", async () => {
    // Open Context Menu from third user listed in Friends List
    await FriendsScreen.openFriendContextMenu(users[2]);

    // Select second option "Remove from Favorites" from Context Menu
    await FriendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Go to Chat with Friend from Friends List", async () => {
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.chatWithFriend(friendName);

    //Validate Chat Screen is displayed and go back to Friends Screen
    await ChatsLayout.validateChatLayoutIsShown();
  });

  it("Type a message and return to Friends Screen", async () => {
    await InputBar.typeMessageOnInput("Testing...");
    await InputBar.clearInputBar();
    await ChatsLayout.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Validate tooltips for Unfriend and Block buttons are displayed", async () => {
    // Validate Unfriend button tooltip
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const unfriendTooltipText =
      await FriendsScreen.getUserTooltipText(friendName);
    await expect(unfriendTooltipText).toHaveText("Unfriend");

    // Validate Block button tooltip
    await FriendsScreen.hoverOnBlockButton(friendName);
    const blockTooltipText = await FriendsScreen.getUserTooltipText(friendName);
    await expect(blockTooltipText).toHaveText("Block");
  });

  it("Unfriend someone from Friends List", async () => {
    // Get a random user from list and unfriend it
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.removeOrCancelUser(friendName);

    // Go to Pending friends list and return to all friends list
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();

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
    await FriendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get current list of All friends and ensure that it does not include the blocked user
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludesFriend = allFriendsList.includes(friendName);
    await expect(allListIncludesFriend).toEqual(false);
  });

  it("Add Friend Input - Attempt to send friend request to a blocked user", async () => {
    // Attempt to send a friend request to ChatUserC, who was recently blocked
    await FriendsScreen.enterFriendDidKey(CHAT_USER_C_ID);

    // Click on Add Someone Button
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "Key Blocked" is gone
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Validate tooltip for Deny Request button is displayed", async () => {
    // Go to Pending Requests Screen
    await FriendsScreen.goToPendingFriendsList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const denyTooltipText = await FriendsScreen.getUserTooltipText(friendName);
    await expect(denyTooltipText).toHaveText("Deny Request");
  });

  it("Validate tooltip for Unfriend button is displayed", async () => {
    // Validate Unfriend button tooltip from Outgoing List
    const outgoingFriendName = await FriendsScreen.getUserFromOutgoingList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(outgoingFriendName);
    const unfriendTooltipText =
      await FriendsScreen.getUserTooltipText(outgoingFriendName);
    await expect(unfriendTooltipText).toHaveText("Unfriend");
  });

  it("Accept incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.acceptIncomingRequest(friendName);

    // Go to the current list of All friends and ensure that now includes the friend accepted
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    const incomingRequestsList = await FriendsScreen.getIncomingList();
    const incomingListIncludes =
      await incomingRequestsList.includes(friendName);
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Deny incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
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
    await FriendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateOutgoingListIsShown();
    const outgoingRequestsList = await FriendsScreen.getOutgoingList();
    const outgoingListIncludes =
      await outgoingRequestsList.includes(friendName);
    expect(outgoingListIncludes).toEqual(false);
  });

  it("Validate tooltips for Unblock button is displayed", async () => {
    // Go to Blocked Users Screen
    await FriendsScreen.goToBlockedList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await FriendsScreen.getUserFromBlockedList();
    await FriendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const unblockTooltipText =
      await FriendsScreen.getUserTooltipText(friendName);
    await expect(unblockTooltipText).toHaveText("Unblock");
  });

  it("Unblock someone from blocked friends list", async () => {
    // Get a random user from Blocked list and click on Unblock button
    const friendName = await FriendsScreen.getUserFromBlockedList();
    await FriendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that unblocked user is not on friends list as expected
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await FriendsScreen.goToBlockedList();
    await FriendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await FriendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });

  it("Context Menu - Chat with Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    await FriendsScreen.goToAllFriendsList();
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await FriendsScreen.clickOnContextMenuChat();
    await ChatsLayout.chatLayout.waitForExist();
    await InputBar.typeMessageOnInput("Testing...");
    await InputBar.clearInputBar();

    // Go back to Friends Screen
    await ChatsLayout.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Context Menu - Add friend to Favorites and contents displayed on Favorites Sidebar", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select second option "Favorites" from Context Menu
    await FriendsScreen.clickOnContextMenuFavoritesAdd();

    // Validate that username and user image bubble is now displayed on Favorites Sidebar
    await FavoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image and indicator offline
    const favoritesImage =
      await FavoritesSidebar.getFavoritesUserImage("ChatUserD");
    await favoritesImage.waitForExist();
  });

  it("Context Menu - Remove Friend from Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select second option "Remove from Favorites" from Context Menu
    await FriendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Context Menu - Remove Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await FriendsScreen.getUserFromAllFriendsList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select fourth option "Remove" from Context Menu
    await FriendsScreen.clickOnContextMenuRemove();

    // Go to pending list and return to all friends list
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();

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
    await FriendsScreen.clickOnContextMenuBlock();

    // Go to Blocked List and validate that user is there now
    await FriendsScreen.goToBlockedList();
    await FriendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get current list of All friends and ensure that it does not include the blocked user
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
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
    await FriendsScreen.clickOnContextMenuIncomingAccept();

    // Go to the current list of All friends and ensure that accepted user is now in friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    const incomingRequestsList = await FriendsScreen.getIncomingList();
    const incomingListIncludes =
      await incomingRequestsList.includes(friendName);
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Context Menu - Deny Incoming Request", async () => {
    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromIncomingList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Deny Request" from Context Menu
    await FriendsScreen.clickOnContextMenuIncomingDeny();

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Go to Pending Requests and ensure that only Outgoing list is displayed on screen
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsNotShown();
    await FriendsScreen.validateOutgoingListIsShown();
  });

  it("Context Menu - Cancel Outgoing Request", async () => {
    // Get a random user from Outgoing Requests list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromOutgoingList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Cancel Request" from Context Menu
    await FriendsScreen.clickOnContextMenuOutgoingCancel();

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await FriendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });

  it("Context Menu - Unblock User", async () => {
    // Go to Blocked Users Screen
    await FriendsScreen.goToBlockedList();

    // Get a random user from Blocked list and right click on it to get the context menu
    const friendName = await FriendsScreen.getUserFromBlockedList();
    await FriendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Unblock" from Context Menu
    await FriendsScreen.clickOnContextMenuUnblock();

    // Go to the current list of All friends and ensure that unblocked user is not on friends list, as expected
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await FriendsScreen.goToBlockedList();
    await FriendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await FriendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });
}

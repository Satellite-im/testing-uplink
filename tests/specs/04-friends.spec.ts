require("module-alias/register");
import { getClipboardValue, resetAndLoginWithCache } from "@helpers/commands";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import {
  CHAT_USER_B_ID,
  CHAT_USER_C_ID,
  CHAT_USER_J_ID,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
const chatsInput = new InputBar();
const chatsLayout = new ChatsLayout();
const chatsSidebar = new ChatsSidebar();
const favoritesSidebar = new FavoritesSidebar();
const friendsScreen = new FriendsScreen();
const uplinkMain = new UplinkMainScreen();
const users = ["ChatUserB", "ChatUserC", "ChatUserD"];

export default async function friendsTests() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await resetAndLoginWithCache("FriendsTestUser");

    // Go to Friends Screen
    await uplinkMain.goToFriends();

    // Validate Pre Release Indicator is displayed
    await friendsScreen.prereleaseIndicator.waitForExist();
    const prereleaseIndicatorText = await friendsScreen.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback",
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await friendsScreen.chatsButton.waitForExist();
    await friendsScreen.filesButton.waitForExist();
    await friendsScreen.friendsButton.waitForExist();
    await friendsScreen.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await chatsSidebar.chatSearchInput.waitForExist();
    await chatsSidebar.sidebar.waitForExist();
    await chatsSidebar.sidebarChildren.waitForExist();
    await chatsSidebar.sidebarSearch.waitForExist();
  });

  it("Go to Friends Screen and validate elements displayed", async () => {
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Friends Screen - Displays a badge showing 4 pending requests on Navigation Bar ", async () => {
    await friendsScreen.buttonNavBarButtonBadge.waitForExist();
    const buttonBadgeText = await friendsScreen.buttonNavBarButtonBadgeText;
    await expect(buttonBadgeText).toHaveTextContaining("4");
  });

  it("Friends Screen - Displays a badge showing 4 pending requests on Pending Friends Button", async () => {
    await friendsScreen.friendsButtonBadge.waitForExist();
    const buttonBadgeText = await friendsScreen.friendsButtonBadgeText;
    await expect(buttonBadgeText).toHaveTextContaining("4");
  });

  it("User can type on user search input bar", async () => {
    await friendsScreen.enterFriendDidKey("Hello");

    const addSomeoneInput = await friendsScreen.addSomeoneInput;
    await expect(addSomeoneInput).toHaveTextContaining("Hello");
  });

  it("Add Friend Input - Error is displayed when number of chars provided is less than expected", async () => {
    const inputError = await friendsScreen.inputErrorText;
    await expect(inputError).toHaveTextContaining(
      "Please enter at least 9 characters.",
    );
    await friendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when non-alphanumeric chars are provided", async () => {
    await friendsScreen.enterFriendDidKey("%%%%%%%%%%");

    const inputError = await friendsScreen.inputErrorText;
    await expect(inputError).toHaveTextContaining(
      "Not allowed character(s): %",
    );
    await friendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when spaces are provided", async () => {
    await friendsScreen.enterFriendDidKey("123456789             ");

    const inputError = await friendsScreen.inputErrorText;
    await expect(inputError).toHaveTextContaining("Spaces are not allowed.");
    await friendsScreen.deleteAddFriendInput();
  });

  it("User can copy its own username by clicking on button", async () => {
    // Click on Copy ID button
    await friendsScreen.clickOnCopyID();

    // Wait for toast notification to disappear
    await friendsScreen.waitUntilNotificationIsClosed();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toContain("ChatUserA#");
  });

  it("User can copy its own DID key using the context menu from Copy Button", async () => {
    // Right Click on Copy ID button and select Copy DID
    await friendsScreen.openCopyIDContextMenu();
    await friendsScreen.clickOnContextMenuCopyDidKey();

    // Wait for toast notification to disappear
    await friendsScreen.waitUntilNotificationIsClosed();

    // Validate clipboard text contains Did Key
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toContain("did:key");
  });

  it("User can copy its own username using the context menu from Copy Button", async () => {
    // Right Click on Copy ID button and select Copy ID
    await friendsScreen.openCopyIDContextMenu();
    await friendsScreen.clickOnContextMenuCopyId();

    // Wait for toast notification to disappear
    await friendsScreen.waitUntilNotificationIsClosed();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toContain("ChatUserA#");
  });

  it("Add Friend Input - Error is displayed when the user tries to add themselves", async () => {
    // Paste copied DID Key into Add Someone Input
    await friendsScreen.pasteUserKeyInAddSomeone();

    // Click on Add Someone Button
    await friendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to disappear
    await friendsScreen.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Error is displayed when number of chars provided is greater than expected", async () => {
    // Paste copied DID Key into Add Someone Input
    await friendsScreen.pasteUserKeyInAddSomeone();

    // Add two more character to add someone input
    await friendsScreen.enterFriendDidKey(
      "did:key:1234567890123456789012345678901234567890123456789",
    );

    const inputError = await friendsScreen.inputErrorText;
    await expect(inputError).toHaveTextContaining(
      "Maximum of 56 characters exceeded.",
    );
    await friendsScreen.deleteAddFriendInput();
  });

  it("Add Friend Input - Attempt to send friend request to a user with outgoing pending request", async () => {
    // Attempt to send a friend request to ChatUserL, who already received a not accepted yet friend request before
    await friendsScreen.enterFriendDidKey(CHAT_USER_J_ID);

    // Click on Add Someone Button
    await friendsScreen.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "Friend request is already pending!" is gone
    await friendsScreen.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Attempt to send friend request again to a user who is already your friend", async () => {
    // Attempt to send a friend request to ChatUserB, who is already a friend
    await friendsScreen.enterFriendDidKey(CHAT_USER_B_ID);

    // Click on Add Someone Button
    await friendsScreen.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "You are already friends!" is gone
    await friendsScreen.waitUntilNotificationIsClosed();
  });

  it("Switch to Pending Friends view and validate elements displayed", async () => {
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
  });

  it("Switch to Blocked Friends view and validate elements displayed", async () => {
    // Go to blocked list and validate that No Requests text is shown
    await friendsScreen.goToBlockedList();
    await friendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await friendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });

  it("Switch to All Friends view and validate elements displayed", async () => {
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Favorites - Open Chat conversations with multiple users on Sidebar - Chat User B", async () => {
    // Open friend Context Menu of Chat User B
    await friendsScreen.openFriendContextMenu(users[0]);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await friendsScreen.clickOnContextMenuChat();
    await chatsLayout.validateChatLayoutIsShown();
    await chatsInput.typeMessageOnInput("Testing...");
    await chatsInput.clearInputBar();

    // Go back to Friends Screen
    await chatsLayout.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Favorites - Open Chat conversations with multiple users on Sidebar - Chat User C", async () => {
    // Open friend Context Menu of ChatUserC
    await friendsScreen.openFriendContextMenu(users[1]);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await friendsScreen.clickOnContextMenuChat();
    await chatsLayout.validateChatLayoutIsShown();
    await chatsInput.typeMessageOnInput("Testing...");
    await chatsInput.clearInputBar();

    // Go back to Friends Screen
    await chatsLayout.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Favorites - Open Chat conversations with multiple users on Sidebar - Chat User D", async () => {
    // Open friend Context Menu of ChatUserD
    await friendsScreen.openFriendContextMenu(users[2]);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await friendsScreen.clickOnContextMenuChat();
    await chatsLayout.validateChatLayoutIsShown();
    await chatsInput.typeMessageOnInput("Testing...");
    await chatsInput.clearInputBar();

    // Go back to Friends Screen
    await chatsLayout.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Favorites - Add multiple users to Favorites - User 1", async () => {
    // Open friend Context Menu for first user
    await friendsScreen.openFriendContextMenu(users[0]);

    // Select "Favorites" from Context Menu to Add the user to Favorites
    await friendsScreen.clickOnContextMenuFavoritesAdd();
  });

  it("Favorites - Add multiple users to Favorites - User 2", async () => {
    // Open friend Context Menu for second user
    await friendsScreen.openFriendContextMenu(users[1]);

    // Select "Favorites" from Context Menu to Add the user to Favorites
    await friendsScreen.clickOnContextMenuFavoritesAdd();
  });

  it("Favorites - Add multiple users to Favorites - User 3", async () => {
    // Open friend Context Menu for third user
    await friendsScreen.openFriendContextMenu(users[2]);

    // Select "Favorites" from Context Menu to Add the user to Favorites
    await friendsScreen.clickOnContextMenuFavoritesAdd();
  });

  it("Favorites - Validate Sidebar Favorites is displayed after adding users to favorites", async () => {
    // Validate that Favorites Sidebar is displayed
    await favoritesSidebar.slimbar.waitForExist();
  });

  it("Favorites - Remove all users from Favorites - User 1", async () => {
    // Open Context Menu from first user listed in Friends List
    await friendsScreen.openFriendContextMenu(users[0]);

    // Select second option "Remove from Favorites" from Context Menu
    await friendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Favorites - Remove all users from Favorites - User 2", async () => {
    // Open Context Menu from second user listed in Friends List
    await friendsScreen.openFriendContextMenu(users[1]);

    // Select second option "Remove from Favorites" from Context Menu
    await friendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Favorites - Remove all users from Favorites - User 3", async () => {
    // Open Context Menu from third user listed in Friends List
    await friendsScreen.openFriendContextMenu(users[2]);

    // Select second option "Remove from Favorites" from Context Menu
    await friendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Go to Chat with Friend from Friends List", async () => {
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.chatWithFriend(friendName);

    //Validate Chat Screen is displayed and go back to Friends Screen
    await chatsLayout.validateChatLayoutIsShown();
  });

  it("Type a message and return to Friends Screen", async () => {
    await chatsInput.typeMessageOnInput("Testing...");
    await chatsInput.clearInputBar();
    await chatsLayout.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Validate tooltips for Unfriend and Block buttons are displayed", async () => {
    // Validate Unfriend button tooltip
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const unfriendTooltipText =
      await friendsScreen.getUserTooltipText(friendName);
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");

    // Validate Block button tooltip
    await friendsScreen.hoverOnBlockButton(friendName);
    const blockTooltipText = await friendsScreen.getUserTooltipText(friendName);
    await expect(blockTooltipText).toHaveTextContaining("Block");
  });

  it("Unfriend someone from Friends List", async () => {
    // Get a random user from list and unfriend it
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.removeOrCancelUser(friendName);

    // Go to Pending friends list and return to all friends list
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();

    // Get current list of All friends and ensure that it does not include the removed user
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const includesFriend = await allFriendsList.includes(friendName);
    await expect(includesFriend).toEqual(false);
  });

  it("Block someone from Friends List", async () => {
    // Get a random user from list and block the user
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.blockUser(friendName);

    // Go to Blocked List and validate that user is there now
    await friendsScreen.goToBlockedList();
    await friendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get current list of All friends and ensure that it does not include the blocked user
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludesFriend = allFriendsList.includes(friendName);
    await expect(allListIncludesFriend).toEqual(false);
  });

  it("Add Friend Input - Attempt to send friend request to a blocked user", async () => {
    // Attempt to send a friend request to ChatUserC, who was recently blocked
    await friendsScreen.enterFriendDidKey(CHAT_USER_C_ID);

    // Click on Add Someone Button
    await friendsScreen.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "Key Blocked" is gone
    await friendsScreen.waitUntilNotificationIsClosed();
  });

  it("Validate tooltip for Deny Request button is displayed", async () => {
    // Go to Pending Requests Screen
    await friendsScreen.goToPendingFriendsList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await friendsScreen.getUserFromIncomingList();
    await friendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const denyTooltipText = await friendsScreen.getUserTooltipText(friendName);
    await expect(denyTooltipText).toHaveTextContaining("Deny Request");
  });

  it("Validate tooltip for Unfriend button is displayed", async () => {
    // Validate Unfriend button tooltip from Outgoing List
    const outgoingFriendName = await friendsScreen.getUserFromOutgoingList();
    await friendsScreen.hoverOnUnfriendDenyUnblockButton(outgoingFriendName);
    const unfriendTooltipText =
      await friendsScreen.getUserTooltipText(outgoingFriendName);
    await expect(unfriendTooltipText).toHaveTextContaining("Unfriend");
  });

  it("Accept incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await friendsScreen.getUserFromIncomingList();
    await friendsScreen.acceptIncomingRequest(friendName);

    // Go to the current list of All friends and ensure that now includes the friend accepted
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    const incomingRequestsList = await friendsScreen.getIncomingList();
    const incomingListIncludes =
      await incomingRequestsList.includes(friendName);
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Deny incoming friend request", async () => {
    // Get a random user from Incoming Pending list and accept the request
    const friendName = await friendsScreen.getUserFromIncomingList();
    await friendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    const incomingRequestsList = await friendsScreen.getIncomingList();
    const incomingListIncludes = incomingRequestsList.includes(friendName);
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Unfriend - Cancel outgoing friend request", async () => {
    // Get a random user from Outgoing Requests list and accept the request
    const friendName = await friendsScreen.getUserFromOutgoingList();
    await friendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateOutgoingListIsShown();
    const outgoingRequestsList = await friendsScreen.getOutgoingList();
    const outgoingListIncludes =
      await outgoingRequestsList.includes(friendName);
    expect(outgoingListIncludes).toEqual(false);
  });

  it("Validate tooltips for Unblock button is displayed", async () => {
    // Go to Blocked Users Screen
    await friendsScreen.goToBlockedList();

    // Validate Deny Request button tooltip from Incoming List
    const friendName = await friendsScreen.getUserFromBlockedList();
    await friendsScreen.hoverOnUnfriendDenyUnblockButton(friendName);
    const unblockTooltipText =
      await friendsScreen.getUserTooltipText(friendName);
    await expect(unblockTooltipText).toHaveTextContaining("Unblock");
  });

  it("Unblock someone from blocked friends list", async () => {
    // Get a random user from Blocked list and click on Unblock button
    const friendName = await friendsScreen.getUserFromBlockedList();
    await friendsScreen.removeOrCancelUser(friendName);

    // Go to the current list of All friends and ensure that unblocked user is not on friends list as expected
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await friendsScreen.goToBlockedList();
    await friendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await friendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });

  it("Context Menu - Chat with Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    await friendsScreen.goToAllFriendsList();
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select first option "Chat" from Context Menu and validate Chat is displayed
    await friendsScreen.clickOnContextMenuChat();
    await chatsLayout.chatLayout.waitForExist();
    await chatsInput.typeMessageOnInput("Testing...");
    await chatsInput.clearInputBar();

    // Go back to Friends Screen
    await chatsLayout.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Context Menu - Add friend to Favorites and contents displayed on Favorites Sidebar", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select second option "Favorites" from Context Menu
    await friendsScreen.clickOnContextMenuFavoritesAdd();

    // Validate that username and user image bubble is now displayed on Favorites Sidebar
    await favoritesSidebar.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image and indicator offline
    const favoritesImage =
      await favoritesSidebar.getFavoritesUserImage("ChatUserD");
    await favoritesImage.waitForExist();
  });

  it("Context Menu - Remove Friend from Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select second option "Remove from Favorites" from Context Menu
    await friendsScreen.clickOnContextMenuFavoritesRemove();
  });

  it("Context Menu - Remove Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select fourth option "Remove" from Context Menu
    await friendsScreen.clickOnContextMenuRemove();

    // Go to pending list and return to all friends list
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();

    // Get current list of All friends and ensure user was removed from list
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);
  });

  it("Context Menu - Block Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreen.getUserFromAllFriendsList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select last option "Block" from Context Menu
    await friendsScreen.clickOnContextMenuBlock();

    // Go to Blocked List and validate that user is there now
    await friendsScreen.goToBlockedList();
    await friendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get current list of All friends and ensure that it does not include the blocked user
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);
  });

  it("Context Menu - Accept Incoming Request", async () => {
    // Go to Pending Requests Screen
    await friendsScreen.goToPendingFriendsList();

    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await friendsScreen.getUserFromIncomingList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Accept" from Context Menu
    await friendsScreen.clickOnContextMenuIncomingAccept();

    // Go to the current list of All friends and ensure that accepted user is now in friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.waitUntilUserIsInCurrentList(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    const incomingRequestsList = await friendsScreen.getIncomingList();
    const incomingListIncludes =
      await incomingRequestsList.includes(friendName);
    await expect(incomingListIncludes).toEqual(false);
  });

  it("Context Menu - Deny Incoming Request", async () => {
    // Get a random user from Incoming Pending list and right click on it to get the context menu
    const friendName = await friendsScreen.getUserFromIncomingList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Deny Request" from Context Menu
    await friendsScreen.clickOnContextMenuIncomingDeny();

    // Go to the current list of All friends and ensure that denied user is not in friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Go to Pending Requests and ensure that only Outgoing list is displayed on screen
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsNotShown();
    await friendsScreen.validateOutgoingListIsShown();
  });

  it("Context Menu - Cancel Outgoing Request", async () => {
    // Get a random user from Outgoing Requests list and right click on it to get the context menu
    const friendName = await friendsScreen.getUserFromOutgoingList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Cancel Request" from Context Menu
    await friendsScreen.clickOnContextMenuOutgoingCancel();

    // Go to the current list of All friends and ensure that removed user is not in friends list
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await friendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });

  it("Context Menu - Unblock User", async () => {
    // Go to Blocked Users Screen
    await friendsScreen.goToBlockedList();

    // Get a random user from Blocked list and right click on it to get the context menu
    const friendName = await friendsScreen.getUserFromBlockedList();
    await friendsScreen.openFriendContextMenu(friendName);

    // Select the only option "Unblock" from Context Menu
    await friendsScreen.clickOnContextMenuUnblock();

    // Go to the current list of All friends and ensure that unblocked user is not on friends list, as expected
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await friendsScreen.goToBlockedList();
    await friendsScreen.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "NOTHING TO SEE HERE"
    const noRequestsText = await friendsScreen.noRequestsText;
    await expect(noRequestsText).toHaveText("NOTHING TO SEE HERE");
  });
}

import "module-alias/register";
import { resetAndLoginWithCache } from "@helpers/commands";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import ChatsSidebar from "@screenobjects/chats/ChatsSidebar";
import FavoritesSidebar from "@screenobjects/chats/FavoritesSidebar";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import {
  CHAT_USER_B_ID,
  CHAT_USER_C_ID,
  CHAT_USER_L_ID,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsSidebarFirstUser = new ChatsSidebar(USER_A_INSTANCE);
let favoritesSidebarFirstUser = new FavoritesSidebar(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let uplinkMainFirstUser = new UplinkMainScreen(USER_A_INSTANCE);
const users = ["ChatUserB", "ChatUserC", "ChatUserD"];

export default async function friends() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await resetAndLoginWithCache("FriendsTestUser");

    // Go to Friends Screen
    await uplinkMainFirstUser.goToFriends();

    // Validate Pre Release Indicator is displayed
    await friendsScreenFirstUser.prereleaseIndicator.waitForExist();
    const prereleaseIndicatorText =
      await friendsScreenFirstUser.prereleaseIndicatorText;
    await expect(prereleaseIndicatorText).toHaveTextContaining(
      "Pre-release | Issues/Feedback"
    );
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await friendsScreenFirstUser.chatsButton.waitForExist();
    await friendsScreenFirstUser.filesButton.waitForExist();
    await friendsScreenFirstUser.friendsButton.waitForExist();
    await friendsScreenFirstUser.settingsButton.waitForExist();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await chatsSidebarFirstUser.chatSearchInput.waitForExist();
    await chatsSidebarFirstUser.sidebar.waitForExist();
    await chatsSidebarFirstUser.sidebarChildren.waitForExist();
    await chatsSidebarFirstUser.sidebarSearch.waitForExist();
  });

  it("Go to Friends Screen and validate elements displayed", async () => {
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Friends Screen - Displays a badge showing 4 pending requests on Navigation Bar ", async () => {
    await friendsScreenFirstUser.buttonNavBarButtonBadge.waitForExist();
    const buttonBadgeText =
      await friendsScreenFirstUser.buttonNavBarButtonBadgeText;
    await expect(buttonBadgeText).toHaveTextContaining("4");
  });

  it("Friends Screen - Displays a badge showing 4 pending requests on Pending Friends Button", async () => {
    await friendsScreenFirstUser.friendsButtonBadge.waitForExist();
    const buttonBadgeText = await friendsScreenFirstUser.friendsButtonBadgeText;
    await expect(buttonBadgeText).toHaveTextContaining("4");
  });

  it("User can type on user search input bar", async () => {
    await friendsScreenFirstUser.enterFriendDidKey("Hello");

    const addSomeoneInput = await friendsScreenFirstUser.addSomeoneInput;
    await expect(addSomeoneInput).toHaveTextContaining("Hello");
  });

  it("Add Friend Input - Error is displayed when number of chars provided is less than expected", async () => {
    const inputError = await friendsScreenFirstUser.inputErrorText;
    await expect(inputError).toHaveTextContaining(
      "Please enter at least 9 characters."
    );
    await friendsScreenFirstUser.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when non-alphanumeric chars are provided", async () => {
    await friendsScreenFirstUser.enterFriendDidKey("%%%%%%%%%%");

    const inputError = await friendsScreenFirstUser.inputErrorText;
    await expect(inputError).toHaveTextContaining(
      "Not allowed character(s): %"
    );
    await friendsScreenFirstUser.deleteAddFriendInput();
  });

  it("Add Friend Input - Error is displayed when spaces are provided", async () => {
    await friendsScreenFirstUser.enterFriendDidKey("123456789             ");

    const inputError = await friendsScreenFirstUser.inputErrorText;
    await expect(inputError).toHaveTextContaining("Spaces are not allowed.");
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

    const inputError = await friendsScreenFirstUser.inputErrorText;
    await expect(inputError).toHaveTextContaining(
      "Maximum of 56 characters exceeded."
    );
    await friendsScreenFirstUser.deleteAddFriendInput();
  });

  it("Add Friend Input - Attempt to send friend request to a user with outgoing pending request", async () => {
    // Attempt to send a friend request to ChatUserL, who already received a not accepted yet friend request before
    await friendsScreenFirstUser.enterFriendDidKey(CHAT_USER_L_ID);

    // Click on Add Someone Button
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "Friend request is already pending!" is gone
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  });

  it("Add Friend Input - Attempt to send friend request again to a user who is already your friend", async () => {
    // Attempt to send a friend request to ChatUserB, who is already a friend
    await friendsScreenFirstUser.enterFriendDidKey(CHAT_USER_B_ID);

    // Click on Add Someone Button
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "You are already friends!" is gone
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  });

  it("Switch to Pending Friends view and validate elements displayed", async () => {
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
  });

  it("Switch to Blocked Friends view and validate elements displayed", async () => {
    // Go to blocked list and validate that No Requests text is shown
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.validateNoRequestsIsShown();

    // Ensure that No requests message contains the text "Nothing to see here"
    const noRequestsText = await friendsScreenFirstUser.noRequestsText;
    await expect(noRequestsText).toHaveText("Nothing to see here");
  });

  it("Switch to All Friends view and validate elements displayed", async () => {
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
  });

  it("Favorites - Open Chat conversations with multiple users on Sidebar", async () => {
    for (let user of users) {
      // Open friend Context Menu
      await friendsScreenFirstUser.openFriendContextMenu(user);

      // Select first option "Chat" from Context Menu and validate Chat is displayed
      await friendsScreenFirstUser.clickOnContextMenuChat();
      await chatsLayoutFirstUser.validateChatLayoutIsShown();
      await chatsInputFirstUser.typeMessageOnInput("Testing...");
      await chatsInputFirstUser.clearInputBar();

      // Go back to Friends Screen
      await chatsLayoutFirstUser.goToFriends();
      await friendsScreenFirstUser.validateFriendsScreenIsShown();
    }
  });

  it("Favorites - Add multiple users to Favorites", async () => {
    for (let user of users) {
      // Open friend Context Menu
      await friendsScreenFirstUser.openFriendContextMenu(user);

      // Select "Favorites" from Context Menu to Add the user to Favorites
      await friendsScreenFirstUser.clickOnContextMenuFavoritesAdd();
    }
  });

  it("Favorites - Validate Sidebar Favorites is displayed after adding users to favorites", async () => {
    // Validate that Favorites Sidebar is displayed
    await favoritesSidebarFirstUser.slimbar.waitForExist();
  });

  it("Favorites - Remove all users from Favorites", async () => {
    for (let user of users) {
      // Open Context Menu from first user listed in Friends List
      await friendsScreenFirstUser.openFriendContextMenu(user);

      // Select second option "Remove from Favorites" from Context Menu
      await friendsScreenFirstUser.clickOnContextMenuFavoritesRemove();
    }

    // Validate that favorites is hidden now
    await favoritesSidebarFirstUser.favorites.waitForExist({
      reverse: true,
    });
  });

  it("Go to Chat with Friend from Friends List", async () => {
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.chatWithFriend(friendName);

    //Validate Chat Screen is displayed and go back to Friends Screen
    await chatsLayoutFirstUser.validateChatLayoutIsShown();
  });

  it("Type a message and return to Friends Screen", async () => {
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await chatsInputFirstUser.clearInputBar();
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
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
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();

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
    await friendsScreenFirstUser.waitUntilUserIsInCurrentList(friendName);

    // Get current list of All friends and ensure that it does not include the blocked user
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludesFriend = allFriendsList.includes(friendName);
    await expect(allListIncludesFriend).toEqual(false);
  });

  it("Add Friend Input - Attempt to send friend request to a blocked user", async () => {
    // Attempt to send a friend request to ChatUserC, who was recently blocked
    await friendsScreenFirstUser.enterFriendDidKey(CHAT_USER_C_ID);

    // Click on Add Someone Button
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for error toast notification with text "Key Blocked" is gone
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
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
    await friendsScreenFirstUser.waitUntilUserIsInCurrentList(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
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
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
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
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateOutgoingListIsShown();
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
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.validateBlockedListIsShown();
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
    await chatsLayoutFirstUser.chatLayout.waitForExist();
    await chatsInputFirstUser.typeMessageOnInput("Testing...");
    await chatsInputFirstUser.clearInputBar();

    // Go back to Friends Screen
    await chatsLayoutFirstUser.goToFriends();
    await friendsScreenFirstUser.validateFriendsScreenIsShown();
  });

  it("Context Menu - Add friend to Favorites and contents displayed on Favorites Sidebar", async () => {
    // Open Context Menu from first user listed in Friends List
    let friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select second option "Favorites" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuFavoritesAdd();

    // Validate that username and user image bubble is now displayed on Favorites Sidebar
    await favoritesSidebarFirstUser.validateFavoritesAreShown();

    // Favorites Sidebar User bubble should be displayed with image and indicator offline
    const favoritesImage =
      await favoritesSidebarFirstUser.getFavoritesUserImage("ChatUserD");
    const favoritesIndicatorOffline =
      await favoritesSidebarFirstUser.getFavoritesUserIndicatorOffline(
        "ChatUserD"
      );
    await favoritesImage.waitForExist();
    await favoritesIndicatorOffline.waitForExist();
  });

  it("Context Menu - Remove Friend from Favorites", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select second option "Remove from Favorites" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuFavoritesRemove();

    // Validate that favorites is hidden now
    await favoritesSidebarFirstUser.favorites.waitForExist({
      reverse: true,
    });
  });

  it("Context Menu - Remove Friend", async () => {
    // Open Context Menu from first user listed in Friends List
    const friendName = await friendsScreenFirstUser.getUserFromAllFriendsList();
    await friendsScreenFirstUser.openFriendContextMenu(friendName);

    // Select fourth option "Remove" from Context Menu
    await friendsScreenFirstUser.clickOnContextMenuRemove();

    // Go to pending list and return to all friends list
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();

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
    await friendsScreenFirstUser.waitUntilUserIsInCurrentList(friendName);

    // Get current list of All friends and ensure that it does not include the blocked user
    await friendsScreenFirstUser.goToAllFriendsList();
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
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
    await friendsScreenFirstUser.waitUntilUserIsInCurrentList(friendName);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
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
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of incoming requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateIncomingListIsShown();
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
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Outgoing Requests and validate that user does not appear there now
    await friendsScreenFirstUser.goToPendingFriendsList();
    await friendsScreenFirstUser.validateOutgoingListIsShown();
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
    await friendsScreenFirstUser.validateAllFriendsListIsShown();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const allListIncludes = await allFriendsList.includes(friendName);
    await expect(allListIncludes).toEqual(false);

    // Get the current list of Blocked list and validate that user does not appear there now
    await friendsScreenFirstUser.goToBlockedList();
    await friendsScreenFirstUser.validateBlockedListIsShown();
    const blockedList = await friendsScreenFirstUser.getBlockedList();
    const blockedListIncludes = await blockedList.includes(friendName);
    await expect(blockedListIncludes).toEqual(false);
  });
}

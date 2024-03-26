require("module-alias/register");
import {
  getUserKey,
  closeFirstApplication,
  closeSecondApplication,
  activateFirstApplication,
  activateSecondApplication,
  launchSecondApplication,
  launchFirstApplication,
} from "@helpers/commands";
import FriendsScreen from "@screenobjects/friends/FriendsScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import QuickProfile from "@screenobjects/chats/QuickProfile";
import SettingsProfileScreen from "@screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "@screenobjects/welcome-screen/WelcomeScreen";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";

export default async function quickProfileTests() {
  before(async () => {
    await launchSecondApplication();
    await CreatePinScreen.loginWithTestUser();
    await launchFirstApplication();
    await CreatePinScreen.loginWithTestUser();
  });

  it("Chat User A - Validate contents from local quick profile", async () => {
    // Open quick profile from remote user
    await MessageGroupLocal.openLocalQuickProfile();
    await QuickProfile.quickProfile.waitForExist();

    // Validate contents from quick profile
    await QuickProfile.quickProfileUserImage.waitForExist();
    await QuickProfile.quickProfileBannerImage.waitForExist();
    await QuickProfile.quickProfileEditProfile.waitForExist();
    const quickProfileUsername =
      await QuickProfile.quickProfileUserNameValueText;
    await expect(quickProfileUsername).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Click on Edit Profile", async () => {
    // Click on Edit Profile from Quick Profile
    await QuickProfile.clickOnEditProfile();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToMainScreen();
  });

  it("Chat User B - Validate contents from remote quick profile", async () => {
    // With User B - Validate that message was received
    await activateSecondApplication();
    await InputBar.waitForIsShown(true);
    await InputBar.clickOnInputBar();

    // Open quick profile from remote user
    await MessageGroupRemote.openRemoteQuickProfile();

    // Validate quick profile is displayed
    await QuickProfile.quickProfile.waitForExist();

    // Validate contents from quick profile
    await QuickProfile.quickProfileUserImage.waitForExist();
    await QuickProfile.quickProfileBannerImage.waitForExist();
    await QuickProfile.quickProfileRemoveFriend.waitForExist();
    await QuickProfile.quickProfileBlockUser.waitForExist();

    // Validate username from quick profile
    const quickProfileUsername =
      await QuickProfile.quickProfileUserNameValueText;
    await expect(quickProfileUsername).toHaveTextContaining("ChatUserA");

    // Click outside to close quick profile
    await InputBar.clickOnInputBar();
  });

  it("Chat User A - Remove Friend", async () => {
    // Open quick profile from remote user
    await activateFirstApplication();
    await WelcomeScreen.goToMainScreen();
    await InputBar.waitForIsShown(true);
    await MessageGroupRemote.openRemoteQuickProfile();
    await QuickProfile.quickProfile.waitForExist();

    // Click on Remove Friend from Quick Profile
    await QuickProfile.clickOnRemoveUser();

    // Welcome Screen should be displayed
    await WelcomeScreen.validateWelcomeScreenIsShown(30000);
  });

  it("Chat User A - Ensure that Chat User B is not in friends list now", async () => {
    // Get current list of All friends and ensure that it does not include the removed user
    await WelcomeScreen.goToFriends();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await allFriendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(false);
  });

  it("Chat User B - Validate friendship was removed", async () => {
    // Switch control to User B
    await activateSecondApplication();
    await WelcomeScreen.waitForIsShown(true);

    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await WelcomeScreen.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User A - Send friend request again to User B", async () => {
    // Obtain did key from Chat User B
    await activateFirstApplication();
    await FriendsScreen.waitForIsShown(true);
    const friendDidKey = await getUserKey("ChatUserB");

    // Send friend request to Chat User B
    await FriendsScreen.sendFriendRequest(friendDidKey, "ChatUserB");

    // Go to Pending Friends List
    await FriendsScreen.hoverOnPendingListButton();
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateOutgoingListIsShown();

    // Go to All Friends List
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();
    await FriendsScreen.waitForIsShown(true);

    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToFriends();
    await FriendsScreen.validateFriendsScreenIsShown();
    await FriendsScreen.hoverOnPendingListButton();
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.validateIncomingListIsShown();
    await FriendsScreen.waitUntilFriendRequestIsReceived();

    // Validate that button badge displays the number of incoming requests
    await FriendsScreen.validateFriendsButtonBadgeIsShown;
    const friendsButtonBadgeText =
      await FriendsScreen.getValueFromFriendsButtonBadge();
    await expect(friendsButtonBadgeText).toEqual("1");
  });

  it("Chat User B - Validate that User A is now a friend", async () => {
    // With User B - Accept incoming request
    await FriendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
    await FriendsScreen.validateAllFriendsListIsShown();

    // Validate friend is now on all friends list
    await FriendsScreen.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User A - Wait until friend request is accepted again", async () => {
    // Validate friend is now on all friends list
    await activateFirstApplication();
    await FriendsScreen.waitForIsShown(true);

    // Validate friend is now on all friends list
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}

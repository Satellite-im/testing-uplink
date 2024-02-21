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
const chatsInput = new InputBar();
const chatsQuickProfile = new QuickProfile();
const friendsScreen = new FriendsScreen();
const messageGroupLocal = new MessageGroupLocal();
const messageGroupRemote = new MessageGroupRemote();
const settingsProfile = new SettingsProfileScreen();
const welcomeScreen = new WelcomeScreen();

export default async function quickProfileTests() {
  before(async () => {
    await launchSecondApplication();
    await launchFirstApplication();
  });

  it("Chat User A - Validate contents from local quick profile", async () => {
    // Open quick profile from remote user
    await messageGroupLocal.openLocalQuickProfile();
    await chatsQuickProfile.quickProfile.waitForExist();

    // Validate contents from quick profile
    await chatsQuickProfile.quickProfileUserImage.waitForExist();
    await chatsQuickProfile.quickProfileBannerImage.waitForExist();
    await chatsQuickProfile.quickProfileEditProfile.waitForExist();
    const quickProfileUsername =
      await chatsQuickProfile.quickProfileUserNameValueText;
    await expect(quickProfileUsername).toHaveTextContaining("ChatUserA");
  });

  it("Chat User A - Click on Edit Profile", async () => {
    // Click on Edit Profile from Quick Profile
    await chatsQuickProfile.clickOnEditProfile();
    await settingsProfile.waitForIsShown(true);
    await settingsProfile.goToMainScreen();
    await closeFirstApplication();
    await closeSecondApplication();
  });

  it("Chat User B - Validate contents from remote quick profile", async () => {
    // With User B - Validate that message was received
    await activateSecondApplication();
    await chatsInput.waitForIsShown(true);
    await chatsInput.clickOnInputBar();

    // Open quick profile from remote user
    await messageGroupRemote.openRemoteQuickProfile();

    // Validate quick profile is displayed
    await chatsQuickProfile.quickProfile.waitForExist();

    // Validate contents from quick profile
    await chatsQuickProfile.quickProfileUserImage.waitForExist();
    await chatsQuickProfile.quickProfileBannerImage.waitForExist();
    await chatsQuickProfile.quickProfileRemoveFriend.waitForExist();
    await chatsQuickProfile.quickProfileBlockUser.waitForExist();

    // Validate username from quick profile
    const quickProfileUsername =
      await chatsQuickProfile.quickProfileUserNameValueText;
    await expect(quickProfileUsername).toHaveTextContaining("ChatUserA");

    // Click outside to close quick profile
    await chatsInput.clickOnInputBar();
  });

  it("Chat User A - Remove Friend", async () => {
    // Open quick profile from remote user
    await activateFirstApplication();
    await welcomeScreen.goToMainScreen();
    await chatsInput.waitForIsShown(true);
    await messageGroupRemote.openRemoteQuickProfile();
    await chatsQuickProfile.quickProfile.waitForExist();

    // Click on Remove Friend from Quick Profile
    await chatsQuickProfile.clickOnRemoveUser();

    // Welcome Screen should be displayed
    await welcomeScreen.validateWelcomeScreenIsShown();
  });

  it("Chat User A - Ensure that Chat User B is not in friends list now", async () => {
    // Get current list of All friends and ensure that it does not include the removed user
    await welcomeScreen.goToFriends();
    const allFriendsList = await friendsScreen.getAllFriendsList();
    const includesFriend = await allFriendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(false);
  });

  it("Chat User B - Validate friendship was removed", async () => {
    // Switch control to User B
    await activateSecondApplication();
    await welcomeScreen.waitForIsShown(true);

    // With User B - Go to Friends and wait for User A to remove friendship with User B
    await welcomeScreen.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
  });

  it("Chat User A - Send friend request again to User B", async () => {
    // Obtain did key from Chat User B
    await activateFirstApplication();
    await friendsScreen.waitForIsShown(true);
    const friendDidKey = await getUserKey("ChatUserB");

    // Send friend request to Chat User B
    await friendsScreen.sendFriendRequest(friendDidKey, "ChatUserB");

    // Go to All Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();
  });

  it("Chat User B - Validate button badge displays the number of incoming requests", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();
    await friendsScreen.waitForIsShown(true);

    // Go to pending requests list, wait for receiving the friend request and accept it
    await friendsScreen.goToFriends();
    await friendsScreen.validateFriendsScreenIsShown();
    await friendsScreen.hoverOnPendingListButton();
    await friendsScreen.goToPendingFriendsList();
    await friendsScreen.validateIncomingListIsShown();
    await friendsScreen.waitUntilFriendRequestIsReceived();

    // Validate that button badge displays the number of incoming requests
    await friendsScreen.validateFriendsButtonBadgeIsShown;
    const friendsButtonBadgeText =
      await friendsScreen.getValueFromFriendsButtonBadge();
    await expect(friendsButtonBadgeText).toEqual("1");
  });

  it("Chat User B - Validate that User A is now a friend", async () => {
    // With User B - Accept incoming request
    await friendsScreen.acceptIncomingRequest("ChatUserA");

    // Return to Friends List
    await friendsScreen.goToAllFriendsList();
    await friendsScreen.validateAllFriendsListIsShown();

    // Validate friend is now on all friends list
    await friendsScreen.validateAllFriendsListIsNotEmpty();
  });

  it("Chat User A - Wait until friend request is accepted again", async () => {
    // Validate friend is now on all friends list
    await activateFirstApplication();
    await friendsScreen.waitForIsShown(true);

    // Validate friend is now on all friends list
    await friendsScreen.waitUntilUserAcceptedFriendRequest();
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}

import { getUserKey } from "../../../helpers/commands";
import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import MessageGroup from "../../../screenobjects/chats/MessageGroup";
import Messages from "../../../screenobjects/chats/Messages";
import QuickProfile from "../../../screenobjects/chats/QuickProfile";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "../../../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";

export default async function quickProfileUserA() {
  it("Ensure that User B is still online before proceeding with tests", async () => {
    // Tests start in Chat Screen with User B
    await Topbar.waitUntilRemoteUserIsOnline();
  });

  it("Quick Profile - Validate contents from local quick profile", async () => {
    // Open quick profile from remote user
    await MessageGroup.openLocalQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Validate contents from quick profile
    await expect(QuickProfile.quickProfileUserImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileBannerImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileIndicatorOnline).toBeDisplayed();
    await expect(
      QuickProfile.quickProfileUserNameValueText
    ).toHaveTextContaining("ChatUserA");
    await expect(QuickProfile.quickProfileEditProfile).toBeDisplayed();
  });

  it("Quick Profile - Click on Edit Profile", async () => {
    await QuickProfile.clickOnEditProfile();
    await SettingsProfileScreen.waitForIsShown(true);
    await SettingsProfileScreen.goToMainScreen();
  });

  it("Quick Profile - Validate contents from remote quick profile", async () => {
    // Open quick profile from remote user
    await MessageGroup.openRemoteQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Validate contents from quick profile
    await expect(QuickProfile.quickProfileUserImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileBannerImage).toBeDisplayed();
    await expect(QuickProfile.quickProfileIndicatorOnline).toBeDisplayed();
    await expect(
      QuickProfile.quickProfileUserNameValueText
    ).toHaveTextContaining("ChatUserB");
    await expect(QuickProfile.quickProfileRemoveFriend).toBeDisplayed();
    await expect(QuickProfile.quickProfileBlockUser).toBeDisplayed();

    // Click outside to close quick profile
    await Topbar.topbar.click();
  });

  it("Quick Profile - Remove Friend", async () => {
    // Open quick profile from remote user
    await MessageGroup.openRemoteQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Click on Remove Friend from Quick Profile
    await QuickProfile.clickOnRemoveUser();

    // Welcome Screen should be displayed
    await WelcomeScreen.waitForIsShown(true);
  });

  it("Ensure that Chat User B is not in friends list now", async () => {
    // Get current list of All friends and ensure that it does not include the removed user
    await WelcomeScreen.goToFriends();
    const allFriendsList = await FriendsScreen.getAllFriendsList();
    const includesFriend = await allFriendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(false);
  });

  it("Send friend request again to User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB");
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Wait until friend request is accepted again", async () => {
    // Wait until user B accepts the friend request
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();

    // Go to chat with User B
    await FriendsScreen.chatWithFriendButton.waitForExist();
    await FriendsScreen.chatWithFriendButton.click();
    await ChatsLayout.waitForIsShown(true);
    await Topbar.waitUntilRemoteUserIsOnline();
  });

  it("Go to chat with User B and wait for receiving a message", async () => {
    await Messages.waitForReceivingMessage("accepted...");
  });

  it("Quick Profile - Block Friend", async () => {
    // Open quick profile from remote user
    await MessageGroup.openRemoteQuickProfile();
    await QuickProfile.waitForIsShown(true);

    // Click on Block Friend from Quick Profile
    await QuickProfile.clickOnBlockUser();

    // Welcome Screen should be displayed
    await WelcomeScreen.waitForIsShown(true);
  });

  it("Ensure that Chat User B is in blocked list now", async () => {
    // Get current list of Blocked friends and ensure that it includes the blocked user
    await WelcomeScreen.goToFriends();
    await FriendsScreen.goToBlockedList();
    const blockedList = await FriendsScreen.getBlockedList();
    const includesFriend = await blockedList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);
  });

  after(async () => {
    await browser.pause(60000);
  });
}

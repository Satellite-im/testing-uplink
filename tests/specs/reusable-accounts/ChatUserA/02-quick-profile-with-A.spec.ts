import { getUserKey } from "../../../helpers/commands";
import ChatsLayout from "../../../screenobjects/chats/ChatsLayout";
import MessageGroup from "../../../screenobjects/chats/MessageGroup";
import Messages from "../../../screenobjects/chats/Messages";
import QuickProfile from "../../../screenobjects/chats/QuickProfile";
import Topbar from "../../../screenobjects/chats/Topbar";
import FriendsScreen from "../../../screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "../../../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../../../screenobjects/welcome-screen/WelcomeScreen";
let chatsLayoutFirstUser = new ChatsLayout("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsMessageGroupsFirstUser = new MessageGroup("userA");
let chatsQuickProfileFirstUser = new QuickProfile("userA");
let chatsTopbarFirstUser = new Topbar("userA");
let friendsScreenFirstUser = new FriendsScreen("userA");
let settingsProfileFirstUser = new SettingsProfileScreen("userA");
let welcomeScreenFirstUser = new WelcomeScreen("userA");

export default async function quickProfileUserA() {
  it("Ensure that User B is still online before proceeding with tests", async () => {
    // Tests start in Chat Screen with User B
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();
  });

  it("Quick Profile - Validate contents from local quick profile", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openLocalQuickProfile();
    await chatsQuickProfileFirstUser.waitForIsShown(true);

    // Validate contents from quick profile
    await expect(
      chatsQuickProfileFirstUser.quickProfileUserImage
    ).toBeDisplayed();
    await expect(
      chatsQuickProfileFirstUser.quickProfileBannerImage
    ).toBeDisplayed();
    await expect(
      chatsQuickProfileFirstUser.quickProfileIndicatorOnline
    ).toBeDisplayed();
    await expect(
      chatsQuickProfileFirstUser.quickProfileUserNameValueText
    ).toHaveTextContaining("ChatUserA");
    await expect(
      chatsQuickProfileFirstUser.quickProfileEditProfile
    ).toBeDisplayed();
  });

  it("Quick Profile - Click on Edit Profile", async () => {
    await chatsQuickProfileFirstUser.clickOnEditProfile();
    await settingsProfileFirstUser.waitForIsShown(true);
    await settingsProfileFirstUser.goToMainScreen();
  });

  it("Quick Profile - Validate contents from remote quick profile", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();
    await chatsQuickProfileFirstUser.waitForIsShown(true);

    // Validate contents from quick profile
    await expect(
      chatsQuickProfileFirstUser.quickProfileUserImage
    ).toBeDisplayed();
    await expect(
      chatsQuickProfileFirstUser.quickProfileBannerImage
    ).toBeDisplayed();
    await expect(
      chatsQuickProfileFirstUser.quickProfileIndicatorOnline
    ).toBeDisplayed();
    await expect(
      chatsQuickProfileFirstUser.quickProfileUserNameValueText
    ).toHaveTextContaining("ChatUserB");
    await expect(
      chatsQuickProfileFirstUser.quickProfileRemoveFriend
    ).toBeDisplayed();
    await expect(
      chatsQuickProfileFirstUser.quickProfileBlockUser
    ).toBeDisplayed();

    // Click outside to close quick profile
    await chatsTopbarFirstUser.chatsTopbarFirstUser.click();
  });

  it("Quick Profile - Remove Friend", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();
    await chatsQuickProfileFirstUser.waitForIsShown(true);

    // Click on Remove Friend from Quick Profile
    await chatsQuickProfileFirstUser.clickOnRemoveUser();

    // Welcome Screen should be displayed
    await welcomeScreenFirstUser.waitForIsShown(true);
  });

  it("Ensure that Chat User B is not in friends list now", async () => {
    // Get current list of All friends and ensure that it does not include the removed user
    await welcomeScreenFirstUser.goToFriends();
    const allFriendsList = await friendsScreenFirstUser.getAllFriendsList();
    const includesFriend = await allFriendsList.includes("ChatUserB");
    await expect(includesFriend).toEqual(false);
  });

  it("Send friend request again to User B", async () => {
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserB");
    await friendsScreenFirstUser.enterFriendDidKey(friendDidKey);
    await friendsScreenFirstUser.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await friendsScreenFirstUser.waitUntilNotificationIsClosed();
  });

  it("Wait until friend request is accepted again", async () => {
    // Wait until user B accepts the friend request
    await friendsScreenFirstUser.waitUntilUserAcceptedFriendRequest();

    // Go to chat with User B
    await friendsScreenFirstUser.chatWithFriendButton.waitForExist();
    await friendsScreenFirstUser.chatWithFriendButton.click();
    await chatsLayoutFirstUser.waitForIsShown(true);
    await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();
  });

  it("Go to chat with User B and wait for receiving a message", async () => {
    await chatsMessagesFirstUser.waitForReceivingMessage("Accepted...");
  });

  it("Quick Profile - Block Friend", async () => {
    // Open quick profile from remote user
    await chatsMessageGroupsFirstUser.openRemoteQuickProfile();
    await chatsQuickProfileFirstUser.waitForIsShown(true);

    // Click on Block Friend from Quick Profile
    await chatsQuickProfileFirstUser.clickOnBlockUser();

    // Welcome Screen should be displayed
    await welcomeScreenFirstUser.waitForIsShown(true);
  });

  it("Ensure that Chat User B is in blocked list now", async () => {
    // Get current list of Blocked friends and ensure that it includes the blocked user
    await welcomeScreenFirstUser.goToFriends();
    await friendsScreenFirstUser.goToBlockedList();
    const blockedList = await friendsScreenFirstUser.getBlockedList();
    const includesFriend = await blockedList.includes("ChatUserB");
    await expect(includesFriend).toEqual(true);
  });
}

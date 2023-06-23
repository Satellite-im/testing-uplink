import {
  createNewUser,
  createNewUserSecondInstance,
  getUserKey,
  saveTestKeys,
} from "./commands";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "./constants";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import Topbar from "../screenobjects/chats/Topbar";
import SettingsProfileScreen from "../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../screenobjects/welcome-screen/WelcomeScreen";
let chatsTopbarFirstUser = new Topbar(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);
let friendsScreenSecondUser = new FriendsScreen(USER_B_INSTANCE);
let settingsProfileFirstUser = new SettingsProfileScreen(USER_A_INSTANCE);
let settingsProfileSecondUser = new SettingsProfileScreen(USER_B_INSTANCE);
let welcomeScreenFirstUser = new WelcomeScreen(USER_A_INSTANCE);
let welcomeScreenSecondUser = new WelcomeScreen(USER_B_INSTANCE);

export async function setupBeforeCreateGroupTests() {
  const usernameA = "ChatUserA";
  await createNewUser(usernameA);
  await welcomeScreenFirstUser.goToSettings();
  await settingsProfileFirstUser.waitForIsShown(true);

  // Click on Copy ID button and assert Toast Notification is displayed
  await settingsProfileFirstUser.clickOnCopyIDButton();

  // Wait for toast notification to be closed
  await settingsProfileFirstUser.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await settingsProfileFirstUser.pasteUserKeyInStatus();
  const inputTextElementA = await settingsProfileFirstUser.getStatusInputText();
  const didkeyA = await inputTextElementA.getText();

  // Grab cache folder and restart
  await saveTestKeys(usernameA, didkeyA, USER_A_INSTANCE);
  await settingsProfileFirstUser.goToFriends();
  await friendsScreenFirstUser.waitForIsShown(true);

  const usernameB = "ChatUserB";
  await createNewUserSecondInstance(usernameB);
  await welcomeScreenSecondUser.goToSettings();
  await settingsProfileSecondUser.waitForIsShown(true);

  // Click on Copy ID button and assert Toast Notification is displayed
  await settingsProfileSecondUser.clickOnCopyIDButton();

  // Wait for toast notification to be closed
  await settingsProfileSecondUser.waitUntilNotificationIsClosed();

  // Paste copied DID Key into Status Input
  await settingsProfileSecondUser.pasteUserKeyInStatus();
  const inputTextElementB =
    await settingsProfileSecondUser.getStatusInputText();
  const didkeyB = await inputTextElementB.getText();

  // Grab cache folder and restart
  await saveTestKeys(usernameB, didkeyB, USER_B_INSTANCE);

  await settingsProfileSecondUser.goToFriends();

  // Go to Friends
  await friendsScreenSecondUser.waitForIsShown(true);
  // Obtain did key from Chat User B
  const friendDidKey = await getUserKey("ChatUserA", USER_B_INSTANCE);
  await friendsScreenSecondUser.enterFriendDidKey(friendDidKey);
  await friendsScreenSecondUser.clickOnAddSomeoneButton();

  // Wait for toast notification to be closed
  await friendsScreenSecondUser.waitUntilNotificationIsClosed();

  // Validate friend request appears on pending list
  await friendsScreenSecondUser.goToPendingFriendsList();
  const pendingList = await friendsScreenSecondUser.getOutgoingList();
  const includesFriendB = await pendingList.includes("ChatUserA");
  await expect(includesFriendB).toEqual(true);
  await friendsScreenSecondUser.goToAllFriendsList();

  // With User A - Go to pending requests list, wait for receiving the friend request and accept it
  await friendsScreenFirstUser.goToPendingFriendsList();
  await friendsScreenFirstUser.waitUntilFriendRequestIsReceived();
  await friendsScreenFirstUser.acceptIncomingRequest("ChatUserB");

  // Validate friend is now on all friends list
  await friendsScreenFirstUser.goToAllFriendsList();
  const friendsListA = await friendsScreenFirstUser.getAllFriendsList();
  const includesFriendA = await friendsListA.includes("ChatUserB");
  await expect(includesFriendA).toEqual(true);

  // With User A - Go to pending requests list, wait for receiving the friend request and accept it
  await friendsScreenSecondUser.waitUntilUserAcceptedFriendRequest();

  // Validate friend is now on all friends list
  await friendsScreenSecondUser.goToAllFriendsList();
  const friendsListB = await friendsScreenSecondUser.getAllFriendsList();
  const includesFriendC = await friendsListB.includes("ChatUserA");
  await expect(includesFriendC).toEqual(true);
  await friendsScreenSecondUser.goToMainScreen();
  await welcomeScreenSecondUser.waitForIsShown(true);

  // Go to Chat with User B
  await friendsScreenFirstUser.chatWithFriendButton.click();
  await chatsTopbarFirstUser.validateTopbarExists();

  // Wait until Chat User B is online
  await chatsTopbarFirstUser.waitUntilRemoteUserIsOnline();
}

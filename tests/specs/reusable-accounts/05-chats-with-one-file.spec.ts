import {
  createNewUser,
  getUserKey,
  launchAppForChatUserA,
  launchAppForChatUserB,
  saveTestKeys,
} from "../../helpers/commands";
import FriendsScreen from "../../screenobjects/friends/FriendsScreen";
import SettingsProfileScreen from "../../screenobjects/settings/SettingsProfileScreen";
import WelcomeScreen from "../../screenobjects/welcome-screen/WelcomeScreen";

describe("Two users in one file", () => {
  it("Chat User A - Create Account", async () => {
    await launchAppForChatUserA();
    const username = "ChatUserA";
    await createNewUser(username);
    await WelcomeScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Click on Copy ID button and assert Toast Notification is displayed
    await SettingsProfileScreen.clickOnCopyIDButton();

    // Wait for toast notification to be closed
    await SettingsProfileScreen.waitUntilNotificationIsClosed();

    // Paste copied DID Key into Status Input
    await SettingsProfileScreen.pasteUserKeyInStatus();
    const inputTextElement = await SettingsProfileScreen.getStatusInputText();
    const didkey = await inputTextElement.getText();

    // Grab cache folder and restart
    await saveTestKeys(username, didkey);
    await SettingsProfileScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });

  it("Chat User B - Create Account", async () => {
    await launchAppForChatUserB();
    const username = "ChatUserB";
    await createNewUser(username);
  });

  it("Chat User B - Send friend request to User A", async () => {
    // Go to Friends
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
    // Obtain did key from Chat User B
    const friendDidKey = await getUserKey("ChatUserA");
    await FriendsScreen.enterFriendDidKey(friendDidKey);
    await FriendsScreen.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await FriendsScreen.waitUntilNotificationIsClosed();
  });

  it("Chat User A - Accept friend request from B", async () => {
    await launchAppForChatUserA();

    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.goToPendingFriendsList();
    await FriendsScreen.waitUntilFriendRequestIsReceived();
    await FriendsScreen.acceptIncomingRequest("ChatUserB");

    // Return to Friends List
    await FriendsScreen.goToAllFriendsList();
  });

  it("Chat User B - Validate friend request was accepted", async () => {
    await launchAppForChatUserB();

    // Go to pending requests list, wait for receiving the friend request and accept it
    await FriendsScreen.waitUntilUserAcceptedFriendRequest();
  });
});

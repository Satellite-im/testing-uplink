import { loginWithTestUser } from "../helpers/commands";
import ChatScreen from "../screenobjects/ChatScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";

describe("Two users at the same time - Chat User B", async () => {
  it("Load Chat User B account and accept Chat User B friend request", async () => {
    // Go to Friends Screen
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);
  });
  it("Assert message received from Chat User A", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await (await FriendsScreen.chatWithFriendButton).waitForExist();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    await (await ChatScreen.chatMessage).waitForDisplayed({ timeout: 180000 });
    expect(await ChatScreen.chatMessageText).toHaveTextContaining("testing...");
  });

  xit("Accept friend request from Chat User A flow", async () => {
    // Accept incoming request from ChatUserA
    await FriendsScreen.goToPendingFriendsList();
    await (
      await FriendsScreen.acceptFriendRequestButton
    ).waitForExist({ timeout: 180000 });
    await (await FriendsScreen.acceptFriendRequestButton).click();

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.goToAllFriendsList();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);
  });
});

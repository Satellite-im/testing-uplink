import { resetAndLoginWithCache } from "../helpers/commands";
import ChatScreen from "../screenobjects/ChatScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";

describe("Two users at the same time - Chat User B", async () => {
  it("Load Chat User B account, accept Chat User B friend request and then assert message received", async () => {
    // Go to Friends Screen
    await resetAndLoginWithCache("ChatUserB");
    await WelcomeScreen.goToFriends();
    await FriendsScreen.waitForIsShown(true);

    // Accept incoming request from ChatUserA
    await FriendsScreen.goToPendingFriendsList();
    await (await FriendsScreen.acceptFriendRequestButton).waitForDisplayed();
    await (await FriendsScreen.acceptFriendRequestButton).click();

    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await FriendsScreen.goToAllFriendsList();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    await (await ChatScreen.chatMessage).waitForDisplayed();
    expect(await ChatScreen.chatMessageText).toHaveTextContaining("testing...");
  });
});

import { loginWithTestUser } from "../helpers/commands";
import ChatScreen from "../screenobjects/ChatScreen";
import FriendsScreen from "../screenobjects/FriendsScreen";
import WelcomeScreen from "../screenobjects/WelcomeScreen";
const userBKey = "did:key:z6MksTuCXHc1uy9DqyPaaWjSXwi2ZUcQkSoVgdLxg8GKPuWW";

describe("Two users at the same time - Chat User A", async () => {
  it("Load Chat User A account, add Chat User B as friend and then send a message", async () => {
    // Go to Friends Screen
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();

    // Go to Friends
    await FriendsScreen.waitForIsShown(true);

    // Send friend request to user B
    await FriendsScreen.addSomeoneInput.setValue(userBKey);
    await FriendsScreen.addSomeoneButton.click();

    // Validate Toast Notification is displayed
    await (await FriendsScreen.toastNotification).waitForDisplayed();
    await (
      await FriendsScreen.toastNotification
    ).waitForDisplayed({ reverse: true });

    // Wait until friend request is accepted and go to a Chat Conversation with Chat User B
    await (
      await FriendsScreen.chatWithFriendButton
    ).waitForExist({ timeout: 59000 });
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    await (await ChatScreen.inputText).setValue("testing...");
    await ChatScreen.inputSendButton.click();

    await (await ChatScreen.chatMessage).waitForDisplayed();
    expect(await ChatScreen.chatMessageText).toHaveTextContaining("testing...");
  });
});

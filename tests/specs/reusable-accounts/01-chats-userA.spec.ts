import { loginWithTestUser } from "../../helpers/commands";
import ChatScreen from "../../screenobjects/ChatScreen";
import FriendsScreen from "../../screenobjects/FriendsScreen";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";

describe("Two users at the same time - Chat User A", async () => {
  it("Load Chat User A account, add Chat User B as friend and then send a message", async () => {
    // Go to Friends Screen
    await loginWithTestUser();
    await WelcomeScreen.goToFriends();

    // Go to Friends
    await FriendsScreen.waitForIsShown(true);
  });

  it("Go to chat with friend and send a message", async () => {
    await browser.pause(59000); // wait for one minute to the other user to be online before sending a message
    await (await FriendsScreen.chatWithFriendButton).waitForExist();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    await (await ChatScreen.inputText).setValue("testing...");
    await ChatScreen.inputSendButton.click();

    await (await ChatScreen.chatMessage).waitForDisplayed();
    expect(await ChatScreen.chatMessageText).toHaveTextContaining("testing...");
  });

  xit("Send friend request flow", async () => {
    // Send friend request to user B
    //await FriendsScreen.addSomeoneInput.setValue(userBKey);
    await FriendsScreen.addSomeoneButton.click();

    // Validate Toast Notification is displayed
    await (await FriendsScreen.toastNotification).waitForDisplayed();
    await (
      await FriendsScreen.toastNotification
    ).waitForDisplayed({ reverse: true });

    // Wait until friend request is accepted and go to a Chat Conversation with Chat User B
    await FriendsScreen.goToPendingFriendsList();
    await (
      await FriendsScreen.removeOrDenyFriendButton
    ).waitForExist({ reverse: true, timeout: 180000 });

    // Go to All Friends List and validate Chat with Friend Button is displayed
    await FriendsScreen.goToAllFriendsList();
    await (await FriendsScreen.chatWithFriendButton).waitForExist();
  });
});

import { loginWithTestUser } from "../../helpers/commands";
import { faker } from "@faker-js/faker";
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
    await (await FriendsScreen.chatWithFriendButton).waitForExist();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    const paragraph = await faker.lorem.words(30);
    await ChatScreen.typeMessageOnInput(paragraph);
    await ChatScreen.clearInputBar();

    await ChatScreen.typeMessageOnInput("testing...");
    await ChatScreen.clickOnSendMessage();

    const textFromMessage = await ChatScreen.getLastMessageSentText();
    await expect(textFromMessage).toEqual("testing...");
    await browser.pause(30000);
  });

  it("Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await ChatScreen.getLastMessageSentLocator();
    await expect(lastMessage).toBeDisplayed();
  });

  it("Validate Chat Message displays timestamp", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await ChatScreen.getLastMessageSentTimeAgo();
    await expect(timeAgo).toEqual("now");
  });

  it("Validate Chat Message displays username who sent it", async () => {
    // ChatUserA username should be above of the messages group
    const sender = await ChatScreen.getLastMessageSentUsername();
    await expect(sender).toEqual("ChatUserA");
  });

  it("Validate Chat Message Group displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
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

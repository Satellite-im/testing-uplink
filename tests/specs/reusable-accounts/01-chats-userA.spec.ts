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
  });

  it("Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await ChatScreen.getLastMessageSentLocator();
    await expect(lastMessage).toBeDisplayed();
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

  it("Validate Chat Message displays timestamp", async () => {
    // Type a long message and do not send it
    await ChatScreen.typeMessageOnInput(
      "this is a looooong message that will not be send"
    );
    await ChatScreen.clearInputBar();

    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining("seconds ago");

    // At the end of testing, wait for 30 seconds before ending session
    await browser.pause(30000);
  });
});

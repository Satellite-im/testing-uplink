import { loginWithTestUser } from "../../helpers/commands";
import { faker } from "@faker-js/faker";
import ChatScreen from "../../screenobjects/ChatScreen";
import FriendsScreen from "../../screenobjects/FriendsScreen";
import WelcomeScreen from "../../screenobjects/WelcomeScreen";

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

    const paragraph = await faker.lorem.words(30);
    await (await ChatScreen.inputText).setValue(paragraph);
    await (await ChatScreen.inputText).clearValue();

    await (await ChatScreen.chatMessage).waitForDisplayed({ timeout: 180000 });
    const textFromMessage = await ChatScreen.getLastMessageReceivedText();
    await expect(textFromMessage).toEqual("testing...");
  });

  it("Validate Chat Message received contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await ChatScreen.getLastMessageReceivedLocator();
    await expect(lastMessage).toBeDisplayed();
  });

  it("Validate Chat Message received displays username who sent it", async () => {
    // ChatUserA username should be above of the messages group
    const sender = await ChatScreen.getLastMessageReceivedUsername();
    await expect(sender).toEqual("ChatUserA");
  });

  it("Validate Chat Message Group from remote user displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Validate Chat Message received displays timestamp", async () => {
    //Timestamp should be displayed when you send a message
    const timeAgo = await ChatScreen.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toContain("seconds ago");
  });
});

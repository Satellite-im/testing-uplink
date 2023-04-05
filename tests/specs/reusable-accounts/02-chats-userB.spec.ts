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

    // Wait until Chat User A is online
    await (
      await ChatScreen.topbarIndicatorOnline
    ).waitForDisplayed({ timeout: 180000 });
  });

  it("Assert message received from Chat User A", async () => {
    await (await ChatScreen.chatMessage).waitForDisplayed({ timeout: 30000 });
    const textFromMessage = await ChatScreen.getLastMessageReceivedText();
    expect(textFromMessage).toEqual("testing...");
  });

  it("Validate Chat Message received contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await ChatScreen.getLastMessageReceivedLocator();
    expect(lastMessage).toBeDisplayed();
  });

  it("Validate Chat Message Group from remote user displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    expect(onlineIndicator).toExist();
  });

  it("Validate Chat Message received displays timestamp and user who sent it", async () => {
    // Type a long message and do not send it
    const paragraph = faker.lorem.words(15);
    await ChatScreen.typeMessageOnInput(paragraph);
    await ChatScreen.clearInputBar();

    //Timestamp should be displayed when you send a message
    const timeAgo = await ChatScreen.getLastMessageReceivedTimeAgo();
    expect(timeAgo).toContain("seconds ago");
    expect(timeAgo).toContain("ChatUserA");

    // Pause for 30 seconds before finishing execution
    await browser.pause(30000);
  });
});

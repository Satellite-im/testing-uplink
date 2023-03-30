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

    const paragraph = faker.lorem.words(30);
    await ChatScreen.typeMessageOnInput(paragraph);
    await ChatScreen.clearInputBar();

    await ChatScreen.typeMessageOnInput("testing...");
    await ChatScreen.clickOnSendMessage();

    const textFromMessage = await ChatScreen.getLastMessageSentText();
    expect(textFromMessage).toEqual("testing...");
  });

  it("Validate Chat Message sent contents", async () => {
    //Any message you sent yourself should appear within a colored message bubble
    const lastMessage = await ChatScreen.getLastMessageSentLocator();
    expect(lastMessage).toBeDisplayed();
  });

  it("Validate Chat Message Group displays username picture and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    expect(onlineIndicator).toExist();
  });

  it("Validate Chat Message displays timestamp and user who sent it", async () => {
    // Type a long message and do not send it
    await ChatScreen.typeMessageOnInput(
      "this is a looooong message that will not be send"
    );
    await ChatScreen.clearInputBar();

    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageSentTimeAgo();
    expect(timeAgo).toContain("seconds ago");
    expect(timeAgo).toContain("ChatUserA");

    // At the end of testing, wait for 30 seconds before ending session
    await browser.pause(30000);
  });

  it("Validate Chat Screen tooltips are displayed", async () => {
    // Validate Favorites button tooltip
    await ChatScreen.hoverOnFavoritesButton();
    expect(await ChatScreen.topbarAddToFavoritesTooltip).toBeDisplayed();
    expect(
      await ChatScreen.topbarAddToFavoritesTooltipText
    ).toHaveTextContaining("Add to Favorites");

    // Validate Upload button tooltip
    await ChatScreen.hoverOnUploadButton();
    expect(await ChatScreen.uploadTooltip).toBeDisplayed();
    expect(await ChatScreen.uploadTooltipText).toHaveTextContaining("Upload");

    // Validate Send button tooltip
    await ChatScreen.hoverOnSendButton();
    expect(await ChatScreen.sendMessageTooltip).toBeDisplayed();
    expect(await ChatScreen.sendMessageTooltipText).toHaveTextContaining(
      "Send"
    );
  });
});

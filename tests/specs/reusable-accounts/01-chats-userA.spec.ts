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

  it("Go to chat with friend and wait until user is online", async () => {
    await (await FriendsScreen.chatWithFriendButton).waitForExist();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    // Wait until Chat User B is online
    await (
      await ChatScreen.topbarIndicatorOnline
    ).waitForDisplayed({ timeout: 240000 });
  });

  it("Chats - Send a message to the other user", async () => {
    await ChatScreen.typeMessageOnInput("testing...");
    await ChatScreen.clickOnSendMessage();

    const textFromMessage = await ChatScreen.getLastMessageSentText();
    expect(textFromMessage).toEqual("testing...");
  });

  it("Validate Chat Message displays timestamp and user who sent it", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageSentTimeAgo();
    expect(timeAgo).toHaveTextContaining(
      /^(?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    expect(timeAgo).toHaveTextContaining("ChatUserA");
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

  it("Chats - Add user with active chat to Favorites", async () => {
    // Add user to favorites
    await ChatScreen.addToFavorites();
    await (await ChatScreen.favorites).waitForDisplayed();

    // Favorites Sidebar should be displayed
    expect(await ChatScreen.favoritesUserImage).toBeDisplayed();
    expect(await ChatScreen.favoritesUserIndicatorOnline).toBeDisplayed();
    expect(await ChatScreen.favoritesUserName).toHaveTextContaining(
      "CHATUS..."
    );
  });

  it("Chats - Remove user with active chat from Favorites", async () => {
    // Remove user from favorites
    await ChatScreen.removeFromFavorites();
    await (await ChatScreen.favorites).waitForDisplayed({ reverse: true });
  });

  it("Chats - Topbar information", async () => {
    // Validate user image, username and online indicator are displayed on Chat Topbar
    expect(await ChatScreen.topbarUserImage).toBeDisplayed();
    expect(await ChatScreen.topbarUserName).toHaveTextContaining("ChatUserB");
    expect(await ChatScreen.topbarIndicatorOnline).toBeDisplayed();
  });

  it("Receive Reply - Validate reply message is received from remote user", async () => {
    // Wait until reply is received
    await ChatScreen.waitUntilReplyIsReceived();
  });

  it("Receive Reply - Validate reply message contents", async () => {
    // Validate message replied appears smaller above your reply
    const replyReceived = await ChatScreen.getLastReplyReceived();
    const replyReceivedText = await ChatScreen.getLastReplyReceivedText();
    expect(replyReceived).toBeDisplayed();
    expect(replyReceivedText).toHaveTextContaining("testing...");

    // Validate reply message sent appears as last message
    const textFromMessage = await ChatScreen.getLastMessageReceivedText();
    expect(textFromMessage).toEqual("this is a reply");
  });

  it("Receive Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageReceivedTimeAgo();
    expect(timeAgo).toHaveTextContaining(
      /^(?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Receive Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    expect(onlineIndicator).toExist();
  });

  after(async () => {
    // Pause for 30 seconds before finishing execution
    await browser.pause(30000);
  });
});

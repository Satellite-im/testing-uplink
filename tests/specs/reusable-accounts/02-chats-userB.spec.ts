import { loginWithTestUser } from "../../helpers/commands";
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

  it("Wait until the other user is online", async () => {
    // Go to the current list of All friends and then open a Chat conversation with ChatUserA
    await (await FriendsScreen.chatWithFriendButton).waitForExist();
    await (await FriendsScreen.chatWithFriendButton).click();
    await ChatScreen.waitForIsShown(true);

    // Wait until Chat User A is online
    await (
      await ChatScreen.topbarIndicatorOnline
    ).waitForDisplayed({ timeout: 240000 });
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
    //Timestamp should be displayed when you send a message
    const timeAgo = await ChatScreen.getLastMessageReceivedTimeAgo();
    expect(timeAgo).toHaveTextContaining(
      /^(?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    expect(timeAgo).toHaveTextContaining("ChatUserA");
  });

  it("Reply popup - Validate contents and close it", async () => {
    await ChatScreen.openContextMenuOnReceivedMessage();
    await ChatScreen.selectContextOption(0);

    // Validate contents of Reply Pop Up
    expect(await ChatScreen.replyPopUpCloseButton).toBeDisplayed();
    expect(await ChatScreen.replyPopUpHeader).toHaveTextContaining(
      "REPLYING TO:"
    );
    expect(await ChatScreen.replyPopUpIndicatorOnline).toBeDisplayed();
    expect(await ChatScreen.replyPopUpTextToReply).toHaveTextContaining(
      "testing..."
    );
    expect(await ChatScreen.replyPopUpUserImage).toBeDisplayed();

    await ChatScreen.closeReplyModal();
    await ChatScreen.waitForReplyModalToNotExist();
  });

  it("Reply - Reply to a message", async () => {
    await ChatScreen.openContextMenuOnReceivedMessage();
    await ChatScreen.selectContextOption(0);

    // Type a reply and sent it
    await (await ChatScreen.replyPopUpHeader).waitForDisplayed();
    await ChatScreen.typeMessageOnInput("this is a reply");
    await ChatScreen.clickOnSendMessage();
    await ChatScreen.waitForReplyModalToNotExist();
  });

  it("Send Reply - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await ChatScreen.getLastReplySent();
    const replySentText = await ChatScreen.getLastReplySentText();
    expect(replySent).toBeDisplayed();
    expect(replySentText).toHaveTextContaining("testing...");

    // Validate reply message sent appears as last message
    const textFromMessage = await ChatScreen.getLastMessageSentText();
    expect(textFromMessage).toEqual("this is a reply");
  });

  it("Send Reply - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await ChatScreen.getLastMessageSentTimeAgo();
    expect(timeAgo).toHaveTextContaining(
      /^(?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Send Reply - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await ChatScreen.getLastGroupWrapImage();
    expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await ChatScreen.getLastGroupWrapOnline();
    expect(onlineIndicator).toExist();
  });

  it("Validate that second message was edited", async () => {
    // Validate that last message is "message edited..."
    await ChatScreen.waitForReceivingMessage("message edited...", 180000);
  });

  it("Validate that only deleted message is no longer in conversation", async () => {
    // Ensure that last received group only contains one message, the edited one
    const numberOfMessagesInGroup =
      await ChatScreen.getNumberOfMessagesInLastReceivedGroup();
    expect(numberOfMessagesInGroup).toEqual(1);
  });

  after(async () => {
    // Pause for 30 seconds before finishing execution
    await browser.pause(30000);
  });
});

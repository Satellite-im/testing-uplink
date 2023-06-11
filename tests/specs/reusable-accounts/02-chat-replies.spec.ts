import ContextMenu from "../../screenobjects/chats/ContextMenu";
import InputBar from "../../screenobjects/chats/InputBar";
import MessageGroup from "../../screenobjects/chats/MessageGroup";
import Messages from "../../screenobjects/chats/Messages";
import ReplyPrompt from "../../screenobjects/chats/ReplyPrompt";
let chatsContextMenuSecondUser = new ContextMenu("userB");
let chatsInputSecondUser = new InputBar("userB");
let chatsMessageGroupsFirstUser = new MessageGroup("userA");
let chatsMessageGroupsSecondUser = new MessageGroup("userB");
let chatsMessagesFirstUser = new Messages("userA");
let chatsMessagesSecondUser = new Messages("userB");
let chatsReplyPromptSecondUser = new ReplyPrompt("userB");

export default async function repliesTests() {
  it("Chat User B - Reply popup - Validate contents and close it", async () => {
    await chatsMessagesSecondUser.openContextMenuOnLastReceived();
    await chatsContextMenuSecondUser.validateContextMenuIsOpen();
    await chatsContextMenuSecondUser.selectContextOptionReply();

    // Validate contents of Reply Pop Up
    await expect(chatsReplyPromptSecondUser.replyPopUp).toBeDisplayed();
    await expect(
      chatsReplyPromptSecondUser.replyPopUpCloseButton
    ).toBeDisplayed();
    await expect(
      chatsReplyPromptSecondUser.replyPopUpHeader
    ).toHaveTextContaining("REPLYING TO:");
    await expect(
      chatsReplyPromptSecondUser.replyPopUpIndicatorOnline
    ).toBeDisplayed();
    await expect(
      chatsReplyPromptSecondUser.replyPopUpRemoteTextToReplyValue
    ).toHaveTextContaining("Testing...");
    await expect(
      chatsReplyPromptSecondUser.replyPopUpUserImage
    ).toBeDisplayed();

    await chatsReplyPromptSecondUser.closeReplyModal();
    await chatsReplyPromptSecondUser.waitForReplyModalToNotExist();
  });

  it("Chat User B - Reply to a message", async () => {
    await chatsMessagesSecondUser.openContextMenuOnLastReceived();
    await chatsContextMenuSecondUser.validateContextMenuIsOpen();
    await chatsContextMenuSecondUser.selectContextOptionReply();

    // Type a reply and sent it
    await chatsReplyPromptSecondUser.replyPopUp.waitForDisplayed();
    await chatsInputSecondUser.typeMessageOnInput("Reply");
    await chatsInputSecondUser.clickOnSendMessage();
    await chatsReplyPromptSecondUser.waitForReplyModalToNotExist();
  });

  it("Chat User B - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await chatsMessagesSecondUser.getLastReply();
    const replySentText = await chatsMessagesSecondUser.getLastReplyText();
    await expect(replySent).toBeDisplayed();
    await expect(replySentText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const message = await chatsMessagesSecondUser.getLastMessageSentText();
    await expect(message).toHaveTextContaining("Reply");
  });

  it("Chat User B - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsSecondUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Chat User B - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsSecondUser.getLastGroupWrapSentImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsSecondUser.getLastGroupWrapSentOnline();
    await expect(onlineIndicator).toExist();
    await chatsMessageGroupsSecondUser.switchToOtherUserWindow();

    // With User A - Validate that reply message is received
    await chatsMessagesFirstUser.chatMessageReply.waitForDisplayed({
      timeout: 180000,
    });
  });

  it("Chat User A - Validate reply message contents", async () => {
    // Validate message replied appears smaller above your reply
    const replyReceived = await chatsMessagesFirstUser.getLastReply();
    const replyReceivedText = await chatsMessagesFirstUser.getLastReplyText();
    await expect(replyReceived).toBeDisplayed();
    await expect(replyReceivedText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const textFromMessage =
      await chatsMessagesFirstUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Reply");
  });

  it("Chat User A - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Chat User A - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapReceivedImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator =
      await chatsMessageGroupsFirstUser.getLastGroupWrapReceivedOnline();
    await expect(onlineIndicator).toExist();
  });
}

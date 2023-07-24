import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
import ContextMenu from "../../screenobjects/chats/ContextMenu";
import InputBar from "../../screenobjects/chats/InputBar";
import MessageGroup from "../../screenobjects/chats/MessageGroup";
import Messages from "../../screenobjects/chats/Messages";
import ReplyPrompt from "../../screenobjects/chats/ReplyPrompt";
let chatsContextMenuFirstUser = new ContextMenu(USER_A_INSTANCE);
let chatsContextMenuSecondUser = new ContextMenu(USER_B_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsMessageGroupsSecondUser = new MessageGroup(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsReplyPromptFirstUser = new ReplyPrompt(USER_A_INSTANCE);
let chatsReplyPromptSecondUser = new ReplyPrompt(USER_B_INSTANCE);

export default async function repliesTests() {
  it("Chat User B - Reply popup - Validate contents and close it", async () => {
    await chatsMessagesSecondUser.openContextMenuOnLastReceived();
    await chatsContextMenuSecondUser.validateContextMenuIsOpen();
    await chatsContextMenuSecondUser.selectContextOptionReply();

    // Validate contents of Reply Pop Up
    await chatsReplyPromptSecondUser.replyPopUp.waitForDisplayed();
    await chatsReplyPromptSecondUser.replyPopUpCloseButton.waitForDisplayed();
    await expect(
      chatsReplyPromptSecondUser.replyPopUpHeader
    ).toHaveTextContaining("REPLYING TO:");
    await chatsReplyPromptSecondUser.replyPopUpIndicatorOnline.waitForDisplayed();
    await expect(
      chatsReplyPromptSecondUser.replyPopUpRemoteTextToReplyValue
    ).toHaveTextContaining("Testing...");
    await chatsReplyPromptSecondUser.replyPopUpUserImage.waitForDisplayed();

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
    await replySent.waitForDisplayed();
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
    await chatsMessagesFirstUser.switchToOtherUserWindow();

    // With User A - Validate that reply message is received
    await chatsMessagesFirstUser.chatMessageReply.waitForDisplayed({
      timeout: 90000,
    });
  });

  it("Chat User A - Validate reply message contents", async () => {
    // Validate message replied appears smaller above your reply
    const replyReceived = await chatsMessagesFirstUser.getLastReply();
    const replyReceivedText = await chatsMessagesFirstUser.getLastReplyText();
    await replyReceived.waitForDisplayed();
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

  it("Chat User A - Reply to yourself", async () => {
    // Open Context Menu on Last Message Sent
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionReply();

    // Type a reply and sent it
    await chatsReplyPromptFirstUser.replyPopUp.waitForDisplayed();
    await chatsInputFirstUser.typeMessageOnInput("SelfReply");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsReplyPromptFirstUser.waitForReplyModalToNotExist();

    // Validate reply to self message is displayed on Chat Conversation
    const repliedMessage = await chatsMessagesFirstUser.getLastReply();
    const repliedMessageText = await chatsMessagesFirstUser.getLastReplyText();
    await repliedMessage.waitForDisplayed();
    await expect(repliedMessageText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const message = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(message).toHaveTextContaining("SelfReply");
  });
}

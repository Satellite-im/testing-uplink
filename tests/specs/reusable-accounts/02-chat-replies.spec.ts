require("module-alias/register");
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import ReplyPrompt from "@screenobjects/chats/ReplyPrompt";
import {
  activateFirstApplication,
  activateSecondApplication,
  closeFirstApplication,
  closeSecondApplication,
  loginWithTestUser,
} from "@helpers/commands";
const chatsContextMenuFirstUser = new ContextMenu();
const chatsInputFirstUser = new InputBar();
const messageGroupLocalFirstUser = new MessageGroupLocal();
const messageGroupRemoteFirstUser = new MessageGroupRemote();
const messageLocalFirstUser = new MessageLocal();
const messageRemoteFirstUser = new MessageRemote();
const chatsReplyPromptFirstUser = new ReplyPrompt();

export default async function repliesTests() {
  before(async () => {
    await closeSecondApplication();
    await closeFirstApplication();
    await activateSecondApplication();
    await loginWithTestUser();
  });

  it("Chat User B - Reply popup - Validate contents and close it", async () => {
    // Open Context Menu on Last Message Received and select Reply
    await messageRemoteFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionReply();

    // Validate contents of Reply Pop Up and close it
    await chatsReplyPromptFirstUser.validateReplyPromptElementsShown(
      "Testing...😀",
    );
    await chatsReplyPromptFirstUser.closeReplyModal();
    await chatsReplyPromptFirstUser.waitForReplyModalToNotExist();
  });

  it("Chat User B - Reply to a message", async () => {
    // Open Context Menu on Last Message Received and select Reply
    await messageRemoteFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionReply();

    // Type a reply and sent it
    await chatsReplyPromptFirstUser.replyPopUp.waitForExist();
    await chatsInputFirstUser.typeMessageOnInput("Reply");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsReplyPromptFirstUser.waitForReplyModalToNotExist();
  });

  it("Chat User B - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await messageRemoteFirstUser.getLastReply();
    const replySentText = await messageRemoteFirstUser.getLastReplyText();
    await replySent.waitForExist();
    await expect(replySentText).toHaveTextContaining("Testing...😀");

    // Validate reply message sent appears as last message
    const message = await messageLocalFirstUser.getLastMessageSentText();
    await expect(message).toHaveTextContaining("Reply");
  });

  it("Chat User B - Validate reply message group contains timestamp and user image", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await messageGroupLocalFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");

    //Your user image should be displayed next to the message
    const userImage =
      await messageGroupLocalFirstUser.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Validate reply message contents", async () => {
    // Switch control to User A
    await activateFirstApplication();
    await loginWithTestUser();
    await closeSecondApplication();

    // With User A - Validate that reply message is received
    await messageRemoteFirstUser.chatMessageReply.waitForExist();

    // Validate message replied appears smaller above your reply
    const replyReceived = await messageRemoteFirstUser.getLastReply();
    const replyReceivedText = await messageRemoteFirstUser.getLastReplyText();
    await replyReceived.waitForExist();
    await expect(replyReceivedText).toHaveTextContaining("Testing...😀");

    // Validate reply message sent appears as last message
    const textFromMessage =
      await messageRemoteFirstUser.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Reply");
  });

  it("Chat User A - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await messageGroupRemoteFirstUser.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Chat User A - Validate reply message group contains user image", async () => {
    //Your user image should be displayed next to the message
    const userImage =
      await messageGroupRemoteFirstUser.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Reply to yourself", async () => {
    // Open Context Menu on Last Message Sent
    await messageLocalFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionReply();

    // Type a reply and sent it
    await chatsReplyPromptFirstUser.replyPopUp.waitForExist();
    await chatsInputFirstUser.typeMessageOnInput("SelfReply");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsReplyPromptFirstUser.waitForReplyModalToNotExist();

    // Validate reply to self message is displayed on Chat Conversation
    const repliedMessage = await messageLocalFirstUser.getLastReply();
    const repliedMessageText = await messageLocalFirstUser.getLastReplyText();
    await repliedMessage.waitForExist();
    await expect(repliedMessageText).toHaveTextContaining("Testing...😀");

    // Validate reply message sent appears as last message
    const message = await messageLocalFirstUser.getLastMessageSentText();
    await expect(message).toHaveTextContaining("SelfReply");
  });
}

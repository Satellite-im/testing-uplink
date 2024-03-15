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
  closeFirstApplication,
  closeSecondApplication,
  closeThirdApplication,
  launchFirstApplication,
  launchSecondApplication,
  launchThirdApplication,
} from "@helpers/commands";
const chatsContextMenu = new ContextMenu();
const chatsInput = new InputBar();
const chatsReplyPrompt = new ReplyPrompt();
const messageGroupLocal = new MessageGroupLocal();
const messageGroupRemote = new MessageGroupRemote();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();

export default async function repliesTests() {
  before(async () => {
    await launchFirstApplication();
    await launchSecondApplication();
  });

  it("Chat User B - Reply popup - Validate contents and close it", async () => {
    // Open Context Menu on Last Message Received and select Reply
    await messageRemote.openContextMenuOnReceivedMessage("Testing...😀");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.selectContextOptionReply();

    // Validate contents of Reply Pop Up and close it
    await chatsReplyPrompt.validateReplyPromptElementsShown("Testing...😀");
    await chatsReplyPrompt.closeReplyModal();
    await chatsReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Chat User B - Reply to a message", async () => {
    // Open Context Menu on Last Message Received and select Reply
    await messageRemote.openContextMenuOnReceivedMessage("Testing...😀");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.selectContextOptionReply();

    // Type a reply and sent it
    await chatsReplyPrompt.replyPopUp.waitForExist();
    await chatsInput.typeMessageOnInput("Reply");
    await chatsInput.clickOnSendMessage();
    await chatsReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Chat User B - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await messageRemote.getLastReply();
    const replySentText = await messageRemote.getLastReplyText();
    await replySent.waitForExist();
    await expect(replySentText).toHaveText("Testing...😀");

    // Validate reply message sent appears as last message
    const message = await messageLocal.getCustomMessageContents("Reply");
    await expect(message).toHaveText("Reply");
  });

  it("Chat User B - Validate reply message group contains timestamp and user image", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await messageGroupLocal.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");

    //Your user image should be displayed next to the message
    const userImage = await messageGroupLocal.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Chat User B - Validate User Status changes are seen in remote side", async () => {
    // Validate Chat User B is now Idle
    const firstRemoteStatus =
      await messageGroupRemote.getLastGroupWrapReceivedCurrentStatus();
    await expect(firstRemoteStatus).toEqual("indicator-idle");
  });

  it("Chat User A - Validate reply message contents", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // With User A - Validate that reply message is received
    await messageRemote.chatMessageReply.waitForExist();

    // Validate message replied appears smaller above your reply
    const replyReceived = await messageRemote.getLastReply();
    const replyReceivedText = await messageRemote.getLastReplyText();
    await replyReceived.waitForExist();
    await expect(replyReceivedText).toHaveText("Testing...😀");

    // Validate reply message sent appears as last message
    const textFromMessage =
      await messageRemote.getCustomMessageContents("Reply");
    await expect(textFromMessage).toHaveText("Reply");
  });

  it("Chat User A - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await messageGroupRemote.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Chat User A - Validate reply message group contains user image", async () => {
    //Your user image should be displayed next to the message
    const userImage = await messageGroupRemote.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Reply to yourself", async () => {
    // Open Context Menu on Last Message Sent
    await messageLocal.openContextMenuOnSentMessage("Testing...😀");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.selectContextOptionReply();

    // Type a reply and sent it
    await chatsReplyPrompt.replyPopUp.waitForExist();
    await chatsInput.typeMessageOnInput("SelfReply");
    await chatsInput.clickOnSendMessage();
    await chatsReplyPrompt.waitForReplyModalToNotExist();

    // Validate reply to self message is displayed on Chat Conversation
    const repliedMessage = await messageLocal.getLastReply();
    const repliedMessageText = await messageLocal.getLastReplyText();
    await repliedMessage.waitForExist();
    await expect(repliedMessageText).toHaveText("Testing...😀");

    // Validate reply message sent appears as last message
    const message = await messageLocal.getCustomMessageContents("SelfReply");
    await expect(message).toHaveText("SelfReply");
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}

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
  launchFirstApplication,
  launchSecondApplication,
} from "@helpers/commands";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";

export default async function repliesTests() {
  before(async () => {
    await launchFirstApplication();
    await CreatePinScreen.loginWithTestUser();
    await launchSecondApplication();
    await CreatePinScreen.loginWithTestUser();
  });

  it("Chat User B - Reply popup - Validate contents and close it", async () => {
    // Open Context Menu on Last Message Received and select Reply
    await MessageRemote.openContextMenuOnReceivedMessage("Testing...😀");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionReply();

    // Validate contents of Reply Pop Up and close it
    await ReplyPrompt.validateReplyPromptElementsShown("Testing...😀");
    await ReplyPrompt.closeReplyModal();
    await ReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Chat User B - Reply to a message", async () => {
    // Open Context Menu on Last Message Received and select Reply
    await MessageRemote.openContextMenuOnReceivedMessage("Testing...😀");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionReply();

    // Type a reply and sent it
    await ReplyPrompt.replyPopUp.waitForExist();
    await InputBar.typeMessageOnInput("Reply");
    await InputBar.clickOnSendMessage();
    await ReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Chat User B - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await MessageRemote.getLastReply();
    const replySentText = await MessageRemote.getLastReplyText();
    await replySent.waitForExist();
    await expect(replySentText).toHaveText("Testing...😀");

    // Validate reply message sent appears as last message
    const message = await MessageLocal.getCustomMessageContents("Reply");
    await expect(message).toHaveText("Reply");
  });

  it("Chat User B - Validate reply message group contains timestamp and user image", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroupLocal.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveText(
      expect.stringMatching(/- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/),
    );
    await expect(timeAgo).toHaveText("ChatUserB");

    //Your user image should be displayed next to the message
    const userImage = await MessageGroupLocal.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });

  it("Chat User B - Validate User Status changes are seen in remote side", async () => {
    // Validate Chat User B is now Idle
    const firstRemoteStatus =
      await MessageGroupRemote.getLastGroupWrapReceivedCurrentStatus();
    await expect(firstRemoteStatus).toEqual("indicator-idle");
  });

  it("Chat User A - Validate reply message contents", async () => {
    // Switch control to User A
    await activateFirstApplication();

    // With User A - Validate that reply message is received
    await MessageRemote.chatMessageReply.waitForExist();

    // Validate message replied appears smaller above your reply
    const replyReceived = await MessageRemote.getLastReply();
    const replyReceivedText = await MessageRemote.getLastReplyText();
    await replyReceived.waitForExist();
    await expect(replyReceivedText).toHaveText("Testing...😀");

    // Validate reply message sent appears as last message
    const textFromMessage =
      await MessageRemote.getCustomMessageContents("Reply");
    await expect(textFromMessage).toHaveText("Reply");
  });

  it("Chat User A - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroupRemote.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveText(
      expect.stringMatching(/- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/),
    );
    await expect(timeAgo).toHaveText("ChatUserB");
  });

  it("Chat User A - Validate reply message group contains user image", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroupRemote.getLastGroupWrapReceivedImage();
    await userImage.waitForExist();
  });

  it("Chat User A - Reply to yourself", async () => {
    // Open Context Menu on Last Message Sent
    await MessageLocal.openContextMenuOnSentMessage("Testing...😀");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionReply();

    // Type a reply and sent it
    await ReplyPrompt.replyPopUp.waitForExist();
    await InputBar.typeMessageOnInput("SelfReply");
    await InputBar.clickOnSendMessage();
    await ReplyPrompt.waitForReplyModalToNotExist();

    // Validate reply to self message is displayed on Chat Conversation
    const repliedMessage = await MessageLocal.getLastReply();
    const repliedMessageText = await MessageLocal.getLastReplyText();
    await repliedMessage.waitForExist();
    await expect(repliedMessageText).toHaveText("Testing...😀");

    // Validate reply message sent appears as last message
    const message = await MessageLocal.getCustomMessageContents("SelfReply");
    await expect(message).toHaveText("SelfReply");
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}

import { launchAppForChatUserA } from "../../helpers/commands";
import ContextMenu from "../../screenobjects/chats/ContextMenu";
import InputBar from "../../screenobjects/chats/InputBar";
import MessageGroup from "../../screenobjects/chats/MessageGroup";
import Messages from "../../screenobjects/chats/Messages";
import ReplyPrompt from "../../screenobjects/chats/ReplyPrompt";

export default async function repliesTests() {
  it("Chat User B - Reply popup - Validate contents and close it", async () => {
    await Messages.openContextMenuOnLastReceived();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionReply();

    // Validate contents of Reply Pop Up
    await expect(ReplyPrompt.replyPopUp).toBeDisplayed();
    await expect(ReplyPrompt.replyPopUpCloseButton).toBeDisplayed();
    await expect(ReplyPrompt.replyPopUpHeader).toHaveTextContaining(
      "REPLYING TO:"
    );
    await expect(ReplyPrompt.replyPopUpIndicatorOnline).toBeDisplayed();
    await expect(
      ReplyPrompt.replyPopUpRemoteTextToReplyValue
    ).toHaveTextContaining("Testing...");
    await expect(ReplyPrompt.replyPopUpUserImage).toBeDisplayed();

    await ReplyPrompt.closeReplyModal();
    await ReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Chat User B - Reply to a message", async () => {
    await Messages.openContextMenuOnLastReceived();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionReply();

    // Type a reply and sent it
    await ReplyPrompt.replyPopUp.waitForDisplayed();
    await InputBar.typeMessageOnInput("Myreply...");
    await InputBar.clickOnSendMessage();
    await ReplyPrompt.waitForReplyModalToNotExist();
  });

  it("Chat User B - Validate reply message group reply and message replied", async () => {
    // Validate message replied appears smaller above your reply
    const replySent = await Messages.getLastReply();
    const replySentText = await Messages.getLastReplyText();
    await expect(replySent).toBeDisplayed();
    await expect(replySentText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const message = await Messages.getLastMessageSentText();
    await expect(message).toHaveTextContaining("Myreply...");
  });

  it("Chat User B - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroup.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Chat User B - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroup.getLastGroupWrapSentImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await MessageGroup.getLastGroupWrapSentOnline();
    await expect(onlineIndicator).toExist();
  });

  it("Chat User A - Validate reply message is received from remote user", async () => {
    await launchAppForChatUserA();
    // Wait until reply is received
    await Messages.chatMessageReply.waitForDisplayed({ timeout: 180000 });
  });

  it("Chat User A - Validate reply message contents", async () => {
    // Validate message replied appears smaller above your reply
    const replyReceived = await Messages.getLastReply();
    const replyReceivedText = await Messages.getLastReplyText();
    await expect(replyReceived).toBeDisplayed();
    await expect(replyReceivedText).toHaveTextContaining("Testing...");

    // Validate reply message sent appears as last message
    const textFromMessage = await Messages.getLastMessageReceivedText();
    await expect(textFromMessage).toHaveTextContaining("Myreply...");
  });

  it("Chat User A - Validate reply message group contains timestamp", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo = await MessageGroup.getLastMessageReceivedTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");
  });

  it("Chat User A - Validate reply message group contains user image and online indicator", async () => {
    //Your user image should be displayed next to the message
    const userImage = await MessageGroup.getLastGroupWrapReceivedImage();
    await expect(userImage).toExist();

    //Online indicator of your user should be displayed next to the image
    const onlineIndicator = await MessageGroup.getLastGroupWrapReceivedOnline();
    await expect(onlineIndicator).toExist();
  });
}

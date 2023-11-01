import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Messages from "@screenobjects/chats/Messages";
import ReplyPrompt from "@screenobjects/chats/ReplyPrompt";
let chatsContextMenuFirstUser = new ContextMenu(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsReplyPromptFirstUser = new ReplyPrompt(USER_A_INSTANCE);

export default async function repliesTestsUserB() {
  it("Chat User B - Reply popup - Validate contents and close it", async () => {
    // Open Context Menu on Last Message Received and select Reply
    await chatsMessagesFirstUser.openContextMenuOnLastReceived();
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
    await chatsMessagesFirstUser.openContextMenuOnLastReceived();
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
    const replySent = await chatsMessagesFirstUser.getLastReply();
    const replySentText = await chatsMessagesFirstUser.getLastReplyText();
    await replySent.waitForExist();
    await expect(replySentText).toHaveTextContaining("Testing...😀");

    // Validate reply message sent appears as last message
    const message = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(message).toHaveTextContaining("Reply");
  });

  it("Chat User B - Validate reply message group contains timestamp and user image", async () => {
    //Timestamp from last message sent should be displayed
    const timeAgo =
      await chatsMessageGroupsFirstUser.getLastMessageSentTimeAgo();
    await expect(timeAgo).toHaveTextContaining(
      /- (?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
    await expect(timeAgo).toHaveTextContaining("ChatUserB");

    //Your user image should be displayed next to the message
    const userImage =
      await chatsMessageGroupsFirstUser.getLastGroupWrapSentImage();
    await userImage.waitForExist();
  });
}

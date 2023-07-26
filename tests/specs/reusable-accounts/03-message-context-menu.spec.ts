import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
import ContextMenu from "../../screenobjects/chats/ContextMenu";
import InputBar from "../../screenobjects/chats/InputBar";
import MessageGroup from "../../screenobjects/chats/MessageGroup";
import Messages from "../../screenobjects/chats/Messages";
let chatsContextMenuFirstUser = new ContextMenu(USER_A_INSTANCE);
let chatsContextMenuSecondUser = new ContextMenu(USER_B_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsMessageGroupsSecondUser = new MessageGroup(USER_B_INSTANCE);

export default async function messageContextMenuTests() {
  it("Chat User A - Send two more messages to Chat User B", async () => {
    // Send two messages to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Two...");
    await chatsInputFirstUser.clickOnSendMessage();

    await chatsInputFirstUser.typeMessageOnInput("Three...");
    await chatsInputFirstUser.clickOnSendMessage();
  });

  it("Chat User A - Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "two..."
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Two...");
  });

  it("Chat User A - Context Menu - Edit Message", async () => {
    // Open context menu on last message sent, select option for editing and type a new message
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionEdit();
    await chatsInputFirstUser.typeOnEditMessageInput("Edited...");

    // Validate message edited contents is shown on Chat Screen
    await chatsMessagesFirstUser.waitForMessageSentToExist("Edited...");
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Edited...");
    await chatsMessagesSecondUser.switchToOtherUserWindow();

    // With User B - Validate that last message is "edited"
    await chatsMessagesSecondUser.waitForReceivingMessage("Edited...", 60000);

    // With User B - Ensure that message "three.." was deleted
    await chatsMessagesSecondUser.waitForMessageToBeDeleted("Three...", 30000);
  });

  it("Chat User A - React to sent message and multiple reactions in a message", async () => {
    // React with heart emoji
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectReactionHeart();

    // React with like emoji
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectReactionLike();

    // Validate reactions are displayed correctly
    const reactions =
      await chatsMessageGroupsFirstUser.getLastMessageSentSelfReactions();
    await expect(reactions.includes("❤️ 1")).toEqual(true);
    await expect(reactions.includes("👍 1")).toEqual(true);
  });

  it("Chat User A - React to received message", async () => {
    // React with hi emoji
    await chatsMessagesFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectReactionHi();

    // Validate reaction is displayed correctly
    const reaction =
      await chatsMessageGroupsFirstUser.getLastMessageReceivedSelfReactions();
    await expect(reaction.includes("🖖 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in sent message", async () => {
    // Return to Chat User B window
    await chatsInputSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.clickOnInputBar();
    await chatsInputSecondUser.typeMessageOnInput("Hello");
    await chatsInputSecondUser.clearInputBar();

    // Validate reactions received on sent message
    const reaction =
      await chatsMessageGroupsSecondUser.getLastMessageSentRemoteReactions();
    await expect(reaction.includes("🖖 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in received message", async () => {
    // Validate reactions received on sent message
    const reactions =
      await chatsMessageGroupsSecondUser.getLastMessageReceivedRemoteReactions();
    await expect(reactions.includes("❤️ 1")).toEqual(true);
    await expect(reactions.includes("👍 1")).toEqual(true);
  });

  it("Chat User B - Both users can react with the same emoji to a message", async () => {
    // React with Like emoji
    await chatsMessagesSecondUser.openContextMenuOnLastSent();
    await chatsContextMenuSecondUser.validateContextMenuIsOpen();
    await chatsContextMenuSecondUser.selectReactionHi();

    // Validate reaction is displayed correctly
    const reaction =
      await chatsMessageGroupsSecondUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👍 2")).toEqual(true);
  });

  it("Chat User B - Users can add a new reaction to a message already containing reactions", async () => {
    // React with Laugh emoji
    await chatsMessagesSecondUser.openContextMenuOnLastSent();
    await chatsContextMenuSecondUser.validateContextMenuIsOpen();
    await chatsContextMenuSecondUser.selectReactionLaugh();

    // Validate reaction is displayed correctly
    const reaction =
      await chatsMessageGroupsSecondUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👍 2")).toEqual(true);
    await expect(reaction.includes("😂 1")).toEqual(true);
  });
}

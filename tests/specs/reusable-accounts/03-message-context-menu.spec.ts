import "module-alias/register";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Messages from "@screenobjects/chats/Messages";
let chatsContextMenuFirstUser = new ContextMenu(USER_A_INSTANCE);
let chatsContextMenuSecondUser = new ContextMenu(USER_B_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);
let chatsMessageGroupsSecondUser = new MessageGroup(USER_B_INSTANCE);

export default async function messageContextMenuTests() {
  it("Chat User A - Send two messages to Chat User B", async () => {
    // Send a message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Two...");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Two...");

    // Send a message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Three...");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Three...");
  });

  it("Chat User B - Receive two messages from Chat User B", async () => {
    // Assert messages received from Chat User B
    await chatsInputSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingMessage("Two...");
    await chatsMessagesSecondUser.waitForReceivingMessage("Three...");
  });

  it("Chat User A - Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "two..."
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Two...");
  });

  it("Chat User B - Validate Message was deleted and is no longer visible in remote chat", async () => {
    // Switch to Chat User B window
    await chatsMessagesSecondUser.switchToOtherUserWindow();

    // With User B - Validate that last message is "Two..."
    await chatsMessagesSecondUser.waitForReceivingMessage("Two...");

    // With User B - Ensure that message "three.." was deleted
    await chatsMessagesSecondUser.waitForMessageToBeDeleted("Three...");
  });

  it("Chat User A - React to sent message and multiple reactions in a message", async () => {
    // React with 😂 emoji
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnFirstReaction();
    await chatsMessageGroupsFirstUser.waitUntilEmojiReactionSelfExists("😂");

    // React with 🖖 emoji
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnSecondReaction();
    await chatsMessageGroupsFirstUser.waitUntilEmojiReactionSelfExists("🖖");

    // Validate reactions are displayed correctly
    const reactions =
      await chatsMessageGroupsFirstUser.getLastMessageSentSelfReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User A - React to received message", async () => {
    // Validate message received from Chat User A
    await chatsMessagesFirstUser.waitForReceivingMessage("Reply");

    // React with 👎 emoji
    await chatsMessagesFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnThirdReaction();
    await chatsMessageGroupsFirstUser.waitUntilEmojiReactionSelfExists("👎");

    // Validate reaction is displayed correctly
    const reaction =
      await chatsMessageGroupsFirstUser.getLastMessageReceivedSelfReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in sent message", async () => {
    // Return to Chat User B window
    await chatsInputSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.clickOnInputBar();
    await chatsInputSecondUser.typeMessageOnInput("Hello");
    await chatsInputSecondUser.clearInputBar();

    // Validate reactions received on sent message
    await chatsMessageGroupsSecondUser.waitUntilEmojiReactionRemoteExists("👎");
    const reaction =
      await chatsMessageGroupsSecondUser.getLastMessageSentRemoteReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in received message", async () => {
    // Validate reactions received on sent message
    await chatsMessageGroupsSecondUser.waitUntilEmojiReactionRemoteExists("🖖");
    const reactions =
      await chatsMessageGroupsSecondUser.getLastMessageReceivedRemoteReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User B - Both users can react with the same emoji to a message", async () => {
    // React with 👎 emoji
    await chatsMessagesSecondUser.openContextMenuOnLastSent();
    await chatsContextMenuSecondUser.validateContextMenuIsOpen();
    await chatsContextMenuSecondUser.clickOnThirdReaction();

    // Validate reaction is displayed correctly
    await chatsMessageGroupsSecondUser.waitUntilEmojiReactionSelfExists("👎");
    const reaction =
      await chatsMessageGroupsSecondUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
  });

  it("Chat User B - Users can add a new reaction to a message already containing reactions", async () => {
    // React with 👍 emoji
    await chatsMessagesSecondUser.openContextMenuOnLastSent();
    await chatsContextMenuSecondUser.validateContextMenuIsOpen();
    await chatsContextMenuSecondUser.clickOnFourthReaction();

    // Validate reaction is displayed correctly
    await chatsMessageGroupsSecondUser.waitUntilEmojiReactionSelfExists("👍");
    const reaction =
      await chatsMessageGroupsSecondUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
    await expect(reaction.includes("👍 1")).toEqual(true);
  });
}

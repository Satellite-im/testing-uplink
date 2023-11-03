import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroup from "@screenobjects/chats/MessageGroup";
import Messages from "@screenobjects/chats/Messages";
let chatsContextMenuFirstUser = new ContextMenu(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessageGroupsFirstUser = new MessageGroup(USER_A_INSTANCE);

export default async function messageContextMenuTestsUserB() {
  it("Chat User B - Receive two messages from Chat User B", async () => {
    // Assert messages received from Chat User B
    await chatsMessagesFirstUser.waitForReceivingMessage("Two...");
    await chatsMessagesFirstUser.waitForReceivingMessage("Three...");
  });

  it("Chat User B - Validate Message was deleted and is no longer visible in remote chat", async () => {
    // With User B - Validate that last message is "Two..."
    await chatsMessagesFirstUser.waitForReceivingMessage("Two...");

    // With User B - Ensure that message "three.." was deleted
    await chatsMessagesFirstUser.waitForMessageToBeDeleted("Three...");
  });

  it("Chat User B - Receive reaction in sent message", async () => {
    await chatsInputFirstUser.clickOnInputBar();
    await chatsInputFirstUser.typeMessageOnInput("Hello");
    await chatsInputFirstUser.clearInputBar();

    // Validate reactions received on sent message
    await chatsMessageGroupsFirstUser.waitUntilEmojiReactionRemoteExists("👎");
    const reaction =
      await chatsMessageGroupsFirstUser.getLastMessageSentRemoteReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in received message", async () => {
    // Validate reactions received on sent message
    await chatsMessageGroupsFirstUser.waitUntilEmojiReactionRemoteExists("🖖");
    const reactions =
      await chatsMessageGroupsFirstUser.getLastMessageReceivedRemoteReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User B - Both users can react with the same emoji to a message", async () => {
    // React with 👎 emoji
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnThirdReaction();

    // Validate reaction is displayed correctly
    await chatsMessageGroupsFirstUser.waitUntilEmojiReactionSelfExists("👎");
    const reaction =
      await chatsMessageGroupsFirstUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
  });

  it("Chat User B - Users can add a new reaction to a message already containing reactions", async () => {
    // React with 👍 emoji
    await chatsMessagesFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnFourthReaction();

    // Validate reaction is displayed correctly
    await chatsMessageGroupsFirstUser.waitUntilEmojiReactionSelfExists("👍");
    const reaction =
      await chatsMessageGroupsFirstUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
    await expect(reaction.includes("👍 1")).toEqual(true);
  });
}

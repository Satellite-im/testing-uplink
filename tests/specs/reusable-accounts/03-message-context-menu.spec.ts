require("module-alias/register");
import {
  activateFirstApplication,
  activateSecondApplication,
  closeFirstApplication,
  closeSecondApplication,
  getClipboardValue,
  loginWithTestUser,
} from "@helpers/commands";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
const chatsContextMenuFirstUser = new ContextMenu();
const chatsInputFirstUser = new InputBar();
const messageGroupLocalFirstUser = new MessageGroupLocal();
const messageGroupRemoteFirstUser = new MessageGroupRemote();
const messageLocalFirstUser = new MessageLocal();
const messageRemoteFirstUser = new MessageRemote();

export default async function messageContextMenuTests() {
  it("Chat User A - Send two messages to Chat User B", async () => {
    // Send a message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Two...");
    await chatsInputFirstUser.clickOnSendMessage();
    await messageLocalFirstUser.waitForMessageSentToExist("Two...");

    // Send a message to Chat User B
    await chatsInputFirstUser.typeMessageOnInput("Three...");
    await chatsInputFirstUser.clickOnSendMessage();
    await messageLocalFirstUser.waitForMessageSentToExist("Three...");
  });

  it("Chat User A - Context Menu - Copy Text from Message Sent", async () => {
    await messageLocalFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionCopy();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toContain("Three...");
  });

  it("Chat User B - Receive two messages from Chat User B", async () => {
    // Assert messages received from Chat User B
    await activateSecondApplication();
    await loginWithTestUser();
    await closeFirstApplication();
    await messageRemoteFirstUser.waitForReceivingMessage("Two...");
    await messageRemoteFirstUser.waitForReceivingMessage("Three...");
  });

  it("Chat User B - Context Menu - Copy Text from Message Received", async () => {
    await messageRemoteFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionCopy();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toContain("Three...");
  });

  it("Chat User A - Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await activateFirstApplication();
    await loginWithTestUser();
    await closeSecondApplication();
    await messageLocalFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "two..."
    const textMessage = await messageLocalFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Two...");
  });

  it("Chat User B - Validate Message was deleted and is no longer visible in remote chat", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();
    await loginWithTestUser();
    await closeFirstApplication();

    // With User B - Validate that last message is "Two..."
    await messageRemoteFirstUser.waitForReceivingMessage("Two...");

    // With User B - Ensure that message "three.." was deleted
    await messageRemoteFirstUser.waitForMessageToBeDeleted("Three...");
  });

  it("Chat User A - React to sent message and multiple reactions in a message", async () => {
    // React with 😂 emoji
    await activateFirstApplication();
    await loginWithTestUser();
    await closeSecondApplication();
    await messageLocalFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnFirstReaction();
    await messageGroupLocalFirstUser.waitUntilEmojiReactionSelfExists("😂");

    // React with 🖖 emoji
    await messageLocalFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnSecondReaction();
    await messageGroupLocalFirstUser.waitUntilEmojiReactionSelfExists("🖖");

    // Validate reactions are displayed correctly
    const reactions =
      await messageGroupLocalFirstUser.getLastMessageSentSelfReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User A - React to received message", async () => {
    // Validate message received from Chat User A
    await messageRemoteFirstUser.waitForReceivingMessage("Reply");

    // React with 👎 emoji
    await messageRemoteFirstUser.openContextMenuOnLastReceived();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnThirdReaction();
    await messageGroupRemoteFirstUser.waitUntilEmojiReactionSelfExists("👎");

    // Validate reaction is displayed correctly
    const reaction =
      await messageGroupRemoteFirstUser.getLastMessageReceivedSelfReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in sent message", async () => {
    // Return to Chat User B window
    await activateSecondApplication();
    await loginWithTestUser();
    await closeFirstApplication();
    await chatsInputFirstUser.clickOnInputBar();
    await chatsInputFirstUser.typeMessageOnInput("Hello");
    await chatsInputFirstUser.clearInputBar();

    // Validate reactions received on sent message
    await messageGroupLocalFirstUser.waitUntilEmojiReactionRemoteExists("👎");
    const reaction =
      await messageGroupLocalFirstUser.getLastMessageSentRemoteReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in received message", async () => {
    // Validate reactions received on sent message
    await messageGroupRemoteFirstUser.waitUntilEmojiReactionRemoteExists("🖖");
    const reactions =
      await messageGroupRemoteFirstUser.getLastMessageReceivedRemoteReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User B - Both users can react with the same emoji to a message", async () => {
    // React with 👎 emoji
    await messageLocalFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnThirdReaction();

    // Validate reaction is displayed correctly
    await messageGroupLocalFirstUser.waitUntilEmojiReactionSelfExists("👎");
    const reaction =
      await messageGroupLocalFirstUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
  });

  it("Chat User B - Users can add a new reaction to a message already containing reactions", async () => {
    // React with 👍 emoji
    await messageLocalFirstUser.openContextMenuOnLastSent();
    await chatsContextMenuFirstUser.validateContextMenuIsOpen();
    await chatsContextMenuFirstUser.clickOnFourthReaction();

    // Validate reaction is displayed correctly
    await messageGroupLocalFirstUser.waitUntilEmojiReactionSelfExists("👍");
    const reaction =
      await messageGroupLocalFirstUser.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
    await expect(reaction.includes("👍 1")).toEqual(true);
  });
}

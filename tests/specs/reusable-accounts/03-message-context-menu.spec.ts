require("module-alias/register");
import {
  getClipboardValue,
  activateFirstApplication,
  activateSecondApplication,
  closeFirstApplication,
  closeSecondApplication,
  launchSecondApplication,
  launchFirstApplication,
} from "@helpers/commands";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
const chatsContextMenu = new ContextMenu();
const chatsInput = new InputBar();
const messageGroupLocal = new MessageGroupLocal();
const messageGroupRemote = new MessageGroupRemote();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();

export default async function messageContextMenuTests() {
  before(async () => {
    await launchSecondApplication();
    await launchFirstApplication();
  });

  it("Chat User A - Send two messages to Chat User B", async () => {
    // Send a message to Chat User B
    await chatsInput.typeMessageOnInput("Two...");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Two...");

    // Send a message to Chat User B
    await chatsInput.typeMessageOnInput("Three...");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Three...");
  });

  it("Chat User A - Context Menu - Copy Text from Message Sent", async () => {
    await messageLocal.openContextMenuOnSentMessage("Three...");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.selectContextOptionCopy();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toContain("Three...");
  });

  it("Chat User B - Receive two messages from Chat User B", async () => {
    // Assert messages received from Chat User B
    await activateSecondApplication();
    await messageRemote.waitForReceivingMessage("Two...");
    await messageRemote.waitForReceivingMessage("Three...");
  });

  it("Chat User B - Context Menu - Copy Text from Message Received", async () => {
    await messageRemote.openContextMenuOnReceivedMessage("Three...");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.selectContextOptionCopy();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toContain("Three...");
  });

  it("Chat User A - Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await activateFirstApplication();
    await messageLocal.openContextMenuOnSentMessage("Three...");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "two..."
    await messageLocal.waitForMessageToBeDeleted("Three...");
  });

  it("Chat User B - Validate Message was deleted and is no longer visible in remote chat", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();

    // With User B - Validate that last message is "Two..."
    await messageRemote.waitForReceivingMessage("Two...");

    // With User B - Ensure that message "three.." was deleted
    await messageRemote.waitForMessageToBeDeleted("Three...");
  });

  it("Chat User A - React to sent message and multiple reactions in a message", async () => {
    // React with 😂 emoji
    await activateFirstApplication();
    await messageLocal.openContextMenuOnSentMessage("Two...");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.clickOnFirstReaction();
    await messageGroupLocal.waitUntilEmojiReactionSelfExists("😂");

    // React with 🖖 emoji
    await messageLocal.openContextMenuOnSentMessage("Two...");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.clickOnSecondReaction();
    await messageGroupLocal.waitUntilEmojiReactionSelfExists("🖖");

    // Validate reactions are displayed correctly
    const reactions = await messageGroupLocal.getLastMessageSentSelfReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User A - React to received message", async () => {
    // Validate message received from Chat User A
    await messageRemote.waitForReceivingMessage("Reply");

    // React with 👎 emoji
    await messageRemote.openContextMenuOnReceivedMessage("Reply");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.clickOnThirdReaction();
    await messageGroupRemote.waitUntilEmojiReactionSelfExists("👎");

    // Validate reaction is displayed correctly
    const reaction =
      await messageGroupRemote.getLastMessageReceivedSelfReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in sent message", async () => {
    // Return to Chat User B window
    await activateSecondApplication();
    await chatsInput.clickOnInputBar();
    await chatsInput.typeMessageOnInput("Hello");
    await chatsInput.clearInputBar();

    // Validate reactions received on sent message
    await messageGroupLocal.waitUntilEmojiReactionRemoteExists("👎");
    const reaction =
      await messageGroupLocal.getLastMessageSentRemoteReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in received message", async () => {
    // Validate reactions received on sent message
    await messageGroupRemote.waitUntilEmojiReactionRemoteExists("🖖");
    const reactions =
      await messageGroupRemote.getLastMessageReceivedRemoteReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User B - Both users can react with the same emoji to a message", async () => {
    // React with 👎 emoji
    await messageLocal.openContextMenuOnSentMessage("Reply");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.clickOnThirdReaction();

    // Validate reaction is displayed correctly
    await messageGroupLocal.waitUntilEmojiReactionSelfExists("👎");
    const reaction = await messageGroupLocal.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
  });

  it("Chat User B - Users can add a new reaction to a message already containing reactions", async () => {
    // React with 👍 emoji
    await messageLocal.openContextMenuOnSentMessage("Reply");
    await chatsContextMenu.validateContextMenuIsOpen();
    await chatsContextMenu.clickOnFourthReaction();

    // Validate reaction is displayed correctly
    await messageGroupLocal.waitUntilEmojiReactionSelfExists("👍");
    const reaction = await messageGroupLocal.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
    await expect(reaction.includes("👍 1")).toEqual(true);
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}

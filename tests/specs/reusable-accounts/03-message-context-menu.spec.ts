require("module-alias/register");
import {
  getClipboardValue,
  activateFirstApplication,
  activateSecondApplication,
  launchSecondApplication,
  launchFirstApplication,
  closeFirstApplication,
  closeSecondApplication,
} from "@helpers/commands";
import CreatePinScreen from "@screenobjects/account-creation/CreatePinScreen";
import ContextMenu from "@screenobjects/chats/ContextMenu";
import InputBar from "@screenobjects/chats/InputBar";
import MessageGroupLocal from "@screenobjects/chats/MessageGroupLocal";
import MessageGroupRemote from "@screenobjects/chats/MessageGroupRemote";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";

export default async function messageContextMenuTests() {
  before(async () => {
    await launchSecondApplication();
    await CreatePinScreen.loginWithTestUser();
    await launchFirstApplication();
    await CreatePinScreen.loginWithTestUser();
  });

  it("Chat User A - Send two messages to Chat User B", async () => {
    // Send a message to Chat User B
    await InputBar.typeMessageOnInput("Two...");
    await InputBar.clickOnSendMessage();
    await MessageLocal.waitForMessageSentToExist("Two...");

    // Send a message to Chat User B
    await InputBar.typeMessageOnInput("Three...");
    await InputBar.clickOnSendMessage();
    await MessageLocal.waitForMessageSentToExist("Three...");
  });

  it("Chat User A - Context Menu - Copy Text from Message Sent", async () => {
    await MessageLocal.openContextMenuOnSentMessage("Three...");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionCopy();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toEqual("Three...");
  });

  it("Chat User B - Receive two messages from Chat User B", async () => {
    // Assert messages received from Chat User B
    await activateSecondApplication();
    await MessageRemote.waitForReceivingMessage("Two...");
    await MessageRemote.waitForReceivingMessage("Three...");
  });

  it("Chat User B - Context Menu - Copy Text from Message Received", async () => {
    await MessageRemote.openContextMenuOnReceivedMessage("Three...");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionCopy();

    // Validate clipboard text contains Username#
    const clipboardText = await getClipboardValue();
    await expect(clipboardText).toEqual("Three...");
  });

  it("Chat User A - Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await activateFirstApplication();
    await MessageLocal.openContextMenuOnSentMessage("Three...");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "two..."
    await MessageLocal.waitForMessageToBeDeleted("Three...");
  });

  it("Chat User B - Validate Message was deleted and is no longer visible in remote chat", async () => {
    // Switch to Chat User B window
    await activateSecondApplication();

    // With User B - Validate that last message is "Two..."
    await MessageRemote.waitForReceivingMessage("Two...");

    // With User B - Ensure that message "three.." was deleted
    await MessageRemote.waitForMessageToBeDeleted("Three...");
  });

  it("Chat User A - React to sent message and multiple reactions in a message", async () => {
    // React with 😂 emoji
    await activateFirstApplication();
    await MessageLocal.openContextMenuOnSentMessage("Two...");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.clickOnFirstReaction();
    await MessageGroupLocal.waitUntilEmojiReactionSelfExists("😂");

    // React with 🖖 emoji
    await MessageLocal.openContextMenuOnSentMessage("Two...");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.clickOnSecondReaction();
    await MessageGroupLocal.waitUntilEmojiReactionSelfExists("🖖");

    // Validate reactions are displayed correctly
    const reactions = await MessageGroupLocal.getLastMessageSentSelfReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User A - React to received message", async () => {
    // Validate message received from Chat User A
    await MessageRemote.waitForReceivingMessage("Reply");

    // React with 👎 emoji
    await MessageRemote.openContextMenuOnReceivedMessage("Reply");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.clickOnThirdReaction();
    await MessageGroupRemote.waitUntilEmojiReactionSelfExists("👎");

    // Validate reaction is displayed correctly
    const reaction =
      await MessageGroupRemote.getLastMessageReceivedSelfReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in sent message", async () => {
    // Return to Chat User B window
    await activateSecondApplication();
    await InputBar.clickOnInputBar();
    await InputBar.typeMessageOnInput("Hello");
    await InputBar.clearInputBar();

    // Validate reactions received on sent message
    await MessageGroupLocal.waitUntilEmojiReactionRemoteExists("👎");
    const reaction =
      await MessageGroupLocal.getLastMessageSentRemoteReactions();
    await expect(reaction.includes("👎 1")).toEqual(true);
  });

  it("Chat User B - Receive reaction in received message", async () => {
    // Validate reactions received on sent message
    await MessageGroupRemote.waitUntilEmojiReactionRemoteExists("🖖");
    const reactions =
      await MessageGroupRemote.getLastMessageReceivedRemoteReactions();
    await expect(reactions.includes("🖖 1")).toEqual(true);
    await expect(reactions.includes("😂 1")).toEqual(true);
  });

  it("Chat User B - Both users can react with the same emoji to a message", async () => {
    // React with 👎 emoji
    await MessageLocal.openContextMenuOnSentMessage("Reply");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.clickOnThirdReaction();

    // Validate reaction is displayed correctly
    await MessageGroupLocal.waitUntilEmojiReactionSelfExists("👎");
    const reaction = await MessageGroupLocal.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👎 2")).toEqual(true);
  });

  it("Chat User B - Users can add a new reaction to a message already containing reactions", async () => {
    // React with 👍 emoji
    await MessageLocal.openContextMenuOnSentMessage("Reply");
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.clickOnFourthReaction();

    // Validate reaction is displayed correctly
    await MessageGroupLocal.waitUntilEmojiReactionSelfExists("👍");
    const reaction = await MessageGroupLocal.getLastMessageSentSelfReactions();
    await expect(reaction.includes("👍 1")).toEqual(true);
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}

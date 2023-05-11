import { launchAppForChatUserB } from "../../helpers/commands";
import ContextMenu from "../../screenobjects/chats/ContextMenu";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";

export default async function messageContextMenuTests() {
  it("Chat User A - Send two more messages to Chat User B", async () => {
    // Send two messages to Chat User B
    await InputBar.typeMessageOnInput("two...");
    await InputBar.clickOnSendMessage();

    await InputBar.typeMessageOnInput("three...");
    await InputBar.clickOnSendMessage();
  });

  it("Chat User A - Context Menu - Delete Message", async () => {
    // Open context menu on last message sent and select option for deleting
    await Messages.openContextMenuOnLastSent();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionDelete();

    // Validate that last message was deleted and therefore the last message displayed is "two..."
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("two...");
  });

  it("Chat User A - Context Menu - Edit Message", async () => {
    // Open context menu on last message sent, select option for editing and type a new message
    await Messages.openContextMenuOnLastSent();
    await ContextMenu.validateContextMenuIsOpen();
    await ContextMenu.selectContextOptionEdit();
    await InputBar.typeOnEditMessageInput("edited...");

    // Validate message edited contents is shown on Chat Screen
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("edited...");
  });

  it("Chat User B - Validate that second message was edited", async () => {
    await launchAppForChatUserB();
    // Validate that last message is "edited"
    await Messages.waitForReceivingMessage("edited...", 240000);
  });

  it("Chat User B - Validate that only deleted message is no longer in conversation", async () => {
    // Ensure that message "three.." was deleted
    await Messages.waitForMessageToBeDeleted("three...", 30000);
  });
}

import ContextMenu from "../../screenobjects/chats/ContextMenu";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";
let chatsContextMenuFirstUser = new ContextMenu("userA");
let chatsInputFirstUser = new InputBar("userA");
let chatsMessagesFirstUser = new Messages("userA");
let chatsMessagesSecondUser = new Messages("userB");

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
    await chatsMessagesFirstUser.switchToOtherUserWindow();

    // With User B - Validate that last message is "edited"
    await chatsMessagesSecondUser.waitForReceivingMessage("Edited...", 240000);

    // With User B - Ensure that message "three.." was deleted
    await chatsMessagesSecondUser.waitForMessageToBeDeleted("Three...", 30000);
    await chatsMessagesSecondUser.switchToOtherUserWindow();
  });
}

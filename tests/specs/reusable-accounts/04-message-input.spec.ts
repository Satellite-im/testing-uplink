import { launchAppForChatUserA } from "../../helpers/commands";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";

export default async function messageInputTests() {
  it("Chat User A - Message Input - User cannot send empty messages", async () => {
    await launchAppForChatUserA();
    // Ensure that input bar is empty and click on send message button
    await InputBar.clearInputBar();
    await InputBar.clearInputBar();
    await InputBar.clickOnInputBar();
    await InputBar.clickOnSendMessage();

    // Ensure that input bar is empty and press Enter Key
    await InputBar.clearInputBar();
    await InputBar.clickOnInputBar();
    await InputBar.pressEnterKeyOnInputBar();

    // Validate latest message sent displayed on Chat Conversation is still "edited..."
    const textMessage = await Messages.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Edited...");
  });

  // Skipping test failing on CI due to slowness on driver typing 1024 characters
  xit("Chat User A - Message Input - User can type up to 1024 chars on input bar", async () => {
    // Generate a random text with 1024 chars
    const longText = await InputBar.generateRandomText();
    // Type long text with 1024 chars on input bar and attempt to add 4 more chars (efgh)
    await InputBar.typeMessageOnInput(longText + "efgh");

    // Ensure that latest chars were not added to input bar, since the max number of chars has been reached
    // Input bar text should be equal to long text with 1024 chars
    await expect(InputBar.inputText).toHaveText(longText);

    // Clear input bar to finish test
    await InputBar.clearInputBar();
  });
}

import { USER_A_INSTANCE, USER_B_INSTANCE } from "../../helpers/constants";
import ChatsLayout from "../../screenobjects/chats/ChatsLayout";
import InputBar from "../../screenobjects/chats/InputBar";
import Messages from "../../screenobjects/chats/Messages";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsLayoutSecondUser = new ChatsLayout(USER_B_INSTANCE);

export default async function messageInputTests() {
  it("Chat User A - Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.clickOnInputBar();
    await chatsInputFirstUser.clickOnSendMessage();

    // Ensure that input bar is empty and press Enter Key
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.clickOnInputBar();
    await chatsInputFirstUser.pressEnterKeyOnInputBar();

    // Validate latest message sent displayed on Chat Conversation is still "edited..."
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Edited...");
  });

  // Skipping test failing on CI due to slowness on driver typing 1024 characters
  xit("Chat User A - Message Input - User can type up to 1024 chars on input bar", async () => {
    // Generate a random text with 1024 chars
    const longText = await chatsInputFirstUser.generateRandomText();
    // Type long text with 1024 chars on input bar and attempt to add 4 more chars (efgh)
    await chatsInputFirstUser.typeMessageOnInput(longText + "efgh");

    // Ensure that latest chars were not added to input bar, since the max number of chars has been reached
    // Input bar text should be equal to long text with 1024 chars
    await expect(chatsInputFirstUser.inputText).toHaveText(longText);

    // Clear input bar to finish test
    await chatsInputFirstUser.clearInputBar();
  });

  it("Chat User B - Validate Typing Indicator is displayed if remote user is typing", async () => {
    // With User A
    // Generate a random text with 100 chars
    const shortText = await chatsInputFirstUser.generateShortRandomText();
    // Type the text with 90 chars on input bar
    await chatsInputFirstUser.typeMessageOnInput(shortText + "efgh");

    // Switch to second user and validate that Typing Indicator is displayed
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsLayoutSecondUser.typingIndicator.waitForDisplayed();

    // Switch back to first user window to continue with test execution
    await chatsInputFirstUser.switchToOtherUserWindow();
  });
}

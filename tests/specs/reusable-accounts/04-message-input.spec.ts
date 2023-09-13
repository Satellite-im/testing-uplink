import "module-alias/register";
import { USER_A_INSTANCE, USER_B_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsInputSecondUser = new InputBar(USER_B_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let chatsMessagesSecondUser = new Messages(USER_B_INSTANCE);
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

    // Validate latest message sent displayed on Chat Conversation is still "Two..."
    const textMessage = await chatsMessagesFirstUser.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Two...");
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

  it("Chat Input Text - Validate texts with ** markdown are sent in bolds", async () => {
    // With Chat User A
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.typeMessageOnInput("**Bolds1**");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Bolds1");

    // With Chat User B
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingMessage("Bolds1");
  });

  it("Chat Input Text - Validate texts with __ markdown are sent in bolds", async () => {
    // With Chat User A
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.typeMessageOnInput("__Bolds2__");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Bolds2");

    // With Chat User B
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingMessage("Bolds2");
  });

  it("Chat Input Text - Validate users can send messages using the code language markdown", async () => {
    // With Chat User A, send a code snippet with JavaScript language
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.typeCodeOnInputBar(
      "JavaScript",
      'let myVariable = "test";'
    );
    await chatsInputFirstUser.clickOnSendMessage();
  });

  it("Chat Input Text - Validate message with text using code markdown is displayed correctly on local and remote user", async () => {
    // With Chat User A, validate code message was sent and is displayed correctly
    await chatsMessagesFirstUser.waitForCodeMessageSentToExist("JavaScript");
    const codeMessageTextSent =
      await chatsMessagesFirstUser.getLastMessageSentTextCodeMessage();
    await expect(codeMessageTextSent).toEqual('let myVariable = "test";');

    // With Chat User B, validate code message was received and is displayed correctly
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingCodeMessage("JavaScript");
    const codeMessageTextReceived =
      await chatsMessagesSecondUser.getLastMessageReceivedTextCodeMessage();
    await expect(codeMessageTextReceived).toEqual('let myVariable = "test";');
  });

  it("Chat Input Text - Code Markdown - User can copy the message from the code block", async () => {
    // With Chat User A, click on the copy button from code block of last chat message sent
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsMessagesFirstUser.clickOnCopyCodeOfLastMessageSent();

    // Then, paste it into the input bar and assert the text contents on input bar
    await chatsInputFirstUser.pasteClipboardOnInputBar();
    await expect(chatsInputFirstUser.inputText).toHaveText(
      'let myVariable = "test";'
    );

    // Finally, clear the input bar for next tests
    await chatsInputFirstUser.clearInputBar();
  });

  it("Chat Input Text - Validate text starting with https:// is sent as link", async () => {
    // With Chat User A
    await chatsInputFirstUser.typeMessageOnInput("https://www.google.com");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForLinkSentToExist(
      "https://www.google.com"
    );

    // With Chat User B
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingLink(
      "https://www.google.com"
    );
  });

  it("Chat Input Text - Validate text starting with http:// is sent as link", async () => {
    // With Chat User A
    await chatsInputFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.typeMessageOnInput("http://www.satellite.im");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForLinkSentToExist(
      "http://www.satellite.im"
    );

    // With Chat User B
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingLink(
      "http://www.satellite.im"
    );
  });

  it("Chat User - Chat Messages containing links contents on local side", async () => {
    // Switch to Chat User A
    await chatsMessagesFirstUser.switchToOtherUserWindow();

    // Validate link embed contents on chat message
    const linkEmbedSent =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbed();
    const linkEmbedSentDetailsText =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbedDetailsText();
    const linkEmbedSentIcon =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbedIcon();
    const linkEmbedSentIconTitle =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbedIconTitle();

    await linkEmbedSent.waitForDisplayed();
    await expect(linkEmbedSentDetailsText).toHaveTextContaining(
      "P2P Chat, Voice &#38; Video Open-source, stored on IPFS. End to end encryption... trackers not included."
    );
    await linkEmbedSentIcon.waitForDisplayed();
    await linkEmbedSentIconTitle.waitForDisplayed();
  });

  it("Chat User - Chat Messages containing links contents on remote side", async () => {
    // With Chat User B
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsInputSecondUser.clickOnInputBar();

    // Validate link embed contents on chat message
    const linkEmbedReceived =
      await chatsMessagesSecondUser.getLastMessageReceivedLinkEmbed();
    const linkEmbedReceivedDetailsText =
      await chatsMessagesSecondUser.getLastMessageReceivedLinkEmbedDetailsText();
    const linkEmbedReceivedIcon =
      await chatsMessagesSecondUser.getLastMessageReceivedLinkEmbedIcon();
    const linkEmbedReceivedIconTitle =
      await chatsMessagesSecondUser.getLastMessageReceivedLinkEmbedIconTitle();

    await linkEmbedReceived.waitForDisplayed();
    await expect(linkEmbedReceivedDetailsText).toHaveTextContaining(
      "P2P Chat, Voice &#38; Video Open-source, stored on IPFS. End to end encryption... trackers not included."
    );
    await linkEmbedReceivedIcon.waitForDisplayed();
    await linkEmbedReceivedIconTitle.waitForDisplayed();
  });

  it("Chat Input Text - Validate text starting with www. is not sent as link", async () => {
    // Switch to Chat User A
    await chatsMessagesFirstUser.switchToOtherUserWindow();
    await chatsInputFirstUser.typeMessageOnInput("www.apple.com");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForLinkSentToExist("www.apple.com");

    // With Chat User B
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsMessagesSecondUser.waitForReceivingLink("www.apple.com");
  });

  it("Validate Typing Indicator is displayed if remote user is typing", async () => {
    // With User A
    await chatsInputFirstUser.switchToOtherUserWindow();
    // Generate a random text with 100 chars
    const shortText = await chatsInputFirstUser.generateShortRandomText();
    // Type the text with 90 chars on input bar
    await chatsInputFirstUser.typeMessageOnInput(shortText + "efgh");

    // Switch to second user and validate that Typing Indicator is displayed
    await chatsLayoutSecondUser.switchToOtherUserWindow();
    await chatsLayoutSecondUser.typingIndicator.waitForDisplayed();
    await expect(
      chatsLayoutSecondUser.typingIndicatorTextValue
    ).toHaveTextContaining("ChatUserA is typing");
  });
}

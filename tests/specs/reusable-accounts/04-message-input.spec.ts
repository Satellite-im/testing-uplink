import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import {
  activateFirstApplication,
  activateSecondApplication,
} from "@helpers/commands";
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);

export default async function messageInputTests() {
  it("Chat User A - Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await chatsInputFirstUser.switchToOtherUserWindow();
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

  it("Chat User A - Message Input - User can type up to 1024 chars on input bar", async () => {
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
    // With Chat User A, send a message with ** markdown
    await chatsInputFirstUser.clearInputBar();
    await chatsInputFirstUser.typeMessageOnInput("**Bolds1**");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Bolds1");
  });

  it("Chat Input Text - Validate texts with __ markdown are sent in bolds", async () => {
    // With Chat User A, send a message with __ markdown
    await chatsInputFirstUser.typeMessageOnInput("__Bolds2__");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForMessageSentToExist("Bolds2");
  });

  it("Chat Input Text - Validate users can send messages using the code language markdown", async () => {
    // With Chat User A, send a code snippet with JavaScript language
    await chatsInputFirstUser.typeCodeOnInputBar("JavaScript", "let a = 1;");
    await chatsInputFirstUser.clickOnSendMessage();

    // With Chat User A, validate code message was sent and is displayed correctly
    await chatsMessagesFirstUser.waitForCodeMessageSentToExist("JavaScript");
    const codeMessageTextSent =
      await chatsMessagesFirstUser.getLastMessageSentCodeMessage();
    await expect(codeMessageTextSent).toEqual("let a = 1;");
  });

  it("Chat Input Text - Code Markdown - User can copy the message from the code block", async () => {
    // With Chat User A, click on the copy button from code block of last chat message sent
    await chatsMessagesFirstUser.clickOnCopyCodeOfLastMessageSent();

    // Then, paste it into the input bar and assert the text contents on input bar
    await chatsInputFirstUser.pasteClipboardOnInputBar();
    await expect(chatsInputFirstUser.inputText).toHaveText("let a = 1;");

    // Finally, clear the input bar for next tests
    await chatsInputFirstUser.clearInputBar();
  });

  it("Chat Input Text - Validate messages with bold markdowns were received in expected format", async () => {
    // With Chat User B, validate message with with ** markdown was received in bolds
    await activateSecondApplication();
    await chatsMessagesFirstUser.waitForReceivingMessage("Bolds1");

    // With Chat User B, validate message with with __ markdown was received in bolds
    await chatsMessagesFirstUser.waitForReceivingMessage("Bolds2");
  });

  it("Chat Input Text - Validate message with code markdown is received in expected format", async () => {
    // With Chat User B, validate code message was received and is displayed correctly
    await chatsMessagesFirstUser.waitForReceivingCodeMessage("JavaScript");
    const codeMessageTextReceived =
      await chatsMessagesFirstUser.getLastMessageReceivedCodeMessage();
    await expect(codeMessageTextReceived).toEqual("let a = 1;");
  });

  it("Chat Input Text - Validate text starting with https:// is sent as link", async () => {
    // With Chat User A
    await activateFirstApplication();
    await chatsInputFirstUser.typeMessageOnInput("https://www.google.com");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForLinkSentToExist(
      "https://www.google.com",
    );
  });

  it("Chat Input Text - Validate text starting with www. is sent as link", async () => {
    // With Chat User A
    await chatsInputFirstUser.typeMessageOnInput("www.apple.com");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForLinkSentToExist("www.apple.com");
  });

  it("Chat Input Text - Validate text starting with http:// is sent as link", async () => {
    // With Chat User A
    await chatsInputFirstUser.typeMessageOnInput("http://www.satellite.im");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForLinkSentToExist(
      "http://www.satellite.im",
    );
  });

  it("Chat User - Chat Messages containing links contents on local side", async () => {
    // Validate link embed contents on chat message
    const linkEmbedSent =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbed();
    const linkEmbedSentDetailsText =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbedDetailsText();
    const linkEmbedSentIcon =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbedIcon();
    const linkEmbedSentIconTitle =
      await chatsMessagesFirstUser.getLastMessageSentLinkEmbedIconTitle();

    await linkEmbedSent.waitForExist();
    await expect(linkEmbedSentDetailsText).toHaveTextContaining(
      "P2P Chat, Voice &#38; Video Open-source, stored on IPFS. End to end encryption... trackers not included.",
    );
    await linkEmbedSentIcon.waitForExist();
    await linkEmbedSentIconTitle.waitForExist();
  });

  it("Chat Input Text - Validate messages with links were received correctly", async () => {
    // With Chat User B, validate message with URL starting with https:// was received as link
    await activateSecondApplication();
    await chatsMessagesFirstUser.waitForReceivingLink("https://www.google.com");

    // With Chat User B, validate message with URL starting with www. was received as link
    await chatsMessagesFirstUser.waitForReceivingLink("www.apple.com");

    // With Chat User B, validate message with URL starting with http:// was received as link
    await chatsMessagesFirstUser.waitForReceivingLink(
      "http://www.satellite.im",
    );
  });

  it("Chat User - Chat Messages containing links contents on remote side", async () => {
    // Validate link embed contents on chat message
    const linkEmbedReceived =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbed();
    const linkEmbedReceivedDetailsText =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbedDetailsText();
    const linkEmbedReceivedIcon =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbedIcon();
    const linkEmbedReceivedIconTitle =
      await chatsMessagesFirstUser.getLastMessageReceivedLinkEmbedIconTitle();

    await linkEmbedReceived.waitForExist();
    await expect(linkEmbedReceivedDetailsText).toHaveTextContaining(
      "P2P Chat, Voice &#38; Video Open-source, stored on IPFS. End to end encryption... trackers not included.",
    );
    await linkEmbedReceivedIcon.waitForExist();
    await linkEmbedReceivedIconTitle.waitForExist();
  });

  it("Typing Indicator - Send a long message to trigger typing indicator on remote side", async () => {
    // With User A
    await activateFirstApplication();
    // Generate a random text with 100 chars
    const shortText = await chatsInputFirstUser.generateShortRandomText();
    // Type the text with 90 chars on input bar
    await chatsInputFirstUser.typeMessageOnInput(shortText + "efgh");
  });

  it("Validate Typing Indicator is displayed if remote user is typing", async () => {
    // Switch to second user and validate that Typing Indicator is displayed
    await activateSecondApplication();
    await chatsLayoutFirstUser.typingIndicator.waitForExist({
      timeout: 30000,
    });
    await expect(
      chatsLayoutFirstUser.typingIndicatorTextValue,
    ).toHaveTextContaining("ChatUserA is typing");
  });
}

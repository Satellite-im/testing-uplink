import "module-alias/register";
import { USER_A_INSTANCE } from "@helpers/constants";
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import EmojiSuggestions from "@screenobjects/chats/EmojiSuggestions";
import InputBar from "@screenobjects/chats/InputBar";
import Messages from "@screenobjects/chats/Messages";
import {
  activateFirstApplication,
  activateSecondApplication,
} from "@helpers/commands";
let chatsLayoutFirstUser = new ChatsLayout(USER_A_INSTANCE);
let chatsInputFirstUser = new InputBar(USER_A_INSTANCE);
let chatsMessagesFirstUser = new Messages(USER_A_INSTANCE);
let emojiSuggestionsFirstUser = new EmojiSuggestions(USER_A_INSTANCE);

export default async function messageInputTests() {
  it("Chat User A - Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await activateFirstApplication();
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

  // Skipping Test Failing on CI
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

  // Skipping for Emoji Suggested List taking too long to display on CI runner
  xit("Emoji Suggested List - Displays expected data", async () => {
    // Type :en to show emoji suggestions starting with "en"
    await chatsInputFirstUser.typeMessageOnInput(":en");
    await emojiSuggestionsFirstUser.emojiSuggestionsContainer.waitForDisplayed({
      timeout: 30000,
    });

    // Validate results are correct in Emoji Suggestion List
    const expectedEmojiSuggestedList = [
      "✉️ :envelope:",
      "🏴󠁧󠁢󠁥󠁮󠁧󠁿 :england:",
      "📩 :envelope_with_arrow:",
      "🔚 :end:",
    ];

    await emojiSuggestionsFirstUser.validateEmojiSuggestionsReceived(
      expectedEmojiSuggestedList,
    );

    // Validate header text from Emoji Suggested List
    await emojiSuggestionsFirstUser.validateEmojiSuggestionsHeader(
      "SUGGESTED EMOJI",
    );
  });

  // Skipping for Emoji Suggested List taking too long to display on CI runner
  xit("Emoji Suggested List - Can be closed without choosing suggestion", async () => {
    // Close Emoji Suggested List using the Close Button
    await emojiSuggestionsFirstUser.clickOnCloseButton();

    // Validate Emoji Suggested List is closed
    await emojiSuggestionsFirstUser.emojiSuggestionsContainer.waitForDisplayed({
      reverse: true,
    });
  });

  // Skipping for Emoji Suggested List taking too long to display on CI runner
  xit("Emoji Suggested List - Selected emoji is added to input bar", async () => {
    // Open Emoji Suggested List again by typing :en to show emoji suggestions starting with "en"
    await chatsInputFirstUser.typeMessageOnInput(":en");
    await emojiSuggestionsFirstUser.emojiSuggestionsContainer.waitForDisplayed({
      timeout: 30000,
    });

    // Select first emoji from emoji list (envelope "✉️")
    await emojiSuggestionsFirstUser.clickOnEmojiSuggested("✉️");

    // Emoji Suggested List is closed after picking up one emoji
    await emojiSuggestionsFirstUser.emojiSuggestionsContainer.waitForDisplayed({
      reverse: true,
    });

    // Get value from Input Bar and ensure that is equal to "✉️"
    const inputBarValue = await chatsInputFirstUser.getValueFromInputBar();
    await expect(inputBarValue).toEqual("✉️");
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

  // Needs research to implement on MacOS
  xit("Chat Input Text - Validate users can send messages using the code language markdown", async () => {
    // With Chat User A, send a code snippet with JavaScript language
    await chatsInputFirstUser.typeCodeOnInputBar("javascript", "let a = 1;");
    await chatsInputFirstUser.clickOnSendMessage();

    // With Chat User A, validate code message was sent and is displayed correctly
    await chatsMessagesFirstUser.waitForCodeMessageSentToExist("JavaScript");
    const codeMessageTextSent =
      await chatsMessagesFirstUser.getLastMessageSentCodeMessage();
    await expect(codeMessageTextSent).toEqual("let a = 1;");
  });

  // Needs research to implement on MacOS
  xit("Chat Input Text - Code Markdown - User can copy the message from the code block", async () => {
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

  // Needs research to implement on MacOS
  xit("Chat Input Text - Validate message with code markdown is received in expected format", async () => {
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
    await chatsMessagesFirstUser.waitForLinkSentToExist("Google");
  });

  it("Chat Input Text - Validate text starting with www. is sent as link", async () => {
    // With Chat User A
    await chatsInputFirstUser.typeMessageOnInput("www.apple.com");
    await chatsInputFirstUser.clickOnSendMessage();
    await chatsMessagesFirstUser.waitForLinkSentToExist("Apple");
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
      "Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert device support.",
    );
    await linkEmbedSentIcon.waitForExist();
    await linkEmbedSentIconTitle.waitForExist();
  });

  it("Chat Input Text - Validate messages with links were received correctly", async () => {
    // With Chat User B, validate message with URL starting with https:// was received as link
    await activateSecondApplication();
    await chatsMessagesFirstUser.waitForReceivingLink("Google");

    // With Chat User B, validate message with URL starting with www. was received as link
    await chatsMessagesFirstUser.waitForReceivingLink("Apple");
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
      "Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert device support.",
    );
    await linkEmbedReceivedIcon.waitForExist();
    await linkEmbedReceivedIconTitle.waitForExist();
  });

  // Test failing on CI
  xit("Typing Indicator - Send a long message to trigger typing indicator on remote side", async () => {
    // With User A
    await activateFirstApplication();
    // Generate a random text with 100 chars
    const shortText = await chatsInputFirstUser.generateShortRandomText();
    // Type the text with 90 chars on input bar
    await chatsInputFirstUser.typeMessageOnInput(shortText + "efgh");
  });

  // Test failing on CI
  xit("Validate Typing Indicator is displayed if remote user is typing", async () => {
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

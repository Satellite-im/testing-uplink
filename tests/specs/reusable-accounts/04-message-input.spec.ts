require("module-alias/register");
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import EmojiSuggestions from "@screenobjects/chats/EmojiSuggestions";
import InputBar from "@screenobjects/chats/InputBar";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import {
  launchFirstApplication,
  launchSecondApplication,
} from "@helpers/commands";
const chatsLayout = new ChatsLayout();
const chatsInput = new InputBar();
const emojiSuggestions = new EmojiSuggestions();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();

export default async function messageInputTests() {
  it("Chat User A - Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await launchFirstApplication();
    await chatsInput.waitForIsShown(true);
    await chatsInput.clearInputBar();
    await chatsInput.clickOnInputBar();
    await chatsInput.clickOnSendMessage();

    // Ensure that input bar is empty and press Enter Key
    await chatsInput.clearInputBar();
    await chatsInput.clickOnInputBar();
    await chatsInput.pressEnterKeyOnInputBar();

    // Validate latest message sent displayed on Chat Conversation is still "Two..."
    const textMessage = await messageLocal.getLastMessageSentText();
    await expect(textMessage).toHaveTextContaining("Two...");
  });

  // Skipping Test Failing on CI
  xit("Chat User A - Message Input - User can type up to 1024 chars on input bar", async () => {
    // Generate a random text with 1024 chars
    const longText = await chatsInput.generateRandomText();
    // Type long text with 1024 chars on input bar and attempt to add 4 more chars (efgh)
    await chatsInput.typeMessageOnInput(longText + "efgh");

    // Ensure that latest chars were not added to input bar, since the max number of chars has been reached
    // Input bar text should be equal to long text with 1024 chars
    await expect(chatsInput.inputText).toHaveText(longText);

    // Clear input bar to finish test
    await chatsInput.clearInputBar();
  });

  // Skipping for Emoji Suggested List taking too long to display on CI runner
  xit("Emoji Suggested List - Displays expected data", async () => {
    // Type :en to show emoji suggestions starting with "en"
    await chatsInput.typeMessageOnInput(":en");
    await emojiSuggestions.emojiSuggestionsContainer.waitForDisplayed({
      timeout: 30000,
    });

    // Validate results are correct in Emoji Suggestion List
    const expectedEmojiSuggestedList = [
      "✉️ :envelope:",
      "🏴󠁧󠁢󠁥󠁮󠁧󠁿 :england:",
      "📩 :envelope_with_arrow:",
      "🔚 :end:",
    ];

    await emojiSuggestions.validateEmojiSuggestionsReceived(
      expectedEmojiSuggestedList,
    );

    // Validate header text from Emoji Suggested List
    await emojiSuggestions.validateEmojiSuggestionsHeader("SUGGESTED EMOJI");
  });

  // Skipping for Emoji Suggested List taking too long to display on CI runner
  xit("Emoji Suggested List - Can be closed without choosing suggestion", async () => {
    // Close Emoji Suggested List using the Close Button
    await emojiSuggestions.clickOnCloseButton();

    // Validate Emoji Suggested List is closed
    await emojiSuggestions.emojiSuggestionsContainer.waitForDisplayed({
      reverse: true,
    });
  });

  // Skipping for Emoji Suggested List taking too long to display on CI runner
  xit("Emoji Suggested List - Selected emoji is added to input bar", async () => {
    // Open Emoji Suggested List again by typing :en to show emoji suggestions starting with "en"
    await chatsInput.typeMessageOnInput(":en");
    await emojiSuggestions.emojiSuggestionsContainer.waitForDisplayed({
      timeout: 30000,
    });

    // Select first emoji from emoji list (envelope "✉️")
    await emojiSuggestions.clickOnEmojiSuggested("✉️");

    // Emoji Suggested List is closed after picking up one emoji
    await emojiSuggestions.emojiSuggestionsContainer.waitForDisplayed({
      reverse: true,
    });

    // Get value from Input Bar and ensure that is equal to "✉️"
    const inputBarValue = await chatsInput.getValueFromInputBar();
    await expect(inputBarValue).toEqual("✉️");
  });

  it("Chat Input Text - Validate texts with ** markdown are sent in bolds", async () => {
    // With Chat User A, send a message with ** markdown
    await chatsInput.clearInputBar();
    await chatsInput.typeMessageOnInput("**Bolds1**");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Bolds1");
  });

  it("Chat Input Text - Validate texts with __ markdown are sent in bolds", async () => {
    // With Chat User A, send a message with __ markdown
    await chatsInput.typeMessageOnInput("__Bolds2__");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("Bolds2");
  });

  // Needs research to implement on MacOS
  xit("Chat Input Text - Validate users can send messages using the code language markdown", async () => {
    // With Chat User A, send a code snippet with JavaScript language
    await chatsInput.typeCodeOnInputBar("javascript", "let a = 1;");
    await chatsInput.clickOnSendMessage();

    // With Chat User A, validate code message was sent and is displayed correctly
    await messageLocal.waitForCodeMessageSentToExist("JavaScript");
    const codeMessageTextSent =
      await messageLocal.getLastMessageSentCodeMessage();
    await expect(codeMessageTextSent).toEqual("let a = 1;");
  });

  // Needs research to implement on MacOS
  xit("Chat Input Text - Code Markdown - User can copy the message from the code block", async () => {
    // With Chat User A, click on the copy button from code block of last chat message sent
    await messageLocal.clickOnCopyCodeOfLastMessageSent();

    // Then, paste it into the input bar and assert the text contents on input bar
    await chatsInput.pasteClipboardOnInputBar();
    await expect(chatsInput.inputText).toHaveText("let a = 1;");

    // Finally, clear the input bar for next tests
    await chatsInput.clearInputBar();
  });

  it("Chat Input Text - Validate messages with bold markdowns were received in expected format", async () => {
    // With Chat User B, validate message with with ** markdown was received in bolds
    await launchSecondApplication();
    await chatsInput.waitForIsShown(true);
    await messageRemote.waitForReceivingMessage("Bolds1");

    // With Chat User B, validate message with with __ markdown was received in bolds
    await messageRemote.waitForReceivingMessage("Bolds2");
  });

  // Needs research to implement on MacOS
  xit("Chat Input Text - Validate message with code markdown is received in expected format", async () => {
    // With Chat User B, validate code message was received and is displayed correctly
    await messageRemote.waitForReceivingCodeMessage("JavaScript");
    const codeMessageTextReceived =
      await messageRemote.getLastMessageReceivedCodeMessage();
    await expect(codeMessageTextReceived).toEqual("let a = 1;");
  });

  it("Chat Input Text - Validate text starting with https:// is sent as link", async () => {
    // With Chat User A
    await launchFirstApplication();
    await chatsInput.waitForIsShown(true);
    await chatsInput.typeMessageOnInput("https://www.google.com");
    await chatsInput.clickOnSendMessage();
  });

  it("Chat Input Text - Validate text starting with www. is sent as link", async () => {
    // With Chat User A
    await chatsInput.typeMessageOnInput("www.apple.com");
    await chatsInput.clickOnSendMessage();
  });

  it("Chat User - Chat Messages containing links contents on local side", async () => {
    await messageLocal.waitForLinkSentToExist("Apple");

    // Validate link embed contents on chat message
    const linkEmbedSent = await messageLocal.getLastMessageSentLinkEmbed();
    const linkEmbedSentDetailsText =
      await messageLocal.getLastMessageSentLinkEmbedDetailsText();
    const linkEmbedSentIcon =
      await messageLocal.getLastMessageSentLinkEmbedIcon();
    const linkEmbedSentIconTitle =
      await messageLocal.getLastMessageSentLinkEmbedIconTitle();

    await linkEmbedSent.waitForExist();
    await expect(linkEmbedSentDetailsText).toHaveTextContaining("Apple");
    await linkEmbedSentIcon.waitForExist();
    await linkEmbedSentIconTitle.waitForExist();
  });

  it("Chat Input Text - Validate messages with links were received correctly", async () => {
    // With Chat User B, validate message with URL starting with https:// was received as link
    await launchSecondApplication();
    await chatsInput.waitForIsShown(true);
    await messageRemote.waitForReceivingLink("Google");

    // With Chat User B, validate message with URL starting with www. was received as link
    await messageRemote.waitForReceivingLink("Apple");
  });

  it("Chat User - Chat Messages containing links contents on remote side", async () => {
    // Validate link embed contents on chat message
    const linkEmbedReceived =
      await messageRemote.getLastMessageReceivedLinkEmbed();
    const linkEmbedReceivedDetailsText =
      await messageRemote.getLastMessageReceivedLinkEmbedDetailsText();
    const linkEmbedReceivedIcon =
      await messageRemote.getLastMessageReceivedLinkEmbedIcon();
    const linkEmbedReceivedIconTitle =
      await messageRemote.getLastMessageReceivedLinkEmbedIconTitle();

    await linkEmbedReceived.waitForExist();
    await expect(linkEmbedReceivedDetailsText).toHaveTextContaining("Apple");
    await linkEmbedReceivedIcon.waitForExist();
    await linkEmbedReceivedIconTitle.waitForExist();
  });

  // Test failing on CI
  xit("Typing Indicator - Send a long message to trigger typing indicator on remote side", async () => {
    // With User A
    await launchFirstApplication();
    await chatsInput.waitForIsShown(true);
    // Generate a random text with 100 chars
    const shortText = await chatsInput.generateShortRandomText();
    // Type the text with 90 chars on input bar
    await chatsInput.typeMessageOnInput(shortText + "efgh");
  });

  // Test failing on CI
  xit("Validate Typing Indicator is displayed if remote user is typing", async () => {
    // Switch to second user and validate that Typing Indicator is displayed
    await launchSecondApplication();
    await chatsInput.waitForIsShown(true);
    await chatsLayout.typingIndicator.waitForExist({
      timeout: 30000,
    });
    await expect(chatsLayout.typingIndicatorTextValue).toHaveTextContaining(
      "ChatUserA is typing",
    );
  });
}

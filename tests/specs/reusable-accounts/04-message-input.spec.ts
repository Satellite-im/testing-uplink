require("module-alias/register");
import ChatsLayout from "@screenobjects/chats/ChatsLayout";
import EmojiSuggestions from "@screenobjects/chats/EmojiSuggestions";
import FilesScreen from "@screenobjects/files/FilesScreen";
import InputBar from "@screenobjects/chats/InputBar";
import MessageLocal from "@screenobjects/chats/MessageLocal";
import MessageRemote from "@screenobjects/chats/MessageRemote";
import {
  activateFirstApplication,
  activateSecondApplication,
  closeFirstApplication,
  closeSecondApplication,
  keyboardShiftEnter,
  keyboardShortcutPaste,
  launchFirstApplication,
  launchSecondApplication,
  setClipboardValue,
} from "@helpers/commands";
const chatsLayout = new ChatsLayout();
const chatsInput = new InputBar();
const emojiSuggestions = new EmojiSuggestions();
const filesScreen = new FilesScreen();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();

export default async function messageInputTests() {
  before(async () => {
    await launchFirstApplication();
    await launchSecondApplication();
  });

  it("Chat User A - Message Input - User cannot send empty messages", async () => {
    // Ensure that input bar is empty and click on send message button
    await activateFirstApplication();
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

  it("Chat User A - Message Input - User can type up to 1024 chars on input bar", async () => {
    // Generate a random text with 1024 chars and set this to clipboard
    const longText = await chatsInput.generateRandomText();
    await setClipboardValue(longText);

    // Click on input bar and paste long text twice
    await chatsInput.clickOnInputBar();
    await keyboardShortcutPaste();
    await keyboardShortcutPaste();

    // Ensure that latest chars were not added to input bar, since the max number of chars has been reached
    // Input bar text should be equal to long text with 1024 chars
    const chatbarInputErrorText = await chatsLayout.chatbarInputErrorText;
    await expect(chatbarInputErrorText).toHaveText(
      "Maximum of 1024 characters exceeded.",
    );

    // Clear input bar to finish test
    await chatsInput.clearInputBar();
  });

  it("Emoji Suggested List - Displays expected data", async () => {
    // Type :en to show emoji suggestions starting with "en"
    await chatsInput.typeMessageOnInput(":en");
    await emojiSuggestions.validateEmojiSuggestionsContainerIsShown();

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

  it("Emoji Suggested List - Can be closed without choosing suggestion", async () => {
    // Close Emoji Suggested List using the Close Button
    await emojiSuggestions.clickOnCloseButton();

    // Validate Emoji Suggested List is closed
    await emojiSuggestions.validateEmojiSuggestionsContainerIsNotShown();
  });

  it("Emoji Suggested List - Selected emoji is added to input bar", async () => {
    // Open Emoji Suggested List again by typing :en to show emoji suggestions starting with "en"
    await chatsInput.typeMessageOnInput(":en");
    await emojiSuggestions.validateEmojiSuggestionsContainerIsShown();

    // Select second emoji from emoji list (envelope "🏴󠁧󠁢󠁥󠁮󠁧󠁿")
    await emojiSuggestions.clickOnEmojiSuggested("🏴󠁧󠁢󠁥󠁮󠁧󠁿");

    // Emoji Suggested List is closed after picking up one emoji
    await emojiSuggestions.validateEmojiSuggestionsContainerIsNotShown();
    const inputBarText = await chatsInput.getValueFromInputBar();
    await expect(inputBarText).toEqual("🏴󠁧󠁢󠁥󠁮󠁧󠁿");
    await chatsInput.clearInputBar();
  });

  it("Chat Input Text - Validate texts with ** markdown are sent in bolds", async () => {
    // With Chat User A, send a message with ** markdown
    await chatsInput.typeMessageOnInput("**Bolds1**");
    await chatsInput.clickOnSendMessage();
    await chatsInput.goToFiles();
    await filesScreen.waitForIsShown(true);
    await filesScreen.goToMainScreen();
    await chatsInput.waitForIsShown(true);
    await messageLocal.waitForMessageSentToExist("**Bolds1**");
    const messageContents = await messageLocal.getMessageContents("**Bolds1**");
    await expect(messageContents).toHaveText("Bolds1");
  });

  it("Chat Input Text - Validate texts with __ markdown are sent in bolds", async () => {
    // With Chat User A, send a message with __ markdown
    await chatsInput.typeMessageOnInput("__Bolds2__");
    await chatsInput.clickOnSendMessage();
    await chatsInput.goToFiles();
    await filesScreen.waitForIsShown(true);
    await filesScreen.goToMainScreen();
    await chatsInput.waitForIsShown(true);
    await messageLocal.waitForMessageSentToExist("__Bolds2__");
    const messageContents = await messageLocal.getMessageContents("__Bolds2__");
    await expect(messageContents).toHaveText("Bolds2");
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

    const inputText = await chatsInput.getValueFromInputBar();
    await expect(inputText).toHaveText("let a = 1;");

    // Finally, clear the input bar for next tests
    await chatsInput.clearInputBar();
  });

  it("Chat Input Text - Validate messages with bold markdowns were received in expected format", async () => {
    // With Chat User B, validate message with with ** markdown was received in bolds
    await activateSecondApplication();
    await chatsInput.waitForIsShown(true);
    await messageRemote.waitForReceivingMessage("**Bolds1**");
    const messageContentsBolds1 =
      await messageRemote.getMessageContents("**Bolds1**");
    await expect(messageContentsBolds1).toHaveText("Bolds1");

    // With Chat User B, validate message with with __ markdown was received in bolds
    await messageRemote.waitForReceivingMessage("__Bolds2__");
    const messageContentsBolds2 =
      await messageRemote.getMessageContents("__Bolds2__");
    await expect(messageContentsBolds2).toHaveText("Bolds2");
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
    await activateFirstApplication();
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
    await messageLocal.waitForLinkSentToExist("www.apple.com");

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
    await activateSecondApplication();
    await chatsInput.waitForIsShown(true);
    await messageRemote.waitForReceivingLink("https://www.google.com");

    // With Chat User B, validate message with URL starting with www. was received as link
    await messageRemote.waitForReceivingLink("www.apple.com");
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
    await chatsInput.waitForIsShown(true);
    // Generate a random text with 100 chars
    const shortText = await chatsInput.generateShortRandomText();
    // Type the text with 90 chars on input bar
    await chatsInput.typeMessageOnInput(shortText + "efgh");
  });

  // Test failing on CI
  xit("Validate Typing Indicator is displayed if remote user is typing", async () => {
    // Switch to second user and validate that Typing Indicator is displayed
    await activateFirstApplication();
    await chatsInput.waitForIsShown(true);
    await chatsLayout.typingIndicator.waitForExist({
      timeout: 30000,
    });
    await expect(chatsLayout.typingIndicatorTextValue).toHaveText(
      "ChatUserB is typing",
    );
  });

  after(async () => {
    await closeFirstApplication();
    await closeSecondApplication();
  });
}

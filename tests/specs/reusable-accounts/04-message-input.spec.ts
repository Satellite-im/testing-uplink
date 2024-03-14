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
  grabCacheFolder,
  keyboardShortcutPaste,
  pressEnterKey,
  resetAndLoginWithCache,
  setClipboardValue,
} from "@helpers/commands";
const chatsLayout = new ChatsLayout();
const chatsInput = new InputBar();
const emojiSuggestions = new EmojiSuggestions();
const filesScreen = new FilesScreen();
const messageLocal = new MessageLocal();
const messageRemote = new MessageRemote();

describe("Chats Message Input Tests", async () => {
  before(async () => {
    await resetAndLoginWithCache("ChatUserA");
    await resetAndLoginWithCache("ChatUserB");
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
    const textMessage = await messageLocal.getCustomMessageContents("Two...");
    await expect(textMessage).toHaveText("Two...");
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
    await chatsInput.typeMessageOnInput(":engl");
    await emojiSuggestions.validateEmojiSuggestionsContainerIsShown();

    // Select second emoji from emoji list (envelope "🏴󠁧󠁢󠁥󠁮󠁧󠁿")
    await pressEnterKey();

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
    const messageContents =
      await messageLocal.getCustomMessageContents("**Bolds1**");
    await expect(messageContents).toHaveText("Bolds1");
  });

  it("Chat Input Text - Validate texts with __ markdown are sent in bolds", async () => {
    // With Chat User A, send a message with __ markdown
    await chatsInput.typeMessageOnInput("__Bolds2__");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("__Bolds2__");
    const messageContents =
      await messageLocal.getCustomMessageContents("__Bolds2__");
    await expect(messageContents).toHaveText("Bolds2");
  });

  it("Chat Input Text - Validate texts with * and _ markdown are sent in italic", async () => {
    // With Chat User A, send a message with _ markdown
    await chatsInput.typeMessageOnInput("_Italic1_");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("_Italic1_");
    const messageContentsItalicsOne =
      await messageLocal.getCustomMessageContents("_Italic1_");
    await expect(messageContentsItalicsOne).toHaveText("Italic1");

    // With Chat User A, send a message with * markdown
    await chatsInput.typeMessageOnInput("*Italic2*");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("*Italic2*");
    const messageContentsItalicsTwo =
      await messageLocal.getCustomMessageContents("*Italic2*");
    await expect(messageContentsItalicsTwo).toHaveText("Italic2");
  });

  it("Chat Input Text - Validate texts with ~ and ~~ markdown are sent in strikethrough", async () => {
    // With Chat User A, send a message with ~ markdown
    await chatsInput.typeMessageOnInput("~Strikethrough1~");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("~Strikethrough1~");
    const messageContentsStrikethroughOne =
      await messageLocal.getCustomMessageContents("~Strikethrough1~");
    await expect(messageContentsStrikethroughOne).toHaveText("Strikethrough1");

    // With Chat User A, send a message with ~~ markdown
    await chatsInput.typeMessageOnInput("~~Strikethrough2~~");
    await chatsInput.clickOnSendMessage();
    await messageLocal.waitForMessageSentToExist("~~Strikethrough2~~");
    const messageContentsStrikethroughTwo =
      await messageLocal.getCustomMessageContents("~~Strikethrough2~~");
    await expect(messageContentsStrikethroughTwo).toHaveText("Strikethrough2");
  });

  it("Chat Input Text - Validate users can send messages using the code language markdown", async () => {
    // With Chat User A, send a code snippet with JavaScript language
    await chatsInput.typeCodeOnInputBar("JavaScript", "let a = 1;");
    await chatsInput.clickOnSendMessage();

    // With Chat User A, validate code message was sent and is displayed correctly
    await messageLocal.waitForCodeMessageSentToExist("JavaScript");
    const codeMessageTextSent =
      await messageLocal.getCustomMessageSentCodeMessage("JavaScript");
    await expect(codeMessageTextSent).toEqual("let a = 1;");
  });

  it("Chat Input Text - Code Markdown - User can copy the message from the code block", async () => {
    // With Chat User A, click on the copy button from code block of last chat message sent
    await messageLocal.clickOnCopyCodeOfCustomMessageSent("JavaScript");

    // Then, paste it into the input bar and assert the text contents on input bar
    await chatsInput.pasteClipboardOnInputBar();

    const inputText = await chatsInput.getValueFromInputBar();
    await expect(inputText).toEqual("let a = 1;");

    // Finally, clear the input bar for next tests
    await chatsInput.clearInputBar();
  });

  it("Chat Input Text - Validate messages with bold markdowns were received in expected format", async () => {
    // With Chat User B, validate message with with ** markdown was received in bolds
    await activateSecondApplication();
    await chatsInput.waitForIsShown(true);
    await messageRemote.waitForReceivingMessage("**Bolds1**");
    const messageContentsBoldsOne =
      await messageRemote.getCustomMessageContents("**Bolds1**");
    await expect(messageContentsBoldsOne).toHaveText("Bolds1");

    // With Chat User B, validate message with with __ markdown was received in bolds
    await messageRemote.waitForReceivingMessage("__Bolds2__");
    const messageContentsBoldsTwo =
      await messageRemote.getCustomMessageContents("__Bolds2__");
    await expect(messageContentsBoldsTwo).toHaveText("Bolds2");
  });

  it("Chat Input Text - Validate messages with italic markdowns were received in expected format", async () => {
    // With Chat User B, validate message with with _ markdown was received in italic
    await messageRemote.waitForReceivingMessage("_Italic1_");
    const messageContentsItalicOne =
      await messageRemote.getCustomMessageContents("_Italic1_");
    await expect(messageContentsItalicOne).toHaveText("Italic1");

    // With Chat User B, validate message with with * markdown was received in italic
    await messageRemote.waitForReceivingMessage("*Italic2*");
    const messageContentsItalicTwo =
      await messageRemote.getCustomMessageContents("*Italic2*");
    await expect(messageContentsItalicTwo).toHaveText("Italic2");
  });

  it("Chat Input Text - Validate messages with strikethrough markdowns were received in expected format", async () => {
    // With Chat User B, validate message with with ~ markdown was received in Strikethrough
    await chatsInput.waitForIsShown(true);
    await messageRemote.waitForReceivingMessage("~Strikethrough1~");
    const messageContentsStrikethroughOne =
      await messageRemote.getCustomMessageContents("~Strikethrough1~");
    await expect(messageContentsStrikethroughOne).toHaveText("Strikethrough1");

    // With Chat User B, validate message with with ~~ markdown was received in Strikethrough
    await messageRemote.waitForReceivingMessage("~~Strikethrough2~~");
    const messageContentsStrikethroughTwo =
      await messageRemote.getCustomMessageContents("~~Strikethrough2~~");
    await expect(messageContentsStrikethroughTwo).toHaveText("Strikethrough2");
  });

  it("Chat Input Text - Validate message with code markdown is received in expected format", async () => {
    // With Chat User B, validate code message was received and is displayed correctly
    await messageRemote.waitForReceivingCodeMessage("JavaScript");
    const codeMessageTextReceived =
      await messageRemote.getCustomMessageReceivedCodeMessage("JavaScript");
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
    const linkEmbedSent =
      await messageLocal.getCustomMessageSentLinkEmbed("www.apple.com");
    const linkEmbedSentDetailsText =
      await messageLocal.getCustomMessageSentLinkEmbedDetailsText(
        "www.apple.com",
      );
    const linkEmbedSentIcon =
      await messageLocal.getCustomMessageSentLinkEmbedIcon("www.apple.com");
    const linkEmbedSentIconTitle =
      await messageLocal.getCustomMessageSentLinkEmbedIconTitle(
        "www.apple.com",
      );

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
      await messageRemote.getCustomMessageReceivedLinkEmbed("www.apple.com");
    const linkEmbedReceivedDetailsText =
      await messageRemote.getCustomMessageReceivedLinkEmbedDetailsText(
        "www.apple.com",
      );
    const linkEmbedReceivedIcon =
      await messageRemote.getCustomMessageReceivedLinkEmbedIcon(
        "www.apple.com",
      );
    const linkEmbedReceivedIconTitle =
      await messageRemote.getCustomMessageReceivedLinkEmbedIconTitle(
        "www.apple.com",
      );

    await linkEmbedReceived.waitForExist();
    await expect(linkEmbedReceivedDetailsText).toHaveTextContaining("Apple");
    await linkEmbedReceivedIcon.waitForExist();
    await linkEmbedReceivedIconTitle.waitForExist();
  });

  // Skipping this test since the time spent between switching windows to validate, the typing indicator is already gone
  xit("Typing Indicator - Send a long message to trigger typing indicator on remote side", async () => {
    await chatsInput.waitForIsShown(true);
    // Generate a random text with 100 chars
    const shortText = await chatsInput.generateShortRandomText();
    // Type the text with 90 chars on input bar
    await chatsInput.typeMessageOnInput(shortText + "efgh");
  });

  // Skipping this test since the time spent between switching windows to validate, the typing indicator is already gone
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
    await grabCacheFolder("ChatUserA");
    await grabCacheFolder("ChatUserB");
  });
});

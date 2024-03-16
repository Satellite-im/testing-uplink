require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  CHATBAR_INPUT_ERROR: '[name="chatbar-input-error"]',
  CHATBAR_INPUT_ERROR_TEXT: "<Text>",
  ENCRYPTED_MESSAGES: '[name="messages-secured-alert"]',
  ENCRYPTED_MESSAGES_TEXT: "//Group/Text",
  SCROLL_TO_BOTTOM: '//Text[@Name="Scroll to bottom"]',
  TYPING_INDICATOR: '[name="message-typing-indicator"]',
  TYPING_INDICATOR_TEXT: '[name="typing-message"]',
  TYPING_INDICATOR_TEXT_VALUE: "<Text>",
};

const SELECTORS_MACOS = {
  CHATBAR_INPUT_ERROR: "~chatbar-input-error",
  CHATBAR_INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  ENCRYPTED_MESSAGES: "~messages-secured-alert",
  ENCRYPTED_MESSAGES_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SCROLL_TO_BOTTOM:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "Scroll to bottom"`]',
  TYPING_INDICATOR: "~message-typing-indicator",
  TYPING_INDICATOR_TEXT: "~typing-message",
  TYPING_INDICATOR_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ChatsLayout extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_LAYOUT);
  }

  public get chatbarInputError() {
    return this.chatLayout.$(SELECTORS.CHATBAR_INPUT_ERROR);
  }

  public get chatbarInputErrorText() {
    return this.chatbarInputError.$(SELECTORS.CHATBAR_INPUT_ERROR_TEXT);
  }

  public get chatLayout() {
    return $(SELECTORS.CHAT_LAYOUT);
  }

  public get encryptedMessages() {
    return $(SELECTORS.ENCRYPTED_MESSAGES);
  }

  public get encryptedMessagesText() {
    return $(SELECTORS.ENCRYPTED_MESSAGES).$(SELECTORS.ENCRYPTED_MESSAGES_TEXT);
  }

  public get scrollToBottomButton() {
    return this.chatLayout.$(SELECTORS.SCROLL_TO_BOTTOM);
  }

  public get typingIndicator() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.TYPING_INDICATOR);
  }

  public get typingIndicatorText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.TYPING_INDICATOR)
      .$(SELECTORS.TYPING_INDICATOR_TEXT);
  }
  public get typingIndicatorTextValue() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.TYPING_INDICATOR)
      .$(SELECTORS.TYPING_INDICATOR_TEXT)
      .$(SELECTORS.TYPING_INDICATOR_TEXT_VALUE);
  }

  async clickOnScrollToBottom() {
    await this.scrollToBottomButton.waitForDisplayed();
    await this.scrollToBottomButton.click();
  }

  async validateChatLayoutIsShown() {
    await this.chatLayout.waitForExist();
  }
}

export default new ChatsLayout();

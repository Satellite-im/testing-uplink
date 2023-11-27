import "module-alias/register";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import {
  USER_A_INSTANCE as firstUserInstance,
  WINDOWS_DRIVER as windowsDriver,
} from "@helpers/constants";

const currentOS = driver[firstUserInstance].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  ENCRYPTED_MESSAGES: '[name="messages-secured-alert"]',
  ENCRYPTED_MESSAGES_TEXT: "//Group/Text",
  TYPING_INDICATOR: '[name="message-typing-indicator"]',
  TYPING_INDICATOR_TEXT: '[name="typing-message"]',
  TYPING_INDICATOR_TEXT_VALUE: "<Text>",
};

const SELECTORS_MACOS = {
  ENCRYPTED_MESSAGES: "~messages-secured-alert",
  ENCRYPTED_MESSAGES_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  TYPING_INDICATOR: "~message-typing-indicator",
  TYPING_INDICATOR_TEXT: "~typing-message",
  TYPING_INDICATOR_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === windowsDriver
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ChatsLayout extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.CHAT_LAYOUT);
  }

  get chatLayout() {
    return this.instance.$(SELECTORS.CHAT_LAYOUT);
  }

  get encryptedMessages() {
    return this.instance.$(SELECTORS.ENCRYPTED_MESSAGES);
  }

  get encryptedMessagesText() {
    return this.instance
      .$(SELECTORS.ENCRYPTED_MESSAGES)
      .$(SELECTORS.ENCRYPTED_MESSAGES_TEXT);
  }

  get typingIndicator() {
    return this.instance.$(SELECTORS.CHAT_LAYOUT).$(SELECTORS.TYPING_INDICATOR);
  }

  get typingIndicatorText() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.TYPING_INDICATOR)
      .$(SELECTORS.TYPING_INDICATOR_TEXT);
  }
  get typingIndicatorTextValue() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.TYPING_INDICATOR)
      .$(SELECTORS.TYPING_INDICATOR_TEXT)
      .$(SELECTORS.TYPING_INDICATOR_TEXT_VALUE);
  }

  async validateChatLayoutIsShown() {
    await this.chatLayout.waitForExist();
  }
}

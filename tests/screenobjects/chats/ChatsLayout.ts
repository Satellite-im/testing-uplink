import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  ENCRYPTED_MESSAGES: '[name="messages-secured-alert"]',
  ENCRYPTED_MESSAGES_TEXT: "//Group/Text",
  TYPING_INDICATOR: '[name="message-typing-indicator"]',
};

const SELECTORS_MACOS = {
  ENCRYPTED_MESSAGES: "~messages-secured-alert",
  ENCRYPTED_MESSAGES_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TYPING_INDICATOR: "~message-typing-indicator",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ChatsLayout extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_LAYOUT);
  }

  get chatLayout() {
    return $(SELECTORS.CHAT_LAYOUT);
  }

  get encryptedMessages() {
    return $(SELECTORS.ENCRYPTED_MESSAGES);
  }

  get encryptedMessagesText() {
    return $(SELECTORS.ENCRYPTED_MESSAGES).$(SELECTORS.ENCRYPTED_MESSAGES_TEXT);
  }

  get typingIndicator() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.TYPING_INDICATOR);
  }
}

export default new ChatsLayout();

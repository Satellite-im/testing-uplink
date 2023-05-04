import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  ENCRYPTED_MESSAGES_TEXT: '//Text[contains(@Name, "Messages are secured")]',
};

const SELECTORS_MACOS = {
  ENCRYPTED_MESSAGES_TEXT:
    '//XCUIElementTypeStaticText[contains(@value, "Messages are secured")]',
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

  get encryptedMessagesText() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.ENCRYPTED_MESSAGES_TEXT);
  }
}

export default new ChatsLayout();

import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  ENCRYPTED_MESSAGES_TEXT: "//Group[3]/Group/Text",
};

const SELECTORS_MACOS = {
  ENCRYPTED_MESSAGES_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup[3]/XCUIElementTypeGroup/XCUIElementTypeStaticText",
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

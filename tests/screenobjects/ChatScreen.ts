import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
  SIDEBAR_CHATS_SECTION: "~Chats",
};

const SELECTORS_WINDOWS = {
  CHAT_MESSAGE: '[name="Message"]',
  CHAT_MESSAGE_TEXT: "//Text",
  INPUT_BUTTON: "//Button",
  INPUT_TEXT: "//Edit",
  SIDEBAR_CHATS_USER: '[name="User"]',
  SIDEBAR_CHATS_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_CHATS_USER_INFO: '[name="User Info"]',
  SIDEBAR_CHATS_USER_NAME: '[name="Username"]',
  SIDEBAR_CHATS_USER_STATUS: '[name="User Status"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
  TOPBAR_ADD_TO_FAVORITES: '[name="Favorites"]',
  TOPBAR_CALL: '[name="Call"]',
  TOPBAR_USER_IMAGE: '[name="User Image"]',
  TOPBAR_USER_NAME: "//Text",
  TOPBAR_VIDEOCALL: '[name="Videocall"]',
};

const SELECTORS_MACOS = {
  CHAT_MESSAGE: "~Message",
  CHAT_MESSAGE_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  INPUT_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  INPUT_TEXT: "-ios class chain:**/XCUIElementTypeTextView",
  SIDEBAR_CHATS_USER: "~User",
  SIDEBAR_CHATS_USER_IMAGE: "~User Image",
  SIDEBAR_CHATS_USER_INFO: "~User Info",
  SIDEBAR_CHATS_USER_NAME: "~Username",
  SIDEBAR_CHATS_USER_STATUS: "~User Status",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_USER_IMAGE: "~User Image",
  TOPBAR_USER_NAME: "-ios class chain:**/XCUIElementTypeStaticText",
  TOPBAR_VIDEOCALL: "~Videocall",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ChatScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_LAYOUT);
  }

  get chatLayout() {
    return $(SELECTORS.CHAT_LAYOUT);
  }

  get chatMessage() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.CHAT_MESSAGE);
  }

  get chatMessageText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_TEXT);
  }

  get inputSendButton() {
    return $(SELECTORS.CHAT_LAYOUT).$$(SELECTORS.INPUT_BUTTON)[1];
  }

  get inputSendTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[1];
  }

  get inputText() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.INPUT_TEXT);
  }

  get inputSendTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[1]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get inputUploadButton() {
    return $(SELECTORS.CHAT_LAYOUT).$$(SELECTORS.INPUT_BUTTON)[0];
  }

  get inputUploadTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[0];
  }

  get inputUploadTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[0]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get sidebarChatsSection() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get sidebarChatsUser() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$$(SELECTORS.SIDEBAR_CHATS_USER);
  }

  get sidebarChatsUserImage() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarChatsUserInfo() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_INFO);
  }

  get sidebarChatsUserName() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_INFO)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME);
  }

  get sidebarChatsUserStatus() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_INFO)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  get topbarAddToFavorites() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_ADD_TO_FAVORITES);
  }

  get topbarAddToFavoritesTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[0];
  }

  get topbarAddToFavoritesTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[0]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarCall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_CALL);
  }

  get topbarCallTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[1];
  }

  get topbarCallTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[1]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarUserImage() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
  }

  get topbarUserName() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_NAME);
  }

  get topbarVideocall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_VIDEOCALL);
  }

  get topbarVideocallTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[2];
  }

  get topbarVideocallTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[2]
      .$(SELECTORS.TOOLTIP_TEXT);
  }
}

export default new ChatScreen();

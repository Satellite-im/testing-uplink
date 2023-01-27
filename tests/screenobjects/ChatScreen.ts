import UplinkMainScreen from "./UplinkMainScreen";

const SELECTORS = {
  CHAT_LAYOUT: "~chat-layout",
  CHAT_MESSAGE: "~Message",
  SIDEBAR_CHATS_SECTION: "~Chats",
  SIDEBAR_CHATS_USER: "~User",
  SIDEBAR_CHATS_USER_IMAGE: "~User Image",
  SIDEBAR_CHATS_USER_INFO: "~User Info",
  SIDEBAR_CHATS_USER_NAME: "~Username",
  SIDEBAR_CHATS_USER_STATUS: "~User Status",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Add to Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_USER_IMAGE: "~User Image",
  TOPBAR_VIDEOCALL: "~Videocall",
};

class ChatScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_LAYOUT);
  }

  get chatLayout() {
    return $(SELECTORS.CHAT_LAYOUT);
  }

  get chatMessage() {
    return $(SELECTORS.CHAT_LAYOUT).$$(SELECTORS.CHAT_MESSAGE);
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

  get topbarCall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_CALL);
  }

  get topbarUserImage() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
  }

  get topbarVideocall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_VIDEOCALL);
  }
}

export default new ChatScreen();

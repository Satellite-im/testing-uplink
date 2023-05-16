import { hoverOnMacOS, hoverOnWindows } from "../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  SIDEBAR_CHATS_SECTION: "~Chats",
};

const SELECTORS_WINDOWS = {
  CREATE_GROUP_CHAT_CREATE_DM_BUTTON: '[name="create-dm-button"]',
  CREATE_GROUP_CHAT_FRIEND_CONTAINER: '[name="Friend Container"]',
  CREATE_GROUP_CHAT_SECTION: '[name="Create Group"]',
  CREATE_GROUP_CHAT_USER_IMAGE: '[name="User Image"]',
  CREATE_GROUP_CHAT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  CREATE_GROUP_CHAT_USER_NAME: '[name="friend-name"]',
  CREATE_GROUP_CHAT_USER_NAME_TEXT: "//Text",
  SIDEBAR_CHATS_CONTEXT_CLEAR: '[name="chats-clear-unreads"]',
  SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION:
    '[name="chats-delete-conversation"]',
  SIDEBAR_CHATS_CONTEXT_DELETE_GROUP: '[name="chats-delete-group"]',
  SIDEBAR_CHATS_CONTEXT_HIDE: '[name="chats-hide-chat"]',
  SIDEBAR_CHATS_CONTEXT_LEAVE: '[name="chats-leave-group"]',
  SIDEBAR_CHATS_HEADER: "//Text/Text",
  SIDEBAR_CHATS_USER: '[name="User"]',
  SIDEBAR_CHATS_USER_BADGE: '[name="User Badge"]',
  SIDEBAR_CHATS_USER_BADGE_NUMBER: "//Text[2]",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO: "//Text[1]",
  SIDEBAR_CHATS_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_CHATS_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SIDEBAR_CHATS_USER_INFO: '[name="User Info"]',
  SIDEBAR_CHATS_USER_NAME: '[name="Username"]',
  SIDEBAR_CHATS_USER_NAME_VALUE: "//Text",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: '[name="indicator-offline"]',
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: '[name="indicator-online"]',
  SIDEBAR_CHATS_USER_STATUS: '[name="User Status"]',
  SIDEBAR_CHATS_USER_STATUS_VALUE: "//Text",
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: '[name="create-group-chat"]',
  SIDEBAR_GROUP_CHAT_IMAGE: '[name="user-image-group-wrap"]',
  SIDEBAR_GROUP_CHAT_PLUS_SOME: '[name="plus-some"]',
};

const SELECTORS_MACOS = {
  CREATE_GROUP_CHAT_CREATE_DM_BUTTON: "~create-dm-button",
  CREATE_GROUP_CHAT_FRIEND_CONTAINER: "~Friend Container",
  CREATE_GROUP_CHAT_SECTION: "~Create Group",
  CREATE_GROUP_CHAT_USER_IMAGE: "~User Image",
  CREATE_GROUP_CHAT_USER_IMAGE_WRAP: "~user-image-wrap",
  CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE: "~indicator-online",
  CREATE_GROUP_CHAT_USER_NAME: "~friend-name",
  CREATE_GROUP_CHAT_USER_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_CONTEXT_CLEAR: "~chats-clear-unreads",
  SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION: "~chats-delete-conversation",
  SIDEBAR_CHATS_CONTEXT_DELETE_GROUP: "~chats-delete-group",
  SIDEBAR_CHATS_CONTEXT_HIDE: "~chats-hide-chat",
  SIDEBAR_CHATS_CONTEXT_LEAVE: "~chats-leave-group",
  SIDEBAR_CHATS_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER: "~User",
  SIDEBAR_CHATS_USER_BADGE: "~User Badge",
  SIDEBAR_CHATS_USER_BADGE_NUMBER:
    "-ios class chain:**/XCUIElementTypeStaticText[2]",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO:
    "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SIDEBAR_CHATS_USER_IMAGE: "~User Image",
  SIDEBAR_CHATS_USER_IMAGE_WRAP: "~user-image-wrap",
  SIDEBAR_CHATS_USER_INFO: "~User Info",
  SIDEBAR_CHATS_USER_NAME: "~Username",
  SIDEBAR_CHATS_USER_NAME_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: "~indicator-offline",
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: "~indicator-online",
  SIDEBAR_CHATS_USER_STATUS: "~User Status",
  SIDEBAR_CHATS_USER_STATUS_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: "~create-group-chat",
  SIDEBAR_GROUP_CHAT_IMAGE: "~user-image-group-wrap",
  SIDEBAR_GROUP_CHAT_PLUS_SOME: "~plus-some",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ChatsSidebar extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get createGroupChatSection() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  get createGroupChatCreateDMButton() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION).$(
      SELECTORS.CREATE_GROUP_CHAT_CREATE_DM_BUTTON
    );
  }

  get createGroupChatSearchInput() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION).$(
      SELECTORS.CHAT_SEARCH_INPUT
    );
  }

  get createGroupChatFriendContainer() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION).$(
      SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER
    );
  }

  get createGroupChatUserImage() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_IMAGE);
  }

  get createGroupChatUserImageWrap() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_IMAGE_WRAP);
  }

  get createGroupChatUserIndicatorOffline() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE);
  }

  get createGroupChatUserIndicatorOnline() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE);
  }

  get createGroupChatUserName() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME);
  }

  get createGroupChatUserNameText() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME_TEXT);
  }

  get sidebarChatsContextClearUnreads() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_CLEAR);
  }

  get sidebarChatsContextHideChat() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_HIDE);
  }

  get sidebarChatsContextDeleteConversation() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION);
  }

  get sidebarChatsContextDeleteGroup() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_DELETE_GROUP);
  }

  get sidebarChatsContextLeaveGroup() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_LEAVE);
  }

  get siderbarChatsHeader() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(
      SELECTORS.SIDERBAR_CHATS_HEADER
    );
  }

  get sidebarChatsSection() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get sidebarChatsUser() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$$(SELECTORS.SIDEBAR_CHATS_USER);
  }

  get sidebarChatsUserBadge() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE);
  }

  get sidebarChatsUserBadgeNumber() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_NUMBER);
  }

  get sidebarChatsUserBadgeTimeAgo() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_TIME_AGO);
  }

  get sidebarChatsUserImage() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarChatsUserImageWrap() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP);
  }

  get sidebarChatsUserInfo() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_INFO);
  }

  get sidebarChatsUserName() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME);
  }
  get sidebarChatsUserNameValue() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME_VALUE);
  }

  get sidebarChatsUserOfflineIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarChatsUserOnlineIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
  }

  get sidebarChatsUserStatus() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS);
  }

  get sidebarChatsUserStatusValue() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
  }

  get sidebarCreateGroupChat() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(
      SELECTORS.SIDEBAR_CREATE_GROUP_CHAT_BUTTON
    );
  }

  get sidebarCreateGroupChatTooltip() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION).$(SELECTORS.TOOLTIP);
  }

  get sidebarCreateGroupChatTooltipText() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get sidebarGroupChatImage() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE);
  }

  get sidebarGroupChatPlusSome() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE).$(
      SELECTORS.SIDEBAR_GROUP_CHAT_PLUS_SOME
    );
  }

  get sidebarGroupChatUserImages() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarGroupChatUserImageWraps() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE).$$(
      SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP
    );
  }

  get sidebarGroupChatUserIndicatorOffline() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarGroupChatsUserIndicatorOnline() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
  }
}

export default new ChatsSidebar();

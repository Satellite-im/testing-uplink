import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CONTEXT_MENU: '[name="Context Menu"]',
  SIDEBAR_CHATS_CONTEXT_CLEAR: '[name="chats-clear-unreads"]',
  SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION:
    '[name="chats-delete-conversation"]',
  SIDEBAR_CHATS_CONTEXT_DELETE_GROUP: '[name="chats-delete-group"]',
  SIDEBAR_CHATS_CONTEXT_HIDE: '[name="chats-hide-chat"]',
  SIDEBAR_CHATS_CONTEXT_LEAVE: '[name="chats-leave-group"]',
};

const SELECTORS_MACOS = {
  CONTEXT_MENU: "~Context Menu",
  SIDEBAR_CHATS_CONTEXT_CLEAR: "~chats-clear-unreads",
  SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION: "~chats-delete-conversation",
  SIDEBAR_CHATS_CONTEXT_DELETE_GROUP: "~chats-delete-group",
  SIDEBAR_CHATS_CONTEXT_HIDE: "~chats-hide-chat",
  SIDEBAR_CHATS_CONTEXT_LEAVE: "~chats-leave-group",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ContextMenuSidebar extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CONTEXT_MENU);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
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

  async selectChatsClearUnreads() {
    await this.sidebarChatsContextClearUnreads.click();
  }

  async selectChatsDeleteConversation() {
    await this.sidebarChatsContextDeleteConversation.click();
  }

  async selectChatsDeleteGroup() {
    await this.sidebarChatsContextDeleteGroup.click();
  }

  async selectChatsHideChat() {
    await this.sidebarChatsContextHideChat.click();
  }

  async selectChatsLeaveGroup() {
    await this.sidebarChatsContextLeaveGroup.click();
  }

  async validateContextMenuIsOpen() {
    await this.contextMenu.waitForDisplayed();
  }
}

export default new ContextMenuSidebar();

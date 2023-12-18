require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

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

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ContextMenuSidebar extends UplinkMainScreen {
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
    const clearUnreads = await this.sidebarChatsContextClearUnreads;
    await clearUnreads.click();
  }

  async selectChatsDeleteConversation() {
    const deleteConversation = await this.sidebarChatsContextDeleteConversation;
    await deleteConversation.click();
  }

  async selectChatsDeleteGroup() {
    const deleteGroup = await this.sidebarChatsContextDeleteGroup;
    await deleteGroup.click();
  }

  async selectChatsHideChat() {
    const hideChat = await this.sidebarChatsContextHideChat;
    await hideChat.click();
  }

  async selectChatsLeaveGroup() {
    const leaveGroup = await this.sidebarChatsContextLeaveGroup;
    await leaveGroup.click();
  }

  async validateContextMenuIsOpen() {
    const contextMenu = await this.contextMenu;
    await contextMenu.waitForExist();
  }
}

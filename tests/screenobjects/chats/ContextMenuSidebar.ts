require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {};

const SELECTORS_WINDOWS: selectorContainer = {
  CONTEXT_MENU: '[name="Context Menu"]',
  SIDEBAR_CHATS_CONTEXT_CLEAR: '[name="chats-clear-unreads"]',
  SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION:
    '[name="chats-delete-conversation"]',
  SIDEBAR_CHATS_CONTEXT_DELETE_GROUP: '[name="chats-delete-group"]',
  SIDEBAR_CHATS_CONTEXT_HIDE: '[name="chats-hide-chat"]',
  SIDEBAR_CHATS_CONTEXT_LEAVE: '[name="chats-leave-group"]',
};

const SELECTORS_MACOS: selectorContainer = {
  CONTEXT_MENU: "~Context Menu",
  SIDEBAR_CHATS_CONTEXT_CLEAR: "~chats-clear-unreads",
  SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION: "~chats-delete-conversation",
  SIDEBAR_CHATS_CONTEXT_DELETE_GROUP: "~chats-delete-group",
  SIDEBAR_CHATS_CONTEXT_HIDE: "~chats-hide-chat",
  SIDEBAR_CHATS_CONTEXT_LEAVE: "~chats-leave-group",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ContextMenuSidebar extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CONTEXT_MENU);
  }

  public get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  public get sidebarChatsContextClearUnreads() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_CLEAR);
  }

  public get sidebarChatsContextHideChat() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_HIDE);
  }

  public get sidebarChatsContextDeleteConversation() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_DELETE_CONVERSATION);
  }

  public get sidebarChatsContextDeleteGroup() {
    return $(SELECTORS.SIDEBAR_CHATS_CONTEXT_DELETE_GROUP);
  }

  public get sidebarChatsContextLeaveGroup() {
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

export default new ContextMenuSidebar();

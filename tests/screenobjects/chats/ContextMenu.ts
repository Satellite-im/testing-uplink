import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MESSAGES_DELETE: '[name="messages-delete"]',
  CONTEXT_MESSAGES_EDIT: '[name="messages-edit"]',
  CONTEXT_MESSAGES_REACT: '[name="messages-react"]',
  CONTEXT_MESSAGES_REPLY: '[name="messages-reply"]',
};

const SELECTORS_MACOS = {
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MESSAGES_DELETE: "~messages-delete",
  CONTEXT_MESSAGES_EDIT: "~messages-edit",
  CONTEXT_MESSAGES_REACT: "~messages-react",
  CONTEXT_MESSAGES_REPLY: "~messages-reply",
  TOOLTIP: "~tooltip",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ContextMenu extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CONTEXT_MENU);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMessagesDelete() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_DELETE);
  }

  get contextMessagesEdit() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_EDIT);
  }

  get contextMessagesReact() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_REACT);
  }

  get contextMessagesReply() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_REPLY);
  }

  async selectContextOptionDelete() {
    await this.contextMessagesDelete.click();
  }

  async selectContextOptionEdit() {
    await this.contextMessagesEdit.click();
  }

  async selectContextOptionReact() {
    await this.contextMessagesReact.click();
  }

  async selectContextOptionReply() {
    await this.contextMessagesReply.click();
  }

  async validateContextMenuIsOpen() {
    await this.contextMenu.waitForDisplayed();
  }
}

export default new ContextMenu();

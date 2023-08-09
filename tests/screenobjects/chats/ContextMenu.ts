import UplinkMainScreen from "../UplinkMainScreen";
import {
  MACOS_DRIVER,
  USER_A_INSTANCE,
  WINDOWS_DRIVER,
} from "../../helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MESSAGES_CANCEL_EDIT: '[name="messages-cancel-edit"]',
  CONTEXT_MESSAGES_DELETE: '[name="messages-delete"]',
  CONTEXT_MESSAGES_EDIT: '[name="messages-edit"]',
  CONTEXT_MESSAGES_REACT: '[name="messages-react"]',
  CONTEXT_MESSAGES_REPLY: '[name="messages-reply"]',
  EMOJI_BUTTON: "//Button",
};

const SELECTORS_MACOS = {
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MESSAGES_CANCEL_EDIT: "~messages-cancel-edit",
  CONTEXT_MESSAGES_DELETE: "~messages-delete",
  CONTEXT_MESSAGES_EDIT: "~messages-edit",
  CONTEXT_MESSAGES_REACT: "~messages-react",
  CONTEXT_MESSAGES_REPLY: "~messages-reply",
  EMOJI_BUTTON: "//XCUIElementTypeButton",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ContextMenu extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.CONTEXT_MENU);
  }

  get contextMenu() {
    return this.instance.$(SELECTORS.CONTEXT_MENU);
  }

  get contextMessagesCancelEdit() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.CONTEXT_MESSAGES_CANCEL_EDIT);
  }

  get contextMessagesDelete() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.CONTEXT_MESSAGES_DELETE);
  }

  get contextMessagesEdit() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.CONTEXT_MESSAGES_EDIT);
  }

  get contextMessagesReact() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.CONTEXT_MESSAGES_REACT);
  }

  get contextMessagesReply() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.CONTEXT_MESSAGES_REPLY);
  }

  get emojiButton() {
    return this.instance.$(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON);
  }

  get openEmojiSelector() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$$(SELECTORS.EMOJI_BUTTON)[4];
  }

  async clickOnOpenEmojiSelector() {
    await this.openEmojiSelector.click();
  }

  async clickOnRecentReactionButton(reaction: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = await this.instance.$(
        '//XCUIElementTypeGroup[@label="Context Menu"]/XCUIElementTypeButton[@Value="' +
          reaction +
          '"]'
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await this.instance.$(
        '//Group[@Name="Context Menu"]/Button[@Name="' + reaction + '"]'
      );
    }
    await locator.click();
  }

  async getRecentReactionsList() {
    const recentReactionButtons = await this.emojiButton;
    let results = [];
    for (let i = 0; i < 4; i++) {
      const reactionValue = await recentReactionButtons[i].getText();
      results.push(reactionValue);
    }

    return results;
  }

  async selectContextOptionCancelEdit() {
    await this.contextMessagesCancelEdit.click();
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

require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MESSAGES_CANCEL_EDIT: '[name="messages-cancel-edit"]',
  CONTEXT_MESSAGES_COPY: '[name="messages-copy"]',
  CONTEXT_MESSAGES_DELETE: '[name="messages-delete"]',
  CONTEXT_MESSAGES_EDIT: '[name="messages-edit"]',
  CONTEXT_MESSAGES_PIN: '[name="messages-pin"]',
  CONTEXT_MESSAGES_REACT: '[name="messages-react"]',
  CONTEXT_MESSAGES_REPLY: '[name="messages-reply"]',
  EMOJI_BUTTON: '[name="frequent-emoji"]',
  OPEN_EMOJI_PICKER: '[name="open-emoji-picker"]',
};

const SELECTORS_MACOS = {
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MESSAGES_CANCEL_EDIT: "~messages-cancel-edit",
  CONTEXT_MESSAGES_COPY: "~messages-copy",
  CONTEXT_MESSAGES_DELETE: "~messages-delete",
  CONTEXT_MESSAGES_EDIT: "~messages-edit",
  CONTEXT_MESSAGES_PIN: "~messages-pin",
  CONTEXT_MESSAGES_REACT: "~messages-react",
  CONTEXT_MESSAGES_REPLY: "~messages-reply",
  EMOJI_BUTTON: "~frequent-emoji",
  OPEN_EMOJI_PICKER: "~open-emoji-picker",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ContextMenu extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CONTEXT_MENU);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMessagesCancelEdit() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_CANCEL_EDIT);
  }

  get contextMessagesCopy() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_COPY);
  }

  get contextMessagesDelete() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_DELETE);
  }

  get contextMessagesEdit() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_EDIT);
  }

  get contextMessagesPin() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_PIN);
  }

  get contextMessagesReact() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_REACT);
  }

  get contextMessagesReply() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_REPLY);
  }

  get emojiRecentFirst() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[0];
  }

  get emojiRecentSecond() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[1];
  }

  get emojiRecentThird() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[2];
  }

  get emojiRecentFourth() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[3];
  }

  get emojiRecentFifth() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[4];
  }

  get openEmojiSelector() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.OPEN_EMOJI_PICKER);
  }

  async clickOnOpenEmojiSelector() {
    const openEmojiSelector = await this.openEmojiSelector;
    await openEmojiSelector.click();
  }

  async clickOnFirstReaction() {
    const emojiRecentFirst = await this.emojiRecentFirst;
    await emojiRecentFirst.click();
  }

  async clickOnSecondReaction() {
    const emojiRecentSecond = await this.emojiRecentSecond;
    await emojiRecentSecond.click();
  }

  async clickOnThirdReaction() {
    const emojiRecentThird = await this.emojiRecentThird;
    await emojiRecentThird.click();
  }

  async clickOnFourthReaction() {
    const emojiRecentFourth = await this.emojiRecentFourth;
    await emojiRecentFourth.click();
  }

  async clickOnRecentReactionButton(reaction: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = await $(
        '//XCUIElementTypeGroup[@label="Context Menu"]/XCUIElementTypeButton[@Value="' +
          reaction +
          '"]',
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await $(
        '//Group[@Name="Context Menu"]/Button[@Name="' + reaction + '"]',
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
    const contextMessagesCancelEdit = await this.contextMessagesCancelEdit;
    await contextMessagesCancelEdit.click();
  }

  async selectContextOptionCopy() {
    const contextMessagesCopy = await this.contextMessagesCopy;
    await contextMessagesCopy.click();
  }

  async selectContextOptionDelete() {
    const contextMessagesDelete = await this.contextMessagesDelete;
    await contextMessagesDelete.click();
  }

  async selectContextOptionEdit() {
    const contextMessagesEdit = await this.contextMessagesEdit;
    await contextMessagesEdit.click();
  }

  async selectContextOptionPin() {
    const contextMessagesPin = await this.contextMessagesPin;
    await contextMessagesPin.click();
  }

  async selectContextOptionReact() {
    const contextMessagesReact = await this.contextMessagesReact;
    await contextMessagesReact.click();
  }

  async selectContextOptionReply() {
    const contextMessagesReply = await this.contextMessagesReply;
    await contextMessagesReply.click();
  }

  async validateContextMenuIsOpen() {
    const contextMenu = await this.contextMenu;
    await contextMenu.waitForExist();
  }
}

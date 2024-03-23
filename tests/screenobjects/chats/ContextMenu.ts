require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {};

const SELECTORS_WINDOWS: selectorContainer = {
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

const SELECTORS_MACOS: selectorContainer = {
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

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ContextMenu extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CONTEXT_MENU);
  }

  public get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  public get contextMessagesCancelEdit() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_CANCEL_EDIT);
  }

  public get contextMessagesCopy() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_COPY);
  }

  public get contextMessagesDelete() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_DELETE);
  }

  public get contextMessagesEdit() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_EDIT);
  }

  public get contextMessagesPin() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_PIN);
  }

  public get contextMessagesReact() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_REACT);
  }

  public get contextMessagesReply() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.CONTEXT_MESSAGES_REPLY);
  }

  public get emojiRecentFirst() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[0];
  }

  public get emojiRecentSecond() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[1];
  }

  public get emojiRecentThird() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[2];
  }

  public get emojiRecentFourth() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[3];
  }

  public get emojiRecentFifth() {
    return $(SELECTORS.CONTEXT_MENU).$$(SELECTORS.EMOJI_BUTTON)[4];
  }

  public get openEmojiSelector() {
    return $(SELECTORS.CONTEXT_MENU).$(SELECTORS.OPEN_EMOJI_PICKER);
  }

  async clickOnOpenEmojiSelector() {
    const openEmojiSelector = await this.openEmojiSelector;
    await openEmojiSelector.click();
  }

  async clickOnFirstReaction() {
    const emojiRecentFirst = await this.emojiRecentFirst;
    await emojiRecentFirst?.click();
  }

  async clickOnSecondReaction() {
    const emojiRecentSecond = await this.emojiRecentSecond;
    await emojiRecentSecond?.click();
  }

  async clickOnThirdReaction() {
    const emojiRecentThird = await this.emojiRecentThird;
    await emojiRecentThird?.click();
  }

  async clickOnFourthReaction() {
    const emojiRecentFourth = await this.emojiRecentFourth;
    await emojiRecentFourth?.click();
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
    await locator?.click();
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

export default new ContextMenu();

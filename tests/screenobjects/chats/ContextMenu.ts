import UplinkMainScreen from "../UplinkMainScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "../../helpers/constants";

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
  REACTION_PICKER_DISLIKE: '//Button[@Name="👎"]',
  REACTION_PICKER_HEART: '//Button[@Name="❤️"]',
  REACTION_PICKER_HI: '//Button[@Name="🖖"]',
  REACTION_PICKER_LAUGH: '//Button[@Name="😂"]',
  REACTION_PICKER_LIKE: '//Button[@Name="👍"]',
};

const SELECTORS_MACOS = {
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MESSAGES_CANCEL_EDIT: "~messages-cancel-edit",
  CONTEXT_MESSAGES_DELETE: "~messages-delete",
  CONTEXT_MESSAGES_EDIT: "~messages-edit",
  CONTEXT_MESSAGES_REACT: "~messages-react",
  CONTEXT_MESSAGES_REPLY: "~messages-reply",
  REACTION_PICKER_DISLIKE: '//XCUIElementTypeGroup[@title="👎"]',
  REACTION_PICKER_HEART: '//XCUIElementTypeGroup[@title="❤️"]',
  REACTION_PICKER_HI: '//XCUIElementTypeGroup[@title="🖖"]',
  REACTION_PICKER_LAUGH: '//XCUIElementTypeGroup[@title="😂"]',
  REACTION_PICKER_LIKE: '//XCUIElementTypeGroup[@title="👍"]',
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

  get reactionPickerDislike() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.REACTION_PICKER_DISLIKE);
  }

  get reactionPickerHeart() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.REACTION_PICKER_HEART);
  }

  get reactionPickerHi() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.REACTION_PICKER_HI);
  }

  get reactionPickerLaugh() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.REACTION_PICKER_LAUGH);
  }

  get reactionPickerLike() {
    return this.instance
      .$(SELECTORS.CONTEXT_MENU)
      .$(SELECTORS.REACTION_PICKER_LIKE);
  }

  async selectReactionDislike() {
    await this.reactionPickerDislike.click();
  }

  async selectReactionHeart() {
    await this.reactionPickerHeart.click();
  }

  async selectReactionHi() {
    await this.reactionPickerHi.click();
  }

  async selectReactionLaugh() {
    await this.reactionPickerLaugh.click();
  }

  async selectReactionLike() {
    await this.reactionPickerLike.click();
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

import { WINDOWS_DRIVER, USER_A_INSTANCE } from "../../helpers/constants";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  PINNED_MESSAGE_ATTACHMENTS: '[name="pinned-attachments"]',
  PINNED_MESSAGE_BUTTON_CONTAINER: '[name="pinned-button-container"]',
  PINNED_MESSAGE_BUTTON_GO_TO: '[name="pin-button-go-to"]',
  PINNED_MESSAGE_BUTTON_UNPIN: '[name="pin-button-unpin"]',
  PINNED_MESSAGE_SENDER: '[name="pinned-sender"]',
  PINNED_MESSAGE_TIMESTAMP: '[name="pinned-time"]',
  PINNED_MESSAGE_WRAP: '[name="pinned-message-wrap"]',
  PINNED_MESSAGES_CONTAINER: '[name="pinned-messages-container"]',
  PINNED_MESSAGES_HEADER: '[name="pinned-messages-header"]',
  PINNED_MESSAGES_MAIN: '[name="pinned-messages-main"]',
  PINNED_EMPTY: '[name="pinned-empty"]',
};

const SELECTORS_MACOS = {
  PINNED_MESSAGE_ATTACHMENTS: "~pinned-attachments",
  PINNED_MESSAGE_BUTTON_CONTAINER: "~pinned-button-container",
  PINNED_MESSAGE_BUTTON_GO_TO: "~pin-button-go-to",
  PINNED_MESSAGE_BUTTON_UNPIN: "~pin-button-unpin",
  PINNED_MESSAGE_SENDER: "~pinned-sender",
  PINNED_MESSAGE_TIMESTAMP: "~pinned-time",
  PINNED_MESSAGE_WRAP: "~pinned-message-wrap",
  PINNED_MESSAGES_CONTAINER: "~pinned-messages-container",
  PINNED_MESSAGES_HEADER: "~pinned-messages-header",
  PINNED_MESSAGES_MAIN: "~pinned-messages-main",
  PINNED_EMPTY: "~pinned-empty",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class PinnedMessages extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.PINNED_MESSAGES_MAIN);
  }

  get pinnedMessageAttachments() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_ATTACHMENTS);
  }

  get pinnedMessageButtonContainer() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_BUTTON_CONTAINER);
  }

  get pinnedMessageButtonGoTo() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_BUTTON_GO_TO);
  }

  get pinnedMessageButtonUnpin() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_BUTTON_UNPIN);
  }

  get pinnedMessageSender() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_SENDER);
  }

  get pinnedMessageTimestamp() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_TIMESTAMP);
  }

  get pinnedMessageWrap() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_WRAP);
  }

  get pinnedMessagesContainer() {
    return this.instance.$(SELECTORS.PINNED_MESSAGES_CONTAINER);
  }

  get pinnedMessagesHeader() {
    return this.instance.$(SELECTORS.PINNED_MESSAGES_HEADER);
  }

  get pinnedMessagesMain() {
    return this.instance.$(SELECTORS.PINNED_MESSAGES_MAIN);
  }

  get pinnedEmpty() {
    return this.instance.$(SELECTORS.PINNED_EMPTY);
  }
}

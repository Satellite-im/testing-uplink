import "module-alias/register";
import { WINDOWS_DRIVER, USER_A_INSTANCE } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  PINNED_MESSAGE_ATTACHMENTS: '[name="pinned-attachments"]',
  PINNED_MESSAGE_ATTACHMENTS_FILE_EMBED: '[name="file-embed-remote"]',
  PINNED_MESSAGE_ATTACHMENTS_FILE_ICON: '[name="file-icon"]',
  PINNED_MESSAGE_ATTACHMENTS_FILE_ICON_EXTENSION: "<Text> <Text>",
  PINNED_MESSAGE_ATTACHMENTS_FILE_INFO: '[name="file-info"]',
  PINNED_MESSAGE_ATTACHMENTS_FILE_META: '[name="file-meta"]',
  PINNED_MESSAGE_ATTACHMENTS_FILE_META_TEXT: "<Text>",
  PINNED_MESSAGE_ATTACHMENTS_FILE_NAME: '[name="file-name"]',
  PINNED_MESSAGE_ATTACHMENTS_FILE_NAME_TEXT: "<Text>",
  PINNED_MESSAGE_BUTTON_CONTAINER: '[name="pinned-button-container"]',
  PINNED_MESSAGE_BUTTON_GO_TO: '[name="pin-button-go-to"]',
  PINNED_MESSAGE_BUTTON_UNPIN: '[name="pin-button-unpin"]',
  PINNED_MESSAGE_SENDER: '[name="pinned-sender"]',
  PINNED_MESSAGE_SENDER_TEXT: "<Text>",
  PINNED_MESSAGE_SINGLE_CONTAINER: '[name="pinned-message"]',
  PINNED_MESSAGE_TIMESTAMP: '[name="pinned-time"]',
  PINNED_MESSAGE_TIMESTAMP_TEXT: "<Text>",
  PINNED_MESSAGE_USER_IMAGE: '[name="User Image"]',
  PINNED_MESSAGE_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  PINNED_MESSAGE_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  PINNED_MESSAGE_VALUE: '[name="message-text"]',
  PINNED_MESSAGE_VALUE_TEXT: "<Text>",
  PINNED_MESSAGE_WRAP: '[name="pinned-message-wrap"]',
  PIN_CONTAINER: '[name="pinned-messages-container"]',
  PIN_CONTAINER_LABEL: '[name="pinned-messages-label"]',
  PIN_EMPTY: '[name="pinned-empty"]',
  PIN_MODAL_LABEL: "<Text> <Text>",
  PIN_MODAL_MAIN: '[name="modal"]',
};

const SELECTORS_MACOS = {
  PINNED_MESSAGE_ATTACHMENTS: "~pinned-attachments",
  PINNED_MESSAGE_ATTACHMENTS_FILE_EMBED: "~file-embed-remote",
  PINNED_MESSAGE_ATTACHMENTS_FILE_ICON: "~file-icon",
  PINNED_MESSAGE_ATTACHMENTS_FILE_ICON_EXTENSION:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  PINNED_MESSAGE_ATTACHMENTS_FILE_INFO: "~file-info",
  PINNED_MESSAGE_ATTACHMENTS_FILE_META: "~file-meta",
  PINNED_MESSAGE_ATTACHMENTS_FILE_META_TEXT: "<Text>",
  PINNED_MESSAGE_ATTACHMENTS_FILE_NAME: "~file-name",
  PINNED_MESSAGE_ATTACHMENTS_FILE_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  PINNED_MESSAGE_BUTTON_CONTAINER: "~pinned-button-container",
  PINNED_MESSAGE_BUTTON_GO_TO: "~pin-button-go-to",
  PINNED_MESSAGE_BUTTON_UNPIN: "~pin-button-unpin",
  PINNED_MESSAGE_SENDER: "~pinned-sender",
  PINNED_MESSAGE_SENDER_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  PINNED_MESSAGE_SINGLE_CONTAINER: "~pinned-message",
  PINNED_MESSAGE_TIMESTAMP: "~pinned-time",
  PINNED_MESSAGE_TIMESTAMP_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  PINNED_MESSAGE_USER_IMAGE: "~User Image",
  PINNED_MESSAGE_USER_IMAGE_PROFILE: "~user-image-profile",
  PINNED_MESSAGE_USER_IMAGE_WRAP: "~user-image-wrap",
  PINNED_MESSAGE_VALUE: "~message-text",
  PINNED_MESSAGE_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  PINNED_MESSAGE_WRAP: "~pinned-message-wrap",
  PIN_CONTAINER: "~pinned-messages-container",
  PIN_CONTAINER_LABEL: "~pinned-messages-label",
  PIN_EMPTY: "~pinned-empty",
  PIN_MODAL_LABEL:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  PIN_MODAL_MAIN: "~modal",
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

  get pinnedMessageAttachmentsFileEmbed() {
    return this.pinnedMessageAttachments.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_EMBED
    );
  }

  get pinnedMessageAttachmentsFileIcon() {
    return this.pinnedMessageAttachmentsFileEmbed.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_ICON
    );
  }

  get pinnedMessageAttachmentsFileIconExtension() {
    return this.pinnedMessageAttachmentsFileIcon.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_ICON_EXTENSION
    );
  }

  get pinnedMessageAttachmentsFileInfo() {
    return this.pinnedMessageAttachmentsFileEmbed.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_INFO
    );
  }

  get pinnedMessageAttachmentsFileMeta() {
    return this.pinnedMessageAttachmentsFileInfo.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_META
    );
  }

  get pinnedMessageAttachmentsFileMetaText() {
    return this.pinnedMessageAttachmentsFileMeta.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_META_TEXT
    );
  }

  get pinnedMessageAttachmentsFileName() {
    return this.pinnedMessageAttachmentsFileInfo.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_NAME
    );
  }

  get pinnedMessageAttachmentsFileNameText() {
    return this.pinnedMessageAttachmentsFileName.$(
      SELECTORS.PINNED_MESSAGE_ATTACHMENTS_FILE_NAME_TEXT
    );
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

  get pinnedMessageSenderText() {
    return this.pinnedMessageSender.$(SELECTORS.PINNED_MESSAGE_SENDER_TEXT);
  }

  get pinnedMessageSingleContainer() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_SINGLE_CONTAINER);
  }

  get pinnedMessageTimestamp() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_TIMESTAMP);
  }

  get pinnedMessageTimestampText() {
    return this.pinnedMessageTimestamp.$(
      SELECTORS.PINNED_MESSAGE_TIMESTAMP_TEXT
    );
  }

  get pinnedMessageUserImage() {
    return this.pinnedMessageUserImageWrap.$(
      SELECTORS.PINNED_MESSAGE_USER_IMAGE
    );
  }

  get pinnedMessageUserImageProfile() {
    return this.pinnedMessageUserImage.$(
      SELECTORS.PINNED_MESSAGE_USER_IMAGE_PROFILE
    );
  }

  get pinnedMessageUserImageWrap() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_USER_IMAGE_WRAP);
  }

  get pinnedMessageValue() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_VALUE);
  }

  get pinnedMessageValueText() {
    return this.pinnedMessageValue.$(SELECTORS.PINNED_MESSAGE_VALUE_TEXT);
  }

  get pinnedMessageWrap() {
    return this.instance.$(SELECTORS.PINNED_MESSAGE_WRAP);
  }

  get pinContainer() {
    return this.instance.$(SELECTORS.PIN_CONTAINER);
  }

  get pinContainerLabel() {
    return this.instance.$(SELECTORS.PIN_CONTAINER_LABEL);
  }

  get pinEmpty() {
    return this.instance.$(SELECTORS.PIN_EMPTY);
  }

  get pinModalLabel() {
    return this.pinModalMain.$(SELECTORS.PIN_MODAL_LABEL);
  }

  get pinModalMain() {
    return this.instance.$(SELECTORS.PIN_MODAL_MAIN);
  }

  async validateEmptyPinnedMessagesIsDisplayed() {
    const pinnedEmpty = await this.pinnedEmpty;
    return await pinnedEmpty.waitForDisplayed();
  }

  async validatePinnedMessagesIsDisplayed() {
    const pinnedMessagesMain = await this.pinnedMessagesMain;
    return await pinnedMessagesMain.waitForDisplayed();
  }
}

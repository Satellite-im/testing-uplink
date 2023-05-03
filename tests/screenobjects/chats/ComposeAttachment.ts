import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  COMPOSE_ATTACHMENTS: '[name="compose-attachments"]',
  COMPOSE_ATTACHMENTS_BUTTON: '[name="attachment-button"]',
  COMPOSE_ATTACHMENTS_FILE_EMBED: '[name="file-embed"]',
  COMPOSE_ATTACHMENTS_FILE_ICON: '[name="file-icon"]',
  COMPOSE_ATTACHMENTS_FILE_INFO: '[name="file-info"]',
  COMPOSE_ATTACHMENTS_FILE_META: '[name="file-meta"]',
  COMPOSE_ATTACHMENTS_FILE_NAME: '[name="file-name"]',
  COMPOSE_ATTACHMENTS_FILE_NAME_TEXT: "//Text",
};

const SELECTORS_MACOS = {
  COMPOSE_ATTACHMENTS: "~compose-attachments",
  COMPOSE_ATTACHMENTS_BUTTON: "~attachment-button",
  COMPOSE_ATTACHMENTS_FILE_EMBED: "~file-embed",
  COMPOSE_ATTACHMENTS_FILE_ICON: "~file-icon",
  COMPOSE_ATTACHMENTS_FILE_INFO: "~file-info",
  COMPOSE_ATTACHMENTS_FILE_META: "~file-meta",
  COMPOSE_ATTACHMENTS_FILE_NAME: "~file-name",
  COMPOSE_ATTACHMENTS_FILE_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ComposeAttachments extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.COMPOSE_ATTACHMENTS);
  }

  get composeAttachments() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS);
  }

  get composeAttachmentsButton() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS).$(
      SELECTORS.COMPOSE_ATTACHMENTS_BUTTON
    );
  }

  get composeAttachmentsFileEmbed() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS).$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED
    );
  }

  get composeAttachmentsFileIcon() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_ICON);
  }

  get composeAttachmentsFileInfo() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_INFO);
  }

  get composeAttachmentsFileMeta() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_META);
  }

  get composeAttachmentsFileName() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME);
  }

  get composeAttachmentsFileNameText() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME_TEXT);
  }

  async deleteFileOnComposeAttachment() {
    await this.composeAttachmentsButton.click();
  }

  async validateAttachmentIsAdded() {
    await this.composeAttachmentsFileEmbed.waitForDisplayed();
  }
}

export default new ComposeAttachments();

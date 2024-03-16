require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  COMPOSE_ATTACHMENTS: '[name="compose-attachments"]',
  COMPOSE_ATTACHMENTS_BUTTON: '[name="attachment-button"]',
  COMPOSE_ATTACHMENTS_FILE_EMBED: '[name="file-embed"]',
  COMPOSE_ATTACHMENTS_FILE_ICON: '[name="file-icon"]',
  COMPOSE_ATTACHMENTS_FILE_ICON_VALUE: "//Group/Text",
  COMPOSE_ATTACHMENTS_FILE_INFO: '[name="file-info"]',
  COMPOSE_ATTACHMENTS_FILE_META: '[name="file-meta"]',
  COMPOSE_ATTACHMENTS_FILE_NAME: '[name="file-name"]',
  COMPOSE_ATTACHMENTS_FILE_NAME_TEXT: "<Text>",
  COMPOSE_ATTACHMENTS_IMAGE_PREVIEW_MODAL: '[name="image-preview-modal"]',
  COMPOSE_ATTACHMENTS_INPUT_ERROR: '[name="input-error"]',
  COMPOSE_ATTACHMENTS_INPUT_ERROR_TEXT: "<Text>",
  COMPOSE_ATTACHMENTS_MESSAGE_IMAGE: '[name="message-image"]',
  COMPOSE_ATTACHMENTS_MESSAGE_IMAGE_CONTAINER:
    '[name="message-image-container"]',
};

const SELECTORS_MACOS = {
  COMPOSE_ATTACHMENTS: "~compose-attachments",
  COMPOSE_ATTACHMENTS_BUTTON: "~attachment-button",
  COMPOSE_ATTACHMENTS_FILE_EMBED: "~file-embed",
  COMPOSE_ATTACHMENTS_FILE_ICON: "~file-icon",
  COMPOSE_ATTACHMENTS_FILE_ICON_VALUE:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  COMPOSE_ATTACHMENTS_FILE_INFO: "~file-info",
  COMPOSE_ATTACHMENTS_FILE_META: "~file-meta",
  COMPOSE_ATTACHMENTS_FILE_NAME: "~file-name",
  COMPOSE_ATTACHMENTS_FILE_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  COMPOSE_ATTACHMENTS_IMAGE_PREVIEW_MODAL: "~image-preview-modal",
  COMPOSE_ATTACHMENTS_INPUT_ERROR: "~input-error",
  COMPOSE_ATTACHMENTS_INPUT_ERROR_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  COMPOSE_ATTACHMENTS_MESSAGE_IMAGE: "~message-image",
  COMPOSE_ATTACHMENTS_MESSAGE_IMAGE_CONTAINER: "~message-image-container",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ComposeAttachments extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.COMPOSE_ATTACHMENTS);
  }

  public get composeAttachments() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS);
  }

  public get composeAttachmentsButton() {
    return this.composeAttachments.$(SELECTORS.COMPOSE_ATTACHMENTS_BUTTON);
  }

  public get composeAttachmentsFileEmbed() {
    return this.composeAttachments.$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED);
  }

  public get composeAttachmentsFileIcon() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_ICON,
    );
  }

  public get composeAttachmentsFileIconValue() {
    return this.composeAttachmentsFileIcon.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_ICON_VALUE,
    );
  }

  public get composeAttachmentsFileInfo() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_INFO,
    );
  }

  public get composeAttachmentsFileMeta() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_META,
    );
  }

  public get composeAttachmentsFileName() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME,
    );
  }

  public get composeAttachmentsFileNameText() {
    return this.composeAttachmentsFileEmbed
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME_TEXT);
  }

  public get composeAttachmentsImagePreviewModal() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_IMAGE_PREVIEW_MODAL,
    );
  }

  public get composeAttachmentsInputError() {
    return this.composeAttachments.$(SELECTORS.COMPOSE_ATTACHMENTS_INPUT_ERROR);
  }

  public get composeAttachmentsInputErrorText() {
    return this.composeAttachmentsInputError.$(
      SELECTORS.COMPOSE_ATTACHMENTS_INPUT_ERROR_TEXT,
    );
  }

  public get composeAttachmentsMessageImage() {
    return this.composeAttachmentsMessageImageContainer.$(
      SELECTORS.COMPOSE_ATTACHMENTS_MESSAGE_IMAGE,
    );
  }

  public get composeAttachmentsMessageImageContainer() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_MESSAGE_IMAGE_CONTAINER,
    );
  }

  async clickOnDeleteAttachment(attachment: number) {
    // public get the locator of attachment to delete by passing the index
    const attachmentToDelete = await $$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED,
    )[attachment];
    await this.hoverOnElement(attachmentToDelete);
    const deleteAttachmentButton = await attachmentToDelete.$(
      SELECTORS.COMPOSE_ATTACHMENTS_BUTTON,
    );
    await deleteAttachmentButton.click();
  }

  async deleteFileOnComposeAttachment() {
    const composeAttachmentsButton = await this.composeAttachmentsButton;
    await composeAttachmentsButton.click();
  }

  async getListOfAttachmentsEmbed() {
    const composeAttachments = await this.composeAttachments;
    await composeAttachments.waitForExist();
    const filesAttached = await $$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED);
    let results = [];
    for (let fileAttached of filesAttached) {
      const fileName = await fileAttached
        .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_INFO)
        .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME)
        .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME_TEXT);
      const fileNameText = await fileName.getText();
      results.push(fileNameText);
    }
    return results;
  }

  async validateAttachmentIsAdded() {
    const composeAttachmentsFileEmbed = await this.composeAttachmentsFileEmbed;
    await driver.waitUntil(
      async () => {
        return await composeAttachmentsFileEmbed;
      },
      {
        timeout: 15000,
        timeoutMsg: "Attachment file was not added after 15 seconds",
      },
    );
  }

  async validateAttachmentWithFileNameIsAdded(
    fileName: string,
    expectedAssertion: boolean,
  ) {
    const attachmentsList = await this.getListOfAttachmentsEmbed();
    const includesAttachment = await attachmentsList.includes(fileName);
    await expect(includesAttachment).toEqual(expectedAssertion);
  }

  async validateComposeAttachmentsIsShown() {
    const composeAttachments = await this.composeAttachments;
    await composeAttachments.waitForExist();
  }
}

export default new ComposeAttachments();

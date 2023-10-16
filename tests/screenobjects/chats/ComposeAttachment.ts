import "module-alias/register";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
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
  COMPOSE_ATTACHMENTS_FILE_NAME_TEXT: "<Text>",
  COMPOSE_ATTACHMENTS_INPUT_ERROR: '[name="input-error"]',
  COMPOSE_ATTACHMENTS_INPUT_ERROR_TEXT: "<Text>",
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
  COMPOSE_ATTACHMENTS_INPUT_ERROR: "~input-error",
  COMPOSE_ATTACHMENTS_INPUT_ERROR_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ComposeAttachments extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.COMPOSE_ATTACHMENTS);
  }

  get composeAttachments() {
    return this.instance.$(SELECTORS.COMPOSE_ATTACHMENTS);
  }

  get composeAttachmentsButton() {
    return this.composeAttachments.$(SELECTORS.COMPOSE_ATTACHMENTS_BUTTON);
  }

  get composeAttachmentsFileEmbed() {
    return this.composeAttachments.$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED);
  }

  get composeAttachmentsFileIcon() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_ICON
    );
  }

  get composeAttachmentsFileInfo() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_INFO
    );
  }

  get composeAttachmentsFileMeta() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_META
    );
  }

  get composeAttachmentsFileName() {
    return this.composeAttachmentsFileEmbed.$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME
    );
  }

  get composeAttachmentsFileNameText() {
    return this.composeAttachmentsFileEmbed
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME_TEXT);
  }

  get composeAttachmentsInputError() {
    return this.composeAttachments.$(SELECTORS.COMPOSE_ATTACHMENTS_INPUT_ERROR);
  }

  get composeAttachmentsInputErrorText() {
    return this.composeAttachmentsInputError.$(
      SELECTORS.COMPOSE_ATTACHMENTS_INPUT_ERROR_TEXT
    );
  }

  async clickOnDeleteAttachment(attachment: number) {
    // Get the locator of attachment to delete by passing the index
    const attachmentToDelete = await this.instance.$$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED
    )[attachment];
    const deleteAttachmentButton = await attachmentToDelete.$(
      SELECTORS.COMPOSE_ATTACHMENTS_BUTTON
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
    const filesAttached = await this.instance.$$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED
    );
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
    await driver[this.executor].waitUntil(
      async () => {
        return await composeAttachmentsFileEmbed;
      },
      {
        timeout: 15000,
        timeoutMsg: "Attachment file was not added after 15 seconds",
      }
    );
  }

  async validateAttachmentWithFileNameIsAdded(
    fileName: string,
    expectedAssertion: boolean
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

require("module-alias/register");
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  PREVIEW_MODAL: '[name="modal"]',
  PREVIEW_MODAL_CLOSE_BUTTON: '[name="close-modal-button"]',
  PREVIEW_MODAL_IMAGE_CHATS: '[name="image-preview-modal-file-embed"]',
  PREVIEW_MODAL_IMAGE_FILES: '[name="file-preview-image"]',
};

const SELECTORS_MACOS = {
  PREVIEW_MODAL: "~modal",
  PREVIEW_MODAL_CLOSE_BUTTON: "~close-modal-button",
  PREVIEW_MODAL_IMAGE_CHATS: "~image-preview-modal-file-embed",
  PREVIEW_MODAL_IMAGE_FILES: "~file-preview-image",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ImagePreview extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.PREVIEW_MODAL);
  }

  get previewModal() {
    return this.instance.$(SELECTORS.PREVIEW_MODAL);
  }

  get previewModalCloseButton() {
    return this.previewModal.$(SELECTORS.PREVIEW_MODAL_CLOSE_BUTTON);
  }

  get previewModalImageChats() {
    return this.previewModal.$(SELECTORS.PREVIEW_MODAL_IMAGE_CHATS);
  }

  get previewModalImageFiles() {
    return this.previewModal.$(SELECTORS.PREVIEW_MODAL_IMAGE_FILES);
  }

  async clickOnClosePreviewModal() {
    const closeButton = await this.previewModalCloseButton;
    await closeButton.click();
  }
}

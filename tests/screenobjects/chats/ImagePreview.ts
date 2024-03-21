require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

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

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ImagePreview extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.PREVIEW_MODAL);
  }

  public get previewModal() {
    return $(SELECTORS.PREVIEW_MODAL);
  }

  public get previewModalCloseButton() {
    return this.previewModal.$(SELECTORS.PREVIEW_MODAL_CLOSE_BUTTON);
  }

  public get previewModalImageChats() {
    return this.previewModal.$(SELECTORS.PREVIEW_MODAL_IMAGE_CHATS);
  }

  public get previewModalImageFiles() {
    return this.previewModal.$(SELECTORS.PREVIEW_MODAL_IMAGE_FILES);
  }

  async clickOnClosePreviewModal() {
    const closeButton = await this.previewModalCloseButton;
    await closeButton.click();
  }
}

export default new ImagePreview();

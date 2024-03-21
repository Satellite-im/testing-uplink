require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

let SELECTORS = {
  CROP_IMAGE_MODAL: "",
  CROP_IMAGE_PREVIEW: "",
  CROP_IMAGE_RANGE: "",
  CROP_IMAGE_RANGE_DECREASE_BUTTON: "",
  CROP_IMAGE_RANGE_INCREASE_BUTTON: "",
  CROP_IMAGE_RANGE_INPUT_SLIDER: "",
  CROP_IMAGE_RANGE_VALUE: "",
  CROP_IMAGE_RANGE_VALUE_TEXT: "",
  CROP_IMAGE_TOPBAR: "",
  CROP_IMAGE_TOPBAR_BUTTON_CANCEL: "",
  CROP_IMAGE_TOPBAR_BUTTON_CONFIRM: "",
  CROP_IMAGE_TOPBAR_LABEL: "",
  CROP_IMAGE_TOPBAR_LABEL_TEXT: "",
};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CROP_IMAGE_MODAL: '[name="modal"]',
  CROP_IMAGE_PREVIEW: '[name="image-preview-modal-file-embed"]',
  CROP_IMAGE_RANGE: '[name="range-crop-image"]',
  CROP_IMAGE_RANGE_DECREASE_BUTTON: '[name="decrease_range_value_button"]',
  CROP_IMAGE_RANGE_INCREASE_BUTTON: '[name="increase_range_value_button"]',
  CROP_IMAGE_RANGE_INPUT_SLIDER: '[name="range-input"]',
  CROP_IMAGE_RANGE_VALUE: '[name="range-value"]',
  CROP_IMAGE_RANGE_VALUE_TEXT: "<Text>",
  CROP_IMAGE_TOPBAR: '[name="crop-image-topbar"]',
  CROP_IMAGE_TOPBAR_BUTTON_CANCEL: '[name="crop-image-cancel-button"]',
  CROP_IMAGE_TOPBAR_BUTTON_CONFIRM: '[name="crop-image-confirm-button"]',
  CROP_IMAGE_TOPBAR_LABEL: '[name="crop-image-topbar-label"]',
  CROP_IMAGE_TOPBAR_LABEL_TEXT: "<Text>",
};

const SELECTORS_MACOS = {
  CROP_IMAGE_MODAL: "~modal",
  CROP_IMAGE_PREVIEW: "~image-preview-modal-file-embed",
  CROP_IMAGE_RANGE: "~range-crop-image",
  CROP_IMAGE_RANGE_DECREASE_BUTTON: "~decrease_range_value_button",
  CROP_IMAGE_RANGE_INCREASE_BUTTON: "~increase_range_value_button",
  CROP_IMAGE_RANGE_INPUT_SLIDER: "~range-input",
  CROP_IMAGE_RANGE_VALUE: "~range-value",
  CROP_IMAGE_RANGE_VALUE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CROP_IMAGE_TOPBAR: "~crop-image-topbar",
  CROP_IMAGE_TOPBAR_BUTTON_CANCEL: "~crop-image-cancel-button",
  CROP_IMAGE_TOPBAR_BUTTON_CONFIRM: "~crop-image-confirm-button",
  CROP_IMAGE_TOPBAR_LABEL: "~crop-image-topbar-label",
  CROP_IMAGE_TOPBAR_LABEL_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class CropImageProfileModal extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CROP_IMAGE_MODAL);
  }

  // Getters from UI Locators

  public get cropImageModal() {
    return $(SELECTORS.CROP_IMAGE_MODAL);
  }

  public get cropImagePreview() {
    return this.cropImageModal.$(SELECTORS.CROP_IMAGE_PREVIEW);
  }

  public get cropImageRange() {
    return this.cropImageModal.$(SELECTORS.CROP_IMAGE_RANGE);
  }

  public get cropImageRangeDecreaseButton() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_DECREASE_BUTTON);
  }

  public get cropImageRangeIncreaseButton() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_INCREASE_BUTTON);
  }

  public get cropImageRangeInputSlider() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_INPUT_SLIDER);
  }

  public get cropImageRangeValue() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_VALUE);
  }

  public get cropImageRangeValueText() {
    return this.cropImageRangeValue.$(SELECTORS.CROP_IMAGE_RANGE_VALUE_TEXT);
  }

  public get cropImageTopbar() {
    return this.cropImageModal.$(SELECTORS.CROP_IMAGE_TOPBAR);
  }

  public get cropImageTopbarButtonCancel() {
    return this.cropImageTopbar.$(SELECTORS.CROP_IMAGE_TOPBAR_BUTTON_CANCEL);
  }

  public get cropImageTopbarButtonConfirm() {
    return this.cropImageTopbar.$(SELECTORS.CROP_IMAGE_TOPBAR_BUTTON_CONFIRM);
  }

  public get cropImageTopbarLabel() {
    return this.cropImageTopbar.$(SELECTORS.CROP_IMAGE_TOPBAR_LABEL);
  }

  public get cropImageTopbarLabelText() {
    return this.cropImageTopbarLabel.$(SELECTORS.CROP_IMAGE_TOPBAR_LABEL_TEXT);
  }

  // Methods to interact with the UI

  async clickOnCancelButton() {
    const cancelButton = await this.cropImageTopbarButtonCancel;
    await cancelButton.click();
  }

  async clickOnConfirmButton() {
    const confirmButton = await this.cropImageTopbarButtonConfirm;
    await confirmButton.click();
    await this.validateSpinnerIsNotShown();
  }

  async clickOnDecreaseRangeButton() {
    const decreaseRangeButton = await this.cropImageRangeDecreaseButton;
    await decreaseRangeButton.click();
  }

  async clickOnIncreaseRangeButton() {
    const increaseRangeButton = await this.cropImageRangeIncreaseButton;
    await increaseRangeButton.click();
  }

  async clickMultipleTimesDecreaseButton(times: number) {
    for (let i = 0; i < times; i++) {
      await this.clickOnDecreaseRangeButton();
    }
  }

  async clickMultipleTimesIncreaseButton(times: number) {
    for (let i = 0; i < times; i++) {
      await this.clickOnIncreaseRangeButton();
    }
  }

  async getRangeValue() {
    const rangeValue = await this.cropImageRangeValueText;
    const rangeValueText = await rangeValue.getText();
    return rangeValueText;
  }

  async validateCropToolModalIsShown() {
    const cropImageModal = await this.cropImageModal;
    await cropImageModal.waitForDisplayed();
  }
}

export default new CropImageProfileModal();

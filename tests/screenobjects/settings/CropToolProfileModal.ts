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

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class CropImageProfileModal extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.CROP_IMAGE_MODAL);
  }

  // Getters from UI Locators

  get cropImageModal() {
    return this.instance.$(SELECTORS.CROP_IMAGE_MODAL);
  }

  get cropImagePreview() {
    return this.cropImageModal.$(SELECTORS.CROP_IMAGE_PREVIEW);
  }

  get cropImageRange() {
    return this.cropImageModal.$(SELECTORS.CROP_IMAGE_RANGE);
  }

  get cropImageRangeDecreaseButton() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_DECREASE_BUTTON);
  }

  get cropImageRangeIncreaseButton() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_INCREASE_BUTTON);
  }

  get cropImageRangeInputSlider() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_INPUT_SLIDER);
  }

  get cropImageRangeValue() {
    return this.cropImageRange.$(SELECTORS.CROP_IMAGE_RANGE_VALUE);
  }

  get cropImageRangeValueText() {
    return this.cropImageRangeValue.$(SELECTORS.CROP_IMAGE_RANGE_VALUE_TEXT);
  }

  get cropImageTopbar() {
    return this.cropImageModal.$(SELECTORS.CROP_IMAGE_TOPBAR);
  }

  get cropImageTopbarButtonCancel() {
    return this.cropImageTopbar.$(SELECTORS.CROP_IMAGE_TOPBAR_BUTTON_CANCEL);
  }

  get cropImageTopbarButtonConfirm() {
    return this.cropImageTopbar.$(SELECTORS.CROP_IMAGE_TOPBAR_BUTTON_CONFIRM);
  }

  get cropImageTopbarLabel() {
    return this.cropImageTopbar.$(SELECTORS.CROP_IMAGE_TOPBAR_LABEL);
  }

  get cropImageTopbarLabelText() {
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

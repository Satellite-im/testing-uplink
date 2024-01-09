require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  COPY_SEED_HELPER_TEXT:
    '//Group/Text[contains(@Name, "Write these words down")]',
  COPY_SEED_WORDS_LABEL: '[name="copy-seed-words"]',
  COPY_SEED_WORDS_LABEL_TEXT: "<Text>>",
  COPY_SEED_WORDS_LAYOUT: '[name="copy-seed-words-layout"]',
  GO_BACK_BUTTON: '[name="back-button"]',
  I_SAVED_IT_BUTTON: '[name="i-saved-it-button"]',
};

const SELECTORS_MACOS = {
  COPY_SEED_HELPER_TEXT:
    '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value CONTAINS[cd] "Write these words down"`]',
  COPY_SEED_WORDS_LABEL: "~copy-seed-words",
  COPY_SEED_WORDS_LABEL_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  COPY_SEED_WORDS_LAYOUT: "~copy-seed-words-layout",
  GO_BACK_BUTTON: "~back-button",
  I_SAVED_IT_BUTTON: "~i-saved-it-button",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SaveRecoverySeedScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.COPY_SEED_WORDS_LAYOUT);
  }

  get copySeedHelperText() {
    return this.copySeedsWordsLayout.$(SELECTORS.COPY_SEED_HELPER_TEXT);
  }

  get copySeedWordsLabel() {
    return this.copySeedsWordsLayout.$(SELECTORS.COPY_SEED_WORDS_LABEL);
  }

  get copySeedWordsLabelText() {
    return this.copySeedWordsLabel.$(SELECTORS.COPY_SEED_WORDS_LABEL_TEXT);
  }

  get copySeedsWordsLayout() {
    return $(SELECTORS.COPY_SEED_WORDS_LAYOUT);
  }

  get goBackButton() {
    return this.copySeedsWordsLayout.$(SELECTORS.GO_BACK_BUTTON);
  }

  get iSavedItButton() {
    return this.copySeedsWordsLayout.$(SELECTORS.I_SAVED_IT_BUTTON);
  }

  async clickOnGoBackButton() {
    const goBackButton = await this.goBackButton;
    await goBackButton.click();
  }

  async clickOnISavedItButton() {
    const iSavedItButton = await this.iSavedItButton;
    await iSavedItButton.click();
  }
}

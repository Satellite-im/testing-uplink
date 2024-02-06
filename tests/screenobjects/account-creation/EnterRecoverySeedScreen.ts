require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ENTER_SEEDS_WORD_LAYOUT: '[name="enter-seed-words-layout"]',
  GO_BACK_BUTTON: '[name="back-button"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "<Text>",
  RECOVER_ACCOUNT_BUTTON: '[name="recover-account-button"]',
  RECOVERY_SEED_HELPER: '[name="instructions"]',
  RECOVERY_SEED_HELPER_TEXT:
    '//Text[contains(@Name, "Type your recovery seed")]',
  RECOVERY_SEED_INPUT: '[name="recovery-seed-input"]',
  RECOVERY_SEED_TITLE: '[name="enter-seed-words"]',
  RECOVERY_SEED_TITLE_TEXT: '//Text[@Name="RECOVERY SEED"]',
};

const SELECTORS_MACOS = {
  ENTER_SEEDS_WORD_LAYOUT: "~enter-seed-words-layout",
  GO_BACK_BUTTON: "~back-button",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  RECOVER_ACCOUNT_BUTTON: "~recover-account-button",
  RECOVERY_SEED_HELPER: "~instructions",
  RECOVERY_SEED_HELPER_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  RECOVERY_SEED_INPUT: "~recovery-seed-input",
  RECOVERY_SEED_TITLE: "~enter-seed-words",
  RECOVERY_SEED_TITLE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EnterRecoverySeedScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.ENTER_SEEDS_WORD_LAYOUT);
  }

  get enterSeedsWordLayout() {
    return $(SELECTORS.ENTER_SEEDS_WORD_LAYOUT);
  }

  get goBackButton() {
    return this.enterSeedsWordLayout.$(SELECTORS.GO_BACK_BUTTON);
  }

  get inputError() {
    return this.enterSeedsWordLayout.$(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return this.enterSeedsWordLayout
      .$(SELECTORS.INPUT_ERROR)
      .$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get recoverAccountButton() {
    return this.enterSeedsWordLayout.$(SELECTORS.RECOVER_ACCOUNT_BUTTON);
  }

  get recoverySeedHelper() {
    return this.enterSeedsWordLayout.$(SELECTORS.RECOVERY_SEED_HELPER);
  }

  get recoverySeedHelperText() {
    return this.recoverySeedHelper.$(SELECTORS.RECOVERY_SEED_HELPER_TEXT);
  }

  get recoverySeedInput() {
    return this.enterSeedsWordLayout.$(SELECTORS.RECOVERY_SEED_INPUT);
  }

  get recoverySeedTitle() {
    return this.enterSeedsWordLayout.$(SELECTORS.RECOVERY_SEED_TITLE);
  }

  get recoverySeedTitleText() {
    return this.recoverySeedTitle.$(SELECTORS.RECOVERY_SEED_TITLE_TEXT);
  }

  async clickOnBackButton() {
    const goBackButton = await this.goBackButton;
    await goBackButton.click();
  }

  async clickOnRecoverAccountButton() {
    const recoverAccountButton = await this.recoverAccountButton;
    await recoverAccountButton.click();
  }

  async typeOnRecoverySeedInput(seed: string) {
    const recoverySeedInput = await this.recoverySeedInput;
    await recoverySeedInput.setValue(seed);
  }
}

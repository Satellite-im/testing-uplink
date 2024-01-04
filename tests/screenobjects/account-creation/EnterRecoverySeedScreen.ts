require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ENTER_SEEDS_WORD_LAYOUT: '[name="enter-seed-words-layout"]',
  GO_BACK_BUTTON: '[name="back-button"]',
  RECOVER_ACCOUNT_BUTTON: "<Button>[2]",
  RECOVERY_SEED_HELPER_TEXT:
    '//Group/Text[contains(@Name, "Type your recovery seed")]',
  RECOVERY_SEED_INPUT: "<Edit>",
  RECOVERY_SEED_TITLE: '[name="enter-seed-words"]',
  RECOVERY_SEED_TITLE_TEXT: "<Text>",
};

const SELECTORS_MACOS = {
  ENTER_SEEDS_WORD_LAYOUT: "~enter-seed-words-layout",
  GO_BACK_BUTTON: "~back-button",
  RECOVER_ACCOUNT_BUTTON: "-ios class chain:**/XCUIElementTypeButton[2]",
  RECOVERY_SEED_HELPER_TEXT:
    '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value CONTAINS[cd] "Type your recovery seed"`]',
  RECOVERY_SEED_INPUT: "-ios class chain:**/XCUIElementTypeTextField",
  RECOVERY_SEED_TITLE: "~enter-seed-words",
  RECOVERY_SEED_TITLE_TEXT: "<Text>",
};

currentOS === WINDOWS_DRIVER
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
    return $(SELECTORS.GO_BACK_BUTTON);
  }

  get recoverAccountButton() {
    return $(SELECTORS.RECOVER_ACCOUNT_BUTTON);
  }

  get recoverySeedHelperText() {
    return $(SELECTORS.RECOVERY_SEED_HELPER_TEXT);
  }

  get recoverySeedInput() {
    return $(SELECTORS.RECOVERY_SEED_INPUT);
  }

  get recoverySeedTitle() {
    return $(SELECTORS.RECOVERY_SEED_TITLE);
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

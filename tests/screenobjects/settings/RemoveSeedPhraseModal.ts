require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  REMOVE_SEED_PHRASE_CANCEL_BUTTON: '[name="cancel-remove-seed-phrase-btn"]',
  REMOVE_SEED_PHRASE_HELPER_TEXT:
    '//Group/Text[contains(@Name, "Removing the seed phrase")]',
  REMOVE_SEED_PHRASE_LABEL: '[name="remove-phrase-label"]',
  REMOVE_SEED_PHRASE_LABEL_TEXT: "<Text>",
  REMOVE_SEED_PHRASE_MODAL: '[name="modal"]',
  REMOVE_SEED_PHRASE_OK_BUTTON: '[name="remove-seed-phrase-btn"]',
};

const SELECTORS_MACOS = {
  REMOVE_SEED_PHRASE_CANCEL_BUTTON: "~cancel-remove-seed-phrase-btn",
  REMOVE_SEED_PHRASE_HELPER_TEXT:
    '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value CONTAINS[cd] "Removing the seed phrase"`]',
  REMOVE_SEED_PHRASE_LABEL: "~remove-phrase-label",
  REMOVE_SEED_PHRASE_LABEL_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REMOVE_SEED_PHRASE_MODAL: "~modal",
  REMOVE_SEED_PHRASE_OK_BUTTON: "~remove-seed-phrase-btn",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class RemoveSeedPhraseModal extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.REMOVE_SEED_PHRASE_MODAL);
  }

  // Getters from UI Locators

  get removeSeedPhraseCancelButton() {
    return this.removeSeedPhraseModal.$(
      SELECTORS.REMOVE_SEED_PHRASE_CANCEL_BUTTON,
    );
  }

  get removeSeedPhraseHelperText() {
    return this.removeSeedPhraseModal.$(
      SELECTORS.REMOVE_SEED_PHRASE_HELPER_TEXT,
    );
  }

  get removeSeedPhraseOKButton() {
    return this.removeSeedPhraseModal.$(SELECTORS.REMOVE_SEED_PHRASE_OK_BUTTON);
  }

  get removeSeedPhraseLabel() {
    return this.removeSeedPhraseModal.$(SELECTORS.REMOVE_SEED_PHRASE_LABEL);
  }

  get removeSeedPhraseLabelText() {
    return this.removeSeedPhraseLabel.$(
      SELECTORS.REMOVE_SEED_PHRASE_LABEL_TEXT,
    );
  }

  get removeSeedPhraseModal() {
    return $(SELECTORS.REMOVE_SEED_PHRASE_MODAL);
  }

  // Methods to interact with the UI

  async clickOnCancelButton() {
    const cancelButton = await this.removeSeedPhraseCancelButton;
    await cancelButton.click();
  }

  async clickOnConfirmButton() {
    const confirmButton = await this.removeSeedPhraseOKButton;
    await confirmButton.click();
  }
}
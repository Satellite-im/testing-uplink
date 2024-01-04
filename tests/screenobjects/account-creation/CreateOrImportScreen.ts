require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CREATE_NEW_ACCOUNT_BUTTON: "<Button>[1]",
  CREATE_OR_RECOVER_LABEL: '[name="create-or-recover"]',
  CREATE_OR_RECOVER_LABEL_TEXT: "<Text>",
  IMPORT_ACCOUNT_BUTTON: "<Button>[2]",
  RECOVERY_LAYOUT: '[name="create-or-recover-layout"]',
  RECOVERY_PARAGRAPH:
    '//Group/Text[contains(@Name, "going to create an account")]',
};

const SELECTORS_MACOS = {
  CREATE_NEW_ACCOUNT_BUTTON: "-ios class chain:**/XCUIElementTypeButton[1]",
  CREATE_OR_RECOVER_LABEL: "~create-or-recover",
  CREATE_OR_RECOVER_LABEL_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  IMPORT_ACCOUNT_BUTTON: "-ios class chain:**/XCUIElementTypeButton[2]",
  RECOVERY_LAYOUT: "~create-or-recover-layout",
  RECOVERY_PARAGRAPH:
    '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value CONTAINS[cd] "going to create an account"`]',
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class CreateOrImportScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.RECOVERY_LAYOUT);
  }

  get createNewAccountButton() {
    return $(SELECTORS.CREATE_NEW_ACCOUNT_BUTTON);
  }

  get createOrRecoverLabel() {
    return $(SELECTORS.CREATE_OR_RECOVER_LABEL);
  }

  get createOrRecoverLabelText() {
    return this.createOrRecoverLabel.$(SELECTORS.CREATE_OR_RECOVER_LABEL_TEXT);
  }

  get importAccountButton() {
    return $(SELECTORS.IMPORT_ACCOUNT_BUTTON);
  }

  get recoveryLayout() {
    return $(SELECTORS.RECOVERY_LAYOUT);
  }

  get recoveryParagraph() {
    return $(SELECTORS.RECOVERY_PARAGRAPH);
  }

  async clickOnCreateAccount() {
    const createAccountButton = await this.createNewAccountButton;
    await createAccountButton.click();
  }

  async clickOnImportAccount() {
    const importAccountButton = await this.importAccountButton;
    await importAccountButton.click();
  }
}

require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CREATE_NEW_ACCOUNT_BUTTON: '[name="create-button"]',
  CREATE_OR_RECOVER_LABEL: '[name="create-or-recover"]',
  CREATE_OR_RECOVER_LABEL_TEXT: '//Text[@Name="ACCOUNT CREATION"]',
  IMPORT_ACCOUNT_BUTTON: '[name="recover-button"]',
  RECOVERY_LAYOUT: '[name="create-or-recover-layout"]',
  RECOVERY_PARAGRAPH: '[name="create-or-recover-instructions"]',
  RECOVERY_PARAGRAPH_TEXT: "<Text>",
};

const SELECTORS_MACOS = {
  CREATE_NEW_ACCOUNT_BUTTON: "~create-button",
  CREATE_OR_RECOVER_LABEL: "~create-or-recover",
  CREATE_OR_RECOVER_LABEL_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  IMPORT_ACCOUNT_BUTTON: "~recover-button",
  RECOVERY_LAYOUT: "~create-or-recover-layout",
  RECOVERY_PARAGRAPH: "~create-or-recover-instructions",
  RECOVERY_PARAGRAPH_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class CreateOrImportScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.RECOVERY_LAYOUT);
  }

  get createNewAccountButton() {
    return this.recoveryLayout.$(SELECTORS.CREATE_NEW_ACCOUNT_BUTTON);
  }

  get createOrRecoverLabel() {
    return this.recoveryLayout.$(SELECTORS.CREATE_OR_RECOVER_LABEL);
  }

  get createOrRecoverLabelText() {
    return this.createOrRecoverLabel.$(SELECTORS.CREATE_OR_RECOVER_LABEL_TEXT);
  }

  get importAccountButton() {
    return this.recoveryLayout.$(SELECTORS.IMPORT_ACCOUNT_BUTTON);
  }

  get recoveryLayout() {
    return $(SELECTORS.RECOVERY_LAYOUT);
  }

  get recoveryParagraph() {
    return this.recoveryLayout.$(SELECTORS.RECOVERY_PARAGRAPH);
  }

  get recoveryParagraphText() {
    return this.recoveryParagraph.$(SELECTORS.RECOVERY_PARAGRAPH_TEXT);
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

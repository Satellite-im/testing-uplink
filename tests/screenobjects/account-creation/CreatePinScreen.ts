require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";

let SELECTORS = {};

const SELECTORS_COMMON = {
  UNLOCK_LAYOUT: "~unlock-layout",
};

const SELECTORS_WINDOWS = {
  ACCOUNT_RESET_BUTTON: '[name="account-reset"]',
  CREATE_ACCOUNT_BUTTON: '[name="create-account-button"]',
  HELP_BUTTON: '[name="help-button"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "<Text>",
  PIN_INPUT: "~unlock-input",
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  UNLOCK_IMAGE: "<Image>[1]",
  UNLOCK_WARNING_HEADER: "//Text[1]/Text",
  UNLOCK_WARNING_PARAGRAPH: "<Text>[2]",
};

const SELECTORS_MACOS = {
  ACCOUNT_RESET_BUTTON: "~account-reset",
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  HELP_BUTTON: "~help-button",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  PIN_INPUT: "~pin-input",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  UNLOCK_IMAGE: "-ios class chain:**/XCUIElementTypeImage",
  UNLOCK_WARNING_HEADER: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  UNLOCK_WARNING_PARAGRAPH:
    '//XCUIElementTypeStaticText[contains(@value, "this is used to encrypt")]',
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class CreatePinScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.UNLOCK_LAYOUT);
  }

  get accountResetButton() {
    return $(SELECTORS.ACCOUNT_RESET_BUTTON);
  }

  get createAccountButton() {
    return $(SELECTORS.CREATE_ACCOUNT_BUTTON);
  }

  get helpButton() {
    return $(SELECTORS.HELP_BUTTON);
  }

  get helpButtonTooltip() {
    return $(SELECTORS.TOOLTIP);
  }

  get helpButtonTooltipText() {
    return $(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return $(SELECTORS.INPUT_ERROR).$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get pinInput() {
    return $(SELECTORS.PIN_INPUT);
  }

  get unlockLayout() {
    return $(SELECTORS.UNLOCK_LAYOUT);
  }

  get unlockImage() {
    return $(SELECTORS.UNLOCK_LAYOUT).$(SELECTORS.UNLOCK_IMAGE);
  }

  get unlockWarningHeader() {
    return $(SELECTORS.UNLOCK_LAYOUT).$(SELECTORS.UNLOCK_WARNING_HEADER);
  }

  get unlockWarningParagraph() {
    return $(SELECTORS.UNLOCK_LAYOUT).$(SELECTORS.UNLOCK_WARNING_PARAGRAPH);
  }

  async enterPinOnLogin(pin: string) {
    const pinInput = await this.pinInput;
    await pinInput.setValue(pin);
  }

  async enterPinOnCreateAccount(pin: string) {
    await this.pinInput.waitForExist();
    const pinInput = await this.pinInput;
    await pinInput.clearValue();
    await pinInput.setValue(pin);
    const addSomeoneInputText = await pinInput.getText();
    if (addSomeoneInputText !== pin) {
      await this.enterPinOnCreateAccount(pin);
    }
  }

  async clickOnCreateAccount() {
    const createAccountButton = await this.createAccountButton;
    await createAccountButton.click();
  }

  async clickOnResetAccount() {
    const resetAccountButton = await this.accountResetButton;
    await resetAccountButton.click();
  }

  async getStatusOfCreateAccountButton() {
    let result;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === WINDOWS_DRIVER) {
      result = await this.createAccountButton.getAttribute("IsEnabled");
    } else {
      result = await this.createAccountButton.getAttribute("enabled");
    }
    return result.toString().toLowerCase();
  }

  async hoverOnHelpButton() {
    const helpButton = await this.helpButton;
    await this.hoverOnElement(helpButton);
  }

  async openHelpButtonMenu() {
    const helpButton = await this.helpButton;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(helpButton);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(helpButton);
    }
  }

  async waitUntilCreateAccountButtonIsEnabled() {
    const createAccountButton = await this.createAccountButton;
    await driver.waitUntil(
      async () => {
        return await createAccountButton.waitForEnabled();
      },
      {
        timeout: 30000,
        timeoutMsg: "Expected status was not changed to enabled after 30s",
      },
    );
  }
}

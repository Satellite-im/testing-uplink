require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {
  UNLOCK_LAYOUT: "~unlock-layout",
};

const SELECTORS_WINDOWS: selectorContainer = {
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

const SELECTORS_MACOS: selectorContainer = {
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

class CreatePinScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.UNLOCK_LAYOUT);
  }

  public get accountResetButton() {
    return this.unlockLayout.$(SELECTORS.ACCOUNT_RESET_BUTTON);
  }

  public get createAccountButton() {
    return this.unlockLayout.$(SELECTORS.CREATE_ACCOUNT_BUTTON);
  }

  public get helpButton() {
    return this.unlockLayout.$(SELECTORS.HELP_BUTTON);
  }

  public get helpButtonTooltip() {
    return this.unlockLayout.$(SELECTORS.TOOLTIP);
  }

  public get helpButtonTooltipText() {
    return this.helpButtonTooltip.$(SELECTORS.TOOLTIP_TEXT);
  }

  public get inputError() {
    return this.unlockLayout.$(SELECTORS.INPUT_ERROR);
  }

  public get inputErrorText() {
    return this.inputError.$(SELECTORS.INPUT_ERROR_TEXT);
  }

  public get pinInput() {
    return this.unlockLayout.$(SELECTORS.PIN_INPUT);
  }

  public get unlockLayout() {
    return $(SELECTORS.UNLOCK_LAYOUT);
  }

  public get unlockImage() {
    return this.unlockLayout.$(SELECTORS.UNLOCK_IMAGE);
  }

  public get unlockWarningHeader() {
    return this.unlockLayout.$(SELECTORS.UNLOCK_WARNING_HEADER);
  }

  public get unlockWarningParagraph() {
    return this.unlockLayout.$(SELECTORS.UNLOCK_WARNING_PARAGRAPH);
  }

  async enterPinOnLogin(pin: string) {
    await this.pinInput.waitForExist();
    const pinInput = await this.pinInput;
    await pinInput.clearValue();
    await pinInput.setValue(pin);
    await browser.pause(1000);
    if (pinInput) {
      const pinToEnterLength = pin.length;
      const expectedMaskedPin = "•".repeat(pinToEnterLength);
      const maskedPin = await pinInput.getText();
      if (maskedPin !== expectedMaskedPin) {
        await this.enterPinOnCreateAccount(pin);
      }
    } else {
      return;
    }
  }

  async enterPinOnCreateAccount(pin: string) {
    await this.pinInput.waitForExist();
    const pinInput = await this.pinInput;
    await pinInput.clearValue();
    await pinInput.setValue(pin);

    const pinToEnterLength = pin.length;
    const expectedMaskedPin = "•".repeat(pinToEnterLength);
    const maskedPin = await pinInput.getText();
    if (maskedPin !== expectedMaskedPin) {
      await this.enterPinOnCreateAccount(pin);
    }
  }

  async clickOnCreateAccount() {
    const createAccountButton = await this.createAccountButton;
    await createAccountButton.click();
    await this.validateSpinnerIsNotShown();
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

  async loginWithTestUser() {
    // Enter pin for test user
    const unlockScreen = await this.unlockLayout;
    await unlockScreen.waitForExist();
    await this.enterPinOnLogin("1234");
    await this.validateSpinnerIsNotShown();
    await this.unlockLayout.waitForExist({ reverse: true });
  }
}

export default new CreatePinScreen();

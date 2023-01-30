import UplinkMainScreen from "./UplinkMainScreen";

const SELECTORS = {
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  INPUT_ERROR: "~input-error",
  PIN_INPUT: "~pin-input",
  UNLOCK_LAYOUT: "~unlock-layout",
  UNLOCK_WARNING_PARAGRAPH: "~unlock-warning-paragraph",
  UNLOCK_WARNING_SPAN: "~unlock-warning-span",
};

class CreatePinScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.UNLOCK_LAYOUT);
  }

  get createAccountButton() {
    return $(SELECTORS.CREATE_ACCOUNT_BUTTON);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR).$(
      "-ios class chain:**/XCUIElementTypeStaticText"
    );
  }

  get pinInput() {
    return $(SELECTORS.PIN_INPUT);
  }

  get unlockLayout() {
    return $(SELECTORS.UNLOCK_LAYOUT);
  }

  get unlockWarningParagraph() {
    return $(SELECTORS.UNLOCK_WARNING_PARAGRAPH).$(
      "-ios class chain:**/XCUIElementTypeStaticText"
    );
  }

  get unlockWarningSpan() {
    return $(SELECTORS.UNLOCK_WARNING_SPAN).$(
      "-ios class chain:**/XCUIElementTypeStaticText"
    );
  }

  async enterPin(pin: string) {
    await this.pinInput.setValue(pin);
  }

  async clickOnCreateAccount() {
    await (await this.createAccountButton).click();
  }
}

export default new CreatePinScreen();

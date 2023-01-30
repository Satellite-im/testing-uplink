import UplinkMainScreen from "./UplinkMainScreen";

const SELECTORS = {
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  INPUT_ERROR: "~input-error",
  UNLOCK_LAYOUT: "~unlock-layout",
  USERNAME_INPUT: "~username-input",
};

class CreatePinScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.UNLOCK_LAYOUT);
  }

  get createAccountButton() {
    return $(SELECTORS.CREATE_ACCOUNT_BUTTON);
  }

  get inputError() {
    return $("//*[@label='input-error']/*[1]");
  }

  get unlockLayout() {
    return $(SELECTORS.UNLOCK_LAYOUT);
  }

  get usernameInput() {
    return $(SELECTORS.USERNAME_INPUT);
  }

  async enterUsername(username: string) {
    await this.usernameInput.setValue(username);
  }

  async clickOnCreateAccount() {
    await (await this.createAccountButton).click();
  }
}

export default new CreatePinScreen();

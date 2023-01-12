import AppScreen from "./AppScreen"

const SELECTORS = {
  CREATE_ACCOUNT_BUTTON: "~create-account-button",
  INPUT_ERROR: "~input-error",
  PRE_RELEASE_INDICATOR: "~pre-release",
  PRE_RELEASE_INDICATOR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText[`value == \"Pre-release\"`]",
  UNLOCK_LAYOUT: "~unlock-layout",
  USERNAME_INPUT: "~username-input",
  WINDOW: "-ios class chain:**/XCUIElementTypeWebView",
}

class CreatePinScreen extends AppScreen {
  constructor() {
    super(SELECTORS.UNLOCK_LAYOUT)
  }

  get createAccountButton() {
    return $(SELECTORS.CREATE_ACCOUNT_BUTTON)
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR).$("-ios class chain:**/XCUIElementTypeStaticText")
  }

  get pinInput() {
    return $(SELECTORS.PIN_INPUT)
  }

  get prereleaseIndicator() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR)
  }

  get prereleaseIndicatorText() {
    return $(SELECTORS.PRE_RELEASE_INDICATOR_TEXT)
  }

  get unlockLayout() {
    return $(SELECTORS.UNLOCK_LAYOUT)
  }

  get usernameInput() {
    return $(SELECTORS.USERNAME_INPUT)
  }

  get window() {
    return $(SELECTORS.WINDOW)
  }
  
  async enterUsername(username: string) {
    await this.usernameInput.setValue(username)
  }

  async clickOnCreateAccount() {
    await (await this.createAccountButton).click()
  }
}

export default new CreatePinScreen()

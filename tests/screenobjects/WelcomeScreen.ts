import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  ADD_FRIENDS_BUTTON: "~add-friends-button",
};

const SELECTORS_WINDOWS = {
  WELCOME_LAYOUT: "~chat-layout",
};

const SELECTORS_MACOS = {
  WELCOME_LAYOUT: "~welcome-screen",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class WelcomeScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.WELCOME_LAYOUT);
  }

  get addFriendsButton() {
    return $(SELECTORS.ADD_FRIENDS_BUTTON);
  }

  get welcomeLayout() {
    return $(SELECTORS.WELCOME_LAYOUT);
  }

  async clickAddSomeone() {
    return this.addFriendsButton.click();
  }
}

export default new WelcomeScreen();

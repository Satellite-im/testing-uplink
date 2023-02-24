import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  WELCOME_LAYOUT: '[name="welcome-screen"]',
  ADD_FRIENDS_BUTTON: '[name="add-friends-button"]',
  ADD_SOMEONE_TEXT: '[name="Add Someone"]',
};

const SELECTORS_MACOS = {
  ADD_FRIENDS_BUTTON: "~add-friends-button",
  ADD_SOMEONE_TEXT: "~Add Someone",
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

  get addSomeoneText() {
    return $(SELECTORS.ADD_SOMEONE_TEXT);
  }

  get welcomeLayout() {
    return $(SELECTORS.WELCOME_LAYOUT);
  }

  async clickAddSomeone() {
    return this.addFriendsButton.click();
  }
}

export default new WelcomeScreen();

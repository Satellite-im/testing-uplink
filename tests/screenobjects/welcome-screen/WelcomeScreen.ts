require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ADD_FRIENDS_BUTTON: '[name="add-friends-button"]',
  ADD_SOMEONE_TEXT: "<Text>",
  WELCOME_IMAGE: '[name="welcome-image"]',
  WELCOME_LAYOUT: "~welcome",
};

const SELECTORS_MACOS = {
  ADD_FRIENDS_BUTTON: "~add-friends-button",
  ADD_SOMEONE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  WELCOME_IMAGE: "~welcome-image",
  WELCOME_LAYOUT: "~welcome-screen",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class WelcomeScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.WELCOME_LAYOUT);
  }

  get addFriendsButton() {
    return $(SELECTORS.ADD_FRIENDS_BUTTON);
  }

  get addSomeoneText() {
    return $(SELECTORS.WELCOME_LAYOUT).$(SELECTORS.ADD_SOMEONE_TEXT);
  }

  get welcomeImage() {
    return $(SELECTORS.WELCOME_LAYOUT).$(SELECTORS.WELCOME_IMAGE);
  }

  get welcomeLayout() {
    return $(SELECTORS.WELCOME_LAYOUT);
  }

  async clickAddSomeone() {
    const addSomeoneButton = await this.addFriendsButton;
    await addSomeoneButton.click();
  }

  async validateWelcomeScreenIsShown() {
    const welcomeLayout = await this.welcomeLayout;
    await welcomeLayout.waitForExist();
  }
}

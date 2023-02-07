import UplinkMainScreen from "./UplinkMainScreen";

const SELECTORS = {
  ADD_FRIENDS_BUTTON: "~add-friends-button",
  WELCOME_LAYOUT: "~welcome-screen",
};

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

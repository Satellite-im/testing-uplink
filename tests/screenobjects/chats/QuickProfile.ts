import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  QUICK_PROFILE: '[name="Context Menu"]',
  QUICK_PROFILE_BANNER_IMAGE: '[name="banner-image"]',
  QUICK_PROFILE_BUTTON: '[name="Context Item"]',
  QUICK_PROFILE_IDENTITY_HEADER: '[name="identity-header"]',
  QUICK_PROFILE_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  QUICK_PROFILE_INDICATOR_ONLINE: '[name="indicator-online"]',
  QUICK_PROFILE_USER_IMAGE: '[name="profile-image"]',
  QUICK_PROFILE_USER_NAME: '[name="profile-name"]',
  QUICK_PROFILE_USER_NAME_VALUE: '[name="profile-name-value"]',
  QUICK_PROFILE_USER_NAME_VALUE_TEXT: "//Text",
};

const SELECTORS_MACOS = {
  QUICK_PROFILE: "~Context Menu",
  QUICK_PROFILE_BANNER_IMAGE: "~banner-image",
  QUICK_PROFILE_BUTTON: "~Context Item",
  QUICK_PROFILE_IDENTITY_HEADER: "~identity-header",
  QUICK_PROFILE_INDICATOR_ONLINE: "~indicator-online",
  QUICK_PROFILE_INDICATOR_OFFLINE: "~indicator-offline",
  QUICK_PROFILE_USER_IMAGE: "~profile-image",
  QUICK_PROFILE_USER_NAME: "~profile-name",
  QUICK_PROFILE_USER_NAME_VALUE: "~profile-name-value",
  QUICK_PROFILE_USER_NAME_VALUE_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class QuickProfile extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.QUICK_PROFILE);
  }

  get quickProfile() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.QUICK_PROFILE);
  }

  get quickProfileBannerImage() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_BANNER_IMAGE);
  }

  get quickProfileBlockUser() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$$(SELECTORS.QUICK_PROFILE_BUTTON)[1];
  }

  get quickProfileEditProfile() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_BUTTON);
  }

  get quickProfileIdentityHeader() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_IDENTITY_HEADER);
  }

  get quickProfileIndicatorOffline() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_INDICATOR_OFFLINE);
  }

  get quickProfileIndicatorOnline() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_INDICATOR_ONLINE);
  }

  get quickProfileRemoveFriend() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$$(SELECTORS.QUICK_PROFILE_BUTTON)[0];
  }

  get quickProfileUserImage() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_IMAGE);
  }

  get quickProfileUserName() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME);
  }

  get quickProfileUserNameValue() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE);
  }

  get quickProfileUserNameValueText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE_TEXT);
  }
}

export default new QuickProfile();

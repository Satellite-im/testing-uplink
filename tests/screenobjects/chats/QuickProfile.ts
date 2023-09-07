import "module-alias/register";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  QUICK_PROFILE: '[name="Context Menu"]',
  QUICK_PROFILE_BANNER_IMAGE: '[name="banner-image"]',
  QUICK_PROFILE_BLOCK: '[name="quick-profile-block"]',
  QUICK_PROFILE_FRIEND_REMOVE: '[name="quick-profile-friend-remove"]',
  QUICK_PROFILE_IDENTITY_HEADER: '[name="identity-header"]',
  QUICK_PROFILE_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  QUICK_PROFILE_INDICATOR_ONLINE: '[name="indicator-online"]',
  QUICK_PROFILE_MESSAGE: '[name="quick-profile-message"]',
  QUICK_PROFILE_SELF_EDIT: '[name="quick-profile-self-edit"]',
  QUICK_PROFILE_UNBLOCK: '[name="quick-profile-unblock"]',
  QUICK_PROFILE_USER_IMAGE: '[name="profile-image"]',
  QUICK_PROFILE_USER_NAME: '[name="profile-name"]',
  QUICK_PROFILE_USER_NAME_VALUE: '[name="profile-name-value"]',
  QUICK_PROFILE_USER_NAME_VALUE_TEXT: "<Text>",
};

const SELECTORS_MACOS = {
  QUICK_PROFILE: "~Context Menu",
  QUICK_PROFILE_BANNER_IMAGE: "~banner-image",
  QUICK_PROFILE_BLOCK: "~quick-profile-block",
  QUICK_PROFILE_BUTTON: "~Context Item",
  QUICK_PROFILE_FRIEND_REMOVE: "~quick-profile-friend-remove",
  QUICK_PROFILE_IDENTITY_HEADER: "~identity-header",
  QUICK_PROFILE_INDICATOR_ONLINE: "~indicator-online",
  QUICK_PROFILE_INDICATOR_OFFLINE: "~indicator-offline",
  QUICK_PROFILE_MESSAGE: "~quick-profile-message",
  QUICK_PROFILE_SELF_EDIT: "~quick-profile-self-edit",
  QUICK_PROFILE_UNBLOCK: "~quick-profile-unblock",
  QUICK_PROFILE_USER_IMAGE: "~profile-image",
  QUICK_PROFILE_USER_NAME: "~profile-name",
  QUICK_PROFILE_USER_NAME_VALUE: "~profile-name-value",
  QUICK_PROFILE_USER_NAME_VALUE_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class QuickProfile extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.QUICK_PROFILE);
  }

  get quickProfile() {
    return this.instance.$(SELECTORS.CHAT_LAYOUT).$(SELECTORS.QUICK_PROFILE);
  }

  get quickProfileBannerImage() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_BANNER_IMAGE);
  }

  get quickProfileBlockUser() {
    return this.instance
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_BLOCK);
  }

  get quickProfileEditProfile() {
    return this.instance
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_SELF_EDIT);
  }

  get quickProfileIdentityHeader() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_IDENTITY_HEADER);
  }

  get quickProfileIndicatorOffline() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_INDICATOR_OFFLINE);
  }

  get quickProfileIndicatorOnline() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_INDICATOR_ONLINE);
  }

  get quickProfileMessage() {
    return this.instance
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_MESSAGE);
  }

  get quickProfileRemoveFriend() {
    return this.instance
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_FRIEND_REMOVE);
  }

  get quickProfileUnblockUser() {
    return this.instance
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_UNBLOCK);
  }

  get quickProfileUserImage() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_IMAGE);
  }

  get quickProfileUserName() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME);
  }

  get quickProfileUserNameValue() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE);
  }

  get quickProfileUserNameValueText() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE_TEXT);
  }

  async clickOnBlockUser() {
    await this.quickProfileBlockUser.click();
  }

  async clickOnEditProfile() {
    await this.quickProfileEditProfile.click();
  }

  async clickOnMessageUser() {
    await this.quickProfileMessage.click();
  }

  async clickOnRemoveUser() {
    await this.quickProfileRemoveFriend.click();
  }

  async clickOnUnblockUser() {
    await this.quickProfileUnblockUser.click();
  }
}

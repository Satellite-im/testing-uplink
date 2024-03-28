require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS: selectorContainer = {
  QUICK_PROFILE: '[name="Context Menu"]',
  QUICK_PROFILE_BANNER_IMAGE: '[name="banner-image"]',
  QUICK_PROFILE_BLOCK: '[name="quick-profile-block"]',
  QUICK_PROFILE_FRIEND_REMOVE: '[name="quick-profile-friend-remove"]',
  QUICK_PROFILE_IDENTITY_HEADER: '[name="identity-header"]',
  QUICK_PROFILE_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  QUICK_PROFILE_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  QUICK_PROFILE_INDICATOR_ONLINE: '[name="indicator-online"]',
  QUICK_PROFILE_MESSAGE: '[name="quick-profile-message"]',
  QUICK_PROFILE_SELF_EDIT: '[name="quick-profile-self-edit"]',
  QUICK_PROFILE_SHARE_DID: '[name="friends-share"]',
  QUICK_PROFILE_UNBLOCK: '[name="quick-profile-unblock"]',
  QUICK_PROFILE_USER_IMAGE: '[name="profile-image"]',
  QUICK_PROFILE_USER_NAME: '[name="profile-name"]',
  QUICK_PROFILE_USER_NAME_VALUE: '[name="profile-name-value"]',
  QUICK_PROFILE_USER_NAME_VALUE_TEXT: "<Text>",
  QUICK_PROFILE_USER_VOLUME_LABEL: '[name="user-volume-label"]',
  QUICK_PROFILE_USER_VOLUME_LABEL_TEXT: '[name="User Volume"]',
  QUICK_PROFILE_USER_VOLUME_RANGE: '[name="range-quick-profile-speaker"]',
  QUICK_PROFILE_USER_VOLUME_RANGE_INPUT: '[name="range-input"]',
};

const SELECTORS_MACOS: selectorContainer = {
  QUICK_PROFILE: "~Context Menu",
  QUICK_PROFILE_BANNER_IMAGE: "~banner-image",
  QUICK_PROFILE_BLOCK: "~quick-profile-block",
  QUICK_PROFILE_BUTTON: "~Context Item",
  QUICK_PROFILE_FRIEND_REMOVE: "~quick-profile-friend-remove",
  QUICK_PROFILE_IDENTITY_HEADER: "~identity-header",
  QUICK_PROFILE_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  QUICK_PROFILE_INDICATOR_ONLINE: "~indicator-online",
  QUICK_PROFILE_INDICATOR_OFFLINE: "~indicator-offline",
  QUICK_PROFILE_MESSAGE: "~quick-profile-message",
  QUICK_PROFILE_SELF_EDIT: "~quick-profile-self-edit",
  QUICK_PROFILE_SHARE_DID: "~friends-share",
  QUICK_PROFILE_UNBLOCK: "~quick-profile-unblock",
  QUICK_PROFILE_USER_IMAGE: "~profile-image",
  QUICK_PROFILE_USER_NAME: "~profile-name",
  QUICK_PROFILE_USER_NAME_VALUE: "~profile-name-value",
  QUICK_PROFILE_USER_NAME_VALUE_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  QUICK_PROFILE_USER_VOLUME_LABEL: "~user-volume-label",
  QUICK_PROFILE_USER_VOLUME_LABEL_TEXT: "~User Volume",
  QUICK_PROFILE_USER_VOLUME_RANGE: "~range-quick-profile-speaker",
  QUICK_PROFILE_USER_VOLUME_RANGE_INPUT: "~range-input",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class QuickProfile extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.QUICK_PROFILE);
  }

  public get chatLayout() {
    return $(SELECTORS.CHAT_LAYOUT);
  }

  public get quickProfile() {
    return this.chatLayout.$(SELECTORS.QUICK_PROFILE);
  }

  public get quickProfileBannerImage() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_BANNER_IMAGE);
  }

  public get quickProfileBlockUser() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_BLOCK);
  }

  public get quickProfileEditProfile() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_SELF_EDIT);
  }

  public get quickProfileIdentityHeader() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_IDENTITY_HEADER);
  }

  public get quickProfileIndicator() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_INDICATOR);
  }

  public get quickProfileIndicatorOffline() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_INDICATOR_OFFLINE);
  }

  public get quickProfileIndicatorOnline() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_INDICATOR_ONLINE);
  }

  public get quickProfileMessage() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_MESSAGE);
  }

  public get quickProfileRemoveFriend() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_FRIEND_REMOVE);
  }

  public get quickProfileShareDid() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_SHARE_DID);
  }

  public get quickProfileUnblockUser() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_UNBLOCK);
  }

  public get quickProfileUserImage() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_USER_IMAGE);
  }

  public get quickProfileUserName() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_USER_NAME);
  }

  public get quickProfileUserNameValue() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE);
  }

  public get quickProfileUserNameValueText() {
    return this.quickProfileUserNameValue.$(
      SELECTORS.QUICK_PROFILE_USER_NAME_VALUE_TEXT,
    );
  }

  public get quickProfileUserVolumeLabel() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_USER_VOLUME_LABEL);
  }

  public get quickProfileUserVolumeLabelText() {
    return this.quickProfileUserVolumeLabel.$(
      SELECTORS.QUICK_PROFILE_USER_VOLUME_LABEL_TEXT,
    );
  }

  public get quickProfileUserVolumeRange() {
    return this.quickProfile.$(SELECTORS.QUICK_PROFILE_USER_VOLUME_RANGE);
  }

  public get quickProfileUserVolumeRangeInput() {
    return this.quickProfileUserVolumeRange.$(
      SELECTORS.QUICK_PROFILE_USER_VOLUME_RANGE_INPUT,
    );
  }

  async clickOnBlockUser() {
    const blockUser = await this.quickProfileBlockUser;
    await blockUser.click();
  }

  async clickOnEditProfile() {
    const editProfile = await this.quickProfileEditProfile;
    await editProfile.click();
  }

  async clickOnMessageUser() {
    const messageUser = await this.quickProfileMessage;
    await messageUser.click();
  }

  async clickOnRemoveUser() {
    const removeUser = await this.quickProfileRemoveFriend;
    await removeUser.click();
  }

  async clickOnShareDid() {
    const shareDid = await this.quickProfileShareDid;
    await shareDid.click();
  }

  async clickOnUnblockUser() {
    const unblockUser = await this.quickProfileUnblockUser;
    await unblockUser.click();
  }
}

export default new QuickProfile();

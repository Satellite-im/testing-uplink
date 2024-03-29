require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS: selectorContainer = {
  SHARE_DID_MODAL: '[name="modal"]',
  SHARE_DID_MODAL_BUTTON: '[name="share_to_chat"]',
  SHARE_DID_MODAL_HEADER: '//Text[@Name="SELECT CHAT"]',
  SHARE_DID_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  SHARE_DID_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  SHARE_DID_USER_IMAGE: '[name="User Image"]',
  SHARE_DID_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  SHARE_DID_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SHARE_DID_USER_INFO: '[name="User Info"]',
  SHARE_DID_USER_NAME: '[name="Username"]',
  SHARE_DID_USER_NAME_TEXT: "<Text>",
  SHARE_DID_USER_STATUS: '[name="User Status"]',
  SHARE_DID_USER_STATUS_TEXT: "<Text>",
};

const SELECTORS_MACOS: selectorContainer = {
  SHARE_DID_MODAL: "~modal",
  SHARE_DID_MODAL_BUTTON: "~share_to_chat",
  SHARE_DID_MODAL_HEADER:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "SELECT CHAT"`][2]',
  SHARE_DID_USER_INDICATOR_OFFLINE: "~indicator-offline",
  SHARE_DID_USER_INDICATOR_ONLINE: "~indicator-online",
  SHARE_DID_USER_IMAGE: "~User Image",
  SHARE_DID_USER_IMAGE_PROFILE: "~user-image-profile",
  SHARE_DID_USER_IMAGE_WRAP: "~user-image-wrap",
  SHARE_DID_USER_INFO: "~User Info",
  SHARE_DID_USER_NAME: "~Username",
  SHARE_DID_USER_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SHARE_DID_USER_STATUS: "~User Status",
  SHARE_DID_USER_STATUS_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ShareDidModal extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.SHARE_DID_MODAL);
  }

  public get shareDidModal() {
    return $(SELECTORS.SHARE_DID_MODAL);
  }

  public get shareDidModalButton() {
    return this.shareDidModal.$(SELECTORS.SHARE_DID_MODAL_BUTTON);
  }

  public get shareDidModalHeader() {
    return this.shareDidModal.$(SELECTORS.SHARE_DID_MODAL_HEADER);
  }

  public get shareDidUserIndicatorOffline() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_INDICATOR_OFFLINE);
  }

  public get shareDidUserIndicatorOnline() {
    return $$(SELECTORS.SHARE_DID_USER_INDICATOR_ONLINE);
  }

  public get shareDidUserImage() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_IMAGE);
  }

  public get shareDidUserImageProfile() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_IMAGE_PROFILE);
  }

  public get shareDidUserImageWrap() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_IMAGE_WRAP);
  }

  public get shareDidUserInfo() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_INFO);
  }

  public get shareDidUserName() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_NAME);
  }

  public get shareDidUserNameText() {
    return this.shareDidModal
      .$(SELECTORS.SHARE_DID_USER_NAME)
      .$(SELECTORS.SHARE_DID_USER_NAME_TEXT);
  }

  public get shareDidUserStatus() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_STATUS);
  }

  public get shareDidUserStatusText() {
    return this.shareDidModal
      .$(SELECTORS.SHARE_DID_USER_STATUS)
      .$(SELECTORS.SHARE_DID_USER_STATUS_TEXT);
  }
}

export default new ShareDidModal();

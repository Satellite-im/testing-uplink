require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
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

const SELECTORS_MACOS = {
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

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ShareDidModal extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.SHARE_DID_MODAL);
  }

  get shareDidModal() {
    return $(SELECTORS.SHARE_DID_MODAL);
  }

  get shareDidModalButton() {
    return this.shareDidModal.$(SELECTORS.SHARE_DID_MODAL_BUTTON);
  }

  get shareDidModalHeader() {
    return this.shareDidModal.$(SELECTORS.SHARE_DID_MODAL_HEADER);
  }

  get shareDidUserIndicatorOffline() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_INDICATOR_OFFLINE);
  }

  get shareDidUserIndicatorOnline() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_INDICATOR_ONLINE);
  }

  get shareDidUserImage() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_IMAGE);
  }

  get shareDidUserImageProfile() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_IMAGE_PROFILE);
  }

  get shareDidUserImageWrap() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_IMAGE_WRAP);
  }

  get shareDidUserInfo() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_INFO);
  }

  get shareDidUserName() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_NAME);
  }

  get shareDidUserNameText() {
    return this.shareDidModal
      .$$(SELECTORS.SHARE_DID_USER_NAME)
      .$(SELECTORS.SHARE_DID_USER_NAME_TEXT);
  }

  get shareDidUserStatus() {
    return this.shareDidModal.$$(SELECTORS.SHARE_DID_USER_STATUS);
  }

  get shareDidUserStatusText() {
    return this.shareDidModal
      .$$(SELECTORS.SHARE_DID_USER_STATUS)
      .$(SELECTORS.SHARE_DID_USER_STATUS_TEXT);
  }
}

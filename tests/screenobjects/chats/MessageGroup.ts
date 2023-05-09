import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  MESSAGE_GROUP_REMOTE: '[name="message-group-remote"]',
  MESSAGE_GROUP_SENT: '[name="message-group"]',
  MESSAGE_GROUP_WRAP_LOCAL: '[name="message-group-wrap-local"]',
  MESSAGE_GROUP_WRAP_REMOTE: '[name="message-group-wrap-remote"]',
  MESSAGE_GROUP_TIME_AGO: '[name="time-ago"]',
  MESSAGE_GROUP_TIME_AGO_TEXT: "//Text",
  MESSAGE_GROUP_USER_IMAGE: '[name="User Image"]',
  MESSAGE_GROUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
};

const SELECTORS_MACOS = {
  MESSAGE_GROUP_REMOTE: "~message-group-remote",
  MESSAGE_GROUP_SENT: "~message-group",
  MESSAGE_GROUP_WRAP_LOCAL: "~message-group-wrap-local",
  MESSAGE_GROUP_WRAP_REMOTE: "~message-group-wrap-remote",
  MESSAGE_GROUP_TIME_AGO: "~time-ago",
  MESSAGE_GROUP_TIME_AGO_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  MESSAGE_GROUP_USER_IMAGE: "~User Image",
  MESSAGE_GROUP_USER_IMAGE_WRAP: "~user-image-wrap",
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: "~indicator-offline",
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: "~indicator-online",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class Messages extends UplinkMainScreen {
  constructor() {
    super(
      SELECTORS.MESSAGE_GROUP_WRAP_REMOTE || SELECTORS.MESSAGE_GROUP_WRAP_SENT
    );
  }

  get messageGroupReceived() {
    return $$(SELECTORS.MESSAGE_GROUP_REMOTE);
  }

  get messageGroupSent() {
    return $$(SELECTORS.MESSAGE_GROUP_SENT);
  }

  get messageGroupWrapLocal() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_LOCAL);
  }

  get messageGroupWrapRemote() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE);
  }

  get messageGroupTimeAgo() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP).$(SELECTORS.MESSAGE_GROUP_TIME_AGO);
  }

  get messageGroupTimeAgoValue() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO_TEXT);
  }

  get messageGroupUserImage() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE);
  }

  get messageGroupUserImageWrap() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP).$(
      SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP
    );
  }

  get messageGroupUserIndicatorOffline() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_OFFLINE);
  }

  get messageGroupUserIndicatorOnline() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE);
  }

  // Message Group Wraps Received Methods

  async getLastGroupWrapReceived() {
    const messageGroupWraps = await this.messageGroupWrapRemote;
    const lastGroupWrapIndex = (await messageGroupWraps.length) - 1;
    const lastGroupWrap = await messageGroupWraps[lastGroupWrapIndex];
    return lastGroupWrap;
  }

  async getLastGroupWrapReceivedImage() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const userImage = await groupWrap
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE);
    return userImage;
  }

  async getLastGroupWrapReceivedOffline() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const offlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_OFFLINE
    );
    return offlineStatus;
  }

  async getLastGroupWrapReceivedOnline() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const onlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE
    );
    return onlineStatus;
  }

  // Message Group Wraps Sent Methods

  async getLastGroupWrapSent() {
    const messageGroupWraps = await this.messageGroupWrapLocal;
    const lastGroupWrapIndex = (await messageGroupWraps.length) - 1;
    const lastGroupWrap = await messageGroupWraps[lastGroupWrapIndex];
    return lastGroupWrap;
  }

  async getLastGroupWrapSentImage() {
    const groupWrap = await this.getLastGroupWrapSent();
    const userImage = await groupWrap
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE);
    return userImage;
  }

  async getLastGroupWrapSentOffline() {
    const groupWrap = await this.getLastGroupWrapSent();
    const offlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_OFFLINE
    );
    return offlineStatus;
  }

  async getLastGroupWrapSentOnline() {
    const groupWrap = await this.getLastGroupWrapSent();
    const onlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE
    );
    return onlineStatus;
  }

  // Group Messages Received Methods

  async getLastReceivedGroup() {
    const messageGroupsReceived = await this.messageGroupReceived;
    const lastGroupIndex = (await messageGroupsReceived.length) - 1;
    const lastGroupLocator = await messageGroupsReceived[lastGroupIndex];
    return lastGroupLocator;
  }

  async getLastMessageReceivedTimeAgo() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const timeAgoText = await lastGroupReceived
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO_TEXT);
    return timeAgoText;
  }

  async rightClickOnLastReceivedGroup() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const imageOnGroup = await lastGroupReceived.$("/..");
    await this.hoverOnElement(imageOnGroup);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(imageOnGroup);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(imageOnGroup);
    }
  }

  // Group Messages Sent Methods
  async getLastSentGroup() {
    const messageGroupsSent = await this.messageGroupSent;
    const lastGroupIndex = (await messageGroupsSent.length) - 1;
    const lastGroupLocator = await messageGroupsSent[lastGroupIndex];
    return lastGroupLocator;
  }

  async getLastMessageSentTimeAgo() {
    const lastGroupSent = await this.getLastSentGroup();
    const timeAgoText = await lastGroupSent
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO_TEXT);
    return timeAgoText;
  }

  async rightClickOnLastSentGroup() {
    const lastSentGroup = await this.getLastSentGroup();
    const imageOnGroup = await lastSentGroup.$("/..");
    await this.hoverOnElement(imageOnGroup);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(imageOnGroup);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(imageOnGroup);
    }
  }

  // Context Menu methods

  async openLocalQuickProfile() {
    const imageToRightClick = await this.getLastGroupWrapSentImage();
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(imageToRightClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(imageToRightClick);
    }
  }

  async openRemoteQuickProfile() {
    const imageToRightClick = await this.getLastGroupWrapReceivedImage();
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(imageToRightClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(imageToRightClick);
    }
  }
}

export default new Messages();

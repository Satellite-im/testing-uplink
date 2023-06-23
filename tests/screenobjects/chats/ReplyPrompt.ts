import UplinkMainScreen from "../UplinkMainScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "../../helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  REPLY_POPUP: '[name="inline-reply"]',
  REPLY_POPUP_CLOSE_BUTTON: '[name="close-reply"]',
  REPLY_POPUP_CONTENT: '[name="content"]',
  REPLY_POPUP_HEADER: '//Text[@Name="inline-reply-header"]/Text',
  REPLY_POPUP_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  REPLY_POPUP_INDICATOR_ONLINE: '[name="indicator-online"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: '[name="reply-text-message"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE: "//Text",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: '[name="reply-text-message-remote"]',
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE: "//Text",
  REPLY_POPUP_USER_IMAGE: '[name="User Image"]',
  REPLY_POPUP_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  REPLY_POPUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
};

const SELECTORS_MACOS = {
  REPLY_POPUP: "~inline-reply",
  REPLY_POPUP_CLOSE_BUTTON: "~close-reply",
  REPLY_POPUP_CONTENT: "~content",
  REPLY_POPUP_HEADER: "~inline-reply-header",
  REPLY_POPUP_INDICATOR_OFFLINE: "~indicator-offline",
  REPLY_POPUP_INDICATOR_ONLINE: "~indicator-online",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: "~reply-text-message",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: "~reply-text-message-remote",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REPLY_POPUP_USER_IMAGE: "~User Image",
  REPLY_POPUP_USER_IMAGE_PROFILE: "~user-image-profile",
  REPLY_POPUP_USER_IMAGE_WRAP: "~user-image-wrap",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ReplyPrompt extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.REPLY_POPUP);
  }

  get replyPopUp() {
    return this.instance.$(SELECTORS.REPLY_POPUP);
  }

  get replyPopUpCloseButton() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_CLOSE_BUTTON);
  }

  get replyPopUpContent() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_CONTENT);
  }

  get replyPopUpHeader() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_HEADER);
  }

  get replyPopUpIndicatorOffline() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_INDICATOR_OFFLINE);
  }

  get replyPopUpIndicatorOnline() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_INDICATOR_ONLINE);
  }

  get replyPopUpLocalTextToReply() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY);
  }

  get replyPopUpLocalTextToReplyValue() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY)
      .$(SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE);
  }

  get replyPopUpRemoteTextToReply() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY);
  }

  get replyPopUpRemoteTextToReplyValue() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY)
      .$(SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE);
  }

  get replyPopUpUserImage() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_USER_IMAGE);
  }

  get replyPopUpUserImageProfile() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_USER_IMAGE_PROFILE);
  }

  get replyPopUpUserImageWrap() {
    return this.instance
      .$(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_USER_IMAGE_WRAP);
  }

  async closeReplyModal() {
    await this.replyPopUpCloseButton.click();
  }

  async waitForReplyModalToNotExist() {
    await this.replyPopUp.waitForExist({ reverse: true });
  }
}

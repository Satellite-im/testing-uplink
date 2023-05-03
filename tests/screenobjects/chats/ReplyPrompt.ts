import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  REPLY_POPUP: '[name="inline-reply"]',
  REPLY_POPUP_CLOSE_BUTTON: '[name="close-reply"]',
  REPLY_POPUP_CONTENT: '[name="content"]',
  REPLY_POPUP_HEADER: "//Text/Text",
  REPLY_POPUP_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  REPLY_POPUP_INDICATOR_ONLINE: '[name="indicator-online"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: '[name="reply-text-message"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE: "//Text",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: '[name="reply-text-message-remote"]',
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE: "//Text",
  REPLY_POPUP_USER_IMAGE: '[name="User Image"]',
  REPLY_POPUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
};

const SELECTORS_MACOS = {
  REPLY_POPUP: "~inline-reply",
  REPLY_POPUP_CLOSE_BUTTON: "~close-reply",
  REPLY_POPUP_CONTENT: "~content",
  REPLY_POPUP_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  REPLY_POPUP_INDICATOR_OFFLINE: "~indicator-offline",
  REPLY_POPUP_INDICATOR_ONLINE: "~indicator-online",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: "~reply-text-message",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: "~reply-text-message-remote",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REPLY_POPUP_USER_IMAGE: "~User Image",
  REPLY_POPUP_USER_IMAGE_WRAP: "~user-image-wrap",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ReplyPrompt extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.REPLY_POPUP);
  }

  get replyPopUp() {
    return $(SELECTORS.REPLY_POPUP);
  }

  get replyPopUpCloseButton() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_CLOSE_BUTTON);
  }

  get replyPopUpContent() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_CONTENT);
  }

  get replyPopUpHeader() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_HEADER);
  }

  get replyPopUpIndicatorOffline() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_INDICATOR_OFFLINE);
  }

  get replyPopUpIndicatorOnline() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_INDICATOR_ONLINE);
  }

  get replyPopUpLocalTextToReply() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY
    );
  }

  get replyPopUpLocalTextToReplyValue() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE
    );
  }

  get replyPopUpRemoteTextToReply() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY
    );
  }

  get replyPopUpRemoteTextToReplyValue() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE
    );
  }

  get replyPopUpUserImage() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_USER_IMAGE);
  }

  get replyPopUpUserImageWrap() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_USER_IMAGE_WRAP);
  }

  async closeReplyModal() {
    await this.replyPopUpCloseButton.click();
  }

  async waitForReplyModalToNotExist() {
    await this.replyPopUp.waitForExist({ reverse: true });
  }
}

export default new ReplyPrompt();

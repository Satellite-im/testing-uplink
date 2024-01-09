require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { WINDOWS_DRIVER } from "@helpers/constants";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  REPLY_POPUP: '[name="inline-reply"]',
  REPLY_POPUP_CLOSE_BUTTON: '[name="close-reply"]',
  REPLY_POPUP_CONTENT: '[name="content"]',
  REPLY_POPUP_HEADER: '//Text[@Name="inline-reply-header"]/Text',
  REPLY_POPUP_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  REPLY_POPUP_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  REPLY_POPUP_INDICATOR_ONLINE: '[name="indicator-online"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: '[name="reply-text-message"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE: "<Text>",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: '[name="reply-text-message-remote"]',
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE: "<Text>",
  REPLY_POPUP_USER_IMAGE: '[name="User Image"]',
  REPLY_POPUP_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  REPLY_POPUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
};

const SELECTORS_MACOS = {
  REPLY_POPUP: "~inline-reply",
  REPLY_POPUP_CLOSE_BUTTON: "~close-reply",
  REPLY_POPUP_CONTENT: "~content",
  REPLY_POPUP_HEADER: "~inline-reply-header",
  REPLY_POPUP_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  REPLY_POPUP_INDICATOR_OFFLINE: "~indicator-offline",
  REPLY_POPUP_INDICATOR_ONLINE: "~indicator-online",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: "~reply-text-message",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: "~reply-text-message-remote",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  REPLY_POPUP_USER_IMAGE: "~User Image",
  REPLY_POPUP_USER_IMAGE_PROFILE: "~user-image-profile",
  REPLY_POPUP_USER_IMAGE_WRAP: "~user-image-wrap",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ReplyPrompt extends UplinkMainScreen {
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

  get replyPopUpIndicator() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_INDICATOR);
  }

  get replyPopUpIndicatorOffline() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_INDICATOR_OFFLINE);
  }

  get replyPopUpIndicatorOnline() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_INDICATOR_ONLINE);
  }

  get replyPopUpLocalTextToReply() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY,
    );
  }

  get replyPopUpLocalTextToReplyValue() {
    return $(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY)
      .$(SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE);
  }

  get replyPopUpRemoteTextToReply() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY,
    );
  }

  get replyPopUpRemoteTextToReplyValue() {
    return $(SELECTORS.REPLY_POPUP)
      .$(SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY)
      .$(SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE);
  }

  get replyPopUpUserImage() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_USER_IMAGE);
  }

  get replyPopUpUserImageProfile() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_USER_IMAGE_PROFILE);
  }

  get replyPopUpUserImageWrap() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_USER_IMAGE_WRAP);
  }

  async closeReplyModal() {
    const replyPopUpCloseButton = await this.replyPopUpCloseButton;
    await replyPopUpCloseButton.click();
  }

  async validateReplyPromptElementsShown(message: string) {
    const replyPopUp = await this.replyPopUp;
    const replyPopUpCloseButton = await this.replyPopUpCloseButton;
    const replyPopUpUserImage = await this.replyPopUpUserImage;
    const replyPopUpIndicator = await this.replyPopUpIndicator;

    await replyPopUp.waitForExist();
    await replyPopUpCloseButton.waitForExist();
    await replyPopUpUserImage.waitForExist();
    await replyPopUpIndicator.waitForExist();
    await expect(this.replyPopUpHeader).toHaveTextContaining("REPLYING TO:");
    await expect(this.replyPopUpRemoteTextToReplyValue).toHaveTextContaining(
      message,
    );
  }

  async waitForReplyModalToNotExist() {
    await driver.waitUntil(
      async () => {
        return await this.replyPopUp.waitForExist({ reverse: true });
      },
      {
        timeout: 15000,
        timeoutMsg: "Expected reply modal is still visible after 15 seconds",
      },
    );
  }
}

require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CALL_CONTROLS: '[name="call-controls"]',
  CALL_HANGUP_BUTTON: '[name="call-hangup-button"]',
  CALL_INFO: '[name="call-info"]',
  CALL_MIC_BUTTON: '[name="call-mic-button"]',
  CALL_NAME: '[name="call-name"]',
  CALL_NAME_TEXT: "//Text",
  CALL_SPEAKER_BUTTON: '[name="call-speaker-button"]',
  CALL_TIME: '[name="call-time"]',
  CALL_TIME_TEXT: "//Text",
  OUTGOING_CALL_LABEL: '[name="outgoing-call-label"]',
  OUTGOING_CALL_LABEL_TEXT: "//Text",
  PLUS_SOME: '[name="plus-some"]',
  REMOTE_CONTROLS: '[name="remote-controls"]',
  USER_IMAGE: '[name="User Image"]',
  USER_IMAGE_GROUP_WRAP: '[name="user-image-group-wrap"]',
  USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  USER_IMAGE_WRAP: '[name="user-image-wrap"]',
};

const SELECTORS_MACOS = {
  CALL_CONTROLS: "~call-controls",
  CALL_HANGUP_BUTTON: "~call-hangup-button",
  CALL_INFO: "~call-info",
  CALL_MIC_BUTTON: "~call-mic-button",
  CALL_NAME: "~call-name",
  CALL_NAME_TEXT: "//Text",
  CALL_SPEAKER_BUTTON: "~call-speaker-button",
  CALL_TIME: "~call-time",
  CALL_TIME_TEXT: "//Text",
  OUTGOING_CALL_LABEL: "~outgoing-call-label",
  OUTGOING_CALL_LABEL_TEXT: "//Text",
  PLUS_SOME: "~plus-some",
  REMOTE_CONTROLS: "~remote-controls",
  USER_IMAGE: "~User Image",
  USER_IMAGE_GROUP_WRAP: "~user-image-group-wrap",
  USER_IMAGE_PROFILE: "~user-image-profile",
  USER_IMAGE_WRAP: "~user-image-wrap",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class OutgoingCallModal extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.REMOTE_CONTROLS);
  }

  get callControls() {
    return this.remoteControls.$(SELECTORS.CALL_CONTROLS);
  }

  get callHangUpButton() {
    return this.callControls.$(SELECTORS.CALL_HANGUP_BUTTON);
  }

  get callInfo() {
    return this.remoteControls.$(SELECTORS.CALL_INFO);
  }

  get callMicButton() {
    return this.callControls.$(SELECTORS.CALL_MIC_BUTTON);
  }

  get callName() {
    return this.callInfo.$(SELECTORS.CALL_NAME);
  }

  get callNameText() {
    return this.callName.$(SELECTORS.CALL_NAME_TEXT);
  }

  get callSpeakerButton() {
    return this.callControls.$(SELECTORS.CALL_SPEAKER_BUTTON);
  }

  get callTime() {
    return this.callInfo.$(SELECTORS.CALL_TIME);
  }

  get callTimeText() {
    return this.callTime.$(SELECTORS.CALL_TIME_TEXT);
  }

  get outgoingCallLabel() {
    return $(SELECTORS.OUTGOING_CALL_LABEL);
  }

  get outgoingCallLabelText() {
    return this.outgoingCallLabel.$(SELECTORS.OUTGOING_CALL_LABEL_TEXT);
  }

  get plusSome() {
    return this.userImageWrap.$(SELECTORS.PLUS_SOME);
  }

  get remoteControls() {
    return $(SELECTORS.REMOTE_CONTROLS);
  }

  get userImageGroupWrap() {
    return this.callInfo.$(SELECTORS.USER_IMAGE_GROUP_WRAP);
  }

  get userImageWrap() {
    return this.userImageGroupWrap.$(SELECTORS.USER_IMAGE_WRAP);
  }

  get userImage() {
    return this.userImageWrap.$(SELECTORS.USER_IMAGE);
  }

  get userImageProfile() {
    return this.userImage.$(SELECTORS.USER_IMAGE_PROFILE);
  }

  async clickOnCallHangUpButton() {
    const hangUpButton = await this.callHangUpButton;
    await hangUpButton.click();
  }

  async clickOnCallMicButton() {
    const micButton = await this.callMicButton;
    await micButton.click();
  }

  async clickOnCallSpeakerButton() {
    const speakerButton = await this.callSpeakerButton;
    await speakerButton.click();
  }
}

require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CHAT_MESSAGE_REMOTE: '[name="message-remote"]',
  CHAT_MESSAGE_TEXT_GROUP: '//Group[starts-with(@Name, "message-text")]',
  CHAT_MESSAGE_TEXT_VALUE: "<Text>",
  EMOJI_REACTION_REMOTE: '[name="emoji-reaction-remote"]',
  EMOJI_REACTION_SELF: '[name="emoji-reaction-self"]',
  EMOJI_REACTION_VALUE: "<Text>",
  MESSAGE_GROUP_REMOTE: '[name="message-group-remote"]',
  MESSAGE_GROUP_WRAP_REMOTE: '[name="message-group-wrap-remote"]',
  MESSAGE_GROUP_TIME_AGO: '[name="time-ago"]',
  MESSAGE_GROUP_TIME_AGO_TEXT: "<Text>",
  MESSAGE_GROUP_USER_IMAGE: '[name="User Image"]',
  MESSAGE_GROUP_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  MESSAGE_GROUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  MESSAGE_GROUP_USER_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  MESSAGE_GROUP_USER_INDICATOR_DO_NOT_DISTURB:
    '[name="indicator-do-not-disturb"]',
  MESSAGE_GROUP_USER_INDICATOR_IDLE: '[name="indicator-idle"]',
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  MESSAGE_REACTION_CONTAINER: '[name="message-reaction-container"]',
  PIN_INDICATOR: '[name="pin-indicator"]',
};

const SELECTORS_MACOS = {
  CHAT_MESSAGE_REMOTE: "~message-remote",
  CHAT_MESSAGE_TEXT_GROUP:
    '//XCUIElementTypeGroup[starts-with(@label, "message-text")]',
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  EMOJI_REACTION_REMOTE: "~emoji-reaction-remote",
  EMOJI_REACTION_SELF: "~emoji-reaction-self",
  EMOJI_REACTION_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  MESSAGE_GROUP_REMOTE: "~message-group-remote",
  MESSAGE_GROUP_WRAP_REMOTE: "~message-group-wrap-remote",
  MESSAGE_GROUP_TIME_AGO: "~time-ago",
  MESSAGE_GROUP_TIME_AGO_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  MESSAGE_GROUP_USER_IMAGE: "~User Image",
  MESSAGE_GROUP_USER_IMAGE_PROFILE: "~user-image-profile",
  MESSAGE_GROUP_USER_IMAGE_WRAP: "~user-image-wrap",
  MESSAGE_GROUP_USER_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  MESSAGE_GROUP_USER_INDICATOR_DO_NOT_DISTURB: "~indicator-do-not-disturb",
  MESSAGE_GROUP_USER_INDICATOR_IDLE: "~indicator-idle",
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: "~indicator-offline",
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: "~indicator-online",
  MESSAGE_REACTION_CONTAINER: "~message-reaction-container",
  PIN_INDICATOR: "~pin-indicator",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class MessageGroupRemote extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE);
  }

  public get chatMessageRemote() {
    return $(SELECTORS.CHAT_MESSAGE_REMOTE);
  }

  public get chatMessageTextValue() {
    return $$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_TEXT_VALUE,
    );
  }

  public get chatMessageTextGroup() {
    return $$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
  }

  public get emojiReactionRemote() {
    return $$(SELECTORS.MESSAGE_REACTION_CONTAINER).$$(
      SELECTORS.EMOJI_REACTION_REMOTE,
    );
  }

  public get emojiReactionRemoteValue() {
    return $$(SELECTORS.MESSAGE_REACTION_CONTAINER)
      .$$(SELECTORS.EMOJI_REACTION_REMOTE)
      .$(SELECTORS.EMOJI_REACTION_VALUE);
  }

  public get emojiReactionSelf() {
    return $$(SELECTORS.MESSAGE_REACTION_CONTAINER).$$(
      SELECTORS.EMOJI_REACTION_SELF,
    );
  }

  public get emojiReactionSelfValue() {
    return $$(SELECTORS.MESSAGE_REACTION_CONTAINER)
      .$$(SELECTORS.EMOJI_REACTION_SELF)
      .$(SELECTORS.EMOJI_REACTION_VALUE);
  }

  public get messageGroupReceived() {
    return $$(SELECTORS.MESSAGE_GROUP_REMOTE);
  }

  public get messageGroupSent() {
    return $$(SELECTORS.MESSAGE_GROUP_SENT);
  }

  public get messageGroupWrapRemote() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE);
  }

  public get messageGroupTimeAgo() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE).$(
      SELECTORS.MESSAGE_GROUP_TIME_AGO,
    );
  }

  public get messageGroupTimeAgoValue() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO_TEXT);
  }

  public get messageGroupUserImage() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE);
  }

  public get messageGroupUserImageProfile() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE).$(
      SELECTORS.MESSAGE_GROUP_USER_IMAGE_PROFILE,
    );
  }

  public get messageGroupUserImageWrap() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE).$(
      SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP,
    );
  }

  public get messageGroupUserIndicator() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE)
      .$$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR);
  }

  public get messageGroupUserIndicatorDoNotDisturb() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_DO_NOT_DISTURB);
  }

  public get messageGroupUserIndicatorIdle() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_IDLE);
  }

  public get messageGroupUserIndicatorOffline() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_OFFLINE);
  }

  public get messageGroupUserIndicatorOnline() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE);
  }

  public get messageReactionContainer() {
    return $$(SELECTORS.MESSAGE_REACTION_CONTAINER);
  }

  public get pinIndicator() {
    return $$(SELECTORS.PIN_INDICATOR);
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
    await userImage.waitForExist();
    return userImage;
  }

  async getLastGroupWrapReceivedIndicator() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const indicator = await groupWrap.$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR);
    await indicator.waitForExist();
    return indicator;
  }

  async getLastGroupWrapReceivedDoNotDisturb() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const doNotDisturbStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_DO_NOT_DISTURB,
    );
    await doNotDisturbStatus.waitForExist();
    return doNotDisturbStatus;
  }

  async getLastGroupWrapReceivedIdle() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const idleStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_IDLE,
    );
    await idleStatus.waitForExist();
    return idleStatus;
  }

  async getLastGroupWrapReceivedOffline() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const offlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_OFFLINE,
    );
    await offlineStatus.waitForExist();
    return offlineStatus;
  }

  async getLastGroupWrapReceivedOnline() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const onlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE,
    );
    await onlineStatus.waitForExist();
    return onlineStatus;
  }

  // public get current status from last message received
  async getLastGroupWrapReceivedCurrentStatus() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const groupWrapIndicator = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR,
    );
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      return await groupWrapIndicator.getAttribute("label");
    } else if (currentDriver === WINDOWS_DRIVER) {
      return await groupWrapIndicator.getAttribute("name");
    }
  }

  // Group Messages Received Methods

  async getLastReceivedGroup() {
    const messageGroupsReceived = await this.messageGroupReceived;
    const lastGroupIndex = (await messageGroupsReceived.length) - 1;
    const lastGroupLocator = await messageGroupsReceived[lastGroupIndex];
    return lastGroupLocator;
  }

  async getLastMessageReceivedPinIndicator() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    await driver.waitUntil(
      async () => {
        return await lastGroupReceived.$(SELECTORS.PIN_INDICATOR);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected pin indicator was never added to received message after 15 seconds",
      },
    );

    const pinIndicator = await lastGroupReceived.$(SELECTORS.PIN_INDICATOR);
    return pinIndicator;
  }

  async getLastMessageReceivedTimeAgo() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const timeAgoText = await lastGroupReceived
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO_TEXT);
    await timeAgoText.waitForExist();
    return timeAgoText;
  }

  // Context Menu methods

  async openRemoteQuickProfile() {
    const imageToClick = await this.getLastGroupWrapReceivedIndicator();
    await this.hoverOnElement(imageToClick);
    await imageToClick.click();
  }

  // Reactions Methods

  async getLastMessageReceivedReactionsContainer() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const reactionContainers = await lastGroupReceived.$$(
      SELECTORS.MESSAGE_REACTION_CONTAINER,
    );
    const lastContainerIndex = (await reactionContainers.length) - 1;
    const lastContainerLocator = await reactionContainers[lastContainerIndex];
    return lastContainerLocator;
  }

  async getLastMessageReceivedRemoteReactions() {
    const reactionsContainer =
      await this.getLastMessageReceivedReactionsContainer();
    const remoteReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_REMOTE,
    );
    let results = [];
    for (let reaction of remoteReactions) {
      const reactionValue = await reaction.$(SELECTORS.EMOJI_REACTION_VALUE);
      const reactionValueText = await reactionValue.getText();
      results.push(reactionValueText);
    }
    return results;
  }

  async getLastMessageReceivedSelfReactions() {
    const reactionsContainer =
      await this.getLastMessageReceivedReactionsContainer();
    const selfReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_SELF,
    );
    let results = [];
    for (let reaction of selfReactions) {
      const reactionValue = await reaction.$(SELECTORS.EMOJI_REACTION_VALUE);
      const reactionValueText = await reactionValue.getText();
      results.push(reactionValueText);
    }
    return results;
  }

  async waitUntilEmojiReactionRemoteExists(expectedReaction: string) {
    const currentDriver = await this.getCurrentDriver();
    let emojiReactionLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      emojiReactionLocator =
        '-ios class chain:**/XCUIElementTypeGroup[`label BEGINSWITH "emoji-reaction-remote"`]/**/XCUIElementTypeStaticText[`value CONTAINS[cd] "' +
        expectedReaction +
        '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      emojiReactionLocator =
        '//Group[contains(@Name, "emoji-reaction-remote")]//Text[contains(@Name, "' +
        expectedReaction +
        '")]';
    }
    await driver.waitUntil(
      async () => {
        return await $(emojiReactionLocator);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected remote emoji reaction is still not displayed after 15 seconds",
      },
    );
  }

  async waitUntilEmojiReactionSelfExists(expectedReaction: string) {
    const currentDriver = await this.getCurrentDriver();
    let emojiReactionLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      emojiReactionLocator =
        '-ios class chain:**/XCUIElementTypeGroup[`label BEGINSWITH "emoji-reaction-self"`]/**/XCUIElementTypeStaticText[`value CONTAINS[cd] "' +
        expectedReaction +
        '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      emojiReactionLocator =
        '//Group[contains(@Name, "emoji-reaction-self")]/Text[contains(@Name, "' +
        expectedReaction +
        '")]';
    }
    await driver.waitUntil(
      async () => {
        return await $(emojiReactionLocator);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected self emoji reaction is still not displayed after 15 seconds",
      },
    );
  }

  // Pin Indicator validations

  async validateLastMessageReceivedHasPinIndicator() {
    const pinIndicator = await this.getLastMessageReceivedPinIndicator();
    await pinIndicator.waitForExist();
  }
}

export default new MessageGroupRemote();

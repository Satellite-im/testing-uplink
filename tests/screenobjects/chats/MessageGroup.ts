require("module-alias/register");
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CHAT_MESSAGE_LOCAL_FIRST: '[name="message-local-message-first"]',
  CHAT_MESSAGE_LOCAL_LAST: '[name="message-local-message-last"]',
  CHAT_MESSAGE_LOCAL_MIDDLE: '[name="message-local-message-middle"]',
  CHAT_MESSAGE_REMOTE_FIRST: '[name="message-remote-message-first"]',
  CHAT_MESSAGE_REMOTE_LAST: '[name="message-remote-message-last"]',
  CHAT_MESSAGE_REMOTE_MIDDLE: '[name="message-remote-message-middle"]',
  CHAT_MESSAGE_TEXT_GROUP: '[name="message-text"]',
  CHAT_MESSAGE_TEXT_VALUE: "<Text>",
  EMOJI_REACTION_REMOTE: '[name="emoji-reaction-remote"]',
  EMOJI_REACTION_SELF: '[name="emoji-reaction-self"]',
  EMOJI_REACTION_VALUE: "<Text>",
  MESSAGE_GROUP_REMOTE: '[name="message-group-remote"]',
  MESSAGE_GROUP_SENT: '[name="message-group"]',
  MESSAGE_GROUP_WRAP_LOCAL: '[name="message-group-wrap-local"]',
  MESSAGE_GROUP_WRAP_REMOTE: '[name="message-group-wrap-remote"]',
  MESSAGE_GROUP_TIME_AGO: '[name="time-ago"]',
  MESSAGE_GROUP_TIME_AGO_TEXT: "<Text>",
  MESSAGE_GROUP_USER_IMAGE: '[name="User Image"]',
  MESSAGE_GROUP_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  MESSAGE_GROUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  //
  MESSAGE_GROUP_USER_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  MESSAGE_REACTION_CONTAINER: '[name="message-reaction-container"]',
  PIN_INDICATOR: '[name="pin-indicator"]',
};

const SELECTORS_MACOS = {
  CHAT_MESSAGE_LOCAL_FIRST: "~message-local-message-first",
  CHAT_MESSAGE_LOCAL_LAST: "~message-local-message-last",
  CHAT_MESSAGE_LOCAL_MIDDLE: "~message-local-message-middle",
  CHAT_MESSAGE_REMOTE_FIRST: "~message-remote-message-first",
  CHAT_MESSAGE_REMOTE_LAST: "~message-remote-message-last",
  CHAT_MESSAGE_REMOTE_MIDDLE: "~message-remote-message-middle",
  CHAT_MESSAGE_TEXT_GROUP: "~message-text",
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  EMOJI_REACTION_REMOTE: "~emoji-reaction-remote",
  EMOJI_REACTION_SELF: "~emoji-reaction-self",
  EMOJI_REACTION_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  MESSAGE_GROUP_REMOTE: "~message-group-remote",
  MESSAGE_GROUP_SENT: "~message-group",
  MESSAGE_GROUP_WRAP_LOCAL: "~message-group-wrap-local",
  MESSAGE_GROUP_WRAP_REMOTE: "~message-group-wrap-remote",
  MESSAGE_GROUP_TIME_AGO: "~time-ago",
  MESSAGE_GROUP_TIME_AGO_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  MESSAGE_GROUP_USER_IMAGE: "~User Image",
  MESSAGE_GROUP_USER_IMAGE_PROFILE: "~user-image-profile",
  MESSAGE_GROUP_USER_IMAGE_WRAP: "~user-image-wrap",
  MESSAGE_GROUP_USER_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: "~indicator-offline",
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: "~indicator-online",
  MESSAGE_REACTION_CONTAINER: "~message-reaction-container",
  PIN_INDICATOR: "~pin-indicator",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class MessageGroup extends UplinkMainScreen {
  constructor(executor: string) {
    super(
      executor,
      SELECTORS.MESSAGE_GROUP_WRAP_REMOTE || SELECTORS.MESSAGE_GROUP_WRAP_SENT,
    );
  }

  get chatMessageLocalFirst() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_LOCAL_FIRST);
  }

  get chatMessageLocalLast() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_LOCAL_LAST);
  }

  get chatMessageLocalMiddle() {
    return this.instance.$$(SELECTORS.CHAT_MESSAGE_LOCAL_MIDDLE);
  }

  get chatMessageRemoteFirst() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_REMOTE_FIRST);
  }

  get chatMessageRemoteLast() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_REMOTE_LAST);
  }

  get chatMessageRemoteMiddle() {
    return this.instance.$$(SELECTORS.CHAT_MESSAGE_REMOTE_MIDDLE);
  }

  get chatMessageTextValue() {
    return this.instance
      .$$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
  }

  get chatMessageTextGroup() {
    return this.instance.$$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
  }

  get emojiReactionRemote() {
    return this.instance
      .$$(SELECTORS.MESSAGE_REACTION_CONTAINER)
      .$$(SELECTORS.EMOJI_REACTION_REMOTE);
  }

  get emojiReactionRemoteValue() {
    return this.instance
      .$$(SELECTORS.MESSAGE_REACTION_CONTAINER)
      .$$(SELECTORS.EMOJI_REACTION_REMOTE)
      .$(SELECTORS.EMOJI_REACTION_VALUE);
  }

  get emojiReactionSelf() {
    return this.instance
      .$$(SELECTORS.MESSAGE_REACTION_CONTAINER)
      .$$(SELECTORS.EMOJI_REACTION_SELF);
  }

  get emojiReactionSelfValue() {
    return this.instance
      .$$(SELECTORS.MESSAGE_REACTION_CONTAINER)
      .$$(SELECTORS.EMOJI_REACTION_SELF)
      .$(SELECTORS.EMOJI_REACTION_VALUE);
  }

  get messageGroupReceived() {
    return this.instance.$$(SELECTORS.MESSAGE_GROUP_REMOTE);
  }

  get messageGroupSent() {
    return this.instance.$$(SELECTORS.MESSAGE_GROUP_SENT);
  }

  get messageGroupWrapLocal() {
    return this.instance.$$(SELECTORS.MESSAGE_GROUP_WRAP_LOCAL);
  }

  get messageGroupWrapRemote() {
    return this.instance.$$(SELECTORS.MESSAGE_GROUP_WRAP_REMOTE);
  }

  get messageGroupTimeAgo() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO);
  }

  get messageGroupTimeAgoValue() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO_TEXT);
  }

  get messageGroupUserImage() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE);
  }

  get messageGroupUserImageProfile() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_PROFILE);
  }

  get messageGroupUserImageWrap() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP);
  }

  get messageGroupUserIndicator() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR);
  }

  get messageGroupUserIndicatorOffline() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_OFFLINE);
  }

  get messageGroupUserIndicatorOnline() {
    return this.instance
      .$$(SELECTORS.MESSAGE_GROUP_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE);
  }

  get messageReactionContainer() {
    return this.instance.$$(SELECTORS.MESSAGE_REACTION_CONTAINER);
  }

  get pinIndicator() {
    return this.instance.$$(SELECTORS.PIN_INDICATOR);
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

  async getLastGroupWrapReceivedOnline() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const onlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE,
    );
    await onlineStatus.waitForExist();
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
    await userImage.waitForExist();
    return userImage;
  }

  async getLastGroupWrapSentIndicator() {
    const groupWrap = await this.getLastGroupWrapSent();
    const indicator = await groupWrap.$(SELECTORS.MESSAGE_GROUP_USER_INDICATOR);
    await indicator.waitForExist();
    return indicator;
  }

  async getLastGroupWrapSentOnline() {
    const groupWrap = await this.getLastGroupWrapSent();
    const onlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_ONLINE,
    );
    await onlineStatus.waitForExist();
    return onlineStatus;
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
    await driver[this.executor].waitUntil(
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

  // Group Messages Sent Methods
  async getLastSentGroup() {
    const messageGroupsSent = await this.messageGroupSent;
    const lastGroupIndex = (await messageGroupsSent.length) - 1;
    const lastGroupLocator = await messageGroupsSent[lastGroupIndex];
    return lastGroupLocator;
  }

  async getLastMessageSentPinIndicator() {
    const lastGroupSent = await this.getLastSentGroup();
    await driver[this.executor].waitUntil(
      async () => {
        return await lastGroupSent.$(SELECTORS.PIN_INDICATOR);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected pin indicator was never added to sent message after 15 seconds",
      },
    );

    const pinIndicator = await lastGroupSent.$(SELECTORS.PIN_INDICATOR);
    return pinIndicator;
  }

  async getLastMessageSentTimeAgo() {
    const lastGroupSent = await this.getLastSentGroup();
    const timeAgoText = await lastGroupSent
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO)
      .$(SELECTORS.MESSAGE_GROUP_TIME_AGO_TEXT);
    await timeAgoText.waitForExist();
    return timeAgoText;
  }

  // Context Menu methods

  async openLocalQuickProfile() {
    const imageToClick = await this.getLastGroupWrapSentIndicator();
    await this.hoverOnElement(imageToClick);
    await imageToClick.click();
  }

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

  async getLastMessageSentReactionsContainer() {
    const lastGroupSent = await this.getLastSentGroup();
    const reactionContainers = await lastGroupSent.$$(
      SELECTORS.MESSAGE_REACTION_CONTAINER,
    );
    const lastContainerIndex = (await reactionContainers.length) - 1;
    const lastContainerLocator = await reactionContainers[lastContainerIndex];
    return lastContainerLocator;
  }

  async getLastMessageSentRemoteReactions() {
    const reactionsContainer =
      await this.getLastMessageSentReactionsContainer();
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

  async getLastMessageSentSelfReactions() {
    const reactionsContainer =
      await this.getLastMessageSentReactionsContainer();
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
    await driver[this.executor].waitUntil(
      async () => {
        return await this.instance.$(emojiReactionLocator);
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
    await driver[this.executor].waitUntil(
      async () => {
        return await this.instance.$(emojiReactionLocator);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected self emoji reaction is still not displayed after 15 seconds",
      },
    );
  }

  // Get messages locators from last message group received

  async getFirstMessageInLastGroupReceived() {
    const lastGroupSent = await this.getLastReceivedGroup();
    const firstMessage = await lastGroupSent.$(
      SELECTORS.CHAT_MESSAGE_LOCAL_FIRST,
    );
    return firstMessage;
  }

  async getLastMessageInLastGroupReceived() {
    const lastGroupSent = await this.getLastReceivedGroup();
    const lastMessage = await lastGroupSent.$(
      SELECTORS.CHAT_MESSAGE_LOCAL_LAST,
    );
    return lastMessage;
  }

  async getMiddleMessageInLastGroupReceived(index: number) {
    const lastGroupSent = await this.getLastReceivedGroup();
    const middleMessage = await lastGroupSent.$$(
      SELECTORS.CHAT_MESSAGE_LOCAL_MIDDLE,
    )[index];
    return middleMessage;
  }

  // Pin Indicator validations

  async validateLastMessageReceivedHasPinIndicator() {
    const pinIndicator = await this.getLastMessageReceivedPinIndicator();
    await pinIndicator.waitForExist();
  }
  async validateLastMessageSentHasPinIndicator() {
    const pinIndicator = await this.getLastMessageSentPinIndicator();
    await pinIndicator.waitForExist();
  }
}

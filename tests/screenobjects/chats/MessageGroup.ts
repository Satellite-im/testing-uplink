import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  EMOJI_REACTION_REMOTE: '[name="emoji-reaction-remote"]',
  EMOJI_REACTION_SELF: '[name="emoji-reaction-self"]',
  EMOJI_REACTION_VALUE: "//Text",
  MESSAGE_GROUP_REMOTE: '[name="message-group-remote"]',
  MESSAGE_GROUP_SENT: '[name="message-group"]',
  MESSAGE_GROUP_WRAP_LOCAL: '[name="message-group-wrap-local"]',
  MESSAGE_GROUP_WRAP_REMOTE: '[name="message-group-wrap-remote"]',
  MESSAGE_GROUP_TIME_AGO: '[name="time-ago"]',
  MESSAGE_GROUP_TIME_AGO_TEXT: "//Text",
  MESSAGE_GROUP_USER_IMAGE: '[name="User Image"]',
  MESSAGE_GROUP_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  MESSAGE_GROUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  MESSAGE_REACTION_CONTAINER: '[name="message-reaction-container"]',
};

const SELECTORS_MACOS = {
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
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: "~indicator-offline",
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: "~indicator-online",
  MESSAGE_REACTION_CONTAINER: "~message-reaction-container",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class MessageGroup extends UplinkMainScreen {
  constructor(executor: string) {
    super(
      executor,
      SELECTORS.MESSAGE_GROUP_WRAP_REMOTE || SELECTORS.MESSAGE_GROUP_WRAP_SENT
    );
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

  async getLastGroupWrapReceivedUserImageProfile() {
    const groupWrap = await this.getLastGroupWrapReceived();
    const userImageProfile = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_IMAGE_PROFILE
    );
    return userImageProfile;
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

  async getLastGroupWrapSentUserImageProfile() {
    const groupWrap = await this.getLastGroupWrapSent();
    const userImageProfile = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_IMAGE_PROFILE
    );
    return userImageProfile;
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
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(imageOnGroup, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(imageOnGroup, this.executor);
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
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(imageOnGroup, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(imageOnGroup, this.executor);
    }
  }

  // Context Menu methods

  async openLocalQuickProfile() {
    const imageToRightClick = await this.getLastGroupWrapSentOnline();
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(imageToRightClick, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(imageToRightClick, this.executor);
    }
  }

  async openRemoteQuickProfile() {
    const imageToRightClick = await this.getLastGroupWrapReceivedOnline();
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(imageToRightClick, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(imageToRightClick, this.executor);
    }
  }

  // Reactions Methods

  async getLastMessageReceivedReactionsContainer() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const reactionContainers = await lastGroupReceived.$$(
      SELECTORS.MESSAGE_REACTION_CONTAINER
    );
    const lastContainerIndex = (await reactionContainers.length) - 1;
    const lastContainerLocator = await reactionContainers[lastContainerIndex];
    return lastContainerLocator;
  }

  async getLastMessageReceivedRemoteReactions() {
    const reactionsContainer =
      await this.getLastMessageReceivedReactionsContainer();
    const remoteReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_REMOTE
    );
    let results = [];
    for (let reaction of remoteReactions) {
      const reactionValue = await reaction
        .$(SELECTORS.EMOJI_REACTION_VALUE)
        .getText();
      results.push(reactionValue);
    }
    return results;
  }

  async getLastMessageReceivedSelfReactions() {
    const reactionsContainer =
      await this.getLastMessageReceivedReactionsContainer();
    const selfReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_SELF
    );
    let results = [];
    for (let reaction of selfReactions) {
      const reactionValue = await reaction
        .$(SELECTORS.EMOJI_REACTION_VALUE)
        .getText();
      results.push(reactionValue);
    }
    return results;
  }

  async getLastMessageSentReactionsContainer() {
    const lastGroupSent = await this.getLastSentGroup();
    const reactionContainers = await lastGroupSent.$$(
      SELECTORS.MESSAGE_REACTION_CONTAINER
    );
    const lastContainerIndex = (await reactionContainers.length) - 1;
    const lastContainerLocator = await reactionContainers[lastContainerIndex];
    return lastContainerLocator;
  }

  async getLastMessageSentRemoteReactions() {
    const reactionsContainer =
      await this.getLastMessageSentReactionsContainer();
    const remoteReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_REMOTE
    );
    let results = [];
    for (let reaction of remoteReactions) {
      const reactionValue = await reaction
        .$(SELECTORS.EMOJI_REACTION_VALUE)
        .getText();
      results.push(reactionValue);
    }
    return results;
  }

  async getLastMessageSentSelfReactions() {
    const reactionsContainer =
      await this.getLastMessageSentReactionsContainer();
    const selfReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_SELF
    );
    let results = [];
    for (let reaction of selfReactions) {
      const reactionValue = await reaction
        .$(SELECTORS.EMOJI_REACTION_VALUE)
        .getText();
      results.push(reactionValue);
    }
    return results;
  }

  async removeReactionOnLastSentMessage(reaction: string) {
    const reactionsContainer =
      await this.getLastMessageSentReactionsContainer();
    const selfReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_SELF
    );
    for (let reaction of selfReactions) {
      const reactionValue = await reaction
        .$(SELECTORS.EMOJI_REACTION_VALUE)
        .getText();
      if (reactionValue.includes(reaction)) {
        await reaction.click();
      }
    }
  }

  async removeReactionOnLastReceivedMessage(reaction: string) {
    const reactionsContainer =
      await this.getLastMessageReceivedReactionsContainer();
    const selfReactions = await reactionsContainer.$$(
      SELECTORS.EMOJI_REACTION_SELF
    );
    for (let reaction of selfReactions) {
      const reactionValue = await reaction
        .$(SELECTORS.EMOJI_REACTION_VALUE)
        .getText();
      if (reactionValue.includes(reaction)) {
        await reaction.click();
      }
    }
  }
}

import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CHAT_MESSAGE: '[name="Message"]',
  CHAT_MESSAGE_FILE_BUTTON: '[name="attachment-button"]',
  CHAT_MESSAGE_FILE_EMBED: '[name="file-embed"]',
  CHAT_MESSAGE_FILE_EMBED_REMOTE: '[name="file-embed-remote"]',
  CHAT_MESSAGE_FILE_ICON: '[name="file-icon"]',
  CHAT_MESSAGE_FILE_INFO: '[name="file-info"]',
  CHAT_MESSAGE_FILE_META: '[name="file-meta"]',
  CHAT_MESSAGE_FILE_META_TEXT: "//Text",
  CHAT_MESSAGE_FILE_NAME: '[name="file-name"]',
  CHAT_MESSAGE_FILE_NAME_TEXT: "//Text",
  CHAT_MESSAGE_REPLY: '[name="message-reply"]',
  CHAT_MESSAGE_REPLY_TEXT: "//Text",
  CHAT_MESSAGE_TEXT_GROUP: '[name="message-text"]',
  CHAT_MESSAGE_TEXT_VALUE: "//Text",
  MESSAGE_GROUP_REMOTE: '[name="message-group-remote"]',
  MESSAGE_GROUP_SENT: '[name="message-group"]',
  MESSAGE_GROUP_WRAP: '[name="message-group-wrap"]',
  MESSAGE_GROUP_TIME_AGO: '[name="time-ago"]',
  MESSAGE_GROUP_TIME_AGO_TEXT: "//Text",
  MESSAGE_GROUP_USER_IMAGE: '[name="User Image"]',
  MESSAGE_GROUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  MESSAGE_GROUP_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  MESSAGE_GROUP_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
};

const SELECTORS_MACOS = {
  CHAT_MESSAGE: "~Message",
  CHAT_MESSAGE_FILE_BUTTON: "~attachment-button",
  CHAT_MESSAGE_FILE_EMBED: "~file-embed",
  CHAT_MESSAGE_FILE_EMBED_REMOTE: "~file-embed-remote",
  CHAT_MESSAGE_FILE_ICON: "~file-icon",
  CHAT_MESSAGE_FILE_INFO: "~file-info",
  CHAT_MESSAGE_FILE_META: "~file-meta",
  CHAT_MESSAGE_FILE_META_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_FILE_NAME: "~file-name",
  CHAT_MESSAGE_FILE_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_REPLY: "~message-reply",
  CHAT_MESSAGE_REPLY_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TEXT_GROUP: "~message-text",
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  MESSAGE_GROUP_REMOTE: "~message-group-remote",
  MESSAGE_GROUP_SENT: "~message-group",
  MESSAGE_GROUP_WRAP: "~message-group-wrap",
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
    super(SELECTORS.MESSAGE_GROUP_WRAP);
  }

  get chatMessage() {
    return $(SELECTORS.CHAT_MESSAGE);
  }

  get chatMessageFileButtonLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON
    );
  }

  get chatMessageFileButtonRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON
    );
  }

  get chatMessageFileEmbedLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED);
  }

  get chatMessageFileEmbedRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE);
  }

  get chatMessageFileIconLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON
    );
  }

  get chatMessageFileIconRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON
    );
  }

  get chatMessageFileInfoLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_INFO
    );
  }

  get chatMessageFileInfoRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_INFO
    );
  }

  get chatMessageFileMetaLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_META
    );
  }

  get chatMessageFileMetaRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_META
    );
  }

  get chatMessageFileMetaTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileMetaTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileNameLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME
    );
  }

  get chatMessageFileNameRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME
    );
  }

  get chatMessageFileNameTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  get chatMessageFileNameTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  get chatMessageReply() {
    return $(SELECTORS.CHAT_MESSAGE_REPLY);
  }

  get chatMessageReplyText() {
    return $(SELECTORS.CHAT_MESSAGE_REPLY).$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT);
  }

  get chatMessageTextValue() {
    return $$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_TEXT_VALUE
    );
  }

  get chatMessageTextGroup() {
    return $$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
  }

  get messageGroupReceived() {
    return $$(SELECTORS.MESSAGE_GROUP_REMOTE);
  }

  get messageGroupSent() {
    return $$(SELECTORS.MESSAGE_GROUP_SENT);
  }

  get messageGroupWrap() {
    return $$(SELECTORS.MESSAGE_GROUP_WRAP);
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

  // Message Group Wraps Methods

  async getLastGroupWrap() {
    const messageGroupWraps = await this.messageGroupWrap;
    const lastGroupWrapIndex = (await messageGroupWraps.length) - 1;
    const lastGroupWrap = await messageGroupWraps[lastGroupWrapIndex];
    return lastGroupWrap;
  }

  async getLastGroupWrapImage() {
    const groupWrap = await this.getLastGroupWrap();
    const userImage = await groupWrap
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE_WRAP)
      .$(SELECTORS.MESSAGE_GROUP_USER_IMAGE);
    return userImage;
  }

  async getLastGroupWrapOffline() {
    const groupWrap = await this.getLastGroupWrap();
    const offlineStatus = await groupWrap.$(
      SELECTORS.MESSAGE_GROUP_USER_INDICATOR_OFFLINE
    );
    return offlineStatus;
  }

  async getLastGroupWrapOnline() {
    const groupWrap = await this.getLastGroupWrap();
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

  // Messages Received Methods

  async getNumberOfMessagesInLastReceivedGroup() {
    const lastReceivedGroup = await this.getLastReceivedGroup();
    const messagesInGroup = await lastReceivedGroup.$$(SELECTORS.CHAT_MESSAGE);
    return messagesInGroup.length;
  }

  async getLastMessageReceivedLocator() {
    const lastReceivedGroup = await this.getLastReceivedGroup();
    const messagesInGroup = await lastReceivedGroup.$$(SELECTORS.CHAT_MESSAGE);
    const lastMessageIndex = (await messagesInGroup.length) - 1;
    const lastMessageLocator = await messagesInGroup[lastMessageIndex];
    return lastMessageLocator;
  }

  async getLastMessageReceivedText() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageText = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return lastMessageText;
  }

  async getLastMessageReceivedTextLocator() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageText = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return lastMessageText;
  }

  async waitForMessageToBeDeleted(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await $(
        '//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]'
      ).waitForExist({ timeout: timeoutMsg, reverse: true });
    } else if (currentDriver === "windows") {
      await $(
        '//Text[contains(@Name, "' + expectedMessage + '")]'
      ).waitForExist({ timeout: timeoutMsg, reverse: true });
    }
  }

  async waitForReceivingMessage(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await $(
        '//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]'
      ).waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === "windows") {
      await $(
        '//Text[contains(@Name, "' + expectedMessage + '")]'
      ).waitForExist({ timeout: timeoutMsg });
    }
  }

  // Messages Sent Methods

  async getLastMessageSentLocator() {
    const lastSentGroup = await this.getLastSentGroup();
    const messagesInGroup = await lastSentGroup.$$(SELECTORS.CHAT_MESSAGE);
    const lastMessageIndex = (await messagesInGroup.length) - 1;
    const lastMessageLocator = await messagesInGroup[lastMessageIndex];
    return lastMessageLocator;
  }

  async getLastMessageSentText() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageText = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return lastMessageText;
  }

  // Replies Methods

  async getLastReplyReceived() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const lastReplyReceived = await lastGroupReceived.$(
      SELECTORS.CHAT_MESSAGE_REPLY
    );
    return lastReplyReceived;
  }

  async getLastReplyReceivedText() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const lastReplyReceivedText = await lastGroupReceived
      .$(SELECTORS.CHAT_MESSAGE_REPLY)
      .$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT);
    return lastReplyReceivedText;
  }

  async getLastReplySent() {
    const lastGroupSent = await this.getLastSentGroup();
    const lastReplySent = await lastGroupSent.$(SELECTORS.CHAT_MESSAGE_REPLY);
    return lastReplySent;
  }

  async getLastReplySentText() {
    const lastGroupSent = await this.getLastSentGroup();
    const lastReplySentText = await lastGroupSent
      .$(SELECTORS.CHAT_MESSAGE_REPLY)
      .$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT);
    return lastReplySentText;
  }

  // Messages With Files Methods

  async getLastMessageReceivedDownloadButton() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const getLastMessageDownloadButton = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON
    );
    return getLastMessageDownloadButton;
  }

  async getLastMessageReceivedFileEmbed() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_EMBED
    );
    return lastMessageFileEmbed;
  }

  async getLastMessageReceivedFileIcon() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileIcon = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON
    );
    return lastMessageFileIcon;
  }

  async getLastMessageReceivedFileMeta() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileMeta = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
    return lastMessageFileMeta;
  }

  async getLastMessageReceivedFileName() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileName = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
    return lastMessageFileName;
  }

  async getLastMessageSentDownloadButton() {
    const lastMessage = await this.getLastMessageSentLocator();
    const getLastMessageSentDownloadButton = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON
    );
    return getLastMessageSentDownloadButton;
  }

  async getLastMessageSentFileEmbed() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_EMBED
    );
    return lastMessageFileEmbed;
  }

  async getLastMessageSentFileIcon() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileIcon = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON
    );
    return lastMessageFileIcon;
  }

  async getLastMessageSentFileMeta() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileMeta = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
    return lastMessageFileMeta;
  }

  async getLastMessageSentFileName() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileName = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
    return lastMessageFileName;
  }

  // Context Menu Functions

  async openContextMenuOnReceivedMessage() {
    const messageToClick = await this.getLastMessageReceivedLocator();
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(messageToClick);
    }
  }

  async openContextMenuOnSentMessage() {
    const messageToClick = await this.getLastMessageSentLocator();
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(messageToClick);
    }
  }
}

export default new Messages();

import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CHAT_MESSAGE_FILE_BUTTON: '[name="attachment-button"]',
  CHAT_MESSAGE_FILE_EMBED: '[name="file-embed"]',
  CHAT_MESSAGE_FILE_EMBED_REMOTE: '[name="file-embed-remote"]',
  CHAT_MESSAGE_FILE_ICON: '[name="file-icon"]',
  CHAT_MESSAGE_FILE_INFO: '[name="file-info"]',
  CHAT_MESSAGE_FILE_META: '[name="file-meta"]',
  CHAT_MESSAGE_FILE_META_TEXT: "//Text",
  CHAT_MESSAGE_FILE_NAME: '[name="file-name"]',
  CHAT_MESSAGE_FILE_NAME_TEXT: "//Text",
  CHAT_MESSAGE_LINK_EMBED: '[name="link-embed"]',
  CHAT_MESSAGE_LINK_EMBED_DETAILS: '[name="embed-details"]',
  CHAT_MESSAGE_LINK_EMBED_ICON: '[name="embed-icon"]',
  CHAT_MESSAGE_LINK_EMBED_TITLE: '[name="link-title"]',
  CHAT_MESSAGE_LOCAL: '[name="message-local"]',
  CHAT_MESSAGE_REMOTE: '[name="message-remote"]',
  CHAT_MESSAGE_REPLY: '[name="message-reply"]',
  CHAT_MESSAGE_REPLY_TEXT: "//Text",
  CHAT_MESSAGE_TEXT_GROUP: '[name="message-text"]',
  CHAT_MESSAGE_TEXT_VALUE: "//Text",
};

const SELECTORS_MACOS = {
  CHAT_MESSAGE_FILE_BUTTON: "~attachment-button",
  CHAT_MESSAGE_FILE_EMBED: "~file-embed",
  CHAT_MESSAGE_FILE_EMBED_REMOTE: "~file-embed-remote",
  CHAT_MESSAGE_FILE_ICON: "~file-icon",
  CHAT_MESSAGE_FILE_INFO: "~file-info",
  CHAT_MESSAGE_FILE_META: "~file-meta",
  CHAT_MESSAGE_FILE_META_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_FILE_NAME: "~file-name",
  CHAT_MESSAGE_FILE_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_LINK_EMBED: "~link-embed",
  CHAT_MESSAGE_LINK_EMBED_DETAILS: "~embed-details",
  CHAT_MESSAGE_LINK_EMBED_ICON: "~embed-icon",
  CHAT_MESSAGE_LINK_EMBED_TITLE: "~link-title",
  CHAT_MESSAGE_LOCAL: "~message-local",
  CHAT_MESSAGE_REMOTE: "~message-remote",
  CHAT_MESSAGE_REPLY: "~message-reply",
  CHAT_MESSAGE_REPLY_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TEXT_GROUP: "~message-text",
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class Messages extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_MESSAGE_LOCAL || SELECTORS.CHAT_MESSAGE_REMOTE);
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

  get chatMessageLinkEmbed() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED);
  }

  get chatMessageLinkEmbedDetails() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS
    );
  }

  get chatMessageLinkEmbedIcon() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON
    );
  }

  get chatMessageLinkEmbedTitle() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE
    );
  }

  get chatMessageLocal() {
    return $$(SELECTORS.CHAT_MESSAGE_LOCAL);
  }

  get chatMessageRemote() {
    return $$(SELECTORS.CHAT_MESSAGE_REMOTE);
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

  // Messages Received Methods

  async getMessageReceivedLocator(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await $(
        '//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]/../..'
      ).waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === "windows") {
      await $(
        '//Text[contains(@Name, "' + expectedMessage + '")]/../..'
      ).waitForExist({ timeout: timeoutMsg });
    }
  }

  async getLastMessageReceivedLocator() {
    const messages = await this.chatMessageRemote;
    const lastMessageIndex = (await messages.length) - 1;
    const lastMessage = await messages[lastMessageIndex];
    return lastMessage;
  }

  async getLastMessageReceivedText() {
    const message = await this.getLastMessageReceivedLocator();
    const messageText = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return messageText;
  }

  async getFirstMessageReceivedLocator() {
    const messages = await this.chatMessageRemote;
    const firstMessage = await messages[0];
    return firstMessage;
  }

  async getFirstMessageReceivedText() {
    const message = await this.getFirstMessageReceivedLocator();
    const messageText = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return messageText;
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

  async getMessageSentLocator(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await $(
        '//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]/../..'
      ).waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === "windows") {
      await $(
        '//Text[contains(@Name, "' + expectedMessage + '")]/../..'
      ).waitForExist({ timeout: timeoutMsg });
    }
  }

  async getLastMessageSentLocator() {
    const messages = await this.chatMessageLocal;
    const lastMessageIndex = (await messages.length) - 1;
    const lastMessage = await messages[lastMessageIndex];
    return lastMessage;
  }

  async getLastMessageSentText() {
    const message = await this.getLastMessageSentLocator();
    const messageText = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return messageText;
  }

  async getFirstMessageSentLocator() {
    const messages = await this.chatMessageLocal;
    const firstMessage = await messages[0];
    return firstMessage;
  }

  async getFirstMessageSentText() {
    const message = await this.getFirstMessageSentLocator();
    const messageText = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return messageText;
  }

  // Replies Methods

  async getLastReply() {
    const lastReply = await this.chatMessageReply;
    return lastReply;
  }

  async getLastReplyText() {
    const lastGroup = await this.chatMessageReply;
    const lastReplyText = await lastGroup.$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT);
    return lastReplyText;
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

  async openContextMenuOnReceivedMessage(message: string) {
    const messageToClick = await this.getMessageReceivedLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(messageToClick);
    }
  }

  async openContextMenuOnSentMessage(message: string) {
    const messageToClick = await this.getMessageSentLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(messageToClick);
    }
  }

  async openContextMenuOnLastReceived() {
    const messageToClick = await this.getLastMessageReceivedLocator();
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(messageToClick);
    }
  }

  async openContextMenuOnLastSent() {
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

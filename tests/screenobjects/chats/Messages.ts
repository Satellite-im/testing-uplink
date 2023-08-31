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
  CHAT_MESSAGE_FILE_BUTTON: '[name="attachment-button"]',
  CHAT_MESSAGE_FILE_EMBED: '[name="file-embed"]',
  CHAT_MESSAGE_FILE_EMBED_REMOTE: '[name="file-embed-remote"]',
  CHAT_MESSAGE_FILE_ICON: '[name="file-icon"]',
  CHAT_MESSAGE_FILE_INFO: '[name="file-info"]',
  CHAT_MESSAGE_FILE_META: '[name="file-meta"]',
  CHAT_MESSAGE_FILE_META_TEXT: "<Text>",
  CHAT_MESSAGE_FILE_NAME: '[name="file-name"]',
  CHAT_MESSAGE_FILE_NAME_TEXT: "<Text>",
  CHAT_MESSAGE_IMAGE_CONTAINER: "[name='message-image-container']",
  CHAT_MESSAGE_IMAGE_FILE: "[name='message-image']",
  CHAT_MESSAGE_IMAGE_MODAL: "[name='modal']",
  CHAT_MESSAGE_IMAGE_MODAL_FILE: "[name='image-preview-modal']",
  CHAT_MESSAGE_LINK_EMBED: '[name="link-embed"]',
  CHAT_MESSAGE_LINK_EMBED_DETAILS: '[name="embed-details"]',
  CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT: "<Text>",
  CHAT_MESSAGE_LINK_EMBED_ICON: '[name="embed-icon"]',
  CHAT_MESSAGE_LINK_EMBED_TITLE: '[name="link-title"]',
  CHAT_MESSAGE_LOCAL:
    '//Group[contains(@Name, "local") and starts-with(@Name, "message")]',
  CHAT_MESSAGE_LOCAL_FIRST: '[name="message-local-message-first"]',
  CHAT_MESSAGE_LOCAL_LAST: '[name="message-local-message-last"]',
  CHAT_MESSAGE_LOCAL_MIDDLE: '[name="message-local-message-middle"]',
  CHAT_MESSAGE_REMOTE:
    '//Group[contains(@Name, "remote") and starts-with(@Name, "message")]',
  CHAT_MESSAGE_REMOTE_FIRST: '[name="message-remote-message-first"]',
  CHAT_MESSAGE_REMOTE_LAST: '[name="message-remote-message-last"]',
  CHAT_MESSAGE_REMOTE_MIDDLE: '[name="message-remote-message-middle"]',
  CHAT_MESSAGE_REPLY: '[name="message-reply"]',
  CHAT_MESSAGE_REPLY_TEXT: "<Text>",
  CHAT_MESSAGE_TEXT_GROUP: '[name="message-text"]',
  CHAT_MESSAGE_TEXT_VALUE: "<Text>",
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
  CHAT_MESSAGE_IMAGE_CONTAINER: "~message-image-container",
  CHAT_MESSAGE_IMAGE_FILE: "~message-image",
  CHAT_MESSAGE_IMAGE_MODAL: "~modal",
  CHAT_MESSAGE_IMAGE_MODAL_FILE: "~image-preview-modal",
  CHAT_MESSAGE_LINK_EMBED: "~link-embed",
  CHAT_MESSAGE_LINK_EMBED_DETAILS: "~embed-details",
  CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_LINK_EMBED_ICON: "~embed-icon",
  CHAT_MESSAGE_LINK_EMBED_TITLE: "~link-title",
  CHAT_MESSAGE_LOCAL:
    '//XCUIElementTypeGroup[contains(@label, "local") and starts-with(@label, "message")]',
  CHAT_MESSAGE_LOCAL_FIRST: "~message-local-message-first",
  CHAT_MESSAGE_LOCAL_LAST: "~message-local-message-last",
  CHAT_MESSAGE_LOCAL_MIDDLE: "~message-local-message-middle",
  CHAT_MESSAGE_REMOTE:
    '//XCUIElementTypeGroup[contains(@label, "remote") and starts-with(@label, "message")]',
  CHAT_MESSAGE_REMOTE_FIRST: "~message-remote-message-first",
  CHAT_MESSAGE_REMOTE_LAST: "~message-remote-message-last",
  CHAT_MESSAGE_REMOTE_MIDDLE: "~message-remote-message-middle",
  CHAT_MESSAGE_REPLY: "~message-reply",
  CHAT_MESSAGE_REPLY_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TEXT_GROUP: "~message-text",
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class Messages extends UplinkMainScreen {
  constructor(executor: string) {
    super(
      executor,
      SELECTORS.CHAT_MESSAGE_LOCAL || SELECTORS.CHAT_MESSAGE_REMOTE
    );
  }

  get chatMessageFileButtonLocal() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_BUTTON);
  }

  get chatMessageFileButtonRemote() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_BUTTON);
  }

  get chatMessageFileEmbedLocal() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_FILE_EMBED);
  }

  get chatMessageFileEmbedRemote() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE);
  }

  get chatMessageFileIconLocal() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_ICON);
  }

  get chatMessageFileIconRemote() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_ICON);
  }

  get chatMessageFileInfoLocal() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_INFO);
  }

  get chatMessageFileInfoRemote() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_INFO);
  }

  get chatMessageFileMetaLocal() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META);
  }

  get chatMessageFileMetaRemote() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META);
  }

  get chatMessageFileMetaTextLocal() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileMetaTextRemote() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileNameLocal() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME);
  }

  get chatMessageFileNameRemote() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME);
  }

  get chatMessageFileNameTextLocal() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  get chatMessageFileNameTextRemote() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  get chatMessageImageContainer() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_IMAGE_CONTAINER);
  }

  get chatMessageImageFile() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_IMAGE_CONTAINER)
      .$(SELECTORS.CHAT_MESSAGE_IMAGE_FILE);
  }

  get chatMessageImageModal() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_IMAGE_MODAL);
  }

  get chatMessageImageModalFile() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_IMAGE_MODAL)
      .$(SELECTORS.CHAT_MESSAGE_IMAGE_MODAL_FILE);
  }

  get chatMessageLinkEmbed() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_LINK_EMBED);
  }

  get chatMessageLinkEmbedDetails() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS);
  }

  get chatMessageLinkEmbedIcon() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON);
  }

  get chatMessageLinkEmbedTitle() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE);
  }

  get chatMessageLocal() {
    return this.instance.$$(SELECTORS.CHAT_MESSAGE_LOCAL);
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

  get chatMessageRemote() {
    return this.instance.$$(SELECTORS.CHAT_MESSAGE_REMOTE);
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

  get chatMessageReply() {
    return this.instance.$(SELECTORS.CHAT_MESSAGE_REPLY);
  }

  get chatMessageReplyText() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_REPLY)
      .$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT);
  }

  get chatMessageTextValue() {
    return this.instance
      .$$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
  }

  get chatMessageTextGroup() {
    return this.instance.$$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
  }

  // Messages Received Methods

  async getMessageReceivedLocator(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[contains(@Name, "remote"]//Text[contains(@Name, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
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
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[@label="message-text"]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg, reverse: true });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[@Name="message-text"]//Text[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg, reverse: true });
    }
  }

  async waitForLinkSentToExist(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[contains(@label, "local")]//XCUIElementTypeLink[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[contains(@Name, "local")]//HyperLink[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }

  async waitForMessageSentToExist(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[contains(@label, "local")]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[contains(@Name, "local")]//Text[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }

  async waitForReceivingLink(
    expectedMessage: string,
    timeoutMsg: number = 60000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeLink[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[contains(@Name, "remote")]//HyperLink[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }

  async waitForReceivingMessage(
    expectedMessage: string,
    timeoutMsg: number = 60000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[contains(@Name, "remote")]//Text[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }

  // Messages Sent Methods

  async getMessageSentLocator(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[contains, (@label, "local")]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[contains, (@Name, "local")]//Text[contains(@Name, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
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

  // Messages With Links Methods
  async getLastMessageReceivedLinkEmbed() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageLinkEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED
    );
    return lastMessageLinkEmbed;
  }

  async getLastMessageReceivedLinkEmbedDetailsText() {
    const linkEmbedLastMessage = await this.getLastMessageReceivedLinkEmbed();
    const linkEmbedDetailsText = await linkEmbedLastMessage
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT);
    return linkEmbedDetailsText;
  }

  async getLastMessageReceivedLinkEmbedIcon() {
    const linkEmbedLastMessage = await this.getLastMessageReceivedLinkEmbed();
    const linkEmbedIcon = await linkEmbedLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON
    );
    return linkEmbedIcon;
  }

  async getLastMessageReceivedLinkEmbedIconTitle() {
    const linkEmbedIconLastMessage =
      await this.getLastMessageReceivedLinkEmbedIcon();
    const iconTitle = await linkEmbedIconLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE
    );
    return iconTitle;
  }

  async getLastMessageSentLinkEmbed() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageLinkEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED
    );
    return lastMessageLinkEmbed;
  }

  async getLastMessageSentLinkEmbedDetailsText() {
    const linkEmbedLastMessage = await this.getLastMessageSentLinkEmbed();
    const linkEmbedDetailsText = await linkEmbedLastMessage
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT);
    return linkEmbedDetailsText;
  }

  async getLastMessageSentLinkEmbedIcon() {
    const linkEmbedLastMessage = await this.getLastMessageSentLinkEmbed();
    const linkEmbedIcon = await linkEmbedLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON
    );
    return linkEmbedIcon;
  }

  async getLastMessageSentLinkEmbedIconTitle() {
    const linkEmbedIconLastMessage =
      await this.getLastMessageSentLinkEmbedIcon();
    const iconTitle = await linkEmbedIconLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE
    );
    return iconTitle;
  }

  // Context Menu Functions

  async openContextMenuOnReceivedMessage(message: string) {
    const messageToClick = await this.getMessageReceivedLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick, this.executor);
    }
  }

  async openContextMenuOnSentMessage(message: string) {
    const messageToClick = await this.getMessageSentLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick, this.executor);
    }
  }

  async openContextMenuOnLastReceived() {
    const messageToClick = await this.getLastMessageReceivedLocator();
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick, this.executor);
    }
  }

  async openContextMenuOnLastSent() {
    const messageToClick = await this.getLastMessageSentLocator();
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick, this.executor);
    }
  }

  // New message locators

  async getFirstLocalMessage() {
    const lastMessage = await this.chatMessageLocalFirst;
    return lastMessage;
  }

  async getLastLocalMessage() {
    const lastMessage = await this.chatMessageLocalLast;
    return lastMessage;
  }

  async getFirstRemoteMessage() {
    const lastMessage = await this.chatMessageRemoteFirst;
    return lastMessage;
  }

  async getLastRemoteMessage() {
    const lastMessage = await this.chatMessageRemoteLast;
    return lastMessage;
  }

  async getMiddleLocalMessageLocator(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//Group[@label="message-local-message-middle"]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[@Name="message-local-message-middle"]//Text[contains(@Name, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }

  async getMiddleRemoteMessageLocator(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[@label="message-remote-message-middle"]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[@Name="message-remote-message-middle"]//Text[contains(@Name, "' +
            expectedMessage +
            '")]/../..'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }

  async waitForMessageRemoteToExist(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[@label="message-remote-message-last"]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[@Name="message-remote-message-last"]//Text[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }

  async waitForMessageLocalToExist(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[@label="message-local-message-last"]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[@Name="message-local-message-last"]//Text[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ timeout: timeoutMsg });
    }
  }
}

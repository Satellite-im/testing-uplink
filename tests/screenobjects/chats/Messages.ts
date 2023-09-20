import "module-alias/register";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CHAT_MESSAGE_CODE_COPY_BUTTON: '[name="Copy"]',
  CHAT_MESSAGE_CODE_LANGUAGE: "<Text>",
  CHAT_MESSAGE_CODE_MESSAGES: "<Text>",
  CHAT_MESSAGE_CODE_PANE: "<Pane>",
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
  CHAT_MESSAGE_REMOTE:
    '//Group[contains(@Name, "remote") and starts-with(@Name, "message")]',
  CHAT_MESSAGE_REPLY: '[name="message-reply"]',
  CHAT_MESSAGE_REPLY_TEXT: "<Text>",
  CHAT_MESSAGE_TEXT_GROUP: '[name="message-text"]',
  CHAT_MESSAGE_TEXT_VALUE: "<Text>",
};

const SELECTORS_MACOS = {
  CHAT_MESSAGE_CODE_COPY_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  CHAT_MESSAGE_CODE_LANGUAGE:
    "//XCUIElementTypeGroup/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  CHAT_MESSAGE_CODE_MESSAGES: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_CODE_PANE: "-ios class chain:**/XCUIElementTypeGroup",
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
  CHAT_MESSAGE_REMOTE:
    '//XCUIElementTypeGroup[contains(@label, "remote") and starts-with(@label, "message")]',
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

  get chatMessageCodeCopyButton() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_COPY_BUTTON);
  }

  get chatMessageCodeLanguage() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE);
  }

  get chatMessageCodePane() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE);
  }

  get chatMessageCodePaneMessages() {
    return this.instance
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE)
      .$$(SELECTORS.CHAT_MESSAGE_CODE_MESSAGES);
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

  get chatMessageRemote() {
    return this.instance.$$(SELECTORS.CHAT_MESSAGE_REMOTE);
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

  async clickOnCopyCodeOfLastMessageReceived() {
    const element = await this.getLastMessageReceivedCodeCopyButton();
    await element.click();
  }

  async getLastMessageReceivedCodeCopyButton() {
    const message = await this.getLastMessageReceivedLocator();
    const messageCodeCopyButton = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_COPY_BUTTON);
    return messageCodeCopyButton;
  }

  async getLastMessageReceivedCodeLanguage() {
    const message = await this.getLastMessageReceivedLocator();
    const messageCodeLanguage = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE);
    return messageCodeLanguage;
  }

  async getLastMessageReceivedCodePane() {
    const message = await this.getLastMessageReceivedLocator();
    const messageCodePane = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE);
    return messageCodePane;
  }

  async getLastMessageReceivedCodeMessage() {
    const messageCodePane = await this.getLastMessageReceivedCodePane();
    let messageResult = "";
    const messageResultElements = await messageCodePane.$$(
      SELECTORS.CHAT_MESSAGE_CODE_MESSAGES
    );
    for (let element of messageResultElements) {
      const codeMessageText = await element.getText();
      messageResult += codeMessageText;
    }
    return messageResult;
  }

  async getMessageReceivedLocator(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const receivedElement = await this.instance.$(
        '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]/../..'
      );
      await receivedElement.waitForExist();
    } else if (currentDriver === WINDOWS_DRIVER) {
      const receivedElement = await this.instance.$(
        '//Group[contains(@Name, "remote"]//Text[contains(@Name, "' +
          expectedMessage +
          '")]/../..'
      );
      await receivedElement.waitForExist();
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

  async waitForCodeMessageSentToExist(
    expectedLanguage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = await this.instance.$(
        '//XCUIElementTypeGroup[contains(@label, "local")]//XCUIElementTypeStaticText[contains(@value, "' +
          expectedLanguage +
          '")]'
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await this.instance.$(
        '//Group[contains(@Name, "local")]//Text[contains(@Name, "' +
          expectedLanguage +
          '")]'
      );
    }
    await locator.waitForExist({ timeout: timeoutMsg });
  }

  async waitForMessageToBeDeleted(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[@label="message-text"]//XCUIElementTypeStaticText[contains(@value, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ reverse: true });
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.instance
        .$(
          '//Group[@Name="message-text"]//Text[contains(@Name, "' +
            expectedMessage +
            '")]'
        )
        .waitForExist({ reverse: true });
    }
  }

  async waitForLinkSentToExist(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const linkSent = await this.instance.$(
        '//XCUIElementTypeGroup[contains(@label, "local")]//XCUIElementTypeLink[contains(@value, "' +
          expectedMessage +
          '")]'
      );
      await linkSent.waitForExist();
    } else if (currentDriver === WINDOWS_DRIVER) {
      const linkSent = await this.instance.$(
        '//Group[contains(@Name, "local")]//HyperLink[contains(@Name, "' +
          expectedMessage +
          '")]'
      );
      await linkSent.waitForExist();
    }
  }

  async waitForMessageSentToExist(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const messageSent = await this.instance.$(
        '//XCUIElementTypeGroup[contains(@label, "local")]//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]'
      );
      await messageSent.waitForExist();
    } else if (currentDriver === WINDOWS_DRIVER) {
      const messageSent = await this.instance.$(
        '//Group[contains(@Name, "local")]//Text[contains(@Name, "' +
          expectedMessage +
          '")]'
      );
      await messageSent.waitForExist();
    }
  }

  async waitForReceivingCodeMessage(
    expectedLanguage: string,
    timeoutMsg: number = 60000
  ) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = await this.instance.$(
        '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeStaticText[contains(@value, "' +
          expectedLanguage +
          '")]'
      );
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await this.instance.$(
        '//Group[contains(@Name, "remote")]//Text[contains(@Name, "' +
          expectedLanguage +
          '")]'
      );
    }
    await locator.waitForExist({ timeout: timeoutMsg });
  }

  async waitForReceivingLink(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const receivedLink = await this.instance.$(
        '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeLink[contains(@value, "' +
          expectedMessage +
          '")]'
      );
      await receivedLink.waitForExist();
    } else if (currentDriver === WINDOWS_DRIVER) {
      const receivedLink = await this.instance.$(
        '//Group[contains(@Name, "remote")]//HyperLink[contains(@Name, "' +
          expectedMessage +
          '")]'
      );
      await receivedLink.waitForExist();
    }
  }

  async waitForReceivingMessage(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const receivedMessage = await this.instance.$(
        '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]'
      );
      await receivedMessage.waitForExist();
    } else if (currentDriver === WINDOWS_DRIVER) {
      const receivedMessage = await this.instance.$(
        '//Group[contains(@Name, "remote")]//Text[contains(@Name, "' +
          expectedMessage +
          '")]'
      );
      await receivedMessage.waitForExist();
    }
  }

  // Messages Sent Methods

  async clickOnCopyCodeOfLastMessageSent() {
    const copyButton = await this.getLastMessageSentCodeCopyButton();
    await this.hoverOnElement(copyButton);
    await copyButton.click();
  }

  async getLastMessageSentCodeCopyButton() {
    const message = await this.getLastMessageSentLocator();
    const messageCodeCopyButton = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_COPY_BUTTON);
    return messageCodeCopyButton;
  }

  async getLastMessageSentCodeLanguage() {
    const message = await this.getLastMessageSentLocator();
    const messageCodeLanguage = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE);
    return messageCodeLanguage;
  }

  async getLastMessageSentCodePane() {
    const message = await this.getLastMessageSentLocator();
    const messageCodePane = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE);
    return messageCodePane;
  }

  async getLastMessageSentCodeMessage() {
    const messageCodePane = await this.getLastMessageSentCodePane();
    let messageResult = "";
    const messageResultElements = await messageCodePane.$$(
      SELECTORS.CHAT_MESSAGE_CODE_MESSAGES
    );
    for (let element of messageResultElements) {
      const codeMessageText = await element.getText();
      messageResult += codeMessageText;
    }
    return messageResult;
  }

  async getMessageSentLocator(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const messageSent = await this.instance.$(
        '//XCUIElementTypeGroup[contains, (@label, "local")]//XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]/../..'
      );
      await messageSent.waitForExist();
    } else if (currentDriver === WINDOWS_DRIVER) {
      const messageSent = await this.instance.$(
        '//Group[contains, (@Name, "local")]//Text[contains(@Name, "' +
          expectedMessage +
          '")]/../..'
      );
      await messageSent.waitForExist();
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
    const lastMessageFileIcon = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON
    );
    await this.hoverOnElement(lastMessageFileIcon);
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
    const lastMessageFileIcon = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON
    );
    await this.hoverOnElement(lastMessageFileIcon);
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
}

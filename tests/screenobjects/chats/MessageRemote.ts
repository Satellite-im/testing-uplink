require("module-alias/register");
import { faker } from "@faker-js/faker";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import {
  getUplinkWindowHandle,
  rightClickOnMacOS,
  rightClickOnWindows,
  saveFileOnMacOS,
  saveFileOnWindows,
} from "@helpers/commands";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

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
  CHAT_MESSAGE_REMOTE: '[name="message-remote"]',
  CHAT_MESSAGE_REPLY: '[name="message-reply"]',
  CHAT_MESSAGE_REPLY_TEXT: "<Text>",
  CHAT_MESSAGE_TEXT_GROUP: '//Group[starts-with(@Name, "message-text")]',
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
  CHAT_MESSAGE_REMOTE: "~message-remote",
  CHAT_MESSAGE_REPLY: "~message-reply",
  CHAT_MESSAGE_REPLY_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TEXT_GROUP:
    '//XCUIElementTypeGroup[starts-with(@label, "message-text")]',
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class MessageRemote extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_MESSAGE_REMOTE);
  }

  get chatMessageCodeCopyButton() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_CODE_COPY_BUTTON,
    );
  }

  get chatMessageCodeLanguage() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE,
    );
  }

  get chatMessageCodePane() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_CODE_PANE,
    );
  }

  get chatMessageCodePaneMessages() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE)
      .$$(SELECTORS.CHAT_MESSAGE_CODE_MESSAGES);
  }

  get chatMessageFileButtonRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON,
    );
  }

  get chatMessageFileEmbedRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE);
  }

  get chatMessageFileIconRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON,
    );
  }

  get chatMessageFileInfoRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_INFO,
    );
  }

  get chatMessageFileMetaRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_META,
    );
  }

  get chatMessageFileMetaTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileNameRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME,
    );
  }

  get chatMessageFileNameTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  get chatMessageImageContainer() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_CONTAINER);
  }

  get chatMessageImageFile() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_CONTAINER).$(
      SELECTORS.CHAT_MESSAGE_IMAGE_FILE,
    );
  }

  get chatMessageImageModal() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_MODAL);
  }

  get chatMessageImageModalFile() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_MODAL).$(
      SELECTORS.CHAT_MESSAGE_IMAGE_MODAL_FILE,
    );
  }

  get chatMessageLinkEmbed() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED);
  }

  get chatMessageLinkEmbedDetails() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS,
    );
  }

  get chatMessageLinkEmbedIcon() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON,
    );
  }

  get chatMessageLinkEmbedTitle() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE,
    );
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
      SELECTORS.CHAT_MESSAGE_TEXT_VALUE,
    );
  }

  get chatMessageTextGroup() {
    return $$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
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
    const messageText = await message.$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
    const messageCodeLanguage = await messageText.$(
      SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE,
    );
    return messageCodeLanguage;
  }

  async getLastMessageReceivedCodePane() {
    const message = await this.getLastMessageReceivedLocator();
    const messageCodePane = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE);
    await messageCodePane.waitForExist();
    return messageCodePane;
  }

  async getLastMessageReceivedCodeMessage() {
    const messageCodePane = await this.getLastMessageReceivedCodePane();
    let messageResult = "";
    const messageResultElements = await messageCodePane.$$(
      SELECTORS.CHAT_MESSAGE_CODE_MESSAGES,
    );
    for (let element of messageResultElements) {
      const codeMessageText = await element.getText();
      messageResult += codeMessageText;
    }
    return messageResult;
  }

  async getMessageReceivedLocator(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      locator =
        '-ios class chain:**/XCUIElementTypeGroup[`label BEGINSWITH "message-remote"`]/**/XCUIElementTypeStaticText[`value BEGINSWITH "' +
        expectedMessage +
        '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator =
        '//Group[contains(@Name, "remote"]//Text[contains(@Name, "' +
        expectedMessage +
        '")]/../..';
    }
    const messageReceived = await $(locator);
    await messageReceived.waitForExist();
    return messageReceived;
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
    await messageText.waitForExist();
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
    await messageText.waitForExist();
    return messageText;
  }

  async waitForMessageToBeDeleted(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    await driver.waitUntil(
      async () => {
        if (currentDriver === MACOS_DRIVER) {
          return await $(`~message-text-${expectedMessage}`).waitForExist({
            reverse: true,
          });
        } else if (currentDriver === WINDOWS_DRIVER) {
          return await $(
            `[name="message-text-${expectedMessage}"]`,
          ).waitForExist({ reverse: true });
        }
      },
      {
        timeout: 15000,
        timeoutMsg: "Expected message was not deleted after 15 seconds",
      },
    );
  }

  async waitForReceivingCodeMessage(expectedLanguage: string) {
    const currentDriver = await this.getCurrentDriver();
    let codeMessageReceivedLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      codeMessageReceivedLocator =
        '//XCUIElementTypeGroup[contains(@label, "remote")]//XCUIElementTypeStaticText[contains(@value, "' +
        expectedLanguage +
        '")]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      codeMessageReceivedLocator =
        '//Group[contains(@Name, "remote")]//Text[contains(@Name, "' +
        expectedLanguage +
        '")]';
    }
    await driver.waitUntil(async () => {
      return await $(codeMessageReceivedLocator).waitForExist({
        timeout: 45000,
        timeoutMsg:
          "Expected message with code markdown was not found after 45 seconds",
      });
    });
  }

  async waitForReceivingLink(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let linkReceivedLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      linkReceivedLocator =
        '-ios class chain:**/XCUIElementTypeLink/XCUIElementTypeStaticText[`value BEGINSWITH "' +
        expectedMessage +
        '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      linkReceivedLocator =
        '//HyperLink[contains(@Name, "' + expectedMessage + '")]';
    }
    await driver.waitUntil(async () => {
      return await $(linkReceivedLocator).waitForExist({
        timeout: 45000,
        timeoutMsg: "Expected message with link was not found after 45 seconds",
      });
    });
  }

  async waitForReceivingMessage(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let receivedMessageLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      receivedMessageLocator =
        '-ios class chain:**/XCUIElementTypeGroup[`label BEGINSWITH "message-remote"`]/**/XCUIElementTypeStaticText[`value BEGINSWITH "' +
        expectedMessage +
        '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      receivedMessageLocator =
        '//Group[contains(@Name, "remote")]//Text[contains(@Name, "' +
        expectedMessage +
        '")]';
    }
    await driver.waitUntil(async () => {
      return await $(receivedMessageLocator).waitForExist({
        timeout: 45000,
        timeoutMsg: "Expected message was not found after 45 seconds",
      });
    });
  }

  // Replies Methods

  async getLastReply() {
    const lastReply = await this.chatMessageReply;
    await lastReply.waitForExist();
    return lastReply;
  }

  async getLastReplyText() {
    const lastGroup = await this.chatMessageReply;
    const lastReplyText = await lastGroup.$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT);
    await lastReplyText.waitForExist();
    return lastReplyText;
  }

  // Download files methods

  async downloadLastReceivedFile(extension: string) {
    // Generate a random filename for downloaded file
    const filename = faker.lorem.word(5) + extension;

    // First, obtain image locator and hover on it
    await this.hoverOnLastFileReceived();

    // Now with button visible, get download button from last received file
    const downloadButton = await this.getLastMessageReceivedDownloadButton();

    // Finally, depending on the driver running, execute the custom command to download file
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await downloadButton.click();
      await saveFileOnMacOS(filename);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const uplinkContext = await getUplinkWindowHandle();
      await downloadButton.click();
      await saveFileOnWindows(filename, uplinkContext);
    }
  }

  // Hover on Last Message With Files Methods

  async hoverOnLastFileReceived() {
    const imageToDownload = await this.getLastMessageReceivedFileEmbed();
    await this.hoverOnElement(imageToDownload);
  }

  // Messages With Files Methods

  async getLastMessageReceivedDownloadButton() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const getLastMessageDownloadButton = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON,
    );
    await getLastMessageDownloadButton.waitForExist();
    return getLastMessageDownloadButton;
  }

  async getLastMessageReceivedFileEmbed() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE,
    );
    await lastMessageFileEmbed.waitForExist();
    return lastMessageFileEmbed;
  }

  async getLastMessageReceivedFileIcon() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileIcon = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON,
    );
    await lastMessageFileIcon.waitForExist();
    return lastMessageFileIcon;
  }

  async getLastMessageReceivedFileMeta() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileMeta = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
    await lastMessageFileMeta.waitForExist();
    return lastMessageFileMeta;
  }

  async getLastMessageReceivedFileName() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileName = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
    await lastMessageFileName.waitForExist();
    return lastMessageFileName;
  }

  // Messages With Links Methods
  async getLastMessageReceivedLinkEmbed() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageLinkEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED,
    );
    await lastMessageLinkEmbed.waitForExist({ timeout: 30000 });
    return lastMessageLinkEmbed;
  }

  async getLastMessageReceivedLinkEmbedDetailsText() {
    const linkEmbedLastMessage = await this.getLastMessageReceivedLinkEmbed();
    const linkEmbedDetailsText = await linkEmbedLastMessage
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT);
    await linkEmbedDetailsText.waitForExist();
    return linkEmbedDetailsText;
  }

  async getLastMessageReceivedLinkEmbedIcon() {
    const linkEmbedLastMessage = await this.getLastMessageReceivedLinkEmbed();
    const linkEmbedIcon = await linkEmbedLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON,
    );
    await linkEmbedIcon.waitForExist();
    return linkEmbedIcon;
  }

  async getLastMessageReceivedLinkEmbedIconTitle() {
    const linkEmbedIconLastMessage =
      await this.getLastMessageReceivedLinkEmbedIcon();
    const iconTitle = await linkEmbedIconLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE,
    );
    await iconTitle.waitForExist();
    return iconTitle;
  }

  // Context Menu Functions

  async openContextMenuOnReceivedMessage(message: string) {
    const messageToClick = await this.getMessageReceivedLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick);
    }
  }

  async hoverOnLastReceivedMessage() {
    const messageToClick = await this.getLastMessageReceivedLocator();
    await this.hoverOnElement(messageToClick);
    await driver.pause(10000);
  }

  async openContextMenuOnLastReceived() {
    const messageToClick = await this.getLastMessageReceivedLocator();
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick);
    }
  }

  // Click on last message received
  async clickOnLastReceivedMessage() {
    const messageToClick = await this.getLastMessageReceivedLocator();
    await this.hoverOnElement(messageToClick);
    await messageToClick.click();
  }
}

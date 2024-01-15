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
  CHAT_MESSAGE_LOCAL: '[name="message-local"]',
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
  CHAT_MESSAGE_LOCAL: "~message-local",
  CHAT_MESSAGE_REPLY: "~message-reply",
  CHAT_MESSAGE_REPLY_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TEXT_GROUP: "~message-text",
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class MessageLocal extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_MESSAGE_LOCAL);
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

  get chatMessageFileButtonLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON,
    );
  }

  get chatMessageFileEmbedLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED);
  }

  get chatMessageFileIconLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON,
    );
  }

  get chatMessageFileInfoLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_INFO,
    );
  }

  get chatMessageFileMetaLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_META,
    );
  }

  get chatMessageFileMetaTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileNameLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME,
    );
  }

  get chatMessageFileNameTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
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

  get chatMessageLocal() {
    return $$(SELECTORS.CHAT_MESSAGE_LOCAL);
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

  // Message Local Methods

  async waitForCodeMessageSentToExist(expectedLanguage: string) {
    const currentDriver = await this.getCurrentDriver();
    let codeMessageLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      codeMessageLocator =
        '//XCUIElementTypeGroup[contains(@label, "local")]//XCUIElementTypeStaticText[contains(@value, "' +
        expectedLanguage +
        '")]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      codeMessageLocator =
        '//Group[contains(@Name, "local")]//Text[contains(@Name, "' +
        expectedLanguage +
        '")]';
    }
    const codeMessage = await $(codeMessageLocator);
    await codeMessage.waitForExist();
  }

  async waitForMessageToBeDeleted(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    await driver.waitUntil(
      async () => {
        if (currentDriver === MACOS_DRIVER) {
          return await $(
            '-ios class chain:**/XCUIElementTypeGroup[`label BEGINSWITH "message-text"`]/**/XCUIElementTypeStaticText[`value BEGINSWITH "' +
              expectedMessage +
              '"`]',
          ).waitForExist({ reverse: true });
        } else if (currentDriver === WINDOWS_DRIVER) {
          return await $(
            '//Group[@Name="message-text"]//Text[contains(@Name, "' +
              expectedMessage +
              '")]',
          ).waitForExist({ reverse: true });
        }
      },
      {
        timeout: 15000,
        timeoutMsg: "Expected message was not deleted after 15 seconds",
      },
    );
  }

  async waitForLinkSentToExist(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let linkSentLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      linkSentLocator =
        '-ios class chain:**/XCUIElementTypeLink/XCUIElementTypeStaticText[`value BEGINSWITH "' +
        expectedMessage +
        '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      linkSentLocator =
        '//HyperLink[contains(@Name, "' + expectedMessage + '")]';
    }
    await driver.waitUntil(async () => {
      return await $(linkSentLocator).waitForExist({
        timeout: 45000,
        timeoutMsg: "Expected message with link was not found after 45 seconds",
      });
    });
  }

  async waitForMessageSentToExist(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let messageSentLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      messageSentLocator =
        '-ios class chain:**/XCUIElementTypeGroup[`label BEGINSWITH "message-local"`]/**/XCUIElementTypeStaticText[`value BEGINSWITH "' +
        expectedMessage +
        '"`]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      messageSentLocator =
        '//Group[contains(@Name, "local")]//Text[contains(@Name, "' +
        expectedMessage +
        '")]';
    }
    await driver.waitUntil(async () => {
      return await $(messageSentLocator).waitForExist({
        timeout: 45000,
        timeoutMsg: "Expected message sent was not found after 45 seconds",
      });
    });
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
    await messageCodeCopyButton.waitForExist();
    return messageCodeCopyButton;
  }

  async getLastMessageSentCodeLanguage() {
    const message = await this.getLastMessageSentLocator();
    const messageText = await message.$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
    const messageCodeLanguage = await messageText.$(
      SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE,
    );
    await messageCodeLanguage.waitForExist();
    return messageCodeLanguage;
  }

  async getLastMessageSentCodePane() {
    const message = await this.getLastMessageSentLocator();
    const messageCodePane = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE);
    await messageCodePane.waitForExist();
    return messageCodePane;
  }

  async getLastMessageSentCodeMessage() {
    const messageCodePane = await this.getLastMessageSentCodePane();
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

  async getMessageSentLocator(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let messageSentLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      messageSentLocator =
        '//XCUIElementTypeGroup[contains, (@label, "local")]//XCUIElementTypeStaticText[contains(@value, "' +
        expectedMessage +
        '")]/../..';
    } else if (currentDriver === WINDOWS_DRIVER) {
      messageSentLocator =
        '//Group[contains, (@Name, "local")]//Text[contains(@Name, "' +
        expectedMessage +
        '")]/../..';
    }
    const messageSent = await $(messageSentLocator);
    await messageSent.waitForExist();
    return messageSent;
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
    await messageText.waitForExist();
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
    await messageText.waitForExist();
    return messageText;
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

  async downloadLastSentFile(extension: string) {
    // Generate a random filename for downloaded file
    const filename = faker.lorem.word(6) + extension;

    // First, obtain image locator and hover on it
    await this.hoverOnLastFileSent();

    // Now with button visible, get download button from last sent file
    const downloadButton = await this.getLastMessageSentDownloadButton();

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

  async hoverOnLastFileSent() {
    const imageToDownload = await this.getLastMessageSentFileEmbed();
    await this.hoverOnElement(imageToDownload);
  }

  // Messages With Files Methods

  async getLastMessageSentDownloadButton() {
    const lastMessage = await this.getLastMessageSentLocator();
    const getLastMessageSentDownloadButton = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON,
    );
    await getLastMessageSentDownloadButton.waitForExist();
    return getLastMessageSentDownloadButton;
  }

  async getLastMessageSentFileEmbed() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_EMBED,
    );
    await lastMessageFileEmbed.waitForExist();
    return lastMessageFileEmbed;
  }

  async getLastMessageSentFileIcon() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileIcon = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON,
    );
    await lastMessageFileIcon.waitForExist();
    return lastMessageFileIcon;
  }

  async getLastMessageSentFileMeta() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileMeta = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
    await lastMessageFileMeta.waitForExist();
    return lastMessageFileMeta;
  }

  async getLastMessageSentFileName() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileName = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
    await lastMessageFileName.waitForExist();
    return lastMessageFileName;
  }

  // Messages With Links Methods

  async getLastMessageSentLinkEmbed() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageLinkEmbed = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED,
    );
    await lastMessageLinkEmbed.waitForExist({ timeout: 30000 });
    return lastMessageLinkEmbed;
  }

  async getLastMessageSentLinkEmbedDetailsText() {
    const linkEmbedLastMessage = await this.getLastMessageSentLinkEmbed();
    const linkEmbedDetailsText = await linkEmbedLastMessage
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT);
    await linkEmbedDetailsText.waitForExist();
    return linkEmbedDetailsText;
  }

  async getLastMessageSentLinkEmbedIcon() {
    const linkEmbedLastMessage = await this.getLastMessageSentLinkEmbed();
    const linkEmbedIcon = await linkEmbedLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON,
    );
    await linkEmbedIcon.waitForExist();
    return linkEmbedIcon;
  }

  async getLastMessageSentLinkEmbedIconTitle() {
    const linkEmbedIconLastMessage =
      await this.getLastMessageSentLinkEmbedIcon();
    const iconTitle = await linkEmbedIconLastMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE,
    );
    await iconTitle.waitForExist();
    return iconTitle;
  }

  // Context Menu Functions

  async openContextMenuOnSentMessage(message: string) {
    const messageToClick = await this.getMessageSentLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick);
    }
  }

  async openContextMenuOnLastSent() {
    const messageToClick = await this.getLastMessageSentLocator();
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick);
    }
  }

  // Click on last message sent

  async clickOnLastSentMessage() {
    const messageToClick = await this.getLastMessageSentLocator();
    await this.hoverOnElement(messageToClick);
    await messageToClick.click();
  }
}

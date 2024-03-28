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
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {};

const SELECTORS_WINDOWS: selectorContainer = {
  CHAT_MESSAGE_CODE_COPY_BUTTON: '[name="Copy"]',
  CHAT_MESSAGE_CODE_LANGUAGE_GROUP: "//Group[2]/Group",
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
  SHARED_DID_IDENTITY_BANNER_IMAGE: "[name='banner-image']",
  SHARED_DID_IDENTITY_EMBED_IDENTITY_BUTTON: "[name='embed-identity-button']",
  SHARED_DID_IDENTITY_HEADER: "[name='identity-header']",
  SHARED_DID_IDENTITY_PROFILE_IMAGE: "[name='profile-image']",
  SHARED_DID_IDENTITY_PROFILE_NAME: "[name='profile-name']",
  SHARED_DID_IDENTITY_PROFILE_NAME_VALUE: "[name='profile-name-value']",
  SHARED_DID_IDENTITY_PROFILE_NAME_VALUE_TEXT: "<Text>",
};

const SELECTORS_MACOS: selectorContainer = {
  CHAT_MESSAGE_CODE_COPY_BUTTON: "-ios class chain:**/XCUIElementTypeButton",
  CHAT_MESSAGE_CODE_LANGUAGE: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_CODE_LANGUAGE_GROUP:
    "-ios class chain:**/XCUIElementTypeGroup[2]/XCUIElementTypeGroup",
  CHAT_MESSAGE_CODE_MESSAGES: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_CODE_PANE:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeGroup",
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
  SHARED_DID_IDENTITY_BANNER_IMAGE: "~banner-image",
  SHARED_DID_IDENTITY_EMBED_IDENTITY_BUTTON: "~embed-identity-button",
  SHARED_DID_IDENTITY_HEADER: "~identity-header",
  SHARED_DID_IDENTITY_PROFILE_IMAGE: "~profile-image",
  SHARED_DID_IDENTITY_PROFILE_NAME: "~profile-name",
  SHARED_DID_IDENTITY_PROFILE_NAME_VALUE: "~profile-name-value",
  SHARED_DID_IDENTITY_PROFILE_NAME_VALUE_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class MessageRemote extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_MESSAGE_REMOTE);
  }

  public get chatMessageCodeCopyButton() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_CODE_COPY_BUTTON,
    );
  }

  public get chatMessageCodeLanguage() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE,
    );
  }

  public get chatMessageCodePane() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP).$(
      SELECTORS.CHAT_MESSAGE_CODE_PANE,
    );
  }

  public get chatMessageCodePaneMessages() {
    return $(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_PANE)
      .$$(SELECTORS.CHAT_MESSAGE_CODE_MESSAGES);
  }

  public get chatMessageFileButtonRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON,
    );
  }

  public get chatMessageFileEmbedRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE);
  }

  public get chatMessageFileIconRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON,
    );
  }

  public get chatMessageFileInfoRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_INFO,
    );
  }

  public get chatMessageFileMetaRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_META,
    );
  }

  public get chatMessageFileMetaTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  public get chatMessageFileNameRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE).$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME,
    );
  }

  public get chatMessageFileNameTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  public get chatMessageImageContainer() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_CONTAINER);
  }

  public get chatMessageImageFile() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_CONTAINER).$(
      SELECTORS.CHAT_MESSAGE_IMAGE_FILE,
    );
  }

  public get chatMessageImageModal() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_MODAL);
  }

  public get chatMessageImageModalFile() {
    return $(SELECTORS.CHAT_MESSAGE_IMAGE_MODAL).$(
      SELECTORS.CHAT_MESSAGE_IMAGE_MODAL_FILE,
    );
  }

  public get chatMessageLinkEmbed() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED);
  }

  public get chatMessageLinkEmbedDetails() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS,
    );
  }

  public get chatMessageLinkEmbedIcon() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON,
    );
  }

  public get chatMessageLinkEmbedTitle() {
    return $(SELECTORS.CHAT_MESSAGE_LINK_EMBED).$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE,
    );
  }

  public get chatMessageRemote() {
    return $$(SELECTORS.CHAT_MESSAGE_REMOTE);
  }

  public get chatMessageReply() {
    return $(SELECTORS.CHAT_MESSAGE_REPLY);
  }

  public get chatMessageReplyText() {
    return $(SELECTORS.CHAT_MESSAGE_REPLY).$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT);
  }

  public get chatMessageTextGroup() {
    return $$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP);
  }

  public get sharedDidIdentityBannerImage() {
    return this.sharedDidIdentityHeader.$(
      SELECTORS.SHARED_DID_IDENTITY_BANNER_IMAGE,
    );
  }

  public get sharedDidIdentityEmbedButton() {
    return $(SELECTORS.SHARED_DID_IDENTITY_EMBED_IDENTITY_BUTTON);
  }

  public get sharedDidIdentityHeader() {
    return $(SELECTORS.SHARED_DID_IDENTITY_HEADER);
  }

  public get sharedDidIdentityProfileImage() {
    return this.sharedDidIdentityBannerImage.$(
      SELECTORS.SHARED_DID_IDENTITY_PROFILE_IMAGE,
    );
  }

  public get sharedDidIdentityProfileName() {
    return $(SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME);
  }

  public get sharedDidIdentityProfileNameValue() {
    return this.sharedDidIdentityProfileName.$(
      SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME_VALUE,
    );
  }

  public get sharedDidIdentityProfileNameValueText() {
    return this.sharedDidIdentityProfileNameValue.$(
      SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME_VALUE_TEXT,
    );
  }

  // Messages Received Methods

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
    let codeReceivedLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      codeReceivedLocator =
        '//XCUIElementTypeGroup[contains(@label, "message-text-```' +
        expectedLanguage +
        '")]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      codeReceivedLocator =
        '//Group[contains(@Name, "message-text-```' + expectedLanguage + '")]';
    }
    await $(codeReceivedLocator).waitForExist({ timeout: 45000 });
  }

  async waitForReceivingLink(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let linkReceivedLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      linkReceivedLocator = `~message-text-${expectedMessage}`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      linkReceivedLocator = `[name="message-text-${expectedMessage}"]`;
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
      receivedMessageLocator = `~message-text-${expectedMessage}`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      receivedMessageLocator = `[name="message-text-${expectedMessage}"]`;
    }
    await driver.waitUntil(async () => {
      return await $(receivedMessageLocator).waitForExist({
        timeout: 45000,
        timeoutMsg: "Expected message was not found after 45 seconds",
      });
    });
  }

  // Message Methods Using Message Custom Locator

  async clickOnCopyCodeOfCustomMessageReceived(expectedLanguage: string) {
    const copyButton =
      await this.getCustomMessageReceivedCodeCopyButton(expectedLanguage);
    await this.hoverOnElement(copyButton);
    await copyButton.click();
  }

  async getCustomMessageLocator(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let MessageReceivedLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      MessageReceivedLocator = `~message-text-${expectedMessage}`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      MessageReceivedLocator = `[name="message-text-${expectedMessage}"]`;
    }
    const MessageReceived = await $(MessageReceivedLocator);
    return MessageReceived;
  }

  async getCustomMessageLocatorCode(expectedLanguage: string) {
    const currentDriver = await this.getCurrentDriver();
    let codeReceivedLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      codeReceivedLocator =
        '//XCUIElementTypeGroup[contains(@label, "message-text-```' +
        expectedLanguage +
        '")]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      codeReceivedLocator =
        '//Group[contains(@Name, "message-text-```' + expectedLanguage + '")]';
    }
    const codeReceived = await $(codeReceivedLocator);
    return codeReceived;
  }

  async getCustomMessageLocatorLink(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let MessageReceivedLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      MessageReceivedLocator = `//XCUIElementTypeGroup[@label="message-text-${expectedMessage}"]/..`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      MessageReceivedLocator = `//Group[@Name="message-text-${expectedMessage}"]/..`;
    }
    const MessageReceivedLink = await $(MessageReceivedLocator);
    return MessageReceivedLink;
  }

  async getCustomMessageContents(expectedMessage: string) {
    const message = await this.getCustomMessageLocator(expectedMessage);
    const messageText = await message.$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return messageText;
  }

  async getCustomMessageReceivedCodeCopyButton(expectedLanguage: string) {
    const message = await this.getCustomMessageLocatorCode(expectedLanguage);
    const messageCodeCopyButton = await message.$(
      SELECTORS.CHAT_MESSAGE_CODE_COPY_BUTTON,
    );
    await messageCodeCopyButton.waitForExist();
    return messageCodeCopyButton;
  }

  async getCustomMessageReceivedCodeLanguage(expectedLanguage: string) {
    const message = await this.getCustomMessageLocatorCode(expectedLanguage);
    const messageCodeLanguage = await message
      .$(SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE);
    await messageCodeLanguage.waitForExist();
    return messageCodeLanguage;
  }

  async getCustomMessageReceivedCodePane(expectedLanguage: string) {
    const message = await this.getCustomMessageLocatorCode(expectedLanguage);
    const messageCodePane = await message.$(SELECTORS.CHAT_MESSAGE_CODE_PANE);
    await messageCodePane.waitForExist();
    return messageCodePane;
  }

  async getCustomMessageReceivedCodeMessage(expectedLanguage: string) {
    const messageCodePane =
      await this.getCustomMessageReceivedCodePane(expectedLanguage);
    let messageResult: string = "";
    const messageResultElements = await messageCodePane.$$(
      SELECTORS.CHAT_MESSAGE_CODE_MESSAGES,
    );
    for (let element of messageResultElements) {
      const codeMessageText = await element.getText();
      if (codeMessageText === "=") {
        messageResult += "= ";
      } else {
        messageResult += codeMessageText;
      }
    }
    return messageResult;
  }

  async getCustomMessageReceivedText(expectedMessage: string) {
    const message = await this.getCustomMessageLocator(expectedMessage);
    const messageText = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    await messageText.waitForExist();
    return messageText;
  }

  async getCustomMessageReceivedDownloadButton(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const MessageReceivedDownloadButton = await message
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_ICON)
      .$(SELECTORS.CHAT_MESSAGE_FILE_BUTTON);
    await MessageReceivedDownloadButton.waitForExist();
    return MessageReceivedDownloadButton;
  }

  async getCustomMessageReceivedFileEmbed(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileEmbed = await message.$(
      SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE,
    );
    await messageFileEmbed.waitForExist();
    return messageFileEmbed;
  }

  async getCustomMessageReceivedFileIcon(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileIcon = await message.$(SELECTORS.CHAT_MESSAGE_FILE_ICON);
    await messageFileIcon.waitForExist();
    return messageFileIcon;
  }

  async getCustomMessageReceivedFileMeta(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileMeta = await message
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
    await messageFileMeta.waitForExist();
    return messageFileMeta;
  }

  async getCustomMessageReceivedFileName(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileName = await message
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
    await messageFileName.waitForExist();
    return messageFileName;
  }

  async getCustomMessageReceivedLinkEmbed(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageLinkEmbed = await message.$(SELECTORS.CHAT_MESSAGE_LINK_EMBED);
    await messageLinkEmbed.waitForExist({ timeout: 30000 });
    return messageLinkEmbed;
  }

  async getCustomMessageReceivedLinkEmbedDetailsText(expectedMessage: string) {
    const linkEmbedMessage =
      await this.getCustomMessageLocatorLink(expectedMessage);
    const linkEmbedDetailsText = await linkEmbedMessage
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT);
    await linkEmbedDetailsText.waitForExist();
    return linkEmbedDetailsText;
  }

  async getCustomMessageReceivedLinkEmbedIcon(expectedMessage: string) {
    const linkEmbeMessage =
      await this.getCustomMessageLocatorLink(expectedMessage);
    const linkEmbedIcon = await linkEmbeMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON,
    );
    await linkEmbedIcon.waitForExist();
    return linkEmbedIcon;
  }

  async getCustomMessageReceivedLinkEmbedIconTitle(expectedMessage: string) {
    const linkEmbedIconMessage =
      await this.getCustomMessageLocatorLink(expectedMessage);
    const iconTitle = await linkEmbedIconMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE,
    );
    await iconTitle.waitForExist();
    return iconTitle;
  }

  // Share DID Methods

  async getLastMessageReceived() {
    const messagesReceived = await this.chatMessageRemote;
    const lastMessageReceivedIndex = (await messagesReceived.length) - 1;
    const lastMessageReceived =
      await messagesReceived[lastMessageReceivedIndex];
    return lastMessageReceived;
  }

  async getLastSharedDIDBannerImage() {
    const messageReceived = await this.getLastMessageReceived();
    const messageReceivedSharedDidBannerImage = await messageReceived
      .$(SELECTORS.SHARED_DID_IDENTITY_HEADER)
      .$(SELECTORS.SHARED_DID_IDENTITY_BANNER_IMAGE);
    await messageReceivedSharedDidBannerImage.waitForExist();
    return messageReceivedSharedDidBannerImage;
  }

  async getLastSharedDIDEmbedButton() {
    const messageReceived = await this.getLastMessageReceived();
    const messageReceivedSharedDidEmbedButton = await messageReceived.$(
      SELECTORS.SHARED_DID_IDENTITY_EMBED_IDENTITY_BUTTON,
    );
    await messageReceivedSharedDidEmbedButton.waitForExist();
    return messageReceivedSharedDidEmbedButton;
  }

  async getLastSharedDIDHeader() {
    const messageReceived = await this.getLastMessageReceived();
    const messageReceivedSharedDidIdentityHeader = await messageReceived.$(
      SELECTORS.SHARED_DID_IDENTITY_HEADER,
    );
    await messageReceivedSharedDidIdentityHeader.waitForExist();
    return messageReceivedSharedDidIdentityHeader;
  }

  async getLastSharedDIDProfileImage() {
    const messageReceived = await this.getLastMessageReceived();
    const messageReceivedSharedDidProfileImage = await messageReceived
      .$(SELECTORS.SHARED_DID_IDENTITY_HEADER)
      .$(SELECTORS.SHARED_DID_IDENTITY_BANNER_IMAGE)
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_IMAGE);
    await messageReceivedSharedDidProfileImage.waitForExist();
    return messageReceivedSharedDidProfileImage;
  }

  async getLastSharedDIDProfileName() {
    const messageReceived = await this.getLastMessageReceived();
    const messageReceivedSharedDidProfileName = await messageReceived
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME)
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME_VALUE)
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME_VALUE_TEXT);
    await messageReceivedSharedDidProfileName.waitForExist();
    return messageReceivedSharedDidProfileName;
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

  async downloadReceivedFile(extension: string, message: string) {
    // Generate a random filename for downloaded file
    const filename = faker.lorem.word(6) + extension;

    // First, obtain image locator and hover on it
    await this.hoverOnMessageWithFileReceived(message);

    // Now with button visible, get download button from Received file
    const downloadButton =
      await this.getCustomMessageReceivedDownloadButton(message);

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

  // Hover on Message With Files Methods

  async hoverOnMessageWithFileReceived(message: string) {
    const imageToDownload =
      await this.getCustomMessageReceivedFileEmbed(message);
    await this.hoverOnElement(imageToDownload);
  }

  // Context Menu Functions

  async openContextMenuOnReceivedMessage(message: string) {
    const messageToClick = await this.getCustomMessageLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick);
    }
  }

  // Click on message received

  async clickOnReceivedMessage(message: string) {
    const messageToClick = await this.getCustomMessageLocator(message);
    await this.hoverOnElement(messageToClick);
    await messageToClick.click();
  }
}

export default new MessageRemote();

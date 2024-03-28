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
  CHAT_MESSAGE_CODE_PANE: "//Group[1]/Group",
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

class MessageLocal extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_MESSAGE_LOCAL);
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

  public get chatMessageFileButtonLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_BUTTON,
    );
  }

  public get chatMessageFileEmbedLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED);
  }

  public get chatMessageFileIconLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_ICON,
    );
  }

  public get chatMessageFileInfoLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_INFO,
    );
  }

  public get chatMessageFileMetaLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_META,
    );
  }

  public get chatMessageFileMetaTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  public get chatMessageFileNameLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED).$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME,
    );
  }

  public get chatMessageFileNameTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
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

  public get chatMessageLocal() {
    return $$(SELECTORS.CHAT_MESSAGE_LOCAL);
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

  // Message Local Methods

  async waitForCodeMessageSentToExist(expectedLanguage: string) {
    const currentDriver = await this.getCurrentDriver();
    let codeMessageLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      codeMessageLocator =
        '//XCUIElementTypeGroup[contains(@label, "message-text-```' +
        expectedLanguage +
        '")]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      codeMessageLocator =
        '//Group[contains(@Name, "message-text-```' + expectedLanguage + '")]';
    }
    const codeMessage = await $(codeMessageLocator);
    await codeMessage.waitForExist();
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

  async waitForLinkSentToExist(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let linkSentLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      linkSentLocator = `~message-text-${expectedMessage}`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      linkSentLocator = `[name="message-text-${expectedMessage}"]`;
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
      messageSentLocator = `~message-text-${expectedMessage}`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      messageSentLocator = `[name="message-text-${expectedMessage}"]`;
    }
    await driver.waitUntil(
      async () => {
        const updatedElement = await $(messageSentLocator);
        return await updatedElement.waitForExist();
      },
      {
        timeout: 45000,
        timeoutMsg: "Expected message sent was not found after 45 seconds",
      },
    );
  }

  // Message Methods Using Message Custom Locator

  async clickOnCopyCodeOfCustomMessageSent(expectedLanguage: string) {
    const copyButton =
      await this.getCustomMessageSentCodeCopyButton(expectedLanguage);
    await this.hoverOnElement(copyButton);
    await copyButton.click();
  }

  async getCustomMessageLocator(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let messageSentLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      messageSentLocator = `~message-text-${expectedMessage}`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      messageSentLocator = `[name="message-text-${expectedMessage}"]`;
    }
    const messageSent = await $(messageSentLocator);
    return messageSent;
  }

  async getCustomMessageLocatorCode(expectedLanguage: string) {
    const currentDriver = await this.getCurrentDriver();
    let codeSentLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      codeSentLocator =
        '//XCUIElementTypeGroup[contains(@label, "message-text-```' +
        expectedLanguage +
        '")]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      codeSentLocator =
        '//Group[contains(@Name, "message-text-```' + expectedLanguage + '")]';
    }
    const codeSent = await $(codeSentLocator);
    return codeSent;
  }

  async getCustomMessageLocatorLink(expectedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let messageSentLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      messageSentLocator = `//XCUIElementTypeGroup[@label="message-text-${expectedMessage}"]/..`;
    } else if (currentDriver === WINDOWS_DRIVER) {
      messageSentLocator = `//Group[@Name="message-text-${expectedMessage}"]/..`;
    }
    const messageSentLink = await $(messageSentLocator);
    return messageSentLink;
  }

  async getCustomMessageContents(expectedMessage: string) {
    const message = await this.getCustomMessageLocator(expectedMessage);
    const messageText = await message.$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return messageText;
  }

  async getCustomMessageSentCodeCopyButton(expectedLanguage: string) {
    const message = await this.getCustomMessageLocatorCode(expectedLanguage);
    const messageCodeCopyButton = await message.$(
      SELECTORS.CHAT_MESSAGE_CODE_COPY_BUTTON,
    );
    await messageCodeCopyButton.waitForExist();
    return messageCodeCopyButton;
  }

  async getCustomMessageSentCodeLanguage(expectedLanguage: string) {
    const message = await this.getCustomMessageLocatorCode(expectedLanguage);
    const messageCodeLanguage = await message
      .$(SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_CODE_LANGUAGE);
    await messageCodeLanguage.waitForExist();
    return messageCodeLanguage;
  }

  async getCustomMessageSentCodePane(expectedLanguage: string) {
    const message = await this.getCustomMessageLocatorCode(expectedLanguage);
    const messageCodePane = await message.$(SELECTORS.CHAT_MESSAGE_CODE_PANE);
    await messageCodePane.waitForExist();
    return messageCodePane;
  }

  async getCustomMessageSentCodeMessage(expectedLanguage: string) {
    const messageCodePane =
      await this.getCustomMessageSentCodePane(expectedLanguage);
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

  async getCustomMessageSentText(expectedMessage: string) {
    const message = await this.getCustomMessageLocator(expectedMessage);
    const messageText = await message
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    await messageText.waitForExist();
    return messageText;
  }

  async getCustomMessageSentDownloadButton(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageSentDownloadButton = await message
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_ICON)
      .$(SELECTORS.CHAT_MESSAGE_FILE_BUTTON);
    await messageSentDownloadButton.waitForExist();
    return messageSentDownloadButton;
  }

  async getCustomMessageSentFileEmbed(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileEmbed = await message.$(SELECTORS.CHAT_MESSAGE_FILE_EMBED);
    await messageFileEmbed.waitForExist();
    return messageFileEmbed;
  }

  async getCustomMessageSentFileIcon(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileIcon = await message.$(SELECTORS.CHAT_MESSAGE_FILE_ICON);
    await messageFileIcon.waitForExist();
    return messageFileIcon;
  }

  async getCustomMessageSentFileMeta(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileMeta = await message
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
    await messageFileMeta.waitForExist();
    return messageFileMeta;
  }

  async getCustomMessageSentFileName(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageFileName = await message
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
    await messageFileName.waitForExist();
    return messageFileName;
  }

  async getCustomMessageSentLinkEmbed(expectedMessage: string) {
    const message = await this.getCustomMessageLocatorLink(expectedMessage);
    const messageLinkEmbed = await message.$(SELECTORS.CHAT_MESSAGE_LINK_EMBED);
    await messageLinkEmbed.waitForExist({ timeout: 30000 });
    return messageLinkEmbed;
  }

  async getCustomMessageSentLinkEmbedDetailsText(expectedMessage: string) {
    const linkEmbedMessage =
      await this.getCustomMessageLocatorLink(expectedMessage);
    const linkEmbedDetailsText = await linkEmbedMessage
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS)
      .$(SELECTORS.CHAT_MESSAGE_LINK_EMBED_DETAILS_TEXT);
    await linkEmbedDetailsText.waitForExist();
    return linkEmbedDetailsText;
  }

  async getCustomMessageSentLinkEmbedIcon(expectedMessage: string) {
    const linkEmbeMessage =
      await this.getCustomMessageLocatorLink(expectedMessage);
    const linkEmbedIcon = await linkEmbeMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_ICON,
    );
    await linkEmbedIcon.waitForExist();
    return linkEmbedIcon;
  }

  async getCustomMessageSentLinkEmbedIconTitle(expectedMessage: string) {
    const linkEmbedIconMessage =
      await this.getCustomMessageLocatorLink(expectedMessage);
    const iconTitle = await linkEmbedIconMessage.$(
      SELECTORS.CHAT_MESSAGE_LINK_EMBED_TITLE,
    );
    await iconTitle.waitForExist();
    return iconTitle;
  }

  // Share DID Methods

  async getLastMessageSent() {
    const messagesSent = await this.chatMessageLocal;
    const lastMessageSentIndex = (await messagesSent.length) - 1;
    const lastMessageSent = await messagesSent[lastMessageSentIndex];
    return lastMessageSent;
  }

  async getLastSharedDIDBannerImage() {
    const messageSent = await this.getLastMessageSent();
    const messageSentSharedDidBannerImage = await messageSent
      .$(SELECTORS.SHARED_DID_IDENTITY_HEADER)
      .$(SELECTORS.SHARED_DID_IDENTITY_BANNER_IMAGE);
    await messageSentSharedDidBannerImage.waitForExist();
    return messageSentSharedDidBannerImage;
  }

  async getLastSharedDIDEmbedButton() {
    const messageSent = await this.getLastMessageSent();
    const messageSentSharedDidEmbedButton = await messageSent.$(
      SELECTORS.SHARED_DID_IDENTITY_EMBED_IDENTITY_BUTTON,
    );
    await messageSentSharedDidEmbedButton.waitForExist();
    return messageSentSharedDidEmbedButton;
  }

  async getLastSharedDIDHeader() {
    const messageSent = await this.getLastMessageSent();
    const messageSentSharedDidIdentityHeader = await messageSent.$(
      SELECTORS.SHARED_DID_IDENTITY_HEADER,
    );
    await messageSentSharedDidIdentityHeader.waitForExist();
    return messageSentSharedDidIdentityHeader;
  }

  async getLastSharedDIDProfileImage() {
    const messageSent = await this.getLastMessageSent();
    const messageSentSharedDidProfileImage = await messageSent
      .$(SELECTORS.SHARED_DID_IDENTITY_HEADER)
      .$(SELECTORS.SHARED_DID_IDENTITY_BANNER_IMAGE)
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_IMAGE);
    await messageSentSharedDidProfileImage.waitForExist();
    return messageSentSharedDidProfileImage;
  }

  async getLastSharedDIDProfileName() {
    const messageSent = await this.getLastMessageSent();
    const messageSentSharedDidProfileName = await messageSent
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME)
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME_VALUE)
      .$(SELECTORS.SHARED_DID_IDENTITY_PROFILE_NAME_VALUE_TEXT);
    await messageSentSharedDidProfileName.waitForExist();
    return messageSentSharedDidProfileName;
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

  async downloadSentFile(extension: string, message: string) {
    // Generate a random filename for downloaded file
    const filename = faker.lorem.word(6) + extension;

    // First, obtain image locator and hover on it
    await this.hoverOnMessageWithFileSent(message);

    // Now with button visible, get download button from sent file
    const downloadButton =
      await this.getCustomMessageSentDownloadButton(message);

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

  async hoverOnMessageWithFileSent(message: string) {
    const imageToDownload = await this.getCustomMessageSentFileEmbed(message);
    await this.hoverOnElement(imageToDownload);
  }

  // Context Menu Functions

  async openContextMenuOnSentMessage(message: string) {
    const messageToClick = await this.getCustomMessageLocator(message);
    await this.hoverOnElement(messageToClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(messageToClick);
    }
  }

  // Click on message sent

  async clickOnSentMessage(message: string) {
    const messageToClick = await this.getCustomMessageLocator(message);
    await this.hoverOnElement(messageToClick);
    await messageToClick.click();
  }
}

export default new MessageLocal();

import { faker } from "@faker-js/faker";
import {
  rightClickOnMacOS,
  rightClickOnWindows,
  selectFileOnMacos,
  selectFileOnWindows,
} from "../helpers/commands";
import { join } from "path";
import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

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
  CHAT_MESSAGE_GROUP_REMOTE: '[name="message-group-remote"]',
  CHAT_MESSAGE_GROUP_SENT: '[name="message-group"]',
  CHAT_MESSAGE_GROUP_WRAP: '[name="message-group-wrap"]',
  CHAT_MESSAGE_REPLY: '[name="message-reply"]',
  CHAT_MESSAGE_REPLY_TEXT: "//Group/Text",
  CHAT_MESSAGE_TEXT_GROUP: '[name="message-text"]',
  CHAT_MESSAGE_TEXT_VALUE: "//Text",
  CHAT_MESSAGE_TIME_AGO: '[name="time-ago"]',
  CHAT_MESSAGE_TIME_AGO_TEXT: "//Text",
  CHAT_USER_IMAGE: '[name="User Image"]',
  CHAT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  CHAT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  CHAT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  COMPOSE_ATTACHMENTS: '[name="compose-attachments"]',
  COMPOSE_ATTACHMENTS_BUTTON: '[name="attachment-button"]',
  COMPOSE_ATTACHMENTS_FILE_EMBED: '[name="file-embed"]',
  COMPOSE_ATTACHMENTS_FILE_ICON: '[name="file-icon"]',
  COMPOSE_ATTACHMENTS_FILE_INFO: '[name="file-info"]',
  COMPOSE_ATTACHMENTS_FILE_META: '[name="file-meta"]',
  COMPOSE_ATTACHMENTS_FILE_NAME: '[name="file-name"]',
  COMPOSE_ATTACHMENTS_FILE_NAME_TEXT: "//Text",
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_OPTION: '[name="Context Item"]',
  INPUT_GROUP: '[name="input-group"]',
  INPUT_TEXT: "//Edit",
  QUICK_PROFILE: '[name="Context Menu"]',
  QUICK_PROFILE_BANNER_IMAGE: '[name="banner-image"]',
  QUICK_PROFILE_BUTTON: '[name="Context Item"]',
  QUICK_PROFILE_IDENTITY_HEADER: '[name="identity-header"]',
  QUICK_PROFILE_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  QUICK_PROFILE_INDICATOR_ONLINE: '[name="indicator-online"]',
  QUICK_PROFILE_USER_IMAGE: '[name="profile-image"]',
  QUICK_PROFILE_USER_NAME: '[name="profile-name"]',
  QUICK_PROFILE_USER_NAME_VALUE: '[name="profile-name-value"]',
  QUICK_PROFILE_USER_NAME_VALUE_TEXT: "//Text",
  REPLY_POPUP: '[name="inline-reply"]',
  REPLY_POPUP_CLOSE_BUTTON: '[name="close-reply"]',
  REPLY_POPUP_CONTENT: '[name="content"]',
  REPLY_POPUP_HEADER: "//Text[1]/Text",
  REPLY_POPUP_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  REPLY_POPUP_INDICATOR_ONLINE: '[name="indicator-online"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: '[name="reply-text-message"]',
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE: "//Text",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: '[name="reply-text-message-remote"]',
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE: "//Text",
  REPLY_POPUP_USER_IMAGE: '[name="User Image"]',
  REPLY_POPUP_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SECURED_MESSAGES_INDICATOR: "//Group[3]/Group/Text",
  SEND_MESSAGE_BUTTON: '[name="send-message-button"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
  TOPBAR_ADD_TO_FAVORITES: '[name="Favorites"]',
  TOPBAR_CALL: '[name="Call"]',
  TOPBAR_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  TOPBAR_INDICATOR_ONLINE: '[name="indicator-online"]',
  TOPBAR_REMOVE_FROM_FAVORITES: '[name="Remove from Favorites"]',
  TOPBAR_USER_IMAGE: '[name="User Image"]',
  TOPBAR_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  TOPBAR_USER_INFO: '[name="user-info"]',
  TOPBAR_USER_NAME: "//Text",
  TOPBAR_VIDEOCALL: '[name="Videocall"]',
  UPLOAD_BUTTON: '[name="upload-button"]',
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
  CHAT_MESSAGE_GROUP_REMOTE: "~message-group-remote",
  CHAT_MESSAGE_GROUP_SENT: "~message-group",
  CHAT_MESSAGE_GROUP_WRAP: "~message-group-wrap",
  CHAT_MESSAGE_REPLY: "~message-reply",
  CHAT_MESSAGE_REPLY_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TEXT_GROUP: "~message-text",
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TIME_AGO: "~time-ago",
  CHAT_MESSAGE_TIME_AGO_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_USER_IMAGE: "~User Image",
  CHAT_USER_IMAGE_WRAP: "~user-image-wrap",
  CHAT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  CHAT_USER_INDICATOR_ONLINE: "~indicator-online",
  COMPOSE_ATTACHMENTS: "~compose-attachments",
  COMPOSE_ATTACHMENTS_BUTTON: "~attachment-button",
  COMPOSE_ATTACHMENTS_FILE_EMBED: "~file-embed",
  COMPOSE_ATTACHMENTS_FILE_ICON: "~file-icon",
  COMPOSE_ATTACHMENTS_FILE_INFO: "~file-info",
  COMPOSE_ATTACHMENTS_FILE_META: "~file-meta",
  COMPOSE_ATTACHMENTS_FILE_NAME: "~file-name",
  COMPOSE_ATTACHMENTS_FILE_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_OPTION: "~Context Item",
  INPUT_GROUP: "~input-group",
  INPUT_TEXT: "-ios class chain:**/XCUIElementTypeTextView",
  QUICK_PROFILE: "~Context Menu",
  QUICK_PROFILE_BANNER_IMAGE: "~banner-image",
  QUICK_PROFILE_BUTTON: "~Context Item",
  QUICK_PROFILE_IDENTITY_HEADER: "~identity-header",
  QUICK_PROFILE_INDICATOR_ONLINE: "~indicator-online",
  QUICK_PROFILE_INDICATOR_OFFLINE: "~indicator-offline",
  QUICK_PROFILE_USER_IMAGE: "~profile-image",
  QUICK_PROFILE_USER_NAME: "~profile-name",
  QUICK_PROFILE_USER_NAME_VALUE: "~profile-name-value",
  QUICK_PROFILE_USER_NAME_VALUE_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REPLY_POPUP: "~inline-reply",
  REPLY_POPUP_CLOSE_BUTTON: "~close-reply",
  REPLY_POPUP_CONTENT: "~content",
  REPLY_POPUP_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText[1]/XCUIElementTypeStaticText",
  REPLY_POPUP_INDICATOR_OFFLINE: "~indicator-offline",
  REPLY_POPUP_INDICATOR_ONLINE: "~indicator-online",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY: "~reply-text-message",
  REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY: "~reply-text-message-remote",
  REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  REPLY_POPUP_USER_IMAGE: "~User Image",
  REPLY_POPUP_USER_IMAGE_WRAP: "~user-image-wrap",
  SECURED_MESSAGES_INDICATOR:
    "**/XCUIElementTypeGroup[3]/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SEND_MESSAGE_BUTTON: "~send-message-button",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_INDICATOR_OFFLINE: "~indicator-offline",
  TOPBAR_INDICATOR_ONLINE: "~indicator-online",
  TOPBAR_REMOVE_FROM_FAVORITES: "~Remove from Favorites",
  TOPBAR_USER_IMAGE: "~User Image",
  TOPBAR_USER_IMAGE_WRAP: "~user-image-wrap",
  TOPBAR_USER_INFO: "~user-info",
  TOPBAR_USER_NAME: "-ios class chain:**/XCUIElementTypeStaticText",
  TOPBAR_VIDEOCALL: "~Videocall",
  UPLOAD_BUTTON: "~upload-button",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class ChatScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CHAT_LAYOUT);
  }

  get chatLayout() {
    return $(SELECTORS.CHAT_LAYOUT);
  }

  get chatMessage() {
    return $(SELECTORS.CHAT_MESSAGE);
  }

  get chatMessageFileButtonLocal() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_BUTTON);
  }

  get chatMessageFileButtonRemote() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_BUTTON);
  }

  get chatMessageFileEmbedLocal() {
    return $(SELECTORS.CHAT_MESSAGE).$(SELECTORS.CHAT_MESSAGE_FILE_EMBED);
  }

  get chatMessageFileEmbedRemote() {
    return $(SELECTORS.CHAT_MESSAGE).$(
      SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE
    );
  }

  get chatMessageFileIconLocal() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_ICON);
  }

  get chatMessageFileIconRemote() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_ICON);
  }

  get chatMessageFileInfoLocal() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_INFO);
  }

  get chatMessageFileInfoRemote() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_INFO);
  }

  get chatMessageFileMetaLocal() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META);
  }

  get chatMessageFileMetaRemote() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META);
  }

  get chatMessageFileMetaTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileMetaTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META)
      .$(SELECTORS.CHAT_MESSAGE_FILE_META_TEXT);
  }

  get chatMessageFileNameLocal() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME);
  }

  get chatMessageFileNameRemote() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME);
  }

  get chatMessageFileNameTextLocal() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  get chatMessageFileNameTextRemote() {
    return $(SELECTORS.CHAT_MESSAGE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_EMBED_REMOTE)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME)
      .$(SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT);
  }

  get chatMessageGroupReceived() {
    return $$(SELECTORS.CHAT_MESSAGE_GROUP_REMOTE);
  }

  get chatMessageGroupSent() {
    return $$(SELECTORS.CHAT_MESSAGE_GROUP_SENT);
  }

  get chatMessageGroupWrap() {
    return $$(SELECTORS.CHAT_MESSAGE_GROUP_WRAP);
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

  get chatMessageTimeAgo() {
    return $$(SELECTORS.MESSAGE_GROUP).$(SELECTORS.CHAT_MESSAGE_TIME_AGO);
  }

  get chatMessageTimeAgoValue() {
    return $$(SELECTORS.MESSAGE_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TIME_AGO)
      .$(SELECTORS.CHAT_MESSAGE_TIME_AGO_TEXT);
  }

  get chatMessageUserImage() {
    return $$(SELECTORS.MESSAGE_GROUP)
      .$(SELECTORS.CHAT_USER_IMAGE_WRAP)
      .$(SELECTORS.CHAT_USER_IMAGE);
  }

  get chatMessageUserImageWrap() {
    return $$(SELECTORS.MESSAGE_GROUP).$(SELECTORS.CHAT_USER_IMAGE_WRAP);
  }

  get chatMessageUserIndicatorOffline() {
    return $$(SELECTORS.MESSAGE_GROUP)
      .$(SELECTORS.CHAT_USER_IMAGE_WRAP)
      .$(SELECTORS.CHAT_USER_INDICATOR_OFFLINE);
  }

  get chatMessageUserIndicatorOnline() {
    return $$(SELECTORS.MESSAGE_GROUP)
      .$(SELECTORS.CHAT_USER_IMAGE_WRAP)
      .$(SELECTORS.CHAT_USER_INDICATOR_ONLINE);
  }

  get composeAttachments() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS);
  }

  get composeAttachmentsButton() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS).$(
      SELECTORS.COMPOSE_ATTACHMENTS_BUTTON
    );
  }

  get composeAttachmentsFileEmbed() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS).$(
      SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED
    );
  }

  get composeAttachmentsFileIcon() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_ICON);
  }

  get composeAttachmentsFileInfo() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_INFO);
  }

  get composeAttachmentsFileMeta() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_META);
  }

  get composeAttachmentsFileName() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME);
  }

  get composeAttachmentsFileNameText() {
    return $(SELECTORS.COMPOSE_ATTACHMENTS)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_EMBED)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME)
      .$(SELECTORS.COMPOSE_ATTACHMENTS_FILE_NAME_TEXT);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuOption() {
    return $$(SELECTORS.CONTEXT_MENU_OPTION);
  }

  get inputGroup() {
    return $(SELECTORS.INPUT_GROUP);
  }

  get inputText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.INPUT_GROUP)
      .$(SELECTORS.INPUT_TEXT);
  }

  get quickProfile() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.QUICK_PROFILE);
  }

  get quickProfileBannerImage() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_BANNER_IMAGE);
  }

  get quickProfileBlockUser() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$$(SELECTORS.QUICK_PROFILE_BUTTON)[1];
  }

  get quickProfileEditProfile() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_BUTTON);
  }

  get quickProfileIdentityHeader() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_IDENTITY_HEADER);
  }

  get quickProfileIndicatorOffline() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_INDICATOR_OFFLINE);
  }

  get quickProfileIndicatorOnline() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_INDICATOR_ONLINE);
  }

  get quickProfileRemoveFriend() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$$(SELECTORS.QUICK_PROFILE_BUTTON)[0];
  }

  get quickProfileUserImage() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_IMAGE);
  }

  get quickProfileUserName() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME);
  }

  get quickProfileUserNameValue() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE);
  }

  get quickProfileUserNameValueText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.QUICK_PROFILE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE)
      .$(SELECTORS.QUICK_PROFILE_USER_NAME_VALUE_TEXT);
  }

  get replyPopUp() {
    return $(SELECTORS.REPLY_POPUP);
  }

  get replyPopUpCloseButton() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_CLOSE_BUTTON);
  }

  get replyPopUpContent() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_CONTENT);
  }

  get replyPopUpHeader() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_HEADER);
  }

  get replyPopUpIndicatorOffline() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_INDICATOR_OFFLINE);
  }

  get replyPopUpIndicatorOnline() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_INDICATOR_ONLINE);
  }

  get replyPopUpLocalTextToReply() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY
    );
  }

  get replyPopUpLocalTextToReplyValue() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_LOCAL_TEXT_TO_REPLY_VALUE
    );
  }

  get replyPopUpRemoteTextToReply() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY
    );
  }

  get replyPopUpRemoteTextToReplyValue() {
    return $(SELECTORS.REPLY_POPUP).$(
      SELECTORS.REPLY_POPUP_REMOTE_TEXT_TO_REPLY_VALUE
    );
  }

  get replyPopUpUserImage() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_USER_IMAGE);
  }

  get replyPopUpUserImageWrap() {
    return $(SELECTORS.REPLY_POPUP).$(SELECTORS.REPLY_POPUP_USER_IMAGE_WRAP);
  }

  get securedMessagesIndicator() {
    return $(SELECTORS.CHAT_LAYOUT).$(SELECTORS.SECURED_MESSAGES_INDICATOR);
  }

  get sendMessageButton() {
    return $(SELECTORS.SEND_MESSAGE_BUTTON);
  }

  get sendMessageTooltip() {
    return $(SELECTORS.CHAT_LAYOUT).$$(SELECTORS.TOOLTIP)[1];
  }

  get sendMessageTooltipText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$$(SELECTORS.TOOLTIP)[1]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  get topbarAddToFavorites() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_ADD_TO_FAVORITES);
  }

  get topbarAddToFavoritesTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[0];
  }

  get topbarAddToFavoritesTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[0]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarCall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_CALL);
  }

  get topbarCallTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[1];
  }

  get topbarCallTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[1]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarIndicatorOffline() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_INDICATOR_OFFLINE);
  }

  get topbarIndicatorOnline() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_INDICATOR_ONLINE);
  }

  get topbarRemoveFromFavorites() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_REMOVE_FROM_FAVORITES);
  }

  get topbarUserImage() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
  }

  get topbarUserImageWrap() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE_WRAP);
  }

  get topbarUserInfo() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_INFO);
  }

  get topbarUserName() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_NAME);
  }

  get topbarVideocall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_VIDEOCALL);
  }

  get topbarVideocallTooltip() {
    return $(SELECTORS.TOPBAR).$$(SELECTORS.TOOLTIP)[2];
  }

  get topbarVideocallTooltipText() {
    return $(SELECTORS.TOPBAR)
      .$$(SELECTORS.TOOLTIP)[2]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get uploadButton() {
    return $(SELECTORS.UPLOAD_BUTTON);
  }

  get uploadTooltip() {
    return $(SELECTORS.CHAT_LAYOUT).$$(SELECTORS.TOOLTIP)[0];
  }

  get uploadTooltipText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$$(SELECTORS.TOOLTIP)[0]
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  // Top Bar Methods

  async addToFavorites() {
    await this.topbarAddToFavorites.click();
  }

  async removeFromFavorites() {
    await this.topbarRemoveFromFavorites.click();
  }

  // Input Bar Methods

  async clearInputBar() {
    await (await this.inputText).clearValue();
  }

  async clickOnInputBar() {
    await (await this.inputText).click();
  }

  async clickOnSendMessage() {
    await this.sendMessageButton.click();
  }

  async clickOnUploadFile() {
    await this.uploadButton.click();
  }

  async deleteFileOnComposeAttachment() {
    (await this.composeAttachmentsButton).click();
  }

  async generateRandomText() {
    // Get a random word of 9 chars and add it a space
    const wordToRepeat = faker.lorem.word(9) + " ";
    // Then repeat the same word for 102 times (1020 chars)
    let longParagraph = wordToRepeat.repeat(102);
    // Now, add 4 more chars, to have 1024 chars
    longParagraph += "abcd";
    return longParagraph;
  }

  async getFilePath(relativePath: string) {
    return join(process.cwd(), relativePath);
  }

  async pressEnterKeyOnInputBar() {
    const currentDriver = await this.getCurrentDriver();
    let enterValue;
    currentDriver === "windows" ? (enterValue = "\uE007") : (enterValue = "\n");
    await (await this.inputText).setValue(enterValue);
  }

  async typeMessageOnInput(text: string) {
    await (await this.inputText).setValue(text);
  }

  async typeOnEditMessageInput(editedMessage: string) {
    const messageEditableInput = await $$(SELECTORS.INPUT_TEXT)[1];
    const currentDriver = await this.getCurrentDriver();
    let enterValue;
    currentDriver === "windows" ? (enterValue = "\uE007") : (enterValue = "\n");
    await messageEditableInput?.clearValue();
    await messageEditableInput?.setValue(editedMessage + enterValue);
  }

  async uploadFile(relativePath: string) {
    const currentDriver = await this.getCurrentDriver();
    await this.clickOnUploadFile();
    if (currentDriver === "mac2") {
      await selectFileOnMacos(relativePath);
    } else if (currentDriver === "windows") {
      await selectFileOnWindows(relativePath);
    }

    // Validate that profile banner is displayed on screen
    expect(await this.composeAttachmentsFileEmbed).toBeDisplayed();
  }

  // Message Group Wraps Methods

  async getLastGroupWrap() {
    const messageGroupWraps = await this.chatMessageGroupWrap;
    const lastGroupWrapIndex = (await messageGroupWraps.length) - 1;
    const lastGroupWrap = await messageGroupWraps[lastGroupWrapIndex];
    return lastGroupWrap;
  }

  async getLastGroupWrapImage() {
    const groupWrap = await this.getLastGroupWrap();
    const userImage = await groupWrap
      .$(SELECTORS.CHAT_USER_IMAGE_WRAP)
      .$(SELECTORS.CHAT_USER_IMAGE);
    return userImage;
  }

  async getLastGroupWrapOffline() {
    const groupWrap = await this.getLastGroupWrap();
    const offlineStatus = await groupWrap.$(
      SELECTORS.CHAT_USER_INDICATOR_OFFLINE
    );
    return offlineStatus;
  }

  async getLastGroupWrapOnline() {
    const groupWrap = await this.getLastGroupWrap();
    const onlineStatus = await groupWrap.$(
      SELECTORS.CHAT_USER_INDICATOR_ONLINE
    );
    return onlineStatus;
  }

  // Messages Received Methods

  async getLastReceivedGroup() {
    const messageGroupsReceived = await this.chatMessageGroupReceived;
    const lastGroupIndex = (await messageGroupsReceived.length) - 1;
    const lastGroupLocator = await messageGroupsReceived[lastGroupIndex];
    return lastGroupLocator;
  }

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
    const lastMessageFileMeta = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_META
    );
    return lastMessageFileMeta;
  }

  async getLastMessageReceivedFileName() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageFileName = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT
    );
    return lastMessageFileName;
  }

  async getLastMessageReceivedText() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageText = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE)
      .getText();
    return lastMessageText;
  }

  async getLastMessageReceivedTextLocator() {
    const lastMessage = await this.getLastMessageReceivedLocator();
    const lastMessageText = await lastMessage
      .$(SELECTORS.CHAT_MESSAGE_TEXT_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE);
    return lastMessageText;
  }

  async getLastMessageReceivedTimeAgo() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const timeAgoText = await lastGroupReceived
      .$(SELECTORS.CHAT_MESSAGE_TIME_AGO)
      .$(SELECTORS.CHAT_MESSAGE_TIME_AGO_TEXT)
      .getText();
    return timeAgoText;
  }

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
      .$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT)
      .getText();
    return lastReplyReceivedText;
  }

  async waitForMessageToBeDeleted(
    expectedMessage: string,
    timeoutMsg: number = 30000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await $(
        '//XCUIElementTypeGroup[@label="message-text"]/XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]'
      ).waitForExist({ timeout: timeoutMsg, reverse: true });
    } else if (currentDriver === "windows") {
      await $(
        '//Group[@Name="message-text"]/Text[contains(@Name, "' +
          expectedMessage +
          '")]'
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
        '//XCUIElementTypeGroup[@label="message-text"]/XCUIElementTypeStaticText[contains(@value, "' +
          expectedMessage +
          '")]'
      ).waitForDisplayed({ timeout: timeoutMsg });
    } else if (currentDriver === "windows") {
      await $(
        '//Group[@Name="message-text"]/Text[contains(@Name, "' +
          expectedMessage +
          '")]'
      ).waitForDisplayed({ timeout: timeoutMsg });
    }
  }

  // Messages Sent Methods
  async getLastSentGroup() {
    const messageGroupsSent = await this.chatMessageGroupSent;
    const lastGroupIndex = (await messageGroupsSent.length) - 1;
    const lastGroupLocator = await messageGroupsSent[lastGroupIndex];
    return lastGroupLocator;
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
    const lastMessageFileMeta = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_META
    );
    return lastMessageFileMeta;
  }

  async getLastMessageSentFileName() {
    const lastMessage = await this.getLastMessageSentLocator();
    const lastMessageFileName = await lastMessage.$(
      SELECTORS.CHAT_MESSAGE_FILE_NAME_TEXT
    );
    return lastMessageFileName;
  }

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
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE)
      .getText();
    return lastMessageText;
  }

  async getLastMessageSentTimeAgo() {
    const lastGroupSent = await this.getLastSentGroup();
    const timeAgoText = await lastGroupSent
      .$(SELECTORS.CHAT_MESSAGE_TIME_AGO)
      .$(SELECTORS.CHAT_MESSAGE_TIME_AGO_TEXT)
      .getText();
    return timeAgoText;
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
      .$(SELECTORS.CHAT_MESSAGE_REPLY_TEXT)
      .getText();
    return lastReplySentText;
  }

  // Context Menu Functions

  async openContextMenuOnReceivedMessage() {
    const messageToClick = await this.getLastMessageReceivedLocator();
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(messageToClick);
    }
    await (await this.contextMenu).waitForDisplayed();
  }

  async openContextMenuOnSentMessage() {
    const messageToClick = await this.getLastMessageSentLocator();
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(messageToClick);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(messageToClick);
    }
    await (await this.contextMenu).waitForDisplayed();
  }

  async selectContextOption(option: number) {
    await this.contextMenuOption[option].click();
  }

  // Hovering methods

  async hoverOnCallButton() {
    await this.hoverOnElement(await this.topbarCall);
  }

  async hoverOnFavoritesButton() {
    await this.hoverOnElement(await this.topbarAddToFavorites);
  }

  async hoverOnSendButton() {
    await this.hoverOnElement(await this.sendMessageButton);
  }

  async hoverOnUploadButton() {
    await this.hoverOnElement(await this.uploadButton);
  }

  async hoverOnVideocallButton() {
    await this.hoverOnElement(await this.topbarVideocall);
  }

  // Reply Modal methods

  async closeReplyModal() {
    await this.replyPopUpCloseButton.click();
  }

  async waitForReplyModalToNotExist() {
    (await this.replyPopUp).waitForExist({ reverse: true });
  }
}

export default new ChatScreen();

import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  CHAT_MESSAGE: '[name="Message"]',
  CHAT_MESSAGE_GROUP_REMOTE: '[name="message-group-remote"]',
  CHAT_MESSAGE_GROUP_SENT: '[name="message-group"]',
  CHAT_MESSAGE_GROUP_WRAP: '[name="message-group-wrap"]',
  CHAT_MESSAGE_REPLY: '[name="message-reply"]',
  CHAT_MESSAGE_SENDER: '[name="sender"]',
  CHAT_MESSAGE_SENDER_VALUE: "//Text",
  CHAT_MESSAGE_TEXT_GROUP: '[name="message-text"]',
  CHAT_MESSAGE_TEXT_VALUE: "//Text",
  CHAT_MESSAGE_TIME_AGO: '[name="time-ago"]',
  CHAT_MESSAGE_TIME_AGO_TEXT: "//Text",
  CHAT_USER_IMAGE: '[name="User Image"]',
  CHAT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  CHAT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  CHAT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  INPUT_GROUP: '[name="input-group"]',
  INPUT_TEXT: "//Edit",
  SEND_MESSAGE_BUTTON: '[name="send-message-button"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
  TOPBAR_ADD_TO_FAVORITES: '[name="Favorites"]',
  TOPBAR_CALL: '[name="Call"]',
  TOPBAR_USER_IMAGE: '[name="User Image"]',
  TOPBAR_USER_NAME: "//Text",
  TOPBAR_VIDEOCALL: '[name="Videocall"]',
  UPLOAD_BUTTON: '[name="upload-button"]',
};

const SELECTORS_MACOS = {
  CHAT_MESSAGE: "~Message",
  CHAT_MESSAGE_GROUP_REMOTE: "~message-group-remote",
  CHAT_MESSAGE_GROUP_SENT: "~message-group",
  CHAT_MESSAGE_GROUP_WRAP: "~message-group-wrap",
  CHAT_MESSAGE_REPLY: "~message-reply",
  CHAT_MESSAGE_SENDER: "~sender",
  CHAT_MESSAGE_SENDER_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TEXT_GROUP: "~message-text",
  CHAT_MESSAGE_TEXT_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_MESSAGE_TIME_AGO: "~time-ago",
  CHAT_MESSAGE_TIME_AGO_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  CHAT_USER_IMAGE: "~User Image",
  CHAT_USER_IMAGE_WRAP: "~user-image-wrap",
  CHAT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  CHAT_USER_INDICATOR_ONLINE: "~indicator-online",
  INPUT_GROUP: "~input-group",
  INPUT_TEXT: "-ios class chain:**/XCUIElementTypeTextView",
  SEND_MESSAGE_BUTTON: "~send-message-button",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_USER_IMAGE: "~User Image",
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
    return $(SELECTORS.MESSAGE_GROUP).$(SELECTORS.CHAT_MESSAGE_REPLY);
  }

  get chatMessageSender() {
    return $$(SELECTORS.MESSAGE_GROUP).$(SELECTORS.CHAT_MESSAGE_SENDER);
  }

  get chatMessageSenderValue() {
    return $$(SELECTORS.MESSAGE_GROUP)
      .$(SELECTORS.CHAT_MESSAGE_SENDER)
      .$(SELECTORS.CHAT_MESSAGE_SENDER_VALUE);
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

  get inputGroup() {
    return $(SELECTORS.INPUT_GROUP);
  }

  get inputText() {
    return $(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.INPUT_GROUP)
      .$(SELECTORS.INPUT_TEXT);
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

  get topbarUserImage() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
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

  // Input Bar Methods

  async clearInputBar() {
    await (await this.inputText).clearValue();
  }

  async clickOnSendMessage() {
    await this.sendMessageButton.click();
  }

  async clickOnUploadFile() {
    await this.uploadButton.click();
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
      .$(SELECTORS.CHAT_MESSAGE_TEXT_VALUE)
      .getText();
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

  async getLastMessageReceivedUsername() {
    const lastGroupReceived = await this.getLastReceivedGroup();
    const sender = await lastGroupReceived
      .$(SELECTORS.CHAT_MESSAGE_SENDER)
      .$(SELECTORS.CHAT_MESSAGE_SENDER_VALUE)
      .getText();
    return sender;
  }

  // Messages Sent Methods

  async getLastSentGroup() {
    const messageGroupsSent = await this.chatMessageGroupSent;
    const lastGroupIndex = (await messageGroupsSent.length) - 1;
    const lastGroupLocator = await messageGroupsSent[lastGroupIndex];
    return lastGroupLocator;
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

  async getLastMessageSentUsername() {
    const lastGroupSent = await this.getLastSentGroup();
    const sender = await lastGroupSent
      .$(SELECTORS.CHAT_MESSAGE_SENDER)
      .$(SELECTORS.CHAT_MESSAGE_SENDER_VALUE)
      .getText();
    return sender;
  }

  async typeMessageOnInput(text: string) {
    await (await this.inputText).setValue(text);
  }
}

export default new ChatScreen();

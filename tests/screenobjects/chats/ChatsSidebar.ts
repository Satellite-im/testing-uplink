import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CREATE_GROUP_CHAT_CREATE_DM_BUTTON: '[name="create-dm-button"]',
  CREATE_GROUP_CHAT_FRIEND_CONTAINER: '[name="Friend Container"]',
  CREATE_GROUP_CHAT_SECTION: '[name="Create Group"]',
  CREATE_GROUP_CHAT_USER_IMAGE: '[name="User Image"]',
  CREATE_GROUP_CHAT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  CREATE_GROUP_CHAT_USER_NAME: '[name="friend-name"]',
  CREATE_GROUP_CHAT_USER_NAME_TEXT: "//Text",
  SIDEBAR_CHATS_SECTION: "~chats",
  SIDEBAR_CHATS_HEADER: "//Text/Text",
  SIDEBAR_CHATS_USER: '[name="User"]',
  SIDEBAR_CHATS_USER_BADGE: '[name="User Badge"]',
  SIDEBAR_CHATS_USER_BADGE_NUMBER: "//Text[2]",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO: "//Text[1]",
  SIDEBAR_CHATS_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_CHATS_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SIDEBAR_CHATS_USER_INFO: '[name="User Info"]',
  SIDEBAR_CHATS_USER_NAME: '[name="Username"]',
  SIDEBAR_CHATS_USER_NAME_VALUE: "//Text",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: '[name="indicator-offline"]',
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: '[name="indicator-online"]',
  SIDEBAR_CHATS_USER_STATUS: '[name="User Status"]',
  SIDEBAR_CHATS_USER_STATUS_VALUE: "//Text",
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: '[name="create-group-chat"]',
  SIDEBAR_GROUP_CHAT_IMAGE: '[name="user-image-group-wrap"]',
  SIDEBAR_GROUP_CHAT_PLUS_SOME: '[name="plus-some"]',
};

const SELECTORS_MACOS = {
  CREATE_GROUP_CHAT_CREATE_DM_BUTTON: "~create-dm-button",
  CREATE_GROUP_CHAT_FRIEND_CONTAINER: "~Friend Container",
  CREATE_GROUP_CHAT_SECTION: "~Create Group",
  CREATE_GROUP_CHAT_USER_IMAGE: "~User Image",
  CREATE_GROUP_CHAT_USER_IMAGE_WRAP: "~user-image-wrap",
  CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE: "~indicator-online",
  CREATE_GROUP_CHAT_USER_NAME: "~friend-name",
  CREATE_GROUP_CHAT_USER_NAME_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_SECTION: "~Chats",
  SIDEBAR_CHATS_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER: "~User",
  SIDEBAR_CHATS_USER_BADGE: "~User Badge",
  SIDEBAR_CHATS_USER_BADGE_NUMBER:
    "-ios class chain:**/XCUIElementTypeStaticText[2]",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO:
    "-ios class chain:**/XCUIElementTypeStaticText[1]",
  SIDEBAR_CHATS_USER_IMAGE: "~User Image",
  SIDEBAR_CHATS_USER_IMAGE_WRAP: "~user-image-wrap",
  SIDEBAR_CHATS_USER_INFO: "~User Info",
  SIDEBAR_CHATS_USER_NAME: "~Username",
  SIDEBAR_CHATS_USER_NAME_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: "~indicator-offline",
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: "~indicator-online",
  SIDEBAR_CHATS_USER_STATUS: "~User Status",
  SIDEBAR_CHATS_USER_STATUS_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: "~create-group-chat",
  SIDEBAR_GROUP_CHAT_IMAGE: "~user-image-group-wrap",
  SIDEBAR_GROUP_CHAT_PLUS_SOME: "~plus-some",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ChatsSidebar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get createGroupChatSection() {
    return this.instance.$(SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  get createGroupChatCreateDMButton() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_CREATE_DM_BUTTON);
  }

  get createGroupChatSearchInput() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CHAT_SEARCH_INPUT);
  }

  get createGroupChatFriendContainer() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER);
  }

  get createGroupChatUserImage() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_IMAGE);
  }

  get createGroupChatUserImageWrap() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_IMAGE_WRAP);
  }

  get createGroupChatUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_INDICATOR_OFFLINE);
  }

  get createGroupChatUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_INDICATOR_ONLINE);
  }

  get createGroupChatUserName() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME);
  }

  get createGroupChatUserNameText() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_FRIEND_CONTAINER)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME)
      .$(SELECTORS.CREATE_GROUP_CHAT_USER_NAME_TEXT);
  }

  get siderbarChatsHeader() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDERBAR_CHATS_HEADER);
  }

  get sidebarChatsSection() {
    return this.instance.$(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get sidebarChatsUser() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER);
  }

  get sidebarChatsUserBadge() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE);
  }

  get sidebarChatsUserBadgeNumber() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_NUMBER);
  }

  get sidebarChatsUserBadgeTimeAgo() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_TIME_AGO);
  }

  get sidebarChatsUserImage() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarChatsUserImageWrap() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP);
  }

  get sidebarChatsUserInfo() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_INFO);
  }

  get sidebarChatsUserName() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME);
  }
  get sidebarChatsUserNameValue() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME)
      .$(SELECTORS.SIDEBAR_CHATS_USER_NAME_VALUE);
  }

  get sidebarChatsUserOfflineIndicator() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarChatsUserOnlineIndicator() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
  }

  get sidebarChatsUserStatus() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS);
  }

  get sidebarChatsUserStatusValue() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
  }

  get sidebarCreateGroupChat() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CREATE_GROUP_CHAT_BUTTON);
  }

  get sidebarCreateGroupChatTooltip() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.TOOLTIP);
  }

  get sidebarCreateGroupChatTooltipText() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get sidebarGroupChatImage() {
    return this.instance.$(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE);
  }

  get sidebarGroupChatPlusSome() {
    return this.instance
      .$(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$(SELECTORS.SIDEBAR_GROUP_CHAT_PLUS_SOME);
  }

  get sidebarGroupChatUserImages() {
    return this.instance
      .$(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarGroupChatUserImageWraps() {
    return this.instance
      .$(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP);
  }

  get sidebarGroupChatUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarGroupChatsUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
  }

  // Validations or assertions

  async validateLastMessageDisplayed(message: string) {
    await expect(this.sidebarChatsUserStatusValue).toHaveTextContaining(
      message
    );
  }

  async validateLastMessageTimeAgo() {
    await expect(this.sidebarChatsUserBadgeTimeAgo).toHaveTextContaining(
      /(?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
  }

  async validateNoUnreadMessages() {
    await this.sidebarChatsUserBadge.waitForExist({ reverse: true });
  }

  async validateNoSidebarChatsAreDisplayed() {
    await this.sidebarChatsUser.waitForExist({ reverse: true });
  }

  async validateNumberOfUnreadMessages(badgeNumber: string) {
    await expect(this.sidebarChatsUserBadgeNumber).toHaveTextContaining(
      badgeNumber
    );
  }

  async validateUsernameDisplayed(username: string) {
    await expect(this.sidebarChatsUserNameValue).toHaveTextContaining(username);
  }

  // Waiting methods

  async waitForReceivingMessageOnSidebar(timeout: number = 30000) {
    await this.sidebarChatsUserStatusValue.waitForExist({ timeout: timeout });
  }

  // Get Sidebar elements

  async getSidebarUserLocator(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let element;
    if (currentDriver === "mac2") {
      element = await this.instance.$(
        '//XCUIElementTypeGroup[@label="User Info"]/XCUIElementTypeGroup[@label="Username"]/XCUIElementTypeStaticText[contains(@value, "' +
          username +
          '")]/../../..'
      );
    } else if (currentDriver === "windows") {
      element = await this.instance.$(
        '//Group[@Name="User Info"]/Group[@Name="Username"]/Text[contains(@Name, "' +
          username +
          '")]/../../..'
      );
    }
    return element;
  }

  async getSidebarUserImage(username: string) {
    const userLocator = await this.getSidebarUserLocator(username);
    const imageLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
    return imageLocator;
  }

  async getSidebarUserStatus(username: string) {
    const userLocator = await this.getSidebarUserLocator(username);
    const statusLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_INFO)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
    return statusLocator;
  }

  async getSidebarUserIndicatorOffline(username: string) {
    const userLocator = await this.getSidebarUserLocator(username);
    const offlineLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
    return offlineLocator;
  }

  async getSidebarUserIndicatorOnline(username: string) {
    const userLocator = await this.getSidebarUserLocator(username);
    const onlineLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
    return onlineLocator;
  }

  // Context menu methods

  async openContextMenuOnSidebar(username: string) {
    const imageToRightClick = await this.getSidebarUserIndicatorOnline(
      username
    );
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(imageToRightClick, this.executor);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(imageToRightClick, this.executor);
    }
  }

  async openContextOnFirstSidebarChat() {
    const imageToRightClick = await this.sidebarChatsUser;
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(imageToRightClick, this.executor);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(imageToRightClick, this.executor);
    }
  }

  // Go to sidebar conversation
  async goToSidebarChat(username: string) {
    const imageToClick = await this.getSidebarUserImage(username);
    await imageToClick.click();
  }

  async goToSidebarFirstChat() {
    const imageToClick = await this.sidebarChatsUser;
    await imageToClick.click();
  }
}

require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CHAT_SEARCH_INPUT: '[name="chat-search-input"]',
  SIDEBAR: '[name="sidebar"]',
  SIDEBAR_CHATS_HEADER: "~chats-label",
  SIDEBAR_CHATS_HEADER_TEXT: "<Text>",
  SIDEBAR_CHATS_SECTION: "~chats",
  SIDEBAR_CHATS_USER: "<Group>",
  SIDEBAR_CHATS_USER_BADGE: '[name="User Badge"]',
  SIDEBAR_CHATS_USER_BADGE_NUMBER: '[name="badge-count"]',
  SIDEBAR_CHATS_USER_BADGE_NUMBER_VALUE: "<Text>",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO: '[name="badge-prefix"]',
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO_VALUE: "<Text>",
  SIDEBAR_CHATS_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_CHATS_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  SIDEBAR_CHATS_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SIDEBAR_CHATS_USER_INFO: '[name="User Info"]',
  SIDEBAR_CHATS_USER_NAME: '[name="Username"]',
  SIDEBAR_CHATS_USER_NAME_VALUE: "<Text>",
  SIDEBAR_CHATS_USER_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  SIDEBAR_CHATS_USER_DO_NOT_DISTURB_INDICATOR:
    '[name="indicator-do-not-disturb"]',
  SIDEBAR_CHATS_USER_IDLE_INDICATOR: '[name="indicator-idle"]',
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: '[name="indicator-offline"]',
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: '[name="indicator-online"]',
  SIDEBAR_CHATS_USER_PROFILE_TYPING: '[name="profile-typing"]',
  SIDEBAR_CHATS_USER_STATUS: '[name="User Status"]',
  SIDEBAR_CHATS_USER_STATUS_VALUE: "<Text>",
  SIDEBAR_CHILDREN: '[name="sidebar-children"]',
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: '[name="create-group-chat"]',
  SIDEBAR_GROUP_CHAT_IMAGE: '[name="user-image-group-wrap"]',
  SIDEBAR_GROUP_CHAT_PLUS_SOME: '[name="plus-some"]',
  SIDEBAR_SEARCH: '[name="sidebar-search"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "<Text>",
};

const SELECTORS_MACOS = {
  CHAT_SEARCH_INPUT: "~chat-search-input",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHATS_HEADER: "~chats-label",
  SIDEBAR_CHATS_HEADER_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_SECTION: "~Chats",
  SIDEBAR_CHATS_USER: "-ios class chain:**/XCUIElementTypeGroup",
  SIDEBAR_CHATS_USER_BADGE: "~User Badge",
  SIDEBAR_CHATS_USER_BADGE_NUMBER: "~badge-count",
  SIDEBAR_CHATS_USER_BADGE_NUMBER_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO: "~badge-prefix",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER_IMAGE: "~User Image",
  SIDEBAR_CHATS_USER_IMAGE_PROFILE: "~user-image-profile",
  SIDEBAR_CHATS_USER_IMAGE_WRAP: "~user-image-wrap",
  SIDEBAR_CHATS_USER_INFO: "~User Info",
  SIDEBAR_CHATS_USER_NAME: "~Username",
  SIDEBAR_CHATS_USER_NAME_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHATS_USER_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  SIDEBAR_CHATS_USER_DO_NOT_DISTURB_INDICATOR: "~indicator-do-not-disturb",
  SIDEBAR_CHATS_USER_IDLE_INDICATOR: "~indicator-idle",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: "~indicator-offline",
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: "~indicator-online",
  SIDEBAR_CHATS_USER_PROFILE_TYPING: "~profile-typing",
  SIDEBAR_CHATS_USER_STATUS: "~User Status",
  SIDEBAR_CHATS_USER_STATUS_VALUE:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_CHILDREN: "~sidebar-children",
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: "~create-group-chat",
  SIDEBAR_GROUP_CHAT_IMAGE: "~user-image-group-wrap",
  SIDEBAR_GROUP_CHAT_PLUS_SOME: "~plus-some",
  SIDEBAR_SEARCH: "~sidebar-search",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ChatsSidebar extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get chatSearchInput() {
    return this.sidebarSearch.$(SELECTORS.CHAT_SEARCH_INPUT);
  }

  get siderbarChatsHeader() {
    return this.sidebarChatsSection.$(SELECTORS.SIDERBAR_CHATS_HEADER);
  }

  get siderbarChatsHeaderText() {
    return this.siderbarChatsHeader.$(SELECTORS.SIDEBAR_CHATS_HEADER_TEXT);
  }

  get sidebar() {
    return $(SELECTORS.SIDEBAR);
  }

  get sidebarChatsSection() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get sidebarChildren() {
    return $(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarChatsUser() {
    return this.sidebarChatsSection.$(SELECTORS.SIDEBAR_CHATS_USER);
  }

  get sidebarChatsUserBadge() {
    return this.sidebarChatsUser.$(SELECTORS.SIDEBAR_CHATS_USER_BADGE);
  }

  get sidebarChatsUserBadgeNumber() {
    return this.sidebarChatsUserBadge.$(
      SELECTORS.SIDEBAR_CHATS_USER_BADGE_NUMBER,
    );
  }

  get sidebarChatsUserBadgeNumberValue() {
    return this.sidebarChatsUserBadgeNumber.$(
      SELECTORS.SIDEBAR_CHATS_USER_BADGE_NUMBER_VALUE,
    );
  }

  get sidebarChatsUserBadgeTimeAgo() {
    return this.sidebarChatsUserBadge.$(
      SELECTORS.SIDEBAR_CHATS_USER_BADGE_TIME_AGO,
    );
  }

  get sidebarChatsUserBadgeTimeAgoValue() {
    return this.sidebarChatsUserBadgeTimeAgo.$(
      SELECTORS.SIDEBAR_CHATS_USER_BADGE_TIME_AGO_VALUE,
    );
  }

  get sidebarChatsUserImage() {
    return this.sidebarChatsUser.$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarChatsUserImageProfile() {
    return this.sidebarChatsSection.$(
      SELECTORS.SIDEBAR_CHATS_USER_IMAGE_PROFILE,
    );
  }

  get sidebarChatsUserImageWrap() {
    return this.sidebarChatsUser.$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP);
  }

  get sidebarChatsUserInfo() {
    return this.sidebarChatsUser.$(SELECTORS.SIDEBAR_CHATS_USER_INFO);
  }

  get sidebarChatsUserName() {
    return this.sidebarChatsUser.$(SELECTORS.SIDEBAR_CHATS_USER_NAME);
  }
  get sidebarChatsUserNameValue() {
    return this.sidebarChatsUserName.$(SELECTORS.SIDEBAR_CHATS_USER_NAME_VALUE);
  }

  get sidebarChatsUserIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_INDICATOR);
  }

  get sidebarChatsUserDoNotDisturbIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_DO_NOT_DISTURB_INDICATOR);
  }

  get sidebarChatsUserIdleIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IDLE_INDICATOR);
  }

  get sidebarChatsUserOfflineIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarChatsUserOnlineIndicator() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
  }

  get sidebarChatsUserProfileTyping() {
    return $$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_PROFILE_TYPING);
  }

  get sidebarChatsUserStatus() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS);
  }

  get sidebarChatsUserStatusValue() {
    return $(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
  }

  get sidebarCreateGroupChat() {
    return this.sidebarChatsSection.$(
      SELECTORS.SIDEBAR_CREATE_GROUP_CHAT_BUTTON,
    );
  }

  get sidebarCreateGroupChatTooltip() {
    return $(SELECTORS.TOOLTIP);
  }

  get sidebarCreateGroupChatTooltipText() {
    return this.sidebarCreateGroupChatTooltip.$(SELECTORS.TOOLTIP_TEXT);
  }

  get sidebarGroupChatImage() {
    return $(SELECTORS.SIDEBAR_GROUP_CHAT_IMAGE);
  }

  get sidebarGroupChatPlusSome() {
    return this.sidebarGroupChatImage.$(SELECTORS.SIDEBAR_GROUP_CHAT_PLUS_SOME);
  }

  get sidebarGroupChatUserImages() {
    return this.sidebarGroupChatImage
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarGroupChatUserImageWraps() {
    return this.sidebarGroupChatImage.$$(
      SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP,
    );
  }

  get sidebarGroupChatUserIndicator() {
    return this.sidebarGroupChatImage
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_INDICATOR);
  }

  get sidebarGroupChatUserIndicatorOffline() {
    return this.sidebarGroupChatImage
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
  }

  get sidebarGroupChatsUserIndicatorOnline() {
    return this.sidebarGroupChatImage
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
  }

  get sidebarSearch() {
    return $(SELECTORS.SIDEBAR_SEARCH);
  }

  // Validations or assertions

  async validateLastMessageDisplayed(message: string) {
    const sidebarStatusValue = await this.sidebarChatsUserStatusValue;
    await sidebarStatusValue.waitUntil(
      async () => {
        return (await sidebarStatusValue.getText()) === message;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected sidebar status value never include the message after 15 seconds",
      },
    );
  }

  async validateLastMessageTimeAgo() {
    const timeAgo = await this.sidebarChatsUserBadgeTimeAgoValue;
    await expect(timeAgo).toHaveTextContaining(
      /(?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/,
    );
  }

  async validateNoUnreadMessages() {
    await this.sidebarChatsUserBadge.waitForExist({
      reverse: true,
      timeout: 15000,
      timeoutMsg:
        "Expected badge number of unread messages is still displayed after 15 seconds",
    });
  }

  async validateNoSidebarChatsAreDisplayed() {
    await this.sidebarChatsUserImageProfile.waitForExist({
      reverse: true,
      timeout: 15000,
      timeoutMsg: "Sidebar chats are still displayed after 15 seconds",
    });
  }

  async validateSidebarChatIsNotDisplayed(username: string) {
    const locator = await this.getNonExistingElementByAriaLabel(username);
    await driver.waitUntil(
      async () => {
        return await $(SELECTORS.SIDEBAR)
          .$(locator)
          .waitForExist({ reverse: true });
      },
      {
        timeout: 15000,
        timeoutMsg: "Sidebar chats are still displayed after 15 seconds",
      },
    );
  }

  async validateNoSidebarGroupChatsAreDisplayed() {
    await driver.waitUntil(
      async () => {
        return await this.sidebarGroupChatImage.waitForExist({ reverse: true });
      },
      {
        timeout: 15000,
        timeoutMsg: "Sidebar group chats are still displayed after 15 seconds",
      },
    );
  }

  async validateNumberOfUnreadMessages(badgeNumber: string) {
    const unreadMessages = await this.sidebarChatsUserBadgeNumberValue;
    await expect(unreadMessages).toHaveTextContaining(badgeNumber);
  }

  async validateUsernameDisplayed(username: string) {
    const usernameDisplayed = await this.sidebarChatsUserNameValue;
    await expect(usernameDisplayed).toHaveTextContaining(username);
  }

  async validateSidebarChatsIsShown() {
    const sidebarChats = await this.sidebarChatsUser;
    await sidebarChats.waitForExist();
  }

  // Waiting methods

  async waitForReceivingMessageOnSidebar() {
    await driver.waitUntil(
      async () => {
        return await this.sidebarChatsUserStatusValue;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Sidebar never displayed received messages after 15 seconds",
      },
    );
  }

  // Get Sidebar Group elements

  async getExistingElementByAriaLabel(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = await $(SELECTORS.SIDEBAR).$("~" + username);
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await $(SELECTORS.SIDEBAR).$('[name="' + username + '"]');
    }
    return locator;
  }

  async getNonExistingElementByAriaLabel(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = "~" + username;
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = '[name="' + username + '"]';
    }
    return locator;
  }

  async waitForGroupToBeCreated(groupname: string) {
    const element = await this.getExistingElementByAriaLabel(groupname);
    await $(SELECTORS.SIDEBAR).$(element).waitForExist();
  }

  async waitForGroupToBeDeleted(groupname: string) {
    const element = await this.getNonExistingElementByAriaLabel(groupname);
    await $(SELECTORS.SIDEBAR).$(element).waitForExist({ reverse: true });
  }

  async getSidebarGroupPlusSome(groupname: string) {
    const groupLocator = await this.getExistingElementByAriaLabel(groupname);
    const plusSomeLocator = await groupLocator.$(
      SELECTORS.SIDEBAR_GROUP_CHAT_PLUS_SOME,
    );
    await plusSomeLocator.waitForExist();
    return plusSomeLocator;
  }

  async getSidebarGroupStatus(groupname: string) {
    const groupLocator = await this.getExistingElementByAriaLabel(groupname);
    const statusLocator = await groupLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
    await statusLocator.waitForExist();
    return statusLocator;
  }

  // Get Sidebar User elements

  async getSidebarUserImage(username: string) {
    const userLocator = await this.getExistingElementByAriaLabel(username);
    const imageLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
    await imageLocator.waitForExist();
    return imageLocator;
  }

  async getSidebarUserStatus(username: string) {
    const userLocator = await this.getExistingElementByAriaLabel(username);
    const statusLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_INFO)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
    await statusLocator.waitForExist();
    return statusLocator;
  }

  async getSidebarUserIndicator(username: string) {
    const userLocator = await this.getExistingElementByAriaLabel(username);
    const indicatorLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_INDICATOR);
    await indicatorLocator.waitForExist();
    return indicatorLocator;
  }

  async getSidebarUserIndicatorOffline(username: string) {
    const userLocator = await this.getExistingElementByAriaLabel(username);
    const offlineLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_OFFLINE_INDICATOR);
    await offlineLocator.waitForExist();
    return offlineLocator;
  }

  async getSidebarUserIndicatorOnline(username: string) {
    const userLocator = await this.getExistingElementByAriaLabel(username);
    await driver.waitUntil(
      async () => {
        return await userLocator
          .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
          .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
          .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected indicator online was never displayed on Chats Sidebar after 15 seconds",
      },
    );

    const onlineLocator = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_ONLINE_INDICATOR);
    return onlineLocator;
  }

  async getSidebarUserProfileTyping(username: string) {
    const userLocator = await this.getExistingElementByAriaLabel(username);
    const profileTyping = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_PROFILE_TYPING);
    await profileTyping.waitForExist();
    return profileTyping;
  }

  // Context menu methods

  async openContextMenuOnSidebar(username: string) {
    const imageToRightClick = await this.getSidebarUserIndicator(username);
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(imageToRightClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(imageToRightClick);
    }
  }

  async openContextOnFirstSidebarChat() {
    const imageToRightClick = await this.sidebarChatsUser;
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(imageToRightClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(imageToRightClick);
    }
  }

  async openContextMenuOnGroupChat(groupName: string) {
    const imageToRightClick =
      await this.getExistingElementByAriaLabel(groupName);
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(imageToRightClick);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(imageToRightClick);
    }
  }

  // Go to sidebar conversation
  async goToSidebarChat(username: string) {
    const imageToClick = await this.getSidebarUserImage(username);
    await imageToClick.click();
  }

  async goToSidebarGroupChat(groupname: string) {
    const elementToClick = await this.getSidebarGroupStatus(groupname);
    await elementToClick.click();
  }

  async goToSidebarFirstChat() {
    const imageToClick = await this.sidebarChatsUser;
    await imageToClick.click();
  }

  // Group Chats Methods

  async clickOnCreateGroupChat() {
    const createGroupButton = await this.sidebarCreateGroupChat;
    await createGroupButton.click();
  }

  async hoverOnCreateGroupButton() {
    const createGroupButton = await this.sidebarCreateGroupChat;
    await this.hoverOnElement(createGroupButton);
  }

  // Search bar methods

  async clearSidebarSearchInput() {
    const chatSearchInput = await this.chatSearchInput;
    await chatSearchInput.clearValue();
  }

  async typeOnSidebarSearchInput(text: string) {
    const chatSearchInput = await this.chatSearchInput;
    await chatSearchInput.clearValue();
    await chatSearchInput.setValue(text);
    const chatSearchInputValue = await chatSearchInput.getText();
    if (chatSearchInputValue !== text) {
      await this.typeOnSidebarSearchInput(text);
    }
  }
}

import {
  MACOS_DRIVER as macDriver,
  WINDOWS_DRIVER as windowsDriver,
  USER_A_INSTANCE as firstUserInstance,
} from "../../helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[firstUserInstance].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CHAT_SEARCH_INPUT: '[name="chat-search-input"]',
  SIDEBAR: '[name="sidebar"]',
  SIDEBAR_CHATS_HEADER: "~chats-label",
  SIDEBAR_CHATS_HEADER_TEXT: "//Text",
  SIDEBAR_CHATS_SECTION: "~chats",
  SIDEBAR_CHATS_USER: '[name="User"]',
  SIDEBAR_CHATS_USER_BADGE: '[name="User Badge"]',
  SIDEBAR_CHATS_USER_BADGE_NUMBER: '[name="badge-count"]',
  SIDEBAR_CHATS_USER_BADGE_NUMBER_VALUE: "//Text",
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO: '[name="badge-prefix"]',
  SIDEBAR_CHATS_USER_BADGE_TIME_AGO_VALUE: "//Text",
  SIDEBAR_CHATS_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_CHATS_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  SIDEBAR_CHATS_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SIDEBAR_CHATS_USER_INFO: '[name="User Info"]',
  SIDEBAR_CHATS_USER_NAME: '[name="Username"]',
  SIDEBAR_CHATS_USER_NAME_VALUE: "//Text",
  SIDEBAR_CHATS_USER_OFFLINE_INDICATOR: '[name="indicator-offline"]',
  SIDEBAR_CHATS_USER_ONLINE_INDICATOR: '[name="indicator-online"]',
  SIDEBAR_CHATS_USER_PROFILE_TYPING: '[name="profile-typing"]',
  SIDEBAR_CHATS_USER_STATUS: '[name="User Status"]',
  SIDEBAR_CHATS_USER_STATUS_VALUE: "//Text",
  SIDEBAR_CHILDREN: '[name="sidebar-children"]',
  SIDEBAR_CREATE_GROUP_CHAT_BUTTON: '[name="create-group-chat"]',
  SIDEBAR_GROUP_CHAT_IMAGE: '[name="user-image-group-wrap"]',
  SIDEBAR_GROUP_CHAT_PLUS_SOME: '[name="plus-some"]',
  SIDEBAR_SEARCH: '[name="sidebar-search"]',
  SIDEBAR_SEARCH_DROPDOWN: '[name="searchbar-dropwdown"]',
  SIDEBAR_SEARCH_DROPDOWN_RESULT: '[name="search-friends-result"]',
  SIDEBAR_SEARCH_DROPDOWN_RESULT_TEXT: "//Text",
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Text",
};

const SELECTORS_MACOS = {
  CHAT_SEARCH_INPUT: "~chat-search-input",
  SIDEBAR: "~sidebar",
  SIDEBAR_CHATS_HEADER: "~chats-label",
  SIDEBAR_CHATS_HEADER_TEXT: "-ios class chain:**/XXCUIElementTypeStaticText",
  SIDEBAR_CHATS_SECTION: "~Chats",
  SIDEBAR_CHATS_USER: "~User",
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
  SIDEBAR_SEARCH_DROPDOWN: "~searchbar-dropwdown",
  SIDEBAR_SEARCH_DROPDOWN_RESULT: "~search-friends-result",
  SIDEBAR_SEARCH_DROPDOWN_RESULT_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
};

currentOS === windowsDriver
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ChatsSidebar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get chatSearchInput() {
    return this.instance.$(SELECTORS.CHAT_SEARCH_INPUT);
  }

  get siderbarChatsHeader() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDERBAR_CHATS_HEADER);
  }

  get siderbarChatsHeaderText() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDERBAR_CHATS_HEADER)
      .$(SELECTORS.SIDEBAR_CHATS_HEADER_TEXT);
  }

  get sidebar() {
    return this.instance.$(SELECTORS.SIDEBAR);
  }

  get sidebarChatsSection() {
    return this.instance.$(SELECTORS.SIDEBAR_CHATS_SECTION);
  }

  get sidebarChildren() {
    return this.instance.$(SELECTORS.SIDEBAR_CHILDREN);
  }

  get sidebarSearch() {
    return this.instance.$(SELECTORS.SIDEBAR_SEARCH);
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

  get sidebarChatsUserBadgeNumberValue() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_NUMBER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_NUMBER_VALUE);
  }

  get sidebarChatsUserBadgeTimeAgo() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_TIME_AGO);
  }

  get sidebarChatsUserBadgeTimeAgoValue() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_TIME_AGO)
      .$(SELECTORS.SIDEBAR_CHATS_USER_BADGE_TIME_AGO_VALUE);
  }

  get sidebarChatsUserImage() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE);
  }

  get sidebarChatsUserImageProfile() {
    return this.instance
      .$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER)
      .$$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_PROFILE);
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

  get sidebarChatsUserProfileTyping() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_CHATS_SECTION)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_PROFILE_TYPING);
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
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get sidebarCreateGroupChatTooltipText() {
    return this.instance.$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
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

  get sidebarSearchDropdown() {
    return this.instance.$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN);
  }

  get sidebarSearchDropdownResult() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN)
      .$$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN_RESULT);
  }

  get sidebarSearchDropdownResultText() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN)
      .$$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN_RESULT)
      .$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN_RESULT_TEXT);
  }

  // Validations or assertions

  async validateLastMessageDisplayed(message: string) {
    await expect(this.sidebarChatsUserStatusValue).toHaveTextContaining(
      message
    );
  }

  async validateLastMessageTimeAgo() {
    await expect(this.sidebarChatsUserBadgeTimeAgoValue).toHaveTextContaining(
      /(?:\d{1,2}\s+(?:second|minute)s?\s+ago|now)$/
    );
  }

  async validateNoUnreadMessages() {
    await this.sidebarChatsUserBadge.waitForExist({ reverse: true });
  }

  async validateNoSidebarChatsAreDisplayed() {
    await this.sidebarChatsUser.waitForExist({ reverse: true });
  }

  async validateNoSidebarGroupChatsAreDisplayed() {
    await this.sidebarGroupChatImage.waitForExist({ reverse: true });
  }

  async validateNumberOfUnreadMessages(badgeNumber: string) {
    await expect(this.sidebarChatsUserBadgeNumberValue).toHaveTextContaining(
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

  // Get Sidebar Group elements

  async waitForGroupToBeCreated(groupname: string) {
    const currentDriver = await this.getCurrentDriver();
    let element;
    if (currentDriver === macDriver) {
      element =
        '//XCUIElementTypeGroup[@label="user-image-group-wrap"]/..//XCUIElementTypeGroup[@label="Username"]/XCUIElementTypeStaticText[contains(@value, "' +
        groupname +
        '")]';
    } else if (currentDriver === windowsDriver) {
      element =
        '//Group[@Name="user-image-group-wrap"]/..//Group[@Name="Username"]/Text[contains(@Name, "' +
        groupname +
        '")]';
    }
    await this.instance.$(element).waitForExist();
  }

  async waitForGroupToBeDeleted(groupname: string) {
    const currentDriver = await this.getCurrentDriver();
    let element;
    if (currentDriver === macDriver) {
      element =
        '//XCUIElementTypeGroup[@label="user-image-group-wrap"]/..//XCUIElementTypeGroup[@label="Username"]/XCUIElementTypeStaticText[contains(@value, "' +
        groupname +
        '")]';
    } else if (currentDriver === windowsDriver) {
      element =
        '//Group[@Name="user-image-group-wrap"]/..//Group[@Name="Username"]/Text[contains(@Name, "' +
        groupname +
        '")]';
    }
    await this.instance.$(element).waitForExist({ reverse: true });
  }

  async getSidebarGroupLocator(groupname: string) {
    const currentDriver = await this.getCurrentDriver();
    let element;
    if (currentDriver === macDriver) {
      element = await this.instance.$(
        '//XCUIElementTypeGroup[@label="user-image-group-wrap"]/..//XCUIElementTypeGroup[@label="Username"]/XCUIElementTypeStaticText[contains(@value, "' +
          groupname +
          '")]/../../..'
      );
    } else if (currentDriver === windowsDriver) {
      element = await this.instance.$(
        '//Group[@Name="user-image-group-wrap"]/..//Group[@Name="Username"]/Text[contains(@Name, "' +
          groupname +
          '")]/../../..'
      );
    }
    return element;
  }

  async getSidebarGroupPlusSome(groupname: string) {
    const groupLocator = await this.getSidebarGroupLocator(groupname);
    const plusSomeLocator = await groupLocator.$(
      SELECTORS.SIDEBAR_GROUP_CHAT_PLUS_SOME
    );
    return plusSomeLocator;
  }

  async getSidebarGroupStatus(groupname: string) {
    const groupLocator = await this.getSidebarGroupLocator(groupname);
    const statusLocator = await groupLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS)
      .$(SELECTORS.SIDEBAR_CHATS_USER_STATUS_VALUE);
    return statusLocator;
  }

  // Get Sidebar User elements

  async getSidebarUserLocator(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let element;
    if (currentDriver === macDriver) {
      element = await this.instance.$(
        '//XCUIElementTypeGroup[@label="User Info"]/XCUIElementTypeGroup[@label="Username"]/XCUIElementTypeStaticText[contains(@value, "' +
          username +
          '")]/../../..'
      );
    } else if (currentDriver === windowsDriver) {
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

  async getSidebarUserProfileTyping(username: string) {
    const userLocator = await this.getSidebarUserLocator(username);
    const profileTyping = await userLocator
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_CHATS_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_CHATS_USER_PROFILE_TYPING);
    return profileTyping;
  }

  // Context menu methods

  async openContextMenuOnSidebar(username: string) {
    const imageToRightClick = await this.getSidebarUserIndicatorOnline(
      username
    );
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === macDriver) {
      await rightClickOnMacOS(imageToRightClick, this.executor);
    } else if (currentDriver === windowsDriver) {
      await rightClickOnWindows(imageToRightClick, this.executor);
    }
  }

  async openContextOnFirstSidebarChat() {
    const imageToRightClick = await this.sidebarChatsUser;
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === macDriver) {
      await rightClickOnMacOS(imageToRightClick, this.executor);
    } else if (currentDriver === windowsDriver) {
      await rightClickOnWindows(imageToRightClick, this.executor);
    }
  }

  async openContextMenuOnGroupChat(groupName: string) {
    const imageToRightClick = await this.getSidebarGroupLocator(groupName);
    await this.hoverOnElement(imageToRightClick);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === macDriver) {
      await rightClickOnMacOS(imageToRightClick, this.executor);
    } else if (currentDriver === windowsDriver) {
      await rightClickOnWindows(imageToRightClick, this.executor);
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
    await this.sidebarCreateGroupChat.click();
  }

  async hoverOnCreateGroupButton() {
    const element = await this.sidebarCreateGroupChat;
    await this.hoverOnElement(element);
  }

  // Search bar methods

  async clickOnResultFromSidebarSearch(result: string) {
    const elementToClick = await this.getSidebarSearchResultLocator(result);
    await elementToClick.click();
  }

  async getSidebarSearchResults() {
    await this.sidebarSearchDropdown.waitForExist();
    const list = await this.instance.$$(
      SELECTORS.SIDEBAR_SEARCH_DROPDOWN_RESULT
    );
    let results = [];
    for (let item of list) {
      const resultName = await item
        .$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN_RESULT_TEXT)
        .getText();
      results.push(resultName);
    }
    return results;
  }

  async getSidebarSearchResultLocator(result: string) {
    const currentDriver = await this.getCurrentDriver();
    let element;
    if (currentDriver === macDriver) {
      element = await this.instance
        .$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN)
        .$(
          '//XCUIElementTypeLink[@label="search-friends-result"]/XCUIElementTypeStaticText[contains(@value, "' +
            result +
            '")]/'
        );
    } else if (currentDriver === windowsDriver) {
      element = await this.instance
        .$(SELECTORS.SIDEBAR_SEARCH_DROPDOWN)
        .$(
          '//Link[@Name="search-friends-result"]/Text[contains(@Name, "' +
            result +
            '")]'
        );
    }
    return element;
  }

  async clearSidebarSearchInput() {
    await this.chatSearchInput.clearValue();
  }

  async typeOnSidebarSearchInput(text: string) {
    await this.chatSearchInput.click();
    await this.chatSearchInput.setValue(text);
  }

  async validateSidebarSearchResultsIsEmpty() {
    await this.sidebarSearchDropdown.waitForExist({ reverse: true });
  }
}

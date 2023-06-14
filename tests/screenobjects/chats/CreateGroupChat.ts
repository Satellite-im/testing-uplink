const robot = require("robotjs");
import { getClipboardMacOS } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CREATE_GROUP_CHAT_BUTTON: '[name="create-dm-button"]',
  CREATE_GROUP_CHAT_SECTION: '[name="Create Group"]',
  CREATE_GROUP_INPUT_ERROR: '[name="input-error"]',
  CREATE_GROUP_INPUT_ERROR_TEXT: "//Text",
  CREATE_GROUP_NAME: '[name="create-group-name"]',
  CREATE_GROUP_NAME_LABEL: '[name="group-name-label"]',
  CREATE_GROUP_USERS_LABEL: '[name="users-label"]',
  FRIEND_CONTAINER: '[name="Friend Container"]',
  FRIEND_USER_IMAGE: '[name="User Image"]',
  FRIEND_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FRIEND_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FRIEND_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FRIEND_INDICATOR_ONLINE: '[name="indicator-online"]',
  FRIEND_USER_NAME: '[name="friend-name"]',
  FRIEND_USER_NAME_TEXT: "//Text",
  FRIENDS_LIST: '[name="friends-list"]',
  GROUP_NAME_INPUT: '//Edit[@Name="groupname-input"]',
  USER_SEARCH_INPUT: '//Edit[@Name="friend-search-input"]',
};

const SELECTORS_MACOS = {
  CREATE_GROUP_CHAT_BUTTON: "~create-dm-button",
  CREATE_GROUP_CHAT_SECTION: "~Create Group",
  CREATE_GROUP_INPUT_ERROR: "~input-error",
  CREATE_GROUP_INPUT_ERROR_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  CREATE_GROUP_NAME: "~create-group-name",
  CREATE_GROUP_NAME_LABEL: "~group-name-label",
  CREATE_GROUP_USERS_LABEL: "~users-label",
  FRIEND_CONTAINER: "~Friend Container",
  FRIEND_USER_IMAGE: "~User Image",
  FRIEND_USER_IMAGE_PROFILE: "~user-image-profile",
  FRIEND_USER_IMAGE_WRAP: "~user-image-wrap",
  FRIEND_INDICATOR_OFFLINE: "~indicator-offline",
  FRIEND_INDICATOR_ONLINE: "~indicator-online",
  FRIEND_USER_NAME: "~friend-name",
  FRIEND_USER_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  FRIENDS_LIST: "~friends-list",
  GROUP_NAME_INPUT: "~groupname-input",
  USER_SEARCH_INPUT: "~friend-search-input",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class CreateGroupChat extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  get createGroupChatButton() {
    return this.createGroupChatSection.$(SELECTORS.CREATE_GROUP_CHAT_BUTTON);
  }

  get createGroupChatSection() {
    return this.instance.$(SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  get createGroupInputError() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_NAME)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR);
  }

  get createGroupInputErrorText() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_NAME)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR_TEXT);
  }

  get createGroupName() {
    return this.createGroupChatSection.$(SELECTORS.CREATE_GROUP_NAME);
  }

  get createGroupNameLabel() {
    return this.createGroupName.$(SELECTORS.CREATE_GROUP_NAME_LABEL);
  }

  get createGroupUsersLabel() {
    return this.createGroupChatSection.$(SELECTORS.CREATE_GROUP_USERS_LABEL);
  }

  get friendContainer() {
    return this.friendsList.$$(SELECTORS.FRIEND_CONTAINER);
  }

  get friendUserImage() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_IMAGE);
  }

  get friendUserImageProfile() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_IMAGE_PROFILE);
  }

  get friendUserImageWrap() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_IMAGE_WRAP);
  }

  get friendIndicatorOffline() {
    return this.friendContainer.$(SELECTORS.FRIEND_INDICATOR_OFFLINE);
  }

  get friendIndicatorOnline() {
    return this.friendContainer.$(SELECTORS.FRIEND_INDICATOR_ONLINE);
  }

  get friendUserName() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_NAME);
  }

  get friendUserNameText() {
    return this.friendUserName.$(SELECTORS.FRIEND_USER_NAME_TEXT);
  }

  get friendsList() {
    return this.createGroupChatSection.$(SELECTORS.FRIENDS_LIST);
  }

  get groupNameInput() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_NAME)
      .$(SELECTORS.GROUP_NAME_INPUT);
  }

  get userSearchInput() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.USER_SEARCH_INPUT);
  }

  async clearGroupNameInput() {
    await this.groupNameInput.click();
    await this.groupNameInput.setValue("");
  }

  async clearUserSearchInput() {
    await this.userSearchInput.click();
    await this.userSearchInput.setValue("");
  }

  async clickOnCreateGroupChat() {
    await this.createGroupChatButton.click();
  }

  async getFriendFromListIndicatorOffline(username: string) {
    const locator = await this.getFriendFromListLocator(username);
    const indicatorOffline = await locator.$(
      SELECTORS.FRIEND_INDICATOR_OFFLINE
    );
    return indicatorOffline;
  }

  async getFriendFromListIndicatorOnline(username: string) {
    const locator = await this.getFriendFromListLocator(username);
    const indicatorOnline = await locator.$(SELECTORS.FRIEND_INDICATOR_ONLINE);
    return indicatorOnline;
  }

  async getFriendFromListUserImageProfile(username: string) {
    const locator = await this.getFriendFromListLocator(username);
    const userImageProfile = await locator.$(
      SELECTORS.FRIEND_USER_IMAGE_PROFILE
    );
    return userImageProfile;
  }

  async getFriendFromListLocator(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let element;
    if (currentDriver === "mac2") {
      element = await this.instance
        .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
        .$(SELECTORS.FRIENDS_LIST)
        .$(
          '//XCUIElementTypeGroup[@label="friend-name"]/XCUIElementTypeStaticText[contains(@value, "' +
            username +
            '")]/../..'
        );
    } else if (currentDriver === "windows") {
      element = await this.instance
        .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
        .$(SELECTORS.FRIENDS_LIST)
        .$(
          '//Group[@Name="friend-name"]/Text[contains(@Name, "' +
            username +
            '")]/../..'
        );
    }
    return element;
  }

  async getFriendFromListUserImage(username: string) {
    const locator = await this.getFriendFromListLocator(username);
    const userImage = await locator.$(SELECTORS.FRIEND_USER_IMAGE);
    return userImage;
  }

  async getFriendFromListUserImageWrap(username: string) {
    const locator = await this.getFriendFromListLocator(username);
    const userImageWrap = await locator.$(SELECTORS.FRIEND_USER_IMAGE_WRAP);
    return userImageWrap;
  }

  async getFriendFromListUsername(username: string) {
    const locator = await this.getFriendFromListLocator(username);
    const usernameLocator = await locator
      .$(SELECTORS.FRIEND_USER_NAME)
      .$(SELECTORS.FRIEND_USER_NAME_TEXT);
    return usernameLocator;
  }

  async selectUserFromList(username: string) {
    const locator = await this.getFriendFromListLocator(username);
    await locator.click();
  }

  async typeLongerTextInGroupName() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    await this.groupNameInput.click();
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      const userKey = await getClipboardMacOS();
      await this.groupNameInput.setValue(userKey + userKey);
    } else if (currentDriver === "windows") {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      await robot.keyTap("v", ["control"]);
      await robot.keyTap("v", ["control"]);
    }
  }

  async typeOnGroupName(name: string) {
    const element = await this.groupNameInput;
    await this.typeOnElement(element, name);
  }

  async typeOnUsersSearchInput(name: string) {
    const element = await this.userSearchInput;
    await this.typeOnElement(element, name);
  }

  // Validations

  async getNumberOfUsersInListFromCreateGroup() {
    const numberOfUsersInList = await this.friendContainer.length;
    return numberOfUsersInList;
  }

  async getListOfUsersInCreateGroup() {
    const usersInList = await this.friendContainer;
    let users = [];
    for (let user in usersInList) {
      const username = await user
        .$(SELECTORS.FRIEND_USER_NAME)
        .$(SELECTORS.FRIEND_USER_NAME_TEXT);
      users.push(username.getText());
    }
    return users;
  }

  async getInputErrorText() {
    const result = await this.createGroupInputErrorText.getText();
    return result.toString();
  }
}

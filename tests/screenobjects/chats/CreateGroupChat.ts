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
  GROUP_NAME_INPUT: '[name="groupname-input"]',
  USER_SEARCH_INPUT: '[name="friend-search-input"]',
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
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_CHAT_BUTTON);
  }

  get createGroupChatSection() {
    return this.instance.$(SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  get createGroupInputError() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR);
  }

  get createGroupInputErrorText() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR_TEXT);
  }

  get createGroupName() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_NAME);
  }

  get createGroupNameLabel() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_NAME)
      .$(SELECTORS.CREATE_GROUP_NAME_LABEL);
  }

  get createGroupUsersLabel() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.CREATE_GROUP_USERS_LABEL);
  }

  get friendContainer() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER);
  }

  get friendUserImage() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER)
      .$(SELECTORS.FRIEND_USER_IMAGE);
  }

  get friendUserImageProfile() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER)
      .$(SELECTORS.FRIEND_USER_IMAGE_PROFILE);
  }

  get friendUserImageWrap() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER)
      .$(SELECTORS.FRIEND_USER_IMAGE_WRAP);
  }

  get friendIndicatorOffline() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER)
      .$(SELECTORS.FRIEND_INDICATOR_OFFLINE);
  }

  get friendIndicatorOnline() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER)
      .$(SELECTORS.FRIEND_INDICATOR_ONLINE);
  }

  get friendUserName() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER)
      .$(SELECTORS.FRIEND_USER_NAME);
  }

  get friendUserNameText() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SEECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_CONTAINER)
      .$(SELECTORS.FRIEND_USER_NAME)
      .$(SELECTORS.FRIEND_USER_NAME_TEXT);
  }

  get friendsList() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.FRIENDS_LIST);
  }

  get groupNameInput() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.GROUP_NAME_INPUT);
  }

  get userSearchInput() {
    return this.instance
      .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.USER_SEARCH_INPUT);
  }

  async clearGroupNameInput() {
    await this.groupNameInput.clear();
  }

  async clearUserSearchInput() {
    await this.userSearchInput.clear();
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
    const username = await locator
      .$(SELECTORS.FRIEND_USER_NAME)
      .$(SELECTORS.FRIEND_USER_NAME_TEXT);
    return username;
  }

  async selectUserFromList(name: string) {
    const locator = await this.getFriendFromListLocator(username);
    await locator.click();
  }

  async typeOnGroupName(name: string) {
    await this.groupNameInput.setValue(name);
  }

  async typeOnUsersSearchInput(name: string) {
    await this.userSearchInput.setValue(name);
  }
}

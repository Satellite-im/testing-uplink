const { keyboard, Key } = require("@nut-tree/nut-js");
import "module-alias/register";
import { getClipboardMacOS } from "@helpers/commands";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CREATE_GROUP_CHAT_BUTTON: '[name="create-dm-button"]',
  CREATE_GROUP_CHAT_SECTION: '[name="Create Group"]',
  CREATE_GROUP_INPUT_ERROR: '[name="input-error"]',
  CREATE_GROUP_INPUT_ERROR_TEXT: "<Text>",
  CREATE_GROUP_NAME: '[name="create-group-name"]',
  CREATE_GROUP_NAME_LABEL: '[name="group-name-label"]',
  CREATE_GROUP_USERS_LABEL: '[name="users-label"]',
  FRIEND_CONTAINER: '[name="Friend Container"]',
  FRIEND_USER_IMAGE: '[name="User Image"]',
  FRIEND_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FRIEND_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FRIEND_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  FRIEND_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FRIEND_INDICATOR_ONLINE: '[name="indicator-online"]',
  FRIEND_USER_NAME: '[name="friend-name"]',
  FRIEND_USER_NAME_TEXT: "<Text>",
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
  FRIEND_INDICATOR: '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  FRIEND_INDICATOR_OFFLINE: "~indicator-offline",
  FRIEND_INDICATOR_ONLINE: "~indicator-online",
  FRIEND_USER_NAME: "~friend-name",
  FRIEND_USER_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  FRIENDS_LIST: "~friends-list",
  GROUP_NAME_INPUT: "~groupname-input",
  USER_SEARCH_INPUT: "~friend-search-input",
};

currentOS === WINDOWS_DRIVER
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

  get friendIndicator() {
    return this.friendContainer.$(SELECTORS.FRIEND_INDICATOR);
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
    const locator = await this.groupNameInput;
    const currentDriver = await this.getCurrentDriver();
    const groupNameInput = await this.groupNameInput;
    if (currentDriver === MACOS_DRIVER) {
      await groupNameInput.click();
    } else if (currentDriver === WINDOWS_DRIVER) {
      await driver[this.executor].touchAction([
        { action: "press", element: locator },
      ]);
    }
    await groupNameInput.setValue("");
  }

  async clearUserSearchInput() {
    const userSearchInput = await this.userSearchInput;
    await userSearchInput.click();
    await userSearchInput.setValue("");
  }

  async clickOnCreateGroupChat() {
    const createGroupChatButton = await this.createGroupChatButton;
    await createGroupChatButton.click();
  }

  async getFriendFromListIndicator(username: string, timeout: number = 15000) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const indicator = await friendLocator.$(SELECTORS.FRIEND_INDICATOR);
    await indicator.waitForExist({ timeout: timeout });
    return indicator;
  }

  async getFriendFromListIndicatorOffline(
    username: string,
    timeout: number = 15000,
  ) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const indicatorOffline = await friendLocator.$(
      SELECTORS.FRIEND_INDICATOR_OFFLINE,
    );
    await indicatorOffline.waitForExist({ timeout: timeout });
    return indicatorOffline;
  }

  async getFriendFromListIndicatorOnline(
    username: string,
    timeout: number = 15000,
  ) {
    const friendLocator = await this.getFriendFromListLocator(username);
    await driver[this.executor].waitUntil(
      async () => {
        return await friendLocator
          .$(SELECTORS.FRIEND_INDICATOR_ONLINE)
          .waitForExist({ timeout: timeout });
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected indicator online was never displayed on Create Group Users List after 15 seconds",
      },
    );

    const indicatorOnline = await friendLocator.$(
      SELECTORS.FRIEND_INDICATOR_ONLINE,
    );
    return indicatorOnline;
  }

  async getFriendFromListUserImageProfile(
    username: string,
    timeout: number = 15000,
  ) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const userImageProfile = await friendLocator.$(
      SELECTORS.FRIEND_USER_IMAGE_PROFILE,
    );
    await userImageProfile.waitForExist({ timeout: timeout });
    return userImageProfile;
  }

  async getFriendFromListLocator(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let friendLocator;
    if (currentDriver === MACOS_DRIVER) {
      friendLocator = await this.instance
        .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
        .$(SELECTORS.FRIENDS_LIST)
        .$(
          '//XCUIElementTypeGroup[@label="friend-name"]/XCUIElementTypeStaticText[contains(@value, "' +
            username +
            '")]/../..',
        );
    } else if (currentDriver === WINDOWS_DRIVER) {
      friendLocator = await this.instance
        .$(SELECTORS.CREATE_GROUP_CHAT_SECTION)
        .$(SELECTORS.FRIENDS_LIST)
        .$(
          '//Group[@Name="friend-name"]/Text[contains(@Name, "' +
            username +
            '")]/../..',
        );
    }
    return friendLocator;
  }

  async getFriendFromListUserImage(username: string, timeout: number = 15000) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const userImage = await friendLocator.$(SELECTORS.FRIEND_USER_IMAGE);
    await userImage.waitForExist({ timeout: timeout });
    return userImage;
  }

  async getFriendFromListUserImageWrap(
    username: string,
    timeout: number = 15000,
  ) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const userImageWrap = await friendLocator.$(
      SELECTORS.FRIEND_USER_IMAGE_WRAP,
    );
    await userImageWrap.waitForExist({ timeout: timeout });
    return userImageWrap;
  }

  async getFriendFromListUsername(username: string) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const usernameLocator = await friendLocator
      .$(SELECTORS.FRIEND_USER_NAME)
      .$(SELECTORS.FRIEND_USER_NAME_TEXT);
    await usernameLocator.waitForExist({ timeout: timeout });
    return usernameLocator;
  }

  async selectUserFromList(username: string) {
    const userLocator = await this.getFriendFromListUserImage(username);
    await userLocator.click();
  }

  async typeLongerTextInGroupName() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const groupNameInput = await this.groupNameInput;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await groupNameInput.click();
      const userKey = await getClipboardMacOS();
      await groupNameInput.setValue(userKey + userKey);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await driver[this.executor].touchAction([
        { action: "press", element: groupNameInput },
      ]);
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      await keyboard.type(Key.LeftControl, Key.V);
      await driver[this.executor].touchAction([
        { action: "press", element: locator },
      ]);
      await keyboard.type(Key.LeftControl, Key.V);
    }
  }

  async typeOnGroupName(name: string) {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.clearValue();
    await groupNameInput.setValue(name);
    const groupNameInputValue = await groupNameInput.getText();
    if (groupNameInputValue !== name) {
      await this.typeOnGroupName(name);
    }
  }

  async typeOnUsersSearchInput(name: string) {
    const userSearchInput = await this.userSearchInput;
    await userSearchInput.clearValue();
    await userSearchInput.setValue(name);
    const userSearchInputValue = await userSearchInput.getText();
    if (userSearchInputValue !== name) {
      await this.typeOnUsersSearchInput(name);
    }
  }

  // Validations

  async getNumberOfUsersInListFromCreateGroup() {
    const friendContainer = await this.friendContainer;
    const numberOfUsersInList = await friendContainer.length;
    return numberOfUsersInList;
  }

  async getListOfUsersInCreateGroup() {
    const usersInList = await this.friendContainer;
    let users = [];
    for (let user in usersInList) {
      const username = await user
        .$(SELECTORS.FRIEND_USER_NAME)
        .$(SELECTORS.FRIEND_USER_NAME_TEXT);
      const usernameText = await username.getText();
      users.push(usernameText);
    }
    return users;
  }

  async getInputErrorText() {
    const createGroupInputErrorText = await this.createGroupInputErrorText;
    const result = createGroupInputErrorText.getText();
    return result.toString();
  }

  async validateCreateGroupChatsIsShown(timeout: number = 15000) {
    const createGroupChatSection = await this.createGroupChatSection;
    await createGroupChatSection.waitForExist({ timeout: timeout });
  }
}

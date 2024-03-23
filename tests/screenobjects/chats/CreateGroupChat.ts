require("module-alias/register");
import { keyboardShortcutPaste, setClipboardValue } from "@helpers/commands";
import { faker } from "@faker-js/faker";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { selectorContainer } from "@screenobjects/AppScreen";

let SELECTORS: selectorContainer = {};

const SELECTORS_COMMON: selectorContainer = {};

const SELECTORS_WINDOWS: selectorContainer = {
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

const SELECTORS_MACOS: selectorContainer = {
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

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class CreateGroupChat extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  public get createGroupChatButton() {
    return this.createGroupChatSection.$(SELECTORS.CREATE_GROUP_CHAT_BUTTON);
  }

  public get createGroupChatSection() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION);
  }

  public get createGroupInputError() {
    return $(SELECTORS.CREATE_GROUP_NAME).$(SELECTORS.CREATE_GROUP_INPUT_ERROR);
  }

  public get createGroupInputErrorText() {
    return $(SELECTORS.CREATE_GROUP_NAME)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR)
      .$(SELECTORS.CREATE_GROUP_INPUT_ERROR_TEXT);
  }

  public get createGroupName() {
    return this.createGroupChatSection.$(SELECTORS.CREATE_GROUP_NAME);
  }

  public get createGroupNameLabel() {
    return this.createGroupName.$(SELECTORS.CREATE_GROUP_NAME_LABEL);
  }

  public get createGroupUsersLabel() {
    return this.createGroupChatSection.$(SELECTORS.CREATE_GROUP_USERS_LABEL);
  }

  public get friendContainer() {
    return this.friendsList.$(SELECTORS.FRIEND_CONTAINER);
  }

  public get friendUserImage() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_IMAGE);
  }

  public get friendUserImageProfile() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_IMAGE_PROFILE);
  }

  public get friendUserImageWrap() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_IMAGE_WRAP);
  }

  public get friendIndicator() {
    return this.friendContainer.$(SELECTORS.FRIEND_INDICATOR);
  }

  public get friendIndicatorOffline() {
    return this.friendContainer.$(SELECTORS.FRIEND_INDICATOR_OFFLINE);
  }

  public get friendIndicatorOnline() {
    return this.friendContainer.$(SELECTORS.FRIEND_INDICATOR_ONLINE);
  }

  public get friendUserName() {
    return this.friendContainer.$(SELECTORS.FRIEND_USER_NAME);
  }

  public get friendUserNameText() {
    return this.friendUserName.$(SELECTORS.FRIEND_USER_NAME_TEXT);
  }

  public get friendsList() {
    return this.createGroupChatSection.$(SELECTORS.FRIENDS_LIST);
  }

  public get groupNameInput() {
    return $(SELECTORS.CREATE_GROUP_NAME).$(SELECTORS.GROUP_NAME_INPUT);
  }

  public get userSearchInput() {
    return $(SELECTORS.CREATE_GROUP_CHAT_SECTION).$(
      SELECTORS.USER_SEARCH_INPUT,
    );
  }

  async clearGroupNameInput() {
    const locator = await this.groupNameInput;
    const currentDriver = await this.getCurrentDriver();
    const groupNameInput = await this.groupNameInput;
    if (currentDriver === MACOS_DRIVER) {
      await groupNameInput.click();
    } else if (currentDriver === WINDOWS_DRIVER) {
      await driver.touchAction([{ action: "press", element: locator }]);
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

  async getFriendFromListLocator(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let friendLocator;
    if (currentDriver === MACOS_DRIVER) {
      friendLocator = await $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
        .$(SELECTORS.FRIENDS_LIST)
        .$(
          '//XCUIElementTypeGroup[@label="friend-name"]/XCUIElementTypeStaticText[contains(@value, "' +
            username +
            '")]/../..',
        );
    } else if (currentDriver === WINDOWS_DRIVER) {
      friendLocator = await $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
        .$(SELECTORS.FRIENDS_LIST)
        .$(
          '//Group[@Name="friend-name"]/Text[contains(@Name, "' +
            username +
            '")]/../..',
        );
    }
    return friendLocator;
  }

  async getFriendFromListUserImage(username: string) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const userImage = await friendLocator?.$(SELECTORS.FRIEND_USER_IMAGE);
    await userImage?.waitForExist();
    return userImage;
  }

  async getFriendFromListMacOS(username: string) {
    const friendLocator = $(SELECTORS.CREATE_GROUP_CHAT_SECTION)
      .$(SELECTORS.FRIENDS_LIST)
      .$(
        '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value == "' +
          username +
          '"`]',
      );
    return friendLocator;
  }

  async getFriendFromListUsername(username: string) {
    const friendLocator = await this.getFriendFromListLocator(username);
    const usernameLocator = await friendLocator
      ?.$(SELECTORS.FRIEND_USER_NAME)
      .$(SELECTORS.FRIEND_USER_NAME_TEXT);
    await usernameLocator?.waitForExist();
    return usernameLocator;
  }

  async selectUserFromList(username: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const userLocator = await this.getFriendFromListMacOS(username);
      await userLocator.click();
    } else {
      const userLocator = await this.getFriendFromListUserImage(username);
      await userLocator?.click();
    }
  }

  async typeLongerTextInGroupName() {
    // Assuming that user already clicked on Copy ID button
    const groupNameInput = await this.groupNameInput;
    // public get a random word of 8 chars
    const wordToRepeat = faker.lorem.word(8);
    // Then repeat the same word for 8 times (64 chars)
    let longText = wordToRepeat.repeat(8);
    await setClipboardValue(longText);
    // Now, add 4 more chars, to have 1024 chars
    await groupNameInput.click();
    await keyboardShortcutPaste();
    await groupNameInput.addValue("a");
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
    // @ts-ignore
    const numberOfUsersInList = await friendContainer.length;
    return numberOfUsersInList;
  }

  async getListOfUsersInCreateGroup() {
    const usersInList = await this.friendContainer;
    let users = [];
    for (let user in usersInList) {
      const username = await user
        // @ts-ignore
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

  async validateCreateGroupChatsIsShown() {
    const createGroupChatSection = await this.createGroupChatSection;
    await createGroupChatSection.waitForExist();
  }

  async validateCreateGroupChatButtonIsShown() {
    const createGroupChatButton = await this.createGroupChatButton;
    await createGroupChatButton.waitForExist();
  }

  async validateCreateGroupChatFriendsListIsShown() {
    const friendsList = await this.friendsList;
    await friendsList.waitForExist();
  }

  async validateCreateGroupChatInputErrorIsShown() {
    const createGroupInputError = await this.createGroupInputError;
    await createGroupInputError.waitForExist();
  }

  async validateCreateGroupChatNameInputIsShown() {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.waitForExist();
  }

  async validateCreateGroupChatUserSearchInputIsShown() {
    const userSearchInput = await this.userSearchInput;
    await userSearchInput.waitForExist();
  }
}

export default new CreateGroupChat();

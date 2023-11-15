import "module-alias/register";
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
  ADD_MEMBERS: '[name="edit-group-add-members"]',
  ADD_PARTICIPANT_BUTTON: '[name="Add"]',
  CURRENT_MEMBERS: '[name="edit-group-remove-members"]',
  EDIT_GROUP_SECTION: '[name="edit-group"]',
  FRIENDS_GROUP: '[name="friend-group"]',
  FRIENDS_LIST: '[name="friends-list"]',
  GROUP_NAME_INPUT: '[name="groupname-input"]',
  GROUP_NAME_INPUT_ERROR: '[name="input-error"]',
  GROUP_NAME_INPUT_ERROR_TEXT: "<Text>",
  NOTHING_HERE_TEXT: '//Text[starts-with(@Name, "Nothing")]',
  PARTICIPANT_USER_CONTAINER: '[name="Friend Container"]',
  PARTICIPANT_USER_CREATOR_BADGE_IMAGE: "<Image>",
  PARTICIPANT_USER_CREATOR_BADGE_TEXT: '[name="Group Creator"]',
  PARTICIPANT_USER_IMAGE: '[name="User Image"]',
  PARTICIPANT_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  PARTICIPANT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  PARTICIPANT_USER_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  PARTICIPANT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  PARTICIPANT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  PARTICIPANT_USER_NAME: '[name="friend-username"]',
  PARTICIPANT_USER_NAME_TEXT: "<Text>",
  REMOVE_PARTICIPANT_BUTTON: '[name="Remove"]',
  TOPBAR: '[name="Topbar"]',
  USER_INPUT: '[name="friend-search-input"]',
};

const SELECTORS_MACOS = {
  ADD_MEMBERS: "~edit-group-add-members",
  ADD_MEMBERS_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  ADD_PARTICIPANT_BUTTON: "~Add",
  CURRENT_MEMBERS: "~edit-group-remove-members",
  CURRENT_MEMBERS_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  EDIT_GROUP_SECTION: "~edit-group",
  FRIENDS_GROUP: "~friend-group",
  FRIENDS_LIST: "~friends-list",
  GROUP_NAME_INPUT: "~groupname-input",
  GROUP_NAME_INPUT_ERROR: "~input-error",
  GROUP_NAME_INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  NOTHING_HERE_TEXT: '//XCUIElementTypeStaticText[@value="Nothing Here..."]',
  PARTICIPANT_USER_CONTAINER: "~Friend Container",
  PARTICIPANT_USER_CREATOR_BADGE_IMAGE:
    "-ios class chain:**/XCUIElementTypeImage",
  PARTICIPANT_USER_CREATOR_BADGE_TEXT:
    '//XCUIElementTypeStaticText[@value="Group Creator"]',
  PARTICIPANT_USER_IMAGE: "~User Image",
  PARTICIPANT_USER_IMAGE_PROFILE: "~user-image-profile",
  PARTICIPANT_USER_IMAGE_WRAP: "~user-image-wrap",
  PARTICIPANT_USER_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  PARTICIPANT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  PARTICIPANT_USER_INDICATOR_ONLINE: "~indicator-online",
  PARTICIPANT_USER_NAME: "~friend-username",
  PARTICIPANT_USER_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  REMOVE_PARTICIPANT_BUTTON: "~Remove",
  TOPBAR: "~Topbar",
  USER_INPUT: "~friend-search-input",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EditGroup extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.EDIT_GROUP_SECTION);
  }

  get addMembers() {
    return this.instance.$(SELECTORS.ADD_MEMBERS);
  }

  get addParticipantButton() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$$(SELECTORS.ADD_PARTICIPANT_BUTTON);
  }

  get currentMembers() {
    return this.instance.$(SELECTORS.CURRENT_MEMBERS);
  }

  get editGroupSection() {
    return this.instance.$(SELECTORS.EDIT_GROUP_SECTION);
  }

  get friendsGroup() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIENDS_GROUP);
  }

  get friendsList() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.FRIENDS_LIST);
  }

  get groupNameInput() {
    return this.instance.$(SELECTORS.GROUP_NAME_INPUT);
  }

  get groupNameInputError() {
    return this.instance.$(SELECTORS.GROUP_NAME_INPUT_ERROR);
  }

  get groupNameInputErrorText() {
    return this.instance
      .$(SELECTORS.GROUP_NAME_INPUT_ERROR)
      .$(SELECTORS.GROUP_NAME_INPUT_ERROR_TEXT);
  }

  get nothingHereText() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$(SELECTORS.NOTHING_HERE_TEXT);
  }

  get participantUserContainer() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER);
  }

  get participantUserCreatorBadgeImage() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_CREATOR_BADGE_IMAGE);
  }
  get participantUserCreatorBadgeText() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_CREATOR_BADGE_TEXT);
  }

  get participantUserImage() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE);
  }

  get participantUserImageProfile() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE_PROFILE);
  }

  get participantUserImageWrap() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE_WRAP);
  }

  get participantUserIndicator() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_INDICATOR);
  }

  get participantUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_INDICATOR_OFFLINE);
  }

  get participantUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_INDICATOR_ONLINE);
  }

  get participantUserName() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_NAME);
  }

  get participantUserNameText() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_NAME)
      .$(SELECTORS.PARTICIPANT_USER_NAME_TEXT);
  }

  get removeParticipantButton() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$$(SELECTORS.REMOVE_PARTICIPANT_BUTTON);
  }

  get topbar() {
    return this.instance.$$(SELECTORS.TOPBAR);
  }

  get userInput() {
    return this.instance.$(SELECTORS.USER_INPUT);
  }

  async clearGroupNameInput() {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.setValue("");
  }

  async clearSearchUserInput() {
    const userInput = await this.userInput;
    await userInput.setValue("");
  }

  async clickOnAddButton() {
    const addParticipantButton = await this.addParticipantButton;
    await addParticipantButton.click();
  }

  async clickOnAddMembers() {
    const addMembers = await this.addMembers;
    await addMembers.click();
  }

  async clickOnCurrentMembers() {
    const currentMembers = await this.currentMembers;
    await currentMembers.click();
  }

  async clickOnFirstAddButton() {
    const firstAddButton = await this.instance.$$(
      SELECTORS.ADD_PARTICIPANT_BUTTON,
    )[0];
    await driver[this.executor].waitUntil(
      async () => {
        return await firstAddButton;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Add friend button from Edit Group was never displayed after 15 seconds",
      },
    );
    await firstAddButton.click();
  }

  async clickOnFirstRemoveButton() {
    const removeParticipantButton = await this.instance.$$(
      SELECTORS.REMOVE_PARTICIPANT_BUTTON,
    )[0];
    await driver[this.executor].waitUntil(
      async () => {
        return await removeParticipantButton;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Remove friend button from Edit Group was never displayed after 15 seconds",
      },
    );
    await removeParticipantButton.click();
  }

  async clickOnGroupNameInput() {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.click();
  }

  async clickOnRemoveButton() {
    const removeParticipantButton = await this.removeParticipantButton;
    await removeParticipantButton.click();
  }

  async getParticipantsList() {
    const participants = await this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER);
    let results = [];
    for (let participant of participants) {
      const participantName = await participant
        .$(SELECTORS.PARTICIPANT_USER_NAME)
        .$(SELECTORS.PARTICIPANT_USER_NAME_TEXT);
      const participantNameText = await participantName.getText();
      results.push(participantNameText);
    }
    return results;
  }

  async getParticipantContainerLocator(participant: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = await this.instance
        .$(SELECTORS.EDIT_GROUP_SECTION)
        .$(
          '//XCUIElementTypeGroup[@label="Friend Container"]/XCUIElementTypeGroup/XCUIElementTypeStaticText[contains(@value, "' +
            participant +
            '")]/../..',
        );
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await this.instance
        .$(SELECTORS.EDIT_GROUP_SECTION)
        .$(
          '//Group[@Name="Friend Container"]/Group/Text[contains(@Name, "' +
            participant +
            '")]/../..',
        );
    }
    return locator;
  }

  async getParticipantIndicator(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const indicator = await userLocator.$(SELECTORS.PARTICIPANT_USER_INDICATOR);
    await indicator.waitForExist();
    return indicator;
  }

  async getParticipantIndicatorOffline(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const indicatorOffline = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_INDICATOR_OFFLINE,
    );
    await indicatorOffline.waitForExist();
    return indicatorOffline;
  }

  async getParticipantIndicatorOnline(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    await driver[this.executor].waitUntil(
      async () => {
        return await userLocator.$(SELECTORS.PARTICIPANT_USER_INDICATOR_ONLINE);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected indicator online was never displayed on Edit Group Users List after 15 seconds",
      },
    );

    const indicatorOnline = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_INDICATOR_ONLINE,
    );
    return indicatorOnline;
  }

  async getParticipantUserCreatorBadgeImage(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const badgeImage = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_CREATOR_BADGE_IMAGE,
    );
    await badgeImage.waitForExist();
    return badgeImage;
  }

  async getParticipantUserCreatorBadgeText(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const badgeText = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_CREATOR_BADGE_TEXT,
    );
    await badgeText.waitForExist();
    return badgeText;
  }

  async getParticipantUserImage(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const userImage = await userLocator.$(SELECTORS.PARTICIPANT_USER_IMAGE);
    await userImage.waitForExist();
    return userImage;
  }

  async getParticipantUserImageProfile(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const userImageProfile = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_IMAGE_PROFILE,
    );
    await userImageProfile.waitForExist();
    return userImageProfile;
  }

  async getParticipantUserImageWrap(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const userImageWrap = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_IMAGE_WRAP,
    );
    await userImageWrap.waitForExist();
    return userImageWrap;
  }

  async typeOnGroupNameInput(name: string) {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.clearValue();
    await groupNameInput.setValue(name);
    const currentValue = await groupNameInput.getText();
    if (currentValue !== name) {
      await this.typeOnGroupNameInput(name);
    }
  }

  async typeOnSearchUserInput(username: string) {
    const userInput = await this.userInput;
    await userInput.clearValue();
    await userInput.click();
    await userInput.setValue(username);
    const userInputValue = await userInput.getText();
    if (userInputValue !== username) {
      await this.typeOnSearchUserInput(username);
    }
  }

  async validateEditGroupIsShown() {
    const editGroupSection = await this.editGroupSection;
    await editGroupSection.waitForExist();
  }

  async validateEditGroupInputErrorIsShown() {
    const groupNameInputError = await this.groupNameInputError;
    await groupNameInputError.waitForExist();
  }

  async validateEditGroupNameInputIsShown() {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.waitForExist();
  }

  async validateEditGroupUserInputIsShown() {
    const userInput = await this.userInput;
    await userInput.waitForExist();
  }

  async validateNothingHereIsDisplayed() {
    const nothingHereText = await this.nothingHereText;
    await nothingHereText.waitForExist();
  }

  async validateParticipantIndicatorOnline(username: string) {
    await driver[this.executor].waitUntil(
      async () => {
        return await this.getParticipantIndicatorOnline(username);
      },
      {
        timeout: 15000,
        timeoutMsg: "Expected chat layout was never displayed after 15 seconds",
      },
    );
  }
}

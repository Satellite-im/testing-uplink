import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ADD_BOTTOM_BUTTON: '[name="add-button"]',
  ADD_PARTICIPANTS__WITH_SIDEBAR_BUTTON:
    '[name="edit-group-add-friends-button-with_sidebar"]',
  ADD_PARTICIPANTS__WITHOUT_SIDEBAR_BUTTON:
    '[name="edit-group-add-friends-button-without-sidebar"]',
  ADD_OR_REMOVE_BUTTONS_CONTAINER: '[name="Topbar"]',
  EDIT_GROUP_SECTION: '[name="edit-group"]',
  FRIENDS_GROUP: '[name="friend-group"]',
  FRIENDS_LIST: '[name="friends-list"]',
  GROUP_NAME_HEADER: '[name="group-name-label"]',
  GROUP_NAME_INPUT: '[name="groupname-input"]',
  PARTICIPANT_USER_CONTAINER: '[name="Friend Container"]',
  PARTICIPANT_USER_IMAGE: '[name="User Image"]',
  PARTICIPANT_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  PARTICIPANT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  PARTICIPANT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  PARTICIPANT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  PARTICIPANT_USER_NAME: '[name="friend-username"]',
  PARTICIPANT_USER_NAME_TEXT: "//Text",
  REMOVE_BOTTOM_BUTTON: '[name="remove-button"]',
  REMOVE_PARTICIPANTS_WITH_SIDEBAR_BUTTON:
    '[name="edit-group-remove_friends_with_sidebar"]',
  REMOVE_PARTICIPANTS_WITHOUT_SIDEBAR_BUTTON:
    '[name="edit-group-remove-friends-without-sidebar"]',
  USER_INPUT: '[name="friend-search-input"]',
};

const SELECTORS_MACOS = {
  ADD_BOTTOM_BUTTON: "~add-button",
  ADD_PARTICIPANTS_WITH_SIDEBAR_BUTTON:
    "~edit-group-add-friends-button-with_sidebar",
  ADD_PARTICIPANTS_WITHOUT_SIDEBAR_BUTTON:
    "~edit-group-add-friends-button-without-sidebar",
  ADD_OR_REMOVE_BUTTONS_CONTAINER: "~Topbar",
  EDIT_GROUP_SECTION: "~edit-group",
  FRIENDS_GROUP: "~friend-group",
  FRIENDS_LIST: "~friends-list",
  GROUP_NAME_HEADER: "~group-name-label",
  GROUP_NAME_INPUT: "~groupname-input",
  PARTICIPANT_USER_CONTAINER: "~Friend Container",
  PARTICIPANT_USER_IMAGE: "~User Image",
  PARTICIPANT_USER_IMAGE_PROFILE: "~user-image-profile",
  PARTICIPANT_USER_IMAGE_WRAP: "~user-image-wrap",
  PARTICIPANT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  PARTICIPANT_USER_INDICATOR_ONLINE: "~indicator-online",
  PARTICIPANT_USER_NAME: "~friend-username",
  PARTICIPANT_USER_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  REMOVE_BOTTOM_BUTTON: "~remove-button",
  REMOVE_PARTICIPANTS_WITH_SIDEBAR_BUTTON:
    "~edit-group-remove_friends_with_sidebar",
  REMOVE_PARTICIPANTS_WITHOUT_SIDEBAR_BUTTON:
    "~edit-group-remove-friends-without-sidebar",
  USER_INPUT: "~friend-search-input",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EditGroup extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.EDIT_GROUP_SECTION);
  }

  get addBottomButton() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.ADD_BOTTOM_BUTTON);
  }

  get addParticipantsWithSidebarButton() {
    return this.instance.$(SELECTORS.ADD_PARTICIPANTS_WITH_SIDEBAR_BUTTON);
  }

  get addParticipantsWithoutSidebarButton() {
    return this.instance.$(SELECTORS.ADD_PARTICIPANTS_WITHOUT_SIDEBAR_BUTTON);
  }

  get addOrRemoveButtonsContainer() {
    return this.instance.$(SELECTORS.ADD_OR_REMOVE_BUTTONS_CONTAINER);
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

  get groupNameHeader() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.GROUP_NAME_HEADER);
  }

  get groupNameInput() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.GROUP_NAME_INPUT);
  }

  get participantUserContainer() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER);
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

  get removeBottomButton() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.REMOVE_BOTTOM_BUTTON);
  }

  get removeParticipantsWithSidebarButton() {
    return this.instance.$(SELECTORS.REMOVE_PARTICIPANTS_WITH_SIDEBAR_BUTTON);
  }

  get removeParticipantsWithoutSidebarButton() {
    return this.instance.$(
      SELECTORS.REMOVE_PARTICIPANTS_WITHOUT_SIDEBAR_BUTTON
    );
  }

  get userInput() {
    return this.instance
      .$(SELECTORS.EDIT_GROUP_SECTION)
      .$(SELECTORS.USER_INPUT);
  }

  async clearGroupNameInput() {
    await this.groupNameInput.clear();
  }

  async clearSearchUserInput() {
    await this.userInput.clear();
  }

  async clickOnAddWithSidebarButton() {
    await this.addParticipantsWithSidebarButton.click();
  }

  async clickOnAddWithoutSidebarButton() {
    await this.addParticipantsWithoutSidebarButton.click();
  }

  async clickOnAddButtonBelow() {
    await this.addBottomButton.click();
  }

  async clickOnRemoveWithSidebarButton() {
    await this.removeParticipantsWithSidebarButton.click();
  }

  async clickOnRemoveWithoutSidebarButton() {
    await this.removeParticipantsWithoutSidebarButton.click();
  }

  async clickOnRemoveButtonBelow() {
    await this.removeBottomButton.click();
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
        .$(SELECTORS.PARTICIPANT_USER_NAME_TEXT)
        .getText();
      results.push(participantName);
    }
    return results;
  }

  async getParticipantContainerLocator(participant: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === "mac2") {
      locator = await this.instance
        .$(SELECTORS.EDIT_GROUP_SECTION)
        .$(
          '//XCUIElementTypeGroup[@label="Friend Container"]/XCUIElementTypeGroup/XCUIElementTypeStaticText[contains(@value, "' +
            participant +
            '")]/../../..'
        );
    } else if (currentDriver === "windows") {
      locator = await this.instance
        .$(SELECTORS.EDIT_GROUP_SECTION)
        .$(
          '//Group[@Name="Friend Container"]/Group/Text[contains(@Name, "' +
            participant +
            '")]/../../..'
        );
    }
    return locator;
  }

  async getParticipantIndicatorOffline(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const indicatorOffline = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_INDICATOR_OFFLINE
    );
    return indicatorOffline;
  }

  async getParticipantIndicatorOnline(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const indicatorOnline = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_INDICATOR_ONLINE
    );
    return indicatorOnline;
  }

  async getParticipantUserImage(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const userImage = await userLocator.$(SELECTORS.PARTICIPANT_USER_IMAGE);
    return userImage;
  }

  async getParticipantUserImageProfile(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const userImageProfile = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_IMAGE_PROFILE
    );
    return userImageProfile;
  }

  async getParticipantUserImageWrap(participant: string) {
    const userLocator = await this.getParticipantContainerLocator(participant);
    const userImageWrap = await userLocator.$(
      SELECTORS.PARTICIPANT_USER_IMAGE_WRAP
    );
    return userImageWrap;
  }

  async typeOnGroupNameInput(name: string) {
    await this.groupNameInput.setValue(name);
  }

  async typeOnSearchUserInput(username: string) {
    await this.userInput.setValue(username);
  }
}

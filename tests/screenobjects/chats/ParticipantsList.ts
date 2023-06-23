import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  NUMBER_OF_PARTICIPANTS_HEADER: '[name="number-of-participants"]',
  PARTICIPANT_USER_CONTAINER: '[name="Friend Container"]',
  PARTICIPANT_USER_IMAGE: '[name="User Image"]',
  PARTICIPANT_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  PARTICIPANT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  PARTICIPANT_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  PARTICIPANT_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  PARTICIPANT_USER_NAME: '[name="friend-username"]',
  PARTICIPANT_USER_NAME_TEXT: "//Text",
  PARTICIPANTS_USERS_LIST: '[name="friends-list"]',
  PARTICIPANTS_LIST: '[name="group-users"]',
  PARTICIPANTS_USER_INPUT: '[name="friend-search-input"]',
};

const SELECTORS_MACOS = {
  NUMBER_OF_PARTICIPANTS_HEADER: "~number-of-participants",
  PARTICIPANT_USER_CONTAINER: "~Friend Container",
  PARTICIPANT_USER_IMAGE: "~User Image",
  PARTICIPANT_USER_IMAGE_PROFILE: "~user-image-profile",
  PARTICIPANT_USER_IMAGE_WRAP: "~user-image-wrap",
  PARTICIPANT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  PARTICIPANT_USER_INDICATOR_ONLINE: "~indicator-online",
  PARTICIPANT_USER_NAME: "~friend-username",
  PARTICIPANT_USER_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  PARTICIPANTS_USERS_LIST: "~friends-list",
  PARTICIPANTS_LIST: "~group-users",
  PARTICIPANTS_USER_INPUT: "~friend-search-input",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class ParticipantsList extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.PARTICIPANTS_LIST);
  }

  get numberOfParticipantsHeader() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(SELECTORS.NUMBER_OF_PARTICIPANTS_HEADER);
  }

  get participantUserContainer() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER);
  }

  get participantUserImage() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE);
  }

  get participantUserImageProfile() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE_PROFILE);
  }

  get participantUserImageWrap() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE_WRAP);
  }

  get participantUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_INDICATOR_OFFLINE);
  }

  get participantUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_INDICATOR_ONLINE);
  }

  get participantUserName() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_NAME);
  }

  get participantUserNameText() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(PARTICIPANTS_USERS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_NAME)
      .$(SELECTORS.PARTICIPANT_USER_NAME_TEXT);
  }

  get participantsUsersList() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(SELECTORS.PARTICIPANTS_USERS_LIST);
  }

  get participantsList() {
    return this.instance.$(SELECTORS.PARTICIPANTS_LIST);
  }

  get participantsUserInput() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$(SELECTORS.PARTICIPANTS_USER_INPUT);
  }

  async clearParticipantsUserInput() {
    await this.participantsUserInput.setValue("");
  }

  async getPartipantsList() {
    const participants = await this.instance
      .$(SELECTORS.PARTICIPANTS_USERS_LIST)
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
    if (currentDriver === MACOS_DRIVER) {
      locator = await this.instance
        .$(SELECTORS.PARTICIPANTS_USERS_LIST)
        .$(
          '//XCUIElementTypeGroup[@label="Friend Container"]/XCUIElementTypeGroup/XCUIElementTypeStaticText[contains(@value, "' +
            participant +
            '")]/../../..'
        );
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await this.instance
        .$(SELECTORS.PARTICIPANTS_USERS_LIST)
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

  async typeOnParticipantsUserInput(username: string) {
    await this.participantsUserInput.setValue(username);
  }
}

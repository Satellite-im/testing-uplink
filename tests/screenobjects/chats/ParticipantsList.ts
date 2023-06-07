import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver["userA"].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  NUMBER_OF_PARTICIPANTS_HEADER:
    '//Group/Text[contains, @Name, "PARTICIPANTS")]',
  PARTICIPANT_USER_CONTAINER: '[name="Friend Container"]',
  PARTICIPANT_USER_IMAGE: '[name="User Image"]',
  PARTICIPANT_USER_IMAGE_WRAP: "[name=user-image-wrap]",
  PARTICIPANT_USER_INDICATOR_OFFLINE: "[name=indicator-offline]",
  PARTICIPANT_USER_INDICATOR_ONLINE: "[name=indicator-online]",
  PARTICIPANT_USER_NAME: "//Group[2]",
  PARTICIPANT_USER_NAME_TEXT: "//Text",
  PARTICIPANTS_LIST: '[name="group-users"]',
  PARTICIPANTS_USER_INPUT: '[name="chat-search-input"]',
};

const SELECTORS_MACOS = {
  NUMBER_OF_PARTICIPANTS_HEADER:
    '//XCUIElementTypeGroup/XCUIElementTypeStaticText[contains(@value, "PARTICIPANTS")]',
  PARTICIPANT_USER_CONTAINER: "~Friend Container",
  PARTICIPANT_USER_IMAGE: "~User Image",
  PARTICIPANT_USER_IMAGE_WRAP: "~user-image-wrap",
  PARTICIPANT_USER_INDICATOR_OFFLINE: "~indicator-offline",
  PARTICIPANT_USER_INDICATOR_ONLINE: "~indicator-online",
  PARTICIPANT_USER_NAME: "-ios class chain:**/XCUIElementTypeGroup[2]",
  PARTICIPANT_USER_NAME_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  PARTICIPANTS_LIST: "~group-users",
  PARTICIPANTS_USER_INPUT: "~chat-search-input",
};

currentOS === "windows"
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
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER);
  }

  get participantUserImage() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE);
  }

  get participantUserImageWrap() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_IMAGE_WRAP);
  }

  get participantUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_INDICATOR_OFFLINE);
  }

  get participantUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_INDICATOR_ONLINE);
  }

  get participantUserName() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_NAME);
  }

  get participantUserNameText() {
    return this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
      .$$(SELECTORS.PARTICIPANT_USER_CONTAINER)
      .$(SELECTORS.PARTICIPANT_USER_NAME)
      .$(SELECTORS.PARTICIPANT_USER_NAME_TEXT);
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
    await this.participantsUserInput.clear();
  }
  async getPartipantsList() {
    const participants = await this.instance
      .$(SELECTORS.PARTICIPANTS_LIST)
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
      locator = await this.instance.$(
        '//XCUIElementTypeGroup[@label="Friend Container"]/XCUIElementTypeGroup/XCUIElementTypeStaticText[contains(@value, "' +
          participant +
          '")]/../../..'
      );
    } else if (currentDriver === "windows") {
      locator = await this.instance.$(
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

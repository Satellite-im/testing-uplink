require("module-alias/register");
import {
  WINDOWS_DRIVER as windowsDriver,
  USER_A_INSTANCE as firstUserInstance,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[firstUserInstance].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  SIDEBAR_RESULT_DROPDOWN_NAME: '[name="search-friends-dropdown-name"]',
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS: '[name="highlight-search-typed-chars"]',
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT: "<Text>",
  SIDEBAR_RESULT_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  SIDEBAR_RESULT_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  SIDEBAR_RESULT_INDICATOR_ONLINE: '[name="indicator-online"]',
  SIDEBAR_RESULT_REMAINING_CHARS: '[name="remaining-match-search"]',
  SIDEBAR_RESULT_REMAINING_CHARS_TEXT: "<Text>",
  SIDEBAR_RESULT_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP: '[name="user-image-group-wrap"]',
  SIDEBAR_RESULT_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  SIDEBAR_RESULT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SIDEBAR_RESULT_GROUP_CHAT_PLUS_SOME: '[name="plus-some"]',
  SIDEBAR_SEARCH_CONTAINER_RESULTS: '[name="searchbar-dropwdown"]',
  SIDEBAR_SEARCH_GROUP_RESULT: '[name="search-result-group"]',
  SIDEBAR_SEARCH_HEADER: '[name="users-groups-label"]',
  SIDEBAR_SEARCH_HEADER_TEXT_GROUPS: '[name="Groups"]',
  SIDEBAR_SEARCH_HEADER_TEXT_USERS: '[name="Users"]',
  SIDEBAR_SEARCH_MEMBERS_LABEL: '[name="members-searchdropdown-label"]',
  SIDEBAR_SEARCH_MEMBERS_LABEL_TEXT: '[name="Members"]',
  SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT:
    '[name="search-result-participant-in-group"]',
  SIDEBAR_SEARCH_USER_RESULT: '[name="search-result-user"]',
};

const SELECTORS_MACOS = {
  SIDEBAR_RESULT_DROPDOWN_NAME: "~search-friends-dropdown-name",
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS: "~highlight-search-typed-chars",
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_RESULT_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  SIDEBAR_RESULT_INDICATOR_OFFLINE: "~indicator-offline",
  SIDEBAR_RESULT_INDICATOR_ONLINE: "~indicator-online",
  SIDEBAR_RESULT_REMAINING_CHARS: "~remaining-match-search",
  SIDEBAR_RESULT_REMAINING_CHARS_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
  SIDEBAR_RESULT_USER_IMAGE: "~User Image",
  SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP: "~user-image-group-wrap",
  SIDEBAR_RESULT_USER_IMAGE_PROFILE: "~user-image-profile",
  SIDEBAR_RESULT_USER_IMAGE_WRAP: "~user-image-wrap",
  SIDEBAR_RESULT_GROUP_CHAT_PLUS_SOME: "~plus-some",
  SIDEBAR_SEARCH_CONTAINER_RESULTS: "~searchbar-dropwdown",
  SIDEBAR_SEARCH_GROUP_RESULT: "~search-result-group",
  SIDEBAR_SEARCH_HEADER: "~users-groups-label",
  SIDEBAR_SEARCH_HEADER_TEXT_GROUPS:
    '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value == "Groups"`]',
  SIDEBAR_SEARCH_HEADER_TEXT_USERS:
    '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value == "Users"`]',
  SIDEBAR_SEARCH_MEMBERS_LABEL: "~members-searchdropdown-label",
  SIDEBAR_SEARCH_MEMBERS_LABEL_TEXT:
    '-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText[`value == "Members"`]',
  SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT:
    "~search-result-participant-in-group",
  SIDEBAR_SEARCH_USER_RESULT: "~search-result-user",
};

currentOS === windowsDriver
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class SidebarSearch extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SIDEBAR_SEARCH_CONTAINER_RESULTS);
  }

  get sidebarResultDropdownName() {
    return$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME);
  }

  get sidebarResultHighlightedTypedChars() {
    return this.instance
      .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
      .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS);
  }

  get sidebarResultHighlightedTypedCharsText() {
    return this.instance
      .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
      .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS)
      .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT);
  }

  get sidebarResultRemainingChars() {
    return this.instance
      .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
      .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS);
  }

  get sidebarResultRemainingCharsText() {
    return this.instance
      .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
      .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS)
      .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS_TEXT);
  }

  get sidebarSearchContainerResults() {
    return SELECTORS.SIDEBAR_SEARCH_CONTAINER_RESULTS;
  }

  get sidebarSearchGroupResult() {
    return$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT);
  }

  get sidebarSearchGroupIndicator() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR);
  }

  get sidebarSearchGroupIndicatorOffline() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_OFFLINE);
  }

  get sidebarSearchGroupIndicatorOnline() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_ONLINE);
  }

  get sidebarSearchGroupPlusSome() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_GROUP_CHAT_PLUS_SOME);
  }

  get sidebarSearchGroupUserImage() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE);
  }

  get sidebarSearchGroupUserImageGroupWrap() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP);
  }

  get sidebarSearchGroupUserImageProfile() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_PROFILE);
  }

  get sidebarSearchGroupUserImageWrap() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP);
  }

  get sidebarSearchHeader() {
    return$(SELECTORS.SIDEBAR_SEARCH_HEADER);
  }

  get sidebarSearchHeaderText() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_HEADER)
      .$(SELECTORS.SIDEBAR_SEARCH_HEADER_TEXT);
  }

  get sidebarSearchMembersLabel() {
    return$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL);
  }
  get sidebarSearchMembersLabelText() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL)
      .$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL_TEXT);
  }

  get sidebarSearchParticipantInGroupResult() {
    return$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT);
  }

  get sidebarSearchParticipantInGroupIndicator() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR);
  }

  get sidebarSearchParticipantInGroupIndicatorOffline() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_OFFLINE);
  }

  get sidebarSearchParticipantInGroupIndicatorOnline() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_ONLINE);
  }

  get sidebarSearchParticipantInGroupUserImage() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE);
  }

  get sidebarSearchParticipantInGroupUserImageProfile() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_PROFILE);
  }

  get sidebarSearchParticipantInGroupUserImageWrap() {
    return this.instance
      .$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP);
  }

  get sidebarSearchUserResult() {
    return$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT);
  }

  get sidebarSearchUserResultIndicator() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR);
  }

  get sidebarSearchUserResultIndicatorOffline() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_OFFLINE);
  }

  get sidebarSearchUserResultIndicatorOnline() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_ONLINE);
  }

  get sidebarSearchUserResultUserImage() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE);
  }

  get sidebarSearchUserResultUserImageProfile() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_PROFILE);
  }

  get sidebarSearchUserResultUserImageWrap() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP);
  }

  // Search bar methods

  async clickOnGroupResultFromSidebarSearch(result: number) {
    const elementToClick =
      await this.getSidebarSearchGroupResultLocator(result);
    await elementToClick.click();
  }

  async clickOnParticipantResultFromSidebarSearch(result: number) {
    const elementToClick =
      await this.getSidebarSearchParticipantInGroupResultLocator(result);
    await elementToClick.click();
  }

  async clickOnUserResultFromSidebarSearch(result: number) {
    const elementToClick = await this.getSidebarSearchUserResultLocator(result);
    await elementToClick.click();
  }

  async getSidebarSearchResultsGroupsNotMatchingName() {
    const list = await this.$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT);
    let results = [];
    for (let item of list) {
      const result = await item
        .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
        .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS_TEXT);
      const resultText = await result.getText();
      results.push(resultText);
    }
    return results;
  }

  async getSidebarSearchResultsGroupsMatchingName() {
    const list = await this.$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT);
    let results = [];
    for (let item of list) {
      const resultHighlighted = await item
        .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
        .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS)
        .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT);
      const resultHighlightedText = await resultHighlighted.getText();
      const remainingResult = await item
        .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
        .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS)
        .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS_TEXT);
      const remainingResultText = await remainingResult.getText();
      results.push(resultHighlightedText + remainingResultText);
    }
    return results;
  }

  async getSidebarSearchResultsUsers() {
    const list = await this.$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT);
    let results = [];
    for (let item of list) {
      const resultHighlighted = await item
        .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
        .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS)
        .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT);
      const resultHighlightedText = await resultHighlighted.getText();
      const remainingResult = await item
        .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
        .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS)
        .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS_TEXT);
      const remainingResultText = await remainingResult.getText();
      results.push(resultHighlightedText + remainingResultText);
    }
    return results;
  }

  async getSidebarSearchResultsParticipantsInGroups() {
    const list = await this.$$(
      SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT,
    );
    let results = [];
    for (let item of list) {
      const resultHighlighted = await item
        .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
        .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS)
        .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT);
      const resultHighlightedText = await resultHighlighted.getText();
      const remainingResult = await item
        .$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
        .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS)
        .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS_TEXT);
      const remainingResultText = await remainingResult.getText();
      results.push(resultHighlightedText + remainingResultText);
    }
    return results;
  }

  async getSidebarSearchGroupResultLocator(result: number) {
    let element = await this.$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)[result];
    return element;
  }

  async getSidebarSearchParticipantInGroupResultLocator(result: number) {
    let element = await this.$$(
      SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT,
    )[result];
    return element;
  }

  async getSidebarSearchUserResultLocator(result: number) {
    let element = await this.$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)[result];
    return element;
  }
}

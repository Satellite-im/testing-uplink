require("module-alias/register");
import { WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

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

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class SidebarSearch extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.SIDEBAR_SEARCH_CONTAINER_RESULTS);
  }

  public get sidebarResultDropdownName() {
    return $$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME);
  }

  public get sidebarResultHighlightedTypedChars() {
    return $(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME).$(
      SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS,
    );
  }

  public get sidebarResultHighlightedTypedCharsText() {
    return $(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
      .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS)
      .$(SELECTORS.SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT);
  }

  public get sidebarResultRemainingChars() {
    return $(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME).$(
      SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS,
    );
  }

  public get sidebarResultRemainingCharsText() {
    return $(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME)
      .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS)
      .$(SELECTORS.SIDEBAR_RESULT_REMAINING_CHARS_TEXT);
  }

  public get sidebarSearchContainerResults() {
    return $(SELECTORS.SIDEBAR_SEARCH_CONTAINER_RESULTS);
  }

  public get sidebarSearchGroupResult() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT);
  }

  public get sidebarSearchGroupIndicator() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR);
  }

  public get sidebarSearchGroupIndicatorOffline() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_OFFLINE);
  }

  public get sidebarSearchGroupIndicatorOnline() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_ONLINE);
  }

  public get sidebarSearchGroupPlusSome() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_GROUP_CHAT_PLUS_SOME);
  }

  public get sidebarSearchGroupUserImage() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE);
  }

  public get sidebarSearchGroupUserImageGroupWrap() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP);
  }

  public get sidebarSearchGroupUserImageProfile() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_PROFILE);
  }

  public get sidebarSearchGroupUserImageWrap() {
    return $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP);
  }

  public get sidebarSearchHeader() {
    return $$(SELECTORS.SIDEBAR_SEARCH_HEADER);
  }

  public get sidebarSearchHeaderText() {
    return $$(SELECTORS.SIDEBAR_SEARCH_HEADER).$(
      SELECTORS.SIDEBAR_SEARCH_HEADER_TEXT,
    );
  }

  public get sidebarSearchMembersLabel() {
    return $$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL);
  }
  public get sidebarSearchMembersLabelText() {
    return $$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL).$(
      SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL_TEXT,
    );
  }

  public get sidebarSearchParticipantInGroupResult() {
    return $$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT);
  }

  public get sidebarSearchParticipantInGroupIndicator() {
    return $(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR);
  }

  public get sidebarSearchParticipantInGroupIndicatorOffline() {
    return $(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_OFFLINE);
  }

  public get sidebarSearchParticipantInGroupIndicatorOnline() {
    return $(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_ONLINE);
  }

  public get sidebarSearchParticipantInGroupUserImage() {
    return $(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE);
  }

  public get sidebarSearchParticipantInGroupUserImageProfile() {
    return $(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_PROFILE);
  }

  public get sidebarSearchParticipantInGroupUserImageWrap() {
    return $(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT).$(
      SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP,
    );
  }

  public get sidebarSearchUserResult() {
    return $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT);
  }

  public get sidebarSearchUserResultIndicator() {
    return $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR);
  }

  public get sidebarSearchUserResultIndicatorOffline() {
    return $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_OFFLINE);
  }

  public get sidebarSearchUserResultIndicatorOnline() {
    return $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_INDICATOR_ONLINE);
  }

  public get sidebarSearchUserResultUserImage() {
    return $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE);
  }

  public get sidebarSearchUserResultUserImageProfile() {
    return $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE)
      .$(SELECTORS.SIDEBAR_RESULT_USER_IMAGE_PROFILE);
  }

  public get sidebarSearchUserResultUserImageWrap() {
    return $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT).$(
      SELECTORS.SIDEBAR_RESULT_USER_IMAGE_WRAP,
    );
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
    const list = await $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT);
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
    const list = await $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT);
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
    const list = await $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT);
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
    const list = await $$(SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT);
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
    let element = await $$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT)[result];
    return element;
  }

  async getSidebarSearchParticipantInGroupResultLocator(result: number) {
    let element = await $$(
      SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT,
    )[result];
    return element;
  }

  async getSidebarSearchUserResultLocator(result: number) {
    let element = await $$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT)[result];
    return element;
  }
}

export default new SidebarSearch();

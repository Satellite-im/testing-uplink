import {
  WINDOWS_DRIVER as windowsDriver,
  USER_A_INSTANCE as firstUserInstance,
} from "../../helpers/constants";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[firstUserInstance].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  SIDEBAR_RESULT_DROPDOWN_NAME: '[name="search-friends-dropdown-name"]',
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS: '[name="highlight-search-typed-chars"]',
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT: "//Text",
  SIDEBAR_RESULT_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  SIDEBAR_RESULT_INDICATOR_ONLINE: '[name="indicator-online"]',
  SIDEBAR_RESULT_REMAINING_CHARS: '[name="remaining-match-search"]',
  SIDEBAR_RESULT_REMAINING_CHARS_TEXT: "//Text",
  SIDEBAR_RESULT_USER_IMAGE: '[name="User Image"]',
  SIDEBAR_RESULT_USER_IMAGE_GROUP_WRAP: '[name="user-image-group-wrap"]',
  SIDEBAR_RESULT_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  SIDEBAR_RESULT_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  SIDEBAR_RESULT_GROUP_CHAT_PLUS_SOME: '[name="plus-some"]',
  SIDEBAR_SEARCH_CONTAINER_RESULTS: '[name="searchbar-dropwdown"]',
  SIDEBAR_SEARCH_GROUP_RESULT: '[name="search-result-group"]',
  SIDEBAR_SEARCH_HEADER: '[name="users-groups-label"]',
  SIDEBAR_SEARCH_HEADER_TEXT_GROUPS: '//Group/Text[@Name="Groups"]',
  SIDEBAR_SEARCH_HEADER_TEXT_USERS: '//Group/Text[@Name="Users"]',
  SIDEBAR_SEARCH_MEMBERS_LABEL: '[name="members-searchdropdown-label"]',
  SIDEBAR_SEARCH_MEMBERS_LABEL_TEXT: '//Group/Text[@Name="Members"]',
  SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT:
    '[name="search-result-participant-in-group"]',
  SIDEBAR_SEARCH_USER_RESULT: '[name="search-result-user"]',
};

const SELECTORS_MACOS = {
  SIDEBAR_RESULT_DROPDOWN_NAME: "~search-friends-dropdown-name",
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS: "~highlight-search-typed-chars",
  SIDEBAR_RESULT_HIGHLIGHT_TYPED_CHARS_TEXT:
    "-ios class chain:**/XCUIElementTypeStaticText",
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
    return this.instance.$$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME);
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
    return this.instance.$(SELECTORS.SIDEBAR_SEARCH_CONTAINER_RESULTS);
  }

  get sidebarSearchGroupResult() {
    return this.instance.$$(SELECTORS.SIDEBAR_SEARCH_GROUP_RESULT);
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
    return this.instance.$$(SELECTORS.SIDEBAR_SEARCH_HEADER);
  }

  get sidebarSearchHeaderText() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_HEADER)
      .$(SELECTORS.SIDEBAR_SEARCH_HEADER_TEXT);
  }

  get sidebarSearchMembersLabel() {
    return this.instance.$$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL);
  }
  get sidebarSearchMembersLabelText() {
    return this.instance
      .$$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL)
      .$(SELECTORS.SIDEBAR_SEARCH_MEMBERS_LABEL_TEXT);
  }

  get sidebarSearchParticipantInGroupResult() {
    return this.instance.$$(
      SELECTORS.SIDEBAR_SEARCH_PARTICIPANT_IN_GROUP_RESULT
    );
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
    return this.instance.$$(SELECTORS.SIDEBAR_SEARCH_USER_RESULT);
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

  async clickOnResultFromSidebarSearch(result: number) {
    const elementToClick = await this.getSidebarSearchResultLocator(result);
    await elementToClick.click();
  }

  async getSidebarSearchResults() {
    const list = await this.instance.$$(SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME);
    let results = [];
    for (let item of list) {
      const resultName = await item.getText();
      results.push(resultName);
    }
    return results;
  }

  async getSidebarSearchResultLocator(result: number) {
    let element = await this.instance.$$(
      SELECTORS.SIDEBAR_RESULT_DROPDOWN_NAME
    )[result];
    return element;
  }

  async validateSidebarSearchResultsIsEmpty() {
    await this.sidebarResultDropdownName.waitForExist({ reverse: true });
  }
}

require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

import {
  getClipboardMacOS,
  keyboardShortcutPaste,
  rightClickOnMacOS,
  rightClickOnWindows,
} from "@helpers/commands";

let SELECTORS = {};

const SELECTORS_COMMON = {
  FRIENDS_LAYOUT: "~friends-layout",
};

const SELECTORS_WINDOWS = {
  ACCEPT_FRIEND_REQUEST_BUTTON: '[name="Accept Friend"]',
  ADD_SOMEONE_BUTTON: '[name="Add Someone Button"]',
  ADD_SOMEONE_INPUT: '[name="Add Someone Input"]',
  ADD_SOMEONE_LABEL: '[name="add-friend-label"]',
  ALL_FRIENDS_BUTTON: '[name="all-friends-button"]',
  ALL_FRIENDS_LIST_IMAGE: "<Image>[1]",
  BLOCK_FRIEND_BUTTON: '[name="Block Friend"]',
  BLOCKED_LIST: '[name="Blocked List"]',
  BLOCKED_LIST_BUTTON: '[name="blocked-friends-button"]',
  BLOCKED_LIST_LABEL: '[name="blocked-list-label"]',
  CHAT_WITH_FRIEND_BUTTON: '[name="Chat With Friend"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_BLOCK: '[name="friends-block"]',
  CONTEXT_MENU_CHAT: '[name="friends-chat"]',
  CONTEXT_MENU_COPY_DID_KEY: '//Button[@Name="copy-id-context"][2]',
  CONTEXT_MENU_COPY_ID: '//Button[@Name="copy-id-context"][1]',
  CONTEXT_MENU_FAVORITES_ADD: '[name="favorites-add"]',
  CONTEXT_MENU_FAVORITES_REMOVE: '[name="favorites-remove"]',
  CONTEXT_MENU_INCOMING_ACCEPT: '[name="friends-accept"]',
  CONTEXT_MENU_INCOMING_DENY: '[name="friends-deny"]',
  CONTEXT_MENU_OUTGOING_CANCEL: '[name="friends-cancel"]',
  CONTEXT_MENU_REMOVE: '[name="friends-remove"]',
  CONTEXT_MENU_UNBLOCK: '[name="friends-unblock"]',
  COPY_ID_BUTTON: '[name="Copy ID"]',
  FRIEND_INFO: '[name="Friend Info"]',
  FRIEND_INFO_CURRENT_STATUS: '[name="friendship-status"]',
  FRIEND_INFO_STATUS_MESSAGE: '[name="status-message"]',
  FRIEND_INFO_USERNAME: '[name="friend-username"]',
  FRIEND_INFO_USERNAME_CODE: "<Text>[2]",
  FRIEND_INFO_USERNAME_NAME: "<Text>[1]",
  FRIEND_RECORD: "<Group>",
  FRIEND_USER_IMAGE: '[name="User Image"]',
  FRIEND_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FRIEND_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FRIEND_USER_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  FRIEND_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FRIEND_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  FRIENDS_BODY: '[name="friends-body"]',
  FRIENDS_BUTTON_BADGE: '[name="Button Badge"]',
  FRIENDS_BUTTON_BADGE_TEXT: "<Text>",
  FRIENDS_CONTROLS: '[name="friends-controls"]',
  FRIENDS_LIST: '[name="Friends List"]',
  FRIENDS_LIST_LABEL: '[name="friends-list-label"]',
  INCOMING_REQUESTS_LIST: '[name="Incoming Requests List"]',
  INCOMING_REQUESTS_LIST_LABEL: '[name="incoming-list-label"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "<Text>",
  NO_REQUESTS: '[name="no-requests"]',
  NO_REQUESTS_TEXT: "//Text/Text",
  OUTGOING_REQUESTS_LIST: '[name="Outgoing Requests List"]',
  OUTGOING_REQUESTS_LIST_LABEL: '[name="outgoing-list-label"]',
  PENDING_FRIENDS_BUTTON: '[name="pending-friends-button"]',
  REMOVE_OR_DENY_FRIEND_BUTTON: '[name="Remove or Deny Friend"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
};

const SELECTORS_MACOS = {
  ACCEPT_FRIEND_REQUEST_BUTTON: "~Accept Friend",
  ADD_SOMEONE_BUTTON: "~Add Someone Button",
  ADD_SOMEONE_INPUT: "~Add Someone Input",
  ADD_SOMEONE_LABEL: "~add-friend-label",
  ALL_FRIENDS_BUTTON: "~all-friends-button",
  ALL_FRIENDS_LIST_IMAGE: "-ios class chain:**/XCUIElementTypeImage",
  BLOCK_FRIEND_BUTTON: "~Block Friend",
  BLOCKED_LIST: "~Blocked List",
  BLOCKED_LIST_BUTTON: "~blocked-friends-button",
  BLOCKED_LIST_LABEL: "~blocked-list-label",
  CHAT_WITH_FRIEND_BUTTON: "~Chat With Friend",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_BLOCK: "~friends-block",
  CONTEXT_MENU_CHAT: "~friends-chat",
  CONTEXT_MENU_COPY_DID_KEY:
    '-ios class chain:**/XCUIElementTypeButton[`label == "copy-id-context"`][2]',
  CONTEXT_MENU_COPY_ID:
    '-ios class chain:**/XCUIElementTypeButton[`label == "copy-id-context"`][1]',
  CONTEXT_MENU_FAVORITES_ADD: "~favorites-add",
  CONTEXT_MENU_FAVORITES_REMOVE: "~favorites-remove",
  CONTEXT_MENU_INCOMING_ACCEPT: "~friends-accept",
  CONTEXT_MENU_INCOMING_DENY: "~friends-deny",
  CONTEXT_MENU_OUTGOING_CANCEL: "~friends-cancel",
  CONTEXT_MENU_REMOVE: "~friends-remove",
  CONTEXT_MENU_UNBLOCK: "~friends-unblock",
  COPY_ID_BUTTON: "~Copy ID",
  FRIEND_INFO: "~Friend Info",
  FRIEND_INFO_CURRENT_STATUS: "~friendship-status",
  FRIEND_INFO_STATUS_MESSAGE: "~status-message",
  FRIEND_INFO_USERNAME: "~friend-username",
  FRIEND_INFO_USERNAME_CODE: "-ios class chain:**/XCUIElementTypeStaticText[2]",
  FRIEND_INFO_USERNAME_NAME: "-ios class chain:**/XCUIElementTypeStaticText[1]",
  FRIEND_RECORD: "-ios class chain:**/XCUIElementTypeGroup",
  FRIEND_USER_IMAGE: "~User Image",
  FRIEND_USER_IMAGE_PROFILE: "~user-image-profile",
  FRIEND_USER_IMAGE_WRAP: "~user-image-wrap",
  FRIEND_USER_INDICATOR:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  FRIEND_USER_INDICATOR_OFFLINE: "~indicator-offline",
  FRIEND_USER_INDICATOR_ONLINE: "~indicator-online",
  FRIENDS_BODY: "~friends-body",
  FRIENDS_BUTTON_BADGE: "~Button Badge",
  FRIENDS_BUTTON_BADGE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  FRIENDS_CONTROLS: "~friends-controls",
  FRIENDS_LIST: "~Friends List",
  FRIENDS_LIST_LABEL: "~friends-list-label",
  INCOMING_REQUESTS_LIST: "~Incoming Requests List",
  INCOMING_REQUESTS_LIST_LABEL: "~incoming-list-label",
  INPUT_ERROR: "~input-error",
  INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  NO_REQUESTS: "~no-requests",
  NO_REQUESTS_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  OUTGOING_REQUESTS_LIST: "~Outgoing Requests List",
  OUTGOING_REQUESTS_LIST_LABEL: "~outgoing-list-label",
  PENDING_FRIENDS_BUTTON: "~pending-friends-button",
  REMOVE_OR_DENY_FRIEND_BUTTON: "~Remove or Deny Friend",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class FriendsScreen extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.FRIENDS_LAYOUT);
  }

  get acceptFriendRequestButton() {
    return $(SELECTORS.ACCEPT_FRIEND_REQUEST_BUTTON);
  }

  get addSomeoneButton() {
    return $(SELECTORS.ADD_SOMEONE_BUTTON);
  }

  get addSomeoneInput() {
    return $(SELECTORS.ADD_SOMEONE_INPUT);
  }

  get addSomeoneLabel() {
    return $(SELECTORS.ADD_SOMEONE_LABEL);
  }

  get allFriendsButton() {
    return $(SELECTORS.ALL_FRIENDS_BUTTON);
  }

  get allFriendsFriends() {
    return $(SELECTORS.FRIENDS_LIST).$$(SELECTORS.FRIEND);
  }

  get allFriendsFriendsImages() {
    return $(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.FRIEND)
      .$$(SELECTORS.FRIEND_USER_IMAGE);
  }

  get allFriendsFriendsInfo() {
    return $(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.FRIEND)
      .$$(SELECTORS.FRIEND_INFO);
  }

  get allFriendsListImage() {
    return $(SELECTORS.FRIENDS_LIST).$(SELECTORS.ALL_FRIENDS_LIST_IMAGE);
  }

  get blockFriendButton() {
    return $(SELECTORS.BLOCK_FRIEND_BUTTON);
  }

  get blockedListButton() {
    return $(SELECTORS.BLOCKED_LIST_BUTTON);
  }

  get blockedList() {
    return $(SELECTORS.BLOCKED_LIST);
  }

  get blockedListLabel() {
    return $(SELECTORS.BLOCKED_LIST_LABEL);
  }

  get chatWithFriendButton() {
    return $(SELECTORS.CHAT_WITH_FRIEND_BUTTON);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuBlock() {
    return $(SELECTORS.CONTEXT_MENU_BLOCK);
  }

  get contextMenuChat() {
    return $(SELECTORS.CONTEXT_MENU_CHAT);
  }

  get contextMenuCopyDidKey() {
    return this.contextMenu.$(SELECTORS.CONTEXT_MENU_COPY_DID_KEY);
  }

  get contextMenuCopyId() {
    return $(SELECTORS.CONTEXT_MENU_COPY_ID);
  }

  get contextMenuFavoritesAdd() {
    return $(SELECTORS.CONTEXT_MENU_FAVORITES_ADD);
  }

  get contextMenuFavoritesRemove() {
    return $(SELECTORS.CONTEXT_MENU_FAVORITES_REMOVE);
  }

  get contextMenuIncomingAccept() {
    return $(SELECTORS.CONTEXT_MENU_INCOMING_ACCEPT);
  }

  get contextMenuIncomingDeny() {
    return $(SELECTORS.CONTEXT_MENU_INCOMING_DENY);
  }

  get contextMenuOutgoingCancel() {
    return $(SELECTORS.CONTEXT_MENU_OUTGOING_CANCEL);
  }

  get contextMenuRemove() {
    return $(SELECTORS.CONTEXT_MENU_REMOVE);
  }

  get contextMenuUnblock() {
    return $(SELECTORS.CONTEXT_MENU_UNBLOCK);
  }

  get copyIdButton() {
    return $(SELECTORS.FRIENDS_BODY).$(SELECTORS.COPY_ID_BUTTON);
  }

  get friendInfo() {
    return $(SELECTORS.FRIEND_INFO);
  }

  get friendInfoCurrentStatus() {
    return $$(SELECTORS.FRIEND_INFO).$(SELECTORS.FRIEND_INFO_CURRENT_STATUS);
  }

  get friendInfoStatusMessage() {
    return $$(SELECTORS.FRIEND_INFO).$(SELECTORS.FRIEND_INFO_STATUS_MESSAGE);
  }

  get friendInfoUsername() {
    return $$(SELECTORS.FRIEND_INFO_USERNAME);
  }

  get friendInfoUsernameCode() {
    return $$(SELECTORS.FRIEND_INFO_USERNAME).$(
      SELECTORS.FRIEND_INFO_USERNAME_CODE,
    );
  }

  get friendInfoUsernameName() {
    return $$(SELECTORS.FRIEND_INFO_USERNAME).$(
      SELECTORS.FRIEND_INFO_USERNAME_NAME,
    );
  }

  get friendRecords() {
    return $$(SELECTORS.FRIEND_RECORD);
  }

  get friendsBody() {
    return $(SELECTORS.FRIENDS_BODY);
  }

  get friendsButtonBadge() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.FRIENDS_BUTTON_BADGE);
  }

  get friendsButtonBadgeText() {
    return $(SELECTORS.TOPBAR)
      .$(SELECTORS.FRIENDS_BUTTON_BADGE)
      .$(SELECTORS.FRIENDS_BUTTON_BADGE_TEXT);
  }

  get friendsControls() {
    return $(SELECTORS.FRIENDS_CONTROLS);
  }

  get friendsLayout() {
    return $(SELECTORS.FRIENDS_LAYOUT);
  }

  get friendsList() {
    return $(SELECTORS.FRIENDS_LIST);
  }

  get friendsListLabel() {
    return $(SELECTORS.FRIENDS_LIST_LABEL);
  }

  get incomingRequestsList() {
    return $(SELECTORS.INCOMING_REQUESTS_LIST);
  }

  get incomingRequestsListLabel() {
    return $(SELECTORS.INCOMING_REQUESTS_LIST_LABEL);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return $(SELECTORS.INPUT_ERROR).$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get noRequests() {
    return this.friendsBody.$(SELECTORS.NO_REQUESTS);
  }

  get noRequestsText() {
    return this.noRequests.$(SELECTORS.NO_REQUESTS_TEXT);
  }

  get outgoingRequestsList() {
    return $(SELECTORS.OUTGOING_REQUESTS_LIST);
  }

  get outgoingRequestsListLabel() {
    return $(SELECTORS.OUTGOING_REQUESTS_LIST_LABEL);
  }

  get pendingFriendsButton() {
    return $(SELECTORS.PENDING_FRIENDS_BUTTON);
  }

  get removeOrDenyFriendButton() {
    return $(SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  async acceptIncomingRequest(name: string) {
    const friendToClick = await this.getExistingFriendByAriaLabel(name);
    const acceptButton = await friendToClick.$(
      SELECTORS.ACCEPT_FRIEND_REQUEST_BUTTON,
    );
    await acceptButton.click();
  }

  async blockUser(name: string) {
    const friendToClick = await this.getExistingFriendByAriaLabel(name);
    const blockButton = await friendToClick.$(SELECTORS.BLOCK_FRIEND_BUTTON);
    await blockButton.click();
  }

  async chatWithFriend(name: string) {
    const friendToClick = await this.getExistingFriendByAriaLabel(name);
    const chatButton = await friendToClick.$(SELECTORS.CHAT_WITH_FRIEND_BUTTON);
    await chatButton.click();
  }

  async clickOnAddSomeoneButton() {
    await this.addSomeoneButton.waitForExist();
    await this.addSomeoneButton.click();
  }

  async clickOnChatWithFriend() {
    const chatWithFriend = await this.chatWithFriendButton;
    await chatWithFriend.click();
  }

  async clickOnCopyID() {
    const copyIdButton = await this.copyIdButton;
    await copyIdButton.click();
  }

  async deleteAddFriendInput() {
    const addSomeoneInput = await this.addSomeoneInput;
    await addSomeoneInput.clearValue();
  }

  async enterFriendDidKey(didkey: string) {
    await this.addSomeoneInput.waitForExist();
    const addSomeoneInput = await this.addSomeoneInput;
    await addSomeoneInput.clearValue();
    await addSomeoneInput.setValue(didkey);
    const addSomeoneInputText = await addSomeoneInput.getText();
    if (addSomeoneInputText !== didkey) {
      await this.enterFriendDidKey(didkey);
    }
  }

  async enterCopiedID() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const userKey = await getClipboardMacOS();
      await this.enterFriendDidKey(userKey);
    } else if (currentDriver === WINDOWS_DRIVER) {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      const copyIdButton = await this.copyIdButton;
      await copyIdButton.click();
      const addSomeoneInput = await this.addSomeoneInput;
      await addSomeoneInput.clearValue();
      await keyboardShortcutPaste();
    }
  }

  async getAbbreviatedDidKey(key: string) {
    const abbreviated = key.substr(8, 3) + "..." + key.substr(-3);
    return abbreviated;
  }

  async getAbbreviatedFavUser(user: string) {
    const abbreviated = user.substr(0, 4).toUpperCase() + "...";
    return abbreviated;
  }

  async getAllFriendsList() {
    const friendsList = await this.friendsList;
    await friendsList.waitForExist();
    const friends = await $$(SELECTORS.FRIEND_INFO_USERNAME);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend.$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
      const friendNameText = await friendName.getText();
      results.push(friendNameText);
    }
    return results;
  }

  async getBlockedList() {
    const blockedList = await this.blockedList;
    await blockedList.waitForExist();
    const friends = await $$(SELECTORS.FRIEND_INFO_USERNAME);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend.$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
      const friendNameText = await friendName.getText();
      results.push(friendNameText);
    }
    return results;
  }

  async getExistingFriendByAriaLabel(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = await $(SELECTORS.FRIENDS_BODY).$("~" + username);
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await $(SELECTORS.FRIENDS_BODY).$('[name="' + username + '"]');
    }
    await locator.waitForExist();
    return locator;
  }

  async getNonExistingFriendByAriaLabel(username: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === MACOS_DRIVER) {
      locator = "~" + username;
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = '[name="' + username + '"]';
    }
    return locator;
  }

  async getIncomingList() {
    const currentDriver = await this.getCurrentDriver();
    const incomingList = await this.incomingRequestsList;
    await incomingList.waitForExist();
    let xpathLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      xpathLocator =
        '//XCUIElementTypeGroup[@label="Incoming Requests List"]//XCUIElementTypeGroup[@label="friend-username"]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      xpathLocator =
        '//Group[@Name="Incoming Requests List"]//Group[@Name="friend-username"]';
    }
    const friends = await $$(xpathLocator);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend.$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
      const friendNameText = await friendName.getText();
      results.push(friendNameText);
    }
    return results;
  }

  async getInputErrorText() {
    const error = await this.inputErrorText;
    const errorText = await error.getText();
    return errorText;
  }

  async getOutgoingList() {
    const currentDriver = await this.getCurrentDriver();
    const outgoingList = await this.outgoingRequestsList;
    await outgoingList.waitForExist();
    let xpathLocator: string = "";
    if (currentDriver === MACOS_DRIVER) {
      xpathLocator =
        '//XCUIElementTypeGroup[@label="Outgoing Requests List"]//XCUIElementTypeGroup[@label="friend-username"]';
    } else if (currentDriver === WINDOWS_DRIVER) {
      xpathLocator =
        '//Group[@Name="Outgoing Requests List"]//Group[@Name="friend-username"]';
    }
    const friends = await $$(xpathLocator);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend.$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
      const friendNameText = await friendName.getText();
      results.push(friendNameText);
    }
    return results;
  }

  async getUserFromAllFriendsList() {
    const friendsList = await this.friendsList;
    await friendsList.waitForExist();
    const firstUserFromList = $$(SELECTORS.FRIEND_INFO_USERNAME)[0].$(
      SELECTORS.FRIEND_INFO_USERNAME_NAME,
    );
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserFromIncomingList() {
    const incomingList = await this.incomingRequestsList;
    await incomingList.waitForExist();
    const firstUserFromList = $(SELECTORS.INCOMING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserFromOutgoingList() {
    const outgoingList = await this.outgoingRequestsList;
    await outgoingList.waitForExist();
    const firstUserFromList = $(SELECTORS.OUTGOING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserFromBlockedList() {
    const blockedList = await this.blockedList;
    await blockedList.waitForExist();
    const firstUserFromList = $$(SELECTORS.FRIEND_INFO_USERNAME)[0].$(
      SELECTORS.FRIEND_INFO_USERNAME_NAME,
    );
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserImage(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userImage = await userLocator.$(SELECTORS.FRIEND_USER_IMAGE);
    await userImage.waitForExist();
    return userImage;
  }

  async getUserImageProfile(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userImageProfile = await userLocator.$(
      SELECTORS.FRIEND_USER_IMAGE_PROFILE,
    );
    await userImageProfile.waitForExist();
    return userImageProfile;
  }

  async getUserImageWrap(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userImageWrap = await userLocator.$(SELECTORS.FRIEND_USER_IMAGE_WRAP);
    await userImageWrap.waitForExist();
    return userImageWrap;
  }

  async getUserIndicator(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const indicator = await userLocator.$(SELECTORS.FRIEND_USER_INDICATOR);
    await indicator.waitForExist();
    return indicator;
  }

  async getUserIndicatorOffline(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const indicatorOffline = await userLocator.$(
      SELECTORS.FRIEND_USER_INDICATOR_OFFLINE,
    );
    await indicatorOffline.waitForExist();
    return indicatorOffline;
  }

  async getUserIndicatorOnline(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    await driver.waitUntil(
      async () => {
        return await userLocator.$(SELECTORS.FRIEND_USER_INDICATOR_ONLINE);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected indicator online was never displayed on Friends Screen User after 15 seconds",
      },
    );
    const indicatorOnline = await userLocator.$(
      SELECTORS.FRIEND_USER_INDICATOR_ONLINE,
    );
    return indicatorOnline;
  }

  async getUserTooltip(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userTooltip = await userLocator.$(SELECTORS.TOOLTIP);
    return userTooltip;
  }

  async getUserTooltipText(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userTooltipText = await userLocator
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
    await userTooltipText.waitForExist();
    return userTooltipText;
  }

  async getValueFromAddSomeoneInput() {
    const addSomeoneInput = await this.addSomeoneInput;
    const addSomeoneInputText = await addSomeoneInput.getText();
    return addSomeoneInputText;
  }

  async getValueFromFriendsButtonBadge() {
    const friendsButtonBadgeValue = await this.friendsButtonBadgeText;
    const friendsButtonBadgeValueText = await friendsButtonBadgeValue.getText();
    return friendsButtonBadgeValueText;
  }

  async goToAllFriendsList() {
    await browser.pause(1000);
    await this.allFriendsButton.waitForExist();
    await this.allFriendsButton.click();
  }

  async goToBlockedList() {
    await browser.pause(1000);
    await this.blockedListButton.waitForExist();
    await this.blockedListButton.click();
  }

  async goToPendingFriendsList() {
    await browser.pause(1000);
    await this.pendingFriendsButton.waitForExist();
    await this.pendingFriendsButton.click();
  }

  async hoverOnBlockButton(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const secondButtonLocator = await userLocator.$(
      SELECTORS.BLOCK_FRIEND_BUTTON,
    );
    await this.hoverOnElement(secondButtonLocator);
  }

  async hoverOnBlockedListButton() {
    const locator = await this.blockedListButton;
    await this.hoverOnElement(locator);
  }

  async hoverOnChatWithFriendButton(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const buttonLocator = await userLocator.$(
      SELECTORS.CHAT_WITH_FRIEND_BUTTON,
    );
    await this.hoverOnElement(buttonLocator);
  }

  async hoverOnPendingListButton() {
    await this.pendingFriendsButton.waitForExist();
    const locator = await this.pendingFriendsButton;
    await this.hoverOnElement(locator);
  }

  async hoverOnUnfriendDenyUnblockButton(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const firstButtonLocator = await userLocator.$(
      SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON,
    );
    await this.hoverOnElement(firstButtonLocator);
  }

  async pasteUserKeyInAddSomeone() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      const userKey = await getClipboardMacOS();
      await this.enterFriendDidKey(userKey);
    } else if (currentDriver === WINDOWS_DRIVER) {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      const addSomeoneInput = await this.addSomeoneInput;
      await addSomeoneInput.click();
      await addSomeoneInput.clearValue();
      await keyboardShortcutPaste();
    }
  }

  async sendFriendRequest(didkey: string, username: string) {
    // Obtain did key from Chat User B
    await this.enterFriendDidKey(didkey);
    await this.clickOnAddSomeoneButton();

    // Wait for toast notification to be closed
    await this.waitUntilNotificationIsClosed();

    // Validate friend request appears on pending list
    await this.hoverOnPendingListButton();
    await this.goToPendingFriendsList();
    await this.validateOutgoingListIsShown();
    await this.validateOutgoingListIsNotEmpty();
  }

  async removeOrCancelFirstUser() {
    await this.removeOrDenyFriendButton.waitForExist();
    await this.removeOrDenyFriendButton.click();
  }

  async removeOrCancelUser(name: string) {
    const friendToClick = await this.getExistingFriendByAriaLabel(name);
    const removeOrDenyButton = await friendToClick.$(
      SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON,
    );
    await removeOrDenyButton.click();
  }

  async validateAllFriendsListIsNotEmpty() {
    // Wait until friends list is not empty
    await driver.waitUntil(
      async () => {
        return await $(SELECTORS.FRIENDS_LIST).$(
          SELECTORS.FRIEND_INFO_USERNAME,
        );
      },
      {
        timeout: 15000,
        timeoutMsg: "All friends list never shown any records after 15 seconds",
      },
    );
  }

  async validateAllFriendsListIsShown() {
    const allFriendsList = await this.friendsList;
    await allFriendsList.waitForExist();
  }

  async validateBlockedListIsNotEmpty() {
    // Wait until blocked list is not empty
    await driver.waitUntil(
      async () => {
        return await $(SELECTORS.BLOCKED_LIST).$(
          SELECTORS.FRIEND_INFO_USERNAME,
        );
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Blocked friends list never shown any records after 15 seconds",
      },
    );
  }

  async validateBlockedListIsShown() {
    await this.noRequests.waitForExist({ reverse: true, timeout: 30000 });
    const blockedList = await this.blockedList;
    await blockedList.waitForExist();
  }

  async validateChatWithFriendButtonIsShown() {
    const chatWithFriend = await this.chatWithFriendButton;
    await chatWithFriend.waitForExist();
  }

  async validateFriendsButtonBadgeIsShown() {
    const friendsButtonBadge = await this.friendsButtonBadge;
    await friendsButtonBadge.waitForExist();
  }

  async validateFriendsScreenIsShown() {
    await this.friendsBody.waitForExist();
  }

  async validateIncomingListIsNotEmpty() {
    // Wait until incoming list is not empty
    await driver.waitUntil(
      async () => {
        return await $(SELECTORS.INCOMING_REQUESTS_LIST).$(
          SELECTORS.FRIEND_INFO_USERNAME,
        );
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Incoming friends list never shown any records after 15 seconds",
      },
    );
  }

  async validateIncomingListIsNotShown() {
    await this.incomingRequestsList.waitForExist({
      reverse: true,
    });
  }

  async validateIncomingListIsShown() {
    await this.noRequests.waitForExist({ reverse: true, timeout: 30000 });
    await this.incomingRequestsList.waitForExist();
  }

  async validateNoRequestsIsShown() {
    // Ensure no requests message is displayed
    await this.noRequests.waitForExist();
  }

  async validateOutgoingListIsNotEmpty() {
    await driver.waitUntil(
      async () => {
        return await $(SELECTORS.OUTGOING_REQUESTS_LIST).$(
          SELECTORS.FRIEND_INFO_USERNAME,
        );
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected friend list never shown any records after 15 seconds",
      },
    );
  }

  async validateOutgoingListIsShown() {
    await this.noRequests.waitForExist({ reverse: true, timeout: 30000 });
    await this.outgoingRequestsList.waitForExist();
  }

  async validateRemoveOrDenyButtonIsShown() {
    const removeOrDenyButton = await this.removeOrDenyFriendButton;
    await removeOrDenyButton.waitForExist();
  }

  async waitUntilFriendIsRemoved(
    username: string,
    timeoutUser: number = 30000,
  ) {
    const nonExistingFriend =
      await this.getNonExistingFriendByAriaLabel(username);
    await $(SELECTORS.FRIENDS_BODY)
      .$(nonExistingFriend)
      .waitForExist({ timeout: timeoutUser, reverse: true });
  }

  async waitUntilFriendRequestIsReceived() {
    await driver.waitUntil(
      async () => {
        return await this.acceptFriendRequestButton;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected Accept Friend Request button was never displayed on Friends Screen after 15 seconds",
      },
    );
  }

  async waitUntilUserAcceptedFriendRequest() {
    await driver.waitUntil(
      async () => {
        return await this.chatWithFriendButton;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected Chat With Friend button was never displayed on Friends Screen after 15 seconds",
      },
    );
  }

  async waitUntilUserIsInCurrentList(username: string) {
    const user = await this.getExistingFriendByAriaLabel(username);
    await driver.waitUntil(
      async () => {
        return await user.$(SELECTORS.FRIEND_INFO_USERNAME);
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected Username was never displayed on Friends Screen after 15 seconds",
      },
    );
  }

  // Context Menu methods

  async clickOnContextMenuBlock() {
    const contextMenuBlock = await this.contextMenuBlock;
    await contextMenuBlock.click();
  }

  async clickOnContextMenuChat() {
    const contextMenuChat = await this.contextMenuChat;
    await contextMenuChat.click();
  }

  async clickOnContextMenuCopyDidKey() {
    const contextMenuCopyDidKey = await this.contextMenuCopyDidKey;
    await contextMenuCopyDidKey.click();
  }

  async clickOnContextMenuCopyId() {
    const contextMenuCopyId = await this.contextMenuCopyId;
    await contextMenuCopyId.click();
  }

  async clickOnContextMenuFavoritesAdd() {
    const contextMenuFavoritesAdd = await this.contextMenuFavoritesAdd;
    await contextMenuFavoritesAdd.click();
  }

  async clickOnContextMenuFavoritesRemove() {
    const contextMenuFavoritesRemove = await this.contextMenuFavoritesRemove;
    await contextMenuFavoritesRemove.click();
  }

  async clickOnContextMenuIncomingAccept() {
    const contextMenuIncomingAccept = await this.contextMenuIncomingAccept;
    await contextMenuIncomingAccept.click();
  }

  async clickOnContextMenuIncomingDeny() {
    const contextMenuIncomingDeny = await this.contextMenuIncomingDeny;
    await contextMenuIncomingDeny.click();
  }

  async clickOnContextMenuOutgoingCancel() {
    const contextMenuOutgoingCancel = await this.contextMenuOutgoingCancel;
    await contextMenuOutgoingCancel.click();
  }

  async clickOnContextMenuRemove() {
    const contextMenuRemove = await this.contextMenuRemove;
    await contextMenuRemove.click();
  }

  async clickOnContextMenuUnblock() {
    const contextMenuUnblock = await this.contextMenuUnblock;
    await contextMenuUnblock.click();
  }

  async openFriendContextMenu(name: string) {
    const friendElement = await this.getExistingFriendByAriaLabel(name);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(friendElement);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(friendElement);
    }
    const contextMenu = await this.contextMenu;
    await contextMenu.waitForExist();
  }

  async openCopyIDContextMenu() {
    const copyIdButton = await this.copyIdButton;
    await copyIdButton.click();
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(copyIdButton);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(copyIdButton);
    }
    const contextMenu = await this.contextMenu;
    await contextMenu.waitForExist();
  }
}

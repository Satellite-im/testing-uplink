import UplinkMainScreen from "../UplinkMainScreen.ts";

import {
  getClipboardMacOS,
  rightClickOnMacOS,
  rightClickOnWindows,
} from "../../helpers/commands";

const currentOS = driver["userA"].capabilities.automationName;
const robot = require("robotjs");

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
  BLOCK_FRIEND_BUTTON: '[name="Block Friend"]',
  BLOCKED_LIST: '[name="Blocked List"]',
  BLOCKED_LIST_BUTTON: '[name="blocked-friends-button"]',
  BLOCKED_LIST_LABEL: '[name="blocked-list-label"]',
  CHAT_WITH_FRIEND_BUTTON: '[name="Chat With Friend"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_BLOCK: '[name="friends-block"]',
  CONTEXT_MENU_CHAT: '[name="friends-chat"]',
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
  FRIEND_INFO_USERNAME_CODE: "//Text[2]",
  FRIEND_INFO_USERNAME_NAME: "//Text[1]",
  FRIEND_RECORD: '[name="Friend"]',
  FRIEND_USER_IMAGE: '[name="User Image"]',
  FRIEND_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FRIEND_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FRIEND_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FRIEND_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  FRIENDS_BODY: '[name="friends-body"]',
  FRIENDS_BUTTON_BADGE: '[name="Button Badge"]',
  FRIENDS_BUTTON_BADGE_TEXT: "//Text",
  FRIENDS_CONTROLS: '[name="friends-controls"]',
  FRIENDS_LIST: '[name="Friends List"]',
  FRIENDS_LIST_LABEL: '[name="friends-list-label"]',
  INCOMING_REQUESTS_LIST: '[name="Incoming Requests List"]',
  INCOMING_REQUESTS_LIST_LABEL: '[name="incoming-list-label"]',
  INPUT_ERROR: '[name="input-error"]',
  INPUT_ERROR_TEXT: "//Text",
  OUTGOING_REQUESTS_LIST: '[name="Outgoing Requests List"]',
  OUTGOING_REQUESTS_LIST_LABEL: '[name="outgoing-list-label"]',
  PENDING_FRIENDS_BUTTON: '[name="pending-friends-button"]',
  REMOVE_OR_DENY_FRIEND_BUTTON: '[name="Remove or Deny Friend"]',
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOAST_NOTIFICATION_CLOSE: '[name="close-toast"]',
  TOAST_NOTIFICATION_TEXT: '[name="toast-content"]',
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
  BLOCK_FRIEND_BUTTON: "~Block Friend",
  BLOCKED_LIST: "~Blocked List",
  BLOCKED_LIST_BUTTON: "~blocked-friends-button",
  BLOCKED_LIST_LABEL: "~blocked-list-label",
  CHAT_WITH_FRIEND_BUTTON: "~Chat With Friend",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_BLOCK: "~friends-block",
  CONTEXT_MENU_CHAT: "~friends-chat",
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
  FRIEND_RECORD: "~Friend",
  FRIEND_USER_IMAGE: "~User Image",
  FRIEND_USER_IMAGE_PROFILE: "~user-image-profile",
  FRIEND_USER_IMAGE_WRAP: "~user-image-wrap",
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
  OUTGOING_REQUESTS_LIST: "~Outgoing Requests List",
  OUTGOING_REQUESTS_LIST_LABEL: "~outgoing-list-label",
  PENDING_FRIENDS_BUTTON: "~pending-friends-button",
  REMOVE_OR_DENY_FRIEND_BUTTON: "~Remove or Deny Friend",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOAST_NOTIFICATION_CLOSE: "~close-toast",
  TOAST_NOTIFICATION_TEXT: "~toast-content",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class FriendsScreen extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.FRIENDS_LAYOUT);
  }

  get acceptFriendRequestButton() {
    return this.instance.$(SELECTORS.ACCEPT_FRIEND_REQUEST_BUTTON);
  }

  get addSomeoneButton() {
    return this.instance.$(SELECTORS.ADD_SOMEONE_BUTTON);
  }

  get addSomeoneInput() {
    return this.instance.$(SELECTORS.ADD_SOMEONE_INPUT);
  }

  get addSomeoneLabel() {
    return this.instance.$(SELECTORS.ADD_SOMEONE_LABEL);
  }

  get allFriendsButton() {
    return this.instance.$(SELECTORS.ALL_FRIENDS_BUTTON);
  }

  get allFriendsFriends() {
    return this.instance.$(SELECTORS.FRIENDS_LIST).$$(SELECTORS.FRIEND);
  }

  get allFriendsFriendsImages() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.FRIEND)
      .$$(SELECTORS.FRIEND_USER_IMAGE);
  }

  get allFriendsFriendsInfo() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.FRIEND)
      .$$(SELECTORS.FRIEND_INFO);
  }

  get blockFriendButton() {
    return this.instance.$(SELECTORS.BLOCK_FRIEND_BUTTON);
  }

  get blockedListButton() {
    return this.instance.$(SELECTORS.BLOCKED_LIST_BUTTON);
  }

  get blockedList() {
    return this.instance.$(SELECTORS.BLOCKED_LIST);
  }

  get blockedListLabel() {
    return this.instance.$(SELECTORS.BLOCKED_LIST_LABEL);
  }

  get chatWithFriendButton() {
    return this.instance.$(SELECTORS.CHAT_WITH_FRIEND_BUTTON);
  }

  get contextMenu() {
    return this.instance.$(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuBlock() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_BLOCK);
  }

  get contextMenuChat() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_CHAT);
  }

  get contextMenuFavoritesAdd() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_FAVORITES_ADD);
  }

  get contextMenuFavoritesRemove() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_FAVORITES_REMOVE);
  }

  get contextMenuIncomingAccept() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_INCOMING_ACCEPT);
  }

  get contextMenuIncomingDeny() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_INCOMING_DENY);
  }

  get contextMenuOutgoingCancel() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_OUTGOING_CANCEL);
  }

  get contextMenuRemove() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_REMOVE);
  }

  get contextMenuUnblock() {
    return this.instance.$(SELECTORS.CONTEXT_MENU_UNBLOCK);
  }

  get copyIdButton() {
    return this.instance.$(SELECTORS.FRIENDS_BODY).$(SELECTORS.COPY_ID_BUTTON);
  }

  get friendInfo() {
    return this.instance.$(SELECTORS.FRIEND_INFO);
  }

  get friendInfoCurrentStatus() {
    return this.instance
      .$$(SELECTORS.FRIEND_INFO)
      .$(SELECTORS.FRIEND_INFO_CURRENT_STATUS);
  }

  get friendInfoStatusMessage() {
    return this.instance
      .$$(SELECTORS.FRIEND_INFO)
      .$(SELECTORS.FRIEND_INFO_STATUS_MESSAGE);
  }

  get friendInfoUsername() {
    return this.instance.$$(SELECTORS.FRIEND_INFO_USERNAME);
  }

  get friendInfoUsernameCode() {
    return this.instance
      .$$(SELECTORS.FRIEND_INFO_USERNAME)
      .$(SELECTORS.FRIEND_INFO_USERNAME_CODE);
  }

  get friendInfoUsernameName() {
    return this.instance
      .$$(SELECTORS.FRIEND_INFO_USERNAME)
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
  }

  get friendRecords() {
    return this.instance.$$(SELECTORS.FRIEND_RECORD);
  }

  get friendsBody() {
    return this.instance.$(SELECTORS.FRIENDS_BODY);
  }

  get friendsButtonBadge() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.FRIENDS_BUTTON_BADGE);
  }

  get friendsButtonBadgeText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.FRIENDS_BUTTON_BADGE)
      .$(SELECTORS.FRIENDS_BUTTON_BADGE_TEXT);
  }

  get friendsControls() {
    return this.instance.$(SELECTORS.FRIENDS_CONTROLS);
  }

  get friendsLayout() {
    return this.instance.$(SELECTORS.FRIENDS_LAYOUT);
  }

  get friendsList() {
    return this.instance.$(SELECTORS.FRIENDS_LIST);
  }

  get friendsListLabel() {
    return this.instance.$(SELECTORS.FRIENDS_LIST_LABEL);
  }

  get incomingRequestsList() {
    return this.instance.$(SELECTORS.INCOMING_REQUESTS_LIST);
  }

  get incomingRequestsListLabel() {
    return this.instance.$(SELECTORS.INCOMING_REQUESTS_LIST_LABEL);
  }

  get inputError() {
    return this.instance.$(SELECTORS.INPUT_ERROR);
  }

  get inputErrorText() {
    return this.instance.$(SELECTORS.INPUT_ERROR).$(SELECTORS.INPUT_ERROR_TEXT);
  }

  get outgoingRequestsList() {
    return this.instance.$(SELECTORS.OUTGOING_REQUESTS_LIST);
  }

  get outgoingRequestsListLabel() {
    return this.instance.$(SELECTORS.OUTGOING_REQUESTS_LIST_LABEL);
  }

  get pendingFriendsButton() {
    return this.instance.$(SELECTORS.PENDING_FRIENDS_BUTTON);
  }

  get removeOrDenyFriendButton() {
    return this.instance.$(SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON);
  }

  get toastNotification() {
    return this.instance.$(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotificationClose() {
    return this.instance
      .$(SELECTORS.TOAST_NOTIFICATION)
      .$(SELECTORS.TOAST_NOTIFICATION_CLOSE);
  }

  get toastNotificationText() {
    return this.instance
      .$(SELECTORS.TOAST_NOTIFICATION)
      .$(SELECTORS.TOAST_NOTIFICATION_TEXT);
  }

  get topbar() {
    return this.instance.$(SELECTORS.TOPBAR);
  }

  async acceptIncomingRequest(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await friendToClick.$(SELECTORS.ACCEPT_FRIEND_REQUEST_BUTTON).click();
  }

  async blockUser(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await friendToClick.$(SELECTORS.BLOCK_FRIEND_BUTTON).click();
  }

  async chatWithFriend(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await friendToClick.$(SELECTORS.CHAT_WITH_FRIEND_BUTTON).click();
  }

  async clickOnAddSomeoneButton() {
    await this.addSomeoneButton.click();
  }

  async clickOnCopyID() {
    await this.copyIdButton.click();
  }

  async closeToastNotification() {
    await this.toastNotificationClose.click();
  }

  async deleteAddFriendInput() {
    await this.addSomeoneInput.clearValue();
  }

  async enterFriendDidKey(didkey: string) {
    await this.addSomeoneInput.click();
    await this.addSomeoneInput.clearValue();
    await this.addSomeoneInput.setValue(didkey);
  }

  async enterCopiedID() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      const userKey = await getClipboardMacOS();
      await this.enterFriendDidKey(userKey);
    } else if (currentDriver === "windows") {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      await this.copyIdButton.click();
      await this.addSomeoneInput.clearValue();
      await robot.keyTap("v", ["control"]);
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

  async getButtonBadgeText() {
    const text = await this.buttonBadgeText.getText();
    return text;
  }

  async getAllFriendsList() {
    await this.friendsList.waitForExist();
    const friends = await this.instance.$$(SELECTORS.FRIEND_INFO_USERNAME);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend
        .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
        .getText();
      results.push(friendName);
    }
    return results;
  }

  async getBlockedList() {
    await this.blockedList.waitForExist();
    const friends = await this.instance.$$(SELECTORS.FRIEND_INFO_USERNAME);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend
        .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
        .getText();
      results.push(friendName);
    }
    return results;
  }

  async getFriendRecordByName(name: string) {
    const currentDriver = await this.getCurrentDriver();
    let locator;
    if (currentDriver === "mac2") {
      locator = await this.instance.$(
        '//XCUIElementTypeGroup[@label="friend-username"]/XCUIElementTypeStaticText[contains(@value, "' +
          name +
          '")]/../../..'
      );
    } else if (currentDriver === "windows") {
      locator = await this.instance.$(
        '//Group[@Name="friend-username"]/Text[contains(@Name, "' +
          name +
          '")]/../../..'
      );
    }
    return locator;
  }

  async getIncomingList() {
    await this.incomingRequestsList.waitForExist();
    const friends = await this.instance
      .$(SELECTORS.INCOMING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend
        .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
        .getText();
      results.push(friendName);
    }
    return results;
  }

  async getInputErrorText() {
    const errorText = await this.inputErrorText.getText();
    return errorText;
  }

  async getOutgoingList() {
    await this.outgoingRequestsList.waitForExist();
    const friends = await this.instance
      .$(SELECTORS.OUTGOING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME);
    let results = [];
    for (let friend of friends) {
      const friendName = await friend
        .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
        .getText();
      results.push(friendName);
    }
    return results;
  }

  async getToastNotificationText() {
    const toastText = await this.toastNotificationText.getText();
    return toastText;
  }

  async getUserFromAllFriendsList() {
    await this.friendsList.waitForExist();
    const firstUserFromList = await this.instance
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
      .getText();
    return firstUserFromList;
  }

  async getUserFromIncomingList() {
    await this.incomingRequestsList.waitForExist();
    const firstUserFromList = await this.instance
      .$(SELECTORS.INCOMING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
      .getText();
    return firstUserFromList;
  }

  async getUserFromOutgoingList() {
    await this.outgoingRequestsList.waitForExist();
    const firstUserFromList = await this.instance
      .$(SELECTORS.OUTGOING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
      .getText();
    return firstUserFromList;
  }

  async getUserFromBlockedList() {
    await this.blockedList.waitForExist();
    const firstUserFromList = await this.instance
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME)
      .getText();
    return firstUserFromList;
  }

  async getUserImage(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const userImage = await userLocator.$(SELECTORS.FRIEND_USER_IMAGE);
    return userImage;
  }

  async getUserImageProfile(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const userImageProfile = await userLocator.$(
      SELECTORS.FRIEND_USER_IMAGE_PROFILE
    );
    return userImageProfile;
  }

  async getUserImageWrap(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const userImageWrap = await userLocator.$(SELECTORS.FRIEND_USER_IMAGE_WRAP);
    return userImageWrap;
  }

  async getUserIndicatorOffline(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const indicatorOffline = await userLocator.$(
      SELECTORS.FRIEND_USER_INDICATOR_OFFLINE
    );
    return indicatorOffline;
  }

  async getUserIndicatorOnline(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const indicatorOnline = await userLocator.$(
      SELECTORS.FRIEND_USER_INDICATOR_ONLINE
    );
    return indicatorOnline;
  }

  async getUserTooltip(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const userTooltip = await userLocator.$(SELECTORS.TOOLTIP);
    return userTooltip;
  }

  async getUserTooltipText(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const userTooltipText = await userLocator
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
    return userTooltipText;
  }

  async goToAllFriendsList() {
    await this.allFriendsButton.click();
  }

  async goToBlockedList() {
    await this.blockedListButton.click();
  }

  async goToPendingFriendsList() {
    await this.pendingFriendsButton.waitForExist();
    await this.pendingFriendsButton.click();
  }

  async hoverOnBlockButton(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const secondButtonLocator = await userLocator.$(
      SELECTORS.BLOCK_FRIEND_BUTTON
    );
    await this.hoverOnElement(secondButtonLocator);
  }

  async hoverOnBlockedListButton() {
    const locator = await this.blockedListButton;
    await this.hoverOnElement(locator);
  }

  async hoverOnUnfriendDenyUnblockButton(username: string) {
    const userLocator = await this.getFriendRecordByName(username);
    const firstButtonLocator = await userLocator.$(
      SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON
    );
    await this.hoverOnElement(firstButtonLocator);
  }

  async pasteUserKeyInAddSomeone() {
    // Assuming that user already clicked on Copy ID button
    // If driver is macos, then get clipboard and pass it to enterStatus function
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      const userKey = await getClipboardMacOS();
      await this.enterFriendDidKey(userKey);
    } else if (currentDriver === "windows") {
      // If driver is windows, then click on status input to place cursor there and simulate a control + v
      await this.addSomeoneInput.click();
      await this.addSomeoneInput.clearValue();
      await robot.keyTap("v", ["control"]);
    }
  }

  async removeOrCancelUser(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await friendToClick.$(SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON).click();
  }

  async waitUntilFriendIsRemoved(
    username: string,
    timeoutUser: number = 90000
  ) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await this.instance
        .$(
          '//XCUIElementTypeGroup[@label="friend-username"]/XCUIElementTypeStaticText[contains(@value, "' +
            username +
            '")]'
        )
        .waitForExist({ timeout: timeoutUser, reverse: true });
    } else if (currentDriver === "windows") {
      await this.instance
        .$(
          '//Group[@Name="friend-username"]/Text[contains(@Name, "' +
            username +
            '")]'
        )
        .waitForExist({
          timeout: timeoutUser,
          reverse: true,
        });
    }
  }

  async waitUntilFriendRequestIsReceived(timeout: number = 90000) {
    await this.acceptFriendRequestButton.waitForExist({ timeout: timeout });
  }

  async waitUntilNotificationIsClosed() {
    await this.toastNotification.waitForDisplayed({
      reverse: true,
    });
  }

  async waitUntilUserAcceptedFriendRequest(timeout: number = 90000) {
    await this.chatWithFriendButton.waitForExist({ timeout: timeout });
  }

  // Context Menu methods

  async clickOnContextMenuBlock() {
    await this.contextMenuBlock.click();
  }

  async clickOnContextMenuChat() {
    await this.contextMenuChat.click();
  }

  async clickOnContextMenuFavoritesAdd() {
    await this.contextMenuFavoritesAdd.click();
  }

  async clickOnContextMenuFavoritesRemove() {
    await this.contextMenuFavoritesRemove.click();
  }

  async clickOnContextMenuIncomingAccept() {
    await this.contextMenuIncomingAccept.click();
  }

  async clickOnContextMenuIncomingDeny() {
    await this.contextMenuIncomingDeny.click();
  }

  async clickOnContextMenuOutgoingCancel() {
    await this.contextMenuOutgoingCancel.click();
  }

  async clickOnContextMenuRemove() {
    await this.contextMenuRemove.click();
  }

  async clickOnContextMenuUnblock() {
    await this.contextMenuUnblock.click();
  }

  async openFriendContextMenu(name: string) {
    const friendElement = await this.getFriendRecordByName(name);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(friendElement, this.executor);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(friendElement, this.executor);
    }
    await this.contextMenu.waitForDisplayed();
  }
}

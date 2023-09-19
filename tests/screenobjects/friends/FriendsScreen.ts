import "module-alias/register";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

import {
  getClipboardMacOS,
  rightClickOnMacOS,
  rightClickOnWindows,
} from "@helpers/commands";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
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
  ALL_FRIENDS_LIST_IMAGE: "<Image>[1]",
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
  FRIEND_INFO_USERNAME_CODE: "<Text>[2]",
  FRIEND_INFO_USERNAME_NAME: "<Text>[1]",
  FRIEND_RECORD: "<Group>",
  FRIEND_USER_IMAGE: '[name="User Image"]',
  FRIEND_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FRIEND_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
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
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
};

currentOS === WINDOWS_DRIVER
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

  get allFriendsListImage() {
    return this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$(SELECTORS.ALL_FRIENDS_LIST_IMAGE);
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

  get topbar() {
    return this.instance.$(SELECTORS.TOPBAR);
  }

  async acceptIncomingRequest(name: string) {
    const friendToClick = await this.getExistingFriendByAriaLabel(name);
    const acceptButton = await friendToClick.$(
      SELECTORS.ACCEPT_FRIEND_REQUEST_BUTTON
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
    const addSomeoneButton = await this.addSomeoneButton;
    await addSomeoneButton.click();
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
    const addSomeoneInput = await this.addSomeoneInput;
    await addSomeoneInput.click();
    await addSomeoneInput.clearValue();
    await addSomeoneInput.setValue(didkey);
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

  async getAllFriendsList() {
    const friendsList = await this.friendsList;
    await friendsList.waitForExist();
    const friends = await this.instance.$$(SELECTORS.FRIEND_INFO_USERNAME);
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
    const friends = await this.instance.$$(SELECTORS.FRIEND_INFO_USERNAME);
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
      locator = await this.instance.$(SELECTORS.FRIENDS_BODY).$("~" + username);
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await this.instance
        .$(SELECTORS.FRIENDS_BODY)
        .$('[name="' + username + '"]');
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
    const incomingList = await this.incomingRequestsList;
    await incomingList.waitForExist();
    const friends = await this.instance
      .$(SELECTORS.INCOMING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME);
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
    const outgoingList = await this.outgoingRequestsList;
    await outgoingList.waitForExist();
    const friends = await this.instance
      .$(SELECTORS.OUTGOING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME);
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
    const firstUserFromList = await this.instance
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserFromIncomingList() {
    const incomingList = await this.incomingRequestsList;
    await incomingList.waitForExist();
    const firstUserFromList = await this.instance
      .$(SELECTORS.INCOMING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserFromOutgoingList() {
    const outgoingList = await this.outgoingRequestsList;
    await outgoingList.waitForExist();
    const firstUserFromList = await this.instance
      .$(SELECTORS.OUTGOING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserFromBlockedList() {
    const blockedList = await this.blockedList;
    await blockedList.waitForExist();
    const firstUserFromList = await this.instance
      .$$(SELECTORS.FRIEND_INFO_USERNAME)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME_NAME);
    const firstUserFromListText = await firstUserFromList.getText();
    return firstUserFromListText;
  }

  async getUserImage(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userImage = await userLocator.$(SELECTORS.FRIEND_USER_IMAGE);
    return userImage;
  }

  async getUserImageProfile(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userImageProfile = await userLocator.$(
      SELECTORS.FRIEND_USER_IMAGE_PROFILE
    );
    return userImageProfile;
  }

  async getUserImageWrap(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const userImageWrap = await userLocator.$(SELECTORS.FRIEND_USER_IMAGE_WRAP);
    return userImageWrap;
  }

  async getUserIndicatorOffline(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const indicatorOffline = await userLocator.$(
      SELECTORS.FRIEND_USER_INDICATOR_OFFLINE
    );
    return indicatorOffline;
  }

  async getUserIndicatorOnline(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const indicatorOnline = await userLocator.$(
      SELECTORS.FRIEND_USER_INDICATOR_ONLINE
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
    return userTooltipText;
  }

  async getValueFromFriendsButtonBadge() {
    const friendsButtonBadgeValue = await this.friendsButtonBadgeText;
    const friendsButtonBadgeValueText = await friendsButtonBadgeValue.getText();
    return friendsButtonBadgeValueText;
  }

  async goToAllFriendsList() {
    const allFriendsButton = await this.allFriendsButton;
    await allFriendsButton.click();
  }

  async goToBlockedList() {
    const blockedListButton = await this.blockedListButton;
    await blockedListButton.click();
  }

  async goToPendingFriendsList() {
    const pendingFriendsButton = await this.pendingFriendsButton;
    await pendingFriendsButton.click();
  }

  async hoverOnBlockButton(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const secondButtonLocator = await userLocator.$(
      SELECTORS.BLOCK_FRIEND_BUTTON
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
      SELECTORS.CHAT_WITH_FRIEND_BUTTON
    );
    await this.hoverOnElement(buttonLocator);
  }

  async hoverOnPendingListButton() {
    const locator = await this.pendingFriendsButton;
    await this.hoverOnElement(locator);
  }

  async hoverOnUnfriendDenyUnblockButton(username: string) {
    const userLocator = await this.getExistingFriendByAriaLabel(username);
    const firstButtonLocator = await userLocator.$(
      SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON
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
      await robot.keyTap("v", ["control"]);
    }
  }

  async removeOrCancelUser(name: string) {
    const friendToClick = await this.getExistingFriendByAriaLabel(name);
    const removeOrDenyButton = await friendToClick.$(
      SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON
    );
    await removeOrDenyButton.click();
  }

  async validateAllFriendsListIsNotEmpty() {
    const membersOfAllFriendsList = await this.instance
      .$(SELECTORS.FRIENDS_LIST)
      .$(SELECTORS.FRIEND_INFO_USERNAME);
    await membersOfAllFriendsList.waitForExist();
  }

  async validateAllFriendsListIsShown() {
    const allFriendsList = await this.friendsList;
    await allFriendsList.waitForExist();
  }

  async validateBlockedListIsNotEmpty() {
    const membersOfBlockedList = await this.instance
      .$(SELECTORS.BLOCKED_LIST)
      .$(SELECTORS.FRIEND_INFO_USERNAME);
    await membersOfBlockedList.waitForExist();
  }

  async validateBlockedListIsShown() {
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
    const friendsScreen = await this.friendsBody;
    await friendsScreen.waitForExist();
  }

  async validateIncomingListIsNotEmpty() {
    const membersOfIncomingList = await this.instance
      .$(SELECTORS.INCOMING_REQUESTS_LIST)
      .$(SELECTORS.FRIEND_INFO_USERNAME);
    await membersOfIncomingList.waitForExist();
  }

  async validateIncomingListIsShown() {
    const incomingList = await this.incomingRequestsList;
    await incomingList.waitForExist();
  }

  async validateOutgoingListIsNotEmpty() {
    const membersOfOutgoingList = await this.instance
      .$(SELECTORS.OUTGOING_REQUESTS_LIST)
      .$(SELECTORS.FRIEND_INFO_USERNAME);
    await membersOfOutgoingList.waitForExist();
  }

  async validateOutgoingListIsShown() {
    const outgoingList = await this.outgoingRequestsList;
    await outgoingList.waitForExist();
  }

  async validateRemoveOrDenyButtonIsShown() {
    const removeOrDenyButton = await this.removeOrDenyFriendButton;
    await removeOrDenyButton.waitForExist();
  }

  async waitUntilFriendIsRemoved(
    username: string,
    timeoutUser: number = 30000
  ) {
    const nonExistingFriend = await this.getNonExistingFriendByAriaLabel(
      username
    );
    await this.instance
      .$(SELECTORS.FRIENDS_BODY)
      .$(nonExistingFriend)
      .waitForExist({ timeout: timeoutUser, reverse: true });
  }

  async waitUntilFriendRequestIsReceived(timeout: number = 30000) {
    const acceptFriendRequestButton = await this.acceptFriendRequestButton;
    await acceptFriendRequestButton.waitForExist({ timeout: timeout });
  }

  async waitUntilUserAcceptedFriendRequest(timeout: number = 30000) {
    const chatWithFriendButton = await this.chatWithFriendButton;
    await chatWithFriendButton.waitForExist({ timeout: timeout });
  }

  async waitUntilUserIsInCurrentList(username: string) {
    const user = await this.getExistingFriendByAriaLabel(username);
    const userName = await user.$(SELECTORS.FRIEND_INFO_USERNAME);
    await userName.waitForExist();
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
      await rightClickOnMacOS(friendElement, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(friendElement, this.executor);
    }
    const contextMenu = await this.contextMenu;
    await contextMenu.waitForExist();
  }
}

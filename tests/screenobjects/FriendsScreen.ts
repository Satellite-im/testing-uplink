import { rightClickOnMacOS, rightClickOnWindows } from "../helpers/commands";
import UplinkMainScreen from "./UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
const { exec, execSync } = require("child_process");

let SELECTORS = {};

const SELECTORS_COMMON = {
  FRIENDS_LAYOUT: "~friends-layout",
};

const SELECTORS_WINDOWS = {
  ACCEPT_FRIEND_REQUEST_BUTTON: '[name="Accept Friend"]',
  ADD_SOMEONE_BUTTON: '[name="Add Someone Button"]',
  ADD_SOMEONE_INPUT: '[name="Add Someone Input"]',
  ALL_FRIENDS_BUTTON: '[name="all-friends-button"]',
  BLOCK_FRIEND_BUTTON: '[name="Block Friend"]',
  BLOCKED_LIST: '[name="Blocked List"]',
  BLOCKED_LIST_BUTTON: '[name="blocked-friends-button"]',
  CHAT_WITH_FRIEND_BUTTON: '[name="Chat With Friend"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_OPTION: '[name="Context Item"]',
  COPY_ID_BUTTON: '[name="Copy ID"]',
  FRIEND_INFO: '[name="Friend Info"]',
  FRIEND_INFO_USERNAME: "//Text[1]",
  FRIEND_INFO_USERCODE: "//Text[2]",
  FRIEND_RECORD: '[name="Friend"]',
  FRIEND_USER_IMAGE: '[name="User Image"]',
  FRIENDS_BODY: '[name="friends-body"]',
  FRIENDS_BUTTON_BADGE: '[name="Button Badge"]',
  FRIENDS_BUTTON_BADGE_TEXT: "//Text",
  FRIENDS_CONTROLS: '[name="friends-controls"]',
  FRIENDS_LIST: '[name="Friends List"]',
  INCOMING_REQUESTS_LIST: '[name="Incoming Requests List"]',
  INPUT_ERROR: '[name="input-error"]',
  OUTGOING_REQUESTS_LIST: '[name="Outgoing Requests List"]',
  PENDING_FRIENDS_BUTTON: '[name="pending-friends-button"]',
  REMOVE_OR_DENY_FRIEND_BUTTON: '[name="Remove or Deny Friend"]',
  TOAST_NOTIFICATION: '[name="Toast Notification"]',
  TOAST_NOTIFICATION_CLOSE: "//Button/Button",
  TOAST_NOTIFICATION_TEXT: "//Text[2]",
  TOPBAR: '[name="Topbar"]',
};

const SELECTORS_MACOS = {
  ACCEPT_FRIEND_REQUEST_BUTTON: "~Accept Friend",
  ADD_SOMEONE_BUTTON: "~Add Someone Button",
  ADD_SOMEONE_INPUT: "~Add Someone Input",
  ALL_FRIENDS_BUTTON: "~all-friends-button",
  BLOCK_FRIEND_BUTTON: "~Block Friend",
  BLOCKED_LIST: "~Blocked List",
  BLOCKED_LIST_BUTTON: "~blocked-friends-button",
  CHAT_WITH_FRIEND_BUTTON: "~Chat With Friend",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_OPTION: "~Context Item",
  COPY_ID_BUTTON: "~Copy ID",
  FRIEND_INFO: "~Friend Info",
  FRIEND_INFO_USERNAME:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[1]",
  FRIEND_INFO_USERCODE:
    "-ios class chain:**/XCUIElementTypeGroup[1]/XCUIElementTypeStaticText[2]",
  FRIEND_RECORD: "~Friend",
  FRIEND_USER_IMAGE: "~User Image",
  FRIENDS_BODY: "~friends-body",
  FRIENDS_BUTTON_BADGE: "~Button Badge",
  FRIENDS_BUTTON_BADGE_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  FRIENDS_CONTROLS: "~friends-controls",
  FRIENDS_LIST: "~Friends List",
  INCOMING_REQUESTS_LIST: "~Incoming Requests List",
  INPUT_ERROR: "~input-error",
  OUTGOING_REQUESTS_LIST: "~Outgoing Requests List",
  PENDING_FRIENDS_BUTTON: "~pending-friends-button",
  REMOVE_OR_DENY_FRIEND_BUTTON: "~Remove or Deny Friend",
  TOAST_NOTIFICATION: "~Toast Notification",
  TOAST_NOTIFICATION_CLOSE: "-ios class chain:**/XCUIElementTypeButton",
  TOAST_NOTIFICATION_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class FriendsScreen extends UplinkMainScreen {
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

  get blockFriendButton() {
    return $(SELECTORS.BLOCK_FRIEND_BUTTON);
  }

  get blockedListButton() {
    return $(SELECTORS.BLOCKED_LIST_BUTTON);
  }

  get blockedList() {
    return $(SELECTORS.BLOCKED_LIST);
  }

  get chatWithFriendButton() {
    return $(SELECTORS.CHAT_WITH_FRIEND_BUTTON);
  }

  get contextMenu() {
    return $(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuOption() {
    return $$(SELECTORS.CONTEXT_MENU_OPTION);
  }

  get copyIdButton() {
    return $(SELECTORS.FRIENDS_BODY).$(SELECTORS.COPY_ID_BUTTON);
  }

  get friendInfo() {
    return $(SELECTORS.FRIEND_INFO);
  }

  get friendInfoUsername() {
    return $$(SELECTORS.FRIEND_INFO).$(SELECTORS.FRIEND_INFO_USERNAME);
  }

  get friendInfoUsercode() {
    return $$(SELECTORS.FRIEND_INFO).$(SELECTORS.FRIEND_INFO_USERCODE);
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

  get incomingRequestsList() {
    return $(SELECTORS.INCOMING_REQUESTS_LIST);
  }

  get inputError() {
    return $(SELECTORS.INPUT_ERROR);
  }

  get outgoingRequestsList() {
    return $(SELECTORS.OUTGOING_REQUESTS_LIST);
  }

  get pendingFriendsButton() {
    return $(SELECTORS.PENDING_FRIENDS_BUTTON);
  }

  get removeOrDenyFriendButton() {
    return $(SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON);
  }

  get toastNotification() {
    return $(SELECTORS.TOAST_NOTIFICATION);
  }

  get toastNotificationClose() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(
      SELECTORS.TOAST_NOTIFICATION_CLOSE
    );
  }

  get toastNotificationText() {
    return $(SELECTORS.TOAST_NOTIFICATION).$(SELECTORS.TOAST_NOTIFICATION_TEXT);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  async acceptIncomingRequest(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await (
      await friendToClick.$(SELECTORS.ACCEPT_FRIEND_REQUEST_BUTTON)
    ).click();
  }

  async blockUser(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await (await friendToClick.$(SELECTORS.BLOCK_FRIEND_BUTTON)).click();
  }

  async chatWithFriend(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await (await friendToClick.$(SELECTORS.CHAT_WITH_FRIEND_BUTTON)).click();
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
    let copiedKey;
    if ((await this.getCurrentDriver()) === "mac2") {
      copiedKey = await execSync("pbpaste", { encoding: "utf8" });
      return await this.enterFriendDidKey(copiedKey);
    } else if ((await this.getCurrentDriver()) === "windows") {
      const powershellCmd = "powershell.exe Get-Clipboard";
      await exec(powershellCmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        copiedKey = stdout.trim();
        return this.enterFriendDidKey(copiedKey);
      });
    }
  }

  async getAbbreviatedDidKey(key: string) {
    return key.substr(8, 3) + "..." + key.substr(-3);
  }

  async getAbbreviatedFavUser(user: string) {
    return user.substr(0, 4).toUpperCase() + "...";
  }

  async getButtonBadgeText() {
    return this.buttonBadgeText.getText();
  }

  async getAllFriendsList() {
    await browser.pause(1000);
    const friends = await $(SELECTORS.FRIENDS_LIST).$$(SELECTORS.FRIEND_INFO);
    let results = [];
    for (let friend of friends) {
      results.push(await friend.$(SELECTORS.FRIEND_INFO_USERNAME).getText());
    }
    return results;
  }

  async getBlockedList() {
    await browser.pause(1000);
    const friends = await $(SELECTORS.BLOCKED_LIST).$$(SELECTORS.FRIEND_INFO);
    let results = [];
    for (let friend of friends) {
      results.push(await friend.$(SELECTORS.FRIEND_INFO_USERNAME).getText());
    }
    return results;
  }

  async getFriendRecordByName(name: string) {
    await browser.pause(1000);
    const friends = await this.friendRecords;
    for (let friend of friends) {
      if (
        (await friend
          .$(SELECTORS.FRIEND_INFO)
          .$(SELECTORS.FRIEND_INFO_USERNAME)
          .getText()) === name
      ) {
        return friend;
      }
    }
  }

  async getIncomingList() {
    await browser.pause(1000);
    const friends = await $(SELECTORS.INCOMING_REQUESTS_LIST).$$(
      SELECTORS.FRIEND_INFO
    );
    let results = [];
    for (let friend of friends) {
      results.push(await friend.$(SELECTORS.FRIEND_INFO_USERNAME).getText());
    }
    return results;
  }

  async getOutgoingList() {
    await browser.pause(1000);
    const friends = await $(SELECTORS.OUTGOING_REQUESTS_LIST).$$(
      SELECTORS.FRIEND_INFO
    );
    let results = [];
    for (let friend of friends) {
      results.push(await friend.$(SELECTORS.FRIEND_INFO_USERNAME).getText());
    }
    return results;
  }

  async getToastNotificationText() {
    return await this.toastNotificationText.getText();
  }

  async getUserFromAllFriendsList() {
    const firstUserFromList = await $(SELECTORS.FRIENDS_LIST)
      .$$(SELECTORS.FRIEND_INFO)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME)
      .getText();
    return firstUserFromList;
  }

  async getUserFromIncomingList() {
    const firstUserFromList = await $(SELECTORS.INCOMING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME)
      .getText();
    return firstUserFromList;
  }

  async getUserFromOutgoingList() {
    const firstUserFromList = await $(SELECTORS.OUTGOING_REQUESTS_LIST)
      .$$(SELECTORS.FRIEND_INFO)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME)
      .getText();
    return firstUserFromList;
  }

  async getUserFromBlockedList() {
    const firstUserFromList = await $(SELECTORS.BLOCKED_LIST)
      .$$(SELECTORS.FRIEND_INFO)[0]
      .$(SELECTORS.FRIEND_INFO_USERNAME)
      .getText();
    return firstUserFromList;
  }

  async goToAllFriendsList() {
    await (await this.allFriendsButton).click();
  }

  async goToBlockedList() {
    await (await this.blockedListButton).click();
  }

  async goToPendingFriendsList() {
    await (await this.pendingFriendsButton).click();
  }

  async openFriendContextMenu(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    const currentDriver = await this.getCurrentDriver();
    const friendBubble = await friendToClick.$(SELECTORS.FRIEND_USER_IMAGE);
    if (currentDriver === "mac2") {
      await rightClickOnMacOS(friendBubble);
    } else if (currentDriver === "windows") {
      await rightClickOnWindows(friendBubble);
    }
    await (await this.contextMenu).waitForDisplayed();
  }

  async removeOrCancelUser(name: string) {
    const friendToClick = await this.getFriendRecordByName(name);
    await (
      await friendToClick.$(SELECTORS.REMOVE_OR_DENY_FRIEND_BUTTON)
    ).click();
  }
}

export default new FriendsScreen();

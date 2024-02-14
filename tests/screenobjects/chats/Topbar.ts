require("module-alias/register");
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "@helpers/commands";
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  CLOSE_RENAME_GROUP_BUTTON: '[name="close-rename-group"]',
  CONTEXT_MENU: '[name="Context Menu"]',
  CONTEXT_MENU_CLOSE_CHAT: '[name="close-chat-context-option"]',
  CONTEXT_MENU_GROUP_SETTINGS: '[name="group-settings-context-option"]',
  CONTEXT_MENU_MANAGE_MEMBERS: '[name="manage-members-context-option"]',
  CONTEXT_MENU_RENAME_GROUP: '[name="rename-group-context-option"]',
  GROUP_NAME_INPUT: '[name="groupname-input"]',
  GROUP_NAME_INPUT_ERROR: '[name="input-error"]',
  GROUP_NAME_INPUT_ERROR_TEXT: "<Text>",
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
  TOPBAR_ADD_TO_FAVORITES: '[name="Favorites"]',
  TOPBAR_CALL: '[name="Call"]',
  TOPBAR_GROUP_SETTINGS: '[name="group-settings"]',
  TOPBAR_INDICATOR: '//Group[starts-with(@Name, "indicator")]',
  TOPBAR_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  TOPBAR_INDICATOR_ONLINE: '[name="indicator-online"]',
  TOPBAR_MANAGE_MEMBERS: '[name="edit-group-members"]',
  TOPBAR_PINNED_MESSAGES: '[name="pin-label"]',
  TOPBAR_REMOVE_FROM_FAVORITES: '[name="Remove from Favorites"]',
  TOPBAR_USER_IMAGE: '[name="User Image"]',
  TOPBAR_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  TOPBAR_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  TOPBAR_USER_INFO: '[name="user-info"]',
  TOPBAR_USER_NAME: '[name="user-info-username"]',
  TOPBAR_USER_NAME_VALUE: "<Text>",
  TOPBAR_USER_STATUS: '[name="user-info-status"]',
  TOPBAR_USER_STATUS_VALUE: "<Text>",
  TOPBAR_VIDEOCALL: '[name="Videocall"]',
};

const SELECTORS_MACOS = {
  CLOSE_RENAME_GROUP_BUTTON: "~close-rename-group",
  CONTEXT_MENU: "~Context Menu",
  CONTEXT_MENU_CLOSE_CHAT: "~close-chat-context-option",
  CONTEXT_MENU_GROUP_SETTINGS: "~group-settings-context-option",
  CONTEXT_MENU_MANAGE_MEMBERS: "~manage-members-context-option",
  CONTEXT_MENU_RENAME_GROUP: "~rename-group-context-option",
  GROUP_NAME_INPUT: "~groupname-input",
  GROUP_NAME_INPUT_ERROR: "~input-error",
  GROUP_NAME_INPUT_ERROR_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_GROUP_SETTINGS: "~group-settings",
  TOPBAR_INDICATOR: "",
  TOPBAR_INDICATOR_OFFLINE:
    '//XCUIElementTypeGroup[starts-with(@label, "indicator")]',
  TOPBAR_INDICATOR_ONLINE: "~indicator-online",
  TOPBAR_MANAGE_MEMBERS:
    '-ios class chain:**/XCUIElementTypeButton[`label == "edit-group-members"`]',
  TOPBAR_PINNED_MESSAGES: "~pin-label",
  TOPBAR_REMOVE_FROM_FAVORITES: "~Remove from Favorites",
  TOPBAR_USER_IMAGE: "~User Image",
  TOPBAR_USER_IMAGE_PROFILE: "~user-image-profile",
  TOPBAR_USER_IMAGE_WRAP: "~user-image-wrap",
  TOPBAR_USER_INFO: "~user-info",
  TOPBAR_USER_NAME: "~user-info-username",
  TOPBAR_USER_NAME_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  TOPBAR_USER_STATUS: "~user-info-status",
  TOPBAR_USER_STATUS_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  TOPBAR_VIDEOCALL: "~Videocall",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class Topbar extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.TOPBAR);
  }

  get closeRenameGroupButton() {
    return this.groupNameInput.$(SELECTORS.CLOSE_RENAME_GROUP_BUTTON);
  }

  get contextMenu() {
    return this.topbar.$(SELECTORS.CONTEXT_MENU);
  }

  get contextMenuCloseChat() {
    return this.contextMenu.$(SELECTORS.CONTEXT_MENU_CLOSE_CHAT);
  }

  get contextMenuGroupSettings() {
    return this.contextMenu.$(SELECTORS.CONTEXT_MENU_GROUP_SETTINGS);
  }

  get contextMenuManageMembers() {
    return this.contextMenu.$(SELECTORS.CONTEXT_MENU_MANAGE_MEMBERS);
  }

  get contextMenuRenameGroup() {
    return this.contextMenu.$(SELECTORS.CONTEXT_MENU_RENAME_GROUP);
  }

  get groupNameInput() {
    return this.topbarUserInfo.$(SELECTORS.GROUP_NAME_INPUT);
  }

  get groupNameInputError() {
    return this.groupNameInput.$(SELECTORS.GROUP_NAME_INPUT_ERROR);
  }

  get groupNameInputErrorText() {
    return this.groupNameInputError.$(SELECTORS.GROUP_NAME_INPUT_ERROR_TEXT);
  }

  get topbar() {
    return $(SELECTORS.TOPBAR);
  }

  get topbarAddToFavorites() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_ADD_TO_FAVORITES);
  }

  get topbarAddToFavoritesTooltip() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarAddToFavoritesTooltipText() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarCall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_CALL);
  }

  get topbarCallTooltip() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarCallTooltipText() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarGroupSettings() {
    return this.topbar.$(SELECTORS.TOPBAR_GROUP_SETTINGS);
  }

  get topbarIndicator() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_INDICATOR);
  }

  get topbarIndicatorOffline() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_INDICATOR_OFFLINE);
  }

  get topbarIndicatorOnline() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_INDICATOR_ONLINE);
  }

  get topbarManageMembers() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_MANAGE_MEMBERS);
  }

  get topbarManageMembersTooltip() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarManageMembersTooltipText() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarPinnedMessages() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_PINNED_MESSAGES);
  }

  get topbarPinnedMessagesTooltip() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarPinnedMessagesTooltipText() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarRemoveFromFavorites() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_REMOVE_FROM_FAVORITES);
  }

  get topbarUserImage() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
  }

  get topbarUserImageProfile() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE_PROFILE);
  }

  get topbarUserImageWrap() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE_WRAP);
  }

  get topbarUserInfo() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_INFO);
  }

  get topbarUserName() {
    return $(SELECTORS.TOPBAR_USER_NAME);
  }

  get topbarUserNameValue() {
    return $(SELECTORS.TOPBAR_USER_NAME).$(SELECTORS.TOPBAR_USER_NAME_VALUE);
  }

  get topbarUserStatus() {
    return $(SELECTORS.TOPBAR_USER_STATUS);
  }

  get topbarUserStatusValue() {
    return $(SELECTORS.TOPBAR_USER_STATUS).$(
      SELECTORS.TOPBAR_USER_STATUS_VALUE,
    );
  }

  get topbarVideocall() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_VIDEOCALL);
  }

  get topbarVideocallTooltip() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarVideocallTooltipText() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get viewGroupTooltip() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get viewGroupTooltipText() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  // Top Bar Methods

  async addToFavorites() {
    const topbarAddToFavorites = await this.topbarAddToFavorites;
    await this.hoverOnElement(topbarAddToFavorites);
    await topbarAddToFavorites.click();
    await driver.waitUntil(
      async () => {
        return await this.topbarRemoveFromFavorites;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Remove from favorites button was not displayed after passing 15 seconds from adding the same user of favorites",
      },
    );
  }

  async clickOnPinnedMessages() {
    await this.hoverOnPinnedMessagesButton();
    const topbarPinnedMessages = await this.topbarPinnedMessages;
    await topbarPinnedMessages.click();
  }

  async clickOnTopbar() {
    const topbarElement = await this.topbar;
    await topbarElement.click();
    await browser.pause(1000);
  }

  async clickOnTopbarUserImage() {
    const topbarUserImage = await this.topbarUserImage;
    await topbarUserImage.click();
  }

  async openOrCloseManageMembers() {
    await this.hoverOnManageMembersButton();
    const manageMembers = await this.topbarManageMembers;
    await manageMembers.click();
  }

  async hoverOnCallButton() {
    const callButton = await this.topbarCall;
    await this.hoverOnElement(callButton);
  }

  async hoverOnManageMembersButton() {
    const manageMembers = await this.topbarManageMembers;
    await this.hoverOnElement(manageMembers);
  }

  async hoverOnFavoritesButton() {
    const favoritesButton = await this.topbarAddToFavorites;
    await this.hoverOnElement(favoritesButton);
  }

  async hoverOnFavoritesRemoveButton() {
    const favoritesRemoveButton = await this.topbarRemoveFromFavorites;
    await this.hoverOnElement(favoritesRemoveButton);
  }

  async hoverOnPinnedMessagesButton() {
    const pinnedMessagesButton = await this.topbarPinnedMessages;
    await this.hoverOnElement(pinnedMessagesButton);
  }

  async hoverOnVideocallButton() {
    const videocallButton = await this.topbarVideocall;
    await this.hoverOnElement(videocallButton);
  }

  async removeFromFavorites() {
    const topbarRemoveFromFavorites = await this.topbarRemoveFromFavorites;
    await this.hoverOnElement(topbarRemoveFromFavorites);
    await topbarRemoveFromFavorites.click();
  }

  async validateTopbarIndicatorOnline() {
    await driver.waitUntil(
      async () => {
        return await this.topbarIndicatorOnline;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected indicator online was never displayed on Chat Screen topbar after 15 seconds",
      },
    );
  }

  async validateTopbarUserName(username: string) {
    await driver.waitUntil(
      async () => {
        return (await this.topbarUserNameValue.getText()) === username;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected username was never displayed on Chat Screen topbar after 15 seconds",
      },
    );
  }

  async validateTopbarUserImage() {
    await driver.waitUntil(
      async () => {
        return await this.topbarUserImage;
      },
      {
        timeout: 15000,
        timeoutMsg:
          "Expected user image was never displayed on Chat Screen topbar after 15 seconds",
      },
    );
  }

  async validateTopbarExists() {
    await driver.waitUntil(
      async () => {
        return await this.topbar;
      },
      {
        timeout: 15000,
        timeoutMsg: "Chats Topbar was never shown after 15 seconds",
      },
    );
  }

  async waitUntilRemoteUserIsOnline() {
    await driver.waitUntil(
      async () => {
        return await this.topbarIndicatorOnline;
      },
      {
        timeout: 15000,
        timeoutMsg: "Remote user never shown as online after 15 seconds",
      },
    );
  }

  // Group Name methods

  async clearGroupNameInput() {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.setValue("");
  }

  async clickOnGroupNameInput() {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.click();
  }

  async closeGroupNameInput() {
    const closeRenameGroupButton = await this.closeRenameGroupButton;
    await closeRenameGroupButton.click();
  }

  async typeOnGroupNameInput(name: string) {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.clearValue();
    await groupNameInput.setValue(name);
    const currentValue = await groupNameInput.getText();
    if (currentValue !== name) {
      await this.typeOnGroupNameInput(name);
    }
  }

  async validateGroupNameInputErrorIsShown() {
    const groupNameInputError = await this.groupNameInputError;
    await groupNameInputError.waitForExist();
  }

  async validateGroupNameInputIsShown() {
    const groupNameInput = await this.groupNameInput;
    await groupNameInput.waitForExist();
  }

  // Open Context Menu

  async openNameContextMenu() {
    const topbarUserStatus = await this.topbarUserStatus;
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(topbarUserStatus);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(topbarUserStatus);
    }
  }

  async selectCloseChat() {
    const closeChat = await this.contextMenuCloseChat;
    await closeChat.click();
  }

  async selectGroupSettings() {
    const groupSettings = await this.contextMenuGroupSettings;
    await groupSettings.click();
  }

  async selectManageMembers() {
    const manageMembers = await this.contextMenuManageMembers;
    await manageMembers.click();
  }

  async selectRenameGroup() {
    const renameGroup = await this.contextMenuRenameGroup;
    await renameGroup.click();
  }
}

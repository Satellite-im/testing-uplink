import "module-alias/register";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { USER_A_INSTANCE, WINDOWS_DRIVER } from "@helpers/constants";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
  TOPBAR_ADD_TO_FAVORITES: '[name="Favorites"]',
  TOPBAR_CALL: '[name="Call"]',
  TOPBAR_EDIT_GROUP: '[name="edit-group"]',
  TOPBAR_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  TOPBAR_INDICATOR_ONLINE: '[name="indicator-online"]',
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
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_EDIT_GROUP:
    '-ios class chain:**/XCUIElementTypeButton[`label == "edit-group"`]',
  TOPBAR_INDICATOR_OFFLINE: "~indicator-offline",
  TOPBAR_INDICATOR_ONLINE: "~indicator-online",
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

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class Topbar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.TOPBAR);
  }

  get topbar() {
    return this.instance.$(SELECTORS.TOPBAR);
  }

  get topbarAddToFavorites() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOPBAR_ADD_TO_FAVORITES);
  }

  get topbarAddToFavoritesTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarAddToFavoritesTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarCall() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_CALL);
  }

  get topbarCallTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarCallTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarEditGroup() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_EDIT_GROUP);
  }

  get topbarEditGroupTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarEditGroupTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarIndicatorOffline() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOPBAR_INDICATOR_OFFLINE);
  }

  get topbarIndicatorOnline() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOPBAR_INDICATOR_ONLINE);
  }

  get topbarPinnedMessages() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOPBAR_PINNED_MESSAGES);
  }

  get topbarPinnedMessagesTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarPinnedMessagesTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get topbarRemoveFromFavorites() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOPBAR_REMOVE_FROM_FAVORITES);
  }

  get topbarUserImage() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
  }

  get topbarUserImageProfile() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOPBAR_USER_IMAGE_PROFILE);
  }

  get topbarUserImageWrap() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOPBAR_USER_IMAGE_WRAP);
  }

  get topbarUserInfo() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_INFO);
  }

  get topbarUserName() {
    return this.instance.$(SELECTORS.TOPBAR_USER_NAME);
  }

  get topbarUserNameValue() {
    return this.instance
      .$(SELECTORS.TOPBAR_USER_NAME)
      .$(SELECTORS.TOPBAR_USER_NAME_VALUE);
  }

  get topbarUserStatus() {
    return this.instance.$(SELECTORS.TOPBAR_USER_STATUS);
  }

  get topbarUserStatusValue() {
    return this.instance
      .$(SELECTORS.TOPBAR_USER_STATUS)
      .$(SELECTORS.TOPBAR_USER_STATUS_VALUE);
  }

  get topbarVideocall() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_VIDEOCALL);
  }

  get topbarVideocallTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get topbarVideocallTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get viewGroupTooltip() {
    return this.instance.$(SELECTORS.TOPBAR).$(SELECTORS.TOOLTIP);
  }

  get viewGroupTooltipText() {
    return this.instance
      .$(SELECTORS.TOPBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  // Top Bar Methods

  async addToFavorites() {
    await this.hoverOnFavoritesButton();
    await this.topbarAddToFavorites.click();
  }

  async clickOnTopbar() {
    await this.topbar.click();
  }

  async editGroup() {
    await this.hoverOnEditGroupButton();
    await this.topbarEditGroup.click();
  }

  async goToPinnedMessages() {
    await this.hoverOnPinnedMessagesButton();
    await this.topbarPinnedMessages.click();
  }

  async hoverOnCallButton() {
    const element = await this.topbarCall;
    await this.hoverOnElement(element);
  }

  async hoverOnEditGroupButton() {
    const element = await this.topbarEditGroup;
    await this.hoverOnElement(element);
  }

  async hoverOnFavoritesButton() {
    const element = await this.topbarAddToFavorites;
    await this.hoverOnElement(element);
  }

  async hoverOnFavoritesRemoveButton() {
    const element = await this.topbarRemoveFromFavorites;
    await this.hoverOnElement(element);
  }

  async hoverOnPinnedMessagesButton() {
    const element = await this.topbarPinnedMessages;
    await this.hoverOnElement(element);
  }

  async hoverOnVideocallButton() {
    const element = await this.topbarVideocall;
    await this.hoverOnElement(element);
  }

  async removeFromFavorites() {
    await this.hoverOnFavoritesRemoveButton();
    await this.topbarRemoveFromFavorites.click();
  }

  async validateTopbarExists() {
    const element = await this.topbar;
    await element.waitForExist();
  }

  async waitUntilRemoteUserIsOnline(time: number = 30000) {
    const element = await this.topbarIndicatorOnline;
    await element.waitForDisplayed({
      timeout: time,
    });
  }
}

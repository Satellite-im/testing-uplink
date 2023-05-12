import { clickOnSwitchMacOS } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver.capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  TOPBAR: '[name="Topbar"]',
  TOPBAR_ADD_TO_FAVORITES: '[name="Favorites"]',
  TOPBAR_CALL: '[name="Call"]',
  TOPBAR_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  TOPBAR_INDICATOR_ONLINE: '[name="indicator-online"]',
  TOPBAR_REMOVE_FROM_FAVORITES: '[name="Remove from Favorites"]',
  TOPBAR_USER_IMAGE: '[name="User Image"]',
  TOPBAR_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  TOPBAR_USER_INFO: '[name="user-info"]',
  TOPBAR_USER_NAME: "//Text",
  TOPBAR_VIDEOCALL: '[name="Videocall"]',
};

const SELECTORS_MACOS = {
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  TOPBAR: "~Topbar",
  TOPBAR_ADD_TO_FAVORITES: "~Favorites",
  TOPBAR_CALL: "~Call",
  TOPBAR_INDICATOR_OFFLINE: "~indicator-offline",
  TOPBAR_INDICATOR_ONLINE: "~indicator-online",
  TOPBAR_REMOVE_FROM_FAVORITES: "~Remove from Favorites",
  TOPBAR_USER_IMAGE: "~User Image",
  TOPBAR_USER_IMAGE_WRAP: "~user-image-wrap",
  TOPBAR_USER_INFO: "~user-info",
  TOPBAR_USER_NAME: "-ios class chain:**/XCUIElementTypeStaticText",
  TOPBAR_VIDEOCALL: "~Videocall",
};

currentOS === "windows"
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class Topbar extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.TOPBAR);
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

  get topbarIndicatorOffline() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_INDICATOR_OFFLINE);
  }

  get topbarIndicatorOnline() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_INDICATOR_ONLINE);
  }

  get topbarRemoveFromFavorites() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_REMOVE_FROM_FAVORITES);
  }

  get topbarUserImage() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE);
  }

  get topbarUserImageWrap() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_IMAGE_WRAP);
  }

  get topbarUserInfo() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_INFO);
  }

  get topbarUserName() {
    return $(SELECTORS.TOPBAR).$(SELECTORS.TOPBAR_USER_NAME);
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

  // Top Bar Methods

  async addToFavorites() {
    await this.hoverOnFavoritesButton();
    await this.topbarAddToFavorites.click();
  }

  async hoverOnCallButton() {
    const element = await this.topbarCall;
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

export default new Topbar();

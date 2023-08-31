import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import { rightClickOnMacOS, rightClickOnWindows } from "../../helpers/commands";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  FAVORITES: '[name="Favorites"]',
  FAVORITES_CONTEXT_CHAT: '[name="favorites-chat"]',
  FAVORITES_CONTEXT_REMOVE: '[name="favorites-remove"]',
  FAVORITES_USER: "<Group>",
  FAVORITES_USER_IMAGE: '[name="User Image"]',
  FAVORITES_USER_IMAGE_GROUP_WRAP: '[name="user-image-group-wrap"]',
  FAVORITES_USER_IMAGE_PROFILE: '[name="user-image-profile"]',
  FAVORITES_USER_IMAGE_WRAP: '[name="user-image-wrap"]',
  FAVORITES_USER_INDICATOR_OFFLINE: '[name="indicator-offline"]',
  FAVORITES_USER_INDICATOR_ONLINE: '[name="indicator-online"]',
  SLIMBAR: '[name="slimbar"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
};

const SELECTORS_MACOS = {
  FAVORITES: "~Favorites",
  FAVORITES_CONTEXT_CHAT: "~favorites-chat",
  FAVORITES_CONTEXT_REMOVE: "~favorites-remove",
  FAVORITES_USER: "-ios class chain:**/XCUIElementTypeGroup",
  FAVORITES_USER_IMAGE: "~User Image",
  FAVORITES_USER_IMAGE_GROUP_WRAP: "~user-image-group-wrap",
  FAVORITES_USER_IMAGE_PROFILE: "~user-image-profile",
  FAVORITES_USER_IMAGE_WRAP: "~user-image-wrap",
  FAVORITES_USER_INDICATOR_OFFLINE: "~indicator-offline",
  FAVORITES_USER_INDICATOR_ONLINE: "~indicator-online",
  SLIMBAR: "~slimbar",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class FavoritesSidebar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.SLIMBAR);
  }

  get favorites() {
    return this.instance.$(SELECTORS.SLIMBAR).$(SELECTORS.FAVORITES);
  }

  get favoritesChat() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES_CONTEXT_CHAT);
  }

  get favoritesRemove() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES_CONTEXT_REMOVE);
  }

  get favoriteUsers() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER);
  }

  get favoritesUserImage() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE);
  }

  get favoritesUserImageGroupWrap() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_GROUP_WRAP);
  }

  get favoritesUserImageProfile() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_PROFILE);
  }

  get favoritesUserImageWrap() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_WRAP);
  }

  get favoritesUserIndicatorOffline() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR_OFFLINE);
  }

  get favoritesUserIndicatorOnline() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_INDICATOR_ONLINE);
  }

  get favoritesUserTooltip() {
    return this.instance.$(SELECTORS.SLIMBAR).$(SELECTORS.TOOLTIP);
  }

  get favoritesUserTooltipText() {
    return this.instance
      .$(SELECTORS.SLIMBAR)
      .$(SELECTORS.TOOLTIP)
      .$(SELECTORS.TOOLTIP_TEXT);
  }

  get slimbar() {
    return this.instance.$(SELECTORS.SLIMBAR);
  }

  // Favorites methods

  async clickOnContextMenuFavoritesChat() {
    await this.favoritesChat.click();
  }

  async clickOnContextMenuFavoriteRemove() {
    await this.favoritesRemove.click();
  }

  async getLocatorOfFavoritesUser(position: number) {
    let locator = await this.instance
      .$(SELECTORS.FAVORITES)
      .$$(SELECTORS.FAVORITES_USER_IMAGE_GROUP_WRAP)
      [position].$(SELECTORS.FAVORITES_USER_IMAGE_PROFILE);
    return locator;
  }

  async hoverOnFavoritesBubble(position: number) {
    const element = await this.getLocatorOfFavoritesUser(position);
    await this.hoverOnElement(element);
  }

  async openContextMenuOnFavoritesUser(position: number) {
    const element = await this.getLocatorOfFavoritesUser(position);
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await rightClickOnMacOS(element, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await rightClickOnWindows(element, this.executor);
    }
    await this.contextMenu.waitForDisplayed();
  }
}

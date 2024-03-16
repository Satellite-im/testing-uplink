require("module-alias/register");
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
import { clickOnSwitchMacOS } from "@helpers/commands";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  EMOJI: '[name="emoji"]',
  EMOJI_VALUE: "<Text>",
  EMOJI_SELECTOR: "~emoji_selector",
  EMOJIS_CONTAINER: '[name="emojis-container"]',
};

const SELECTORS_MACOS = {
  EMOJI: "~emoji",
  EMOJI_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  EMOJI_SELECTOR: "~emoji-selector",
  EMOJIS_CONTAINER: "~emojis-container",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

class EmojiSelector extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.EMOJI_SELECTOR);
  }

  public get emoji() {
    return $(SELECTORS.EMOJI_SELECTOR).$$(SELECTORS.EMOJI);
  }

  public get emojiValue() {
    return $(SELECTORS.EMOJI_SELECTOR)
      .$$(SELECTORS.EMOJI)
      .$$(SELECTORS.EMOJI_VALUE);
  }

  public get emojiSelector() {
    return $(SELECTORS.EMOJI_SELECTOR);
  }

  public get emojisContainer() {
    return $(SELECTORS.EMOJI_SELECTOR).$$(SELECTORS.EMOJIS_CONTAINER);
  }

  async clickOnEmoji(emojiToClick: string) {
    const emojiSelector = await this.emojiSelector;
    await emojiSelector.waitForDisplayed();
    const currentDriver = await this.getCurrentDriver();
    let emojiLocator, emojiElement;
    if (currentDriver === MACOS_DRIVER) {
      emojiLocator = "~" + emojiToClick;
      emojiElement = await $(SELECTORS.EMOJI_SELECTOR).$(emojiLocator);
    } else if (currentDriver === WINDOWS_DRIVER) {
      emojiLocator = await driver.findElement("name", emojiToClick);
      emojiElement = await $(SELECTORS.EMOJI_SELECTOR).$(emojiLocator);
    }
    await this.hoverOnElement(emojiElement);
    if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(emojiElement);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await emojiElement.click();
    }
  }
}

export default new EmojiSelector();

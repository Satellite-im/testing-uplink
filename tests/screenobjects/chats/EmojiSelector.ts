import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  EMOJI: '[name="emoji"]',
  EMOJI_VALUE: "//Text",
  EMOJI_SELECTOR: '[name="emoji-selector"]',
  EMOJIS_CONTAINER: '[name="emojis-container"]',
};

const SELECTORS_MACOS = {
  EMOJI: "~emoji",
  EMOJI_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
  EMOJI_SELECTOR: "~emoji-selector",
  EMOJIS_CONTAINER: "~emojis-container",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EmojiSelector extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.EMOJI_SELECTOR);
  }

  get emoji() {
    return this.instance.$(SELECTORS.EMOJI_SELECTOR).$$(SELECTORS.EMOJI);
  }

  get emojiValue() {
    return this.instance
      .$(SELECTORS.EMOJI_SELECTOR)
      .$$(SELECTORS.EMOJI)
      .$$(SELECTORS.EMOJI_VALUE);
  }

  get emojiSelector() {
    return this.instance.$(SELECTORS.EMOJI_SELECTOR);
  }

  get emojisContainer() {
    return this.instance
      .$(SELECTORS.EMOJI_SELECTOR)
      .$$(SELECTORS.EMOJIS_CONTAINER);
  }

  async clickOnEmoji(emojiToClick: string) {
    await this.emojiSelector.waitForExist();
    const currentDriver = await this.getCurrentDriver();
    let locator, element;
    if (currentDriver === MACOS_DRIVER) {
      locator = "~" + emojiToClick;
      element = await this.instance.$(SELECTORS.EMOJI_SELECTOR).$(locator);
    } else if (currentDriver === WINDOWS_DRIVER) {
      locator = await this.instance.findElement("name", emojiToClick);
      element = await this.instance.$(SELECTORS.EMOJI_SELECTOR).$(locator);
    }
    await this.hoverOnElement(element);
    await element.click();
    await this.emojiSelector.waitForExist({ reverse: true });
  }
}

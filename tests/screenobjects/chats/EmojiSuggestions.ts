import "module-alias/register";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  EMOJI_SUGGESTIONS_CLOSE_BUTTON: '[name="emoji-suggestions-close-button"]',
  EMOJI_SUGGESTIONS_CONTAINER: '[name="emoji-suggestions-container"]',
  EMOJI_SUGGESTIONS_HEADER: "<Text>",
  EMOJI_SUGGESTED: '//Group[contains(@Name, "emoji-suggested-")]',
  EMOJI_SUGGESTED_VALUE: "<Text>",
};

const SELECTORS_MACOS = {
  EMOJI_SUGGESTIONS_CLOSE_BUTTON: "~emoji-suggestion-close-button",
  EMOJI_SUGGESTIONS_CONTAINER: "~emoji-suggestions-container",
  EMOJI_SUGGESTIONS_HEADER:
    '-ios class chain:**/XCUIElementTypeStaticText[`value == "SUGGESTED EMOJI"`][2]',
  EMOJI_SUGGESTED:
    '//XCUIElementTypeGroup[contains(@label, "emoji-suggested-")]',
  EMOJI_SUGGESTED_VALUE: "-ios class chain:**/XCUIElementTypeStaticText",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class EmojiSuggestions extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.EMOJI_SUGGESTIONS_CONTAINER);
  }

  get emojiSuggestionsCloseButton() {
    return this.emojiSuggestionsContainer.$(
      SELECTORS.EMOJI_SUGGESTIONS_CLOSE_BUTTON,
    );
  }

  get emojiSuggestionsContainer() {
    return this.instance.$(SELECTORS.EMOJI_SUGGESTIONS_CONTAINER);
  }

  get emojiSuggestionsHeader() {
    return this.emojiSuggestionsContainer.$(SELECTORS.EMOJI_SUGGESTIONS_HEADER);
  }

  get emojiSuggested() {
    return this.emojiSuggestionsContainer.$$(SELECTORS.EMOJI_SUGGESTED);
  }

  get emojiSuggestedValue() {
    return this.emojiSuggestionsContainer.$(SELECTORS.EMOJI_SUGGESTED_VALUE);
  }

  async clickOnEmojiSuggested(emojiToClick: string) {
    const container = await this.emojiSuggestionsContainer;
    await container.waitForDisplayed();
    const currentDriver = await this.getCurrentDriver();
    let emojiLocator, emojiElement;
    if (currentDriver === MACOS_DRIVER) {
      emojiLocator = "~emoji-suggested-" + emojiToClick;
      emojiElement = await this.instance.$(emojiLocator);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const emojiLocatorWindows =
        '[name="emoji-suggested-"' + emojiToClick + '"]';
      emojiLocator = await this.instance.findElement(
        "name",
        emojiLocatorWindows,
      );
      emojiElement = await this.instance.$(emojiLocator);
    }
    await this.hoverOnElement(emojiElement);
    await emojiElement.click();
  }

  async clickOnCloseButton() {
    const closeButton = await this.emojiSuggestionsCloseButton;
    await closeButton.click();
  }

  async getEmojisSuggested() {
    await this.emojiSuggestionsContainer.waitForDisplayed();
    const emojiSuggestedList = await this.emojiSuggestionsContainer.$$(
      SELECTORS.EMOJI_SUGGESTED,
    );
    let results = [];
    for (let item of emojiSuggestedList) {
      const itemValue = await item.$(SELECTORS.EMOJI_SUGGESTED_VALUE);
      const itemValueText = await itemValue.getText();
      console.log(itemValueText);
      results.push(itemValueText);
    }
    return results;
  }
}

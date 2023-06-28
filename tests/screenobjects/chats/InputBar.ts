import { faker } from "@faker-js/faker";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "../../helpers/constants";
import { selectFileOnMacos, selectFileOnWindows } from "../../helpers/commands";
import { join } from "path";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  EMOJI: '[name="emoji"]',
  EMOJI_BUTTON: '//Group[@Name="chat-layout"]//Group[9]/Button',
  EMOJI_SELECTOR: '[name="emoji-selector"]',
  EMOJIS_CONTAINER: '[name="emojis-container"]',
  INPUT_GROUP: '[name="input-group"]',
  INPUT_TEXT: "//Edit",
  SEND_MESSAGE_BUTTON: '[name="send-message-button"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  UPLOAD_BUTTON: '[name="upload-button"]',
};

const SELECTORS_MACOS = {
  EMOJI: "~emoji",
  EMOJI_BUTTON:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "chat-layout"`]/XCUIElementTypeGroup[9]/XCUIElementTypeButton',
  EMOJI_SELECTOR: "~emoji-selector",
  EMOJIS_CONTAINER: "~emojis-container",
  INPUT_GROUP: "~input-group",
  INPUT_TEXT: "-ios class chain:**/XCUIElementTypeTextView",
  SEND_MESSAGE_BUTTON: "~send-message-button",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  UPLOAD_BUTTON: "~upload-button",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class InputBar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.INPUT_GROUP);
  }

  get emoji() {
    return this.instance.$(SELECTORS.EMOJI);
  }

  get emojiSelector() {
    return this.instance.$(SELECTORS.EMOJI_SELECTOR);
  }

  get emojisContainer() {
    return this.instance.$(SELECTORS.EMOJIS_CONTAINER);
  }

  get emojiButton() {
    return this.instance.$(SELECTORS.EMOJI_BUTTON);
  }

  get inputGroup() {
    return this.instance.$(SELECTORS.CHAT_LAYOUT).$(SELECTORS.INPUT_GROUP);
  }

  get inputText() {
    return this.instance
      .$(SELECTORS.CHAT_LAYOUT)
      .$(SELECTORS.INPUT_GROUP)
      .$(SELECTORS.INPUT_TEXT);
  }

  get sendMessageButton() {
    return this.instance.$(SELECTORS.SEND_MESSAGE_BUTTON);
  }

  get sendMessageTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get sendMessageTooltipText() {
    return this.instance.$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  get uploadButton() {
    return this.instance.$(SELECTORS.UPLOAD_BUTTON);
  }

  get uploadTooltip() {
    return this.instance.$(SELECTORS.TOOLTIP);
  }

  get uploadTooltipText() {
    return this.instance.$(SELECTORS.TOOLTIP).$(SELECTORS.TOOLTIP_TEXT);
  }

  async clearInputBar() {
    await this.inputText.clearValue();
  }

  async clickOnEmojiButton() {
    await this.emojiButton.click();
  }

  async clickOnInputBar() {
    await this.inputText.click();
  }

  async clickOnSendMessage() {
    await this.sendMessageButton.click();
  }

  async clickOnUploadFile() {
    await this.uploadButton.click();
  }

  async generateRandomText() {
    // Get a random word of 9 chars and add it a space
    const wordToRepeat = faker.lorem.word(9) + " ";
    // Then repeat the same word for 102 times (1020 chars)
    let longParagraph = wordToRepeat.repeat(102);
    // Now, add 4 more chars, to have 1024 chars
    longParagraph += "abcd";
    return longParagraph;
  }

  async generateShortRandomText() {
    // Get a random word of 9 chars and add it a space
    const wordToRepeat = faker.lorem.word(9) + " ";
    // Then repeat the same word for 10 times
    const longText = wordToRepeat.repeat(10);
    return longText;
  }

  async getFilePath(relativePath: string) {
    return join(process.cwd(), relativePath);
  }

  async hoverOnSendButton() {
    const element = await this.sendMessageButton;
    await this.hoverOnElement(element);
  }

  async hoverOnUploadButton() {
    const element = await this.uploadButton;
    await this.hoverOnElement(element);
  }

  async pressEnterKeyOnInputBar() {
    const currentDriver = await this.getCurrentDriver();
    let enterValue;
    currentDriver === WINDOWS_DRIVER
      ? (enterValue = "\uE007")
      : (enterValue = "\n");
    await this.inputText.setValue(enterValue);
  }
  //
  async typeMessageOnInput(text: string) {
    for (let i = 0; i < 3; i++) {
      i += 1;
      if ((await this.inputText.getText()) !== text) {
        await this.inputText.clearValue();
        await this.inputText.setValue(text);
      }
    }
  }

  async typeOnEditMessageInput(editedMessage: string) {
    const currentDriver = await this.getCurrentDriver();
    let enterValue;
    currentDriver === WINDOWS_DRIVER
      ? (enterValue = "\uE007")
      : (enterValue = "\n");
    await browser.pause(1000);
    await this.instance.$$(SELECTORS.INPUT_TEXT)[1].clearValue();
    await this.instance
      .$$(SELECTORS.INPUT_TEXT)[1]
      .setValue(editedMessage + enterValue);
  }

  async uploadFile(relativePath: string) {
    const currentDriver = await this.getCurrentDriver();
    await this.clickOnUploadFile();
    if (currentDriver === MACOS_DRIVER) {
      await selectFileOnMacos(relativePath, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await selectFileOnWindows(relativePath);
    }
  }
}

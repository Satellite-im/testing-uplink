import "module-alias/register";
import { faker } from "@faker-js/faker";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import { selectFileOnMacos, selectFileOnWindows } from "@helpers/commands";
import { join } from "path";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";
const robot = require("robotjs");

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {
  CHAT_LAYOUT: "~chat-layout",
};

const SELECTORS_WINDOWS = {
  EDIT_MESSAGE_INPUT: '[name="edit-message-input"]',
  EMOJI_BUTTON: '//Group[@Name="chat-layout"]/Button[2]',
  INPUT_CHAR_COUNTER: '[name="input-char-counter"]',
  INPUT_CHAR_COUNTER_TEXT: "<Text>",
  INPUT_CHAR_MAX_TEXT: '//Group[@Name="input-group"]/Text',
  INPUT_GROUP: '[name="input-group"]',
  INPUT_TEXT: "<Edit>",
  SEND_MESSAGE_BUTTON: '[name="send-message-button"]',
  TOOLTIP: '[name="tooltip"]',
  TOOLTIP_TEXT: "//Group/Text",
  UPLOAD_BUTTON: '[name="upload-button"]',
  UPLOAD_BUTTON_LOCAL_DISK: '[name="quick-profile-self-edit"]',
  UPLOAD_BUTTON_CLOUD: '[name="quick-profile-self-edit"]',
};

const SELECTORS_MACOS = {
  EDIT_MESSAGE_INPUT: "~edit-message-input",
  EMOJI_BUTTON:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "chat-layout"`]/XCUIElementTypeButton[2]',
  INPUT_CHAR_COUNTER: "~input-char-counter",
  INPUT_CHAR_COUNTER_TEXT: "-ios class chain:**/XCUIElementTypeStaticText",
  INPUT_CHAR_MAX_TEXT:
    '-ios class chain:**/XCUIElementTypeGroup[`label == "input-group"`]/XCUIElementTypeGroup[2]/XCUIElementTypeStaticText',
  INPUT_GROUP: "~input-group",
  INPUT_TEXT: "-ios class chain:**/XCUIElementTypeTextView",
  SEND_MESSAGE_BUTTON: "~send-message-button",
  TOOLTIP: "~tooltip",
  TOOLTIP_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  UPLOAD_BUTTON: "~upload-button",
  UPLOAD_BUTTON_LOCAL_DISK: '[name="quick-profile-self-edit"]',
  UPLOAD_BUTTON_CLOUD: '[name="quick-profile-self-edit"]',
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class InputBar extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.INPUT_GROUP);
  }

  get editMessageInput() {
    return this.instance.$(SELECTORS.EDIT_MESSAGE_INPUT);
  }

  get emojiButton() {
    return this.instance.$(SELECTORS.EMOJI_BUTTON);
  }

  get inputCharCounter() {
    return this.instance.$(SELECTORS.INPUT_CHAR_COUNTER);
  }

  get inputCharCounterText() {
    return this.instance
      .$(SELECTORS.INPUT_CHAR_COUNTER)
      .$(SELECTORS.INPUT_CHAR_COUNTER_TEXT);
  }

  get inputCharMaxText() {
    return this.instance.$(SELECTORS.INPUT_CHAR_MAX_TEXT);
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

  get uploadButtonCloud() {
    return this.instance.$$(SELECTORS.UPLOAD_BUTTON_LOCAL_DISK)[1];
  }

  get uploadButtonLocalDisk() {
    return this.instance.$$(SELECTORS.UPLOAD_BUTTON_LOCAL_DISK)[0];
  }

  async clearInputBar() {
    await this.inputText.clearValue();
  }

  async clickOnEmojiButton() {
    const element = await this.emojiButton;
    await this.hoverOnElement(element);
    await element.click();
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

  async selectUploadFromCloud() {
    await this.uploadButtonCloud.click();
  }

  async selectUploadFromLocalDisk() {
    await this.uploadButtonLocalDisk.click();
  }

  async typeCodeOnInputBar(language: string, codeToType: string) {
    await this.inputText.addValue("```" + language);
    await robot.keyTap("enter", ["shift"]);
    await await this.inputText.addValue(codeToType);
  }

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
    const locator = await this.window;
    let enterValue;
    currentDriver === WINDOWS_DRIVER
      ? (enterValue = "\uE007")
      : (enterValue = "\n");
    await locator.setValue(editedMessage + enterValue);
  }

  async uploadFileFromLocalDisk(relativePath: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.clickOnUploadFile();
      await this.selectUploadFromLocalDisk();
      await selectFileOnMacos(relativePath, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      await this.clickOnUploadFile();
      await this.selectUploadFromLocalDisk();
      const uplinkContext = await driver[this.executor].getWindowHandle();
      await selectFileOnWindows(relativePath, uplinkContext, this.executor);
    }
  }
}

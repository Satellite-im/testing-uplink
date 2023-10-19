import "module-alias/register";
import { faker } from "@faker-js/faker";
import {
  MACOS_DRIVER,
  WINDOWS_DRIVER,
  USER_A_INSTANCE,
} from "@helpers/constants";
import {
  getUplinkWindowHandle,
  selectFileOnMacos,
  selectFileOnWindows,
} from "@helpers/commands";
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
  UPLOAD_BUTTON_LOCAL_DISK: '[name="attach-files-from-local-disk-into-chat"]',
  UPLOAD_BUTTON_STORAGE: '[name="attach-files-from-storage-into-chat"]',
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
  UPLOAD_BUTTON_LOCAL_DISK: "~attach-files-from-local-disk-into-chat",
  UPLOAD_BUTTON_STORAGE: "~attach-files-from-storage-into-chat",
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

  get uploadButtonStorage() {
    return this.instance.$(SELECTORS.UPLOAD_BUTTON_STORAGE);
  }

  get uploadButtonLocalDisk() {
    return this.instance.$(SELECTORS.UPLOAD_BUTTON_LOCAL_DISK);
  }

  async clearInputBar() {
    const inputText = await this.inputText;
    await inputText.clearValue();
  }

  async clickOnEmojiButton() {
    const addEmoji = await this.emojiButton;
    await this.hoverOnElement(addEmoji);
    await addEmoji.click();
  }

  async clickOnInputBar() {
    const inputText = await this.inputText;
    await inputText.click();
  }

  async clickOnSendMessage() {
    const sendMessageButton = await this.sendMessageButton;
    await sendMessageButton.click();
  }

  async clickOnUploadFile() {
    const uploadButton = await this.uploadButton;
    await uploadButton.click();
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

  async hoverOnSendButton() {
    const sendButton = await this.sendMessageButton;
    await this.hoverOnElement(sendButton);
  }

  async hoverOnUploadButton() {
    const uploadButton = await this.uploadButton;
    await this.hoverOnElement(uploadButton);
  }

  async pasteClipboardOnInputBar() {
    const inputText = await this.inputText;
    await inputText.click();
    await inputText.clearValue();
    await robot.keyTap("v", ["control"]);
  }

  async pressEnterKeyOnInputBar() {
    const currentDriver = await this.getCurrentDriver();
    let enterValue;
    currentDriver === WINDOWS_DRIVER
      ? (enterValue = "\uE007")
      : (enterValue = "\n");
    const inputText = await this.inputText;
    await inputText.addValue(enterValue);
  }

  async selectUploadFromLocalDisk() {
    const uploadButtonLocalDisk = await this.uploadButtonLocalDisk;
    await uploadButtonLocalDisk.click();
  }

  async selectUploadFromStorage() {
    const uploadButtonStorage = await this.uploadButtonStorage;
    await uploadButtonStorage.click();
  }

  async typeCodeOnInputBar(language: string, codeToType: string) {
    const inputText = await this.inputText;
    await inputText.clearValue();
    await inputText.addValue("```" + language);
    const inputTextValueLanguage = await inputText.getText();
    if (inputTextValueLanguage.includes("```" + language) === false) {
      await this.typeCodeOnInputBar(language, codeToType);
    } else {
      await robot.keyTap("enter", ["shift"]);
      await inputText.addValue(codeToType);
      const inputTextValueCode = await inputText.getText();
      if (inputTextValueCode.includes(codeToType) === false) {
        await this.typeCodeOnInputBar(language, codeToType);
      }
    }
  }

  async typeMessageOnInput(text: string) {
    const inputText = await this.inputText;
    await inputText.clearValue();
    await inputText.setValue(text);
    const inputTextValue = await inputText.getText();
    if (inputTextValue !== text) {
      await this.typeMessageOnInput(text);
    }
  }

  async uploadFileFromLocalDisk(relativePath: string) {
    const currentDriver = await this.getCurrentDriver();
    if (currentDriver === MACOS_DRIVER) {
      await this.clickOnUploadFile();
      await this.selectUploadFromLocalDisk();
      await selectFileOnMacos(relativePath, this.executor);
    } else if (currentDriver === WINDOWS_DRIVER) {
      const executor = await this.executor;
      const uplinkContext = await getUplinkWindowHandle(executor);
      await this.clickOnUploadFile();
      await this.selectUploadFromLocalDisk();
      await selectFileOnWindows(relativePath, uplinkContext, executor);
    }
  }

  async openUploadFilesFromStorage() {
    await this.clickOnUploadFile();
    await this.selectUploadFromStorage();
  }
}

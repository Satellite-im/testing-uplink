import { WINDOWS_DRIVER, USER_A_INSTANCE } from "../../helpers/constants";
import UplinkMainScreen from "../UplinkMainScreen";

const currentOS = driver[USER_A_INSTANCE].capabilities.automationName;
let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  PINNED_MESSAGES_CONTAINER: '[name="pinned-messages-label"]',
};

const SELECTORS_MACOS = {
  PINNED_MESSAGES_CONTAINER: "~pinned-messages-label",
};

currentOS === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class PinnedMessages extends UplinkMainScreen {
  constructor(executor: string) {
    super(executor, SELECTORS.PINNED_MESSAGES_CONTAINER);
  }

  get pinnedMessagesContainer() {
    return this.instance.$(SELECTORS.PINNED_MESSAGES_CONTAINER);
  }
}

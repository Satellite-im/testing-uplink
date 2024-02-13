require("module-alias/register");
import { clickOnSwitchMacOS } from "@helpers/commands";
import { MACOS_DRIVER, WINDOWS_DRIVER } from "@helpers/constants";
import UplinkMainScreen from "@screenobjects/UplinkMainScreen";

let SELECTORS = {};

const SELECTORS_COMMON = {};

const SELECTORS_WINDOWS = {
  ALLOW_MEMBERS_TO_ADD_EDIT_NAME: '[name="allow-members-to-add-edit-name"]',
  ALLOW_MEMBERS_TO_ADD_OTHERS: '[name="allow-members-to-add-others"]',
  GROUP_SETTINGS_MODAL: '[name="modal"]',
  GROUP_SETTINGS_MODAL_CONTENTS: '[name="group-settings"]',
  GROUP_SETTINGS_MODAL_HEADER: "//Text/Text",
  SETTINGS_CONTROL: '[name="settings-control"]',
  SETTINGS_CONTROL_TEXT: "//Group/Text",
  SWITCH_SLIDER: '[name="Switch Slider"]',
  SWITCH_SLIDER_VALUE: '[name="switch-slider-value"]',
};

const SELECTORS_MACOS = {
  ALLOW_MEMBERS_TO_ADD_EDIT_NAME: "~allow-members-to-add-edit-name",
  ALLOW_MEMBERS_TO_ADD_OTHERS: "~allow-members-to-add-others",
  GROUP_SETTINGS_MODAL: "~modal",
  GROUP_SETTINGS_MODAL_CONTENTS: "~group-settings",
  GROUP_SETTINGS_MODAL_HEADER:
    "-ios class chain:**/XCUIElementTypeStaticText/XCUIElementTypeStaticText",
  SETTINGS_CONTROL: "~settings-control",
  SETTINGS_CONTROL_TEXT:
    "-ios class chain:**/XCUIElementTypeGroup/XCUIElementTypeStaticText",
  SWITCH_SLIDER: "~Switch Slider",
  SWITCH_SLIDER_VALUE: "~switch-slider-value",
};

process.env.DRIVER === WINDOWS_DRIVER
  ? (SELECTORS = { ...SELECTORS_WINDOWS, ...SELECTORS_COMMON })
  : (SELECTORS = { ...SELECTORS_MACOS, ...SELECTORS_COMMON });

export default class GroupSettings extends UplinkMainScreen {
  constructor() {
    super(SELECTORS.GROUP_SETTINGS_MODAL);
  }

  get allowMembersToAddEditName() {
    return this.groupSettingsModalContents.$(
      SELECTORS.ALLOW_MEMBERS_TO_ADD_EDIT_NAME,
    );
  }

  get allowMembersToAddEditNameText() {
    return this.allowMembersToAddEditName
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SETTINGS_CONTROL_TEXT);
  }

  get allowMembersToAddEditNameSwitch() {
    return this.allowMembersToAddEditName
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get allowMembersToAddEditNameSwitchValue() {
    return this.allowMembersToAddEditNameSwitch.$(
      SELECTORS.SWITCH_SLIDER_VALUE,
    );
  }

  get allowMembersToAddOthers() {
    return this.groupSettingsModalContents.$(
      SELECTORS.ALLOW_MEMBERS_TO_ADD_OTHERS,
    );
  }

  get allowMembersToAddOthersText() {
    return this.allowMembersToAddOthers
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SETTINGS_CONTROL_TEXT);
  }

  get allowMembersToAddOthersSwitch() {
    return this.allowMembersToAddOthers
      .$(SELECTORS.SETTINGS_CONTROL)
      .$(SELECTORS.SWITCH_SLIDER);
  }

  get allowMembersToAddOthersSwitchValue() {
    return this.allowMembersToAddOthersSwitch.$(SELECTORS.SWITCH_SLIDER_VALUE);
  }

  get groupSettingsModal() {
    return $(SELECTORS.GROUP_SETTINGS_MODAL);
  }

  get groupSettingsModalContents() {
    return this.groupSettingsModal.$(SELECTORS.GROUP_SETTINGS_MODAL_CONTENTS);
  }

  get groupSettingsModalHeader() {
    return this.groupSettingsModal.$(SELECTORS.GROUP_SETTINGS_MODAL_HEADER);
  }

  async clickOnAllowMembersToAddEditNameSwitch() {
    const currentDriver = await this.getCurrentDriver();
    const allowMembersToAddEditNameSwitch =
      await this.allowMembersToAddEditNameSwitch;
    if (currentDriver === WINDOWS_DRIVER) {
      await allowMembersToAddEditNameSwitch.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(allowMembersToAddEditNameSwitch);
    }
  }

  async clickOnAllowMembersToAddOthersSwitch() {
    const currentDriver = await this.getCurrentDriver();
    const allowMembersToAddOthersSwitch =
      await this.allowMembersToAddOthersSwitch;
    if (currentDriver === WINDOWS_DRIVER) {
      await allowMembersToAddOthersSwitch.click();
    } else if (currentDriver === MACOS_DRIVER) {
      await clickOnSwitchMacOS(allowMembersToAddOthersSwitch);
    }
  }
}

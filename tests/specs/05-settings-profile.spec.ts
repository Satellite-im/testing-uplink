import CreatePinScreen from "../screenobjects/CreatePinScreen";
import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsMainScreen from "../screenobjects/SettingsMainScreen";

describe("Settings - Profile - Tests", async () => {
  before(async () => {
    await CreatePinScreen.enterPin("1234" + "\n");
    await UplinkMainScreen.goToSettings();
    await SettingsMainScreen.waitForIsShown(true);
  });

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await SettingsMainScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await SettingsMainScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await SettingsMainScreen.buttonNav).toBeDisplayed();
    await expect(await SettingsMainScreen.chatsButton).toBeDisplayed();
    await expect(await SettingsMainScreen.filesButton).toBeDisplayed();
    await expect(await SettingsMainScreen.friendsButton).toBeDisplayed();
    await expect(await SettingsMainScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await SettingsMainScreen.sidebar).toBeDisplayed();
    await expect(await SettingsMainScreen.sidebarChildren).toBeDisplayed();
    await expect(await SettingsMainScreen.sidebarSearch).toBeDisplayed();
  });

  xit("Settings Profile - Assert screen texts", async () => {});

  xit("Settings Profile - Validate placeholder texts on inputs", async () => {});

  xit("Settings Profile - Add profile picture", async () => {});

  xit("Settings Profile - Validate change banner tooltip", async () => {});

  xit("Settings Profile - Add banner picture", async () => {});

  xit("Settings Profile - Change profile picture", async () => {});

  xit("Settings Profile - Change banner picture", async () => {});

  xit("Settings Profile - Username with less than 4 characters", async () => {});

  xit("Settings Profile - Username with more than 32 characters", async () => {});

  xit("Settings Profile - Status with more than 128 characters", async () => {});

  xit("Settings Profile - Status delete button", async () => {});
});

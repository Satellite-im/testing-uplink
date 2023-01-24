import UplinkMainScreen from "../screenobjects/UplinkMainScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";
import { loginWithRandomUser } from "../helpers/commands";

describe("Settings - Profile - Tests", async () => {
  before(async () => {
    await loginWithRandomUser();
    await UplinkMainScreen.goToSettings();
    await SettingsProfileScreen.waitForIsShown(true);
  });

  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    await expect(await SettingsProfileScreen.prereleaseIndicator).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release");
  });

  it("Validate Nav Bar and buttons are displayed", async () => {
    await expect(await SettingsProfileScreen.buttonNav).toBeDisplayed();
    await expect(await SettingsProfileScreen.chatsButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.filesButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.friendsButton).toBeDisplayed();
    await expect(await SettingsProfileScreen.settingsButton).toBeDisplayed();
  });

  it("Validate Sidebar is displayed in screen", async () => {
    await expect(await SettingsProfileScreen.sidebar).toBeDisplayed();
    await expect(await SettingsProfileScreen.sidebarChildren).toBeDisplayed();
    await expect(await SettingsProfileScreen.sidebarSearch).toBeDisplayed();
  });

  // Skipped since it needs research and more work
  xit("Settings Profile - Assert screen and placeholder texts", async () => {
    await expect(await SettingsProfileScreen.usernameLabel).toHaveTextContaining("USERNAME");
    await expect(await SettingsProfileScreen.statusLabel).toHaveTextContaining("STATUS");
    await expect(await SettingsProfileScreen.usernameInput).toHaveTextContaining("Mock Username");
    await expect(await SettingsProfileScreen.statusInput).toHaveTextContaining("Mock status messages are so 2008.");
  });

  // Skipped - Needs visual validation to ensure that picture was actually loaded
  xit("Settings Profile - Add profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture('./tests/fixtures/logo.jpg');
  });

  // Skipped since it needs research and more work
  xit("Settings Profile - Validate change banner tooltip", async () => {
    const bannerTooltip = await SettingsProfileScreen.profileBanner.$("//*[value='Change banner']");
    await expect(bannerTooltip).toBeDisplayed();
    await expect(bannerTooltip).toHaveTextContaining("Change banner");
  });

  // Skipped - Needs visual validation to ensure that picture was actually loaded
  xit("Settings Profile - Add banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture('./tests/fixtures/banner.jpg');
    await (await SettingsProfileScreen.usernameInput).click();
  });

  // Skipped - Need to look for a second profile picture to add on fixtures - Also needs visual validation to ensure that picture was actually loaded
  xit("Settings Profile - Change profile picture", async () => {});

  // Skipped - Need to look for a second profile picture to add on fixtures - Also needs visual validation to ensure that picture was actually loaded
  xit("Settings Profile - Change banner picture", async () => {});

  it("Settings Profile - Username with less than 4 characters", async () => {
    await SettingsProfileScreen.enterUsername("123");
    await expect(SettingsProfileScreen.inputErrorOnUsernameMin).toBeDisplayed();
    await expect(SettingsProfileScreen.inputErrorOnUsernameMin).toHaveTextContaining("Please enter at least 4 characters.");
  });

  // Needs research
  xit("Settings Profile - Spaces are not allowed", async () => {
    await SettingsProfileScreen.enterUsernameWithSpaces();
    await expect(await SettingsProfileScreen.inputErrorOnUsernameSpaces).toBeDisplayed();
    await expect(await SettingsProfileScreen.inputErrorOnUsernameSpaces).toHaveTextContaining("Spaces are not allowed.");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    await SettingsProfileScreen.enterUsername("12345678901234567890123456789012345");
    await expect(await SettingsProfileScreen.inputErrorOnUsernameMax).toBeDisplayed();
    await expect(await SettingsProfileScreen.inputErrorOnUsernameMax).toHaveTextContaining("Maximum of 32 characters exceeded.");
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    await SettingsProfileScreen.enterStatus("1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890");
    await expect(await SettingsProfileScreen.inputErrorOnStatus).toBeDisplayed();
    await expect(await SettingsProfileScreen.inputErrorOnStatus).toHaveTextContaining("Maximum of 128 characters exceeded.");
  });

  // Skipped since we need to implement visual testing to test this button since it is not part of the DOM structure from Appium
  xit("Settings Profile - Status delete button", async () => {});
});
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
    await expect(
      await SettingsProfileScreen.prereleaseIndicator
    ).toBeDisplayed();
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

  it("Settings Profile - Assert screen and placeholder texts", async () => {
    // Assert username and status labels are displayed on screen
    await expect(
      await SettingsProfileScreen.usernameLabel
    ).toHaveTextContaining("USERNAME");
    await expect(await SettingsProfileScreen.statusLabel).toHaveTextContaining(
      "STATUS"
    );

    // Assert username and status placeholder values are displayed
    await expect(
      await SettingsProfileScreen.usernameInput
    ).toHaveTextContaining("Mock Username");
    await expect(await SettingsProfileScreen.statusInput).toHaveTextContaining(
      "Mock status messages are so 2008."
    );
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Add profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/logo.jpg"
    );
  });

  it("Settings Profile - Validate change banner tooltip", async () => {
    // Hover on banner picture
    await SettingsProfileScreen.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    await expect(SettingsProfileScreen.profileBannerTooltip).toBeDisplayed();
    await expect(
      SettingsProfileScreen.profileBannerTooltip
    ).toHaveTextContaining("Change banner");
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Add banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );
    await (await SettingsProfileScreen.usernameInput).click();
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/second-profile.png"
    );
  });

  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  it("Settings Profile - Change banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/second-banner.jpg"
    );
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Enter username value with less than 4 characters
    await SettingsProfileScreen.enterUsername("123");

    // Validate that error message is displayed
    await expect(
      await SettingsProfileScreen.inputErrorOnUsernameMin
    ).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.inputErrorOnUsernameMin
    ).toHaveTextContaining("Please enter at least 4 characters.");
  });

  it("Settings Profile - Spaces are not allowed", async () => {
    // Enter username value with spaces
    await SettingsProfileScreen.enterUsername(" abc ");

    // Validate that error message is displayed
    await expect(
      await SettingsProfileScreen.inputErrorOnUsernameSpaces
    ).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.inputErrorOnUsernameSpaces
    ).toHaveTextContaining("Spaces are not allowed.");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Enter username value with more than 32 characters
    await SettingsProfileScreen.enterUsername(
      "12345678901234567890123456789012345"
    );

    // Validate that error message is displayed
    await expect(
      await SettingsProfileScreen.inputErrorOnUsernameMax
    ).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.inputErrorOnUsernameMax
    ).toHaveTextContaining("Maximum of 32 characters exceeded.");
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Enter a valid username to hide error message on username
    await SettingsProfileScreen.enterUsername("1234");

    // Enter status value with more than 128 characters
    await SettingsProfileScreen.enterStatus(
      "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    );

    // Validate that error message is displayed
    await expect(
      await SettingsProfileScreen.inputErrorOnStatus
    ).toBeDisplayed();
    await expect(
      await SettingsProfileScreen.inputErrorOnStatus
    ).toHaveTextContaining("Maximum of 128 characters exceeded.");
  });

  // Skipped since we need to implement visual testing to test this button since element is not part of the DOM structure on Appium
  xit("Settings Profile - Status delete button", async () => {});
});

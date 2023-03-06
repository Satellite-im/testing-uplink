import SettingsGeneralScreen from "../screenobjects/SettingsGeneralScreen";
import SettingsProfileScreen from "../screenobjects/SettingsProfileScreen";

export default async function settingsProfile() {
  it("Validate Pre Release Indicator is displayed and has correct text", async () => {
    // Go to Settings Screen and finally select the Settings Screen to validate
    await SettingsGeneralScreen.goToProfileSettings();
    await SettingsProfileScreen.waitForIsShown(true);

    // Start validations
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

  it("Settings Profile - Assert texts for Your New Profile dialog and dismiss it", async () => {
    expect(
      await SettingsProfileScreen.yourNewProfileHeaderText
    ).toHaveTextContaining("YOUR NEW PROFILE!");
    expect(
      await SettingsProfileScreen.yourNewProfileDescriptionTextOne
    ).toHaveTextContaining(
      "Tell the world all about yourself, well tell them as much as you can while we're still under construction, at least."
    );
    expect(
      await SettingsProfileScreen.yourNewProfileDescriptionTextTwo
    ).toHaveTextContaining(
      "First step, pick out a profile picture and maybe even a banner too!"
    );
    await SettingsProfileScreen.clickOnDismissButton();
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
    ).toHaveTextContaining("test123");
    await expect(await SettingsProfileScreen.statusInput).toHaveTextContaining(
      ""
    );
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Add profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/logo.jpg"
    );
  });

  // Skipped for now since it needs research on how to implement hover on Windows Appium Driver
  xit("Settings Profile - Validate change banner tooltip", async () => {
    // Hover on banner picture
    await SettingsProfileScreen.hoverOnBanner();

    // Validate that change banner tooltip is displayed
    await expect(SettingsProfileScreen.profileBannerTooltip).toBeDisplayed();
    await expect(
      SettingsProfileScreen.profileBannerTooltip
    ).toHaveTextContaining("Change banner");
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Add banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/banner.jpg"
    );
    await (await SettingsProfileScreen.usernameInput).click();
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Change profile picture", async () => {
    await SettingsProfileScreen.uploadProfilePicture(
      "./tests/fixtures/second-profile.png"
    );
  });

  // Skipping test since items are not connected with Warp
  // Needs visual validation steps to ensure that picture was actually loaded matches with expected image
  xit("Settings Profile - Change banner picture", async () => {
    await SettingsProfileScreen.uploadBannerPicture(
      "./tests/fixtures/second-banner.jpg"
    );
  });

  it("Settings Profile - Status with more than 128 characters", async () => {
    // Enter status value with more than 128 characters
    await SettingsProfileScreen.enterStatus(
      "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    ).then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Maximum of 128 characters exceeded."
      );
    });

    // Clear value from status input
    await SettingsProfileScreen.deleteStatus();
  });

  it("Settings Profile - Username with less than 4 characters", async () => {
    // Enter username value with less than 4 characters
    await SettingsProfileScreen.enterUsername("123").then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Please enter at least 4 characters."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  // Test is failing because webdriverio handles spaces as dots and needs more research to avoid flakiness
  xit("Settings Profile - Spaces are not allowed", async () => {
    // Enter username value with spaces
    await SettingsProfileScreen.enterUsername("1234     ").then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Spaces are not allowed."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  it("Settings Profile - Username with non-alphanumeric characters", async () => {
    // Enter username value with non-alphanumeric characters
    await SettingsProfileScreen.enterUsername("test&^%*%#$").then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Only alphanumeric characters are accepted."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  it("Settings Profile - Username with more than 32 characters", async () => {
    // Enter username value with more than 32 characters
    await SettingsProfileScreen.enterUsername(
      "12345678901234567890123456789012345"
    ).then(() => {
      // Validate that error message is displayed
      expect(SettingsProfileScreen.inputError).toBeDisplayed();
      expect(SettingsProfileScreen.inputErrorMessage).toHaveTextContaining(
        "Maximum of 32 characters exceeded."
      );
    });

    // Clear value from username input, then enter a valid value again
    await SettingsProfileScreen.enterUsername("1234");
  });

  // Skipped since we need to implement visual testing to test this button since element is not part of the DOM structure on Appium
  xit("Settings Profile - Status delete button", async () => {});
}

# Uplink - UI Test Automation Framework

Test Automation Framework designed to create UI tests in webdriverIO using Appium for Uplink app on macOS now, and Windows/Linux Uplink apps in the future

## Based on

This automation framework is currently based on:

- **WebdriverIO:** `8.2.4`
- **Appium:** `2.0.0`

## Setting up to run on the local machine - MAC OS

1. First, install NodeJS and then all the required dependencies

```sh
npm install
```

2. Install Appium on a local machine. You can find detailed instructions for this process [here](https://appium.io/docs/en/about-appium/getting-started/)
3. Add Appium drivers required to execute the tests on the desired platform. For now, the framework only works for macOS

```sh
# To Install Appium Mac2 Driver to run the tests on macOS
appium driver install mac2

# To Install Appium Windows Driver to run the tests on Windows
appium driver install --source=npm appium-windows-driver
```

4. Ask the development team to provide the latest .dmg file for macOS testing or .exe for Windows. On Windows, you can place the application on /apps folder and ensure that the name of the app is ui.exe
5. Once the application is installed, you can run the tests by using the following commands:

```sh
# To run the tests under MacOS
npm run mac.app
```

```sh
# To run the tests under Windows
npm run windows.app
```

## Configuration files

This framework uses a specific config for macOS now, and will contain configuration files for Windows/Linux in the future, see [configs](./config). The configs are based on a shared config
[`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts).
This shared config holds **all the defaults** so the macOS/Windows/Linux configs only need to hold the capabilities and specs that are needed
for running on macOS and/or Windows/Linux.

Please check the [`wdio.shared.conf.ts`](./config/wdio.shared.conf.ts)-file for the minimal configuration options. Notes are added for why
a different value has been selected in comparison to the default values WebdriverIO provides.

Since we do not have Appium installed as part of this package we are going to use the globally installed version of Appium. This is
configured in [`wdio.shared.local.appium.conf.ts`](./config/wdio.shared.local.appium.conf.ts).

Finally, since there will be a GitHub action setup to run the Appium tests on macOS, there will be one configuration file used to run these tests on CI. This will be configured in [`wdio.macos.ci.conf.ts`](./config/wdio.macos.ci.conf.ts).

## Locator strategy for native apps

The locator strategy for this Test Automation Framework is to preferably use `accessibilityID`'s. `AccessibilityID`'s make it easy to script once and run on macOS and Windows because most of the apps already have some `accessibilityID`'s.

If `accessibilityID`'s can't be used, for example, then for Mac2 driver, -ios class chain or -ios predicate string should be preferred as locators. Finally, the last option to use could be XPATH, which is not preferred because these can be changed without notice for us when new UI elements are added to the screens.

## Improvements to be implemented soon

- Tests running on Windows - Work is in progress and needs to add UI locators for windows. Soon this will be deployed to dev!
- Tests running on Ubuntu - To add these, we need to start adding the Ubuntu UI locators for the elements and then modify the tests to run on both platforms. Also, there is no official driver for Appium to run tests under Ubuntu. Unfortunately, there is only one third-party driver that we need to validate that it is secure and works correctly before implementing it inside the project

## Demo Videos

- Local Execution on MacOS:

https://user-images.githubusercontent.com/35935591/212192292-86782549-da25-4f90-920d-e68fbb877e8d.mov

## Test Coverage Matrix

Right now, we are working hard to match the existing functionalities from Uplink. You can find [here](./TEST_COVERAGE.md) a test coverage matrix with the list of UI tests already implemented (marked with "X") and the ones that will be added soon to the UI testing framework

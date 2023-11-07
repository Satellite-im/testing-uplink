# Uplink - UI Test Automation Framework

Test Automation Framework designed to run UI/E2E tests in Uplink Applications using Appium and WebdriverIO. Tests can run now in MacOS and Windows, and we would like to implement the same tests to run against Linux/Ubuntu builds in the future.

Tests running using GitHub Actions:

<p align="left">
    <a href="https://github.com/Satellite-im/testing-uplink/actions"><img src="https://github.com/Satellite-im/testing-uplink/actions/workflows/ui-automated-tests.yml/badge.svg" /></a>
</p>

## Based on

This automation framework is currently based on the following:

- **WebdriverIO:** `8.8.7`
- **Appium:** `2.0.0`

## Setting up to run on the local machine - MAC OS

1. First, install NodeJS on your machine. Then, open a shell session and run:

```sh
npm install
```

2. Install Appium on a local machine. You can use NPM to install the latest version of Appium by running the following shell command:

```sh
npm install -g appium@next
```

3. Add Appium drivers required to execute the tests on the desired platform. For now, the framework only works for macOS

```sh
# To Install Appium Mac2 Driver to run the tests on macOS
appium driver install mac2

# To Install Appium Windows Driver to run the tests on Windows
appium driver install --source=npm appium-windows-driver
```

4. An additional step that is only required in case you run the Appium Tests on Windows is to install the WinAppDriver, used by Appium Windows Driver, to handle the UI from Windows applications and, therefore, run the tests. You can follow the instructions to install WinAppDriver in the following [link](https://github.com/microsoft/WinAppDriver).

5. To build the Uplink application to test, clone the [Uplink repository](https://github.com/Satellite-im/Uplink) in your local machine and follow the specific OS install requirements listed on the [README](https://github.com/Satellite-im/Uplink/blob/dev/README.md) from Uplink, depending on your current OS.

6. Now that you have Uplink setup and the prerequisites from Uplink installed, you can run the following commands in a shell session:

```sh
cargo update
cargo clean
```

Then, execute the following instructions to build the application:

```sh
# To build the app for Windows (uplink.exe)
cargo build --release --package uplink -F production_mode
```

```sh
# To build the app for MacOS (Uplink.app)
make dmg
```

7. Wait until the process is completed, and you will find an uplink.exe program (for Windows) or Uplink.app (for MacOS) file in "Uplink/target/release/windows" or "Uplink/target/release/macOS". If you are on Windows, you just have to create an "apps" folder inside the main folder of the testing-uplink folder and then copy the file uplink.exe to the "./apps/" folder. Now, if you are testing on MacOS, you have to copy the Uplink.app file into your Applications folder from your OS.

Some tests can trigger two or more instances of Uplink simultaneously to test a chat conversation and friend request process in a real environment with more than one user. For now, these tests can only be executed in Windows due to existing limitations on the Appium mac2 driver to run multiple instances simultaneously. If you would like to try these tests, you would need to copy the uplink.exe file into the same apps folder with the name "uplink2.exe". You would have two executables of Uplink running on the same apps folder.

8. Once the application is installed, you can run the tests by using the following commands:

```sh
# To run the tests under MacOS
npm run mac.app
```

```sh
# To run the tests under Windows
npm run windows.app
```

```sh
# To run the chat tests under Windows
npm run windows.multiremote
```

## Configuration files

This framework uses specific config files for macOS, Windows, and Multiremote Chats Tests, see [configs](./config). A Mac App Config File
[`wdio.mac.app.conf.ts`](./config/wdio.mac.app.conf.ts) contains all the WebdriverIO required setup, including capabilities, reporters, services and hooks for running MacOS tests locally.

For Windows, there is a similar file [`wdio.windows.app.conf.ts`](./config/wdio.windows.app.conf.ts) containing the same WebdriverIO required setup, including capabilities, reporters, services and hooks for running Windows tests locally.

Also, there are multi-remote configuration files for Windows and MacOS (in case the external Appium driver for mac is fixed in the future to allow running more than one instance at the same time), the multiremote configuration files are [`wdio.windows.multiremote.conf.ts`](./config/wdio.windows.multiremote.conf.ts) and [`wdio.mac.multiremote.conf.ts`](./config/wdio.mac.multiremote.conf.ts). The files previously mentioned contain the WebdriverIO required setup, including capabilities, reporters, services, and hooks for running Windows multi-remote tests.

Finally, since we have a GitHub Action setup to run the Appium tests on macOS and Windows, there are two configuration files used to run these tests on CI. Configuration for running MacOS tests on CI is setup in [`wdio.mac.ci.conf.ts`](./config/wdio.mac.ci.conf.ts), and for running Windows tests on CI setup is located in [`wdio.windows.ci.conf.ts`](./config/wdio.windows.ci.conf.ts).

## Locator strategy for native apps

The locator strategy for this Test Automation Framework is to use `accessibilityID`'s preferably. `AccessibilityID`'s make it easy to script once and run on macOS and Windows because most apps already have some `accessibilityID`'s.

If `accessibilityID`'s can't be used, for example, then for Mac2 driver, -ios class chain or -ios predicate string should be preferred as locators. Finally, the last option to use could be XPATH, which is not preferred because these can be changed without notice for us when new UI elements are added to the screens.

## Improvements to be implemented soon

- Tests running on Ubuntu - Unfortunately, there are no official drivers for Appium to run tests under Ubuntu or any other Linux Distribution. There is only one third-party driver that does not perform expected actions when connected with WebdriverIO. We are still researching the best way to run automated tests under Ubuntu, and we will get back to you when we have more news!

## Demo Videos

- Local Execution on MacOS:

https://user-images.githubusercontent.com/35935591/212192292-86782549-da25-4f90-920d-e68fbb877e8d.mov

## Test Coverage Matrix

Right now, we are working hard to match the existing functionalities from Uplink. You can find [here](./docs/TEST_COVERAGE.md) a test coverage matrix with the list of UI tests already implemented (marked with "X") and the ones that will be added soon to the UI testing framework

## [UI Locators and How to fix tests failing - Guide](./docs/ARIA_LABELS.md).

We created an extensive document inside this repository to share some tips and guides that will help you avoid breaking tests when updating an Aria Label from Uplink and contribute to adding new Aria labels on UI elements. At the same time, this document contains a guide on updating tests affected for code changes on Uplink. Finally, to have a better understanding of the impact of these UI Locators, a detailed description of the structure of the screen object and spec files from the testing framework is described inside the following [document](./docs/ARIA_LABELS.md). 

Any contributions to the repository are welcome!

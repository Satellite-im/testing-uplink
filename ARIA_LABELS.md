# Automated Testing Framework Aria Labels/UI Locators Guide

## Aria Labels

Under Uplink repository code, you will find several "aria_label" attributed added into elements from kit/src and UI/src inside the *.rs files. These attributes are added to the UI elements from Uplink in order to be used later when creating locators to interact with the same elements inside the automated tests from Appium/WebdriverIO. When creating desktop builds for the application, these aria labels are added as "Accessibility ID" on MacOS and Class Name/Automation ID into Windows, and these are one of the preferred localization strategies used in automated frameworks, due to reliability to identify a single element and faster execution on tests, instead of using Xpath, which is an alternative when no UI locators have been added to the elements yet

## Screenobject Files

The files contained inside the folder /tests/screenobjects/ from this repository contain the definitions of UI locators from elements and the methods to interact with the same elements for a given screen or component. Depending on the complexity of the screen to test, you can find a single screenobject file to define the locators and methods from a component (example: Chats Sidebar on [`ChatsSidebar.ts`](./tests/screenobjects/chats/ChatsSidebar.ts)).

### Structure of Screenobject Files

[`Screenobject files`](./tests/screenobjects/) define a class that encapsulates the interaction with a UI sidebar, providing a structured and reusable way to interact with the UI elements and perform various actions and validations. The behavior of the class varies based on the current operating system.

#### Initial imports and declarations

Here you will find import statements that bring in various constants and functions from other modules. These imports include constants related to the operating system, driver configurations, and helper functions.

#### Selectors declarations

As you can see, there are three objects declared as constants containing the UI Selectors definition. One for common selectors, which includes the selector definitions that are the same for Windows and MacOS. One named SELECTORS_MACOS containing the selector definitions that are used only to locate MacOS elements (usually starting with "~" and the accessibility ID/aria label of the element). Finally, one named SELECTORS_WINDOWS containing the selector definitions used only to locate Windows UI elements (usually starting with '\[name="ARIA_LABEL"]'). The code determines the current operating system (currentOS) based on the driver and constants imported at the beginning. It selects different UI element selectors (SELECTORS) based on the operating system. It uses these selectors later to interact with UI elements.

#### Screenobject Class declaration

A screenobject/component object class is defined. Depending on which screenobject class is declared, it can extent the class named UplinkMainScreen (for Files, Chats or Friends screen components) or SettingsBaseScreen (for Settings), in order to inherit the shared functionality used during the entire application. A constructor is declared to pass the arguments required to declare for the parent class.

#### Getter Methods

The class includes a series of getter methods, each corresponding to a specific UI element within the sidebar. These methods locate and return elements using the specified selectors.

#### Methods to interact with the class

You can find here all the methods required to interact with the screen or component, and the ones that are used along the test spec files.

## Test Spec Files

[`Spec files`](./tests/specs/) contains the different test suites executed along the testing framework. Usually, are structured in describe blocks, which contain a single test suite and inside the describe blocks, you will find it blocks containing a single test executed. Each test contains different steps that usually browse into a given UI element, interact with them and finally make an assertion to verify the behavior is correct.

### Structure of Spec Files

Same as the screenobject files, the spec files usually have the same structure in the testing framework and below is a description of the common parts you can find inside a spec file.

### Import Statements and Object Instantiations

A series of import statements that bring in various functions, classes, and constants from different modules within the project. These modules are organized into folders such as "helpers," "screenobjects," and others. Following the import statements, several instances of different classes are created using the imported modules. These instances likely represent different elements or components of the desktop application, such as layout, input bars, menus and more. These instances are created "User A" when the test is executed in a single instance, and for "User B" when it is required to open more than one instance at the same time (for example: Chats and Friend Requests tests)

### Exported Test Function

The code exports an asynchronous function which contains the test suite or a collection of individual test cases, since there are [`Suite files`](./tests/suites/) containing the test suites that will be executed depending on the job running the tests (MacOS, Windows and Windows Chats).

### Individual Test Cases

Several individual test cases are defined using the it function provided by the Mocha testing framework. Each test case is async and is described by a comment that explains its purpose. Each test case contains a series of steps that perform various actions on the desktop application's UI elements and then use WebdriverIO's assertions to validate the expected behaviors

## Guidelines on how to ensure tests are not breaking

Now that we have explained how the testing framework screenobject and spec files are structured, here are some tips and guidelines that developers can follow on their tests in order to contribute to facilitate the addition/update of UI Locators used in the automation testing framework, and to avoid to break existing tests when an aria label is updated.

## To be added soon

- How to identify if a change is breaking an existing test
- How to browse the Allure Report to find the screenshot of failed test
- How to identify the broken test in the testing framework
- How to ensure if the change breaking the test is expected or there is something wrong with your change
- How to add an aria label for a new UI/Src element
- How to add an aria label for a new UI/Src element based on Kit
- How to add an aria label for a new Kit UI element
- How to update the aria label in the screenobject file
- How to add a new UI locator in the screenobject file

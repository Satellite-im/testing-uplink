# Automated Testing Framework Aria Labels/UI Locators Guide

## Aria Labels

Under Uplink repository code, you will find several "aria_label" attributed added into elements from kit/src and UI/src inside the *.rs files. These attributes are added to the UI elements from Uplink in order to be used later when creating locators to interact with the same elements inside the automated tests from Appium/WebdriverIO. When creating desktop builds for the application, these aria labels are added as "Accessibility ID" on MacOS and Class Name/Automation ID into Windows, and these are one of the preferred localization strategies used in automated frameworks, due to reliability to identify a single element and faster execution on tests, instead of using Xpath, which is an alternative when no UI locators have been added to the elements yet

## Screenobject Files

The files contained inside the folder /tests/screenobjects/ from this repository contain the definitions of UI locators from elements and the methods to interact with the same elements for a given screen or component. Depending on the complexity of the screen to test, you can find a single screenobject file to define the locators and methods from a component (example: Chats Sidebar on [`ChatsSidebar.ts`](../tests/screenobjects/chats/ChatsSidebar.ts)).

### Structure of Screenobject Files

[`Screenobject files`](../tests/screenobjects/) define a class that encapsulates the interaction with a UI sidebar, providing a structured and reusable way to interact with the UI elements and perform various actions and validations. The behavior of the class varies based on the current operating system.

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

[`Spec files`](../tests/specs/) contains the different test suites executed along the testing framework. Usually, are structured in describe blocks, which contain a single test suite and inside the describe blocks, you will find it blocks containing a single test executed. Each test contains different steps that usually browse into a given UI element, interact with them and finally make an assertion to verify the behavior is correct.

### Structure of Spec Files

Same as the screenobject files, the spec files usually have the same structure in the testing framework and below is a description of the common parts you can find inside a spec file.

### Import Statements and Object Instantiations

A series of import statements that bring in various functions, classes, and constants from different modules within the project. These modules are organized into folders such as "helpers," "screenobjects," and others. Following the import statements, several instances of different classes are created using the imported modules. These instances likely represent different elements or components of the desktop application, such as layout, input bars, menus and more. These instances are created "User A" when the test is executed in a single instance, and for "User B" when it is required to open more than one instance at the same time (for example: Chats and Friend Requests tests)

### Exported Test Function

The code exports an asynchronous function which contains the test suite or a collection of individual test cases, since there are [`Suite files`](../tests/suites/) containing the test suites that will be executed depending on the job running the tests (MacOS, Windows and Windows Chats).

### Individual Test Cases

Several individual test cases are defined using the it function provided by the Mocha testing framework. Each test case is async and is described by a comment that explains its purpose. Each test case contains a series of steps that perform various actions on the desktop application's UI elements and then use WebdriverIO's assertions to validate the expected behaviors

## Guidelines on how to ensure tests are not breaking

Now that we have explained how the testing framework screenobject and spec files are structured, here are some tips and guidelines that developers can follow on their tests in order to contribute to facilitate the addition/update of UI Locators used in the automation testing framework, and to avoid to break existing tests when an aria label is updated.

### Identify if a code change in Uplink is breaking an existing test

When a PR is sent under Uplink repository, the jobs from the UI Automated Tests workflow are triggered. First, it creates a build application for Windows and one for MacOS containing the changes under your commits. When the build jobs are finished, then there are three jobs starting:

#### Test MacOS

Job that executes all tests under MacOS application using a single instance of the application. Unfortunately, the multiremote webdriverio option does not work with the appium driver for MacOS and there is no way so far on running tests using more than one instance at the same time. We are still doing research on how to run tests at the same time for more than one instance in MacOS, but for now there are more than 150 tests executed inside a single instance of Uplink in MacOS, including validations on Create Account, Settings, Friends and Files screens.

#### Test Windows

Job that executes all tests under Windows application requiring only a single instance of Uplink. For now, there are more than 100 tests executed inside a single instance of Uplink in Windows, including validations on Create Account, Settings and Files screens.

#### Test Windows Chats

Job that executes all tests under Windows application requiring two instances of Uplink. For now, there are more than 100 tests executed using two instances at the same time, including validations on create two accounts under execution, passing the friend request process, validations on Chat Screen between the two users and on group chats.


### How to find if a test is failing under your Pull Request

Automated testing framework is designed to provide the more feedback as possible to developers. When the test jobs described above are completed, there are other supplementary steps in the workflow in charge of posting test results and deleting artifacts if tests are completed. 

#### UI Tests Results Summary Comment

First, you will find a comment added into your PR sharing the number of tests executed, and a summary of how many of them passed, failed and are skipped (tests requiring attention that are not executed now). The testing results will fail in the moment of failure of a single test. Then, if the PR contains a test breaking change, you will see the red cross symbol states a number greater or equal to 1. Comment is auto-updated every time a new commit under the PR triggers the test worklow.

![UI Automated Tests Summary Comment Example](./resources/comment-summary.png)

### Allure Test Report on UI Automated Tests

Allure Report is a tool designed to report test results from CI automated tests execution in a manner that is friendly to any user, regardless of their technical background. A comment containing a link to a github pages site containing the Allure Test Results will be found in the PR. Comment is auto-updated every time a new commit under the PR triggers the test worklow. It is recommended to wait for at least 5 minutes after the Automated Test workflow completes to review the link from the report (you might see an error page if you check it out immedeately).

![UI Automated Tests Report Link Comment Example](./resources/comment-link.png)

1. Click in the link to the report to show the Allure Report. You will see the main page of the report showing a pie chart with the test results and a summary of the test suites executed. You can click on the "Show all" option to display all the test suites executed.

![Allure Report Main Page](./resources/allure-01.png)

2. Once that you are on the suites page, you will see a list of all the test suites executed, including each row a green number (tests passed), a grey number (tests skipped) and a yellow or red number (tests failed). In order to identify a test failing, go to th

![Allure Report Suites Page](./resources/allure-02.png)

3. Click on the test suite containing the yellow/red number greater than zero, to find the test that it is failing on the execution. A tree containing the tests inside the test suite (each test is a row) will be displayed. If you click on the row containg the yellow or red indicator, you will see in the right side highlighted the error found during test (in this example "Can't call $ on element with selector "\[name="User"]" because element wasn't found"). Also, if you go to the botton right section "Test Body", you can see an image attached that you can click to display in the report. This is the screenshot of the test failure. We are currently working on adding videos from the execution, so at some point we will be able to see the error screenshot and a video of the execution of the test failed (work in progress).

![Allure Report Results Failed](./resources/allure-03.png)

In this case, we can see that the test is breaking because the UI element previously with Aria Label = "User" now has a different Aria Label/UI Locator or does not have one, then the testing framework cannot find it.

### Reasons for tests breaking

There could be different reasons causing a test to fail, for example:

- Aria Label modified in the source code - Example provided above. Screenobject file will have to be updated in the testing repository in order to change the SELECTORS_WINDOWS and SELECTORS_MACOS to use the new aria label.
- Texts modified in one section - There are tests asserting texts in UI elements, so if a UI element text is modified, then the associated test will break. Texts will have to be updated in the spec files in order to reflect the latest changes in the application.
- UI elements from tests removed or changed - Improvements during developing of the application are expected, then it is possible that due to a refactor in the code, a UI element is changed or removed completely, and therefore the tests associated to this element are going to break. In these cases, tests could be updated by adding the new UI locators into the corresponding screenobject file, or deleted from the testing repository, since these are no longer valid.
- If an automated test is failing in a section that is not related to the one that your code changes are changing, then there is a possibility that the code is introducing an issue into the application. It is recommended to manually verify if the automated test failing is also failing doing manual execution on the platform specified (MacOS or Windows).
- Same, if none of the previous reasons listed is the root cause of the test failing, it is an indicator that something in the code change might be introducing an issue into the application. Same, it is recommended to manually verify if the automated test failing is also failing doing manual execution on the platform specified (MacOS or Windows).

### How to add/update an aria label for a new UI/Src element on Uplink

When adding new elements in /UI/Src files from Uplink repository using common HTML elements, then you can easily add a new aria label to the element, by adding the property "aria_label" and assign a short value separated by dashes identifying the action performed by the element. Example on Uplink Repo (ui/src/layouts/storage/mod.rs - Line 287):

```
rsx!(
    p {
        class: "free-space",
        aria_label: "free-space-max-size",
        format!("{}", get_local_text("files.storage-max-size")),
        span {
            class: "count",
            format!("{}", storage_controller.read().storage_size.0),
        }
    },
```

### How to add/update an aria label for a new UI/Src element defined on UI/Kit

There are elements from UI/Src in Uplink repository which already have the property aria label assigned as optional. 

Examples:

- kit/src/components/context_menu
- kit/src/components/friends/friend
- kit/src/components/user
- kit/src/components/user_image_group
- kit/src/elements/button
- kit/src/elements/file
- kit/src/elements/folder
- kit/src/elements/input
- kit/src/elements/label
- kit/src/elements/textarea

For the following elements, it is possible to add an aria label by assigning the aria label property to the element and then adding the method .into(). For example, the following UI element based on the Button from kit/src/elements, the aria label added is declared as "aria-value".into(). Example from kit/src/components/embeds/file_embed/mod.rs - Line 294.

```
if with_download_button {
    rsx!(
        Button {
            icon: btn_icon,
            appearance: Appearance::Primary,
            aria_label: "attachment-button".into(),
            onpress: move |_| cx.props.on_press.call(()),
        }
    )
}
```

### How to add an aria label for a new Kit UI element

This is the most complex case on adding aria labels, when you need to add an aria label into an element from kit/src which can be assigned later to elements using this structure. In this cases, you need to follow the next steps:

1. Add the property aria_label as optional string into the definition of the public struct defined in the kit/src file. Below, you can find an example from kit/src/components/context_menu/mod.rs - Line 23

```
#[derive(Props)]
pub struct ItemProps<'a> {
    #[props(optional)]
    onpress: Option<EventHandler<'a, MouseEvent>>,
    text: String,
    disabled: Option<bool>,
    #[props(optional)]
    icon: Option<icons::outline::Shape>,
    #[props(optional)]
    danger: Option<bool>,
    should_render: Option<bool>,
    aria_label: Option<String>,
    #[props(optional)]
    children: Option<Element<'a>>,
}
```

2. Declare a variable named aria_label that will hold the value assigned to the label. This variable unwrap the value if exists or return a default value if it does not exist. In order, to handle optional values in case that aria label is not defined for all the elements using this structure. Below, you can find an example from kit/src/components/context_menu/mod.rs - Line 51

```
let aria_label = cx.props.aria_label.clone().unwrap_or_default();
```

3. Inside the rendering part of the code, when you declare the attributes from the HTML element, add a placeholder for the aria_label property, like the example below from kit/src/components/context_menu/mod.rs - Line 62:

```
cx.render(rsx!(
    button {
        class: format_args!("{class} {}", if disabled {"context-item-disabled"} else {""}),
        aria_label: "{aria_label}",
        onclick: move |e| {
            if !disabled {
                emit(&cx, e);
            }
        },
```

4. Once that you have defined the aria label property in the kit/src files, you can follow the steps from "How to add an aria label for a new Kit UI element" to assign the label value into the elements based on the same structure.

### How to update the aria label in the screenobject file

To be added soon...

### How to add a new UI locator in the screenobject file

To be added soon...
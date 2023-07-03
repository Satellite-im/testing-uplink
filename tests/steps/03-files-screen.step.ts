import { Given, When, Then } from "@wdio/cucumber-framework";
import FilesScreen from "../screenobjects/files/FilesScreen";
import FriendsScreen from "../screenobjects/friends/FriendsScreen";
import { USER_A_INSTANCE } from "../helpers/constants";
let filesScreenFirstUser = new FilesScreen(USER_A_INSTANCE);
let friendsScreenFirstUser = new FriendsScreen(USER_A_INSTANCE);

Given(/^I go from Friend Screen to Files Screen$/, async () => {
  await friendsScreenFirstUser.goToFiles();
  await filesScreenFirstUser.waitForIsShown(true);
});

When(/^I am on the Files Screen$/, async () => {
  await filesScreenFirstUser.waitForIsShown(true);
});

When(/^I hover on Add Folder Button$/, async () => {
  await filesScreenFirstUser.hoverOnNewFolderButton();
});

When(/^I hover on Upload Button$/, async () => {
  await filesScreenFirstUser.hoverOnUploadButton();
});

When(
  /^I click on create folder and enter the name (.*)$/,
  async (name: string) => {
    await filesScreenFirstUser.createFolder(name);
  }
);

When(/^I click on (.*) folder crumb$/, async (name: string) => {
  await filesScreenFirstUser.clickOnFolderCrumb(name);
});

When(/^I click on home folder$/, async () => {
  await filesScreenFirstUser.clickOnHomeFolderCrumb();
});

When(
  /^I click on upload file and select file (.*)$/,
  async (filepath: string) => {
    await filesScreenFirstUser.uploadFile(filepath);
  }
);

When(
  /^I open the context menu for (.*) on Files Screen$/,
  async (name: string) => {
    await filesScreenFirstUser.openFilesContextMenu(name);
  }
);

When(
  /^I select the option Rename from Files Context Menu for folder$/,
  async () => {
    await filesScreenFirstUser.clickOnFolderRename();
  }
);

When(
  /^I select the option Delete from Files Context Menu for folder$/,
  async () => {
    await filesScreenFirstUser.clickOnFolderDelete();
  }
);

When(/^I update the name to (.*) on Files Screen$/, async (name: string) => {
  await filesScreenFirstUser.updateNameFileFolder(name);
});

When(
  /^I update the name to (.*) to file with extension (.*) on Files Screen$/,
  async (name: string, extension: string) => {
    await filesScreenFirstUser.updateNameFileFolder(name, extension);
  }
);

When(
  /^I select the option Rename from Files Context Menu for file$/,
  async () => {
    await filesScreenFirstUser.clickOnFilesRename();
  }
);

When(
  /^I select the option Delete from Files Context Menu for file$/,
  async () => {
    await filesScreenFirstUser.clickOnFilesDelete();
  }
);

When(
  /^I select the option Download from Files Context Menu for file$/,
  async () => {
    await filesScreenFirstUser.clickOnFilesDownload();
  }
);

When(
  /^I type the name (.*) on File or Folder Name Input$/,
  async (name: string) => {
    await filesScreenFirstUser.typeOnFileFolderNameInput(name);
  }
);

When(/^I validate that (.*) is created$/, async (name: string) => {
  await filesScreenFirstUser.validateFileOrFolderExist(name);
});

When(/^I click on create folder$/, async () => {
  await filesScreenFirstUser.clickOnCreateFolder();
});

Then(
  /^I should see the Pre Release Indicator displayed on Files Screen$/,
  async () => {
    await expect(filesScreenFirstUser.prereleaseIndicator).toBeDisplayed();
    await expect(
      filesScreenFirstUser.prereleaseIndicatorText
    ).toHaveTextContaining("Pre-release | Issues/Feedback");
  }
);

Then(/^I should see the main buttons displayed on Files Screen$/, async () => {
  await filesScreenFirstUser.chatsButton.waitForExist();
  await filesScreenFirstUser.filesButton.waitForExist();
  await filesScreenFirstUser.friendsButton.waitForExist();
  await filesScreenFirstUser.settingsButton.waitForExist();
});

Then(/^I should see the sidebar displayed on Files Screen$/, async () => {
  await expect(filesScreenFirstUser.chatSearchInput).toBeDisplayed();
  await expect(filesScreenFirstUser.sidebar).toBeDisplayed();
  await expect(filesScreenFirstUser.sidebarChildren).toBeDisplayed();
  await expect(filesScreenFirstUser.sidebarSearch).toBeDisplayed();
});

Then(/^I should see the Files Space Info displayed on screen$/, async () => {
  await expect(filesScreenFirstUser.filesInfo).toBeDisplayed();
  await expect(filesScreenFirstUser.filesInfoCurrentSizeLabel).toBeDisplayed();
  await expect(filesScreenFirstUser.filesInfoCurrentSizeValue).toBeDisplayed();
  await expect(filesScreenFirstUser.filesInfoMaxSizeLabel).toBeDisplayed();
  await expect(filesScreenFirstUser.filesInfoMaxSizeValue).toBeDisplayed();
});

Then(/^I should see the Files Breadcrumbs displayed on screen$/, async () => {
  await expect(filesScreenFirstUser.filesBreadcrumbs).toBeDisplayed();
  await expect(filesScreenFirstUser.crumb).toBeDisplayed();
});

Then(
  /^I should see the Add Folder and Upload Buttons displayed on screen$/,
  async () => {
    await expect(filesScreenFirstUser.addFolderButton).toBeDisplayed();
    await expect(filesScreenFirstUser.uploadFileButton).toBeDisplayed();
  }
);

Then(/^I should see the Add Folder Button tooltip displayed$/, async () => {
  await filesScreenFirstUser.addFolderTooltip.waitForExist();
  await expect(filesScreenFirstUser.addFolderTooltipText).toHaveTextContaining(
    "New Folder"
  );
});

Then(/^I should see the Upload Button tooltip displayed$/, async () => {
  await filesScreenFirstUser.uploadFileTooltip.waitForExist();
  await expect(filesScreenFirstUser.uploadFileTooltipText).toHaveTextContaining(
    "Upload"
  );
});

Then(/^I should see (.*) displayed on Files Screen$/, async (name: string) => {
  await filesScreenFirstUser.validateFileOrFolderExist(name);
});

Then(
  /^I should be able to open (.*) on Files Screen$/,
  async (name: string) => {
    await filesScreenFirstUser.clickOnFileOrFolder(name);
  }
);

Then(/^I should be redirected to (.*) folder$/, async (name: string) => {
  const currentFolder = await filesScreenFirstUser.getCurrentFolder();
  await expect(currentFolder).toEqual(name);
});

Then(
  /^I should see the file (.*) uploaded in Files Section$/,
  async (filename: string) => {
    // Wait until progress indicator disappears
    await filesScreenFirstUser.uploadFileIndicatorProgress.waitForExist({
      reverse: true,
    });

    // Once that progress indicator disappears, validate that file is loaded
    await filesScreenFirstUser.validateFileOrFolderExist(filename);
  }
);

Then(/^I should see (.*) displayed on Files Screen$/, async (name: string) => {
  await filesScreenFirstUser.validateFileOrFolderExist(name);
});

Then(
  /^I should see (.*) does not exist on Files Screen$/,
  async (name: string) => {
    await filesScreenFirstUser.validateFileOrFolderNotExist(name);
  }
);

Then(
  /^I should see the file saved.jpg downloaded on my computer$/,
  async () => {}
);

Then(/^I should see the current max size value is equal to 1 GB$/, async () => {
  await expect(filesScreenFirstUser.filesInfoMaxSizeLabel).toHaveTextContaining(
    "Max Size:"
  );
  await expect(filesScreenFirstUser.filesInfoMaxSizeValue).toHaveTextContaining(
    "1 GB"
  );
});

Then(
  /^I should see the current space value is equal to (.*)$/,
  async (currentSize: string) => {
    await expect(
      filesScreenFirstUser.filesInfoCurrentSizeLabel
    ).toHaveTextContaining("Current Space:");
    await expect(
      filesScreenFirstUser.filesInfoCurrentSizeValue
    ).toHaveTextContaining(currentSize);
  }
);

Then(
  /^I should see an error toast notification for Duplicated Name$/,
  async () => {
    await filesScreenFirstUser.waitUntilNotificationIsClosed();
  }
);

Then(
  /^I should type the name (.*) on File or Folder Name Input$/,
  async (name: string) => {
    await filesScreenFirstUser.typeOnFileFolderNameInput(name);
  }
);

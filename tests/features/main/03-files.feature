Feature: Files Screen Tests
    As a user, I should be able to use test all the functionalities from Files Screen
  
    Scenario: As a user, I should see the main elements displayed on Files Screen
        When I log into the application with the previous account created
        And I go to Files Screen from Welcome Screen
        And I am on the Files Screen
        Then I should see the Pre Release Indicator existing on Files Screen
        And I should see the main buttons existing on Files Screen
        And I should see the sidebar existing on Files Screen
        And I should see the Files Space Info displayed on screen
        And I should see the Files Breadcrumbs displayed on screen
        And I should see the Add Folder and Upload Buttons displayed on screen
    
    Scenario: As a user, I should be able to see the tooltip for Add Folder Button
        When I hover on Add Folder Button
        Then I should see the Add Folder Button tooltip displayed

    Scenario: As a user, I should be able to see the tooltip for Upload File Button
        When I hover on Upload Button
        Then I should see the Upload Button tooltip displayed

    Scenario: As a user, I should be able to create a new folder and enter into it
        When I click on create folder and enter the name testfolder01
        Then I should see testfolder01 displayed on Files Screen
        And I should be able to open testfolder01 on Files Screen

    Scenario: As a user, I should be able to create a new subfolder and enter into it
        When I click on create folder and enter the name testfolder02
        Then I should see testfolder02 displayed on Files Screen
        And I should be able to open testfolder02 on Files Screen
    
    Scenario: As a user, I should be able navigate to a parent folder
        When I click on testfolder01 folder crumb
        Then I should be redirected to testfolder01 folder
    
    Scenario: As a user, I should be able navigate to the home folder
        When I click on home folder
        Then I should be redirected to Home folder
    
    Scenario: As a user, I should be able to upload a file
        When I click on upload file and select file ./tests/fixtures/logo.jpg
        Then I should see the file logo.jpg uploaded in Files Section
    
    Scenario: As a user, I should be able to rename a folder
        When I open the context menu for testfolder01 on Files Screen
        And I select the option Rename from Files Context Menu for folder
        And I update the name of folder to newname on Files Screen
        Then I should see newname displayed on Files Screen
    
    Scenario: As a user, I should be able to delete a folder
        When I open the context menu for newname on Files Screen
        And I select the option Delete from Files Context Menu for folder
        Then I should see newname does not exist on Files Screen

    Scenario: As a user, I should be able to rename a file
        When I open the context menu for logo.jpg on Files Screen
        And I select the option Rename from Files Context Menu for file
        And I update the name of file to newname to file with extension .jpg on Files Screen
        Then I should see newname.jpg displayed on Files Screen

    @skip
    Scenario: As a user, I should be able to download a file
        When I open the context menu for newname.jpg on Files Screen
        And I select the option Download from Files Context Menu for file
        Then I should see the file saved.jpg downloaded on my computer

    Scenario: As a user, I should be able to delete a file
        When I open the context menu for newname.jpg on Files Screen
        And I select the option Delete from Files Context Menu for file
        Then I should see newname.jpg does not exist on Files Screen
    
    Scenario: As a user, I should be able to validate default values for space indicators
        When I am on the Files Screen
        Then I should see the current max size value is equal to 1 GB
        And I should see the current space value is equal to 0 bytes

    Scenario: As a user, I should see that space indicators will be updated after uploading a file
        When I click on upload file and select file ./tests/fixtures/app-macos.zip
        Then I should see the file app-macos.zip uploaded in Files Section
        And I should see the current max size value is equal to 1 GB
        And I should see the current space value is equal to 13.2 MB

    Scenario: As a user, I should be able to prove that a file is automatically renamed when a file with same name already exists
        When I click on upload file and select file ./tests/fixtures/app-macos.zip
        Then I should see the file app-macos (1).zip uploaded in Files Section

    Scenario: As a user, I should not be allowed to rename a file with existing filename
        When I open the context menu for app-macos (1).zip on Files Screen
        And I select the option Rename from Files Context Menu for file
        And I type the name app-macos on File or Folder Name Input
        Then I should see an error toast notification for Duplicated Name
        And I should see the file app-macos (1).zip uploaded in Files Section
    
    Scenario: As a user, I should not be allowed to create a folder with existing folder name
        When I click on create folder and enter the name testfolder01
        And I validate that testfolder01 is created
        And I click on create folder
        And I should type the name testfolder01 on File or Folder Name Input
        Then I should see an error toast notification for Duplicated Name
        And I should type the name testfolder02 on File or Folder Name Input
        And I should see testfolder02 displayed on Files Screen
    
    Scenario: As a user, I should not be able to rename a folder with existing folder name
        When I open the context menu for testfolder02 on Files Screen
        And I select the option Rename from Files Context Menu for folder
        And I should type the name testfolder01 on File or Folder Name Input
        Then I should see an error toast notification for Duplicated Name
        And I should type the name testfolder02 on File or Folder Name Input
        And I should see testfolder02 displayed on Files Screen

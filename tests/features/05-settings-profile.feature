Feature: Settings Profile Tests
    As a user, I should be able to use test all the functionalities from Settings Profile Screen

    Background:
        Given I go to the Settings Profile Screen from Files Screen
    
    Scenario: As a user, I should see the main elements displayed on Settings Profile Screen
        When I am on the Settings Profile Screen with a new account
        Then I should see the Pre Release Indicator displayed on Settings Profile Screen
        And I should see the main buttons displayed on Settings Profile Screen
        And I should see the sidebar displayed on Settings Profile Screen
    
    Scenario: As a user, I should be able to see the Your New Profile dialog on Settings Profile for new accounts
        When I am on the Settings Profile Screen with a new account
        Then I should see the Your New Profile dialog displayed on Settings Profile Screen
        And I should see that the Your New Profile dialog texts are correct
    
    Scenario: As a user, I should be able to dismiss the Your New Profile dialog
        When I click on the Dismiss button from Your New Profile dialog
        Then I should no longer see the Your New Profile dialog displayed
    
    Scenario: As a user, I should be able to see the username and status input placeholder and headers are correct
        When I am on the Settings Profile Screen with a new account
        Then I should see the Settings Profile username input shows Test123
        And I should see the Settings Profile status input is empty
        And I should see the Settings Profile username header is correct
        And I should see the Settings Profile status header is correct
    
    Scenario: As a user, I should be able to see the Copy ID button tooltip
        When I hover on the Settings Profile Screen CopyID button
        Then I should see the Copy ID button tooltip displayed on screen
    
    Scenario: As a user, I should be able to click on the Copy ID button
        When I click on the Settings Profile Screen CopyID button
        Then I should see a success toast notification displayed on Settings Profile Screen
    
    Scenario: As a user, I should be able to paste the copied ID into any text field
        When I paste the copied user key into status input field
        Then I should see the Settings Profile username input shows did:key:
    
    Scenario: As a user, I should be able to add a profile picture
        When I clear the Settings Profile status value
        And I upload the profile picture located in ./tests/fixtures/logo.jpg
        Then I should see the profile picture uploaded in Settings Profile
    
    Scenario: As a user, I should be able to see the change banner tooltip displayed
        When I hover on the banner from Settings Profile Screen
        Then I should see the Change Banner button tooltip displayed on screen
    
    Scenario: As a user, I should be able to add a profile banner
        When I upload the profile banner located in ./tests/fixtures/banner.jpg
        Then I should see the profile banner uploaded in Settings Profile
    
    Scenario: As a user, I should be able to change the profile picture previously loaded
        When I click on Settings Profile Username Input
        And I upload the profile picture located in ./tests/fixtures/second-profile.png
        Then I should see the profile picture uploaded in Settings Profile
    
    Scenario: As a user, I should be able to change the banner picture previously loaded
        When I upload the profile banner located in ./tests/fixtures/second-banner.jpg
        Then I should see the profile banner uploaded in Settings Profile
    
    Scenario: As a user, I should see an error message when attempting to enter a status with more than 128 characters on Settings Profile Screen
        When I enter 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890 in the status field from Settings Profile Screen
        Then I should see an input error message displayed on Settings Profile Screen showing Maximum of 128 characters exceeded.
    
    Scenario: As a user, I should see an error message when attempting to enter a username with less than 4 charactesr on Settings Profile Screen
        When I clear the Settings Profile status value
        And I enter 123 in the username field from Settings Profile Screen
        Then I should see an input error message displayed on Settings Profile Screen showing Please enter at least 4 characters.
    
    Scenario: As a user, I should see an error message when attempting to enter spaces in username input
        When I enter Test123 in the username field from Settings Profile Screen
        And I type spaces in the username field from Settings Profile Screen
        Then I should see an input error message displayed on Settings Profile Screen showing Spaces are not allowed.
    
    Scenario: As a user, I should see an error message when attempting entering non-alphanumeric characters in username input
        When I enter Test123 in the username field from Settings Profile Screen
        And I type test&^%*%#$ in the username field from Settings Profile Screen
        Then I should see an input error message displayed on Settings Profile Screen showing Only alphanumeric characters are accepted.
    
    Scenario: As a user, I should see an error message when attempting entering more than 32 characters in username input
        When I enter Test123 in the username field from Settings Profile Screen
        And I type 12345678901234567890123456789012345 in the username field from Settings Profile Screen
        Then I should see an input error message displayed on Settings Profile Screen showing Maximum of 32 characters exceeded.
    
    Scenario: As a user, I should be able to type again the same username on Settings Profile Screen
        When I enter Test123 in the username field from Settings Profile Screen
        Then I should see the Settings Profile username input shows Test123


    
    

        
Feature: Create Reusable Account Tests
    As a user, I should be able to create test multiple test accounts that can be used later

    Background:
        Given I reset the application with clean cache
    
    Scenario: As a user, I should be able to create a first test account
        When I execute the command with the steps to Create a New User for the first test user
        Then I should see the Welcome Screen displayed
    
    Scenario: As a user, I should be able to add a profile picture for the first test account
        When I am on the Welcome Screen with the new user
        And I go to the Settings Profile Screen from the Welcome Screen
        And I see the Settings Profile Screen displayed
        And I upload the profile picture located in ./tests/fixtures/logo.jpg
        Then I should see the profile picture uploaded in Settings Profile

    Scenario: As a user, I should be able to add a profile banner for the first test account
        When I upload the profile banner located in ./tests/fixtures/banner.jpg
        Then I should see the profile banner uploaded in Settings Profile
    
    Scenario: As a user, I should be able to click on the Copy ID button for the first test account
        When I click on the Settings Profile Screen CopyID button
        Then I should see a success toast notification displayed on Settings Profile Screen
    
    Scenario: As a user, I should be able to paste the copied ID into the status input field for the first test account
        When I paste the copied user key into status input field
        Then I should see the Settings Profile username input shows did:key:
        And I should be able to save the test key from the first user
        And I should be able to grab the cache folder for the first user
        And I should be able to reset the app to clean the cache
    
    Scenario: As a user, I should be able to create a second test account
        When I execute the command with the steps to Create a New User for the second test user
        Then I should see the Welcome Screen displayed
    
    Scenario: As a user, I should be able to add a profile picture for the second test account
        When I am on the Welcome Screen with the new user
        And I go to the Settings Profile Screen from the Welcome Screen
        And I see the Settings Profile Screen displayed
        And I upload the profile picture located in ./tests/fixtures/second-profile.png
        Then I should see the profile picture uploaded in Settings Profile

    Scenario: As a user, I should be able to add a profile banner for the second test account
        When I upload the profile banner located in ./tests/fixtures/second-banner.jpg
        Then I should see the profile banner uploaded in Settings Profile
    
    Scenario: As a user, I should be able to click on the Copy ID button for the second test account
        When I click on the Settings Profile Screen CopyID button
        Then I should see a success toast notification displayed on Settings Profile Screen
    
    Scenario: As a user, I should be able to paste the copied ID into the status input field for the second test account
        When I paste the copied user key into status input field
        Then I should see the Settings Profile username input shows did:key:
        And I should be able to save the test key from the second user
        And I should be able to grab the cache folder for the second user
        
    

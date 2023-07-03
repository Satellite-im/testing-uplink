Feature: Settings Developer Tests
    As a user, I should be able to use test all the functionalities from Settings Developer Screen

    Background:
        Given I go to the Settings Developer Screen from Settings Notifications Screen
    
    Scenario: As a user, I should see the correct headers and descriptions for settings options on Settings Developer screen
        When I am on the Settings Notifications Screen with a new account
        Then I should see the Developer Mode header and description are correct
        And I should see the Test Notification header and description are correct
        And I should see the Open Cache header and description are correct
        And I should see the Compress & Download Cache header and description are correct
        And I should see the Print State header and description are correct
        And I should see the Clear Cache header and description are correct
        And I should see the Save Logs In A File header and description are correct
        
    Scenario: As a user, I should be able to enable the save logs switch
        When I click on the Save Logs switch slider from Settings Developer Screen
        Then I should see the current value for Save Logs switch is enabled
    
    @skip
    Scenario: As a user, I should be able to disable the save logs switch
        When I click on the Save Logs switch slider from Settings Developer Screen
        Then I should see the current value for Save Logs switch is disabled
    
    @skip
    Scenario: As a user, I should be able to enable the Developer Mode
        When I click on the Developer Mode switch slider from Settings Developer Screen
        Then I should see the current value for Developer Mode switch is disabled
    
    @skip
    Scenario: As a user, I should be able to disable the Developer Mode
        When I click on the Developer Mode switch slider from Settings Developer Screen
        Then I should see the current value for Developer Mode switch is disabled
    
    @skip
    Scenario: As a user, I should be able to click on the test notification button
        When I click on the Test Notification button from Settings Developer Screen
        Then I should see a Test Notification appearing in screen
    
    @skip
    Scenario: As a user, I should be able to click on the open folder button
        When I click on the Open Folder button from Settings Developer Screen
        Then I should see an explorer window showing the current cache folder on options

    @skip
    Scenario: As a user, I should be able to click on the Compress and Download Cache button
        When I click on the Compress And Download Cache button from Settings Developer Screen
        Then I should see an explorer window showing a compressed file with the cache
    
    @skip
    Scenario: As a user, I should be able to click on the Print State button
        When I click on the Developer Mode switch slider from Settings Developer Screen
        And I click on the Print State button from Settings Developer Screen
        Then I should see a print state message displayed in developer console
    
    @skip
    Scenario: As a user, I should be able to click on the Clear Cache button
        When I click on the Clear Cache switch slider from Settings Developer Screen
        Then I should see an alert message asking if I want to clear the cache
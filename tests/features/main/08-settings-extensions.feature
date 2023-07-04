Feature: Settings Extensions Tests
    As a user, I should be able to use test all the functionalities from Settings Extensions Screen

    Background:
        Given I go to the Settings Extensions Screen from Settings Audio Screen
    
    Scenario: As a user, I should see the correct headers and descriptions for settings options on Settings Extensions
        When I am on the Settings Extensions Screen with a new account
        Then I should see the installed button displayed on Settings Extensions Screen
        And I should see the explore button displayed on Settings Extensions Screen
        And I should see the search extensions button displayed on Settings Extensions Screen
        
    
    Scenario: As a user, I should be able to go to Explore Extensions Screen
        When I click on the explore button from Settings Extensions Screen
        Then I should see the alert text, header and placeholder with correct texts on Explore Extensions Screen

    Scenario: As a user, I should be able to go Extensions Settings from Settings Extensions Screen
        When I click on the extensions settings button from Settings Extensions Screen
        Then I should see the Open Extensions header and description are correct
        And I should see the Enable Automatically header and description are correct
    
    Scenario: As a user, I should be able to activate the switch slider for Enable Automatically
        When I click on the switch slider for Enable Automatically on Settings Extensions Screen
        Then I should see the switch slider from Settings Extensions for Enable Automatically is enabled
    
    Scenario: As a user, I should be able to disable the switch slider for Enable Automatically
        When I click on the switch slider for Enable Automatically on Settings Extensions Screen
        Then I should see the switch slider from Settings Extensions for Enable Automatically is disabled
    
    @skip
    Scenario: As a user, I should be able to click on the Open Extensions Folder button
        When I click on open extensions folder button from Settings Extensions Screen
        Then I should see the extensions folder opened on my computer


       
    
    
Feature: Settings Notifications Tests
    As a user, I should be able to use test all the functionalities from Settings Notifications Screen

    Scenario: As a user, I should see the correct headers and descriptions for settings options on Settings Notifications screen
        When I log into the application with the previous account created
        And I go to the Settings Notifications Screen from Welcome Screen
        And I am on the Settings Notifications Screen with a new account
        Then I should see the Enabled Notifications header and description are correct
        And I should see the Friends Notifications header and description are correct
        And I should see the Messages Notifications header and description are correct
        And I should see the Settings Notifications header and description are correct
    
    Scenario: As a user, I should see the default enabled switches for Notifications are Enabled, Friends and Messages Sounds
        When I am on the Settings Notifications Screen with a new account
        Then I should see the current value for Enabled Notifications switch is enabled
        And I should see the current value for Friends Notifications switch is enabled
        And I should see the current value for Messages Notifications switch is enabled
        And I should see the current value for Settings Notifications switch is disabled
        
    
    Scenario: As a user, I should be able to disable all notifications
        When I click on the Enable Notifications switch slider from Settings Notifications Screen
        Then I should see the current value for Enabled Notifications switch is disabled
        And I should see the current value for Friends Notifications switch is disabled
        And I should see the current value for Messages Notifications switch is disabled
        And I should see the current value for Settings Notifications switch is disabled

    Scenario: As a user, I should be able to click on Enable Notifications again
        When I click on the Enable Notifications switch slider from Settings Notifications Screen
        Then I should see the current value for Enabled Notifications switch is enabled
        And I should see the current value for Friends Notifications switch is enabled
        And I should see the current value for Messages Notifications switch is enabled
        And I should see the current value for Settings Notifications switch is disabled
    
    Scenario: As a user, I should be able to enable only Friends Notifications
        When I click on the Messages Notifications switch slider from Settings Notifications Screen
        Then I should see the current value for Enabled Notifications switch is enabled
        And I should see the current value for Friends Notifications switch is enabled
        And I should see the current value for Messages Notifications switch is disabled
        And I should see the current value for Settings Notifications switch is disabled
    
    Scenario: As a user, I should be able to enable only Messages Notifications
        When I click on the Friends Notifications switch slider from Settings Notifications Screen
        And I click on the Messages Notifications switch slider from Settings Notifications Screen
        Then I should see the current value for Enabled Notifications switch is enabled
        And I should see the current value for Friends Notifications switch is disabled
        And I should see the current value for Messages Notifications switch is enabled
        And I should see the current value for Settings Notifications switch is disabled
    
    Scenario: As a user, I should be able to enable only Settings Notifications
        When I click on the Messages Notifications switch slider from Settings Notifications Screen
        And I click on the Settings Notifications switch slider from Settings Notifications Screen
        Then I should see the current value for Enabled Notifications switch is enabled
        And I should see the current value for Friends Notifications switch is disabled
        And I should see the current value for Messages Notifications switch is disabled
        And I should see the current value for Settings Notifications switch is enabled

    
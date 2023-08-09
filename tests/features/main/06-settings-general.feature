Feature: Settings General Tests
    As a user, I should be able to use test all the functionalities from Settings General Screen

    Scenario: As a user, I should see the correct headers and descriptions for settings options on Settings General screen
        When I log into the application with the previous account created
        And I go to the Settings General Screen from Welcome Screen
        And I am on the Settings General Screen with a new account
        Then I should see the correct header and description displayed for App Language
        And I should see the correct header and description displayed for Theme
        And I should see the correct header and description displayed for Font
        And I should see the correct header and description displayed for Font Scaling
    
    @skip
    Scenario: As a user, I should be able to change the font
        When I click on Font Dropdown from Settings General
        Then I should be able to select the font Default
    
    @skip
    Scenario: As a user, I should be able to change the language
        When I click on App Language Dropdown from Settings General
        Then I should be able to select the language Español
    
    @skip
    Scenario: As a user, I should be able to switch back the language to English US
        When I click on App Language Dropdown from Settings General
        Then I should be able to select the language English
    
    Scenario: As a user, I should be able increase the font size from 1 to 1.25
        When I click on the increase font size button from Settings General
        Then I should see Font Size value selected is 1.25
    
    Scenario: As a user, I should be able decrease the font size from 1.25 to 0.75
        When I click on the reduce font size button from Settings General
        And I click on the reduce font size button from Settings General
        Then I should see Font Size value selected is 0.75


    
    

        
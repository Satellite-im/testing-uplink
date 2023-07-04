Feature: Settings Accessibility Tests
    As a user, I should be able to use test all the functionalities from Settings Accessibility Screen

    Background:
        Given I go to the Settings Accessibility Screen from Settings Extensions Screen
    
    Scenario: As a user, I should see the correct headers and descriptions for settings options on Settings Accessibility screen
        When I am on the Settings Accessibility Screen with a new account
        Then I should see the Open Dyslexic header and description are correct
        
    Scenario: As a user, I should be able to enable the Open Dyslexic switch
        When I click on the Open Dyslexic switch slider from Settings Accessibility Screen
        Then I should see the current value for Open Dyslexic switch is enabled
    
    Scenario: As a user, I should be able to disable the Open Dyslexic switch
        When I click on the Open Dyslexic switch slider from Settings Accessibility Screen
        Then I should see the current value for Open Dyslexic switch is disabled
    
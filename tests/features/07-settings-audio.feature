Feature: Settings Sounds & Audio Tests
    As a user, I should be able to use test all the functionalities from Settings Sounds and Audio Screen

    Background:
        Given I go to the Settings Sounds and Audio Screen from Settings General Screen
    
    Scenario: As a user, I should see the correct headers and descriptions for settings options on Settings Sounds and Audio screen
        When I am on the Settings Audio Screen with a new account
        Then I should see the correct header and description displayed for Input Device
        And I should see the correct header and description displayed for Output Device
        And I should see the correct header and description displayed for Sample Rate
        And I should see the correct header and description displayed for Interface Sounds
        And I should see the correct header and description displayed for Media Sounds
        And I should see the correct header and description displayed for Message Sounds
        And I should see the correct header and description displayed for Call Timer
    
    Scenario: As a user, I should be able to disable all switches enabled by default
        When I click on the Media Sounds switch slider from Settings Audio
        And I click on the Message Sounds switch slider from Settings Audio
        Then I should see that Media Sounds switch from Settings Audio is disabled
        And I should see that Message Sounds switch from Settings Audio is disabled
    
    Scenario: As a user, I should be able to enable all switch sliders from Settings Sounds & Audio
        When I click on the Interface Sounds switch slider from Settings Audio
        And I click on the Media Sounds switch slider from Settings Audio
        And I click on the Message Sounds switch slider from Settings Audio
        And I click on the Call Timer switch slider from Settings Audio
        Then I should see that Interface Sounds switch from Settings Audio is enabled 
        And I should see that Media Sounds switch from Settings Audio is enabled
        And I should see that Message Sounds switch from Settings Audio is enabled
        And I should see that Call Timer switch from Settings Audio is enabled
    
    Scenario: As a user, I should be able to disable all switch sliders from Settings Sounds & Audio
        When I click on the Interface Sounds switch slider from Settings Audio
        And I click on the Media Sounds switch slider from Settings Audio
        And I click on the Message Sounds switch slider from Settings Audio
        And I click on the Call Timer switch slider from Settings Audio
        Then I should see that Interface Sounds switch from Settings Audio is disabled 
        And I should see that Media Sounds switch from Settings Audio is disabled
        And I should see that Message Sounds switch from Settings Audio is disabled
        And I should see that Call Timer switch from Settings Audio is disabled
    
    
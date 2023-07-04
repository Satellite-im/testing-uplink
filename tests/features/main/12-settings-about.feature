Feature: Settings About Tests
    As a user, I should be able to use test all the functionalities from Settings About Screen

    Background:
        Given I go to the Settings About Screen from Settings Developer Screen
    
    Scenario: As a user, I should see the correct headers and descriptions for settings options on Settings About screen
        When I am on the Settings About Screen with a new account
        Then I should see the About header and description are correct
        And I should see the Version header and description are correct
        And I should see the Open Website header and description are correct
        And I should see the Open Source Code header and description are correct
        
    @skip
    Scenario: As a user, I should be able to open the Uplink Website
        When I click on Open Website button from Settings About Screen
        Then I should see a browser with the Uplink website opened in a new tab
    
    @skip
    Scenario: As a user, I should be able to open the website with the source code
        When I click on Open Source Code button from Settings About Screen
        Then I should see a browser with the app source code website opened in a new tab
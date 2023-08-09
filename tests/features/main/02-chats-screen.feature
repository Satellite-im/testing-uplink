Feature: Chats Main Screen
    As a user, I should be able to navigate through the Welcome Screen
    
    Scenario: As a user, I should see the main elements displayed on Welcome Screen
        When I log into the application with the previous account created
        And I am on the Welcome Screen after creating a new account
        Then I should see the Pre Release Indicator displayed on Screen
        And I should see the navigation bar with Chats, Files, Friends and Settings buttons displayed
        And I should see the sidebar displayed on screen
        And I should see the Welcome Image and Welcome Text are displayed on screen
    
    Scenario: As a user, I should be able to see the tooltip for Chats Button
        When I hover on Chats Button
        And I should see the Chats Button tooltip displayed

    Scenario: As a user, I should be able to see the tooltip for Files Button
        When I hover on Files Button
        And I should see the Files Button tooltip displayed

    Scenario: As a user, I should be able to see the tooltip for Friends Button
        When I hover on Friends Button
        And I should see the Friends Button tooltip displayed

    Scenario: As a user, I should be able to see the tooltip for Settings Button
        When I hover on Settings Button
        And I should see the Settings Button tooltip displayed
    
     Scenario: As a user, I should be redirected to Friends Page when clicking on Add Someone
        When I click on Add Someone button
        And I should be redirected to Friends Screen
    
Feature: Create Two Accounts and do the friend request/accept process with these
    As a user, I should be able to create multiple test accounts and make them friends between themselves

    Scenario: As a user, I should be able to create a new account for ChatUserA
        Given I am on the Create Username Screen
        When I execute the command with the steps to Create a New User for the ChatUserA test user
        Then I should be redirected to Welcome Screen
        
    Scenario: As a user, I should be able to copy the DID key from ChatUserA from Settings Screen
        Given I am on the Welcome Screen after creating a new account
        When I go to the Settings Profile Screen from Welcome Screen
        And I am on the Settings Profile Screen with a new account 
        And I click on the Settings Profile Screen CopyID button
        Then I should see a success toast notification displayed on Settings Profile Screen
    
    Scenario: As a user, I should be able to paste the copied ID from ChatUserA into any text field
        Given I am on the Settings Profile Screen with a new account
        When I paste the copied user key into status input field
        Then I should see the Settings Profile status input shows did:key:
        And I should be able to save the test key from the ChatUserA user
    
    Scenario: As a user, I should be able to disable the notifications on ChatUserA account
        Given I am on the Settings Profile Screen with a new account
        When I go to the Settings General Screen from Settings Profile Screen
        And I am on the Settings General Screen with a new account
        And I click on the reduce font size button from Settings General
        Then I should see Font Size value selected is 0.75
    
    Scenario: As a user, I should be able to reduce the font size on ChatUserA account
        Given I am on the Settings General Screen with a new account
        When I go to the Settings Notification Screen from Settings General Screen
        And I am on the Settings Notifications Screen with a new account
        And I click on the Friends Notifications switch slider from Settings Notifications Screen
        And I click on the Messages Notifications switch slider from Settings Notifications Screen
        Then I should see the current value for Friends Notifications switch is disabled
        And I should see the current value for Messages Notifications switch is disabled
    
    Scenario: As a user, I should be able to create a new account for ChatUserB on second instance
        Given I am on the Create Username Screen in the second instance
        When I execute the command with the steps to Create a New User for the ChatUserB test user in the second instance
        Then I should be redirected to Welcome Screen in the second instance
        
    Scenario: As a user, I should be able to copy the DID key from ChatUserB from Settings Screen
        Given I am on the Welcome Screen after creating a new account in the second instance
        When I go to the Settings Profile Screen from Welcome Screen in the second instance
        And I am on the Settings Profile Screen with a new account in the second instance
        And I click on the Settings Profile Screen CopyID button in the second instance
        Then I should see a success toast notification displayed on Settings Profile Screen in the second instance
    
    Scenario: As a user, I should be able to paste the copied ID from ChatUserB into any text field
        Given I am on the Settings Profile Screen with a new account in the second instance
        When I paste the copied user key into status input field in the second instance
        Then I should see the Settings Profile status input shows did:key: in the second instance
        And I should be able to save the test key from the ChatUserB user in the second instance
    
    Scenario: As a user, I should be able to disable the notifications on ChatUserB account
        Given I am on the Settings Profile Screen with a new account in the second instance
        When I go to the Settings General Screen from Settings Profile Screen in the second instance
        And I am on the Settings General Screen with a new account in the second instance
        And I click on the reduce font size button from Settings General in the second instance
        Then I should see Font Size value selected in the second instance is 0.75
    
    Scenario: As a user, I should be able to reduce the font size on ChatUserB account
        Given I am on the Settings General Screen with a new account in the second instance
        When I go to the Settings Notification Screen from Settings General Screen in the second instance
        And I am on the Settings Notifications Screen with a new account in the second instance
        And I click on the Friends Notifications switch slider from Settings Notifications Screen in the second instance
        And I click on the Messages Notifications switch slider from Settings Notifications Screen in the second instance
        Then I should see the current value for Friends Notifications switch in the second instance is disabled
        And I should see the current value for Messages Notifications switch in the second instance is disabled
    
    Scenario: As a user, I should be able to send a friend request from ChatUserB to ChatUserA
        Given I am on the Settings Notifications Screen with a new account in the second instance
        When I go to the Friends Screen 
        And I retrieve the user key saved from ChatUserA in the second instance
        And I enter the user key from ChatUserA in the search input field
    


    
    


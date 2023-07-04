Feature: Friends Screen Tests
    As a user, I should be able to use test all the functionalities from Friends Screen

    Background:
        Given I login with Friends Test User account and go to Friends
    
    Scenario: As a user, I should see the main elements displayed on Friends Screen
        When I am on the Friends Screen
        Then I should see the Pre Release Indicator displayed on Friends Screen
        And I should see the main buttons displayed on Friends Screen
        And I should see the sidebar displayed on Friends Screen
        And I should see the Friends Layout displayed on screen
    
    Scenario: As a user, I should be able to type in the Friends Search Input Bar and see an error message when the number of characters provided is less than 9
        When I type the friend did key Hello in search input from Friends Screen
        Then I should see the friend search input bar from Friends Screen populated with text Hello
        And I should see an input error message on Friends Screen showing Please enter at least 9 characters.
    
    Scenario: As a user, I should see an error message when typing non alphanumeric characters in the Friends Search Input Bar from Friends Screen
        When I delete the current text from friends search input on Friends Screen
        And I type the friend did key %%%%%%%%%% in search input from Friends Screen
        Then I should see an input error message on Friends Screen showing Only alphanumeric characters are accepted.
    
    Scenario: As a user, I should see an error message when typing spaces in the Friends Search Input Bar from Friends Screen
        When I delete the current text from friends search input on Friends Screen
        And I type spaces in search input from Friends Screen
        Then I should see an input error message on Friends Screen showing Spaces are not allowed.
    
    Scenario: As a user, I should be allowed to copy my own DID by clicking on the Copy ID button from Friends Screen
        When I delete the current text from friends search input on Friends Screen
        And I click on the Copy ID button from Friends Screen
        Then I should see a toast notification in Friends Screen showing Copied to clipboard.
    
    Scenario: As a user, I should not be allowed to add myself as a friend
        When I paste the copied user key in Add Someone Input from Friends Screen
        And I click on the Add Someone button from Friends Screen
        Then I should see a toast notification in Friends Screen showing You cannot add yourself silly goose.
    
    Scenario: As a user, I should see an error message when typing more characters than expected in the Friends Screen Add User Input
        When I paste the copied user key in Add Someone Input from Friends Screen
        And I type the friend did key did:key:12345678901234567890123456789012345678901234567890 in search input from Friends Screen
        Then I should see an input error message on Friends Screen showing Maximum of 56 characters exceeded.
    
    Scenario: As a user, I should be able to switch to Pending List Screen and see elements displayed correctly
        When I delete the current text from friends search input on Friends Screen
        And I click on Pending Friends button from Friends Screen
        Then I should see the Pending Friends Layout displayed on screen
    
    Scenario: As a user, I should be able to switch to Blocked List Screen and see elements displayed correctly
        When I click on Blocked List button from Friends Screen
        Then I should see the Blocked List Layout displayed on screen
    
    Scenario: As a user, I should be able to switch to All Friends List Screen and see elements displayed correctly
        When I click on All Friends List button from Friends Screen
        Then I should see the All Friends List Layout displayed on screen
    
    Scenario: As a user, I should be able to open a chat with a friend from All Friends List Screen
        When I click on the chat button from ChatUserB on All Friends List
        Then I should see the Chat Screen displayed
    
    Scenario: As a user, I should be able to type a message in Chat Screen and return to Friends Screen
        When I type the message Testing... on chat input bar
        Then I should be able to clear the message and return to Friends Screen
    
    Scenario: As a user, I should be able see the Unfriend button tooltip displayed on Friends Screen
        When I hover on the unfriend button from ChatUserB on All Friends List
        Then I should see the Unfriend button tooltip from ChatUserB is displayed
    
    Scenario: As a user, I should be able see the Block button tooltip displayed on Friends Screen
        When I hover on the block button from ChatUserB on All Friends List
        Then I should see the Block button tooltip from ChatUserB is displayed
    
    Scenario: As a user, I should be able to unfriend someone from Friends List
        When I click on the unfriend button from ChatUserB on All Friends List
        And I click on Blocked List button from Friends Screen
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserB is not present in All Friends List
    
    Scenario: As a user, I should be able to block someone from Friends List
        When I click on the block button from ChatUserC on All Friends List
        And I click on Blocked List button from Friends Screen
        Then I should see ChatUserC was added to Blocked List
        And I should click on All Friends List button from Friends Screen
        And I should see ChatUserC is not present All Friends List
    
    Scenario: As a user, I should be able to see the Deny Request button tooltip displayed on Friends Screen
        When I click on Pending Friends button from Friends Screen
        And I hover on the Deny Request button from ChatUserH on Pending Friends List
        Then I should see the Deny Request button tooltip from ChatUserH is displayed
    
    Scenario: As a user, I should be able to see the Unfriend button tooltip displayed on Friends Screen
        When I hover on the Unfriend button from ChatUserK on Pending Friends List
        Then I should see the Unfriend button tooltip from ChatUserK is displayed
    
    Scenario: As a user, I should be able to accept an incoming friend request
        When I click on the Accept Request button from ChatUserH on Pending Friends List
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserH was added to All Friends List
        And I should click on Pending Friends button from Friends Screen
        And I should see ChatUserH is not present in Incoming Request List
    
    Scenario: As a user, I should be able to deny an incoming friend request
        When I click on the Deny Request button from ChatUserI on Pending Friends List
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserI is not present in All Friends List
        And I should click on Pending Friends button from Friends Screen
        And I should see ChatUserI is not present in Incoming Request List
    
    Scenario: As a user, I should be able to cancel an outgoing friend request
        When I click on the Cancel Request from ChatUserK on Outgoing Friends List
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserK is not present in All Friends List
        And I should click on Pending Friends button from Friends Screen
        And I should see ChatUserK is not present in Outgoing Request List
    
    Scenario: As a user, I should be able to see the Unblock button tooltip displayed on Friends Screen
        When I click on the Blocked List button from Friends Screen
        And I hover on the Unblock button from ChatUserC on Blocked List
        Then I should see the Unblock button tooltip from ChatUserC is displayed
    
    Scenario: As a user, I should be able to unblock someone from Blocked List
        When I click on the Unblock button from ChatUserC on Blocked List
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserC is not in All Friends List
        And I should click on Blocked List button from Friends Screen
        And I should see ChatUserC is not present in Blocked List
    
    Scenario: As a user, I should be able to go to a chat with friend using the Context Menu
        When I click on All Friends List button from Friends Screen
        And I open the context menu from ChatUserD on Friends Screen
        And I select the context menu option of Chat
        Then I should see the Chat Screen displayed
    
    Scenario: As a user, I should be able to type a message in Chat Screen and return to Friends Screen
        When I type the message Testing... on chat input bar
        Then I should be able to clear the message and return to Friends Screen
    
    Scenario: As a user, I should be able to add a friend to Favorites using the Context Menu
        When I open the context menu from ChatUserD on Friends Screen
        And I select the context menu option of Add to Favorites
        Then I should see ChatUserB was added to Sidebar Favorites
    
    Scenario: As a user, I should be able to remove a friend from Favorites using the Context Menu
        When I open the context menu from ChatUserD on Friends Screen
        And I select the context menu option of Remove from Favorites
        Then I should see that Sidebar Favorites is not displayed now
    
    Scenario: As a user, I should be able to delete a friend using the Context Menu
        When I open the context menu from ChatUserD on Friends Screen
        And I select the context menu option of Remove Friend
        And I click on Pending Friends button from Friends Screen
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserD is not present in All Friends List

    Scenario: As a user, I should be able to block a friend using the Context Menu
        When I open the context menu from ChatUserE on Friends Screen
        And I select the context menu option of Block Friend
        And I click on Block List button from Friends Screen
        Then I should see ChatUserE was added to Blocked List
        And I should click on All Friends List button from Friends Screen
        Then I should see ChatUserE is not present in All Friends List

    Scenario: As a user, I should be able to accept an incoming request using the Context Menu
        When I click on Pending Friends button from Friends Screen
        And I open the context menu from ChatUserJ on Friends Screen
        And I select the context menu option of Accept Request
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserJ was added to All Friends List
        And I should click on Pending Friends button from Friends Screen
        And I should see ChatUserJ is not present in Incoming Request List

    Scenario: As a user, I should be able to deny an incoming request using the Context Menu
        When I open the context menu from ChatUserG on Friends Screen
        And I select the context menu option of Deny Request
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserG is not present in All Friends List
        And I should click on Pending Friends button from Friends Screen
        And I should see ChatUserG is not present in Incoming Request List

    Scenario: As a user, I should be able to cancel an outgoing request using the Context Menu
        When I open the context menu from ChatUserL on Friends Screen
        And I select the context menu option of Cancel Request
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserL is not present in All Friends List
        And I should click on Pending Friends button from Friends Screen
        And I should see ChatUserL is not present in Outgoing Request List

    Scenario: As a user, I should be able to unblock someone using the Context Menu
        When I click on Blocked List button from Friends Screen
        And I open the context menu from ChatUserE on Friends Screen
        And I select the context menu option of Unblock Friend
        And I click on All Friends List button from Friends Screen
        Then I should see ChatUserE is not in All Friends List
        And I should click on Blocked List button from Friends Screen
        And I should see ChatUserE is not present in Blocked List

        
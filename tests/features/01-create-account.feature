Feature: Create Account

    Background:
        Given I am on the Create Pin Screen with a fresh user
    
    Scenario: Warning texts are displayed on screen
        When Create Pin Screen is displayed for a fresh user
        Then Warning texts are displayed correctly on screen

    Scenario: Create Account button is disabled if no pin has been entered
        When Create Pin Screen is displayed for a fresh user
        Then Create Pin Screen status of button is equal to Disabled
    
    Scenario: Enter an empty pin
        When I type any pin in pin input
            And I delete the entered pin
        Then Input Error is displayed on screen with message "Please enter at least 4 characters"
            And Create Pin Screen status of button is equal to Disabled

    Scenario: Enter a pin with less than 4 characters
        When I delete the entered pin
            And I type a pin with less than 4 characters in pin input
        Then Input Error is displayed on screen with message "Please enter at least 4 characters"
            And Create Pin Screen status of button is equal to Disabled
    
    Scenario: Enter a pin with more than 32 characters
        When I delete the entered pin
            And I type a pin with more than 32 characters in pin input
        Then Input Error is displayed on screen with message "Maximum of 32 characters exceeded"
            And Create Pin Screen status of button is equal to Disabled
    
    Scenario: Enter a pin with spaces
        When I delete the entered pin
            And I type a pin with spaces
        Then Input Error is displayed on screen with message "Spaces are not allowed"
            And Create Pin Screen status of button is equal to Disabled
    
    Scenario: Enter a valid pin and continue
        When I delete the entered pin
            And I type a valid pin
        Then Create Pin Screen status of button is equal to Enabled
            And Create Account Screen is displayed

    Scenario: Attempt to continue with an empty username
        When I type any value in username input
            And I delete the entered username
        Then Input Error is displayed on screen with message "Please enter at least 4 characters"
            And Create User button status is equal to Disabled

    Scenario: Enter a username with less than 4 characters
        When I type a username with less than 4 characters in username input
        Then Input Error is displayed on screen with message "Please enter at least 4 characters"
            And Create User button status is equal to Disabled
    
    Scenario: Enter a username with more than 32 characters
        When I delete the entered username
            And I type a username with more than 32 characters in username input
        Then Input Error is displayed on screen with message "Maximum of 32 characters exceeded"
            And Create User button status is equal to Disabled
    
    Scenario: Enter a username with spaces
        When I delete the entered username
            And I type a username with spaces
        Then Input Error is displayed on screen with message "Spaces are not allowed."
            And Create User button status is equal to Disabled
    
    Scenario: Enter a username with non-alphanumeric characters
        When I delete the entered username
            And I type a username with non-alphanumeric characters
        Then Input Error is displayed on screen with message "Only alphanumeric characters are accepted."
            And Create User button status is equal to Disabled
    
    Scenario: Enter a valid username to continue
        When I delete the entered username
            And I type a valid username
        Then Create Pin Screen status of button is equal to Enabled
            And Welcome Screen is displayed
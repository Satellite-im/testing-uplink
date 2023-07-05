Feature: Create Account
    As a user, I should be able to create a new account on Uplink

    Scenario: As a user, I should see the warning texts and create account button disabled when entering for the first time
        When I enter to the application for the first time with a fresh user
        Then I should see that warning texts are displayed correctly on Pin Screen
        And I should see that Create Pin Screen status of button is equal to false
    
    Scenario: As a user, I should see an error message if PIN is empty
        When I leave pin input empty
        Then I should see that Create Pin Screen status of button is equal to false
        And I should see an error message for invalid PIN stating Please enter at least 4 characters

    Scenario Outline: As a user, I cannot use an invalid PIN
        When I type <pin> in pin input
        Then I should see that Create Pin Screen status of button is equal to <status>
        And I should see an error message for invalid PIN stating <text>

        Examples:

        | pin                                 | status | text                                       |
        | 1                                   | false  | Please enter at least 4 characters         |
        | 12345678901234567890123456789012345 | false  | Maximum of 32 characters exceeded          |
    
    Scenario: As a user, I should see an error message if PIN contains spaces
        When I enter a PIN with spaces
        Then I should see that Create Pin Screen status of button is equal to false
        And I should see an error message for invalid PIN stating Spaces are not allowed.

    Scenario: As a user, I should be able to see the Create Account button enabled
        When I type 1234 in pin input
        Then I should see that Create Pin Screen status of button is equal to true

    Scenario: As a user, I should be redirected to Create Username screen
        When I click on Create Account Button on Create Pin Screen
        Then I should be redirected to Create Username screen

    Scenario: As a user, I should see an error message if username is empty
        Given I am on the Create Username Screen
        When I leave username input empty
        Then I should see that Create User Screen status of button is equal to false
        And I should see an error message for invalid username stating Please enter at least 4 characters

    Scenario Outline: As a user, I cannot use an invalid username
        When I type <username> in username input
        Then I should see that Create User Screen status of button is equal to <status>
        And I should see an error message for invalid username stating <text>

        Examples:

        | username                            | status | text                                       |
        | 1                                   | false  | Please enter at least 4 characters         |
        | 12345678901234567890123456789012345 | false  | Maximum of 32 characters exceeded          |
        | test...                             | false  | Only alphanumeric characters are accepted. |
    
    Scenario: As a user, I should see an error message if username contains spaces
        When I enter a username with spaces
        Then I should see that Create User Screen status of button is equal to false
        And I should see an error message for invalid username stating Spaces are not allowed.

    Scenario: As a user, I should be able to see the Create User button enabled
        When I type Test123 in username input
        Then I should see that Create User Screen status of button is equal to true

    Scenario: As a user, I should be redirected to Create Username screen
        When I click on Create Account Button on Create Username Screen
        Then I should be redirected to Welcome Screen


    
    


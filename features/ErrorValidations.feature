Feature: Eccommerce validation
    Test case to check invalid credentials
    @Validation
    Scenario Outline: Invalid Login
        Given a login to LoginPractisePage application with "<Username>" and "<Password>"
        Then Verify Error message is displayed

        Examples:
            | Username              | Password      |
            | raultifrea@gmail.com  | TestPass1!    |
            | hello@123.com         | WhatPass1!    |
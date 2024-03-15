Feature: Eccommerce validation
   
    End to End Test case to buy something
    @Regression
    Scenario: Placing an Order
        Given a login to Eccommerce application with "raultifrea@gmail.com" and "TestPass1!"
        When adding "ADIDAS ORIGINAL" to Cart
        Then Verify product is displayed in the Cart
        When Enter valid details and place the Order
        Then Verify order is present in the Order History
    
    @Regression
    Scenario Outline: Invalid Login
    Given a login to LoginPractisePage application with "<Username>" and "<Password>"
    Then Verify Error message is displayed

    Examples:
        | Username              | Password      |
        | raultifrea@gmail.com  | TestPass1!    |
        | hello@123.com         | WhatPass1!    |
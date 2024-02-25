Feature: Eccommerce validation

    End to End Test case to buy something
    Scenario: Placing an Order
        Given a login to Eccommerce application with "raultifrea@gmail.com" and "TestPass1!"
        When adding "ADIDAS ORIGINAL" to Cart
        Then Verify product is displayed in the Cart
        When Enter valid details and place the Order
        Then Verify order is present in the Order History
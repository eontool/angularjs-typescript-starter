Feature: Test calculator

  Scenario: Add two numbers
    Given The calculator component is present
    When I type two numbers "3" "5"
    Then the correct result should be displayed "10"
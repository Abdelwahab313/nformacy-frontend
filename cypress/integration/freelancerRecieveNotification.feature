Feature: Freelancer receive notifications

  Scenario: Admin post question to roaster
    When I log in as a freelancer
    And Admin deploy a question to question roaster
    And I go to question roaster
    And I click on notifications menu
    Then I should see the newly received notification with message "is posted on Q Roaster."
    When I click on the recieved notification
    Then I should navigate to question details page
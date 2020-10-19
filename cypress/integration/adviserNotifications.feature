Feature: Adviser notifications
  As an adviser i should receive a notification for actions related to me

  Background:
    Given Previous interactions are cleared from localstorage
    And I login in as an advisor
    And I am on the questions dashboard
    And I keep track of current notifications count

  Scenario: Show see no notifications to be displayed if i have no notifications
    Given I Logout from admin dashboard
    And I Login with adviser that does not have notifications
    And I am on the questions dashboard
    When I click on notifications menu
    Then I should see "No notifications to be displayed"
    And I Logout from admin dashboard

  Scenario: Notifications does not exceed 10 notifications new one replaces oldest notification
    Given I have 15 notifications
    And I Logout from admin dashboard
    And I login in as an advisor
    And I am on the questions dashboard
    When I click on notifications menu
    Then I should see the recent 10 notifications
    When Admin send a question to me to review
    Then The newly sent notification should replace the oldest one
    And I should see "See more..." in the end of the menu

  Scenario: Click on notification from notifications menu in navbar
    When Admin send a question to me to review
    And I keep track of current notifications count
    And I click on notifications menu
    And I click on the newly received notification
    Then I should be redirected to the question details page related to the notification
    And Notification menu should be closed
    And unread notifications count decrease by 1

  Scenario: Receive notification when admin send a question to review and edit
    When Admin send a question to me to review
    Then I should receive a notification about the assignment in the notifications section in the navbar and the notification counter increase by 1
    And A toast should be displayed with the notification "New Question Assigned to you"
    When I click on notifications menu
    Then I should see the newly received notification with message "New Question Assigned to you"

  Scenario: Receive notification when admin deploy a question to roaster i am assigned to
    When Admin deploy a question i am assigned to
    Then I should receive a notification about the assignment in the notifications section in the navbar and the notification counter increase by 1
    And A toast should be displayed with the notification about question deployment
    When I click on notifications menu
    Then I should see the newly received notification with the notification about question deployment

  Scenario: Receive notification when admin accept an answer in a question i am assigned to.
    When Admin accept an answer in a question i am assigned to
    Then I should receive a notification about the assignment in the notifications section in the navbar and the notification counter increase by 1
    And A toast should be displayed with notification to rate answer
    When I click on notifications menu
    Then I should see the newly received notification to rate answer

  Scenario: All notifications are displayed in see more page
    Given I have 15 notifications
    And I Logout from admin dashboard
    And I login in as an advisor
    And I am on the questions dashboard
    When I click on notifications menu
    And I click on "See more..." in the end of the menu
    Then I should see 15 notifications
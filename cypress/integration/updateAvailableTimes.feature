Feature: Update Calendar for available times for a freelancer

  Background:
    Given I log in as a freelancer
    And I have day selected as available on my calendar
    And visit home page
    And I click on calendar summary cards' button

  Scenario: Open Calendar update dialog
    Then I should see a modal with calendar on the left
    And field to select the displayed time zones
    And selected by default the timezone of the user
    And button for close dialog

  Scenario: Add available day
    When I click on a free day
    And Click add available time
    Then I should see on the left of the calendar a field with the start/end date and start/end time fields
    And The start Day and end will both have the same day with the day selected
    When I fill the available time
    And click submit time
    Then I should see the selected day labeled as available day in the calendar

  Scenario: edit available day range
    When When I click on a day that not available
    And Click add available time
    And fill the available date range to be after a week
    And click submit time
    And click on the free date slot and edit the available date range
    Then I should see the available date slot range with the updated range


  Scenario: add multiple time slots
    When I click on a free day
    Then Click add available time
    And click submit time
    Then Click add available time
    When I update the time range
    And click submit time
    Then I should see the selected day as available day with the updated time

  Scenario: remove the day as not available
    When I click on a free day
    And Click add available time
    Then I should see on the left of the calendar a field with the start/end date and start/end time fields
    And The start Day and end will both have the same day with the day selected
    When I fill the available time
    And click submit time
    When I click on a available day
    And I click the delete this day button

  Scenario: view available days in different time zone with small time difference
    Given time zone is selected to be Africa/cairo +02:00
    Given I have an event that is already available with hours 08:00 and 17:00
    When I change time zone to be America/New_York
    Then I should see the time of that event to be changed to 02:00 PM and 11:00 PM
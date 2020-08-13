Feature: Update Calendar for available times for a freelancer

  Background:
    Given I log in
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
    Then I should see on the left of the calendar a field with the start/end date and start/end time fields
    And The start Day and end will both have the same day with the day selected
    When I fill the available time
    And click submit time
    Then I should see the selected day labeled as available day in the calendar

#  @ignore
#  Scenario: Add available day range
#    When When I click on a day that not available
#    And Select edit day to be week after start day
#    And fill the time range
#    And click submit time
#    Then I should see the selected range of days as available time

  Scenario: update available day available time
    When I click on a day that already set as available
    Then I should see the time range populated with the available time range
    When I update the time range
    And click submit time
    Then I should see the selected day as available day with the updated time

#  @ignore
#  Scenario: remove the day as not available
#    When I click on a day that already set as available
#    And I click the not available this day button
#    And click submit time
#    Then I should see the selected day as default view without available time label
#
#  @ignore
#  Scenario: close the calendar and see calendar at home updated
#    When I fill the available day And click update
#    And close dialog
#    Then Calendar at home page will be updated
#

  Scenario: view available days in different time zone
    When click on the change time zone button to be Africa/Cairo
    When I click on a day that is already available with hours 10:00 and 16:00
    Then I should see the time 12:00 PM and 06:00 PM
    When I change time zone to be America/New_York
    Then I should see the time 06:00 AM and 12:00 PM

  Scenario: update days in different time zone
    When I click on a day that is already available with hours 10:00 and 16:00
    And I change time zone to be America/New_York
    And update the time range to be 09:00 to 15:00
    And click submit time
    And click on the change time zone button to be Africa/Cairo
    Then I should see the time 03:00 PM and 09:00 PM


  Scenario: Add multiple time slots as events
    When I click on a day
    Then A plus sign should appear to allow me to add a new time slot as event
    When I click on the plus sign button
    Then A dialog for adding time slot should appear.
    When I select a time
    And Click save.
    Then A new event should be added to that day.

  Scenario: Display available days as events instead of background colored cells
    When I click on a day
    And Select the time that i am available in
    Then The time i chose should appear as an event ticked over that day.

  Scenario: Edit form only available after clicking on Book now button.
    When I click on a day
    Then Book now button should appear
    When I click on Book now
    Then The form for booking should appear.

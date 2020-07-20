Feature: Update Calendar for available times for a freelancer

  Background:
    Given I log in
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
#
#  @ignore
#  Scenario: Add available day range
#    When When I click on a day that not available
#    And Select edit day to be week after start day
#    And fill the time range
#    And click submit time
#    Then I should see the selected range of days as available time
#
#  @ignore
#  Scenario: update available day available time
#    When I click on a day that already set as available
#    Then I should the time range populated with the available time range
#    When I update the time range
#    And click submit time
#    Then I should see the selected dat as available day with the updated time
#
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
#
#  @ignore
#  Scenario: time zone difference
#    Given I open calendar dialog with time zone +02:00
#    When I click on a day that not available
#    And Update the time range to be 09:00 to 15:00
#    And click submit
#    And click on the change time zone button to be +05:00
#    Then I should see the selected time range for the selected day to be 12:00 to 18:00
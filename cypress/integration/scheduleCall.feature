Feature: select freelancer to schedule a call
  As a client i want to be able to select a shortlisted freelancer and pick a time to schedule a call

  Scenario: See list of proposed freelancer
    Given I am a client 
    And have already requested a call with freelancer
    And logged in
    When go to meeting page
    Then should see the scheduled meeting with status freelancers assigned
    When click on the meeting details
    Then should see meeting details page with proposed freelancers
    And freelancers list should be selectable
  

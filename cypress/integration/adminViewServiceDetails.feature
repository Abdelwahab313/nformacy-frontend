Feature: Admin view service
  as Admin i should be able to view service    

  Scenario: admin view services assigned to him
  Given I am an admin and Logged in
    And I have service request assigned to me
    And I am on the services dashboard
    Then I should see service with pending status
    #When I click on service request id 
    #Then I should navigate to service details page 
    #And fields will be disabled
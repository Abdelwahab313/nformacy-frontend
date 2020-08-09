Feature: freelancer answer a question
  as a freelancer i should be able to answer a question

  Background:
    Given I log in
    And I go to question roaster
    Then i click on answer button of specific question

  Scenario: answer a question
    Then I should see rich Text box for the answer content.
    When i fill answer content.
    And i click on post answer
    Then i should see snackbar shows that says your answer will be reviewed by admin.
    And then should be redirected to homepage
    #
  #Scenario: attach file.
    #Then i should see an attach file button
    #When i click attach file
    #And chose a file.
    #Then the file i chose should be attached to the answer
    #
  #Scenario:  attach multiple files.
    #Then i should see an attach file button
    #When i click attach file and chose a file.
    #And  i click attach file and chose a file.
    #Then the files i chose should be attached to the answer.
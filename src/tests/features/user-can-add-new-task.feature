Feature: User can add new task to do

  Scenario:
    When user add new task: "Go running!"
    Then "Go running!" task is waiting to be done

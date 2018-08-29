Feature: User can delete own task

  Scenario:
    Given user has one task to do: "Just do it!"
    When user delete this task
    Then user doesn't have any task to do

Feature: User can only edit task which belong to him

  Scenario:
    Given user has task to do: "Go running!"
    When user change this task to: "Go running but tomorrow!"
    Then this task has been changed to: "Go running but tomorrow!"

const {
    Given, When, Then, Before, After, AfterAll,
} = require('cucumber');
const expect = require('expect');

const { endConnectionPool, clearTasks } = require('../../support/tasks');
const { addNewTask, deleteTask, getTasksByUserId } = require('../../../tasks');

Before(async () => {
    await clearTasks();
});

After(async () => {
    await clearTasks();
});

AfterAll(async () => {
    await endConnectionPool();
});

Given(/user has one task to do: "([^"]*)"/, async (task) => {
    this.userId = 5;
    this.taskId = await addNewTask(this.userId, task);
});

When(/user delete this task/, async () => {
    await deleteTask(this.taskId, this.userId);
});

Then(/user doesn't have any task to do/, async () => {
    const tasks = await getTasksByUserId(this.userId);
    expect(tasks).toEqual([]);
});

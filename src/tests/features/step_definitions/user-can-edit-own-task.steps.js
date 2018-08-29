const {
    Given, When, Then, Before, After, AfterAll,
} = require('cucumber');
const expect = require('expect');

const { endConnectionPool, clearTasks } = require('../../support/tasks');
const { addNewTask, getTask, updateTask } = require('../../../tasks');

Before(async () => {
    await clearTasks();
});

After(async () => {
    await clearTasks();
});

AfterAll(async () => {
    await endConnectionPool();
});

Given(/user has task to do: "([^"]*)"/, async (task) => {
    this.userId = 99;
    this.taskId = await addNewTask(this.userId, task);
});

When(/user change this task to: "([^"]*)"/, async (newTaskDesc) => {
    await updateTask(this.taskId, this.userId, newTaskDesc);
});

Then(/this task has been changed to: "([^"]*)"/, async (newTaskDesc) => {
    const task = await getTask(this.taskId, this.userId);
    expect(task.task).toEqual(newTaskDesc);
});

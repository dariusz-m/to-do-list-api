const {
    When, Then, Before, After, AfterAll, BeforeAll,
} = require('cucumber');
const expect = require('expect');

const { endConnectionPool, clearTasks } = require('../../support/tasks');
const { getTask, addNewTask } = require('../../../tasks');

Before(async () => {
    await clearTasks();
});

After(async () => {
    await clearTasks();
});

BeforeAll(() => {
    this.userId = 3;
});

AfterAll(async () => {
    await endConnectionPool();
});

When(/user add new task: "([^"]*)"/, async (task) => {
    this.taskId = await addNewTask(this.userId, task);
});

Then(/"([^"]*)" task is waiting to be done/, async (alreadyAddedtask) => {
    const task = await getTask(this.taskId, this.userId);
    expect(task.task).toEqual(alreadyAddedtask);
});

const { endConnectionPool, clearTasks } = require('../support/tasks');
const { addNewTask, getTask, getTasksByUserId } = require('../../tasks');

describe('Test tasks repository', () => {
    beforeEach(async () => {
        await clearTasks();
    });

    afterEach(async () => {
        await clearTasks();
    });

    afterAll(async () => {
        await endConnectionPool();
    });

    it('Task can be stored and retrieved', async () => {
        expect.hasAssertions();
        const userId = 1;
        const task = 'Just do it!';

        const taskId = await addNewTask(userId, task);

        expect(await getTask(taskId, userId)).toEqual({ id: taskId, task, userId });
    });

    it('Only tasks of the first user are retrieved', async () => {
        expect.hasAssertions();
        const firstUserId = 1;
        const tasksOfTheFirstUser = await storeTasks(firstUserId, ['Task 1', 'Task 2']);
        const secondUserId = 2;
        await storeTasks(secondUserId, ['Tasks 3']);

        expect(await getTasksByUserId(firstUserId)).toEqual(tasksOfTheFirstUser);
    });
});

/**
 * Help method to store tasks
 * @param {number} userId - User id.
 * @param {Array<string>} tasks - Task to do.
 * @returns {Promise<Object<{id: number, userId: number, task: string}>[]>}
 */
const storeTasks = async (userId, tasks) => {
    const tasksWithId = await Promise.all(tasks.map(
        async task => ({ task, id: await addNewTask(userId, task) }),
    ));
    return tasksWithId;
};

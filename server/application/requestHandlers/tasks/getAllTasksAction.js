const TaskService = require('../../../domain/services/tasks/TaskService');

module.exports = async (req, res) => {
    console.log('getAllTasksAction.js');
    const tasks = await TaskService.fetchAllTasks();
    res.jsonp(tasks);
};


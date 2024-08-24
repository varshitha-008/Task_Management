export const createTask = async (taskService, req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Inject taskService into createTask
createTask.inject = ['taskService'];

export const getAllTasks = async (taskService, req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.query, req.user);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Inject taskService into getAllTasks
getAllTasks.inject = ['taskService'];

export const getTaskById = async (taskService, req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Inject taskService into getTaskById
getTaskById.inject = ['taskService'];

export const updateTask = async (taskService, req, res) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body, req.user);
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Inject taskService into updateTask
updateTask.inject = ['taskService'];

export const deleteTask = async (taskService, req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Inject taskService into deleteTask
deleteTask.inject = ['taskService'];


export const assignTask = async (taskService, req, res) => {
  try {
    // Use taskService to assign the task to the users
    const updatedTask = await taskService.assignTask(req.params.id, req.body.assignedTo, req.user);
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Inject taskService into assignTask
assignTask.inject = ['taskService'];


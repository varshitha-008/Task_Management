import Task from '../models/Task.js';

class TaskService {
  async createTask(taskData, user) {
    // Assign the createdBy field to the user creating the task
    const task = new Task({ ...taskData, createdBy: user.id });
    await task.save();
    return task;
  }

  async getAllTasks(query, user) {
    const filter = { createdBy: user.id };  

    if (query.priority) {
      filter.priority = query.priority;
    }
    if (query.status) {
      filter.status = query.status;
    }

    // If the user is not an admin, they will only see tasks they are assigned to
    if (user.role !== 'admin') {
      filter.$or = [
        { assignedTo: user.id },
        { createdBy: user.id }
      ];
    }

    return Task.find(filter).populate('assignedTo createdBy');
  }

  async getTaskById(id, user) {
    const task = await Task.findById(id).populate('assignedTo createdBy');
    // Allow access if the user is the creator or assigned to the task
    if (!task || (user.role !== 'admin' && task.createdBy._id.toString() !== user.id && !task.assignedTo.some(assignee => assignee._id.toString() === user.id))) {
      throw new Error('Unauthorized to access this task');
    }
    return task;
  }

  async updateTask(id, updates, user) {
    const task = await this.getTaskById(id, user);
    if (user.role !== 'admin' && task.createdBy._id.toString() !== user.id) {
      throw new Error('Unauthorized to update this task');
    }
    Object.assign(task, updates);
    await task.save();
    return task;
  }

  async deleteTask(id, user) {
    const task = await this.getTaskById(id, user);
    if (user.role !== 'admin' && task.createdBy._id.toString() !== user.id) {
      throw new Error('Unauthorized to delete this task');
    }
    await task.remove();
  }

  async assignTask(taskId, userIds, user) {
    const task = await this.getTaskById(taskId, user);
    if (user.role !== 'admin' && task.createdBy._id.toString() !== user.id) {
      throw new Error('Unauthorized to assign this task');
    }
    // Add new users to the assignedTo array
    task.assignedTo.push(...userIds);
    await task.save();
    return task;
  }
}

export default new TaskService();

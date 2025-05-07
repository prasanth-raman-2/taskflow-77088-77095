/**
 * Task model representing a task in the TaskFlow system
 */
class Task {
  constructor(id, title, description = '', status = 'pending', dueDate = null, createdAt = new Date()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status; // pending, in-progress, completed
    this.dueDate = dueDate;
    this.createdAt = createdAt;
  }

  static fromJSON(json) {
    const task = new Task(
      json.id, 
      json.title, 
      json.description, 
      json.status, 
      json.dueDate ? new Date(json.dueDate) : null,
      json.createdAt ? new Date(json.createdAt) : new Date()
    );
    return task;
  }
}

export default Task;

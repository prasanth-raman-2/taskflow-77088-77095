import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

/**
 * Component for adding new tasks
 */
const AddTaskForm = () => {
  const { addTask } = useTaskContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // Toggle form expansion
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Reset form
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
  };
  
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate title (required)
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    // Create the task
    addTask(
      title, 
      description, 
      dueDate ? new Date(dueDate) : null
    );
    
    // Reset and collapse form
    resetForm();
    setIsExpanded(false);
  };
  
  return (
    <div className="add-task-container">
      {!isExpanded ? (
        <button 
          className="btn btn-add-task"
          onClick={toggleExpanded}
        >
          + Add New Task
        </button>
      ) : (
        <form className="add-task-form" onSubmit={handleSubmit}>
          <h3>Add New Task</h3>
          
          <div className="form-group">
            <label htmlFor="task-title">Title *</label>
            <input
              type="text"
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="task-due-date">Due Date</label>
            <input
              type="date"
              id="task-due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-cancel"
              onClick={toggleExpanded}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;

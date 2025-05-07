import React from 'react';
import { useTaskContext } from '../context/TaskContext';

/**
 * Component that displays a single task item
 */
const TaskItem = ({ task, onSelect }) => {
  const { changeTaskStatus, deleteTask } = useTaskContext();
  
  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get appropriate status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      default: return 'status-pending';
    }
  };
  
  // Handle status change
  const handleStatusChange = (e) => {
    changeTaskStatus(task.id, e.target.value);
  };
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };
  
  // Handle item click to select task
  const handleItemClick = (e) => {
    // Prevent click if the target is a button or select
    if (
      e.target.tagName.toLowerCase() === 'button' ||
      e.target.tagName.toLowerCase() === 'select' ||
      e.target.parentElement.tagName.toLowerCase() === 'button'
    ) {
      return;
    }
    
    if (onSelect) {
      onSelect(task.id);
    }
  };

  return (
    <div 
      className={`task-item ${getStatusClass(task.status)}`}
      onClick={handleItemClick}
    >
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <div className="task-meta">
          <span className="task-due-date">Due: {formatDate(task.dueDate)}</span>
          <span className={`task-status ${getStatusClass(task.status)}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <select 
          value={task.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn btn-sm btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

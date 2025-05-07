import React from 'react';
import { useTaskContext } from '../context/TaskContext';

/**
 * Component to display detailed information about a selected task
 */
const TaskDetails = ({ taskId, onClose }) => {
  const { getTaskById, updateTask } = useTaskContext();
  const task = getTaskById(taskId);
  
  if (!task) {
    return (
      <div className="task-details">
        <h3>Task not found</h3>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="task-details">
      <div className="task-details-header">
        <h2>{task.title}</h2>
        <button className="btn-close" onClick={onClose}>✕</button>
      </div>
      
      <div className="task-details-content">
        <div className="details-group">
          <label>Status:</label>
          <div className={`task-status-badge status-${task.status}`}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </div>
        </div>
        
        <div className="details-group">
          <label>Description:</label>
          <p>{task.description || "No description provided"}</p>
        </div>
        
        <div className="details-group">
          <label>Due Date:</label>
          <p>{formatDate(task.dueDate)}</p>
        </div>
        
        <div className="details-group">
          <label>Created:</label>
          <p>{formatDate(task.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

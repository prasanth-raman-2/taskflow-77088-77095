import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

/**
 * Component that displays a list of tasks with filtering options
 */
const TaskList = ({ onSelectTask }) => {
  const { tasks, filterTasksByStatus, sortedTasks } = useTaskContext();
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Get filtered and sorted tasks
  const filteredTasks = sortedTasks(filterTasksByStatus(filterStatus));
  
  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  
  // Handle task selection
  const handleTaskClick = (taskId) => {
    if (onSelectTask) {
      onSelectTask(taskId);
    }
  };
  
  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <div className="task-filter">
          <label htmlFor="status-filter">Filter by status: </label>
          <select 
            id="status-filter"
            value={filterStatus}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      <div className="tasks">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onSelect={handleTaskClick}
            />
          ))
        ) : (
          <div className="no-tasks">
            <p>No tasks found. Create a new task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;

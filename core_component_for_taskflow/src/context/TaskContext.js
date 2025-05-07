import { createContext, useState, useContext, useEffect } from 'react';
import Task from '../models/Task';

// Create context
const TaskContext = createContext();

// Custom hook to use the task context
export const useTaskContext = () => useContext(TaskContext);

// Provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1);
  
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('taskflow-tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks).map(task => Task.fromJSON(task));
      setTasks(parsedTasks);
      
      // Set the next ID based on the highest existing ID
      const maxId = Math.max(...parsedTasks.map(task => task.id), 0);
      setNextId(maxId + 1);
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
  
  // Add a new task
  const addTask = (title, description, dueDate) => {
    const newTask = new Task(
      nextId,
      title,
      description,
      'pending',
      dueDate
    );
    
    setTasks([...tasks, newTask]);
    setNextId(nextId + 1);
    return newTask;
  };
  
  // Update an existing task
  const updateTask = (id, updates) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };
  
  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  // Change task status
  const changeTaskStatus = (id, status) => {
    updateTask(id, { status });
  };
  
  // Get task by ID
  const getTaskById = (id) => {
    return tasks.find(task => task.id === parseInt(id));
  };
  
  // Filter tasks by status
  const filterTasksByStatus = (status) => {
    if (!status || status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
  };
  
  // Sort tasks by created date (newest first by default)
  const sortedTasks = (taskList = tasks, order = 'desc') => {
    return [...taskList].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  };
  
  // Context value to be provided
  const contextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
    getTaskById,
    filterTasksByStatus,
    sortedTasks
  };
  
  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;

import React, { useState } from 'react';
import './App.css';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskDetails from './components/TaskDetails';

function App() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  
  const openTaskDetails = (taskId) => {
    setSelectedTaskId(taskId);
  };
  
  const closeTaskDetails = () => {
    setSelectedTaskId(null);
  };
  
  return (
    <TaskProvider>
      <div className="app">
        <nav className="navbar">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="logo">
                <span className="logo-symbol">*</span> TaskFlow
              </div>
              <div className="nav-links">
                <span className="nav-link active">Tasks</span>
                <span className="nav-link">Dashboard</span>
                <span className="nav-link">Projects</span>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="container">
            <header className="app-header">
              <h1 className="title">Task Manager</h1>
              <p className="description">
                Manage your tasks efficiently with TaskFlow.
              </p>
            </header>
            
            <div className="task-manager">
              <AddTaskForm />
              <TaskList onSelectTask={openTaskDetails} />
              
              {selectedTaskId && (
                <div className="task-details-modal">
                  <TaskDetails 
                    taskId={selectedTaskId} 
                    onClose={closeTaskDetails}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;

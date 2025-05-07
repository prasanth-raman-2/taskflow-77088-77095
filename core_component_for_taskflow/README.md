# TaskFlow Task Manager

A lightweight, responsive task management application built with React.

## Features

- **Task Management**: Create, view, and delete tasks
- **Task Status**: Track task progress with status updates (pending, in-progress, completed)
- **Due Dates**: Set and track due dates for your tasks
- **Filtering**: Filter tasks by their current status
- **Local Storage**: Task data persists in your browser's local storage

## Getting Started

In the project directory, you can run:

```bash
# Run the application
./run.sh

# Or use npm directly
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser (or another port if 3000 is in use).

## Usage Guide

### Adding a Task

1. Click the "+ Add New Task" button
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Due Date (optional)
3. Click "Add Task" to create the new task

### Managing Tasks

- **Change Status**: Use the dropdown menu on each task to update its status
- **View Details**: Click on any task to view its complete details
- **Delete**: Use the delete button to remove a task
- **Filter**: Use the filter dropdown to view tasks by their status

### Task Statuses

- **Pending**: Tasks that have not been started
- **In Progress**: Tasks currently being worked on
- **Completed**: Tasks that have been finished

## Technical Details

The application uses:
- React Context API for state management
- Browser's localStorage for data persistence
- Custom CSS for styling (no external UI libraries)

## Project Structure

```
src/
├── components/          # UI Components
│   ├── AddTaskForm.js   # Form for creating new tasks
│   ├── TaskDetails.js   # Modal for displaying task details
│   ├── TaskItem.js      # Individual task component
│   └── TaskList.js      # Container for listing tasks
├── context/
│   └── TaskContext.js   # Task state management
├── models/
│   └── Task.js          # Task data model
├── App.js               # Main application component
├── App.css              # Application styles
└── index.js             # Application entry point
```

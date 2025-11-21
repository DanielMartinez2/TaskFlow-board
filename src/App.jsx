import { useState, useEffect } from 'react';
import Column from './components/Column';

const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Set up project',
    description: 'Create the basic React app structure.',
    status: 'todo',
  },
  {
    id: 2,
    title: 'Design layout',
    description: 'Decide how the columns and cards will look.',
    status: 'todo',
  },
  {
    id: 3,
    title: 'Write basic styles',
    description: 'Make the board look clean and readable.',
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Create project',
    description: 'Initialize Vite + React app.',
    status: 'done',
  },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem('taskflow-tasks');
      return stored ? JSON.parse(stored) : INITIAL_TASKS;
    } catch (error) {
      console.error('Failed to parse tasks from localStorage', error);
      return INITIAL_TASKS;
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');  
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  }, [tasks]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const tasksTodo = filteredTasks.filter((task) => task.status === 'todo');
  const tasksInProgress = filteredTasks.filter((task) => task.status === 'in-progress');
  const tasksDone = filteredTasks.filter((task) => task.status === 'done');


  const handleAddTask = (event) => {
    event.preventDefault();

    if (newTitle.trim() === '') return; //sem título, não adiciona

    const newTask = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      status: 'todo',
    };

    setTasks([...tasks, newTask]);
    //limpa os campos do formulário
    setNewTitle('');
    setNewDescription('');  
  }
  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleDropOnColumn = (newStatus) => {
    if (!draggedTaskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: newStatus } : task,
      ),
    );

    setDraggedTaskId(null);
  };




  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TaskFlow Board</h1>
        <p>Simple Kanban-style task manager built with React.</p>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      
      <section className="form-section">
        <form className="task-form" onSubmit={handleAddTask}>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Implement drag and drop"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              placeholder="Add an optional description..."
              rows={2}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="primary-button">
            Add Task
          </button>
        </form>
      </section>

      <main className="board">
        <Column
          title="To Do"
          status="todo"
          tasks={tasksTodo}
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDropOnColumn={handleDropOnColumn}
        />

        <Column
          title="In Progress"
          status="in-progress"
          tasks={tasksInProgress}
          onMoveTask={handleMoveTask}          
          onDeleteTask={handleDeleteTask}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDropOnColumn={handleDropOnColumn}
        />

        <Column
          title="Done"
          status="done"
          tasks={tasksDone}
          onMoveTask={handleMoveTask}          
          onDeleteTask={handleDeleteTask}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDropOnColumn={handleDropOnColumn}
        />
      </main>
    </div>
  );
}

export default App;


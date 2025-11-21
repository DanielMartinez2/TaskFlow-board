import TaskCard from './TaskCard.jsx';

const STATUS_FLOW = {
  'todo': ['in-progress'],
  'in-progress': ['todo', 'done'],
  'done': ['in-progress'],
};

function Column({ title, status, tasks, onMoveTask, onDeleteTask, onDragStart, onDragEnd, onDropOnColumn }) {
  const tasksInThisColumn = tasks;

  const availableStatuses = STATUS_FLOW[status] ?? [];

  const handleDrop = (event) => {
    event.preventDefault();
    onDropOnColumn(status);
  };

  const handleDragOver = (event) => {    
    event.preventDefault();
  };

  return (
    <section className="column" onDragOver={handleDragOver}
    onDrop={handleDrop} >
      <h2>{title}</h2>
      <div className="column-content">
        {tasksInThisColumn.length === 0 && (
          <p className="empty-text">No tasks here yet.</p>
        )}

        {tasksInThisColumn.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            availableStatuses={availableStatuses}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </section>
  );
}

export default Column;

function TaskCard({ task, availableStatuses, onMoveTask, onDeleteTask, onDragStart, onDragEnd }) {
  return (
    <div className="task-card" draggable="true"
      onDragStart={() => onDragStart(task.id)}
      onDragEnd={onDragEnd}
    >
      
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}

      <div className="task-footer">
        <div className="task-actions">
          {availableStatuses.map((statusOption) => (
            <button
              key={statusOption}
              type="button"
              className="secondary-button small"
              onClick={() => onMoveTask(task.id, statusOption)}
            >
              Move to {statusOption.replace('-', ' ')}
            </button>            
          ))}
           <button
            type="button"
            className="danger-button small"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

const Task = ({task, onDelete, onToggle}) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (dateString) => {
        const today = new Date();
        const taskDate = new Date(dateString);

        today.setHours(0,0,0,0);
        taskDate.setHours(0,0,0,0);

        return taskDate < today;
    };

    return ( 
        <div className={`task-card ${task.completed? 'completed': ''}`}>
            <div className="task-left">
                <div
                className="status-container"
                onClick={() => onToggle && onToggle(task.id)}
                >
                    {task.completed ? (
                        <img src="/check-circle.png" alt="done" className="status-icon "/>
                    ) : (
                        <img src="/rec.png" alt="active" className="status-icon" />
                    )}
                </div>
                <div className="task-info">
                    <h3 className="task-desc">{task.description}</h3>
                    <div className="task-meta">
                        <span className={`category-dot ${task.category.toLowerCase()}`}></span>
                        <span className="category-text">{task.category}</span>
                        <span className="separator">•</span>
                        <div className="date-wrapper">
                            <img src="/calendar.png" alt="calendar" className="meta-icon" />
                            <span className={`date-text ${isOverdue(task.date) ? 'overdue' : ''}`}>
                                {formatDate(task.date)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="delete-btn" onClick={() => onDelete && onDelete(task.id)}>
                <img src="/trash.png" alt="delete" />
            </button>
        </div>
     );
}
 
export default Task;
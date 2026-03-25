import { useParams } from "react-router-dom";
import FilterTabs from "./FilterTabs";
import Task from "./Task";

const TaskPage = ({tasks, setTasks}) => {

    const { category, filter } = useParams();

    const isSameCategory = (task, category) => {
        return category === "alltask" || task.category.toLowerCase() === category;
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/tasks/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setTasks(prev => prev.filter(task => task.id !== id));
        });
    };

    const handleToggle = async (id) => {
        const task = tasks.find(t => t.id ===id);
        if(!task) return;

        try{
            await fetch(`http://localhost:8000/tasks/${id}`, {
                method: 'PATCH',
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ completed: !task.completed })
            });

            setTasks(prev => prev.map(t => 
                t.id === id ? {...t, completed: !t.completed} : t
            ));
        }catch(err){
            console.log("Error updating task: ", err);
        }
    };

    const filteredTasks = tasks.filter(task => isSameCategory(task, category)
    ).filter(task => {
        if(filter === 'active') return !task.completed;
        if(filter === "completed") return task.completed;
        return true;
    }).sort((a, b) => {
        if(a.completed !== b.completed){
            return a.completed - b.completed;
        }
        return new Date(a.date) - new Date(b.date);
    });

    return ( 
        <div>
            <FilterTabs tasks={tasks} />
            {filteredTasks.map(task => (
                <Task 
                key={task.id} 
                task={task} 
                onDelete={handleDelete}
                onToggle={handleToggle}
                />
            ))}
        </div>
    );
}
 
export default TaskPage
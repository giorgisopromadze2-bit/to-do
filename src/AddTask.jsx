import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({setTasks}) => {

    const [loading, setLoading] = useState(false);

    const [description, setDescription] = useState('');
    const [activeTab, setActiveTab] = useState(1);
    const [date, setDate] = useState(new Date());

    const categories = [
        { id: 1, label: 'Work'},
        { id: 2, label: 'Personal'},
        { id: 3, label: 'Study'}
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!description.trim()) return;

        const formattedDate = date.toISOString().split('T')[0];

        const selectedCategory = categories.find(c => c.id === activeTab);

        const newTask = {
            description,
            category: selectedCategory?.label || "Work",
            date: formattedDate,
            completed: false
        };

        setLoading(true);

        fetch('http://localhost:8000/tasks', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(newTask)
        }).then(res => res.json())
        .then(data => {
            setTasks( prev => [...prev, data]);
            setDescription('');
            setDate(new Date());
            setActiveTab(1);
        })
        .catch(err => {
            console.log("Error sending: ", err);
        }).finally(() => setLoading(false));
    };

    return ( 
        <div className="add-task">
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                required
                placeholder="What needs to be done?"
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                />
                <div className="tabs-container">
                    {categories.map((category) => (
                        <button
                        type="button"
                        key={category.id}
                        className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
                <div className="calendar-wrapper">
                   <DatePicker 
                    selected={date}
                    onChange={(e) => {
                        setDate(e);
                    }}
                    customInput={
                        <button type="button" className='calendar-toggle-btn'>
                            <img src="/calendar-pen.png" alt="calendar" />
                        </button>
                    }
                    popperPlacement="bottom-start"
                    portalId="root"
                    />
                </div>
                <button
                type="submit" 
                className="submit-btn"
                disabled={loading}
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </form>
        </div>
     );
}
 
export default AddTask;
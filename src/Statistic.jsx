const Statistic = ({ tasks }) => {

    const today = new Date();
    today.setHours(0,0,0,0);

    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const done = tasks.filter(t => t.completed).length;

    const overdue = tasks.filter(t =>{
        const taskDate = new Date(t.date);
        taskDate.setHours(0,0,0,0);

        return !t.completed && taskDate < today;
    }).length;

    const stats = [
        { id: 1, label: 'Total', icon:'/planning.png', value: total },
        { id: 2, label: 'Active', icon:'/rec.png', value: active },
        { id: 3, label: 'Done', icon:'/check.png', value: done },
        { id: 4, label: 'Overdue', icon:'/clock.png', value: overdue }
    ];

    return ( 
        <div className="stats-container"> 
            { stats.map((item) => (
                <div key={item.id} className="stat-card">
                    <div className="icon-box">
                        <img src={item.icon} alt={item.label} />
                    </div>
                    <div className="stat-info">
                        <h2 className="stat-number">{item.value}</h2>
                        <p className="stat-label">{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default Statistic;
import { NavLink } from "react-router-dom";

const Aside = ({ counts }) => {

    const list = [
        { id: 1, label: 'All Tasks', path:'/alltask/all', icon:'/list.png', number: counts.all },
        { id: 2, label: 'Work', path:'/work/all',  icon:'/record3.png', number: counts.work },
        { id: 3, label: 'Personal', path:'/personal/all',  icon:'/record2.png', number: counts.personal },
        { id: 4, label: 'Study', path:'/study/all',  icon:'/record1.png', number: counts.study }
    ];


    return ( 
        <aside className="sidebar">
            <h3 className="sidebar-title">CATEGORIES</h3>
            <nav className="nav-list">
                { list.map((item) => (
                    <NavLink 
                        key={item.id} 
                        to={item.path} 
                        className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                    >
                        <div className="nav-left">
                            <img src={item.icon} alt={item.label} className="nav-icon" />
                            <span className="nav-label">{item.label}</span>
                        </div>
                        <span className="nav-count">{item.number}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
     );
}
 
export default Aside;
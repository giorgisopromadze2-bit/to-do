import { NavLink, useParams } from "react-router-dom";

const FilterTabs = ({ tasks }) => {

    const { category } = useParams();

    const filteredByCategory = tasks.filter(task => 
        category === "alltask" ? true : task.category.toLowerCase() === category
    );

    const options = [
        { id: 1, label: 'All', path:`/${category}/all`,  number: filteredByCategory.length },
        { id: 2, label: 'Active', path:`/${category}/active`, number: filteredByCategory.filter(t => !t.completed).length },
        { id: 3, label: 'Completed', path:`/${category}/completed`, number: filteredByCategory.filter(t => t.completed).length }
    ];
    
    return ( 
        <div className="option-container">
            {options.map((option) => (
                <NavLink
                key={option.id}
                to={option.path}
                className={({isActive}) => isActive ? 'option-container-navlink active' : 'option-container-navlink' }
                >
                    {({ isActive }) => (
                        <button
                    type="button"
                    key={option.id}
                    className={`option-button ${isActive ? 'active' : ''}`}
                    >
                        <span className="label-text">{option.label}</span>
                        <span className="count-number">{option.number}</span>
                    </button>
                    )}
                </NavLink>
            ))}
        </div>
     );
}
 
export default FilterTabs;
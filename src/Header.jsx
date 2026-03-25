const Header = () => {

    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };

    const today = new Date().toLocaleDateString('en-US', options);

    return ( 
        <div className="header">
            <a href="/alltask/all"><img src="/checked.png" alt="checked image" />Taskflow</a>
            <h1>{today}</h1>
        </div>
     );
}
 
export default Header;
import { Navigate, Route, Routes } from "react-router-dom";
import AddTask from "./AddTask";
import Aside from "./Aside";
import Header from "./Header";
import Statistic from "./Statistic";
import TaskPage from "./TaskPage";
import UseFetch from "./UseFetch";

function App() {

  const { tasks, setTasks, error, isLoading } = UseFetch('http://localhost:8000/tasks');

  if(isLoading) {
    return <h2>Loading...</h2>
  }

  if(error){
    return <h2>{error}</h2>
  }

  const counts = tasks.reduce((acc, task) => {
    acc.all = (acc.all || 0) + 1;
    if(!task.completed) acc.active = (acc.active || 0) + 1;
    if(task.completed) acc.completed = (acc.completed || 0) + 1;
    const category = task.category.toLowerCase();
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});


  return (
    <>
      <Header />
      <Statistic tasks={tasks} />
      <div className="container">
        <Aside counts={counts} />
        <main>
          <AddTask setTasks = {setTasks} />
          <Routes>
            <Route path="/" element={<Navigate to="/alltask/all" replace />} />
            <Route path="/:category/:filter" element={
              <TaskPage 
              tasks = {tasks} 
              setTasks={setTasks}
              />
              } />
              <Route 
              path="/:category"
              element={<Navigate to="/alltask/all" />}
              /> 
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App

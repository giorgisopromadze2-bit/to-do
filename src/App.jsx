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
    acc.all++;
    if(task.completed)acc.completed++;
    else acc.active++;
    if(task.category === 'Work')acc.work++;
    else if (task.category === 'Personal')acc.personal++;
    else if(task.category === 'Study')acc.study++;
    return acc;
  }, { all: 0, active: 0, completed: 0, work: 0, personal: 0, study: 0});
 

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

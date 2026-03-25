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

  const counts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,

    work: tasks.filter(t => t.category === 'Work').length,
    personal: tasks.filter(t => t.category === 'Personal').length,
    study: tasks.filter(t => t.category === 'Study').length,
  }

  return (
    <>
      <Header />
      <Statistic tasks={tasks} />
      <div className="container">
        <Aside counts={counts} />
        <main>
          <AddTask setTasks = {setTasks} />
          <Routes>
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

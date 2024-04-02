import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Add_Task from './Add_Task';
import ViewTask from './ViewTask';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Add_Task />} />
        <Route path="/ViewTask" element={<ViewTask/>} />
      </Routes>
    </>
  )
}

export default App;

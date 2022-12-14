import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootswatch/dist/sketchy/bootstrap.min.css";

import Projects from './components/Projects';
import Project from './components/Project';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/project/:projectId" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;

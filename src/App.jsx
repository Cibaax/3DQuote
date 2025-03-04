import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar";
import Viewer3D from "./components/Viewer3d/Viewer3d";
import STLUploader from "./components/STLUploader";
import Preview from "./components/Preview/Preview";
import "./App.css";

const Home = ({ selectedModel, setSelectedModel, selectedProject, setSelectedProject }) => (
  <div className="app-container">
    <Sidebar selectedModel={selectedModel} setSelectedProject={setSelectedProject} selectedProject={selectedProject} />
    <Viewer3D selectedModel={selectedModel} setSelectedModel={setSelectedModel} selectedProject={selectedProject} />
  </div>
);

const App = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedProject, setSelectedProject] = useState(1);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home selectedModel={selectedModel} setSelectedModel={setSelectedModel} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />}
        />
        <Route path="/stluploader" element={<STLUploader />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </Router>
  );
};

export default App;

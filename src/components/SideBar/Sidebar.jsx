import { useEffect, useState } from "react";
import { fetchProjects, fetchProjectSummary, fetchAllModelsPreview } from "../../services/projectService";
import "./Sidebar.css";

const Sidebar = ({ setSelectedProject, selectedModel, selectedProject }) => {
  const [projects, setProjects] = useState([]);
  const [projectSummary, setProjectSummary] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    getProjects();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const getProjectSummary = async () => {
      const data = await fetchProjectSummary(selectedProject);
      setProjectSummary(data);
    };
    getProjectSummary();
  }, [selectedProject]);

  return (

    <div className="sidebar">
      <div className="button-container">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project.id)}
            className={`project-button ${selectedProject === project.id ? "selected" : ""}`}
          >
            <p>{project.name}</p>
          </button>
        ))}
      </div>
      {projectSummary && (
        <div className="project-info">
          <div className="info-container">
            <div className="info-box">
              <img src="/icons/icon_price.svg" alt="Precio" className="icon" />
              <div className="info-content">
                <h1 className="info-text">Precio Total</h1>
                <h2>$ {projectSummary.total_price}</h2>
              </div>
            </div>
            <div className="info-box">
              <img src="/icons/icon_time.svg" alt="Tiempo de impresión" className="icon" />
              <div className="info-content">
                <h1>Tiempo Total</h1>
                <h2>{projectSummary.total_time}</h2>
              </div>
            </div>
          </div>

          <div className="info-container">
            <div className="info-box">
              <img src="/icons/icon_weight.svg" alt="Peso" className="icon" />
              <div className="info-content">
                <h1>Peso Total</h1>
                <h2 className="info-value">{projectSummary.total_weight} g</h2>
              </div>
            </div>
            <div className="info-box">
              <img src="/icons/icon_supports.svg" alt="Soportes" className="icon" />
              <div className="info-content">
                <h1>Estructuras Impresas</h1>
                <h2 className="info-value">{projectSummary.total_count}</h2>
              </div>
            </div>
          </div>
          <div>
            <h1>{projectSummary.description}</h1>
          </div>


        </div>
      )}

      <div>
        {selectedModel ? (
          <div className="description-box">
          <ul>
            <li>
              <h1 className="label">Nombre</h1>
              <span className="line"></span>
              <h1 className="value">{selectedModel.name}</h1>
            </li>
            <li>
              <h1 className="label">Precio</h1>
              <span className="line"></span>
              <h1 className="value">${selectedModel.price}</h1>
            </li>
            <li>
              <h1 className="label">Tiempo</h1>
              <span className="line"></span>
              <h1 className="value">{selectedModel.time}</h1>
            </li>
            <li>
              <h1 className="label">Peso</h1>
              <span className="line"></span>
              <h1 className="value">{selectedModel.weight} g</h1>
            </li>
            <li>
              <h1 className="label">Soportes</h1>
              <span className="line"></span>
              <h1 className="value">{selectedModel.supports ? "Sí" : "No"}</h1>
            </li>
          </ul>
        </div>
        

        ) : (
          <h2>Selecciona un modelo</h2>
        )}

      </div>

    </div>
  );
};

export default Sidebar;

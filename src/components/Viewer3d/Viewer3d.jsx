import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model3D from "../Model3d/Model3d";
import { fetchModelsByProject } from "../../services/projectService";
import "./Viewer3D.css";

const Viewer3D = ({ setSelectedModel, selectedModel, selectedProject }) => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    if (!selectedProject) return;
    const getModels = async () => {
      const data = await fetchModelsByProject(selectedProject);
      setModels(data);
    };

    getModels();
  }, [selectedProject]);

  return (
    <div className="viewer-container">
      <Canvas camera={{ position: [-5, 7, 5], fov: 70 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[7, 7]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
        {models.map((model) => (
          <Model3D
            key={model.id}
            {...model}
            scale={model.scale}
            setSelectedModel={setSelectedModel}
            selectedModel={selectedModel}
          />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
